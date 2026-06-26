# 全面审查全部内容 Spec

## Why

monkren-design 项目自上次自审以来，references 目录新增了大量内容（review-perspectives.md 新增 10 维度审查框架、lazyweb-integration.md 新增 MCP 集成规范、philosophy.md 扩展至 40 种设计哲学、design-system.md 新增 SwiftLint 规则和 Design Token 架构、platform-guides.md 新增 7 类平台规范、aesthetics.md 新增文案/图标 slop 黑名单）。这些新增内容与原有内容之间可能存在不一致、重复、过时引用、违反自身规则等问题。需要一次系统性全面审查，确保整个文档体系的内部一致性、规则合规性和内容完整性。

## What Changes

- **执行全文件交叉一致性审查**：检查所有文件之间的术语、编号、引用、规则是否一致
- **执行硬编码值检测**：扫描所有文档中代码示例的硬编码色值/字体/间距
- **执行文案 slop 自检**：扫描所有文档是否存在自身定义的 AI slop 词汇
- **执行设计系统合规性自检**：检查文档中代码示例是否遵循自身 token 引用规范
- **执行跨文件引用完整性检查**：检查所有 `→ 详见` 引用是否指向正确的文件和章节
- **执行版本日期一致性检查**：检查所有文件的版本号和更新日期是否一致
- **执行内容重复检测**：检查不同文件间是否存在违反三层边界规则的内容重复
- **修复发现的所有 P0/P1 问题**

## Impact

- Affected specs: SKILL.md、DESIGN.md、README.md、README.en.md、references/philosophy.md、references/aesthetics.md、references/design-system.md、references/implementation.md、references/platform-guides.md、references/review-perspectives.md、references/lazyweb-integration.md
- Affected code: 无代码文件，全部为 Markdown 文档

## ADDED Requirements

### Requirement: 全文件交叉一致性审查

系统必须检查所有文件之间的术语、编号、规则是否一致。

#### Scenario: 术语一致性
- **WHEN** 对比不同文件中相同概念的术语
- **THEN** 识别术语不一致（如同一概念在不同文件中使用不同名称）

#### Scenario: 编号一致性
- **WHEN** 检查工作流 Step 编号、章节编号
- **THEN** 确保所有文件中的 Step 编号和章节编号引用一致

#### Scenario: 规则一致性
- **WHEN** 对比不同文件中相同规则的描述
- **THEN** 确保规则描述无矛盾（如一个文件说"≤2种字体"，另一个说"≤3种字体"）

### Requirement: 硬编码值自检

文档中给出的代码示例必须遵循自身定义的 token 引用规范。

#### Scenario: CSS 示例中的硬编码色值
- **WHEN** 扫描所有文档中的 CSS 代码示例
- **THEN** 标记所有未使用 `var(--color-*)` 的硬编码色值，但 token 定义本身的色值声明除外

#### Scenario: Swift 示例中的硬编码值
- **WHEN** 扫描所有文档中的 Swift 代码示例
- **THEN** 标记所有未使用 `DS.Colors`/`DS.Typography`/`DS.Spacing` 的硬编码值，但 DS enum 定义内部的色值声明除外

#### Scenario: 非标准间距值
- **WHEN** 扫描所有文档中的间距数值
- **THEN** 标记所有非 4/8 倍数的间距值

### Requirement: 文案 slop 自检

文档中不得包含自身定义的 AI slop 词汇和模式。

#### Scenario: 空洞词汇检测
- **WHEN** 扫描所有文档
- **THEN** 标记所有匹配自身 slop 黑名单的词汇

#### Scenario: 泛泛 CTA 检测
- **WHEN** 扫描所有文档中的 CTA 文案示例
- **THEN** 标记所有泛泛 CTA（注意区分"作为反面示例引用"和"文档自身使用"）

### Requirement: 跨文件引用完整性检查

所有 `→ 详见` 引用必须指向正确的文件和章节。

#### Scenario: 引用目标存在性
- **WHEN** 检查所有跨文件引用
- **THEN** 确认引用的文件名和章节标题确实存在

#### Scenario: 引用格式一致性
- **WHEN** 检查引用格式
- **THEN** 确认格式统一为 `→ 详见 references/xxx.md（章节名）` 或 `→ references/xxx.md（章节名）`

### Requirement: 版本日期一致性检查

所有文件的版本号和更新日期应保持一致。

#### Scenario: 版本日期检查
- **WHEN** 检查所有文件底部的版本号和更新日期
- **THEN** 确认所有文件使用相同的版本号和更新日期

### Requirement: 内容重复检测

不同文件间不得存在违反三层边界规则的内容重复。

#### Scenario: SKILL.md 与 references 重复检查
- **WHEN** 对比 SKILL.md 与 references 文件的内容
- **THEN** 确认 SKILL.md 中每个核心概念只保留 1 行定义 + 引用指向，完整内容在 references 中

#### Scenario: references 之间重复检查
- **WHEN** 对比不同 references 文件的内容
- **THEN** 确认同一规则不在多个 references 文件中完整展开（应在一处定义，其他引用）

### Requirement: 修复所有 P0/P1 问题

审查发现的所有 P0/P1 问题必须修复。

#### Scenario: P0 问题修复
- **WHEN** 发现 P0 级别问题（致命/阻断）
- **THEN** 立即修复，确保文档不包含违反自身核心规则的内容

#### Scenario: P1 问题修复
- **WHEN** 发现 P1 级别问题（重要）
- **THEN** 修复，确保文档内部一致性

## MODIFIED Requirements

（无修改项）

## REMOVED Requirements

（无移除项）
