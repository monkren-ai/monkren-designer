# 计划：基于 HTML Effectiveness 优化审查报告展示

## 调研发现

### 参考来源

1. **[The Unreasonable Effectiveness of HTML](https://thariqs.github.io/html-effectiveness/)** — Claude 工程师 Thariq 的项目，展示 20 个自包含 `.html` 文件替代 Markdown 文字墙的案例
2. **推文** — 同一作者的推文推广，核心观点：AI 时代 Markdown 更适合机器读，HTML 更适合人读

### 核心洞察

HTML 报告相比 Markdown 的关键优势（与审查报告直接相关）：

| 维度 | Markdown 报告 | HTML 报告 |
|------|-------------|----------|
| **信息密度** | 长文档只能滚动阅读 | 折叠/标签页/跳转链接，扫读效率 3-5x |
| **视觉层级** | 靠标题和加粗 | 颜色编码、色块标签、空间布局 |
| **交互性** | 无 | 可折叠、可切换、可点击跳转 |
| **数据可视化** | 纯文本表格 | 内联图表、进度条、色块映射 |
| **空间信息** | 扁平化丢失 | 保留空间关系（流程图、风险地图） |

### 最相关的参考案例

| 案例 | 可借鉴到审查报告的元素 |
|------|---------------------|
| **Annotated PR** (03) | 严重度色块标签（safe/worth a look/needs attention）、行内批注、跳转链接 |
| **Status Report** (11) | 顶部关键指标卡片、内联柱状图、彩色时间线 |
| **Incident Report** (12) | 分钟级时间线、影响统计表、行动项清单带负责人 |
| **Design System** (05) | 颜色色块（swatches）、字体阶梯可视化、间距可视化 |
| **Component Variants** (06) | 组件状态矩阵、单页对比视图 |

### 项目现状

- 当前审查报告仅输出 Markdown（`.monkren/reviews/{project}-{date}/review-report.md`）
- `design-improve` 和 `design-brainstorm` 子 skill 已有 HTML 报告生成（自包含单文件 + 内联 CSS），但样式简单
- SKILL.md 中有完整的 Markdown 报告模板（三层递进：结论层 → 诊断层 → 行动层）
- 评分提升建议文档也仅 Markdown

## 变更范围

### 新增内容

1. **HTML 审查报告模板** — 自包含 `.html` 文件，替代/补充 Markdown 报告
2. **HTML 评分提升建议模板** — 自包含 `.html` 文件
3. **HTML 设计建议报告模板** — 自包含 `.html` 文件
4. **SKILL.md 更新** — 报告持久化规则新增 HTML 输出、报告格式选择新增 HTML 选项
5. **implementation.md 更新** — 新增 HTML 报告生成流程和规范

### 不变更

- Markdown 报告模板保留（作为降级方案和机器可读格式）
- 审查工作流步骤不变
- 评分标准不变

## 实施步骤

### Step 1: 更新 SKILL.md — 报告持久化规则扩展

在 §1.3 报告持久化中：

- 文件命名规则表新增 HTML 文件行：

| 报告类型 | Markdown 文件 | HTML 文件 |
|---------|-------------|----------|
| 完整报告 | `review-report.md` | `review-report.html` |
| 快速报告 | `review-report.md` | `review-report.html` |
| 设计建议报告 | `design-suggestion.md` | `design-suggestion.html` |
| 评分提升建议 | `score-improvement.md` | `score-improvement.html` |

- 新增 HTML 报告生成规则：
  - 审查完成后同时生成 `.md` 和 `.html` 两种格式
  - `.md` 用于机器可读和版本对比，`.html` 用于人类阅读和分享
  - HTML 报告在浏览器中打开（`open review-report.html`）

- 报告格式确认选项更新：
  - 完整报告（.md + .html）
  - 快速报告（.md + .html）
  - 设计建议报告（.md + .html）

### Step 2: 更新 SKILL.md — 新增 HTML 审查报告模板

在审查报告模板章节后新增 HTML 审查报告模板规范，定义 HTML 报告的视觉和交互规范：

**结论层 HTML 增强**：
- 总体评分用大字号 + 颜色编码（红/橙/黄/绿映射 1-10 分）
- P0/P1/P2 问题数用色块标签（红/橙/蓝）
- 雷达图用交互式 SVG（hover 显示具体分数）
- 关键 Quick Win 用高亮卡片

**诊断层 HTML 增强**：
- 5 维度评分用进度条 + 颜色编码（替代纯文本表格）
- 专项检测总览用状态色块（✅绿 / ⚠️橙 / ❌红）
- 可折叠的详情区域（点击展开/收起）

**行动层 HTML 增强**：
- Fix 清单用严重度色块标签（P0 红 / P1 橙 / P2 蓝）
- 工作量用标签（Quick Win 绿 / 小修 / 中修 / 大修）
- 依赖关系用跳转链接
- 硬编码值检测详情用颜色色块（swatches）可视化
- 参考截图用缩略图 + 点击放大

**全局 HTML 规范**：
- 自包含单文件（内联 CSS + 内联 JS，零外部依赖）
- 系统字体栈（`-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`）
- 最大宽度 960px，居中布局
- 暗色/亮色模式支持（`prefers-color-scheme`）
- 可折叠区块用 `<details>/<summary>`（无需 JS）
- 跳转链接用锚点 `#fix-1`、`#dimension-philosophy`

### Step 3: 更新 SKILL.md — 新增 HTML 评分提升建议模板

定义评分提升建议 HTML 报告的视觉规范：

- 评分总览用雷达图 + 进度条对比（当前 vs 目标）
- 提升难度用颜色编码（低=绿 / 中=橙 / 高=红）
- 提升路线图用时间线可视化（替代纯文本表格）
- 每个提升步骤可展开查看详情

### Step 4: 更新 SKILL.md — 新增 HTML 设计建议报告模板

定义设计建议 HTML 报告的视觉规范：

- 3 个方向建议用卡片布局（并排对比）
- 每个方向卡片含视觉特征色块 + 关键改动列表
- 优先级排序用序号标签

### Step 7: 更新 references/implementation.md — HTML 报告生成流程与示例

在 Step 5.5 报告持久化中新增 HTML 生成流程：

1. 生成 Markdown 报告（机器可读）
2. 基于 Markdown 内容生成 HTML 报告（人类可读）
3. HTML 报告引用参考截图使用相对路径
4. 在浏览器中打开 HTML 报告

新增 HTML 报告生成规范：
- 内联 CSS 样式规范（颜色系统、字体系统、间距系统、组件样式）
- 内联 JS 交互规范（折叠/展开、标签切换）
- SVG 雷达图交互规范
- 颜色色块（swatches）渲染规范
- 严重度标签渲染规范

新增 HTML 审查报告示例（基于现有示例 1 落地页审查），引用 case/ 目录中的示例文件作为视觉参考。

### Step 6: 在 case/ 目录新增 HTML 报告示例

在 `/case/` 目录新增 3 个自包含 HTML 示例文件，直接可在浏览器中打开预览，作为 SKILL.md 和 implementation.md 中 HTML 报告模板的视觉参考。

#### 6.1 `case/Design Review — Landing Page.html`

基于现有 implementation.md 示例 1（落地页审查），生成完整的 HTML 审查报告示例。

**结构**：
- **Header**：项目名 + 审查日期 + 总体评分（大字号 + 颜色编码 6.6/10 橙色）
- **Summary Band**：4 个 stat-card（P0 问题数 / P1 问题数 / 硬编码值 / Quick Win 数）
- **雷达图**：5 维度 SVG 雷达图（交互式 hover）
- **诊断层**：5 维度评分进度条 + 颜色编码 + 可折叠详情
- **专项检测总览**：状态色块（✅/⚠️/❌）
- **行动层**：Fix 清单（严重度色块标签 + 工作量标签 + 锚点跳转）
- **硬编码值检测**：颜色色块（swatches）可视化
- **Footer**：生成时间 + 文件路径

**视觉风格**：参考 case/ 中 Birchline 系列的 CSS 变量系统（ivory/slate/clay/oat 色系），但使用 monkren-design 自身的品牌色系。

#### 6.2 `case/Score Improvement — Landing Page.html`

基于同一落地页审查，生成评分提升建议 HTML 示例。

**结构**：
- **Header**：项目名 + 当前评分 → 目标评分（6.6 → 8.2）
- **评分总览**：5 维度对比进度条（当前 vs 目标）+ 差距 + 提升难度色块
- **各维度提升路径**：可折叠卡片，每个含核心差距 + 步骤列表（Quick Win/小修/中修标签 + 预期提升 + 依赖）
- **提升路线图**：时间线可视化（替代纯文本表格）
- **维持建议**：8+ 维度注意事项

#### 6.3 `case/Design Suggestion — Landing Page.html`

基于同一落地页审查，生成设计建议 HTML 示例。

**结构**：
- **Header**：项目名 + 审查日期
- **3 方向卡片**：并排对比布局，每个含方向名 + 视觉特征色块 + 关键改动列表 + 优先级标签
- **推荐方向**：高亮推荐 + 理由

### Step 7: 更新总结规则

总结规则新增 HTML 报告路径提示：

```
📄 报告已保存：.monkren/reviews/{project}-{date}/review-report.md
🌐 HTML 报告：.monkren/reviews/{project}-{date}/review-report.html
📊 评分提升建议：.monkren/reviews/{project}-{date}/score-improvement.md / .html
```

## 关键设计决策

1. **双格式输出**（.md + .html）而非仅 .html — Markdown 保留用于 git diff、搜索索引、机器解析；HTML 用于人类阅读
2. **自包含单文件** — 零外部依赖，可离线打开，可邮件分享
3. **渐进增强** — 基础内容用语义 HTML（`<details>/<summary>`、锚点），交互用最少 JS
4. **颜色编码系统** — 评分/严重度/状态统一使用颜色映射，降低认知负荷
5. **可折叠详情** — 结论层默认展开，诊断层/行动层详情默认折叠，按需展开

## 风险与缓解

| 风险 | 缓解 |
|------|------|
| HTML 模板过长导致 token 消耗大 | 模板写在 references/ 中，SKILL.md 仅引用；生成时按需组装 |
| 不同审查类型需要不同 HTML 结构 | 定义通用布局 + 条件区块（全流程审查时显示页面遍历等） |
| 浏览器兼容性 | 使用标准 HTML5/CSS3，避免实验性特性 |
