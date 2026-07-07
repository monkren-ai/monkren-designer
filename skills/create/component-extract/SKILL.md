---
name: component-extract
description: |
  组件清单提取。5 个 phase 覆盖组件扫描/分类（原子/分子/组织/模板/页面）/属性提取/变体记录/文档生成，从现有代码建立组件 inventory。触发词：「组件清单」「component extract」「组件提取」「component inventory」「组件梳理」。
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - WebSearch
  - AskUserQuestion
---

# Component Extract：从设计里识别可复用组件

走查一个设计，识别藏在里面的可复用组件；输出一份组件 inventory，用户可以据此做成组件库或 design system。当用户有完成的页面或流程，想「做成系统」「建组件库」或交付结构化零件时使用。

**页面是组件的排列。** 把它们提取出来，就把一堆一次性变成可维护的东西。

## Phase 1：识别范围

确定走查什么——单个设计文件、多页流程，或整个项目。读所有相关文件，建立对在用视觉语汇的心理模型。

## Phase 2：走查设计并 inventory

逐区块，对每个视觉元素问：

1. **这个确切模式是否出现不止一次？**
2. **它合理地可能出现在别处吗？**（card 样式、表单 input 或 header 即便现在只有一处，也很可能重复。）
3. **它有变体吗？**（button：primary / secondary / ghost。card：带图 / 不带图。）
4. **它有状态吗？**（hover、active、disabled、focus、loading。）

任一为是 → 组件候选。把 finding 归到标准类别：

- **基础**——颜色、间距、字体、圆角、阴影、动效 token（token 级细节见 `design-system-extract`）
- **原子**——button、input、checkbox / radio / toggle、select、tag / chip / badge、avatar、icon（尺寸 + 在用的集合）、link
- **分子**——form field（label + input + helper + error）、card、toast / alert、modal、dropdown menu、tooltip、pagination
- **组织**——header / nav、footer、sidebar、tab group、table、form、hero、feature grid、empty state
- **模板**——landing、detail、list / index、empty-state page

## Phase 3：每个组件，记录

- **名字**——短、惯例（如 `Button`、`FormField`）
- **用途**——一句话说何时用
- **变体**与**尺寸**
- **状态**——default、hover、active、focus、disabled、loading（适用的那些）
- **用到的 token**——引用了哪些颜色、间距、字体 token
- **组合**——由哪些其他组件构成（如 `Card` 用到 `Button`）
- **可访问性备注**——键盘支持、ARIA、对比度
- **Do / Don't**——至少各一条（如「不要连续堆两个 primary button」）

## Phase 4：识别缺口

把这些作为交付物的一部分标出来——它们是把设计变成真正系统要做的工作：

- **不一致**——三种略不同的 button 样式本应一种搞定；推荐一个 canonical 版本
- **缺失状态**——有 hover 没 focus、没有 disabled 态
- **缺失变体**——如设计里有删除操作但没有 destructive button
- **越界值**——超出既定 token scale 的间距或尺寸；对齐过去

## Phase 5：输出并交付

把 inventory 写到文件（如 `component-inventory.md`），每个组件一节，按上述结构——一份用户可以交给开发的文档。可选：渲染一个「组件库」页面，展示每个组件及其变体和状态（`design_canvas.jsx` starter 适合做网格）。

然后建议下一步：若还没做则 `design-system-extract` 提 token、把库做成真实代码、对组件做 `polish-pass`，或对库做 `make-tweakable`。总结：按类别 inventory 的组件、标出的不一致与缺口、输出文件路径、建议的下一步。
