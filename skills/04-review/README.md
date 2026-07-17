# 04 · 设计审查（Design Review）

> monkren 设计生命周期的**第 4 阶段**。审视做出来的东西——好不好、哪里有问题。

## 本阶段 skill

| Skill | 用途 | 何时用 |
|-------|------|--------|
| **[5-dim-review](./5-dim-review/)**（**核心**） | 5 维度评审 + 严重度报告 | **默认**——一般或深度审查从这里开始 |
| [ai-slop-check](./ai-slop-check/) | 9 类 AI 化信号 | 用户明确问"是不是 AI slop" |
| [accessibility-audit](./accessibility-audit/) | 无障碍 / WCAG 审计 | 涉及可访问性的设计 |
| [hierarchy-rhythm-review](./hierarchy-rhythm-review/) | 视觉层级 / 节奏审查 | 排版、视觉流动问题 |
| [interaction-states-pass](./interaction-states-pass/) | 交互状态审查 | 按钮 / 表单 / 状态的完整性 |
| [polish-pass](./polish-pass/) | 细节打磨 | 像素级精度问题 |

> **5-dim-review** 是可路由的核心 skill；详细方法与评分标准位于 `references/methods-review.md` 和 `references/standards.md`。

## 阶段问什么

- **做出来好不好**？——按 5 维度评分
- **哪里有问题**？——定位到文件 / 行号 / 元素

## 核心方法

- **5 维度评审** + **4 条评分纪律**是 monkren 的设计品味标尺
- 每个评分必须有引证（"哲学一致性 7/10，因为 hero 文案和 footer 文案的字体对比过于同质——hero 是 Victor Serif 32pt，footer 是 Lausanne 16pt，没有形成 hierarchy"）
- 创新性允许低分（5/10 对生产交付物合理）

## 阶段产物

- 5 维度评分与证据
- 严重度分级报告（P0 blocker / P1 high / P2 medium / P3 low）
- 具体修复建议（每条建议引用文件 + 行号 + 元素）

## 反馈循环

- 方向性问题 → 回到 **02 创作定义**
- 用户授权修复已确认问题 → 进入 **05 设计改进**
