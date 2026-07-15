<sub>🌐 <a href="README.en.md">English</a> · <b>中文</b></sub>

> 当前版本：**v6.0** / 2026-07-15 / 架构：**1 个设计智能体 + 5 阶段设计生命周期** + 5 维度评审 + 4 条评分纪律

<div align="center">

# Monkren

> *「1 个设计智能体 · 5 阶段设计生命周期。」*
> *"One design agent. Five design stages. Same design taste across the whole arc."*

[![License](https://img.shields.io/badge/License-Personal%20Use%20Only-orange.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-blueviolet)](https://skills.sh)
[![Skills](https://img.shields.io/badge/skills.sh-Compatible-green)](https://skills.sh)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://monkren-ai.github.io/monkren-designer/)

<br>

**在你的 agent 里直接说话。**

<br>

🌐 **在线预览**：<https://monkren-ai.github.io/monkren-designer/>

<br>

1 个设计智能体覆盖 5 阶段设计生命周期：**调研定义 → 创作定义 → 设计执行 → 设计审查 → 设计改进**。**5 阶段可迭代**——审查不通过回到创作定义，改进后产生新需求回到调研定义。**同一个设计品味**贯穿全程。

```

npx skills add monkren-ai/monkren-designer
```

[快速开始](#快速开始) · [5 阶段路由](#5-阶段路由) · [5 维度 + 4 纪律](#5-维度--4-纪律) · [v5.x → v6.0 变更](#v5x--v60-变更) · [仓库结构](#仓库结构)

</div>

---

## 快速开始

```bash
npx skills add monkren-ai/monkren-designer
```

装上后，在你的 agent 里直接说：

```
> 帮我调研这个领域的设计方向
> 给 3 个设计变体方向
> 5 维度评审这个设计
> 修复这个设计（基于审查报告）
```

Monkren 自动路由到 5 阶段之一，输出可操作的产出。

**兼容 agent**：Claude Code · Cursor · Codex · OpenClaw · Hermes · CodeBuddy · Workbuddy

---

## 5 阶段路由

```
1 个设计智能体 · 5 阶段生命周期
═══════════════════════════════════════════
调研定义 ─→ 创作定义 ─→ 设计执行 ─→ 设计审查 ─→ 设计改进
   01         02          03          04          05
═══════════════════════════════════════════
                                                    ↺ 反馈循环
```

| # | 阶段 | 问什么 | 主要 skill |
|---|------|-------|----------|
| 1 | **调研定义** | 现状 / 约束 / 方向 | design-research · design-brainstorm · visual-taste-lab · discovery-questions · frontend-aesthetic-direction · quick-references |
| 2 | **创作定义** | 做什么 / 选哪个 | generate-variations · wireframe |
| 3 | **设计执行** | 怎么做出来 | make-a-prototype |
| 4 | **设计审查** | 做出来好不好 | 5-dim-review（核心） · ai-slop-check · accessibility-audit · hierarchy-rhythm-review · interaction-states-pass · polish-pass |
| 5 | **设计改进** | 怎么修 | design-improve |

| 你说 | 阶段 | 路由到 |
|------|------|--------|
| 「调研 / 研究 / 头脑风暴 / 查参考」 | 调研定义 | `01-research/*` |
| 「线框 / lo-fi 探索 / 3+ 设计方向」 | 创作定义 | `02-create/*` |
| 「做个原型 / 高保真 / 可交互 demo」 | 设计执行 | `03-execute/*` |
| 「5 维度评审 / 审查 / 反 slop / 无障碍 / 节奏 / 交互状态 / polish」 | 设计审查 | `04-review/*` |
| 「修复 / 改进这个设计」 | 设计改进 | `05-improve/design-improve` |

> **5 阶段可迭代**：审查不通过 → 回到创作定义。改进后产生新需求 → 回到调研定义。线性是默认，迭代是常态。

完整路由逻辑见 [SKILL.md §2](SKILL.md#2-5-阶段路由表)。

---

## 5 维度 + 4 纪律

### 5 维度评审（贯穿全阶段）

| 维度 | 问什么 |
|------|-------|
| **哲学一致性** | 设计是否体现了明确的视觉哲学 |
| **视觉层级** | 用户视线是否自然流动 |
| **细节执行** | 对齐/间距/颜色是否像素级精确 |
| **功能性** | 每个元素是否服务于目标 |
| **创新性** | 是否避免了 cliché |

### 4 条评分纪律（铁律 · 贯穿全阶段）

1. **禁止评分通胀**——全维度 ≥7 时强制自检
2. **禁止平均上浮**——取最差持续段而非平均值
3. **评分必须引证**——必须引用文件 / 行号 / 元素
4. **创新性允许低分**——5/10 对生产交付物合理

> 这 4 条是 monkren 的诚实底线。**99% 的 review tool 是 checklist，monkren 是 judgment。**

完整标准见 [references/standards.md](references/standards.md)。

---

## v5.x → v6.0 变更

| 维度 | v5.0 | v5.1 | v5.1.1 | **v6.0** |
|------|------|------|--------|----------|
| **架构** | 3 段路由 | 2 大类（审查 + 创作） | 2 大类 + slop framing 修正 | **1 智能体 + 5 阶段生命周期** |
| **阶段数** | 3 段 | 2 大类 | 2 大类 | **5 阶段**（调研 / 创作 / 执行 / 审查 / 改进） |
| **物理结构** | skills/{create, discover, define, review, deliver, tools} | 同 v5.0 | 同 v5.0 | **skills/{01-research, 02-create, 03-execute, 04-review, 05-improve, tools, _deprecated}** |
| **活跃 skill** | 3 个 | 6 个 | 6 个 | **15 个**（6 + 2 + 1 + 5 + 1） |
| **Wireframe** | DEPRECATED | DEPRECATED | DEPRECATED | **复活（创作定义阶段）** |
| **DEPRECATED** | 8 个 | 5 个 | 5 个 | **4 个**（移入 _deprecated/） |
| **Tagline** | "AI 设计的 slop 检测器" | "设计审查与创作改进" | 同 v5.1 | **"1 个设计智能体 · 5 阶段设计生命周期"** |
| **Unifying principle** | "反 slop" | "设计品味 applied forward and backward" | 同 v5.1 | **"1 智能体 + 5 阶段，1 个 taste 贯穿"** |

> **v6.0 关键转变**：v5.x 把项目当作 "工具集合"（2 大类 / 3 段路由）——用户进来不知道下一步。v6.0 把它当作 **1 个完整的设计智能体**——用户提交需求，monkren 走完 5 阶段，每阶段调用对应 skill。**5 阶段可迭代**而非纯线性。

完整策略见 [case/Project Strategy — Design Review.html](case/Project%20Strategy%20%E2%80%94%20Design%20Review.html)。

---

## 仓库结构

```
monkren-designer/
├── README.md                  ← 你在这里
├── SKILL.md                   ← agent 入口（1 智能体 + 5 阶段 + 5 维度 + 4 纪律）
├── index.html                 ← 在线预览（v6.0）
├── LICENSE
├── case/                      ← 真实审查报告（4 份）
│   ├── Design Review — Landing Page.html
│   ├── Score Improvement — Landing Page.html
│   ├── Design Suggestion — Landing Page.html
│   └── Project Strategy — Design Review.html
├── references/                ← 知识图谱（9 份）
│   ├── beliefs.md             ← 公开
│   ├── standards.md           ← 公开
│   ├── methods-review.md      ← 公开
│   ├── integration.md         ← INTERNAL
│   ├── perspectives.md        ← INTERNAL
│   ├── platforms.md           ← INTERNAL
│   ├── philosophy-library.md  ← INTERNAL
│   ├── methods-create.md      ← INTERNAL
│   └── execution.md           ← INTERNAL
├── skills/                    ← skill 矩阵（v6.0 · 5 阶段）
│   ├── 01-research/           ← 调研定义（6 skills）
│   │   ├── design-research/
│   │   ├── design-brainstorm/
│   │   ├── quick-references/
│   │   ├── discovery-questions/
│   │   ├── frontend-aesthetic-direction/
│   │   ├── visual-taste-lab/
│   │   └── README.md
│   ├── 02-create/             ← 创作定义（2 skills）
│   │   ├── generate-variations/
│   │   ├── wireframe/         ← v6.0 复活
│   │   └── README.md
│   ├── 03-execute/            ← 设计执行（1 skill）
│   │   ├── make-a-prototype/
│   │   └── README.md
│   ├── 04-review/             ← 设计审查（5 skills）
│   │   ├── 5-dim-review/      ← （main method，方法层定义在 references/）
│   │   ├── ai-slop-check/
│   │   ├── accessibility-audit/
│   │   ├── hierarchy-rhythm-review/
│   │   ├── interaction-states-pass/
│   │   ├── polish-pass/
│   │   └── README.md
│   ├── 05-improve/            ← 设计改进（1 skill）
│   │   ├── design-improve/
│   │   └── README.md
│   ├── tools/                 ← 跨阶段工具
│   │   ├── add-inspo-source/
│   │   ├── remove-inspo-source/
│   │   └── README.md
│   └── _deprecated/           ← 4 个边缘 create skill（DEPRECATED）
│       ├── component-extract/
│       ├── design-system-extract/
│       ├── make-a-deck/
│       ├── make-tweakable/
│       └── README-create-v5.md
└── assets/
    └── philosophy-images/     ← 80 张设计哲学参考图
```

---

## 许可证

本仓库采用 **Personal Use Only License**——个人使用免费，企业商用需获得书面授权。
详见 [LICENSE](LICENSE)。

---

**v6.0 · 2026-07-15** · 1 个设计智能体 · 5 阶段设计生命周期 · 同一个 taste 贯穿全程。
