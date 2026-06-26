# 完善 design.md 文档 - 实施计划（已分解和优先级排序的任务列表）

## [x] Task 1: 添加文档关系说明
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 在 design.md 开头添加说明，明确 design.md 与 DESIGN.md 的区别
  - design.md 是 Monkren 项目设计系统
  - DESIGN.md 是 Bareis + Nicolaus 参考系统
- **Acceptance Criteria Addressed**: [AC-2]
- **Test Requirements**:
  - `human-judgement` TR-1.1: 文档开头有清晰的关系说明
- **Notes**: 这是用户最困惑的问题，优先解决

## [x] Task 2: 统一文档语言风格
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 将英文标题统一改为中文
  - 保持英文技术术语（如 CSS 变量名、组件名等）
  - 中文为主，英文作为补充
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - `human-judgement` TR-2.1: 文档标题统一为中文
  - `human-judgement` TR-2.2: 技术术语保留英文
- **Notes**: "Do's and Don'ts" → "应该做与不应该做"，"Quick Start" → "快速开始"

## [x] Task 3: 完善组件规范
- **Priority**: P1
- **Depends On**: None
- **Description**: 
  - 将现有组件重新组织为明确的 PrimaryButton、SecondaryButton 等命名
  - 补充组件的完整规范，包括用途、样式、交互状态
- **Acceptance Criteria Addressed**: [AC-3, AC-6]
- **Test Requirements**:
  - `human-judgement` TR-3.1: 包含 PrimaryButton 组件规范
  - `human-judgement` TR-3.2: 包含 SecondaryButton 组件规范
  - `human-judgement` TR-3.3: 明确说明新功能优先使用设计系统组件
- **Notes**: 参考现有组件描述，重新命名和组织

## [x] Task 4: 添加 SwiftLint 规则说明
- **Priority**: P1
- **Depends On**: None
- **Description**: 
  - 在设计系统文档中新增章节说明 SwiftLint 规则
  - 规则用于检测硬编码字体、间距、颜色值
- **Acceptance Criteria Addressed**: [AC-4]
- **Test Requirements**:
  - `human-judgement` TR-4.1: 文档包含 SwiftLint 规则说明
- **Notes**: 参考项目用户规则中的描述

## [x] Task 5: 添加代码审查规范
- **Priority**: P1
- **Depends On**: None
- **Description**: 
  - 在设计系统文档中新增代码审查规范章节
  - 明确审查时需检查硬编码值
- **Acceptance Criteria Addressed**: [AC-5]
- **Test Requirements**:
  - `human-judgement` TR-5.1: 文档包含代码审查规范
- **Notes**: 参考项目用户规则中的描述
