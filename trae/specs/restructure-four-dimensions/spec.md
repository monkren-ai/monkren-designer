# 内容四维整合 Spec

## Why

当前 SKILL.md（950+ 行）和 7 个 references 子文档按"能力模块"组织，但存在三重问题：
1. **概念重叠**——"反 AI slop"散布在 SKILL.md、content-guidelines.md、design-systems-baseline.md 三处；"品牌资产"在 SKILL.md、design-context.md、design-systems-baseline.md 重复；"评分纪律"在 SKILL.md 和 critique-guide.md 重复
2. **认知边界模糊**——同一概念的不同层面（为什么/是什么/怎么管/怎么做）混在同一章节，读者无法快速定位"我到底在看什么"
3. **维护成本高**——修改一个概念需要同步更新 2-3 个文件

按「设计哲学 / 设计美学 / 设计系统 / 设计实现」四维重新整合，每维回答一个根本问题：
- **设计哲学**：我信什么？（世界观）
- **设计美学**：我怎么判断好不好？（评价标准）
- **设计系统**：设计必须遵守什么规则？（规范体系）
- **设计实现**：我怎么做审查？（执行流程）

## What Changes

- **SKILL.md 重构为四维结构**：将现有内容按四维重新组织，作为主文档的顶层骨架
- **references/ 精简为 4 个子文档**：对应四维，每个子文档是 SKILL.md 对应章节的深度展开
- **删除旧 references 文件**（7 个）
- **更新 README.md / README.en.md**

### 四维内容映射

| 内容 | 设计哲学 | 设计美学 | 设计系统 | 设计实现 |
|------|:-------:|:-------:|:-------:|:-------:|
| 事实验证优先原则 | ● 主体 | | | |
| 核心哲学（context 出发/反 slop/系统优先/Placeholder） | ● 信念层 | ○ slop 的审美判断 | | |
| 20 种设计哲学库 | ● 主体 | | | |
| 品位锚点 | ● 主体 | | | |
| 设计方向顾问 | ● 主体 | | | |
| 5 维度评审体系 | ○ 哲学一致性维度 | ● 主体 | | |
| 评分纪律 | | ● 主体 | | |
| 反 AI slop 速查 | | ● 主体 | | |
| 常见设计问题 Top 10 | | ● 主体 | | |
| 场景评审侧重 | | ● 主体 | | |
| 文案审查 | | ● 主体 | | |
| 图标审查 | | ● 主体 | | |
| 9 段框架 | | | ● 主体 | |
| 硬编码值检测规则 | | | ● 主体 | |
| 设计系统合规性检查 | | | ● 主体 | |
| 核心资产协议 | ○ 品牌识别哲学 | | ● 合规规则 | |
| SwiftLint 规则 | | | ● 主体 | |
| Design Token 架构 | | | ● 主体 | |
| 审查工作流 | | | | ● 主体 |
| 设计上下文提取 | ○ 为什么上下文重要 | | | ● 提取流程 |
| 品牌资产提取 | ○ 为什么品牌重要 | | ● 合规检查项 | ● 提取流程 |
| 审查报告模板 | | | | ● 主体 |
| SVG 雷达图 | | | | ● 主体 |
| 自检迭代 | | | | ● 主体 |
| Artifact 结构检查 | | | | ● 主体 |
| 可访问性检查 | | | | ● 主体 |

● = 主体内容所在维度 / ○ = 该维度仅保留一句话引用 + 指向主体

### references 文件映射

| 文件 | 来源 |
|------|------|
| `references/philosophy.md` | design-styles.md（20 种哲学库）+ SKILL.md 核心哲学/品位锚点/设计方向顾问 + design-context.md 的哲学论述（为什么上下文重要/为什么品牌重要） |
| `references/aesthetics.md` | critique-guide.md（5 维度评审标准）+ content-guidelines.md（反 slop 黑名单/文案/图标/Scale/CSS 神器）+ SKILL.md 评分纪律/常见问题 Top 10/场景评审侧重 |
| `references/design-system.md` | design-systems-baseline.md（9 段框架）+ SKILL.md 硬编码值检测/设计系统合规性/SwiftLint 规则/Design Token 架构/核心资产协议合规规则 |
| `references/implementation.md` | workflow.md（审查工作流）+ verification.md（自检迭代）+ SKILL.md 审查报告模板/SVG 雷达图/Artifact 结构检查/可访问性检查 + design-context.md 提取流程/品牌资产提取流程 |

## Impact

- Affected specs: SKILL.md（完全重构）、README.md、README.en.md
- Affected code: references/ 目录（7 个旧文件删除，4 个新文件创建）
- **BREAKING**: references 路由表完全变更

## ADDED Requirements

### Requirement: 四维顶层架构

SKILL.md SHALL 按「设计哲学 → 设计美学 → 设计系统 → 设计实现」四维组织，每维回答一个根本问题。

#### Scenario: 四维边界清晰
- **WHEN** 阅读 SKILL.md
- **THEN** 文档顶层结构为四维，每维有独立章节标题，章节开头用一句话说明该维回答的根本问题

#### Scenario: 跨维引用而非重复
- **WHEN** 一个概念在多个维度有关联
- **THEN** 仅在一个维度作为主体展开，其他维度用一句话引用 + 指向主体所在维度。例如：设计哲学章节提到"反 AI slop 是核心信念"并指向设计美学章节的完整 slop 黑名单；设计系统章节的反模式段落引用设计美学的 slop 概念但不重复展开

### Requirement: 设计哲学维度

设计哲学维度 SHALL 回答"我信什么"，包含所有关于设计世界观的根本信念。

#### Scenario: 设计哲学维度内容完整
- **WHEN** 阅读设计哲学章节
- **THEN** 包含：事实验证优先原则、核心哲学（从 existing context 出发/反 AI slop/系统优先不要填充/Placeholder > 烂实现）、20 种设计哲学库摘要（5 流派 × 4 方向速查表）、品位锚点、设计方向顾问（Fallback 模式）

#### Scenario: 设计哲学 references 深度展开
- **WHEN** 阅读 references/philosophy.md
- **THEN** 包含：20 种哲学的完整风格库（含提示词 DNA/确定性色板/确定性字体栈/布局姿态/代表作/搜索关键词）、核心哲学的深度论述（为什么上下文重要/为什么品牌重要/为什么 slop 是问题）、品位锚点的详细解释、设计方向顾问的完整推荐规则和执行路径选择

### Requirement: 设计美学维度

设计美学维度 SHALL 回答"我怎么判断好不好"，包含所有评价标准和品味判断。

#### Scenario: 设计美学维度内容完整
- **WHEN** 阅读设计美学章节
- **THEN** 包含：5 维度评审体系（哲学一致性/视觉层级/细节执行/功能性/创新性，含分数表）、评分纪律（4 条铁律）、反 AI slop 速查（视觉/文案/图标三维度）、常见设计问题 Top 10、场景评审侧重

#### Scenario: 设计美学 references 深度展开
- **WHEN** 阅读 references/aesthetics.md
- **THEN** 包含：5 维度评分标准详解（含分数表/评审要点/证据段落要求）、AI slop 完整黑名单（视觉/字体/色彩/Layout 陷阱）、文案 slop 完整黑名单（空洞词汇/编造数据/泛泛 CTA/伪专业术语/模板化表达）、图标使用规范（何时用/风格一致性/尺寸系统/语义匹配/可访问性）、Scale 规范（幻灯片/印刷/Web）、CSS 神器、决策速查表、评分纪律深度展开（4 条铁律的详细说明和示例）

### Requirement: 设计系统维度

设计系统维度 SHALL 回答"设计必须遵守什么规则"，包含所有规范体系、检测规则和工具。

#### Scenario: 设计系统维度内容完整
- **WHEN** 阅读设计系统章节
- **THEN** 包含：DESIGN.md 9 段框架（色彩/排版/间距/布局/组件/动效/语调/品牌/反模式）、硬编码值检测规则（颜色/字体/间距）、设计系统合规性检查（组件使用/品牌资产协议合规性）、SwiftLint 规则建议、Design Token 架构建议

#### Scenario: 设计系统 references 深度展开
- **WHEN** 阅读 references/design-system.md
- **THEN** 包含：9 段框架完整检查清单（每段含审查检查项/常见问题/合规结构）、硬编码值检测正则和合规/不合规示例（CSS + Swift）、组件使用合规性详细对照表、品牌资产协议合规性检查表、核心资产协议（审查清单/常见违规模式/5-10-2-8 原则）、SwiftLint 自定义规则完整配置、Design Token 架构完整代码

### Requirement: 设计实现维度

设计实现维度 SHALL 回答"我怎么做审查"，包含所有执行流程、产出规范和质量保证。

#### Scenario: 设计实现维度内容完整
- **WHEN** 阅读设计实现章节
- **THEN** 包含：审查工作流（Step 0-6）、审查报告模板、SVG 雷达图规范、自检迭代

#### Scenario: 设计实现 references 深度展开
- **WHEN** 阅读 references/implementation.md
- **THEN** 包含：审查工作流详细步骤（每步含必须确认/怎么确认/示例/禁止行为）、设计上下文提取流程（6 级优先级/获取流程/Import 策略/Figma 配合/凭空做设计的 fallback）、品牌资产提取流程（5 步流程/失败处理/brand-spec 摘要格式）、Artifact 结构检查（HTML 完整性/CSS token 一致性/可访问性基线）、自检迭代详细清单和迭代修正规则、验证出错处理（报告自相矛盾/评分与描述不符/Quick Wins 真实性）、审查报告模板深度展开

## MODIFIED Requirements

### Requirement: References 路由表

SKILL.md 的 References 路由表从 7 个文件映射更新为 4 维映射。

旧映射：
| 任务 | 读 |
|------|-----|
| 反 AI slop、内容规范 | content-guidelines.md |
| 没有设计上下文怎么办 | design-context.md |
| 需求模糊要推荐风格方向 | design-styles.md |
| 设计评审详细参考 | critique-guide.md |
| 审查报告验证与自检 | verification.md |
| 需要设计系统参考基线 | design-systems-baseline.md |

新映射：
| 维度 | 根本问题 | 读 |
|------|---------|-----|
| 设计哲学 | 我信什么？ | references/philosophy.md |
| 设计美学 | 我怎么判断好不好？ | references/aesthetics.md |
| 设计系统 | 设计必须遵守什么规则？ | references/design-system.md |
| 设计实现 | 我怎么做审查？ | references/implementation.md |

## REMOVED Requirements

### Requirement: 旧 references 文件结构
**Reason**: 按 7 个能力模块组织的文件结构被四维结构替代
**Migration**: 内容迁移至 4 个新 references 文件，无内容丢失
