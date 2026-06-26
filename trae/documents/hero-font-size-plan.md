# Hero 区域字体大小调整计划

## 项目研究结论

当前项目是一个纯 HTML 文件，CSS 内嵌在 `<style>` 标签中。已定义的字体大小变量包括：`--text-12px`、`--text-14px`、`--text-16px`、`--text-18px`、`--text-24px`、`--text-32px`、`--text-36px`、`--text-48px`。

用户提供了 14 项页面反馈，主要涉及 hero 区域的字体大小调整，需要新增 `--text-20px` 和 `--font-weight-light` 变量。

## 需要编辑的文件

- `/Users/ruishengzhang/Documents/GitHub/monkren-design/index.html`

## 修改步骤

### 步骤 1：新增 CSS 变量

在 `:root` 中添加：
- `--text-20px: 20px`
- `--font-weight-light: 300`

### 步骤 2：更新 h1 样式

修改位置：第 175-182 行
- font-size: `var(--text-48px)` → `var(--text-36px)`
- line-height: `var(--leading-tight)` → `var(--leading-normal)`（约等于 44px/36px = 1.22）
- font-weight: `var(--font-weight-regular)` → `var(--font-weight-light)`

### 步骤 3：更新导航样式

修改位置：第 126-133 行
- .nav font-size: `var(--text-24px)` → `var(--text-18px)`

### 步骤 4：更新 eyebrow 样式

修改位置：第 158-167 行
- .eyebrow font-size: `var(--text-24px)` → `var(--text-16px)`

### 步骤 5：更新 lead 样式

修改位置：第 190-196 行
- .lead font-size: `var(--text-24px)` → `var(--text-20px)`

### 步骤 6：更新按钮样式

修改位置：第 203-218 行
- .btn font-size: `var(--text-24px)` → `var(--text-18px)`

### 步骤 7：更新 hero-note 样式

修改位置：第 232-239 行
- .hero-note font-size: `var(--text-24px)` → `var(--text-16px)`

### 步骤 8：更新 panel-bar 样式

修改位置：第 248-260 行
- .panel-bar font-size: `var(--text-24px)` → `var(--text-20px)`

### 步骤 9：更新 report-header 样式

修改位置：第 283-294 行
- .report-header strong font-size: `var(--text-24px)` → `var(--text-18px)`
- .report-header span font-size: `var(--text-24px)` → `var(--text-18px)`

### 步骤 10：更新 score-bar 相关样式

修改位置：第 308-334 行
- .score-bar font-size: `var(--text-24px)` → `var(--text-16px)`
- .score-bar-value font-size: 添加 `var(--text-20px)`

### 步骤 11：更新 severity-tag 样式

修改位置：第 341-350 行
- .severity-tag font-size: `var(--text-24px)` → `var(--text-16px)`

### 步骤 12：更新 SVG 文本样式

修改位置：第 1198 行附近的 SVG text 元素
- font-size: `8` → `var(--text-16px)`

## 潜在依赖和注意事项

1. **新变量需求**：需要新增 `--text-20px` 和 `--font-weight-light` 变量以保持设计系统一致性
2. **响应式设计**：需要检查移动端媒体查询中是否有相关的字体大小覆盖，确保响应式行为正确
3. **SVG 内联样式**：SVG 中的 font-size 是直接属性，需要单独处理

## 风险处理

1. 如果某些元素的字体大小在其他地方被覆盖，需要确保修改的优先级正确
2. h1 的 line-height 需要精确到 44px，可能需要使用固定值而非变量

## 修改对照表

| 目标元素 | 当前值 | 目标值 | CSS 变量 |
|---------|--------|--------|---------|
| h1 | 48px / 1 / 400 | 36px / 44px / 300 | `--text-36px` / `--leading-normal` / `--font-weight-light` |
| .nav | 24px | 18px | `--text-18px` |
| .eyebrow | 24px | 16px | `--text-16px` |
| .lead | 24px | 20px | `--text-20px` (新增) |
| .btn | 24px | 18px | `--text-18px` |
| .hero-note | 24px | 16px | `--text-16px` |
| .panel-bar | 24px | 20px | `--text-20px` |
| .report-header strong | 24px | 18px | `--text-18px` |
| .report-header span | 24px | 18px | `--text-18px` |
| .score-bar | 24px | 16px | `--text-16px` |
| .score-bar-value | 继承 24px | 20px | `--text-20px` |
| .severity-tag | 24px | 16px | `--text-16px` |
| SVG text | 8 | 16px | `16` |
