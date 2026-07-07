# 审查 · 提升 · 拓展：Monkren 自身项目设计哲学计划

> 范围：Monkren Design 自身的设计哲学体系（`DESIGN.md` 设计系统 + `index.html` 落地页），不涉及 80 种外部设计哲学库（`references/philosophy.md` 已按 2026-07-03 记录完成扩展）。
> 目标：修复既有审查缺陷、统一自身哲学表达、补充缺失的设计原则章节，使项目自身的“Graphic Monochrome Canvas”哲学从文档到页面一致落地。

---

## 一、当前状态分析

### 1.1 已有基础

| 文件 | 当前状态 | 关键内容 |
|------|----------|----------|
| `DESIGN.md` | 已建立 | 颜色/字体/间距/圆角 token、PrimaryButton / SecondaryButton / Tag / ContentCard 组件、页面布局规范 |
| `index.html` | 已落地但存在缺陷 | 单文件 2662 行，呈现 Hero / Skills / Capabilities / Philosophy Library / Case Gallery / Dimensions / Workflow / References / Footer |
| `.trae/documents/monkren-designer-deep-review-report.md` | 已发布 | 自评综合 6.8/10，指出 P0/P1/P2 级问题 |

### 1.2 已识别的关键问题（来自 deep-review-report）

| 优先级 | 问题 | 位置 | 影响 |
|--------|------|------|------|
| **P0** | 文件尾部存在 4 组重复闭合标签 `</body></html>` | `index.html` L2649-L2662 | 浏览器容错仍可渲染，但结构性致命，会导致 HTML 验证器/提取脚本失败 |
| **P1** | `.sig-monogram` / `.monogram-org` / `.monogram-name` 在 HTML 中使用 40 处，但 CSS 未定义 | `index.html` L1534 等 | monogram 标签回退到浏览器默认样式，破坏卡片精致度 |
| **P1** | `.sig-bitmap` 使用硬编码 `max-width: 240px` | `index.html` L667 | 未走 token，破坏设计系统纪律 |
| **P2** | 存在 4 处 inline style（能力卡片链接、terminal 面板条） | `index.html` L1483 / L1498 / L1503 / L2610 | 不利于复用和维护 |
| **P2** | 死 CSS：`.philosophy-card .signature svg` 仍存在 | `index.html` L679-L683 | 哲学签名已全面改用 `<img>`，应删除 |
| **P2** | 可能未使用的 token：`--signature-size: 40px` | `index.html` | 原服务于 SVG，现仅被死 CSS 引用 |

### 1.3 自身设计哲学的文档缺口

`DESIGN.md` 虽已覆盖 token 与组件，但缺少以下“自身哲学”表达：

- **设计价值观清单**：除“纯黑白高对比、无圆角”外，没有明确的设计信念（如反 AI slop、系统优先、上下文出发等已在 `references/philosophy.md` 中阐述，但未沉淀到自身设计系统）。
- **哲学到执行的映射**：没有说明“Graphic Monochrome Canvas”如何指导具体决策（例如：为何禁用阴影？为何只用 400 字重？）。
- **审查原则自述**：没有说明 Monkren 如何审查自身产出，与 `references/review-perspectives.md` 的 10 维度框架缺少衔接。
- **演化记录**：缺少版本/变更日志，无法追踪设计系统为何如此定义。

---

## 二、 proposed changes

### Phase 1：修复审查缺陷（提升）

#### 1.1 修复 P0 HTML 结构损坏

- **文件**：`index.html`
- **操作**：删除尾部多余的 3 组 `</body></html>`，只保留一组正确闭合。
- **依据**：`monkren-designer-deep-review-report.md` §1.3 / §2.3
- **验证**：`xmllint --html` 或 W3C 验证器无重复闭合错误；浏览器开发者工具 Elements 面板结构正常。

#### 1.2 补充缺失的 `.sig-monogram` 样式

- **文件**：`index.html`（CSS 区域）
- **操作**：
  - 为 `.sig-monogram` 定义定位与排版样式，使其覆盖在 `.sig-bitmap` 图片上作为字母组合标签。
  - 为 `.monogram-org` 定义小写/大写品牌名样式。
  - 为 `.monogram-name` 定义大写首字母样式。
- **设计约束**：
  - 仅使用 `--color-canvas-black`、`--color-arctic-white`、`--color-subtle-gray`。
  - 字体走 `--font-black-tie` 或 `--font-lausanne`。
  - 不使用圆角（除 pill 外）。
- **依据**：deep-review-report §2.1 / §2.2
- **验证**：40 处 monogram 在视觉上一致，hover 时图片变彩色而标签可读性不丢失。

#### 1.3 将 240px 硬编码改为 token

- **文件**：`index.html`
- **操作**：
  - 在 `:root` 新增 `--image-size: 240px`。
  - 将 `.sig-bitmap` 的 `max-width: 240px` 替换为 `max-width: var(--image-size)`。
- **依据**：deep-review-report §2.1
- **验证**：页面渲染无变化；grep `240px` 在 CSS 中只剩 token 定义。

#### 1.4 清理 inline style 与死 CSS

- **文件**：`index.html`
- **操作**：
  - 将 4 处 inline style 抽成类或复用已有 `.inline-link` / `.chip` 组件。
  - 删除 `.philosophy-card .signature svg` 死 CSS。
  - 检查 `--signature-size: 40px` 是否仍有使用，若无则删除。
- **依据**：deep-review-report §2.3
- **验证**：grep `style="` 在 HTML 中只剩合法用途（如 SVG 必要时）；`--signature-size` 无残留引用。

---

### Phase 2：统一并深化自身设计哲学（提升）

#### 2.1 在 `DESIGN.md` 增加“设计价值观”章节

- **文件**：`DESIGN.md`
- **位置**：紧接“主题”描述之后
- **内容**：
  - **上下文优先**：设计必须从已有 design system / UI kit / 品牌规范长出来。
  - **反 AI slop**：识别并剔除训练语料中常见的视觉最大公约数。
  - **系统优先，不要填充**：每个元素必须 earn its place，警惕 data slop / iconography slop / gradient slop。
  - **Placeholder > 烂实现**：诚实占位优于拙劣模仿。
  - **品牌的哲学：被认出来**：Logo > 产品图 > UI 截图 > 色值 > 字体。
- **依据**：`references/philosophy.md` §1.1-1.5 是 Monkren 的审查信念，应沉淀到自身系统。
- **验证**：新章节与 `references/philosophy.md` 核心论述一致，不重复、不矛盾。

#### 2.2 增加“哲学到执行的决策映射”章节

- **文件**：`DESIGN.md`
- **内容**：
  - 为什么颜色只有 Canvas Black / Arctic White / Subtle Gray？→ 为了把视觉焦点让给排版与内容。
  - 为什么零圆角？→ 几何诚实，避免装饰性柔和。
  - 为什么只用 400 字重？→ 层级通过字号与间距解决，不靠字重变化。
  - 为什么 1px 边框？→ 作为交互与结构的核心视觉提示。
  - 为什么本地图片 + 黑白高对比 + hover 彩色？→ 保证可访问性与品牌识别度的统一。
- **验证**：每条规则都能在 `index.html` 中找到对应实现。

#### 2.3 增加“自我审查清单”章节

- **文件**：`DESIGN.md`
- **内容**：
  - 引用 `references/review-perspectives.md` 的 10 维度框架。
  - 列出 Monkren 自身产出的最小审查项：
    - 颜色是否全部走 token？
    - 字体是否全部走 `--font-*`？
    - 间距是否 4/8 倍数？
    - 是否有 inline style？
    - 是否有死 CSS？
    - HTML 结构是否合法？
    - 图片是否本地、240×240、JPEG？
- **验证**：清单可被直接用于审查 `index.html` 与 `DESIGN.md` 自身。

---

### Phase 3：拓展自身设计哲学表达（拓展）

#### 3.1 在 `index.html` 增加“设计哲学声明”区域

- **文件**：`index.html`
- **位置**：建议放在 `#capabilities` 之后、`#philosophy-library` 之前，id 为 `#monkren-philosophy`
- **内容**：
  - 用 1-2 句话声明 Monkren 自身的设计哲学（Graphic Monochrome Canvas）。
  - 用 3-4 个信条卡片展示核心价值观（上下文优先 / 反 AI slop / 系统优先 / Placeholder > 烂实现）。
  - 视觉上使用已有 `.card` / `.grid-4` 组件，不引入新样式。
- **依据**：`DESIGN.md` §主题 + `references/philosophy.md` §1
- **验证**：新区域与页面整体视觉一致，不增加新的颜色/圆角/字体。

#### 3.2 在 `DESIGN.md` 增加“变更日志”附录

- **文件**：`DESIGN.md`
- **内容**：
  - 记录设计系统关键决策与版本：
    - v1.0：建立 Graphic Monochrome Canvas 主题，定义 3 色 token、Lausanne/Victor Serif/Black Tie 字体、4px 间距系统。
    - v1.1：引入 80 种设计哲学库卡片，本地图片策略，黑白高对比 + hover 彩色。
    - v1.2（本计划）：修复结构缺陷，沉淀设计价值观，增加自我审查清单。
- **验证**：日志日期与项目实际提交历史一致。

#### 3.3 更新 `README.md` 与 `README.en.md` 的哲学描述

- **文件**：`README.md`、`README.en.md`
- **操作**：检查并同步“自身设计哲学”描述，确保与 `DESIGN.md` 一致。
- **验证**：两份 README 中关于设计哲学的段落无过时信息。

---

## 三、实施顺序与依赖

| 阶段 | 任务 | 依赖 | 预计关键产出 |
|------|------|------|--------------|
| Phase 1 | 修复 HTML/CSS 缺陷 | 无 | `index.html` 结构合法、样式完整 |
| Phase 2 | 深化 `DESIGN.md` | Phase 1 完成（避免在损坏基础上写文档） | `DESIGN.md` 含价值观、决策映射、审查清单 |
| Phase 3 | 拓展页面与文档 | Phase 2 完成（价值观先定稿再落地页面） | `index.html` 新增哲学声明区域、`DESIGN.md` 变更日志、README 同步 |

---

## 四、假设与决策

1. **不涉及 80 种外部设计哲学库**：`references/philosophy.md` 已在 2026-07-03 完成 17 流派 × 80 种扩展，本次聚焦 Monkren 自身设计哲学。
2. **不引入新依赖或框架**：保持单文件 `index.html` + Markdown 文档的现有架构。
3. **不修改视觉方向**：颜色、字体、圆角、间距继续严格遵循 `DESIGN.md` 现有 token。
4. **图片策略不变**：若新增区域需要图片，仍使用本地 240×240 JPEG，默认 grayscale + hover 彩色。
5. **先修复后拓展**：先解决 deep-review-report 中的 P0/P1 问题，再基于稳定基础进行内容与文档扩展。

---

## 五、验证步骤

### 5.1 技术验证

- [ ] `index.html` 通过 HTML 结构检查：无重复 `</body></html>`。
- [ ] 浏览器开发者工具 Elements 面板结构正常。
- [ ] `.sig-monogram` 在 40 张哲学卡片上样式一致、可读。
- [ ] grep 确认无新增 inline style、无死 CSS、无 240px 硬编码（除 token 外）。
- [ ] 页面在 1440px / 920px / 560px 三档断点下无布局崩坏。

### 5.2 设计系统验证

- [ ] `DESIGN.md` 新增章节与 `references/philosophy.md` 核心信念一致。
- [ ] `DESIGN.md` 中每条“决策映射”都能在 `index.html` 找到对应实现。
- [ ] 新增 `#monkren-philosophy` 区域仅使用已有 token 与组件。

### 5.3 文档一致性验证

- [ ] `README.md` 与 `README.en.md` 中关于设计哲学的描述与 `DESIGN.md` 同步。
- [ ] `DESIGN.md` 变更日志日期与项目实际状态一致。
