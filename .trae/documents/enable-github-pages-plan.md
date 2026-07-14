# 启用 GitHub Pages · 实施 Plan

> 用户选择:**gh-pages 分支(传统) + 默认域名 `monkren-ai.github.io/monkren-designer`**
> 关键决策:用 **peaceiris/actions-gh-pages** 把 main → gh-pages 的同步自动化,避免每次双分支手动同步。

---

## Summary

将 Monkren Designer 的 `index.html` 静态站点自动部署到 GitHub Pages,访问地址:
**`https://monkren-ai.github.io/monkren-designer/`**

- 触发:`main` 分支 push → GitHub Action 自动构建 → 推送到 `gh-pages` 分支
- GitHub Pages 设置:从 `gh-pages` 分支 /(root) 部署
- 部署产物:仅 `index.html` + `assets/` + `case/` + `LICENSE` + `.nojekyll`,不暴露 `归档.zip` / `.trae/` / `*.md` / `SKILL.md` / `references/` / `skills/`
- 顺手补 `.gitignore` + `README.md` 顶部新增 Pages 徽章/链接

---

## Phase 1 · 探索结果(已完成)

| 项 | 现状 |
|---|---|
| 仓库 | `https://github.com/monkren-ai/monkren-designer` |
| 默认分支 | `main`,工作区干净(`nothing to commit, working tree clean`) |
| 核心产物 | `index.html` 3401 行 / 143KB,自包含 HTML+CSS+JS(无 build 步骤) |
| 资源 | `assets/philosophy-images/` 80 张 JPG,均被 `index.html` 引用 |
| 案例 | `case/` 现有 3 个文件,但 `index.html` 引用 24 个(差 21 个,会上线后 404) |
| 现有 Pages | 无;无 `.github/`、无 `.gitignore`、无 CNAME |
| 不应暴露 | `归档.zip` (1.6MB)、`.DS_Store`、`.trae/`、`*.md`、`SKILL.md`、`references/`、`skills/`、`LICENSE` 中的版权信息(可选暴露) |

---

## Phase 2 · 用户决策(已确认)

| 问题 | 答案 |
|---|---|
| 部署方式 | gh-pages 分支(传统) |
| 域名 | 默认 `monkren-ai.github.io/monkren-designer/`(暂不绑自定义域名) |
| 自动同步 | 用 peaceiris/actions-gh-pages 自动化(避免双分支维护负担) |

---

## Phase 3 · 实施步骤

### Step 1 · 新增 `.gitignore`(挡掉脏文件)

**文件**: `/Users/ruishengzhang/Documents/GitHub/monkren designer/.gitignore`

内容(最小可用):

```gitignore
# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# 归档 / 临时
归档.zip
*.zip
*.tmp
*.log

# Trae 内部产物
.trae/

# 环境
.env
.env.local
```

> **注意**:不把 `node_modules/` 等写进去(本项目无 node 依赖)。

---

### Step 2 · 创建 GitHub Actions workflow

**文件**: `/Users/ruishengzhang/Documents/GitHub/monkren designer/.github/workflows/deploy-pages.yml`

完整内容:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Prepare public artifact
        run: |
          mkdir -p public
          # 1. 主页
          cp index.html public/
          # 2. 资源(80 张哲学图)
          cp -R assets public/assets
          # 3. 案例(只复制已存在的 3 个,避免空目录错)
          if [ -d case ]; then
            cp -R case public/case
          fi
          # 4. 协议
          cp LICENSE public/
          # 5. 关闭 Jekyll(防止 _xxx 文件被吞)
          touch public/.nojekyll

      - name: Deploy to gh-pages branch
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          publish_branch: gh-pages
          user_name: github-actions[bot]
          user_email: github-actions[bot]@users.noreply.github.com
          commit_message: "deploy: ${{ github.event.head_commit.message }}"
          force_orphan: true   # 每次部署都是单 commit,gh-pages 分支历史干净
```

**关键点解释**:
- `force_orphan: true` — 每次部署创建一个无父节点的 commit,`gh-pages` 分支历史永远只有 1 个 commit,体积最小、浏览历史最干净
- `permissions: contents: write` — Action 需要写权限推送到 `gh-pages`
- `secrets.GITHUB_TOKEN` — 由 GitHub 自动注入,无需额外配置 secret
- **不** 复制 `归档.zip`、`.trae/`、`*.md`、`SKILL.md`、`references/`、`skills/`、`DESIGN.md`、`README*.md`

---

### Step 3 · 用户在 GitHub 网页上手动启用 Pages(一次性)

> 这步必须在 GitHub 网页完成,CLI 无法代为操作。

1. 打开 `https://github.com/monkren-ai/monkren-designer/settings/pages`
2. **Source**: 选 `Deploy from a branch`
3. **Branch**: 选 `gh-pages` / `(root)`
4. **Save**

首次提交后,GitHub 会在 1-2 分钟内分配 URL:
**`https://monkren-ai.github.io/monkren-designer/`**

---

### Step 4 · 更新 `README.md` 顶部(可选,推荐)

在 `[快速开始](#快速开始) · [双重身份](#双重身份) · ...` 链接块前增加一行:

```markdown
🌐 **在线预览**: <https://monkren-ai.github.io/monkren-designer/>
```

并新增一个 badge:

```markdown
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://monkren-ai.github.io/monkren-designer/)
```

`README.en.md` 做对应英文版本修改。

---

### Step 5 · 提交并推送

```bash
cd "/Users/ruishengzhang/Documents/GitHub/monkren designer"

# 检查改动
git status

# 暂存
git add .gitignore .github/workflows/deploy-pages.yml README.md README.en.md

# 提交(用户授权后才执行)
git commit -m "chore: 启用 GitHub Pages 自动部署

- 新增 .github/workflows/deploy-pages.yml
  - main push → peaceiris/actions-gh-pages → gh-pages 分支
  - force_orphan 模式,只保留单 commit
- 新增 .gitignore 挡掉 .DS_Store / 归档.zip / .trae/ 等
- README 顶部新增在线预览链接"

# 推送触发首次部署
git push origin main
```

---

## Phase 4 · 验证清单

部署完成后,逐项打勾:

- [ ] GitHub `Settings → Pages` 显示 `Your site is live at https://monkren-ai.github.io/monkren-designer/`
- [ ] 访问该 URL,首页正常加载(黑底白字、品牌字体、80 张哲学图都显示)
- [ ] 浏览器 DevTools → Network:没有 404(主页自身资源)
- [ ] 已知问题:**21 个 case 链接会 404**(因为 `index.html` 引用 24 个 case,但 `case/` 只有 3 个文件),不算本次问题,后续单独修
- [ ] `gh-pages` 分支只含:`index.html` / `assets/` / `case/` / `LICENSE` / `.nojekyll`,**不含** `归档.zip`、`.DS_Store`、`.md`、`SKILL.md`、`references/`、`skills/`、`.trae/`
- [ ] README 顶部能看到 `https://monkren-ai.github.io/monkren-designer/` 链接
- [ ] 后续每次 push 到 main,1-2 分钟后自动部署(可在 Actions tab 看到 deploy 任务)

---

## Assumptions & Decisions

| 决策 | 原因 |
|---|---|
| 用 **peaceiris/actions-gh-pages v4** 而非手动双分支 | 用户已同意"传统 gh-pages";此 Action 是该模式的事实标准,免手动同步 |
| `force_orphan: true` | gh-pages 历史保持单 commit,体积最小,避免历史大 |
| **不**用 `actions/deploy-pages` 官方新版 | 用户明确选"gh-pages 分支"路线;新版需先切换 Pages 源到 GitHub Actions,与该选择冲突 |
| `case/` 复制完整目录 | 三个文件都不到 25KB,体积可忽略;且 `index.html` 已引用,缺失会 404 |
| 不复制 `*.md` | 文档只在仓库内有意义,部署到 Pages 反而冗余;日后可在 Pages 上加链接回 GitHub |
| 不复制 `DESIGN.md` / `LICENSE` 中的版权声明 | 版权信息加在 README,无需暴露在 Pages 根(若想暴露 LICENSE,可把 Step 2 里 `cp LICENSE public/` 保留——已保留) |
| 自定义域名 **延后** | 用户明确选"先默认";后续若要,加 `public/CNAME` + 在仓库 Settings → Pages → Custom domain 填写即可 |
| 21 个缺失 case 文件 **不** 在本次范围 | 这是数据完整性问题,不属于"启用 Pages";后续单开一个 plan 处理 |

---

## 不做的事(明确范围)

- ❌ 不修改 `index.html` 任何代码
- ❌ 不动 `case/` 里现存的 3 个文件
- ❌ 不绑定自定义域名 / 不加 CNAME 文件
- ❌ 不补 21 个缺失的 case 文件
- ❌ 不加 404 页面(若需要,可后续单开 plan,在 `public/404.html` 即可)
- ❌ 不动 `references/` / `skills/` / `DESIGN.md` / `SKILL.md`
- ❌ 不引入 `package.json` / 不装 npm 依赖(peaceiris action 是零依赖)

---

## 风险 & 回滚

| 风险 | 缓解 |
|---|---|
| 首次 push 后 Pages 没生效 | 等 5 分钟;`Settings → Pages` 重新保存一次;检查 Actions tab 是否有报错 |
| `force_orphan` 误删 gh-pages 历史 | 反正该分支只用于部署,无重要历史,可接受 |
| 用户仓库是 private | private 仓库的 GitHub Pages 需要 GitHub Pro/Team/Enterprise,确认仓库可见性 |
| 单 commit 体积大(80 张图 ≈ 20MB) | `force_orphan` 每次都是单 commit,历史只保留 1 个,不会累积 |
| peaceiris 维护节奏放缓 | 已是 v4 稳定版多年;若担心,改用 `actions/checkout` + 手写 git push 也可,只是多 5 行 |

回滚:在 `Settings → Pages` 把 source 改回 `None`,然后 `git push origin --delete gh-pages` 即可。
