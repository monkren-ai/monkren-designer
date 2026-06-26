# 使用自身标准审查自身 Spec

## Why

monkren-design 是一个设计审查 Skill，拥有完整的 5 维度评审体系、硬编码值检测规则、设计系统合规性检查、反 AI slop 规则、文案审查规范等。但它从未用这些标准审查过自己。一个设计审查工具如果不能通过自身审查标准的检验，其权威性就会打折扣。需要用 monkren-design 的全部审查标准对自身文档体系进行一次系统性自审，找出违反自身规则的问题并修复。

## What Changes

- **执行 5 维度自审**：用自身的哲学一致性/视觉层级/细节执行/功能性/创新性标准审查 SKILL.md + references 全部文档
- **执行硬编码值检测**：扫描所有文档中的硬编码色值（`#xxxxxx`、`rgb()`、`hsl()`）、硬编码字体声明、非标准间距值
- **执行文案 slop 检测**：扫描所有文档中是否存在自身定义的 AI slop 词汇（"赋能""生态""智慧"等）、泛泛 CTA、编造数据
- **执行反 AI slop 视觉检测**：检查 README.md 和 SKILL.md 中的视觉呈现是否符合自身反 slop 规则
- **执行设计系统合规性检查**：检查文档中给出的 CSS/Swift 示例代码是否遵循自身定义的 token 引用规范
- **执行三层边界规则检查**：检查 SKILL.md 与 references 之间是否存在违反三层边界规则的内容重复
- **输出完整审查报告**：按自身报告模板格式输出结论层 + 诊断层 + 行动层
- **修复发现的问题**：根据审查报告修复所有 P0/P1 问题

## Impact

- Affected specs: SKILL.md、references/aesthetics.md、references/design-system.md、references/implementation.md、references/philosophy.md、references/platform-guides.md、references/review-perspectives.md、README.md、README.en.md
- Affected code: 无代码文件，全部为 Markdown 文档

## ADDED Requirements

### Requirement: 5 维度自审

系统必须用自身的 5 维度评审体系审查自身文档。

#### Scenario: 哲学一致性自审
- **WHEN** 用哲学一致性标准审查 monkren-design 文档
- **THEN** 识别文档中是否存在与自身核心理念矛盾的内容（如倡导反 slop 却自身包含 slop 词汇、倡导 token 化却自身硬编码色值）

#### Scenario: 视觉层级自审
- **WHEN** 用视觉层级标准审查 monkren-design 文档
- **THEN** 识别文档结构层级是否清晰（标题层级、信息架构、导航结构）

#### Scenario: 细节执行自审
- **WHEN** 用细节执行标准审查 monkren-design 文档
- **THEN** 识别文档中是否存在格式不一致、编号混乱、术语不统一等细节问题

#### Scenario: 功能性自审
- **WHEN** 用功能性标准审查 monkren-design 文档
- **THEN** 识别文档中是否存在冗余内容、缺失内容、无效交叉引用等功能性问题

#### Scenario: 创新性自审
- **WHEN** 用创新性标准审查 monkren-design 文档
- **THEN** 评估文档体系是否有独特的方法论贡献，还是仅为通用设计审查知识的汇编

### Requirement: 硬编码值自检

文档中给出的代码示例必须遵循自身定义的 token 引用规范。

#### Scenario: CSS 示例中的硬编码色值
- **WHEN** 扫描所有文档中的 CSS 代码示例
- **THEN** 标记所有未使用 `var(--color-*)` 的硬编码色值（`#xxxxxx`、`rgb()`、`hsl()`），但 token 定义本身的色值声明除外

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
- **THEN** 标记所有匹配自身 slop 黑名单的词汇（"赋能""生态""智慧""颠覆""引领""一站式""全方位""深度融合"等）

#### Scenario: 泛泛 CTA 检测
- **WHEN** 扫描所有文档中的 CTA 文案
- **THEN** 标记所有泛泛 CTA（"了解更多""立即开始"等）

#### Scenario: 编造数据检测
- **WHEN** 扫描所有文档中的数据声明
- **THEN** 标记所有无来源的数据声明

### Requirement: 设计系统合规性自检

文档中给出的代码示例必须遵循自身定义的设计系统合规性规则。

#### Scenario: 组件使用合规
- **WHEN** 审查文档中的代码示例
- **THEN** 示例代码中使用按钮/输入框/卡片等组件时，应使用 PrimaryButton/SecondaryButton/Card 等设计系统组件名，而非自定义实现

#### Scenario: Token 引用合规
- **WHEN** 审查文档中的代码示例
- **THEN** 示例代码中的颜色/字体/间距应通过 token 引用，而非硬编码

### Requirement: 三层边界规则自检

SKILL.md 与 references 之间的内容必须遵循三层边界规则。

#### Scenario: 概念所有权检查
- **WHEN** 对比 SKILL.md 与 references 的内容
- **THEN** 确认每个核心概念只在主体层保留完整内容，其他层仅保留一句话引用 + 指向

#### Scenario: 跨层引用格式检查
- **WHEN** 检查 SKILL.md 中的跨层引用
- **THEN** 确认引用格式为「[概念]是[1行定义] → 详见 `[对应references文件]`」

### Requirement: 输出完整审查报告

按自身报告模板格式输出审查结果。

#### Scenario: 报告结构完整
- **WHEN** 审查完成
- **THEN** 输出包含结论层（总体评分 + 雷达图 + P0 数 + Quick Win）+ 诊断层（5 维度评分 + 专项检测总览）+ 行动层（Quick Wins + Fix 清单 + Keep + 专项检测详情）

#### Scenario: 评分纪律遵守
- **WHEN** 输出评分
- **THEN** 遵守 4 条铁律：禁止通胀、禁止平均上浮、必须引证、创新性允许低分

## MODIFIED Requirements

（无修改项）

## REMOVED Requirements

（无移除项）
