# 强化设计哲学模块能力：可落地概念发散 + Demo 输出

## 一、仓库研究结论

### 1.1 现有能力盘点

当前 monkren-design 设计哲学模块已具备坚实基础：

| 能力项 | 现状 | 位置 |
|--------|------|------|
| 40 种设计哲学风格库 | ✅ 完整（10流派×4方向），含哲学内核/核心特征/提示词DNA/色板/字体栈/反模式/提升路径 | [philosophy.md](file:///Users/ruishengzhang/Documents/GitHub/monkren-design/references/philosophy.md) §2 |
| 设计方向顾问 | ✅ 5类触发场景 + 6字段输出 + 3方向横评 + 5铁律 | [philosophy.md](file:///Users/ruishengzhang/Documents/GitHub/monkren-design/references/philosophy.md) §4, [SKILL.md](file:///Users/ruishengzhang/Documents/GitHub/monkren-design/SKILL.md) |
| 项目类型适配矩阵 | ✅ 7类项目 × 10流派适配度评分 | [philosophy.md](file:///Users/ruishengzhang/Documents/GitHub/monkren-design/references/philosophy.md) §5 |
| 真实产品案例库 | ✅ 40哲学 × 2-3案例，含搜索关键词 | [philosophy.md](file:///Users/ruishengzhang/Documents/GitHub/monkren-design/references/philosophy.md) §6 |
| 约束过滤维度 | ✅ 7维度评分（团队/技术/预算/国际化/暗色/维护/用户群） | [philosophy.md](file:///Users/ruishengzhang/Documents/GitHub/monkren-design/references/philosophy.md) §7 |
| 流派兼容性矩阵 | ✅ 兼容/互斥/部分兼容三类，含混搭指导 | [philosophy.md](file:///Users/ruishengzhang/Documents/GitHub/monkren-design/references/philosophy.md) §2末尾 |
| 哲学反模式+提升路径 | ✅ 10流派各有反模式表+Quick Win+提升路径 | [philosophy.md](file:///Users/ruishengzhang/Documents/GitHub/monkren-design/references/philosophy.md) §2各流派小节 |
| HTML报告模板 | ✅ 审查报告/设计建议报告有HTML输出 | [implementation.md](file:///Users/ruishengzhang/Documents/GitHub/monkren-design/references/implementation.md), [case/](file:///Users/ruishengzhang/Documents/GitHub/monkren-design/case) |

### 1.2 现有能力缺口

经分析，当前模块存在以下缺口，正是本次增强需要解决的：

1. **概念发散维度不足**：当前是"从40种里选3个推荐"，缺乏基于项目特点的基因重组式发散、反共识方向推荐、梯度式演进（保守→激进）
2. **可落地性颗粒度不够**：推荐停留在"用Pentagram风格"层面，缺少具体的Token定义、组件级指南、页面布局模式、落地Checklist
3. **无可视化Demo输出**：只有文字描述和色板，没有可运行的HTML Demo让用户直观看到该哲学在实际页面/组件中的样子
4. **项目特点分析较粗**：仅有7类项目类型+7约束维度，缺少品牌人格、情感期待、交互范式、内容密度、差异化诉求等更细粒度分析维度
5. **场景化概念包缺失**：没有针对具体页面类型（Landing/Dashboard/表单/详情页/列表页等）提供该哲学下的设计模式

---

## 二、增强目标

### 2.1 核心目标

1. **项目特点→哲学概念发散引擎**：不是从40种里选，而是基于项目多维度特征，生成定制化的可落地设计哲学概念
2. **可落地概念包**：每个概念包含Token映射、组件指南、布局模式、动效原则、反模式红线、实施Checklist
3. **HTML Demo输出**：自动生成可在浏览器直接打开的交互式Demo页面，直观展示该哲学的视觉效果

### 2.2 输出形态

- 更新 `references/philosophy.md`：新增概念发散框架、可落地概念包模板、场景化设计模式
- 新增 `references/philosophy-demos.md`：Demo生成规范、组件Demo模板库
- 更新 `SKILL.md`：新增"哲学概念发散+Demo生成"触发场景和工作流
- 新增 `case/demo-templates/`：预置Demo模板文件（按10流派分类）

---

## 三、详细修改方案

### 3.1 模块一：项目特点深度分析框架（新增 §8）

**文件**：[references/philosophy.md](file:///Users/ruishengzhang/Documents/GitHub/monkren-design/references/philosophy.md)

在现有 §7 约束过滤维度之后新增 §8，提供更细粒度的项目特征分析维度，作为概念发散的输入。

**新增内容（§8 项目特点多维度分析框架）：**

#### 8.1 6 大分析维度（扩展现有7维度）

| 维度 | 子维度 | 可选值 | 对哲学选择的影响 |
|------|--------|--------|----------------|
| **品牌人格** | 调性关键词 | 专业可信/温暖亲和/反叛大胆/奢华精致/童趣活力/科技未来/人文艺术/自然有机 | 决定视觉气质方向 |
| | 品牌成熟度 | 初创探索/成长扩张/成熟稳重/经典传承 | 决定创新幅度（保守→激进） |
| **用户情感期待** | 核心情绪 | 信任安全感/惊喜愉悦感/效率掌控感/沉浸探索感/平静治愈感 | 决定色彩/动效/留白策略 |
| | 用户专业度 | 小白用户/进阶用户/专家用户 | 决定信息密度和交互复杂度 |
| **核心交互范式** | 主交互类型 | 表单填写驱动/内容浏览消费/数据探索分析/创作工具型/游戏化探索/交易转化型 | 决定布局骨架和组件选型 |
| | 设备场景 | 移动端优先/桌面端优先/多端响应/大屏展示 | 决定网格系统和组件尺寸 |
| **内容密度需求** | 信息密度 | 极低（品牌展示）/低（营销页）/中（工具首页）/高（Dashboard）/极高（数据平台） | 决定留白比例和层级数量 |
| | 内容类型 | 图文为主/数据图表为主/视频/交互控件为主/混合 | 决定视觉元素优先级 |
| **品牌资产强度** | 现有资产 | 强（完整VI+Design System）/中（有logo和主色）/弱（只有logo）/无（从零开始） | 决定可改造幅度 |
| | 品牌色约束 | 必须严格遵守/可在色系内调整/可大幅调整/完全自由 | 决定色板策略 |
| **差异化诉求** | 差异幅度 | 保守跟随（行业通用）/微创新（在行业基础上优化）/显著差异（让人记住）/激进颠覆（重新定义） | 决定哲学选择的激进程度 |
| | 竞品参考 | 有明确对标/有避坑对象/无明确参考 | 决定是否需要反共识推荐 |

#### 8.2 项目特点→哲学映射启发式

提供从项目特点反推哲学方向的启发式规则（20+条），例如：
- 品牌人格="专业可信" + 内容密度="高" + 差异幅度="保守跟随" → 优先信息建筑派
- 品牌人格="反叛大胆" + 用户情感="惊喜愉悦" + 差异幅度="激进颠覆" → 优先后现代狂欢/野蛮生长
- 品牌人格="人文艺术" + 用户情感="平静治愈" + 差异幅度="显著差异" → 优先东方哲学派
- 等等...

---

### 3.2 模块二：哲学概念发散引擎（新增 §9）

**文件**：[references/philosophy.md](file:///Users/ruishengzhang/Documents/GitHub/monkren-design/references/philosophy.md)

新增 §9，提供系统化的概念发散方法，不只是"选3个方向"，而是生成定制化概念。

**新增内容：**

#### 9.1 三种发散模式

| 发散模式 | 适用场景 | 方法 |
|---------|---------|------|
| **流派精选模式** | 用户需要快速决策，风险低 | 从现有40种中精选3个横跨不同流派的方向（现有模式增强） |
| **基因重组模式** | 用户需要差异化，愿意尝试混搭 | 提取不同哲学的核心基因进行组合，生成"混血"概念 |
| **梯度演进模式** | 用户已有方向但想探索不同激进程度