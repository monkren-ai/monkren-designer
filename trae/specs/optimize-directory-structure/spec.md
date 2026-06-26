# Monkren Design 目录优化与文档更新

## Overview
- **Summary**：优化项目目录结构，使其更清晰、更符合项目实际情况，并同步更新相关文档
- **Purpose**：让项目结构更直观，便于维护和使用
- **Target Users**：项目维护者、用户、贡献者

## 目标

### 1. 目录结构优化
- 整理当前混乱的目录结构
- 建立清晰的分类和组织方式
- 保持向后兼容

### 2. 文档更新
- 更新 README.md，反映当前实际的项目结构
- 添加目录导航说明
- 确保文档与实际代码一致

## 非目标
- 不重构功能代码
- 不修改 SKILL.md 核心逻辑
- 不添加新功能

## 背景与上下文

### 当前目录结构（实际）
```
monkren-design/
├── .trae/
│   ├── documents/
│   └── specs/
├── case/                      # 案例文件
│   └── *.html
├── skills/                    # Skill 模块
│   ├── add-inspo-source/
│   ├── design-brainstorm/
│   ├── design-improve/
│   ├── design-research/
│   ├── quick-references/
│   ├── remove-inspo-source/
│   ├── visual-taste-lab/
│   ├── aesthetics.md
│   ├── design-system.md
│   ├── implementation.md
│   ├── lazyweb-integration.md
│   ├── philosophy.md
│   ├── platform-guides.md
│   └── review-perspectives.md
├── .gitignore
├── DESIGN.md                  # Bareis + Nicolaus 参考系统
├── LICENSE
├── README.en.md
├── README.md
├── SKILL.md                   # 主 Skill 文档
├── design.md                  # Monkren 项目设计系统
└── index.html
```

### README.md 中描述的结构（过时）
```
monkren-design/
├── SKILL.md
├── README.md
├── README.en.md
├── assets/
│   └── banner.svg
└── references/
    ├── philosophy.md
    ├── aesthetics.md
    ├── design-system.md
    └── implementation.md
```

## 功能需求

### FR-1：优化目录结构
- 将 references 相关的文档移动到正确的位置
- 保持 skills 目录的功能性
- 保留 case 目录作为案例展示

### FR-2：更新 README.md
- 更新目录结构描述
- 保持 README 的其他内容不变

## 非功能需求

### NFR-1：向后兼容
- 保持 SKILL.md 的引用关系
- 不破坏现有功能

### NFR-2：清晰易懂
- 目录结构直观
- 文档描述准确

## 约束条件
- **技术**：仅移动文件和更新文档
- **业务**：保持现有功能完整

## 假设
- 项目的主要功能已经稳定
- 用户已经熟悉现有结构

## 验收标准

### AC-1：目录结构优化完成
- **Given**：查看项目根目录
- **When**：列出所有目录和文件
- **Then**：结构清晰、分类合理
- **Verification**：human-judgment

### AC-2：README.md 更新完成
- **Given**：阅读 README.md
- **When**：查看目录结构部分
- **Then**：与实际结构一致
- **Verification**：human-judgment

### AC-3：无功能破坏
- **Given**：检查关键文件
- **When**：验证引用关系
- **Then**：所有文件可正常访问
- **Verification**：human-judgment

## 未决问题
- 是否需要保留 .trae 目录在根目录？（建议保留）
- 是否需要添加其他文档？（待评估）
