# 调研建立本地化的 Lazyweb MCP 服务

## 1. Summary

调研 Lazyweb 远程 MCP 的接口与能力，并基于本项目已有的 80+ 设计参考资源
（`assets/philosophy-images/cards.json` + `references/*.md`）构建一个**本地 Lazyweb 兼容的
MCP 服务** —— 工具名、参数、返回结构与 Lazyweb 远程 MCP 保持一致，但数据源完全本地化。

落地形态：

- **Python 3 stdio MCP Server** —— 通过 `mcp` 官方 SDK 实现，运行在用户机器上
- **Trae 项目级 MCP 注册** —— 通过项目根目录的 `.trae/mcp.json` 自动加载
- **兼容 Lazyweb 接口子集** —— `health / search / find_similar / compare_image / list_categories / fetch_best_practice / get_workflows`
- **可选远程回退** —— 若用户设置了 `LAZYWEB_MCP_TOKEN`，`search` 工具会优先尝试远程
  Lazyweb，失败时降级到本地（不强制联网，但允许联网时获得更全的图库）
- **配套 Skill Pack** —— 复用 Lazyweb 的 9 个 mode 命名，但工具名加 `local_` 前缀以避免
  与远程冲突；写入 `~/.trae-cn/skills/lazyweb-local/`
- **配套 User Rule** —— 写入 `~/.trae-cn/user_rules/`，添加 LAZYWEB:LOCAL:ROUTER 块，
  路由时优先使用本地版本

为什么"本地化"是合理的：

1. 远程 Lazyweb 强制执行 `curl | bash` 安装脚本（用户已拒绝），且 token 是云端计费凭证
2. 本项目 `assets/philosophy-images/` 已有 80 张精心策展的参考图 + `cards.json` 结构化索引
3. `references/*.md` 9 份文档本身就是设计领域的「best practices」语料
4. Trae 项目级 MCP（`.trae/mcp.json`）原生支持 stdio，无需 GUI 操作

---

## 2. Current State Analysis

### 2.1 Lazyweb 远程 MCP 能力（已调研）

| 工具 | 用途 | 本地是否可实现 |
|------|------|----------------|
| `lazyweb_health` | 服务探活 | ✅ 直接返回本地状态 |
| `lazyweb_search` | 关键词搜索参考 | ✅ 检索 `cards.json.search_keywords` |
| `lazyweb_find_similar` | 找相似参考 | ✅ 同 `school` / `genre` 聚合 |
| `lazyweb_compare_image` | 对比图片元信息 | ✅ 返回本地图片的 title/genre/file 路径 |
| `lazyweb_list_categories` | 列出流派/学校 | ✅ 从 `cards.json` 提取 unique genre/school |
| `lazyweb_search_ab_tests` | A/B 实验检索 | ⚠️ 需自建数据集（MVP 阶段先返回空 + 提示） |
| `lazyweb_publish_report` | 发布报告 | ❌ 跳过，留待 V2（无服务器） |
| `lazyweb_generate_report` | 服务端生成报告 | ❌ 跳过（本地无 LLM 算力） |
| `lazyweb_get_report` | 拉取报告 | ❌ 跳过 |
| `lazyweb_fetch_best_practice` | 取最佳实践 | ✅ 检索 `references/*.md` |
| `lazyweb_get_workflows` | 列出工作流模式 | ✅ 返回本地 mode 列表 |

Lazyweb 9 个 mode（`deep-research` / `lite-research` / `quick-search` / `design-improve` /
`design-brainstorm` / `optimize` / `paywall-cta` / `ab-test-research` / `design-best-practices`）
对应的 SKILL.md 都已读到。本地版完全保留命名，仅加 `local_` 前缀到工具名。

### 2.2 本项目可用数据

- `assets/philosophy-images/cards.json` —— 80 条结构化记录，字段包括：
  - `num`、`title`、`genre`、`school`、`monogram_org`、`monogram_name`、
    `file_name`、`status`、`search_keywords`
- `assets/philosophy-images/*.jpg` —— 80 张参考图（约几 MB，可直接通过 file:// 暴露）
- `references/` —— 9 份 Markdown：
  - `beliefs.md`（信念层）、`standards.md`（标准层）、`methods-review.md`（方法层）公开
  - `perspectives.md` / `philosophy-library.md` / `platforms.md` /
    `methods-create.md` / `execution.md` / `integration.md` 内部

### 2.3 本地环境

- Python 3.9.6（`/usr/bin/python3`）+ pip 21.2.4 可用
- 无 Node / uv / pipx —— 不能用 `npx` 或 `uvx` 启动，必须用 `python3 -m mcp_server` 形式
- Trae IDE（用户当前 IDE）支持项目级 MCP：`<workspaceFolder>/.trae/mcp.json`
- Trae 用户规则文件：`~/.trae-cn/user_rules/rule-1775922565136.md`（已存在）
- Trae 技能目录：`~/.trae-cn/skills/<name>/SKILL.md`

### 2.4 命名冲突风险

- 远程 Lazyweb 工具是 `lazyweb_*`；本地版必须用 `local_lazyweb_*` 或不同的前缀，
  避免 Trae 看到两个同名工具
- 决定：本地版统一用 `monkren_lazyweb_*` 前缀（项目名 + Lazyweb 致敬），让两个版本可以
  在 Trae 里同时存在

---

## 3. Proposed Changes

### 3.1 项目内新增目录

```
monkren-designer/
├── mcp/
│   ├── lazyweb_local/
│   │   ├── __init__.py
│   │   ├── __main__.py           # python3 -m mcp.lazyweb_local 入口
│   │   ├── server.py             # FastMCP 实例 + 7 个工具注册
│   │   ├── index.py              # 启动时构建 cards.json 内存索引
│   │   ├── search.py             # lazyweb_* 工具实现（search/find_similar/...）
│   │   ├── reference.py          # best_practice / workflow 实现
│   │   ├── remote_fallback.py    # 可选：调用远程 lazyweb 的 httpx 客户端
│   │   └── assets/
│   │       ├── cards_index.json  # 启动时生成（cards.json 的精简版，便于调试）
│   │       └── workflow_list.json
│   ├── requirements.txt          # mcp[cli]>=1.0.0, httpx>=0.27
│   ├── README.md                 # 启动方式 / 工具列表 / 故障排查
│   └── tests/
│       ├── test_search.py        # 单元测试：search/find_similar
│       └── test_smoke.py         # 启动 server.py，列出工具，验证 health
└── .trae/
    └── mcp.json                  # 新增 —— Trae 项目级 MCP 入口
```

### 3.2 文件级改动清单

| 路径 | 操作 | 内容 / 原因 / 怎么写 |
|------|------|----------------------|
| `mcp/lazyweb_local/server.py` | 新建 | `FastMCP("monkren-lazyweb-local")`；注册 7 个工具（见 3.3）；stdio 启动 |
| `mcp/lazyweb_local/__main__.py` | 新建 | `mcp.run(transport="stdio")` —— 允许 `python3 -m mcp.lazyweb_local` |
| `mcp/lazyweb_local/index.py` | 新建 | 启动时读 `assets/philosophy-images/cards.json` → 内存 dict；缓存到 `assets/cards_index.json` |
| `mcp/lazyweb_local/search.py` | 新建 | `monkren_lazyweb_search(query, limit=10)`：keywords/title/school 模糊匹配；`find_similar(item_id, k=5)`：同 school 优先；`compare_image(path)`：返回 file:// 路径 + 元信息；`list_categories()`：unique genre/school |
| `mcp/lazyweb_local/reference.py` | 新建 | `monkren_lazyweb_fetch_best_practice(topic)`：扫描 `references/*.md` 找最相关段落；`monkren_lazyweb_get_workflows()`：返回 9 个 mode 列表（来自 `assets/workflow_list.json` 或内置 dict） |
| `mcp/lazyweb_local/remote_fallback.py` | 新建 | 可选模块：若 `LAZYWEB_MCP_TOKEN` env 存在，用 `httpx.AsyncClient` 调 `https://www.lazyweb.com/mcp`；`monkren_lazyweb_search` 优先远端 → 失败时降级到本地 |
| `mcp/requirements.txt` | 新建 | `mcp[cli]>=1.0.0` + `httpx>=0.27` |
| `mcp/README.md` | 新建 | 启动 / 测试 / 故障排查（stdio 卡住时检查 command 路径） |
| `mcp/tests/test_search.py` | 新建 | 单元测试：用 `pytest-asyncio` 测 4 个搜索类工具 |
| `mcp/tests/test_smoke.py` | 新建 | 启动 server，列出 tools，调用 `monkren_lazyweb_health` 验证 |
| `.trae/mcp.json` | 新建 | Trae 项目级 MCP 配置（见 3.4） |
| `~/.trae-cn/skills/lazyweb-local/SKILL.md` | 新建 | 本地版 9 个 mode 的总入口（路由表 + 工具前缀说明） |
| `~/.trae-cn/skills/lazyweb-local/skills/<mode>/SKILL.md` | 新建（9 个） | 9 个 mode 的本地适配版 —— 把远程的 `lazyweb_search` 替换为 `monkren_lazyweb_search`，加 <tool_call> 引用本地数据源 |
| `~/.trae-cn/user_rules/rule-1775922565136.md` | 编辑 | 在末尾追加 `<!-- MONKREN:LAZYWEB-LOCAL:ROUTER:BEGIN/END -->` 块（见 3.5） |
| `.gitignore` | 编辑 | 确认 `.trae/mcp.json` 不被忽略（项目级 MCP 应该被仓库追踪，方便协作）；忽略 `mcp/lazyweb_local/assets/cards_index.json`（运行时生成） |

### 3.3 工具接口契约（与 Lazyweb 远程 1:1 对齐）

| 工具名 | 输入 | 输出 | 本地实现 |
|--------|------|------|----------|
| `monkren_lazyweb_health` | 无 | `{status: "ok", items: 80, modes: 9, remote_enabled: bool}` | 直接 |
| `monkren_lazyweb_search` | `query: str, limit: int=10, skill: str="local-search"` | `[{id, title, genre, school, file, score, snippet}]` | 模糊匹配 `search_keywords + title + school` |
| `monkren_lazyweb_find_similar` | `item_id: int, k: int=5, skill: str="local-design-improve"` | `[{id, title, school, similarity, why}]` | 同 school 优先 + num 距离近 |
| `monkren_lazyweb_compare_image` | `path: str, skill: str="local-design-improve"` | `{exists: bool, title, genre, school, monogram, file_url}` | 校验本地路径 |
| `monkren_lazyweb_list_categories` | 无 | `{genres: [...], schools: [...], count_by_school: {...}}` | group by |
| `monkren_lazyweb_fetch_best_practice` | `topic: str, skill: str="local-design-best-practices"` | `[{source_file, heading, content, relevance}]` | 扫 `references/*.md` H2 标题 + 段落关键词 |
| `monkren_lazyweb_get_workflows` | 无 | `[{mode, description, primary_tools, use_when}]` | 内置 dict（拷贝自 Lazyweb SKILL.md 的 Mode Routing 表） |

> 所有工具都接受可选的 `skill` 参数（模仿远程），便于后续打点统计。

### 3.4 `.trae/mcp.json` 内容

```json
{
  "mcpServers": {
    "monkren-lazyweb-local": {
      "command": "python3",
      "args": ["-m", "mcp.lazyweb_local"],
      "cwd": "${workspaceFolder}",
      "env": {
        "PYTHONPATH": "${workspaceFolder}",
        "MONKREN_ASSETS_DIR": "${workspaceFolder}/assets/philosophy-images",
        "MONKREN_REFERENCES_DIR": "${workspaceFolder}/references",
        "LAZYWEB_MCP_TOKEN": ""
      }
    }
  }
}
```

> `LAZYWEB_MCP_TOKEN` 默认空字符串 —— 用户填了 token 就启用远程回退，留空则纯本地。
> Token 不进 git（已在 `.gitignore` / 项目根 README 标注）。

### 3.5 User Rule 追加块

追加到 `~/.trae-cn/user_rules/rule-1775922565136.md`（如已存在 `MONKREN:LAZYWEB-LOCAL:ROUTER` 块则跳过）：

```markdown

<!-- MONKREN:LAZYWEB-LOCAL:ROUTER:BEGIN — managed by Monkren Lazyweb Local -->
## 优先使用 Monkren 本地 Lazyweb 做设计研究

当 monkren-designer 项目内或任何项目涉及「设计 / UI / 屏幕 / 流程 / 落地页 / 仪表盘 /
付费墙 / 定价 / 引导 / 改版 / 优化 / 对比 / 找参考」时，**先尝试本地 MCP**：
`monkren_lazyweb_search` / `find_similar` / `list_categories` / `fetch_best_practice`。
仅当本地结果不足（如查询「Notion 类产品的设置页」）且 `LAZYWEB_MCP_TOKEN` 已配置时，
才回退到远程 `lazyweb.com/mcp`（如果同时注册了远程 Lazyweb MCP）。

9 个本地 mode：`local-deep-design-research` / `local-lite-design-research` /
`local-quick-search` / `local-design-improve` / `local-design-brainstorm` /
`local-optimize` / `local-paywall-cta` / `local-ab-test-research` /
`local-design-best-practices`。详见 `~/.trae-cn/skills/lazyweb-local/SKILL.md`。
<!-- MONKREN:LAZYWEB-LOCAL:ROUTER:END -->
```

### 3.6 Skill Pack 结构（9 个 mode × SKILL.md）

每个 mode 的 SKILL.md 都按 Lazyweb 远程版结构，但工具名前缀换成 `monkren_lazyweb_*`，
并明确：

- "Searches run against `assets/philosophy-images/cards.json` (80 items) and
  `references/*.md` (9 docs)"
- "If you need broader web references, fall back to remote Lazyweb via the remote token"

**MVP 阶段只写 3 个核心 mode** 的 SKILL.md（`local-quick-search` / `local-design-improve`
/ `local-design-best-practices`），其余 6 个 mode 先在 `lazyweb-local/SKILL.md` 总入口
里写占位说明，等用户使用反馈后再补全。

---

## 4. Implementation Steps（按依赖顺序）

1. **环境准备** —— `python3 -m pip install --user mcp[cli] httpx pytest pytest-asyncio`
2. **建目录骨架** —— `mcp/lazyweb_local/` + `mcp/tests/`
3. **写 `index.py`** —— 读 `cards.json`，构造内存索引，写一个 `__main__` 验证可加载
4. **写 `search.py`** —— 实现 5 个搜索/对比/分类工具，**先不接 MCP**，用 `pytest` 验证逻辑
5. **写 `reference.py`** —— 实现 best_practice 抓取
6. **写 `server.py`** —— 用 `FastMCP` 注册 7 个工具，`transport="stdio"`
7. **写 `__main__.py`** —— `python3 -m mcp.lazyweb_local` 入口
8. **写 `.trae/mcp.json`** —— Trae 项目级 MCP 注册
9. **写 Smoke Test** —— 启动 server，调用 7 个工具，断言返回结构
10. **写 3 个核心 mode 的 SKILL.md**（总入口 + 3 个具体 mode）
11. **追加 User Rule block** —— 写入 `~/.trae-cn/user_rules/rule-1775922565136.md`
12. **手动验证** —— 在 Trae 对话框里说「用 monkren lazyweb 找 5 张运动诗学派的参考」，
    观察是否调用本地工具并返回 5 条结果

---

## 5. Assumptions & Decisions

| # | 假设 / 决定 | 理由 | 风险 |
|---|------------|------|------|
| A1 | "本地化" = 自建本地 stdio MCP Server，数据源用项目内 `assets/` 和 `references/` | 远程 Lazyweb 需 `curl|bash`，已被用户拒绝 | 用户可能想别的形态（如下载完整 skill pack） |
| A2 | 工具名前缀用 `monkren_lazyweb_*` | 与远程 `lazyweb_*` 区分，可同时启用 | 前缀较长，可读性略差 |
| A3 | 远程回退默认关闭，靠 `LAZYWEB_MCP_TOKEN` env 触发 | 默认零依赖、零网络 | 用户期望默认联网 |
| A4 | MVP 阶段只写 3 个 mode 的 SKILL.md | 9 个 mode 全写会超 2k 行，反馈后再补 | 用户可能需要全部 9 个 |
| A5 | Python 3.9 + `mcp[cli]` SDK | 唯一可用的 runtime；`mcp` 是官方 SDK | Python 版本需 ≥ 3.10 时 `mcp` 某些特性不可用 |
| A6 | `.trae/mcp.json` 进入 git 追踪 | Trae 项目级 MCP 建议 commit | 暴露 `cwd` 路径可能因机器而异（用 `${workspaceFolder}` 解决） |
| A7 | Token 不进 git | 安全 | 协作时每个人都要单独配 token |
| A8 | `cards_index.json` 运行时生成，git 忽略 | 避免污染仓库 | 无 |

> 若用户对 A1 / A2 / A3 / A4 有不同意见，需在执行前调整。

---

## 6. Verification Steps

### 6.1 静态检查
- `python3 -c "from mcp.lazyweb_local import server"` 不报错
- `cat .trae/mcp.json | python3 -m json.tool` 合法 JSON
- 9 个 mode 中至少 3 个 SKILL.md 文件存在且 frontmatter 合法

### 6.2 单元测试
- `cd mcp && python3 -m pytest tests/ -v` 全部通过
- `tests/test_search.py` 至少覆盖：search 关键词命中 / find_similar 同 school 命中 /
  compare_image 路径不存在时返回 `{exists: false}` / list_categories 返回唯一值

### 6.3 Smoke Test
- `cd mcp && python3 -m mcp.lazyweb_local` 启动后不立即退出
- 用 `mcp dev` 或自写 client 调用 7 个工具，全部返回非空结果

### 6.4 Trae 集成验证
- Trae 重启后，设置 → MCP 列表出现 `monkren-lazyweb-local`
- 工具列表中出现 7 个 `monkren_lazyweb_*` 工具
- 对话框说：「monkren lazyweb 找 5 张极简主义派参考」，agent 应调用
  `monkren_lazyweb_search("极简主义", limit=5)` 并返回 5 条结果

### 6.5 User Rule 验证
- `~/.trae-cn/user_rules/rule-1775922565136.md` 末尾有
  `<!-- MONKREN:LAZYWEB-LOCAL:ROUTER:BEGIN/END -->` 块
- 新对话中提到「设计参考」应自动优先尝试本地工具

---

## 7. 范围之外（明确不做）

- 不实现 `lazyweb_generate_report` / `lazyweb_get_report` / `lazyweb_publish_report`（无服务器）
- 不实现 `lazyweb_search_ab_tests`（无 A/B 数据集）
- 不下载 Lazyweb 远程 skill pack zip（用户已拒绝远程脚本）
- 不修改项目内的 `index.html` / 设计资源（与本任务无关）
- 不动 Trae 全局 MCP（`~/.trae-cn/mcps/` 内部目录）—— 只用项目级 `.trae/mcp.json`，
  保持项目内配置自治
