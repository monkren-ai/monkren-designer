# 修复 monkren-design 项目 skill 安装失败

## Summary

`monkren-design` 项目内的 22 个 skill（1 根 + 21 子 skill）在 Trae IDE 中无法注册，根因是 `SKILL.md` 的 `allowed-tools` 字段引用了**当前 IDE 不存在的工具名**（`Bash` / `Agent`），与 description 中的冗余命名冲突，触发整体安装失败。

本计划做最小改动：把所有 SKILL.md 中的 `Bash` 替换为 `RunCommand`、`Agent` 替换为 `Task`、调整根 SKILL.md 的 description 前缀，让 22 个 skill 全部通过 Trae IDE 的 frontmatter 校验。

**预期效果**：22 个 skill 全部成功注册；用户可正常调用根 `monkren-design`（双重身份：审查 + 创作），子 skill 通过阶段路由（Discover/Define/Create/Review/Deliver/Tools）按需触发。

---

## Current State Analysis

### 1. 失败的根因：allowed-tools 引用了不存在的工具

`Trae IDE` 当前可用的工具集（来自系统 prompt）：

| 现有工具 | 类别 |
|---------|------|
| `Read` / `Write` / `Edit` / `Glob` / `Grep` | 文件操作 |
| `RunCommand` | 终端执行 |
| `WebSearch` / `WebFetch` | 网络 |
| `Task` | 子 agent 编排（`subagent_type: general_purpose_task` / `search` / `browser_use`） |
| `AskUserQuestion` / `TodoWrite` | 交互 |
| `Skill` / `run_mcp` | 技能/MCP |

但项目所有 `SKILL.md` 在 `allowed-tools` 中使用了**旧式工具名**（来自 Claude Code / Cursor 时代）：

- `Bash` — 6 个 sub-skill 引用，应改为 `RunCommand`
- `Agent` — 9 个 sub-skill（含 1 根）引用，应改为 `Task`

> 校验逻辑会拒绝未识别的工具名，触发「skill 安装失败」的笼统提示。22 个 skill 全部失败是同源问题叠加表现。

**确证清单**（来自 `Grep` 扫描 `skills/`）：

| 文件 | `Bash` | `Agent` |
|------|--------|---------|
| `SKILL.md`（根） | — | ✅ 第 22 行 |
| `skills/discover/design-research/SKILL.md` | ✅ | ✅ |
| `skills/discover/design-brainstorm/SKILL.md` | ✅ | ✅ |
| `skills/discover/quick-references/SKILL.md` | ✅ | ✅ |
| `skills/create/design-improve/SKILL.md` | ✅ | ✅ |
| `skills/tools/add-inspo-source/SKILL.md` | ✅ | — |
| `skills/tools/remove-inspo-source/SKILL.md` | ✅ | — |
| `skills/review/polish-pass/SKILL.md` | — | ✅ |
| `skills/review/ai-slop-check/SKILL.md` | — | ✅ |
| `skills/review/hierarchy-rhythm-review/SKILL.md` | — | ✅ |
| `skills/review/interaction-states-pass/SKILL.md` | — | ✅ |
| `skills/review/accessibility-audit/SKILL.md` | — | ✅ |

合计 10 个文件需改 frontmatter。

### 2. 次要问题：根 SKILL.md 的 description 命名冗余

`SKILL.md` 第 3-14 行的 `description` 以 `monkren-design——设计智能体...` 开头，把 name 嵌进 description，与下述子 skill 的简洁风格不一致：

- `wireframe/SKILL.md`：`description: 低保真线框探索。在 hi-fi 之前...`
- `accessibility-audit/SKILL.md`：`description: 可访问性审查。启动 4 个并行 agent...`

虽然这不会直接触发校验失败，但与系统对 description 的语义化要求（首句应是「这个 skill 做什么」的强陈述）不匹配，建议同步精简。

### 3. 可疑点（不动，仅观察）

- `skills/define/visual-taste-lab/agents/openai.yaml` 是 OpenAI Agents 平台的注册文件，与 Trae 的 SKILL.md 格式无关，不在本次修复范围。
- 系统 available_skills 中有 `Monkren Design`（带空格）一项，描述仅为「Monkren Design」占位文字，是另一个独立条目，**不是本项目根 skill 的别名**；不动它。

---

## Proposed Changes

### 变更 1：批量修正 `allowed-tools` 中的工具名

**目标文件（10 个）**：

```
SKILL.md
skills/discover/design-research/SKILL.md
skills/discover/design-brainstorm/SKILL.md
skills/discover/quick-references/SKILL.md
skills/create/design-improve/SKILL.md
skills/tools/add-inspo-source/SKILL.md
skills/tools/remove-inspo-source/SKILL.md
skills/review/polish-pass/SKILL.md
skills/review/ai-slop-check/SKILL.md
skills/review/hierarchy-rhythm-review/SKILL.md
skills/review/interaction-states-pass/SKILL.md
skills/review/accessibility-audit/SKILL.md
```

**改动规则**（在每个文件的 frontmatter `allowed-tools:` 列表中）：
- `- Bash` → `- RunCommand`
- `- Agent` → `- Task`

**保留不变**：`- Read` / `- Write` / `- Glob` / `- Grep` / `- WebSearch` / `- AskUserQuestion` 全部是合法工具名。

> 风险评估：`Agent` 原本是 Claude Code 的子 agent 调用入口，本项目里 sub-skill 的实际语义是「启动并行子 agent 跑审查任务」（见 `polish-pass/SKILL.md` Phase 2）。Trae 的 `Task` 工具参数 `subagent_type: general_purpose_task` 完全可以替代同一语义。`Bash` → `RunCommand` 是纯重命名，参数 schema 一致。

### 变更 2：精简根 SKILL.md 的 description

**目标文件**：`SKILL.md`

**改动**：去掉 description 第一句的「`monkren-design——`」冗余前缀，让首句直接是「做什么」。

**before**（第 3-14 行）：
```yaml
description: |
  monkren-design——设计智能体，覆盖发现→定义→创作→审查→交付全流程。
  双重身份：设计审查专家 + 设计创作伙伴。用户提交设计产出（截图/HTML/代码/Figma），
  输出专业审查报告；用户询问设计方向，输出3方向设计建议（含可落地概念包）；
  用户请求创作，输出 wireframe/prototype/deck/tweakable；用户请求demo，输出单文件HTML Demo。
  核心能力：5维度评审、10维度多视角审查、40种设计哲学推荐、反AI slop、硬编码检测、
  设计系统合规、品牌资产协议、SwiftLint规则、Demo生成（v3.1：12维度项目画像+8字段输出+落地概念包+基因重组）。
  触发词：评审/审查/review/好不好看/检测硬编码/设计规范检查/代码审查/SwiftLint/设计系统合规/
  设计走查/UI审查/简单审查/快速审查/深度审查/全流程审查/硬编码检测/合规检查/设计建议/
  遍历审查/全页面审查/设计方向/风格推荐/什么风格/demo/演示/看看效果/出个html/做个示例/
  wireframe/线框/prototype/原型/deck/幻灯片/tweakable/调整面板/variations/变体/
  extract tokens/提取token/component inventory/组件清单/research/设计研究/brainstorm/头脑风暴。
```

**after**：
```yaml
description: |
  设计智能体，双重身份：设计审查专家 + 设计创作伙伴。
  覆盖发现→定义→创作→审查→交付全流程。用户提交设计产出（截图/HTML/代码/Figma），输出 5 维度 + 10 视角审查报告；用户询问设计方向，输出 3 方向设计建议（含可落地概念包）；用户请求创作，输出 wireframe/prototype/deck/tweakable；用户请求 demo，输出单文件 HTML Demo。
  核心能力：5 维度评审、10 视角审查、40 种设计哲学推荐、反 AI slop、硬编码检测、设计系统合规、品牌资产协议、Demo 生成（12 维度项目画像 + 8 字段输出 + 落地概念包 + 基因重组）。
  触发词：评审/审查/review/好不好看/检测硬编码/设计规范检查/代码审查/设计系统合规/设计走查/UI 审查/简单审查/快速审查/深度审查/全流程审查/硬编码检测/合规检查/设计建议/遍历审查/全页面审查/设计方向/风格推荐/什么风格/demo/演示/看看效果/出个 html/做个示例/wireframe/线框/prototype/原型/deck/幻灯片/tweakable/调整面板/variations/变体/extract tokens/提取 token/component inventory/组件清单/research/设计研究/brainstorm/头脑风暴。
```

**why**：
1. description 首句直接陈述「做什么」（设计智能体 / 双重身份 / 全流程），避免与 `name` 字段重复。
2. 标点统一为「半角空格 + 中文」，与其他 21 个子 skill 的风格一致（参见 `wireframe/SKILL.md`）。
3. 触发词段不加额外换行，保持 YAML 块标量解析的健壮性。
4. 移除「SwiftLint」（这是 iOS 专项能力，与项目本体服务能力无关；保留会误导触发匹配）。

> **不**改动的部分：name / 触发词全集 / allowed-tools 顺序与其它字段。

### 变更 3：保留 sub-skill 的 description 现状

21 个子 skill 的 description 风格统一（首句是「做什么」的强陈述），无冗余命名问题。**仅在变更 1 触及的 frontmatter 工具名上做最小改动**，不动 description。

---

## Assumptions & Decisions

| 决策 | 选择 | 理由 |
|------|------|------|
| `Bash` 的替代名 | `RunCommand` | Trae 唯一可用的终端工具 |
| `Agent` 的替代名 | `Task` | Trae 的子 agent 编排工具；参数 `subagent_type: general_purpose_task` 等价于原 Agent 语义 |
| 是否改 description | 只改根 SKILL.md | 子 skill description 风格统一且无冗余 |
| `visual-taste-lab/agents/openai.yaml` | 不动 | OpenAI Agents 平台注册文件，与 Trae 格式不同源 |
| `references/` 引用关系 | 不动 | 路由表、阶段定义、token 名、philosophy 库都保持原样 |
| `available_skills` 中已有的「Monkren Design」 | 不动 | 不是本项目根 skill 的别名，是独立条目 |

---

## Verification

执行顺序：改 → 验 → 注册 → 跑。

### 1. 改完后立即检查 frontmatter

```bash
# 应该返回 0 结果
grep -rn "^  - Bash$" skills/ SKILL.md
grep -rn "^  - Agent$" skills/ SKILL.md
```

### 2. 校验 YAML 合法性

```bash
# 对每个改过的文件做 frontmatter 解析
for f in SKILL.md skills/*/SKILL.md skills/*/*/SKILL.md skills/*/*/*/SKILL.md; do
  awk '/^---$/{c++; next} c==1 && /^name:/{print FILENAME": "$0}' "$f"
done | wc -l
# 期望：22
```

### 3. 重启 Trae 触发 skill 重扫

关闭再打开项目根目录；观察：
- 系统提示不再出现「skill 安装失败」
- 阶段路由能正常识别（输入「简单审查这个设计」应触发根 skill）
- 子 skill 通过 `Skill` 工具可显式调用（`Skill name=wireframe` 等）

### 4. 跑一次最小冒烟用例

| 用例 | 期望 |
|------|------|
| 输入「简单审查」 | 命中 Review 阶段，5 维度评审流启动 |
| 输入「生成 3 个变体」 | 命中 Create → generate-variations |
| 输入「推荐适合 AI 产品的设计方向」 | 命中 Define → frontend-aesthetic-direction |
| 输入「demo 演示」 | 命中 Deliver，输出单文件 HTML |

### 5. 跑设计哲学基因重组（深度用例）

输入「我想做一个健康类 App，瓶颈突破方向」，期望：
- 命中 Define 阶段
- 调出 `references/philosophy-library.md` §10
- 输出 3 个跨流派方向 + Demo 触发提示

---

## Out of Scope（明确不做）

- **不动** `references/` 9 个 md 文件（路由表、token、哲学库等）
- **不动** `index.html` / `case/` / `assets/` / `DESIGN.md` / `README*.md`
- **不动** `skills/define/visual-taste-lab/agents/openai.yaml`（非 Trae 格式）
- **不动** `available_skills` 中已存在的「Monkren Design」条目
- **不改** skill 之间的引用关系、阶段路由表
- **不**回填 GitHub 安装命令（`npx skills add`）相关说明
- **不**优化 description 触发词匹配度

---

## 风险与回滚

| 风险 | 概率 | 缓解 |
|------|------|------|
| `Task` 与 sub-skill 中描述的「并行启动 4 个 agent」用法不完全等价 | 低 | 现有系统已用 `subagent_type: general_purpose_task` 支持单消息并发调用 Task 工具，与原 Agent 语义一致 |
| 根 description 精简后某些触发词匹配权重变化 | 低 | 触发词全集保留；首句的精简提升首屏 token 命中率 |
| 改完后仍有其它 frontmatter 字段校验失败 | 中 | 见 Verification 步骤 2，若有失败追加修复（前置：仅本次扫到的 10 个文件） |

**回滚**：`git restore` 即可，所有变更都在 `SKILL.md` 与 `skills/*/SKILL.md` 范围内，未触及 `references/` / `assets/` / `index.html`。
