<sub>🌐 <a href="README.en.md">English</a> · <b>中文</b></sub>

> 当前版本：**v4.0** / 2026-07-07 / 架构：**四层知识图谱 + 五阶段 skill 矩阵**

<div align="center">

# Monkren Design

> *「双重身份的设计智能体——既是设计审查员，也是设计创作者。」*
> *"A design agent with two identities — a design critic and a design creator."*

[![License](https://img.shields.io/badge/License-Personal%20Use%20Only-orange.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-blueviolet)](https://skills.sh)
[![Skills](https://img.shields.io/badge/skills.sh-Compatible-green)](https://skills.sh)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://monkren-ai.github.io/monkren-designer/)

<br>

**在你的 agent 里直接说话：审查一个设计、给个方向、做个原型。**

<br>

🌐 **在线预览**：<https://monkren-ai.github.io/monkren-designer/>

<br>

一个跨 agent 通用的 **21-skill 设计系统**——**5 阶段路由**（Discover → Define → Create → Review → Deliver）+ **5 个专项审查 skill**（可访问性 / 反 slop / 层级节奏 / 交互状态 / polish 编排）+ **9 个 reference** 知识图谱。

```
npx skills add monkren-ai/monkren-designer
```

跨 agent 通用——Claude Code、Cursor、Codex、OpenClaw、Hermes 都能装。

[快速开始](#快速开始) · [双重身份](#双重身份) · [设计哲学](#设计哲学) · [五阶段 skill 矩阵](#五阶段-skill-矩阵) · [核心机制](#核心机制) · [工作流](#工作流) · [仓库结构](#仓库结构)

</div>

---

## 双重身份

Monkren 是一位**设计智能体**——同一段对话里既当审查员，也当创作者。这两种身份不是割裂的，是同一个人的两面：

| 身份 | 你问 | 它交付 |
|------|------|--------|
| **审查员** | 「这个设计好不好看」「检测硬编码」「合规检查」「评审这个落地页」 | 5 维度评审 + 硬编码检测 + 反 AI slop + SVG 雷达图 + 三层递进报告 |
| **创作者** | 「做个 wireframe」「出个原型」「生成 3 个变体」「提取 token」「做一份 deck」 | 低保真线框 / 可交互原型 / 设计变体 / HTML 幻灯片 / token & 组件清单 |

**关键区别**：不是「会做设计的代码生成器」，是「用代码做设计的设计师」。

> **信念**：审查设计不审查人，创作设计不堆模板。每个元素必须 earn its place；无真实数据用 placeholder > 编造。→ 详见 [`## 设计哲学`](#设计哲学)

---

## 设计哲学

Monkren 的所有产出（审查 / 创作 / 报告 / Demo）都基于一套**显式的设计哲学**——**7 条核心信念** + **10 流派 × 40 哲学库** + **Monkren 自身归属**。这一章就是 Monkren 自身应用这些原则的样本：不堆砌、不重复、每段 earn its place。

### 7 条核心信念

| # | 信念 | 含义 |
|---|------|------|
| 1 | **从 existing context 出发** | 好的设计一定是从已有上下文长出来。凭空做 hi-fi 必产 generic。 |
| 2 | **反 AI slop** | AI 训练语料最常见的「视觉最大公约数」= slop。审查标记，创作避开。 |
| 3 | **系统优先，不要填充** | 每个元素必须 earn its place。空 section 是布局问题，用构图解决，不是发明内容。 |
| 4 | **Placeholder > 烂实现** | 诚实的 placeholder 比拙劣的真实尝试好 10 倍。 |
| 5 | **品牌被认出来** | 识别度排序：Logo > 产品图 > UI 截图 > 色值 > 字体。 |
| 6 | **质量优于数量** | 3 个打磨好的 > 5 个半成品；1 个强选择 > 多个安全选择。 |
| 7 | **IP 与内容边界** | 不复刻受版权保护的设计；不擅自加范围；不用 filler 填空间。 |

→ 完整论述：[`references/beliefs.md`](references/beliefs.md)

### 10 流派 × 40 种设计哲学

设计哲学库收录 40 种标志性设计语言，按 10 个流派组织。当用户需要「推荐设计方向」「什么风格合适」时，从这里抽取——**3 个方向必须来自不同流派**：

| 流派 | 代表 | 适合作为 |
|------|------|---------|
| **信息建筑派** | Pentagram / Stamen / Fathom | 安全 / 专业 / 数据 / 阅读选择 |
| **运动诗学派** | Locomotive / Active Theory / Field.io / Resn | 沉浸 / 数字 / 算法 / 交互选择 |
| **极简主义派** | Experimental Jetset / Müller-Brockmann / Build / Sagmeister & Walsh | 文化 / 系统 / 奢侈 / 实验选择 |
| **实验先锋派** | Zach Lieberman / Raven Kwok / Ash Thorp / Territory Studio | 创意 / 参数 / 电影 / 未来选择 |
| **东方哲学派** | Takram / Kenya Hara / Irma Boom / Naoto Fukasawa | 思辨 / 留白 / 书籍 / 克制选择 |
| **野蛮生长派** | Pascal Devoyre / Michele Mazzini / Bloomberg / Lotta Nieminen | 反叛 / 产品 / 编辑 / 品牌选择 |
| **后现代狂欢派** | Sottsass / Camille Walala / Morag Myerscough / Studio Moross | 文化 / 空间 / 社区 / 流行选择 |
| **有机仿生派** | Neri Oxman / Ross Lovegrove / Daan Roosegaarde / Heatherwick | 科学 / 产品 / 环境 / 建筑选择 |
| **复古未来派** | Syd Mead / Daniel Simon / Actual Source / Andrés Reisinger | 经典 / 概念 / 潮流 / 超现实选择 |
| **极繁主义派** | David Carson / Paula Scher / Peter Saville / Kelly Wearstler | 叛逆 / 地图 / 音乐 / 奢华选择 |

→ 完整风格库（哲学内核 + 核心特征 + 提示词 DNA + 反模式检测 + 提升路径）：[`references/philosophy-library.md`](references/philosophy-library.md)

### Monkren 自身归属

Monkren 采用 **Graphic Monochrome Canvas**——属于**极简主义派**的极致延伸。理由：信念 1（从 existing context 出发）的最佳实践是「把已有 design system 长出来」，而极简主义派的 Müller-Brockmann（瑞士网格）/ Build（深色画布）/ Experimental Jetset（反商业）是「context 优先 + 几何诚实」最纯粹的样本。→ 详见 [`DESIGN.md`](DESIGN.md)

---

## 快速开始

```bash
npx skills add monkren-ai/monkren-designer
```

然后在 Claude Code 里直接说话：

**审查类**：
```
「简单审查这个设计」—— 5 维度评审 + 硬编码检测，快速报告
「深度审查这个项目」—— 全维度 + 全检测，完整报告
「全流程审查整个 App」—— 遍历所有页面 + 深度审查
「检测这段代码里的硬编码颜色和间距值」
「这个页面有没有违反设计系统规范？」
```

**创作类**：
```
「帮我做个 wireframe 探索几种布局」
「出个可点击的 HTML 原型」
「生成 3 个设计变体对比」
「从这段代码里提取 design tokens」
```

**方向类**：
```
「推荐 3 个适合 AI 产品的设计方向」
「我想做一个健康类 App，该选什么视觉风格」
「这个页面想换种风格，有什么反共识方向」
```

没有按钮、没有面板。对话即审查，对话即创作。

---

## 五阶段 skill 矩阵

请求到达后，Monkren 先识别**阶段**（Discover/Define/Create/Review/Deliver），再路由到对应 skill。每个阶段都有专属 skill + 深度 reference。

### Discover · 发现（3 skills）

> 用户在问「竞品怎么做 / 最佳实践 / 怎么开始研究」

| Skill | 一句话 | 触发词 |
|------|--------|--------|
| `design-research` | 深度设计研究：Lazyweb 截图库 + 网络研究，产出结构化报告 + 下载参考截图 | best practices / competitive analysis / research how others do |
| `quick-references` | 快速找参考截图，按模式分组，本地下载 | show me examples / how do other apps do / references for |
| `design-brainstorm` | 跨域 brainstorm：故意搜「没人看的领域」找新灵感 | brainstorm / creative alternatives / think outside the box |

### Define · 定义（3 skills）

> 用户在问「什么风格 / 美学方向 / 项目启动问什么」

| Skill | 一句话 | 触发词 |
|------|--------|--------|
| `discovery-questions` | Kickoff 提问协议：5 个必问项覆盖目标/用户/约束/品牌/成功标准 | kickoff / 项目启动 / discovery / 需求澄清 |
| `frontend-aesthetic-direction` | 无品牌时锁定美学方向：7 维度承诺（色彩/字体/间距/容器/图像/动效/语调） | 美学方向 / aesthetic direction / no brand |
| `visual-taste-lab` | 从截图/URL 蒸馏出可复用的 design language workflow | better-looking UI / de-AI / visual direction |

### Create · 创作（8 skills）

> 用户在问「做线框 / 出原型 / 做幻灯片 / 生成变体 / 提取」

| Skill | 一句话 | 触发词 |
|------|--------|--------|
| `wireframe` | 低保真线框探索：5 phase，纯黑白快速试布局 | wireframe / 低保真 / lo-fi / 布局探索 |
| `make-a-prototype` | 可交互原型：7 phase，输出单文件 HTML 可点击原型 | prototype / 交互原型 / interactive demo |
| `make-a-deck` | HTML 幻灯片：6 phase，浏览器全屏演示 | deck / slides / 演示文稿 / HTML PPT |
| `make-tweakable` | 实时调整面板：带 slider/input/toggle，host 协议联动 | tweakable / 调整面板 / control panel |
| `generate-variations` | 设计变体：3+ 方向（保守→平衡→激进）同稿对比 | variations / 多个方案 / 3 个方案 |
| `design-system-extract` | 从源文件提取 token：色彩/字体/间距/圆角/阴影/动效 | extract tokens / token 提取 / 设计系统提取 |
| `component-extract` | 组件清单：原子→分子→组织→模板→页面 5 层分类 | component inventory / 组件清单 / 组件梳理 |
| `design-improve` | 截图 + Lazyweb 找相似 + 给出有据可依的改进建议 | improve this design / design feedback / make this look better |

### Review · 审查（5 skills）

> 用户在问「好不好看 / 检测 / 走查 / 交付前检查」

| Skill | 一句话 | 触发词 |
|------|--------|--------|
| `accessibility-audit` | 4 个并行 agent：对比度 / 语义 HTML / 键盘导航 / 动效表单 | accessibility / a11y / WCAG |
| `ai-slop-check` | 检测 AI 设计的 9 类痕迹（紫渐变/emoji/默认左 border 卡片/手画 SVG/通用字体 等） | AI slop / 去 AI 化 / slop 检测 |
| `hierarchy-rhythm-review` | 2 个并行 agent：层级（primary/secondary/tertiary + 5 秒测试）+ 节奏 | hierarchy / rhythm / 视觉层级 |
| `interaction-states-pass` | 6 种状态完整检查：default/hover/active/disabled/focus/loading | interaction states / 状态完整性 |
| `polish-pass` | **交付前质量门**：编排 4 个审查 agent，聚合去重，按 blocker/quality/polish 修复 | polish / 交付前检查 / final check |

### Deliver · 交付

> 用户在问「出报告 / 生成 demo / 评分提升建议」

由 [`references/execution.md`](references/execution.md) 驱动——**4 种报告类型**（完整 / 快速 / 设计建议 / 评分提升建议）+ **三层递进结构**（结论层 → 诊断层 → 行动层）+ **SVG 雷达图** + **Demo 生成**（单文件 HTML，保存在 `.monkren/demos/`）。

### Tools · 工具（贯穿全流程，2 skills）

| Skill | 触发词 |
|------|--------|
| `add-inspo-source` | 把外部灵感源（Mobbin / Savee / Dribbble / Behance）注册为一等公民搜索源 |
| `remove-inspo-source` | 断开已连接的灵感源 |

> 完整 skill 清单 + 路由规则 → [`SKILL.md`](SKILL.md)

---

## 四层知识图谱

21 skill 共享同一套**四层 reference 知识图谱**——信念层定义世界观，标准层定义好坏，方法层定义怎么做，执行层定义产出长什么样。

| 层 | 文件 | 职责 |
|----|------|------|
| **信念层** | [`references/beliefs.md`](references/beliefs.md) | 双重身份 / existing context / 反 AI slop / 系统优先 / Placeholder > 烂实现 / 品牌被认出来 / 质量优于数量 / IP 边界 |
| **标准层** | [`references/standards.md`](references/standards.md) | 5 维度评审 / 评分纪律 / 反 AI slop 黑名单 / 9 段框架 / 硬编码检测 / 合规检查 / 品牌资产协议 / 视觉层级/排印/色彩/可访问性/交互/简化/系统思维标准 |
| **方法层·审查** | [`references/methods-review.md`](references/methods-review.md) | 审查工作流 9 步 / 7 种触发命令 / 页面遍历 / 多视角调度 / 5 个专项审查 skill 编排 / Polish / 自检迭代 |
| **方法层·创作** | [`references/methods-create.md`](references/methods-create.md) | 创作工作流 6 步 / 提问协议 / 美学方向 / wireframe / 变体 / 原型 / deck / tweakable / token & 组件提取 |
| **执行层** | [`references/execution.md`](references/execution.md) | 报告模板 / 三层结构 / 设计建议 8 字段 / 雷达图 / 持久化 / Demo 生成 |

**专题库**（按需查阅）：

| 专题 | 文件 | 何时读 |
|------|------|--------|
| 多视角审查 | [`references/perspectives.md`](references/perspectives.md) | 10 视角体系（视觉/交互/品牌/可访问性/转化/UX/流程/旅程/UI/功能展示） |
| 平台专项 | [`references/platforms.md`](references/platforms.md) | 移动端 / 桌面端 / Web / PPT / 插画 / 角色 IP 规范 |
| 哲学库 | [`references/philosophy-library.md`](references/philosophy-library.md) | 40 种设计哲学 + 流派适配矩阵 + 案例库 + 概念包 + 基因重组 |
| 集成与参考 | [`references/integration.md`](references/integration.md) | Lazyweb MCP / 真实产品截图证据 / Prompt 工程 |

---

## 核心机制

### 5 维度评审体系

设计审查的核心框架，每个维度 0–10 分：

| 维度 | 审查什么 | 高分标准 |
|------|---------|---------|
| 哲学一致性 | 设计是否体现了明确的视觉哲学 | 每个细节都有哲学依据 |
| 视觉层级 | 用户视线是否自然流动 | 眯眼测试仍能分清层级 |
| 细节执行 | 对齐/间距/颜色是否像素级精确 | 统一间距系统，颜色 ≤3-4 种 |
| 功能性 | 每个元素是否服务于目标 | 删掉任何元素设计都会变差 |
| 创新性 | 是否避免了 cliché | 有「意想不到但合理」的设计决策 |

→ 完整评分标准 + 9-10/7-8/5-6/3-4/1-2 五档描述：[`references/standards.md`](references/standards.md#1-5-维度评审体系)

### 硬编码值检测

自动扫描代码中的三类硬编码问题：

| 类型 | 检测目标 | 修复建议 |
|------|---------|---------|
| 颜色 | `#xxxxxx`、`rgb()`、`hsl()` 直接写 | 替换为 `var(--color-*)` 设计 token |
| 字体 | `font-family` 直接声明 | 替换为 `var(--font-*)` 字体 token |
| 间距 | 非 4/8 倍数的间距值 | 替换为 `var(--space-*)` spacing token |

### 设计系统合规性检查

审查代码是否遵循设计系统规范：

- **组件合规**：是否使用设计系统组件（PrimaryButton / SecondaryButton 等），而非自定义实现
- **品牌资产合规**：是否使用真实 logo / 产品图 / UI 截图，而非 CSS 剪影 / SVG 手画替代
- **Token 合规**：颜色 / 字体 / 间距是否通过 CSS 变量引用，而非硬编码

### 反 AI slop 规则

检测 AI 设计的「视觉最大公约数」：

| 避免 | 采用 |
|------|------|
| 紫色渐变、凭空新颜色 | 品牌色 / oklch 定义的和谐色 |
| Emoji 作图标 | 真实 icon 库或诚实 placeholder |
| 圆角卡片 + 左 border accent | 诚实的边界 / 分隔 |
| SVG 画人画物 | 真实素材或 placeholder |
| Inter / Roboto 做 display | 有特点的 display + body 配对 |
| 编造 stats / quotes 装饰 | 留白，或问用户要真内容 |

→ 完整 9 类黑名单：[`references/standards.md`](references/standards.md) §反 AI slop

### 评分纪律

4 条铁律确保审查评分客观：

- **禁止评分通胀**：全维度 ≥7 时触发自检
- **禁止平均上浮**：取最差持续段而非平均值
- **评分必须引证**：必须引用具体元素 / 类名 / 行号
- **创新性允许低分**：5/10 对生产交付物合理

### 问题严重度分级

| 分级 | 标记 | 含义 |
|------|------|------|
| P0 | ⚠️ 致命 | 阻断性问题，发布前必须修复 |
| P1 | ⚡ 重要 | 影响体验/一致性，下一迭代修复 |
| P2 | 💡 优化 | 锦上添花，有空时改进 |

### SVG 雷达图可视化报告

审查报告包含内联 SVG 雷达图，5 轴对应 5 维度，填充区域直观展示评分分布。薄弱维度一目了然（凹陷处），无需逐条阅读分数。

### 自身设计哲学

Monkren 自身采用 **Graphic Monochrome Canvas** 视觉语言：纯黑白高对比、无圆角几何、1px 边框、400 单一字重。它属于**极简主义派**的极致延伸——7 条核心信念 + 自身归属的完整说明 → 详见 [## 设计哲学](#设计哲学)。

---

## 设计方向顾问

当用户需要「**推荐设计方向**」「**什么风格合适**」时，进入 Define 阶段，输出**设计建议报告**（8 字段结构）：

### 5 类触发场景

| 场景 | 含义 | 输出重点 |
|------|------|---------|
| 冷启动（0→1） | 新项目无 design system | 入门成本 / 组件库适配 |
| 增量设计（1→N） | 已有 system 加新模块 | 风格延展性 / token 复用 |
| 方向诊断 | 已有设计想识别流派 | 归类 / 特征对比 |
| 瓶颈突破 | 陷同质化想换风格 | 差异最大化 / 风险标注 |
| 标杆对齐 | 想对标 XX 产品/品牌 | 路径 / 改造幅度 / 可行性 |

### 8 字段输出

每个方向含：项目画像 / 设计师或机构名 / 流派归属 / 标志性视觉特征 / 气质关键词 / 适配评分 / 落地概念包（token + 组件 + 布局 + 动效 + Checklist）/ 风险提示。

### 12 维度项目画像 + 10 流派 × 40 哲学

从 10 流派（信息建筑 / 运动诗学 / 极简 / 实验先锋 / 东方哲学 / 野蛮生长 / 后现代狂欢 / 有机仿生 / 复古未来 / 极繁主义）× 40 种设计哲学中推荐 **3 个必须来自不同流派**的差异化方向。

### 哲学基因重组

反共识方向发散 + 梯度式（保守 → 平衡 → 激进）演进 + 落地概念包 + Demo 生成。

→ 完整规则：[`references/execution.md`](references/execution.md) §设计方向顾问 + [`references/philosophy-library.md`](references/philosophy-library.md)

---

## 工作流

### 创作 6 步

1. 创作前的提问协议 → 确认目标/用户/约束/品牌/成功标准
2. 锁定美学方向 → 7 维度承诺（色彩/字体/间距/容器/图像/动效/语调）
3. 低保真探索 → wireframe 布局方案
4. 输出格式选择 → prototype / deck / tweakable / variations
5. 变体生成 → 3+ 风格方向（保守→平衡→激进）
6. 协作与交付 → 尽早展示 / 简要摘要 / 委托验证

→ 完整 6 步工作流：[`references/methods-create.md`](references/methods-create.md)

### 审查 9 步

```
审查前发现（含触发命令识别）→ 理解审查对象 → [页面遍历] → 提取设计上下文
→ 品牌资产提取 → [参考搜索] → 执行审查 → 输出报告 → [持久化+评分提升] → 自检迭代
```

0. **审查前发现**（含触发命令识别）：确认触发命令 / 输入格式 / 设计类型 / 审查范围 / 侧重点
1. **理解审查对象**：审什么——截图 / HTML / 代码 / Figma？整体还是局部？
1.5. **页面遍历**（全流程审查时）：发现全部页面 → 逐页审查 → 跨页一致性检查
2. **提取设计上下文**：读代码提取 token / 组件 / 品牌资产
3. **品牌资产提取**：5 步提取（定位→下载→提取色值→编写摘要→确认）
3.5. **参考搜索**（条件性）：Lazyweb 参考截图（可选）
4. **执行审查**：5 维度评审 + 多视角审查 + 平台专项 + 硬编码检测 + 合规检查 + 用户体验审查 + 用户使用流程审查 + 功能使用旅程审查 + UI 界面设计审查 + 功能展示合理性审查 + 反 AI slop 检查 + Artifact 结构检查 + 可访问性检查
5. **输出报告**：三层递进报告（结论层 + 诊断层 + 行动层）或设计建议报告
5.5. **持久化 + 评分提升**：保存报告为 .md + .html + 生成评分提升建议文档
6. **自检迭代**：评分与描述一致性 + Fix 可操作性 + 自相矛盾检查

→ 完整 9 步工作流 + 7 种触发命令：[`references/methods-review.md`](references/methods-review.md)

---

## 仓库结构

```
monkren-design/
├── SKILL.md                 # agent 主入口（五阶段路由）
├── README.md                # 本文件（中文）
├── README.en.md             # English README
├── DESIGN.md                # Monkren 项目设计系统（Graphic Monochrome Canvas）
├── index.html               # Landing page
├── LICENSE                  # 个人免费 / 商用需授权
├── case/                    # 视觉参考样本
│   ├── Design Review — Landing Page.html
│   ├── Score Improvement — Landing Page.html
│   └── Design Suggestion — Landing Page.html
├── skills/                  # 五阶段 skill 矩阵（21 skills）
│   ├── discover/            # 发现（3）：design-research / quick-references / design-brainstorm
│   ├── define/              # 定义（3）：discovery-questions / frontend-aesthetic-direction / visual-taste-lab
│   ├── create/              # 创作（8）：wireframe / make-a-prototype / make-a-deck /
│   │                        #         make-tweakable / generate-variations / design-system-extract /
│   │                        #         component-extract / design-improve
│   ├── review/              # 审查（5）：accessibility-audit / ai-slop-check /
│   │                        #         hierarchy-rhythm-review / interaction-states-pass / polish-pass
│   ├── deliver/             # 交付（README 入口，references/execution.md 驱动）
│   └── tools/               # 工具（2，贯穿全流程）：add-inspo-source / remove-inspo-source
└── references/              # 四层知识图谱（9 文件）
    ├── beliefs.md           # 信念层：双重身份 / 反 slop / 系统优先 / 品牌被认出来
    ├── standards.md         # 标准层：5 维度 / 评分纪律 / 反 slop 黑名单 / 9 段框架 / 硬编码 / 合规
    ├── philosophy-library.md # 哲学库：40 种设计哲学 + 流派矩阵 + 概念包 + 基因重组
    ├── methods-create.md    # 方法·创作：6 步工作流 + 提问协议 + 美学方向 + 各类创作 skill
    ├── methods-review.md    # 方法·审查：9 步工作流 + 7 触发命令 + 页面遍历 + 多视角 + 专项检测
    ├── execution.md         # 执行层：报告模板 / 三层结构 / 8 字段 / 雷达图 / 持久化 / Demo
    ├── perspectives.md      # 多视角：10 视角体系（视觉/交互/品牌/a11y/转化/UX/流程/旅程/UI/功能）
    ├── platforms.md         # 平台专项：移动 / 桌面 / Web / PPT / 插画 / 角色 IP
    └── integration.md       # 集成：Lazyweb MCP + 真实产品截图证据 + Prompt 工程
```

---

## License · 使用授权

**个人使用免费、自由**——学习、研究、创作、给自己做东西、写文章、做副业、发微博发公众号，随便用，不用打招呼。

**企业商用禁止**——任何公司、团队、或以盈利为目的的组织，想把本 skill 集成到产品、对外服务、给客户交付工作中使用，**必须先联系作者获得授权**。包括但不限于：

- 把 skill 作为公司内部工具链的一部分
- 把 skill 产出物作为对外交付物的主要审查手段
- 基于 skill 二次开发做成商业产品
- 在客户商单项目中使用

**商用授权联系方式**见下方「Connect · Monkren」。

---

## Connect · Monkren

| 平台 | 链接 |
|---|---|
| GitHub | https://github.com/monkren-ai/monkren-designer |

公众号 / 即刻 / X 暂未公开，暂以 GitHub 为唯一发布渠道。

---

## 文档维护

本 README 与 [`README.en.md`](README.en.md) 同步维护：

- `README.md`（中文）为主版本，`README.en.md` 为镜像
- 中文变更后必须同步英文，反之亦然
- 涉及版本号 / skills 数量 / references 数量的更新，必须跑一次 `ls` + `grep` 验证

→ 当前版本声明见 [`SKILL.md`](SKILL.md) 末尾
