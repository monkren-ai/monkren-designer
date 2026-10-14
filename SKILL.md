---
name: monkren-design
description: 协助 UI/UX 设计调研、视觉方向、线框与方案比较、交互原型、设计审查和改进，并为重大产品设计取舍提供第二意见。用于具体界面、品牌与用户流程任务；一般产品讨论、纯代码审查或无关“设计”请求不触发。建议与审查默认只读，制作与修复按用户范围执行。
---

# Monkren Design

以同一套设计品味覆盖调研、创作、执行、审查与改进。先识别用户当前所处阶段，只加载该阶段需要的模块；不要把五个阶段机械地全部执行。

## 权限边界

- **调研、解释、建议、审查、评审、audit、review**：默认只读，在对话中交付，不自动保存报告。用户要求保存或导出时，只写所需报告文件。
- **修复、改进、打磨、实现、制作、生成、build、create**：在用户给定范围内修改文件，并按风险运行验证。“如何改进”“给建议”仍是咨询；根据整句意图判断，不机械匹配单词。既有授权持续有效，不要求追加固定确认措辞。
- 用户同时要求“审查并修复”时，先给出发现，再实施可确定的修复；需要产品判断的项目保留为未决项。
- 不假设某个 agent、浏览器、MCP 或子 agent 工具存在。先检查当前可用能力；不可用时使用本地、顺序或纯文本降级路径。

## 路由协议

1. 根据当前交付目标选择**一个主模块**，必要时追加直接相关的专项；综合质量检查可按其编排覆盖四个检查面，不递归启动更多编排。明确的局部修复直接进入改进模块。
2. 完整读取所选模块的 `SKILL.md`，按其流程执行。
3. 用户明确要求优先；入口定义范围与权限，模块定义流程，共享标准维护判断依据。工具能力服从当前环境，不把可选工具当作前置依赖。
4. 模块引用详细标准时，按需读取相关小节，不一次加载全部知识库。此文件的路径相对技能根目录；模块中的相对链接从模块目录解析。
5. 交接只携带目标、范围、设计基线、决定、发现和未验证项；已读上下文复用，不重新问一轮。达到所需交付即停止，不自动跑完整生命周期。

| 用户意图 | 主模块 |
|---|---|
| 设计研究、竞品、最佳实践 | `skills/01-research/design-research/SKILL.md` |
| 快速找视觉参考 | `skills/01-research/quick-references/SKILL.md` |
| 跨领域头脑风暴 | `skills/01-research/design-brainstorm/SKILL.md` |
| 项目启动、需求澄清 | `skills/01-research/discovery-questions/SKILL.md` |
| 无品牌时确定美学方向 | `skills/01-research/frontend-aesthetic-direction/SKILL.md` |
| 从参考提炼视觉语言 | `skills/01-research/visual-taste-lab/SKILL.md` |
| 低保真线框、布局探索 | `skills/02-create/wireframe/SKILL.md` |
| 多个方案、两个方案或风格对比 | `skills/02-create/generate-variations/SKILL.md` |
| 可交互高保真原型 | `skills/03-execute/make-a-prototype/SKILL.md` |
| 一般设计审查、深度审查 | `skills/04-review/5-dim-review/SKILL.md` |
| AI 化痕迹 | `skills/04-review/ai-slop-check/SKILL.md` |
| WCAG、无障碍 | `skills/04-review/accessibility-audit/SKILL.md` |
| 视觉层级、节奏 | `skills/04-review/hierarchy-rhythm-review/SKILL.md` |
| hover、focus、loading 等状态 | `skills/04-review/interaction-states-pass/SKILL.md` |
| 交付前检查、综合打磨 | `skills/04-review/polish-pass/SKILL.md` |
| 局部优化、直接修复或根据报告改进 | `skills/05-improve/design-improve/SKILL.md` |
| 添加或移除灵感源 | `skills/tools/add-inspo-source/SKILL.md` / `skills/tools/remove-inspo-source/SKILL.md` |
| 次设计 agent、第二意见、重大产品设计取舍 | `skills/advisors/design-decision-council/SKILL.md` |

## 次设计 agent 协议

`design-decision-council` 是跨阶段 advisor，不是第六阶段，也不是独立安装入口。

- **显式触发**：用户提到“次设计 agent”“第二意见”“第一性原理 × 产品品味”或“这个方向该不该做”。
- **自动触发**：重大方向选择、高成本实现、难逆架构或品牌决策、审查修复相互冲突、交付前关键取舍。
- **不触发**：普通视觉微调、明确小修、纯执行任务，或一般人生、组织和投资问题。
- advisor 始终只读。用户同时要求实现时，先由 advisor 给出决策，再由主阶段模块在既有权限边界内实施。
- 有阶段产出时，advisor 只作为第二意见追加，不替代主模块；纯决策咨询直接用 advisor 回答，不强行加载阶段模块或实现。这里的“次设计 agent”是一种决策方法，不要求创建子代理。

## 共享标准

- 评分标准与纪律：`references/standards.md`
- 审查方法：`references/methods-review.md`
- 创作方法：`references/methods-create.md`
- 产出格式：`references/execution.md`
- 设计信念：`references/beliefs.md`
- 本仓库 `DESIGN.md` 只约束展示页与案例，不是所有客户产品的默认品牌。平台、哲学与多视角资料只在任务需要时读取：`references/platforms.md`、`references/philosophy-library.md`、`references/perspectives.md`

### 五维度

1. 哲学一致性
2. 视觉层级
3. 细节执行
4. 功能性
5. 创新性

### 四条评分纪律

1. 全维度均高于或等于 7 时，强制寻找反证；证据支持时保留高分，不强制降分。
2. 按最差的持续体验评分，不用平均值掩盖问题。
3. 每个分数必须引用文件、行号、元素或可观察证据；证据不足的维度标为未验证，不补造分数。
4. 生产型设计的创新性 5/10 可以合理，不为好看而抬分。

## 交付约定

- 审查输出先列按严重级别排序的发现，再给简短总评。
- 创作输出说明生成文件、已验证行为、模拟数据和仍需用户决定的事项。
- 不编造客户、指标、品牌资产或产品状态；缺失内容使用明确 placeholder。
- 不要求用户安装某个第三方工具才能得到基本结果。增强工具不可用时继续完成可降级的核心任务。

**版本**：v6.2 / **更新日期**：2026-07-17
