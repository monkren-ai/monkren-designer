# 项目全面审查 Spec

## Why

经过两轮迭代（定位转换 + OD 增强），monkren-design 的文档体系已大幅扩展，但文档间存在不一致、遗漏和冗余，需要一次系统性的全面审查来确保质量。README 仍停留在旧版 4 步工作流、缺少新增能力描述；SKILL.md 与 references 之间有术语/结构/编号不统一；references 之间有内容重叠和交叉引用断裂。

## What Changes

- **同步 README.md / README.en.md**：更新工作流为 6 步、补充新增能力（SVG 雷达图/评分纪律/品牌资产提取协议/Artifact 结构检查/P0-P1-P2 分级/自审迭代/设计系统参考基线）、更新仓库结构
- **统一 SKILL.md 与 references 术语**：Step 编号对齐（SKILL.md Step 0-5 vs workflow.md Step 0-5）、评级标签统一（Broken/Functional/Strong/Exceptional vs 中文描述）
- **消除 references 间内容重叠**：critique-guide.md 的"评分纪律"与 SKILL.md 的"评分纪律"内容高度重复需精简、verification.md 的"自审迭代"与 SKILL.md Step 5 重复需精简
- **修复交叉引用断裂**：critique-guide.md 版本日期过旧（2026-02-13）、design-context.md 标题仍含"Phase 7"旧编号、SKILL.md 设计方向顾问表格中 20 种哲学与 design-styles.md 实际内容不匹配（SKILL.md 列的是 IBM/Bloomberg/Vignelli 等，design-styles.md 实际是 Stamen/Fathom/Locomotive 等）
- **补充缺失内容**：README 仓库结构缺少 design-systems-baseline.md、content-guidelines.md 中的 CSS 硬编码 `#666` 应替换为 token

## Impact

- Affected specs: README.md、README.en.md、SKILL.md、references/critique-guide.md、references/design-context.md、references/content-guidelines.md、references/verification.md、references/workflow.md
- Affected code: 无代码文件，全部为 Markdown 文档

## ADDED Requirements

### Requirement: README 同步更新

README.md 和 README.en.md 必须反映项目当前实际能力。

#### Scenario: README 工作流与 SKILL.md 一致
- **WHEN** 用户阅读 README
- **THEN** 审查工作流描述为 6 步（审查前发现 → 提取设计上下文 → 品牌资产提取 → 执行审查 → 输出报告 → 自检迭代），而非旧的 4 步

#### Scenario: README 能力列表包含新增项
- **WHEN** 用户阅读 README
- **THEN** 能力列表包含：SVG 雷达图可视化报告、评分纪律铁律、品牌资产提取协议、Artifact 结构检查、P0/P1/P2 严重度分级、自审迭代机制、设计系统参考基线

#### Scenario: README 仓库结构包含新文件
- **WHEN** 用户阅读 README
- **THEN** 仓库结构列出 design-systems-baseline.md

### Requirement: 术语统一

SKILL.md 与所有 references 文件之间的术语必须一致。

#### Scenario: Step 编号一致
- **WHEN** 对比 SKILL.md 和 workflow.md 的工作流
- **THEN** Step 编号完全一致（Step 0-5），无 Step 2.5 这种非标准编号

#### Scenario: 评级标签一致
- **WHEN** 对比 SKILL.md 和 critique-guide.md 的评级体系
- **THEN** 评级标签统一（Broken/Functional/Strong/Exceptional 或中文描述，二选一，全文统一）

### Requirement: 设计哲学表格与实际内容对齐

SKILL.md 中的 20 种设计哲学表格必须与 design-styles.md 的实际内容一致。

#### Scenario: 哲学名称和流派一致
- **WHEN** 对比 SKILL.md 的设计方向顾问表格和 design-styles.md 的 20 种哲学
- **THEN** 每种哲学的名称、所属流派完全一致

## MODIFIED Requirements

### Requirement: references 内容去重

references 子文档应作为 SKILL.md 的深度展开，而非内容复制。SKILL.md 已有的章节，references 中应引用而非重复。

- critique-guide.md 的"评分纪律"章节：保留详细示例和说明，但开头注明"详见 SKILL.md「评分纪律」章节，此处为深度展开"
- verification.md 的"自审迭代"章节：保留详细自检清单，但开头注明"详见 SKILL.md Step 5「自检迭代」，此处为深度展开"
- workflow.md 的 Step 2.5 编号修正为正式 Step 编号

### Requirement: 过时信息更新

- critique-guide.md 版本日期更新为 2026-05-01
- design-context.md 移除"Phase 7"旧编号引用

## REMOVED Requirements

（无移除项）
