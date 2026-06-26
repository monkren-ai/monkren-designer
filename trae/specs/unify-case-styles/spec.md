# 统一全部 Case 页面样式 Spec

## Why

case 目录下 24 个 HTML 页面存在两套完全不同的设计系统（深色极简零圆角 vs 浅色暖调圆角面板），且阵营 B 内部灰阶命名、间距、字号等 token 也不统一，导致视觉体验割裂、维护成本高。

## What Changes

* 统一全部 case 页面为一套设计 token 系统（基于阵营 A 的深色极简零圆角体系，参考阵营 B 的结构化 token 命名和 8pt 网格优化）

* 将阵营 B 的 21 个浅色页面迁移至深色极简设计系统

* 参考阵营 B 的 `--radius-panel` / `--radius-row` / `--border` 等结构化 token 命名，优化阵营 A 的 token 体系

* 参考阵营 B 的 8pt 网格间距体系，规范化阵营 A 的非标准间距值

* 统一灰阶命名规范（深色体系下使用 `--surface-muted` / `--surface-subtle` / `--text-primary` / `--text-secondary` 等语义化命名）

* 统一页面最大宽度 token（`--page-max-width`）

* 统一 body 字号、行高、内边距

* 统一字体回退栈

* 统一容器类名

* 保留功能性偏离页面的特殊布局（Platform Eng 幻灯片、Debounced search 三栏等），仅统一其 token 命名和配色

## Impact

* Affected specs: 全部 case 页面的视觉表现

* Affected code: `/case/` 目录下全部 24 个 HTML 文件

## ADDED Requirements

### Requirement: 统一设计 Token 系统

全部 case 页面 SHALL 使用同一套 `:root` CSS Custom Properties，基于深色极简零圆角体系，包括颜色、字体、间距、圆角、边框等 token。

#### Scenario: 颜色 token 统一

* **WHEN** 打开任意 case 页面

* **THEN** `:root` 中定义的颜色 token 名称和色值完全一致，使用深色背景（`#000000`）+ 白色前景（`#ffffff`）+ 灰阶层级

#### Scenario: 字体 token 统一

* **WHEN** 打开任意 case 页面

* **THEN** `:root` 中定义的 `--serif` / `--sans` / `--mono` 字体栈完全一致

#### Scenario: 间距 token 统一

* **WHEN** 打开任意 case 页面

* **THEN** `:root` 中定义的间距 token 遵循 8pt 网格（4/8/12/16/24/32/48/64），参考阵营 B 的规范化间距体系

### Requirement: 语义化颜色 Token 命名

全部页面 SHALL 使用语义化颜色 token 命名，而非原始色值命名：

* `--color-canvas`: 页面背景色 `#000000`

* `--color-text-primary`: 主文字色 `#ffffff`

* `--color-text-secondary`: 次要文字色 `#a9a9a9`

* `--surface-muted`: 卡片/面板背景 `rgba(255, 255, 255, .12)`

* `--surface-subtle`: 更微弱的面板背景 `rgba(255, 255, 255, .06)`

* `--border-color`: 边框色 `rgba(255, 255, 255, .2)`

#### Scenario: 语义化命名一致

* **WHEN** 检查任意 case 页面的 `:root` 定义

* **THEN** 使用语义化 token 名称（`--color-canvas` / `--color-text-primary` 等），不存在 `--ivory` / `--slate` / `--clay` / `--gray-100` 等阵营 B 原始色值命名

### Requirement: 统一页面基础样式

全部 case 页面 SHALL 使用统一的 body 基础样式：字号 `15px`、行高 `1.6`、颜色 `var(--color-text-primary)`、背景 `var(--color-canvas)`。

#### Scenario: body 样式一致

* **WHEN** 打开任意 case 页面

* **THEN** body 的 font-size 为 15px，line-height 为 1.6，color 为 var(--color-text-primary)，background 为 var(--color-canvas)

### Requirement: 统一页面最大宽度

全部 case 页面 SHALL 定义 `--page-max-width` token，标准文档页面使用 `860px`（阵营 A 原始值），宽布局页面可使用更大值但需通过 token 控制。

#### Scenario: 标准页面宽度

* **WHEN** 打开标准文档类 case 页面

* **THEN** 内容区域最大宽度为 860px

### Requirement: 统一容器类名

全部 case 页面 SHALL 使用 `.page` 作为主容器类名，消除 `.sheet` / `.wrap` 等变体。

#### Scenario: 容器类名一致

* **WHEN** 检查任意 case 页面的 HTML 结构

* **THEN** 主容器使用 `.page` 类名

### Requirement: 统一圆角为零

全部 case 页面 SHALL 使用 `border-radius: 0`，保持阵营 A 的极简零圆角风格。

#### Scenario: 零圆角一致

* **WHEN** 打开任意 case 页面

* **THEN** 面板、卡片、按钮等元素均无圆角（border-radius: 0）

### Requirement: 统一边框样式

全部 case 页面 SHALL 使用 `0.5px solid var(--border-color)` 边框样式，保持阵营 A 的细线极简风格。

#### Scenario: 边框样式一致

* **WHEN** 打开任意 case 页面

* **THEN** 面板、卡片等元素使用 1px 白色半透明边框，不存在 1.5px 或其他宽度

### Requirement: 阵营 B 页面迁移

原阵营 B 的 21 个浅色页面 SHALL 迁移至深色极简设计系统，保留其内容结构和功能组件（交互按钮、SVG 图形、表单元素等），但视觉风格与阵营 A 统一。

#### Scenario: 浅色页面迁移

* **WHEN** 打开原阵营 B 的 case 页面

* **THEN** 页面使用深色极简配色（黑色背景 + 白色前景），零圆角，1px 细线边框，与阵营 A 页面视觉一致

### Requirement: 保留功能性布局差异

具有特殊布局需求的页面（Platform Eng 幻灯片、Debounced search 三栏、Empty state 分段控件、Card Variant Matrix 交互滑块、Consistent hashing 双栏、Deploy pipeline 流程图） SHALL 保留其特殊布局，仅统一 token 命名和配色。

#### Scenario: 特殊布局保留

* **WHEN** 打开 Platform Eng 页面

* **THEN** 仍使用全屏幻灯片布局，但颜色/字体 token 与其他页面一致，使用深色配色

## MODIFIED Requirements

### Requirement: 字体回退栈统一

全部页面的字体回退栈 SHALL 统一为：

* `--serif: ui-serif, Georgia, "Times New Roman", serif`

* `--sans: system-ui, -apple-system, sans-serif`

* `--mono: ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace`

### Requirement: 间距 token 规范化

阵营 A 的非标准间距 token（`--spacing-7` / `--spacing-10` / `--spacing-13` / `--spacing-29` / `--spacing-54`） SHALL 替换为 8pt 网格对齐的间距值（参考阵营 B 的规范化间距体系），命名改为 `--space-4` / `--space-8` / `--space-12` / `--space-16` / `--space-24` / `--space-32` / `--space-48` / `--space-64`。

## REMOVED Requirements

### Requirement: 阵营 B 浅色暖调设计系统

**Reason**: 两套设计系统并存导致视觉割裂，统一为深色极简零圆角体系
**Migration**: 阵营 B 的 21 个页面迁移至深色极简体系，保留功能组件但重新定义样式

### Requirement: 非标准灰阶命名

**Reason**: `--ivory` / `--slate` / `--clay` / `--oat` / `--olive` / `--gray-100` / `--gray-150` / `--gray-300` / `--gray-500` / `--gray-700` / `--gray-800` / `--g100` / `--g200` / `--g300` / `--g500` / `--g700` 命名混乱且不适用于深色体系
**Migration**: 统一替换为语义化 token（`--color-canvas` / `--color-text-primary` / `--color-text-secondary` / `--surface-muted` / `--surface-subtle` / `--border-color`）

### Requirement: 非标准间距 token

**Reason**: 阵营 A 的 `--spacing-7` / `--spacing-10` / `--spacing-13` / `--spacing-29` / `--spacing-54` 不符合 8pt 网格
**Migration**: 替换为 `--space-4` / `--space-8` / `--space-12` / `--space-16` / `--space-24` / `--space-32` / `--space-48` / `--space-64`
