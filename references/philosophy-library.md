# 设计哲学库

> ⚠️ **INTERNAL · v5.0 起标 internal** · 不对外展示，仅供 agent 内部使用。
> 公开 reference：beliefs / standards / methods-review。入口与路由见根 [SKILL.md](../SKILL.md)。
>
> 回答「选哪种风格？」——80 种设计哲学完整风格库 + 项目适配矩阵 + 落地概念包。信念层论述见 beliefs.md，落地概念包模板与 Demo 规范见 execution.md。

---

## 导航

- **信念层**（为什么这么设计）→ [`beliefs.md`](./beliefs.md)
- **标准层**（怎么算好）→ [`standards.md`](./standards.md)
- **方法层·创作** → [`methods-create.md`](./methods-create.md)
- **方法层·审查** → [`methods-review.md`](./methods-review.md)
- **执行层**（报告/Demo/概念包模板）→ [`execution.md`](./execution.md)
- **多视角审查** → [`perspectives.md`](./perspectives.md)
- **平台专项** → [`platforms.md`](./platforms.md)
- **集成与参考搜索** → [`integration.md`](./integration.md)

---

## 2. 40 种设计哲学完整风格库

> 用于视觉设计（网页/PPT/PDF/信息图/配图/App等）的设计风格库。
> 每种风格提供：哲学内核 + 核心特征 + 提示词DNA（与场景模板组合使用）。

### 风格×场景×执行路径 速查表

| 风格 | 网页 | PPT | PDF | 信息图 | 封面 | AI生成 | 最佳路径 |
|------|:---:|:---:|:---:|:-----:|:---:|:-----:|---------|
| 01 Pentagram | ★★★ | ★★★ | ★★☆ | ★★☆ | ★★★ | ★☆☆ | HTML |
| 02 Stamen Design | ★★☆ | ★★☆ | ★★☆ | ★★★ | ★★☆ | ★★☆ | 混合 |
| 03 Information Architects | ★★★ | ★☆☆ | ★★★ | ★☆☆ | ★☆☆ | ★☆☆ | HTML |
| 04 Fathom | ★★☆ | ★★★ | ★★★ | ★★★ | ★★☆ | ★☆☆ | HTML |
| 05 Locomotive | ★★★ | ★★☆ | ★☆☆ | ★☆☆ | ★★☆ | ★★☆ | 混合 |
| 06 Active Theory | ★★★ | ★☆☆ | ★☆☆ | ★☆☆ | ★★☆ | ★★★ | AI生成 |
| 07 Field.io | ★★☆ | ★★☆ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI生成 |
| 08 Resn | ★★★ | ★☆☆ | ★☆☆ | ★☆☆ | ★★☆ | ★★☆ | 混合 |
| 09 Experimental Jetset | ★★☆ | ★★☆ | ★★☆ | ★★☆ | ★★★ | ★★☆ | 混合 |
| 10 Müller-Brockmann | ★★☆ | ★★★ | ★★★ | ★★★ | ★★☆ | ★☆☆ | HTML |
| 11 Build | ★★★ | ★★★ | ★★☆ | ★☆☆ | ★★★ | ★☆☆ | HTML |
| 12 Sagmeister & Walsh | ★★☆ | ★★★ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI生成 |
| 13 Zach Lieberman | ★☆☆ | ★☆☆ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI生成 |
| 14 Raven Kwok | ★☆☆ | ★★☆ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI生成 |
| 15 Ash Thorp | ★★☆ | ★★☆ | ★☆☆ | ★☆☆ | ★★★ | ★★★ | AI生成 |
| 16 Territory Studio | ★★☆ | ★★☆ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI生成 |
| 17 Takram | ★★★ | ★★★ | ★★★ | ★★☆ | ★★☆ | ★☆☆ | HTML |
| 18 Kenya Hara | ★★☆ | ★★★ | ★★★ | ★☆☆ | ★★★ | ★☆☆ | HTML |
| 19 Irma Boom | ★☆☆ | ★★☆ | ★★★ | ★★☆ | ★★★ | ★★☆ | 混合 |
| 20 Naoto Fukasawa | ★★☆ | ★★★ | ★★★ | ★☆☆ | ★★★ | ★☆☆ | 混合 |
| 21 Pascal Devoyre | ★★★ | ★☆☆ | ★☆☆ | ★☆☆ | ★★☆ | ★☆☆ | HTML |
| 22 Michele Mazzini | ★★★ | ★★☆ | ★☆☆ | ★☆☆ | ★★☆ | ★★☆ | HTML |
| 23 Bloomberg Businessweek | ★★☆ | ★★★ | ★★★ | ★★☆ | ★★☆ | ★☆☆ | HTML |
| 24 Lotta Nieminen | ★★☆ | ★★★ | ★★☆ | ★☆☆ | ★★★ | ★★☆ | 混合 |
| 25 Ettore Sottsass | ★☆☆ | ★★☆ | ★☆☆ | ★☆☆ | ★★★ | ★★★ | AI生成 |
| 26 Camille Walala | ★★☆ | ★★☆ | ★☆☆ | ★☆☆ | ★★★ | ★★★ | AI生成 |
| 27 Morag Myerscough | ★★☆ | ★★☆ | ★☆☆ | ★☆☆ | ★★★ | ★★☆ | 混合 |
| 28 Studio Moross | ★★★ | ★★☆ | ★☆☆ | ★☆☆ | ★★★ | ★★★ | AI生成 |
| 29 Neri Oxman | ★★☆ | ★★★ | ★★★ | ★★☆ | ★★☆ | ★★☆ | 混合 |
| 30 Ross Lovegrove | ★★☆ | ★★☆ | ★★☆ | ★☆☆ | ★★★ | ★★★ | AI生成 |
| 31 Daan Roosegaarde | ★★★ | ★★☆ | ★☆☆ | ★☆☆ | ★★★ | ★★★ | AI生成 |
| 32 Heatherwick Studio | ★★☆ | ★★★ | ★★☆ | ★★☆ | ★★★ | ★★★ | AI生成 |
| 33 Syd Mead | ★☆☆ | ★★☆ | ★☆☆ | ★☆☆ | ★★★ | ★★★ | AI生成 |
| 34 Daniel Simon | ★☆☆ | ★★☆ | ★☆☆ | ★☆☆ | ★★★ | ★★★ | AI生成 |
| 35 Actual Source | ★★★ | ★★☆ | ★☆☆ | ★☆☆ | ★★★ | ★★★ | AI生成 |
| 36 Andrés Reisinger | ★★☆ | ★☆☆ | ★☆☆ | ★☆☆ | ★★★ | ★★★ | AI生成 |
| 37 David Carson | ★★☆ | ★★☆ | ★☆☆ | ★☆☆ | ★★★ | ★★★ | AI生成 |
| 38 Paula Scher | ★★☆ | ★★★ | ★★★ | ★★☆ | ★★★ | ★★☆ | 混合 |
| 39 Peter Saville | ★★☆ | ★★☆ | ★☆☆ | ★☆☆ | ★★★ | ★★☆ | 混合 |
| 40 Kelly Wearstler | ★★☆ | ★★★ | ★★☆ | ★☆☆ | ★★★ | ★★☆ | 混合 |

> 场景适配：★★★ = 强烈推荐 / ★★☆ = 适合 / ★☆☆ = 需改造
> AI生成：★★★ = 直出效果好 / ★★☆ = 需调整 / ★☆☆ = 建议HTML执行
> 最佳路径：AI生成（图片直出）/ HTML（代码渲染，数据精确）/ 混合（HTML布局+AI配图）

**核心规律**：有明确视觉元素的风格（插画/粒子/生成艺术）AI直出效果好；依赖精确排版和数据的风格（网格/信息架构/留白）HTML渲染更可控。

---

### 一、信息建筑派（01-04）
> 哲学：「数据不是装饰，是建筑材料」

#### 反模式检测

| 反模式 | 为什么违反 | 修复方向 |
|--------|-----------|---------|
| ❌ 装饰性图形掩盖数据结构 | 信息建筑派的核心是"数据即建筑材料"，装饰性图形让数据退居次要 | ✅ 每个图形元素必须承载信息，删除纯装饰图形 |
| ❌ 数据可视化缺乏标注系统 | 无标注的数据可视化是装饰而非信息 | ✅ 为所有图表补充标题、轴标签、数据来源、单位 |
| ❌ 信息层级超过 4 层 | 信息建筑派追求结构清晰，超过 4 层嵌套导致认知过载 | ✅ 重新组织信息架构，合并层级，确保不超过 4 层 |
| ❌ 网格系统不一致（不同区域不同列数） | 网格是信息建筑的骨架，不一致等于结构不稳 | ✅ 全局统一网格列数和间距系统 |
| ❌ 色彩用于装饰而非编码信息 | 信息建筑派中色彩是信息编码工具，不是装饰 | ✅ 将装饰性色彩替换为信息编码色彩（如用色彩区分类别/状态/层级） |

#### 提升路径

**Quick Win**（5 分钟）：统一网格列数和间距系统——检查所有区域是否使用相同的列数和间距 token。

**提升路径**（从 5 分到 8 分）：
1. 统一网格系统——全局使用同一列数和间距 token
2. 建立信息层级树——确保不超过 4 层嵌套，每层有明确的视觉区分
3. 为所有数据可视化补充标注——标题、轴标签、数据来源、单位
4. 将装饰性色彩替换为信息编码色彩——用色彩区分类别/状态/层级
5. 审查每个图形元素——"删掉这个图形，信息会丢失吗？"如果不会，删掉

#### 01. Pentagram - Michael Bierut风格
**哲学**：字体即语言，网格即思想
**核心特征**：
- 极度克制的颜色（黑白+1个品牌色）
- 瑞士网格系统的现代演绎
- 字体排印作为主要视觉语言
- 负空间的战略性使用（60%+留白）

**提示词DNA**：
```
Pentagram/Michael Bierut style:
- Extreme typographic hierarchy, Helvetica/Univers family
- Swiss grid with precise mathematical spacing
- Black/white + one accent color (#HEX)
- Information architecture as visual structure
- 60%+ whitespace ratio
- Data visualization as primary decoration
```

**参考色板 (OKLch)**：
- 主色: oklch(0.45 0.02 260) → #3a3a4a
- 辅色: oklch(0.95 0.01 80) → #f0ece4
- 强调色: oklch(0.55 0.20 25) → #c96442
- 背景: oklch(0.97 0.005 80) → #f7f5f0
- 文字: oklch(0.15 0.01 260) → #1a1a2a

**参考字体栈**：
- Display: Helvetica Neue/Helvetica/Arial
- Body: Helvetica Neue/Helvetica/Arial
- Mono: SF Mono/Menlo/monospace

**布局姿态**：左对齐网格 / 瑞士网格 / 负空间主导

**代表作**：Hillary Clinton 2016 campaign identity
**搜索关键词**：pentagram hillary logo system

---

#### 02. Stamen Design - 数据诗学
**哲学**：让数据成为可触摸的风景
**核心特征**：
- 地图学思维应用于信息设计
- 算法生成的有机图形
- 温暖的数据可视化色调（赭石、鼠尾草绿、深蓝）
- 可交互的层级系统

**提示词DNA**：
```
Stamen Design aesthetic:
- Cartographic approach to data visualization
- Organic, algorithm-generated patterns
- Warm palette (terracotta, sage green, deep blues)
- Layered information like topographic maps
- Hand-crafted feel despite digital precision
- Soft shadows and depth
```

**参考色板 (OKLch)**：
- 主色: oklch(0.50 0.12 30) → #a65d3f
- 辅色: oklch(0.55 0.10 150) → #4a7a3f
- 强调色: oklch(0.45 0.15 260) → #2c4d8e
- 背景: oklch(0.96 0.01 80) → #f5f0e8
- 文字: oklch(0.20 0.02 30) → #2a2018

**参考字体栈**：
- Display: GT America/Graphik/Helvetica
- Body: GT America/Graphik/Helvetica
- Mono: JetBrains Mono/Fira Code/monospace

**布局姿态**：地图学分层 / 有机流动 / 数据景观

**代表作**：COVID-19 surge map
**搜索关键词**：stamen covid map visualization

---

#### 03. Information Architects - 内容优先原则
**哲学**：设计不是装饰，是内容的建筑
**核心特征**：
- 极端的内容层级清晰度
- 只使用系统字体（优化阅读）
- 蓝色超链接传统的坚守
- 性能即美学

**提示词DNA**：
```
Information Architects philosophy:
- Content-first hierarchy, zero decorative elements
- System fonts only (SF Pro/Roboto/Inter)
- Classic blue hyperlinks (#0000EE)
- Reading-optimized line length (66 characters)
- Progressive disclosure of depth
- Text-heavy, fast-loading design
```

**参考色板 (OKLch)**：
- 主色: oklch(0.30 0.05 260) → #1a1a3a
- 辅色: oklch(0.55 0.18 260) → #0000EE
- 强调色: oklch(0.55 0.18 260) → #0000EE
- 背景: oklch(0.98 0.002 80) → #fafaf8
- 文字: oklch(0.20 0.01 260) → #1a1a2a

**参考字体栈**：
- Display: SF Pro/Inter/-system-ui
- Body: SF Pro/Inter/system-ui
- Mono: SF Mono/Menlo/monospace

**布局姿态**：内容优先 / 单栏长文 / 超链接传统

**代表作**：iA Writer app
**搜索关键词**：information architects ia writer

---

#### 04. Fathom Information Design - 科学叙事
**哲学**：每一个像素都必须承载信息
**核心特征**：
- 科学期刊的严谨+设计的优雅
- 定量数据的精确可视化
- 冷静的专业色调（灰、海军蓝）
- 注释与引用系统的设计化

**提示词DNA**：
```
Fathom Information Design style:
- Scientific journal aesthetic meets modern design
- Precise data visualization (charts, timelines, scatter plots)
- Neutral scheme (grays, navy, one highlight color)
- Footnote/citation design integrated into layout
- Clean sans-serif (GT America/Graphik)
- Information density without clutter
```

**参考色板 (OKLch)**：
- 主色: oklch(0.40 0.08 260) → #2c3e6e
- 辅色: oklch(0.60 0.02 260) → #8a8fa8
- 强调色: oklch(0.60 0.15 25) → #c47a52
- 背景: oklch(0.97 0.005 260) → #f2f3f6
- 文字: oklch(0.15 0.02 260) → #1a1a2e

**参考字体栈**：
- Display: GT America/Graphik/Helvetica Neue
- Body: GT America/Graphik/Helvetica Neue
- Mono: JetBrains Mono/Source Code Pro/monospace

**布局姿态**：科学期刊网格 / 注释系统 / 数据精确

**代表作**：Bill & Melinda Gates Foundation年度报告
**搜索关键词**：fathom information design gates foundation

---

### 二、运动诗学派（05-08）
> 哲学：「技术本身就是一种流动的诗」

#### 反模式检测

| 反模式 | 为什么违反 | 修复方向 |
|--------|-----------|---------|
| ❌ 动画无叙事目的（纯装饰性 motion） | 运动诗学派中每个动画都应推进叙事，纯装饰 motion 是噪音 | ✅ 为每个动画补充叙事目的：它揭示了什么？它引导用户去哪里？ |
| ❌ 交互反馈与用户操作脱节 | 运动诗学派的核心是"每个点击都推进故事"，脱节等于叙事断裂 | ✅ 确保每个交互都有即时、相关的视觉反馈 |
| ❌ 3D/WebGL 元素遮挡内容可读性 | 技术诗学不能以牺牲内容为代价 | ✅ 为 3D 元素增加内容层（文字标注/数据叠加），确保信息可读 |
| ❌ 视差滚动导致晕眩感 | 沉浸感 ≠ 不适感 | ✅ 限制视差层级（最多 3 层），降低视差幅度，提供关闭选项 |
| ❌ 暗色背景上对比度不足 | 运动诗学派常用暗色，但暗色不等于不可读 | ✅ 正文与背景对比度 ≥ 4.5:1，大文本 ≥ 3:1 |

#### 提升路径

**Quick Win**（5 分钟）：为每个动画补充叙事目的说明——"这个动画揭示了什么？引导用户去哪里？"

**提升路径**（从 5 分到 8 分）：
1. 为每个动画补充叙事目的——无叙事目的的动画删除或替换
2. 检查暗色背景对比度——正文与背景 ≥ 4.5:1，大文本 ≥ 3:1
3. 将纯装饰性 motion 替换为功能驱动的过渡——状态变化/数据揭示/空间转换
4. 为 3D/WebGL 元素增加内容层——文字标注/数据叠加，确保信息可读
5. 验证视差滚动在不同设备上的体验——限制视差层级（最多 3 层），提供关闭选项

#### 05. Locomotive - 滚动叙事大师
**哲学**：滚动不是浏览，是旅程
**核心特征**：
- 丝滑的视差滚动
- 电影化的分镜叙事
- 大胆的空间留白
- 动态元素的精确编排

**提示词DNA**：
```
Locomotive scroll narrative style:
- Film-like scene composition with parallax depth
- Generous vertical spacing between sections
- Bold typography emerging from darkness
- Smooth motion blur effects
- Dark mode (near-black backgrounds)
- Strategic glowing accents
- Hero sections 100vh tall
```

**参考色板 (OKLch)**：
- 主色: oklch(0.12 0.02 260) → #0d0d1a
- 辅色: oklch(0.55 0.20 25) → #c96442
- 强调色: oklch(0.65 0.15 180) → #4abfbf
- 背景: oklch(0.08 0.02 260) → #0a0a14
- 文字: oklch(0.90 0.01 80) → #e8e4dc

**参考字体栈**：
- Display: Playfair Display/Source Serif Pro/Georgia
- Body: Inter Tight/Inter/system-ui
- Mono: JetBrains Mono/Fira Code/monospace

**布局姿态**：全屏分镜 / 视差叙事 / 暗色沉浸

**代表作**：Lusion.co website
**搜索关键词**：locomotive scroll lusion

---

#### 06. Active Theory - WebGL诗人
**哲学**：让技术可见化即让技术可理解
**核心特征**：
- 3D粒子系统作为核心元素
- 实时渲染的数据可视化
- 鼠标交互驱动的世界构建
- 霓虹与深空的配色

**提示词DNA**：
```
Active Theory WebGL aesthetic:
- Particle systems representing data flow
- 3D visualization in depth space
- Neon gradients (cyan/magenta/electric blue) on dark
- Mouse-reactive environment
- Depth of field and bokeh effects
- Floating UI with glassmorphism
```

**参考色板 (OKLch)**：
- 主色: oklch(0.10 0.02 280) → #0d0d20
- 辅色: oklch(0.70 0.20 200) → #00d4ff
- 强调色: oklch(0.65 0.25 330) → #e040fb
- 背景: oklch(0.06 0.02 280) → #080818
- 文字: oklch(0.92 0.01 80) → #ece8e0

**参考字体栈**：
- Display: Space Grotesk/Inter Tight/system-ui
- Body: Inter/system-ui/sans-serif
- Mono: JetBrains Mono/Source Code Pro/monospace

**布局姿态**：3D空间 / 粒子系统 / 鼠标驱动

**代表作**：NASA Prospect
**搜索关键词**：active theory nasa webgl

---

#### 07. Field.io - 算法美学
**哲学**：代码即设计师
**核心特征**：
- 生成艺术系统
- 每次访问都不同的动态图形
- 抽象几何的智能编排
- 技术感与艺术性的平衡

**提示词DNA**：
```
Field.io generative design style:
- Abstract geometric patterns, algorithmically generated
- Dynamic composition that feels computational
- Monochromatic base with vibrant accent
- Mathematical precision in spacing
- Voronoi diagrams or Delaunay triangulation
- Clean code aesthetic
```

**参考色板 (OKLch)**：
- 主色: oklch(0.15 0.02 260) → #12121e
- 辅色: oklch(0.65 0.18 25) → #d4784a
- 强调色: oklch(0.70 0.02 80) → #e8e4dc
- 背景: oklch(0.08 0.01 260) → #0a0a12
- 文字: oklch(0.88 0.01 80) → #ddd8d0

**参考字体栈**：
- Display: Space Grotesk/Neue Haas Grotesk/Helvetica
- Body: Inter/system-ui/sans-serif
- Mono: JetBrains Mono/IBM Plex Mono/monospace

**布局姿态**：算法生成 / 数学精确 / 抽象几何

**代表作**：British Council digital installations
**搜索关键词**：field.io generative design

---

#### 08. Resn - 叙事驱动的交互
**哲学**：每个点击都推进故事
**核心特征**：
- 游戏化的用户旅程
- 强烈的情感化设计
- 插画与代码的深度结合
- 非线性的探索体验

**提示词DNA**：
```
Resn interactive storytelling approach:
- Illustrative style mixed with UI elements
- Gamified exploration (progress indicators)
- Warm color palette despite tech subject
- Character-driven design
- Scroll-triggered animations
- Editorial illustration meets product design
```

**参考色板 (OKLch)**：
- 主色: oklch(0.65 0.15 25) → #d4784a
- 辅色: oklch(0.55 0.12 150) → #4a8a4f
- 强调色: oklch(0.70 0.18 330) → #d45ca0
- 背景: oklch(0.96 0.01 80) → #f5f0e8
- 文字: oklch(0.18 0.02 30) → #2a1a10

**参考字体栈**：
- Display: Bricolage Grotesque/DK Snemand/serif
- Body: Inter/system-ui/sans-serif
- Mono: JetBrains Mono/monospace

**布局姿态**：游戏化探索 / 非线性叙事 / 插画融合

**代表作**：Resn.co.nz portfolio
**搜索关键词**：resn interactive storytelling

---

### 三、极简主义派（09-12）
> 哲学：「删减到无法再删」

#### 反模式检测

| 反模式 | 为什么违反 | 修复方向 |
|--------|-----------|---------|
| ❌ 留白不均匀（部分区域拥挤部分空旷） | 极简主义依赖留白创造节奏，不均匀的留白是失控而非克制 | ✅ 用 8pt 网格校准所有间距，确保留白有系统 |
| ❌ 减法导致信息丢失（用户无法完成任务） | 极简 ≠ 不可用，减法过度是设计失败 | ✅ 确认核心用户任务路径完整，每个必要操作都有入口 |
| ❌ 单一视觉隐喻未贯穿全局 | 极简主义派（尤其 Experimental Jetset）依赖单一隐喻统一设计 | ✅ 检查隐喻是否在每个页面/组件中体现，不一致处统一或删除 |
| ❌ 字重对比不足（标题与正文差 <2 级） | 极简设计中字重是创造层级的主要工具，对比不足则层级模糊 | ✅ 标题与正文至少差 2 个字重级别（如 700 vs 400） |
| ❌ 强调色使用超过 1 处 | 极简主义的强调色是"一击必中"，多处使用破坏克制感 | ✅ 全局仅保留 1 处强调色使用，其余替换为中性色 |

#### 提升路径

**Quick Win**（5 分钟）：删除所有非必要的强调色使用，全局仅保留 1 处。

**提升路径**（从 5 分到 8 分）：
1. 删减强调色——全局仅保留 1 处强调色，其余替换为中性色
2. 校准留白均匀性——用 8pt 网格校准所有间距，确保留白有系统
3. 增强字重对比——标题与正文至少差 2 个字重级别（如 700 vs 400）
4. 验证单一视觉隐喻贯穿全局——不一致处统一或删除
5. 确认减法未导致功能缺失——核心用户任务路径是否完整

#### 09. Experimental Jetset - 概念极简
**哲学**：一个想法=一个形式
**核心特征**：
- 单一视觉隐喻贯穿整个设计
- 蓝/红/黄+黑白的蒙德里安色系
- 字体即图形
- 反商业的诚实设计

**提示词DNA**：
```
Experimental Jetset conceptual minimalism:
- Single visual metaphor for entire design
- Primary colors only (red/blue/yellow) + black/white
- Typography as main graphic element
- Grid-based with deliberate rule-breaking
- No photography, only type and geometry
- Anti-commercial, honest aesthetic
```

**参考色板 (OKLch)**：
- 主色: oklch(0.15 0.00 0) → #1a1a1a
- 辅色: oklch(0.55 0.25 25) → #e03030
- 强调色: oklch(0.60 0.25 260) → #2040d0
- 背景: oklch(0.97 0.00 0) → #f5f5f5
- 文字: oklch(0.15 0.00 0) → #1a1a1a

**参考字体栈**：
- Display: Helvetica Neue/Helvetica/Arial
- Body: Helvetica Neue/Helvetica/Arial
- Mono: Courier New/Courier/monospace

**布局姿态**：概念极简 / 蒙德里安网格 / 字体即图形

**代表作**：Whitney Museum identity
**搜索关键词**：experimental jetset whitney responsive w

---

#### 10. Müller-Brockmann传承 - 瑞士网格纯粹主义
**哲学**：客观性即美
**核心特征**：
- 数学精确的网格系统（8pt基线）
- 绝对的左对齐或居中
- 单色或双色方案
- 功能主义至上

**提示词DNA**：
```
Josef Müller-Brockmann Swiss modernism:
- Mathematical grid system (8pt baseline)
- Strict alignment (flush left or centered)
- Two-color maximum (black + one accent)
- Akzidenz-Grotesk or similar rationalist typeface
- No decorative elements
- Timeless, objective aesthetic
```

**参考色板 (OKLch)**：
- 主色: oklch(0.12 0.00 0) → #111111
- 辅色: oklch(0.55 0.20 25) → #c96442
- 强调色: oklch(0.55 0.20 25) → #c96442
- 背景: oklch(0.96 0.005 80) → #f2f0e8
- 文字: oklch(0.12 0.00 0) → #111111

**参考字体栈**：
- Display: Akzidenz-Grotesk/Helvetica/Arial
- Body: Akzidenz-Grotesk/Helvetica/Arial
- Mono: Courier New/Courier/monospace

**布局姿态**：数学网格 / 8pt基线 / 绝对对齐

**代表作**：《Grid Systems in Graphic Design》
**搜索关键词**：muller brockmann grid systems poster

---

#### 11. Build - 当代极简品牌
**哲学**：精致的简单比复杂更难
**核心特征**：
- 奢侈品级的留白（70%+）
- 微妙的字重对比（200-600）
- 单一强调色的战略使用
- 呼吸感的节奏

**提示词DNA**：
```
Build studio luxury minimalism:
- Generous whitespace (70%+ of area)
- Subtle typography weight shifts (200 to 600)
- Single accent color used sparingly
- High-end product photography aesthetic
- Soft shadows and subtle gradients
- Golden ratio proportions
```

**参考色板 (OKLch)**：
- 主色: oklch(0.15 0.01 260) → #1a1a2a
- 辅色: oklch(0.60 0.15 25) → #c47a52
- 强调色: oklch(0.60 0.15 25) → #c47a52
- 背景: oklch(0.97 0.005 80) → #f7f5f0
- 文字: oklch(0.15 0.01 260) → #1a1a2a

**参考字体栈**：
- Display: Graphik/Neue Haas Grotesk/Helvetica Neue
- Body: Graphik/Neue Haas Grotesk/Helvetica Neue
- Mono: SF Mono/Menlo/monospace

**布局姿态**：奢侈品留白 / 70%+空白 / 微妙字重对比

**代表作**：Build studio portfolio
**搜索关键词**：build studio london branding

---

#### 12. Sagmeister & Walsh - 快乐极简
**哲学**：美即功能的情感维度
**核心特征**：
- 意外的色彩爆发
- 手工感与数字的融合
- 正能量的视觉语言
- 实验性但可读

**提示词DNA**：
```
Sagmeister & Walsh joyful philosophy:
- Unexpected color bursts on minimal base
- Handmade elements (physical objects in digital)
- Optimistic visual language
- Experimental typography that remains legible
- Human warmth through imperfection
- Mix of analog and digital aesthetics
```

**参考色板 (OKLch)**：
- 主色: oklch(0.65 0.25 330) → #d440a0
- 辅色: oklch(0.70 0.22 80) → #e8c830
- 强调色: oklch(0.55 0.22 180) → #20b0b0
- 背景: oklch(0.96 0.01 80) → #f5f0e8
- 文字: oklch(0.15 0.02 260) → #1a1a2a

**参考字体栈**：
- Display: GT Flexa/DK Snemand/custom
- Body: GT America/Inter/system-ui
- Mono: JetBrains Mono/monospace

**布局姿态**：快乐爆发 / 手工+数字融合 / 实验排版

**代表作**：The Happy Show
**搜索关键词**：sagmeister walsh happy show

---

### 四、实验先锋派（13-16）
> 哲学：「打破规则即创造规则」

#### 反模式检测

| 反模式 | 为什么违反 | 修复方向 |
|--------|-----------|---------|
| ❌ 实验性牺牲可读性（文字无法辨认） | 实验先锋不等于反用户，可读性是不可逾越的底线 | ✅ 正文必须可辨认，实验性仅限标题/装饰/签名细节 |
| ❌ 技术展示无内容支撑（炫技但空洞） | 实验先锋派追求"技术诗学"，没有内容的技术是空洞的展示 | ✅ 为每个技术展示补充内容叙事：它传达了什么信息？ |
| ❌ 生成系统缺乏约束导致视觉混乱 | 无约束的生成系统产出不可控，违背设计意图 | ✅ 为生成系统添加约束参数（颜色范围/尺寸范围/密度上限） |
| ❌ 参数化设计无人工校准 | 纯算法产出缺乏设计判断，需要人工校准 | ✅ 算法生成后人工审查，调整异常值，确保整体和谐 |
| ❌ FUI 元素在非虚构产品中滥用 | FUI（Fantasy UI）属于虚构设计，在真实产品中滥用降低可信度 | ✅ FUI 元素仅用于概念展示/品牌短片，真实产品使用功能性 UI |

#### 提升路径

**Quick Win**（5 分钟）：为所有"炫技"元素补充内容关联说明——"这个技术展示传达了什么信息？"

**提升路径**（从 5 分到 8 分）：
1. 补充内容关联——为每个技术展示补充叙事：它传达了什么信息？
2. 检查可读性——正文必须可辨认，实验性仅限标题/装饰/签名细节
3. 为生成系统添加约束参数——颜色范围/尺寸范围/密度上限
4. 替换 FUI 元素——非虚构产品中使用功能性 UI，FUI 仅限概念展示
5. 验证技术展示有内容叙事支撑——"去掉技术，故事还在吗？"

#### 13. Zach Lieberman - 代码诗学
**哲学**：编程即绘画
**核心特征**：
- 手绘感的算法图形
- 实时生成艺术
- 黑白的纯粹表达
- 工具本身的可见性

**提示词DNA**：
```
Zach Lieberman code-as-art style:
- Hand-drawn aesthetic generated by code
- Black and white only, no color
- Real-time generative patterns
- Sketch-like line quality
- Visible process/grid/construction lines
- Poetic interpretation of algorithms
```

**参考色板 (OKLch)**：
- 主色: oklch(0.10 0.00 0) → #0a0a0a
- 辅色: oklch(0.90 0.00 0) → #e0e0e0
- 强调色: oklch(0.90 0.00 0) → #e0e0e0
- 背景: oklch(0.97 0.00 0) → #f0f0f0
- 文字: oklch(0.10 0.00 0) → #0a0a0a

**参考字体栈**：
- Display: Instrument Serif/Source Serif Pro/Georgia
- Body: Inter/system-ui/sans-serif
- Mono: JetBrains Mono/Source Code Pro/monospace

**布局姿态**：手绘算法 / 黑白纯粹 / 过程可见

**代表作**：openFrameworks creative coding
**搜索关键词**：zach lieberman openframeworks generative

---

#### 14. Raven Kwok - 参数化美学
**哲学**：系统的美胜过个体的美
**核心特征**：
- 分形与递归图形
- 黑白高对比
- 建筑化的信息结构
- 东方园林的算法演绎

**提示词DNA**：
```
Raven Kwok parametric aesthetic:
- Fractal patterns and recursive structures
- High-contrast black and white
- Architectural visualization of data
- Chinese garden principles in algorithm form
- Intricate detail that rewards zooming
- Processing/Creative coding aesthetic
```

**参考色板 (OKLch)**：
- 主色: oklch(0.08 0.00 0) → #080808
- 辅色: oklch(0.92 0.00 0) → #e8e8e8
- 强调色: oklch(0.92 0.00 0) → #e8e8e8
- 背景: oklch(0.05 0.00 0) → #050505
- 文字: oklch(0.88 0.00 0) → #d8d8d8

**参考字体栈**：
- Display: Space Grotesk/Helvetica Neue/Arial
- Body: Inter/system-ui/sans-serif
- Mono: JetBrains Mono/IBM Plex Mono/monospace

**布局姿态**：分形递归 / 高对比黑白 / 参数化网格

**代表作**：Raven Kwok generative art exhibitions
**搜索关键词**：raven kwok processing generative art

---

#### 15. Ash Thorp - 赛博诗意
**哲学**：未来不是冰冷的，是孤独的诗
**核心特征**：
- 电影级的光影
- 赛博朋克的温暖版本（橙/青，非冷蓝）
- 故事性的概念设计
- 工业美学的精致化

**提示词DNA**：
```
Ash Thorp cinematic concept art:
- Film-grade lighting and atmospheric effects
- Warm cyberpunk (orange/teal, NOT cold blue)
- Industrial design meets luxury
- Narrative concept art feel
- Volumetric lighting and god rays
- Blade Runner warmth over Tron coldness
```

**参考色板 (OKLch)**：
- 主色: oklch(0.10 0.02 30) → #1a0d08
- 辅色: oklch(0.65 0.18 50) → #d49040
- 强调色: oklch(0.60 0.15 200) → #40a0c0
- 背景: oklch(0.06 0.02 30) → #0a0604
- 文字: oklch(0.90 0.01 80) → #e8e4dc

**参考字体栈**：
- Display: Bebas Neue/Oswald/Impact
- Body: Inter/system-ui/sans-serif
- Mono: JetBrains Mono/Source Code Pro/monospace

**布局姿态**：电影级光影 / 温暖赛博 / 概念叙事

**代表作**：Ghost in the Shell concept art
**搜索关键词**：ash thorp ghost shell concept art

---

#### 16. Territory Studio - 屏幕界面虚构
**哲学**：未来UI的今日想象
**核心特征**：
- 科幻电影中的屏幕设计（FUI）
- 全息投影感
- 多层叠加的数据可视化
- 可信的未来感

**提示词DNA**：
```
Territory Studio FUI (Fantasy User Interface):
- Fantasy User Interface design
- Holographic projection aesthetics
- Orange/amber monochrome or cyan accents
- Multiple overlapping data layers
- Believable future technology
- Technical readouts and data streams
```

**参考色板 (OKLch)**：
- 主色: oklch(0.10 0.02 60) → #1a1408
- 辅色: oklch(0.65 0.18 70) → #d4a840
- 强调色: oklch(0.60 0.15 200) → #40a0c0
- 背景: oklch(0.06 0.02 60) → #0a0a04
- 文字: oklch(0.85 0.02 80) → #d8d4c8

**参考字体栈**：
- Display: Rajdhani/Orbitron/sans-serif
- Body: Inter/system-ui/sans-serif
- Mono: JetBrains Mono/Share Tech Mono/monospace

**布局姿态**：FUI全息 / 多层叠加 / 数据流

**代表作**：Blade Runner 2049 screen graphics
**搜索关键词**：territory studio blade runner interface

---

### 五、东方哲学派（17-20）
> 哲学：「留白即内容」

#### 反模式检测

| 反模式 | 为什么违反 | 修复方向 |
|--------|-----------|---------|
| ❌ 留白变成空洞（缺乏构图意图的空白） | 东方哲学的留白是"有意图的空"，空洞是"没想好放什么" | ✅ 标注每个留白区域的视觉目的（呼吸/过渡/聚焦），无目的的空白需填充或重新构图 |
| ❌ 东方元素作为装饰贴片（加个圆/和纸纹理） | 东方美学是结构原则，不是装饰元素 | ✅ 将装饰性东方元素替换为结构性的东方原则（留白节奏/呼吸感/层次递进） |
| ❌ 非线性结构导致导航迷失 | 东方哲学的非线性是"多入口的花园"，不是"迷宫" | ✅ 为非线性结构补充导航锚点，确保用户始终知道自己在哪、可以去哪 |
| ❌ 白的层次不足（只有一种白） | Kenya Hara 的核心是"白的层次"，单一白是未完成 | ✅ 建立至少 3 种白的层次（暖白 oklch(0.97 0.005 80)/冷白 oklch(0.97 0.005 260)/米白 oklch(0.95 0.01 80)） |
| ❌ 日式美学被简化为"和风装饰" | 表面化的日式美学（樱花/鸟居/和纸）是文化刻板印象 | ✅ 深入理解日式设计原则（间/余白/不对称平衡），用原则而非符号 |

#### 提升路径

**Quick Win**（5 分钟）：检查留白是否有构图意图，标注每个留白区域的视觉目的（呼吸/过渡/聚焦）。

**提升路径**（从 5 分到 8 分）：
1. 标注留白意图——每个留白区域必须有视觉目的，无目的的空白需填充或重新构图
2. 替换装饰为结构原则——将装饰性东方元素替换为结构性的东方原则（留白节奏/呼吸感/层次递进）
3. 建立白的层次系统——至少 3 种白（暖白/冷白/米白），用 oklch 精确定义
4. 为非线性结构补充导航锚点——确保用户始终知道自己在哪、可以去哪
5. 验证东方美学融入结构而非贴片——"去掉东方符号，东方感还在吗？"

#### 17. Takram - 日式思辨设计
**哲学**：技术是思考的媒介
**核心特征**：
- 概念原型的优雅
- 柔和的科技感（圆角、柔和阴影）
- 图表即艺术
- 谦逊的精致

**提示词DNA**：
```
Takram Japanese speculative design:
- Elegant concept prototypes and diagrams
- Soft tech aesthetic (rounded corners, gentle shadows)
- Charts and diagrams as art pieces
- Modest sophistication
- Neutral natural colors (beige, soft gray, muted green)
- Design as philosophical inquiry
```

**参考色板 (OKLch)**：
- 主色: oklch(0.50 0.02 80) → #7a7870
- 辅色: oklch(0.60 0.05 150) → #6a9a6f
- 强调色: oklch(0.55 0.08 260) → #5a6a9a
- 背景: oklch(0.96 0.01 80) → #f5f0e8
- 文字: oklch(0.20 0.02 80) → #2a2820

**参考字体栈**：
- Display: Noto Sans JP/Hiragino Sans/system-ui
- Body: Noto Sans JP/Hiragino Sans/system-ui
- Mono: JetBrains Mono/Source Code Pro/monospace

**布局姿态**：概念原型 / 柔和科技 / 谦逊精致

**代表作**：NHK Fabricated City
**搜索关键词**：takram nhk data visualization

---

#### 18. Kenya Hara - 空的设计
**哲学**：设计不是填充，是清空
**核心特征**：
- 极致的留白（80%+）
- 纸张质感的数字化
- 白色的层次（暖白、冷白、米白）
- 触觉的视觉化

**提示词DNA**：
```
Kenya Hara "emptiness" design:
- Extreme whitespace (80%+)
- Paper texture and tactility in digital form
- Layers of white (warm white, cool white, off-white)
- Minimal color (if any, very desaturated)
- Design by subtraction not addition
- Zen simplicity
```

**参考色板 (OKLch)**：
- 主色: oklch(0.97 0.005 80) → #f5f2ea
- 辅色: oklch(0.92 0.005 80) → #e8e4dc
- 强调色: oklch(0.50 0.02 80) → #7a7870
- 背景: oklch(0.98 0.003 80) → #faf8f4
- 文字: oklch(0.20 0.01 80) → #2a2820

**参考字体栈**：
- Display: Noto Serif JP/Hiragino Mincho/serif
- Body: Noto Sans JP/Hiragino Sans/system-ui
- Mono: JetBrains Mono/monospace

**布局姿态**：极致留白 / 80%+空白 / 白的层次

**代表作**：Muji art direction, 《Designing Design》
**搜索关键词**：kenya hara designing design muji

---

#### 19. Irma Boom - 书籍建筑师
**哲学**：信息的物理诗学
**核心特征**：
- 非线性的信息架构
- 边缘与边界的游戏
- 意外的颜色组合（粉+红、橙+棕）
- 手工艺的数字转译

**提示词DNA**：
```
Irma Boom book architecture style:
- Non-linear information structure
- Play with edges, margins, boundaries
- Unexpected color combos (pink+red, orange+brown)
- Handcraft translated to digital
- Dense information inviting exploration
- Editorial design, unconventional grid
```

**参考色板 (OKLch)**：
- 主色: oklch(0.65 0.22 350) → #d44060
- 辅色: oklch(0.60 0.18 50) → #c49030
- 强调色: oklch(0.55 0.15 150) → #4a8a4f
- 背景: oklch(0.96 0.01 80) → #f5f0e8
- 文字: oklch(0.15 0.02 30) → #2a1a10

**参考字体栈**：
- Display: GT Flexa/DK Snemand/serif
- Body: GT America/Inter/system-ui
- Mono: JetBrains Mono/monospace

**布局姿态**：非线性架构 / 边界游戏 / 意外配色

**代表作**：SHV Think Book (2136 pages)
**搜索关键词**：irma boom shv think book

---

#### 20. Naoto Fukasawa - 无意识设计
**哲学**：设计不是创造，是发现
**核心特征**：
- 无意识设计（Without Thought）
- 环境与行为的自然契合
- 极致的功能性简约
- 超常态（Super Normal）美学
- 材质本位的克制表达

**提示词DNA**：
```
Naoto Fukasawa without thought design:
- Affordance-driven form finding
- Objects that feel inevitable, not invented
- Neutral palette with material honesty
- Seamless integration with environment
- Super Normal: so natural it disappears
- Restraint as sophistication
```

**参考色板 (OKLch)**：
- 主色: oklch(0.75 0.02 90) → #b5b0a8
- 辅色: oklch(0.60 0.03 80) → #8a857d
- 强调色: oklch(0.45 0.04 70) → #6b665e
- 背景: oklch(0.96 0.01 90) → #f2f0ec
- 文字: oklch(0.25 0.02 80) → #3a3835

**参考字体栈**：
- Display: Noto Sans JP/Hiragino Sans/sans-serif
- Body: Noto Sans JP/Hiragino Sans/system-ui
- Mono: IBM Plex Mono/monospace

**布局姿态**：极致克制 / 物件本位 / 环境融合

**代表作**：Naoto Fukasawa ±0 product line, Muji CD player
**搜索关键词**：naoto fukasawa muji design

---

### 六、野蛮生长派（21-24）
> 哲学：「诚实比美观更重要——暴露骨架，拒绝粉饰」

#### 反模式检测

| 反模式 | 为什么违反 | 修复方向 |
|--------|-----------|---------|
| ❌ 粗糙变成懒惰（对齐不精确、间距随意） | 野蛮主义的「丑」是精心选择的诚实，不是真的粗制滥造 | ✅ 检查所有元素是否对齐到像素网格，间距是否遵循系统（即使是 4px 网格） |
| ❌ 裸露结构导致信息不可读 | 诚实不等于不可用，裸露骨架的目的是让结构可见，不是让内容消失 | ✅ 确保正文可读性——对比度 ≥ 4.5:1，字号 ≥ 14px，行高 ≥ 1.5 |
| ❌ 原色滥用（5+ 种原色同时出现） | 野蛮主义的原色是「诚实的颜色」，不是「所有颜色」 | ✅ 限制原色 ≤ 3 种（红+蓝+黄中选 1-2 种），其余用黑白灰 |
| ❌ 硬阴影/粗边框无系统（不同粗细/不同偏移量） | 野蛮主义的视觉系统同样需要规则，无系统的粗犷是混乱 | ✅ 统一边框粗细（2px 或 4px）、统一硬阴影偏移量（4px/8px） |
| ❌ 野蛮主义用于不合适的场景（医疗/金融/法律） | 野蛮主义的挑衅性在需要信任感的场景中适得其反 | ✅ 野蛮主义适合文化/创意/技术场景，信任敏感场景使用信息建筑派 |

#### 提升路径

**Quick Win**（5 分钟）：统一所有边框粗细和硬阴影偏移量——检查是否所有边框都是同一粗细，所有硬阴影偏移量一致。

**提升路径**（从 5 分到 8 分）：
1. 统一视觉系统——边框粗细、硬阴影偏移量、间距规则全部统一
2. 限制原色数量——≤ 3 种原色，其余用黑白灰
3. 检查可读性——对比度 ≥ 4.5:1，字号 ≥ 14px，行高 ≥ 1.5
4. 确认「丑」是选择而非懒惰——每个「粗糙」决策是否有意图？
5. 验证场景适配——野蛮主义是否适合当前项目的目标受众和行业？

#### 21. Pascal Devoyre - 裸露真实
**哲学**：HTML 本身就是最好的设计
**核心特征**：
- 裸露的 HTML 结构作为视觉语言
- 系统字体、零装饰、零圆角
- 黑白+1 种原色
- 内容即布局，无额外容器

**提示词DNA**：
```
Pascal Devoyre brutalist web aesthetic:
- Raw HTML structure as visual language
- System fonts only (Courier/Monaco/Menlo)
- Zero decoration, zero border-radius
- Black/white + one primary color (#FF0000 or #0000FF)
- Content is layout, no extra containers
- Visible borders, no shadows
```

**参考色板 (OKLch)**：
- 主色: oklch(0.10 0.00 0) → #111111
- 辅色: oklch(0.95 0.00 0) → #f0f0f0
- 强调色: oklch(0.55 0.25 25) → #e03030
- 背景: oklch(0.98 0.00 0) → #fafafa
- 文字: oklch(0.10 0.00 0) → #111111

**参考字体栈**：
- Display: Courier New/Courier/monospace
- Body: Courier New/Courier/monospace
- Mono: Courier New/Courier/monospace

**布局姿态**：裸露 HTML / 零装饰 / 边框即结构

**代表作**：Brutalist Websites 策展项目
**搜索关键词**：pascal devoyre brutalist websites

---

#### 22. Michele Mazzini - 新野蛮 UI
**哲学**：界面不需要假装精致
**核心特征**：
- 粗边框卡片（2-4px solid black）
- 硬阴影（hard shadow，无模糊）
- 原色色块（红/蓝/黄直出）
- 扁平但有力的视觉层级

**提示词DNA**：
```
Michele Mazzini neo-brutalist UI:
- Thick borders (2-4px solid black), zero border-radius
- Hard shadows (4-8px offset, zero blur)
- Primary colors as blocks (#FF0000, #0000FF, #FFFF00)
- Flat but forceful visual hierarchy
- Monospace or bold sans-serif
- UI elements that look like UI elements
```

**参考色板 (OKLch)**：
- 主色: oklch(0.10 0.00 0) → #111111
- 辅色: oklch(0.55 0.25 260) → #2040d0
- 强调色: oklch(0.85 0.25 100) → #e8e030
- 背景: oklch(0.95 0.01 80) → #f0ece4
- 文字: oklch(0.10 0.00 0) → #111111

**参考字体栈**：
- Display: Space Grotesk/Inter Tight/system-ui
- Body: Space Grotesk/Inter/system-ui
- Mono: JetBrains Mono/Courier New/monospace

**布局姿态**：粗边框 / 硬阴影 / 原色色块

**代表作**：Hype4Academy Neo-Brutalism UI 系统
**搜索关键词**：michele mazzini neo brutalism UI

---

#### 23. Bloomberg Businessweek - 野蛮编辑
**哲学**：信息密度本身就是设计
**核心特征**：
- 极端的信息密度
- 小报式标题（超大字号+粗体）
- 数据裸露（无修饰的图表和数字）
- 编辑排版的新闻美学

**提示词DNA**：
```
Bloomberg Businessweek editorial brutalism:
- Extreme information density
- Tabloid-scale headlines (120px+)
- Data exposed without decoration
- News editorial aesthetic
- Mixed serif/sans-serif for hierarchy
- Charts and tables as primary visual
```

**参考色板 (OKLch)**：
- 主色: oklch(0.10 0.00 0) → #111111
- 辅色: oklch(0.55 0.20 25) → #c96442
- 强调色: oklch(0.55 0.20 25) → #c96442
- 背景: oklch(0.97 0.005 80) → #f7f5f0
- 文字: oklch(0.10 0.00 0) → #111111

**参考字体栈**：
- Display: Bloomberg Terminal/Custom/Helvetica Neue
- Body: Helvetica Neue/Inter/system-ui
- Mono: Bloomberg Terminal/Menlo/monospace

**布局姿态**：信息密集 / 小报标题 / 数据裸露

**代表作**：Bloomberg Businessweek 杂志改版
**搜索关键词**：bloomberg businessweek redesign brutalist

---

#### 24. Lotta Nieminen - 北欧野蛮
**哲学**：野蛮也可以是温柔的
**核心特征**：
- 几何原始形+克制配色
- 结构可见性但不过度暴露
- 北欧功能主义与野蛮主义的融合
- 原始形中的诗意

**提示词DNA**：
```
Lotta Nieminen Nordic brutalism:
- Geometric primitive shapes with restrained palette
- Structure visible but not aggressively exposed
- Nordic functionalism meets brutalist honesty
- Poetic quality within primitive forms
- Muted colors with bold geometry
- Handcraft sensibility in digital form
```

**参考色板 (OKLch)**：
- 主色: oklch(0.40 0.02 80) → #6a6860
- 辅色: oklch(0.60 0.10 200) → #5a8aaa
- 强调色: oklch(0.55 0.15 25) → #c47a52
- 背景: oklch(0.96 0.01 80) → #f5f0e8
- 文字: oklch(0.15 0.02 80) → #1a1810

**参考字体栈**：
- Display: GT America/Graphik/Helvetica Neue
- Body: GT America/Inter/system-ui
- Mono: JetBrains Mono/Menlo/monospace

**布局姿态**：几何原始 / 克制配色 / 功能诗意

**代表作**：Lotta Nieminen Studio 品牌项目
**搜索关键词**：lotta nieminen studio branding

---

### 七、后现代狂欢派（25-28）
> 哲学：「好品味是创造力的监狱——用戏谑和碰撞解放设计」

#### 反模式检测

| 反模式 | 为什么违反 | 修复方向 |
|--------|-----------|---------|
| ❌ 几何元素无构图逻辑（随机撒三角形和圆形） | 孟菲斯的几何是「有意图的碰撞」，不是「无序的混乱」 | ✅ 每个几何元素必须有构图目的——它是引导视线、创造节奏、还是建立对比？ |
| ❌ 粉彩+原色组合不和谐 | 孟菲斯的色彩碰撞是精心计算的意外，不是真的不和谐 | ✅ 用 oklch 色彩空间确保碰撞色的明度一致，饱和度差 ≤ 0.1 |
| ❌ 装饰图案与内容无关 | 后现代的装饰是结构元素，不是附加的贴片 | ✅ 装饰图案必须服务于信息传达——区分类别、标识状态、引导视线 |
| ❌ 不对称布局导致导航迷失 | 打破网格 ≠ 没有网格，后现代的非对称是「有规则的反规则」 | ✅ 建立基础网格后选择性地打破，而非完全无网格 |
| ❌ 戏谑变成轻浮（严肃内容用戏谑视觉） | 后现代的戏谑是态度，不是对所有内容的嘲讽 | ✅ 严肃内容（医疗/法律/安全）使用克制视觉，戏谑仅限品牌/文化/创意场景 |

#### 提升路径

**Quick Win**（5 分钟）：检查每个几何元素的构图目的——「去掉这个三角形，构图会变差吗？」如果不会，删掉。

**提升路径**（从 5 分到 8 分）：
1. 审查几何元素构图逻辑——每个元素必须有构图目的
2. 校准色彩碰撞——用 oklch 确保碰撞色的明度一致，饱和度差 ≤ 0.1
3. 建立基础网格——先有网格，再选择性地打破
4. 将装饰图案与内容关联——装饰必须服务于信息传达
5. 验证戏谑的适度性——严肃内容使用克制视觉

#### 25. Ettore Sottsass - 孟菲斯奠基
**哲学**：设计应该让人微笑，而不是让人敬畏
**核心特征**：
- 几何形碰撞（三角形+圆形+锯齿线共存）
- 粉彩+原色的意外组合
- 文化混搭（东方+西方+非洲元素）
- 功能服从于情感

**提示词DNA**：
```
Ettore Sottsass Memphis Group aesthetic:
- Geometric collision (triangles + circles + zigzags)
- Pastel + primary color unexpected combos
- Cultural mashup (East + West + African motifs)
- Function follows emotion
- Laminate + terrazzo + plastic materials
- Playful proportions, anti-golden-ratio
```

**参考色板 (OKLch)**：
- 主色: oklch(0.75 0.15 350) → #e880a0
- 辅色: oklch(0.80 0.18 90) → #f0d040
- 强调色: oklch(0.55 0.25 260) → #2040d0
- 背景: oklch(0.95 0.01 80) → #f0ece4
- 文字: oklch(0.15 0.02 30) → #2a1a10

**参考字体栈**：
- Display: Bricolage Grotesque/DK Snemand/custom
- Body: Inter/system-ui/sans-serif
- Mono: JetBrains Mono/monospace

**布局姿态**：几何碰撞 / 文化混搭 / 反黄金比例

**代表作**：Carlton 书架、Memphis Group 家具系列
**搜索关键词**：ettore sottsass memphis carlton bookcase

---

#### 26. Camille Walala - 当代孟菲斯
**哲学**：色彩和几何是社区的粘合剂
**核心特征**：
- 大胆几何+原色+空间互动
- 建筑尺度的孟菲斯语言
- 社区参与的设计过程
- 快乐的公共空间

**提示词DNA**：
```
Camille Walala contemporary Memphis:
- Bold geometric patterns at architectural scale
- Primary colors + black/white + pastels
- Interactive spatial design
- Community-driven creative process
- Murals + installations + wayfinding
- Joy as design strategy
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.25 25) → #e03030
- 辅色: oklch(0.70 0.20 90) → #e8c830
- 强调色: oklch(0.55 0.25 260) → #2040d0
- 背景: oklch(0.95 0.01 80) → #f0ece4
- 文字: oklch(0.10 0.00 0) → #111111

**参考字体栈**：
- Display: Walala Custom/Blocky display/Impact
- Body: Inter/system-ui/sans-serif
- Mono: JetBrains Mono/monospace

**布局姿态**：建筑尺度 / 社区互动 / 快乐几何

**代表作**：London Now Gallery 装置、Walala Land
**搜索关键词**：camille walala installation london

---

#### 27. Morag Myerscough - 社区色彩
**哲学**：色彩创造归属感
**核心特征**：
- 超彩信息牌+社区参与
- 文字即装饰（大字标语作为视觉元素）
- 归属感驱动的色彩系统
- 包容性设计语言

**提示词DNA**：
```
Morag Myerscough community color:
- Super-color signage and wayfinding
- Text as decoration (large slogans as visual elements)
- Belonging-driven color systems
- Inclusive design language
- Hospital/school/public space transformation
- Hand-painted quality in digital form
```

**参考色板 (OKLch)**：
- 主色: oklch(0.65 0.22 150) → #30b060
- 辅色: oklch(0.70 0.20 50) → #e0a830
- 强调色: oklch(0.60 0.25 330) → #d040a0
- 背景: oklch(0.95 0.01 80) → #f0ece4
- 文字: oklch(0.10 0.00 0) → #111111

**参考字体栈**：
- Display: Custom display/Impact/Bebas Neue
- Body: Inter/system-ui/sans-serif
- Mono: JetBrains Mono/monospace

**布局姿态**：超彩信息牌 / 文字即装饰 / 社区归属

**代表作**：Sheffield Children's Hospital 色彩改造
**搜索关键词**：morag myerscough sheffield hospital color

---

#### 28. Studio Moross - 图形极繁
**哲学**：流行文化是最好的设计素材
**核心特征**：
- 图形叠加+色彩爆炸
- 流行文化拼贴
- 音乐/时尚/品牌的视觉语言融合
- 数字时代的 MTV 美学

**提示词DNA**：
```
Studio Moross graphic maximalism:
- Layered graphics + color explosion
- Pop culture collage aesthetic
- Music/fashion/brand visual language fusion
- Digital MTV aesthetic
- Bold typography + illustration + pattern
- Youth culture energy
```

**参考色板 (OKLch)**：
- 主色: oklch(0.65 0.25 330) → #d440a0
- 辅色: oklch(0.75 0.20 180) → #50d0d0
- 强调色: oklch(0.80 0.22 90) → #f0d040
- 背景: oklch(0.95 0.01 80) → #f0ece4
- 文字: oklch(0.10 0.00 0) → #111111

**参考字体栈**：
- Display: Moross Custom/Bricolage Grotesque/Impact
- Body: Inter/system-ui/sans-serif
- Mono: JetBrains Mono/monospace

**布局姿态**：图形叠加 / 流行拼贴 / MTV 美学

**代表作**：Studio Moross 音乐/时尚品牌项目
**搜索关键词**：studio moross graphic design music

---

### 八、有机仿生派（29-32）
> 哲学：「自然是最伟大的设计师——模仿其形态，更要模仿其过程」

#### 反模式检测

| 反模式 | 为什么违反 | 修复方向 |
|--------|-----------|---------|
| ❌ 有机曲线变成无意义的装饰弧线 | 有机仿生的曲线是「功能的形态」，不是「装饰的弧线」 | ✅ 每条曲线必须对应一个功能目的——引导视线、分隔区域、表达数据 |
| ❌ 生物形态与内容无关（加个细胞图案装饰） | 有机仿生的形态是内容的延伸，不是贴上去的装饰 | ✅ 生物形态必须与内容主题关联——科技产品用神经网络、环保项目用叶脉纹理 |
| ❌ 自然渐变色导致对比度不足 | 有机仿生的柔和过渡不能牺牲可读性 | ✅ 正文与背景对比度 ≥ 4.5:1，渐变色仅用于非文字区域 |
| ❌ 生成式图案缺乏人工校准 | 纯算法产出的自然形态缺乏设计判断 | ✅ 算法生成后人工审查，调整异常值，确保整体和谐 |
| ❌ 材料本真变成粗糙未完成 | 展示材料质感不等于不做表面处理 | ✅ 材料纹理必须经过设计处理——调色、裁切、构图，而非原始素材直出 |

#### 提升路径

**Quick Win**（5 分钟）：检查每条曲线的功能目的——「这条弧线引导视线去哪里？分隔了什么区域？表达什么数据？」无目的的弧线删掉。

**提升路径**（从 5 分到 8 分）：
1. 审查曲线功能目的——每条曲线必须对应功能目的
2. 关联生物形态与内容——形态必须与内容主题关联
3. 检查渐变色对比度——正文与背景 ≥ 4.5:1
4. 人工校准生成式图案——算法生成后人工审查调整
5. 处理材料纹理——纹理必须经过设计处理，而非原始直出

#### 29. Neri Oxman - 材料生态
**哲学**：设计不是塑造材料，是让材料自己生长
**核心特征**：
- 生物打印+蚕丝结构+生长算法
- 材料生态学（Material Ecology）方法论
- 科学可视化即艺术
- 跨物种协作设计

**提示词DNA**：
```
Neri Oxman material ecology:
- Bio-printing + silk structures + growth algorithms
- Material Ecology methodology
- Scientific visualization as art
- Cross-species collaborative design
- Organic growth patterns in digital form
- Research-driven aesthetic
```

**参考色板 (OKLch)**：
- 主色: oklch(0.60 0.05 80) → #8a8578
- 辅色: oklch(0.55 0.10 150) → #5a9a60
- 强调色: oklch(0.50 0.12 30) → #a65d3f
- 背景: oklch(0.96 0.01 80) → #f5f0e8
- 文字: oklch(0.20 0.02 80) → #2a2820

**参考字体栈**：
- Display: GT America/Graphik/Helvetica Neue
- Body: GT America/Inter/system-ui
- Mono: JetBrains Mono/Source Code Pro/monospace

**布局姿态**：生长算法 / 材料生态 / 科学可视化

**代表作**：Silk Pavilion、The Living 研究项目
**搜索关键词**：neri oxman silk pavilion material ecology

---

#### 30. Ross Lovegrove - 有机工业
**哲学**：进化论是最好的设计方法论
**核心特征**：
- 流动金属+生物形态
- 减材设计（减到自然允许的最少）
- 进化论驱动的形态发现
- 工业产品的有机优雅

**提示词DNA**：
```
Ross Lovegrove organic industrial:
- Flowing metal + biomorphic forms
- Subtractive design (reduce to nature's minimum)
- Evolution-driven form finding
- Organic elegance in industrial products
- Liquid metal surfaces
- Nature-optimized structures
```

**参考色板 (OKLch)**：
- 主色: oklch(0.75 0.02 80) → #b5b0a8
- 辅色: oklch(0.60 0.05 200) → #7a9aaa
- 强调色: oklch(0.55 0.10 150) → #5a9a60
- 背景: oklch(0.96 0.01 80) → #f5f0e8
- 文字: oklch(0.20 0.02 80) → #2a2820

**参考字体栈**：
- Display: Futura/Avenir/Helvetica Neue
- Body: Avenir/Inter/system-ui
- Mono: JetBrains Mono/Menlo/monospace

**布局姿态**：流动金属 / 减材设计 / 进化形态

**代表作**：Water Drop 台灯、Go Chair
**搜索关键词**：ross lovegrove organic industrial design

---

#### 31. Daan Roosegaarde - 技术诗意
**哲学**：技术应该让人重新感受自然
**核心特征**：
- 光+自然+互动装置
- 环境问题的诗意解决方案
- 技术-自然诗意（Techno-Poetry）
- 感官体验驱动设计

**提示词DNA**：
```
Daan Roosegaarde techno-poetry:
- Light + nature + interactive installation
- Poetic solutions to environmental problems
- Techno-Poetry methodology
- Sensory experience-driven design
- Glow-in-the-dark landscapes
- Smog-free technology as art
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.15 200) → #40a0c0
- 辅色: oklch(0.65 0.18 150) → #60c070
- 强调色: oklch(0.70 0.15 280) → #8080e0
- 背景: oklch(0.06 0.01 260) → #0a0a12
- 文字: oklch(0.90 0.01 80) → #e8e4dc

**布局姿态**：光+自然 / 技术诗意 / 感官体验

**代表作**：Smog Free Tower、Waterlicht、Van Gogh Path
**搜索关键词**：daan roosegaarde smog free tower waterlicht

---

#### 32. Heatherwick Studio - 有机建筑
**哲学**：建筑应该是令人惊奇的有机体
**核心特征**：
- 生物形态建筑+功能雕塑
- 有机结构与工程创新的融合
- 雕塑感+惊奇感
- 人性化的巨型尺度

**提示词DNA**：
```
Heatherwick Studio organic architecture:
- Biomorphic architecture + functional sculpture
- Organic structure meets engineering innovation
- Sculptural quality + sense of wonder
- Humanized monumental scale
- Staircase as landscape (Vessel)
- Seed cathedral (UK Pavilion)
```

**参考色板 (OKLch)**：
- 主色: oklch(0.65 0.08 60) → #c4a860
- 辅色: oklch(0.55 0.10 150) → #5a9a60
- 强调色: oklch(0.60 0.15 25) → #c47a52
- 背景: oklch(0.96 0.01 80) → #f5f0e8
- 文字: oklch(0.20 0.02 80) → #2a2820

**参考字体栈**：
- Display: GT America/Graphik/Helvetica Neue
- Body: GT America/Inter/system-ui
- Mono: JetBrains Mono/Menlo/monospace

**布局姿态**：生物形态 / 功能雕塑 / 惊奇尺度

**代表作**：UK Pavilion Seed Cathedral、Vessel at Hudson Yards
**搜索关键词**：heatherwick studio seed cathedral vessel

---

### 九、复古未来派（33-36）
> 哲学：「未来已经过时了——用昨天的明天重新想象今天」

#### 反模式检测

| 反模式 | 为什么违反 | 修复方向 |
|--------|-----------|---------|
| ❌ 复古元素无时代锚点（混搭 50 年代+80 年代+2000 年代） | 复古未来的力量来自「特定时代的未来想象」，时代混搭削弱时间错位感 | ✅ 选择一个时代锚点（太空时代/Y2K/赛博朋克），视觉语言围绕该锚点展开 |
| ❌ 铬金属/液态质感覆盖全页 | 复古未来的质感是「签名细节」，不是「全页滤镜」 | ✅ 铬/液态质感仅用于 1-2 个关键元素，其余用中性材质 |
| ❌ CRT 效果影响可读性 | 扫描线/像素化是氛围元素，不能牺牲内容可读性 | ✅ CRT 效果仅用于背景/装饰区域，正文区域保持清晰 |
| ❌ 怀旧变成复古贴片（加个像素字体就完事） | 复古未来是「用过去的未来想象重新思考现在」，不是「加几个复古元素」 | ✅ 复古元素必须服务于内容叙事——它传达了什么关于未来的想象？ |
| ❌ Y2K 美学在非潮流场景滥用 | Y2K 美学适合潮流/创意/文化场景，在专业/信任场景中降低可信度 | ✅ 专业场景使用更克制的复古未来（如 Syd Mead 的工业诗意），而非 Y2K 液态金属 |

#### 提升路径

**Quick Win**（5 分钟）：确认时代锚点——「这个设计的复古未来锚定在哪个时代？」如果无法回答，选择一个锚点并统一视觉语言。

**提升路径**（从 5 分到 8 分）：
1. 确认时代锚点——选择一个时代锚点，视觉语言围绕该锚点展开
2. 限制特效质感——铬/液态质感仅用于 1-2 个关键元素
3. 保护可读性——CRT 效果仅用于背景/装饰区域
4. 关联复古与叙事——复古元素必须服务于内容叙事
5. 匹配场景——专业场景用克制的复古未来，潮流场景可用 Y2K

#### 33. Syd Mead - 视觉未来主义
**哲学**：未来的设计应该比现在更优雅
**核心特征**：
- 铬金属+流线型+工业诗意
- 太空时代的乐观主义
- 工业设计级别的未来想象
- 光与反射的精确描绘

**提示词DNA**：
```
Syd Mead visual futurism:
- Chrome + streamlining + industrial poetry
- Space-age optimism
- Industrial design-grade future imagination
- Precise light and reflection rendering
- Believable future (not fantasy)
- Vehicle/environment concept art
```

**参考色板 (OKLch)**：
- 主色: oklch(0.75 0.02 80) → #b5b0a8
- 辅色: oklch(0.65 0.15 50) → #d49040
- 强调色: oklch(0.55 0.15 200) → #4090b0
- 背景: oklch(0.12 0.02 260) → #0d0d1a
- 文字: oklch(0.90 0.01 80) → #e8e4dc

**参考字体栈**：
- Display: Eurostile/Bank Gothic/Helvetica Neue
- Body: Helvetica Neue/Inter/system-ui
- Mono: JetBrains Mono/Menlo/monospace

**布局姿态**：铬金属 / 流线型 / 工业诗意

**代表作**：Blade Runner 概念设计、Aliens 概念设计
**搜索关键词**：syd mead blade runner concept art

---

#### 34. Daniel Simon - 宇宙汽车
**哲学**：未来的交通工具是最好的设计画布
**核心特征**：
- 流线型+铬金属+太空竞赛
- 宇宙尺度的工业设计
- 速度感的视觉表达
- 梦幻但可信的机械美学

**提示词DNA**：
```
Daniel Simon cosmic motors:
- Streamlining + chrome + space race aesthetic
- Cosmic-scale industrial design
- Speed as visual expression
- Dreamy but believable mechanical aesthetic
- Vehicle concept art as design language
- Retro-futuristic engineering
```

**参考色板 (OKLch)**：
- 主色: oklch(0.70 0.02 80) → #a8a49c
- 辅色: oklch(0.60 0.18 50) → #d49040
- 强调色: oklch(0.50 0.15 260) → #3060a0
- 背景: oklch(0.08 0.02 260) → #0a0a14
- 文字: oklch(0.90 0.01 80) → #e8e4dc

**参考字体栈**：
- Display: Eurostile/Orbitron/Helvetica Neue
- Body: Helvetica Neue/Inter/system-ui
- Mono: JetBrains Mono/Share Tech Mono/monospace

**布局姿态**：宇宙流线 / 铬金属 / 太空竞赛

**代表作**：Cosmic Motors 概念车系列
**搜索关键词**：daniel simon cosmic motors concept

---

#### 35. Actual Source - Y2K 平面
**哲学**：2000 年的数字美学是最好的设计考古
**核心特征**：
- 液态金属+气泡字体
- 早期数字纹理（低分辨率、CRT 残留）
- 千禧焦虑美学
- 透明/半透明材质

**提示词DNA**：
```
Actual Source Y2K graphic:
- Liquid metal + bubble type
- Early digital textures (low-res, CRT residue)
- Millennial anxiety aesthetic
- Transparent/translucent materials
- iMac G3 color palette
- Early web design nostalgia
```

**参考色板 (OKLch)**：
- 主色: oklch(0.70 0.15 200) → #60c0e0
- 辅色: oklch(0.75 0.18 330) → #e080c0
- 强调色: oklch(0.80 0.15 150) → #80e0a0
- 背景: oklch(0.95 0.01 260) → #f0f0f6
- 文字: oklch(0.15 0.02 260) → #1a1a2a

**参考字体栈**：
- Display: Custom bubble/inflated type/Impact
- Body: Inter/system-ui/sans-serif
- Mono: Courier New/Monaco/monospace

**布局姿态**：液态金属 / 气泡字体 / 千禧数字

**代表作**：Actual Source 出版物和品牌项目
**搜索关键词**：actual source Y2K graphic design

---

#### 36. Andrés Reisinger - 超现实数字
**哲学**：数字世界不需要遵守物理规则
**核心特征**：
- 柔软数字物+梦境空间
- 粉彩金属质感
- 超现实但舒适的数字环境
- 雕塑感的数字物件

**提示词DNA**：
```
Andres Reisinger surreal digital:
- Soft digital objects + dream spaces
- Pastel metallic textures
- Surreal but comfortable digital environments
- Sculptural digital objects
- Pink/chrome/cream palette
- Furniture that defies physics
```

**参考色板 (OKLch)**：
- 主色: oklch(0.75 0.10 330) → #d090c0
- 辅色: oklch(0.80 0.05 80) → #d0ccc4
- 强调色: oklch(0.70 0.15 50) → #d4a050
- 背景: oklch(0.95 0.01 80) → #f5f0e8
- 文字: oklch(0.20 0.02 80) → #2a2820

**参考字体栈**：
- Display: Custom display/Instrument Serif/Georgia
- Body: Inter/system-ui/sans-serif
- Mono: JetBrains Mono/Menlo/monospace

**布局姿态**：柔软数字 / 梦境空间 / 粉彩金属

**代表作**：The Shipping、Take Over 系列
**搜索关键词**：andres reisinger surreal digital art

---

### 十、极繁主义派（37-40）
> 哲学：「更多就是更多——丰盈不是混乱，是深度的表达」

#### 反模式检测

| 反模式 | 为什么违反 | 修复方向 |
|--------|-----------|---------|
| ❌ 丰盈变成混乱（无层级的信息堆叠） | 极繁主义的「多」是「有序的多」，不是「无序的堆叠」 | ✅ 建立清晰的视觉层级——即使信息密集，主次关系必须可辨 |
| ❌ 装饰性细节无叙事目的 | 极繁主义的装饰是「有叙事的装饰」，不是「空洞的填充」 | ✅ 每个装饰细节必须承载信息——文化引用、品牌故事、情感线索 |
| ❌ 色彩系统失控（7+ 颜色无主次） | 极繁主义的多色是「有系统的多色」，不是「所有颜色」 | ✅ 建立色彩层级——1 个主色 + 2 个辅色 + 2-3 个点缀色，有明确的主次 |
| ❌ 混合字体无逻辑（5+ 字体随意切换） | 极繁主义的字体混合是「有意图的对比」，不是「随机拼凑」 | ✅ 字体混合遵循功能逻辑——display + body + accent 各 1-2 种，用途明确 |
| ❌ 文化引用无关联（不同时代/文化元素随意拼贴） | 极繁主义的文化拼贴是「有叙事的关联」，不是「猎奇的混搭」 | ✅ 文化元素必须服务于品牌/内容叙事——它们共同讲述了什么故事？ |

#### 提升路径

**Quick Win**（5 分钟）：检查色彩层级——「哪个是主色？哪个是辅色？哪些是点缀色？」如果无法回答，建立色彩层级系统。

**提升路径**（从 5 分到 8 分）：
1. 建立色彩层级——1 主色 + 2 辅色 + 2-3 点缀色，明确主次
2. 建立视觉层级——即使信息密集，主次关系必须可辨
3. 审查装饰叙事——每个装饰细节必须承载信息
4. 规范字体混合——display + body + accent 各 1-2 种
5. 关联文化引用——文化元素必须服务于品牌/内容叙事

#### 37. David Carson - 解构排版
**哲学**：排版不需要被阅读，需要被感受
**核心特征**：
- 破碎排版+多层叠加
- 直觉驱动的版面决策
- 可读性的故意破坏
- 情感优先于功能

**提示词DNA**：
```
David Carson deconstructed typography:
- Broken typography + layered overlays
- Intuition-driven layout decisions
- Deliberate destruction of readability
- Emotion over function
- Grunge + experimental + rebellious
- Ray Gun magazine aesthetic
```

**参考色板 (OKLch)**：
- 主色: oklch(0.10 0.00 0) → #111111
- 辅色: oklch(0.55 0.20 25) → #c96442
- 强调色: oklch(0.65 0.22 350) → #d44060
- 背景: oklch(0.95 0.01 80) → #f0ece4
- 文字: oklch(0.10 0.00 0) → #111111

**参考字体栈**：
- Display: Custom experimental/Foundry Gridnik/Impact
- Body: Inter/system-ui/sans-serif
- Mono: JetBrains Mono/Courier/monospace

**布局姿态**：解构排版 / 直觉驱动 / 情感优先

**代表作**：Ray Gun 杂志
**搜索关键词**：david carson ray gun magazine

---

#### 38. Paula Scher - 信息地图
**哲学**：信息密度是最好的视觉语言
**核心特征**：
- 信息密集+字体拼贴
- 文化地图式视觉系统
- 字体即图形（多种字体创造层次）
- 品牌身份的地图化表达

**提示词DNA**：
```
Paula Scher information maps:
- Information-dense + typographic collage
- Cultural map visual systems
- Typography as graphic (multiple fonts create layers)
- Brand identity as map
- Bold color blocks + type layers
- Public Theater / Citi identity approach
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.25 25) → #e03030
- 辅色: oklch(0.55 0.20 260) → #2040d0
- 强调色: oklch(0.80 0.22 90) → #f0d040
- 背景: oklch(0.95 0.01 80) → #f0ece4
- 文字: oklch(0.10 0.00 0) → #111111

**参考字体栈**：
- Display: Custom display/FF Meta/Helvetica Neue
- Body: Helvetica Neue/Inter/system-ui
- Mono: JetBrains Mono/Menlo/monospace

**布局姿态**：信息地图 / 字体拼贴 / 文化密度

**代表作**：Public Theater 品牌识别、Citi 品牌识别
**搜索关键词**：paula scher public theater citi identity

---

#### 39. Peter Saville - 音乐封面极繁
**哲学**：封面是音乐的视觉翻译
**核心特征**：
- 音乐封面极繁+文化密度
- 不同时代/风格的视觉拼贴
- 精致的排版叠加
- 音乐情绪的视觉化表达

**提示词DNA**：
```
Peter Saville music cover maximalism:
- Music cover maximalism + cultural density
- Visual collage across eras/styles
- Sophisticated typographic layering
- Musical emotion visualized
- Factory Records aesthetic
- Modernist references recontextualized
```

**参考色板 (OKLch)**：
- 主色: oklch(0.15 0.02 260) → #1a1a2a
- 辅色: oklch(0.70 0.18 330) → #d080c0
- 强调色: oklch(0.80 0.15 90) → #f0d040
- 背景: oklch(0.95 0.01 80) → #f0ece4
- 文字: oklch(0.15 0.02 260) → #1a1a2a

**参考字体栈**：
- Display: Custom display/Helvetica Neue/Futura
- Body: Inter/system-ui/sans-serif
- Mono: JetBrains Mono/Menlo/monospace

**布局姿态**：音乐封面 / 文化拼贴 / 排版叠加

**代表作**：Joy Division Unknown Pleasures 封面、New Power, Corruption & Lies 封面
**搜索关键词**：peter saville factory records joy division cover

---

#### 40. Kelly Wearstler - 空间极繁
**哲学**：空间是最大的画布，历史是最好的颜料
**核心特征**：
- 材质叠加+历史拼贴+感官丰盈
- 不同时代/文化的视觉元素共存
- 奢华的触觉视觉化
- 室内设计的 2D 转译

**提示词DNA**：
```
Kelly Wearstler spatial maximalism:
- Material layering + historical collage + sensory richness
- Different eras/cultures coexisting visually
- Luxurious tactility visualized
- Interior design translated to 2D
- Stone + metal + textile + ceramic textures
- Warm earth tones + metallic accents
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.10 50) → #b08040
- 辅色: oklch(0.45 0.08 30) → #8a6040
- 强调色: oklch(0.70 0.15 150) → #60c070
- 背景: oklch(0.90 0.02 80) → #e0dcd4
- 文字: oklch(0.15 0.02 30) → #2a1a10

**参考字体栈**：
- Display: Custom serif/Didot/Playfair Display
- Body: GT America/Inter/system-ui
- Mono: JetBrains Mono/Menlo/monospace

**布局姿态**：材质叠加 / 历史拼贴 / 感官丰盈

**代表作**：Proper Hotels 空间设计
**搜索关键词**：kelly wearstler proper hotels maximalism

---

### 流派兼容性矩阵

> 设计可以融合多个流派，但并非所有流派都能共存。以下矩阵指导混搭决策。

#### ✅ 兼容流派（可混搭）

| 组合 | 共享基因 | 混搭指导 |
|------|---------|---------|
| 信息建筑派 + 极简主义派 | 网格系统、克制、功能主义 | 用信息建筑派的数据结构做骨架，极简主义的留白做呼吸。避免：数据密度过高破坏极简感 |
| 运动诗学派 + 实验先锋派 | 技术驱动、动态、前沿感 | 用实验先锋派的生成系统做视觉引擎，运动诗学派的叙事做节奏。避免：技术过载导致性能问题 |
| 东方哲学派 + 极简主义派 | 减法、留白、呼吸感 | 用极简主义的网格系统做结构，东方哲学的留白节奏做韵律。避免：双重减法导致信息不足 |
| 野蛮生长派 + 实验先锋派 | 打破规则、反叛、探索边界 | 野蛮主义反叛精致，实验先锋探索边界。用野蛮主义的结构暴露做骨架，实验先锋的生成技术做视觉。避免：双重反叛导致不可用 |
| 后现代狂欢派 + 极繁主义派 | 丰盈、多色、多层叠加 | 孟菲斯偏戏谑碰撞，极繁偏严肃深度。用孟菲斯的几何语言做视觉元素，极繁的层次逻辑做信息结构。避免：戏谑+丰盈=视觉过载 |
| 有机仿生派 + 东方哲学派 | 自然、流动、呼吸感 | 东方哲学是感知的自然，有机仿生是形态的自然。用东方哲学的留白节奏做空间，有机仿生的流动曲线做形态。避免：双重柔和导致缺乏焦点 |
| 有机仿生派 + 运动诗学派 | 流动、沉浸、感官体验 | 运动诗学做叙事节奏，有机仿生做视觉形态。用有机仿生的流动曲线做视觉，运动诗学的滚动叙事做节奏。避免：双重流动导致缺乏锚点 |
| 复古未来派 + 运动诗学派 | 沉浸、氛围、感官体验 | 复古未来做氛围，运动诗学做叙事。用复古未来的视觉语言做环境，运动诗学的叙事节奏做结构。避免：双重氛围导致内容被淹没 |
| 野蛮生长派 + 后现代狂欢派 | 反叛、反精致、反好品味 | 野蛮主义反叛精致，孟菲斯反叛好品味。用野蛮主义的结构暴露做框架，孟菲斯的色彩碰撞做视觉。避免：双重反叛导致不可用 |
| 后现代狂欢派 + 有机仿生派 | 有机形、流动、非几何刚性 | 孟菲斯的几何碰撞+有机仿生的流动曲线。用孟菲斯的色彩和图案做装饰，有机仿生的曲线做形态。避免：几何+曲线冲突 |
| 后现代狂欢派 + 复古未来派 | 文化拼贴、视觉冲击 | 孟菲斯几何+复古未来液态金属。用孟菲斯的图案语言做装饰，复古未来的质感做氛围。避免：双重视觉冲击导致混乱 |
| 有机仿生派 + 复古未来派 | 未来想象、形态探索 | 自然形态+未来想象=生物未来主义。用有机仿生的流动形态做视觉，复古未来的质感做氛围。避免：双重异质导致不协调 |
| 有机仿生派 + 极繁主义派 | 丰富形态、多层叠加 | 有机仿生的丰富形态+极繁的层次逻辑。用有机仿生的曲线做视觉元素，极繁的叠加逻辑做信息结构。避免：双重丰盈导致混乱 |
| 复古未来派 + 极繁主义派 | 视觉丰富、质感叠加 | 复古未来的视觉语言+极繁的信息密度。用复古未来的质感做氛围，极繁的层次做信息结构。避免：双重装饰导致内容被淹没 |

#### ⚠️ 互斥流派（禁止混搭）

| 组合 | 根本矛盾 | 冲突表现 |
|------|---------|---------|
| 极简主义派 + 运动诗学派 | 克制 vs 丰盈 | 极简要删到不能再删，运动诗学要加到沉浸。两者在信息密度和动态使用上根本对立 |
| 东方哲学派 + 实验先锋派 | 留白 vs 密度 | 东方哲学追求"空"的意境，实验先锋追求"满"的视觉冲击。节奏完全冲突 |
| 信息建筑派 + 运动诗学派 | 结构 vs 叙事 | 信息建筑优先数据结构，运动诗学优先叙事节奏。当数据结构和叙事顺序冲突时无法调和 |
| 野蛮生长派 + 极简主义派 | 暴露 vs 克制 | 都追求「诚实」，但极简通过减法，野蛮主义通过暴露。路径根本不同 |
| 野蛮生长派 + 东方哲学派 | 有形的粗糙 vs 无形的精致 | 东方哲学追求「无形的精致」，野蛮主义追求「有形的粗糙」。审美方向根本对立 |
| 后现代狂欢派 + 极简主义派 | 反好品味 vs 好品味 | 直接对立——「好品味是监狱」vs「减法即美」。信息密度和装饰使用根本对立 |
| 后现代狂欢派 + 东方哲学派 | 有意图的满 vs 有意图的空 | 孟菲斯的丰盈是「有意图的满」，东方哲学的留白是「有意图的空」。节奏完全冲突 |
| 后现代狂欢派 + 信息建筑派 | 结构颠覆 vs 结构理性 | 信息建筑追求结构理性，孟菲斯追求结构颠覆。对结构的态度根本对立 |
| 极繁主义派 + 极简主义派 | 丰盈即美 vs 减法即美 | 根本对立——「更多就是更多」vs「删减到无法再删」。信息密度和装饰哲学完全冲突 |
| 极繁主义派 + 东方哲学派 | 满 vs 空 | 极繁主义追求「满的深度」，东方哲学追求「空的意境」。根本对立 |

#### 🔶 部分兼容流派（有条件混搭）

| 组合 | 兼容条件 | 冲突点 | 混搭策略 |
|------|---------|--------|---------|
| 信息建筑派 + 东方哲学派 | 数据可视化用东方留白节奏 | 信息密度 vs 留白 | 信息架构用信息建筑派的层级系统，视觉呈现用东方哲学的留白节奏。关键：数据密集区域用信息建筑派规则，过渡/呼吸区域用东方哲学规则 |
| 极简主义派 + 实验先锋派 | 实验仅限 1 处签名细节 | 减法 vs 加法 | 整体框架用极简主义的克制，仅在 1 处"签名细节"用实验先锋手法。关键：90% 极简 + 10% 实验，比例不能反转 |
| 野蛮生长派 + 信息建筑派 | 共享「结构可见」基因 | 隐藏结构之美 vs 暴露结构之丑 | 信息架构用信息建筑派的层级系统，视觉呈现用野蛮主义的暴露手法。关键：数据密集区域用信息建筑派规则，视觉框架用野蛮主义规则 |
| 野蛮生长派 + 运动诗学派 | 共享「反精致」基因 | 沉浸 vs 暴露 | 运动诗学追求沉浸，野蛮主义追求暴露。混搭：用野蛮主义的排版框架，运动诗学的叙事节奏。关键：结构暴露但不破坏沉浸感 |
| 野蛮生长派 + 有机仿生派 | 共享「反几何刚性」基因 | 自然优雅 vs 人工粗糙 | 有机仿生追求自然优雅，野蛮主义追求人工粗糙。混搭：用野蛮主义的排版框架+有机仿生的视觉元素。关键：曲线元素软化粗糙框架 |
| 野蛮生长派 + 复古未来派 | 共享「反精致」基因 | 复古未来有强烈装饰性 | 复古未来有强烈的装饰性，与野蛮主义的反装饰冲突。混搭：用野蛮主义的框架+复古未来的质感细节。关键：质感仅限 1-2 处签名细节 |
| 野蛮生长派 + 极繁主义派 | 野蛮主义可承载高密度 | 丑的诚实 vs 美的丰盈 | 野蛮主义追求「丑的诚实」，极繁追求「美的丰盈」。混搭：用野蛮主义的骨架做结构，极繁的装饰做填充。关键：需谨慎，容易变成「既丑又乱」 |
| 有机仿生派 + 信息建筑派 | 结构可见、信息层级 | 人造结构 vs 自然结构 | 数据密集区域用信息建筑派网格，视觉元素用有机仿生曲线。关键：网格做骨架，曲线做血肉 |
| 有机仿生派 + 实验先锋派 | 生成系统、算法驱动 | 数学生成 vs 生物生成 | 实验先锋是数学生成（分形/递归），有机仿生是生物生成（生长/适应）。混搭：用实验先锋的算法做引擎，有机仿生的生长逻辑做参数。关键：算法产出需符合生物形态 |
| 复古未来派 + 实验先锋派 | 未来想象、技术前沿 | 回望未来 vs 创造未来 | 复古未来是「回望未来」，实验先锋是「创造未来」。混搭：用实验先锋的生成技术做视觉引擎，复古未来的怀旧美学做视觉语言。关键：技术是手段，怀旧是目的 |
| 极繁主义派 + 信息建筑派 | 高密度信息承载 | 结构清晰 vs 视觉丰盈 | 信息建筑可承载高密度信息但要求结构清晰。混搭：用信息建筑的层级系统做骨架，极繁的视觉丰盈做血肉。关键：结构必须清晰，丰盈不能破坏层级 |
| 信息建筑派 + 实验先锋派 | 数据驱动、系统化 | 结构理性 vs 打破规则 | 信息建筑追求结构理性，实验先锋追求打破规则。混搭：用信息建筑的数据结构做内容层，实验先锋的生成技术做视觉层。关键：内容结构保持理性，视觉表达允许实验 |
| 信息建筑派 + 复古未来派 | 精确数据、系统化 | 数据精确 vs 怀旧氛围 | 信息建筑追求数据精确，复古未来追求怀旧氛围。混搭：用信息建筑的数据结构做内容层，复古未来的质感做氛围层。关键：数据呈现保持精确，氛围营造允许怀旧 |
| 运动诗学派 + 东方哲学派 | 沉浸、呼吸感 | 叙事丰盈 vs 留白呼吸 | 运动诗学追求叙事丰盈，东方哲学追求留白呼吸。混搭：用运动诗学的叙事做节奏，东方哲学的留白做呼吸。关键：叙事段落间插入留白，避免持续沉浸导致疲劳 |
| 运动诗学派 + 后现代狂欢派 | 沉浸、视觉冲击 | 叙事驱动 vs 戏谑碰撞 | 运动诗学追求叙事驱动，孟菲斯追求戏谑碰撞。混搭：用运动诗学的叙事做节奏，孟菲斯的色彩碰撞做视觉。关键：色彩碰撞服务于叙事，不是脱离叙事的装饰 |
| 运动诗学派 + 极繁主义派 | 沉浸丰盈、多层叠加 | 叙事沉浸 vs 信息丰盈 | 运动诗学追求叙事沉浸，极繁追求信息丰盈。混搭：用运动诗学的叙事做节奏，极繁的视觉层次做密度。关键：信息丰盈服务于叙事推进，不是独立于叙事的装饰 |
| 极简主义派 + 有机仿生派 | 减法、自然 | 几何减法 vs 自然形态 | 极简通过几何减法，有机仿生通过自然形态。混搭：用极简的减法做框架，有机仿生的曲线做签名细节。关键：曲线仅限 1-2 处，其余保持几何克制 |
| 极简主义派 + 复古未来派 | 克制、精致 | 减法克制 vs 怀旧装饰 | 极简追求减法克制，复古未来追求怀旧装饰。混搭：用极简的框架做整体，复古未来的质感做 1 处签名细节。关键：90% 极简 + 10% 复古未来质感，比例不能反转 |
| 实验先锋派 + 后现代狂欢派 | 打破规则、反叛 | 实验探索 vs 戏谑反叛 | 实验先锋探索边界，孟菲斯戏谑反叛。混搭：用实验先锋的生成技术做视觉引擎，孟菲斯的色彩碰撞做视觉语言。避免：技术+戏谑双重视觉冲击导致混乱 |
| 实验先锋派 + 极繁主义派 | 视觉探索、丰盈 | 实验探索 vs 视觉丰盈 | 实验先锋追求实验探索，极繁追求视觉丰盈。混搭：用实验先锋的生成系统做视觉引擎，极繁的层次逻辑做信息结构。避免：实验+丰盈导致视觉过载 |
| 东方哲学派 + 复古未来派 | 氛围营造 | 留白意境 vs 怀旧装饰 | 东方哲学追求留白意境，复古未来追求怀旧装饰。混搭：用东方哲学的留白做空间，复古未来的质感做氛围。关键：质感仅用于氛围区域，不破坏留白节奏 |

---

### 提示词使用说明

**组合公式**：`[风格提示词DNA] + [场景描述] + [具体内容]`

#### 核心原则：描述情绪而非布局（Mood, Not Layout）

AI图像生成的关键：短提示词 > 长提示词。描述3句情绪和内容，比30行布局细节效果更好。

| 杀死多样性的写法 | 激发创造力的写法 |
|----------------|----------------|
| 指定颜色比例（60%/25%/15%） | 描述情绪（"warm like Sunday morning"） |
| 规定布局位置（"标题居中，图片右侧"） | 引用具体美学（"Pentagram editorial feel"） |
| 限制角色姿势和表情 | 让AI自然诠释风格 |
| 列出所有要包含的视觉元素 | 描述观众应该感受到什么 |

#### Good / Bad 示例

**Bad — 过度约束（AI生成出来空且平）：**
```
Professional presentation slide. Dark background, light text.
Title centered at top. Two columns below. Left column: bullet points.
Right column: bar chart. Colors: navy 60%, white 30%, gold 10%.
Font size: title 36pt, body 18pt. Margins: 40px all sides.
```

**Good — 情绪驱动（生成多样且有质感）：**
```
A data visualization that feels like a Bloomberg Businessweek
editorial spread. The key number "28.5%" should dominate the
composition like a headline. Warm cream tones with sharp black
typography. The data tells a story of dramatic channel shift.
```

#### 执行路径选择

根据速查表的「最佳路径」列选择：
- **AI生成**：有明确视觉元素的风格（06/07/12/13/14/15/16/25/26/28/30/31/32/33/34/35/36/37），用 Gemini/Midjourney 直出
- **HTML渲染**：依赖精确排版的风格（01/03/04/10/11/17/18/21/22/23），代码控制数据和布局
- **混合**：HTML做骨架布局 + AI生成配图/背景（02/05/08/09/19/20/24/27/29/38/39/40）

#### 质量控制

1. ❌ 不要直接写 "in the style of Pentagram" → ✅ 用具体设计特征描述
2. 文字在AI生成中常出错 → 生成后替换文字
3. 比例易失真 → 明确指定 aspect ratio
4. 先生成3-5个变体，选择最佳后细化

**默认审美禁区**（用户可按自己品牌 override）：
- ❌ 赛博霓虹/深蓝色底（#0D1117）
- ❌ 封面图加个人署名/水印

---

### 十一、数字界面派（41-44）
> 哲学：「界面是行为的延伸」

界面不是装饰层，是用户行为的延伸。数字产品的设计语言必须与交互范式、平台规范、品牌人格三位一体。数字界面派的哲学核心是：每一个像素都应该服务于交互目的，形式永远是功能的表达。

#### 反模式检测

| 反模式 | 为什么违反 | 修复方向 |
|--------|-----------|---------|
| ❌ 装饰性 UI 元素掩盖核心功能 | 界面是行为的延伸，装饰性元素干扰用户完成任务 | ✅ 审查每个 UI 元素——"移除它会影响任务完成吗？"不会则删除 |
| ❌ 跨平台交互不一致 | 违反平台规范导致用户认知混乱 | ✅ 遵循各平台 HIG/Material Design 标准交互范式 |
| ❌ 触控热区小于 44pt | Apple HIG 和 Material 规范均要求最小触控区域 | ✅ 确保所有可交互元素触控区域 ≥ 44pt |
| ❌ 色彩未考虑无障碍 | 数字界面必须服务所有用户 | ✅ 确保文字对比度 ≥ 4.5:1（WCAG AA），色彩不单独传达信息 |
| ❌ 动画无目的性 | 克制是数字界面派的核心，无意义的动画浪费用户注意力 | ✅ 动画必须服务于导航引导、状态反馈或空间关系表达 |

#### 提升路径

**Quick Win**（5 分钟）：检查所有可交互元素的触控区域是否 ≥ 44pt，修复不符合的。

**提升路径**（从 5 分到 8 分）：
1. 遵循平台 HIG——确保交互范式与 iOS/Android 标准一致
2. 建立触控热区规范——全局统一最小 44pt
3. 审查色彩无障碍——文字对比度 ≥ 4.5:1，色彩不单独传达信息
4. 精简动画——只保留功能性动画（导航引导、状态反馈、空间关系）
5. 建立组件库——所有 UI 元素来自统一的组件系统，不允许独有样式

#### 41. Jony Ive — Apple 数字极简
**哲学**：硬件即软件，无缝材质与克制细节
**核心特征**：
- 极致克制的材质表达（毛玻璃、半透明、无边框）
- 物理世界隐喻（阴影层级、弹性动画、惯性滚动）
- 留白作为核心设计语言
- 排版精确到像素级

**提示词DNA**：
```
Jony Ive / Apple design:
- Seamless material transitions, frosted glass
- Physical world metaphors (depth, shadow, inertia)
- Maximal whitespace, minimal visible UI
- Pixel-perfect typography (SF Pro / SF Display)
- Rounded corners (continuous curvature)
- Dark mode optimized, dynamic color system
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.18 250) → #007AFF
- 辅色: oklch(0.70 0.02 100) → #8E8E93
- 强调色: oklch(0.65 0.22 25) → #FF3B30
- 背景: oklch(0.97 0.002 250) → #F2F2F7
- 文字: oklch(0.12 0.01 260) → #1C1C1E

**参考字体栈**：
- Display: SF Pro Display / Helvetica Neue
- Body: SF Pro Text / Helvetica Neue
- Mono: SF Mono / Menlo / monospace

**布局姿态**：大留白 / 层级阴影 / 弹性滚动

**代表作**：iOS 7+ 界面设计语言
**搜索关键词**：Apple iOS design language Jony Ive

---

#### 42. Dieter Rams — 设计十诫
**哲学**：Less but better，好设计是尽可能少的设计
**核心特征**：
- 十诫原则：创新、有用、美观、易懂、克制、诚实、持久、细节、环保、少即是多
- 功能主义美学的极致表达
- 纯粹几何形态与中性色调
- 物理产品设计哲学对数字界面的映射

**提示词DNA**：
```
Dieter Rams / Braun design:
- Purely functional, every element justified
- Neutral color palette (white, light gray, charcoal)
- Geometric purity, right angles, circles
- Tactile, physicality in design language
- No unnecessary decoration, honest materials
- Modular, systematic approach
```

**参考色板 (OKLch)**：
- 主色: oklch(0.15 0.01 260) → #1A1A2A
- 辅色: oklch(0.65 0.01 260) → #8A8A9A
- 强调色: oklch(0.55 0.16 40) → #C47A38
- 背景: oklch(0.97 0.002 80) → #F7F5F0
- 文字: oklch(0.10 0.01 260) → #0A0A1A

**参考字体栈**：
- Display: Helvetica Neue / Univers
- Body: Helvetica Neue / Arial
- Mono: SF Mono / Menlo / monospace

**布局姿态**：几何网格 / 极简留白 / 功能分区

**代表作**：Braun ET66 计算器、Braun SK5 收音机
**搜索关键词**：Dieter Rams Braun design ten principles

---

#### 43. Material Design 3 — Google
**哲学**：动态色彩、自适应组件、跨平台一致性
**核心特征**：
- Material You 动态色彩系统（从壁纸自动生成色板）
- 自适应组件（跨手机、平板、折叠屏、桌面）
- 层级清晰的海拔系统（阴影、表面色变化）
- 运动设计语言（有意义的过渡动画）

**提示词DNA**：
```
Material Design 3 / Google:
- Dynamic color (Material You, tonal palettes)
- Adaptive components for all screen sizes
- Elevation system (surface tints + shadows)
- Meaningful motion (shared axis, container transform)
- Rounded shapes (extra small to extra large)
- Accessibility-first, high contrast defaults
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.20 260) → #6750A4
- 辅色: oklch(0.60 0.15 180) → #006B5E
- 强调色: oklch(0.55 0.22 40) → #B3261E
- 背景: oklch(0.98 0.005 260) → #FEF7FF
- 文字: oklch(0.20 0.01 260) → #1D1B20

**参考字体栈**：
- Display: Google Sans / Roboto
- Body: Roboto / Noto Sans
- Mono: Roboto Mono / monospace

**布局姿态**：卡片层级 / 响应式网格 / 动态表面

**代表作**：Material Design 3 规范文档
**搜索关键词**：Material Design 3 Material You Google

---

#### 44. Apple HIG — 人机界面指南
**哲学**：清晰、遵从、纵深
**核心特征**：
- 平台原生交互范式（Navigation Bar、Tab Bar、Toolbar）
- 动态字体系统（Dynamic Type 支持用户自定义字号）
- SF Symbols 图标系统（5000+ 系统图标）
- 暗黑模式深度适配

**提示词DNA**：
```
Apple HIG / Human Interface:
- Clarity, deference, depth principles
- Native navigation patterns (tab bar, nav bar)
- Dynamic Type, SF Symbols, system colors
- Dark mode optimized, semantic colors
- High contrast, VoiceOver accessibility
- Minimalist with purpose
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.18 250) → #007AFF
- 辅色: oklch(0.60 0.15 150) → #34C759
- 强调色: oklch(0.60 0.22 30) → #FF9500
- 背景: oklch(0.95 0.002 250) → #F2F2F7
- 文字: oklch(0.12 0.01 260) → #1C1C1E

**参考字体栈**：
- Display: SF Pro Display
- Body: SF Pro Text
- Mono: SF Mono / Menlo / monospace

**布局姿态**：导航栏 + 内容区 / 安全区域 / 层级导航

**代表作**：iOS Human Interface Guidelines
**搜索关键词**：Apple HIG Human Interface Guidelines iOS

---

### 十二、体验人本派（45-48）
> 哲学：「设计的起点是人，不是屏幕」

屏幕上的每一像素都应该回答"用户此刻需要什么"。设计从共情开始，到可用性测试结束，循环往复。体验人本派的核心信念是：技术服务于人，而不是让人适应技术。

#### 反模式检测

| 反模式 | 为什么违反 | 修复方向 |
|--------|-----------|---------|
| ❌ 功能堆砌超过用户需求 | 用户体验的核心是"做减法"，不是堆砌功能 | ✅ 用 Jobs-to-be-Done 框架重新审视每个功能——"用户需要完成什么任务？" |
| ❌ 无用户测试直接上线 | 未经测试的设计是假设，不是设计 | ✅ 至少进行 5 人可用性测试（Nielsen 法则：5 人可发现 85% 问题） |
| ❌ 错误状态无友好提示 | 用户犯错时不应感到被责备 | ✅ 所有错误状态提供：问题描述 + 原因 + 解决方案 |
| ❌ 信息架构混乱 | 用户找不到内容 = 内容不存在 | ✅ 进行卡片分类测试，确保信息架构匹配用户心智模型 |
| ❌ 无进度反馈 | 用户不知道系统在做什么会焦虑 | ✅ 所有超过 200ms 的操作提供进度指示 |

#### 提升路径

**Quick Win**（5 分钟）：检查所有错误状态是否有友好提示——问题描述 + 原因 + 解决方案。

**提升路径**（从 5 分到 8 分）：
1. 进行 5 人可用性测试——记录任务完成时间、错误率、满意度
2. 建立用户旅程地图——识别所有接触点的痛点和机会
3. 优化信息架构——卡片分类测试，确保匹配用户心智模型
4. 完善反馈系统——所有操作提供即时反馈（视觉/触觉/声音）
5. 建立设计系统——组件化确保跨页面一致性

#### 45. Don Norman — 日常之物的设计
**哲学**：affordance 与示能，从门把手到界面
**核心特征**：
- 示能性（Affordance）：物品的外观暗示其使用方式
- 意符（Signifiers）：指示操作位置的视觉线索
- 映射（Mapping）：控制与效果之间的对应关系
- 反馈（Feedback）：操作后的即时响应

**提示词DNA**：
```
Don Norman / UX philosophy:
- Clear affordances (button looks clickable)
- Visible signifiers for all interactions
- Natural mapping between controls and effects
- Immediate feedback for every action
- Error prevention over error recovery
- Conceptual model matches user mental model
```

**参考色板 (OKLch)**：
- 主色: oklch(0.50 0.18 250) → #2962FF
- 辅色: oklch(0.55 0.05 100) → #757575
- 强调色: oklch(0.55 0.18 30) → #E65100
- 背景: oklch(0.98 0.002 250) → #FAFAFA
- 文字: oklch(0.15 0.01 260) → #212121

**参考字体栈**：
- Display: Inter / SF Pro
- Body: Inter / SF Pro Text
- Mono: JetBrains Mono / monospace

**布局姿态**：清晰信息层级 / 可见操作入口 / 即时反馈

**代表作**：《The Design of Everyday Things》
**搜索关键词**：Don Norman affordance signifier user experience

---

#### 46. IDEO — 设计思维
**哲学**：共情→定义→构思→原型→测试，以人为本
**核心特征**：
- 双钻模型（Discover → Define → Develop → Deliver）
- 以人为本的共情研究方法
- 快速原型与迭代测试
- 跨学科团队协作

**提示词DNA**：
```
IDEO / Design Thinking:
- Empathy-driven research methods
- Double Diamond process (diverge-converge)
- Rapid prototyping, fail fast mentality
- Cross-disciplinary collaboration
- Human-centered, not technology-centered
- Visual thinking and sketching culture
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.15 200) → #00897B
- 辅色: oklch(0.60 0.12 80) → #7CB342
- 强调色: oklch(0.55 0.20 20) → #E64A19
- 背景: oklch(0.97 0.005 80) → #F5F5F0
- 文字: oklch(0.18 0.01 260) → #263238

**参考字体栈**：
- Display: Proxima Nova / Montserrat
- Body: Proxima Nova / Open Sans
- Mono: Fira Code / monospace

**布局姿态**：便签墙 / 思维导图 / 原型迭代

**代表作**：IDEO Shopping Cart 项目（Deep Dive 纪录片）
**搜索关键词**：IDEO design thinking human centered innovation

---

#### 47. Frog Design — 情感化设计
**哲学**：形式追随情感，情感共鸣驱动设计决策
**核心特征**：
- 产品与用户的情感连接
- 设计作为品牌故事的载体
- 跨物理与数字的体验设计
- 分别针对本能层、行为层、反思层的设计策略

**提示词DNA**：
```
Frog Design / Emotional Design:
- Design for visceral, behavioral, reflective levels
- Emotional connection between product and user
- Brand storytelling through design
- Cross-physical-digital experiences
- Beauty and function in harmony
- Future-forward, optimistic aesthetic
```

**参考色板 (OKLch)**：
- 主色: oklch(0.45 0.15 270) → #5C6BC0
- 辅色: oklch(0.55 0.10 140) → #43A047
- 强调色: oklch(0.55 0.20 30) → #EF6C00
- 背景: oklch(0.96 0.005 260) → #F0F0F5
- 文字: oklch(0.15 0.02 260) → #1A1A2E

**参考字体栈**：
- Display: Circular / Proxima Nova
- Body: Circular / Inter
- Mono: Fira Code / monospace

**布局姿态**：品牌叙事 / 情感节奏 / 跨屏体验

**代表作**：Apple Snow White 设计语言、Sony Walkman
**搜索关键词**：Frog Design Hartmut Esslinger emotional design

---

#### 48. Nielsen Norman Group — 可用性
**哲学**：10 条启发式原则，UX 研究的黄金标准
**核心特征**：
- 系统状态可见性
- 系统与现实匹配
- 用户控制与自由
- 一致性与标准
- 错误预防
- 识别而非回忆
- 灵活性与效率
- 美学与极简设计
- 帮助用户识别、诊断和恢复错误
- 帮助与文档

**提示词DNA**：
```
Nielsen Norman / Usability Heuristics:
- System status visibility
- Match between system and real world
- User control and freedom (undo/redo)
- Consistency and standards
- Error prevention over error messages
- Recognition rather than recall
- Aesthetic and minimalist design
```

**参考色板 (OKLch)**：
- 主色: oklch(0.48 0.18 250) → #1A73E8
- 辅色: oklch(0.55 0.05 100) → #616161
- 强调色: oklch(0.55 0.20 30) → #D93025
- 背景: oklch(0.98 0.002 250) → #FFFFFF
- 文字: oklch(0.15 0.01 260) → #202124

**参考字体栈**：
- Display: Roboto / Inter
- Body: Roboto / Inter
- Mono: Roboto Mono / monospace

**布局姿态**：清晰导航 / 可见状态 / 标准模式

**代表作**：10 Usability Heuristics for User Interface Design
**搜索关键词**：Nielsen Norman Group usability heuristics UX

---

### 十三、网页系统派（49-52）
> 哲学：「网页是可生长的系统」

网页不是静态画布，是动态生长的系统。从语义化 HTML 到原子化组件，Web 设计的哲学是"构建可维护的生态系统"。网页系统派相信：好的 Web 设计是可持续的、可访问的、可维护的。

#### 反模式检测

| 反模式 | 为什么违反 | 修复方向 |
|--------|-----------|---------|
| ❌ 固定像素布局（无响应式） | 网页必须在所有设备上可用，固定宽度是对移动用户的拒绝 | ✅ 使用流体网格、弹性图片、媒体查询实现响应式 |
| ❌ div 嵌套代替语义化 HTML | 屏幕阅读器和搜索引擎无法理解纯 div 结构 | ✅ 使用 header、nav、main、article、section、footer 等语义标签 |
| ❌ 内联样式代替 CSS 令牌 | 设计系统无法维护，一致性无法保证 | ✅ 将颜色、间距、字体定义为 CSS 自定义属性/设计令牌 |
| ❌ 无渐进增强 | 依赖 JavaScript 渲染所有内容，JS 失败 = 页面空白 | ✅ 核心内容在 HTML 中直接渲染，JS 作为增强层 |
| ❌ 无无障碍设计 | 排除残障用户，违反 WCAG 标准和法律要求 | ✅ 确保键盘可操作、屏幕阅读器友好、色彩对比度合规 |

#### 提升路径

**Quick Win**（5 分钟）：检查页面是否使用语义化 HTML 标签（header、nav、main、footer），替换纯 div 结构。

**提升路径**（从 5 分到 8 分）：
1. 实现响应式设计——流体网格 + 弹性图片 + 媒体查询
2. 语义化重构——使用正确的 HTML5 标签
3. 建立 CSS 设计令牌——颜色、间距、字体定义为 CSS 变量
4. 实现渐进增强——核心内容在 HTML 中渲染，JS 为增强
5. 通过 WCAG AA 无障碍审计——键盘导航、屏幕阅读器、色彩对比度

#### 49. Jeffrey Zeldman — Web 标准
**哲学**：语义化、可访问性、渐进增强
**核心特征**：
- 语义化 HTML 作为内容基础
- CSS 用于表现，HTML 用于结构，JS 用于行为
- 渐进增强：基础体验 → 增强体验
- 可访问性不是附加项，是基本要求

**提示词DNA**：
```
Jeffrey Zeldman / Web Standards:
- Semantic HTML (header, nav, main, article, footer)
- CSS for presentation, HTML for structure
- Progressive enhancement (content-first)
- Accessibility as baseline (WCAG AA minimum)
- Separation of concerns (structure/presentation/behavior)
- Graceful degradation
```

**参考色板 (OKLch)**：
- 主色: oklch(0.50 0.18 250) → #2962FF
- 辅色: oklch(0.55 0.05 100) → #757575
- 强调色: oklch(0.55 0.18 20) → #D32F2F
- 背景: oklch(0.98 0.002 250) → #FAFAFA
- 文字: oklch(0.15 0.01 260) → #212121

**参考字体栈**：
- Display: system-ui / -apple-system
- Body: system-ui / -apple-system
- Mono: SF Mono / Menlo / monospace

**布局姿态**：语义化结构 / 内容优先 / 渐进增强

**代表作**：A List Apart 杂志、Designing With Web Standards
**搜索关键词**：Jeffrey Zeldman A List Apart web standards

---

#### 50. Ethan Marcotte — 响应式设计
**哲学**：流体网格、弹性图片、媒体查询
**核心特征**：
- 流体网格（百分比代替固定像素）
- 弹性图片（max-width: 100%）
- 媒体查询（断点适配不同屏幕）
- 移动优先的设计策略

**提示词DNA**：
```
Ethan Marcotte / Responsive Design:
- Fluid grids (percentage-based layouts)
- Flexible images (max-width: 100%)
- Media queries (breakpoints for device adaptation)
- Mobile-first design strategy
- Content parity across devices
- Viewport meta tag, responsive typography
```

**参考色板 (OKLch)**：
- 主色: oklch(0.50 0.15 200) → #00796B
- 辅色: oklch(0.55 0.08 100) → #757575
- 强调色: oklch(0.55 0.18 40) → #E64A19
- 背景: oklch(0.98 0.002 250) → #FAFAFA
- 文字: oklch(0.15 0.01 260) → #212121

**参考字体栈**：
- Display: system-ui / -apple-system
- Body: system-ui / -apple-system
- Mono: SF Mono / monospace

**布局姿态**：流体网格 / 弹性媒体 / 移动优先

**代表作**：《Responsive Web Design》(A Book Apart)
**搜索关键词**：Ethan Marcotte responsive web design fluid grid

---

#### 51. Brad Frost — 原子设计
**哲学**：原子→分子→有机体→模板→页面
**核心特征**：
- 原子设计五层级：原子（标签、按钮）→ 分子（搜索框）→ 有机体（导航栏）→ 模板（页面布局）→ 页面（实际内容）
- 组件驱动的设计系统方法论
- Pattern Lab 作为设计系统工作坊
- 设计系统与代码库的双向同步

**提示词DNA**：
```
Brad Frost / Atomic Design:
- Atoms (buttons, inputs, labels)
- Molecules (search form, nav item)
- Organisms (header, footer, card grid)
- Templates (page-level layouts)
- Pages (real content instances)
- Design system as single source of truth
```

**参考色板 (OKLch)**：
- 主色: oklch(0.50 0.20 260) → #5C6BC0
- 辅色: oklch(0.55 0.10 100) → #757575
- 强调色: oklch(0.55 0.20 30) → #F4511E
- 背景: oklch(0.98 0.002 260) → #F5F5FA
- 文字: oklch(0.15 0.02 260) → #1A1A2E

**参考字体栈**：
- Display: Inter / system-ui
- Body: Inter / system-ui
- Mono: Fira Code / monospace

**布局姿态**：组件库 / 设计令牌 / 模式文档

**代表作**：Pattern Lab、《Atomic Design》
**搜索关键词**：Brad Frost atomic design pattern lab

---

#### 52. Stripe Design — 系统之美
**哲学**：开发者优先的设计语言
**核心特征**：
- 设计系统作为 API（开发者友好）
- 交互式文档（代码 + 预览）
- 细腻的微交互与动画
- 深色模式原生支持
- 设计令牌系统（颜色、间距、排版、阴影）

**提示词DNA**：
```
Stripe Design / Developer-first:
- Design system as API (developer-friendly)
- Interactive documentation (code + preview)
- Refined micro-interactions and animations
- Dark mode native support
- Design tokens (colors, spacing, typography, shadows)
- Gradient backgrounds, subtle noise textures
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.22 260) → #635BFF
- 辅色: oklch(0.55 0.15 180) → #00A3C4
- 强调色: oklch(0.55 0.22 30) → #FF6B35
- 背景: oklch(0.15 0.01 260) → #1A1A2E
- 文字: oklch(0.95 0.002 250) → #F5F5F7

**参考字体栈**：
- Display: Inter / -apple-system
- Body: Inter / -apple-system
- Mono: Source Code Pro / SF Mono

**布局姿态**：开发者面板 / 交互式文档 / 渐变背景

**代表作**：Stripe.com 设计系统、Stripe Elements
**搜索关键词**：Stripe Design web interface developer tools

---

#### 53. Cursor — AI 原生 IDE 设计
**哲学**：AI 不应是弹窗，应是编辑思维流的自然延伸——内联预测、上下文感知、diff 审阅构成 AI IDE 的核心设计原则

**核心特征**：
- 内联 AI 补全（Tab 接受，非弹窗）
- 聊天侧边栏作为上下文窗口
- Diff 预览作为 AI 建议的可信度可视化
- 键盘优先，零鼠标操作
- 暗色主题原生支持，减少视觉疲劳

**提示词DNA**：
```
Cursor AI IDE design: inline code completion, dark code editor, diff preview panel, keyboard-first workflow, minimal UI, context-aware AI suggestions, monospace typography, developer tool interface
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.18 260) → #5B6DFF
- 辅色: oklch(0.60 0.12 200) → #4A9EAA
- 强调色: oklch(0.65 0.20 40) → #E8A040
- 背景: oklch(0.12 0.01 260) → #16162A
- 文字: oklch(0.90 0.002 250) → #E8E8EC

**参考字体栈**：
- Display: JetBrains Mono / SF Mono
- Body: Inter / -apple-system
- Mono: JetBrains Mono / Fira Code

**布局姿态**：暗色 IDE 面板 / 侧边栏对话 / Diff 对比视图

**代表作**：Cursor IDE
**搜索关键词**：Cursor AI IDE agent design developer tool UX

---

#### 54. GitHub Copilot — 结对编程范式
**哲学**：从"写代码"到"描述意图"——AI 设计的关键是预测用户意图而非等待指令，将编程交互从命令式推向声明式

**核心特征**：
- 幽灵文本（ghost text）作为 AI 建议的轻量呈现
- 多建议面板（Tab 切换）
- 内联聊天（Copilot Chat）
- 代码补全与注释生成一体化
- 置信度可视化（灰色 vs 高亮建议）

**提示词DNA**：
```
GitHub Copilot pair programming: ghost text suggestions, inline chat panel, dark code editor, AI pair programmer, multiple suggestion tabs, intent-driven interaction, developer workflow
```

**参考色板 (OKLch)**：
- 主色: oklch(0.50 0.15 200) → #3A8FA0
- 辅色: oklch(0.55 0.18 260) → #5B6DFF
- 强调色: oklch(0.60 0.18 140) → #4CAF50
- 背景: oklch(0.10 0.01 250) → #0D1117
- 文字: oklch(0.88 0.002 250) → #E6EDF3

**参考字体栈**：
- Display: Mona Sans / SF Pro
- Body: Inter / -apple-system
- Mono: Cascadia Code / SF Mono

**布局姿态**：暗色编辑器 / 幽灵文本 / 侧边建议面板

**代表作**：GitHub Copilot, Copilot Chat
**搜索关键词**：GitHub Copilot AI pair programming developer tool

---

#### 55. Replit Agent — 对话式开发
**哲学**：自然语言对话替代传统 IDE 操作，降低创造门槛——设计服务于"让想法更快变成现实"，Agent 自主性的 UX 表达是核心

**核心特征**：
- 对话式界面作为主要交互入口
- Agent 自主执行 + 可人工接管
- 实时预览窗口（WebContainer）
- 多文件协作的透明化展示
- 自然语言→代码→部署的完整链路

**提示词DNA**：
```
Replit Agent conversational development: chat-based IDE, real-time preview panel, multi-file workspace, AI agent sidebar, web container, conversational programming interface, browser-based development
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.22 30) → #E86A30
- 辅色: oklch(0.50 0.12 220) → #3D7EA0
- 强调色: oklch(0.60 0.25 60) → #D4A020
- 背景: oklch(0.15 0.01 260) → #1C1C2E
- 文字: oklch(0.92 0.003 250) → #EEEEF2

**参考字体栈**：
- Display: Replit Sans / IBM Plex Sans
- Body: Inter / -apple-system
- Mono: IBM Plex Mono / SF Mono

**布局姿态**：对话面板 / 实时预览 / 多文件树

**代表作**：Replit Agent
**搜索关键词**：Replit Agent conversational development AI coding

---

#### 56. Perplexity — AI 搜索体验
**哲学**：AI 产品设计需要建立"可信度信号"——引用溯源、追问式对话、结构化答案，将学术引用规范融入消费级产品

**核心特征**：
- 引用溯源（每条答案附来源链接）
- 追问式对话（Related Questions）
- 结构化答案（标题+段落+列表）
- Pro 搜索 vs 快速搜索的模式切换
- Copilot 辅助深化搜索

**提示词DNA**：
```
Perplexity AI search experience: cited sources UI, structured answers, related questions panel, dark search interface, academic citation style, conversational search, knowledge graph visualization
```

**参考色板 (OKLch)**：
- 主色: oklch(0.50 0.20 270) → #6B4FBF
- 辅色: oklch(0.55 0.10 200) → #4A8A9A
- 强调色: oklch(0.60 0.15 30) → #D08050
- 背景: oklch(0.13 0.01 260) → #181828
- 文字: oklch(0.90 0.003 250) → #E8E8F0

**参考字体栈**：
- Display: PP Neue Montreal / SF Pro
- Body: Inter / -apple-system
- Mono: SF Mono / Menlo

**布局姿态**：搜索框 + 结构化答案 / 引用侧栏 / 追问列表

**代表作**：Perplexity AI
**搜索关键词**：Perplexity AI search answer engine product design

---

#### 57. Warp — 现代化终端设计
**哲学**：CLI 不需要停留在 1970 年代——将 IDE 体验带入终端，块级编辑、AI 内联、可视化输出，命令行工具可以同时高效且美观
**核心特征**：
- 块级编辑（命令+输出分组为块）
- AI 内联（自然语言→命令）
- 可视化输出（图片/图表/富文本）
- 现代化排版（多字体、语法高亮）
- 标签页+分屏+工作区管理

**提示词DNA**：
```
Warp modern terminal:
- Block-based editing, AI command suggestions
- Visual output, syntax highlighting
- Modern terminal UI, tabbed interface
- Split panes, Rust-powered terminal
- GPU-accelerated rendering
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.20 260) → #5B6DFF
- 辅色: oklch(0.50 0.12 200) → #3D8A9A
- 强调色: oklch(0.60 0.15 140) → #4CAF60
- 背景: oklch(0.10 0.01 260) → #0D0D1A
- 文字: oklch(0.90 0.002 250) → #E8E8F0

**参考字体栈**：
- Display: Inter / SF Pro
- Body: Inter / -apple-system
- Mono: Hack / Fira Code / SF Mono

**布局姿态**：暗色终端 / 块级布局 / AI 建议面板
**代表作**：Warp terminal
**搜索关键词**：Warp terminal Rust GPU modern CLI developer tool

---

#### 58. Linear — 设计驱动工具美学
**哲学**：工具类产品的设计哲学是"消除摩擦"——键盘优先、毫秒级响应、像素级排版，好的工具让用户感受不到工具的存在
**核心特征**：
- 键盘快捷键驱动一切操作
- 毫秒级响应（本地优先架构）
- 像素级排版（自定义字体+精确间距）
- 暗色主题原生支持
- 极简信息层级（无冗余信息）

**提示词DNA**：
```
Linear app design:
- Keyboard-first interface, dark theme
- Minimalist project management
- Pixel-perfect typography, instant response
- Clean layout, command palette
- Tool aesthetic, friction-free UX
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.22 270) → #7B5BFF
- 辅色: oklch(0.55 0.12 200) → #4A8A9A
- 强调色: oklch(0.60 0.18 40) → #D4A040
- 背景: oklch(0.12 0.01 260) → #161620
- 文字: oklch(0.90 0.002 250) → #E8E8EC

**参考字体栈**：
- Display: Inter Display / SF Pro Display
- Body: Inter / -apple-system
- Mono: JetBrains Mono / SF Mono

**布局姿态**：暗色面板 / 键盘快捷键提示 / 命令面板
**代表作**：Linear app
**搜索关键词**：Linear app design keyboard-first project management tool

---

#### 59. Vercel — 部署即设计
**哲学**：开发者体验设计要"让复杂的事情简单到一键完成"——预览链接、自动部署、边缘渲染，部署流程本身就是设计的一部分
**核心特征**：
- 一键部署（Git Push → 自动构建）
- 预览链接（每个 PR 自动生成）
- 边缘渲染（全球 CDN）
- 框架无关（支持所有前端框架）
- 设计系统与部署平台深度集成

**提示词DNA**：
```
Vercel deployment platform:
- One-click deploy, preview URLs
- Edge network, framework integration
- Dark dashboard, developer experience
- Build pipeline visualization
- Serverless functions, instant rollback
```

**参考色板 (OKLch)**：
- 主色: oklch(0.50 0.05 260) → #6A6A8A
- 辅色: oklch(0.55 0.08 240) → #5A7AAA
- 强调色: oklch(0.55 0.15 30) → #D08050
- 背景: oklch(0.08 0.01 250) → #0A0A14
- 文字: oklch(0.92 0.002 250) → #EEEEF2

**参考字体栈**：
- Display: Geist / Inter
- Body: Geist Sans / Inter
- Mono: Geist Mono / SF Mono

**布局姿态**：暗色仪表盘 / 部署日志 / 预览面板
**代表作**：Vercel Platform
**搜索关键词**：Vercel deployment platform frontend developer experience

---

#### 60. Raycast — 效率即美学
**哲学**：用最少的交互完成最多的任务——CLI/工具设计哲学：轻量、可扩展、键盘流，效率工具的美学在于"消失"
**核心特征**：
- 全局快捷键唤起（Command+Space 替代）
- 插件生态（可扩展命令系统）
- 浮动面板（非全窗口）
- AI 集成（自然语言→操作）
- 快速操作（文件/剪贴板/窗口管理）

**提示词DNA**：
```
Raycast productivity tool:
- Floating command palette, keyboard-driven
- Extension ecosystem, AI integration
- Light/dark theme, quick actions
- Minimalist launcher, macOS native
- Instant search, clipboard history
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.20 270) → #7B5BFF
- 辅色: oklch(0.55 0.10 200) → #4A8A9A
- 强调色: oklch(0.60 0.18 40) → #D4A040
- 背景: oklch(0.97 0.003 80) → #F5F4F0
- 文字: oklch(0.15 0.01 260) → #1A1A2A

**参考字体栈**：
- Display: SF Pro Display
- Body: SF Pro Text / -apple-system
- Mono: SF Mono / Menlo

**布局姿态**：浮动命令面板 / 键盘驱动 / 轻量窗口
**代表作**：Raycast
**搜索关键词**：Raycast macOS productivity tool launcher keyboard-first

---

#### 69. Claude Artifacts — 实时生成设计
**哲学**：AI 生成内容的即时预览、迭代、版本对比——设计反馈循环从"天"缩短到"秒"，实时共创成为新常态

**核心特征**：
- 生成内容与对话并列展示（双栏布局）
- 实时预览（代码→渲染即时同步）
- 版本迭代（每次修改生成新版本）
- 多格式输出（代码/文档/图表/SVG）
- 一键发布与分享

**提示词DNA**：
```
Claude Artifacts real-time generation: dual-panel layout, live preview, version iteration, code rendering, AI content creation, collaborative workspace, instant feedback loop
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.18 40) → #D49550
- 辅色: oklch(0.50 0.12 260) → #5A5AB0
- 强调色: oklch(0.55 0.15 180) → #3A9080
- 背景: oklch(0.97 0.005 80) → #F7F5F0
- 文字: oklch(0.18 0.01 260) → #1E1E2E

**参考字体栈**：
- Display: Inter Display / SF Pro
- Body: Inter / -apple-system
- Mono: JetBrains Mono / SF Mono

**布局姿态**：双栏对话+预览 / 迭代版本列表 / 多格式输出

**代表作**：Claude Artifacts (Anthropic)
**搜索关键词**：Claude Artifacts Anthropic AI generation real-time preview design iteration

---

#### 70. v0 by Vercel — AI 生成 UI 的质量控制
**哲学**："提示词即设计稿"时代的质量门禁——AI 生成的 UI 代码需要设计审查，提示词工程成为新的设计工具

**核心特征**：
- 自然语言→UI 代码的即时生成
- 迭代式提示词优化（多轮对话）
- 生成代码的实时预览与编辑
- 组件库集成（shadcn/ui 等）
- 设计系统约束的内置支持

**提示词DNA**：
```
v0 Vercel AI UI generation: prompt-to-code interface, real-time UI preview, component library, design system tokens, iterative refinement, code export, minimal chat interface
```

**参考色板 (OKLch)**：
- 主色: oklch(0.50 0.05 260) → #6A6A8A
- 辅色: oklch(0.55 0.08 240) → #5A7AAA
- 强调色: oklch(0.55 0.15 30) → #D08050
- 背景: oklch(0.12 0.01 260) → #161620
- 文字: oklch(0.90 0.002 250) → #E8E8EC

**参考字体栈**：
- Display: Geist / Inter
- Body: Geist Sans / Inter
- Mono: Geist Mono / SF Mono

**布局姿态**：提示词输入 + 预览面板 / 组件选择器 / 代码导出

**代表作**：v0 by Vercel
**搜索关键词**：v0 Vercel AI generated UI design quality prompt engineering

---

#### 71. Devin — 自主 Agent 的信任设计
**哲学**：当 AI 自主执行任务时，进度可视化、可撤销操作、人工接管点成为核心设计要素——信任不是赋予的，是设计出来的

**核心特征**：
- 任务进度可视化（步骤列表+状态指示）
- Shell/Browser/Editor 多面板操作展示
- 可撤销操作（每一步可回退）
- 人工接管点（关键决策需确认）
- 完整操作日志（透明度建立信任）

**提示词DNA**：
```
Devin autonomous AI agent: task progress visualization, multi-panel workspace, shell terminal, browser preview, editor panel, step-by-step execution, trust design, operation log
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.20 200) → #3A9AB0
- 辅色: oklch(0.50 0.15 260) → #5B5BB0
- 强调色: oklch(0.60 0.15 30) → #D08050
- 背景: oklch(0.10 0.01 250) → #0D1117
- 文字: oklch(0.90 0.002 250) → #E8E8F0

**参考字体栈**：
- Display: Inter / SF Pro
- Body: Inter / -apple-system
- Mono: JetBrains Mono / SF Mono

**布局姿态**：多面板工作台 / 任务进度条 / Shell + Browser + Editor

**代表作**：Devin (Cognition AI)
**搜索关键词**：Devin AI agent autonomous coding trust design progress visualization

---

#### 72. ChatGPT Canvas — 多模态协作界面
**哲学**：AI 协作从单模态对话走向多模态工作台——文本+代码+图像+画布，设计需要同时管理多个内容流

**核心特征**：
- 对话与画布并列（双栏多模态）
- 内联编辑（直接在画布上修改）
- 多格式支持（文本/代码/图表/图像）
- 版本历史与对比
- 从对话到画布的拖拽式内容迁移

**提示词DNA**：
```
ChatGPT Canvas multimodal collaboration: dual-panel interface, inline editing, text and code canvas, version history, drag-and-drop content, AI workspace, multimodal interaction
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.15 160) → #3A9080
- 辅色: oklch(0.50 0.12 260) → #5A5AB0
- 强调色: oklch(0.55 0.18 40) → #D49550
- 背景: oklch(0.15 0.01 260) → #1E1E30
- 文字: oklch(0.92 0.003 250) → #EEEEF4

**参考字体栈**：
- Display: Söhne / SF Pro
- Body: Inter / -apple-system
- Mono: Söhne Mono / SF Mono

**布局姿态**：对话+画布双栏 / 内联编辑 / 多格式切换

**代表作**：ChatGPT Canvas (OpenAI)
**搜索关键词**：ChatGPT Canvas OpenAI multimodal collaboration interface design

---

#### 61. Spatial Design — Apple Vision Pro
**哲学**：空间计算打破屏幕边界，设计从 2D 平面走向 3D 空间——手势、眼动、语音构成新交互范式，界面不再是矩形，而是环境
**核心特征**：
- 眼动追踪作为主要输入（视线=光标）
- 手势交互（捏合、拖拽、旋转）
- 空间音频增强沉浸感
- 玻璃材质（半透明 UI 与环境融合）
- 无限画布（窗口可任意放置于 3D 空间）

**提示词DNA**：
```
Apple Vision Pro spatial design:
- Glass material UI, eye tracking interface
- Hand gesture interaction, spatial computing
- 3D interface, semi-transparent panels
- Floating windows, immersive environment
- Spatial audio, depth-aware layering
```

**参考色板 (OKLch)**：
- 主色: oklch(0.85 0.02 250) → #D8DDE8
- 辅色: oklch(0.70 0.05 220) → #A0B8C8
- 强调色: oklch(0.65 0.15 30) → #D8A060
- 背景: oklch(0.20 0.02 250) → #2A3038
- 文字: oklch(0.95 0.002 250) → #F2F2F5

**参考字体栈**：
- Display: SF Pro Display / -apple-system
- Body: SF Pro Text / -apple-system
- Mono: SF Mono / Menlo

**布局姿态**：3D 空间布局 / 玻璃面板 / 眼动+手势
**代表作**：Apple Vision Pro visionOS
**搜索关键词**：Apple Vision Pro spatial computing design interface

---

#### 62. AI-Native Design — 从 AI 出发的设计
**哲学**：2026 产品设计不再"加入 AI 功能"，而是从 AI 能力出发重新定义产品形态——AI 是设计原点，不是附加功能
**核心特征**：
- AI 能力前置（产品核心流程由 AI 驱动）
- 生成式 UI（界面根据 AI 输出动态生成）
- 对话式交互替代传统表单
- 个性化体验（AI 理解用户意图）
- 设计系统内建 AI 组件规范

**提示词DNA**：
```
AI-native product design:
- Generative UI, conversational interface
- AI-driven workflow, dynamic layout
- Personalized experience, AI component library
- Intelligent defaults, intent-based navigation
- Prompt-driven UI generation
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.22 270) → #7B5BFF
- 辅色: oklch(0.55 0.15 200) → #4A9AAA
- 强调色: oklch(0.60 0.22 50) → #D8A830
- 背景: oklch(0.12 0.01 260) → #161620
- 文字: oklch(0.92 0.003 250) → #EEEEF4

**参考字体栈**：
- Display: Inter Display / SF Pro
- Body: Inter / -apple-system
- Mono: JetBrains Mono / SF Mono

**布局姿态**：AI 驱动面板 / 动态生成 UI / 对话式交互
**代表作**：2026 行业趋势
**搜索关键词**：AI native design product trend 2026

---

#### 63. Calm Tech — 平静技术设计
**哲学**：2026 年屏幕疲劳达到临界点，设计趋势转向"少打扰、多感知"——信息在最合适的时机以最轻量的方式呈现，技术退居背景
**核心特征**：
- 注意力最小化（信息通过环境提示而非通知）
- 外围感知（灯光/声音/振动替代屏幕）
- 状态指示器（非侵入式状态传达）
- 静默模式优先（默认不打扰）
- 触觉反馈（Haptic 替代视觉通知）

**提示词DNA**：
```
Calm Technology design:
- Ambient notifications, peripheral awareness
- Minimal attention, haptic feedback
- Status indicators, quiet mode
- Non-intrusive UI, zen design
- Light/sound/vibration as information channel
```

**参考色板 (OKLch)**：
- 主色: oklch(0.50 0.05 180) → #5A8A80
- 辅色: oklch(0.60 0.03 80) → #A0A090
- 强调色: oklch(0.55 0.08 40) → #B0A080
- 背景: oklch(0.96 0.005 80) → #F4F2EE
- 文字: oklch(0.25 0.01 260) → #2A2A3A

**参考字体栈**：
- Display: Graphik / SF Pro
- Body: Inter / -apple-system
- Mono: SF Mono / Menlo

**布局姿态**：环境感知 / 状态指示器 / 静默通知
**代表作**：Calm Technology (Amber Case)
**搜索关键词**：Calm Technology Amber Case ambient design attention

---

#### 64. Design Engineering — 设计工程一体化
**哲学**：2026 年设计师与工程师的边界加速模糊，AI 辅助设计工程化——设计即代码、代码即设计，设计令牌成为共同语言
**核心特征**：
- 设计令牌（Design Tokens）作为设计-工程桥梁
- Figma → Code 自动化
- 组件级设计系统（Design System as Code）
- AI 辅助设计→代码转换
- 双向同步（代码变更反映到设计文件）

**提示词DNA**：
```
Design engineering integration:
- Design tokens, Figma to code
- Design system as code, AI-assisted design-to-code
- Component library, developer handoff
- Token-based workflow, bidirectional sync
- Design-engineering collaboration
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.15 260) → #5B6DBF
- 辅色: oklch(0.50 0.12 200) → #3D8A9A
- 强调色: oklch(0.55 0.18 40) → #D49550
- 背景: oklch(0.14 0.01 260) → #1A1A2A
- 文字: oklch(0.90 0.002 250) → #E8E8EC

**参考字体栈**：
- Display: Inter Display / SF Pro
- Body: Inter / -apple-system
- Mono: Fira Code / SF Mono

**布局姿态**：设计+代码双栏 / 设计令牌面板 / 组件预览
**代表作**：2026 行业趋势
**搜索关键词**：design engineering integration designer developer 2026

---

#### 73. Agentic UX — 从操作到监督
**哲学**：2026 年用户不再直接操作界面，而是监督 AI Agent 执行——设计从"按钮"转向"指令+确认"，交互范式迎来根本性转变
**核心特征**：
- 意图表达替代逐步操作（自然语言指令）
- Agent 执行过程可视化（进度+步骤）
- 确认点设计（关键决策需人工确认）
- 异常处理（Agent 失败时的优雅降级）
- 多 Agent 协作界面（监督多个 Agent 并行工作）

**提示词DNA**：
```
Agentic UX design:
- Intent-based interaction, AI agent supervision
- Progress visualization, confirmation checkpoints
- Multi-agent dashboard, natural language commands
- Task orchestration, graceful degradation
- Human-in-the-loop decision points
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.20 240) → #4A7ABF
- 辅色: oklch(0.50 0.15 200) → #3D8AA0
- 强调色: oklch(0.55 0.18 40) → #D49550
- 背景: oklch(0.12 0.01 260) → #161620
- 文字: oklch(0.90 0.002 250) → #E8E8EC

**参考字体栈**：
- Display: Inter Display / SF Pro
- Body: Inter / -apple-system
- Mono: JetBrains Mono / SF Mono

**布局姿态**：Agent 仪表盘 / 任务进度 / 确认弹窗
**代表作**：2026 行业趋势
**搜索关键词**：Agentic UX AI agent supervision interaction paradigm design 2026

---

#### 74. AI-Generated UI — 策划者时代
**哲学**：2026 年设计师角色从"像素绘制者"转变为"AI 输出的策划者与审核者"——设计质量不再取决于手速，而取决于品位与判断力
**核心特征**：
- 提示词工程（Prompt Engineering）成为设计技能
- AI 生成多方案对比（A/B 设计变体）
- 设计审查自动化（AI 检测设计规范违规）
- 人类决策（AI 生成，人类选择）
- 设计系统约束 AI 输出质量

**提示词DNA**：
```
AI-generated UI design:
- Prompt engineering, design variants
- Automated design review, AI output curation
- Design system constraints, human-in-the-loop
- Quality control, A/B design comparison
- AI-assisted design iteration
```

**参考色板 (OKLch)**：
- 主色: oklch(0.50 0.08 260) → #6A6A8A
- 辅色: oklch(0.55 0.12 240) → #5A7AAA
- 强调色: oklch(0.55 0.18 30) → #D08050
- 背景: oklch(0.96 0.005 80) → #F4F2EE
- 文字: oklch(0.18 0.01 260) → #1E1E2E

**参考字体栈**：
- Display: Inter Display / SF Pro
- Body: Inter / -apple-system
- Mono: JetBrains Mono / SF Mono

**布局姿态**：方案对比面板 / 提示词输入 / 设计审查报告
**代表作**：2026 行业趋势
**搜索关键词**：AI generated UI design curator quality control 2026 trend

---

#### 75. Ethical Design 2.0 — AI 时代的伦理设计
**哲学**：EU AI Act 合规、偏见检测、透明度报告——2026 年设计必须内置伦理考量，伦理不是可选项，是产品上市的基本门槛
**核心特征**：
- AI 偏见检测与缓解（数据+算法层面）
- 透明度报告（AI 决策可解释性）
- 黑暗模式（Dark Patterns）自动检测
- 用户数据控制权（知情同意+数据可携带）
- 合规设计（EU AI Act / GDPR / WCAG 3.0）

**提示词DNA**：
```
Ethical design AI era:
- Bias detection UI, transparency report
- Dark pattern free, user consent design
- Accessibility-first, privacy dashboard
- Compliance checklist, explainable AI
- Data portability, informed consent
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.15 160) → #3A9080
- 辅色: oklch(0.55 0.10 200) → #4A8A9A
- 强调色: oklch(0.55 0.12 40) → #B0A070
- 背景: oklch(0.97 0.005 80) → #F7F5F0
- 文字: oklch(0.18 0.01 260) → #1E1E2E

**参考字体栈**：
- Display: Inter Display / SF Pro
- Body: Inter / -apple-system
- Mono: SF Mono / Menlo

**布局姿态**：透明度仪表盘 / 隐私设置 / 合规检查清单
**代表作**：EU AI Act 合规设计
**搜索关键词**：Ethical design AI EU AI Act bias detection dark pattern regulation

---

#### 76. Sustainable Digital Design — 绿色数字设计
**哲学**：低碳网页、暗色模式默认、减少数据传输——设计的环境责任成为 2026 必须项，每个像素都有碳足迹
**核心特征**：
- 暗色模式默认（减少 OLED 能耗）
- 图片优化（WebP/AVIF + 懒加载）
- 减少 JavaScript 体积（Tree-shaking + 代码分割）
- 绿色主机（可再生能源数据中心）
- 碳足迹可视化（网站碳排放计算器）

**提示词DNA**：
```
Sustainable digital design:
- Dark mode default, optimized images
- Low carbon web, green hosting
- Minimal JavaScript, carbon footprint badge
- Energy-efficient UI, lazy loading
- WebP/AVIF, tree-shaking, code splitting
```

**参考色板 (OKLch)**：
- 主色: oklch(0.50 0.15 140) → #3A8A50
- 辅色: oklch(0.55 0.08 180) → #5A9A8A
- 强调色: oklch(0.50 0.12 80) → #8A8A50
- 背景: oklch(0.15 0.01 140) → #1A2A1E
- 文字: oklch(0.90 0.003 140) → #E8ECE8

**参考字体栈**：
- Display: Inter Display / SF Pro
- Body: Inter / -apple-system
- Mono: SF Mono / Menlo

**布局姿态**：暗色生态面板 / 碳足迹仪表盘 / 绿色指标
**代表作**：Website Carbon Calculator
**搜索关键词**：Sustainable digital design low carbon web green hosting eco design

---

#### 65. Bauhaus — 包豪斯设计原则
**哲学**：形式服从功能，几何纯粹，工业美学——现代设计的源头，一切当代设计语言都能追溯到包豪斯的三大基础课程
**核心特征**：
- 几何基本形（圆、方、三角）
- 三原色（红黄蓝）+ 黑白灰
- 形式服从功能（无装饰）
- 工业材料（钢、玻璃、混凝土）
- 跨学科融合（艺术+工艺+技术）

**提示词DNA**：
```
Bauhaus design: geometric shapes, primary colors, form follows function, industrial materials, clean lines, minimal decoration, grid-based, modernist architecture
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.25 30) → #E04030
- 辅色: oklch(0.65 0.22 90) → #E0C830
- 强调色: oklch(0.50 0.22 260) → #3050C0
- 背景: oklch(0.95 0.003 80) → #F0EFEC
- 文字: oklch(0.10 0.01 260) → #0A0A1A

**参考字体栈**：
- Display: Futura / DIN
- Body: Futura / Helvetica
- Mono: Courier / monospace

**布局姿态**：几何网格 / 三原色 + 黑白 / 不对称平衡

**代表作**：Bauhaus Dessau building, Wassily Chair
**搜索关键词**：Bauhaus Walter Gropius design principle form follows function

---

#### 66. Swiss Design — 国际主义风格
**哲学**：网格系统、非对称布局、无衬线字体、客观摄影——瑞士设计影响了整个 20 世纪的设计语言，至今仍是 UI 设计的基础语法
**核心特征**：
- 数学网格系统（多列精确布局）
- 非对称平衡（左对齐+右留白）
- 无衬线字体（Helvetica/Univers）
- 客观摄影（黑白高对比）
- 信息层级清晰（标题→副标题→正文）

**提示词DNA**：
```
Swiss International Style: grid system, asymmetric layout, Helvetica typography, black and white photography, mathematical spacing, clean hierarchy, sans-serif only
```

**参考色板 (OKLch)**：
- 主色: oklch(0.45 0.25 30) → #D03020
- 辅色: oklch(0.50 0.02 260) → #5A5A70
- 强调色: oklch(0.55 0.20 90) → #C0A020
- 背景: oklch(0.97 0.003 80) → #F5F5F0
- 文字: oklch(0.08 0.01 260) → #080818

**参考字体栈**：
- Display: Helvetica Neue / Univers
- Body: Helvetica / Arial
- Mono: Courier / monospace

**布局姿态**：多列网格 / 左对齐 / 黑白摄影

**代表作**：Neue Grafik magazine, Zurich Tonhalle poster
**搜索关键词**：Swiss design international typographic style grid system

---

#### 67. Vignelli — 现代主义极致
**哲学**："如果你能设计一件事，你就能设计一切"——极致的系统化思维，一生只用 6 种字体，用有限元素创造无限可能
**核心特征**：
- 极致简化（一生只用 6 种字体）
- 语义化色彩（红色=信息，黑色=正文）
- 网格系统至上（所有设计基于网格）
- 跨领域设计（从地铁图到教堂）
- 永恒性（设计不追随潮流）

**提示词DNA**：
```
Massimo Vignelli modernism: limited typefaces, semantic color, strict grid, cross-disciplinary, timeless design, red and black, information hierarchy, New York subway map
```

**参考色板 (OKLch)**：
- 主色: oklch(0.45 0.25 30) → #D03020
- 辅色: oklch(0.30 0.01 260) → #2A2A3A
- 强调色: oklch(0.50 0.20 90) → #B0A020
- 背景: oklch(0.97 0.003 80) → #F5F5F0
- 文字: oklch(0.08 0.01 260) → #080818

**参考字体栈**：
- Display: Bodoni / Garamond
- Body: Helvetica / Century
- Mono: Courier / monospace

**布局姿态**：网格至上 / 红黑双色 / 跨领域系统

**代表作**：New York Subway Map (1972), St. Peter's Church
**搜索关键词**：Massimo Vignelli modernism design New York subway map

---

#### 68. Wim Crouwel — 像素化字体实验
**哲学**：1960 年代就用像素网格设计字体，预见了数字时代的字体排印——经典也可以激进，限制是创造力的催化剂
**核心特征**：
- 像素网格字体（New Alphabet）
- 数学精确性（所有字形基于网格）
- 实验性排版（挑战可读性边界）
- 系统化思维（字体作为系统设计）
- 极简几何（仅用水平+垂直线条）

**提示词DNA**：
```
Wim Crouwel typography: pixel grid font, New Alphabet, mathematical precision, experimental letterforms, horizontal and vertical lines, monospaced grid, digital age prediction
```

**参考色板 (OKLch)**：
- 主色: oklch(0.45 0.15 260) → #3A4AB0
- 辅色: oklch(0.50 0.02 260) → #5A5A70
- 强调色: oklch(0.55 0.20 90) → #C0A020
- 背景: oklch(0.95 0.003 80) → #F0EFEC
- 文字: oklch(0.10 0.01 260) → #0A0A1A

**参考字体栈**：
- Display: New Alphabet / Gridnik
- Body: Helvetica / Arial
- Mono: Courier / monospace

**布局姿态**：像素网格 / 实验字体 / 水平+垂直线条

**代表作**：New Alphabet (1967), Stedelijk Museum posters
**搜索关键词**：Wim Crouwel typography new alphabet grid experimental

---

#### 77. De Stijl — 荷兰风格派
**哲学**：Mondrian 的红黄蓝+黑白网格——抽象几何是宇宙秩序的视觉表达，将自然形态还原为纯粹的水平与垂直线条，影响现代 UI 配色与布局
**核心特征**：
- 原色限定（红黄蓝+黑白灰）
- 水平与垂直线条（无斜线）
- 矩形块面分割（非对称平衡）
- 抽象几何（拒绝自然形态）
- 普遍性（追求宇宙秩序的表达）

**提示词DNA**：
```
De Stijl Mondrian: primary colors red yellow blue, black white grid, horizontal and vertical lines, rectangular blocks, asymmetric balance, pure abstraction, geometric order
```

**参考色板 (OKLch)**：
- 主色: oklch(0.55 0.25 30) → #E04030
- 辅色: oklch(0.65 0.22 90) → #E0C830
- 强调色: oklch(0.50 0.22 260) → #3050C0
- 背景: oklch(0.96 0.003 80) → #F2F1EE
- 文字: oklch(0.05 0.01 260) → #050510

**参考字体栈**：
- Display: Futura / DIN
- Body: Helvetica / Arial
- Mono: Courier / monospace

**布局姿态**：网格块面 / 红黄蓝 + 黑白 / 水平垂直线

**代表作**：Composition with Red, Blue and Yellow (Mondrian, 1930)
**搜索关键词**：De Stijl Mondrian Piet abstract geometric primary colors grid

---

#### 78. Brutalist Web Design — 粗野主义网页
**哲学**：裸露 HTML 结构、系统字体、无装饰——反精致主义的诚实美学，在 AI 生成内容泛滥的时代回归真实，让网页回归文档本质
**核心特征**：
- 裸露 HTML 结构（默认样式优先）
- 系统字体（Arial/Times/ Courier）
- 无圆角、无阴影、无渐变
- 高对比度（黑白+单色强调）
- 原始交互（默认链接样式、表单样式）

**提示词DNA**：
```
Brutalist web design: raw HTML, system fonts, no decoration, high contrast, default styles, honest aesthetic, anti-design, web brutalism
```

**参考色板 (OKLch)**：
- 主色: oklch(0.40 0.25 30) → #C03020
- 辅色: oklch(0.35 0.20 260) → #2030A0
- 强调色: oklch(0.55 0.20 90) → #C0A020
- 背景: oklch(0.98 0.002 80) → #F8F8F5
- 文字: oklch(0.05 0.01 260) → #050510

**参考字体栈**：
- Display: Times New Roman / Arial
- Body: Arial / Times
- Mono: Courier New / monospace

**布局姿态**：裸露 HTML / 高对比度 / 系统字体 / 无装饰

**代表作**：Brutalist Websites, Craigslist
**搜索关键词**：Brutalist web design raw HTML system fonts anti-design honest aesthetic

---

#### 79. 田中一光 — 日本平面设计哲学
**哲学**：空寂、不对称、留白之美——日本传统美学（能面、浮世绘、禅宗）与现代平面设计的完美融合，以极简形式表达深厚的文化内涵
**核心特征**：
- 大面积留白（Ma 间）
- 不对称平衡（非对称和谐）
- 传统元素现代化（能面/和服图案→几何抽象）
- 平面化色彩（扁平色块）
- 字体排印（日文+英文混排）

**提示词DNA**：
```
Ikko Tanaka Japanese design: large whitespace, asymmetric balance, traditional to modern, flat color blocks, Japanese typography, zen minimalism, cultural fusion
```

**参考色板 (OKLch)**：
- 主色: oklch(0.45 0.25 30) → #D03020
- 辅色: oklch(0.55 0.08 260) → #5A5A8A
- 强调色: oklch(0.60 0.18 90) → #C8A830
- 背景: oklch(0.96 0.005 80) → #F4F2EE
- 文字: oklch(0.12 0.01 260) → #121222

**参考字体栈**：
- Display: Hiragino Mincho / Noto Serif JP
- Body: Hiragino Sans / Noto Sans JP
- Mono: Osaka Mono / SF Mono

**布局姿态**：大面积留白 / 几何色块 / 日英混排

**代表作**：Nihon Buyo poster (1981), Issey Miyake posters
**搜索关键词**：Ikko Tanaka Japanese graphic design poster traditional modern fusion

---

#### 80. Ulmer Schule — 乌尔姆学派
**哲学**：系统设计方法论、跨学科协作——影响 Braun/Apple 设计体系的德国理性主义源头，设计是可复现的科学过程，而非灵感迸发
**核心特征**：
- 系统设计方法论（设计=科学过程）
- 跨学科协作（设计师+工程师+科学家）
- 模块化产品系统
- 功能主义（形式完全服从功能）
- 设计教育体系化（理论+实践+社会）

**提示词DNA**：
```
Ulm School HfG design: systematic methodology, interdisciplinary collaboration, modular system, functionalism, design education, rational approach, Braun Apple lineage
```

**参考色板 (OKLch)**：
- 主色: oklch(0.45 0.08 260) → #4A4A6A
- 辅色: oklch(0.50 0.05 200) → #5A7A80
- 强调色: oklch(0.55 0.15 30) → #C08050
- 背景: oklch(0.96 0.003 80) → #F2F1EE
- 文字: oklch(0.15 0.01 260) → #1A1A2A

**参考字体栈**：
- Display: Helvetica Neue / DIN
- Body: Helvetica / Arial
- Mono: Courier / monospace

**布局姿态**：模块化系统 / 理性网格 / 功能优先

**代表作**：Braun SK4 radiogram, Braun T3 pocket radio
**搜索关键词**：Ulm School HfG Ulm design methodology system thinking Braun Apple

---

## 5. 项目类型 → 流派适配矩阵

不同项目类型适合不同流派。下表展示 7 类项目 × 10 流派的适配度(★/★★/★★★, ☆ = 不推荐)。

### 5.1 项目类型定义

| 类型 | 定义 | 典型产品 |
|------|------|---------|
| **B2B SaaS** | 工具型/生产力软件 | Notion, Figma, Linear, Slack |
| **内容/媒体** | 杂志、出版物、新闻 | NYT, The Verge, Bloomberg |
| **创意工具** | 面向创作者的设计/视频/音乐工具 | Figma, Adobe Creative Cloud, Ableton |
| **电商** | 购物/交易型产品 | Shopify, Amazon, Etsy |
| **移动 App** | 移动优先(社交/工具/游戏) | Instagram, Robinhood, TikTok |
| **公共服务** | 政府/医疗/教育/非营利 | GOV.UK, NHS, 慕课平台 |
| **品牌官网** | 单页或少量页面,品牌叙事为主 | Apple, Stripe, Vercel |

### 5.2 适配矩阵

| 项目类型 | 信息建筑 | 运动诗学 | 极简 | 实验先锋 | 东方 | 野蛮 | 后现代 | 有机 | 复古未来 | 极繁 |
|---------|---------|---------|------|---------|------|------|--------|------|---------|------|
| B2B SaaS | ★★★ | ★ | ★★ | ☆ | ★★ | ★ | ☆ | ★ | ☆ | ☆ |
| 内容/媒体 | ★★ | ★★ | ★★ | ★ | ★★ | ★★ | ★★ | ★★ | ★★ | ★★★ |
| 创意工具 | ★ | ★★ | ★★ | ★★★ | ★ | ★★★ | ★★★ | ★★ | ★★ | ★★ |
| 电商 | ★★ | ★ | ★ | ☆ | ★ | ★★ | ★★ | ★ | ★★ | ★★ |
| 移动 App | ★★ | ★★ | ★★★ | ★ | ★★ | ★★ | ★ | ★★ | ★★ | ☆ |
| 公共服务 | ★★★ | ☆ | ★★ | ☆ | ★★ | ☆ | ★★ | ★★ | ☆ | ☆ |
| 品牌官网 | ★★ | ★★ | ★★ | ★★ | ★★ | ★★ | ★★ | ★★ | ★★ | ★★ |

### 5.3 使用规则

1. **查找项目类型对应的行** → 找到 ★★★ 的流派作为首选
2. **如果项目跨类型**(如"B2B SaaS 又是品牌官网")→ 取两行 ★★★ 的并集
3. **如果用户行业特殊**(如医疗/法律/金融)→ 优先选"信任感"强的流派(信息建筑/极简/东方)
4. **3 方向推荐时**:
   - 至少 1 个从 ★★★ 流派里选(首选)
   - 至少 1 个从 ★★ 流派里选(次选)
   - 第 3 个从 ★/☆ 流派里选(拉开差异,但需铁律 2 通过)
5. **不允许 3 个方向都是 ☆/★**(脱离项目实际)

### 5.4 与 §4.6 铁律 4 的配合

3 方向必须横跨至少 3 个不同流派(铁律 4),且至少 1 个方向在当前项目类型下适配度 ≥ ★★。

---

## 6. 真实产品案例库(evidence 必填)

每个哲学映射 2-3 个真实存在的、被广泛认可的产品/项目。**这是 §4.6 铁律 3"Evidence 必填"的数据来源**。

### 6.1 Evidence 规则

- ✅ 只列真实存在的、被广泛认可的产品/项目
- ⚠️ 不确定或小众 → 标注"需外部搜索验证"
- 📷 搜索关键词保留(与 §2 同步),用于可用的外部搜索能力查找视觉参考
- ❌ 不编造产品,不编造客户案例

### 6.2 案例表(40 哲学 × 2-3 案例)

| # | 哲学 | 真实产品案例 | 1 行说明 |
|---|------|------------|---------|
| 01 | Pentagram | Hillary Clinton 2016 / Mastercard rebrand / Vitra | 系统化品牌识别 + 网格 + 单一强调色 |
| 02 | Stamen Design | COVID-19 surge map / Toner Low / Maps.stamen.com | 数据可视化温暖化 + 地图学 |
| 03 | Information Architects | iA Writer / iA Presenter | 内容优先 + 系统字体 + 蓝色超链接 |
| 04 | Fathom Information Design | Bill & Melinda Gates Foundation 年度报告 | 科学期刊风格 + 精确数据 |
| 05 | Locomotive | Lusion.co / Resn.co 早期作品 | 视差滚动 + 电影化叙事 |
| 06 | Active Theory | NASA Prospect / Chris Milk VR 作品 | 3D 粒子 + 鼠标交互 |
| 07 | Field.io | British Council digital installations | 生成艺术 + 数学精确 |
| 08 | Resn | Resn portfolio / 早期 Nike+ 营销站 | 游戏化探索 + 插画融合 |
| 09 | Experimental Jetset | Whitney Museum identity / Sunday Times Newspaper | 概念极简 + 蒙德里安色系 |
| 10 | Müller-Brockmann | Tonhalle Zürich 音乐会海报 | 瑞士网格 + 绝对对齐 |
| 11 | Build | Build studio portfolio | 70% 留白 + 微妙字重 |
| 12 | Sagmeister & Walsh | The Happy Show / AIGA Detroit | 意外色彩 + 手工感 |
| 13 | Zach Lieberman | openFrameworks / Eyewriter | 黑白手绘算法 |
| 14 | Raven Kwok | Processing 生成艺术展 | 分形递归 + 高对比 |
| 15 | Ash Thorp | Ghost in the Shell 概念图 / Mass Effect 概念 | 电影光影 + 温暖赛博 |
| 16 | Territory Studio | Blade Runner 2049 屏幕 / Tron Legacy UI | FUI 全息 |
| 17 | Takram | NHK 项目 / IDEO Tokyo | 概念原型 + 柔和科技 |
| 18 | Kenya Hara | Muji art direction / Designing Design 著作 | 80% 留白 + 白的层次 |
| 19 | Irma Boom | SHV Think Book (2136 页) | 非线性 + 边界游戏 |
| 20 | Naoto Fukasawa | Muji CD Player / ±0 product line | 无意识设计 + 超常态 |
| 21 | Pascal Devoyre | Brutalist Websites gallery | 裸露 HTML + 零圆角 |
| 22 | Michele Mazzini | Hype4Academy Neo-Brutalism UI | 粗边框 + 硬阴影 + 原色 |
| 23 | Bloomberg Businessweek | 杂志改版 | 信息密集 + 小报标题 |
| 24 | Lotta Nieminen | Studio portfolio / NYT Magazine | 北欧功能 + 原始形 |
| 25 | Ettore Sottsass | Carlton 书架 / Memphis Group 家具 | 几何碰撞 + 戏谑 |
| 26 | Camille Walala | Now Gallery London / Walala Land | 建筑尺度孟菲斯 |
| 27 | Morag Myerscough | Sheffield Children's Hospital 改造 | 社区色彩 + 归属感 |
| 28 | Studio Moross | Nike SB 品牌 / 2 Bears 音乐品牌 | 流行拼贴 + MTV 美学 |
| 29 | Neri Oxman | Silk Pavilion / Mediated Matter Group | 生物打印 + 材料生态 |
| 30 | Ross Lovegrove | Water Drop 台灯 / Go chair | 流动金属 + 进化形态 |
| 31 | Daan Roosegaarde | Smog Free Tower / Van Gogh Path | 光+自然+互动 |
| 32 | Heatherwick Studio | UK Pavilion Seed Cathedral / Vessel | 生物形态建筑 |
| 33 | Syd Mead | Blade Runner 概念设计 / Aliens 概念 | 铬金属 + 太空时代 |
| 34 | Daniel Simon | Cosmic Motors 概念车 | 宇宙流线 + 速度感 |
| 35 | Actual Source | Y2K 出版物 / iMac G3 美学 | 液态金属 + 气泡字体 |
| 36 | Andrés Reisinger | The Shipping / Take Over | 柔软数字 + 粉彩金属 |
| 37 | David Carson | Ray Gun 杂志 / Beach Culture | 破碎排版 + 直觉驱动 |
| 38 | Paula Scher | Public Theater 品牌 / Citi 品牌 | 信息地图 + 字体拼贴 |
| 39 | Peter Saville | Joy Division Unknown Pleasures / New Order Power Corruption & Lies | Factory Records 封面美学 |
| 40 | Kelly Wearstler | Proper Hotels / Bergdorf Goodman | 空间极繁 + 材质叠加 |

### 6.3 案例的 4 类用法

1. **作为推荐依据**:`方向 2 适合你,因为 Stripe 用的就是这种风格`
2. **作为搜索关键词**:沿用 §2 的搜索关键词,通过当前可用能力查找视觉参考
3. **作为反模式检查**:`如果你的产品不是高端品牌,不适合模仿 Bergdorf Goodman`
4. **作为可行性证据**:`已经有 5+ 真实产品用此风格,证明可落地`

### 6.4 注意事项

- 案例库是"参考"不是"标准" — 用户的项目有自己的 context,不要机械套用
- 真实产品 = 经过时间检验的设计决策,但未必是用户场景的最佳选择
- 涉及到具体品牌时,需执行品牌资产提取协议(详见 methods-review.md)

---

## 7. 约束过滤维度

即使流派和项目类型匹配,还需要根据 7 个约束维度判断适配度。这是 §4.3 输出结构"适配维度评分"的数据来源。

### 7.1 7 维度定义

| 维度 | 含义 | 为什么重要 | 评估问题 |
|------|------|----------|---------|
| **团队规模** | 1-3 / 4-10 / 10+ | 决定设计可维护性 | 团队能维护这种风格的细节吗? |
| **技术栈** | Swift/React/Vue/纯 HTML/WebGL | 决定实现成本 | 技术栈能支撑此风格的实现吗? |
| **预算** | 低/中/高 | 决定是否需要定制插画/动效 | 有无预算做定制素材? |
| **国际化** | 单语/多语(中/英/小语种) | 决定排版弹性 | 字体支持目标语言吗? |
| **暗色模式** | 是/否 | 决定色彩系统 | 是亮色还是暗色产品? |
| **维护周期** | 周/月/季度 | 决定设计稳健性 | 多久迭代一次? |
| **目标用户** | B 端/大众/小众 | 决定视觉风格选择 | 用户期待什么调性? |

### 7.2 7 维度 × 10 流派评分速查

| 流派 | 团队 | 技术 | 预算 | 国际化 | 暗色 | 维护 | 用户群 |
|------|------|------|------|--------|------|------|--------|
| 信息建筑派 | ★★ | ★★★ | ★★ | ★★★ | ★★ | ★★★ | B 端/数据 |
| 运动诗学派 | ★ | ★ | ☆ | ★★ | ★★★ | ★ | 沉浸叙事 |
| 极简主义派 | ★★★ | ★★★ | ★★ | ★★★ | ★★ | ★★★ | 通用 |
| 实验先锋派 | ☆ | ★ | ☆ | ★★ | ★★ | ★ | 小众/创意 |
| 东方哲学派 | ★★ | ★★★ | ★★ | ★★ | ★★ | ★★★ | 日式/克制 |
| 野蛮生长派 | ★★★ | ★★★ | ★★★ | ★★ | ★★ | ★★ | 反叛/年轻 |
| 后现代狂欢派 | ★ | ★★ | ★ | ★★ | ★★ | ★ | 文化/创意 |
| 有机仿生派 | ★ | ★ | ☆ | ★★ | ★ | ★ | 环保/健康 |
| 复古未来派 | ★ | ★★ | ★ | ★★ | ★★★ | ★ | 潮流/品牌 |
| 极繁主义派 | ★ | ★ | ☆ | ★★ | ★★ | ★ | 文化/品牌 |

### 7.3 评分解读

- ★★★ = 高度适配,几乎无障碍
- ★★ = 中度适配,需评估
- ★ = 低度适配,需投入资源
- ☆ = 不适配,通常不推荐

### 7.4 与 §4.6 铁律 2 的配合

3 问适配性自检中"问题 2:用户的团队/技术栈能支撑吗"→ 用本表快速判断。

### 7.5 与 §4.3 输出结构的配合

6 字段输出结构"5. 适配维度评分"格式:
```
适配维度评分:
- 团队规模 ★★☆ (适合 4-10 人团队)
- 技术栈 ★★☆ (需要 WebGL,纯 HTML 难)
- 预算 ★★☆ (中等,无需大量素材)
- 国际化 ★★★ (字体弹性好)
- 暗色模式 ★☆☆ (默认亮色,改造工作量大)
- 维护周期 ★★☆ (月级迭代,设计稳健)
- 目标用户 ★★☆ (B 端为主,适合专业调性)
```

---

## 8. 项目特征 12 维度分析框架

设计方向顾问的输入从"项目类型"升级为**12 维度细粒度项目画像**。前 7 个维度来自 §7 约束过滤，新增 5 个品牌/体验维度。

### 8.1 12 维度完整定义

| # | 维度 | 选项 | 对哲学选择的影响 |
|---|------|------|----------------|
| 1 | **品牌人格** | 专业可信/温暖亲和/反叛激进/奢华精致/童趣活泼/科技未来/人文艺术/自然有机 | 直接决定流派气质匹配度（反叛→野蛮/后现代；专业→信息建筑/极简；奢华→Build/复古未来） |
| 2 | **用户情感期待** | 效率信任/惊喜愉悦/沉浸心流/安全安心/探索好奇/归属认同 | 决定视觉强度和动效密度（沉浸→运动诗学；效率→信息建筑；惊喜→后现代） |
| 3 | **核心交互范式** | 表单驱动/内容浏览/数据探索/创作工具/游戏化/叙事引导 | 决定布局骨架和信息密度（数据探索→信息建筑；叙事→运动诗学；游戏化→Resn实验） |
| 4 | **内容密度需求** | 极高（交易终端）/高（数据Dashboard）/中（SaaS工具）/低（品牌官网）/极低（艺术展示） | 决定留白比例和组件密度（极高→Bloomberg野蛮编辑；极低→原研哉白/运动诗学） |
| 5 | **品牌资产强度** | 强（已成熟品牌，有VI规范）/中（有Logo和主色）/弱（只有方向感）/无（从零开始） | 强→从已有context出发；无→可以更大胆推荐☆流派 |
| 6 | **差异化诉求** | 保守跟随/微创新/显著差异/激进颠覆 | 保守→★★★流派；激进颠覆→☆流派或基因重组（§10） |
| 7 | 团队规模 | 1-3/4-10/10+ | （同§7）|
| 8 | 技术栈 | HTML/React/Vue/Swift/WebGL | （同§7）|
| 9 | 预算 | 低/中/高 | （同§7）|
| 10 | 国际化 | 单语/多语 | （同§7）|
| 11 | 暗色模式 | 是/否 | （同§7）|
| 12 | 维护周期 | 周/月/季度 | （同§7）|

### 8.2 维度→流派权重映射速查

| 维度值 | 优先流派 | 避免流派 |
|--------|---------|---------|
| 品牌人格=反叛激进 | 野蛮生长/后现代/实验先锋 | 东方哲学/Build极简 |
| 品牌人格=奢华精致 | Build极简/复古未来/有机仿生 | 野蛮生长/实验先锋 |
| 情感期待=沉浸心流 | 运动诗学派 | 信息建筑（太理性）|
| 内容密度=极低（艺术展示）| 运动诗学/东方哲学/实验先锋 | Bloomberg野蛮编辑 |
| 内容密度=极高（交易终端）| Bloomberg/信息建筑 | 运动诗学（留白太多）|
| 差异化=激进颠覆 | ☆流派或§10基因重组 | ★★★保守流派 |
| 差异化=保守跟随 | ★★★流派 | ☆流派 |
| 暗色模式=是 | 运动诗学/复古未来/实验先锋 | 信息建筑（默认亮色）|

### 8.3 画像输出格式

设计方向顾问启动时，先输出项目特征雷达（用户未主动提供时基于项目类型推断默认值，标注「推断」）：

```
项目特征画像:
- 品牌人格: 专业可信 [推断]
- 用户情感期待: 效率信任
- 核心交互范式: 表单驱动+数据探索
- 内容密度: 中高（SaaS Dashboard）
- 品牌资产强度: 中（有Logo+主色）
- 差异化诉求: 微创新
- 团队规模: 4-10
- 技术栈: React+Tailwind
- 暗色模式: 否
→ 基于此画像，权重最高的3个流派是: 信息建筑 > 极简主义 > 野蛮生长（北欧方向）
```

---

## 9. 可落地概念包模板（8字段输出结构）

设计方向顾问输出从 v3.0 的 6 字段升级为 **v3.1 的 8 字段结构**。字段 1-6 保留原有逻辑并加强引用 12 维度画像；字段 7-8 为新增可落地能力。

### 9.1 8字段输出结构（强制格式）

```markdown
## 设计方向建议

基于你的项目特征画像（[1-2句话总结画像]），我推荐以下 3 个方向，均经过「为什么适合你」「视觉DNA」「案例evidence」「风险」「落地Checklist」五重验证：

---

### 方向 1: [方向名]（[流派] · [哲学名]）— [梯度标签: 保守/平衡/激进]

**1. 流派 + 哲学**: [1句话解释这个哲学的核心主张]

**2. 为什么适合你的项目**（引用12维度画像）:
   - 契合你"[品牌人格]"的人格：[具体说明]
   - 满足"[情感期待]"的期待：[具体说明]
   - 适配"[交互范式+内容密度]"：[具体说明]

**3. 视觉 DNA**:
   - 色板（CSS变量，直接可用）:
     ```css
     --color-primary: oklch(...);   /* 主色 */
     --color-accent: oklch(...);    /* 强调色 */
     --color-bg: oklch(...);        /* 背景 */
     --color-text: oklch(...);      /* 正文 */
     --color-surface: oklch(...);   /* 表面/卡片 */
     ```
   - 字体栈（从§2对应哲学直接复制）:
     - Display: ...
     - Body: ...
   - 关键视觉签名: [2-3个一眼识别的特征，如"粗边框+硬阴影+ZERO圆角"]

**4. 标志性产品案例**（来自§6案例库）:
   - [产品A]: [一句话说明为什么算这个哲学]
   - [产品B]: [一句话说明]

**5. 适配维度评分**（12维度，从§7.2+§8映射）:
   - 品牌人格 ★★★ ...
   - 情感期待 ★★☆ ...
   - ...（全部12维度）

**6. 风险与反模式**（来自§5流派特异性反模式）:
   - ⚠️ [反模式1]: [后果] → [规避方案]
   - ⚠️ [反模式2]: [后果] → [规避方案]
   - ⚠️ [反模式3]: [后果] → [规避方案]

**7. 落地概念包**（可直接执行的具体指导）:

   7a. 关键组件样式规则:
   | 组件 | 该哲学下应该长什么样 |
   |------|---------------------|
   | 按钮 | [边框/圆角/背景/阴影/hover态/字重的具体描述] |
   | 卡片 | [边框/圆角/阴影/内边距/hover态] |
   | 导航 | [位置/背景/边框/字体/active态] |
   | 输入框 | [边框/圆角/高度/focus态/标签位置] |

   7b. 页面布局范式（ASCII骨架图，以落地页为例）:
   ```
   ┌─────────────────────────────────────────────┐
   │  NAV: [导航样式具体描述]                      │
   ├─────────────────────────────────────────────┤
   │                                              │
   │              HERO (100vh / 60vh)             │
   │    [对齐方式] [标题字号] [描述最大宽度]       │
   │                                              │
   ├─────────────────────────────────────────────┤
   │  FEATURES (3列/4列网格  gutter=?px)          │
   │  ┌───────┐  ┌───────┐  ┌───────┐            │
   │  │       │  │       │  │       │            │
   │  └───────┘  └───────┘  └───────┘            │
   ├─────────────────────────────────────────────┤
   │  CTA: [背景/对齐/按钮样式]                   │
   ├─────────────────────────────────────────────┤
   │  FOOTER: [密度/对齐]                         │
   └─────────────────────────────────────────────┘
   ```

   7c. 动效原则:
   - 缓动函数: [cubic-bezier具体值或名称]
   - 典型时长: [ms范围]
   - 触发策略: [滚动触发/hover触发/加载序列]
   - 该流派禁用动效: [如"禁用淡入淡出，用硬切"]

   7d. 反模式红线（绝对禁止）:
   - 🚫 [具体禁止事项1，如"圆角>0px"]
   - 🚫 [具体禁止事项2]
   - 🚫 [具体禁止事项3]

   7e. 落地 Checklist（渐进步骤）:
   - [ ] 5分钟: 把全局CSS变量改为视觉DNA中的色板和字体
   - [ ] 30分钟: 按钮+卡片样式改为7a中的规则
   - [ ] 1天: 页面骨架按7b布局范式重构
   - [ ] 1周: 细节打磨+动效+响应式适配+对照§4铁律审查

**8. Demo 预览**:
   - [若用户说"demo/演示/出个html/看看效果"] → 已生成可运行Demo，见 `[文件路径]`，浏览器直接打开查看
   - [若用户未要求] → 💡 输入"demo"或"演示一下"，我可以生成一个可在浏览器打开的HTML Demo展示这个方向的实际效果。生成规范见 `references/execution.md`（Demo 生成规范），保存到 `.monkren/demos/` 目录。

---

### 方向 2: ...（同上结构）

### 方向 3: ...（同上结构）

---

**怎么选?**
- 求稳选方向 1（保守/平衡）
- 想有记忆点选方向 2（平衡/显著差异）
- 想让人过目不忘选方向 3（激进）
- 告诉我你的项目阶段和团队偏好，我可以收敛到一个方向。
- 选定方向后，输入"demo [方向名]"可直接生成可视化Demo。
```

### 9.2 字段7（落地概念包）内容来源

- 7a 组件样式：结合§11页面模式库中该流派的组件描述+§2核心特征
- 7b ASCII布局：结合§11页面模式库的布局骨架
- 7c 动效原则：结合§2哲学核心特征推断（如运动诗学→平滑缓动+长时长；野蛮UI→硬切+零过渡）
- 7d 反模式红线：来自§5流派特异性反模式
- 7e Checklist：按改色板→改组件→改布局→打磨的渐进路径

### 9.3 梯度标签规则

每个方向必须标注梯度标签（保守/平衡/激进）：
- **保守版**：90%遵循主流平台惯例+10%该哲学签名元素（适合差异化=保守跟随）
- **平衡版**：70%主流+30%该哲学特征（默认推荐，适合微创新/显著差异）
- **激进版**：40%主流+60%该哲学特征（适合激进颠覆）

同一哲学内核下可给出不同梯度（见§10.3梯度选择法）。

---

## 10. 哲学基因重组发散方法

除了"从40种哲学里选3个"，还可通过以下3种方法发散出**库里没有的新概念**。

### 10.1 基因重组法

不是简单混搭（"A风格+B风格"），而是**提取不同哲学的核心基因进行组合**，共享基因越多，重组越和谐。

#### 基因定义

每个流派提取3-5个核心基因（可传递的最小特征单元）：

| 流派 | 核心基因 |
|------|---------|
| 信息建筑（Pentagram）| G1-数学网格 / G2-字体主导 / G3-色彩克制 / G4-信息层级精确 |
| 运动诗学（Locomotive）| G5-视差纵深 / G6-电影叙事 / G7-暗色沉浸 / G8-丝滑缓动 |
| 极简主义（Müller-Brockmann）| G9-绝对留白 / G10-无衬线几何 / G11-功能至上 / G12-不对称平衡 |
| 实验先锋（Zach Lieberman）| G13-创意编码 / G14-手绘算法 / G15-黑白诗意 |
| 东方哲学（Kenya Hara）| G16-白的层次 / G17-空的容纳 / G18-微妙质感 |
| 野蛮生长（Mazzini）| G19-粗边框 / G20-硬阴影 / G21-原色色块 / G22-零圆角 |
| 后现代狂欢（Sottsass）| G23-几何碰撞 / G24-撞色愉悦 / G25-戏谑解放 |
| 有机仿生（Oxman）| G26-生长形态 / G27-自然材质 / G28-流动曲线 |
| 复古未来（Syd Mead）| G29-铬金属反光 / G30-太空流线 / G31-霓虹光晕 |
| 极繁主义（Carson）| G32-破碎排版 / G33-图层叠加 / G34-直觉驱动 |

#### 10个经典基因重组配方

| 配方名 | 基因组合 | 效果描述 | 共享基因（和谐原因） | 适用场景 |
|--------|---------|---------|-------------------|---------|
| **理性惊喜** | G1网格+G2字体主导+G8丝滑缓动 | Pentagram网格骨架上的微交互惊喜，理性但有温度 | 都尊重"设计为内容服务" | B2B SaaS想在专业中增加愉悦感 |
| **优雅野蛮** | G19粗边框+G9留白+G10无衬线几何+G3色彩克制 | 粗边框但大量留白+单一色+几何无衬线，野蛮但不吵 | 共享"扁平+直接"基因 | 创意机构/个人作品集 |
| **静谧电影** | G16白的层次+G6电影叙事+G8丝滑缓动 | 白色留白中的电影化叙事转场 | 共享"节奏+留白"基因 | 高端品牌/美术馆/摄影师网站 |
| **信息狂欢** | G1数学网格+G2字体主导+G24撞色 | 精确网格中大胆撞色，数据丰富但不混乱 | 共享"结构强"基因 | 数据新闻/媒体Dashboard |
| **赛博禅意** | G7暗色沉浸+G16白的层次+G17空的容纳 | 暗色空间中的微妙光感和大量留白 | 共享"少即是多" | 高端科技/AI产品 |
| **友好野蛮** | G19粗边框+G20硬阴影+柔和pastel色（非原色） | 粗边框硬阴影但用柔和色，野蛮+亲和力 | 替换冲突基因为柔和版本 | 教育/儿童/DTC品牌 |
| **流动网格** | G1数学网格+G28流动曲线+G4精确层级 | 网格内的有机曲线装饰，理性+有机温度 | 共享"结构清晰" | 健康/医疗/wellness产品 |
| **未来野蛮** | G19粗边框+G20硬阴影+G31霓虹光晕+G7暗色 | 暗色下的粗边框+霓虹硬阴影 | 共享"高对比度"基因 | 开发者工具/游戏/潮牌 |
| **编辑极繁** | G2字体主导+G32破碎排版+G33图层叠加 | 字体主导的破碎叠加，文字本身即视觉 | 共享"字体核心" | 文化机构/杂志/音乐节 |
| **呼吸运动** | G9留白+G5视差纵深+G7暗色沉浸 | 极简留白中的微妙视差，东方+运动的静谧融合 | 共享"节奏感" | 奢侈品牌/酒店/建筑事务所 |

#### 冲突消解策略

基因重组时若发现**互斥基因**（来自§4兼容性矩阵标记为互斥的流派），必须采用以下消解策略之一：
1. **比例倾斜**：70%A基因+30%B基因，让一方主导，避免50/50
2. **区域隔离**：A基因用于核心工作区，B基因用于营销/落地页
3. **基因软化**：将强烈特征做降维处理（如G24撞色→降低饱和度；G19粗边框→从4px降到2px）
4. **放弃该重组**：若以上都无法和谐，诚实告知用户这对组合不推荐

### 10.2 行业×哲学意外组合推荐

**反共识但可落地**的方向（保守选项之外的惊喜），每个提供"为什么可行"和"边界条件"：

| 行业 | 保守选择 | 意外组合 | 为什么可行 | 边界条件/注意事项 |
|------|---------|---------|-----------|------------------|
| 金融/Banking Dashboard | 信息建筑派 | 东方留白哲学（Kenya Hara） | 金融需要信任，留白传达从容和掌控感，原研哉的白≠空，是精确的信息呼吸 | 数据表格保持高密度，只在Hero/空状态/品牌区用留白 |
| 医疗/健康App | 极简主义 | 新野蛮UI（Mazzini 友好方向）| 医疗需要诚实直接，粗边框硬阴影传达"不掩饰、不美化"的真实感 | 色板必须用柔和绿/蓝，禁用红黄原色色块；按钮要大（触控友好）|
| B2B SaaS工具 | 信息建筑派 | 孟菲斯几何（Sottsass 精简版）| SaaS同质化严重，一个几何装饰元素即可创造记忆点 | 只在空状态/成功页/Onboarding用几何元素，工作界面保持简洁 |
| 电商产品页 | 极简主义 | 编辑极繁（Carson方向）| 产品图本身就是视觉，破碎排版的文字环绕增加 editorial 感 | 仅用于品牌故事/About页面，PDP/Cart/Checkout必须保持功能清晰 |
| 开发者工具 | 野蛮生长派 | Locomotive暗色沉浸 | 开发者常在暗色环境工作，电影化暗色比纯黑更有质感 | 代码区保持等宽+高对比度，动效要克制（开发者对性能敏感）|
| 教育产品 | 后现代色彩（Walala）| 信息建筑派（Pentagram）| 教育需要内容清晰，网格保证可读性，社区色彩增添活力 | 用色板编码学习进度/类别，而非大面积色块装饰 |

### 10.3 梯度选择法

同一哲学内核下提供3个梯度（字段1必须标注梯度标签）：

以"野蛮生长派（Mazzini）"为例：
- **保守版（野蛮10%）**：保留边框和硬阴影，但阴影从6px降到3px，边框从3px降到1px，色板用柔和品牌色替代红黄蓝原色，按钮圆角保留0但其他元素可加2px圆角
- **平衡版（野蛮30%，默认）**：3px边框+4px硬阴影+一个原色（如蓝色）做强调，其他用中性色，卡片/按钮零圆角，输入框可有2px圆角
- **激进版（野蛮60%）**：4px边框+8px硬阴影+红/蓝/黄三原色直出，所有元素零圆角，按钮点击有位移（按下阴影缩小），等宽字体贯穿

用户未指定梯度时，默认输出平衡版，并简要列出保守版/激进版的差异调整点。

---

## 11. 页面类型×哲学设计模式库

针对常见页面类型，提供每个流派下的具体设计模式。首期覆盖 **10流派 × 2核心页面类型**（品牌落地页+Dashboard），按需扩展。

### 11.1 页面骨架通用组件集

每个模式描述固定包含：
- **布局网格**：列数/gutter/max-width
- **Hero/Dashboard头部**：高度/对齐/字号/背景处理
- **导航**：位置/样式/active态
- **卡片容器**：边框/阴影/圆角/内边距
- **按钮**：样式/hover/字号/字重
- **特征区块**：列数/间距/标题样式
- **数据展示（Dashboard）**：表格/KPI卡片/图表样式
- **CTA区块**：背景/对齐/按钮
- **Footer**：密度/对齐

### 11.2 品牌落地页 × 10流派模式

| 流派 | Hero高度 | 网格 | 导航 | 卡片/按钮 | 字体策略 | 氛围关键词 |
|------|---------|------|------|----------|---------|-----------|
| **信息建筑(Pentagram)** | 80vh左对齐 | 12列/32px gutter/max1200px | 顶栏/下划线分隔/mono标签小字 | 1px细线边框/无阴影/方角/hover变强调色 | 无衬线大标题+mono标签+正文常规 | 克制、精准、字体主导 |
| **运动诗学(Locomotive)** | 100vh居中 | 无严格网格/电影分镜 | 透明fixed/mix-blend-mode:difference | 无边框/无阴影/背景色按钮/glow hover | 衬线斜体大标题+细无衬线正文 | 沉浸、电影、暗色、叙事 |
| **极简主义(Müller-Brockmann)** | 70vh不对称 | 12列数学精确 | 极简顶栏/几乎隐形 | 无框无阴影/纯文字链接/极细分隔线 | 无衬线几何/大字重对比 | 留白、秩序、宁静 |
| **实验先锋(Zach Lieberman)** | 100vh canvas居左 | 自由/不对称 | 左竖排或隐藏 | 无传统按钮/手势驱动/手绘感边框 | 等宽/不规则字号/手绘感 | 诗意、神秘、算法 |
| **东方哲学(Kenya Hara)** | 90vh居中 | 非对称/大量留白 | 极简居中/小字号 | 无框/极细分隔线/材质暗示边界 | 衬线+细无衬线/大字距 | 白、空、静谧、微妙 |
| **野蛮生长(Mazzini)** | 60vh左对齐 | 宽松网格/gutter大 | 顶栏粗边框分隔 | 3px粗边框/6px硬阴影/零圆角/点击位移 | 粗无衬线/大写/等宽辅助 | 直接、诚实、有力 |
| **后现代狂欢(Sottsass)** | 100vh拼贴感 | 自由几何拼贴 | 大胆色彩导航/色块底 | 几何色块/无框但有形状/撞色 | 几何无衬线/活泼字重 | 快乐、碰撞、解放、戏谑 |
| **有机仿生(Oxman)** | 80vh流动布局 | 打破网格/有机曲线分区 | 透明/融入背景 | 圆角大/无硬边界/渐变背景 | 无衬线/圆润/大字距 | 流动、生长、自然 |
| **复古未来(Syd Mead)** | 100vh暗色居中 | 12列/硬网格分割线 | 暗色/发光分割线 | 金属感渐变/细边框/霓虹hover | 未来感几何无衬线/斜体 | 铬、霓虹、太空、流线 |
| **极繁主义(Carson)** | 100vh破碎叠印 | 无网格/文字叠加 | 融入画面/无固定位置 | 无传统按钮/文字即链接/图层叠加 | 多字体/多字号/不规则对齐 | 混乱、能量、直觉、叛逆 |

### 11.3 Dashboard × 10流派模式

| 流派 | Sidebar | KPI卡片 | 数据表格 | 按钮 | 图表风格 | 整体密度 |
|------|---------|---------|---------|------|---------|---------|
| **信息建筑** | 细边框分隔/mono标签 | 1px边框/无阴影/规整对齐 | 紧凑/zebra可选/对齐精确 | 1px边框/方角 | 简洁条形/折线/标注完整 | 中高 |
| **运动诗学** | 暗色/微妙发光/图标+文字 | 半透明玻璃感/微光边框 | 暗底/低对比分隔线/hover行发光 | 背景色按钮/glow | 流动曲线/平滑动画/暗色 | 中 |
| **极简主义** | 几乎隐形/只有图标 | 无边框/大数字+小标签/大量留白 | 无线/只有hover下划线 | 文字链接/无边框 | 极简线/单色/无填充 | 低 |
| **实验先锋** | 不传统（命令行式/手势）| 非传统（文字流/动态可视化）| 不推荐此流派做重Dashboard | 手绘/不规则 | 生成艺术/粒子/非常规 | 中 |
| **东方哲学** | 极简/SVG线条图标+大量留白 | 无框/留白包裹/微妙质感边界 | 极细分隔线/大量行高 | 极简/无阴影/hover微妙底色 | 手绘感/水墨/SVG线条 | 低中 |
| **野蛮生长** | 黑底白字/粗边框/黄badge | 3px粗边框/6px硬阴影/色块底（蓝/黄/红/白）| 粗边框表头/等宽标签/进度条用█字符 | 粗边框+硬阴影/点击位移 | 粗条/对比强/粗坐标线 | 高 |
| **后现代狂欢** | 色块导航/几何装饰 | 几何色块形状/撞色/无阴影 | 彩色表头/交替色块行 | 圆形或胶囊/撞色 | 大胆色彩/装饰几何元素 | 中高 |
| **有机仿生** | 大圆角/柔和阴影/绿色调 | 圆角大/柔和渐变/有机形状 | 大圆角卡片包裹/柔和分隔 | 大圆角/全圆角 | 流动/有机曲线/柔和色 | 中 |
| **复古未来** | 暗色/发光分隔线/霓虹高亮 | 暗色/霓虹边框/全息感/数据发光 | 暗底/发光行hover/扫描线暗示 | 金属渐变/霓虹发光hover | 3D感/发光网格/科幻HUD | 中 |
| **极繁主义** | 不推荐（极繁不适合Dashboard）| — | — | — | — | — |

> ⚠️ Dashboard优先选择：信息建筑 > 野蛮生长(Mazzini) > 极简主义 > 运动诗学。其他流派需大量改造。

### 11.4 落地页ASCII骨架范例（野蛮生长派）

```
┌──────────────────────────────────────────────────────────┐
│  [粗底边框分割线]                                          │
│  LOGO(大写粗体)              ABOUT WORK CONTACT(mono大写)   │ ← NAV: 3px粗边框分隔
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ◈ 01 INTRODUCTION (mono 11px, 黄色)                      │
│                                                          │
│  BUILD IT                                                 │
│  BRUTAL.                                                  │ ← HERO: 60vh, 左对齐
│  HONEST.                                                  │   标题48-72px/900/全大写
│  NO EXCUSES.                                              │   描述max-width 500px
│                                                          │   按钮: 粗框+硬阴影+黄底
│  [START BUILDING →]                                      │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  ◈ 02 FEATURES (mono 11px, 蓝色)                3 / 3    │
├──────────────────────────────────────────────────────────┤
│ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│ │ 3px BORDER  │  │ 3px BORDER  │  │ 3px BORDER  │        │ ← FEATURES: 3列
│ │ 6px SHADOW  │  │ 6px SHADOW  │  │ 6px SHADOW  │        │   卡片: 粗框+硬阴影
│ │ 01          │  │ 02          │  │ 03          │        │   标题: 粗体大写
│ │ BOLD TITLE  │  │ BOLD TITLE  │  │ BOLD TITLE  │        │
│ │ description │  │ description │  │ description │        │
│ └─────────────┘  └─────────────┘  └─────────────┘        │
├──────────────────────────────────────────────────────────┤
│ [CTA区域: 黑底黄字或黄底黑字，粗边框包裹整行]                │
│ READY TO BUILD?              [LET'S GO →]                │
├──────────────────────────────────────────────────────────┤
│ FOOTER (mono小字，左右分布，粗边框分隔)                    │
└──────────────────────────────────────────────────────────┘
```

---
