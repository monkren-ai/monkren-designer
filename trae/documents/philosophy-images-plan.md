# 哲学库图片示例补充计划

## 目标

为 `index.html` 中哲学库区块的 40 种设计哲学卡片添加对应的视觉图片示例，让访客能直观理解每种设计哲学的视觉风格。

## 当前状态分析

### 哲学卡片结构（现有）

```html
<div class="philosophy-card">
  <h4>Pentagram — Michael Bierut</h4>
  <span class="genre">信息建筑派</span>
  <p>极度克制的颜色，瑞士网格，字体排印作为主要视觉语言，60%+ 留白。</p>
  <span class="path">→ HTML</span>
</div>
```

### 数据来源

每个哲学的详细信息在 `references/philosophy.md` 中，包含：
- **提示词DNA**：详细的风格描述（可直接作为图片生成 prompt）
- **参考色板**：OKLch 色彩值
- **代表作**：真实项目名称
- **搜索关键词**：可用于验证风格

### 图片生成规范

根据图片指南，必须使用：
```
https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt={prompt}&image_size={image_size}
```

可用尺寸：`square_hd | square | portrait_4_3 | portrait_16_9 | landscape_4_3 | landscape_16_9`

## 实施策略

### 方案选择

**方案 A：每张卡片顶部添加小图（推荐）**

在每个 `philosophy-card` 顶部添加一张正方形小图（1:1），尺寸 `square`，约 300x300px，作为视觉预览。

**方案 B：流派头部大图**

在每个流派（school-block）头部添加一张大图，展示该流派的代表性视觉风格，而不是每个哲学单独配图。

**选择方案 A**：理由是 40 种哲学各有独特特征，单独配图能让访客快速区分，且卡片布局更完整。

### 图片生成策略

1. **从 philosophy.md 提取提示词**：使用每种哲学的「提示词DNA」部分作为图片生成 prompt
2. **优化 prompt**：去掉代码格式标记，保留核心视觉描述，加上 `minimal, flat design, high quality, professional` 等修饰词
3. **选择尺寸**：`square`（正方形，适合卡片顶部展示）
4. **统一风格**：所有图片保持一致的视觉质量和构图风格

### 布局调整

当前 `.philosophy-card` CSS：
```css
.philosophy-card {
  border: var(--border-width) solid var(--color-arctic-white);
  border-radius: 0;
  padding: var(--spacing-20);
  background: var(--color-canvas-black);
}
```

需要调整为：
- 添加图片容器 `.philosophy-card .img-wrap`
- 设置图片宽度 100%，高度自适应
- 保持零圆角设计系统规范

## 文件修改

| 文件 | 改动类型 | 内容 |
|------|---------|------|
| `index.html` | 修改 | 为 40 个 `philosophy-card` 添加 `<img>` 标签 |
| `index.html` | 修改 | 添加 `.philosophy-card .img-wrap` 和 `.philosophy-card img` CSS 样式 |

## 40 种哲学图片生成列表

### 一、信息建筑派（01-04）

| # | 哲学名 | Prompt 关键词 |
|---|--------|-------------|
| 01 | Pentagram — Michael Bierut | Swiss grid, Helvetica typography, black and white, 60% whitespace, information architecture |
| 02 | Stamen Design — 数据诗学 | Cartographic data visualization, warm terracotta and sage green, organic patterns, topographic maps |
| 03 | Information Architects | Content-first hierarchy, system fonts, classic blue hyperlinks, reading optimized layout |
| 04 | Fathom — 科学叙事 | Scientific journal aesthetic, precise data charts, neutral grays and navy, clean sans-serif |

### 二、运动诗学派（05-08）

| # | 哲学名 | Prompt 关键词 |
|---|--------|-------------|
| 05 | Locomotive — 滚动叙事 | Film-like parallax, dark backgrounds, bold typography emerging from darkness, smooth motion |
| 06 | Active Theory — WebGL | Particle systems, neon gradients cyan magenta, 3D depth space, mouse-reactive environment |
| 07 | Field.io — 算法美学 | Abstract geometric patterns, algorithmically generated, mathematical precision, monochromatic with vibrant accent |
| 08 | Resn — 叙事交互 | Illustrative style mixed with UI, gamified exploration, warm colors, scroll-triggered animations |

### 三、极简主义派（09-12）

| # | 哲学名 | Prompt 关键词 |
|---|--------|-------------|
| 09 | Experimental Jetset | Conceptual minimalism, Mondrian composition, anti-commercial, bold typographic statements |
| 10 | Müller-Brockmann — 瑞士网格 | Mathematical 8pt grid, absolute alignment, monochrome or two-color, functionalism |
| 11 | Build in Amsterdam | Bold contrast, dark canvas, oversized typography, anti-decoration |
| 12 | Sagmeister & Walsh | Emotional typography, embroidery meets photography, emotional minimalism |

### 四、实验先锋派（13-16）

| # | 哲学名 | Prompt 关键词 |
|---|--------|-------------|
| 13 | Zach Lieberman — 代码诗学 | Hand-drawn algorithmic graphics, real-time generative art, pure black and white |
| 14 | Raven Kwok — 算法美学 | Code-generated abstract art, mechanical meets organic, computational design |
| 15 | Ash Thorp | Cinematic visuals, cyberpunk aesthetics, immersive narrative design |
| 16 | Territory Studio | Sci-fi interface design, HUD aesthetics, film UI, futuristic controls |

### 五、东方哲学派（17-20）

| # | 哲学名 | Prompt 关键词 |
|---|--------|-------------|
| 17 | Takram | Japanese engineering design, simplicity meets function, minimal industrial |
| 18 | Kenya Hara — 白 | Extreme whitespace 80%, paper texture digitalized, white layers, tactile visualization |
| 19 | Irma Boom | Books as sculpture, material expression, tactile design |
| 20 | Naoto Fukasawa | Unconscious design, objects naturally fitting behavior, subtle beauty |

### 六、野蛮生长派（21-24）

| # | 哲学名 | Prompt 关键词 |
|---|--------|-------------|
| 21 | Pascal Devoyre — 裸露真实 | Naked HTML structure, system fonts, zero decoration, zero rounded corners |
| 22 | Michele Mazzini | Pragmatic minimalism, transparent materials, function as form |
| 23 | Bloomberg Businessweek | Magazine design commercial minimal, cover narrative, data typography |
| 24 | Lotta Nieminen | Illustration meets layout, geometric and color restraint, poetic composition |

### 七、后现代狂欢派（25-28）

| # | 哲学名 | Prompt 关键词 |
|---|--------|-------------|
| 25 | Ettore Sottsass — 孟菲斯 | Memphis movement, color celebration, geometric pop mix, playful bold |
| 26 | Camille Walala | Bold geometric patterns, vibrant colors, urban scale visuals |
| 27 | Morag Myerscough | Large-scale installations, color and structure celebration |
| 28 | Studio Moross | Experimental typography, music visuals, anti-industrial industrial |

### 八、有机仿生派（29-32）

| # | 哲学名 | Prompt 关键词 |
|---|--------|-------------|
| 29 | Neri Oxman | Nature meets technology, parametric design, material ecology, organic forms |
| 30 | Ross Lovegrove | Organic morphologies, natural engineering logic, flowing forms |
| 31 | Daan Roosegaarde | Tech and light poetic interaction, future landscape design |
| 32 | Heatherwick Studio | Material innovation, tactile emotion, architectural installations |

### 九、复古未来派（33-36）

| # | 哲学名 | Prompt 关键词 |
|---|--------|-------------|
| 33 | Syd Mead | Futuristic vehicle design, cyber aesthetics foundation, Blade Runner visuals |
| 34 | Daniel Simon | Sci-fi transport industrial design, TRON Legacy visual language |
| 35 | Actual Source | Contemporary retro-futurism, metallic textures and geometry, hardware feel |
| 36 | Andrés Reisinger | Digital material poetry, rendered realism, metaverse aesthetics |

### 十、极繁主义派（37-40）

| # | 哲学名 | Prompt 关键词 |
|---|--------|-------------|
| 37 | David Carson | Rule-breaking typography, chaos within order, Ray Gun magazine style |
| 38 | Paula Scher | Type as image, color and typography dialogue, public visual loudness |
| 39 | Peter Saville | Post-punk visual culture, album cover design language |
| 40 | Kelly Wearstler | Interior to graphic, texture and color feast, material improvisation |

## 技术实现要点

1. **图片 URL 格式**：
```
https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt={url_encoded_prompt}&image_size=square
```

2. **CSS 样式新增**：
```css
.philosophy-card .img-wrap {
  width: 100%;
  margin-bottom: var(--spacing-13);
  border: var(--border-width) solid var(--color-arctic-white);
  border-radius: 0;
  overflow: hidden;
}
.philosophy-card img {
  width: 100%;
  height: auto;
  display: block;
}
```

3. **HTML 结构调整**：
```html
<div class="philosophy-card">
  <div class="img-wrap">
    <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=..." alt="Pentagram style visualization" loading="lazy">
  </div>
  <h4>Pentagram — Michael Bierut</h4>
  <span class="genre">信息建筑派</span>
  <p>...</p>
  <span class="path">→ HTML</span>
</div>
```

4. **响应式适配**：图片宽度 100%，自动适应卡片宽度，无需额外断点处理

## 实施步骤

1. **添加 CSS 样式**：在 `index.html` 的 `<style>` 中添加 `.philosophy-card .img-wrap` 和 `.philosophy-card img` 样式
2. **为 40 个哲学卡片添加图片**：逐个修改 `philosophy-card`，在 `h4` 之前插入 `<div class="img-wrap"><img></div>`
3. **验证图片加载**：本地预览确认图片能正常加载，检查布局是否符合设计系统
4. **优化加载性能**：确保所有图片添加 `loading="lazy"` 属性

## 风险与注意事项

1. **图片生成质量**：AI 生成的图片可能与实际风格有差异，部分哲学（如代码诗学、算法美学）可能难以用静态图片表达
2. **页面加载性能**：40 张图片同时加载可能影响首屏性能，使用 `loading="lazy"` 缓解
3. **设计系统一致性**：图片容器必须使用 1px 边框、零圆角，与现有卡片风格保持一致
4. **可访问性**：每张图片必须有 `alt` 属性描述视觉内容

## 不在范围

- 不修改 `references/philosophy.md`（图片仅用于展示，不修改参考文档）
- 不为其他区块（skills、case gallery、references）添加图片
- 不添加图片交互（hover 放大等），保持极简设计
