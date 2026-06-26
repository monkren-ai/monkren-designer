# Tasks

- [x] Task 1: 执行硬编码值自检——扫描所有文档中的硬编码色值、字体、间距
  - [x] SubTask 1.1: 扫描 SKILL.md 中的 CSS/Swift 代码示例，标记所有硬编码色值
  - [x] SubTask 1.2: 扫描 references/aesthetics.md 中的 CSS 代码示例，标记硬编码值
  - [x] SubTask 1.3: 扫描 references/design-system.md 中的 CSS/Swift 代码示例，标记硬编码值
  - [x] SubTask 1.4: 扫描 references/implementation.md 中的代码示例，标记硬编码值
  - [x] SubTask 1.5: 扫描 references/philosophy.md 中的代码示例，标记硬编码值
  - [x] SubTask 1.6: 汇总硬编码值检测结果

- [x] Task 2: 执行文案 slop 自检——扫描所有文档中的 AI slop 词汇和模式
  - [x] SubTask 2.1: 扫描全部文档，标记匹配 slop 黑名单的词汇
  - [x] SubTask 2.2: 扫描全部文档，标记泛泛 CTA
  - [x] SubTask 2.3: 扫描全部文档，标记无来源的数据声明
  - [x] SubTask 2.4: 汇文案 slop 检测结果

- [x] Task 3: 执行设计系统合规性自检——检查代码示例是否遵循自身 token 规范
  - [x] SubTask 3.1-3.5: 全部完成

- [x] Task 4: 执行三层边界规则自检——检查 SKILL.md 与 references 的内容边界
  - [x] SubTask 4.1-4.3: 全部完成

- [x] Task 5: 执行 5 维度自审——用自身评审体系审查自身
  - [x] SubTask 5.1-5.5: 全部完成

- [x] Task 6: 输出完整审查报告
  - [x] SubTask 6.1-6.5: 全部完成

- [x] Task 7: 修复 P0/P1 问题
  - [x] SubTask 7.1: 修复 P0 问题——Neo Shen 替换为 Naoto Fukasawa；"确定性色板/字体栈"改为"参考色板/字体栈"
  - [x] SubTask 7.2: 修复 P1 问题——纬度→维度；Top 10→常见设计问题；交叉引用修复；全链路 slop 替换；间距 token 矛盾修复
  - [x] SubTask 7.3: 验证修复后问题已消除

# Task Dependencies

- Task 1-5 可并行执行（各自独立扫描不同维度）
- Task 6 依赖 Task 1-5 的结果（汇总所有检测结果生成报告）
- Task 7 依赖 Task 6 的报告（根据 Fix 清单执行修复）
