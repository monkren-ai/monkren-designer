# 对齐 case/ 3 份 Case Study 与 index.html 卡片描述

> **任务**：让 3 份 case 报告与 `index.html` 卡片描述 1:1 对齐
> **基线**：当前 v6.0 index.html (L348 / L354 / L360) + 当前 case 文件已完成的 v6.0 审查
> **新规**：3 份 case 的内容必须严格匹配卡片承诺，不能描述不存在的特性

---

## 1. Current State

### 1.1 卡片 vs case 文件对齐矩阵

| # | index.html 卡片 (L348/L354/L360) | 当前 case 文件状态 | 差距 |
|---|--------------------------------|------------------|------|
| 01 Review | 5 维度评审 + **多视角** + 严重度分级 | 5 维度 ✓ + 严重度分级 (P0/P1/P2) ✓ + **多视角 ✗ 缺失** | 需新增 Multi-Perspective section |
| 02 Improvement | 从 **6/10** 提升到 **8/10** 的具体路径 | 7.0 → 8.0 ✗ 不一致 | 需调整为 6.0 → 8.0（用户已确认） |
| 03 Suggestion | 3 个差异化方向 + **落地概念包** | 3 directions ✓ + Quick Win (部分) | 需为每个方向补"落地概念包" |

### 1.2 文件位置

- `/Users/ruishengzhang/Documents/GitHub/monkren designer/case/Design Review — Landing Page.html` (466 行)
- `/Users/ruishengzhang/Documents/GitHub/monkren designer/case/Score Improvement — Landing Page.html` (284 行)
- `/Users/ruishengzhang/Documents/GitHub/monkren designer/case/Design Suggestion — Landing Page.html` (178 行)

### 1.3 已有可引用资源

- `references/methods-review.md` §4（10 视角清单）→ 取 3 个核心视角：用户体验 / UI 设计 / 功能展示合理性
- `references/standards.md` §6.5（落地概念包的字段：token / code snippet / 验收标准）
- v6.0 index.html 行号（L82/L85-86/L139-150/L58/L147/L173 等硬编码点）

---

## 2. Proposed Changes

### 2.1 文件 1：`case/Design Review — Landing Page.html`

**改动 1：新增 Multi-Perspective section**（紧跟 Diagnosis 之后，Detection 之前）

```html
<section>
  <h2>Multi-Perspective</h2>
  <hr class="rule">
  <div class="perspective-grid">
    <div class="perspective-card">
      <div class="perspective-label">P1 · 用户体验</div>
      <div class="perspective-verdict">5 秒测试通过；hero 信息层级自然；但 hero 4 query 漏 03 设计执行阶段，预期落空</div>
      <div class="perspective-evidence">L324-L327 query 数量与 L376-L400 5 stage 不对应</div>
    </div>
    <div class="perspective-card">
      <div class="perspective-label">P1 · UI 设计</div>
      <div class="perspective-verdict">3 case 卡片 (L344-L363) 是页面最"通用"区块，hover 翻色模式未与 .discipline / .stage 视觉语言统一</div>
      <div class="perspective-evidence">.case (L167-L181) 仅有 border + padding，缺 --color-warn 强调</div>
    </div>
    <div class="perspective-card">
      <div class="perspective-label">P2 · 功能展示</div>
      <div class="perspective-verdict">DEPTH meter 是 monkren 独有视觉签名，0 装饰；Method section 5 stage 完整覆盖</div>
      <div class="perspective-evidence">.depth-meter (L138-L154) 滚动驱动；.stage-grid (L376-L400) 5 行</div>
    </div>
  </div>
</section>
```

**新增 CSS**（追加到现有 `<style>` 内，media query 之前）：

```css
.perspective-grid { display: grid; gap: var(--spacing-8); }
.perspective-card { border: var(--border-width) solid var(--color-arctic-white); border-radius: 0; padding: var(--spacing-12); }
.perspective-label { font-family: var(--font-black-tie); font-size: var(--text-11px); text-transform: uppercase; letter-spacing: .04em; color: var(--color-warn); margin-bottom: var(--spacing-8); }
.perspective-verdict { font-size: var(--text-16px); line-height: var(--leading-body); margin-bottom: var(--spacing-8); }
.perspective-evidence { font-family: var(--font-black-tie); font-size: var(--text-13px); color: var(--color-subtle-gray); }
```

**Detection grid 中"用户体验"card 改名为"单维度 UX"并保留**（避免与多视角重复）。

**2.2 节变更**：把当前 Overview 5 行 → 6 行（加 Multi-Perspective 引用），summary-band 计数更新：
- P0: 0
- P1: 3 → 4 (+Multi-Perspective P1)
- P2: 1 → 2 (+Multi-Perspective P2)
- Hardcoded: 8
- Quick Win: 3

### 2.2 文件 2：`case/Score Improvement — Landing Page.html`

**核心改动**：current 7.0 → 6.0（重置为方法论示例基线），target 8.0 不变

**具体修改点**（按行号）：

| 行 | 当前 | 改为 |
|----|------|------|
| L125 | `<span class="score-num score-current">7.0</span>` | `<span class="score-num score-current">6.0</span>` |
| L127 | `<span class="score-num score-target">8.0</span>` | 保持 |
| L137-194 Overview | 5 维度 current→target gap | 全部重算（基于 6.0 起点，gap = target - 6.0） |

**新 Overview 表**（每维度目标分 = 6.0 + 0.5/0.8/1.5/1.5/1.2 提升）：

| 维度 | Current | Target | Gap | 优先级 |
|------|---------|--------|-----|--------|
| 哲学一致性 | 6.0 | 7.0 | +1.0 | 中 |
| 视觉层级 | 6.0 | 7.0 | +1.0 | 中 |
| 细节执行 | 6.0 | 8.0 | +2.0 | 高 |
| 功能性 | 6.0 | 7.5 | +1.5 | 高 |
| 创新性 | 6.0 | 7.0 | +1.0 | 中 |

**Paths section 全部重写**：以 6.0 为起点，每条 path 描述"把 6.0 维度拉到 target 分"的具体步骤（保留原有 Quick Win / 小修 / 中修 tag 与时间估算）

**Roadmap section 重排**：所有 step 编号、依赖关系保持，但 current 字段统一为 6.0，gap 字段基于新表

**Maintain section 保持**：视觉层级 6.0→7.0 仍是最高性价比路径之一，但"5 秒测试通过"等理由从 6.0 视角写

**Total bar (L261)**：
```html
当前 6.0/10 → 完成全部后 8.0/10
```

### 2.3 文件 3：`case/Design Suggestion — Landing Page.html`

**改动：为每个方向补"落地概念包"section**

**新增 CSS**（在 `.dir-qw` 后）：

```css
.dir-package { margin-top: var(--spacing-12); padding-top: var(--spacing-12); border-top: var(--border-width) solid var(--surface-muted); }
.dir-package h4 { font-family: var(--font-black-tie); font-size: var(--text-11px); text-transform: uppercase; letter-spacing: .04em; color: var(--color-warn); margin-bottom: var(--spacing-8); font-weight: 400; }
.dir-package .pkg-row { display: grid; grid-template-columns: 80px 1fr; gap: var(--spacing-8); font-size: var(--text-13px); margin-bottom: 4px; align-items: baseline; }
.dir-package .pkg-key { font-family: var(--font-black-tie); color: var(--color-subtle-gray); text-transform: uppercase; letter-spacing: .04em; }
.dir-package .pkg-val { color: var(--color-arctic-white); }
.dir-package .pkg-val code { font-family: var(--font-black-tie); font-size: var(--text-13px); color: var(--color-arctic-white); }
```

**3 个方向的"概念包"内容**（每方向 4 字段：Files / Tokens / Code / Verify）：

#### 方向 A · Monochrome Hardening
```html
<div class="dir-package">
  <h4>Concept Package</h4>
  <div class="pkg-row"><span class="pkg-key">Files</span><span class="pkg-val">index.html (L82/L139-150/L167-181)</span></div>
  <div class="pkg-row"><span class="pkg-key">Tokens</span><span class="pkg-val">新增 <code>--top-h: 64px</code> · <code>--depth-track-h: 2px</code> · <code>--focus-offset: 2px</code></span></div>
  <div class="pkg-row"><span class="pkg-key">Code</span><span class="pkg-val">.case { border-left: 2px solid var(--color-warn); } hover 改 --color-warn underline</span></div>
  <div class="pkg-row"><span class="pkg-key">Verify</span><span class="pkg-val">3 case card hover 显示 warn left border；DEPTH meter click 滚到顶</span></div>
</div>
```

#### 方向 B · Monochrome + Slate
```html
<div class="dir-package">
  <h4>Concept Package</h4>
  <div class="pkg-row"><span class="pkg-key">Files</span><span class="pkg-val">index.html (L13/L138-154/L115-120)</span></div>
  <div class="pkg-row"><span class="pkg-key">Tokens</span><span class="pkg-val">新增 <code>--color-slate: #6B6B6B</code></span></div>
  <div class="pkg-row"><span class="pkg-key">Code</span><span class="pkg-val">.query:hover { background: var(--surface-muted); } .stage { border-bottom: 1px solid var(--color-slate); }</span></div>
  <div class="pkg-row"><span class="pkg-key">Verify</span><span class="pkg-val">query hover 出现 muted 灰底；stage 卡片底部 1px slate 横线</span></div>
</div>
```

#### 方向 C · Monochrome + Texture
```html
<div class="dir-package">
  <h4>Concept Package</h4>
  <div class="pkg-row"><span class="pkg-key">Files</span><span class="pkg-val">index.html (L46-55/L138-154/L375-401)</span></div>
  <div class="pkg-row"><span class="pkg-key">Tokens</span><span class="pkg-val">新增 <code>--color-deep: #1A1A1A</code> · <code>--noise-opacity: .04</code></span></div>
  <div class="pkg-row"><span class="pkg-key">Code</span><span class="pkg-val">body { background: var(--color-deep) url("data:image/svg+xml;...") } .depth-meter { background: var(--color-deep); }</span></div>
  <div class="pkg-row"><span class="pkg-key">Verify</span><span class="pkg-val">页面有 4% 透明度噪点；DEPTH meter 从 #1A1A1A 填到 #FFF</span></div>
</div>
```

**Quick Win 保留**：每个方向原有 .dir-qw 不变（5 min 起步项与概念包互补）。

---

## 3. Assumptions & Decisions

### 3.1 已确认（用户已答）
- ✅ 02 Improvement 改为 6.0→8.0（对齐卡片）
- ✅ 01 Review 多视角用独立 section 形式（不嵌入 5 维度）

### 3.2 执行时决定
- **3 视角选择**：用户体验 / UI 设计 / 功能展示（methods-review.md §4 核心 5 视角中选 3 个最相关；不取全 5 避免报告臃肿）
- **02 重写幅度**：Overview / Paths / Roadmap 全部数字重算（gap 表、step 编号、依赖关系、total bar），但 fix 列表本身（Quick Win / 硬编码 token 化）保持不变——只是从 "7.0 视角" 改为 "6.0 视角" 的描述
- **03 概念包字段**：Files / Tokens / Code / Verify 4 字段（取自 standards.md §6.5 落地模板简化版）
- **新增 CSS 与原有风格保持**：0 圆角 / 1px 边框 / mono font / 颜色仅用现有 token（--color-warn 标注新增字段标签）

### 3.3 4 评分纪律自检
- 总分 6.0 → 8.0 提升 2.0 合理（+1.5 ~ +2.0 范围内）
- 至少 1 维度保持 ≤ 6（视觉层级 6.0→7.0 不是瓶颈维度）
- 评分引证：每条 evidence 配 `index.html#L行号`
- 创新性 6.0→7.0 合理（不强行 ≥ 7）

### 3.4 不变的部分
- **文件名**：3 个 case 文件名保持不变
- **index.html 链接** (L344-L363)：不需要改
- **整体骨架**：section 顺序、class 命名、HTML 结构保持
- **设计规范 token**：case 自包含的 `--spacing-*` / `--text-*` / `--color-*` 命名保持

---

## 4. Verification Steps

### 4.1 静态验证

```bash
# 1. 3 份 case 文件存在且 HTML 完整
ls -la case/*.html

# 2. 无 emoji
grep -nE '[😀-🙏🌀-🗿🚀-🛿]' case/*.html
# 预期：0 匹配

# 3. 无圆角滥用（仅允许 50% pill + 0）
grep -nE 'border-radius:' case/*.html | grep -vE 'border-radius:\s*(0|50%)'
# 预期：0 匹配

# 4. 02 文件全 7.0 → 6.0
grep -nE '7\.0|7/10' case/Score\ Improvement*.html
# 预期：仅在 Maintain section 历史叙事中可能出现，正文 score 应都是 6.0

# 5. 引用行号有效
grep -nE 'index\.html#L[0-9]+' case/*.html

# 6. 01 新增 Multi-Perspective section
grep -nE 'Multi-Perspective|perspective-card' case/Design\ Review*.html
# 预期：≥ 4 匹配（h2 + 3 perspective-card）

# 7. 03 3 方向都有 Concept Package
grep -cE 'Concept Package' case/Design\ Suggestion*.html
# 预期：3
```

### 4.2 视觉验证
打开 3 份 case 文件，肉眼检查：
- 01 Multi-Perspective section 3 视角与 5 维度诊断不重复（多视角是横向切面，5 维度是纵向评价）
- 02 Overview 6 行数字一致（每维度 current=6.0 / target 如新表）
- 03 3 方向都有 4 字段（Files/Tokens/Code/Verify），与 Quick Win 互补不重复

### 4.3 纪律自检
- 02 总分 6.0→8.0 gap +2.0 在合理范围
- 每条引证配 `index.html#L行号`
- 创新性 6.0→7.0 不强行拉高

### 4.4 链接验证
```bash
grep -nE 'href="case/' index.html
# 预期：3 行，指向原 3 份 case 文件（链接不变）
```

---

## 5. 改动文件清单

| 文件 | 类型 | 改动量 |
|------|------|--------|
| `case/Design Review — Landing Page.html` | 修改 | +1 section（Multi-Perspective 3 卡片）+ ~25 行 CSS + summary 计数更新 |
| `case/Score Improvement — Landing Page.html` | 修改 | Overview / Paths / Roadmap 数字重算（current 7.0→6.0）；fix 列表内容保留；~50 行改动 |
| `case/Design Suggestion — Landing Page.html` | 修改 | 3 方向各补 1 块 Concept Package（4 字段 × 3 = 12 字段）+ ~15 行 CSS |
| `index.html` | **不修改** | 卡片描述已与 3 份 case 对齐 |
| `case/Project Strategy — Design Review.html` | **不修改** | 不同文件类型 |

**预估改动总量**：~90 行（CSS + HTML），不影响 case 文件结构与设计系统。

---

## 6. 风险与回滚

- **风险 1**：02 改为 6.0→8.0 破坏历史快照叙事。**缓解**：仅改数字叙事，不改 fix 列表内容（fix 列表与分数基线解耦）。
- **风险 2**：Multi-Perspective section 与 Detection 中"用户体验"card 重复。**缓解**：将 Detection 中"用户体验"改名为"UX 单维度检查"，避免与多视角混淆。
- **回滚**：3 份 case 都在 git 内，单点回滚无副作用。
