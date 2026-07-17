---
name: frontend-aesthetic-direction
description: |
  无品牌时的美学方向承诺。当项目没有既有品牌规范时，按 5 个 phase 系统化锁定美学方向（7 个维度：色彩/字体/间距/容器/图像/动效/语调），避免生成 generic 作品。触发词：「美学方向」「视觉风格选择」「no brand」「aesthetic direction」「风格方向」「视觉调性」。
---

# Frontend Aesthetic Direction：没有 brand 时锁定一种视觉

当用户在没有现成 brand 或 design system 的情况下做设计时，先锁定一套美学方向（字体、色彩、密度、调性、组件风格）。在 greenfield 场景下做 hi-fi 工作**之前**用这个 skill：没有先锁定美学方向就从零撸 hi-fi，是走向 AI 模板化产出的最快路径。先定方向，再在方向内设计。

## Phase 1：确认确实没有现成上下文

再确认一遍：没有 brand 指南，没有要匹配的现成 app 或产品，没有用户想模仿的参考站点，代码库里也没有局部的 design system。只要有任何一项存在，**停下来用它们** —— aesthetic direction 是给真正的 greenfield 用的。如果用户有 brand 但忘了附上，先要过来再继续。

## Phase 2：摸清意图

问用户（或确认已陈述的内容）：想要的感觉用**三个形容词**描述；**受众**；**行业背景**；**欣赏的参考设计**（具体欣赏什么 —— 字体、间距、色彩、调性、密度？）；**不能碰**的美学或俗套。

如果用户拿不准，提出**4 个差异明显的视觉方向**，每个都要具体到 —— 背景色 hex / 强调色 hex / 标题 + 正文字体，配一句跟 brief 挂钩的理由 —— 让用户挑。这些方向不能共用同一个色系：4 种暖奶油色变体是一个方向，不是四个。至少要有一个刻意跳出常规分布。

## Phase 3：锁定系统 —— 让它具体

模糊的美学描述（"现代且干净"）会产出 generic 设计。在每个轴上都要落定：

### 字体

选**具体**的字体 —— 标题、正文（通常同一字族），需要的话再加 mono —— 带上字重和字号阶梯。最多 1–2 个字族。

避开用滥的默认字体 —— Inter、Roboto、Arial、裸 system stack，以及那些悄无声息变成默认的衬线展示字（Fraunces、Playfair Display、Georgia 当展示字）。带意图地选：人文无衬线（Söhne、Suisse）、现代衬线（Tiempos、GT Sectra）、编辑经典（Tiempos Headline、Canela）、打字机 mono（JetBrains Mono、IBM Plex Mono）、几何无衬线（Söhne Buch、Visby），按调性来选。如果付费字厂可能拿不到，就点名最接近的免费替代（比如生产用 Söhne，免费就用 Albert Sans / Geist）。

### 色彩

选定调性 —— 暖色（奶油、金、赤陶）、冷色（灰、石板、冰、蓝），或中性（混凝土、炭灰、米白）。

**暖色编辑风组合（奶油背景 + 衬线展示字 + 赤陶/琥珀强调色）是当前模型的默认长相。** 只有当 brief 真的是编辑、酒店或作品集场景时才选它 —— 并在方向块里明确说明。如果没有说出口的理由就漂向这个组合，重新选。

然后选：一个主 brand 色（带浅/深变体），最多一个强调色，语义色（success/warning/error/info），以及在选定调性上的 5–10 级中性阶梯。从零构建时用 `oklch()` 保证和谐（`--brand-primary: oklch(55% 0.18 250)`）。白和黑要微微调一下色 —— 纯 `#FFFFFF`/`#000000` 太硬；要贴合调性（比如 `#FAFAFA` / `#1A1A1A`）。

### 密度

选一个间距阶梯（4px 或 8px 基准）和一个密度 —— 紧凑（紧凑的 dashboard、高密度数据 UI）、正常（典型产品 UI），或宽松（编辑、营销、premium、慷慨的留白）。密度跟视觉一样，是能被感知到的。

### 圆角和阴影

锐利（0–2px —— 实用、粗野、编辑风）、柔和（4–8px —— 典型现代产品），或胶囊/全圆角（俏皮、友好、消费级）。阴影同理：锐利 / 柔和 / 无。用一套 elevation 系统，不要混用。

### 组件风格

实心、ghost、描边，或浮起。选一个默认，再用次要样式做层级。

### 图像和图标

真实摄影（Unsplash、brand、图库）、专业插画、成熟图标集（Feather、Material、Phosphor、Heroicons），或资产不到位时用诚实的 placeholder。避免手绘 SVG 插画。

### 动效

安静（只在状态变化时过渡，200ms ease）、富有表现力（入场动画、滚动驱动揭示），或俏皮（弹簧、hover 上的微交互）。锁定一种模式 —— 混用动效会显得没有意图。

## Phase 4：把方向写下来

把方向写进文件里 —— 源码顶部一个注释块，加上渲染产出里一个可见的"design system summary"，像初级设计师把自己的思路亮出来一样：

```
/* Aesthetic direction:
 * Editorial / serious / spacious.
 * - Type: Tiempos Headline (display) + Söhne (body). Free alt: GT Sectra → Albert Sans.
 * - Color: cool-neutral. #FAFAFA bg / #1A1A1A text. Brand: oklch(55% 0.18 250) deep blue. No accent.
 * - Density: loose. 8px scale, generous padding.
 * - Radius: 4px. No shadow — borders only.
 * - Components: ghost buttons; filled for primary CTA only.
 * - Imagery: real photography, full-bleed.
 * - Motion: quiet. 200ms ease, no entrance animations.
 */
```

## Phase 5：应用、测试、保持一致

用这个方向搭一个小表面（一个 hero、一张卡片、一组按钮），尽早拿给用户看。问："这个读起来像不像 [那三个形容词]？" 如果不像 —— 或者用户在某个轴上 push back —— 在铺开之前先改。小尺度上失败的方向，放大只会更糟，不会更好。

后续每个设计都引用方向里的 token，不要用新的 inline 值。如果新设计需要一个未定义的值，**先把它加进方向里**，再用。当方向成熟后，将它整理为项目本地的 tokens 文件或现有设计系统变量。

总结：三个形容词、每个轴上锁定的选择、铺开之前用户应该 review 的轴、以及用这个方向搭出来的第一个表面。
