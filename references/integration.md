# Lazyweb MCP 集成参考

> ⚠️ **INTERNAL · v5.0 起标 internal** · 不对外展示，仅供 agent 内部使用。
> 公开 reference：beliefs / standards / methods-review。详细策略见根 [SKILL.md §7](../../SKILL.md#7-三层边界) / [§9](../../SKILL.md#9-完整-reference-索引9-份)。
>
> 回答「参考搜索怎么做？」——Lazyweb MCP 在 monkren-design 审查工作流中的集成规范，涵盖 MCP 配置、搜索工作流、降级策略、输出规范、冲突处理、搜索策略的完整执行标准。

---

## 核心原则

> 以下原则贯穿全文，任何具体规则与原则冲突时，原则优先。

| 原则 | 含义 | 违反后果 |
|------|------|---------|
| **MCP 是增强，不是依赖** | MCP 可用时提升审查质量，不可用时审查照常运行 | 降级到纯哲学/规则驱动审查，不阻塞、不报错、不降低报告完整性 |
| **截图是佐证，不是标准** | 截图证明"行业常见做法"，不定义"应该怎么做" | 截图不能推翻哲学判断，只能标注为"行业惯例参考" |
| **哲学判断永远优先** | 当截图模式与哲学判断冲突时，以哲学判断为准 | 冲突时截图标注为"行业常见但与本审查哲学不一致" |
| **visionDescription 质量门禁强制执行** | 不读 visionDescription 就用截图 = 不验证就用 | 跳过质量门禁的截图不得进入审查报告 |
| **优雅降级确保审查始终可用** | 任何 MCP/Web 故障不影响审查输出 | 降级模式报告注明数据来源，不伪造截图 |

---

## 1. MCP 配置说明

### 1.1 健康检查：lazyweb_health

每次审查工作流启动时，先执行健康检查确认 MCP 可用。

**调用时机**：Step 2（提取设计上下文）之后、Step 4（执行审查）之前。

**调用方式**：

```
lazyweb_health()
```

**返回值判断**：

| 返回状态 | 含义 | 后续动作 |
|---------|------|---------|
| `status: "ok"` | MCP 服务正常 | 进入 Full mode，执行参考搜索 |
| `status: "degraded"` | MCP 服务降级（部分功能不可用） | 进入 Partial mode，仅使用可用功能 |
| `status: "error"` / 无响应 / 超时 | MCP 不可用 | 进入 Minimal mode，纯哲学/规则驱动 |

**超时设置**：健康检查超时 5 秒。5 秒内无响应视为不可用，直接降级。

**禁止行为**：
- ❌ 跳过健康检查直接调用搜索
- ❌ 健康检查失败后重试超过 1 次
- ❌ 健康检查失败时阻塞审查流程

### 1.2 参考搜索：lazyweb_search

**调用规范**：

```
lazyweb_search(
  query: string,        // 搜索关键词
  platform?: string,    // 平台过滤："mobile" | "desktop"
  category?: string,    // 设计类型："landing-page" | "dashboard" | "e-commerce" | "settings" | "onboarding" | ...
  company?: string,     // 竞品公司名："stripe" | "notion" | "figma" | ...
  limit?: number        // 返回数量，默认 5，最大 10
)
```

**参数说明**：

| 参数 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `query` | 是 | 搜索关键词，应具体而非泛泛 | `"SaaS pricing page hero section"` ✅ / `"good design"` ❌ |
| `platform` | 否 | 平台过滤，根据审查对象类型选择 | Mobile App → `"mobile"`，Web App → `"desktop"` |
| `category` | 否 | 设计类型过滤，缩小搜索范围 | `"landing-page"` / `"dashboard"` / `"settings"` |
| `company` | 否 | 竞品公司名，搜索特定公司的设计实现 | `"stripe"` / `"notion"` / `"linear"` |
| `limit` | 否 | 返回数量 | 默认 5，最大 10 |

**调用约束**：
- 单次审查最多 5 次搜索调用
- 每次搜索 `limit` 不超过 10
- 搜索总耗时不超过 30 秒（含网络等待）
- 搜索结果必须经过 visionDescription 质量门禁后才可使用

### 1.3 图片对比搜索：lazyweb_compare_image

**用途**：上传审查对象的截图，搜索视觉风格相似的参考设计。

**调用规范**：

```
lazyweb_compare_image(
  image: string,        // 图片 URL 或 base64 编码
  platform?: string,    // 同 lazyweb_search
  category?: string,    // 同 lazyweb_search
  limit?: number        // 默认 5，最大 10
)
```

**使用场景**：
- 审查对象有截图，想找同类设计的行业参考
- 需要对比"当前设计 vs 行业常见做法"
- 验证某个设计模式是否为行业惯例

**调用约束**：
- 图片大小不超过 5MB
- 支持格式：PNG / JPG / WebP
- 单次审查最多 2 次图片对比搜索
- 返回结果同样需要经过 visionDescription 质量门禁

### 1.4 相似截图搜索：lazyweb_find_similar

**用途**：基于已有截图，查找视觉上相似的其他截图。

**调用规范**：

```
lazyweb_find_similar(
  image: string,        // 图片 URL 或 base64 编码
  limit?: number        // 默认 5，最大 10
)
```

**使用场景**：
- 找到一张好的参考截图后，搜索更多同类
- 验证某个设计模式在不同产品中的表现
- 扩充参考截图库

**调用约束**：
- 单次审查最多 2 次相似搜索
- 返回结果同样需要经过 visionDescription 质量门禁

### 1.5 Token 配置

Lazyweb MCP 需要认证 token，按以下优先级查找：

| 优先级 | 配置方式 | 说明 |
|--------|---------|------|
| 1 | 环境变量 `LAZYWEB_MCP_TOKEN` | `export LAZYWEB_MCP_TOKEN=your_token_here` |
| 2 | 文件 `~/.lazyweb/lazyweb_mcp_token` | 文件内容为 token 字符串，首尾空白自动去除 |

**Token 缺失时的处理**：
- 不报错、不阻塞
- 自动降级到 Minimal mode
- 在审查报告中注明："Lazyweb MCP token 未配置，参考搜索已跳过"

**Token 无效时的处理**：
- 首次调用返回认证错误 → 降级到 Minimal mode
- 不重试认证
- 在审查报告中注明："Lazyweb MCP 认证失败，参考搜索已跳过"

### 1.6 MCP 不可用时的降级提示

当 MCP 不可用（无论原因：健康检查失败 / token 缺失 / 网络超时 / 服务错误），在审查报告中输出以下降级提示：

```markdown
> ⚠️ **参考搜索降级**：Lazyweb MCP 当前不可用（原因：[健康检查失败 / token 未配置 / 网络超时 / 服务错误]）。
> 本次审查基于纯哲学/规则驱动，无行业参考截图。审查结论不受影响，但缺少行业惯例佐证。
> 如需参考搜索，请检查 MCP 配置后重新审查。
```

**提示位置**：报告结论层之后、诊断层之前。

**禁止行为**：
- ❌ 伪造参考截图
- ❌ 用训练数据中的模糊记忆冒充搜索结果
- ❌ 降级时不告知用户
- ❌ 降级时降低审查质量或跳过检查项

---

## 2. 参考搜索工作流

### 2.1 搜索时机

参考搜索嵌入审查工作流的 Step 2 和 Step 4 之间：

```
Step 0: 审查前发现
Step 1: 理解审查对象
Step 2: 提取设计上下文
  ↓ 此时已知道：设计类型 / 品牌信息 / 审查侧重点
Step 3.5: 参考搜索 ← 在这里执行
Step 3: 品牌资产提取
Step 4: 执行审查（此时已有参考截图作为佐证）
Step 5: 输出报告
Step 6: 自检迭代
```

**为什么在 Step 2 之后**：
- Step 2 提取了设计上下文，知道了设计类型、平台、品牌信息
- 这些信息是构建搜索关键词的基础
- 在 Step 2 之前搜索 = 盲搜，关键词不精准

**为什么在 Step 4 之前**：
- 参考截图是审查的佐证材料，需要在执行审查时可用
- 审查过程中可以引用参考截图作为"行业常见做法"的证据

### 2.2 搜索角度策略

每次审查至少执行 3 次搜索，覆盖 3 个不同角度：

| 搜索角度 | 目的 | 关键词构造 | 示例 |
|---------|------|-----------|------|
| **按屏幕类型** | 找同类屏幕的行业参考 | `[设计类型] + [屏幕名称] + [关键特征]` | `"SaaS pricing page comparison table"` |
| **按竞品公司** | 找特定竞品的实现方式 | `[公司名] + [屏幕名称]` | `"Stripe pricing page"` |
| **按设计模式** | 找特定设计模式的行业实践 | `[设计模式] + [平台] + [场景]` | `"mobile onboarding progress indicator"` |

**搜索角度选择规则**：

| 审查场景 | 必选角度 | 可选角度 |
|---------|---------|---------|
| 有明确竞品 | 按屏幕类型 + 按竞品公司 | 按设计模式 |
| 无明确竞品 | 按屏幕类型 + 按设计模式 | 按竞品公司（选 1-2 个行业标杆） |
| 品牌设计审查 | 按竞品公司 + 按设计模式 | 按屏幕类型 |
| 通用 UI 审查 | 按屏幕类型 + 按设计模式 | 按竞品公司 |

**搜索次数约束**：
- 最少 3 次搜索（3 个角度各 1 次）
- 最多 5 次搜索
- 每次搜索 `limit` 默认 5

### 2.3 visionDescription 质量门禁

> **这是强制规则，不是建议。** 不执行质量门禁的截图不得进入审查报告。

**规则**：每张参考截图必须先读取其 `visionDescription`，通过质量门禁后才可使用。

**质量门禁检查项**：

| 检查项 | 通过条件 | 不通过时 |
|--------|---------|---------|
| **描述存在性** | `visionDescription` 非空且非占位符（如 "image" / "screenshot"） | 跳过该截图，不使用 |
| **描述匹配度** | 描述内容与搜索意图匹配（搜索"定价页"返回的截图描述确实包含定价相关内容） | 不匹配 → 跳过；部分匹配 → 可用但标注"部分相关" |
| **描述精确度** | 描述包含具体设计元素（颜色/布局/组件），而非泛泛的"一个网页" | 过于模糊 → 跳过 |

**质量门禁执行流程**：

```
1. 获取搜索结果 → 每条结果包含 screenshot_url + visionDescription
2. 逐条读取 visionDescription
3. 判断：
   - 无描述 → 跳过（不使用该截图）
   - 描述与搜索意图不匹配 → 跳过
   - 描述模糊（如"一个网页截图"）→ 跳过
   - 描述精确且匹配 → 通过，下载截图
4. 通过门禁的截图进入审查报告
```

**核心原则：「3 个精准匹配胜过 10 个松散匹配」**

```
❌ 差：10 张截图，5 张模糊描述，3 张不相关，2 张勉强相关 → 信息噪音大，审查质量下降
✅ 好：3 张截图，每张描述精确匹配搜索意图 → 信息密度高，审查质量提升
```

### 2.4 matchCount / similarity 质量评估

搜索结果返回时附带 `matchCount` 和 `similarity` 指标，用于评估结果质量。

**matchCount 评估**：

| matchCount | 评估 | 含义 |
|-----------|------|------|
| ≥ 3 | 强参考 | 至少 3 个产品采用了类似设计，行业惯例佐证充分 |
| 2 | 中参考 | 2 个产品采用，有一定参考价值但不足以称为"行业惯例" |
| 1 | 弱参考 | 仅 1 个产品采用，参考价值有限，标注为"个别案例" |
| 0 | 无参考 | 无匹配结果，不引用 |

**similarity 评估**：

| similarity | 评估 | 含义 |
|-----------|------|------|
| > 0.6 | 高相似 | 视觉风格高度接近，可直接对比 |
| 0.4 - 0.6 | 中相似 | 有一定相似性，可参考但需注意差异 |
| < 0.4 | 低相似 | 相似性不足，谨慎引用或跳过 |

**综合判断矩阵**：

| | similarity > 0.4 | similarity ≤ 0.4 |
|---|---|---|
| **matchCount ≥ 3** | ✅ 强佐证——行业惯例 + 高相似 | ⚠️ 中佐证——行业惯例但视觉差异大 |
| **matchCount 2** | ⚠️ 中佐证——部分产品采用 + 高相似 | ❌ 弱佐证——跳过或仅作备注 |
| **matchCount 1** | ⚠️ 弱佐证——个别案例 | ❌ 不引用 |

### 2.5 截图下载与命名规范

通过质量门禁的截图需下载到本地，按规范命名。

**下载目录**：`.lazyweb/review-references/{topic-slug}-{YYYY-MM-DD}/references/`

**命名规则**：`{company}-{screen-slug}.png`

| 命名部分 | 规则 | 示例 |
|---------|------|------|
| `company` | 小写，连字符分隔 | `stripe` / `linear-app` / `notion` |
| `screen-slug` | 小写，连字符分隔，描述屏幕类型 | `pricing-page` / `onboarding-flow` / `settings-panel` |

**完整示例**：

```
.lazyweb/review-references/saas-pricing-page-2026-05-03/references/
  stripe-pricing-page.png
  linear-pricing-page.png
  notion-pricing-page.png
  vercel-pricing-page.png
```

**命名冲突处理**：
- 同一公司同一屏幕类型有多张截图 → 加序号：`stripe-pricing-page-2.png`
- 公司名不确定 → 用 `unknown` 替代：`unknown-pricing-page.png`

---

## 3. 三级降级策略

### 3.1 Full Mode（完整模式）

**触发条件**：MCP 健康检查通过 + Web 搜索可用

**数据来源**：
- MCP 参考搜索截图
- Web 实时截图（通过 Playwright 等工具获取竞品页面截图）
- Web 文本分析（搜索竞品设计博客/案例研究）

**报告特征**：

| 报告部分 | Full Mode 内容 |
|---------|---------------|
| 结论层 | 正常输出 + "参考搜索：Full mode（N 张参考截图）" |
| 诊断层 | 每个维度的证据可引用参考截图："与 Stripe 定价页的 3 列布局一致（见 stripe-pricing-page.png）" |
| 行动层 | Fix 条目可引用行业惯例："行业常见做法是 X（matchCount=4），建议对齐" |
| 专项检测 | 品牌资产协议检查可对比竞品实现 |

**参考截图引用格式**：

```markdown
行业参考：[描述]（见 [company]-[screen-slug].png，matchCount=N，similarity=0.XX）
```

### 3.2 Partial Mode（部分模式）

**触发条件**：MCP 可用但 Web 不可用，或 Web 可用但 MCP 不可用

**场景 A：MCP only（Web 不可用）**：
- 有 MCP 搜索截图 + visionDescription
- 无实时 Web 截图
- 无 Web 文本分析

**场景 B：Web only（MCP 不可用）**：
- 有 Web 实时截图
- 有 Web 文本分析
- 无 MCP 搜索截图和 visionDescription

**报告特征**：

| 报告部分 | Partial Mode 内容 |
|---------|------------------|
| 结论层 | 正常输出 + "参考搜索：Partial mode（[MCP only / Web only]，N 张参考截图）" |
| 诊断层 | 证据引用参考截图，但标注数据来源限制 |
| 行动层 | Fix 条目引用参考时标注"仅基于 [MCP/Web] 搜索结果" |
| 专项检测 | 品牌资产协议检查仅基于可用数据源 |

**降级提示**（Partial Mode）：

```markdown
> ⚠️ **参考搜索降级**：本次审查处于 Partial mode（[MCP only / Web only]）。
> 部分参考数据源不可用，行业惯例佐证可能不完整。审查结论不受影响。
```

### 3.3 Minimal Mode（最小模式）

**触发条件**：MCP 和 Web 均不可用

**数据来源**：
- 无截图
- 无 Web 文本分析
- 纯哲学判断 + 设计规则驱动

**报告特征**：

| 报告部分 | Minimal Mode 内容 |
|---------|------------------|
| 结论层 | 正常输出 + "参考搜索：Minimal mode（无参考截图）" |
| 诊断层 | 证据仅基于哲学判断和设计规则，不引用行业参考 |
| 行动层 | Fix 条目基于设计原则而非行业惯例 |
| 专项检测 | 品牌资产协议检查基于通用最佳实践 |

**降级提示**（Minimal Mode）：

```markdown
> ⚠️ **参考搜索降级**：Lazyweb MCP 和 Web 搜索均不可用。
> 本次审查基于纯哲学/规则驱动，无行业参考截图。审查结论不受影响，但缺少行业惯例佐证。
> 如需参考搜索，请检查 MCP 配置和网络连接后重新审查。
```

### 3.4 降级决策流程

```
lazyweb_health() →
  ├─ ok → Web 搜索可用? →
  │        ├─ 是 → Full Mode
  │        └─ 否 → Partial Mode (MCP only)
  ├─ degraded → Web 搜索可用? →
  │             ├─ 是 → Partial Mode (Web only + MCP 可用功能)
  │             └─ 否 → Minimal Mode
  └─ error / 无响应 → Web 搜索可用? →
                      ├─ 是 → Partial Mode (Web only)
                      └─ 否 → Minimal Mode
```

**关键规则**：
- 降级决策在审查开始时一次性完成，不在中途切换模式
- 降级不影响审查检查项的完整性——所有检查项照常执行
- 降级仅影响"是否有行业参考佐证"，不影响"审查是否全面"

---

## 4. 输出目录规范

### 4.1 目录结构

```
.lazyweb/
  review-references/
    {topic-slug}-{YYYY-MM-DD}/
      references/
        {company}-{screen-slug}.png
        {company}-{screen-slug}.png
        ...
      metadata.json
```

**目录层级说明**：

| 层级 | 说明 | 示例 |
|------|------|------|
| `.lazyweb/` | 项目根目录下的 Lazyweb 工作目录 | `.lazyweb/` |
| `review-references/` | 所有审查参考的根目录 | `review-references/` |
| `{topic-slug}-{YYYY-MM-DD}/` | 单次审查的参考目录 | `saas-pricing-page-2026-05-03/` |
| `references/` | 参考截图存放目录 | `references/` |
| `metadata.json` | 本次搜索的元数据 | 见下方 |

**topic-slug 规则**：
- 小写英文
- 连字符分隔
- 描述审查主题，不超过 5 个词
- 示例：`saas-pricing-page` / `mobile-onboarding` / `dashboard-analytics`

### 4.2 metadata.json 格式

```json
{
  "topic": "SaaS 定价页审查",
  "date": "2026-05-03",
  "mode": "full",
  "searches": [
    {
      "query": "SaaS pricing page comparison table",
      "platform": "desktop",
      "category": "landing-page",
      "results_count": 5,
      "passed_gate": 3
    },
    {
      "query": "Stripe pricing page",
      "company": "stripe",
      "results_count": 5,
      "passed_gate": 4
    },
    {
      "query": "pricing toggle monthly annual UX pattern",
      "results_count": 5,
      "passed_gate": 2
    }
  ],
  "screenshots": [
    {
      "filename": "stripe-pricing-page.png",
      "source": "lazyweb_search",
      "company": "stripe",
      "matchCount": 4,
      "similarity": 0.72,
      "visionDescription": "Stripe 定价页，3 列布局，月/年切换开关位于顶部，每列包含功能列表和 CTA 按钮"
    }
  ],
  "total_screenshots": 9,
  "gate_passed": 9,
  "gate_failed": 6
}
```

### 4.3 文件命名规则

| 规则 | 说明 | 正确示例 | 错误示例 |
|------|------|---------|---------|
| 小写 | 全部小写 | `stripe-pricing-page.png` | `Stripe-Pricing-Page.png` |
| 连字符分隔 | 词与词之间用 `-` | `linear-app-onboarding.png` | `linearApp_onboarding.png` |
| 公司名在前 | `{company}-{screen-slug}` | `notion-settings-panel.png` | `settings-panel-notion.png` |
| PNG 格式 | 统一使用 PNG | `.png` | `.jpg` / `.webp` |
| 无空格 | 文件名不含空格 | `figma-dashboard.png` | `figma dashboard.png` |

### 4.4 .gitignore 提示逻辑

`.lazyweb/` 目录包含大量截图文件，通常不应提交到 Git 仓库。

**自动处理规则**：
- 审查工作流执行时，检查项目根目录 `.gitignore` 是否包含 `.lazyweb/`
- 如果未包含 → 在审查报告末尾添加提示：

```markdown
> 💡 **Git 提示**：`.lazyweb/` 目录包含参考截图，建议添加到 `.gitignore`：
> ```
> echo ".lazyweb/" >> .gitignore
> ```
```

- 如果已包含 → 不提示
- 不自动修改 `.gitignore`，仅提示用户

---

## 5. 截图与哲学判断冲突处理规则

### 5.1 冲突场景

当参考截图展示的设计模式与 monkren-design 的哲学判断不一致时：

| 冲突场景 | 示例 |
|---------|------|
| 截图显示行业普遍使用某模式，但哲学判断认为该模式有问题 | 行业普遍使用蓝紫渐变 hero 背景，但哲学判断标记为 AI slop |
| 截图显示竞品采用某设计，但哲学判断认为不适合当前品牌 | 竞品使用激进紫色渐变，但当前品牌走温暖路线 |
| 截图显示某模式 matchCount 很高，但哲学判断认为该模式是 cliché | 圆角卡片 + 左彩色 border accent matchCount=8，但哲学判断标记为烂大街组合 |

### 5.2 处理原则

**哲学判断优先，截图标注为"行业常见做法"**。

```
截图说："行业 8 个产品都这样做"
哲学说："这样做是 cliché / slop / 不符合品牌"

结论：遵循哲学判断。截图标注为"行业常见做法，但本审查建议不采用"。
```

### 5.3 截图标注规则

当截图与哲学判断冲突时，截图在报告中的标注方式：

| 情况 | 标注方式 |
|------|---------|
| 截图与哲学一致 | 正常引用：`行业参考：[描述]（见 [filename]）` |
| 截图与哲学冲突 | 标注冲突：`行业常见做法：[描述]（见 [filename]，matchCount=N），但本审查哲学判断建议不采用，原因：[哲学依据]` |
| 截图部分一致 | 标注部分一致：`行业参考：[描述]（见 [filename]），其中 [具体元素] 与本审查哲学一致，[具体元素] 建议调整` |

### 5.4 冲突报告措辞指南

**Fix 条目中的冲突措辞**：

```markdown
❌ 差：竞品都这样做，所以我们应该这样做
✅ 好：行业常见做法是 [X]（matchCount=5，见 [filename]），但本审查基于 [哲学依据] 建议采用 [Y] 替代

❌ 差：截图显示这样不好
✅ 好：行业参考 [filename] 展示了 [X] 模式，该模式在行业中较为常见（matchCount=N），但与本审查的 [哲学原则] 不一致，建议调整为 [Y]

❌ 差：虽然行业都这样做，但我们不跟
✅ 好：[X] 是行业常见做法（matchCount=N，见 [filename]），标注为"行业惯例参考"而非审查标准。本审查基于 [哲学依据] 建议采用 [Y]
```

**Keep 条目中的冲突措辞**：

```markdown
❌ 差：和竞品一样好
✅ 好：[X] 设计与行业参考 [filename] 中的实现一致，同时符合本审查哲学

❌ 差：虽然和竞品不同，但哲学上是对的
✅ 好：[X] 设计虽与行业常见做法（见 [filename]）不同，但更符合 [哲学依据]，是合理的差异化选择
```

### 5.5 冲突处理检查清单

审查报告自检时，额外检查以下项目：

- [ ] 所有引用参考截图的条目是否经过 visionDescription 质量门禁？
- [ ] 截图与哲学判断冲突时，是否以哲学判断为准？
- [ ] 冲突截图是否标注为"行业常见做法"而非"审查标准"？
- [ ] 冲突措辞是否避免了"竞品都这样做所以我们应该这样做"的逻辑？
- [ ] 是否存在仅因为"行业都这样做"就建议采用的 Fix 条目？（应删除或改写）

---

## 6. 搜索策略规范

### 6.1 平台路由规则

根据审查对象的设计类型，自动选择 `platform` 参数：

| 设计类型 | platform 参数 | 原因 |
|---------|--------------|------|
| 移动端 App | `"mobile"` | 移动端设计模式与桌面端差异大，需精准过滤 |
| Web 应用 | `"desktop"` | Web 应用主要在桌面端使用 |
| 响应式网站 | 不设 platform | 响应式设计需兼顾两端，不过滤 |
| PPT / 演示 | 不设 platform | 演示文稿无平台属性 |
| 信息图 | 不设 platform | 信息图无平台属性 |

**特殊情况**：
- 审查对象明确为"移动端优先的 Web 应用" → `platform: "mobile"`
- 审查对象明确为"桌面端管理后台" → `platform: "desktop"`
- 不确定时 → 不设 platform，让搜索结果自然覆盖

### 6.2 搜索关键词调整规则

根据审查侧重点调整搜索关键词：

| 审查侧重点 | 关键词策略 | 示例 |
|-----------|-----------|------|
| 视觉审查 | 关键词聚焦视觉元素（配色/排版/布局） | `"dark mode dashboard color palette"` |
| 交互审查 | 关键词聚焦交互模式（导航/表单/反馈） | `"multi-step form progress indicator"` |
| 品牌审查 | 关键词聚焦品牌实现（Logo/品牌色/字体） | `"brand color system design tokens"` |
| 全面审查 | 关键词覆盖多个维度 | `"SaaS landing page design system"` |

**关键词构造公式**：

```
[设计类型] + [屏幕/组件名] + [关键特征] + [平台（可选）]
```

**关键词质量对比**：

| 质量 | 关键词 | 问题 |
|------|--------|------|
| ❌ 太泛 | `"good design"` | 返回结果不相关 |
| ❌ 太窄 | `"Stripe pricing page toggle switch animation timing"` | 可能无结果 |
| ✅ 精准 | `"SaaS pricing page monthly annual toggle"` | 范围适中，结果相关 |
| ✅ 精准 | `"mobile app onboarding 3-step flow"` | 具体场景 + 模式 |

### 6.3 搜索数量限制

| 限制项 | 上限 | 原因 |
|--------|------|------|
| 搜索调用次数 | 3-5 次 | 避免搜索耗时过长，3 次覆盖 3 个角度已足够 |
| 每次搜索返回数量 | 5（默认）/ 10（最大） | 5 张通常足够，特殊情况可到 10 |
| 参考截图总数 | 15 张 | 超过 15 张信息过载，审查质量反而下降 |
| 单个 Fix/Keep 条目引用截图数 | 最多 2 张 | 超过 2 张佐证冗余，1-2 张精准匹配更有效 |

**搜索次数分配建议**：

| 审查复杂度 | 搜索次数 | 分配 |
|-----------|---------|------|
| 简单（单组件/单页） | 3 次 | 按屏幕类型 1 + 按竞品 1 + 按设计模式 1 |
| 中等（多页/全流程） | 4 次 | 按屏幕类型 2 + 按竞品 1 + 按设计模式 1 |
| 复杂（全站/品牌设计） | 5 次 | 按屏幕类型 2 + 按竞品 2 + 按设计模式 1 |

### 6.4 截图数量上限控制

当通过质量门禁的截图超过 15 张时，按以下规则筛选：

**筛选优先级**（从高到低）：

| 优先级 | 筛选条件 | 保留数量 |
|--------|---------|---------|
| 1 | matchCount ≥ 3 且 similarity > 0.4 | 全部保留 |
| 2 | matchCount ≥ 3 且 similarity 0.3-0.4 | 保留最多 3 张 |
| 3 | matchCount 2 且 similarity > 0.4 | 保留最多 3 张 |
| 4 | matchCount 1 且 similarity > 0.6 | 保留最多 2 张 |
| 5 | 其余 | 不保留 |

**如果筛选后仍超过 15 张**：
- 按搜索角度均匀分配（每个角度约 5 张）
- 同一公司的截图最多保留 2 张
- 优先保留 similarity 最高的

### 6.5 单条 Fix/Keep 引用截图上限

每条 Fix 或 Keep 条目最多引用 2 张参考截图。

**为什么是 2 张**：
- 1 张 = 单一佐证，可能是个别案例
- 2 张 = 交叉佐证，可信度提升
- 3+ 张 = 冗余，不增加说服力但增加阅读负担

**引用格式**：

```markdown
# Fix 条目引用 1 张
行业参考：3 列定价布局（见 stripe-pricing-page.png，matchCount=4）

# Fix 条目引用 2 张
行业参考：月/年切换开关位于定价表上方（见 stripe-pricing-page.png + linear-pricing-page.png，matchCount=5）

# Fix 条目不引用截图
建议将间距从 13px 统一为 16px（基于 8pt 网格规则）
```

---

## 附录：搜索工作流完整示例

### 场景：SaaS 定价页审查

```
Step 2.5: 参考搜索

1. 健康检查
   lazyweb_health() → status: "ok" → Full Mode

2. 搜索 #1：按屏幕类型
   lazyweb_search(
     query: "SaaS pricing page comparison table",
     platform: "desktop",
     category: "landing-page",
     limit: 5
   )
   → 返回 5 条结果
   → visionDescription 质量门禁：3 条通过，2 条跳过（描述模糊）
   → 下载 3 张：stripe-pricing-page.png, vercel-pricing-page.png, unknown-pricing-page.png

3. 搜索 #2：按竞品公司
   lazyweb_search(
     query: "Linear pricing page design",
     company: "linear",
     platform: "desktop",
     limit: 5
   )
   → 返回 5 条结果
   → visionDescription 质量门禁：4 条通过，1 条跳过（不匹配）
   → 下载 4 张：linear-pricing-page.png, linear-pricing-toggle.png, linear-feature-comparison.png, linear-enterprise-section.png

4. 搜索 #3：按设计模式
   lazyweb_search(
     query: "pricing toggle monthly annual UX pattern",
     platform: "desktop",
     limit: 5
   )
   → 返回 5 条结果
   → visionDescription 质量门禁：2 条通过，3 条跳过
   → 下载 2 张：notion-pricing-toggle.png, figma-pricing-toggle.png

5. 汇总
   总截图：9 张（未超 15 张上限）
   搜索次数：3 次（符合 3-5 次限制）
   模式：Full Mode

6. 保存
   .lazyweb/review-references/saas-pricing-page-2026-05-03/
     references/
       stripe-pricing-page.png
       vercel-pricing-page.png
       unknown-pricing-page.png
       linear-pricing-page.png
       linear-pricing-toggle.png
       linear-feature-comparison.png
       linear-enterprise-section.png
       notion-pricing-toggle.png
       figma-pricing-toggle.png
     metadata.json
```

---

**版本**：v1.2 / **更新日期**：2026-05-07
