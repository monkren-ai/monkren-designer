# Monkren Design — 项目设计系统

> 纯黑白高对比度、无圆角、基于设计哲学的视觉语言。

## 文档说明

本文件（DESIGN.md）是 Monkren 项目的官方设计系统，包含设计 Token、组件规范、代码审查指南等。新功能开发请优先参考本设计系统。

**主题**：Graphic Monochrome Canvas

Monkren Design 采用高对比度的纯黑白美学，黑色画布作为背景，白色文字和边框，无圆角的几何元素，强调排版层次和清晰的结构。视觉焦点放在精确的字体排印和简约、实用的组件上，交互通过反转颜色状态或简单边框来表达。

***

## 设计令牌 — 颜色

| Name         | Value     | Token                  | Role                                 |
| ------------ | --------- | ---------------------- | ------------------------------------ |
| Canvas Black | `#000000` | `--color-canvas-black` | 页面背景、主要按钮填充、交互链接边框——建立高对比度的深色主题      |
| Arctic White | `#ffffff` | `--color-arctic-white` | 主要文本颜色、按钮和导航边框、激活按钮填充——作为黑色画布的主要对比元素 |
| Subtle Gray  | `#a9a9a9` | `--color-subtle-gray`  | 次要文本和淡化边框——在保持可读性的同时提供轻微的弱化效果        |

***

## 设计令牌 — 字体

### Lausanne — 标题、正文和交互元素 — `--font-lausanne`

- **Substitute**：ui-sans-serif, system-ui, -apple-system
- **Weight**：400 (regular)
- **Sizes**：16px, 32px, 48px
- **Line height**：1, 1.2
- **Role**：标题、正文、交互元素——现代、独特的声音，是品牌视觉识别的关键

### Victor Serif — 装饰性或特定内容文本 — `--font-victor-serif`

- **Substitute**：ui-serif, Georgia
- **Weight**：400 (regular)
- **Sizes**：14px, 24px, 36px
- **Line height**：1.2
- **Role**：装饰性或特定内容文本——定制 serif 字体，用于微妙的对比纹理

### Black Tie — 代码、标签、技术标识 — `--font-black-tie`

- **Substitute**：ui-monospace, SFMono-Regular, Menlo, Consolas
- **Weight**：400 (regular)
- **Sizes**：12px, 18px
- **Line height**：1, 1.2
- **Role**：高度特定、很少使用的内容——保留给独特的图形元素，强调稀有性

***

## 设计令牌 — 间距与形状

**Base unit**：4px

**Density**：comfortable, no cramping

### 间距尺度

| Name | Value | Token          |
| ---- | ----- | -------------- |
| 4px  | 4px   | `--spacing-4`  |
| 8px  | 8px   | `--spacing-8`  |
| 12px | 12px  | `--spacing-12` |
| 16px | 16px  | `--spacing-16` |
| 20px | 20px  | `--spacing-20` |
| 28px | 28px  | `--spacing-28` |
| 40px | 40px  | `--spacing-40` |
| 56px | 56px  | `--spacing-56` |
| 64px | 64px  | `--spacing-64` |
| 80px | 80px  | `--spacing-80` |

### 圆角

| Element | Value             |
| ------- | ----------------- |
| All     | 0px (no rounding) |

**Exception**：

- Pill buttons：`--radius-full: 120px` (only for pill-shaped buttons)
- Circular badges：`border-radius: 50%`

### 布局

- **Page max-width**：1280px
- **Section gap**：28px
- **Card padding**：16px
- **Element gap**：12px
- **Border width**：1px (all elements)

***

## 组件

> **重要提示**：新功能开发请优先使用以下设计系统组件，避免自定义样式。

### PrimaryButton — 主要按钮

**用途**：主要操作、导航项

**样式**：

- 背景：Arctic White (`--color-arctic-white`)
- 文字：Canvas Black (`--color-canvas-black`)
- 边框：1px Arctic White
- 圆角：120px (`--radius-full`)
- 内边距：12px 垂直，16px 水平
- 字体：Lausanne

**交互状态**：

- 默认：白色背景，黑色文字
- 悬停/点击：无特殊变化（保持简洁）

***

### SecondaryButton — 次要按钮（幽灵样式）

**用途**：次要操作、筛选器、导航

**样式**：

- 背景：透明（继承 Canvas Black）
- 文字：Arctic White (`--color-arctic-white`)
- 边框：1px Arctic White
- 圆角：120px (`--radius-full`)
- 内边距：12px 垂直，16px 水平
- 字体：Lausanne

**使用场景**：视觉层级不需要强调的大多数交互元素

***

### Tag / Badge — 标签 / 徽章

**用途**：标签、状态指示、筛选器

**样式**：

- 背景：透明（继承 Canvas Black）
- 文字：Arctic White (`--color-arctic-white`)
- 边框：1px Arctic White
- 圆角：可选 120px 胶囊圆角
- 内边距：3px 垂直，8px 水平
- 字体：Black Tie

***

### ContentCard — 内容卡片

**用途**：项目展示、内容容器

**样式**：

- 背景：透明（继承 Canvas Black）
- 边框：1px Arctic White
- 圆角：0 (`--radius-none`)
- 内边距：根据内容决定

***

## 应该做与不应该做

### 应该做

- 优先使用 Canvas Black (#000000) 作为所有主要表面的背景颜色
- 主要文本、边框和激活状态**仅**使用 Arctic White (#ffffff)，保持高对比度
- 对按钮和导航等交互元素使用 120px 圆角，保持一致的 pill 形状
- 所有边框统一使用 1px 线宽，特别是幽灵按钮和交互链接
- 所有导航文本、标题和正文使用 Lausanne 字体，确保品牌一致性
- 12px 作为交互组件的主要元素间距，16px 作为内部卡片填充
- 所有组件零圆角（pill 按钮除外）
- 保持严格的单色调色板

### 不应该做

- 避免使用饱和色——系统严格使用黑白灰三色
- 不要引入阴影或高度效果——表面是平坦的，无缝融入背景
- 永远不要偏离交互元素的 1px 边框宽度——这是核心的视觉提示
- 不要在主要 UI 组件中使用高度装饰性的渐变或背景图像——重点放在排版和清晰的交互上
- 避免随意更改圆角——120px 是交互元素的标志性值（仅限 pill 形状）
- 不要使用除 400 以外的字重——权重变化不是系统表达范围的一部分
- 不要使用超过 3-4 种颜色——保持严格的 Canvas Black + Arctic White + Subtle Gray

***

## 表面层级

| Level | Name                | Value                    | Purpose                   |
| ----- | ------------------- | ------------------------ | ------------------------- |
| 1     | Page Canvas         | `#000000`                | 整个页面的主导背景，设置深色主题          |
| 2     | Interactive Surface | `#ffffff`                | 用于按钮和导航的选中状态，通过颜色反转提供视觉强调 |
| 3     | Muted Surface       | `rgba(255,255,255,0.12)` | 用于淡化背景元素，如进度条轨迹           |

***

## 布局规范

页面结构基于干净的网格系统，各部分通过 28px 间距分隔。Hero 区域特点是左侧的大胆排版和右侧的突出内容展示。导航是左侧列内的粘性顶部栏。

**Key principles**：

- 最大宽度 1280px，居中对齐
- 各部分之间垂直间距为 80px
- 1px 边框作为主要分隔元素
- 无阴影，无渐变（除非作为设计哲学参考的一部分）
- 严格的左对齐或居中对齐

***

本设计系统遵循 monkren-design 设计哲学（From Existing Context / Anti AI slop / System Over Filler / Placeholder > Bad Implementation）→ 详见 `references/philosophy.md`

***

## 智能体提示指南

Quick Color Reference:

- text: `#ffffff`
- background: `#000000`
- border: `#ffffff`
- accent: no distinct accent color, use muted gray only
- primary action: `#ffffff` (inverted on white background)

Example Component Prompts:

1. Create a pill button：Lausanne font, 24px weight 400, Arctic White text (#ffffff), 1px Arctic White border (#ffffff), 120px radius, 12px top/bottom padding, 16px left/right padding.
2. Create a primary action pill button：Same as above, but Arctic White background (#ffffff), Canvas Black text (#000000).
3. Create a content card：Canvas Black background (#000000), 1px Arctic White border, zero padding, no border radius.

***

## 类似品牌 / 灵感来源

- **Pascal Devoyre / Naked HTML**：裸露真实，HTML 结构作为视觉语言
- **Experimental Jetset**：极简概念，蒙德里安，反商业
- **Müller-Brockmann**：瑞士网格，数学精确
- **Build in Amsterdam**：大胆对比，深色画布，超大排版

***

## 快速开始

### CSS 自定义属性

```css
:root {
  /* Colors */
  --color-canvas-black: #000000;
  --color-arctic-white: #ffffff;
  --color-subtle-gray: #a9a9a9;

  /* Typography — Font Families */
  --font-lausanne: 'Lausanne', ui-sans-serif, system-ui, -apple-system;
  --font-victor-serif: 'Victor Serif', ui-serif, Georgia;
  --font-black-tie: 'Black Tie', ui-monospace, SFMono-Regular, Menlo, Consolas;

  /* Typography — Scale */
  --text-12px: 12px;
  --text-14px: 14px;
  --text-16px: 16px;
  --text-18px: 18px;
  --text-20px: 20px;
  --text-24px: 24px;
  --text-32px: 32px;
  --text-36px: 36px;
  --text-48px: 48px;
  --leading-tight: 1;
  --leading-normal: 1.2;

  /* Typography — Weight */
  --font-weight-light: 300;
  --font-weight-regular: 400;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-28: 28px;
  --spacing-40: 40px;
  --spacing-56: 56px;
  --spacing-64: 64px;
  --spacing-80: 80px;

  /* Layout */
  --page-max-width: 1280px;
  --section-gap: 28px;
  --card-padding: 16px;
  --element-gap: 12px;

  /* Border Radius */
  --radius-none: 0;
  --radius-full: 120px;

  /* Named Radii */
  --radius-all: 0; /* Default is no rounding */
  --radius-pill: 120px; /* Only for pill buttons */

  /* Border Width */
  --border-width: 1px;

  /* Surfaces */
  --surface-page-canvas: #000000;
  --surface-interactive: #ffffff;
  --surface-muted: rgba(255, 255, 255, 0.12);
}
```

### 重置与基础样式

```css
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  min-width: 320px;
  background: var(--color-canvas-black);
  color: var(--color-arctic-white);
  font-family: var(--font-lausanne);
  font-weight: var(--font-weight-regular);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
button, input, textarea, select { font: inherit; }
```

***

## 开发规范

### SwiftLint 规则

项目使用 SwiftLint 自定义规则自动检测硬编码值（字体名称/大小、颜色值、间距/尺寸、圆角值），强制使用设计系统 Token。→ 详见 `references/design-system.md`（SwiftLint 规则完整配置 + Design Token 架构）

***

## 代码审查规范

硬编码值检查与设计系统合规性审查由 monkren-design 技能统一执行。→ 详见 `SKILL.md`（硬编码值检测规则 + 设计系统合规性检查）
