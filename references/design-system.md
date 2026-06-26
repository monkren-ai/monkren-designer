# 设计系统深度参考

> 设计必须遵守什么规则？本文档整合 DESIGN.md 9 段框架、硬编码值检测规则、合规性检查、核心资产协议、SwiftLint 规则与 Design Token 架构，作为设计审查的完整参照。

---

## 1. DESIGN.md 9 段框架完整检查清单

> 审查设计产出时的结构化对比基线。当项目无设计系统时，用此框架作为审查参照；当项目有设计系统时，逐段对比标记偏离项。

---

### 1.1 色彩（Color）

#### 审查检查项

- [ ] 色彩数量是否受控？（主色 1 + 辅色 1 + 强调色 1 + 灰阶，通常不超过 3-4 种语义色）
- [ ] 是否通过 CSS 变量/design tokens 引用颜色，而非硬编码？
- [ ] 暗色模式是否有独立调色板（非简单反色）？
- [ ] 品牌色是否使用官方色值（非近似值）？
- [ ] 强调色是否用于真正的交互元素（链接/按钮/活跃状态），而非装饰？

#### 常见问题

| 问题 | 严重度 | 示例 |
|------|--------|------|
| 5 种以上颜色无主次 | P1 ⚡ | 落地页用了 8 种颜色，看不出品牌色 |
| 硬编码颜色值 | P1 ⚡ | `color: #3b82f6` 而非 `var(--color-primary)` |
| 暗色模式简单反色 | P2 💡 | dark mode 只是 `filter: invert(1)` |
| 品牌色近似值 | P0 ⚠️ | 品牌色 `#1a56db` 写成了 `#1a5fdb` |

#### 合规色板结构

```css
:root {
  --color-primary: oklch(0.55 0.18 25);
  --color-secondary: oklch(0.45 0.10 260);
  --color-accent: oklch(0.65 0.20 150);
  --color-surface: oklch(0.97 0.005 80);
  --color-on-surface: oklch(0.15 0.02 260);
  --color-muted: oklch(0.60 0.02 260);
  --color-border: oklch(0.88 0.01 80);
}
```

---

### 1.2 排版（Typography）

#### 审查检查项

- [ ] 字体家族是否 ≤ 2 种？（display + body，mono 不计入）
- [ ] 是否通过 CSS 变量引用字体，而非硬编码 font-family？
- [ ] 字号是否遵循排版阶梯（type scale），而非随意值？
- [ ] 行高是否在合理范围（正文 1.5-1.7，中文 1.7-1.8）？
- [ ] 标题与正文对比是否 ≥ 2.5 倍？
- [ ] 是否避免了 Inter/Roboto/Arial 作为 display 字体（除非品牌指定）？

#### 常见问题

| 问题 | 严重度 | 示例 |
|------|--------|------|
| 3 种以上字体 | P1 ⚡ | 同时用了 Playfair + Inter + Roboto + Space Grotesk |
| 标题正文对比不足 | P1 ⚡ | 标题 24px 正文 16px，仅 1.5 倍对比 |
| 硬编码字体 | P1 ⚡ | `font-family: 'Helvetica Neue'` 而非 token |
| Inter 做 display | P2 💡 | Inter 太常见，看不出品牌个性 |

#### 合规排版结构

```css
:root {
  --font-lausanne: 'Lausanne', ui-sans-serif, system-ui, -apple-system;
  --font-victor-serif: 'Victor Serif', ui-serif, Georgia;
  --font-black-tie: 'Black Tie', ui-monospace, SFMono-Regular, Menlo, Consolas;

  --text-12px: 12px;
  --text-14px: 14px;
  --text-16px: 16px;
  --text-18px: 18px;
  --text-20px: 20px;
  --text-24px: 24px;
  --text-32px: 32px;
  --text-36px: 36px;
  --text-48px: 48px;
  --leading-tight: 1;
  --leading-normal: 1.2;

  --font-weight-light: 300;
  --font-weight-regular: 400;
}
```

---

### 1.3 间距（Spacing）

#### 审查检查项

- [ ] 是否使用 8pt 网格系统？（允许 4pt 子网格）
- [ ] 间距值是否通过 CSS 变量引用，而非硬编码？
- [ ] 同类元素间距是否一致？
- [ ] 是否存在非标准间距值（非 4/8 倍数）？

#### 常见问题

| 问题 | 严重度 | 示例 |
|------|--------|------|
| 间距不统一 | P1 ⚡ | 卡片间距 mix of 12px/16px/18px |
| 非 8pt 网格值 | P2 💡 | `margin: 13px`、`padding: 22px` |
| 硬编码间距 | P1 ⚡ | `gap: 24px` 而非 `var(--space-5)` |

#### 合规间距结构

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
}
```

---

### 1.4 布局（Layout）

#### 审查检查项

- [ ] 是否有统一的布局容器/网格系统？
- [ ] 响应式断点是否合理？
- [ ] 内容最大宽度是否受控？（正文 66 字符宽度，容器 ≤ 1200px）
- [ ] 对齐方式是否全局统一？（左对齐/居中/右对齐，不混用）
- [ ] 留白比例是否 ≥ 40%？

#### 常见问题

| 问题 | 严重度 | 示例 |
|------|--------|------|
| 无布局系统 | P1 ⚡ | 每个组件独立定位，无统一容器 |
| 对齐不一致 | P1 ⚡ | 标题居中，正文左对齐，CTA 右对齐 |
| 留白不足 | P1 ⚡ | 信息密度 > 80%，阅读疲劳 |
| Bento grid 滥用 | P2 💡 | 不适合 bento 的内容硬塞 bento |

---

### 1.5 组件（Components）

#### 审查检查项

- [ ] 新功能是否优先使用设计系统组件（PrimaryButton/SecondaryButton/Card 等）？
- [ ] 是否存在"绕过"设计系统自己写样式的组件？
- [ ] 组件 API 是否一致？（props 命名、事件命名、状态管理）
- [ ] 组件是否有完整的交互状态？（default/hover/active/focus/disabled）

#### 常见问题

| 问题 | 严重度 | 示例 |
|------|--------|------|
| 自定义按钮 | P1 ⚡ | `<button style="background:#1a56db">` 而非 `<PrimaryButton>` |
| 手写卡片 | P1 ⚡ | div + shadow + border-radius 而非 `<Card>` |
| 状态缺失 | P2 💡 | 按钮无 hover/active 状态 |

#### 合规组件清单

| 组件 | 设计系统组件 | 禁止的自定义实现 |
|------|-------------|-----------------|
| 按钮 | PrimaryButton / SecondaryButton / TextButton | 自定义 `<button>` 样式 |
| 输入框 | TextField / SearchField | 自定义 `<input>` 样式 |
| 卡片 | Card / ElevatedCard | 手写 div + shadow |
| 导航 | NavigationBar / TabBar | 自定义 nav 样式 |
| 弹窗 | Dialog / Modal / Alert | 自定义 overlay + 居中 div |
| 列表项 | ListItem / TableViewCell | 手写 flex 容器 |
| 标签 | Tag / Badge / Chip | 自定义 span + 圆角背景 |
| 图标 | Icon 组件 + 图标 token | 直接 `<img>` 或 SVG inline |

#### 图标专项审查

**图标设计原则**（什么时候用/不用图标、风格一致性、尺寸系统、语义匹配、可访问性）→ `references/aesthetics.md`（图标使用规范）

**审查检查项**：

- [ ] 图标是否使用统一图标库？（全文同一库，不混搭 Lucide + Heroicons 等）
- [ ] 图标风格是否一致？（filled/outline 不混用，线重统一）
- [ ] 图标尺寸是否遵循 4px 倍数？（16/20/24/32/48）
- [ ] 图标是否通过 Icon 组件 + icon token 引用，而非直接 `<img>` 或 inline SVG？
- [ ] 图标颜色是否通过 token 引用或继承文字颜色，而非硬编码？
- [ ] 可点击图标的热区是否 ≥ 44×44px？
- [ ] 图标按钮是否有 `aria-label`？
- [ ] 图标 + 文字组合中，图标是否 `aria-hidden="true"`？
- [ ] 图标与文字标签是否语义匹配？
- [ ] 是否存在装饰性图标（无语义，纯点缀）？

**常见问题**：

| 问题 | 严重度 |
|------|--------|
| 混搭图标库 | P1 ⚡ |
| 图标风格不一致 | P1 ⚡ |
| 图标尺寸不统一 | P2 💡 |
| 图标语义不匹配 | P1 ⚡ |
| 装饰性图标过多 | P1 ⚡ |
| 图标按钮无 aria-label | P0 ⚠️ |
| 硬编码图标颜色 | P1 ⚡ |
| 可点击热区不足 | P1 ⚡ |

→ 具体示例与修复方案详见 `references/aesthetics.md`（图标使用规范：尺寸系统/推荐库/语义匹配/可访问性）

---

### 1.6 动效（Motion）

#### 审查检查项

- [ ] 动效是否有功能目的（引导注意力/反馈操作/过渡状态），而非纯装饰？
- [ ] 动效时长是否在合理范围？（微交互 100-200ms，页面过渡 300-500ms）
- [ ] 是否尊重 `prefers-reduced-motion`？
- [ ] 动效是否统一？（同一类交互使用相同的 easing 和时长）

#### 常见问题

| 问题 | 严重度 | 示例 |
|------|--------|------|
| 装饰性动效过多 | P2 💡 | 每个元素都有入场动画 |
| 时长不合理 | P2 💡 | 页面过渡 2s，用户等待 |
| 忽略 reduced-motion | P1 ⚡ | 无障碍用户无法关闭动效 |
| easing 不统一 | P2 💡 | 有的 ease-in-out 有的 linear |

---

### 1.7 语调与文案（Voice & Copywriting）

**文案 slop 黑名单**（空洞词汇/编造数据/泛泛 CTA/伪专业术语/模板化表达）→ `references/aesthetics.md`（文案 Slop 完整黑名单 + 替换建议）

#### 审查检查项

- [ ] 文案语调是否与品牌定位一致？（专业/友好/权威/轻松等）
- [ ] 同一产出内语调是否统一？（不混用正式与口语、不混用第二人称与第三人称）
- [ ] 是否避免了 AI slop 词汇？（赋能/生态/智慧/颠覆/引领/一站式/全方位/深度融合）
- [ ] CTA 文案是否具体而非泛泛？（"开始免费试用 14 天" > "了解更多"）
- [ ] CTA 是否动词开头且描述用户将获得什么？
- [ ] 文案量是否与载体匹配？（落地页每屏 1 核心信息、PPT 每页 1 观点、App 每屏 1 行动）
- [ ] 是否存在"因为空所以加字"的填充文案？
- [ ] 标题是否可独立理解（不依赖正文上下文）？
- [ ] 正文是否可扫描？（短段落/列表/加粗关键信息，避免大段连续文字）
- [ ] 是否避免了"标题党"（标题与内容不匹配）？
- [ ] 中英文之间是否有空格？（"使用 React 开发" 而非 "使用React开发"）
- [ ] 专有名词大小写是否正确？（"GitHub" 而非 "github"，"iPhone" 而非 "Iphone"）
- [ ] 是否避免了中英文标点混用？（中文语境用中文标点，英文语境用英文标点）
- [ ] 是否避免了编造的 stats/quotes 装饰？

#### 常见问题

| 问题 | 严重度 |
|------|--------|
| AI slop 词汇 | P1 ⚡ |
| 编造数据 | P0 ⚠️ |
| 泛泛 CTA | P2 💡 |
| 语调不统一 | P1 ⚡ |
| 文案填充 | P1 ⚡ |
| 标题不可独立理解 | P1 ⚡ |
| 中英文无空格 | P2 💡 |
| 专有名词大小写错误 | P2 💡 |
| 中英文标点混用 | P2 💡 |

→ 具体示例、替换建议与文案结构规范详见 `references/aesthetics.md`（文案 Slop 完整黑名单 + 替换建议）

---

### 1.8 品牌（Brand）

#### 审查检查项

- [ ] Logo 是否使用真实品牌文件（SVG/PNG），而非 CSS 手画/SVG 重画？
- [ ] 产品图是否使用真实产品图，而非 CSS 剪影/通用占位？
- [ ] 品牌色是否使用官方色值，而非近似值？
- [ ] 品牌字体是否与品牌规范一致？

#### 常见问题

| 问题 | 严重度 | 示例 |
|------|--------|------|
| CSS 手画 Logo | P0 ⚠️ | 用 border-radius + border 画 Logo 轮廓 |
| CSS 剪影代产品图 | P0 ⚠️ | 任何品牌都长一样的剪影 |
| 品牌色近似值 | P0 ⚠️ | `#1a56db` 写成 `#1a5fdb` |
| 无品牌识别度 | P1 ⚡ | 只抽色值+字体，不找 Logo/产品图 |

---

### 1.9 反模式（Anti-patterns）

#### 审查检查项

- [ ] 是否避免了 AI slop 视觉特征？（紫渐变/Emoji 图标/圆角卡片+左 border accent/SVG 画人画物）
- [ ] 是否避免了过度对称？（所有元素完美居中，缺乏呼吸感）
- [ ] 是否避免了装饰大于内容？
- [ ] 是否避免了信息密度与载体不匹配？
- [ ] 是否避免了图标混搭？（同一产出使用统一图标库，不混搭 Lucide + Heroicons 等）

#### 常见问题

| 问题 | 严重度 |
|------|--------|
| 紫色渐变 | P1 ⚡ |
| Emoji 作图标 | P1 ⚡ |
| 圆角+左 border accent | P1 ⚡ |
| SVG 画人画物 | P0 ⚠️ |
| 装饰大于内容 | P1 ⚡ |
| 混搭图标库 | P1 ⚡ |
| 图标语义不匹配 | P1 ⚡ |

→ 具体示例与判断规则详见 `references/aesthetics.md`（反 AI slop 完整黑名单）

---

### 使用方式

#### 无设计系统时

用此 9 段框架作为审查基线。在审查报告中注明："该项目无设计系统，以下建议基于 DESIGN.md 9 段框架通用最佳实践。"

#### 有设计系统时

将产出与项目设计系统逐段对比：
1. 读取项目的设计系统文件（tokens.css / theme.ts / DESIGN.md 等）
2. 按此 9 段框架逐段对比
3. 标记偏离项：产出中的实现与设计系统定义不一致的地方
4. 在审查报告中分"设计系统偏离"和"通用最佳实践违反"两类列出

---

## 2. 硬编码值检测规则

审查代码时，扫描以下硬编码值并标记为审查发现项。

### 颜色值检测

**检测目标**：代码中直接使用的颜色值，应通过 CSS 变量 / design tokens / 颜色常量引用。

| 模式 | 正则 | 示例 |
|------|------|------|
| HEX | `#[0-9A-Fa-f]{3,8}` (非 CSS 变量上下文) | `color: #FF6B35` |
| RGB/RGBA | `rgba?\([^)]+\)` (非变量上下文) | `background: rgba(0,0,0,0.5)` |
| HSL/HSLA | `hsla?\([^)]+\)` (非变量上下文) | `color: hsl(210, 100%, 50%)` |

**合规写法**：
```css
:root {
  --color-primary: #FF6B35;
  --color-surface: rgba(0, 0, 0, 0.05);
}
.button { background: var(--color-primary); }
```

**不合规写法**：
```css
.button { background: #FF6B35; }
.card { border-color: rgba(0, 0, 0, 0.1); }
```

**Swift 代码检测**：
```swift
// ❌ 硬编码
view.backgroundColor = UIColor(red: 1.0, green: 0.42, blue: 0.21, alpha: 1.0)
label.textColor = UIColor(hex: "#FF6B35")

// ✅ Design token
view.backgroundColor = DS.Colors.primary
label.textColor = DS.Colors.primary
```

### 字体值检测

**检测目标**：代码中直接声明的 font-family，应通过设计系统字体 token 引用。

| 模式 | 说明 |
|------|------|
| `font-family:` 直接声明 | 应使用字体 token / CSS 变量 |
| `UIFont(name:size:)` 硬编码字体名 | 应使用设计系统字体扩展 |
| `font-size:` 非标准值 | 应使用排版阶梯（type scale） |

**合规写法**：
```css
:root {
  --font-lausanne: 'Lausanne', ui-sans-serif, system-ui, -apple-system;
  --font-victor-serif: 'Victor Serif', ui-serif, Georgia;
  --font-black-tie: 'Black Tie', ui-monospace, SFMono-Regular, Menlo, Consolas;
  --text-12px: 12px;
  --text-14px: 14px;
  --text-16px: 16px;
  --text-18px: 18px;
  --text-20px: 20px;
  --text-24px: 24px;
  --text-32px: 32px;
  --text-36px: 36px;
  --text-48px: 48px;
  --font-weight-light: 300;
  --font-weight-regular: 400;
}
h1 { font-family: var(--font-lausanne); font-size: var(--text-36px); font-weight: var(--font-weight-light); }
```

**Swift 合规写法**：
```swift
// ✅ Design token
label.font = DS.Typography.heading1
titleLabel.font = DS.Typography.body
```

### 间距值检测

**检测目标**：非标准间距值或直接数字，应通过间距 token / 8pt 网格系统引用。

| 模式 | 说明 |
|------|------|
| 非 4/8 倍数的间距值 | 违反 8pt 网格系统（允许 4pt 子网格） |
| `margin`/`padding` 直接数字 | 应使用间距 token |
| `NSLayoutConstraint` 硬编码间距 | 应使用间距常量 |

**8pt 网格合规值**：4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96

**合规写法**：
```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
}
.card { padding: var(--space-3); margin-bottom: var(--space-4); }
```

**Swift 合规写法**：
```swift
// ✅ Design token
stackView.spacing = DS.Spacing.md // 16
constraint.constant = DS.Spacing.lg // 24
```

---

## 3. 设计系统合规性检查

### 组件使用合规性

**核心规则**：新功能必须优先使用设计系统组件，而非自定义实现。

| 检查项 | 合规 | 不合规 |
|--------|------|--------|
| 按钮 | `PrimaryButton` / `SecondaryButton` / `TextButton` | 自定义 `<button>` 或 `UIButton` 样式 |
| 输入框 | `TextField` / `SearchField` | 自定义 `<input>` 样式 |
| 卡片 | `Card` / `ElevatedCard` | 手写 div + shadow + border-radius |
| 导航 | `NavigationBar` / `TabBar` | 自定义 nav 样式 |
| 弹窗 | `Dialog` / `Modal` / `Alert` | 自定义 overlay + 居中 div |
| 列表项 | `ListItem` / `TableViewCell` | 手写 flex 容器 |
| 标签 | `Tag` / `Badge` / `Chip` | 自定义 span + 圆角背景 |
| 图标 | `Icon` 组件 + 图标 token | 直接 `<img>` 或 SVG inline |

**审查报告格式**：
```
### 设计系统合规性
- ✅ PrimaryButton：3 处使用，合规
- ❌ 自定义按钮样式：2 处（L45, L128），应替换为 SecondaryButton
- ❌ 手写卡片组件：1 处（L67），应替换为 Card
```

### 品牌资产协议合规性

| 检查项 | 合规 | 不合规 |
|--------|------|--------|
| Logo | `<img src="...">` 引用真实文件 | CSS 手画 / SVG 重画 |
| 产品图 | `<img>` 引用真实产品图 | CSS 剪影 / 通用占位图 |
| 品牌色 | `var(--brand-primary)` | `#FF6B35` 硬编码 |
| 品牌字体 | `var(--font-display)` | `font-family: 'Inter'` 硬编码 |

---

## 4. 核心资产协议

> **审查涉及具体品牌的设计时，检查品牌资产是否被正确使用。** 这是设计质量从 40 分到 90 分的分水岭。

品牌的本质是「它被认出来」→ `references/philosophy.md`（品牌的哲学：被认出来）

### 审查清单

| 资产类型 | 识别度贡献 | 审查检查 |
|---|---|---|
| **Logo** | 最高 | 是否使用了真实 logo 文件（SVG/PNG），而非手画/CSS 剪影？ |
| **产品图/产品渲染图** | 极高 | 实体产品是否有真实产品图，而非 CSS 剪影/SVG 手画？ |
| **UI 截图/界面素材** | 极高 | 数字产品是否有真实 UI 截图，而非通用占位？ |
| **色值** | 中 | 色值是否从品牌规范提取，而非凭空发明？是否通过 CSS 变量/design tokens 引用？ |
| **字体** | 低 | 字体是否与品牌规范一致？ |

### 常见违规模式

| 违规 | 问题 | 严重度 |
|---|---|---|
| 只抽色值 + 字体、不找 logo / 产品图 / UI | 品牌识别度缺失 | ⚠️致命 |
| 用 CSS 剪影/SVG 手画替代真实产品图 | 任何品牌都长一样，识别度归零 | ⚠️致命 |
| 找不到资产不告诉用户、硬做 | 产出 generic 设计 | ⚡重要 |
| 临场发明品牌色（"接近但不是"的 hex） | 品牌一致性崩溃 | ⚡重要 |
| 产品截图里混入 demo 品牌色 | 品牌色污染 | 💡优化 |

### 素材质量门槛「5-10-2-8」原则

审查素材质量时参考：

| 维度 | 标准 | 反模式 |
|---|---|---|
| **5 轮搜索** | 多渠道交叉搜，不是一轮抓前 2 个就停 | 第一页结果直接用 |
| **10 个候选** | 至少凑 10 个备选才开始筛 | 只抓 2 个，没得选 |
| **选 2 个好的** | 从 10 个里精选 2 个作为最终素材 | 全都用 = 视觉过载 + 品位稀释 |
| **每个 8/10 分以上** | 不够 8 分宁可不用 | 凑数 7 分素材 |

**Logo 例外**：有就必须用，不适用「5-10-2-8」。因为 logo 是识别度根基——就算 logo 本身只有 6 分，也比没有 logo 强 10 倍。

---

## 5. SwiftLint 规则完整配置

为 Swift 项目提供自定义 SwiftLint 规则，自动检测硬编码字体、间距、颜色值。

### 自定义规则配置

```yaml
# .swiftlint.yml

custom_rules:
  hardcoded_color_hex:
    name: "Hardcoded Color (Hex)"
    regex: '(?:UIColor|NSColor)\(hex:\s*"#[0-9A-Fa-f]{6}"'
    message: "使用 DS.Colors token 替代硬编码 HEX 颜色值"
    severity: warning

  hardcoded_color_rgb:
    name: "Hardcoded Color (RGB)"
    regex: '(?:UIColor|NSColor)\(\s*red:\s*[\d.]+'
    message: "使用 DS.Colors token 替代硬编码 RGB 颜色值"
    severity: warning

  hardcoded_color_literal:
    name: "Hardcoded Color Literal"
    regex: '#colorLiteral\('
    message: "使用 DS.Colors token 替代 color literal"
    severity: warning

  hardcoded_font:
    name: "Hardcoded Font"
    regex: 'UIFont\(\s*name:\s*"'
    message: "使用 DS.Typography token 替代硬编码字体名"
    severity: warning

  hardcoded_system_font:
    name: "Hardcoded System Font with Size"
    regex: 'UIFont\.systemFont\(ofSize:\s*\d+'
    message: "使用 DS.Typography token 替代硬编码系统字体大小"
    severity: warning

  hardcoded_spacing_constraint:
    name: "Hardcoded Spacing (Constraint)"
    regex: 'NSLayoutConstraint.*constant\s*=\s*\d+'
    message: "使用 DS.Spacing token 替代硬编码间距值"
    severity: warning

  non_standard_spacing:
    name: "Non-Standard Spacing Value"
    regex: '(?:spacing|padding|margin|inset).*?=\s*(?!(?:4|8|12|16|20|24|32|40|48|56|64|72|80|96)\b)\d+'
    message: "间距值应为 4pt 网格的倍数（4, 8, 12, 16, 24, 32, 48, 64...）"
    severity: warning

  custom_button_instead_of_design_system:
    name: "Custom Button Instead of Design System"
    regex: 'UIButton\(\s*type:\s*\.custom\)'
    message: "优先使用 DS.PrimaryButton / DS.SecondaryButton 替代自定义按钮"
    severity: warning

  hardcoded_sf_symbol:
    name: "Hardcoded SF Symbol"
    regex: 'UIImage\(systemName:\s*"'
    message: "使用 DS.Icons token 替代硬编码 SF Symbol 名称"
    severity: warning

  hardcoded_icon_size:
    name: "Hardcoded Icon Size"
    regex: '\.symbolConfiguration\(|\.configuration\(pointSize:\s*\d+'
    message: "使用 DS.IconSize token 替代硬编码图标尺寸"
    severity: warning
```

---

## 6. Design Token 架构完整代码

```swift
enum DS {
    enum Colors {
        static let primary = UIColor(hex: "#FF6B35")
        static let secondary = UIColor(hex: "#2D3436")
        static let accent = UIColor(hex: "#00B894")
        static let surface = UIColor(hex: "#FAFAFA")
        static let onSurface = UIColor(hex: "#1A1A1A")
    }

    enum Typography {
        static let heading1 = UIFont.systemFont(ofSize: 32, weight: .bold)
        static let heading2 = UIFont.systemFont(ofSize: 24, weight: .semibold)
        static let body = UIFont.systemFont(ofSize: 16, weight: .regular)
        static let caption = UIFont.systemFont(ofSize: 12, weight: .regular)
    }

    enum Spacing {
        static let xs: CGFloat = 4
        static let sm: CGFloat = 8
        static let md: CGFloat = 16
        static let lg: CGFloat = 24
        static let xl: CGFloat = 32
        static let xxl: CGFloat = 48
    }

    enum Icons {
        static let search = "magnifyingglass"
        static let settings = "gearshape"
        static let close = "xmark"
        static let add = "plus"
        static let delete = "trash"
        static let edit = "pencil"
        static let share = "square.and.arrow.up"
        static let download = "arrow.down.circle"
    }

    enum IconSize {
        static let xs: CGFloat = 16
        static let sm: CGFloat = 20
        static let md: CGFloat = 24
        static let lg: CGFloat = 32
    }
}
```

---

**版本**：v1.2 / **更新日期**：2026-05-07