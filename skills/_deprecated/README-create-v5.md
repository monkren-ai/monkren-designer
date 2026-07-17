# Deprecated creation modules

这些历史模块保留用于迁移参考，不参与根 `SKILL.md` 的路由，也不计入活跃模块数量。

| Module | 状态 | 推荐替代方式 |
|---|---|---|
| [make-a-deck](./make-a-deck/) | Deprecated | 使用项目已有演示框架或环境可用的幻灯片工具 |
| [make-tweakable](./make-tweakable/) | Deprecated | 在现有应用或原型中实现必要控制项 |
| [design-system-extract](./design-system-extract/) | Deprecated | 从真实 token、组件与品牌规范生成清单 |
| [component-extract](./component-extract/) | Deprecated | 使用项目组件目录和文档系统生成 inventory |

不要从新工作流调用这些模块。需要恢复某项能力时，应先将其改造成自包含、无专有工具依赖且通过仓库校验的活跃模块。
