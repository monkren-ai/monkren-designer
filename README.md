<sub>🌐 <a href="README.en.md">English</a> · <b>中文</b></sub>

> 当前版本：**v5.0** / 2026-07-15 / 架构：**3 段路由 + 5 维度评审 + 4 条纪律**

<div align="center">

# Monkren

> *「你的 AI 设计的 slop 检测器。」*
> *"An AI slop detector for your designs."*

[![License](https://img.shields.io/badge/License-Personal%20Use%20Only-orange.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-blueviolet)](https://skills.sh)
[![Skills](https://img.shields.io/badge/skills.sh-Compatible-green)](https://skills.sh)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://monkren-ai.github.io/monkren-designer/)

<br>

**在你的 agent 里直接说话。**

<br>

🌐 **在线预览**：<https://monkren-ai.github.io/monkren-designer/>

<br>

提交一个设计——截图、HTML、代码、Figma。Monkren 用 **5 维度评审** + **反 AI slop 黑名单** + **硬编码值检测**，30 秒告诉你是 *insanely great* 还是 *AI 训练语料的最大公约数*。

```
npx skills add monkren-ai/monkren-designer
```

[快速开始](#快速开始) · [3 段路由](#3-段路由) · [5 维度 + 4 纪律](#5-维度--4-纪律) · [v4.0 → v5.0 变更](#v40--v50-变更) · [仓库结构](#仓库结构)

</div>

---

## 快速开始

```bash
npx skills add monkren-ai/monkren-designer
```

装上后，在你的 agent 里直接说：

```
> 这个设计是不是 AI slop？
> 扫描这段代码里的硬编码颜色、字体、间距
> 5 维度评审这个落地页
```

Monkren 自动路由到 3 段能力之一，输出可操作的修复建议。

**兼容 agent**：Claude Code · Cursor · Codex · OpenClaw · Hermes · CodeBuddy · Workbuddy

---

## 3 段路由

| 你问 | 路由到 | 输出 |
|------|-------|------|
| 「这个设计是不是 AI slop？」 | `slop-check` | 9 类 slop 痕迹逐项检查 + 严重度 |
| 「扫描硬编码值」 | `hardcode-scan` | 颜色/字体/间距硬编码清单 + token 替换建议 |
| 「5 维度评审 / 审查这个设计」 | `5-dim-review` | 5 维度雷达图 + 评分纪律 + 修复路径 |

> 模糊请求默认走 `5-dim-review`（最完整）。
> 多意图请求：先 `hardcode-scan`（最快），再 `5-dim-review`（最全），`slop-check` 作为补充。

完整路由逻辑见 [SKILL.md §1](SKILL.md#1-三段路由)。

---

## 5 维度 + 4 纪律

### 5 维度评审

| 维度 | 问什么 |
|------|-------|
| **哲学一致性** | 设计是否体现了明确的视觉哲学 |
| **视觉层级** | 用户视线是否自然流动 |
| **细节执行** | 对齐/间距/颜色是否像素级精确 |
| **功能性** | 每个元素是否服务于目标 |
| **创新性** | 是否避免了 cliché |

### 4 条评分纪律（铁律）

1. **禁止评分通胀**——全维度 ≥7 时强制自检
2. **禁止平均上浮**——取最差持续段而非平均值
3. **评分必须引证**——必须引用文件 / 行号 / 元素
4. **创新性允许低分**——5/10 对生产交付物合理

> 这 4 条是 monkren 的诚实底线。**99% 的 review tool 是 checklist，monkren 是 judgment。**

完整标准见 [references/standards.md](references/standards.md)。

---

## v4.0 → v5.0 变更

| 维度 | v4.0 | v5.0 |
|------|------|------|
| **架构** | 5 阶段 21-skill 矩阵 | 3 段路由 + 5 维度评审 |
| **定位** | 双重身份（审查员 + 创作者） | 单一身份（AI slop 检测器） |
| **Create skill** | 8 个（wireframe / 原型 / 变体 / deck / tweakable / token / 组件 / improve） | **DEPRECATED**——打不过 Bolt / v0 / Cursor，6 个月后无使用则删除 |
| **Reference** | 9 份 | 3 份公开（beliefs / standards / methods-review） + 6 份 INTERNAL |
| **Landing page** | 9 个 section / 3401 行 / 140KB | 4 个 section / 362 行 / 16.7KB |
| **Tagline** | "设计智能体" | "AI 设计的 slop 检测器" |

完整策略见 [case/Project Strategy — Design Review.html](case/Project%20Strategy%20%E2%80%94%20Design%20Review.html)。

---

## 仓库结构

```
monkren-designer/
├── README.md                  ← 你在这里
├── SKILL.md                   ← agent 入口（3 段路由 + 5 维度 + 4 纪律）
├── index.html                 ← 在线预览（v5.0，4 section）
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
├── skills/                    ← skill 矩阵
│   ├── discover/              ← 调研阶段
│   ├── define/                ← 定义阶段
│   ├── create/                ← [DEPRECATED] 创作阶段
│   ├── review/                ← 审查阶段
│   ├── deliver/               ← 交付阶段
│   └── tools/                 ← 工具
└── assets/
    └── philosophy-images/     ← 80 张设计哲学参考图
```

---

## 许可证

本仓库采用 **Personal Use Only License**——个人使用免费，企业商用需获得书面授权。
详见 [LICENSE](LICENSE)。

---

**v5.0 · 2026-07-15** · 砍 80%，做 1,000 songs in your pocket。
