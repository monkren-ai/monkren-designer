# 方法层·审查:我怎么把设计审好?

> 设计审查的工作流与方法。从「审查前发现 → 理解对象 → 页面遍历 → 提取上下文 → 品牌资产 → 参考搜索 → 执行审查 → 输出报告 → 自检迭代」工作流,到 5 个专项审查 skill(可访问性 / 反 slop / 层级节奏 / 交互状态 / polish 编排)的具体流程。创作方法见 `methods-create.md`。

---

## 1. 审查工作流 9 步

你是设计审查员。用户提交设计产出,你负责审查并输出结构化报告。按这个流程走,审查质量稳定可复现。

### 1.0 事实验证执行流程

> 当审查涉及具体产品/品牌/技术时,审查前必须执行事实验证。信念层论述 → `references/beliefs.md` §0(事实验证先于假设)

**硬流程(审查前执行,优先于审查动作)**:
1. `WebSearch` 产品名 + 最新时间词("2026 latest"、"launch date"、"release"、"specs")
2. 读 1-3 条权威结果,确认:**存在性 / 发布状态 / 最新版本号 / 关键规格**
3. 把事实写进审查上下文,不靠记忆
4. 搜不到或结果模糊 → 问用户,而不是自行假设

**禁止句式(看到自己要说这些时,立即停下去搜)**:
- ❌ "我记得 X 还没发布"
- ❌ "X 目前是 vN 版本"(未经搜索的断言)
- ❌ "X 这个产品可能不存在"
- ❌ "据我所知 X 的规格是..."
- ✅ "我 `WebSearch` 一下 X 最新状态"
- ✅ "搜到的权威来源说 X 是 ..."

### 1.1 Step 0:审查前发现

> 审查前必须锁定上下文,避免方向性误解。这一步是"问清楚再动手"。

**触发命令识别**——首先识别用户触发的命令类型,决定审查深度(详见 §2):

| 命令 | 触发词 | 审查深度 | 报告格式 |
|------|--------|---------|---------|
| 简单审查 | 「简单审查」「快速审查」「quick review」「帮我快速看看」 | 5 维度 + 硬编码检测 | 快速报告 |
| 深度审查 | 「深度审查」「全面审查」「deep review」「完整审查」 | 全部维度 + 全部检测 | 完整报告 |
| 全流程审查 | 「全流程审查」「遍历审查」「全页面审查」「审查整个项目」 | 深度审查 + 页面遍历 | 完整报告(含页面遍历摘要) |
| 硬编码检测 | 「检测硬编码」「硬编码检测」「hardcode check」 | 仅硬编码值检测 | 快速报告 |
| 合规检查 | 「合规检查」「设计系统合规」「compliance check」 | 仅设计系统合规性 | 快速报告 |
| 设计建议 | 「设计建议」「设计方向」「如何改进」「suggestion」 | 设计方向顾问 | 设计建议报告 |
| SwiftLint规则 | 「SwiftLint」「生成规则」「swiftlint rules」 | 仅 SwiftLint 规则生成 | 快速报告 |

**命令匹配规则**:
- 用户明确指定命令 → 按对应命令执行
- 用户描述模糊(如「帮我看看」「审一下」)→ 默认执行**简单审查**
- 用户提到「全部」「整个项目」「所有页面」→ 自动升级为**全流程审查**
- 用户提到「详细」「深入」「彻底」→ 自动升级为**深度审查**
- 用户同时指定多个命令 → 按最深命令执行

**结构化问卷**——确认以下 4 项:

| 确认项 | 选项 | 必要性 |
|--------|------|--------|
| 输入格式 | 截图 / HTML 文件 / 代码 / Figma 链接 / 设计稿 | 必须 |
| 设计类型 | web 页面 / App UI / 幻灯片 / 信息图 / 落地页 / 其他 | 必须 |
| 审查范围 | 整体 / 局部 / 单页 / 全流程 | 必须 |
| 审查侧重点 | 视觉 / 交互 / 代码合规 / 品牌一致性 / 全面 | 可选(默认全面) |

**怎么确认**:
- 用户描述清晰 → 直接确认,开工
- 用户描述模糊(如"帮我看看这个")→ **先问清楚再动手,不基于假设下结论**
- 用户给了截图但没说范围 → 默认整体审查,但告知用户

**禁止行为**:
- ❌ 用户说"帮我审一下"就直接开审——先确认审什么
- ❌ 用户描述模糊时自行假设审查范围
- ❌ 跳过确认直接进入执行

### 1.2 Step 1:理解审查对象

收到审查请求后,先搞清楚审的是什么。

**必须确认**:
- **输入格式**:截图?HTML 文件?代码?Figma 链接?
- **设计类型**:web 页面 / App UI / 幻灯片 / 信息图 / 落地页 / 其他
- **审查范围**:整体还是局部?单页还是全流程?

**怎么确认**:
- 用户提供截图 → 直接审
- 用户提供代码/HTML → 先读代码提取信息,再审
- 用户提供 Figma 链接 → 让用户截图或导出
- 用户的描述模糊 → 问清楚再动手,不要猜

### 1.3 Step 1.5:页面遍历(全流程审查时执行)

> 当触发命令为「全流程审查」或审查范围覆盖整个项目时,必须执行页面遍历。详见 §3。

### 1.4 Step 2:提取设计上下文

审查不能凭空判断,必须有参照系。这一步是找到参照系。

**按优先级查找**:

1. **项目设计系统**:有没有 `design-tokens`、`theme`、`styles` 目录?有没有组件库?
2. **品牌规范**:有没有品牌指南文档?色彩规范?字体规范?
3. **现有代码库**:能不能读到源码?提取已有的颜色变量、字体定义、间距常量

**怎么提取**:
- 读项目目录结构,找设计相关文件
- 读 CSS/SCSS 变量定义,提取 `--color-*`、`--font-*`、`--spacing-*`
- 读组件代码,看用了哪些设计系统组件(如 `PrimaryButton`、`SecondaryButton`)
- 如果项目有 `tailwind.config` 或 `theme.js`,读配置

**没有设计系统时**:
- 用通用设计原则作为基线(8pt 网格、3 色原则、2 字体原则等)
- 在报告中注明"该项目无设计系统,以下建议基于通用最佳实践"

### 1.5 Step 3:品牌资产提取(涉及品牌时)

> 审查涉及具体品牌的设计时,必须执行品牌资产提取,而非凭记忆猜测。完整流程 → `references/standards.md` §7(品牌资产协议)。

**触发条件**:
- 审查对象涉及具体品牌/公司/产品
- 用户提到品牌名或品牌设计

**5 步提取流程**:
1. **定位来源**:品牌官网 / 品牌指南 / 项目代码库 / 社交媒体
2. **下载/读取**:Logo 文件、品牌色规范、产品图、UI 截图、字体规范
3. **提取色值**:`grep` 代码库 hex 值、读品牌指南、从官网 CSS 提取 `:root` 变量
4. **编写 brand-spec**:结构化摘要(色彩体系/字体体系/Logo/质量评级)
5. **用户确认**:展示摘要,标注来源和可信度,请求确认

**提取失败时**:
- 明确告知用户:"未能提取到品牌资产"
- 不凭记忆猜测品牌色值
- 请求用户提供品牌指南/Logo/官方色值
- 在报告中标注"品牌资产缺失"

**跳过条件**:
- 审查对象不涉及具体品牌 → 直接进入 Step 4
- 用户明确说"不需要品牌审查" → 跳过

### 1.6 Step 3.5:参考搜索(条件性)

> 审查时搜索真实产品截图作为视觉佐证。此步骤为可选增强——MCP 不可用时跳过,不影响审查完整性。完整搜索规则、降级策略和冲突处理 → `references/integration.md`

**触发条件**:Lazyweb MCP 可用(`lazyweb_health` 返回成功)

**执行要点**:
1. MCP 健康检查(5 秒超时)→ 失败则跳过
2. 至少 3 次不同角度搜索(按屏幕类型/按竞品公司/按设计模式)
3. visionDescription 质量门控验证相关性
4. 最多下载 15 张截图
5. 截图与哲学判断冲突时哲学判断优先

**禁止行为**:
- ❌ MCP 不可用时阻塞审查流程
- ❌ 引用未经 visionDescription 验证的截图
- ❌ 截图模式与哲学判断冲突时以截图为准

### 1.7 Step 4:执行审查

核心环节。按以下检查项逐项过(详见 §6 专项检测流程):

| 检测项 | 标准出处 |
|--------|---------|
| 5 维度评审 | `references/standards.md` §1 |
| 硬编码值检测 | `references/standards.md` §6 |
| 设计系统合规性 | `references/standards.md` §7 |
| 品牌资产协议 | `references/standards.md` §7 |
| 反 AI slop 检测 | `references/standards.md` §3 + §6.4 |
| Artifact 结构检查 | `references/standards.md` §6 |
| 可访问性检查 | `references/standards.md` §11 + §6.1 |
| 文案审查 | `references/standards.md` §5 |
| 图标审查 | `references/standards.md` §5 |
| 用户体验审查 | `references/perspectives.md` |
| 用户使用流程审查 | `references/perspectives.md` |
| 用户核心功能使用旅程审查 | `references/perspectives.md` |
| UI 用户界面设计审查 | `references/perspectives.md` |
| 功能展示合理性审查 | `references/perspectives.md` |

**不同类型的侧重**:
- 落地页/官网 → 功能性、视觉层级优先
- App UI → 功能性、细节执行优先
- 幻灯片 → 视觉层级、功能性优先
- 信息图 → 功能性、视觉层级优先(准确优先于美观)

### 1.8 Step 5:输出报告

用三层递进结构输出审查报告。根据审查场景选择报告格式(完整报告 / 快速报告 / 设计建议报告)。完整规范 → `references/execution.md`

**完整报告三层结构**:
1. **结论层**(1 分钟看懂):总体评分 + 评级 + 雷达图 + 1 句话结论 + P0 问题数 + 关键 Quick Win
2. **诊断层**(5 分钟理解问题):5 维度评分表(仅评分+证据段落)+ 专项检测总览表格
3. **行动层**(按需深入修复):Quick Wins + Fix 清单(含预估工作量+依赖关系)+ Keep + 专项检测详情

**快速报告**:结论层 + 行动层(省略诊断层)

**设计建议报告**:当前状态评估 + 3 个方向建议 + 优先级排序

### 1.9 Step 6:自检迭代

> 审查报告本身也需要审查。输出前执行自检,确保报告质量。详见 §8。

---

## 2. 7 种触发命令体系

> 完整命令表见 §1.1 Step 0。这里说明各命令的执行路径。

**触发命令速查**:

| 命令 | 执行路径 |
|------|---------|
| 简单审查 | Step 0 → 1 → 2 → 4(仅 4.1+4.2)→ 5 → 6 → 快速报告 |
| 深度审查 | Step 0 → 1 → 2 → 3 → 3.5 → 4(全部)→ 5 → 5.5 → 6 → 完整报告 |
| 全流程审查 | Step 0 → 1 → 1.5(页面遍历)→ 2 → 3 → 3.5 → 4(全部×每页)→ 5 → 5.5 → 6 → 完整报告(含页面遍历摘要) |
| 硬编码检测 | Step 0 → 1 → 2 → 4(仅 4.2)→ 5 → 6 → 快速报告 |
| 合规检查 | Step 0 → 1 → 2 → 4(仅 4.3+4.4)→ 5 → 6 → 快速报告 |
| 设计建议 | Step 0 → 1 → 2 → 设计方向顾问流程 → 5 → 6 → 设计建议报告 |
| SwiftLint规则 | Step 0 → 1 → 2 → SwiftLint 规则生成 → 5 → 6 → 快速报告 |

**设计方向顾问规则**(设计建议命令触发时执行):完整 12 维度项目画像 + 8 字段输出 + 5 铁律 + 5 类触发阶段 + 哲学基因重组 + Demo 生成指引 → `references/philosophy-library.md`(40 哲学库 + DNA + 项目画像矩阵)

---

## 3. 页面遍历审查(全流程审查时执行)

> 当触发命令为「全流程审查」或审查范围覆盖整个项目时,必须执行页面遍历,确保审查覆盖全部页面。

**触发条件**(满足任一):
- 触发命令 = 全流程审查
- 审查范围 = 全流程 / 整个项目
- 审查对象为多页面项目(App 多屏幕、Web 多页面、PPT 多幻灯片)
- 用户提供了项目代码库(非单文件)

### 3.1 页面发现策略(按项目类型选择)

| 项目类型 | 发现方法 | 关键文件/模式 |
|---------|---------|-------------|
| Web 应用 | 路由文件 + 页面组件 | `router.ts`/`routes.ts`、`pages/`/`views/`/`app/` 目录、`next.config`/`nuxt.config` |
| App UI(Swift) | Storyboard/XIB + SwiftUI View | `*.storyboard`/`*.xib`、`*View.swift`/`*Screen.swift`、`NavigationView`/`TabView` |
| App UI(Kotlin) | Activity/Fragment + Composable | `*Activity.kt`/`*Fragment.kt`、`*Screen.kt`/`*Page.kt`、NavGraph |
| PPT/Keynote | 幻灯片数量 | 文件页数 / 截图数量 |
| 多页 HTML | 文件结构 | `*.html` 文件列表、`<a href>` 内链 |

### 3.2 遍历执行流程

1. **页面清单生成**:根据项目类型使用对应发现策略,生成完整页面清单
2. **页面分类**:将页面按功能分组(核心流程页 / 辅助功能页 / 设置页 / 空状态页等)
3. **优先级排序**:核心流程页 > 辅助功能页 > 设置页 > 空状态页
4. **逐页审查**:按优先级对每个页面执行 Step 4(执行审查),记录每页的审查结果
5. **跨页一致性检查**:审查不同页面间的一致性
6. **页面遍历摘要**:在报告中输出页面遍历摘要表

### 3.3 跨页一致性检查清单

- [ ] 相同功能在不同页面的交互方式是否一致?
- [ ] 导航模式是否全局统一(Tab Bar / Side Nav / Breadcrumb)?
- [ ] 间距系统是否跨页一致(同一组件在不同页面的 padding/margin 相同)?
- [ ] 色彩体系是否跨页一致(同一语义色在不同页面使用相同 token)?
- [ ] 字体层级是否跨页一致(同一级别标题在不同页面使用相同字号/字重)?
- [ ] 组件使用是否跨页一致(同类按钮在不同页面使用相同设计系统组件)?
- [ ] 空状态/加载状态/错误状态是否各页面均有覆盖?

### 3.4 页面遍历摘要表格式

| 页面 | 路由/文件 | 评分 | P0 | P1 | P2 | 硬编码 | 关键问题 |
|------|----------|------|----|----|-----|--------|---------|
| 首页 | `/` 或 `HomeView.swift` | 7.2 | 0 | 2 | 3 | 4 | 间距不统一 |
| 设置 | `/settings` 或 `SettingsView.swift` | 6.8 | 1 | 1 | 2 | 2 | 硬编码颜色 |
| ... | ... | ... | ... | ... | ... | ... | ... |
| **汇总** | — | **X.X** | **N** | **N** | **N** | **N** | — |

**跳过条件**:
- 审查对象为单页面/单组件/单截图 → 不执行页面遍历
- 用户明确指定只审查某个页面 → 不执行页面遍历
- 项目为单页应用(SPA)且只有一个视图 → 不执行页面遍历

---

## 4. 多视角审查调度

> 用户体验/使用流程/功能旅程/UI 界面/功能展示 5 个视角的审查标准 → `references/perspectives.md`

10 视角清单(完整内容见 `perspectives.md`):
1. 用户体验(认知负荷/情感设计/心智模型/信息架构/一致性体验)
2. 用户使用流程(任务路径/导航/引导/转化漏斗/异常流程)
3. 用户核心功能使用旅程(功能发现/首次体验/学习曲线/习惯养成/高阶使用)
4. UI 用户界面设计(组件质量/布局系统/响应式/UI 状态/设计系统合规)
5. 功能展示合理性(优先级/分组/命名/价值传达/可发现性)
6-10. 见 `references/perspectives.md`

**调度规则**:
- 简单审查 → 跳过视角审查
- 深度审查 → 执行全部 5 个核心视角
- 全流程审查 → 每页执行 5 个核心视角 + 跨页一致性检查

---

## 5. 平台专项审查调度

> Web/iOS/Android/macOS/跨平台/PPT 6 个平台的专项审查规则 → `references/platforms.md`

**调度规则**:
- 审查对象的平台类型明确 → 执行该平台专项审查
- 审查对象为多平台 → 每个平台各执行一次
- 平台未指定 → 通过代码/截图推断,推断不出来时问用户

---

## 6. 专项检测流程

> 各专项检测的标准见 `references/standards.md`,这里只描述审查执行流程。

### 6.1 可访问性检测流程(Accessibility Audit)

> 对应 skill: `skills/review/accessibility-audit/` | 标准: `references/standards.md` §11

**Phase 1:识别要审的 surface**——审用户刚编辑或问到的 HTML 文件;否则最近修改的设计文件;不清楚就问。读全文,note 框架、期望级别(默认 WCAG AA)、用户声明的约束。

**Phase 2:并行启动 4 个审查 agent**——用 `${AGENT_TOOL_NAME}` 在单条消息里并发启动 4 个 agent,每个拿完整文件内容。**显式指令每个 agent**:报告找到的每个问题,包括边界和低严重度的,带置信度和严重度估计。覆盖是 agent 的工作;过滤在 Phase 3 聚合时做。

#### Agent 1:对比度和色彩

1. **文本对比度**——正常文本(18px 以下)需 4.5:1;大文本(18px+ bold 或 24px+)需 3:1;UI 组件(按钮、图标、focus ring)需 3:1。计算能解析的每个色对的实际比率;每个失败对标记比率和所需最小值
2. **仅色彩信号**——标记任何仅靠色彩传达的状态——无图标的绿/红、无下划线的链接、无 legend/label 的图表
3. **困难组合**——红+绿(最常见色盲)、相似亮度下的蓝+黄、白上浅灰、相似亮度彩色背景上的彩色文字
4. **白和黑**——标记纯 `#FFFFFF` 上 `#000000`;微妙调 tone(`#FAFAFA` / `#1A1A1A`)更佳。风格建议,非 WCAG

#### Agent 2:语义 HTML 和结构

1. **标题层级**——恰好一个 `<h1>`,无跳级;标题描述内容,不是视觉尺寸
2. **对角色用对元素**——`<button>` 不是 `<div onclick>`;`<a href>` 不是 styled `<div>`;`<label for>` 绑定 input;`<nav>`/`<main>`/`<article>`/`<section>`/`<aside>` landmark
3. **每张有意义图的 alt text**——装饰图 `alt=""`;有意义图描述传达什么(`alt="Wireless headphones, side view"` 不是 `alt="product"`)
4. **表单 label**——每个 input 有关联的 `<label>`(或 `aria-label`)。仅 placeholder 不是 label
5. **ARIA 只在语义 HTML 不行时用**——标记 `<div>` 上 `role="button"` 本可以是 `<button>`

#### Agent 3:键盘导航和 focus

1. **键盘可达**——所有可点击的都 Tab 可达——hover-only 菜单、mouse-only dropdown、键盘不可达 modal 都失败
2. **逻辑 tab 顺序**——跟随阅读顺序;标记 `tabindex` 大于 0 的
3. **交互模式**——Modal Escape 关闭;dropdown Enter/Space 打开并箭头导航;form 字段 Enter 提交
4. **可见 focus ring**——标记无可见替代(对比度 3:1)的 `outline: none`。优先 `:focus-visible` 而非 `:focus`
5. **Skip link**——推荐"Skip to main content"给有大量重复导航的页面

#### Agent 4:动效、表单和杂项

1. **`prefers-reduced-motion` 被尊重**——超过几百 ms 的动画需 `@media (prefers-reduced-motion: reduce)` block 缩短或移除
2. **无闪烁**超过每秒 3 次(光敏癫痫风险);标记并要求暂停控制
3. **表单 error** 具体("Email address is invalid" 不是 "Invalid"),视觉和 `aria-describedby` 绑定字段
4. **必填字段**用文本和/或图标加 `required` 属性标记,不只靠色彩
5. **Input type 和 autocomplete**——`type="email"`、`type="tel"`、`autocomplete` 属性给 autofill 和移动键盘
6. **Hit target** 触摸面至少 44×44px

**Phase 3:聚合和修复**——等 4 个 agent 完成。聚合 finding 到单一去重列表,直接修每个问题。边界情况(如对比度 4.4:1)也应用修复——可访问性是地板,不是天花板。明确假阳性或 out-of-scope(如 agent 标记了第三方 embed 你改不了),note 并跳过。

**总结**:按类别(contrast / semantic / keyboard / motion-forms)找到的问题、修复的问题、留给用户的。

### 6.2 反 AI slop 检测流程(AI Slop Check)

> 对应 skill: `skills/review/ai-slop-check/` | 标准: `references/standards.md` §3

**Phase 1:识别 surface**——审用户刚编辑或问到的 HTML/CSS 文件;否则本 session 修改的文件;不清楚就问。读文件并 skim 引用的 CSS、token、组件文件,以便解析实际值。

**Phase 2:单 pass 审查**——单 pass 应用每条规则——这些 pattern 够明显,并行 dispatch 是 overkill。报告每个检测,包括不确定或低严重度的,带置信度和严重度估计。覆盖是这阶段的工作;过滤在 Phase 3 或 `polish-pass` 聚合时做。

**9 类检测**(每类完整默认 + 检测模式见 `references/standards.md` §3):

1. **渐变**——默认 flat 色或微妙 on-tone 两 stop;检测彩虹/3+ 色渐变、saturated purple-to-pink 等 trendy blend
2. **Emoji**——默认无(除非品牌用或功能性);检测 headline/button/list 前缀的 emoji、重复 filler、无意义 bullet
3. **卡片**——默认 subtle shadow/薄 border/背景分离;检测 `border-radius: 12px` + `border-left: 4px solid` 作为默认 card style
4. **图像**——默认真实摄影/专业插画/诚实 placeholder;检测手画 SVG 插画人/场景/概念、AI-style 角色艺术
5. **字体**——默认匹配品牌 tone 或 medium;检测 bare Inter/Roboto/Arial/Fraunces/bare system stack 作为 silent 默认
6. **色彩(白和黑)**——默认调 tone 的白和黑;检测纯 `#FFFFFF` 上 `#000000`
7. **色彩值(追溯 token)**——默认每个色追溯到 design token/brand variable/`oklch()` palette;检测无法追溯的色、5 种略不同的蓝
8. **间距**——默认 spacing token(4px 或 8px 倍数);检测 off-scale 值(`padding: 7px 15px`、`gap: 13px`)
9. **editorial-warm house style**——默认为 brief 选的方向;检测无品牌理由的 cream/warm off-white 背景 + serif display silent 默认 + italic word-accents + terracotta/amber accent 组合,尤其在 dashboard/dev tool/fintech/healthcare/enterprise surface 上

**Phase 3:修复和总结**——直接应用修复。多个选项都合理时(如哪个非 Inter 字体),挑最可辩护的默认并 note 让用户覆盖。**总结**:按类别找到的 trope、应用的修复、给用户的开放问题。

### 6.3 视觉层级和节奏检测流程(Hierarchy & Rhythm Review)

> 对应 skill: `skills/review/hierarchy-rhythm-review/` | 标准: `references/standards.md` §8

**Phase 1:识别 surface**——审用户刚编辑或问到的 HTML/CSS 文件;否则最近修改的设计文件;不清楚就问。读文件和引用的 style,note medium(slide/page/mobile/dashboard)——规则按上下文不同。

**Phase 2:并行启动 2 个审查 agent**——用 `${AGENT_TOOL_NAME}` 在单条消息里并发启动两个 agent。**显式指令两个 agent**:报告找到的每个问题,包括不确定和低严重度的,带置信度和严重度估计。

#### Agent 1:层级审查

对每个屏幕、幻灯片或主要 section:

1. **Primary / secondary / tertiary**——什么应被第一、第二、第三看?说不出来,层级就坏了
2. **尺寸**——标题明显大于 body;primary CTA 大于次要动作。标记相似内容在非常不同尺寸(不一致)和不同重要内容在相似尺寸(扁平)
3. **色彩**——primary 动作在 saturated 品牌色,次要 neutral,弱化 light gray。标记全同色(无信号)和不重要元素最亮(错信号)
4. **字重**——headline bold,body regular,caption light。标记全 bold 和全 regular
5. **位置**——眼睛从左上开始(LTR 下);最重要内容在 prime real estate。标记 primary 元素埋在右下
6. **密度**——松 spacing 信号"注意",紧信号"supporting"。标记重要内容挤而 filler 呼吸——那是反的
7. **5 秒测试**——首次用户应在 5 秒内知道看什么、做什么

#### Agent 2:节奏审查

对整个文档:

1. **Spacing scale**——所有 padding/margin/gap 值 snap 到一致 scale(4px 或 8px 倍数)。列出隐式使用的 scale,标记 outlier(`padding: 7px`、`gap: 13px`)
2. **Type scale**——标记任意尺寸(`17px`、`23px` 在 16/20/24 设计里)
3. **重复**——grid 里的 card、list item、feature block 共享 padding、gap、尺寸、结构。标记微妙不同的近似重复——要么相同要么 deliberately 不同,中间不行
4. **战略性变化**——长页或 deck 偶尔打破 pattern(背景切换、更宽 section、居中 CTA)。标记完全统一(单调)和每 section 都不同(混乱)
5. **Palette 纪律**——3-5 色加 tint/shade。标记 8+ distinct 色,或不同地方略不同的蓝/灰
6. **Section 结构**——section 视觉可区分(背景变化、divider、padding 切换)但一致。标记无分隔和太多分隔风格
7. **对齐**——标记离网格几像素的元素——不一致 margin 而非故意 offset

**Phase 3:聚合和修复**——等两个 agent,聚合 finding,直接修:
- 随机 spacing/字号 → snap 到文件 scale(缺失就定义一个——4px 或 8px 倍数)
- 扁平层级 → 引入对比(更大 headline、更突出 primary CTA、一致 neutral body)
- 反转层级 → 换信号(弱化大声的不重要元素,重新定位被埋的 primary)
- 单调 → 引入一个战略 break;混乱 → consolidate 到最强 pattern

**模糊情况**——倾向更激进的层级——太强比太弱更容易回调。

**总结**:按类别找到并修复的问题、用户应审查的判断 call、开放推荐。

### 6.4 交互状态检测流程(Interaction States Pass)

> 对应 skill: `skills/review/interaction-states-pass/` | 标准: `references/standards.md` §12

**Phase 1:清单化交互元素**——走设计,列出每个交互元素:button(含 `role="button"` 和任何带 click handler 的)、link、form input、toggle(checkbox、radio、switch)、可点击 card/row、导航 item(tab、sidebar link、breadcrumb)、自定义 widget(dropdown、accordion、modal、popover)。

**Phase 2:逐元素状态验证**——对每个元素检查全部 6 方面。全部标记,包括边界情况——note 置信度而不是静默 drop 不确定的 finding。

1. **Default**——静态时清晰可交互:button 有区别于 body text 的 fill 或 border;link 看起来像 link;input 有可见 border 或 fill。标记只在 hover 才揭示交互性的元素——触摸和键盘用户永不 hover
2. **Hover**——cursor-over 时视觉变化——至少色变;更好,色+阴影+轻微 transform(`translateY(-2px)`)。不要用 opacity 减少作 hover;读起来像 disabled
3. **Active / pressed**——更深色、轻微缩(`transform: scale(0.98)`)、或回基线——确认点击注册
4. **Disabled**——更低 opacity(~0.6)、无 hover 效果、`cursor: not-allowed`、区别于 default 和 hover。如 disabled 等条件("填完所有必填"),说明*为什么*——tooltip、inline message、或 `title` 属性
5. **Focus**——通过 `:focus-visible`(非 bare `:focus`)的可见 ring:对比度 3:1 对相邻背景,至少 2px 厚带 2px offset。`outline: none` **永远不**无替代使用
6. **Loading**(触发 async 工作的元素)——点击时 disable 防双 submit,label 换 spinner 或 "Loading…",完成时恢复。渲染时取数据得 skeleton/spinner/progress

**Phase 3:验证 transition**——每个状态变化平滑 transition,不 snap(`transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease`):
- **0.15-0.3s** 给状态变化(hover、focus、active);**0.3-0.5s** 给 entry/exit(modal、drawer、toast)
- 避免微交互超 0.5s(laggy)和 0s/无 transition(broken)
- motion-heavy 的 transition 包在 `@media (prefers-reduced-motion: reduce)` 里

**Phase 4:验证动作反馈**——每个动作显示可见结果:提交成功(toast、inline message、或带确认的 redirect)、提交失败(清晰 error,字段特定则绑字段)、验证 error(blur 或 submit 时出现,修好时清除)、状态变化(立即视觉更新)。标记静默成功和静默失败——都感觉 broken。当前状态也可见:active 页面/tab、选中项、active filter/sort 视觉区别。

**Phase 5:应用修复和总结**——用 design system token 加每个缺失状态/反馈元素。系统未定义时用:hover 10-15% 更深(或 `color-mix`);active 再 10% 或 `scale(0.98)`;disabled opacity 0.6 + `cursor: not-allowed`;focus `outline: 2px solid var(--color-primary); outline-offset: 2px`;transition `0.2s ease`。状态不明显时(如 toggle button 的 hover-on-active),做判断 call 并 note。

**总结**:清单化的元素、按类别加的状态、加或规范化的 transition、加的反馈、用户应审查的判断 call。

### 6.5 其他专项检测

以下检测在 Step 4 执行,标准见 `references/standards.md`:

- **硬编码值检测** → `references/standards.md` §6(颜色/字体/间距硬编码正则 + Swift 检测)
- **设计系统合规性** → `references/standards.md` §7(组件 API 一致性 + 状态完整性)
- **品牌资产协议** → `references/standards.md` §7(Logo 真实资产 + 官方色值)
- **Artifact 结构检查** → `references/standards.md` §6(HTML 完整性 + CSS token 一致性 + 可访问性基线)
- **文案审查** → `references/standards.md` §5(slop 词汇 + CTA + 中英文混排)
- **图标审查** → `references/standards.md` §5(混搭/风格/尺寸/语义/可访问性)

---

## 7. Polish 流程编排(Polish Pass)

> 对应 skill: `skills/review/polish-pass/` | 这是 4 个审查 skill 的总编排,设计展示给 stakeholder 或 ship 前的最终质量门。

**核心命题**:**打磨过和没打磨的设计是同一个 idea 在不同 care 级别的执行——差距是人们实际看到的**。这是 4 个更窄审查 skill 的 umbrella;交付前作为最终 gate 用。

### 7.1 Phase 1:确认 scope

打磨用户刚完成或问到的 HTML 文件;否则项目主交付物;不清楚就问。读文件,note medium(slide/page/mobile/dashboard)、部署上下文(internal/customer-facing/marketing)、任何声明约束。

设计明显 mid-flight(布局坏、section 缺、placeholder 内容还在迭代)时,说出来并问是现在打磨还是结构 settle 后。

### 7.2 Phase 2:并行启动 4 个审查 agent

用 `${AGENT_TOOL_NAME}` 在单条消息里并发启动 4 个 agent。每个跑等价于一个独立审查 skill,scoped 到这个文件。**显式指令每个 agent**:**报告找到的每个问题,包括不确定和低严重度的,带置信度和严重度估计**。覆盖是 agent 的工作;过滤和优先级在 Phase 3 做。自审"minor" finding 的 agent 静默降低 recall。

1. **Accessibility audit**(`accessibility-audit`):对比度和色彩(WCAG AA 最小值、仅色彩信号、纯白/黑);语义 HTML 和结构(标题、button vs div、label、alt、ARIA 纪律);键盘导航和 focus(可达性、tab 顺序、可见 focus);动效、表单、hit-target 尺寸
2. **AI slop check**(`ai-slop-check`):激进渐变;emoji 装饰;默认左 border card;手画 SVG;滥用默认字体(Inter、Roboto、Arial、Fraunces、bare system stack);editorial-warm house style 作 silent 默认(cream + serif display + terracotta,无品牌理由);纯白/黑;invented 色;off-scale spacing
3. **Hierarchy and rhythm review**(`hierarchy-rhythm-review`):primary/secondary/tertiary 区分通过尺寸/色/字重/位置/密度 + 5 秒测试;spacing 和 type scale 纪律、重复、战略性变化、palette 纪律、section 结构、对齐
4. **Interaction states pass**(`interaction-states-pass`):逐元素 default/hover/active/disabled/focus/loading;transition 时长(0.15-0.3s 状态变化,更长 entry/exit);`prefers-reduced-motion`;动作反馈和状态可见

### 7.3 Phase 3:聚合、去重、优先级

等 4 个 agent。merge 重复 finding(如"focus ring 移除"同时来自 accessibility 和 interaction-states)。group 成:

1. **Blockers**——可访问性失败(对比度低于 WCAG、缺键盘支持、移除 focus ring、缺 label)。这些对真实用户 break 设计;全修
2. **Quality issues**——AI slop trope、坏的层级、缺交互状态。这些廉价化设计;全修
3. **Polish recommendations**——更微妙的改进(色 tone 切换、spacing scale 收紧)。在 scope 内时应用;out 时标记

### 7.4 Phase 4:修复和重验

直接修每个 blocker 和 quality issue。模糊修复(如设计用 Inter 但无品牌字体声明)时,挑可辩护默认并 note 让用户覆盖。明确假阳性(如第三方 embed 的对比度)note 并跳过。

然后重检高风险区:对比度修复洗淡了品牌色吗?新 focus ring 重叠邻居内容吗?primary CTA 现在真感觉 primary 吗?修看起来 off 的;标记不确定的。

### 7.5 Phase 5:最终总结

简洁报告——用户可问详情:

- **Verdict**——"Ready to ship" / "Ready after user reviews flagged decisions" / "Needs more iteration before polish makes sense"
- **Blockers fixed and polish applied**——按类别计数
- **Open decisions**——要 sign off 的判断 call(字体选择、色 tone 切换、强调级别)
- **Out of scope**——注意到但未动的(文案编辑、内容新增、新功能)

---

## 8. 自检迭代

> 审查报告本身也需要审查。输出前执行自检,确保报告质量。

### 8.1 自检清单

| 检查项 | 通过标准 | 不通过时 |
|--------|---------|---------|
| 评分与描述一致性 | 8+ 分的描述无"需要改进";4- 分的描述不正面 | 降分或改描述 |
| Fix 可操作性 | 每条有位置+当前值+修复值 | 重写 Fix |
| Quick Wins 真实性 | 每条 5 分钟内可完成 | 移到 Fix 或替换 |
| 自相矛盾 | Keep 和 Fix 不冲突;评分与 Fix 严重度一致 | 修正矛盾 |
| 评分通胀 | 非所有维度 ≥ 7 | 重新审视至少 1 个维度 |

### 8.2 迭代规则

1. 自检发现问题 → 修正报告
2. 修正后重新自检
3. 最多迭代 2 轮
4. **硬规则:不交付有漏洞的审查报告**

### 8.3 遇到不确定的情况

- **无法判断是否违规**:在报告中标注"待确认",说明两种可能
- **设计系统本身有问题**:先审设计系统,再审产出。报告中分开说明
- **审查对象信息不足**:要求用户补充,不要基于假设下结论
- **多个问题互相矛盾**:列出矛盾,让用户决定优先级

### 8.4 总结规则

审查报告交付时,summary **极短**:

```markdown
✅ 审查完成。总体评分 X.X/10(评级)。
主要问题:[P0 问题数] 处阻断、[P1 问题数] 处重要、硬编码值 N 处。
关键 Quick Win:[最关键的 1 条] → 预计 5 分钟。

📄 报告已保存:.monkren/reviews/{project}-{date}/review-report.md
🌐 HTML 报告:.monkren/reviews/{project}-{date}/review-report.html
📊 评分提升建议:.monkren/reviews/{project}-{date}/score-improvement.md / .html
```

不要:
- 重复报告中已有的内容
- 夸大问题严重程度
- 给出模糊的"建议优化"而不说具体怎么优化

---

## 附:7 步工作流速查

```
0. 审查前发现(识别触发命令 → 确定审查深度)
→ 1. 理解审查对象
→ 1.5 页面遍历(全流程审查时)
→ 2. 提取设计上下文
→ 3. 品牌资产提取
→ 3.5 参考搜索
→ 4. 执行审查(5 维度 + 硬编码 + 合规性 + 结构检查 + 可访问性 + 反 slop + 文案审查 + 图标审查 + 用户体验审查 + 用户使用流程审查 + 功能使用旅程审查 + UI 界面设计审查 + 功能展示合理性审查)
→ 5. 输出报告(三层递进:结论层 → 诊断层 → 行动层)
→ 5.5 持久化(保存报告为 .md + .html + 生成评分提升建议文档)
→ 5.7 HTML 报告生成
→ 6. 自检迭代
```

**Fix 条目写法对比**:

```
❌ 差:间距不太对,调一下
✅ 好:卡片间距不统一——有的 16px 有的 18px。统一为 var(--spacing-md) = 16px

❌ 差:颜色太多了
✅ 好:使用了 6 种颜色(#1a56db, #ff6600, #7c3aed, #10b981, #f59e0b, #ef4444),
      超出 3 色原则。建议保留 primary=#1a56db + accent=#ff6600 + 灰阶,其余用透明度变化

❌ 差:按钮应该用组件
✅ 好:第 47 行用了 <button style="background:#1a56db">,应替换为 <PrimaryButton>
```

**触发词速查**:审查类请求→"评审/审查/review"、"简单审查/快速审查"、"深度审查/全面审查"、"全流程审查/遍历审查"、"检测硬编码/hardcode check"、"合规检查/compliance check"、"设计建议/设计方向/suggestion"、"SwiftLint 规则"、"polish/润色"。
