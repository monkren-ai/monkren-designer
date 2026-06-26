# Monkren Design 目录优化与文档更新 —— 任务清单

## [ ] Task 1: 优化目录结构
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 创建 references 目录
  - 将 philosophy.md, aesthetics.md, design-system.md, implementation.md, platform-guides.md, review-perspectives.md, lazyweb-integration.md 从 skills/ 移动到 references/
  - 保留 skills/ 目录下的子 skill 模块
  - 更新相关引用（如果有）
- **Acceptance Criteria Addressed**: AC-1, AC-3
- **Test Requirements**:
  - human-judgment: references 目录结构清晰
  - human-judgment: skills 目录保持功能性
- **Notes**: 检查是否有文件引用这些文档

## [ ] Task 2: 更新 README.md
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 更新「仓库结构」部分，反映当前实际结构
  - 保持其他内容不变
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - human-judgment: 目录结构描述准确

## [ ] Task 3: 创建 checklist.md
- **Priority**: P1
- **Depends On**: None
- **Description**:
  - 创建验证检查清单
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3
- **Test Requirements**:
  - human-judgment: checklist 完整
