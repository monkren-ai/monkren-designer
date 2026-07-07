---
name: make-a-prototype
description: |
  可交互原型制作。7 个 phase 覆盖交互目标确认/技术选型/核心流程搭建/状态管理/响应式适配/可访问性/打磨交付，输出单文件 HTML 原型。触发词：「原型」「prototype」「交互原型」「可点击」「interactive demo」「做个原型」。
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - WebSearch
  - AskUserQuestion
---

# Make a Prototype：可交互 clickable prototype

搭建一个可工作的可交互 prototype——可点击、可导航、有真实 state 和反馈。当用户要求 prototype、mockup、demo 或「做成可交互的」时使用。**Prototype 是要交互的**——用 `<a>` 标签串起来的静态截图不算数；关键是用真实的点击、输入、校验、成功、失败来测试流程。

## Phase 1：Discovery

构建前确认：**流程**（屏幕、入口、目标状态——列成清单）；**精细度**（hi-fi 还是 mid-fi）；**设备框**（桌面浏览器、iOS、Android、macOS 窗口）；**变体**（一条流程还是几条用来对比）；**brand / design system**（务必确认——若没有，先调 `frontend-aesthetic-direction`）；**示例数据**（看起来真实的内容，不要 Lorem ipsum）。

## Phase 2：梳理屏幕与 state

构建前先把流程写下来，作为注释块放进文件，让用户看到计划：

```
Screens:
  1. Welcome — "Get started" CTA → 2
  2. Email entry — 校验格式 → 有效则 3，无效则 inline 错误
  3. Profile — 姓名、照片上传 → 4
  4. Success — "You're in" → 1（循环演示）

State:
  - currentScreen: 1
  - email: ""
  - emailError: null
```

## Phase 3：逐屏搭建

每一屏：挂载到 DOM（display 切换或单页内的 React state）；hi-fi 视觉匹配 design system——真实组件，不是通用方框；看起来合理的真实内容（真实姓名、产品文案、数字）；每屏一个主要 CTA，次要动作更小更弱。

通过 `copy_starter_component` 选对设备框：`ios_frame.jsx`、`android_frame.jsx`、`macos_window.jsx` 或 `browser_window.jsx`。框固定不动；prototype 生活在框内。

## Phase 4：接通交互

每个交互都要接通，不只是 happy path：

- **导航。** 主要 CTA 前进，返回向后走，state 跨屏保留。
- **表单校验。** 空提交 → inline 错误；格式错误 → 绑定到具体字段的错误；有效 → 继续。
- **Loading 状态。** 异步动作显示 loading 指示并禁用 button 防止重复提交。用 `setTimeout` 模拟延迟——不要因为工作是假的就跳过 loading 状态；这正是被测试的一部分。
- **成功与错误反馈。** Toast、inline 确认或页面切换；错误要清除并绑定到对应字段或动作。
- **State 变更。** toggle、select、filter 都立即更新 UI。

## Phase 5：子 state 与持久化

让有意义的子 state 响应：选中态、filter/sort 态、modal/dropdown 打开态（焦点移入 modal，Escape 关闭）、表单值与错误。

把重要的东西通过 `localStorage` 跨刷新持久化：当前屏、表单草稿、tweak 值（见 `make-tweakable`）。迭代过程中刷新是最常见的用户动作之一——活不过刷新的 state 会让 prototype 显得是坏的。

## Phase 6：Verify

在 preview 里走完整流程：每个 CTA 都通向某处、每个表单都校验、每个错误都清晰可恢复、每个异步动作都有反馈、每个 state 变更都可见、键盘导航可用（Tab 切换、Enter 提交、Escape 关闭）、焦点可见。如果某个行为你无法验证，就在总结里说明，而不是声称成功。

## Phase 7：变体（若被要求）

把变体作为 tweak 暴露在浮动面板里（`make-tweakable`）、在 canvas 上并排（`design_canvas.jsx` starter），或作为 prototype 内的 toggle。**不要把 v1.html / v2.html / v3.html 散落到项目各处——一个文件，多种变体。**

简要总结：哪些流程可用、什么是假的（例如「submit 调了一个 setTimeout 假实现」）、什么留给用户决定。
