# 更新 case/ 3 份 Case Study · 重新审查 v6.0 Landing Page

> **任务**：更新 `case/Design Review — Landing Page.html` / `case/Score Improvement — Landing Page.html` / `case/Design Suggestion — Landing Page.html`
> **新基线**：当前 v6.0 index.html（362 行 / B&W / DEPTH meter / 5 阶段生命周期）
> **旧基线**：2026-05-08 暖色调 landing page（已废弃，v5.0 删）

---

## 1. Current State

### 1.1 当前 case 文件盘点

| 文件 | 行数 | 评分对象 | 总分 | 设计规范 |
|------|------|---------|------|---------|
| `case/Design Review — Landing Page.html` | 452 | 暖色 clay/ivory/slate 落地页 | 6.6/10 | 自包含（max-width 860px） |
| `case/Score Improvement — Landing Page.html` | 281 | 同上 | 6.6→8.2 | 同上 |
| `case/Design Suggestion — Landing Page.html` | 173 | 同上 | N/A | 同上 |

3 份 case 都引用了 2026-05-08 的暖色调 landing page，但当前 index.html 是 v6.0 B&W 设计（2026-07-15），旧 case 已完全不准确。

### 1.2 当前 v6.0 landing page 特征（待审对象）

- **结构**：1+3+1（Hero / Proof / Method / Disciplines / Difference 5 个 section）
- **配色**：3 色（`--color-canvas-black #000` / `--color-arctic-white #fff` / `--color-subtle-gray #a9a9a9`）+ 1 强调色（`--color-warn #d4ff00`）
- **字体**：3 字体（Lausanne sans / Victor Serif / Black Tie mono）
- **几何**：0 圆角 UI（`.mark` 50% 例外），1px 边框
- **视觉签名**：`DEPTH · N%` 进度条
- **5 阶段**：01 调研定义 / 02 创作定义 / 03 设计执行 / 04 设计审查 / 05 设计改进
- **4 纪律**：禁通胀 / 禁上浮 / 必须引证 / 创新性允许低分
- **4 招牌 query**：调研 / 变体 / 5 维度评审 / 改进
- **5 行对比**：维度 / 反馈形式 / 诚实底线 / 生命周期 / 人格一致性
- **兼容 agent**：hero 写 5 个（Claude Code · Cursor · Codex · OpenClaw · Hermes），disciplines section 写 7 个（多 CodeBuddy / Workbuddy）—— **潜在不一致点**

### 1.3 索引引用

`index.html` 的 Proof section 通过以下链接引用 3 份 case（[L345-L362](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L345-L362)）：

```html
<a class="case" href="case/Design Review — Landing Page.html">  <!-- 01 · Review -->
<a class="case" href="case/Score Improvement — Landing Page.html">  <!-- 02 · Improvement -->
<a class="case" href="case/Design Suggestion — Landing Page.html">  <!-- 03 · Suggestion -->
```

**文件名保持不变**，只更新内容。链接不需要改。

---

## 2. Proposed Changes

### 2.1 总体执行路径

```
Phase 1: 实际审查 v6.0 index.html（5 维度 + 硬编码 + 检测 + 视角）
   ↓
Phase 2: 基于审查结果生成 01 · Design Review
   ↓
Phase 3: 基于 01 的 Fix 列表生成 02 · Score Improvement
   ↓
Phase 4: 基于 01/02 结论生成 03 · Design Suggestion
   ↓
Phase 5: 自检 4 评分纪律 + grep 验证无硬编码
```

### 2.2 文件 1：`case/Design Review — Landing Page.html`

**结构**（保持现有 452 行骨架）：

| Section | 内容 | v6.0 更新点 |
|---------|------|-------------|
| Header | 标题 + Date `2026-07-15` + filename `index.html` | 同步当前日期 |
| Score Hero | 总分 X.X + 评级 + 1 句话结论 | 基于实际审查 |
| Summary Band | 4 卡片（P0/P1/硬编码/Quick Win） | 同步计数 |
| Radar | SVG 5 维度雷达 | 5 维度评分填实际值 |
| Diagnosis | 5 维度（哲学一致性 / 视觉层级 / 细节执行 / 功能性 / 创新性） | 每条加文件路径 + 行号引证 |
| Detection | 6 项检测卡 | 全部重新跑 |
| Action · Quick Wins | 5 分钟内可修的 P0/P1 | 列实际可修项 |
| Action · Fix List | 按严重度排 | 同上 |
| Hardcoded | 颜色/字体/间距 swatch + 修复 token | 列实际违规 |
| Keep | 维持优点 | 列实际优点 |

**保留设计规范**：
- max-width 860px（case 报告窄版）
- 自包含 CSS 变量（与 v6.0 同色 / 字体 / spacing 命名，但 case 报告用旧 `--spacing-*`，落地页用 `--space-*` —— 保留 case 自己的命名以维持报告骨架）
- 0 圆角 / 1px 边框 / 单色画布

**更新点（4 处）**：
1. Date 改 `2026-07-15`
2. 评分从 6.6 改为基于实际审查的 X.X
3. Diagnosis 每条加引证（`index.html#L行号`）
4. Hardcoded / Quick Win / Fix 内容全部针对 v6.0

### 2.3 文件 2：`case/Score Improvement — Landing Page.html`

**结构**（保持现有 281 行骨架）：

| Section | 内容 |
|---------|------|
| Header | `X.X → Y.Y` 分数转变 + Date |
| Overview | 5 维度 current→target + gap + 优先级 tag |
| Paths | 4 个非满分维度的路径卡（Quick Win / 小修 / 中修 / 大修） |
| Roadmap | 时间线，按依赖排序 |
| Maintain | 维持维度 |
| Total Bar | 当前→完成总提升 |

**派生规则**（来自 01 · Review）：
- 哲学一致性 X → X+1（移除残留 hardcoded / 调色偏差）
- 视觉层级 X → 维持（已经够好）
- 细节执行 X → X+2（统一 spacing、加 1 视觉签名细节）
- 功能性 X → X+1（hero compat agent 数对齐 disciplines section）
- 创新性 X → X+1.5（增加 1 个 monkren-unique 视觉细节）

**Roadmap 顺序**（按依赖）：
1. Quick Win（无依赖）→ 细节执行 +0.5
2. Quick Win（无依赖）→ 哲学一致性 +0.5
3. 兼容性 agent 数统一（hero 5 vs disciplines 7）→ 功能性 +1
4. 中修 → 哲学一致性 / 细节执行 依赖前置
5. 大修 → 创新性

**保留规范**：同 2.2

### 2.4 文件 3：`case/Design Suggestion — Landing Page.html`

**结构**（保持现有 173 行骨架）：

| Section | 内容 |
|---------|------|
| Header | 标题 + Date |
| Current State | 1 段 v6.0 当前状态描述 |
| Directions | **3 个差异化方向**（不同 design taste） |
| Recommendation | 1 个推荐方向 |

**3 个方向约束**（必须真正差异化，不只是配色变化）：
- **方向 A**：深化 v6.0 现状（如 B&W + 增加 1 个动效签名 / 强化几何签名密度）
- **方向 B**：扩展设计语言（如 B&W + 引入 1 个 second tone 弱化 / 强化字体对比）
- **方向 C**：换基础范式（如从单色画布 → 引入 1 个微妙 texture / 或 1 个 dynamic interaction）

每方向必须包含：名称、风格描述、3 色 swatch、3 条具体改动、1 个 Quick Win（5 分钟可改）

**推荐方向**：基于"改动最小 / 风险最低 / 与 monkren 哲学一致"原则选 1 个

**保留规范**：同 2.2

### 2.5 不变的部分

- **文件名**：`case/Design Review — Landing Page.html` 等 3 个文件名保持不变
- **链接**：`index.html` L345-L362 的 3 个 `<a class="case">` 链接不需要改
- **整体骨架**：每份 case 的 section 顺序、class 命名、HTML 结构保持
- **设计系统 token 命名**：case 文件用 `--spacing-*`（含 4/8/12/16/20/28/40/56/64），与 landing page 的 `--space-*` 命名不强制对齐 —— case 是报告格式，自有简洁命名合理

---

## 3. Assumptions & Decisions

### 3.1 已确认的决策

- ✅ **范围**：仅更新 case/ 3 份文件，不改 index.html / SKILL.md / README
- ✅ **意图**：基于当前 v6.0 实际状态重新审查（用户已确认 Option A）
- ✅ **文件命名**：保持原名（链接稳定）
- ✅ **设计规范**：保持 case 自包含窄版（max-width 860px）

### 3.2 需在执行时决定的判断

- **5 维度具体分数**：执行 Phase 1 实际审查后定。本计划不预设分数（避免凭空打分违反"评分必须引证"纪律）。
- **3 个 Suggestion 方向**：执行 Phase 4 时基于 v6.0 实际设计语言衍生。
- **Quick Win 5 分钟项**：必须真实可执行（不能是"重新设计 Hero"等不切实际的项）。
- **总目标分**：从 X.X 提升到 Y.Y。Y 设定需合理（一般 +1.5 ~ +2.0 是合理范围，过高违反"禁通胀"）。

### 3.3 4 评分纪律自检（执行时强制执行）

| 纪律 | 自检方式 |
|------|---------|
| 禁评分通胀 | 至少 1 维度 ≤ 6，否则重新审视 |
| 禁平均上浮 | 总分取最差维度的持续段，非平均 |
| 评分必须引证 | 每条 Diagnosis 配 `index.html#L行号` 证据 |
| 创新性允许低分 | 创新性 ≤ 7 合理，无需"创新"找补 |

### 3.4 与"反 AI slop"纪律的边界

3 份 case 是 monkren 自己的输出示例。检查项：
- ❌ 不用 emoji
- ❌ 不用渐变（除进度条 rgba 黑→白是允许的，作为 micro-indicator）
- ❌ 不用"卡片默认左 border 4px"作为主要 card style
- ✅ swatch row 24×24px 边框是设计系统内的
- ✅ radar SVG 5 边形是 monkren 的方法论视觉

---

## 4. Verification Steps

执行完成后按以下步骤验证：

### 4.1 静态验证

```bash
# 1. 3 份 case 文件存在且 HTML 完整
ls -la case/*.html
# 预期：3 个文件，> 100 行

# 2. 无 emoji
grep -nE '[😀-🙏🌀-🗿🚀-🛿]' case/*.html
# 预期：0 匹配

# 3. 无圆角滥用（仅允许 50% pill + 0）
grep -nE 'border-radius:' case/*.html | grep -vE 'border-radius:\s*(0|50%)'
# 预期：0 匹配

# 4. 引用行号有效
grep -nE 'index\.html#L[0-9]+' case/*.html
# 预期：每条引证对应实际存在的行
```

### 4.2 视觉验证

打开 3 份 case 文件，肉眼检查：
- 5 维度分数与 Diagnosis 描述一致（高分离不开"需要改进"）
- Quick Win 全部 ≤ 5 分钟可完成（无"重新设计 Hero"）
- Keep 和 Fix 不冲突
- Suggestion 3 个方向真正差异化（不是同方向微调）

### 4.3 纪律自检

- 至少 1 维度 ≤ 6
- 总分不是简单平均
- 每条评分有 `index.html#L行号` 证据
- 创新性分数合理（不强行 ≥ 7）

### 4.4 链接验证

```bash
# 5. index.html 的 3 个 case 链接仍指向正确文件
grep -nE 'href="case/' index.html
# 预期：3 行，分别指向 Design Review / Score Improvement / Design Suggestion
```

---

## 5. 改动文件清单

| 文件 | 类型 | 状态 |
|------|------|------|
| `case/Design Review — Landing Page.html` | 修改 | 重写内容，骨架保留 |
| `case/Score Improvement — Landing Page.html` | 修改 | 重写内容，骨架保留 |
| `case/Design Suggestion — Landing Page.html` | 修改 | 重写内容，骨架保留 |
| `index.html` | **不修改** | 链接仍指向同文件名 |
| `SKILL.md` / `README.md` | **不修改** | 范围外 |

**不创建新文件**（3 份 case 是替换，不新增报告格式）。
**不修改 `case/Project Strategy — Design Review.html`**（那是 Steve Jobs persona 战略文档，与 3 份审查产物是不同文件类型）。
