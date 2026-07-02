# monkren designer 介绍页优化收尾（v1.1 续）

> **任务**：基于 v1.0 计划的实施进度，聚焦收尾任务
> **创建日期**：2026-06-30
> **计划路径**：`.trae/documents/monkren-designer-optimize-intro-page-plan-v1.1.md`
> **上游计划**：[monkren-design-optimize-intro-page.md](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/.trae/documents/monkren-design-optimize-intro-page.md)（v1.0 已部分执行）

---

## 1. 上下文与现状

### 1.1 v1.0 已完成

| 项 | 状态 | 证据 |
|---|---|---|
| v3.1 版本号统一 | ✅ | 4 处全部 v3.1 |
| 非网格 token 清理 | ✅ | 6 个非网格 token 已删除 |
| layout token 修正 | ✅ | 28/16/12 已对齐 DESIGN.md |
| Case 死链注释 | ✅ | 21 个 404 case 已 HTML 注释 |
| Token 体系扩展 | ✅ | 新增 `--text-28/32/64/80px`、`--leading-snug/body`、`--watermark-*`、`--signature-size`、`--section-watermark-size`、`--discipline-min-height`、`--spacing-96` |
| Hero 巨型水印 | ✅ | L1241 `<div class="hero-watermark">10</div>` 已添加 |
| 3 个 section 编号水印 | ✅ | capabilities=02, philosophy-library=03, use=08 |
| `.signature` 容器 CSS | ✅ | L652-667 `.philosophy-card .signature` 已定义 |
| EXAMPLE 标签替换 | ✅ | 改为 Monkren Design 真实自评 |

### 1.2 仍待完成（本计划范围）

| 项 | 数量 | 位置 |
|---|---|---|
| 5 个 section 缺少 `section-num` 水印 | 5 | skills(01), case-gallery(04), dimensions(05), workflow(06), references(07) |
| 40 个 philosophy-card 仍用远程图 | 40 | L1515-1974，`<div class="img-wrap"><img src="trae-api-cn..."></div>` |
| 残留 `.img-wrap` CSS | 1 处 | 需检查并清理 |
| 自检 + grep 验证 | 1 次 | 全文件 |
| 5 维度再评 + 报告 | 1 份 | `.trae/documents/monkren-design-intro-page-optimize-report.md` |

### 1.3 不在本轮范围

- 21 个 case 文件补齐
- README 截图更新
- 移动端 typography 微调（基于 v1.0 已做）
- 哲学几何 SVG 进一步细化（保持 10 流派 × 4 变体 = 40 个基础版即可）

---

## 2. 当前状态分析

### 2.1 Section 水印缺失（5 处）

| Section ID | 行号 | 期望编号 | 当前状态 |
|---|---|---|---|
| `skills` | L1341 | 01 | 缺 |
| `capabilities` | L1434 | 02 | ✅ 已有 `02` |
| `philosophy-library` | L1492 | 03 | ✅ 已有 `03` |
| `case-gallery` | L1987 | 04 | 缺 |
| `dimensions` | L2107 | 05 | 缺 |
| `workflow` | L2255 | 06 | 缺 |
| `references` | L2320 | 07 | 缺 |
| `use` | L2414 | 08 | ✅ 已有 `08` |

**修改方法**：在 5 个 section 的 `<div class="wrap">` 之前插入 `<div class="section-num" aria-hidden="true">NN</div>`，与已有 3 处保持一致模式（参考 L1435、L1493、L2415）。

### 2.2 Philosophy 库去图（40 处）

**当前结构**（以 Pentagram 为例，L1514-1522）：

```html
<div class="philosophy-card">
  <div class="img-wrap">
    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=..." alt="..." loading="lazy">
  </div>
  <h4>Pentagram — Michael Bierut</h4>
  <span class="genre">信息建筑派</span>
  <p>极度克制的颜色，瑞士网格，字体排印作为主要视觉语言，60%+ 留白。</p>
  <span class="path">→ HTML</span>
</div>
```

**目标结构**：

```html
<div class="philosophy-card">
  <div class="signature">
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- 流派几何签名 -->
    </svg>
  </div>
  <h4>Pentagram — Michael Bierut</h4>
  <span class="genre">信息建筑派</span>
  <p>极度克制的颜色，瑞士网格，字体排印作为主要视觉语言，60%+ 留白。</p>
  <span class="path">→ HTML</span>
</div>
```

### 2.3 10 流派几何签名设计

| # | 流派 | 基础几何 | 视觉特征 | viewBox=0 0 40 40 SVG |
|---|---|---|---|---|
| 01 | 信息建筑派 | 3×3 网格 | 方格嵌套、瑞士网格 | 9 个 12×12 方块 + 内嵌边框 |
| 02 | 运动诗学派 | 弧 + 箭头 | 曲线运动 | 半圆 + 端点三角 |
| 03 | 极简主义派 | 横线 + 点 | 一根线 + 一个点 | 1px 横线（宽 28）+ 1 个 4×4 实心点 |
| 04 | 实验先锋派 | 锯齿折线 | zigzag | 4 段 polyline 折线 |
| 05 | 东方哲学派 | 单圆 | 圆形 | 1 个空心圆 r=14 |
| 06 | 野蛮生长派 | 错位方块 | 两块叠加 | 2 个错位 16×16 方块，旋转 8° |
| 07 | 后现代狂欢派 | 45° 斜线 | 几何 pop | 4 条 45° 平行斜线 |
| 08 | 有机仿生派 | sine 波浪线 | 流动 | 1 条平滑正弦曲线 |
| 09 | 复古未来派 | 等边三角 | 三角 | 1 个 28×24 等边三角 |
| 10 | 极繁主义派 | 4×4 密集网格 | 高密度 | 16 个 8×8 方块（部分填充） |

**4 变体策略**（每个流派 4 个哲学卡）：

- **变体 a（基础）**：原样
- **变体 b（描边粗）**：`stroke-width="2"` 或 `1.5`
- **变体 c（填充反色）**：方块/线条用 `fill="currentColor"` 实心
- **变体 d（旋转/镜像）**：`transform="rotate(90)"` 或 `scale(-1, 1)`

每张卡实际变体按哲学气质微调，确保 40 个卡视觉差异化但风格统一。

### 2.4 CSS 清理

`.img-wrap` 容器在替换后无引用，可保留样式（防御性）或彻底删除。检查 L600 附近：

```css
.philosophy-card .img-wrap {
  /* 如果有定义则删除 */
}
```

若仍存在，删除整个规则。

---

## 3. 拟定变更清单

### 3.1 新增 5 个 `section-num` 水印（HTML）

| Section | 插入位置（行号参考） | 插入内容 |
|---|---|---|
| `skills` | L1342 前 | `<div class="section-num" aria-hidden="true">01</div>` |
| `case-gallery` | L1988 前 | `<div class="section-num" aria-hidden="true">04</div>` |
| `dimensions` | L2108 前 | `<div class="section-num" aria-hidden="true">05</div>` |
| `workflow` | L2256 前 | `<div class="section-num" aria-hidden="true">06</div>` |
| `references` | L2321 前 | `<div class="section-num" aria-hidden="true">07</div>` |

### 3.2 替换 40 个 philosophy-card img-wrap → signature

**操作**：
1. 设计 10 个基础几何 SVG（viewBox=0 0 40 40，stroke 1px，`stroke="currentColor"`，`fill="none"` 默认）
2. 对 40 张卡片的 4 个变体，分别调整 stroke-width / fill / transform
3. 替换所有 `<div class="img-wrap"><img src="https://trae-api-cn..." alt="..." loading="lazy"></div>` 为 `<div class="signature"><svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">[几何]</svg></div>`

**40 个签名映射表**（school#variant → 哲学名）：

```
01 信息建筑派:
  a. Pentagram — Michael Bierut (L1514)
  b. Stamen Design — 数据诗学 (L1523)
  c. Information Architects (L1532)
  d. Fathom — scientific narrative (L1541)

02 运动诗学派:
  a. Locomotive — scroll narrative (L1562)
  b. Active Theory — WebGL (L1571)
  c. Field.io — algorithmic (L1580)
  d. Resn — interactive storytelling (L1589)

03 极简主义派:
  a. Experimental Jetset (L1610)
  b. Müller-Brockmann (L1619)
  c. Build in Amsterdam (L1628)
  d. Sagmeister and Walsh (L1637)

04 实验先锋派:
  a. Zach Lieberman — code poetry (L1658)
  b. Raven Kwok (L1667)
  c. Ash Thorp — cinematic cyberpunk (L1676)
  d. Territory Studio — sci-fi HUD (L1685)

05 东方哲学派:
  a. Takram — Japanese engineering (L1706)
  b. Kenya Hara — white emptiness (L1715)
  c. Irma Boom — book as sculpture (L1724)
  d. Naoto Fukasawa — unconscious (L1733)

06 野蛮生长派:
  a. Pascal Devoyre — naked HTML (L1754)
  b. Michele Mazzini (L1763)
  c. Bloomberg Businessweek (L1772)
  d. Lotta Nieminen — illustration (L1781)

07 后现代狂欢派:
  a. Ettore Sottsass — Memphis (L1802)
  b. Paula Scher — bold typography (L1811)
  c. David Carson — anti-grid (L1820)
  d. Triboro — pop editorial (L1829)

08 有机仿生派:
  a. Neri&Hu — material narrative (L1850)
  b. Studioilse — emotional minimal (L1859)
  c. Heatherwick Studio — biomorphic (L1868)
  d. Zaha Hadid Architects (L1877)

09 复古未来派:
  a. Syd Mead — sci-fi world (L1898)
  b. Saul Bass — iconic title (L1907)
  c. Ridley Scott — Blade Runner (L1916)
  d. Hajime Sorayama — robot erotic (L1925)

10 极繁主义派:
  a. David Hockney — color explosion (L1946)
  b. Jam Factory — pattern chaos (L1955)
  c. Barnbrook — eclectic typography (L1964)
  d. Stefan Sagmeister — chaos (L1973)
```

### 3.3 CSS 清理

- 查找 `.img-wrap` 样式定义（grep），若存在则删除
- 保留 `.signature` 样式（已存在，L652-667）

### 3.4 自检 + grep 扫描

```bash
# 1. 远程图片依赖
grep -nE 'src="https://' index.html
# 预期：0 行

# 2. 硬编码颜色/字体/间距
grep -nE 'font-size: |line-height: |padding: |margin: ' index.html | grep -v 'var(--'
# 预期：0 行

# 3. SVG 数量
grep -c '<svg' index.html
# 预期：≥ 45（40 signature + 2 radar + brand mark 等）

# 4. Emoji 扫描
grep -nE '[😀-🙏🌀-🗿]' index.html
# 预期：0 行

# 5. img-wrap 残留
grep -nE 'img-wrap' index.html
# 预期：0 行

# 6. section-num 数量
grep -c 'section-num' index.html
# 预期：8（每个 section 各 1 次 CSS + 1 次 HTML）
```

### 3.5 5 维度再评 + 报告

- 重新跑 5 维度评审（哲学一致性 / 视觉层级 / 细节执行 / 功能性 / 创新性）
- 4 铁律自检（禁通胀 / 禁平均上浮 / 必须引证 / 创新性允许低分）
- 写入 `.trae/documents/monkren-design-intro-page-optimize-report.md`

---

## 4. 实施步骤（按依赖顺序）

### Step 1：补齐 5 个 section 编号水印

- **文件**：[index.html](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html)
- **操作**：在 5 个 section 的 `<div class="wrap">` 之前插入 `<div class="section-num" aria-hidden="true">NN</div>`
- **验证**：`grep -c 'class="section-num"' index.html` = 8
- **影响范围**：HTML 5 处，每处 1 行

### Step 2：设计 10 流派基础几何 SVG

- **操作**：在 plan 文件中或临时编辑中预先设计好 10 个 viewBox=0 0 40 40 的 SVG（40px 尺寸，stroke 1px，黑白分明）
- **设计原则**：
  - 简洁（5-15 笔触以内）
  - 黑白分明（无中间灰度，符合 Graphic Monochrome Canvas）
  - 视觉差异化（10 流派一眼能区分）
- **输出**：10 个 SVG 字符串

### Step 3：批量替换 40 个 philosophy-card 的 img-wrap → signature

- **文件**：[index.html](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html) L1514-1983
- **操作**：用 40 次 `Edit`（每次替换 1 张卡），保持原 h4/genre/p/path 不变
- **验证**：`grep -c 'class="img-wrap"' index.html` = 0；`grep -c '<svg' index.html` ≥ 45
- **影响范围**：40 处 HTML 替换

### Step 4：清理 `.img-wrap` CSS

- **操作**：在 L600 附近 grep 找到 `.img-wrap` 规则，删除整块
- **验证**：`grep -c 'img-wrap' index.html` = 0

### Step 5：自检 + grep 扫描

- **操作**：按 §3.4 执行 6 个 grep 命令
- **输出**：零硬编码 / 零远程图 / SVG 数量 / 零 emoji / 零 img-wrap / 8 个 section-num

### Step 6：5 维度再评 + 报告

- **文件**：`.trae/documents/monkren-design-intro-page-optimize-report.md`（新建）
- **内容**：
  - 6 项 grep 扫描结果（截图 / 粘贴）
  - 5 维度评分（v1.0 基线 → v1.1 现状）
  - 4 铁律自检
  - Top 3 Quick Win（下一轮）
  - 实施时间统计

---

## 5. 假设与决策

### 5.1 假设

- A1：section 顺序按 HTML 出现顺序编号（skills→use = 01-08）
- A2：40 个哲学签名按"流派 4 变体"策略差异化（基础 / 粗描边 / 填充反色 / 旋转），不是 40 个完全独立的几何
- A3：SVG 用 `viewBox="0 0 40 40"` + `stroke="currentColor"` + `fill="none"` 默认，与 `.signature` 容器 CSS 配合
- A4：所有 SVG 使用 `aria-hidden="true"`（装饰性，不进入无障碍树）
- A5：v1.0 计划的 5.1 / 5.2 决策全部保留

### 5.2 关键决策

| 决策 | 备选 | 选择 | 理由 |
|---|---|---|---|
| 签名尺寸 | 32 / 40 / 48 / 64 | **40** | 与现有 `--signature-size: 40px` 一致 |
| 签名样式 | 全相同 / 4 变体 / 完全独立 | **4 变体** | 10 流派差异化基础上 4 变体平衡一致性 + 多样性 |
| 签名复杂度 | 1 笔 / 5 笔 / 10+ 笔 | **5-10 笔** | 既能体现风格又不喧宾夺主 |
| Section 编号格式 | 01 / 1 / 第一 | **01-08** | 与 v1.0 已有 3 处一致 + DESIGN.md 国际化基线 |
| 报告位置 | 项目根 / .trae/documents | **.trae/documents/** | 与 v1.0 plan 保持同目录 |

---

## 6. 验证步骤

### 6.1 自动化 grep 验证

```bash
cd /Users/ruishengzhang/Documents/GitHub/monkren\ designer

# 1. 远程图片
echo "=== Remote images ===" && grep -nE 'src="https://' index.html | wc -l

# 2. 硬编码
echo "=== Hardcoded values ===" && grep -nE 'font-size: |line-height: |padding: |margin: |gap: ' index.html | grep -v 'var(--' | wc -l

# 3. SVG count
echo "=== SVG count ===" && grep -c '<svg' index.html

# 4. Emoji
echo "=== Emoji ===" && grep -nE '[😀-🙏🌀-🗿]' index.html | wc -l

# 5. img-wrap
echo "=== img-wrap ===" && grep -c 'img-wrap' index.html

# 6. section-num
echo "=== section-num ===" && grep -c 'class="section-num"' index.html
```

**预期输出**：
```
=== Remote images === 0
=== Hardcoded values === 0
=== SVG count === 45+
=== Emoji === 0
=== img-wrap === 0
=== section-num === 8
```

### 6.2 视觉验证（可选）

- 浏览器打开 `index.html`
- 截图：Hero（带 10 水印）/ Philosophy（40 个签名）/ 8 个 section 编号水印
- 3 个尺寸：1440 / 768 / 375

### 6.3 5 维度自评

| 维度 | v1.0 基线 | v1.1 目标 | 验证证据 |
|---|---|---|---|
| 哲学一致性 | 7 | 9 | 0 远程图 + 40 几何签名 + 8 section 水印 |
| 视觉层级 | 6 | 8 | h1 64-80px + 8 section 编号水印 + 强排版 |
| 细节执行 | 5 | 9 | grep 0 硬编码 + 0 非网格 token |
| 功能性 | 5 | 8 | 40 签名离线可用 + 8 section 编号清晰导航 |
| 创新性 | 5 | 8 | 40 流派签名 + 8 section 水印 + 0 远程依赖 |

**4 铁律自检**：
- 铁律 1 禁通胀：5 维度不全 ≥ 8（细节执行 9 / 创新性 8 / 其余 8-9）
- 铁律 2 禁平均上浮：取最差持续段（创新性可能在 7-8 段）
- 铁律 3 必须引证：每维度附 grep 证据
- 铁律 4 创新性允许低分：8/10 已是强表达

---

## 7. 文件清单

| 文件 | 用途 | 变更类型 |
|---|---|---|
| [index.html](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html) | 项目介绍页 | 修 5 处 section 水印 + 40 处 img-wrap → signature + 删 .img-wrap CSS |
| `.trae/documents/monkren-design-intro-page-optimize-report.md` | 优化后 5 维度自评报告 | 新建 |

---

## 8. 风险与回退

### 8.1 风险

- **R1**：40 个 SVG 手工绘制工作量大，可能有视觉不一致
  - **缓解**：用"4 变体"策略（基础 / 粗描边 / 填充 / 旋转）保持风格统一
- **R2**：section 编号插入位置错误导致布局错乱
  - **缓解**：严格参考 L1435 / L1493 / L2415 已有 3 处的 HTML 模式
- **R3**：替换 img-wrap 时误改 h4 / p 等其他元素
  - **缓解**：每次 Edit 用最小 `old_string` 范围（只包含 img-wrap 块），不涉及 h4/p

### 8.2 回退

如出现不可逆错误，恢复方式：
1. 备份 v1.0 实施后的 index.html（如 git 历史）
2. 或用本次未修改前的 git 状态恢复

---

## 9. 实施时间估算

| Step | 内容 | 时间 |
|---|---|---|
| Step 1 | 5 个 section 水印 | 5 min |
| Step 2 | 10 基础几何 SVG 设计 | 30 min |
| Step 3 | 40 个签名替换 | 60 min（每卡 ~1.5 min）|
| Step 4 | 清理 .img-wrap CSS | 5 min |
| Step 5 | grep 自检 | 10 min |
| Step 6 | 5 维度再评 + 报告 | 20 min |
| **总计** | | **~2.5 hour** |

---

**版本**：v1.1 / **创建日期**：2026-06-30 / **上游**：v1.0 计划（[monkren-design-optimize-intro-page.md](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/.trae/documents/monkren-design-optimize-intro-page.md)）
