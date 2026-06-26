# 集成 Lazyweb 设计研究能力 Spec

## Why

monkren-design 是一个设计审查 skill，拥有完善的 5 维度评审体系、20 种设计哲学库、硬编码值检测等能力，但审查时**缺乏真实产品截图作为证据支撑**——审查建议依赖哲学判断和通用规则，无法提供"业界最佳实践长什么样"的视觉证据。lazyweb-skill 提供了 Lazyweb MCP 服务，可搜索真实 App/Web 截图并下载到本地，恰好弥补这一短板。将 Lazyweb 的设计研究能力集成到 monkren-design 中，使审查报告从"哲学驱动"升级为"证据驱动"。

## 深度分析：lazyweb-skill 仓库

### 架构模式

lazyweb-skill 采用**多 skill 编排 + MCP 服务 + 浏览器自动化**三层架构：

| 层 | 组件 | 职责 |
|---|------|------|
| Skill 层 | 6 个独立 SKILL.md（design-research / quick-references / design-improve / brainstorm / add-inspo-source / remove-inspo-source） | 定义触发条件、工作流、输出格式。每个 skill 是自包含的 prompt 文件 |
| MCP 层 | `plugins/lazyweb/.mcp.json` → `https://www.lazyweb.com/mcp`（通过 mcp-remote 桥接） | 提供截图搜索 API：`lazyweb_search` / `lazyweb_compare_image` / `lazyweb_find_similar` / `lazyweb_health` |
| 浏览器层 | `browse/` 目录（Playwright 封装，~7k 行 TypeScript） | 提供 `$LB goto/screenshot/snapshot/fill/press/handoff/resume` 命令，用于实时网页截图和灵感库认证 |

### 关键设计模式

**1. 优雅降级模式（Graceful Degradation）**

每个 skill 都实现了三级降级：
- **完整模式**：Lazyweb MCP + Browse 工具 + Web 搜索 → 截图 + 实时网页截图 + 文字分析
- **部分模式**：Lazyweb MCP + Web 搜索（无 Browse）→ 截图 + 文字描述网页
- **最小模式**：仅 Web 搜索 → 纯文字描述，无截图

降级不影响 skill 的核心逻辑，只影响证据的丰富度。这是 lazyweb-skill 最值得借鉴的设计——**MCP 是增强，不是依赖**。

**2. visionDescription 质量门控**

每个 Lazyweb 搜索结果包含 `visionDescription` 字段（截图的文字描述）。所有 skill 都强制要求：
- 使用截图前必须读取 `visionDescription`
- 描述与建议不匹配 → 禁止使用该截图
- 无描述 → 跳过该截图
- "3 张精确匹配的参考胜过 10 张松散关联的"

这个模式解决了 AI agent "幻觉引用"的问题——agent 不会猜测截图内容，而是基于描述做判断。

**3. 反向金字塔报告结构**

所有报告遵循"结论先行，证据后置"：
- TL;DR（2-3 句话，30 秒内获取答案）
- Recommendations / Next Steps（行动项）
- Key Examples（视觉证据）
- Patterns / Anti-Patterns / Findings（深度分析）

这与 monkren-design 的"结论层 + 诊断层 + 行动层"三层递进结构高度一致。

**4. 双源证据混合**

报告中的参考标注来源：`[Lazyweb]`（数据库截图）或 `[Web]`（实时网页截图）。这确保用户知道证据的来源和时效性——Lazyweb 截图是精选的但可能过时，Web 截图是最新的但质量参差。

**5. 外部灵感库扩展**

`libraries.json` 机制允许用户连接 Mobbin/Savee/Dribbble/Behance 等外部灵感库。Browse 工具通过 `handoff` → 用户在可见浏览器中登录 → `resume` 恢复无头控制，实现认证流程。这是一个精巧的"人机协作认证"模式。

### 与 monkren-design 的差距分析

| 维度 | monkren-design 现状 | lazyweb-skill 能力 | 差距 |
|------|-------------------|-------------------|------|
| 证据来源 | 哲学判断 + 通用规则 + 代码分析 | 真实产品截图 + 实时网页截图 | monkren 无法展示"好的设计长什么样" |
| 参照系 | 设计系统 token / 品牌规范 / 8pt 网格 | 竞品截图 + 同类最佳实践 | monkren 的参照系是抽象规则，不是视觉实例 |
| 改进建议 | "间距应统一" → 具体数值 | "间距应统一" → Stripe 的截图展示 | 缺少视觉佐证使建议说服力不足 |
| 方向顾问 | 20 种哲学的文字描述 | 截图 + 文字描述 | 哲学描述抽象，用户难以想象实际效果 |
| 降级能力 | 无外部依赖，始终可用 | 三级降级 | monkren 无降级问题，但集成后需保持此特性 |

### 集成风险

| 风险 | 影响 | 缓解策略 |
|------|------|---------|
| MCP 不可用导致审查流程中断 | 高 | 严格遵循 lazyweb-skill 的降级模式：MCP 是增强不是依赖 |
| 不相关截图误导审查结论 | 高 | 采用 visionDescription 质量门控 + 截图数量上限 |
| 搜索耗时拖慢审查速度 | 中 | 限制搜索次数（3-5 次）和截图数量（≤15 张），搜索与评审可并行 |
| 参考截图与哲学判断矛盾 | 中 | 明确规则：截图是证据不是标准，哲学判断优先，截图用于佐证而非替代 |
| .lazyweb/ 目录污染项目 | 低 | 提示用户将 `.lazyweb/` 加入 `.gitignore` |

## What Changes

- 在 monkren-design 的审查工作流中增加"设计参考搜索"步骤，利用 Lazyweb MCP 工具搜索与审查对象相关的真实产品截图
- 在审查报告中增加"参考证据"区块，展示真实产品截图作为审查建议的视觉佐证
- 在设计方向顾问中增加真实参考截图，使方向建议有视觉锚点
- 在 SKILL.md 中增加 Lazyweb MCP 集成说明（配置、降级策略、输出规范）
- 在 references/ 下新增 `lazyweb-integration.md`，存放 Lazyweb 集成的完整规则

## Impact

- Affected specs: 审查工作流、审查报告模板、设计方向顾问
- Affected code: SKILL.md、references/implementation.md、references/philosophy.md

## ADDED Requirements

### Requirement: Lazyweb MCP 集成

系统 SHALL 在审查工作流中集成 Lazyweb MCP 工具，用于搜索和下载真实产品截图作为审查证据。

#### Scenario: Lazyweb MCP 可用时的审查流程

- **WHEN** 用户提交设计产出进行审查，且 Lazyweb MCP 服务可用（`lazyweb_health` 返回成功）
- **THEN** 系统在"提取设计上下文"步骤后，自动搜索与审查对象相关的真实产品截图，下载到 `.lazyweb/review-references/{topic}-{date}/references/` 目录，并在审查报告中引用这些截图作为证据

#### Scenario: Lazyweb MCP 不可用时的降级处理

- **WHEN** 用户提交设计产出进行审查，但 Lazyweb MCP 服务不可用（未安装或认证失败）
- **THEN** 系统跳过参考截图搜索步骤，使用纯哲学/规则驱动的审查模式，在报告中标注"本次审查未使用真实产品参考"，并提示用户如何安装 Lazyweb MCP

#### Scenario: 搜索无结果时的处理

- **WHEN** Lazyweb MCP 可用但搜索结果与审查对象不相关（`matchCount` 1/3 或 `similarity` < 0.3）
- **THEN** 系统不强制引用弱相关截图，在报告中注明"Lazyweb 数据库中未找到强相关参考"，审查继续以哲学/规则驱动

### Requirement: 审查报告参考证据区块

系统 SHALL 在审查报告中增加"参考证据"区块，展示从 Lazyweb 搜索到的真实产品截图。

#### Scenario: 审查报告包含参考证据

- **WHEN** 审查过程中成功获取了 Lazyweb 参考截图
- **THEN** 审查报告在诊断层增加"参考证据"子区块，每个 Fix/Keep 建议可附带真实产品截图作为佐证，截图标注来源（[Lazyweb] / [Web]）和公司名

#### Scenario: 无参考截图时的报告

- **WHEN** 审查过程中未获取参考截图（MCP 不可用或搜索无结果）
- **THEN** 审查报告正常输出，不包含"参考证据"区块，不影响其他审查维度

#### Scenario: Fix 建议附带参考截图

- **WHEN** 一条 Fix 建议有精确匹配的参考截图
- **THEN** Fix 建议中增加"参考"字段，展示截图 + 公司名 + 来源标签 + 1 行说明该参考如何佐证建议

### Requirement: 设计方向顾问增强

系统 SHALL 在设计方向顾问的建议中增加真实参考截图。

#### Scenario: 方向建议附带视觉参考

- **WHEN** 用户请求设计方向建议，且 Lazyweb MCP 可用
- **THEN** 每个方向建议附带 1-2 张真实产品截图，展示该方向在业界产品中的实际应用，截图标注来源和公司名

#### Scenario: 方向建议无视觉参考

- **WHEN** 用户请求设计方向建议，但 Lazyweb MCP 不可用
- **THEN** 方向建议仅包含文字描述，与当前行为一致

### Requirement: 参考截图质量管控

系统 SHALL 对参考截图实施严格的质量管控，防止不相关截图误导审查结论。

#### Scenario: 截图与审查建议的匹配验证

- **WHEN** 系统从 Lazyweb 获取搜索结果
- **THEN** 系统必须读取每个结果的 `visionDescription` 字段，验证截图内容与审查建议直接相关；不匹配的截图不得引用到报告中

#### Scenario: 截图数量控制

- **WHEN** 系统下载参考截图
- **THEN** 每次审查最多下载 15 张参考截图，每条 Fix/Keep 建议最多附带 2 张佐证截图

#### Scenario: 截图与哲学判断冲突时的优先级

- **WHEN** 参考截图展示的模式与 monkren-design 的哲学判断冲突
- **THEN** 哲学判断优先，截图仅作为"业界常见做法"的参考信息标注，不作为审查标准

### Requirement: 输出目录规范

系统 SHALL 将 Lazyweb 相关产出物存放在统一的 `.lazyweb/` 目录下。

#### Scenario: 参考截图存储

- **WHEN** 系统下载参考截图
- **THEN** 截图存放至 `.lazyweb/review-references/{topic-slug}-{YYYY-MM-DD}/references/` 目录，报告存放至同目录的 `report.md` 和 `report.html`

#### Scenario: .gitignore 提示

- **WHEN** 系统首次创建 `.lazyweb/` 目录
- **THEN** 提示用户将 `.lazyweb/` 加入 `.gitignore`

### Requirement: 搜索策略规范

系统 SHALL 根据审查对象的类型和平台，制定差异化的搜索策略。

#### Scenario: 搜索策略根据设计类型调整

- **WHEN** 审查对象是移动端 App
- **THEN** 搜索时使用 `platform: "mobile"` 过滤，至少 50% 参考截图来自移动端

- **WHEN** 审查对象是 Web 应用
- **THEN** 搜索时使用 `platform: "desktop"` 过滤，至少 50% 参考截图来自桌面端

#### Scenario: 搜索角度多样化

- **WHEN** 系统执行参考搜索
- **THEN** 至少执行 3 次不同角度的搜索（如：按屏幕类型、按竞品公司、按设计模式），每次搜索 limit=15

## MODIFIED Requirements

### Requirement: 审查工作流（Step 4 执行审查）

在"执行审查"步骤中，增加"参考搜索"子步骤：在 5 维度评审之前，先搜索相关真实产品截图，作为评审的视觉参照系。搜索结果作为评审的辅助证据，不替代哲学判断。

### Requirement: 审查报告模板

在诊断层增加"参考证据"区块（条件性展示），在行动层的每个 Fix 建议中可选附带参考截图。参考证据区块遵循反向金字塔：先展示最关键的参考，再展示补充参考。

### Requirement: 设计方向顾问

每个方向建议增加"视觉参考"字段，展示真实产品截图。视觉参考是可选的——MCP 不可用时方向建议仍然有效。

### Requirement: 信念层"事实验证先于假设"

在"事实验证先于假设"之后增加"证据驱动审查"信念声明：审查建议应尽可能附带真实产品截图作为视觉证据，但截图是佐证不是标准——哲学判断和设计规则优先。

## REMOVED Requirements

无移除需求。
