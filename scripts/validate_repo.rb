#!/usr/bin/env ruby
# frozen_string_literal: true

require "cgi"
require "json"
require "pathname"
require "yaml"

ROOT = Pathname.new(File.expand_path("..", __dir__))
errors = []

def relative(path)
  Pathname.new(path).relative_path_from(ROOT).to_s
end

def frontmatter(path)
  text = path.read
  match = text.match(/\A---\s*\n(.*?)\n---\s*\n/m)
  return [nil, "missing YAML frontmatter"] unless match

  data = YAML.safe_load(match[1], [], [], false)
  [data, nil]
rescue StandardError => e
  [nil, "invalid YAML frontmatter: #{e.message}"]
end

root_skill = ROOT.join("SKILL.md")
active_skills = [root_skill] + Dir[ROOT.join("skills/**/SKILL.md")]
  .map { |path| Pathname.new(path) }
  .reject { |path| path.to_s.include?("/skills/_deprecated/") }
  .sort

active_skills.each do |path|
  data, error = frontmatter(path)
  if error
    errors << "#{relative(path)}: #{error}"
    next
  end

  unless data.is_a?(Hash) && data.keys.sort == %w[description name]
    errors << "#{relative(path)}: frontmatter must contain only name and description"
  end
  errors << "#{relative(path)}: name must be a non-empty string" unless data["name"].is_a?(String) && !data["name"].strip.empty?
  errors << "#{relative(path)}: description must be a non-empty string" unless data["description"].is_a?(String) && !data["description"].strip.empty?
end

root_data, root_error = frontmatter(root_skill)
errors << "SKILL.md: root skill name must remain monkren-design" unless root_error.nil? && root_data["name"] == "monkren-design"

stage_skills = active_skills.reject do |path|
  path == root_skill || path.to_s.include?("/skills/tools/") || path.to_s.include?("/skills/advisors/")
end
advisor_skills = active_skills.select { |path| path.to_s.include?("/skills/advisors/") }
tool_skills = active_skills.select { |path| path.to_s.include?("/skills/tools/") }
errors << "expected 16 active stage modules, found #{stage_skills.length}" unless stage_skills.length == 16
errors << "expected 1 active advisor, found #{advisor_skills.length}" unless advisor_skills.length == 1
errors << "expected 2 active tools, found #{tool_skills.length}" unless tool_skills.length == 2

advisor_path = ROOT.join("skills/advisors/design-decision-council/SKILL.md")
if advisor_path.file?
  advisor_text = advisor_path.read
  [
    "始终只读", "一句话决策", "核心产品承诺", "保留 / 删除 / 延后",
    "决定性约束与证据", "工程异议", "体验异议", "下一次可逆实验"
  ].each do |required|
    errors << "#{relative(advisor_path)}: missing advisor contract #{required}" unless advisor_text.include?(required)
  end
  if advisor_text.match?(/我是\s*(?:Elon|Musk|Steve|Jobs)|直接以.+身份|角色扮演/)
    errors << "#{relative(advisor_path)}: advisor must not impersonate a real person"
  end
  [
    "用户要求实现时，先完成本次决策输出", "只给一个统一结论",
    "涉及当前市场、成本、法规或技术事实时先验证可靠来源"
  ].each do |required|
    errors << "#{relative(advisor_path)}: missing behavior safeguard #{required}" unless advisor_text.include?(required)
  end
else
  errors << "missing design-decision-council advisor"
end

root_text = root_skill.read
[
  "显式触发", "自动触发", "不触发", "普通视觉微调", "advisor 始终只读",
  "不是第六阶段", "不替代主模块"
].each do |required|
  errors << "SKILL.md: missing advisor routing rule #{required}" unless root_text.include?(required)
end

{
  "explicit trigger" => ["次设计 agent", "第二意见", "第一性原理 × 产品品味", "这个方向该不该做"],
  "automatic trigger" => ["重大方向选择", "高成本实现", "难逆架构或品牌决策", "审查修复相互冲突", "交付前关键取舍"],
  "non-trigger" => ["普通视觉微调", "明确小修", "纯执行任务"]
}.each do |scenario, phrases|
  phrases.each do |phrase|
    errors << "SKILL.md: missing #{scenario} behavior #{phrase}" unless root_text.include?(phrase)
  end
end

decision_model = ROOT.join("skills/advisors/design-decision-council/references/decision-model.md")
if decision_model.file?
  model_text = decision_model.read
  [
    "可逆决策使用最小原型快速学习", "难逆品牌、架构和公开承诺提高证据门槛",
    "用户是最终产品决策者", "不以速度为由绕过安全、法律、隐私、无障碍或授权"
  ].each do |required|
    errors << "#{relative(decision_model)}: missing risk behavior #{required}" unless model_text.include?(required)
  end
else
  errors << "missing advisor decision model"
end

Dir[ROOT.join("think/**/SKILL.md")].each do |path|
  errors << "#{relative(path)}: raw perspective skill must not remain as an installation entry"
end

routed = root_skill.read.scan(/`(skills\/[^`]+\/SKILL\.md)`/).flatten.uniq.sort
expected_routes = active_skills.reject { |path| path == root_skill }.map { |path| relative(path) }.sort
(expected_routes - routed).each { |path| errors << "SKILL.md: active module is not routed: #{path}" }
(routed - expected_routes).each { |path| errors << "SKILL.md: route is missing or deprecated: #{path}" }
routed.each { |path| errors << "SKILL.md: route does not exist: #{path}" unless ROOT.join(path).file? }

banned = {
  /\$\{AGENT_TOOL_NAME\}/ => "proprietary agent tool variable",
  %r{\.claude/skills} => "agent-specific skill path",
  /copy_starter_component/ => "unbundled starter helper",
  /design_canvas\.jsx/ => "unbundled design canvas",
  %r{/lazyweb-[a-z-]+} => "agent-specific slash command"
}
active_skills.each do |path|
  text = path.read
  banned.each do |pattern, label|
    errors << "#{relative(path)}: contains #{label}" if text.match?(pattern)
  end
end

markdown_files = [
  ROOT.join("README.md"), ROOT.join("README.en.md"), ROOT.join("DESIGN.md"),
  ROOT.join("THIRD_PARTY_NOTICES.md"), root_skill
] + Dir[ROOT.join("references/*.md")].map { |path| Pathname.new(path) } +
  Dir[ROOT.join("skills/**/README*.md")].map { |path| Pathname.new(path) } +
  Dir[ROOT.join("skills/**/references/*.md")].map { |path| Pathname.new(path) } + active_skills

markdown_files.uniq.each do |path|
  in_fence = false
  path.readlines.each_with_index do |line, index|
    if line.lstrip.start_with?("```")
      in_fence = !in_fence
      next
    end
    next if in_fence

    link_source = line.gsub(/`[^`]*`/, "")
    link_source.scan(/!?\[[^\]]*\]\(([^)]+)\)/).flatten.each do |raw_target|
      target = raw_target.strip.sub(/\s+["'][^"']*["']\z/, "").sub(/\A</, "").sub(/>\z/, "")
      next if target.empty? || target.start_with?("#", "http://", "https://", "mailto:", "data:")
      next if target.include?("{") || target.include?("}")

      clean = CGI.unescape(target.split("#", 2).first)
      resolved = path.dirname.join(clean).cleanpath
      errors << "#{relative(path)}:#{index + 1}: broken link #{target}" unless resolved.exist?
    end
  end
end

cards_path = ROOT.join("assets/philosophy-images/cards.json")
begin
  cards = JSON.parse(cards_path.read)
  errors << "cards.json: expected 80 records, found #{cards.length}" unless cards.is_a?(Array) && cards.length == 80
  indexed = cards.is_a?(Array) ? cards.map { |card| card["file_name"] }.compact.sort : []
  files = Dir[ROOT.join("assets/philosophy-images/*.jpg")].map { |path| File.basename(path) }.sort
  (indexed - files).each { |name| errors << "cards.json: missing image #{name}" }
  (files - indexed).each { |name| errors << "cards.json: unindexed image #{name}" }
  errors << "cards.json: duplicate file_name values" unless indexed.uniq.length == indexed.length
rescue StandardError => e
  errors << "cards.json: #{e.message}"
end

site = ROOT.join("index.html")
site_text = site.read
site_text.scan(/(?:href|src)=["']([^"']+)["']/).flatten.each do |target|
  next if target.start_with?("#", "http://", "https://", "mailto:", "data:")
  clean = CGI.unescape(target.split("#", 2).first)
  errors << "index.html: missing local target #{target}" unless site.dirname.join(clean).cleanpath.exist?
end

query_count = site_text.scan(/<div class="query(?:\s|\")/).length
errors << "index.html: expected 5 stage queries, found #{query_count}" unless query_count == 5
errors << "index.html: missing cross-stage advisor section" unless site_text.scan(/<section id="council"/).length == 1

notices = ROOT.join("THIRD_PARTY_NOTICES.md")
if notices.file?
  notice_text = notices.read
  errors << "THIRD_PARTY_NOTICES.md: expected two Huashu copyright notices" unless notice_text.scan(/Copyright \(c\) 2026 Huashu/).length == 2
else
  errors << "missing THIRD_PARTY_NOTICES.md"
end

%w[README.md README.en.md SKILL.md index.html].each do |name|
  errors << "#{name}: expected version v6.2" unless ROOT.join(name).read.include?("v6.2")
end

if errors.empty?
  puts "Validation passed: 1 root skill, 16 stage modules, 1 advisor, 2 tools, 80 indexed images."
else
  warn "Validation failed with #{errors.length} issue(s):"
  errors.each { |error| warn "- #{error}" }
  exit 1
end
