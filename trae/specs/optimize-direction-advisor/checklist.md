# 设计方向顾问全链路优化 Checklist

## Phase 1: 底层数据先建(philosophy.md)

- [x] §5 项目类型→流派适配矩阵创建,7 类型 × 10 流派 = 70 个 ★/★★/★★★ 评分
- [x] §5.1 项目类型定义表(7 类型)完整
- [x] §5.2 适配矩阵表(7 × 10)无空缺
- [x] §5.3 使用规则 5 条明确
- [x] §5.4 与铁律 4 的配合说明清晰
- [x] §6 真实产品案例库创建,40 哲学 × 2-3 案例 ≥ 80 个真实产品
- [x] §6.1 Evidence 规则 4 条明确
- [x] §6.2 案例表 40 行无空缺
- [x] §6.3 案例 4 类用法说明完整
- [x] §6.4 注意事项 3 条明确
- [x] §7 约束过滤维度创建,7 维度 × 10 流派 = 70 个评分
- [x] §7.1 7 维度定义表(含义/为什么重要/评估问题)完整
- [x] §7.2 7 维度 × 10 流派评分速查表无空缺
- [x] §7.3 评分解读 ★/★★/★★★/☆ 4 档明确
- [x] §7.4-7.5 与铁律 2、6 字段输出结构的配合说明清晰

## Phase 2: 顾问规则重写(philosophy.md §4)

- [x] §4 顶部 v3.0 重写说明标注
- [x] §4.1 触发条件从 3 条升级为 5 类场景
- [x] §4.1 询问式确认模板 5 选项完整
- [x] §4.1 简化模式说明明确
- [x] §4.2 Skip 条件从 2 条扩展为 4 条
- [x] §4.3 6 字段固定输出结构定义完整(模板含所有 6 字段)
- [x] §4.4 3 方向横评对比表定义完整(7 维度)
- [x] §4.5 选完后 3 个动作模板完整
- [x] §4.6 5 铁律定义完整(空话黑名单/3 问自检/Evidence/互斥/不堆砌)
- [x] §4.6 5 铁律均含 ❌→✅ 双向说明
- [x] §4.7 视觉参考(可选字段)保留 + 降级处理
- [x] §4.8 互斥自检规则保留
- [x] 40 哲学速查表(10 流派 × 4 方向)完整保留
- [x] §4 末尾指引 §5/§6/§7 链接
- [x] 版本号 v2.0 → v3.0

## Phase 3: 报告格式同步

- [x] `references/implementation.md` 设计建议报告模板与新 6 字段对齐
- [x] 模板包含"触发阶段"字段(从 5 类触发取 1)
- [x] 模板包含"当前状态评估"3-5 句(4 要素:场景/诊断/目标/约束)
- [x] 模板包含"方向对比速览"表(7 维度)
- [x] 模板包含 3 个方向详情(每个 6 字段)
- [x] 模板包含"优先级排序"3 项
- [x] 模板包含"选完后 3 个动作"
- [x] 模板包含"自检结果"5 铁律勾选
- [x] 模板使用要点 6 条说明
- [x] 5 类触发阶段对应关系说明
- [x] `references/implementation.md` 触发命令表"设计建议"行更新
- [x] `SKILL.md` 顶部导航表新增 3 行(项目类型/真实产品/约束过滤)
- [x] `SKILL.md` §1.4 设计方向顾问从 4 行升级为详细 5 类触发 + Skip + 5 引用
- [x] `SKILL.md` 版本号 v2.1 → v3.0

## Phase 4: Spec 文档

- [x] `.trae/specs/optimize-direction-advisor/spec.md` 创建(Why/What Changes/Impact/ADDED/MODIFIED/REMOVED)
- [x] spec.md 含 7 个 ADDED Requirements(5 类触发/6 字段/5 铁律/项目类型矩阵/产品案例/约束过滤/对比表+动作)
- [x] spec.md 含 3 个 MODIFIED Requirements(触发命令表/§1.4/导航表)
- [x] spec.md REMOVED 章节明确"无"
- [x] `.trae/specs/optimize-direction-advisor/checklist.md` 创建(全勾选)
- [x] `.trae/specs/optimize-direction-advisor/tasks.md` 创建(5 Phase,12 任务)

## Phase 5: 验证(grep 检引用 + 自检)

- [ ] 全文 grep `references/philosophy.md §4` 引用路径在 SKILL.md/implementation.md 中正确
- [ ] 全文 grep `references/philosophy.md §5/§6/§7` 引用路径在 SKILL.md 中正确
- [ ] 全文 grep `5 类触发` 关键词在 SKILL.md / philosophy.md / implementation.md 一致
- [ ] 全文 grep `6 字段` 关键词在 philosophy.md / implementation.md 一致
- [ ] 全文 grep `5 铁律` 关键词在 philosophy.md / implementation.md 一致
- [ ] 全文 grep `references/philosophy.md §2` 在 4.3 模板中引用为"反模式数据来源"
- [ ] 全文 grep 40 哲学编号 01-40 在 §2/§6/§7 保持一致
- [ ] 全文 grep 兼容性矩阵互斥组合(极简+后现代/东方+极繁)在 §4.6 铁律 4 中明确
- [ ] 全文 grep 空话黑名单 10 个词(专业/优雅/简洁/高级/精致/现代/好看/时尚/大气/质感)在 §4.6 铁律 1 + implementation.md 自检 中一致
- [ ] 全部 .md 文件无 LEFTOVER 旧版本引用("50-100 字""3-4 视觉特征"等松散字段)
- [ ] 版本号一致性:philosophy.md v3.0 / SKILL.md v3.0 / implementation.md v3.0
