---
name: monkren-design
description: 设计全生命周期协作技能。用于设计调研、需求定义、线框与变体探索、可交互原型、五维度审查、设计改进，以及通过“第一性原理 × 产品品味”获得重大产品设计决策的只读第二意见。用户提到设计、UI、UX、方向、线框、原型、评审、改进、AI slop、次设计 agent、第二意见或“这个方向该不该做”时使用；审查和决策咨询默认只读，只有用户明确要求修复或实现时才修改文件。
---

# Monkren Design

以同一套设计品味覆盖调研、创作、执行、审查与改进。先识别用户当前所处阶段，只加载该阶段需要的模块；不要把五个阶段机械地全部执行。

## 权限边界

- **调研、解释、建议、审查、评审、audit、review**：只读分析并输出报告，不修改用户文件。
- **修复、改进、实现、制作、生成、build、create**：允许在用户给定范围内修改文件，并按风险运行验证。
- 用户同时要求“审查并修复”时，先给出发现，再实施可确定的修复；需要产品判断的项目保留为未决项。
- 不假设某个 agent、浏览器、MCP 或子 agent 工具存在。先检查当前可用能力；不可用时使用本地、顺序或纯文本降级路径。

## 路由协议

1. 根据下表选择**一个主模块**。必要时最多追加两个专项模块。
2. 完整读取所选模块的 `SKILL.md`，按其流程执行。
3. 模块指令与本文件的权限边界冲突时，以本文件为准。
4. 模块引用详细标准时，按需读取 `references/`，不要一次加载全部知识库。

| 用户意图 | 主模块 |
|---|---|
| 设计研究、竞品、最佳实践 | `skills/01-research/design-research/SKILL.md` |
| 快速找视觉参考 | `skills/01-research/quick-references/SKILL.md` |
| 跨领域头脑风暴 | `skills/01-research/design-brainstorm/SKILL.md` |
| 项目启动、需求澄清 | `skills/01-research/discovery-questions/SKILL.md` |
| 无品牌时确定美学方向 | `skills/01-research/frontend-aesthetic-direction/SKILL.md` |
| 从参考提炼视觉语言 | `skills/01-research/visual-taste-lab/SKILL.md` |
| 低保真线框、布局探索 | `skills/02-create/wireframe/SKILL.md` |
| 三个以上设计方向 | `skills/02-create/generate-variations/SKILL.md` |
| 可交互高保真原型 | `skills/03-execute/make-a-prototype/SKILL.md` |
| 一般设计审查、深度审查 | `skills/04-review/5-dim-review/SKILL.md` |
| AI 化痕迹 | `skills/04-review/ai-slop-check/SKILL.md` |
| WCAG、无障碍 | `skills/04-review/accessibility-audit/SKILL.md` |
| 视觉层级、节奏 | `skills/04-review/hierarchy-rhythm-review/SKILL.md` |
| hover、focus、loading 等状态 | `skills/04-review/interaction-states-pass/SKILL.md` |
| 交付前综合质量门 | `skills/04-review/polish-pass/SKILL.md` |
| 根据报告修复设计 | `skills/05-improve/design-improve/SKILL.md` |
| 添加或移除灵感源 | `skills/tools/add-inspo-source/SKILL.md` / `skills/tools/remove-inspo-source/SKILL.md` |
| 次设计 agent、第二意见、重大产品设计取舍 | `skills/advisors/design-decision-council/SKILL.md` |

## 次设计 agent 协议

`design-decision-council` 是跨阶段 advisor，不是第六阶段，也不是独立安装入口。

- **显式触发**：用户提到“次设计 agent”“第二意见”“第一性原理 × 产品品味”或“这个方向该不该做”。
- **自动触发**：重大方向选择、高成本实现、难逆架构或品牌决策、审查修复相互冲突、交付前关键取舍。
- **不触发**：普通视觉微调、明确小修、纯执行任务，或一般人生、组织和投资问题。
- advisor 始终只读。用户同时要求实现时，先由 advisor 给出决策，再由主阶段模块在既有权限边界内实施。
- 一次任务仍选择一个主阶段模块；advisor 只作为第二意见追加，不替代主模块。

## 共享标准

- 评分标准与纪律：`references/standards.md`
- 审查方法：`references/methods-review.md`
- 创作方法：`references/methods-create.md`
- 产出格式：`references/execution.md`
- 设计信念：`references/beliefs.md`
- 平台、哲学与多视角资料只在任务需要时读取：`references/platforms.md`、`references/philosophy-library.md`、`references/perspectives.md`

### 五维度

1. 哲学一致性
2. 视觉层级
3. 细节执行
4. 功能性
5. 创新性

### 四条评分纪律

1. 全维度均高于或等于 7 时，强制寻找反证。
2. 按最差的持续体验评分，不用平均值掩盖问题。
3. 每个分数必须引用文件、行号、元素或可观察证据。
4. 生产型设计的创新性 5/10 可以合理，不为好看而抬分。

## 交付约定

- 审查输出先列按严重级别排序的发现，再给简短总评。
- 创作输出说明生成文件、已验证行为、模拟数据和仍需用户决定的事项。
- 不编造客户、指标、品牌资产或产品状态；缺失内容使用明确 placeholder。
- 不要求用户安装某个第三方工具才能得到基本结果。增强工具不可用时继续完成可降级的核心任务。

**版本**：v6.2 / **更新日期**：2026-07-17
