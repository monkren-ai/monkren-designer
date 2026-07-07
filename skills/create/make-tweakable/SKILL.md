---
name: make-tweakable
description: |
  实时调整面板制作。7 个 phase 覆盖可调参数识别/host 协议/控件选型/默认值加载/实时联动/导出/持久化，输出带 slider/input/toggle 的控制面板。触发词：「tweakable」「调整面板」「实时调参」「control panel」「参数面板」。
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - WebSearch
  - AskUserQuestion
---

# Make Tweakable：在设计中加入 tweak 控件

在一个完成的设计上加一个浮动控制面板，让用户实时调整选定维度——颜色、字体、间距、文案、布局变体、feature flag。当用户想「玩几个方案」「看不同版本」或对比视觉选择时使用。**一个文件，多种变体**——不要散落 v1.html / v2.html / v3.html。

## Phase 1：识别哪些应该 tweakable

与用户确认——或主动提出再核对——暴露哪些维度：颜色（主色、强调色、背景调性）、字体（字族、基准字号、缩放比）、密度（紧 / 正常 / 松）、布局变体、组件变体（实心 / ghost button、card 处理）、文案（headline、subhead、CTA 文本）、feature flag（显示 / 隐藏区块）。

**保持 tweak 面小**——3–8 个控件。几个有意义的探索轴，而不是一个 Figma 克隆。如果用户没要 tweak 但设计有明显的变化轴，默认加 1–2 个，把有意思的可能性露出来。

## Phase 2：设计 tweak 面板

面板生活在 prototype 内部，浮动（通常右下角），半透明带细边框，标题为 **"Tweaks"** 以匹配工具栏 toggle。按值类型选对控件：颜色用颜色选择器；字体和变体用 dropdown 或 button 组；数字用有合理 min/max 的 slider；布尔用 toggle；文案用文本 input。控件保持紧凑——窄的纵向堆叠好过摊开的面板。

## Phase 3：接通实时更新

视觉 token 用 CSS custom property，这样所有引用它的地方都跟着更新：

```js
document.documentElement.style.setProperty('--tweak-primary', newColor);
```

对非 CSS 值（文案、布局变体、feature flag），用 JS state 配合 re-render 或 DOM 操作。

## Phase 4：实现 host 协议

host 环境通过工具栏 toggle 暴露 tweak 面板。**顺序很重要**——如果在 listener 还不存在时就宣布可用，host 的激活消息就落空，toggle 静默失效：

1. **先在 `window` 上注册 `message` listener：**
   - `{type: '__activate_edit_mode'}` → 显示 Tweaks 面板
   - `{type: '__deactivate_edit_mode'}` → 隐藏它
2. **然后宣布可用：**
   ```js
   window.parent.postMessage({type: '__edit_mode_available'}, '*')
   ```
3. **值变更时持久化**，回传（部分更新可以——只合并包含的 key）：
   ```js
   window.parent.postMessage({type: '__edit_mode_set_keys', edits: {primaryColor: '#FF6600'}}, '*')
   ```

## Phase 5：把默认值持久化到磁盘

把 tweakable 默认值包在注释标记里，方便 host 改写：

```js
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#D97757",
  "fontSize": 16,
  "dark": false
}/*EDITMODE-END*/;
```

标记之间的块**必须是合法 JSON**（双引号 key 和字符串），且只能有这样一个块，位于根 HTML 文件的 inline `<script>` 内。host 把编辑合并进去并写回文件，这样变更能活过刷新。

## Phase 6：关闭时隐藏控件

Tweaks 关闭时，面板完全隐藏——不是变暗，不是收到角落。这点不可妥协：任何可见的 edit-mode chrome 都会让设计显得没做完。

## Phase 7：Verify 与总结

在 preview 里：通过工具栏 toggle 面板开 / 关；改每个 tweak 并确认实时更新；刷新并确认值持久；检查面板关闭时设计读起来像个完成品。

总结：暴露的 tweak 及其值类型、默认值、考虑过但排除的 tweak（以及为什么）、这一组是否覆盖了用户的探索轴。
