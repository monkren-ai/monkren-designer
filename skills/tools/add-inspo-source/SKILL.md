---
name: add-inspo-source
description: 将 Mobbin、Savee、Dribbble、Behance、Awwwards 等外部灵感库登记为设计研究来源。用于添加、连接或重新认证灵感源；需要用户明确授权登录，并根据当前 agent 可用的浏览器能力执行。
---

# 添加灵感源

把外部设计资料库登记到 `~/.lazyweb/libraries.json`，供研究模块按需搜索。登记配置不等于永久保存登录态。

## 1. 收集来源

若用户未指定，询问名称、主页 URL 和搜索页 URL。常见来源：

| 来源 | 主页 | 搜索页 |
|---|---|---|
| Mobbin | `https://mobbin.com` | `https://mobbin.com/browse/ios/apps` |
| Savee | `https://savee.it` | `https://savee.it/search/` |
| Dribbble | `https://dribbble.com` | `https://dribbble.com/search` |
| Behance | `https://www.behance.net` | `https://www.behance.net/search/projects` |
| Awwwards | `https://www.awwwards.com` | `https://www.awwwards.com/websites` |

## 2. 检查现有配置

读取 `~/.lazyweb/libraries.json`；不存在时按 `{"libraries":[]}` 处理。已登记时询问是保留、更新 URL 还是重新认证。

## 3. 认证边界

- 优先使用当前 agent 已提供、且能复用用户登录状态的浏览器能力。
- 登录、OAuth、2FA 和 CAPTCHA 由用户完成；不要要求用户把密码、验证码或 cookie 发到对话中。
- 当前环境没有合适浏览器能力时，仍可登记公开来源；需要登录的来源则说明限制并停止认证步骤，不要求安装特定 agent 的私有工具。
- 只验证搜索页是否可访问，不抓取或保存凭据。

## 4. 保存配置

用户确认后，将以下结构合并写入 `~/.lazyweb/libraries.json`，保留其它来源：

```json
{
  "libraries": [
    {
      "name": "Mobbin",
      "url": "https://mobbin.com",
      "searchUrl": "https://mobbin.com/browse/ios/apps",
      "addedAt": "YYYY-MM-DD",
      "requiresLogin": true
    }
  ]
}
```

写入用户目录需要当前环境允许；权限受限时，向用户给出待写入 JSON，不绕过沙箱。

## 5. 交付

报告来源是否登记、搜索页是否验证、登录是否仍需用户处理，以及如何通过 `../remove-inspo-source/SKILL.md` 移除。不要声称浏览器会跨产品或永久保存会话。
