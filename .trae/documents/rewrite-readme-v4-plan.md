# README 重写计划（v4.0 同步）

## Summary

把 `README.md` 与 `README.en.md` 从 v3.1 时代的「5 维度评审工具」叙事重写到 v4.0 时代的「**设计智能体（双重身份：审查员 + 创作者）**」叙事。沿 v4.0 架构重排章节，先写中文版，结构定稿后同步产出英文版。

**核心变更**：
1. 顶部价值主张从「5 维度设计评审 + 硬编码检测」改为「双重身份 + 五阶段 skill 矩阵 + 四层知识图谱」
2. 章节骨架按 v4.0 重排：双重身份 → 五阶段路由 → 21 skills 清单 → 9 references 索引 → 核心机制（5 维度 / 硬编码 / 反 slop / 评分纪律 / 三层报告）→ 5 阶段工作流 → 仓库结构 → 许可
3. 版本号、特性清单、仓库结构、参考引用、社交链接全部对齐到 v4.0 实际状态
4. License 段被截断的 GitHub 行补全

**预期效果**：README 真实反映 v4.0（SKILL.md / 9 references / 21 skills / 五阶段路由），消除文档漂移；外部读者 5 分钟看懂「Monkren 是什么、能做什么、怎么用、谁在做」。

---

## Current State Analysis

### 1. README 仍停留在 v3.1 叙事

证据（来自 `README.md` 与 `README.en.md` 当前内容）：

- 顶部 Slogan：「提交设计，拿回一份专业审查报告」—— 只描述「审查员」单身份；v4.0 是「**双重身份：审查员 + 创作者**」（`SKILL.md` §0 / `references/beliefs.md` §0）
- 「能做什么」表格 18 行仅覆盖审查能力（评审/检测/合规/SwiftLint），**完全缺失**创作能力（wireframe/prototype/deck/tweakable/variations/extract/design-improve）
- 「5 维度评审体系」被作为「**核心机制**」标题 1，但 v4.0 把同等重要的「10 视角」「12 维度项目画像」「8 字段输出」「哲学基因重组」「页面类型×设计模式」埋在「能做什么」行内，权重不对
- 仓库结构树里 `references/` 只列 5 个文件（缺 `beliefs.md` / `perspectives.md` / `platforms.md` / `integration.md` / `execution.md`），实际是 9 个
- 仓库结构树里 `skills/` 描述模糊（"五阶段 skill 矩阵（21 skills）"），未列具体清单
- 五阶段路由表（Discover/Define/Create/Review/Deliver/Tools）完全缺失
- **完全没有「四层知识图谱」叙述**（信念 / 标准 / 方法 / 执行）

### 2. 引用与文件已更新，README 没跟上

- `SKILL.md` 顶部写明 `v4.0 / 2026-07-07 / 四层知识图谱 + 五阶段 skill 矩阵`
- `DESIGN.md` 变更日志最新到 v1.2（2026-07-03）
- `index.html` 元信息仍标 v3.1（**本次不在范围内**，待另一任务处理）
- `references/` 已有完整 9 文件

### 3. 现有 README 的可保留部分

- 顶部三枚 badge（License / Agent-Agnostic / skills.sh Compatible）保留
- 安装命令 `npx skills add monkren-ai/monkren-designer` 保留
- 「核心机制」下的 5 维度评分标准、硬编码检测表、评分纪律 4 条铁律、P0/P1/P2 分级、SVG 雷达图说明、自身设计哲学声明（Graphic Monochrome Canvas）—— 这些内容是 v4.0 仍然正确的部分，**结构保留，内容精修**
- License 段许可文本（个人免费 / 商用禁）保留，仅补全截断的 GitHub 行
- 社交链接（GitHub）保留并补全

### 4. License 段被截断

当前末尾是：
```
| GitHub | https://github.com/monkren-ai/monkren-designer |
```
表格只有 1 行被截断。实际其它平台（小红书 / 即刻 / 公众号 / X）链接已在原版中或缺失。本次重写需补全「Connect · Monkren」整段（参考 `LICENSE` / `SKILL.md` 顶部联系方式，或显式标注「仅 GitHub 公开，其它平台暂不公开」——以实际仓库情况为准，**假设为仅 GitHub**）。

---

## Proposed Changes

### 变更 1：重写 `README.md`（中文版，先行定稿）

**目标路径**：`README.md`

**新结构**（按 v4.0 架构重排）：

```
0. 顶部品牌区
   - 语言切换 sub（English | 中文）
   - 标题 Monkren Design
   - 副标题：双重身份 + 一句话价值主张
   - 三枚 badge + 安装命令 + 跨 agent 列表 + 章节锚点

1. 双重身份（NEW）
   - 审查员：5 维度评审 + 硬编码检测 + 反 slop
   - 创作者：wireframe/prototype/deck/tweakable/variations/extract
   - 一句话：审查不审查人，创作不堆模板
   - 对话即审查/创作，无按钮无面板

2. 快速开始（保留原「装上就能用」）
   - 安装命令
   - 7 条对话示例（覆盖审查 + 创作 + 方向建议）

3. 五阶段 skill 矩阵（NEW，替代原「能做什么」表）
   - Discover（3）：design-research / quick-references / design-brainstorm
   - Define（3）：discovery-questions / frontend-aesthetic-direction / visual-taste-lab
   - Create（8）：wireframe / make-a-prototype / make-a-deck / make-tweakable / generate-variations / design-system-extract / component-extract / design-improve
   - Review（5）：accessibility-audit / ai-slop-check / hierarchy-rhythm-review / interaction-states-pass / polish-pass
   - Deliver（README 入口，execution.md 驱动）
   - Tools（2，贯穿全流程）：add-inspo-source / remove-inspo-source
   - 每个阶段给一句话定位 + 触发词示例 1-2 个

4. 四层知识图谱（NEW）
   - 信念层 references/beliefs.md
   - 标准层 references/standards.md
   - 方法层 references/methods-create.md + references/methods-review.md
   - 执行层 references/execution.md
   - 专题库 perspectives.md / platforms.md / philosophy-library.md / integration.md
   - 一句话说明每层职责 + 「→ 详见 `<path>`」链接

5. 核心机制（保留原章节，内容精修）
   5.1 5 维度评审体系（哲学一致性/视觉层级/细节执行/功能性/创新性）
   5.2 硬编码值检测（颜色/字体/间距）
   5.3 设计系统合规性检查
   5.4 反 AI slop 8 类陷阱
   5.5 评分纪律 4 条铁律
   5.6 问题严重度分级（P0/P1/P2）
   5.7 SVG 雷达图规范
   5.8 自身设计哲学（Graphic Monochrome Canvas → DESIGN.md）

6. 设计方向顾问（NEW，从原 5 维度挪出来，单独章节）
   - 5 类触发场景（冷启动 / 增量 / 诊断 / 瓶颈 / 标杆）
   - 12 维度项目画像 + 10 流派 × 40 哲学 → 3 方向
   - 8 字段输出 + 落地概念包 + 哲学基因重组
   - 触发词：「推荐设计方向 / 什么风格合适」

7. 工作流（合并原 9 步 + 创作 6 步，简洁版）
   - 创作：6 步
   - 审查：9 步（保留原图）
   - 五阶段路由总览

8. 仓库结构（更新到 9 references + 21 skills 完整清单）
   - 与原结构树一致的根目录展示
   - references/ 9 文件全列
   - skills/ 5 阶段目录，每个 SKILL.md 一行带一句话定位
   - case/ 三个 HTML 样本
   - DESIGN.md / SKILL.md / LICENSE / index.html 简介

9. License · 使用授权（保留，补全 GitHub 行）
   - 个人使用免费
   - 企业商用需授权（4 条情形）
   - 商用授权联系方式

10. Connect · Monkren
    - GitHub 链接（唯一公开）
    - 其它平台待开放
```

**为什么**：让 README 第一页就能讲清 v4.0 的两个新主轴——双重身份（解决「会做但没说是创作者工具」问题）、五阶段矩阵（解决「只看到审查能力」问题），其余章节作为深度参考入口。

**怎么做**：使用 `Write` 工具整体覆写 `README.md`。**写入前必须 `Read` 当前内容确认无遗漏**（已读）。

**关键内容守则**：
- 严格基于 `SKILL.md` v4.0、`DESIGN.md` v1.2、9 个 `references/*.md` 实际章节标题——不发明新概念，不挪动事实
- 21 skills 的「一句话定位」直接抄各 `skills/<stage>/<name>/SKILL.md` 的 frontmatter `description:` 第一句，避免主观发挥
- 9 references 的「一句话定位」直接抄各 `references/*.md` 顶部引用块的描述
- 评分纪律、5 维度、反 slop 等表格直接复用 `references/standards.md` / `references/methods-review.md` 内容
- 5 类触发场景 / 12 维度项目画像 / 8 字段输出等数字与字段名直接对齐 `references/execution.md` / `references/philosophy-library.md`
- 仓库结构树内每个目录都对应实际 `LS` 结果
- 顶部 value prop 写作遵循 `DESIGN.md` 哲学：「从 existing context 出发」「反 AI slop」「系统优先」「Placeholder > 烂实现」

### 变更 2：同步重写 `README.en.md`（英文版）

**目标路径**：`README.en.md`

**为什么**：仓库对外宣传是双语，新版 `README.md` 一旦上线英文版必须同步，否则会引发新 drift。

**怎么做**：在 `README.md` 中文版**定稿后**，**逐节翻译**产出 `README.en.md`。翻译规则：
- 章节标题、表格表头、命令、文件路径、token 名、badge 文案保持英文
- 段落正文：直译为主，保留「Monkren 自身」「Graphic Monochrome Canvas」「P0/P1/P2」「Quick Win」「Keep/Fix」等专有概念原样
- 顶部 sub 切换：「English | 中文」标记切换主次（README.en.md 中 **English** 加粗，`README.md` 反之）
- README.en.md 顶部保留原版的「📖 Note for English readers: this skill is built by a Chinese-speaking developer...」注脚（属于有用的英语读者引导）
- **不翻译 LICENSE 文本**（双语文本一样即可），只翻译「License · 使用授权」→「License · Usage Rights」

### 变更 3：README 末尾补全社交链接

**目标路径**：`README.md` 第 234 行 / `README.en.md` 第 236 行附近

**当前状态**：表格只有 `| GitHub | https://github.com/monkren-ai/monkren-designer |` 一行被截断

**改法**：
- 若只有 GitHub 公开：保留单行 GitHub，把表格补全为「Other platforms coming soon」一行
- 若还有小红书/即刻/公众号：实际从作者处获取（**执行阶段需用户确认**），不自行编造
- 默认行为：保持当前单行 GitHub，文案加「公众号 / 即刻 / X 暂未公开」提示

### 变更 4：元数据对齐

**目标路径**：`README.md` / `README.en.md` 顶部

**改法**：
- 不在 `README.md` / `README.en.md` 中标注「v3.1」或「v4.0」字样（v 号属于 SKILL.md 顶层元信息；README 引用一次即可）
- 顶部加一行 `> 当前版本：v4.0 / 2026-07-07 / 四层知识图谱 + 五阶段 skill 矩阵`，对齐 `SKILL.md` 末尾版本声明

### 变更 5：建立中英一致性约束（自我审查）

**目标路径**：两个 README

**改法**：在 `README.md` 末尾新增「文档维护」一段，注明：
- 中文为主版本，README.en.md 为镜像
- 中文变更后必须同步英文，反之亦然
- 涉及版本号 / skills 数量 / references 数量的更新，必须跑一次 `ls` + `grep` 验证

**为什么**：本次重写就是为消除 v3.1→v4.0 期间的文档漂移；建立约束防再发。

---

## Assumptions & Decisions

1. **中文先行，英文跟进**：先重写 `README.md` 定稿，再翻译 `README.en.md`。**两个文件都需在本次任务内完成**（用户已选「同步重写」）。
2. **不修改 `index.html`**：其 v3.1 标号属另一任务（landing page 同步升级），本次只动两个 README 文件。
3. **21 skills 一句话定位直抄 SKILL.md frontmatter**：不二次创作，避免引入主观偏差。
4. **9 references 一句话定位直抄各文件顶部引用块**：同理。
5. **5 维度、反 slop、评分纪律、SVG 雷达图、三层报告等核心机制内容**：从 `references/standards.md` / `references/methods-review.md` / `references/execution.md` 提炼，**不展开**（深度内容留给 references）。
6. **社交链接默认仅 GitHub 公开**：执行阶段如发现作者实际有更多平台，按实际补全；不自行编造小红书/即刻/X 链接。
7. **不引入新功能或新概念**：所有叙述必须能在 `SKILL.md` / `references/*.md` / `DESIGN.md` / `case/` 中找到出处。
8. **章节顺序**：双重身份 → 五阶段 → 四层图谱 → 核心机制 → 设计方向 → 工作流 → 仓库结构 → 许可 → 联系 —— 让「能做什么、怎么用」在最前 4 节讲完，深度参考在后 5 节。
9. **不删除任何原 README 提供的有效信息**：原 5 维度表、硬编码检测表、评分纪律、反 slop 黑白表、P0/P1/P2 分级表、SVG 雷达图说明、自身设计哲学声明 —— 全部保留并精修。
10. **本次重写不涉及代码改动**：纯文档改写，不动 `SKILL.md` / `index.html` / `DESIGN.md` / 任何 skill。

---

## Verification Steps

执行阶段按顺序跑：

1. **路径前置**：`ls` 确认 `README.md` / `README.en.md` 当前在仓库根目录
2. **内容落地**：用 `Write` 覆写两个文件
3. **一致性 grep 验证**：
   - `grep -c "v3.1" README.md README.en.md` → 应为 0（已无 v3.1 残留）
   - `grep -c "v4.0" README.md README.en.md` → 应 ≥ 1
   - `grep -c "21 skills\|21 个 skill\|21 skills" README.md` → 应 ≥ 1
   - `grep -c "9 references\|9 个 reference\|9 references" README.md` → 应 ≥ 1
   - `grep -c "Discover\|Define\|Create\|Review\|Deliver\|Tools" README.md` → 应全部命中（五阶段路由）
   - `grep "双重身份\|dual identity" README.md README.en.md` → 应各 ≥ 1
4. **结构完整性**：人工或 agent 自检新 README 9 个一级章节全部存在
5. **链接完整性**：
   - `README.md` 内所有 `(`<path>`)` 形式的相对路径都对应 `LS` 已存在的文件/目录
   - GitHub 链接 `https://github.com/monkren-ai/monkren-designer` 完整（不被截断）
6. **21 skills 清单核对**：把 README 中列出的 21 个 skill 名字与 `ls skills/*/SKILL.md` 比对，缺一不可
7. **9 references 清单核对**：把 README 中列出的 9 个 reference 文件与 `ls references/*.md` 比对，缺一不可
8. **badge 有效性**：三枚 badge URL 形式完整可识别
9. **英文版一致性**：人工对照两文件结构、章节标题、表格表头、代码块命令、版本号、统计数字（21/9/5/40/10/12/8 等）必须完全一致
10. **设计哲学自检**：用 `DESIGN.md` 的「自我审查清单」对两个 README 跑一遍——重点检查「是否基于 existing context」「是否有 AI slop」「每段是否 earn its place」「是否 placeholder > 烂实现」
11. **git status**：确认只动 `README.md` / `README.en.md` 两个文件

---

## Out of Scope

- `SKILL.md` / `DESIGN.md` / `index.html` 不动（v3.1 标号属另一任务）
- `case/*.html` 不动
- `references/*.md` / `skills/**/*.md` 不动
- LICENSE 内容不动
- 不创建新文件
- 不引入新的 badge / 图片 / 截图
- 不写新的 FAQ / CHANGELOG / CONTRIBUTING
- 不修改 license 段的实际许可文本（双语文本统一即可）
