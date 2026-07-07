---
name: make-a-deck
description: |
  HTML 幻灯片制作。6 个 phase 覆盖叙事结构/版式系统/单页设计/键盘导航/响应式适配/打磨，输出可在浏览器全屏演示的 HTML deck。触发词：「幻灯片」「deck」「slides」「演示文稿」「HTML PPT」「做slides」。
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - WebSearch
  - AskUserQuestion
---

# Make a Deck：HTML 幻灯片演示

把幻灯片演示做成单个 HTML 文件，固定尺寸的 slide（通常 1920×1080，16:9）在任何 viewport 下都 letterbox 适配。当用户要求 deck、演示、slides 或 pitch 时使用。不要手搓缩放——用 deck shell starter。

## Phase 1：Discovery

构建前确认：**受众**（决定语气和密度）；**格式**（宽高比——默认 16:9——和 slide 数量：10 分钟的 deck 约 10 张，30 分钟的约 20–25 张）；**语气**（正式企业、随性内部、营销大胆、技术性）；**源内容**（画之前先读 PRD 或已有材料）；**演讲者备注**（默认关闭，仅在明确要求时开启）；**brand / design system**（务必确认——若没有，先调 `frontend-aesthetic-direction`）。

如果用户给足了上下文（例如「按这份 PRD 给工程全员会做 5 张 slide 的 deck」），跳过提问环节。

## Phase 2：规划版式系统

构建任何 slide 之前，先定下版式系统，并在文件顶部用注释块说清楚。一个典型的 deck 有 4–6 种版式：封面 / 标题、章节页（满铺色或图）、内容页（headline + 图表 / 图 / 列表）、引用 / 强调、对比 / 双栏、收尾 / CTA。每种：背景处理、headline 字号与位置、正文内容区、footer（页码、brand 标、无）。

整个 deck 限制在 **1–2 种背景色**；章节页可以破例用第三种，不能再多。

## Phase 3：搭建 deck shell

用 deck-shell starter（`copy_starter_component` 指定 `kind: "deck_stage.js"`）——它负责缩放 / letterbox、键盘与点击导航、slide 计数、localStorage 持久化、打印为 PDF 以及 `data-om-validate` 标记。每张 slide 是 `<deck-stage>` 的直接子级 `<section>`。

给每张 slide 一个 `data-screen-label`，方便用户评论时按名引用（`<section data-screen-label="01 Title">`）。**Label 从 1 开始计数**，与用户看到的 slide 计数对齐。

## Phase 4：逐张 slide 搭建

按顺序搭建，做完 1–2 张就给用户看——不要私下把 15 张都做完才亮出来。每张：

- **Type。** 1920×1080 画布上正文不低于 24px，理想是 32px+；headline 60–96px+。
- **层级。** 每张 slide 一个主信息；辅助元素更小更弱。
- **图片。** 来自 design system，或诚实的 placeholder（条纹背景、等宽字体标签）。不要手绘 SVG 填充物。
- **不要凑数 slide。** 「为什么选我们？」「关于本 deck」都在消耗用户注意力——砍掉。
- **图表。** 展示关键内容；砍掉不支持本 slide 观点的列和数据点。

用 design system 的 spacing 和 color token——不要 inline 新值。

## Phase 5：演讲者备注（仅在要求时）

被要求时：在 head 里加一个 `<script type="application/json" id="speaker-notes">` 数组，每张 slide 一条，写成完整的口语脚本（不是要点大纲）。带备注的 slide 可以少放屏幕文字。shell 会自动渲染它们。

## Phase 6：Verify 与交付

在 preview 里从头到尾走一遍 deck：多种 viewport 尺寸下缩放是否正常、计数是否正确递增、键盘导航（方向键、空格）是否工作、有没有溢出 slide 边界、字号是否满足 24px+ 下限、对比度是否过 WCAG（调用 `accessibility-audit` 做彻底检查）。

回合交付时，呈现最终 HTML 文件，并调用 verifier 子 agent 做彻底检查。简要总结：caveat（例如还需要的 placeholder 图片）、下一步（例如要替换的真实图表）、需要用户拍板的决策。
