# Monkren Design 介绍页重写计划

## 目标

基于项目实际能力资产（25+ case 样本、7 个子 skill、40 种设计哲学、7 份 references 文档），重写根目录 `index.html`，让介绍页完整反映项目能做什么、做过什么、产出物长什么样。

## 当前状态分析

### 已有资产盘点

| 资产类别 | 数量 | 位置 | 当前展示情况 |
|---------|------|------|-------------|
| HTML 介绍页 | 1 | `index.html`（1375 行，v2.0，黑白设计系统） | 已展示 8 能力 + 5 维度 + 工作流 + 使用 |
| 案例样本 | 25+ | `case/*.html` | **未展示** |
| 子 skill | 7 | `skills/*/SKILL.md` | **未展示**（仅 README 文字提及） |
| 设计哲学 | 40 种（10 流派 × 4） | `references/philosophy.md` | 仅展示 6 张卡（6/40） |
| 参考文档 | 7 | `references/*.md` | **未展示** |
| 设计系统 | 9 段 | `DESIGN.md` | 通过 index.html 自身体现 |

### 现 index.html 不足

1. **案例画廊缺位**：访客看不到真实产出物的样子（审查报告、设计建议、评分提升等）
2. **子 skill 矩阵缺位**：7 个子 skill 各自能做什么不明确
3. **哲学库展示过窄**：6/40，且未按 10 流派组织
4. **references 文档无入口**：7 份子文档无处可寻

## 重写策略

**整体思路**：保留现有 7 个区块的视觉骨架，扩展内容深度并增加 4 个新区块，让介绍页从"功能列表"进化为"项目能力全景图"。

**视觉规范**：严格遵循 `DESIGN.md` 已有的 Graphic Monochrome Canvas 主题——Canvas Black / Arctic White / Subtle Gray 三色、1px 边框、零圆角（pill 例外）、Lausanne / Victor Serif / Black Tie 三字体。

**复用原则**：保留现有 index.html 中已验证的 CSS 类（`.wrap`、`.section`、`.section-head`、`.grid-4`、`.stage`、`.report-panel`、`.discipline-grid`、`.severity-cards`、`.step`、`.command-layout`、`.terminal`、`.copy-card`、`.btn`、`.eyebrow`、`.footer`、响应式断点 920px / 560px），不重写视觉语言层。

## 新增区块详细设计

### 新增 1：子 skill 功能矩阵（Section: Skills）

**位置**：在 Hero 之后、Capabilities 之前

**Eyebrow**：Sub-skills

**标题**：7 个 Sub-skill，覆盖设计审查全场景。

**布局**：2 × 4 网格（最后一个 cell 留白或作为「安装主 skill」入口）

**每个子 skill 卡片内容**：
- 编号 01-07
- 子 skill 名称（来自 `skills/*/SKILL.md` 第一行 `# Xxx`）
- 一句话定位（提炼自 description 字段）
- 触发关键词 chips（2-3 个 Black Tie 字体标签）
- 链接锚点 `#skill-{slug}`

**子 skill 数据**（已从 SKILL.md 提取）：

| # | 名称 | 定位 | 触发词 |
|---|------|------|--------|
| 01 | visual-taste-lab | 把模糊的「好看」请求变成可复用的设计语言工作流 | 「让 UI 更好看」「去 AI 化」「品牌系统」 |
| 02 | design-brainstorm | 跨界联想，刻意跳出常规品类找灵感 | 「创意方案」「不走寻常路」「差异化」 |
| 03 | design-improve | 截图 + Lazyweb 找相似，给出有证据的改进建议 | 「改进这个设计」「设计反馈」「怎么改」 |
| 04 | design-research | 深度调研 + 下载参考截图，输出结构化研究报告 | 「最佳实践」「竞品分析」「行业调研」 |
| 05 | quick-references | 快速找参考截图，按模式分组，不写完整报告 | 「给我看看例子」「参考」「UI 截图」 |
| 06 | add-inspo-source | 接入 Mobbin / Savee / Dribbble 等外部灵感源 | 「接 Mobbin」「连 Dribbble」 |
| 07 | remove-inspo-source | 断开外部灵感源 | 「断开 Mobbin」「移除参考源」 |

**新增 CSS**：`.skills-grid`（4 列 → 2 列响应）、`.skill-card`、`.skill-card h3`、`.skill-card .triggers`、`.skill-card .chip`

---

### 新增 2：完整哲学库（Section: Philosophy Library）

**位置**：替换/扩展现有 6 卡 philosophy 区块

**Eyebrow**：Philosophy Library

**标题**：10 流派 × 40 种设计哲学。

**布局**：10 个 section 子区块（每流派一个），每个子区块：
- 子标题（流派名 + 该流派设计哲学）
- 4 个哲学卡片（按 philosophy.md 中的顺序）

**10 流派速查**（来自 `references/philosophy.md` 第 47-100 行）：

| 流派 | 4 种哲学 |
|------|---------|
| 信息建筑派 | Pentagram / Stamen / Information Architects / Fathom |
| 运动诗学派 | Locomotive / Active Theory / Field.io / Resn |
| 极简主义派 | Experimental Jetset / Müller-Brockmann / Build / Sagmeister & Walsh |
| 实验先锋派 | Zach Lieberman / Raven Kwok / Ash Thorp / Territory Studio |
| 东方哲学派 | Takram / Kenya Hara / Irma Boom / Naoto Fukasawa |
| 野蛮生长派 | Pascal Devoyre / Michele Mazzini / Bloomberg Businessweek / Lotta Nieminen |
| 后现代狂欢派 | Ettore Sottsass / Camille Walala / Morag Myerscough / Studio Moross |
| 有机仿生派 | Neri Oxman / Ross Lovegrove / Daan Roosegaarde / Heatherwick Studio |
| 复古未来派 | Syd Mead / Daniel Simon / Actual Source / Andrés Reisinger |
| 极繁主义派 | David Carson / Paula Scher / Peter Saville / Kelly Wearstler |

**每个哲学卡片内容**：
- 编号（01-40）
- 哲学名 + 设计师/机构
- 流派标签（Black Tie 字体）
- 一句话核心特征（≤40 字）
- 最佳执行路径 chip（HTML / AI 生成 / 混合）

**新增 CSS**：`.school-block`、`.school-head`、`.philosophy-grid`（沿用已有）

---

### 新增 3：案例画廊（Section: Case Gallery）

**位置**：在哲学库之后、Dimensions 之前

**Eyebrow**：Case Gallery

**标题**：25+ 真实审查样本。

**布局**：4 列网格（响应式 → 2 列 → 1 列），每个案例一个 ContentCard

**数据来源**：扫描 `case/` 目录所有 .html 文件

**已知案例清单**（从文件目录读取）：

```
设计审查类：
- Design Review — Landing Page.html
- Score Improvement — Landing Page.html
- Design Suggestion — Landing Page.html
- Empty state — four visual directions.html
- Background jobs — header illustrations.html
- Birchline — Card Variant Matrix.html

PR 审查类：
- PR #247 — Review Summary.html
- PR #312 — Move notification delivery onto a queue.html

事故复盘类：
- INC-2025-0412 — Elevated 502s on task sync.html

工程文档类：
- Birchline — Design System Reference.html
- Birchline — Cycle 14 triage.html
- Birchline — Engineering Status — Week 11.html
- Birchline — flags.production.json.html
- Birchline — Support reply prompt tuner.html
- Birchline — Sidebar drag-to-reorder.html
- Birchline — Task completed micro-interaction.html
- How authentication flows through birchline_web.html
- How rate limiting works in birchline_api.html
- Implementation plan — Comment threads on task cards.html
- Platform Eng — Week of Mar 10.html

教程/解释类：
- Consistent hashing — an interactive explainer.html
- Debounced search — three approaches.html
- Deploy pipeline — annotated flowchart.html
- The unreasonable effectiveness of HTML — examples.html
```

**每个案例卡片内容**：
- 案例标题（去 .html 后缀）
- 类别标签（Black Tie：审查 / PR / 事故 / 文档 / 教程）
- 链接 `<a href="case/{filename}" target="_blank">` 

**特殊处理**：3 个小样本（Design Review、Design Suggestion、Score Improvement 三个 Landing Page 案例，文件 < 25KB）可作为重点展示；其他 22+ 文件（1.6-1.7MB 各）是历史产物，以列表卡片形式陈列。

**新增 CSS**：`.gallery-grid`（4 列 → 2 列 → 1 列响应）、`.case-card`、`.case-card h4`、`.case-card .cat`

---

### 新增 4：References 文档入口（Section: References）

**位置**：在 Workflow 之后、Use 之前

**Eyebrow**：Deep Dives

**标题**：7 份子文档，按需深入。

**布局**：3 × 3 网格（最后一个 cell 留白或放「查看 GitHub」入口）

**文档清单**（来自 `references/`）：

| # | 文档 | 一句话定位 | 文件大小 |
|---|------|----------|---------|
| 01 | philosophy.md | 40 种设计哲学完整库 + 方向顾问规则 | 105KB |
| 02 | aesthetics.md | 5 维度评审标准 + slop 黑名单 + 评分纪律 | 29KB |
| 03 | design-system.md | 9 段框架 + 硬编码检测 + 合规性检查 | 22KB |
| 04 | implementation.md | 审查工作流 + 报告模板 + 审查报告示例 | 89KB |
| 05 | platform-guides.md | 移动端/桌面端/Web/PPT/插画/角色 IP 平台专项 | 22KB |
| 06 | review-perspectives.md | 10 视角审查体系 | 41KB |
| 07 | lazyweb-integration.md | Lazyweb 真实产品证据集成 | 27KB |

**每个文档卡片内容**：
- 编号 01-07
- 文档名（带 .md 后缀，Black Tie 字体）
- 一句话定位
- 关键章节 chips（2-3 个，从文档第 ## 标题中提炼）
- 链接到 GitHub raw 或相对路径

**新增 CSS**：`.ref-grid`、`.ref-card`、`.ref-card h3`、`.ref-card .chapters`

---

## 调整现有区块

### Hero

**调整**：副标题更新为「3 分钟，10 维度多视角审查 + 40 种哲学库 + 25+ 真实样本。每个问题都有具体数值和修复建议。」

### Capabilities

**调整**：8 个能力卡片标题保持不变，但描述中加引用：「查看 25+ 真实案例」锚点 `#gallery`、「40 哲学库」锚点 `#philosophy-library」

### Dimensions / Workflow / Use / Footer

**保持不变**（已满足「简洁、精确」目标）

## 文件修改

| 文件 | 改动类型 | 内容 |
|------|---------|------|
| `index.html` | 重写 | 1375 行重写，新增 ~600 行（4 个区块） |
| `DESIGN.md` | 不改 | 设计系统已存在 |
| `SKILL.md` / `README.md` | 不改 | 项目文档保持原状 |
| `case/*` | 不改 | 案例原文保持原状 |

## 技术实现要点

1. **CSS 变量一致性**：所有新增颜色 / 间距 / 字号必须用 `var(--color-*)` / `var(--spacing-*)` / `var(--font-*)`，禁止硬编码值（遵循用户规则「检查硬编码值」）
2. **设计系统组件复用**：按钮必须用 `.btn.primary` / `.btn`（PrimaryButton / SecondaryButton 规范），标签用 `.tag`（Tag/Badge 规范），禁止新增自定义按钮类
3. **响应式断点**：保持 920px / 560px 两个断点
4. **无 JS 依赖**：纯 HTML + CSS，案例卡片用 `<a target="_blank">` 而非 JS 弹窗
5. **无外部资源**：所有 SVG 内联、无外部图片（哲学卡 / 案例卡用纯文字 + 编号 + 标签）
6. **可访问性**：每个 `<section>` 有 `aria-labelledby`、装饰性 SVG 加 `aria-hidden="true"`、skip-link 保持
7. **性能**：25+ 案例卡只渲染标题和类别，不内嵌案例内容（避免页面膨胀到 100MB+）

## 实施步骤

1. **备份**当前 index.html 为 `index.html.bak`（仅在重写失败时回滚用）
2. **重写** `index.html`：
   - 保留 head / style 中 `:root`、`.wrap`、`.top`、`.nav`、`.btn`、`.eyebrow`、`.section`、`.section-head`、`.grid-4`、`.stage`、`.report-panel`、`.discipline-grid`、`.severity-cards`、`.step`、`.command-layout`、`.terminal`、`.copy-card`、`.footer`、响应式断点
   - 调整 Hero 副标题
   - 新增 4 个区块的 HTML 结构（顺序：Hero → **Skills** → Capabilities → **Philosophy Library** → **Case Gallery** → Dimensions → Workflow → **References** → Use → Footer）
   - 新增 4 个区块对应的 CSS 类
3. **本地验证**：
   - 用浏览器或 `python3 -m http.server` 打开 `index.html`
   - 确认所有锚点导航工作（顶部 nav 含新增锚点）
   - 确认响应式断点 920px / 560px 表现
   - 确认 25+ 案例卡链接到 `case/` 文件
4. **硬编码扫描**：
   - 用 `Grep '#[0-9a-fA-F]{3,8}'` 扫描新代码，确认无硬编码颜色
   - 用 `Grep '\d+px'` 扫描新增 spacing，确认都用 `var(--spacing-*)`
5. **删除备份** `index.html.bak`（如不再需要）

## 假设与决策

| 假设 | 决策 | 理由 |
|------|------|------|
| 案例样本不内嵌 | 只做卡片链接，不 iframe / 嵌入内容 | 25+ 文件每个 1.6MB+，嵌入会让首屏 50MB+ |
| 哲学库不展开完整描述 | 一句话核心特征 + 最佳执行路径 chip | 完整描述来自 philosophy.md，避免冗余 |
| 引用 references 用相对路径 | 链接到 GitHub raw（如 `https://github.com/monkren/monkren-design/blob/main/references/philosophy.md`） | 项目是 GitHub 仓库，文档主要在线托管 |
| 不新增 16 能力的 marketing copy | 8 个核心能力卡保持 | README.md 表格列了 16 项，但其中 8 项是核心能力，其余是子项或支撑能力 |
| 子 skill 7 个作为主 skill 7 个 | 7 个 sub-skill 都在新矩阵展示 | 它们是 Monkren Design 的实质工作单元 |
| 不重写 head/元数据 | 保留 v2.0 title / description / OG tags | 已有 SEO 不需调整 |

## 验证步骤

1. 用浏览器打开 `index.html`，按从上到下顺序视觉检查 11 个区块
2. 点击 Hero 右侧的报告预览、Capabilities 卡、Skills 卡、Philosophy 卡、Case 卡片锚点是否跳转
3. 缩放到 920px 和 560px 断点，确认响应式
4. 用 `npx skills add monkren/monkren-design` 安装 skill（不在 PR 流程中做，仅说明）
5. 至少点击 1 个 Case Gallery 链接，确认能打开 `case/*.html` 样本
6. 用 Grep 扫描新代码：硬编码颜色 / 间距值是否为 0

## 不在范围

- 不改 `DESIGN.md` / `SKILL.md` / `README.md`（这些是项目主文档，与介绍页重写解耦）
- 不重写 case 目录的样本文件
- 不增加 JS 框架或动画
- 不做多语言版本（保留中文）
- 不做 A/B 测试或多版本
