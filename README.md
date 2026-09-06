<sub>🌐 <a href="README.en.md">English</a> · <b>中文</b></sub>

> 当前版本：**v6.2** / 2026-07-17 / 架构：**1 个可安装设计智能体 + 5 阶段生命周期 + 1 个跨阶段次设计 agent**

<div align="center">

# Monkren

> *1 个设计智能体，5 个设计阶段，再加一份不讨好的第二意见。*

[![License](https://img.shields.io/badge/License-Personal%20Use%20Only-orange.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-blueviolet)](https://skills.sh)
[![skills.sh](https://img.shields.io/badge/skills.sh-Compatible-green)](https://skills.sh)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://monkren-ai.github.io/monkren-designer/)

```bash
npx skills add monkren-ai/monkren-designer
```

[在线预览](https://monkren-ai.github.io/monkren-designer/) · [快速开始](#快速开始) · [路由](#5-阶段路由) · [结构](#仓库结构)

</div>

## 快速开始

安装后直接描述任务：

```text
调研这个领域的设计方向
给我 3 个设计变体
做一个可交互原型
深度审查这个项目
根据审查报告修复全部问题
让次设计 agent 判断这个方向该不该做
```

标准安装只暴露根目录的 `monkren-design`。它是唯一入口，会按意图读取仓库内相应阶段模块。16 个阶段模块、1 个 advisor 和 2 个工具不是要求用户分别安装的独立产品。

审查、评审、audit、review 默认只读；只有用户明确要求“修复、改进、实现、制作”时才修改文件。浏览器、MCP 或子代理是可选增强，不是完成核心任务的前置条件。

## 5 阶段路由

| # | 阶段 | 典型问题 | 活跃模块 |
|---|---|---|---:|
| 01 | 调研定义 | 现状、约束、方向是什么？ | 6 |
| 02 | 创作定义 | 做什么、选哪个方向？ | 2 |
| 03 | 设计执行 | 如何做成可交互产出？ | 1 |
| 04 | 设计审查 | 做得好不好、问题在哪？ | 6 |
| 05 | 设计改进 | 如何修复并复验？ | 1 |

另有 1 个跨阶段次设计 agent 和 2 个灵感源工具。完整且可执行的路由表见 [SKILL.md](SKILL.md)。

## 次设计 agent

“第一性原理 × 产品品味”只在重大方向、高成本实现、难逆品牌或架构决策、修复冲突和交付前关键取舍时介入，也可由用户点名调用。它先质疑需求、做减法、识别硬约束，再保护核心用户承诺和端到端体验。

输出只有一个统一结论，同时保留工程异议与体验异议。它始终只读，不模拟真实人物；需要实现时把结论交回五阶段中的对应模块。

## 评审标尺

Monkren 用五个维度评价设计：哲学一致性、视觉层级、细节执行、功能性、创新性。

四条评分纪律：

1. 全维度均不低于 7 时强制寻找反证。
2. 按最差的持续体验评分，不用平均值掩盖问题。
3. 每个分数必须引用文件、行号、元素或可观察证据。
4. 生产型设计的创新性 5/10 可以合理，不为好看而抬分。

完整标准见 [references/standards.md](references/standards.md)。

## 仓库结构

```text
monkren-designer/
├── SKILL.md                 # 唯一安装入口与路由器
├── skills/
│   ├── 01-research/         # 6 个调研模块
│   ├── 02-create/           # 2 个创作模块
│   ├── 03-execute/          # 1 个执行模块
│   ├── 04-review/           # 6 个审查模块，含 5-dim-review
│   ├── 05-improve/          # 1 个改进模块
│   ├── advisors/            # 1 个跨阶段只读次设计 agent
│   ├── tools/               # 2 个跨阶段工具
│   └── _deprecated/         # 不参与路由的历史模块
├── references/              # 按需加载的方法与标准
├── assets/philosophy-images/# 80 张本地参考图及索引
├── case/                    # 4 份案例产出
├── scripts/                 # 仓库校验脚本
├── THIRD_PARTY_NOTICES.md   # 第三方来源与 MIT 归属
└── index.html               # GitHub Pages 展示页
```

## 兼容性

根技能不依赖某个专有 agent 路径或工具名。支持 skills.sh 的 agent 可直接安装；其他环境也可读取 `SKILL.md` 使用。某项增强能力不可用时，流程会降级为本地、顺序或文本方式。

## 开发校验

```bash
ruby scripts/validate_repo.rb
```

该检查覆盖技能 frontmatter、根路由、advisor 边界、相对链接、展示页本地资源以及 80 张哲学图片索引。GitHub Pages 部署也会先运行同一检查。

## 许可证

个人使用免费；企业或商业用途需要书面授权。详见 [LICENSE](LICENSE)。

“第一性原理 × 产品品味”参考的第三方材料与许可见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

**v6.2 · 2026-07-17**
