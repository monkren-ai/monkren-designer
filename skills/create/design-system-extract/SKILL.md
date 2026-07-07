---
name: design-system-extract
description: |
  设计 token 提取。4 个 phase 覆盖源文件扫描/变量分类（色彩/字体/间距/圆角/阴影/动效）/命名规范化/token 文件生成，从现有代码提取 design system。触发词：「提取 token」「design system extract」「token 提取」「设计系统提取」「extract tokens」。
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - WebSearch
  - AskUserQuestion
---

# Design System Extract：从源文件提取 token

从 brand 参考、代码库或截图里提取设计 token（颜色、字体、间距、圆角、阴影），输出一份结构化的 token 文件。当要开始一项应匹配已有视觉语言的设计工作时使用。一旦有了 token，后续设计直接引用——保持系统一致，不用反复问用户要值。

## Phase 1：识别源

用户可能提供代码库（读 theme 文件：`theme.ts`、`tokens.css`、`_variables.scss`、`tailwind.config.js`、design system 源码）、线上站点或截图、brand 指南（PDF、Figma、文档）或已有 UI kit 项目。若不明确，就问——瞎编 token 是违背初衷的。

## Phase 2：按类别提取

从源里抓具体值——绝不猜。

### 颜色

- **Brand 主色与强调色**（有暗 / 亮变体则一并记录）
- **语义色**——success、warning、error、info（若有浅底色也一并记录）
- **中性色阶**——通常 9–11 阶，从近白到近黑，调性一致（暖 / 冷 / 中性）
- **表面色**——背景、前景、card、overlay、border

每条：hex（或 oklch）值、在源里的名字、文档记载的用途。把不一致标出来——几种略不同的蓝、调性不同的中性灰——作为给用户的 finding。不要默默合并它们；不一致本身就是信息。

### 字体

- **字族**——sans、serif、mono，带完整 fallback 栈
- **字号**——实际在用的 scale，不是通用那套
- **字重**——只记真正加载的
- **行高**——至少 headline 紧（~1.1）、body 正常（~1.5）、长文松（~1.7）
- **字距**——通常只对全大写 label 有意义
- **命名字体样式**（"Heading 1"、"Body Large"、"Caption"）若源里有定义

### 间距

实际在用的 scale（常见基准：4px 或 8px，通常跑到 64–128px）。若源里有 inset / inline / block / between-components 各自的 scale，全部记下。

### 圆角与阴影

圆角值（通常 3–5 个不同：`0 / 4 / 8 / 12 / 9999`），以及 elevation scale 带完整 CSS 值（偏移、模糊、扩散、颜色、透明度）。

### 其他 token（若有）

z-index scale、动画时长与 easing、断点、容器宽度。

## Phase 3：输出 token 文件

写一份 `tokens.css`——或匹配源的格式与命名约定（带类型导出的 `tokens.ts`、`tokens.json`、Tailwind config 扩展）。按类别分组，名字清楚：

```css
:root {
  /* Brand */
  --color-primary: #...;   --color-accent: #...;
  /* Semantic */
  --color-success: #...;   --color-error: #...;
  /* Neutrals */
  --color-gray-50: #...;   /* … through --color-gray-900 */
  /* Surfaces */
  --color-bg: #...;   --color-surface: #...;   --color-border: #...;

  --font-sans: "...", -apple-system, sans-serif;
  --text-base: 16px;       /* full size scale as found */
  --weight-regular: 400;   /* only loaded weights */
  --leading-normal: 1.5;

  --space-1: 4px;          /* full spacing scale as found */
  --radius-md: 8px;
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Phase 4：记录 finding

总结：**用到的源**；**提取的类别**；**缺口**——源里没定义的 token 集（这些是用户要做的决定；不要默默补上）；**不一致**——近似重复值或越界离群点，值得合并；**建议下一步**——通常是和用户一起过一遍文件，然后在后续设计里用起来。
