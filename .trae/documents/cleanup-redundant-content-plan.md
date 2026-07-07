# 清理冗余内容计划

## Summary

清理项目中已不再需要的冗余文件，减少仓库体积、降低维护噪音。本次清理覆盖 4 类冗余内容：

1. **历史计划文档**：`.trae/documents/` 下已执行完毕的旧计划/报告（14 个文件），归档到 `.trae/documents/history/`。
2. **未使用位图资源**：`assets/philosophy-bitmaps/` 目录（10 张生成 PNG + base64.json + 2 个脚本），`index.html` 未引用。
3. **一次性图片处理脚本**：`assets/philosophy-images/` 下用于 PoC / 批量下载 / 修复 / 验证的 13 个脚本，无其他文件引用。
4. **根目录未引用脚本**：`scripts/` 下的 3 个脚本，无其他文件引用。

**预期效果**：删除约 18 个脚本/资源文件，移动 14 个历史计划文档，释放空间并消除已失效的代码路径。

---

## Current State Analysis

### 1. 历史计划文档堆积

`.trae/documents/` 当前存放了 14 个计划/报告文件，均来自前序会话：

| 文件 | 大小 | 说明 |
|------|------|------|
| `design-philosophy-deep-expansion-plan.md` | 10,030 B | 设计哲学深度扩展计划，已执行 |
| `design-philosophy-expansion-plan.md` | 8,614 B | 设计哲学扩展计划，已执行 |
| `design-philosophy-finalization-plan.md` | 7,890 B | 设计哲学定稿计划，已执行 |
| `integrate-design-system-prompt.md` | 30,954 B | design-system-prompt 彻底重构计划，已执行完成（v4.0 已稳定） |
| `monkren-design-intro-page-completion-plan.md` | 10,523 B | 介绍页收尾计划，已执行 |
| `monkren-design-intro-page-optimize-report.md` | 16,435 B | 介绍页优化报告，已输出 |
| `monkren-design-optimize-intro-page.md` | 19,930 B | 介绍页优化计划，已执行 |
| `monkren-design-philosophy-bitmap-finalize.md` | 11,116 B | philosophy bitmap 收尾计划，已执行 |
| `monkren-design-philosophy-bitmap-plan.md` | 15,537 B | philosophy bitmap 计划，已执行 |
| `monkren-designer-deep-review-report.md` | 22,551 B | 深度自审报告，已输出 |
| `monkren-designer-deep-review.md` | 10,487 B | 深度审查计划，已执行 |
| `monkren-designer-optimize-intro-page-plan-v1.1.md` | 16,047 B | 介绍页优化计划 v1.1，已执行 |
| `review-improve-expand-project-design-philosophy-plan.md` | 10,694 B | 设计哲学扩展计划，已执行 |
| `ui-ux-philosophy-expansion-plan.md` | 6,673 B | UI/UX 哲学扩展计划，已执行 |

这些文件对当前运行态无直接作用，但用户希望保留历史记录，因此采用**归档**而非删除。

### 2. 未使用位图资源

`assets/philosophy-bitmaps/` 包含 10 张 120×120 的生成 PNG 和 2 个脚本：

- `01.png` ~ `10.png`（共 10 张）
- `base64.json`（内联 base64 图片数据）
- `generate.py`（生成上述 PNG）
- `replace_html.py`（替换 HTML 中的图片引用）

经 `grep` 验证，`index.html`、SKILL.md、references 等核心文件均未引用该目录。**判定为完全冗余。**

### 3. 一次性图片处理脚本

`assets/philosophy-images/` 下存在 13 个一次性处理脚本：

| 文件 | 用途 | 冗余原因 |
|------|------|----------|
| `add_keywords.py` | 为 cards.json 添加搜索关键词 | 数据处理已完成 |
| `batch_download.sh` | 批量下载图片 | 下载已完成 |
| `batch_download2.sh` | 批量下载图片（第二批） | 下载已完成 |
| `batch_gen_images.py` | 批量生成/处理图片 | 处理已完成 |
| `download_images.py` | 下载图片 | 下载已完成 |
| `extract_cards.py` | 从 cards.json 提取卡片信息 | 提取已完成 |
| `final_verify.py` | 最终图片校验 | 校验已完成 |
| `fix_image_paths.py` | 修复图片路径 | 路径已修复 |
| `process_image.py` | 单张图片处理 | 处理已完成 |
| `process_poc.py` | PoC 阶段处理 | PoC 已完成 |
| `repair_images.py` | 修复损坏图片 | 修复已完成 |
| `repair_with_search.py` | 搜索并修复图片 | 修复已完成 |
| `replace_images.py` | 替换图片 | 替换已完成 |

这些脚本仅被自身或 `.trae/documents/` 中的旧计划引用，**核心项目文件无任何引用**。

> 保留文件：`assets/philosophy-images/cards.json` 是数据文件而非脚本，不在本次清理范围内。

### 4. 根目录未引用脚本

`scripts/` 目录下 3 个脚本：

| 文件 | 用途 | 冗余原因 |
|------|------|----------|
| `download_remaining_images.py` | 下载剩余图片 | 下载已完成 |
| `process_poc_images.py` | PoC 图片处理 | PoC 已完成 |
| `retry_images.py` | 重试下载失败图片 | 下载已完成 |

`grep` 验证无核心文件引用。删除后若目录为空，一并删除空目录。

---

## Proposed Changes

### 变更 1：归档历史计划文档

**操作**：在 `.trae/documents/` 下新建 `history/` 子目录，将 14 个旧计划/报告文件移入。

**目标路径**：
- `.trae/documents/history/design-philosophy-deep-expansion-plan.md`
- `.trae/documents/history/design-philosophy-expansion-plan.md`
- `.trae/documents/history/design-philosophy-finalization-plan.md`
- `.trae/documents/history/integrate-design-system-prompt.md`
- `.trae/documents/history/monkren-design-intro-page-completion-plan.md`
- `.trae/documents/history/monkren-design-intro-page-optimize-report.md`
- `.trae/documents/history/monkren-design-optimize-intro-page.md`
- `.trae/documents/history/monkren-design-philosophy-bitmap-finalize.md`
- `.trae/documents/history/monkren-design-philosophy-bitmap-plan.md`
- `.trae/documents/history/monkren-designer-deep-review-report.md`
- `.trae/documents/history/monkren-designer-deep-review.md`
- `.trae/documents/history/monkren-designer-optimize-intro-page-plan-v1.1.md`
- `.trae/documents/history/review-improve-expand-project-design-philosophy-plan.md`
- `.trae/documents/history/ui-ux-philosophy-expansion-plan.md`

**为什么**：保留历史决策记录，同时让 `.trae/documents/` 根目录只保留当前/待执行计划。

**怎么做**：使用 `RunCommand mkdir -p .trae/documents/history && mv ...` 或文件系统工具移动文件。

### 变更 2：删除未使用位图资源目录

**操作**：删除整个 `assets/philosophy-bitmaps/` 目录。

**删除内容**：
- `assets/philosophy-bitmaps/01.png`
- `assets/philosophy-bitmaps/02.png`
- `assets/philosophy-bitmaps/03.png`
- `assets/philosophy-bitmaps/04.png`
- `assets/philosophy-bitmaps/05.png`
- `assets/philosophy-bitmaps/06.png`
- `assets/philosophy-bitmaps/07.png`
- `assets/philosophy-bitmaps/08.png`
- `assets/philosophy-bitmaps/09.png`
- `assets/philosophy-bitmaps/10.png`
- `assets/philosophy-bitmaps/base64.json`
- `assets/philosophy-bitmaps/generate.py`
- `assets/philosophy-bitmaps/replace_html.py`

**为什么**：当前 `index.html` 使用 `assets/philosophy-images/*.jpg`（80 张真实照片），位图目录是早期生成/中间产物，完全未被引用。

**怎么做**：使用 `DeleteFile` 删除目录内所有文件，再删除空目录；或直接 `rm -rf assets/philosophy-bitmaps/`。

### 变更 3：删除一次性图片处理脚本

**操作**：删除 `assets/philosophy-images/` 下的 13 个脚本文件。

**删除内容**：
- `assets/philosophy-images/add_keywords.py`
- `assets/philosophy-images/batch_download.sh`
- `assets/philosophy-images/batch_download2.sh`
- `assets/philosophy-images/batch_gen_images.py`
- `assets/philosophy-images/download_images.py`
- `assets/philosophy-images/extract_cards.py`
- `assets/philosophy-images/final_verify.py`
- `assets/philosophy-images/fix_image_paths.py`
- `assets/philosophy-images/process_image.py`
- `assets/philosophy-images/process_poc.py`
- `assets/philosophy-images/repair_images.py`
- `assets/philosophy-images/repair_with_search.py`
- `assets/philosophy-images/replace_images.py`

**为什么**：图片采集、处理、验证流程已全部完成，脚本无复用价值；保留会增加维护负担并可能误导后续协作者。

**怎么做**：使用 `DeleteFile` 批量删除。

### 变更 4：删除根目录未引用脚本

**操作**：删除 `scripts/` 目录下的 3 个脚本；若目录变空，则删除目录本身。

**删除内容**：
- `scripts/download_remaining_images.py`
- `scripts/process_poc_images.py`
- `scripts/retry_images.py`

**为什么**：与变更 3 同理，属于已完成的一次性下载/处理脚本，无核心引用。

**怎么做**：使用 `DeleteFile` 删除文件，再通过 `RunCommand rmdir scripts/` 删除空目录（如为空）。

---

## Assumptions & Decisions

1. **历史计划需要保留但归档**：用户明确要求 `.trae/documents/` 中的历史计划归档到 `history/` 子目录，不删除。
2. **cards.json 保留**：虽然 `cards.json` 未被核心文件引用，但它是数据文件而非脚本，不在用户选定的清理范围内，予以保留。
3. **SKILL.md 与子 skill 文件不冗余**：根 `SKILL.md` 是统一路由入口，21 个子 `SKILL.md` 是独立技能定义，功能不同，不属于冗余。
4. **README.md / README.en.md 不冗余**：双语 README 是项目对外展示所需，保留。
5. **references/ 文件不冗余**：9 个 reference 文件按信念/标准/方法/执行/专题库分层，内容互补，是 v4.0 知识图谱的一部分，保留。
6. **哲学图片保留**：`assets/philosophy-images/*.jpg` 是当前 landing page 真实引用，全部保留。
7. **不修改代码逻辑**：本次清理只涉及文件移动和删除，不修改任何现有文件内容。

---

## Verification Steps

1. **路径检查**：
   - 确认 14 个历史计划文档已移动到 `.trae/documents/history/`。
   - 确认 `.trae/documents/` 根目录仅保留当前计划文件和 `history/` 子目录。

2. **删除检查**：
   - 确认 `assets/philosophy-bitmaps/` 目录已不存在。
   - 确认 `assets/philosophy-images/` 下已无 `.py` / `.sh` 文件。
   - 确认 `scripts/` 目录已不存在（或为空目录已删除）。

3. **引用检查**：
   - 运行 `grep -R "philosophy-bitmaps" . --include="*.md" --include="*.html" --include="*.py" --include="*.sh"`，确认无任何引用残留（除本计划文件外）。
   - 运行 `grep -R "scripts/" . --include="*.md" --include="*.html" --include="*.py" --include="*.sh"`，确认无对 `scripts/` 下文件的引用残留。

4. **核心文件完整性**：
   - 确认 `index.html` 仍可正常引用 `assets/philosophy-images/*.jpg`。
   - 确认 `SKILL.md`、references、子 skill 文件均未被误删。

5. **git 状态确认**：
   - 执行 `git status` 查看变更列表，确保只涉及计划中的文件移动/删除，无意外修改。
