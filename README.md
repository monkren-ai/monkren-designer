# AIOS Designer (MVP Foundation)

> **产品名称：** AIOS Designer (产品底座演进自 `monkren-designer`，兼顾设计技能库沉淀与现代化自主设计工坊)

---

## 概述 (Overview)

**AIOS Designer** 是面向 AI 操作系统 (AI OS) 的全生命周期设计工作室。架构采用 **Web 前端应用 (Thin Shell) + 本地常驻守护进程 (Local Daemon)** 模式，界面严格遵循由 `aios-ui-kit` 定义的工业级单色美学与验证规范。

### 核心架构决策 (Architecture Decisions)
- **运行载体：** Web 应用程序 + 本地 Node.js TS 守护进程（MVP 阶段不引入 Electron / Tauri 复杂包装）。
- **设计系统 UI：** 采用 GitHub 上 `monkren-ai/AIOS-UI` Monorepo 中的 `aios-ui-kit`（Tailwind CSS v4 + React 19 + CVA + motion）。
- **权限与归属不变式：**
  - **项目所有权归属于账户：** 项目关联 `ownerAccountId`，执行 Gate（质量门禁）与 Ship（交付发布）必须匹配当前会话账户。
  - **Designer ≠ Owner：** Designer 是执行具体设计与评审任务的智能体角色，不拥有项目所有权。
  - **Skills 仅绑定至 Designers：** 项目创建 (`POST /api/projects`) 与启动**严禁**接收 `skillIds` 参数。任何将技能直接附加到项目的请求都会被 Daemon 拒绝 (HTTP 400)。
- **工作台画布 (Workbench Host Shell)：** 长期目标为完整画布读写能力；MVP 阶段提供沉浸式工作台宿主外壳与组件规范可视化验证。

---

## 仓库结构 (Monorepo Workspace)

```text
monkren-designer/
├── apps/
│   ├── daemon/               # 本地守护进程 (Node.js + TS + HTTP/SSE/WS)
│   │   ├── src/
│   │   │   ├── index.ts      # 入口文件 (默认监听 127.0.0.1:7420)
│   │   │   ├── server.ts     # REST API / SSE / WebSocket 路由与业务校验
│   │   │   ├── store.ts      # 账户、项目、设计智能体、技能模块内存存储
│   │   │   ├── types.ts      # 核心类型与数据规范
│   │   │   └── server.test.ts# 规则测试用例
│   │   └── package.json
│   └── web/                  # Web 前端应用 (Vite + React 19 + Tailwind v4 + TS)
│       ├── src/
│       │   ├── api/          # Daemon HTTP/SSE 客户端
│       │   ├── components/   # Layout, DaemonPill 状态胶囊
│       │   ├── context/      # DaemonContext 全局守护进程与会话状态
│       │   ├── pages/        # Home, Projects, Workbench, Designers, Skills, Account
│       │   ├── App.tsx       # 路由配置
│       │   └── main.tsx      # ConfigProvider (motion) + DaemonProvider 入口
│       ├── vite.config.ts
│       └── package.json
├── skills/                   # 既有设计智能体五阶段模块与技能库 (保留并无损沉淀)
├── references/               # 设计方法论、设计决策议会与哲学指南
├── pnpm-workspace.yaml       # pnpm 工作区配置
└── package.json              # 根工作区脚本
```

---

## 如何安装 aios-ui-kit (Git Dependency)

`aios-ui-kit` 源码与打包产物托管于 GitHub Monorepo `monkren-ai/AIOS-UI` 的子目录 `aios-design-skill/aios-design/web-ui-kit/react`。其子目录内的 `package.json` 中的包名即为 `aios-ui-kit`（v3.0.0）。

### 1. 精确依赖声明

使用带有 `#path:<subdirectory>` 的 Git 依赖直接声明该子目录为 `aios-ui-kit`：

```json
"dependencies": {
  "aios-ui-kit": "github:monkren-ai/AIOS-UI#path:aios-design-skill/aios-design/web-ui-kit/react"
}
```

> **说明：**
> - 包名在子目录的 `package.json` 中已确认为 `"name": "aios-ui-kit"`。
> - 若使用标准 npm URL，等价形式为：`git+https://github.com/monkren-ai/AIOS-UI.git#path:aios-design-skill/aios-design/web-ui-kit/react`。
> - 在 `npm` 或 `pnpm` 中，该配置会直接克隆该子目录并以 `aios-ui-kit` 作为包名安装入 `node_modules`。

### 2. pnpm 允许执行构建脚本

由于该 git 依赖包含构建生成步骤，在根目录 `pnpm-workspace.yaml` 中配置允许列表：

```yaml
packages:
  - 'apps/*'
onlyBuiltDependencies:
  - 'aios-ui-kit'
```

### 3. 一键安装

```bash
pnpm install
```

---

## 快速启动 (Quick Start)

### 依赖环境
- Node.js >= 20 (推荐 v22+)
- pnpm >= 9 (推荐 v10+)

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动本地开发服务

#### 选项 A：同时启动 Web 与 Daemon (推荐)

```bash
pnpm dev
```
此命令将并行启动：
- **Daemon：** `http://127.0.0.1:7420`
- **Web App：** `http://localhost:5173`

#### 选项 B：分别启动

```bash
# 启动 Daemon 守护进程 (监听 127.0.0.1:7420)
pnpm dev:daemon

# 在另一终端启动 Web 前端
pnpm dev:web
```

### 3. 运行校验与测试

```bash
# 运行 Daemon 权限验证与接口单元测试
pnpm test

# 构建全部工作区应用
pnpm build
```

---

## 系统接口规范 (Daemon API)

Daemon 默认监听 `127.0.0.1:7420` (可通过环境变量 `AIOS_DAEMON_HOST` 与 `AIOS_DAEMON_PORT` 配置)：

| 接口 | 方法 | 说明 |
|---|---|---|
| `/health` | `GET` | 守护进程健康探针（状态、版本、运行时间、SSE/WS 能力） |
| `/events` | `GET` | Server-Sent Events (SSE) 实时事件通知流 |
| `/api/account` | `GET` | 获取当前会话账户与可用账户列表 |
| `/api/account` | `POST` | 切换当前测试会话账户（校验权限用） |
| `/api/projects` | `GET` | 获取项目列表 |
| `/api/projects` | `POST` | 创建项目（**如果请求体包含 `skillIds` 会返回 400 拒绝**） |
| `/api/projects/:id/gate` | `POST` | 触发门禁质量审查（要求会话所有者匹配） |
| `/api/projects/:id/ship` | `POST` | 交付项目（要求会话所有者匹配且门禁已通过） |
| `/api/designers` | `GET` | 获取设计智能体成员名单 |
| `/api/designers/:id/skills` | `PUT` | 为智能体绑定技能清单 |
| `/api/skills` | `GET` | 获取模块化技能目录 |
| WebSocket | `ws://` | 支持实时双向通信存根 |
