---
name: interaction-states-pass
description: |
  交互状态完整性检查。逐个 interactive element 检查 6 种状态（default/hover/active/disabled/focus/loading）+ transition + action feedback，补全缺失状态。
  触发词：「交互状态」「interaction states」「状态检查」「hover/active/focus」「状态完整性」。
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - WebSearch
  - Agent
---

# 交互状态完整性检查

验证每个 interactive element 都有完整的状态集合（default、hover、active、disabled、focus、loading）外加 transition 和反馈；补全缺失项。**没有状态反馈的 interactive element 看起来是坏的**——没有 hover 的按钮看起来像 label；被移除的 focus ring 会把键盘用户锁在外面。这是设计展示给用户前的安全网。

## Phase 1：盘点 interactive element

遍历设计并列出每个 interactive element：按钮（包括 `role="button"` 和任何带 click handler 的元素）、链接、表单 input、toggle（checkbox、radio、switch）、可点击的卡片或行、导航项（tab、侧栏链接、breadcrumb）以及自定义 widget（dropdown、accordion、modal、popover）。

## Phase 2：逐元素状态验证

对每个元素检查全部六个方面。标记一切，包括边缘情况——对你不确定的发现，标注置信度，而不是默默丢弃。

1. **default。** 静止时明确可交互：按钮有区别于正文的填充或边框；链接看起来像链接；input 有可见边框或填充。标记那些只在 hover 时才显露交互性的元素——触摸和键盘用户从不 hover。
2. **hover。** 光标悬停时有视觉变化——至少有颜色变化；更好是颜色 + 阴影 + 轻微 transform（`translateY(-2px)`）。不要用降低 opacity 作为 hover；它读起来像 disabled。
3. **active / 按下。** 更深的颜色、轻微缩小（`transform: scale(0.98)`）或回到基线——在动作完成前确认点击已注册。
4. **disabled。** 降低 opacity（约 0.6），无 hover 效果，`cursor: not-allowed`，与 default 和 hover 都有区别。如果 disabled 是因为等待某个条件（"填写所有必填项"），要说明*原因*——tooltip、内联消息或 `title` 属性。
5. **focus。** 通过 `:focus-visible`（而非裸 `:focus`）提供可见 ring：与相邻背景达到 3:1 对比度，至少 2px 粗并带 2px 偏移。`outline: none` **绝不**在没有替代方案的情况下使用。
6. **loading**（针对触发异步工作的元素）。点击时禁用以防重复提交，把 label 换成 spinner 或"Loading…"，完成后恢复。渲染时获取的数据要有 skeleton、spinner 或进度指示器。

## Phase 3：验证 transition

每次状态变化都平滑过渡，而非突变（`transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease`）：

- **0.15–0.3s** 用于状态变化（hover、focus、active）；**0.3–0.5s** 用于进入/退出（modal、drawer、toast）
- 避免在微交互上超过 0.5s（卡顿）以及 0s / 无 transition（坏掉）
- 把动效密集的 transition 包进 `@media (prefers-reduced-motion: reduce)`

## Phase 4：验证动作反馈

每个动作都显示可见结果：提交成功（toast、内联消息或带确认的跳转）、提交失败（清晰的错误，字段相关时关联到字段）、校验错误（在 blur 或 submit 时出现，修复后清除）、状态变化（即时的视觉更新）。标记静默成功和静默失败——两者都让人感觉坏掉了。

当前状态也要可见：当前页面或 tab、选中项、激活的筛选或排序都要在视觉上有区别。

## Phase 5：应用修复并总结

使用 design system 的 token 补全每个缺失的状态或反馈元素。当系统未定义某状态时，使用：hover 加深 10–15%（或 `color-mix`）；active 再加深 10% 或 `scale(0.98)`；disabled 用 opacity 0.6 + `cursor: not-allowed`；focus 用 `outline: 2px solid var(--color-primary); outline-offset: 2px`；transition 用 `0.2s ease`。当正确状态不明显时（例如 toggle 按钮在 active 状态下的 hover），做出判断取舍并记录。

总结：盘点的元素、按类别添加的状态、添加或规范化的 transition、添加的反馈、用户应复审的判断取舍。
