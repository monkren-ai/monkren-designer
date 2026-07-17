---
name: interaction-states-pass
description: |
  交互状态完整性检查。逐个 interactive element 检查 6 种状态（default/hover/active/disabled/focus/loading）+ transition + action feedback，补全缺失状态。
  触发词：「交互状态」「interaction states」「状态检查」「hover/active/focus」「状态完整性」。
---

# 交互状态完整性检查

验证 interactive element 是否具备与其行为相关的状态、transition 和反馈。默认只报告；仅在用户明确要求修复时补全缺失项。并非每个元素都需要 disabled 或 loading，只有存在对应业务状态时才检查它们。

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

## Phase 5：报告或修复

默认报告每个缺失或不清晰的状态，并引用现有 design system。用户明确要求修复时才使用系统 token 补全；系统未定义状态时，优先延续已有视觉语言，而不是机械套用 transform、opacity 或固定时长。无障碍 focus 必须清晰可见，并尊重 `prefers-reduced-motion`。

总结：盘点的元素、按类别添加的状态、添加或规范化的 transition、添加的反馈、用户应复审的判断取舍。
