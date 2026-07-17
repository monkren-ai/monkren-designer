# Monkren Design System

> Graphic Monochrome Canvas：高对比黑色画布、零圆角几何结构、排版优先，以及只用于导航信号的荧光黄。

本文件是 Monkren 展示页与案例产出的设计基线。实现与本文冲突时，应先判断是文档还是代码过期，再让两者重新一致。

## 设计价值观

1. **从现有上下文出发**：新元素必须能追溯到产品、品牌、设计系统或真实资产。
2. **反 AI slop**：拒绝无品牌理由的渐变、装饰 emoji、同质化卡片、虚构数据和滥用动效。
3. **系统优先**：每个元素都应服务信息、动作或识别度，不用 filler 填空间。
4. **诚实占位**：缺真实内容时明确标注 placeholder，不伪造客户、指标或产品状态。
5. **品牌靠识别**：真实 Logo、产品图和 UI 截图优先于“像品牌”的装饰。
6. **重大取舍要有第二意见**：方向、架构和品牌决策同时接受第一性原理与产品品味检验；advisor 只读，不替代五阶段执行。

## 颜色

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas Black | `#000000` | `--color-canvas-black` | 页面和组件背景 |
| Arctic White | `#ffffff` | `--color-arctic-white` | 主文本、边框、反转表面 |
| Subtle Gray | `#a9a9a9` | `--color-subtle-gray` | 次要文本和弱化信息 |
| Signal Lime | `#d4ff00` | `--color-warn` | 阶段编号、命令提示、重点边框 |

黑、白、灰构成基础界面；Signal Lime 是受限信号色，不用于大面积背景、正文或装饰渐变。允许使用 `rgba(255,255,255,.12)` 表达弱化轨道或表面。

## 字体

| Family | Token | Fallback | Role |
|---|---|---|---|
| Lausanne | `--font-lausanne` | `ui-sans-serif, system-ui, -apple-system` | 标题、正文、交互 |
| Victor Serif | `--font-victor-serif` | `ui-serif, Georgia` | 少量章节标题与纹理对比 |
| Black Tie | `--font-black-tie` | `ui-monospace, SFMono-Regular, Menlo, Consolas` | 命令、编号、标签、技术元信息 |

默认字重为 400。层级主要通过字号、位置和留白建立，避免用大量字重制造噪音。

### 字号 token

| Token | Value | Typical use |
|---|---:|---|
| `--font-size-xs` | 11px | eyebrow、元信息 |
| `--font-size-sm` | 13px | 标签、兼容项 |
| `--font-size-base` | 14px | footer |
| `--font-size-md` | 16px | 正文、query |
| `--font-size-lg` | 18px | 阶段名、说明 |
| `--font-size-xl` | 20px | 阶段编号 |
| `--font-size-2xl` | 24px | 卡片标题 |
| `--font-size-3xl` | 40px | 移动端主标题 |
| `--font-size-display` | 96px | 桌面端主标题上限 |

## 间距与形状

基础单位为 4px。实现使用以下 token：

`--space-8` · `--space-12` · `--space-16` · `--space-20` · `--space-28` · `--space-40` · `--space-56` · `--space-64` · `--space-96`

- 页面最大宽度：`--page-max-width: 1280px`
- 结构边框：`--border-w: 1px`
- 默认圆角：`0`
- 允许例外：胶囊按钮和圆形标记
- 不使用阴影或装饰性高度

## 组件规则

### 链接与按钮

- 主动作可使用白底黑字；次要动作使用透明底、白色 1px 边框。
- hover 必须产生清晰但克制的颜色反转或色值变化。
- active 状态应确认按压；异步动作才需要 loading/disabled 状态。
- `:focus-visible` 使用至少 2px、与相邻背景达到 3:1 对比度的焦点环。
- 触摸目标尽量不小于 44×44px。

### 内容卡片

- 背景继承画布，使用 1px 边框分组。
- 默认无圆角、无阴影。
- 可交互卡片在 hover/focus 时反转黑白；静态卡片不伪装成交互元素。

### 标签与元信息

- 使用 Black Tie 或等宽 fallback。
- 大写标签保持宽字距，避免与正文争夺层级。
- Signal Lime 只突出少量关键状态。

### 次设计 agent 区块

- 作为独立 section 出现在五阶段之后，不编号为第六阶段。
- 使用两个并列镜头卡片和一个横向裁决顺序；不使用人物肖像、签名、第一人称或拟人化头像。
- 标题强调“第二意见”，正文只解释行为：质疑需求、保护承诺、输出统一裁决。
- advisor query 使用 Signal Lime 边框，但保持静态展示，不伪装成可点击控件。
- 移动端两个镜头改为单列，裁决顺序纵向排列。

## 动效与可访问性

- 微交互通常为 120–300ms；不用长动画掩盖布局问题。
- 页面必须提供 `prefers-reduced-motion: reduce`，关闭平滑滚动并压缩动画和 transition。
- 不使用每秒超过 3 次的闪烁。
- 所有交互通过键盘可达；语义元素优先于补 ARIA。
- 文本和 UI 对比度至少满足 WCAG AA；颜色不是唯一状态信号。
- 页面包含可见于键盘 focus 时的 skip link，并保持标题与 landmark 结构清晰。

## 图片策略

- 哲学参考图存为仓库内 JPEG，避免展示页依赖远程图片。
- 默认黑白高对比展示时，hover 可恢复颜色，但不能让颜色成为理解内容的必要条件。
- 每张有意义图片必须有描述其信息用途的 `alt`；装饰图片使用空 `alt`。

## 响应式规则

- 桌面多列内容在 720px 以下切换为单列。
- 移动端主标题使用 40px 基线，不依赖视口单位维持可读性。
- 信息表格在窄屏改为纵向条目，而不是强迫横向缩放。
- 最小页面宽度 320px；任何核心内容不得被固定宽度裁切。

## 自我审查清单

- [ ] 颜色全部追溯到本文 token，Signal Lime 没有被滥用。
- [ ] 间距落在既定 scale，边框保持 1px。
- [ ] 除允许例外外没有圆角、阴影或渐变。
- [ ] 五阶段信息完整，文本与实际模块数量一致。
- [ ] 次设计 agent 明确为跨阶段只读 advisor，没有被表现为第六阶段或人物模仿。
- [ ] hover、active、focus-visible 和必要的异步状态完整。
- [ ] 键盘、语义 HTML、对比度和 reduced-motion 已验证。
- [ ] 本地链接与图片资源通过 `ruby scripts/validate_repo.rb`。

**版本**：v6.2 / **更新日期**：2026-07-17
