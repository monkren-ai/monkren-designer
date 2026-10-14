#!/usr/bin/env ruby
# frozen_string_literal: true

require "fileutils"
require "minitest/autorun"
require "open3"
require "rbconfig"
require "tmpdir"

class RepositoryValidatorTest < Minitest::Test
  ROOT = File.expand_path("..", __dir__)

  def setup
    @copy = Dir.mktmpdir("monkren-validation-")
    # Only validation inputs; never include Git state or local user files.
    %w[SKILL.md README.md README.en.md DESIGN.md THIRD_PARTY_NOTICES.md LICENSE index.html skills references].each do |name|
      FileUtils.cp_r(File.join(ROOT, name), @copy)
    end
    FileUtils.ln_s(File.join(ROOT, "assets"), File.join(@copy, "assets"))
    FileUtils.ln_s(File.join(ROOT, "case"), File.join(@copy, "case"))
  end

  def teardown
    FileUtils.remove_entry(@copy)
  end

  def edit(path)
    file = File.join(@copy, path)
    File.write(file, yield(File.read(file)))
  end

  def validate
    Open3.capture3(RbConfig.ruby, File.join(ROOT, "scripts/validate_repo.rb"), "--root", @copy)
  end

  def assert_invalid
    out, err, status = validate
    refute status.success?, out
    assert_includes err, "Validation failed", err
    refute_match(/NoMethodError|TypeError|Traceback/, err)
  end

  def test_current_repository
    out, err, status = validate
    assert status.success?, out + err
  end

  def test_optional_metadata_does_not_break_validation
    edit("SKILL.md") { |text| text.sub("name: monkren-design", "name: monkren-design\nmetadata:\n  short-description: Design lifecycle") }
    out, err, status = validate
    assert status.success?, out + err
  end

  def test_scalar_frontmatter_reports_a_diagnostic
    edit("SKILL.md") { |text| text.sub(/\A---\n.*?\n---/m, "---\nfalse\n---") }
    assert_invalid
  end

  def test_module_frontmatter_array_reports_a_diagnostic
    edit("skills/02-create/wireframe/SKILL.md") { |text| text.sub(/\A---\n.*?\n---/m, "---\n- bad\n---") }
    assert_invalid
  end

  def test_invalid_name
    edit("skills/02-create/wireframe/SKILL.md") { |text| text.sub("name: wireframe", "name: Invalid_Name") }
    assert_invalid
  end

  def test_duplicate_name
    edit("skills/02-create/wireframe/SKILL.md") { |text| text.sub("name: wireframe", "name: generate-variations") }
    assert_invalid
  end

  def test_empty_description
    edit("SKILL.md") { |text| text.sub(/^description:.*$/, 'description: ""') }
    assert_invalid
  end

  def test_overlong_description
    edit("SKILL.md") { |text| text.sub(/^description:.*$/, "description: #{'x' * 1025}") }
    assert_invalid
  end

  def test_missing_route
    edit("SKILL.md") { |text| text.lines.reject { |line| line.include?("`skills/02-create/wireframe/SKILL.md`") }.join }
    assert_invalid
  end

  def test_broken_markdown_reference
    edit("SKILL.md") { |text| text + "\n[Missing reference](references/missing.md)\n" }
    assert_invalid
  end

  def test_broken_inline_instruction_reference
    edit("skills/02-create/wireframe/SKILL.md") { |text| text + "\nRead `../../../references/missing.md` before starting.\n" }
    assert_invalid
  end

  def test_valid_local_and_shared_instruction_paths
    edit("skills/02-create/wireframe/SKILL.md") { |text| text + "\nRead `../../../references/standards.md` and `references/execution.md`.\n" }
    out, err, status = validate
    assert status.success?, out + err
  end
end
