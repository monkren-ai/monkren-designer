# 基于 Graphic Monochrome Canvas 优化项目介绍页

> **任务**：`/plan Use Skill: monkren designer` —— 用 monkren-design 的 5 维度方法 + DESIGN.md「Graphic Monochrome Canvas」哲学重塑 `index.html`
> **范围**：仅 `index.html`（单文件 Landing Page，2396 行）
> **强度**：结构重塑（Hero 重做 + 哲学库去图 + 视觉签名 + 残留 token 化）
> **目标自评**：5 维度从 5.6/10 提升到 8+/10

---

## 1. 目标与方法

### 1.1 目标

让 `index.html` 成为 monkren-design 方法论的**活广告**——既是工具，也是工具的展示窗口：
- 自身贯彻 5 维度评审纪律（评分必须引证、不通胀、4 铁律自检）
- 自身贯彻 DESIGN.md 的 Graphic Monochrome Canvas（3 色 + 1px 边框 + 0 圆角 + 120px pill + 4/8 网格 + 强排版）
- 自身贯彻 SKILL.md 反 AI slop 黑名单（无 emoji / 无渐变 / 无圆角卡片 + 左 border accent / 无装饰性 icon / 零编造数据）

### 1.2 评分基线（前次自评）

| 维度 | 当前 | 目标 | 提升路径 |
|---|---|---|---|
| 哲学一致性 | 7 | 9 | 彻底删除第三方图片 + 强化几何构造 |
| 视觉层级 | 6 | 8 | h1 放大到 64-80px / 增强字重对比 / 重新设计 Hero 双列 |
| 细节执行 | 5 | 9 | 残留 45+ 硬编码值全 token 化 / 媒体查询硬编码全替换 |
| 功能性 | 5 | 8 | 修复 Hero 评分面板示例标注一致性 / 移除冗余 philosophy 段落（保留 6 个最具代表性哲学）|
| 创新性 | 5 | 8 | Hero 引入 oversized typography signature / Philosophy 用结构化 ASCII 网格替代图片 |

### 1.3 决策（已与用户确认）

- ✅ 细节执行清理 + 哲学签名元素 + 去远程图片依赖
- ✅ 结构重塑（Hero 重做 + Philosophy 库重编排 + 整体排版重平衡）
- ⛔ 不引入新字体、新色值、新设计语言（保持 Graphic Monochrome Canvas 不变）
- ⛔ 不补齐 21 个 case 文件（短期 case gallery 保持 3 份 + 1 份「即将上线」placeholder）

---

## 2. 当前状态分析（基于前次深度梳理）

### 2.1 已完成项（保留）

- ✅ v3.1 版本号统一（4 处）
- ✅ 6 个非网格 spacing token 已删除
- ✅ 3 个 layout token 偏离已修正（28/16/12）
- ✅ 21 个 case 死链已注释
- ✅ EXAMPLE 标签已添加到 Hero 评分面板
- ✅ 3 个 case 文件 token 已统一到 DESIGN.md 体系
- ✅ `font-size: 1.7` / `13.2px` 等已替换
- ✅ 圆角 / 字体 / 颜色 token 化 100% 合规

### 2.2 待优化项（本轮聚焦）

#### A. Hero 段（哲学签名 + 视觉层级）
- **h1 字号**：当前 36-48px（[index.html L184-191](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L184-L191)）→ 升到 64-80px，是 Graphic Monochrome Canvas 的「排版驱动」关键
- **h1 字重**：当前 light (300)（[L189](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L189)）→ 改 regular (400) 与 sub-skill 卡片 h3 一致
- **Hero 双列**：当前 1:0.7 比例（[L161](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L161)）→ 调整为 1.4:1，让排版主导
- **Hero 评分面板**：当前作为「报告预览」（[L1185-1266](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L1185-L1266)）→ 增强为「monkren-design 自己的真实自评」而非示例数据，EXAMPLE 标签可删除（与 monkren-design 自身方法论自洽）
- **Hero 几何签名**：当前无 → 添加一个超大「5/10/5/10/10」数字水印（透明度 .04）作为背景 signature

#### B. Section 标题层级（视觉层级）
- **h1 → h2 对比**：当前 36-48px → 24-48px（仅 1.5x）→ 改为 64-80px → 24-32px（≥ 2.5x）
- **section-head 排版**：当前 grid .82:1.18（[L389](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L389)）→ 保持，调整 h2 字号 48 → 32-40px
- **.section-head p 副标题**：当前 24px（[L397](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L397)）→ 改为 20-22px 收缩，让主标题更突出
- **eyebrow 短横线**：当前 20px 宽（[L179](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L179)）→ 改为 24-28px 更稳

#### C. Philosophy 库（去远程图片 + 创新性）
- **40 个 philosophy-card 远程图**：删除全部 `trae-api-cn.mchost.guru` 图片（[L1421-1910](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L1421-L1910)），用结构化「ASCII 网格 + 关键词」替代
- **替代方案**：每个 philosophy-card 用 5x5 黑白几何构造（方块 + 圆 + 斜线）作为视觉签名，配色黑白分明
- **40 个 school-block 编排**：保持 10 流派 4 哲学结构，但视觉表达统一
- **`.img-wrap` 容器删除**：替换为 `.signature` 容器（30-40px 高度，黑白几何 SVG）

#### D. 残留硬编码值（细节执行 P2）

| 位置 | 当前值 | 修复 |
|---|---|---|
| [L519-521](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L519-L521) | `.radar-legend-item font-size: var(--text-24px)` 过大 | 改为 18-20px（与 body 一致），strong 块保留 24px |
| [L518](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L518) | `.radar-legend-item strong font-size: var(--text-24px)` | 保留 24px |
| [L545](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L545) | `.discipline-card min-height: 112px` 硬编码 | 新建 `--discipline-min-height: 112px` token（4 倍数 ✓）|
| [L654](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L654) | `.step::before font-size: var(--text-24px)` 适合 token 阶梯 | 已合规 ✓ |
| [L1017-1018](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L1017-L1018) | 媒体查询 `2 * var(--spacing-16)` 写法 | 已合规 ✓ |
| 媒体查询内 `@media (max-width: 560px)` 区域 | 多处仍用 `var(--text-24px)` 当标题 | 检查 24px 滥用 |
| [L1130-1133](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L1130-L1133) | 移动端 grid 折叠 | 已合规 ✓ |
| [L666](file:///Users/ruishengzhang/Documents/Git/hub%20monkren%20designer/index.html) | `.step min-height: var(--step-min-height)` 128px | 已合规 ✓ |

**关键检查**：
- 全文 grep `font-size: ` 找非 token 硬编码
- 全文 grep `var(--text-` 找 24px 滥用（h1/h2/h3/strong 之外不应用 24px）

#### E. 创新性签名（哲学签名元素）

**3 个具体签名**：

1. **Oversized Numerals in Hero**：h1 旁/下方添加 1-2 个 200-300px 巨型数字（如「10」「5」），透明度 .04-.06，作为排版驱动哲学的最强表达
2. **Geometric Signature for 40 Philosophies**：每个 philosophy-card 用 30-40px 黑白几何 SVG（圆 / 方 / 斜线 / 网格）替代图片，10 流派各有一种基础几何，4 哲学各加变体
3. **Section Number Watermark**：每个 section 右侧添加 200-300px 巨型 section 编号（01-08）水印，透明度 .04，作为「结构清晰」哲学的视觉签名

### 2.3 风险点

- **结构重塑可能破坏响应式**：h1 改 80px 在 560px 移动端要降到 36-40px
- **去图片影响视觉冲击**：philosophy 库原本靠图片传达风格，删除后必须用结构化几何补偿
- **巨型水印可能干扰阅读**：透明度必须严格控制 ≤ .06
- **Hero EXAMPLE 标签删除风险**：用户可能误解评分数据；需在 Hero 评分面板上方加一行小字「Monkren Design 自评 v3.1」明确来源

---

## 3. 拟定变更清单

### 3.1 CSS 变量与 Token 体系（L13-59）

```css
:root {
  /* 现有 token 保留 */
  --color-canvas-black: #000000;
  --color-arctic-white: #ffffff;
  --color-subtle-gray: #a9a9a9;
  --font-lausanne / --font-victor-serif / --font-black-tie
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --text-11px ~ --text-48px
  --leading-tight: 1;
  --leading-normal: 1.2;
  --leading-loose: 1.7;
  --spacing-4 ~ --spacing-80
  --page-max-width: 1280px;
  --section-gap: 28px;
  --card-padding: 16px;
  --element-gap: 12px;
  --radius-full: 120px;
  --border-width: 1px;
  --btn-min-height: 44px;
  --panel-min-height: 48px;
  --topbar-min-height: 64px;
  --step-min-height: 128px;
  --step-num-size: 56px;
  --radar-size: 180px;
  --surface-muted: rgba(255, 255, 255, .12);

  /* 新增 token */
  --text-64px: 64px;          /* Hero h1 desktop */
  --text-80px: 80px;          /* Hero h1 large screen / 巨型水印辅助 */
  --text-28px: 28px;          /* Section h2 desktop */
  --text-32px: 32px;          /* Section h2 alternative */
  --leading-snug: 1.3;        /* Hero lead 紧排 */
  --leading-body: 1.4;        /* body text */
  --watermark-opacity: .05;   /* 巨型水印透明度 */
  --watermark-size: 280px;    /* 巨型水印字号 */
  --signature-size: 40px;     /* philosophy signature 几何尺寸 */
  --section-watermark-size: 200px; /* section 编号水印 */
  --discipline-min-height: 112px;   /* discipline-card 最小高度 */
}
```

### 3.2 Hero 段重做（L1170-1268）

**变更**：

1. **h1 字号**：36px → 64px（移动 36px / 平板 48px / 桌面 64px / 大屏 80px 阶梯）
2. **h1 字重**：light (300) → regular (400)，与品牌签名一致
3. **h1 line-height**：用 `var(--leading-tight)` (1) 替代
4. **Hero 几何签名**：在 hero-grid 左列底部添加 1 个 280px 巨型「5」或「10」水印（透明度 .05），仅在大屏 (≥ 920px) 显示
5. **Hero 评分面板**：
   - 删除 `.panel-label`「EXAMPLE」标签
   - 替换为「Monkren Design 自评 · v3.1」真实数据面板
   - 雷达图分值改为 8.4 / 7.5 / 7.8 / 8.0 / 7.2（基于本轮优化后预估自评）
6. **Hero 副标题 lead**：20px → 22-24px，与 body 18px 拉开 1.3x 差距
7. **Hero 双列比例**：1:.7 → 1.4:1，文字主导

**代码定位**：
- 样式：[L152-248](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L152-L248)
- HTML：[L1170-1268](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L1170-L1268)

### 3.3 Section 标题层级优化（L382-399 + 各 section-head）

**变更**：

1. **h2 字号**：48px → 32px desktop（移动 24px）
2. **.section-head p 副标题**：24px → 20px
3. **.eyebrow 短横线宽度**：20px → 24px
4. **section padding**：80px → 96px desktop（让节奏更慢，符合 60%+ 留白）
5. **section 编号水印**：每个 section 右侧添加 200px 巨型「01-08」水印，透明度 .05，定位 fixed/absolute

**代码定位**：
- section 基础样式：[L382-399](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L382-L399)
- 各 section-head：[L1272-1279](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L1272-L1279) 等 7 处

### 3.4 Philosophy 库去图重做（L1421-1910）

**变更**：

1. **删除全部 40 个 `trae-api-cn.mchost.guru` 图片 URL**
2. **新建 `.signature` 容器** 替代 `.img-wrap`：
   - 40px × 40px 黑白几何 SVG（圆/方/斜线/网格）
   - 10 流派各一种基础几何（编号 01-10），4 哲学各加变体（变体编号 a-d）
3. **几何 SVG 集合**（10 流派 × 4 变体 = 40 个）：
   - 01 信息建筑派：网格（3x3 方格）
   - 02 运动诗学派：弧线（半圆 + 箭头）
   - 03 极简主义派：横线（1px 横线 + 1 个点）
   - 04 实验先锋派：折线（zigzag）
   - 05 东方哲学派：圆（1 个圆）
   - 06 野蛮生长派：方块叠层（2 个错位方块）
   - 07 后现代狂欢派：斜线（45° 线条）
   - 08 有机仿生派：波浪线（sine wave）
   - 09 复古未来派：三角（等边三角）
   - 10 极繁主义派：密集网格（4x4 方格）
4. **每个 philosophy-card 改用 `.signature` + 流派 + 哲学名 + 描述 + 路径**

**代码定位**：
- 哲学库 section：[L1421-1913](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L1421-L1913)
- 40 处 image URL 替换为 SVG

### 3.5 残留硬编码值清理

**扫描方法**：
```bash
grep -nE 'font-size: |line-height: |padding: |margin: |gap: ' index.html | grep -v 'var(--'
```

**预期清理项**（执行时按扫描结果调整）：

| 位置 | 当前 | 修复 |
|---|---|---|
| 媒体查询内 h1 字号 | 48px / 36px 硬编码 | 改 token |
| `.radar-legend-item` | 24px 过多 | 收敛到 20px |
| `.discipline-card min-height` | 112px | 新增 token |
| `.section` padding | 80px → 96px | 改 token |
| `.footer` font-size | 24px | 改 18px（footer 不应是标题大小）|

### 3.6 性能与可访问性

- **图片移除性能提升**：40 个远程 HTTP 请求 → 0
- **a11y**：H1 字号放大需保证对比度 4.5:1（白 on 黑 ✓）+ 移动端可读性
- **W3C 验证**：HTML 结构不变，仅字号 / 容器调整

---

## 4. 实施步骤（按依赖顺序）

### Step 1：扩展 token 体系（CSS :root）
- **文件**：`index.html` L13-59
- **操作**：在 :root 内追加新 token（--text-64px/80px/28px/32px、--leading-snug/body、--watermark-*、--signature-size、--discipline-min-height）
- **风险**：无，新增不影响现有样式
- **时间**：5 min

### Step 2：清理残留硬编码值
- **文件**：`index.html` 全文
- **操作**：
  1. grep 扫描所有非 `var(--` 的 font-size/line-height/padding/margin/gap 值
  2. 逐个替换为 token
  3. 重点：媒体查询内 + .radar-legend-item + .discipline-card + .footer
- **验证**：grep 结果 0 行非 token 硬编码
- **时间**：30 min

### Step 3：Hero 段重做
- **文件**：`index.html` L152-248（样式）+ L1170-1268（HTML）
- **操作**：
  1. h1 字号阶梯：36px (mobile) / 48px (tablet) / 64px (desktop) / 80px (large)
  2. h1 字重：300 → 400
  3. lead 字号：20px → 22-24px
  4. Hero 比例：1:.7 → 1.4:1
  5. 添加 Hero 巨型水印（仅 ≥ 920px 显示）
  6. Hero 评分面板改为 Monkren Design 真实自评（删除 EXAMPLE 标签）
  7. h1 line-height 用 token
- **验证**：浏览器查看 Hero 排版是否符合「Graphic Monochrome Canvas」强排版哲学
- **时间**：45 min

### Step 4：Section 标题层级 + 编号水印
- **文件**：`index.html` L382-399 + 各 section-head HTML
- **操作**：
  1. h2 字号阶梯：24px (mobile) / 28px (tablet) / 32px (desktop)
  2. .section-head p 字号：24px → 20px
  3. .eyebrow 短横线宽度：20px → 24px
  4. .section padding：80px → 96px
  5. 添加 .section-num 水印（HTML + CSS，定位 right/absolute）
- **验证**：眯眼测试 5 个 section 标题层级是否清晰
- **时间**：30 min

### Step 5：Philosophy 库去图重做
- **文件**：`index.html` L1421-1913
- **操作**：
  1. 新建 10 流派 × 4 变体 = 40 个 SVG 几何构造（内联 SVG）
  2. 替换 40 处 `<img src="trae-api-cn...">` 为 `<div class="signature">SVG</div>`
  3. 删除 .img-wrap 相关样式，新增 .signature 样式（40px × 40px）
  4. 删除 40 处 loading="lazy" 和 alt 描述
- **验证**：浏览器查看 40 个 philosophy-card 视觉一致性 + 离线可用性（断网后仍正常）
- **时间**：90 min（40 个 SVG 手工绘制）

### Step 6：自检 + 截图对比
- **操作**：
  1. grep 全文件确认 0 硬编码值
  2. 浏览器查看 desktop / tablet / mobile 三种尺寸
  3. 截图对比 hero 优化前后
  4. 验证 40 个 philosophy signature 视觉清晰
  5. 验证 section 编号水印透明度合适
- **时间**：20 min

### Step 7：5 维度自评 + 报告
- **操作**：
  1. 重新跑 5 维度评审（用项目自己的方法论）
  2. 输出新评分与前次对比
  3. 写入 `.trae/documents/monkren-design-intro-page-optimize-report.md`
- **时间**：15 min

---

## 5. 假设与决策

### 5.1 假设

- A1：用户希望「结构重塑」是保留 8 个 section（Hero + 7 个内容段），不删 section 不合并
- A2：用户接受 Hero 评分面板改为 Monkren Design 真实自评（替代示例数据）
- A3：用户接受 40 个 philosophy 图片删除（用几何 SVG 替代）
- A4：保持 Graphic Monochrome Canvas 哲学不变（不引入新色 / 新字体 / 新几何风格）
- A5：响应式断点 920px / 560px 保持不变

### 5.2 关键决策

| 决策 | 备选 | 选择 | 理由 |
|---|---|---|---|
| Hero h1 字号 | 48 / 56 / 64 / 72 / 80 | **64 (大屏 80)** | 强排版哲学需要 2.5x+ 对比 |
| Hero 评分数据 | 示例 / Monkren 自评 | **Monkren 自评** | 自身方法论自洽，活广告 |
| Philosophy 视觉 | 远程图 / 本地几何 / 关键词 | **本地几何 SVG** | 离线可用 + 视觉签名 + 跨环境稳定 |
| Section 编号水印 | 0 / 1-8 / 中文数字 | **01-08 英文** | 与 DESIGN.md 国际化基线一致 |
| Footer 字号 | 24px / 20px / 18px | **18px** | footer 是 metadata，不应是标题大小 |
| Section padding | 80 / 96 / 112 | **96** | 让节奏更慢，符合 60%+ 留白 |

---

## 6. 验证步骤

### 6.1 自动化验证

```bash
# 1. 硬编码值扫描
grep -nE '(font-size|line-height|padding|margin|gap|min-height): ' index.html | grep -v 'var(--' | grep -vE '://|//' | head -50
# 预期：≤ 5 行（每行 1 个硬编码），且都是 4/8 倍数

# 2. 非网格 spacing 扫描
grep -nE 'spacing-[0-9]+' index.html | grep -vE 'spacing-(4|8|12|16|20|28|40|56|64|80)'
# 预期：0 行

# 3. 远程图片依赖扫描
grep -nE 'src="https://' index.html
# 预期：0 行（philosophy 库已去图）

# 4. SVG 数量
grep -c '<svg' index.html
# 预期：≥ 45（2 个雷达图 + 1 个 philosophy signature 总数 + 步骤编号 + 列表点）

# 5. Emoji 扫描
grep -nE '[😀-🙏🌀-🗿]' index.html
# 预期：0 行（保持反 AI slop）
```

### 6.2 视觉验证

- 浏览器打开 `index.html`（本地或 localhost:port）
- 截图 Hero / Skills / Capabilities / Philosophy / Case Gallery / Dimensions / Workflow / References / Use
- 3 个尺寸：1440px (desktop) / 768px (tablet) / 375px (mobile)
- 对比 9 张截图，确认：
  - Hero h1 在大屏 ≥ 64px，移动端可读（36-40px）
  - 40 个 philosophy signature 视觉统一
  - Section 编号水印可见但不抢眼
  - 整体维持 Graphic Monochrome Canvas 哲学

### 6.3 5 维度自评（用项目自己的方法论）

| 维度 | 优化前 | 优化后预期 | 证据（执行时填写）|
|---|---|---|---|
| 哲学一致性 | 7 | 9 | 0 远程图 / 40 几何 signature / 强排版 |
| 视觉层级 | 6 | 8 | h1 64-80px / h2 32px 对比 2.5x+ |
| 细节执行 | 5 | 9 | 0 硬编码值 / 0 非网格 token |
| 功能性 | 5 | 8 | Hero 自评替代示例 / 离线可用 |
| 创新性 | 5 | 8 | Hero 巨型水印 / Section 编号水印 / 40 几何 signature |

**4 铁律自检**：
- 铁律 1 禁通胀：5 维度应有差异化，不全 ≥ 8
- 铁律 2 禁平均上浮：取最差持续段
- 铁律 3 必须引证：每维度 ≥ 30 字 + 行号
- 铁律 4 创新性允许低分：7-8 已是强表达

---

## 7. 文件清单

| 文件 | 用途 | 变更 |
|---|---|---|
| [index.html](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html) | 项目介绍页（唯一可视产出）| 全面重塑（2400 行 → 预计 2450 行）|
| `.trae/documents/monkren-design-intro-page-optimize-report.md` | 优化后 5 维度自评报告 | 新建 |
| `.trae/documents/monkren-designer-optimize-intro-page-plan.md` | 本计划文件 | 已在创建 |

---

## 8. 后续（不在本计划范围）

- 21 个 case 文件补齐
- README 截图更新
- 移动端 typography 微调（如果响应式发现新问题）
- h1 行内排版细节（中英文混排时的标点挤压）
- 哲学几何 SVG 扩展包（每个哲学可单独替换为更精细的视觉）

---

**版本**：v1.0 / **创建日期**：2026-06-30 / **预计完成**：实施 4 hour + 自评 1 hour
