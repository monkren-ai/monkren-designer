# 标准层:我怎么判断好不好?

> 审查与创作共享的评价标准。5 维度评分体系、评分纪律、反 AI slop 完整黑名单、9 段框架检查清单、硬编码检测、合规检查、品牌资产协议、视觉层级/排印/色彩/可访问性/交互/简化/系统思维标准。

---

## 1. 5 维度评审体系

### 1.1 哲学一致性(Philosophy Alignment)

| 分数 | 标准 |
|------|------|
| 9-10 | 设计完美体现了选定哲学的核心精神,每个细节都有哲学依据 |
| 7-8 | 整体方向正确,核心特征到位,个别细节偏离 |
| 5-6 | 能看出意图,但执行时混入了其他风格元素,不够纯粹 |
| 3-4 | 仅在表面模仿,未理解哲学内核 |
| 1-2 | 与选定哲学基本无关 |

**评审要点**:
- 是否使用了该设计师/机构的标志性手法?
- 色彩、字体、布局是否符合该哲学体系?
- 有没有「自相矛盾」的元素?(如选了 Kenya Hara 却塞满内容)
- 评分必须引用具体元素/页面/组件作为证据(30-80 字证据段落)
- 用户未声明哲学方向时,能否从视觉特征推断其试图遵循的方向?
- 是否存在该流派特有的反模式?(见 `references/philosophy-library.md` 各流派「反模式检测」章节)
- 哲学一致性评分低于 7 时,是否有对应的提升路径可推荐?

### 1.2 视觉层级(Visual Hierarchy)

| 分数 | 标准 |
|------|------|
| 9-10 | 用户视线自然沿设计者意图流动,信息获取零摩擦 |
| 7-8 | 主次关系清晰,偶有 1-2 处层级模糊 |
| 5-6 | 能分出标题和正文,但中间层级混乱 |
| 3-4 | 信息平铺,没有明确的视觉入口 |
| 1-2 | 混乱,用户不知道先看哪里 |

**评审要点**:
- 标题与正文的字号对比是否足够?(至少 2.5 倍)
- 颜色/粗细/大小是否建立了 3-4 个清晰层级?
- 留白是否在引导视线?
- 「眯眼测试」:眯起眼看,层级是否仍然清晰?
- 评分必须引用具体字号/颜色/间距值作为证据(30-80 字证据段落)

**创作视角的层级构建** → `references/methods-create.md`(视觉层级与节奏的创作方法)

### 1.3 细节执行(Craft Quality)

| 分数 | 标准 |
|------|------|
| 9-10 | 像素级精确,对齐、间距、颜色无任何瑕疵 |
| 7-8 | 整体精致,有 1-2 处微小对齐/间距问题 |
| 5-6 | 基本对齐,但间距不统一,颜色使用不够系统 |
| 3-4 | 明显的对齐错误、间距混乱、颜色过多 |
| 1-2 | 粗糙,看起来像草稿 |

**评审要点**:
- 是否使用了统一的间距系统(如 8pt 网格)?
- 同类元素的间距是否一致?
- 颜色数量是否受控?(通常不超过 3-4 种)
- 字体家族是否统一?(通常不超过 2 种)
- 边缘对齐是否精确?
- 图标风格是否统一?(同一产出使用同一图标库,filled/outline 不混用,线重一致)
- 图标尺寸是否遵循系统?(16/20/24/32px,不出现非标准尺寸)
- 评分必须引用具体对齐/间距/色值偏差作为证据(30-80 字证据段落)

### 1.4 功能性(Functionality)

| 分数 | 标准 |
|------|------|
| 9-10 | 每个设计元素都服务于目标,零冗余 |
| 7-8 | 功能导向明确,有少量可删减的装饰 |
| 5-6 | 基本可用,但有明显的装饰性元素分散注意力 |
| 3-4 | 形式大于功能,用户需要努力寻找信息 |
| 1-2 | 完全被装饰淹没,失去了传达信息的能力 |

**评审要点**:
- 删掉任何一个元素,设计会变差吗?(如果不会,就应该删)
- CTA/关键信息是否在最显眼的位置?
- 是否有「因为好看所以加上去」的元素?
- 信息密度与载体是否匹配?(PPT 不宜太密,PDF 可以更密)
- 文案是否服务于用户目标(而非品牌自嗨)?"赋能企业"是品牌自嗨,"减少 40% 审批时间"是用户目标
- 信息架构是否通过文案体现(而非仅靠视觉)?去掉所有样式,纯文字版本能否传达同样的信息层级?
- 文案是否消除了用户决策摩擦?每个 CTA 是否告诉用户下一步会发生什么?每个表单是否解释了为什么需要这个信息?
- 评分必须引用具体元素的功能缺失/冗余作为证据(30-80 字证据段落)

### 1.5 创新性(Originality)

| 分数 | 标准 |
|------|------|
| 9-10 | 令人耳目一新,在该哲学框架内找到了独特表达 |
| 7-8 | 有自己的想法,不是简单的模板套用 |
| 5-6 | 中规中矩,看起来像模板 |
| 3-4 | 大量使用了 cliché(如渐变圆球代表 AI) |
| 1-2 | 完全是模板或素材拼凑 |

**评审要点**:
- 是否避免了常见 cliché?(见下方「常见设计问题」)
- 在遵循设计哲学的同时是否有个人表达?
- 是否有「意想不到但很合理」的设计决策?
- 评分必须引用具体 cliché/独特决策作为证据(30-80 字证据段落)

---

## 2. 场景评审侧重

不同输出类型的评审重点不同:

| 场景 | 最重要维度 | 次重要 | 可放宽 |
|------|-----------|--------|--------|
| 公众号封面/配图 | 创新性、视觉层级 | 哲学一致性 | 功能性(单图不涉及交互) |
| 信息图 | 功能性、视觉层级 | 细节执行 | 创新性(准确优先) |
| PPT/Keynote | 视觉层级、功能性 | 细节执行 | 创新性(清晰优先) |
| PDF/白皮书 | 细节执行、功能性 | 视觉层级 | 创新性(专业优先) |
| 落地页/官网 | 功能性、视觉层级 | 创新性 | —(全面要求) |
| App UI | 功能性、细节执行 | 视觉层级 | 哲学一致性(可用性优先) |
| 小红书配图 | 创新性、视觉层级 | 哲学一致性 | 细节执行(氛围优先) |

---

## 3. 评分纪律(4 铁律)

> 评分的客观性和区分度是审查报告的生命线。以下 4 条铁律必须严格遵守。

### 铁律 1:禁止评分通胀

7 分意味着"强",不是"及格"。如果所有维度都 ≥ 7,审查可能不够严格。

**自检触发条件**:5 个维度全部 ≥ 7 时,重新审视——至少 1 个维度应低于 7,除非设计确实卓越(这种情况极罕见)。

**例外**:设计确实在所有维度都达到 8+ 水平(如 Apple 官网级别的执行质量),此时应在报告中说明为什么每个维度都高分。

### 铁律 2:禁止平均上浮

评分取"最差持续段",而非平均值。

**示例**:
- 视觉层级在 hero 页 9/10,但在 body 页只有 5/10 → 评分应为 5-6,不是 7
- 细节执行在桌面端 8/10,移动端 4/10 → 评分应为 5-6,不是 6.5
- 哲学一致性前 3 页 8/10,后 2 页混入其他风格 4/10 → 评分应为 5-6

### 铁律 3:评分必须引证

每维度评分必须附带 30-80 字证据段落,引用具体元素/类名/行号。

**不可接受**:"感觉不太对" / "需要优化" / "整体还行" / "有点乱"

**必须做到**:"`.subtitle`(L13)与 `h2`(L18)字号差距不足 1.1 倍,中间层级模糊,评 6 分"

### 铁律 4:创新性允许低分

5/10 的创新性对生产交付物是合理的。不应因"适当的保守"而惩罚功能性设计。

**判断标准**:
- 概念设计/品牌设计 → 创新性权重高,5/10 可能偏低
- 生产交付物/内部工具 → 创新性权重低,5/10 是合理基线
- 模板套用/组件库 → 创新性 3-4/10 是正常的

---

## 4. 常见设计问题

### 4.1-4.12 常见问题清单

| # | 问题 | 为什么是问题 | 修复 |
|---|------|------------|------|
| 1 | AI 科技 cliché(渐变圆球、数字雨、蓝色电路板、机器人脸) | 用户已视觉疲劳,无法区分 | 用抽象隐喻替代直白符号 |
| 2 | 字号层级不足(标题正文差距 < 2.5 倍) | 无法快速定位关键信息 | 标题至少为正文 3 倍(正文 16px → 标题 48-64px) |
| 3 | 颜色过多(5 种以上无主次) | 视觉混乱,品牌感弱 | 限制为 1 主色+1 辅色+1 强调色+灰阶 |
| 4 | 间距不统一 | 不专业,视觉节奏混乱 | 建立 8pt 网格(4/8/12/16/20/24/32/40/48/56/64/72/80/96px) |
| 5 | 留白不足 | 信息拥挤导致阅读疲劳 | 留白至少占总面积 40%(极简 60%+) |
| 6 | 字体过多(3 种以上) | 视觉噪音,削弱统一感 | 最多 2 种(1 标题+1 正文),用字重和大小创造变化 |
| 7 | 对齐不一致 | 破坏视觉秩序感 | 选定一种对齐方式(推荐左对齐),全局统一 |
| 8 | 装饰大于内容 | 本末倒置 | 「删掉这个装饰,设计会变差吗?」如果不会,就删 |
| 9 | 赛博霓虹滥用(深蓝底+霓虹发光) | 默认审美禁区,最大 cliché 之一 | 选择更有辨识度的配色 |
| 10 | 信息密度与载体不匹配 | 不同载体最佳密度不同 | PPT 每页 1 观点 / 封面 1 焦点 / 信息图分层 / PDF 可更密但需导航 |
| 11 | 文案空洞(AI Copywriting Slop) | 用户无法获得具体信息,决策摩擦增大 | 空洞词→具体动词场景 / 泛泛 CTA→具体行动描述 / 编造数据→真实数据或 placeholder |
| 12 | 图标混搭与滥用(Icon Slop) | 视觉重量不一致,像拼凑 | 选一个图标库全文统一 / 删装饰性图标 / 不匹配比没图标更糟 |

---

## 5. 反 AI slop 完整黑名单

AI 设计里最容易掉进去的陷阱。这是一份「不做什么」的清单,比「做什么」更重要——因为 AI slop 是默认值,你不主动避免就会发生。

### 5.1 视觉陷阱

**❌ 激进渐变背景**:紫色→粉色→蓝色全屏渐变、rainbow gradient、mesh gradient 铺满。✅ 如果要用渐变:subtle、单色系、有意图点缀(如 button hover)。

**❌ 圆角卡片 + 左 border accent 色**:
```css
/* AI 味卡片的典型签名 */
.card { border-radius: 12px; border-left: 4px solid #3b82f6; padding: 16px; }
```
想做强调?用背景色对比、字重/字号对比、plain 分隔线,或干脆不分卡片。

**❌ Emoji 装饰**:除非品牌本身使用 emoji(Notion、Slack),否则不要在 UI 上放 emoji。尤其不要:标题前的 🚀 ⚡️ ✨ 🎯 💡、Feature 列表的 ✅、CTA 按钮里的 →。

**❌ SVG 画 imagery**:不要试图用 SVG 画人物、场景、设备、物品、抽象艺术。唯一可以用 SVG 的场景:真正的 icon(16×16 到 32×32)、几何图形装饰、data viz 的 chart。

**❌ 过多 iconography**:不是每个标题/feature/section 都需要 icon。滥用 icon 会让界面像 toy。

**❌ "Data slop"**:编造的 stats 装饰("10,000+ happy customers"、"99.9% uptime"、图标+数字+词组成的"metric cards")。如果没真数据,留 placeholder 或问用户要。

**❌ "Quote slop"**:编造的用户评价、名人名言装饰页面。

### 5.2 字体陷阱

**❌ 避免烂大街字体**:Inter(AI 生成网页默认)、Roboto、Arial/Helvetica、纯 system font stack、Fraunces、Space Grotesk。

**✅ 用有特点的 display+body 配对**:
- 衬线 display + 无衬线 body(editorial feel)
- Mono display + sans body(technical feel)
- Heavy display + light body(contrast)
- Variable font 做 hero 的粗细动画

**字体资源**:Google Fonts 冷门好选项(Instrument Serif、Cormorant、Bricolage Grotesque、JetBrains Mono)、开源字体站。不要凭空发明字体名。

### 5.3 色彩陷阱

**❌ 凭空发明颜色**:不要从头设计一整套不熟悉的色彩,通常不和谐。

**✅ 策略**:
1. 有品牌色 → 用品牌色,缺的 color token 用 oklch 插值
2. 没有品牌色但有参考 → 从参考产品截图吸色
3. 完全从零 → 选一个 known 的配色系统(Radix Colors / Tailwind 默认 palette / Anthropic brand)

**oklch 定义色彩**是最现代的做法:
```css
:root {
  --primary: oklch(0.65 0.18 25);      /* 温暖的 terracotta */
  --primary-light: oklch(0.85 0.08 25); /* 同色系浅色 */
  --primary-dark: oklch(0.45 0.20 25);  /* 同色系深色 */
}
```
oklch 能保证调整亮度时色相不漂移,比 hsl 好用。

**❌ 夜间模式随手加反色**:不是简单 invert 颜色。好的 dark mode 需要重新调整饱和度、对比度、accent 色。不想做 dark mode 就别做。

### 5.4 Layout 陷阱

**❌ Bento grid 过度泛滥**:每个 AI 生成的 landing page 都想搞 bento。除非信息 structure 确实适合 bento,否则用其他 layout。

**❌ 大 hero + 3-column features + testimonials + CTA**:这个 landing page 模板被用烂了。

**❌ Card grid 里每个 card 长一样**:Asymmetric、不同大小的 cards、有的带 image 有的只有文字、有的跨列——这才像真设计师做的。

### 5.5 文案 Slop 完整黑名单

#### 空洞词汇
- ❌ "赋能""生态""智慧""颠覆""引领""一站式""全方位""深度融合""全链路""新基建""数字化转型"
- ✅ 用具体动词替代:把"赋能企业"改成"帮企业减少 40% 审批时间"
- 判断标准:删掉这个词,句子含义是否改变?如果不变,这个词就是空洞的

#### 编造数据(Data Slop · 文案维度)
- ❌ "10,000+ happy customers"(无来源)、"99.9% uptime"(无真数据)、"提升 300%"(无基线)
- ✅ 有真数据就用;没真数据就留 placeholder;或用定性描述替代定量

#### 泛泛 CTA
- ❌ "了解更多""立即开始""点击这里""开始使用""立即体验"
- ✅ CTA 应告诉用户具体会得到什么:"了解更多"→"查看定价方案"/"阅读 API 文档"
- 判断标准:用户看到 CTA 时,能否预判点击后会得到什么?

#### 伪专业术语
- ❌ "AI 驱动""智能引擎""数据中台""底层架构""核心算法""深度学习框架""全栈解决方案"
- ✅ 用用户能理解的语言:"AI 驱动的推荐系统"→"根据你的阅读历史推荐文章"

#### 模板化表达
- ❌ "您的 X 伙伴""为您量身定制""一站式解决方案""值得信赖的""行业领先的"
- ✅ 用品牌独有语言:"您的出行伙伴"→"让每次出发都准时"
- 判断标准:把品牌名换成竞品名,这句话还成立吗?如果成立,它就是模板化的

### 5.6 图标使用规范

图标是信息密度的载体,不是装饰品。每个图标都必须承载语义,否则就是 iconography slop。

#### 什么时候用图标
**✅ 应该用**:导航项(图标+文字标签)、操作按钮(强化操作含义)、状态指示、空间受限。
**❌ 不应该用**:每个标题/feature/section 都配图标、图标无法独立传达含义且无文字标签、纯装饰、与文字标签语义不匹配。

#### 图标风格一致性
| 混搭模式 | 问题 | 修复 |
|---------|------|------|
| Lucide + Heroicons 同页 | 线条粗细/圆角/风格不统一 | 选一个库,全文统一 |
| Filled + Outline 混用 | 视觉重量不一致 | 统一为 outline 或 filled |
| 不同线重(1.5px + 2px) | 看起来像拼凑 | 统一线重 |
| SF Symbols + 自定义 SVG | 风格割裂 | 选一种,保持一致 |

**推荐图标库**(选一个,不要混):Lucide(轻量一致开源)、Heroicons(Tailwind 官方)、Phosphor Icons(6 种风格变体)、Tabler Icons(1.5px 线重)。

#### 图标尺寸系统
| 尺寸 | 用途 |
|------|------|
| 16px | 紧凑空间(表格内、标签旁) |
| 20px | 行内图标(文字旁、列表项) |
| 24px | 标准尺寸(导航、按钮) |
| 32px | 强调图标(空状态、大按钮) |
| 48px+ | 插画级图标(此时是 illustration 不是 icon) |

**硬规则**:图标尺寸必须是 4 的倍数 / 可点击图标热区 ≥ 44×44px / 图标按钮必须有 `aria-label`。

#### 图标语义匹配
| ❌ 不匹配 | ✅ 匹配 |
|----------|---------|
| 搜索图标 + "筛选"文字 | 搜索图标 + "搜索"文字 |
| 齿轮图标 + "个人资料"文字 | 齿轮图标 + "设置"文字 |

**判断标准**:遮住文字,只看图标,用户能猜对含义吗?

#### 图标可访问性
- 图标按钮:必须有 `aria-label`
- 图标+文字:图标用 `aria-hidden="true"` 隐藏
- 纯图标链接:禁止使用
- 颜色对比度:图标颜色与背景 ≥ 3:1(WCAG 1.4.11)
- 触摸目标:可点击区域 ≥ 44×44px

### 5.7 内容准则

#### Don't add filler content
每个元素都必须 earn its place。空白是设计问题,用**构图**解决,不是靠内容填满。「One thousand no's for every yes」。

#### Ask before adding material
你觉得多加一段/一页/一个 section 会更好?先问用户。

#### Create a system up front
探索完 design context 后,先口头说出你要用的系统,让用户确认:
```markdown
我的设计系统:
- 色彩:#1A1A1A 主体 + #F0EEE6 背景 + #D97757 accent(来自你的品牌)
- 字型:Instrument Serif 做 display + Geist Sans 做 body
- 节奏:section title 用 full-bleed 彩色背景 + 白字;普通 section 用白背景
- 图像:hero 用 full-bleed 照片,feature section 用 placeholder 等你提供
- 最多用 2 种背景色,避免杂乱

确认这个方向我就开始做。
```

### 5.8 Scale 规范

| 媒介 | 正文最小 | 标题 | 说明 |
|------|---------|------|------|
| 幻灯片(1920×1080) | 24px(理想 28-36px) | 60-120px,Section title 80-160px,Hero 180-240px | 永远不要 <24px |
| 印刷文档 | 10pt(理想 11-12pt) | 18-36pt,Caption 8-9pt | — |
| Web 和移动端 | 14px(老年人友好 16px) | — | 移动端正文 16px(避免 iOS 自动缩放) |
| Hit target | 44×44px | — | 可点击元素最小尺寸 |
| 行高 | — | — | 1.5-1.7(中文 1.7-1.8) |
| 对比度(正文 vs 背景) | 4.5:1(WCAG AA) | — | 大字 3:1 |

### 5.9 CSS 神器

高级 CSS 特性是设计师的好朋友,大胆用:

```css
/* 排版 */
h1, h2, h3 { text-wrap: balance; }  /* 标题换行更自然 */
p { text-wrap: pretty; }  /* 正文避免寡孀和孤儿 */
p { text-spacing-trim: space-all; hanging-punctuation: first; }  /* 中文排版 */

/* Layout */
.layout { display: grid; grid-template-areas: "header header" "sidebar main" "footer footer"; }
.card { display: grid; grid-template-rows: subgrid; }  /* Subgrid 对齐卡片内容 */

/* 视觉效果 */
* { scrollbar-width: thin; scrollbar-color: var(--color-muted) transparent; }
.glass { backdrop-filter: blur(20px) saturate(150%); background: color-mix(in oklch, white 70%, transparent); }
@view-transition { navigation: auto; }

/* 交互 */
.card:has(img) { padding-top: 0; }  /* :has() 选择器 */
@container (min-width: 500px) { ... }  /* container queries */
.button:hover { background: color-mix(in oklch, var(--primary) 85%, black); }  /* color-mix */
```

### 5.10 决策速查:当你犹豫时

- 想加个渐变?→ 大概率不加
- 想加个 emoji?→ 不加
- 想给卡片加圆角+border-left accent?→ 不加,换其他方式
- 想用 SVG 画个 hero 插画?→ 不画,用 placeholder
- 想加一段 quote 装饰?→ 先问用户有没有真 quote
- 想加一排 icon features?→ 先问要不要 icon,可能不需要
- 用 Inter?→ 换一个更有特点的
- 用紫色渐变?→ 换一个有根据的配色
- 想写"赋能/生态/智慧"?→ 换成具体动词和具体场景
- 想写"了解更多"当 CTA?→ 换成告诉用户具体会得到什么
- 想编个数据装饰页面?→ 先问用户有没有真数据
- 想给每个标题配图标?→ 大概率不需要,iconography slop 的征兆
- 想混用两个图标库?→ 选一个,全文统一

**当你觉得"加一下会更好看"的时候——那通常是 AI slop 的征兆**。先做最简的版本,只在用户要求时加。

### 5.11 反 AI slop 速查表

| 类别 | 避免 | 采用 |
|------|------|------|
| 字体 | Inter/Roboto/Arial/系统字体 | 有特点的 display+body 配对 |
| 色彩 | 紫色渐变、凭空新颜色 | 品牌色 / oklch 定义的和谐色 |
| 容器 | 圆角+左 border accent | 诚实的边界/分隔 |
| 图像 | SVG 画人画物 | 真实素材或 placeholder |
| 图标 | 装饰性 icon+混搭图标库+Emoji 作图标 | 承载差异化信息的密度元素+统一图标库+真实 icon 库 |
| 填充 | 编造 stats/quotes 装饰 | 留白,或问用户要真内容 |
| 文案 | "赋能""生态""智慧"+"了解更多"泛泛 CTA | 具体动词+具体场景+具体行动描述的 CTA |
| 动画 | 散落的微交互 | 一次 well-orchestrated 的 page load |

### 5.12 品位锚点

没有 design system 时的品位基线。信念层论述 → `references/beliefs.md`(§8 品位锚点)

| 维度 | 首选 | 避免 |
|------|------|------|
| **字体** | 衬线 display(Newsreader/Source Serif/EB Garamond)+ `-apple-system` body | 全场 SF Pro 或 Inter——太像系统默认 |
| **色彩** | 一个有温度的底色 + **单个** accent 贯穿全场(rust 橙/墨绿/深红) | 多色聚类(除非数据真的有 ≥3 个分类维度) |
| **信息密度·克制型**(默认) | 少一层容器、少一个 border、少一个**装饰性** icon | 每条卡片都配无意义的 icon+tag+status dot |
| **信息密度·高密度型**(例外) | 当产品核心卖点是「智能/数据/上下文感知」时,每屏需**至少 3 处可见的产品差异化信息** | 只放一个按钮一个时钟——AI 的智能感没表达出来 |
| **细节签名** | 留一处「值得截图」的质感:极淡油画底纹/serif 斜体引语/全屏黑底录音波形 | 到处平均用力,结果处处平淡 |

---

## 6. DESIGN.md 9 段框架完整检查清单

> 审查设计产出时的结构化对比基线。当项目无设计系统时,用此框架作为审查参照;当项目有设计系统时,逐段对比标记偏离项。

### 6.1 色彩(Color)

**审查检查项**:
- [ ] 色彩数量是否受控?(主色 1+辅色 1+强调色 1+灰阶,通常不超过 3-4 种语义色)
- [ ] 是否通过 CSS 变量/design tokens 引用颜色,而非硬编码?
- [ ] 暗色模式是否有独立调色板(非简单反色)?
- [ ] 品牌色是否使用官方色值(非近似值)?
- [ ] 强调色是否用于真正的交互元素(链接/按钮/活跃状态),而非装饰?

**合规色板结构**:
```css
:root {
  --color-primary: oklch(0.55 0.18 25);
  --color-secondary: oklch(0.45 0.10 260);
  --color-accent: oklch(0.65 0.20 150);
  --color-surface: oklch(0.97 0.005 80);
  --color-on-surface: oklch(0.15 0.02 260);
  --color-muted: oklch(0.60 0.02 260);
  --color-border: oklch(0.88 0.01 80);
}
```

### 6.2 排版(Typography)

**审查检查项**:
- [ ] 字体家族是否 ≤ 2 种?(display+body,mono 不计入)
- [ ] 是否通过 CSS 变量引用字体,而非硬编码 font-family?
- [ ] 字号是否遵循排版阶梯(type scale),而非随意值?
- [ ] 行高是否在合理范围(正文 1.5-1.7,中文 1.7-1.8)?
- [ ] 标题与正文对比是否 ≥ 2.5 倍?
- [ ] 是否避免了 Inter/Roboto/Arial 作为 display 字体(除非品牌指定)?

**合规排版结构**:
```css
:root {
  --font-lausanne: 'Lausanne', ui-sans-serif, system-ui, -apple-system;
  --font-victor-serif: 'Victor Serif', ui-serif, Georgia;
  --font-black-tie: 'Black Tie', ui-monospace, SFMono-Regular, Menlo, Consolas;
  --text-12px: 12px; --text-14px: 14px; --text-16px: 16px; --text-18px: 18px;
  --text-20px: 20px; --text-24px: 24px; --text-32px: 32px; --text-36px: 36px; --text-48px: 48px;
  --leading-tight: 1; --leading-normal: 1.2;
  --font-weight-light: 300; --font-weight-regular: 400;
}
```

### 6.3 间距(Spacing)

**审查检查项**:
- [ ] 是否使用 8pt 网格系统?(允许 4pt 子网格)
- [ ] 间距值是否通过 CSS 变量引用,而非硬编码?
- [ ] 同类元素间距是否一致?
- [ ] 是否存在非标准间距值(非 4/8 倍数)?

**8pt 网格合规值**:4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96

**合规间距结构**:
```css
:root {
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px; --space-9: 96px;
}
```

### 6.4 布局(Layout)

**审查检查项**:
- [ ] 是否有统一的布局容器/网格系统?
- [ ] 响应式断点是否合理?
- [ ] 内容最大宽度是否受控?(正文 66 字符宽度,容器 ≤ 1200px)
- [ ] 对齐方式是否全局统一?
- [ ] 留白比例是否 ≥ 40%?

### 6.5 组件(Components)

**审查检查项**:
- [ ] 新功能是否优先使用设计系统组件?
- [ ] 是否存在"绕过"设计系统自己写样式的组件?
- [ ] 组件 API 是否一致?(props 命名、事件命名、状态管理)
- [ ] 组件是否有完整的交互状态?(default/hover/active/focus/disabled)

**合规组件清单**:
| 组件 | 设计系统组件 | 禁止的自定义实现 |
|------|-------------|-----------------|
| 按钮 | PrimaryButton/SecondaryButton/TextButton | 自定义 `<button>` 样式 |
| 输入框 | TextField/SearchField | 自定义 `<input>` 样式 |
| 卡片 | Card/ElevatedCard | 手写 div+shadow |
| 导航 | NavigationBar/TabBar | 自定义 nav 样式 |
| 弹窗 | Dialog/Modal/Alert | 自定义 overlay+居中 div |
| 列表项 | ListItem/TableViewCell | 手写 flex 容器 |
| 标签 | Tag/Badge/Chip | 自定义 span+圆角背景 |
| 图标 | Icon 组件+图标 token | 直接 `<img>` 或 SVG inline |

### 6.6 动效(Motion)

**审查检查项**:
- [ ] 动效是否有功能目的(引导注意力/反馈操作/过渡状态),而非纯装饰?
- [ ] 动效时长是否在合理范围?(微交互 100-200ms,页面过渡 300-500ms)
- [ ] 是否尊重 `prefers-reduced-motion`?
- [ ] 动效是否统一?(同一类交互使用相同的 easing 和时长)

### 6.7 语调与文案(Voice & Copywriting)

**审查检查项**:
- [ ] 文案语调是否与品牌定位一致?
- [ ] 同一产出内语调是否统一?
- [ ] 是否避免了 AI slop 词汇?(赋能/生态/智慧/颠覆/引领/一站式/全方位/深度融合)
- [ ] CTA 文案是否具体而非泛泛?
- [ ] 文案量是否与载体匹配?
- [ ] 标题是否可独立理解?正文是否可扫描?
- [ ] 中英文之间是否有空格?专有名词大小写是否正确?
- [ ] 是否避免了编造的 stats/quotes 装饰?

→ 文案 slop 黑名单详见 §5.5

### 6.8 品牌(Brand)

**审查检查项**:
- [ ] Logo 是否使用真实品牌文件(SVG/PNG),而非 CSS 手画/SVG 重画?
- [ ] 产品图是否使用真实产品图,而非 CSS 剪影/通用占位?
- [ ] 品牌色是否使用官方色值,而非近似值?
- [ ] 品牌字体是否与品牌规范一致?

### 6.9 反模式(Anti-patterns)

**审查检查项**:
- [ ] 是否避免了 AI slop 视觉特征?(紫渐变/Emoji 图标/圆角卡片+左 border accent/SVG 画人画物)
- [ ] 是否避免了过度对称?
- [ ] 是否避免了装饰大于内容?
- [ ] 是否避免了信息密度与载体不匹配?
- [ ] 是否避免了图标混搭?

→ 详细判断规则详见 §5

### 使用方式

**无设计系统时**:用此 9 段框架作为审查基线。在审查报告中注明:"该项目无设计系统,以下建议基于 DESIGN.md 9 段框架通用最佳实践。"

**有设计系统时**:将产出与项目设计系统逐段对比,标记偏离项,在审查报告中分"设计系统偏离"和"通用最佳实践违反"两类列出。

---

## 7. 硬编码值检测规则

### 7.1 颜色值检测

| 模式 | 正则 | 示例 |
|------|------|------|
| HEX | `#[0-9A-Fa-f]{3,8}`(非 CSS 变量上下文) | `color: #FF6B35` |
| RGB/RGBA | `rgba?\([^)]+\)`(非变量上下文) | `background: rgba(0,0,0,0.5)` |
| HSL/HSLA | `hsla?\([^)]+\)`(非变量上下文) | `color: hsl(210, 100%, 50%)` |

**合规**:`.button { background: var(--color-primary); }`
**不合规**:`.button { background: #FF6B35; }`

**Swift 检测**:`UIColor(red:green:blue:)` / `UIColor(hex:)` → 应使用 `DS.Colors.primary`

### 7.2 字体值检测

| 模式 | 说明 |
|------|------|
| `font-family:` 直接声明 | 应使用字体 token / CSS 变量 |
| `UIFont(name:size:)` 硬编码字体名 | 应使用设计系统字体扩展 |
| `font-size:` 非标准值 | 应使用排版阶梯(type scale) |

### 7.3 间距值检测

**8pt 网格合规值**:4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96

**不合规**:`margin: 13px`、`padding: 22px`、`gap: 24px`(应 `var(--space-5)`)
**Swift 不合规**:`constraint.constant = 13`(应 `DS.Spacing.md`)

---

## 8. 设计系统合规性检查

### 组件使用合规性

**核心规则**:新功能必须优先使用设计系统组件,而非自定义实现。

| 检查项 | 合规 | 不合规 |
|--------|------|--------|
| 按钮 | `PrimaryButton`/`SecondaryButton`/`TextButton` | 自定义 `<button>` 或 `UIButton` 样式 |
| 输入框 | `TextField`/`SearchField` | 自定义 `<input>` 样式 |
| 卡片 | `Card`/`ElevatedCard` | 手写 div+shadow+border-radius |
| 导航 | `NavigationBar`/`TabBar` | 自定义 nav 样式 |
| 弹窗 | `Dialog`/`Modal`/`Alert` | 自定义 overlay+居中 div |
| 列表项 | `ListItem`/`TableViewCell` | 手写 flex 容器 |
| 标签 | `Tag`/`Badge`/`Chip` | 自定义 span+圆角背景 |
| 图标 | `Icon` 组件+图标 token | 直接 `<img>` 或 SVG inline |

### 品牌资产协议合规性

| 检查项 | 合规 | 不合规 |
|--------|------|--------|
| Logo | `<img src="...">` 引用真实文件 | CSS 手画/SVG 重画 |
| 产品图 | `<img>` 引用真实产品图 | CSS 剪影/通用占位图 |
| 品牌色 | `var(--brand-primary)` | `#FF6B35` 硬编码 |
| 品牌字体 | `var(--font-display)` | `font-family: 'Inter'` 硬编码 |

---

## 9. 核心资产协议

> 审查涉及具体品牌的设计时,检查品牌资产是否被正确使用。这是设计质量从 40 分到 90 分的分水岭。

品牌的本质是「它被认出来」→ `references/beliefs.md`(§5 品牌的哲学)

### 常见违规模式

| 违规 | 问题 | 严重度 |
|---|---|---|
| 只抽色值+字体、不找 logo/产品图/UI | 品牌识别度缺失 | ⚠️致命 |
| 用 CSS 剪影/SVG 手画替代真实产品图 | 任何品牌都长一样,识别度归零 | ⚠️致命 |
| 找不到资产不告诉用户、硬做 | 产出 generic 设计 | ⚡重要 |
| 临场发明品牌色("接近但不是"的 hex) | 品牌一致性崩溃 | ⚡重要 |
| 产品截图里混入 demo 品牌色 | 品牌色污染 | 💡优化 |

### 素材质量门槛「5-10-2-8」原则

| 维度 | 标准 | 反模式 |
|---|---|---|
| **5 轮搜索** | 多渠道交叉搜,不是一轮抓前 2 个就停 | 第一页结果直接用 |
| **10 个候选** | 至少凑 10 个备选才开始筛 | 只抓 2 个,没得选 |
| **选 2 个好的** | 从 10 个里精选 2 个作为最终素材 | 全都用=视觉过载+品位稀释 |
| **每个 8/10 分以上** | 不够 8 分宁可不用 | 凑数 7 分素材 |

**Logo 例外**:有就必须用,不适用「5-10-2-8」。因为 logo 是识别度根基——就算 logo 本身只有 6 分,也比没有 logo 强 10 倍。

---

## 10. SwiftLint 规则完整配置

为 Swift 项目提供自定义 SwiftLint 规则,自动检测硬编码字体、间距、颜色值。

```yaml
# .swiftlint.yml
custom_rules:
  hardcoded_color_hex:
    name: "Hardcoded Color (Hex)"
    regex: '(?:UIColor|NSColor)\(hex:\s*"#[0-9A-Fa-f]{6}"'
    message: "使用 DS.Colors token 替代硬编码 HEX 颜色值"
    severity: warning
  hardcoded_color_rgb:
    name: "Hardcoded Color (RGB)"
    regex: '(?:UIColor|NSColor)\(\s*red:\s*[\d.]+'
    message: "使用 DS.Colors token 替代硬编码 RGB 颜色值"
    severity: warning
  hardcoded_color_literal:
    name: "Hardcoded Color Literal"
    regex: '#colorLiteral\('
    message: "使用 DS.Colors token 替代 color literal"
    severity: warning
  hardcoded_font:
    name: "Hardcoded Font"
    regex: 'UIFont\(\s*name:\s*"'
    message: "使用 DS.Typography token 替代硬编码字体名"
    severity: warning
  hardcoded_system_font:
    name: "Hardcoded System Font with Size"
    regex: 'UIFont\.systemFont\(ofSize:\s*\d+'
    message: "使用 DS.Typography token 替代硬编码系统字体大小"
    severity: warning
  hardcoded_spacing_constraint:
    name: "Hardcoded Spacing (Constraint)"
    regex: 'NSLayoutConstraint.*constant\s*=\s*\d+'
    message: "使用 DS.Spacing token 替代硬编码间距值"
    severity: warning
  non_standard_spacing:
    name: "Non-Standard Spacing Value"
    regex: '(?:spacing|padding|margin|inset).*?=\s*(?!(?:4|8|12|16|20|24|32|40|48|56|64|72|80|96)\b)\d+'
    message: "间距值应为 4pt 网格的倍数(4, 8, 12, 16, 24, 32, 48, 64...)"
    severity: warning
  custom_button_instead_of_design_system:
    name: "Custom Button Instead of Design System"
    regex: 'UIButton\(\s*type:\s*\.custom\)'
    message: "优先使用 DS.PrimaryButton / DS.SecondaryButton 替代自定义按钮"
    severity: warning
  hardcoded_sf_symbol:
    name: "Hardcoded SF Symbol"
    regex: 'UIImage\(systemName:\s*"'
    message: "使用 DS.Icons token 替代硬编码 SF Symbol 名称"
    severity: warning
  hardcoded_icon_size:
    name: "Hardcoded Icon Size"
    regex: '\.symbolConfiguration\(|\.configuration\(pointSize:\s*\d+'
    message: "使用 DS.IconSize token 替代硬编码图标尺寸"
    severity: warning
```

---

## 11. Design Token 架构完整代码

```swift
enum DS {
    enum Colors {
        static let primary = UIColor(hex: "#FF6B35")
        static let secondary = UIColor(hex: "#2D3436")
        static let accent = UIColor(hex: "#00B894")
        static let surface = UIColor(hex: "#FAFAFA")
        static let onSurface = UIColor(hex: "#1A1A1A")
    }
    enum Typography {
        static let heading1 = UIFont.systemFont(ofSize: 32, weight: .bold)
        static let heading2 = UIFont.systemFont(ofSize: 24, weight: .semibold)
        static let body = UIFont.systemFont(ofSize: 16, weight: .regular)
        static let caption = UIFont.systemFont(ofSize: 12, weight: .regular)
    }
    enum Spacing {
        static let xs: CGFloat = 4
        static let sm: CGFloat = 8
        static let md: CGFloat = 16
        static let lg: CGFloat = 24
        static let xl: CGFloat = 32
        static let xxl: CGFloat = 48
    }
    enum Icons {
        static let search = "magnifyingglass"
        static let settings = "gearshape"
        static let close = "xmark"
        static let add = "plus"
        static let delete = "trash"
        static let edit = "pencil"
        static let share = "square.and.arrow.up"
        static let download = "arrow.down.circle"
    }
    enum IconSize {
        static let xs: CGFloat = 16
        static let sm: CGFloat = 20
        static let md: CGFloat = 24
        static let lg: CGFloat = 32
    }
}
```

---

## 12. 视觉层级与节奏标准

**层级引导视线**,回答:用户应该先看什么、第二看什么、第三看什么?
**节奏让设计感觉有意图**,是重复和战略性变化的模式。

### 12.1 层级信号

| 信号 | 原则 |
|------|------|
| **尺寸** | 最大=最重要。H1(48px) > H2(32px) > body(16px)。相似尺寸(32/28/24)扁平化层级 |
| **色彩** | 粗/饱和=主要;柔和=辅助;浅=弱化。CTA 按钮用品牌色;"已有账号?"用中性色 |
| **字重** | 标题用粗体,正文用 regular。全粗=无重点;全 regular=无强调 |
| **位置** | 左上优先(左到右语言),中上第二,右下最后 |
| **密度** | 重要事物周围松散间距="注意这里";紧凑间距="辅助内容" |

**组合信号产生最强层级**:大+粗+品牌色+居中+松散="主要行动";小+浅+中性+紧凑="细则"。

### 12.2 节奏

**用间距 scale**:4px 或 8px 的倍数。随机 margin(`7px`、`18px 22px`)感觉混乱,scale-based 感觉有意图。

**重复模式,然后战略性打破**:三个相同布局的 section,然后第四个打破模式(不同背景、更大 CTA)创造有重点的节奏。四个相同 section 是单调。四个不同 section 是混乱。

**限制色彩节奏**:一个 deck 或页面用 1-2 种背景色。Section 背景可以交替或有目的地变化——但要遵循模式,不感觉随机。

**创作视角的层级构建方法** → `references/methods-create.md`(视觉层级与节奏的创作方法)

---

## 13. 排印系统标准

**1-2 字体家族最多**。一种 sans 做 body + 一种 serif 做 headline 可以。一种字体做所有也可以。三种以上感觉混乱。

**定义 type scale 并坚持**,永不挑任意字号:
```css
--text-xs: 12px; --text-sm: 14px; --text-base: 16px; --text-lg: 18px;
--text-xl: 20px; --text-2xl: 24px; --text-3xl: 30px; --text-4xl: 36px; --text-5xl: 48px;
```

**配对字体要有对比**。几何 sans+有机 serif。Light+bold。两个近乎相同的 sans-serif 是浪费配对。

**为正文选可读字体**。Sans-serif(system、Helvetica)或 serif(Georgia、Merriweather)。Cursive、script、重 display 字体只用于短标签——绝不用于段落。

**避免大段全大写**。阅读基于词形,全大写破坏词形。全大写只适合短标签和标题。

**用 `text-wrap: pretty`** 避免 body copy 的寡孀和孤儿。

### 各媒介 scale 规则
- **1920×1080 幻灯片**:body 不小于 24px,理想 32px+
- **印刷文档**:不小于 12pt
- **移动界面**:body 不小于 16px
- **交互 hit target**:不小于 44px×44px
- **桌面界面**:14-16px body 是标准

---

## 14. 色彩系统标准

**定义调色板并全局使用**。随用随发明颜色破坏品牌一致性。

完整调色板包括:
```css
/* Brand */
--primary: #...; --primary-dark: #...; --primary-light: #...; --accent: #...;
/* Semantic */
--success: #10B981; --warning: #F59E0B; --error: #DC2626; --info: #3B82F6;
/* Neutrals (10-step scale) */
--gray-50: #F9FAFB; --gray-100: #F3F4F6; /* ... */ --gray-900: #111827;
```

**微调白和黑**——off-white(`#FAFAFA`)和 near-black(`#1A1A1A`)。

**不要只靠颜色传达状态**。配图标、文字或位置——色盲用户(8% 男性)和灰度或高对比模式需要第二信号。

**避免困难配色**:红+绿(最常见色盲)、蓝+黄(相似亮度)、浅灰 on 白、彩色文字 on 彩色背景(相似亮度)。

---

## 15. 可访问性标准 WCAG

可访问性不是事后想法,是基础。**好的可访问性是好的设计**——它惠及键盘用户、残障人士、慢网络用户、强光下用户、旧设备用户。

### 15.1 对比度(WCAG)
- 正文(18px 以下):最低 **4.5:1**
- 大字(18px+ bold 或 24px+):最低 **3:1**
- UI 组件(按钮、图标):最低 **3:1**

### 15.2 语义 HTML
用对的元素:
- `<button>` 做按钮,绝不用 `<div onclick>`
- `<a>` 做链接
- `<label for="...">` 关联 `<input id="...">`
- `<nav>`、`<main>`、`<article>`、`<section>`、`<aside>` 做结构
- 正确的标题层级(`<h1>` → `<h2>` → `<h3>`——不跳级)

ARIA 是补丁——只在语义 HTML 无法表达角色时使用。

### 15.3 键盘导航
**一切必须键盘可达可操作**。Hover-only 交互失败。Modal 必须 Escape 关闭。Dropdown 必须 Enter/Space 打开,箭头导航。Tab 顺序必须合理。

**永远不要移除 focus ring**。`outline: none` 没有替代是最常见的可访问性失败之一。不喜欢默认就替换:
```css
button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

### 15.4 屏幕阅读器
- 每个有意义图片有 alt 文本。纯装饰图片用空 alt(`alt=""`)让屏幕阅读器跳过
- 每个表单输入有 label。Placeholder 不是 label——用户输入时它消失
- AIA 只在必要时使用

### 15.5 动效
尊重 `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
避免每秒闪烁 3 次以上的内容——可能触发光敏性癫痫。

### 15.6 表单设计
- 清晰具体的错误信息:"Email address is invalid"——不只是"Invalid"
- 错误关联到字段,不埋在别处
- 必填字段明确标记(用文字,不只颜色)
- 用 `type="email"`、`type="tel"`、`autocomplete` 属性获得更好的移动键盘和自动填充

**可访问性审查流程** → `references/methods-review.md`(可访问性检测)+ `skills/review/accessibility-audit/`

---

## 16. 交互状态完整性标准

**每个交互都要给反馈**。Hover、click、submit、load、succeed、fail——用户应该在每步看到并理解发生了什么。

### 16.1 状态

每个交互元素需要:
- **Default** — 静止
- **Hover** — 光标悬停时的视觉变化(色变、阴影、上浮)
- **Active / pressed** — 点击时的视觉变化
- **Focus** — 键盘用户的可见 ring
- **Disabled** — 明确禁用(低 opacity、`cursor: not-allowed`、无 hover 效果)

无 hover 状态的按钮感觉坏的。看起来启用但点击没反应的禁用按钮感觉坏的。

### 16.2 过渡

状态变化用平滑过渡——**0.2-0.3 秒**,ease 曲线:
```css
button {
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
```
快于 0.15s 感觉突兀。慢于 0.4s 感觉迟钝。无过渡感觉坏的。

### 16.3 表单反馈
- **校验状态** — 错误输入变色并显示关联到字段的信息
- **加载状态** — 按钮在 async 工作时禁用并显示 spinner 或"Loading…"
- **成功/错误确认** — 操作完成后的 toast 或 inline 信息;非关键信息 3-5s 自动消失

### 16.4 状态可见性
当前页面、tab、选中、过滤器必须视觉上区分。如果一切都一样,用户不知道他在哪或选了什么。

**交互状态审查流程** → `references/methods-review.md`(交互状态检测)+ `skills/review/interaction-states-pass/`

---

## 17. 简化与单一 CTA 标准

**一个屏幕有一个主要行动**。其他都是辅助。多个竞争 CTA 导致决策瘫痪,稀释每个行动。

✅ 一个粗 CTA,加上更小的次要链接。
❌ 五个同样大小不同颜色的按钮。

### 17.1 减少选项
- **导航**:最多 4-6 个顶级项。把深度移到 dropdown 或单独页面
- **表单**:只问现在需要的,不问可能想要的。多步胜过一面墙的字段
- **变体**:如果产品有 50 个 SKU,分组或用搜索/过滤——不要列全部 50
- **过滤器**:默认显示最常用的 4-5 个,其余藏在"More filters"后

### 17.2 隐藏次要选项
用 tabs、accordions 或"Show more"链接保持主要表面干净,同时内容可达。

### 17.3 5 秒测试
首次用户应在 5 秒内理解屏幕的主要行动。如果眼睛要找,层级是错的。

---

## 18. 系统思维与组件标准

**设计组件,不是页面**。页面是组件的排列。如果每个页面都重新设计按钮,你没有设计——你有一堆 one-off。

### 18.1 组件

定义并复用:
- **Button** — primary、secondary、ghost;尺寸;有无图标;loading 状态
- **Card** — 带图、带 footer、minimal
- **Input** — text、email、password、with error、with helper text
- **Header**、**footer**、**modal**、**toast**、**table row** 等

页面从组件组合:`Homepage = Header + Hero + FeatureCards + CTA + Footer`。改一次组件,每个页面都更新。

### 18.2 Design tokens

Tokens 是系统构建的原子单元:
- **Spacing** — `--space-xs` 到 `--space-2xl`
- **Color** — brand、semantic、neutrals
- **Type** — 字体家族、字号、字重、行高
- **Radii** — `--radius-sm`、`--radius-md`、`--radius-lg`
- **Shadow** — `--shadow-sm`、`--shadow-md`、`--shadow-lg`

用 tokens,不用任意值。`padding: var(--space-md)` 不 `padding: 17px`。

### 18.3 文档化模式

每个组件文档化:
- 用法(何时用、何时不用)
- 变体(primary/secondary/ghost)
- 状态(default、hover、active、disabled、loading)
- 可访问性说明(键盘支持、aria、对比度)
- Do's 和 don'ts

这是把 UI 变成设计系统的关键——其他人可以基于此构建,不用每次问你。

**组件提取方法** → `references/methods-create.md`(组件提取)+ `skills/create/component-extract/`

---

**版本**:v1.0 / **更新日期**:2026-07-07 / **来源**:融合 `aesthetics.md` + `design-system.md` + `design-system-prompt/system-prompt.md` ch7-13
