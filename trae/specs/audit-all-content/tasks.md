# Tasks

- [x] Task 1: 全文件交叉一致性审查——术语、编号、规则一致性
  - [x] SubTask 1.1: 提取所有文件中的核心术语定义，对比是否一致（如"5维度"vs"5维度评审"vs"5维度评分"是否统一）
  - [x] SubTask 1.2: 检查所有文件中的工作流 Step 编号引用是否一致（SKILL.md vs implementation.md vs README.md）
  - [x] SubTask 1.3: 对比不同文件中相同规则的数值描述是否一致（如字体数量限制、间距系统、颜色数量等）
  - [x] SubTask 1.4: 检查 SKILL.md 与 references 之间的概念定义是否一致

- [x] Task 2: 硬编码值检测——扫描所有文档中的代码示例
  - [x] SubTask 2.1: 扫描所有 CSS 代码示例中的硬编码色值（排除 token 定义本身的声明）
  - [x] SubTask 2.2: 扫描所有 Swift 代码示例中的硬编码值（排除 DS enum 定义内部的声明）
  - [x] SubTask 2.3: 扫描所有间距数值，标记非 4/8 倍数的值

- [x] Task 3: 文案 slop 自检——扫描所有文档
  - [x] SubTask 3.1: 扫描所有文档中是否存在自身定义的 AI slop 空洞词汇（区分"作为反面示例引用"和"文档自身使用"）
  - [x] SubTask 3.2: 扫描所有 CTA 文案示例，确认泛泛 CTA 仅作为反面示例出现

- [x] Task 4: 跨文件引用完整性检查
  - [x] SubTask 4.1: 提取所有 `→ 详见` / `→` 引用，确认引用的文件名和章节标题确实存在
  - [x] SubTask 4.2: 检查引用格式是否统一

- [x] Task 5: 版本日期一致性检查
  - [x] SubTask 5.1: 收集所有文件底部的版本号和更新日期
  - [x] SubTask 5.2: 确认所有文件使用相同的版本号和更新日期

- [x] Task 6: 内容重复检测——三层边界规则
  - [x] SubTask 6.1: 对比 SKILL.md 与 references 文件，检查是否存在 SKILL.md 中完整展开但应在 references 中的内容
  - [x] SubTask 6.2: 对比不同 references 文件之间是否存在同一规则的完整重复展开

- [x] Task 7: 修复所有发现的 P0/P1 问题
  - [x] SubTask 7.1: 修复 P0 级别问题（致命/阻断——违反自身核心规则）
  - [x] SubTask 7.2: 修复 P1 级别问题（重要——内部不一致）

# Task Dependencies

- Task 1-6 可并行执行（均为只读审查）
- Task 7 依赖 Task 1-6 的审查结果
