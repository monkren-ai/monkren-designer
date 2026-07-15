# 04 · 设计审查（Design Review）

> monkren 设计生命周期的**第 4 阶段**。审视做出来的东西——好不好、哪里有问题。

## 本阶段 skill

| Skill | 用途 | 何时用 |
|-------|------|--------|
| **[5-dim-review](./../standards)**（**核心**） | 5 维度评审 + 雷达图 | **默认**——任何审查请求都从这开始 |
| [ai-slop-check](./ai-slop-check/) | 9 类 AI 化信号 | 用户明确问"是不是 AI slop" |
| [accessibility-audit](./accessibility-audit/) | 无障碍 / WCAG 审计 | 涉及可访问性的设计 |
| [hierarchy-rhythm-review](./hierarchy-rhythm-review/) | 视觉层级 / 节奏审查 | 排版、视觉流动问题 |
| [interaction-states-pass](./interaction-states-pass/) | 交互状态审查 | 按钮 / 表单 / 状态的完整性 |
| [polish-pass](./polish-pass/) | 细节打磨 | 像素级精度问题 |

> **5-dim-review** 是核心方法，详细定义在 `references/methods-review.md` 和 `references/standards.md`，不作为独立 skill 文件存在。

## 阶段问什么

- **做出来好不好**？——按 5 维度评分
- **哪里有问题**？——定位到文件 / 行号 / 元素

## 核心方法

- **5 维度评审** + **4 条评分纪律**是 monkren 的设计品味标尺
- 每个评分必须有引证（"哲学一致性 7/10，因为 hero 文案和 footer 文案的字体对比过于同质——hero 是 Victor Serif 32pt，footer 是 Lausanne 16pt，没有形成 hierarchy"）
- 创新性允许低分（5/10 对生产交付物合理）

## 阶段产物

- 5 维度雷达图
- 严重度分级报告（P0 blocker / P1 high / P2 medium / P3 low）
- 具体修复建议（每条建议引用文件 + 行号 + 元素）

## 反馈循环

- 审查不通过 → 回到 **02 创作定义**（方向错了）
- 审查通过但有 P0 修复项 → 进入 **05 设计改进**
