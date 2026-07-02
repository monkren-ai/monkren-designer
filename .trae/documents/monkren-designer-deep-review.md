# monkren designer — 深度梳理计划

> 计划模式产出。仅写计划，不动其他文件。

## Summary

对 `monkren designer` 项目做一次「三合一」深度梳理，输出 1 份审计报告（`.md` + 可选 `.html`）。审计工具和方法全部使用本项目自研的体系——**用 monkren-design 审 monkren-design**：

1. **5 维度设计自评**（哲学一致性 / 视觉层级 / 细节执行 / 功能性 / 创新性）
2. **硬编码值自检**（用本项目 DESIGN.md 的 token 体系扫描 index.html）
3. **结构与内容审计**（SKILL.md / DESIGN.md / index.html / 7 份 references / 7 个 sub-skill / case/ 一致性与完整性）

报告保存到 `.trae/documents/monkren-designer-deep-review.md`（与本 plan 同目录），可选同步一份 HTML 便于阅读。

---

## Current State Analysis（已读完的关键文件）

| 文件 | 行数 | 关键观察 |
|---|---|---|
| `README.md` | ~230 | 中文版 README，列出 19 个能力点 + 5 维度评审 / 4 铁律 / 8 类 slop / 8 工作流步骤 |
| `README.en.md` | ~50 | 英文 README 摘要 |
| `SKILL.md` | ~340 | 主 skill 入口，v3.0（2026-06-25），三层结构（信念/标准/执行），含导航与触发命令 |
| `DESIGN.md` | ~345 | 项目自家设计系统：Canvas Black + Arctic White + Subtle Gray；Lausanne / Victor Serif / Black Tie 字体；4px 网格 |
| `index.html` | ~2370 | 单文件 Landing Page，纯 CSS，含 SVG 雷达图，引用 25+ 案例（实际只有 3 个） |
| `references/philosophy.md` | (105 KB) | 40 哲学库 + 12 维度项目画像 + 5 流派适配 + Demo 规范 |
| `references/aesthetics.md` | (29 KB) | 5 维度评分标准 + slop 黑名单 |
| `references/design-system.md` | (22 KB) | 9 段框架 + token 架构 + SwiftLint |
| `references/implementation.md` | (89 KB) | 工作流 + 报告模板 + 自检 |
| `references/platform-guides.md` | (22 KB) | 6 平台专项审查 |
| `references/review-perspectives.md` | (41 KB) | 10 视角审查 |
| `references/lazyweb-integration.md` | (27 KB) | 真实证据集成 |
| `skills/*` | 7 个 sub-skill | visual-taste-lab / design-brainstorm / design-improve / design-research / quick-references / add-inspo-source / remove-inspo-source |
| `case/` | 3 个 HTML | 仅 Design Review / Design Suggestion / Score Improvement 3 个样本，README 与 index 都说 25+ |

### 已识别的 7 类不匹配（仅样本，不全面）

1. **版本号错位** — `index.html` 标题/页脚说「v2.0」，`SKILL.md` 顶部说 v3.0、内部又出现 v3.1 标记。`README.md` 也称 v2.0。
2. **token 偏离** — `index.html` 自定义 `--spacing-7/10/13/29/54/78` 等非 4/8 倍数间距，违反 `DESIGN.md`「间距系统 4/8 倍数」规则；`--section-gap: 29px`（vs 28px）、`--card-padding: 13px`（vs 16px）、`--element-gap: 13px`（vs 12px）。
3. **硬编码值密集** — `index.html` 多处 `padding: 36px 0 56px;`、`padding: 24px 0;`、`line-height: 44px;`、按钮 `padding: 12px 13.2px;`、硬编码尺寸 `34px/46px/54px/22px/8px/7px/14px/10px` 等。
4. **Case Gallery 死链** — `index.html` 引用 25 个 case，实际 `case/` 下仅 3 个，剩余 22 个是 404。
5. **sub-skill 数量描述** — `SKILL.md` 顶部 description 写「7 sub-skill」并列出 6 个 + 主 skill；`index.html` 描述为「7 个 Sub-skill + 1 个主 skill」；目录里恰好 7 个 sub-skill。数量一致但入口描述混用。
6. **README 与 SKILL.md 的能力条目数不一致** — `README.md` 列出 19 项「能做什么」；`SKILL.md` 描述触发词覆盖更广但未一一对应。
7. **`lang="zh-CN"` 与「bilingual agent」承诺不匹配** — `index.html` 是中文单语，README 承诺 agent 是 bilingual，但 skill 主文档 `SKILL.md` 是纯中文。

---

## Proposed Changes

### 步骤 1：执行 5 维度自评

按 `references/aesthetics.md` 的 5 维度评分表，对 `index.html` 自身做评分（0-10），强制触发 4 条铁律（禁通胀 / 禁平均上浮 / 必须引证 / 创新性允许低分）。

| 维度 | 评分方法 |
|---|---|
| 哲学一致性 | 是否贯彻「Graphic Monochrome Canvas」：黑白高对比 / 无圆角 / 1px 边框 / 120px pill。逐元素检视。 |
| 视觉层级 | 眯眼测试 + 视线流：Hero → Capabilities → Philosophy Library → Case Gallery → Workflow → Refs → Use，是否有清晰信息密度梯度。 |
| 细节执行 | 像素级：间距是否一致 / 对齐是否正确 / 颜色是否超出 3 色 / 字号阶梯是否完整。 |
| 功能性 | 每个 section 是否 earn its place？删一个会变差吗？Command Layout / Case Gallery / Refs 是否有信息冗余？ |
| 创新性 | 在「黑白高对比 / 极简」流派内是否有独特表达？还是落入了 Build / Müller-Brockmann 的模板？ |

输出：5 维度分数表 + 雷达图 SVG（按 SKILL.md §3 规范）+ Keep/Fix/Quick Wins 三栏。

### 步骤 2：执行硬编码值自检

按 `references/design-system.md` 的硬编码检测规则（颜色 / 字体 / 间距三类），扫描 `index.html`，对照 `DESIGN.md` 的 token 体系。

**扫描目标（不全）**：
- 所有非 token 颜色（`#xxx`、`rgb()`、`rgba()`、`hsl()`）
- 所有非 token 字体名（`font-family` 直接声明）
- 所有非 4/8 倍数间距（`padding` / `margin` / `gap` / `width` / `height` 数值）
- 所有非 token 圆角（除 `--radius-full: 120px` 和 `50%` 外）
- SVG 内的硬编码 `font-family` / `font-size` / `stroke-width`

**输出**：扫描条目数 + 偏离 token 列表 + 修复建议（每个条目给「应替换为哪个 token」）。

### 步骤 3：结构与内容审计

按 9 段框架（DESIGN.md）+ 信念层/标准层/执行层（SKILL.md）的结构，逐项审计：

1. **版本号一致性** — README / SKILL.md / index.html / DESIGN.md 是否统一到 v3.1？
2. **sub-skill 描述完整性** — 7 个 sub-skill 的 SKILL.md 是否齐全、入口描述是否符合 SKILL.md 顶层 description？
3. **case 目录完整性** — index.html 引用的 25 个 case 中实际有 3 个，缺口 22 个（哪些是已规划未交付？哪些是死链？）
4. **references 内部引用闭环** — 7 份 reference 之间是否互相引用一致？断链 / 旧章节引用？
5. **README 与 SKILL.md 能力表一致性** — 19 项 vs N 项的差异在哪？
6. **bilingual 承诺** — `index.html` 英文版？SKILL.md 英文版？EN README 是否兑现承诺？
7. **版权 / License 引用** — 各 HTML case 样本是否保留作者署名？
8. **i18n** — `lang="zh-CN"` 是否唯一？还是同时有 `lang="en"` 分支？

### 步骤 4：综合报告输出

报告结构（按 SKILL.md §2「三层递进报告」）：

```
# monkren designer 深度梳理报告
## 0. 元信息（生成日期 / 工具 / 范围）
## 1. 结论层（1 分钟看懂）
   - 综合评分 + 雷达图
   - 1 句话总结
   - P0/P1/P2 计数
   - Top 3 Quick Win
## 2. 诊断层
   - 2.1 5 维度自评表 + 引证
   - 2.2 硬编码值扫描统计
   - 2.3 结构与内容审计清单
## 3. 行动层
   - 3.1 Quick Wins（5 分钟内）
   - 3.2 Fix 清单（含工作量 + 依赖）
   - 3.3 Keep 清单
## 4. 附录
   - 完整硬编码偏离条目
   - 雷达图 SVG 源码
   - 引用文件路径表
```

### 步骤 5：自检迭代

按 SKILL.md §4 自检清单：
- 评分与描述一致性（7 分不能写「明显问题」）
- Fix 可操作性（每个 Fix 含具体操作和数值）
- Quick Wins 真实性（每个 ≤5 分钟）
- Keep/Fix 不冲突

---

## 关键文件清单（执行阶段需读/扫描）

| 路径 | 用途 |
|---|---|
| `SKILL.md` | 顶层规范 + 5 维度表 + 4 铁律 |
| `DESIGN.md` | token 体系（颜色/字体/间距）+ 9 段框架 |
| `index.html` | 视觉自评 + 硬编码扫描主目标 |
| `README.md` / `README.en.md` | 文本一致性核对 |
| `references/aesthetics.md` | 5 维度评分细则 + slop 黑名单 |
| `references/design-system.md` | 硬编码检测规则 + 9 段检查清单 |
| `references/philosophy.md` | 哲学库（创新性维度参考） |
| `references/implementation.md` | 报告模板 + 自检清单 |
| `references/review-perspectives.md` | 10 视角（可选扩展维度） |
| `case/` 全部 3 个文件 | Case Gallery 完整性核对 |
| `skills/*/SKILL.md` 全部 7 个 | sub-skill 入口描述完整性 |

---

## Assumptions & Decisions

| 决策 | 选择 | 理由 |
|---|---|---|
| 报告输出格式 | 主输出 `.md`；可选同步 `.html` | `.md` 便于版本对比和搜索；`.html` 便于阅读 |
| 报告存放路径 | `.trae/documents/monkren-designer-deep-review.md` | 与 plan 同目录，用户易发现 |
| 5 维度评分方法 | 完全遵循本项目自研体系（不引入外部框架） | 用户选「三合一」+ 项目是「自审」性质 |
| 硬编码扫描范围 | 全文扫描 `index.html`（2370 行） | 唯一含样式的源文件 |
| 结构调整 | **不**修改任何项目文件（仅生成报告） | 计划模式只读 |
| 评分严格度 | 严格触发 4 铁律，特别是「禁通胀」 | 否则失去「自审」意义 |
| 创新性评分 | 允许低分（铁律 4） | 黑白高对比本身是成熟流派 |
| 报告语言 | 中文（与本项目 README / SKILL.md 一致） | 保持项目语言一致性 |
| 是否修复发现的问题 | **否**——本任务仅梳理，不动手 | 用户说「深度梳理」不是「修复」；修复需另起 plan |

---

## Verification（执行完成后用以下 4 步自检）

1. **报告是否齐全** — `.trae/documents/monkren-designer-deep-review.md` 存在，含 4 大节（元信息 / 结论 / 诊断 / 行动）。
2. **评分是否自洽** — 5 维度分数与引证段落是否一致（不允许 7 分 + 「明显问题」表述）。
3. **Fix 是否可操作** — 每个 Fix 条目是否有「替换为 token X / 文件 Y 行 N」具体动作。
4. **是否贯彻 4 铁律** — 报告中显式标注是否触发全维度 ≥7 自检、是否引用行号、是否避免平均上浮。

---

## 不在本计划范围内（如需可另起 plan）

- 修改 `index.html` 修复硬编码值
- 补齐 22 个缺失 case 文件
- 同步 `SKILL.md` / `README.md` / `index.html` 版本号
- 生成 `index.html` 英文版
- 把 `references/*.md` 翻译为英文

执行时长预估参考：阅读 12 份核心文件 + 扫描 2370 行 + 5 维度评分 + 硬编码全表 + 结构审计 + 写报告 ≈ 单次会话内可完成。
