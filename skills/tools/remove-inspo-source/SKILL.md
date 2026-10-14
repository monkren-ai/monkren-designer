---
name: remove-inspo-source
description: 从 `~/.lazyweb/libraries.json` 中移除已登记的外部设计灵感源。用于删除、断开或清理 Mobbin、Savee、Dribbble、Behance 等来源；只修改用户明确指定的条目。
---

# 移除灵感源

1. 读取 `~/.lazyweb/libraries.json`；不存在或列表为空时说明没有已登记来源。
2. 用户未指定名称时显示简短列表并询问。用户已明确指定名称时无需再次确认；多个匹配时才澄清。
3. 配置损坏时停止写入并说明；配置有效时移除匹配条目并保留其余 JSON 结构。默认保留空的 `libraries` 数组，不删除整个文件。
4. 报告已移除的名称；不要声称这会撤销第三方网站账户授权或清除浏览器 cookie。

写入用户目录需要当前环境允许；权限受限时，给出建议修改内容，不绕过沙箱。
