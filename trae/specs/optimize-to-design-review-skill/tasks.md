# Tasks

- [x] Task 1: 重写 SKILL.md 为纯设计审查技能
  - [x] SubTask 1.1: 重写 SKILL.md 的 frontmatter（name/description/触发词），定位为设计审查技能
  - [x] SubTask 1.2: 重写核心身份——从"用 HTML 工作的设计师"变为"设计审查专家"
  - [x] SubTask 1.3: 保留并精简核心原则——事实验证先于假设、反 AI slop、品牌资产协议（审查视角）
  - [x] SubTask 1.4: 保留设计哲学（20 种风格库）和设计方向顾问能力
  - [x] SubTask 1.5: 新增设计审查工作流——理解审查对象→提取设计上下文→执行审查→输出报告
  - [x] SubTask 1.6: 新增硬编码值检测规则（颜色/字体/间距）
  - [x] SubTask 1.7: 新增设计系统合规性检查规则
  - [x] SubTask 1.8: 新增 SwiftLint 规则建议章节
  - [x] SubTask 1.9: 移除所有创作性内容（原型制作/幻灯片/动画/视频/SFX/Tweaks/Starter Components/技术红线等）
  - [x] SubTask 1.10: 更新 References 路由表，仅保留审查相关引用

- [x] Task 2: 删除创作性 assets 文件
  - [x] SubTask 2.1: 删除 assets/animations.jsx
  - [x] SubTask 2.2: 删除 assets/ios_frame.jsx
  - [x] SubTask 2.3: 删除 assets/android_frame.jsx
  - [x] SubTask 2.4: 删除 assets/macos_window.jsx
  - [x] SubTask 2.5: 删除 assets/browser_window.jsx
  - [x] SubTask 2.6: 删除 assets/deck_stage.js
  - [x] SubTask 2.7: 删除 assets/deck_index.html
  - [x] SubTask 2.8: 删除 assets/design_canvas.jsx
  - [x] SubTask 2.9: 删除 assets/sfx/ 整个目录
  - [x] SubTask 2.10: 删除 assets/bgm-*.mp3 所有背景音乐文件
  - [x] SubTask 2.11: 删除 assets/personal-asset-index.example.json

- [x] Task 3: 删除创作性 scripts 文件
  - [x] SubTask 3.1: 删除 scripts/render-video.js
  - [x] SubTask 3.2: 删除 scripts/convert-formats.sh
  - [x] SubTask 3.3: 删除 scripts/add-music.sh
  - [x] SubTask 3.4: 删除 scripts/export_deck_pdf.mjs
  - [x] SubTask 3.5: 删除 scripts/export_deck_pptx.mjs
  - [x] SubTask 3.6: 删除 scripts/export_deck_stage_pdf.mjs
  - [x] SubTask 3.7: 删除 scripts/html2pptx.js
  - [x] SubTask 3.8: 删除 scripts/verify.py（审查技能不需要 Playwright 验证脚本）

- [x] Task 4: 删除创作性 references 文件
  - [x] SubTask 4.1: 删除 references/animation-pitfalls.md
  - [x] SubTask 4.2: 删除 references/animations.md
  - [x] SubTask 4.3: 删除 references/react-setup.md
  - [x] SubTask 4.4: 删除 references/slide-decks.md
  - [x] SubTask 4.5: 删除 references/editable-pptx.md
  - [x] SubTask 4.6: 删除 references/video-export.md
  - [x] SubTask 4.7: 删除 references/sfx-library.md
  - [x] SubTask 4.8: 删除 references/audio-design-rules.md
  - [x] SubTask 4.9: 删除 references/tweaks-system.md
  - [x] SubTask 4.10: 删除 references/scene-templates.md
  - [x] SubTask 4.11: 删除 references/apple-gallery-showcase.md
  - [x] SubTask 4.12: 删除 references/hero-animation-case-study.md
  - [x] SubTask 4.13: 删除 references/animation-best-practices.md（额外发现）
  - [x] SubTask 4.14: 删除 references/cinematic-patterns.md（额外发现）

- [x] Task 5: 精简保留的 references 文件
  - [x] SubTask 5.1: 精简 references/workflow.md——从创作工作流改为审查工作流
  - [x] SubTask 5.2: 精简 references/verification.md——从 Playwright 截图验证改为设计审查验证
  - [x] SubTask 5.3: 保留 references/critique-guide.md 不变
  - [x] SubTask 5.4: 保留 references/design-styles.md 不变
  - [x] SubTask 5.5: 保留 references/design-context.md 不变
  - [x] SubTask 5.6: 保留 references/content-guidelines.md 不变

- [x] Task 6: 删除 demos/ 目录

- [x] Task 7: 删除 assets/showcases/ 目录（创作性预制样例）

- [x] Task 8: 更新 README.md 和 README.en.md 反映新的技能定位
  - [x] SubTask 8.1: 重写 README.md 标题和介绍——从"一体化设计能力"变为"设计审查技能"
  - [x] SubTask 8.2: 更新能力列表——仅保留审查相关能力
  - [x] SubTask 8.3: 更新仓库结构说明
  - [x] SubTask 8.4: 移除 Demo 画廊中的创作性演示
  - [x] SubTask 8.5: 重写 README.en.md 为设计审查定位

- [x] Task 9: 清理额外发现的创作性残留文件
  - [x] SubTask 9.1: 删除 test-prompts.json（创作性测试提示）
  - [x] SubTask 9.2: 修复 SKILL.md 中对已删除 scripts/verify.py 的引用

# Task Dependencies

- Task 1 依赖对现有 SKILL.md 的完整理解（已完成阅读）
- Task 2-7 可并行执行（均为文件删除操作）
- Task 5 依赖 Task 4（先删除再精简保留文件）
- Task 8 依赖 Task 1-7 全部完成（README 需反映最终状态）
- Task 9 在验证阶段发现，独立修复
