# Tasks

- [x] Task 1: 创建 references/lazyweb-integration.md — 编写 Lazyweb 集成的完整规则文档
  - [x] SubTask 1.1: 编写 MCP 配置说明（lazyweb_health 验证流程、lazyweb_search 调用规范含 platform/category/company 参数、lazyweb_compare_image 用于图片对比搜索、token 配置与降级提示）
  - [x] SubTask 1.2: 编写参考搜索工作流（搜索时机：Step 2 提取设计上下文之后、搜索角度策略：按屏幕类型/按竞品公司/按设计模式至少 3 次、visionDescription 质量门控规则、matchCount/similarity 质量评估标准、截图下载与命名规范 `{company}-{screen-slug}.png`）
  - [x] SubTask 1.3: 编写三级降级策略（完整模式：MCP + Web 搜索、部分模式：仅 MCP 或仅 Web、最小模式：纯哲学/规则驱动无截图、每种模式的报告差异说明）
  - [x] SubTask 1.4: 编写输出目录规范（.lazyweb/review-references/ 结构、文件命名规则、.gitignore 提示逻辑）
  - [x] SubTask 1.5: 编写截图与哲学判断冲突处理规则（哲学判断优先、截图标注为"业界常见做法"而非审查标准、冲突时的报告措辞规范）
  - [x] SubTask 1.6: 编写搜索策略规范（按设计类型路由 platform 参数、按审查视角调整搜索关键词、搜索次数限制 3-5 次、截图数量上限 15 张）

- [x] Task 2: 修改 SKILL.md — 在主文档中增加 Lazyweb 集成说明
  - [x] SubTask 2.1: 在快速导航表增加"需要真实产品参考"→ lazyweb-integration.md 条目
  - [x] SubTask 2.2: 在信念层"0. 事实验证先于假设"之后增加"0.5 证据驱动审查"信念声明（一句话定义 + 指向 lazyweb-integration.md）
  - [x] SubTask 2.3: 在标准层增加"2.13 参考证据规范"小节（一句话定义：参考截图是审查建议的视觉佐证，不是审查标准 + 指向 lazyweb-integration.md）
  - [x] SubTask 2.4: 在执行层审查工作流 Step 3 与 Step 4 之间增加"Step 3.5 参考搜索"子步骤（条件性执行、MCP 可用时搜索、不可用时跳过）
  - [x] SubTask 2.5: 修改审查报告模板，在诊断层增加"参考证据"区块（条件性展示、标注来源 [Lazyweb]/[Web]、反向金字塔排列），在行动层 Fix 建议中增加可选"参考"字段
  - [x] SubTask 2.6: 修改设计建议报告模板，在每个方向建议中增加可选"视觉参考"字段（截图 + 公司名 + 来源标签 + 1 行说明）
  - [x] SubTask 2.7: 在 References 路由表增加 lazyweb-integration.md 条目（层=执行层、根本问题=如何获取真实产品参考？、读=lazyweb-integration.md）
  - [x] SubTask 2.8: 在三层边界规则的核心概念所有权表中增加"参考证据"行（主体层=执行层、信念层仅保留"为什么证据重要"1 句话、标准层仅保留"质量门控规则"）

- [x] Task 3: 修改 references/implementation.md — 更新审查工作流详细步骤
  - [x] SubTask 3.1: 在 Step 3（品牌资产提取）之后增加"Step 3.5 参考搜索"详细步骤（MCP 健康检查、搜索策略选择、搜索执行、visionDescription 验证、截图下载、降级处理）
  - [x] SubTask 3.2: 更新审查报告模板示例，展示参考证据区块的完整格式（含 [Lazyweb]/[Web] 标签、公司名、1 行说明）

- [x] Task 4: 修改 references/philosophy.md — 增强设计方向顾问
  - [x] SubTask 4.1: 在设计方向顾问规则中增加"视觉参考"字段说明（可选字段、MCP 可用时搜索该哲学方向的代表性产品截图、每方向 1-2 张、标注来源和公司名）

# Task Dependencies

- [Task 2] depends on [Task 1]（SKILL.md 引用 lazyweb-integration.md）
- [Task 3] depends on [Task 1]（implementation.md 引用 lazyweb-integration.md）
- [Task 4] depends on [Task 1]（philosophy.md 引用 lazyweb-integration.md）
- [Task 2, Task 3, Task 4] 可并行执行（均依赖 Task 1 完成后）
