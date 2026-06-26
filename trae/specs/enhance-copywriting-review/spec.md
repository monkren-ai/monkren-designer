# 文案审查能力增强 Spec

## Why

monkren-design 已具备成熟的视觉设计审查能力（5 维度评审、硬编码值检测、设计系统合规性检查等），但文案审查几乎空白——仅在 `design-systems-baseline.md` 有 4 条"语调"检查项，在 `workflow.md` 反 AI slop 检查中提及"文字空洞"。设计产出中的文案质量与视觉质量同等重要，AI 生成文案的 slop 问题（空洞词汇、编造数据、泛泛 CTA）与视觉 slop 同样严重，但当前技能缺乏系统性检测能力。

## What Changes

- **新增 AI 文案 slop 检测规则**：建立文案维度的 AI slop 黑名单（空洞词汇、编造数据、泛泛 CTA、伪专业术语、模板化表达等），与视觉 AI slop 黑名单对齐
- **增强语调审查**：将 `design-systems-baseline.md` 的 4 条"语调"检查项扩展为完整的文案审查检查清单，覆盖语调一致性、CTA 有效性、信息密度、文案结构等
- **新增文案审查子流程**：在 `workflow.md` 的 Step 4 执行审查中新增"4.8 文案审查"子步骤，与现有 4.1-4.7 并列
- **更新 SKILL.md**：在核心哲学、审查工作流、审查报告模板中补充文案审查相关内容
- **更新 content-guidelines.md**：新增"文案 slop 完整黑名单"章节，与现有"视觉 slop 黑名单"并列
- **更新 critique-guide.md**：在 5 维度评审的"功能性"维度中补充文案评审要点

## Impact

- Affected specs: SKILL.md、references/content-guidelines.md、references/workflow.md、references/critique-guide.md、references/design-systems-baseline.md
- Affected code: 无代码文件变更，全部为 Markdown 文档更新

## ADDED Requirements

### Requirement: AI 文案 slop 检测

系统 SHALL 检测设计产出中的 AI 文案 slop，与视觉 AI slop 检测对齐。

#### Scenario: 检测空洞词汇
- **WHEN** 设计产出中出现"赋能""生态""智慧""颠覆""引领""一站式""全方位""深度融合"等 AI 训练语料高频空洞词汇
- **THEN** 标记为文案 slop，建议替换为具体描述

#### Scenario: 检测编造数据
- **WHEN** 设计产出中出现无来源的统计数据（如"10,000+ 用户""99.9% 满意度""提升 300%"）
- **THEN** 标记为文案 slop（data slop 的文案维度），建议使用真实数据或诚实 placeholder

#### Scenario: 检测泛泛 CTA
- **WHEN** 设计产出中的 CTA 使用"了解更多""立即开始""点击这里"等泛泛表述
- **THEN** 标记为文案 slop，建议替换为具体行动描述（如"开始免费试用""下载 PDF 报告"）

#### Scenario: 检测伪专业术语
- **WHEN** 设计产出中出现"AI 驱动""智能引擎""数据中台""底层架构"等无具体含义的伪技术术语
- **THEN** 标记为文案 slop，建议用用户能理解的语言描述实际功能

#### Scenario: 检测模板化表达
- **WHEN** 设计产出中出现"您的 X 伙伴""为您量身定制""一站式解决方案"等模板化表达
- **THEN** 标记为文案 slop，建议用品牌独有的语言风格重写

### Requirement: 文案审查检查清单

系统 SHALL 提供结构化的文案审查检查清单，作为审查工作流的子步骤。

#### Scenario: 语调一致性审查
- **WHEN** 审查设计产出的文案
- **THEN** 检查文案语调是否与品牌定位一致（专业/友好/权威/轻松等），同一产出内语调是否统一

#### Scenario: CTA 有效性审查
- **WHEN** 审查设计产出中的 CTA 文案
- **THEN** 检查 CTA 是否具体（描述用户将获得什么）、是否有行动感（动词开头）、是否与页面目标一致

#### Scenario: 信息密度审查
- **WHEN** 审查设计产出的文案密度
- **THEN** 检查文案量是否与载体匹配（落地页每屏 1 核心信息、PPT 每页 1 观点、App 每屏 1 行动），是否存在"因为空所以加字"的填充

#### Scenario: 文案结构审查
- **WHEN** 审查设计产出的文案结构
- **THEN** 检查标题是否可独立理解（不依赖正文）、正文是否可扫描（短段落/列表/加粗关键信息）、是否存在"标题党"（标题与内容不匹配）

#### Scenario: 中英文混排审查
- **WHEN** 审查包含中英文混排的文案
- **THEN** 检查中英文之间是否有空格、专有名词大小写是否正确、是否混用了中英文标点

### Requirement: 文案审查集成到工作流

系统 SHALL 将文案审查作为 Step 4 执行审查的子步骤 4.8，与现有 4.1-4.7 并列。

#### Scenario: 执行文案审查
- **WHEN** 执行设计审查 Step 4
- **THEN** 在 4.7 可访问性检查之后，新增 4.8 文案审查，执行 AI 文案 slop 检测 + 文案审查检查清单

#### Scenario: 文案审查结果纳入报告
- **WHEN** 输出审查报告
- **THEN** 在报告模板中新增"文案审查结果"板块，与"硬编码值检测结果""设计系统合规性结果""品牌资产协议结果"并列

### Requirement: 功能性维度补充文案评审要点

系统 SHALL 在 5 维度评审的"功能性"维度中补充文案评审要点。

#### Scenario: 功能性维度评审包含文案检查
- **WHEN** 评审设计的功能性维度
- **THEN** 评审要点增加：文案是否服务于用户目标（而非品牌自嗨）、信息架构是否通过文案体现（而非仅靠视觉）、文案是否消除了用户决策摩擦

## MODIFIED Requirements

### Requirement: content-guidelines.md 内容扩展

content-guidelines.md 从"反 AI slop + 内容准则 + Scale 规范"扩展为"反 AI slop（视觉 + 文案）+ 内容准则 + Scale 规范"。新增"文案 slop 完整黑名单"章节，与现有"AI Slop 完整黑名单"（视觉类）并列。

### Requirement: design-systems-baseline.md 语调章节扩展

design-systems-baseline.md 的"7. 语调（Voice）"章节从 4 条检查项扩展为完整的文案审查检查清单，新增常见问题表和合规文案结构示例。

### Requirement: 审查报告模板扩展

审查报告模板新增"文案审查结果"板块，位于"品牌资产协议结果"之后。

## REMOVED Requirements

（无移除项）
