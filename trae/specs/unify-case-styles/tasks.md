# Tasks

- [ ] Task 1: 定义统一设计 token 模板（深色极简零圆角体系）
  - [ ] SubTask 1.1: 创建标准 `:root` CSS 变量定义块（语义化颜色 token、字体、8pt 间距、零圆角、1px 边框、页面宽度）
  - [ ] SubTask 1.2: 定义标准 body 基础样式（字号 15px、行高 1.6、颜色 var(--color-text-primary)、背景 var(--color-canvas)）
  - [ ] SubTask 1.3: 定义标准 header 结构样式（eyebrow + h1 + lead/sub，深色适配）
  - [ ] SubTask 1.4: 定义标准面板/卡片样式（零圆角、1px solid var(--border-color) 边框、var(--surface-muted) 背景）

- [ ] Task 2: 更新阵营 A 的 3 个页面 token 命名
  - [ ] SubTask 2.1: Design Review — Landing Page.html：替换非标准间距 token 为 `--space-*` 系列，替换颜色 token 为语义化命名
  - [ ] SubTask 2.2: Design Suggestion — Landing Page.html：同上
  - [ ] SubTask 2.3: Score Improvement — Landing Page.html：同上
  - [ ] SubTask 2.4: 清理内联样式，统一使用 CSS 类

- [ ] Task 3: 迁移阵营 B 标准文档页面（15 个页面）
  - [ ] SubTask 3.1: Background jobs — header illustrations.html
  - [ ] SubTask 3.2: Birchline — Cycle 14 triage.html
  - [ ] SubTask 3.3: Birchline — Engineering Status — Week 11.html
  - [ ] SubTask 3.4: Birchline — Sidebar drag-to-reorder.html
  - [ ] SubTask 3.5: Birchline — Support reply prompt tuner.html
  - [x] SubTask 3.6: Birchline — Task completed micro-interaction.html
  - [x] SubTask 3.7: Birchline — flags.production.json.html
  - [x] SubTask 3.8: How authentication flows through birchline_web.html
  - [x] SubTask 3.9: How rate limiting works in birchline_api.html
  - [x] SubTask 3.10: INC-2025-0412 — Elevated 502s on task sync.html
  - [ ] SubTask 3.11: Implementation plan — Comment threads on task cards.html
  - [ ] SubTask 3.12: PR #247 — Review Summary.html
  - [ ] SubTask 3.13: PR #312 — Move notification delivery onto a queue.html
  - [ ] SubTask 3.14: The unreasonable effectiveness of HTML — examples.html
  - [ ] SubTask 3.15: Birchline — Design System Reference.html

- [x] Task 4: 迁移阵营 B 特殊布局页面（6 个页面）
  - [x] SubTask 4.1: Platform Eng — Week of Mar 10.html：统一 token 和配色为深色，保留幻灯片布局
  - [x] SubTask 4.2: Debounced search — three approaches.html：统一 token 和配色为深色，保留三栏布局
  - [x] SubTask 4.3: Empty state — four visual directions.html：统一 token 和配色为深色，保留分段控件
  - [x] SubTask 4.4: Birchline — Card Variant Matrix.html：统一 token 和配色为深色，保留交互滑块
  - [x] SubTask 4.5: Consistent hashing — an interactive explainer.html：统一 token 和配色为深色，保留双栏布局和 `--sky` 扩展色（适配深色）
  - [x] SubTask 4.6: Deploy pipeline — annotated flowchart.html：统一 token 和配色为深色，保留流程图布局和 `--rust` 扩展色（适配深色）

# Task Dependencies
- [Task 2] 依赖 [Task 1]（需要先定义标准 token 模板）
- [Task 3] 依赖 [Task 1]（需要先定义标准 token 模板）
- [Task 4] 依赖 [Task 1]（需要先定义标准 token 模板）
- [Task 2] [Task 3] [Task 4] 可并行执行
