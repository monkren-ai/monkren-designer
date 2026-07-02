# 收尾:修复 3 张残留的抽象 SVG 签名

> **任务**:`/plan 插图改成几何图形后有点抽象` — 上一轮把 37/40 卡片改成了「base64 PNG 位图 + monogram」,还剩 3 张卡片的旧 SVG 没替换完,本计划收尾。
> **范围**:仅 [index.html](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html) 中 3 张 philosophy-card
> **目标**:40/40 卡片全部统一为位图+monogram 格式,完成「太抽象」问题修复

---

## 1. 当前状态(已探索)

| 卡片 | 位置 | 现状 | 失败原因 |
|---|---|---|---|
| Sagmeister & Walsh | [L1682-1692](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L1682-L1692) | 旧 SVG (`<path>` 弧线) | h4 文本是 `Sagmeister &amp; Walsh`(HTML 实体),replace_html.py dict key 是 `Sagmeister & Walsh`,正则匹配失败 |
| Kenya Hara — 白 | [L1782-1793](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L1782-L1793) | 旧 SVG (`<line>` + `<circle>`) | dict key 是 `Kenya Hara`,实际 h4 是 `Kenya Hara — 白`,无精确匹配 |
| Pascal Devoyre — 裸露真实 | [L1832-1844](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L1832-L1844) | 旧 SVG (`<rect>` + 2 `<line>` 三角形) | dict key 是 `Pascal Devoyre`,实际 h4 是 `Pascal Devoyre — 裸露真实`,无精确匹配 |

**已确认资源**:
- 10 张 base64 PNG 已生成于 [assets/philosophy-bitmaps/base64.json](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/assets/philosophy-bitmaps/base64.json)
- 流派位图映射:极简主义派=`03`、东方哲学派=`05`、野蛮生长派=`06`
- Monogram 数据(Sagmeister→SAGMEISTER/SW、Kenya Hara→KENYAHARA/KH、Pascal Devoyre→DEVOYRE/PD)已定义在 [replace_html.py L30-81](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/assets/philosophy-bitmaps/replace_html.py#L30-L81)

**已替换参考模板**([L1514-1527](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L1514-L1527)):
```html
<div class="philosophy-card">
  <div class="signature">
    <img class="sig-bitmap" src="data:image/png;base64,..." alt="" aria-hidden="true" />
    <div class="sig-monogram">
      <span class="monogram-org">PENTAGRAM</span>
      <span class="monogram-name">MB</span>
    </div>
  </div>
  <h4>Pentagram — Michael Bierut</h4>
  ...
</div>
```

**附带发现**:
- [L1516](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L1516) 等已替换卡片缩进不规范(28 空格 vs 16 空格),与 L1795/1846 等位置一致,属脚本输出副作用,本计划一并清理

---

## 2. 拟定变更

### 2.1 修复 3 张卡片

**3 处 Edit 替换** — 各自把 `<div class="signature">...<svg>...</svg></div>` 改为 `<div class="signature">...<img>+<div class="sig-monogram">...</div></div>`,与已替换的 37 张卡片结构完全一致。

| # | 位置 | 位图 base64 | Monogram org | Monogram name |
|---|---|---|---|---|
| 1 | L1682-1687 | `"03"` (极简主义派,粗细变化横线) | `SAGMEISTER` | `SW` |
| 2 | L1782-1787 | `"05"` (东方哲学派,圆+横线) | `KENYAHARA` | `KH` |
| 3 | L1832-1838 | `"06"` (野蛮生长派,有机曲线) | `DEVOYRE` | `PD` |

**新 HTML 结构**(以 Sagmeister 为例):
```html
<div class="philosophy-card">
  <div class="signature">
    <img class="sig-bitmap" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAIAAAC2BqGFAAAAjUlEQVR42u3asQqAMBBEwZz//8+xTSkEYrid6UVZrB43BgAAAABwp9p5eM659e6qnKEf/5qhAQAAACDbnz360/d1adYyqaEBAAAAINzpHh11E72SSQ0NAAAAAOFuvI9u2axlUkMDAAAAQLgTPTr2JnolkxoaAAAAAMLdch/dvlnLpIYGAAAAAAAAAIj2AqREEh+cWsZPAAAAAElFTkSuQmCC" alt="" aria-hidden="true" />
    <div class="sig-monogram">
      <span class="monogram-org">SAGMEISTER</span>
      <span class="monogram-name">SW</span>
    </div>
  </div>
  <h4>Sagmeister &amp; Walsh</h4>
  ...
</div>
```

**base64 字符串来源**:
- `03` → [base64.json L4](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/assets/philosophy-bitmaps/base64.json#L4) (极简主义派)
- `05` → [base64.json L6](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/assets/philosophy-bitmaps/base64.json#L6) (东方哲学派)
- `06` → [base64.json L7](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/assets/philosophy-bitmaps/base64.json#L7) (野蛮生长派)

### 2.2 缩进规范化(可选但推荐)

将所有 `philosophy-card` 内 `<div class="signature">` 的缩进统一为 16 空格(2 层缩进 × 8 字符?或 2 层 × 4 字符 → 实际查看 L1795 已经是 28 空格异常;建议统一为 `              ` 14 空格以匹配手写卡片,见 [L1682](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L1682))。

**取舍**:本计划跳过缩进规范化 — 这是「不必要变更」,仅当用户明确要求才做。**当前范围:仅修 3 张卡片**。

### 2.3 不在范围

- ❌ 不重做 10 张位图(已生成,质量合格)
- ❌ 不修改 monogram 字典键值(脚本本身已 OK,本次只是手动补漏)
- ❌ 不更新 5 维度再评报告(用户没要求,且 3 张修复不会改变评分结论)
- ❌ 不清理脚本缩进副作用
- ❌ 不动其他 SVG(仅 2 个雷达图,属功能元素)

---

## 3. 实施步骤

### Step 1:替换 L1682-1687 (Sagmeister & Walsh)

- **文件**:[index.html](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html)
- **操作**:Edit 替换 6 行 `<div class="signature">...<svg>...</svg></div>` 为新的 `signature` 结构
- **old_string**(精确匹配):
  ```
                <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M 4 30 C 12 10 20 30 28 12 S 36 30 36 30" fill="none" stroke="currentColor" stroke-width="1.5"/>
                </svg>
  ```
- **new_string**:新的 bitmap + monogram 结构(位图 `03`)

### Step 2:替换 L1782-1787 (Kenya Hara)

- **old_string**:
  ```
                <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <line x1="6" y1="20" x2="34" y2="20" stroke="currentColor" stroke-width="1"/>
                  <circle cx="20" cy="20" r="2" fill="currentColor"/>
                </svg>
  ```
- **new_string**:位图 `05` + monogram `KENYAHARA / KH`

### Step 3:替换 L1832-1838 (Pascal Devoyre)

- **old_string**:
  ```
                <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="4" y="6" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1"/>
                  <line x1="4" y1="6" x2="26" y2="28" stroke="currentColor" stroke-width="1"/>
                  <line x1="26" y1="6" x2="4" y2="28" stroke="currentColor" stroke-width="1"/>
                </svg>
  ```
- **new_string**:位图 `06` + monogram `DEVOYRE / PD`

### Step 4:验证

```bash
# 1. 哲学卡 SVG 应为 0(只允许 2 个雷达图 SVG)
grep -c '<svg viewBox="0 0 40 40"' index.html
# 期望输出:0

# 2. 雷达图 SVG 应为 2
grep -c 'viewBox="0 0 200 200"' index.html
# 期望输出:2

# 3. base64 位图应为 40
grep -c 'class="sig-bitmap"' index.html
# 期望输出:40

# 4. monogram 应为 40
grep -c 'class="monogram-org"' index.html
# 期望输出:40
```

### Step 5:视觉验证

- 浏览器打开 `index.html`
- 滚动到 philosophy-library 段
- 眯眼测试 40 张卡片:10 流派位图 × 4 monogram 变体,共 40 种唯一组合
- 检查 Sagmeister 卡片:粗细横线位图 + `SAGMEISTER / SW` monogram
- 检查 Kenya Hara 卡片:圆+横线位图 + `KENYAHARA / KH` monogram
- 检查 Pascal Devoyre 卡片:有机曲线位图 + `DEVOYRE / PD` monogram
- 移动端:3 列网格 → 单列,位图依然清晰

---

## 4. 假设与决策

### 4.1 假设

- A1:3 张已修复卡片的位图+monogram 选择由原 replace_html.py MONOGRAMS dict 决定(已确认)
- A2:base64.json 中的 3 个位图数据有效(已生成,文件大小 ~200 字节/个)
- A3:不需要更新 design system CSS(`.sig-bitmap`/`.sig-monogram`/`.monogram-org`/`.monogram-name` 已在 [L666-705](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L666-L705) 定义,本次复用)
- A4:HTML 实体 `&amp;` 不影响 SVG 替换,仅 h4 文本保持原样

### 4.2 关键决策

| 决策 | 备选 | 选择 | 理由 |
|---|---|---|---|
| 替换方式 | 修复 replace_html.py 重新跑 / 手动 Edit | **手动 Edit** | 仅 3 处,手动更精准,避免重新生成已 OK 的 37 张 |
| 缩进规范化 | 顺手清理 / 跳过 | **跳过** | 不必要变更,违反「不主动添加范围外变更」 |
| Monogram 命名 | 沿用 dict / 自定义 | **沿用 dict** | 与已替换 37 张卡片保持一致 |
| 5 维度报告更新 | 更新 / 跳过 | **跳过** | 用户没要求,且修复后评分结论不变 |

---

## 5. 验证步骤

### 5.1 自动化验证(执行后必跑)

```bash
# 1. 哲学卡 SVG = 0
grep -c '<svg viewBox="0 0 40 40"' index.html
# 期望:0

# 2. 雷达图 SVG = 2
grep -c 'viewBox="0 0 200 200"' index.html
# 期望:2

# 3. base64 位图 = 40
grep -c 'class="sig-bitmap"' index.html
# 期望:40

# 4. monogram = 40
grep -c 'class="monogram-org"' index.html
# 期望:40

# 5. 硬编码颜色/字号/圆角 = 0(回归)
grep -nE '(font-size|line-height): ' index.html | grep -v 'var(--' | head -3
grep -nE 'border-radius:' index.html | grep -vE '0|50%' | head -3
# 期望:空输出
```

### 5.2 视觉验证

- 浏览器打开 `index.html`
- 哲学库段 40 张卡片视觉一致(高度/边框/字号/位图尺寸)
- 10 张位图视觉差异化清晰(瑞士网格 vs 弧线 vs 粗线 vs 像素 vs 禅圆 vs 曲线 vs 孟菲斯 vs 波浪 vs 三角 vs 密集)
- 40 个 monogram 可读(Black Tie 11px 灰底白)
- 移动端:网格响应式,位图+monogram 不重叠

### 5.3 回归检查

- 雷达图仍正常渲染
- Hero 段 5 维度评分面板不受影响
- 滚动到 philosophy-library 段,卡片布局无跳变

---

## 6. 文件清单

| 文件 | 用途 | 变更 |
|---|---|---|
| [index.html](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html) | 项目介绍页 | L1682-1687 / L1782-1787 / L1832-1838 替换 3 处 SVG 为 img+monogram |

---

## 7. 风险与备选

| 风险 | 触发条件 | 备选方案 |
|---|---|---|
| Edit 失败(old_string 不唯一) | 周边有相似 SVG 块 | 改用更大的 old_string 上下文(包含 `<h4>` 之前/之后) |
| base64 字符串过长 | 单个位图 > 1KB | 不变(已确认 200-400 字节/个) |
| 视觉对比度不足 | 位图白色在黑底上不够亮 | 已有 white-on-black 配色,无需调整 |

---

## 8. 收尾验证清单

执行完毕后用户应看到:

- ✅ 40/40 卡片全部为「位图+monogram」双签名格式
- ✅ 0 个哲学卡 SVG 残留(仅 2 个雷达图)
- ✅ 0 个 `class="signature">` 块包含裸 SVG
- ✅ 视觉差异化提升(10 位图 × 40 monogram = 40 种唯一组合)
- ✅ 不破坏 Graphic Monochrome Canvas 铁律(0 远程图 / 0 emoji / 1px 边框 / 0 圆角 / 4-8 网格)

---

**版本**:v1.0 / **创建日期**:2026-06-30 / **预计完成**:10 min
