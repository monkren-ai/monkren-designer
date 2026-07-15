---
name: polish-pass
description: |
  交付前质量门禁。编排 4 个并行审查 agent（accessibility-audit + ai-slop-check + hierarchy-rhythm-review + interaction-states-pass），聚合去重后按 blocker/quality/polish 三级优先级修复，作为交付前的最终质量门。
  触发词：「polish」「打磨」「交付前检查」「final check」「质量门」「polish pass」。
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - WebSearch
  - Task
---

# Polish Pass：设计交付前的质量门

在设计展示给利益相关者或交付之前，运行一次全面的质量检查。**一个打磨过的设计与一个未打磨的设计，是同一个想法在不同用心程度下的执行——而这段差距正是人们真正看到的。** 这是四个更窄审查 skill 的总纲；把它作为交付前的最终门禁。

## Phase 1：确认范围

打磨用户刚刚完成或询问的 HTML 文件；否则打磨项目的主交付物；如不明确，则询问。阅读它并记录媒介（slide / 页面 / 移动端 / dashboard）、部署上下文（内部 / 面向客户 / 营销），以及任何声明的约束。

如果设计明显还在进行中（布局破损、缺少区块、placeholder 内容仍在迭代），说明情况并询问是现在打磨还是等结构稳定后再做。

## Phase 2：并行启动四个审查 agent

使用 ${AGENT_TOOL_NAME} 工具在一条消息中并发启动全部四个 agent。每个 agent 运行相当于一个独立审查 skill 的工作，范围限定到这个文件。

明确指示每个 agent：**报告发现的每一个问题，包括不确定和低严重度的情况，并为每条给出置信度和严重度估计。** 覆盖是 agent 的职责；过滤和优先级排序在 Phase 3 进行。一个自我审查掉"次要"发现的 agent 会默默降低召回率。

1. **可访问性审查**（`accessibility-audit`）：对比度与色彩（WCAG AA 最低线、仅靠色彩传达状态、纯白/纯黑）；语义 HTML 与结构（标题、button vs div、label、alt 文本、ARIA 纪律）；键盘导航与 focus（可达性、tab order、可见 focus）；动效、表单与点击区域大小。
2. **AI slop 检测**（`ai-slop-check`）：激进渐变；emoji 装饰；默认左 border 卡片；手画 SVG；被滥用的默认字体（Inter、Roboto、Arial、Fraunces、纯系统字体栈）；作为默认出现的 editorial-warm 住宅风格（奶油色 + 衬线展示字 + 赤陶色，且无 brand 理由）；纯白/纯黑；编造的色彩；偏离刻度的间距。
3. **层级与节奏审查**（`hierarchy-rhythm-review`）：通过大小、色彩、字重、位置、密度和 5 秒测试区分 primary/secondary/tertiary；间距与字体刻度纪律、重复、策略性变化、色板纪律、区块结构、对齐。
4. **交互状态完整性检查**（`interaction-states-pass`）：逐元素的 default/hover/active/disabled/focus/loading；transition 时长（0.15–0.3s 状态变化，更长的进入/退出）；`prefers-reduced-motion`；动作反馈与状态可见性。

## Phase 3：聚合、去重、排序

等待全部四个 agent。合并重复发现（例如可访问性和 interaction-states 都报了"focus ring 被移除"）。分组为：

1. **Blocker**——可访问性失败（对比度低于 WCAG、缺少键盘支持、被移除的 focus ring、缺失 label）。这些会让真实用户无法使用设计；全部修复。
2. **质量问题**——AI slop 套路、层级破损、缺失交互状态。这些会让设计显得廉价；全部修复。
3. **打磨建议**——更微妙的改进（色调微调、间距刻度收紧）。在范围内时应用；超出范围时标记。

## Phase 4：修复并重新验证

直接修复每个 blocker 和质量问题。对于模棱两可的修复（例如设计用了 Inter 但没有声明 brand 字体），挑一个站得住脚的默认值并记录，以便用户能覆盖。对明显的误报（例如第三方嵌入的对比度），记录并跳过。

然后重新检查高风险区域：对比度修复是否冲淡了 brand 色？新的 focus ring 是否与相邻内容重叠？primary CTA 现在是否真的显得是 primary？修复看起来不对的地方；标记你不确定的地方。

## Phase 5：最终总结

简洁汇报——用户可以要求细节：

- **结论**——"可以交付" / "用户复审标记的决策后可交付" / "在打磨有意义之前还需更多迭代"
- **已修复的 blocker 与已应用的打磨**——按类别计数
- **未决决策**——需要签字的判断取舍（字体选择、色调微调、强调程度）
- **超出范围**——注意到但未改动的事项（文案修改、内容新增、新功能）
