# Monkren × 通用 Agent 差异优势章节 — 实施计划

> Plan v1 · 2026-07-15 · 用户已确认对比范围（全谱系 3 类对手）+ 呈现形式（横向对比列表）

---

## 1. Summary

在 [index.html](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html) 新增一个独立 section「Difference · 1 个 design agent，不是 1 个 agent」，横向列出 5 条 monkren 与「通用 coding agent / AI 设计工具 / Review 工具」的能力差异。复用现有 `.stage` / `.discipline` 视觉语言，新增 1 个 `.diff-row` 组件。

不修改 SKILL.md / README.md / 任何 skill 文件。差异化定位已经在 SKILL.md / README 中存在，本计划仅把它"显性化"到 landing page。

---

## 2. Current State Analysis

**index.html 当前结构**（[link](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html#L256-L389)）：
1. `<header class="top">` — 品牌 + 版本
2. `<section class="hero">` — 1 屏核心
3. `<section id="proof">` — 3 份真实审查报告
4. `<section id="method">` — 5 阶段
5. `<section id="disciplines">` — 4 评分纪律
6. `<footer>` — 链接 + 版权

**视觉语言已就位**：
- `.section` 共享 padding / divider
- `.stage` / `.discipline` 都是「编号 + 文案」两列网格（`grid-template-columns: auto 1fr`）
- `--color-warn: #d4ff00` 用作编号强调色
- 字体：Lausanne（body）/ Victor Serif（h2）/ Black Tie（label）

**差异化内容已存在但分散**：
- SKILL.md §3-4 5 维度 + 4 纪律（定位层）
- README.md「5 维度 + 4 纪律」章节
- index.html `disciplines` section（只展示 4 纪律）
- hero queries（只展示招牌动作）
- **缺失**：没有横向对比，没有显式说 monkren 与"通用 agent"的关系

**用户已确认**：
- 对比范围：全谱系 3 类（通用 coding agent / AI 设计工具 / Review 工具）
- 形式：横向对比列表（沿用 `.discipline` 风格）

---

## 3. Proposed Changes

### 3.1 新增 section — `<section id="difference">`

**位置**：插在 `<section id="disciplines">` 之后，`<footer>` 之前（约 line 388-389 之间）。

**内容**：1 个 section-head + 5 条 diff-row + 1 段收尾 callout。

#### 3.1.1 Section head

```html
<span class="eyebrow">Difference · 1 个 design agent，不是 1 个 agent</span>
<h2 id="difference-title">monkren = 1 个 design agent。通用 agent 是 1 个 coder。</h2>
<p>它们回答"怎么做出来"。monkren 额外回答"做出来好不好 · 像不像你 · 怎么修到 9 分"。</p>
```

#### 3.1.2 5 条横向 diff-row

每行 4 列：`维度` / `通用 coding agent` / `AI 设计工具` / `monkren`（高亮）。第 5 列隐藏（Review 工具 维度短文本塞进前三列之一，避免太宽）。

| # | 维度 | 通用 coding agent | AI 设计工具 | Review 工具 | **monkren** |
|---|------|------|------|------|------|
| 01 | **方法论** | 按 prompt 实现 | 按 prompt 生成组件 | 按 checklist 打勾 | **5 维度评审**（哲学一致性 / 视觉层级 / 细节执行 / 功能性 / 创新性） |
| 02 | **反馈形式** | 输出代码 | 输出原型 / 截图 | 输出"是否通过" | **5 维度分数 + 文件路径 + 行号 + 元素名**（强制引证） |
| 03 | **诚实底线** | 鼓励用户上手 | 鼓励用户"再多生成几次" | 默认打 8/10 | **4 评分纪律**（禁通胀 / 禁上浮 / 必须引证 / 创新性允许 5/10） |
| 04 | **生命周期** | 写代码 | 画原型 | 审成品 | **5 阶段可迭代**（调研 → 创作 → 执行 → 审查 → 改进，反馈回到 02） |
| 05 | **人格一致性** | 切换 model / persona | 切换风格 | 工具与 agent 分离 | **1 个 design taste 贯穿 5 阶段**（同一段对话不换人） |

#### 3.1.3 收尾 callout

```html
<div class="callout">
  <strong>为什么用 "design agent" 不是 "skill bundle"</strong>
  bolt / v0 / cursor 是工具箱——它们的"好品味"分散在 prompt 和 preset 里。
  monkren 是 1 个 agent——"好品味"写进 5 维度和 4 纪律的硬规则里，每条输出都按它走。
</div>
```

### 3.2 新增 CSS — 复用现有 token

追加在 `/* Compat agents */` 之前（约 line 217）：

```css
/* Difference (4 列横向对比) */
.diff-grid { display: grid; gap: var(--space-12); }
.diff-row {
  display: grid;
  grid-template-columns: 180px 1fr 1fr 1fr 1.4fr;
  gap: var(--space-16);
  align-items: start;
  border: var(--border-w) solid var(--color-arctic-white);
  padding: var(--space-20);
}
.diff-row .num {
  font-family: var(--font-black-tie);
  font-size: var(--font-size-xl);
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-warn);
  flex: 0 0 auto;
}
.diff-row .cell { font-size: var(--font-size-md); line-height: 1.4; }
.diff-row .cell b {
  display: block;
  font-family: var(--font-black-tie);
  font-size: var(--font-size-xs);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--color-subtle-gray);
  font-weight: 400;
  margin-bottom: 4px;
}
.diff-row .cell.is-monkren {
  border-left: var(--border-w) solid var(--color-warn);
  padding-left: var(--space-16);
  margin-left: calc(-1 * var(--space-16));
  color: var(--color-arctic-white);
}
.callout {
  margin-top: var(--space-28);
  border: var(--border-w) dashed var(--color-arctic-white);
  padding: var(--space-20);
  color: var(--color-subtle-gray);
  font-size: var(--font-size-md);
  line-height: 1.5;
}
.callout strong {
  display: block;
  font-family: var(--font-black-tie);
  font-size: var(--font-size-xs);
  letter-spacing: var(--letter-spacing-xwide);
  text-transform: uppercase;
  color: var(--color-warn);
  margin-bottom: var(--space-8);
}

/* 移动端：4 列合并为 1 列 + 子标题 */
@media (max-width: 720px) {
  .diff-row {
    grid-template-columns: auto 1fr;
    gap: var(--space-12);
  }
  .diff-row .cell { grid-column: 2; }
  .diff-row .cell b { margin-top: var(--space-8); }
  .diff-row .cell.is-monkren { border-left: none; padding-left: 0; margin-left: 0; }
}
```

> 5 列：`(180px) (1fr) (1fr) (1fr) (1.4fr)` 第四列（Review 工具）合并到第三列 AI 设计工具的子描述里，避免宽度过载。实际 HTML 写 4 列 cell。

### 3.3 HTML 结构

```html
<section id="difference" class="section" aria-labelledby="difference-title">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Difference · 1 个 design agent，不是 1 个 agent</span>
      <h2 id="difference-title">monkren = 1 个 design agent。通用 agent 是 1 个 coder。</h2>
      <p>它们回答"怎么做出来"。monkren 额外回答"做出来好不好 · 像不像你 · 怎么修到 9 分"。</p>
    </div>
    <div class="diff-grid">
      <div class="diff-row">
        <span class="num">01</span>
        <span class="cell"><b>维度</b>方法论</span>
        <span class="cell"><b>通用 coding agent</b>按 prompt 实现</span>
        <span class="cell"><b>AI 设计工具 · Review 工具</b>按组件生成 · 按 checklist 打勾</span>
        <span class="cell is-monkren"><b>monkren</b>5 维度评审（哲学 / 层级 / 细节 / 功能 / 创新）</span>
      </div>
      <!-- ... 04 行类似 ... -->
    </div>
    <div class="callout">
      <strong>为什么用 "design agent" 不是 "skill bundle"</strong>
      bolt / v0 / cursor 是工具箱——"好品味"分散在 prompt 和 preset 里。
      monkren 是 1 个 agent——"好品味"写进 5 维度 + 4 纪律的硬规则里，每条输出都按它走。
    </div>
  </div>
</section>
```

---

## 4. Assumptions & Decisions

1. **不写对比表（`<table>`）**：HTML 表格读屏体验差 + 与现有 `.case`/`.stage` 的 div-grid 风格不一致。改用 div-grid 模拟 4 列。
2. **不写 5 列**：Review 工具维度短且不总是存在（没有 4 条都好填），合并到第 3 列子描述里。
3. **不更新 SKILL.md / README.md**：差异化定位已经在 SKILL.md §3-4 / README 「5 维度 + 4 纪律」中；本计划只让 landing page 显性化。
4. **不写"vs 列表"叙事**：避免变成"贬低竞品"调性。改用"它们做 X，monkren 做 Y" 的中性表达。
5. **monkren 列高亮用左边框 + warn 色**（不是背景色变化）——避免和 `.case:hover` 的反色 hover 冲突。
6. **移动端折叠为 1 列堆叠**，每行变成"编号 + 4 个 cell"纵向。
7. **加 callout 收尾**说明"为什么是 1 个 agent 不是 1 个 skill bundle"——这是 Steve Jobs review 里的关键判断。

---

## 5. Verification

执行完毕后逐项验证：

1. **桌面端**（1280px 视口）：
   - 打开 [index.html](file:///Users/ruishengzhang/Documents/GitHub/monkren%20designer/index.html) 在浏览器
   - 滚到 "Difference" section
   - 4 列对齐：维度 / 通用 / 设计 / monkren
   - monkren 列左边有 warn 色边框
   - 5 条 diff-row 间距统一 12px
   - callout 收尾在底部，warn 色 label + 灰色说明

2. **移动端**（≤720px）：
   - diff-row 折叠为 1 列（编号 + 4 cell 纵向）
   - cell 之间无视觉粘连
   - monkren 列左边框消失（避免视觉噪声）
   - callout 保持 dashed border

3. **可访问性**：
   - `aria-labelledby="difference-title"` 关联标题
   - cell `<b>` 标签用 display:block 不影响读屏
   - 4 阶段色彩对比 ≥ 4.5:1（黑底白字 + warn 色强调）

4. **章节顺序**：Difference 在 Disciplines 之后 / Footer 之前，与"方法 → 纪律 → 差异"递进逻辑一致。

5. **总行数变化**：约 +80 行（section + 5 row + callout + CSS）。

---

## 6. Out of Scope

- ❌ 不更新 SKILL.md / README.md / 任何 skill 文件
- ❌ 不写 "vs 列表" 攻击性内容
- ❌ 不引入新颜色 token（只用现有的 `--color-arctic-white` / `--color-warn` / `--color-subtle-gray`）
- ❌ 不做 hero 区的 4 大对手 logo 墙（plan 阶段不扩 scope）
- ❌ 不更新 strategy 文档（v6.0.1 待用户确认后再追加）
