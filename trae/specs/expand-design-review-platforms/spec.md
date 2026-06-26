# 扩展设计审查平台覆盖度 Spec

## Why

当前 monkren-design 的设计审查主要聚焦于 Web/HTML 场景，但设计师和用户实际工作的设计类型远不止于此：移动端 App 设计、桌面端软件界面、PPT 演示文稿、插画作品、角色 IP 设计等都需要专业的设计审查能力。缺乏针对这些特定设计类型的审查维度，导致审查建议缺乏针对性、无法识别该设计类型特有的问题。

此外，设计审查存在多种视角/纬度：视觉审美纬度、交互体验纬度、品牌一致性纬度、可访问性纬度、商业转化纬度等，不同设计类型需要侧重不同的审查纬度组合。

Open Design 项目虽提供了优秀的评分纪律和报告框架，但未覆盖多平台/多设计类型的审查维度。需要引入更多参考源（如各平台的官方设计指南、开源设计系统等）来构建完整的平台覆盖体系。

## What Changes

- **新增移动端 App 设计审查维度**：iOS/Android 平台的特有设计规范审查（Safe Area/动态岛/导航模式/手势交互/平台惯例）
- **新增桌面端软件设计审查维度**：Windows/macOS 平台的特有设计规范审查（窗口管理/菜单栏/ Dock/任务栏/平台惯例）
- **新增 Web 应用设计审查维度**：SaaS/Dashboard/管理后台等 Web 应用的特有设计规范审查（响应式布局/暗色模式/数据可视化/表单设计）
- **新增 PPT/演示文稿设计审查维度**：信息传达/视觉层级/演讲辅助/品牌一致性的特有设计规范审查
- **新增插画设计审查维度**：构图/色彩/风格一致性/商业适用性的特有设计规范审查
- **新增角色 IP 设计审查维度**：角色识别度/姿态表情/延展性/品牌适配性的特有设计规范审查
- **新增多视角审查纬度体系**：视觉审美/交互体验/品牌一致性/可访问性/商业转化五纬评审体系
- **新增平台设计规范参考源**：引入 Apple HIG/Android Design/Microsoft Fluent/Web Content Accessibility Guidelines 等官方设计规范作为审查基线
- **更新 5 维度评审体系**：在哲学一致性/视觉层级/细节执行/功能性/创新性基础上，为不同设计类型配置不同的维度权重和审查要点
- **更新审查前发现协议**：在现有问卷中增加设计类型确认和审查视角选择

## Impact

- Affected specs: SKILL.md（新增平台类型章节+多视角体系）、references/platform-guides.md（新增，平台设计规范参考）、references/review-perspectives.md（新增，多视角审查体系）
- Affected code: 无代码文件变更，全部为 Markdown 文档更新

## ADDED Requirements

### Requirement: 移动端 App 设计审查

系统 SHALL 提供针对 iOS/Android 移动应用的专项设计审查能力。

#### Scenario: iOS 设计规范合规性审查
- **WHEN** 审查 iOS App 设计产出
- **THEN** 检查是否遵循 Apple Human Interface Guidelines：Safe Area 处理、导航模式（Tab Bar/ Navigation Bar）、Large Title 样式、SF Symbols 使用、动态岛适配、手势交互（边缘滑回/下拉刷新）、平台惯例（状态栏/锁屏/通知）

#### Scenario: Android 设计规范合规性审查
- **WHEN** 审查 Android App 设计产出
- **THEN** 检查是否遵循 Material Design 3 规范：系统栏处理（状态栏/导航栏/边倒边）、Material You 色彩动态化、导航模式（底部导航/抽屉/ tabs）、FAB 位置、平台手势（3 键导航/2 键导航/手势导航）、组件 elevation

#### Scenario: 移动端交互一致性审查
- **WHEN** 审查移动端设计产出
- **THEN** 检查交互模型一致性：同类操作使用相同交互模式、过渡动画符合平台惯例、触控区域最小尺寸（44×44pt）、手势冲突处理

### Requirement: 桌面端软件设计审查

系统 SHALL 提供针对 Windows/macOS 桌面应用的专项设计审查能力。

#### Scenario: macOS 设计规范合规性审查
- **WHEN** 审查 macOS App 设计产出
- **THEN** 检查是否遵循 Apple macOS Human Interface Guidelines：窗口管理（Traffic Light 按钮位置/缩放/全屏）、菜单栏结构、Dock 集成、平台手势（双指滑动手势/触发角）、视觉一致性（毛玻璃效果/SF Pro 字体）

#### Scenario: Windows 设计规范合规性审查
- **WHEN** 审查 Windows App 设计产出
- **THEN** 检查是否遵循 Microsoft Fluent Design：窗口管理（标题栏/最小化/最大化/关闭）、开始菜单集成、通知系统、 Fluent 动画原则、平台字体（Segoe UI Variable）

#### Scenario: 桌面端多窗口协作审查
- **WHEN** 审查桌面端设计产出
- **THEN** 检查多窗口/多面板场景：窗口间层级关系、面板分割比例、窗口最小尺寸限制、快捷键体系完整性

### Requirement: Web 应用设计审查

系统 SHALL 提供针对 SaaS/Dashboard/管理后台等 Web 应用的专项设计审查能力。

#### Scenario: Web 应用响应式布局审查
- **WHEN** 审查 Web 应用设计产出
- **THEN** 检查响应式断点设计（1440/1024/768/375）、内容在各级断点的适配性、栅格系统一致性、滚动行为（惯性滚动/回到顶部）

#### Scenario: Web 应用暗色模式审查
- **WHEN** 审查 Web 应用设计产出
- **THEN** 检查暗色模式实现的完整性（不仅是背景色，还包括文字/边框/图表/代码高亮的对比度）、暗色模式下的可读性、避免纯黑色背景（#000）导致的视觉疲劳

#### Scenario: Web 应用数据可视化审查
- **WHEN** 审查 Web Dashboard/数据展示类应用
- **THEN** 检查图表类型选择的合理性、数据墨水比、颜色编码的一致性、图例和标签的可读性、异常数据处理

#### Scenario: Web 应用表单设计审查
- **WHEN** 审查 Web 应用表单
- **THEN** 检查标签对齐（顶对齐/左对齐/浮动标签）、输入状态反馈、错误提示位置和可读性、必填/选填标记、密码可见性切换

### Requirement: PPT/演示文稿设计审查

系统 SHALL 提供针对演示文稿的专项设计审查能力。

#### Scenario: 信息传达效率审查
- **WHEN** 审查 PPT 设计产出
- **THEN** 检查每页核心信息数量（不超过 3 个关键点）、标题的信息量（是否过于泛泛）、要点是否简洁有力、是否有信息过载

#### Scenario: 视觉层级与演讲节奏审查
- **WHEN** 审查 PPT 设计产出
- **THEN** 检查每页的视觉焦点、层级对比度（标题 vs 正文 vs 注释）、演讲时间与页面数量的匹配、图形化 vs 文字化的平衡

#### Scenario: 品牌一致性审查
- **WHEN** 审查企业/产品演示文稿
- **THEN** 检查品牌色应用（主色/辅色/强调色的使用比例）、Logo 位置和尺寸规范、字体家族一致性、模板结构统一性

#### Scenario: 演讲辅助元素审查
- **WHEN** 审查 PPT 设计产出
- **THEN** 检查图表是否有数据来源标注、注释是否得体、动画是否辅助而非干扰、页码和进度指示是否清晰

### Requirement: 插画设计审查

系统 SHALL 提供针对商业插画的专项设计审查能力。

#### Scenario: 构图与视觉平衡审查
- **WHEN** 审查插画设计产出
- **THEN** 检查构图是否稳定或有意打破稳定、视觉焦点位置、三分法/黄金比例应用、负空间使用

#### Scenario: 色彩与风格一致性审查
- **WHEN** 审查插画设计产出
- **THEN** 检查色彩搭配的和谐度、是否遵循既定的风格规范（扁平/渐变/线稿/3D）、同一项目内的风格统一性

#### Scenario: 商业适用性审查
- **WHEN** 审查商业用途插画
- **THEN** 检查在不同尺寸下的可识别性（从 favicon 到大幅海报）、在不同背景色上的适配性、是否考虑后期制作便利性（图层组织/命名规范）

### Requirement: 角色 IP 设计审查

系统 SHALL 提供针对角色 IP 的专项设计审查能力。

#### Scenario: 角色识别度审查
- **WHEN** 审查角色 IP 设计产出
- **THEN** 检查角色轮廓的可识别性（剪影是否独特）、标志性特征的突出度、与其他知名角色的区分度、角色气质是否鲜明

#### Scenario: 角色姿态与表情体系审查
- **WHEN** 审查角色 IP 设计产出
- **THEN** 检查基础姿态模板的完备性、表情变化的维度（喜/怒/哀/惊/其他）、姿态与表情的组合逻辑、动态姿势的自然度

#### Scenario: 角色延展性审查
- **WHEN** 审查角色 IP 设计产出
- **THEN** 检查在不同尺寸下的可辨识性（从 16px 头像到 3m 高广告牌）、在动态场景中的表现力、在不同文化背景下的接受度

#### Scenario: 角色品牌适配性审查
- **WHEN** 审查品牌角色 IP 设计
- **THEN** 检查与品牌色的协调性、与品牌气质的匹配度、角色故事与品牌故事的关联性、跨品牌合作时的灵活性

### Requirement: 多视角审查纬度体系

系统 SHALL 提供视觉审美/交互体验/品牌一致性/可访问性/商业转化五纬评审体系，不同设计类型侧重不同纬度组合。

#### Scenario: 视觉审美纬度评审
- **WHEN** 执行设计审查
- **THEN** 评估色彩搭配/字体选择/空间布局/视觉层次的审美质量，输出该纬度的 Strength/Weakness/Fix 清单

#### Scenario: 交互体验纬度评审
- **WHEN** 执行设计审查（App/Web/桌面端）
- **THEN** 评估操作流程合理性/反馈机制完整性/错误处理得当性/学习成本高低，输出该纬度的 Strength/Weakness/Fix 清单

#### Scenario: 品牌一致性纬度评审
- **WHEN** 执行涉及品牌的设计审查
- **THEN** 评估品牌色应用/品牌语调/品牌资产使用规范/品牌识别度，输出该纬度的 Strength/Weakness/Fix 清单

#### Scenario: 可访问性纬度评审
- **WHEN** 执行设计审查
- **THEN** 评估 WCAG 2.1 合规性/对比度/替代文本/键盘导航/屏幕阅读器兼容性，输出该纬度的 Strength/Weakness/Fix 清单

#### Scenario: 商业转化纬度评审
- **WHEN** 执行商业设计审查（营销页/落地页/PPT）
- **THEN** 评估目标受众匹配度/转化路径清晰度/价值主张传达/信任元素布局，输出该纬度的 Strength/Weakness/Fix 清单

#### Scenario: 纬度权重配置
- **WHEN** 针对特定设计类型执行审查
- **THEN** 系统根据设计类型自动配置纬度权重：
  - 移动端 App：交互体验 30%、视觉审美 20%、可访问性 25%、品牌一致性 15%、商业转化 10%
  - PPT/演示：商业转化 30%、信息传达 25%、视觉审美 20%、品牌一致性 15%、可访问性 10%
  - 插画：视觉审美 35%、商业适用性 25%、品牌一致性 20%、风格一致性 20%
  - 角色 IP：识别度 30%、延展性 25%、品牌适配性 25%、视觉审美 20%

### Requirement: 平台设计规范参考基线

系统 SHALL 提供主流平台官方设计规范作为审查基线参考。

#### Scenario: 引用 Apple 设计规范
- **WHEN** 审查 Apple 平台设计产出
- **THEN** 系统可引用 Apple Human Interface Guidelines 相关章节作为审查依据

#### Scenario: 引用 Google Material Design
- **WHEN** 审查 Android/Web 设计产出
- **THEN** 系统可引用 Material Design 3 规范作为审查依据

#### Scenario: 引用 Microsoft Fluent Design
- **WHEN** 审查 Windows/Web 设计产出
- **THEN** 系统可引用 Fluent Design 规范作为审查依据

#### Scenario: 引用 WCAG 可访问性规范
- **WHEN** 执行可访问性纬度审查
- **THEN** 系统引用 Web Content Accessibility Guidelines 2.1 作为审查依据

#### Scenario: 引用开源设计系统最佳实践
- **WHEN** 审查 Web/App 设计产出
- **THEN** 系统可引用开源设计系统（Ant Design/Element/Primer/Shadcn/ui）作为设计系统合规性参考

## MODIFIED Requirements

### Requirement: 5 维度评审体系配置化

5 维度评审体系（哲学一致性/视觉层级/细节执行/功能性/创新性）从固定权重调整为可配置权重，不同设计类型对应不同权重配置。

#### Scenario: 移动端 App 权重配置
- **WHEN** 审查移动端 App
- **THEN** 维度权重配置为：哲学一致性 15%、视觉层级 20%、细节执行 20%、功能性 25%、创新性 20%

#### Scenario: PPT 权重配置
- **WHEN** 审查演示文稿
- **THEN** 维度权重配置为：哲学一致性 10%、视觉层级 25%、细节执行 15%、功能性 20%、创新性 30%

#### Scenario: 插画权重配置
- **WHEN** 审查插画
- **THEN** 维度权重配置为：哲学一致性 10%、视觉层级 30%、细节执行 30%、功能性 10%、创新性 20%

#### Scenario: 角色 IP 权重配置
- **WHEN** 审查角色 IP
- **THEN** 维度权重配置为：哲学一致性 15%、视觉层级 25%、细节执行 25%、功能性 15%、创新性 20%

### Requirement: 审查前发现协议扩展

审查前发现协议在现有问卷基础上增加设计类型和审查视角确认。

#### Scenario: 确认设计类型
- **WHEN** 用户发起审查请求
- **THEN** 系统确认：设计类型（移动端 App/桌面端软件/Web 应用/PPT/插画/角色 IP/其他）

#### Scenario: 确认审查视角侧重
- **WHEN** 用户发起审查请求
- **THEN** 系统确认：审查视角（全面审查/视觉审美优先/交互体验优先/品牌一致性优先/可访问性优先/商业转化优先）

#### Scenario: 确认目标平台
- **WHEN** 用户发起移动端/桌面端审查
- **THEN** 系统确认：目标平台（iOS/macOS/Android/Windows/Web）

## REMOVED Requirements

（无移除项，本次为纯增强扩展）
