# 方法层·创作:我怎么把设计做出来?

> ⚠️ **INTERNAL · v5.0 起标 internal** · 不对外展示，仅供 agent 内部使用。
> 公开 reference：beliefs / standards / methods-review。详细策略见根 [SKILL.md §7](../../SKILL.md#7-三层边界) / [§9](../../SKILL.md#9-完整-reference-索引9-份)。
>
> 设计创作的工作流与方法。从「理解需求 → 获取上下文 → 计划 → 骨架先行 → 迭代 → 简要总结」六步工作流,到 wireframe / 原型 / 幻灯片 / 变体 / tweakable / token 提取 / 组件提取的具体方法。审查方法见 `methods-review.md`。

---

## 1. 创作工作流 6 步

每个有意义的创作请求都按这个顺序走:

1. **理解需求(Understand needs)**——对新工作或模糊请求,先问一轮澄清问题(合并为一轮,然后自主执行)。确认输出格式、保真度、变体数量、约束、涉及的 design system / UI kit / brand。详见 §2。
2. **获取设计上下文(Acquire design context)**——读 design system 全文、品牌指南、codebase、截图、UI kit——任何已有的东西。从零开始 mock 是最后手段。详见 `references/beliefs.md` §1。
3. **计划可见(Plan visibly)**——多步工作先写一个简短 todo,把假设和推理早点 surface 到文件里——像初级设计师给经理看思考过程。
4. **骨架先行,尽早展示(Build a skeleton, show it early)**——尽快把粗版本放到用户面前。从反馈迭代,而不是在私下完美化。
5. **迭代和验证(Iterate and verify)**——用工具检查设计是否渲染干净、行为正确。每次实质性的视觉变更后,委托 verifier subagent 做彻底验证——不只交付前才验。不要自己截图检查,会污染对话。
6. **简要总结(Summarize briefly)**——只说 caveats 和 next steps。不复述用户刚看你做的事。

**鼓励并发**:可以并发调用文件探索工具加快速度。

**默认沉默**:工具调用之间默认沉默。只有发现什么、改变方向、遇到阻碍时才写一句话——不要 narrate 常规动作("Now I'll…", "Let me check…")。思考应该写在文件里(第 3 步),不是 chat 里。

---

## 2. 创作前的提问协议(Discovery Questions)

> 对应 skill: `skills/define/discovery-questions/`

**问好问题是设计质量最大的杠杆**——坏设计来自缺失的上下文,不是缺失的技能。

### 2.1 何时问 / 何时跳过

**问**(满足任一):
- 工作是新的或模糊的
- 输出、受众、保真度不清晰
- 不知道哪个 design system / UI kit / brand 在起作用
- 变体数量未指定
- 任务留下多个非平凡的维度开放

**跳过**(满足任一):
- 用户给了你需要的一切
- 是对现有工作的小调整或后续
- scope、受众、约束都明确
- 任务是「复刻这个具体的东西」

**判断准则**:如果开放的问题会改变设计方向(受众、格式、品牌、scope),问;如果是你可以合理自己定的小选择(一个 label、一个默认值、两个等价方案),自己决定、做、在总结里 note,不问。

### 2.2 5 项必问(Always-Ask)

无论什么创作请求,以下 5 项必须确认(用户没说就问):

1. **起点(Starting point)**——非协商:有没有 UI kit、design system、codebase、品牌指南、截图可以匹配?没有的话,我得从零承诺一个美学——确认这是 OK 的。
2. **变体(Variations)**——整体设计要几个?在哪些轴上(视觉/布局/交互/文案/语调)?特定元素的变体("几个 hero?")?
3. **新颖度(Novelty)**——by-the-book、novel/creative、还是混合?
4. **可调项(Tweaks)**——最终设计里哪些应该可实时调整(色彩、文案、布局、组件)?
5. **聚焦轴(Focus axis)**——流程、文案、还是视觉——探索精力应该放哪?

### 2.3 问题特定的问题

根据设计类型,加 3-6 个问题:

- **幻灯片(Deck)**:受众和知识水平;时间预算/幻灯片数;语调;speaker notes;已有源材料?
- **落地页(Landing page)**:期望的用户行动;主 persona;欣赏或拒绝的参考;mobile-first 还是 desktop-first?
- **原型(Prototype)**:流程和屏幕;hi-fi 还是 mid-fi;设备框;目标状态;样例数据?
- **品牌/美学(Brand/aesthetic)**:三个形容词;欣赏的设计(具体是什么);off-limits;行业上下文?

### 2.4 提问原则

- **先读已附带的资源再问**——问"你有品牌指南吗?"而用户刚附了一份,是最快丢失用户信任的方式。
- **问题数量按模糊度调整**——真正开放的 brief 可能要 ~10 个问题;半指定的可能只要 3-4 个。永远不要为了凑数而问——一个答案不会改变你做什么的问题是噪音。
- **一次问完,合并成一轮**——不要跨多轮逐个问。问完就自主执行,不要再回来问小决定。
- **后续发现早期答案错了**——比如用户说"不要 novel"但反馈想要更大胆的选择——surface 这个矛盾并重新提问,而不是带着错误假设继续。

### 2.5 反模式

- ❌ 跳过提问直接开做——产出会 miss 掉 brief
- ❌ 什么都问——上限 10-15 个;打包到一个 form,不要跨轮逐个问
- ❌ 问能自己推导的——附带的品牌指南已经有主色,就别问主色
- ❌ 为了保险而问——一个问题是否正当,取决于其答案对设计的影响,不是你的不确定度

---

## 3. 无品牌时的美学方向承诺(Frontend Aesthetic Direction)

> 对应 skill: `skills/define/frontend-aesthetic-direction/`

在没有现成 brand 或 design system 时,在做 hi-fi 之前**承诺一个美学方向**。从零开始 mock hi-fi 而不承诺美学,是通向 AI-template 产出的最快路径。先选方向,再在方向内设计。

### 3.1 Phase 1:确认真的没有 existing context

Double-check:没有品牌指南、没有要匹配的现有 app/产品、没有要 mimic 的参考站点、codebase 里没有 partial design system。有任何存在就**停下来用它**——美学方向是给真正的 greenfield 用的。用户有 brand 但忘了附带,先要过来再继续。

### 3.2 Phase 2:发现意图

问用户(或确认已声明的):**三个形容词**描述期望的感觉;**受众**;**行业上下文**;**欣赏的参考设计**(具体欣赏什么——字体、间距、色彩、语调、密度?);**off-limits** 的美学或 trope。

用户不确定时,提议 **4 个不同的视觉方向**,每个具体到——背景 hex / accent hex / display + body 字体——加一句 rationale 绑定到 brief,让用户选。4 个方向不能共享 palette family:对 warm-cream 的 4 种 take 是一个方向,不是 4 个。至少一个要 deliberately off-distribution。

### 3.3 Phase 3:承诺系统——具体化

模糊的美学陈述("modern and clean")产出 generic 设计。在每个轴上承诺:

#### 排印(Typography)

挑**具体**字体——headline、body(通常是同一家族)、需要的话 mono——含字重和 type scale。1-2 家族上限。

避免被滥用的默认——Inter、Roboto、Arial、bare system stack、silent serif-display 默认(Fraunces、Playfair Display、Georgia-as-display)。带意图地选:humanist sans(Söhne、Suisse)、modern serif(Tiempos、GT Sectra)、editorial classic(Tiempos Headline、Canela)、typewriter mono(JetBrains Mono、IBM Plex Mono)、geometric sans(Söhne Buch、Visby),取决于 mood。付费 foundry 可能买不起时,命名最近的免费替代(如 Söhne 生产用,Albert Sans / Geist 免费)。

#### 色彩(Color)

挑一个 tone——warm(cream、gold、terracotta)、cool(gray、slate、ice、blue)、或 neutral(concrete、charcoal、off-white)。

**warm-editorial 组合(cream 背景 + serif display + terracotta/amber accent)是当前默认模型的 look**。仅在 brief 真的是 editorial、hospitality、portfolio 时选它——并且明确在方向 block 里说清楚。如果方向无理由地 drift 到那里,重新选。

然后挑:一个主品牌色(含 light/dark 变体)、至多一个 accent、语义色(success/warning/error/info)、在选定 tone 上的 5-10 级 neutral scale。从零构建时用 `oklch()` 求和谐(`--brand-primary: oklch(55% 0.18 250)`)。微妙地调 tone 白和黑——纯 `#FFFFFF`/`#000000` 太 harsh;匹配 tone(如 `#FAFAFA` / `#1A1A1A`)。

#### 密度(Density)

挑一个 spacing scale(4px 或 8px base)和一个密度——tight(compact dashboard、dense data UI)、normal(典型产品 UI)、或 loose(editorial、marketing、premium、慷慨 whitespace)。密度是被感受到的,不只是被看到的。

#### 圆角和阴影(Border radius and shadow)

Sharp(0-2px——utilitarian、brutalist、editorial)、soft(4-8px——典型现代产品)、或 pill/fully-rounded(playful、friendly、consumer)。阴影同理:sharp / soft / none。**一套 elevation 系统,不混**。

#### 组件风格(Component style)

Filled、ghost、outlined、或 elevated。挑一个默认,次要风格用于层级。

#### 图像和图标(Imagery and iconography)

真实摄影(Unsplash、brand、stock)、专业插画、established 图标集(Feather、Material、Phosphor、Heroicons)、或资产不可用时诚实的 placeholder。避免手画 SVG 插画。

#### 动效(Motion)

Quiet(只在状态变化时 transition,200ms ease)、expressive(entrance 动画、scroll-driven reveal)、或 playful(spring、hover 微交互)。**承诺一个模式——混合动效显得无意图**。

### 3.4 Phase 4:把方向写进文件

把方向写到文件里——源码顶部一个注释 block AND 渲染输出里一个可见的"design system summary",像初级设计师展示思考:

```css
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

### 3.5 Phase 5:应用、测试、保持一致

用方向构建一个小 surface(hero、card、button group),早点给用户看。问:"这读起来像 [三个形容词] 吗?"——不像,或用户在某个轴上 push back,先修再扩大。**小尺度失败的方向,扩大只会更差,不会更好**。

每个后续设计引用方向的 token,不引用新的 inline 值。新设计需要未定义的值时,**先加到方向里**,再用。方向成熟时,extract 成 tokens 文件(见 §10)。

**总结**:三个形容词、每个轴的承诺、用户在扩大前应审查的轴、用方向构建的第一个 surface。

---

## 4. 低保真探索:wireframe 方法

> 对应 skill: `skills/create/wireframe/`

产出低保真线框图或故事板,在承诺 hi-fi 之前探索流程、布局或想法。用户说"探索选项"、"sketch 一下"、"看几个方向",或问题足够开放以至于 hi-fi 工作会浪费时,用这个。**wireframe 是一次性的**——它们的价值是选项的广度,不是某一个的保真度。

### 4.1 Phase 1:理解目标

确认:**在探索什么**(一个屏幕、一个流程、一个导航模式、一个信息层级、一个交互模型);**用户目标**在这个屏幕/流程上;**约束**(mobile 或 desktop、existing context 或 greenfield、不可协商的元素);**变体数量**(最少 3,上限 5-6 每轮);**变化轴**(布局?密度?步骤数?CTA 位置?)。

用户只说"wireframe 一个注册流程"时,提议 2-3 个轴(如"单页表单 vs 多步 wizard vs progressive disclosure")并问要探索哪个。

### 4.2 Phase 2:建立 wireframe 约定

坚持 wireframe 视觉语言,让用户读作 wireframe,不是 broken hi-fi:

- **纯灰度**——黑、白、2-3 个灰;无品牌色
- **系统无衬线字体**——无字体个性;用户不应在这个阶段形成字体意见
- **Box 表示内容区**,带 label("headline"、"image"、"feature card")
- **条纹 placeholder 表示图像**,带 monospace label(`product shot 1200×800`)——绝不用真实图像;它们会抢焦点
- **Ipsum 或骨架文案**——这个阶段没有最终文案
- **欢迎注释**——关键决定上的编号 callout

这是唯一可以接受手画感 SVG(矩形、线条、简单图标)的上下文——一切都在同样的低保真度。

### 4.3 Phase 3:画变体

产出**至少 3** 个在已定轴上不同的变体。单屏变体并排放在 design canvas 上;流程变体作为小故事板(每个 3-5 屏)。

变化跨布局(居中/分屏/网格)、信息密度、流程结构(单页/多步/progressive disclosure)、CTA 位置、或导航模式。**从最 by-the-book 到最 novel 排序**——用户在安全选项旁边放风险选项时,更容易挑出有意思的。

**画之前写下每个变体的区分结构**。不指定的话,变体会 converge 到近乎相同的布局——让差异 deliberate,至少一个 genuinely off-distribution。

### 4.4 Phase 4:注释

每个变体加 2-4 个注释点,放在变体旁边(不是单独 doc 里),让用户同时读变体和 rationale:

```
- Variation 1 (单列 wizard):简单、聚焦,但慢
- Variation 2 (单页表单):最快路径,第一印象重
- Variation 3 (progressive disclosure):平衡两者,JS 状态更多
```

### 4.5 Phase 5:捕获决定并交付

用户选了方向后,捕获:选中的变体(或 hybrid)、什么吸引了他们、他们明确拒绝了什么、浮现的新约束。这成为 hi-fi 后续的 brief。

然后建议 `skills/create/make-a-prototype/`(hi-fi 交互)、`skills/create/make-a-deck/`(wireframe 是为演示做的)、或再一轮低保真。**不要在 wireframe 本身上投入 hi-fi 打磨**——它们已完成使命。

**总结**:产出的变体、变化轴、推荐的下一步、浮现的开放问题。

---

## 5. 输出格式选择(Output Principles)

不同设计任务选对格式:

- **纯视觉探索**(色彩、字体、单个元素的静态布局)→ side-by-side canvas,带 label 的 cell
- **交互、流程、多选项情况** → 完整 hi-fi 可点击原型,选项作为 toggle 或 tweak 暴露
- **幻灯片演示** → 固定尺寸 deck shell,带 letterboxing
- **动画或 motion design** → 基于时间线的引擎,带 scrubber 和 play/pause

### 5.1 给多个变体

3+ 选项跨不同维度。混合 by-the-book 和 novel/creative。从 basic 开始,越来越 adventurous。变化跨:

- 视觉处理(色彩、字体、密度、阴影)
- 交互模型(单页 vs 多步、modal vs inline)
- 布局(居中、asymmetric、full-bleed、grid-heavy)
- 语调(playful、formal、minimal、expressive)

目标不是挑"完美"选项——是给用户足够的原子变体让他们 mix-and-match。

### 5.2 一个文件,多个变体

**优先单一文档 + toggle/tweak**,不要散落 v1.html / v2.html / v3.html。用户应该能 live 切换选项,不是点击不同文件。

用户请求一个大设计里某个元素的多个版本时,用 tweak 允许 cycling。即使用户没问,默认加 1-2 个 tweak 控制——surface 有意思的可能性。

### 5.3 用对的尺度

应用 §8.2 的 per-medium 最小值(幻灯片、印刷、mobile、desktop)。这些是交付要求,不是建议。

---

## 6. 变体生成方法(Generate Variations)

> 对应 skill: `skills/create/generate-variations/`

产出 3+ 个 screen、组件或流程的 distinct 设计变体,让用户 mix-and-match 最强的部分。用户要 options、alternatives、"different takes"、"show me a few" 时用这个。**变体是好设计最便宜的路径**——一个设计是一次 bet;三个让用户拒绝不想要的、组合想要的。

### 6.1 Phase 1:建立基线

确认:**在变化什么**(屏幕、组件、流程、视觉处理——scope 决定几个变体有用);**existing design context**(变体应扎根在 UI kit / design system 里,除非明确要求 break free);**数量**(默认 3;5-6 是健康上限);**轴偏好**(视觉、交互、布局、还是文案/语调——用户想探索的重心在哪?)。

### 6.2 Phase 2:挑轴

挑 2-4 个维度变化:视觉处理(色彩 tone、密度、阴影、圆角、字重);布局(居中 vs asymmetric、单列 vs 多列、full-bleed vs inset);交互模型(单页 vs 多步、modal vs inline);信息层级;语调;组件风格。**写下每个变体在哪个轴上 flex**——让对比对用户 legible。

### 6.3 Phase 3:带意图地建——从 basic 到 bold

从最 by-the-book 排到最 novel:

1. **By the book**——匹配现有 pattern 和 convention——安全选项
2. **Refined**——同结构,推 1-2 个维度——更大胆的字、更自信的布局、更表达的色彩——通常是用户的实际选择
3. **Novel**——genuinely 不同的 take——非传统布局、强视觉隐喻、大胆美学——拉伸对话,surface 用户不知道自己有的偏好
4. **4-6(如请求)**——spectrum 上的 hybrid,或不同轴上的 wildcard

**覆盖两端**。全 safe 浪费用户时间;全 wild 忽略 brief。

### 6.4 Phase 4:实质性变化,不是 cosmetic

变体应在布局、层级、什么是 primary、type system、密度、交互方法、或文案策略上不同——不是只按钮色、accent shade、或阴影透明度。两个太近时,drop 一个换更实质的替代。**用户应能用一句话 articulate 任意两个变体的差异**。

**建之前具体指定每个变体**——distinct palette family、distinct type pairing、distinct layout skeleton,逐个写下。Variety 必须被设计,不能被 hoped for:不指定的话,变体会 drift 向一个默认 look(通常是 warm-editorial house style)。Novel 变体上,deliberately 选 off-distribution 且有意思的。

### 6.5 Phase 5:单文件呈现

静态变体 side-by-side 用 design canvas;变体共享结构、在少数轴上不同时用 **tweak**(`skills/create/make-tweakable/`)。流程变体每个作为 canvas 内一个小故事板。**不要产出 v1.html / v2.html / v3.html**——一个文件,所有变体可见或可 toggle。

### 6.6 Phase 6:注释并推荐

每个变体用 1-2 句话 caption("Variation 2 — Refined. 同结构,表达 headline 字体,更暖的 palette")。Caption 是思考工具:写不出清晰的,变体就不够 distinct。

结尾给明确推荐——用户决定,但设计师要给意见("Variation 2 是我的 pick——1 的安全性加更多视觉自信")。**不要 hedge 说所有选项一样好**——不是的。

然后建议下一步:选中方向的精修轮、不同轴的另一轮变体、`skills/create/make-a-prototype/` 走交互、或 `skills/review/polish-pass/` 准备 ship。

---

## 7. 原型制作方法(Make a Prototype)

> 对应 skill: `skills/create/make-a-prototype/`

构建工作的交互原型——可点击、可导航、带真实状态和反馈。用户要 prototype、mockup、demo、"make it interactive" 时用。**原型要交互**——静态截图用 `<a>` 串起来不算;要点是用真实点击、输入、验证、成功、失败来测试流程。

### 7.1 Phase 1:发现

构建前确认:**流程**(屏幕、入口、目标状态——列成 list);**保真度**(hi-fi 或 mid-fi);**设备框**(desktop browser、iOS、Android、macOS window);**变体**(一个流程或几个对比);**品牌/design system**(永远确认——没有就先调 `skills/define/frontend-aesthetic-direction/`);**样例数据**(真实感内容,不要 Lorem ipsum)。

### 7.2 Phase 2:映射屏幕和状态

构建前写下流程,作为注释 block 放到文件里让用户看到计划:

```
Screens:
  1. Welcome — "Get started" CTA → 2
  2. Email entry — validate format → 3 on valid, inline error on invalid
  3. Profile — name, photo upload → 4
  4. Success — "You're in" → 1 (loop demo)

State:
  - currentScreen: 1
  - email: ""
  - emailError: null
```

### 7.3 Phase 3:逐屏构建

每个屏:mount 到 DOM(display toggling 或单页内 React state);hi-fi 视觉匹配 design system——真实组件,不是通用 box;plausible 真实内容(真实名字、产品文案、数字);每屏一个 primary CTA,次要动作更小更弱化。

用对的设备框(ios_frame、android_frame、macos_window、browser_window)。框固定;原型在框内。

### 7.4 Phase 4:连交互

每个交互都连,不只 happy path:

- **导航**——primary CTA 前进,back 后退,state 跨屏持久
- **表单验证**——空 submit → inline error;格式错 → 字段绑定的具体 error;有效 → 继续
- **加载状态**——async 动作显示 loading indicator 并 disable 按钮防双 submit。用 `setTimeout` fake 延迟——不要因为工作是 fake 就跳过 loading 状态;它是被测的一部分
- **成功和错误反馈**——toast、inline 确认、或页面 transition;error 清除并绑定到字段或动作
- **状态变化**——toggle、select、filter 都立即更新 UI

### 7.5 Phase 5:子状态和持久化

让有意义的子状态 reactive:selection state、filter/sort state、modal/dropdown open-state(focus 进入 modal,Escape 关闭)、form 值和 error。

通过 `localStorage` 持久化重要的东西:当前屏、form 草稿、tweak 值(见 §9)。迭代中刷新是最常见的用户动作之一——不持久的状态让原型感觉 broken。

### 7.6 Phase 6:验证

在 preview 里走完整流程:每个 CTA 都有去处、每个 form 都验证、每个 error 都清晰可恢复、每个 async 动作都有反馈、每个状态变化都可见、键盘导航工作(Tab 穿越、Enter 提交、Escape 关闭)、focus 可见。**验证不了的行为,在总结里说,不要声称成功**。

### 7.7 Phase 7:变体(如请求)

变体作为 tweak 暴露在 floating panel(见 §9)、side-by-side 在 canvas 上、或 in-prototype toggle。**不要散落 v1.html / v2.html / v3.html 在项目里——一个文件,多个 variant**。

**简要总结**:哪些流程工作、什么是 fake 的(如"submit 调 setTimeout fake")、什么开放给用户决定。

---

## 8. 幻灯片制作方法(Make a Deck)

> 对应 skill: `skills/create/make-a-deck/`

把幻灯片演示构建为单个 HTML 文件,固定尺寸(通常 1920×1080, 16:9)letterbox 到任意 viewport。用户要 deck、presentation、slides、pitch 时用。不要手撸缩放——用 deck shell starter。

### 8.1 Phase 1:发现

构建前确认:**受众**(决定语调和密度);**格式**(长宽比——默认 16:9——和幻灯片数:10 分钟 deck ~10 张,30 分钟 ~20-25);**语调**(formal corporate、casual internal、marketing-bold、technical);**源内容**(画之前读任何 PRD 或已有材料);**speaker notes**(默认关,明确请求才开);**品牌/design system**(永远确认——没有就先调 `skills/define/frontend-aesthetic-direction/`)。

用户给了足够上下文(如"用这个 PRD 做 5 张工程 all-hands deck")时,跳过提问轮。

### 8.2 Phase 2:规划布局系统

构建任何幻灯片之前,承诺一个布局系统并在文件顶部注释 block 里 vocalize。典型 deck 有 4-6 种布局类型:cover/title、section header(full-bleed 色或图)、content slide(headline + chart/image/list)、quote/pull-out、comparison/two-column、closing/CTA。每个:背景处理、headline 尺寸和位置、body 内容区、footer(页码、brand mark、none)。

**deck 限 1-2 背景色**;section header 可破例到第三,不能再多。

### 8.3 Phase 3:构建 deck shell

用 deck-shell starter——处理缩放/letterboxing、键盘和 tap 导航、幻灯片计数器、localStorage 持久化、print-to-PDF、`data-om-validate` tagging。每张幻灯片是 `<deck-stage>` 的直接子 `<section>`。

每张给 `data-screen-label` 让用户按名字引用(`<section data-screen-label="01 Title">`)。**label 是 1-indexed**,匹配用户看到的计数器。

### 8.4 Phase 4:逐张构建

按顺序建,1-2 张后给用户看文件——不要私下完美化 15 张再 reveal。每张:

- **字号**——1920×1080 canvas 上 body 永不低于 24px,理想 32px+;headline 60-96px+
- **层级**——每张一个 primary message;supporting 元素更小更弱
- **图像**——来自 design system,或诚实 placeholder(条纹背景、monospace label)。不要手画 SVG filler
- **无 filler 幻灯片**——"Why choose us?" / "About this deck" 花用户注意力——删掉
- **图表**——展示重要的;删不支持本张观点的列和数据点

用 design system 的 spacing 和 color token——不要 inline 新值。

### 8.5 Phase 5:speaker notes(仅请求时)

请求时:在 head 加 `<script type="application/json" id="speaker-notes">` 数组,每张一条,写成完整对话脚本(不是 bullet outline)。有 notes 的幻灯片可承载更少 on-screen 文字。Shell 自动渲染它们。

### 8.6 Phase 6:验证和交付

在 preview 里从头到尾走 deck:多 viewport 尺寸下缩放、计数器正确递增、键盘导航(箭头、space)工作、无溢出幻灯片边界、字号满足 24px+ 最小、对比度过 WCAG(调 `skills/review/accessibility-audit/` 做彻底检查)。

turn 结束交付时,surface 最终 HTML 文件并调 verifier subagent 做彻底 pass。**简要总结**:caveats(如还需真实图像)、next steps(如要替换的真实图表)、用户应 sign off 的决定。

---

## 9. 实时调整面板方法(Make Tweakable)

> 对应 skill: `skills/create/make-tweakable/`

给完成的设计加一个 floating 控制面板,让用户实时调整选中方面——色彩、字体、间距、文案、布局变体、feature flag。用户要"play with options"、"see different versions"、对比视觉选择时用。**一个文件,多个 variant**——不要 v1.html / v2.html / v3.html 散落。

### 9.1 Phase 1:识别应 tweakable 的东西

和用户确认——或提议并检查——暴露哪些方面:color(primary、accent、background tone)、typography(family、base size、scale ratio)、density(tight / normal / loose)、layout variant、component variant(filled/ghost button、card 处理)、copy(headline、subhead、CTA 文案)、feature flag(show/hide section)。

**保持 tweak surface 小**——3-8 个控制。少数有意义的轴去探索,不是 Figma clone。用户没要 tweak 但设计有明显变化轴时,默认加 1-2 个 surface 有意思的可能性。

### 9.2 Phase 2:设计 tweak 面板

面板在原型内,floating(通常右下),半透明带 subtle border,标题 **"Tweaks"** 匹配 toolbar toggle。每个值类型用对的控件:color picker 选色;dropdown 或 button group 选字体和变体;slider 带合理 min/max 选数字;toggle 选 boolean;text input 选文案。控制保持紧凑——窄的堆叠列胜过 sprawling 的面板。

### 9.3 Phase 3:连实时更新

视觉 token 用 CSS custom property,引用它们的一切都更新:

```js
document.documentElement.style.setProperty('--tweak-primary', newColor);
```

非 CSS 值(文案、布局变体、feature flag)用 JS state 配 re-render 或 DOM 操作。

### 9.4 Phase 4:实现 host 协议

host 环境为 tweak 面板暴露一个 toolbar toggle。**顺序重要**——在 listener 存在前 announce availability,host 的 activate 消息落空,toggle 静默无效:

1. **先在 `window` 上注册 `message` listener:**
   - `{type: '__activate_edit_mode'}` → 显示 Tweaks 面板
   - `{type: '__deactivate_edit_mode'}` → 隐藏它
2. **再 announce availability:**
   ```js
   window.parent.postMessage({type: '__edit_mode_available'}, '*')
   ```
3. **值变化时,持久化**——post 回(部分更新 OK——只 merge 包含的 key):
   ```js
   window.parent.postMessage({type: '__edit_mode_set_keys', edits: {primaryColor: '#FF6600'}}, '*')
   ```

### 9.5 Phase 5:磁盘上持久化默认值

把 tweakable 默认值包在注释 marker 里让 host 重写:

```js
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#D97757",
  "fontSize": 16,
  "dark": false
}/*EDITMODE-END*/;
```

marker 之间的 block **必须是合法 JSON**(双引号 key 和 string),且 root HTML 文件内 inline `<script>` 里恰好一个这样的 block。host 把 edit merge 进它并写回文件,变化跨 reload 存活。

### 9.6 Phase 6:关闭时隐藏控制

Tweaks toggle 关时,面板完全隐藏——不是 dim,不是 collapse 到角落。**不可协商**:任何可见的 edit-mode chrome 都让设计看起来未完成。

### 9.7 Phase 7:验证和总结

preview 里:通过 toolbar toggle 面板开关;改每个 tweak 确认 live 更新;reload 确认值持久;检查面板关时设计读起来像完成的产出。

**总结**:暴露的 tweak 和值类型、默认值、考虑过但排除的 tweak(及原因)、是否覆盖用户的探索轴。

---

## 10. 设计 token 提取方法(Design System Extract)

> 对应 skill: `skills/create/design-system-extract/`

从品牌参考、codebase 或截图提取 design token(色彩、排印、间距、圆角、阴影),emit 一个结构化 tokens 文件。开始应匹配已有视觉语言的设计工作时用。token 存在后,后续设计引用它们——保持系统一致,不用再问用户值。

### 10.1 Phase 1:识别来源

用户可能提供 codebase(读 theme 文件:`theme.ts`、`tokens.css`、`_variables.scss`、`tailwind.config.js`、design system 源)、live 站点或截图、品牌指南(PDF、Figma、doc)、或现有 UI kit 项目。未指定时问——invented token 违背目的。

### 10.2 Phase 2:按类别提取

从源捕获具体值——**永远不猜**。

#### 色彩(Colors)

- **品牌 primary 和 accent**(含 dark/light 变体,如有定义)
- **语义**——success、warning、error、info(加它们的 light 背景,如有)
- **Neutral scale**——通常 9-11 级,从近白到近黑,tone 一致(warm / cool / neutral)
- **Surface**——background、foreground、card、overlay、border

每个:hex(或 oklch)值、在源里的名字、文档化的用法。**标记不一致为 finding 给用户**——多个略不同的蓝、不同 tone 的 neutral——不要静默 merge;不一致本身就是信息。

#### 排印(Typography)

- **家族**——sans、serif、mono,含完整 fallback stack
- **字号**——实际在用的 scale,不是通用的
- **字重**——只实际加载的
- **行高**——至少 tight(~1.1)给 headline、normal(~1.5)给 body、loose(~1.7)给长文
- **字间距**——通常只在 all-caps label 上重要
- **命名 text style**("Heading 1"、"Body Large"、"Caption"),如源定义了

#### 间距(Spacing)

实际在用的 scale(常见 base:4px 或 8px,通常到 64-128px)。源有独立 scale(inset / inline / block / between-components)时全捕获。

#### 圆角和阴影

圆角值(通常 3-5 个 distinct:`0 / 4 / 8 / 12 / 9999`)和 elevation scale 含完整 CSS 值(offset、blur、spread、color、opacity)。

#### 其他 token(如有)

Z-index scale、animation duration 和 easing、breakpoint、container width。

### 10.3 Phase 3:emit tokens 文件

写 `tokens.css`——或匹配源的格式和命名约定(`tokens.ts` 带类型 export、`tokens.json`、Tailwind config extension)。按类别 group,名字清晰:

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

### 10.4 Phase 4:文档化 finding

总结:**用的源**;**提取的类别**;**gap**——源未定义的 token 集(这些是用户要做的决定;不要静默填);**不一致**——近似重复值或 off-scale outlier 值得 consolidate;**推荐下一步**——通常和用户一起 review 文件,然后在后续设计里用。

---

## 11. 组件提取方法(Component Extract)

> 对应 skill: `skills/create/component-extract/`

走一个设计,识别里面隐藏的可复用组件;emit 一个组件清单,用户可转成组件库或 design system。用户有完成的页面/流程,想"做成系统"、"建组件库"、或交付结构化片段时用。

**页面是组件的排列**。提取它们把一堆 one-off 变成可维护的东西。

### 11.1 Phase 1:识别 surface

确定走什么——单个设计文件、多页流程、或整个项目。读所有相关文件,建立使用中视觉词汇的 mental model。

### 11.2 Phase 2:走设计并清单化

逐 section,对每个视觉元素问:

1. **这个确切 pattern 出现超过一次吗?**
2. **它合理地可能出现在别处吗?**(card 风格、form input、header 即使现在只在一处也可能重复)
3. **它有变体吗?**(Button:primary/secondary/ghost。Card:带/不带图)
4. **它有状态吗?**(Hover、active、disabled、focus、loading)

任一 yes → 组件候选。按标准类别 group finding:

- **Foundational**——color、spacing、type、radius、shadow、motion token(见 §10)
- **Atoms**——button、input、checkbox/radio/toggle、select、tag/chip/badge、avatar、icon(尺寸 + 在用集)、link
- **Molecules**——form field(label + input + helper + error)、card、toast/alert、modal、dropdown menu、tooltip、pagination
- **Organisms**——header/nav、footer、sidebar、tab group、table、form、hero、feature grid、empty state
- **Templates**——landing、detail、list/index、empty-state page

### 11.3 Phase 3:每个组件,文档化

- **名字**——短、常规(如 `Button`、`FormField`)
- **目的**——一句话说何时用
- **变体**和**尺寸**
- **状态**——default、hover、active、focus、disabled、loading(适用的)
- **用到的 token**——引用哪些 color、spacing、type token
- **组合**——由什么其他组件建(如 `Card` 用 `Button`)
- **可访问性 note**——键盘支持、ARIA、对比度
- **Do / Don't**——至少各一(如"不要连续堆两个 primary button")

### 11.4 Phase 4:识别 gap

作为交付一部分标记——这些是把设计变成真正系统需要的工作:

- **不一致**——三个略不同的 button 风格,本应一个服务;推荐 canonical 版本
- **缺失状态**——hover 没 focus、没 disabled 状态
- **缺失变体**——如设计里有 delete 动作但没有 destructive button
- **Off-scale 值**——spacing 或尺寸超出已建 token scale;snap 它们

### 11.5 Phase 5:emit 和交付

把清单写到文件(如 `component-inventory.md`),每个组件一节,结构如上——一个用户可交给开发者的 doc。可选渲染一个"组件库"页面展示每个组件的变体和状态(design canvas 适合网格)。

然后建议下一步:`skills/create/design-system-extract/` 提取 token(如还没做)、把库建成真实代码、对组件跑 `skills/review/polish-pass/`、或对库加 `skills/create/make-tweakable/`。**总结**:按类别清单化的组件、标记的不一致和 gap、输出文件路径、推荐下一步。

---

## 12. 媒体特性:HTML/CSS/SVG(Respecting the Medium)

HTML、CSS、JS、SVG 很强大。**不要试图在代码里 recreate Figma**。拥抱 web 最擅长的事。

### 12.1 用 CSS 擅长的

- **Grid** 给复杂布局(`display: grid` 配 `grid-template-columns`)
- **Flexbox** 给更简单布局(对齐、行内 spacing)
- **Custom property** 给 theming 和 token
- **Transition** 给状态变化
- **`text-wrap: pretty`** 给排印
- **`oklch()`** 给色彩和谐
- **`@media (prefers-reduced-motion)`** 给可访问性
- **`@media (prefers-color-scheme: dark)`** 给 theming
- **Container query** 给组件级响应式

### 12.2 用 SVG 给图标和简单图形

可缩放、CSS 可着色、可访问。不要用光栅图给图标。

### 12.3 真实交互,不是静态 mockup

交互原型要真交互。点击 → 导航。提交 → 验证 → 成功/失败。用真实状态,不是截图汤。

### 12.4 固定尺寸内容自缩放

幻灯片和视频有固定长宽比(通常 16:9, 1920×1080)。必须通过 JS 缩放 letterbox 到任意 viewport,让 deck 在 laptop 或 projector 上可用。不要锁到一个屏幕尺寸。

### 12.5 持久化重要的状态

视频播放位置、deck 幻灯片 index、form 状态、tweak 值——都应跨 reload 存活。用 `localStorage`。迭代设计中刷新是最常见的用户动作之一。

### 12.6 规范 HTML

显式闭合标签。双引号属性。非 void 元素不自闭合。干净 markup 可直接编辑;messy markup 强制全部重写。

### 12.7 CSS、HTML、JS、SVG 很强——surprise 用户

用户常不知道 medium 能做什么。展示给他们:用 `oklch()` 插值的动画渐变、用 `animation-timeline` 的 scroll-driven 动画、view transition、container query、复杂 grid 布局、SVG mask。web 比大多数设计所表现的更 capable。

---

## 13. 用户理解(Understanding Users)

**为用户设计,不为自己设计**。一个让你开心但让受众困惑的设计是失败的设计。

### 13.1 假设前先问

新工作,确认:

- **受众是谁?**(工程师?高管?首次用户?现有 power user?)
- **主要目标是什么?**(转化、inform、娱乐、instruct、decide?)
- **他们会在什么上下文读?**(通勤手机?会议大屏?墙上印刷?)
- **他们已经知道什么?**(领域专家 vs 新手——同内容,不同框架)

### 13.2 为一个 persona 设计,不是"所有人"

试图取悦所有人产出取悦没人的设计。挑 primary persona,为他们设计。其他受众是次要的。

### 13.3 测试假设

用户对受众想要什么有假设时,gentle surface 选项测试那些假设。一轮 wireframe 加一轮 hi-fi 在不同 bet 上,比四轮 hi-fi 在同一 bet 上更有用。

---

## 14. 创作协作与交付(Collaboration and Delivery)

### 14.1 尽早、频繁展示工作

有 skeleton 就 surface 文件。用户早点抓到误解——便宜时修——而不是你打磨完一个错方向之后。

### 14.2 简短总结

完成时,只总结**caveats 和 next steps**。不复述用户刚看你做的事。不列每个变化。不对未验证的东西声称成功。

✅ "存为 `Hero v2.html`。Logo placeholder 还需真实资产;tweak 面板暴露 headline 文案。"

❌ "我创建了一个新文件,加了 hero section,加了 headline,加了 CTA button,style 了背景……"

### 14.3 委托验证

用 verifier subagent 做彻底检查(截图、布局、JS probing)。每次实质性视觉变更后 spawn 它——委托便宜;未验证的 render 不便宜。不要自己截图验证自己工作——会污染对话。信任 verifier 抓问题。

### 14.4 诚实的进度报告

验证不了某个 UI 行为(没浏览器、没测试数据、够不到的外部依赖),说出来。不要对未验证工作声称成功。

---

## 附:典型创作流程链

skill 可以链式调用。典型 greenfield 流程:

```
discovery-questions → frontend-aesthetic-direction → wireframe → make-a-prototype → polish-pass
```

或品牌感知流程:

```
design-system-extract → generate-variations → make-tweakable → polish-pass
```

完整 deck 流程:

```
discovery-questions → frontend-aesthetic-direction(无 brand 时)→ make-a-deck → accessibility-audit → polish-pass
```

组件库构建流程:

```
component-extract → design-system-extract → polish-pass → make-tweakable
```

**触发词速查**:创作类请求→"原型/prototype"、"幻灯片/deck/slides"、"线框/wireframe/sketch"、"变体/variations/options"、"tweakable/可调"、"探索布局/explore layout"、"设计研究/research"、"头脑风暴/brainstorm"、"改进设计/improve"、"polish/润色"。
