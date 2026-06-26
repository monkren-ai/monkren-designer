# 优化为纯粹设计审查技能 Spec

## Why

当前 huashu-design 是一个"设计创作+设计审查"一体化技能，SKILL.md 近 800 行，涵盖 HTML 原型制作、幻灯片、动画导出、视频渲染、SFX/BGM 音频等大量生产性能力。这导致：
1. **技能定位模糊**——创作和审查混杂，agent 加载时 token 消耗大，审查场景被创作流程淹没
2. **审查能力不够深**——5 维度评审只是工作流末尾的可选步骤，没有成为核心
3. **用户规则要求**——项目规则明确要求"建立代码审查规范、添加 SwiftLint 规则检测硬编码值、新功能优先使用设计系统组件"，这些都是审查导向的

优化为纯粹的设计审查技能，保留核心设计原则、设计哲学、反 AI slop 规则、品牌资产协议等知识，移除所有创作/生产性能力。

## What Changes

- **重写 SKILL.md**：从"设计创作技能"重构为"设计审查技能"，核心能力变为审查设计产出、检测设计问题、提供修复建议
- **保留核心设计知识**：设计哲学（20 种风格库）、反 AI slop 规则、品牌资产协议、5 维度评审体系、品位锚点
- **移除创作性内容**：HTML 原型制作流程、幻灯片架构、动画引擎、视频导出、SFX/BGM 音频、Tweaks 系统、iOS 设备框、React+Babel 技术红线等
- **移除创作性 assets**：animations.jsx、ios_frame.jsx、android_frame.jsx、macos_window.jsx、browser_window.jsx、deck_stage.js、deck_index.html、design_canvas.jsx、sfx/ 目录、bgm 音频文件
- **移除创作性 scripts**：render-video.js、convert-formats.sh、add-music.sh、export_deck_pdf.mjs、export_deck_pptx.mjs、export_deck_stage_pdf.mjs、html2pptx.js
- **移除创作性 references**：animation-pitfalls.md、animations.md、react-setup.md、slide-decks.md、editable-pptx.md、video-export.md、sfx-library.md、audio-design-rules.md、tweaks-system.md、scene-templates.md、apple-gallery-showcase.md、hero-animation-case-study.md
- **保留审查性 references**：critique-guide.md、design-styles.md、design-context.md、content-guidelines.md、verification.md、workflow.md（精简为审查流程）
- **新增审查能力**：硬编码值检测规则（字体/间距/颜色）、设计系统合规性检查、SwiftLint 规则建议
- **更新 README.md**：反映新的技能定位
- **更新 description**：从"一体化设计能力"改为"设计审查+设计原则顾问"

## Impact

- Affected specs: SKILL.md（完全重写）、README.md（重写）
- Affected code: assets/（大量删除）、scripts/（全部删除）、references/（部分删除）、demos/（全部删除）
- **BREAKING**: 技能从"设计创作+审查"变为"纯审查"，不再具备 HTML 原型/幻灯片/动画/视频导出能力

## ADDED Requirements

### Requirement: 设计审查核心能力

系统 SHALL 提供设计审查能力，当用户提供设计产出（截图/HTML/代码/Figma 链接）时，执行以下审查流程：

#### Scenario: 用户提供设计截图请求审查
- **WHEN** 用户提供设计截图并请求审查
- **THEN** 系统执行 5 维度评审（哲学一致性/视觉层级/细节执行/功能性/创新性），输出评分 + Keep/Fix/Quick Wins 清单

#### Scenario: 用户提供代码请求设计审查
- **WHEN** 用户提供前端代码请求设计审查
- **THEN** 系统检测硬编码值（字体/间距/颜色），检查设计系统合规性，输出问题清单和修复建议

### Requirement: 硬编码值检测

系统 SHALL 检测以下硬编码值问题：

#### Scenario: 检测硬编码颜色值
- **WHEN** 代码中出现 `#xxxxxx`、`rgb()`、`hsl()` 等直接颜色值而非 CSS 变量/设计 token
- **THEN** 标记为硬编码颜色，建议替换为设计系统 token

#### Scenario: 检测硬编码字体值
- **WHEN** 代码中出现 `font-family` 直接声明而非引用设计系统字体 token
- **THEN** 标记为硬编码字体，建议替换为设计系统字体变量

#### Scenario: 检测硬编码间距值
- **WHEN** 代码中出现非标准间距值（非 4/8 的倍数）或直接数字而非 spacing token
- **THEN** 标记为硬编码间距，建议使用 8pt 网格系统

### Requirement: 设计系统合规性检查

系统 SHALL 检查设计产出是否符合设计系统规范：

#### Scenario: 检查组件使用合规性
- **WHEN** 审查代码中发现自定义按钮/输入框等组件而非设计系统组件（如 PrimaryButton、SecondaryButton）
- **THEN** 标记为未使用设计系统组件，建议替换

#### Scenario: 检查品牌资产协议合规性
- **WHEN** 审查涉及具体品牌的设计产出
- **THEN** 检查是否使用了真实品牌资产（logo/产品图/UI 截图）而非 CSS 剪影/SVG 手画替代

### Requirement: 设计方向顾问（保留）

系统 SHALL 保留设计方向顾问能力，当用户需要设计方向建议时：

#### Scenario: 用户需求模糊时推荐设计方向
- **WHEN** 用户请求设计方向建议或需求模糊
- **THEN** 从 5 流派 × 20 种设计哲学中推荐 3 个差异化方向，含设计师/机构名、视觉特征、气质关键词

### Requirement: SwiftLint 规则建议

系统 SHALL 提供 SwiftLint 规则建议，用于自动检测硬编码设计值：

#### Scenario: 生成 SwiftLint 配置
- **WHEN** 用户请求 SwiftLint 规则配置
- **THEN** 提供检测硬编码字体、间距、颜色值的 SwiftLint 自定义规则

## MODIFIED Requirements

### Requirement: SKILL.md 定位

SKILL.md 从"用 HTML 做高保真原型、交互 Demo、幻灯片、动画的一体化设计能力"变更为"设计审查+设计原则顾问技能"。核心身份从"用 HTML 工作的设计师"变更为"设计审查专家"。

### Requirement: 工作流程

工作流程从"理解需求→探索资源→构建文件→Junior pass→Full pass→验证→导出视频→评审"变更为"理解审查对象→提取设计上下文→执行审查→输出报告"。

## REMOVED Requirements

### Requirement: HTML 原型制作能力
**Reason**: 不属于设计审查技能范畴
**Migration**: 用户如需原型制作能力，应使用其他专用技能

### Requirement: 幻灯片/动画/视频导出能力
**Reason**: 不属于设计审查技能范畴
**Migration**: 用户如需幻灯片/动画能力，应使用其他专用技能

### Requirement: Starter Components（ios_frame.jsx 等）
**Reason**: 创作性组件，审查技能不需要
**Migration**: 无需迁移

### Requirement: SFX/BGM 音频系统
**Reason**: 创作性能力，审查技能不需要
**Migration**: 无需迁移

### Requirement: Tweaks 实时调参系统
**Reason**: 创作性能力，审查技能不需要
**Migration**: 无需迁移

### Requirement: demos/ 目录
**Reason**: 创作性演示，审查技能不需要
**Migration**: 无需迁移
