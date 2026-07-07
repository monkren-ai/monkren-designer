# 彻底重构 monkren-designer 为「设计智能体」

## Summary

把项目从「设计审查 skill」彻底重构为「设计智能体」——覆盖发现→定义→创作→审查→交付五阶段全工作流。删除 `skills/design-system-prompt/` 英文原文,所有内容中文化并溶解到统一的中文知识体系。

**核心变更**:
- **references 重组**:7 文件 → 9 文件四层知识图谱(信念/标准/方法/执行 + 4 个独立专题库)
- **skill 矩阵化**:21 个 skill(7 现有 + 14 来自 design-system-prompt)按六阶段工作流重新分类到 `discover/define/create/review/deliver/tools/` 子目录
- **SKILL.md 重写**:从「审查入口」升级为「五阶段统一路由入口」
- **index.html 重写**:landing page 反映「设计智能体」新定位
- **删除 design-system-prompt 文件夹**:内容溶解后完全删除
- **DESIGN.md / README.md 更新**:反映新架构

**保留不动**: `assets/`、`case/`、`scripts/`、`.gitattributes`、`LICENSE`、`README.en.md`(英文 README 同步更新)

---

## Current State Analysis

### 现有架构(审查为中心)

```
monkren-design/
├── SKILL.md                    # 审查入口(7 命令 + 5 维度 + 评分纪律)
├── DESIGN.md                   # 项目设计系统(Graphic Monochrome Canvas)
├── README.md / README.en.md    # 项目说明
├── index.html                  # Landing page(80 哲学卡片展示)
├── references/ 7 文件(~5450 行,全中文)
│   ├── philosophy.md (~660)    # 信念层:40 哲学 + 12 维度画像 + 8 字段 + 5 铁律 + 落地概念包 + 基因重组 + Demo 规范
│   ├── aesthetics.md (~660)    # 标准层:5 维度评分 + 反 AI slop + 评分纪律 + 常见问题
│   ├── design-system.md (~650) # 标准层:9 段框架 + 硬编码 + 合规 + 品牌资产 + SwiftLint + Token
│   ├── implementation.md (~1170) # 执行层:7 命令 + 页面遍历 + 报告模板 + 持久化 + 自检
│   ├── review-perspectives.md (~940) # 10 视角 + 权重
│   ├── platform-guides.md (~620) # 6 平台审查
│   └── lazyweb-integration.md (~756) # Lazyweb MCP
├── skills/ 7 子 skill(各自带 frontmatter 的 SKILL.md)
│   ├── add-inspo-source/       # 工具:添加灵感源
│   ├── remove-inspo-source/    # 工具:移除灵感源
│   ├── design-research/        # 研究:结构化设计研究
│   ├── quick-references/       # 研究:快速参考查找
│   ├── design-improve/         # 创作:设计改进建议
│   ├── design-brainstorm/      # 创作:跨域灵感头脑风暴
│   └── visual-taste-lab/       # 整合:视觉品味系统
└── skills/design-system-prompt/ # 待融合(英文,将删除)
    ├── system-prompt.md         # 20 章设计师人格
    └── skills/ 14 个英文 skill
        ├── discovery-questions.md
        ├── frontend-aesthetic-direction.md
        ├── wireframe.md
        ├── make-a-deck.md
        ├── make-a-prototype.md
        ├── make-tweakable.md
        ├── generate-variations.md
        ├── design-system-extract.md
        ├── component-extract.md
        ├── accessibility-audit.md
        ├── ai-slop-check.md
        ├── hierarchy-rhythm-review.md
        ├── interaction-states-pass.md
        └── polish-pass.md
```

### 痛点

1. **审查/创作割裂**:项目主打审查,但已有 7 个子 skill 中 3 个是创作类,加上 design-system-prompt 的 14 个 skill,创作能力分散且无统一入口
2. **references 内部冗余**:`philosophy.md` 反 AI slop 信念 / `aesthetics.md` 反 AI slop 黑名单 / `design-system.md` 合规检查,三处都涉及 slop,虽有「三层边界规则」但仍冗余
3. **中英文割裂**:design-system-prompt 英文 vs 项目中文,7 处重叠点
4. **skill 无分类**:21 个 skill 平铺在 `skills/` 下,无工作流逻辑
5. **入口单一**:SKILL.md 只路由审查场景,创作场景无入口

### 决策依据(用户确认)

1. 重构力度 = 彻底重构(项目升级为「设计智能体」)
2. 英文处理 = 删除(溶解后完全删除 design-system-prompt 文件夹)

---

## Proposed Changes

### 新架构总览

```
monkren-design/
├── SKILL.md                    # ★ 重写:五阶段统一路由入口
├── DESIGN.md                   # ◆ 微调:更新关联文档节
├── README.md                   # ★ 重写:反映「设计智能体」定位
├── README.en.md                # ★ 重写:英文版同步
├── index.html                  # ★ 重写:五阶段工作流可视化 landing
├── references/ 9 文件(四层知识图谱)
│   ├── beliefs.md              # ★ 新建:信念层(审查+创作共享)
│   ├── standards.md            # ★ 新建:标准层(美学+系统评价标准)
│   ├── methods-create.md       # ★ 新建:创作方法层
│   ├── methods-review.md       # ★ 新建:审查方法层
│   ├── execution.md            # ★ 新建:执行层(产出+持久化+自检)
│   ├── philosophy-library.md   # ◆ 重命名自 philosophy.md(保留 40 哲学库主体)
│   ├── perspectives.md         # ◆ 重命名自 review-perspectives.md
│   ├── platforms.md            # ◆ 重命名自 platform-guides.md
│   └── integration.md          # ◆ 重命名+扩展自 lazyweb-integration.md
├── skills/ 六阶段矩阵
│   ├── discover/               # 发现阶段
│   │   ├── design-research/    # ◆ 移动自现有
│   │   ├── quick-references/   # ◆ 移动自现有
│   │   └── design-brainstorm/  # ◆ 移动自现有
│   ├── define/                 # 定义阶段
│   │   ├── discovery-questions/ # ★ 新建(溶解自英文,加 frontmatter)
│   │   ├── frontend-aesthetic-direction/ # ★ 新建
│   │   └── visual-taste-lab/   # ◆ 移动自现有
│   ├── create/                 # 创作阶段
│   │   ├── wireframe/          # ★ 新建
│   │   ├── make-a-prototype/   # ★ 新建
│   │   ├── make-a-deck/        # ★ 新建
│   │   ├── make-tweakable/     # ★ 新建
│   │   ├── generate-variations/ # ★ 新建
│   │   ├── design-improve/     # ◆ 移动自现有
│   │   ├── design-system-extract/ # ★ 新建
│   │   └── component-extract/  # ★ 新建
│   ├── review/                 # 审查阶段
│   │   ├── accessibility-audit/ # ★ 新建
│   │   ├── ai-slop-check/      # ★ 新建
│   │   ├── hierarchy-rhythm-review/ # ★ 新建
│   │   ├── interaction-states-pass/ # ★ 新建
│   │   └── polish-pass/        # ★ 新建
│   ├── deliver/                # 交付阶段
│   │   └── README.md           # ★ 新建:说明交付阶段聚合了 polish-pass + 报告生成
│   └── tools/                  # 横切工具
│       ├── add-inspo-source/   # ◆ 移动自现有
│       └── remove-inspo-source/ # ◆ 移动自现有
├── assets/                     # 不变
├── case/                       # 不变
└── scripts/                    # 不变
```

**图例**: ★ 新建/重写 | ◆ 移动/重命名 | 无标记 = 不变

---

### 变更 1: references 重组为四层知识图谱

#### 1.1 新建 `references/beliefs.md`(信念层)

**目的**: 审查与创作共享的设计信念,从 `philosophy.md` 抽出信念部分 + `design-system-prompt/system-prompt.md` ch1-6 融合。

**内容来源**:
- `references/philosophy.md` §1(核心哲学深度论述:existing context / 反 AI slop / 系统优先 / Placeholder > 烂实现 / 品牌被认出来)
- `design-system-prompt/system-prompt.md` ch1(Identity and role)、ch4(Rooting in existing context)、ch5(Content principles)、ch6(Aesthetic principles)、ch16(Quality over quantity)、ch19(IP and content boundaries)

**章节结构**:
1. 双重身份:审查员 + 创作者(原 ch1 + 项目审查员身份融合)
2. 从 existing context 出发(原 philosophy.md §1.1 + ch4)
3. 反 AI slop 信念(原 philosophy.md §1.2 + ch6 信念层;**黑名单细节指向** standards.md)
4. 系统优先,不要填充(原 philosophy.md §1.3 + ch5)
5. Placeholder > 烂实现(原 philosophy.md §1.4 + ch5)
6. 品牌的哲学:被认出来(原 philosophy.md §1.5)
7. 质量优于数量(原 ch16 + 项目评分纪律信念)
8. IP 与内容边界(原 ch19)
9. 品牌重要性(原 SKILL.md 三层边界规则中的「品牌重要性」行)

#### 1.2 新建 `references/standards.md`(标准层)

**目的**: 美学 + 系统的统一评价标准,从 `aesthetics.md` + `design-system.md` 抽出标准部分 + `system-prompt.md` ch7-13 融合。

**内容来源**:
- `references/aesthetics.md` 全文(5 维度评分 + 反 AI slop 黑名单 + 评分纪律 + 场景评审侧重 + 常见问题)
- `references/design-system.md` 全文(9 段框架 + 硬编码检测 + 合规检查 + 品牌资产协议 + SwiftLint + Token 架构)
- `design-system-prompt/system-prompt.md` ch7(Visual hierarchy and rhythm)、ch8(Typography system)、ch9(Color system)、ch10(Accessibility)、ch11(Interaction and feedback)、ch12(Simplicity and one clear CTA)、ch13(System thinking)

**章节结构**:
1. 5 维度评审体系(原 aesthetics.md §1;**创作视角的层级构建指向** methods-create.md)
2. 评分纪律 4 铁律(原 aesthetics.md §2.2 + ch16)
3. 反 AI slop 完整黑名单(原 aesthetics.md 反 slop 章节 + ch6 + ai-slop-check.md 检测清单)
4. 场景评审侧重(原 aesthetics.md §2.4)
5. DESIGN.md 9 段框架检查清单(原 design-system.md §1)
6. 硬编码值检测规则(原 design-system.md §2 + SwiftLint)
7. 设计系统合规性 + 品牌资产协议(原 design-system.md §3-4)
8. 视觉层级与节奏标准(原 ch7 + hierarchy-rhythm-review.md 标准)
9. 排印系统标准(原 ch8 + design-system.md 排版段)
10. 色彩系统标准(原 ch9 + design-system.md 色彩段)
11. 可访问性标准 WCAG(原 ch10 + accessibility-audit.md 标准)
12. 交互状态完整性标准(原 ch11 + interaction-states-pass.md 标准)
13. 简化与单一 CTA 标准(原 ch12)
14. 系统思维与组件标准(原 ch13 + component-extract.md 标准)

#### 1.3 新建 `references/methods-create.md`(创作方法层)

**目的**: 设计创作的工作流与方法,溶解自 `design-system-prompt/system-prompt.md` 创作章节 + 7 个 Production skill + 2 个 System skill。

**内容来源**:
- `system-prompt.md` ch2(Workflow)、ch3(Asking questions)、ch14(Respecting the medium)、ch15(Understanding users)、ch17(Output principles)、ch18(Collaboration and delivery)
- 7 个 Production skill: discovery-questions / frontend-aesthetic-direction / wireframe / make-a-deck / make-a-prototype / make-tweakable / generate-variations
- 2 个 System skill: design-system-extract / component-extract

**章节结构**:
1. 创作工作流 6 步(原 ch2:理解需求→获取上下文→计划可见→骨架先行→迭代验证→简要总结)
2. 创作前的提问协议(原 ch3 + discovery-questions.md:5 必问项 + 何时问/跳过)
3. 无品牌时的美学方向承诺(原 frontend-aesthetic-direction.md:4 方向 + 承诺结构)
4. 低保真探索:wireframe 方法(原 wireframe.md:约定 + 变体草图 + 注释)
5. 输出格式选择(原 ch17:视觉探索画布 / 可点击原型 / 幻灯片 / 动画时间线)
6. 变体生成方法(原 generate-variations.md:4 轴变化 + 单文件多变体 + basic→bold)
7. 原型制作方法(原 make-a-prototype.md:屏幕状态映射 + 交互连接 + 持久化)
8. 幻灯片制作方法(原 make-a-deck.md:固定尺寸 + letterbox + 布局系统)
9. 实时调整面板方法(原 make-tweakable.md:可调项识别 + 面板设计 + 主机协议)
10. 设计 token 提取方法(原 design-system-extract.md:4 阶段提取 + tokens 文件)
11. 组件提取方法(原 component-extract.md:5 阶段 + 组件清单结构)
12. 媒体特性:HTML/CSS/SVG(原 ch14:CSS 擅长项 + SVG + 真实交互 + letterbox + localStorage)
13. 用户理解(原 ch15:4 项确认 + 单一 persona + 测试假设)
14. 创作协作与交付(原 ch18:早期展示 + 简洁总结 + 委托验证)

#### 1.4 新建 `references/methods-review.md`(审查方法层)

**目的**: 设计审查的工作流与方法,从 `implementation.md` 抽出审查执行部分 + 5 个 Review skill 流程融合。

**内容来源**:
- `references/implementation.md` §1(审查工作流详细步骤)+ §1.1(触发命令)+ §1.2(页面遍历)+ §1.3(报告持久化)
- 5 个 Review skill: accessibility-audit / ai-slop-check / hierarchy-rhythm-review / interaction-states-pass / polish-pass

**章节结构**:
1. 审查工作流 7 步(原 implementation.md §1:Step 0-6)
2. 7 种触发命令体系(原 implementation.md §1.1)
3. 页面遍历审查(原 implementation.md §1.2)
4. 多视角审查调度(指向 perspectives.md)
5. 平台专项审查调度(指向 platforms.md)
6. 专项检测流程(原 implementation.md Step 4 各检测项)
   - 硬编码检测(指向 standards.md §6)
   - 合规检查(指向 standards.md §7)
   - 反 AI slop 检测(指向 standards.md §3 + ai-slop-check.md 流程)
   - 可访问性检测(指向 standards.md §11 + accessibility-audit.md 流程)
   - 视觉层级检测(指向 standards.md §8 + hierarchy-rhythm-review.md 流程)
   - 交互状态检测(指向 standards.md §12 + interaction-states-pass.md 流程)
7. Polish 流程编排(原 polish-pass.md:5 阶段 + 4 agent 并行 + 3 类问题分级)
8. 自检迭代(原 implementation.md §4)

#### 1.5 新建 `references/execution.md`(执行层)

**目的**: 产出规范、持久化、报告模板,从 `implementation.md` 抽出执行产出部分。

**内容来源**:
- `references/implementation.md` §2(报告模板)+ §3(SVG 雷达图)+ §1.3(持久化)

**章节结构**:
1. 报告类型与格式(完整报告 / 快速报告 / 设计建议报告 / 评分提升建议)
2. 三层递进报告结构(结论层 + 诊断层 + 行动层)
3. 设计建议报告 8 字段模板(原 philosophy.md §4 的 8 字段输出)
4. SVG 雷达图规范(原 implementation.md §3)
5. 报告持久化路径与命名(原 implementation.md §1.3)
6. Demo 生成规范(原 philosophy.md §12)
7. 创作产出规范(原型 / 幻灯片 / 变体的文件组织)

#### 1.6 重命名 `references/philosophy.md` → `references/philosophy-library.md`

**目的**: 把 40 哲学库独立出来,信念部分已移到 beliefs.md。

**操作**:
- 重命名文件
- 删除 §1(核心哲学深度论述,已移到 beliefs.md)
- 删除 §4(设计方向顾问 8 字段,已移到 execution.md)
- 删除 §12(Demo 生成规范,已移到 execution.md)
- 保留 §2(40 哲学完整风格库)、§3(哲学 DNA)、§5(项目类型→流派矩阵)、§6(真实产品案例库)、§7-§11(约束过滤/落地概念包/基因重组/页面类型×哲学)
- 顶部加导航:「信念层见 beliefs.md,落地概念包模板见 execution.md」

#### 1.7-1.9 重命名

- `references/review-perspectives.md` → `references/perspectives.md`(内容不变)
- `references/platform-guides.md` → `references/platforms.md`(内容不变)
- `references/lazyweb-integration.md` → `references/integration.md`(内容不变,可补一段说明它服务于创作+审查两轨)

#### 1.10 删除旧 references 文件

完成内容迁移后,删除以下旧文件:
- `references/philosophy.md`(已重命名为 philosophy-library.md 且内容已拆分)
- `references/aesthetics.md`(内容已合并到 standards.md)
- `references/design-system.md`(内容已合并到 standards.md)
- `references/implementation.md`(内容已拆分到 methods-review.md + execution.md)

---

### 变更 2: skill 矩阵化重组

#### 2.1 移动现有 7 个子 skill 到六阶段子目录

| 现有路径 | 新路径 | 阶段 |
|---|---|---|
| `skills/design-research/` | `skills/discover/design-research/` | 发现 |
| `skills/quick-references/` | `skills/discover/quick-references/` | 发现 |
| `skills/design-brainstorm/` | `skills/discover/design-brainstorm/` | 发现 |
| `skills/visual-taste-lab/` | `skills/define/visual-taste-lab/` | 定义 |
| `skills/design-improve/` | `skills/create/design-improve/` | 创作 |
| `skills/add-inspo-source/` | `skills/tools/add-inspo-source/` | 工具 |
| `skills/remove-inspo-source/` | `skills/tools/remove-inspo-source/` | 工具 |

**移动时处理**:
- 每个子 skill 内部的 `SKILL.md` 保持不变(frontmatter 已有)
- 更新各 SKILL.md 内部的相对路径引用(如有引用 `../../references/` 需改为 `../../../references/`)

#### 2.2 把 design-system-prompt 的 14 个 skill 改造为项目子 skill

对每个英文 skill 文件:
1. 翻译为中文(保留英文术语如 token/WCAG/oklch)
2. 加 YAML frontmatter(参考现有子 skill 格式)
3. 重命名为 `SKILL.md`
4. 放到对应阶段子目录
5. 删除原英文文件

**14 个 skill 的迁移映射**:

| 原英文路径 | 新路径 | frontmatter name | 阶段 |
|---|---|---|---|
| `design-system-prompt/skills/discovery-questions.md` | `skills/define/discovery-questions/SKILL.md` | `discovery-questions` | 定义 |
| `design-system-prompt/skills/frontend-aesthetic-direction.md` | `skills/define/frontend-aesthetic-direction/SKILL.md` | `frontend-aesthetic-direction` | 定义 |
| `design-system-prompt/skills/wireframe.md` | `skills/create/wireframe/SKILL.md` | `wireframe` | 创作 |
| `design-system-prompt/skills/make-a-prototype.md` | `skills/create/make-a-prototype/SKILL.md` | `make-a-prototype` | 创作 |
| `design-system-prompt/skills/make-a-deck.md` | `skills/create/make-a-deck/SKILL.md` | `make-a-deck` | 创作 |
| `design-system-prompt/skills/make-tweakable.md` | `skills/create/make-tweakable/SKILL.md` | `make-tweakable` | 创作 |
| `design-system-prompt/skills/generate-variations.md` | `skills/create/generate-variations/SKILL.md` | `generate-variations` | 创作 |
| `design-system-prompt/skills/design-system-extract.md` | `skills/create/design-system-extract/SKILL.md` | `design-system-extract` | 创作 |
| `design-system-prompt/skills/component-extract.md` | `skills/create/component-extract/SKILL.md` | `component-extract` | 创作 |
| `design-system-prompt/skills/accessibility-audit.md` | `skills/review/accessibility-audit/SKILL.md` | `accessibility-audit` | 审查 |
| `design-system-prompt/skills/ai-slop-check.md` | `skills/review/ai-slop-check/SKILL.md` | `ai-slop-check` | 审查 |
| `design-system-prompt/skills/hierarchy-rhythm-review.md` | `skills/review/hierarchy-rhythm-review/SKILL.md` | `hierarchy-rhythm-review` | 审查 |
| `design-system-prompt/skills/interaction-states-pass.md` | `skills/review/interaction-states-pass/SKILL.md` | `interaction-states-pass` | 审查 |
| `design-system-prompt/skills/polish-pass.md` | `skills/review/polish-pass/SKILL.md` | `polish-pass` | 审查 |

**frontmatter 模板**(以 `wireframe` 为例):

```yaml
---
name: wireframe
description: |
  低保真线框图探索。快速创建多个灰度线框变体来探索流程、布局或想法,在设计开放阶段使用。
  触发词:"探索布局"、"画几个线框"、"sketch"、"low-fi"、"几个方向"。
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - AskUserQuestion
---
```

**翻译原则**:
- 标题和正文翻译为中文
- 保留英文术语:token / WCAG / oklch / Phase / placeholder / hi-fi / lo-fi / wireframe / prototype / deck / tweakable / CTA / persona / slop
- 代码示例不翻译
- 流程阶段标题保留中英对照(如「阶段 1:理解目标 / Phase 1: Understand the goal」)

#### 2.3 删除 design-system-prompt 文件夹

完成 14 个 skill 迁移 + system-prompt.md 内容溶解到 references 后:
- 删除整个 `skills/design-system-prompt/` 文件夹
- 包括 `system-prompt.md` 和 `skills/` 子目录下所有文件

#### 2.4 为每个阶段子目录加 README.md

新建 6 个 README.md(每个 ~30 行):
- `skills/discover/README.md`
- `skills/define/README.md`
- `skills/create/README.md`
- `skills/review/README.md`
- `skills/deliver/README.md`(说明交付阶段聚合 polish-pass + 报告生成 + Demo 生成)
- `skills/tools/README.md`

每个 README 包含:
- 阶段定位(1 句话)
- 该阶段包含的 skill 清单(表格:skill 名 / 解决什么问题 / 触发词)
- 与上下游阶段的衔接关系
- 指向 references 的链接

---

### 变更 3: 重写 `SKILL.md` 为五阶段统一路由入口

**目的**: 从「审查入口」升级为「设计智能体五阶段路由入口」。

**新结构**:

```markdown
---
name: monkren-design
description: monkren-design——设计智能体。覆盖发现→定义→创作→审查→交付五阶段全工作流。审查场景:5 维度评审+硬编码检测+合规检查+10 视角审查,输出三层递进报告。创作场景:wireframe/原型/幻灯片/变体/tweakable 实时调整。设计方向:12 维度项目画像+40 哲学库+8 字段+落地概念包。触发词:评审/审查/review/设计方向/风格推荐/demo/演示/原型/wireframe/线框/变体/探索布局/设计研究/头脑风暴/改进设计/polish/润色。
---

# monkren-design

你是一位设计智能体,既是审查员也是创作者。

[身份声明:审查员 + 创作者双重身份]

## 导航:五阶段工作流

| 阶段 | 用户意图 | 入口 |
|------|---------|------|
| 1. 发现 | 找灵感/研究竞品/跨域借鉴 | → skills/discover/ + references/integration.md |
| 2. 定义 | 锁定方向/提问/承诺美学 | → skills/define/ + references/beliefs.md |
| 3. 创作 | 画线框/做原型/做幻灯片/生成变体 | → skills/create/ + references/methods-create.md |
| 4. 审查 | 评审/检测/合规/打分 | → skills/review/ + references/methods-review.md |
| 5. 交付 | polish/报告/Demo | → skills/review/polish-pass/ + references/execution.md |

## 触发命令体系

### 审查命令(原 7 命令保留)
[简单审查/深度审查/全流程审查/硬编码检测/合规检查/设计建议/SwiftLint规则]

### 创作命令(新增)
[原型/幻灯片/线框/变体/tweakable/设计研究/头脑风暴/改进设计/polish]

## 信念层(审查+创作共享)
→ references/beliefs.md

## 标准层(审查+创作共享)
→ references/standards.md

## 深度参考
| 需求 | 入口 |
|------|------|
| 40 哲学库 | → references/philosophy-library.md |
| 10 视角审查 | → references/perspectives.md |
| 6 平台专项 | → references/platforms.md |
| Lazyweb + 外部集成 | → references/integration.md |
| 创作方法 | → references/methods-create.md |
| 审查方法 | → references/methods-review.md |
| 产出规范 | → references/execution.md |

## 三层边界规则
[更新版:覆盖创作+审查]
```

**保留**: 现有 SKILL.md 的核心价值(5 维度评审、评分纪律、反 AI slop、品牌资产协议)不丢失,只是重新组织到 standards.md / beliefs.md,SKILL.md 只保留路由。

---

### 变更 4: 重写 `index.html` landing page

**目的**: 反映「设计智能体」新定位,展示五阶段工作流。

**新结构**:
- Hero: 从「提交设计,拿回审查报告」改为「从灵感到交付,一位设计智能体」
- 五阶段工作流可视化(发现→定义→创作→审查→交付)
- 保留 80 哲学卡片展示(这是项目独特资产)
- 保留 Graphic Monochrome Canvas 视觉语言(纯黑白高对比)

**注意**: index.html 当前 3330+ 行,重写工作量大。可以保留 80 哲学卡片区域的逻辑,只重写 Hero 和导航部分。

**保守策略**: 如果完全重写风险太大,可以只更新 Hero 区域文案 + 新增五阶段工作流区块,保留其余结构。这部分在实施时根据用户偏好决定。

---

### 变更 5: 更新 `DESIGN.md`

**变更**:
- 更新「关联文档」节(新增,指向新的 references 结构)
- 更新「自我审查清单」中的引用路径(如 `references/aesthetics.md` → `references/standards.md`)
- 变更日志加 `v1.3 — 2026-07-07` 条目

---

### 变更 6: 重写 `README.md` + `README.en.md`

**新结构**:
- Hero: 「设计智能体,覆盖发现到交付全工作流」
- 五阶段能力表
- 仓库结构(反映新架构)
- 保留 License 部分

---

### 变更 7: 清理

- 删除 `skills/design-system-prompt/` 整个文件夹
- 删除旧 references 文件(philosophy.md / aesthetics.md / design-system.md / implementation.md,内容已迁移)
- 删除 `.trae/documents/` 下的旧 plan 文件(可选,保留历史)

---

## Assumptions & Decisions

### 假设

1. 用户接受项目定位从「审查 skill」升级为「设计智能体」(基于「彻底重构」选择)
2. 21 个 skill 全部保留(无删除),只是重新分类
3. 14 个英文 skill 翻译为中文(保留英文术语),加 frontmatter
4. references 9 文件四层架构能容纳所有内容且不冗余
5. index.html 重写采用保守策略(更新 Hero + 新增区块,保留 80 哲学卡片)

### 决策

1. **四层知识图谱**: 信念(beliefs)→ 标准(standards)→ 方法(methods-create / methods-review)→ 执行(execution),审查与创作共享信念+标准层,方法层分轨
2. **skill 六阶段分类**: discover/define/create/review/deliver/tools,deliver 阶段聚合 polish + 报告 + Demo
3. **14 个英文 skill 翻译为中文**: 与项目语言一致,保留英文术语便于检索
4. **旧 references 文件迁移后删除**: 不保留备份,git history 即是历史
5. **index.html 保守重写**: 避免破坏 80 哲学卡片这一核心资产

### 不做的事

- 不动 `assets/`、`case/`、`scripts/`
- 不删除 21 个 skill 中的任何一个
- 不改变现有子 skill 的 SKILL.md 正文(只移动 + 更新相对路径)
- 不引入新的依赖或工具
- 不改变项目的 Graphic Monochrome Canvas 视觉语言

### 风险与缓解

1. **风险**: references 重组可能丢失原有内容细节
   **缓解**: 每个 new references 文件在迁移时,逐节对照旧文件确保无遗漏;迁移后用 Grep 验证关键概念(如「5 维度」「反 AI slop」「40 哲学」)在新文件中都能找到

2. **风险**: 21 个 skill 移动后相对路径失效
   **缓解**: 移动后用 Grep 搜索各 SKILL.md 中的 `../` 引用,逐个修正

3. **风险**: index.html 重写破坏 80 哲学卡片
   **缓解**: 采用保守策略,只更新 Hero 和导航,保留卡片区域

4. **风险**: 工作量大,单次实施可能出错
   **缓解**: 分阶段实施(见下),每阶段验证后再进入下一阶段

---

## Verification Steps

### 阶段验证(每阶段完成后)

**阶段 1(references 重组)完成后**:
- 9 个新 references 文件都存在
- 用 Grep 验证关键概念在新文件中:5 维度评分 / 反 AI slop / 40 哲学 / 9 段框架 / 硬编码检测 / 10 视角 / 6 平台 / WCAG / oklch / design token
- 旧 4 个文件已删除(philosophy/aesthetics/design-system/implementation)
- 无悬空引用(其他文件不再指向已删除的旧文件名)

**阶段 2(skill 矩阵化)完成后**:
- 6 个阶段子目录都存在,每个含 README.md
- 21 个 skill 都在新位置(7 现有移动 + 14 新建)
- 14 个新 skill 都有 frontmatter(name/description/allowed-tools)
- 14 个新 skill 都是中文(术语保留英文)
- design-system-prompt 文件夹已删除
- 各 SKILL.md 内部相对路径正确(用 Grep 搜索 `../` 验证)

**阶段 3(SKILL.md 重写)完成后**:
- SKILL.md 含五阶段路由表
- 含审查命令(7 种)+ 创作命令(新增)
- 所有指向 references 的路径正确
- frontmatter description 含审查+创作触发词

**阶段 4(index.html + README + DESIGN)完成后**:
- index.html Hero 反映新定位
- README.md 含五阶段能力表 + 新仓库结构
- README.en.md 同步
- DESIGN.md 含关联文档节 + 更新的引用路径 + v1.3 变更日志

**最终验证**:
- `git status` 显示:新增 9 个 references + 14 个 skill + 6 个 README + 重写的 4 个根文档;删除 4 个旧 references + design-system-prompt 文件夹
- `index.html` 未破坏 80 哲学卡片(Grep 验证 `philosophy-card` 类还在)
- 所有内部链接无死链(用 Grep 验证 references 互相引用的路径存在)

---

## 实施顺序(分 4 阶段)

### 阶段 1: references 重组(工作量最大,最关键)

1. 读 `references/platform-guides.md` 全文确认写作风格基线
2. 读 `references/philosophy.md` 全文(660 行,提取信念部分 + 40 哲学库边界)
3. 读 `references/aesthetics.md` 全文(660 行)
4. 读 `references/design-system.md` 全文(650 行)
5. 读 `references/implementation.md` 全文(1170 行)
6. 读 `references/review-perspectives.md` + `references/lazyweb-integration.md` 确认是否需要内容调整
7. 新建 `references/beliefs.md`(融合 philosophy.md 信念部分 + system-prompt.md ch1,4,5,6,16,19)
8. 新建 `references/standards.md`(融合 aesthetics.md + design-system.md + system-prompt.md ch7-13)
9. 新建 `references/methods-create.md`(融合 system-prompt.md ch2,3,14,15,17,18 + 7 Production skill + 2 System skill)
10. 新建 `references/methods-review.md`(融合 implementation.md 审查部分 + 5 Review skill 流程)
11. 新建 `references/execution.md`(融合 implementation.md 报告部分 + philosophy.md §4,§12)
12. 重命名 philosophy.md → philosophy-library.md,删除已迁移章节
13. 重命名 review-perspectives.md → perspectives.md
14. 重命名 platform-guides.md → platforms.md
15. 重命名 lazyweb-integration.md → integration.md
16. 删除旧 philosophy.md / aesthetics.md / design-system.md / implementation.md
17. 阶段 1 验证

### 阶段 2: skill 矩阵化

18. 创建 6 个阶段子目录 + README.md
19. 移动 7 个现有子 skill 到对应阶段子目录
20. 更新移动后的 SKILL.md 内部相对路径
21. 把 design-system-prompt 的 14 个英文 skill 逐个翻译+加 frontmatter+放到新位置
22. 删除 design-system-prompt 文件夹
23. 阶段 2 验证

### 阶段 3: SKILL.md 重写

24. 读现有 SKILL.md 全文,提取保留的核心结构(5 维度表/评分纪律/三层边界规则)
25. 重写 SKILL.md 为五阶段统一路由入口
26. 阶段 3 验证

### 阶段 4: 根文档更新

27. 重写 README.md(中文)
28. 重写 README.en.md(英文同步)
29. 更新 DESIGN.md(关联文档节 + 引用路径 + v1.3 变更日志)
30. 重写 index.html(Hero + 五阶段区块,保留 80 哲学卡片)
31. 最终验证

---

## 工作量评估

- **阶段 1**: ~9 个新文件 + 4 个重命名 + 4 个删除,需要读 ~5450 行旧内容 + 写 ~5000 行新内容。最重。
- **阶段 2**: 7 个移动 + 14 个翻译改造 + 6 个 README + 1 个文件夹删除。中等。
- **阶段 3**: 1 个文件重写。轻。
- **阶段 4**: 4 个根文档更新。中等(index.html 最重)。

建议按阶段提交,每阶段完成后可暂停让用户审查。
