# UI/UX 设计哲学扩充计划

## 摘要

为 Monkren Design 设计哲学库新增 3 个流派、12 张卡片，覆盖 APP 产品 UI、Web 网页 UI、UX 体验设计、视觉设计领域。已完成 3 张 PoC 卡片 + 1 张图片（#47），剩余 1 张图片 + 数据/文档/HTML 更新。

---

## 当前状态（Phase 1 探索结果）

### 已完成
- **cards.json**: 已追加 3 条记录（#41 Jony Ive, #45 Don Norman, #49 Jeffrey Zeldman）— 共 43 条
- **index.html**: 已新增 3 个 school-block（#11 数字界面派, #12 体验人本派, #13 网页系统派），各含 1 张 PoC 卡片
- **图片**: 11 张已就绪，1 张待修复

### 图片状态
| 编号 | 文件名 | 状态 |
|------|--------|------|
| 41 | 41-jony-ive.jpg | 已存在 ✓ |
| 42 | 42-dieter-rams.jpg | 已存在 ✓ |
| 43 | 43-material-design-3.jpg | 已存在 ✓ |
| 44 | 44-apple-hig.jpg | 已存在 ✓ |
| 45 | 45-don-norman.jpg | 已存在 ✓ |
| 46 | 46-ideo.jpg | 已存在 ✓ |
| 47 | 47-frog-design.jpg | 已存在，240×240 ✓ |
| 48 | 48-nn-group.jpg | 已存在 ✓ |
| 49 | 49-jeffrey-zeldman.jpg | 已存在 ✓ |
| 50 | 50-ethan-marcotte.jpg | **AVIF 格式，需重新下载为 JPEG** |
| 51 | 51-brad-frost.jpg | 已存在 ✓ |
| 52 | 52-stripe-design.jpg | 已存在 ✓ |

### 待完成
- 重新下载 #50 Ethan Marcotte 图片（当前为 AVIF，Pillow 无法识别）
- 更新 cards.json 追加 9 条新记录
- 更新 philosophy.md 新增 3 个流派章节
- 更新 index.html 在 3 个 school-block 各追加 3 张卡片

---

## 提案变更

### Phase A：修复 #50 图片（1 张）

**文件**: `assets/philosophy-images/50-ethan-marcotte.jpg`

**问题**: 当前文件为 AVIF 格式，Pillow 无法识别。需重新下载 JPEG 版本。

**做法**:
1. 搜索 Ethan Marcotte 高质量 JPEG 图片
2. 使用 Python Pillow 处理：中心裁剪正方形 → 缩放至 240×240 → 保存为 JPEG (quality=90)

**搜索关键词**: `Ethan Marcotte responsive web design portrait jpg`

---

### Phase B：更新 cards.json（追加 9 条记录）

**文件**: `assets/philosophy-images/cards.json`

**做法**: 在现有 43 条记录末尾追加 9 条新记录（#42-44, #46-48, #50-52）。

**新增记录**（精简版，完整数据见计划原文）:

| num | title | genre/school | monogram | file_name |
|-----|-------|-------------|----------|-----------|
| 42 | Dieter Rams — 设计十诫 | 数字界面派 | RAMS / DR | 42-dieter-rams.jpg |
| 43 | Material Design 3 — Google | 数字界面派 | MATERIAL / M3 | 43-material-design-3.jpg |
| 44 | Apple HIG — 人机界面指南 | 数字界面派 | APPLEHIG / HIG | 44-apple-hig.jpg |
| 46 | IDEO — 设计思维 | 体验人本派 | IDEO / ID | 46-ideo.jpg |
| 47 | Frog Design — 情感化设计 | 体验人本派 | FROG / FD | 47-frog-design.jpg |
| 48 | Nielsen Norman Group — 可用性 | 体验人本派 | NNGROUP / NN | 48-nn-group.jpg |
| 50 | Ethan Marcotte — 响应式设计 | 网页系统派 | MARCOTTE / EM | 50-ethan-marcotte.jpg |
| 51 | Brad Frost — 原子设计 | 网页系统派 | FROST / BF | 51-brad-frost.jpg |
| 52 | Stripe Design — 系统之美 | 网页系统派 | STRIPE / SD | 52-stripe-design.jpg |

---

### Phase C：更新 index.html（追加 9 张卡片）

**文件**: `index.html`

**做法**: 在 3 个 school-block 内各追加 3 张卡片 HTML。

**变更位置**:
- 数字界面派 block（#11）：在 Jony Ive 卡片后追加 Dieter Rams / Material Design 3 / Apple HIG
- 体验人本派 block（#12）：在 Don Norman 卡片后追加 IDEO / Frog Design / NN Group
- 网页系统派 block（#13）：在 Jeffrey Zeldman 卡片后追加 Ethan Marcotte / Brad Frost / Stripe

**卡片文案**:

| # | 标题 | 描述 | path |
|---|------|------|------|
| 42 | Dieter Rams — 设计十诫 | Less but better，好设计是尽可能少的设计，Apple 设计哲学的源头。 | → 产品设计 |
| 43 | Material Design 3 — Google | 动态色彩、自适应组件、跨平台一致性的设计语言系统。 | → Android |
| 44 | Apple HIG — 人机界面指南 | 清晰、遵从、纵深，iOS/macOS 交互范式与视觉规范的基石。 | → iOS / macOS |
| 46 | IDEO — 设计思维 | 共情→定义→构思→原型→测试，以人为本的创新方法论。 | → 服务设计 |
| 47 | Frog Design — 情感化设计 | 形式追随情感，产品与用户之间的情感共鸣驱动设计决策。 | → 产品策略 |
| 48 | Nielsen Norman Group — 可用性 | 10 条可用性启发式原则，UX 研究领域的黄金标准。 | → UX 研究 |
| 50 | Ethan Marcotte — 响应式设计 | 流体网格、弹性图片、媒体查询，一个网址适配所有屏幕。 | → 前端 |
| 51 | Brad Frost — 原子设计 | 原子→分子→有机体→模板→页面，组件化设计系统的构建方法论。 | → 设计系统 |
| 52 | Stripe Design — 系统之美 | 开发者优先的设计语言，API 美学的可视化表达。 | → 开发者工具 |

---

### Phase D：更新 philosophy.md（新增 3 个流派章节）

**文件**: `references/philosophy.md`

**插入位置**: 第 1979 行（`---`）和第 1981 行（`## 3.`）之间。

**新增 3 个章节**:
- §2.11 数字界面派 —「界面是行为的延伸」（41-44）
- §2.12 体验人本派 —「设计的起点是人，不是屏幕」（45-48）
- §2.13 网页系统派 —「网页是可生长的系统」（49-52）

每个章节遵循现有格式：流派名称 → 哲学内核 → 反模式检测 → 提升路径 → 4 位代表作品（哲学 + 核心特征 + 提示词DNA）

---

## 假设与决策

1. **编号方案**: 41-44 数字界面派，45-48 体验人本派，49-52 网页系统派
2. **图片处理**: 240×240 JPEG，中心裁剪，CSS 提供 grayscale 滤镜
3. **philosophy.md 格式**: 遵循现有 10 个流派的章节格式
4. **index.html**: 在现有卡片闭合前追加，保持结构一致

---

## 执行步骤（按顺序）

| 步骤 | 内容 | 文件 |
|------|------|------|
| 1 | 重新下载 #50 图片（JPEG 格式） | `50-ethan-marcotte.jpg` |
| 2 | 更新 cards.json，追加 9 条记录 | `cards.json` |
| 3 | 更新 index.html，追加 9 张卡片 | `index.html` |
| 4 | 更新 philosophy.md，新增 3 个章节 | `philosophy.md` |
| 5 | 验证：52 张图片、52 条记录、HTML 结构 | 全量检查 |

---

## 验证清单

- [ ] 12 张新图片均为 240×240 JPEG
- [ ] cards.json 共 52 条记录，JSON 格式正确
- [ ] index.html 中 3 个新 school-block 各有 4 张卡片
- [ ] philosophy.md 中 3 个新章节内容完整
- [ ] 本地预览正常，hover 效果正常