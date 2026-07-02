<sub><b>🌐 English</b> · <a href="README.md">中文</a></sub>

<div align="center">

# Monkren Design

> *"Submit your design, get a professional review report back."*
> *「提交设计，拿回一份专业审查报告。」*

[![License](https://img.shields.io/badge/License-Personal%20Use%20Only-orange.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-blueviolet)](https://skills.sh)
[![Skills](https://img.shields.io/badge/skills.sh-Compatible-green)](https://skills.sh)

<br>

**Submit your design to your agent — get back an actionable review report.**

<br>

3 minutes — you get a **5-dimension design critique**, a **hardcoded value detection report**, a **design system compliance check**. Not vague "looks good" feedback — every issue comes with specific values and fix suggestions.

```
npx skills add monkren/monkren-design
```

Works across agents — Claude Code, Cursor, Codex, OpenClaw, Hermes all supported.

[Install](#install) · [What it does](#what-it-does) · [Core Mechanics](#core-mechanics)

> 📖 **Note for English readers**: this skill is built by a Chinese-speaking developer. The agent prompt framework (`SKILL.md`, `references/*.md`) is written in Chinese, but the **agent itself is bilingual** — it accepts English tasks, prompts, and design submissions without any setup. You can ask "review this design" in English and get a full English report back.

</div>

---

## Install

```bash
npx skills add monkren/monkren-design
```

Then just talk to Claude Code:

```
"Quick review this design" — 5-dimension score + hardcode detection, quick report
"Deep review this project" — All dimensions + all checks, full report
"Full-flow review the entire App" — Traverse all pages + deep review
"Detect hardcoded colors and spacing values in this code"
"Does this page violate our design system?"
"Recommend 3 design directions for an AI product"
"Generate SwiftLint rules to detect hardcoded design values"
```

No buttons, no panels. Conversation = review.

---

## What it does

| Capability | Deliverable | Typical time |
|---|---|---|
| Trigger command system | Quick review / Deep review / Full-flow review / Hardcode detection / Compliance check / Design suggestion / SwiftLint rules — 7 commands | per command |
| Page traversal review | Multi-page project auto-discovery + per-page review + cross-page consistency check + traversal summary table | with review |
| 5-dimension design critique | Philosophy / hierarchy / craft / functionality / originality — each 0–10 + Keep/Fix/Quick Wins | 3 min |
| Hardcoded value detection | Color / font / spacing hardcoded list + replacement suggestions | 2 min |
| Design system compliance check | Component usage / brand asset / token reference compliance report | 3 min |
| Brand asset protocol review | Whether real brand assets are used (not CSS silhouettes / SVG hand-drawn) | 2 min |
| Anti AI-slop check | Purple gradient / emoji / rounded border accent slop list | 1 min |
| Design direction advisor | 12-dimension project profile + 10 schools × 40 philosophies · 3 differentiated directions + 8-field output + actionable concept pack | 3 min |
| Actionable concept pack | Token / component / layout / motion / Checklist executable guidance | with direction |
| Philosophy gene recombination | Counter-consensus direction divergence + gradient (conservative → radical) evolution | with direction |
| Page type × design pattern library | Landing / Dashboard / Form / Detail / List patterns | with direction |
| SwiftLint rules | Custom rules for detecting hardcoded fonts / spacing / color values | 2 min |
| SVG radar chart report | 5-dimension score radar chart + rating + evidence paragraphs | with review |
| Scoring discipline | No inflation / no averaging up / must cite evidence / low originality OK | with review |
| Brand asset extraction protocol | 5-step systematic extraction + failure handling | 2 min |
| Artifact structure check | HTML integrity / CSS token consistency / accessibility baseline | 2 min |
| Issue severity classification | P0 blocking / P1 important / P2 optimize (maps to ⚠️/⚡/💡) | with review |
| Self-check iteration | Pre-delivery report self-check + iterative correction | 1 min |
| Design system baseline | DESIGN.md 9-segment framework (color/typography/spacing/layout/components/motion/voice/brand/anti-patterns) | with review |

---

## Core Mechanics

### 5-Dimension Critique System

The core framework for design review, each dimension scored 0–10:

| Dimension | What it checks | High-score standard |
|---|---|---|
| Philosophy alignment | Does the design embody a clear visual philosophy? | Every detail has philosophical grounding |
| Visual hierarchy | Does the user's eye flow naturally? | Squint test still reveals clear levels |
| Craft quality | Are alignment / spacing / colors pixel-perfect? | Unified spacing system, ≤3–4 colors |
| Functionality | Does every element serve the goal? | Removing any element would weaken the design |
| Originality | Are clichés avoided? | "Unexpected but logical" design decisions |

### Hardcoded Value Detection

Auto-scans code for three categories of hardcoded issues:

| Type | Detection target | Fix suggestion |
|---|---|---|
| Colors | `#xxxxxx`, `rgb()`, `hsl()` written directly | Replace with `var(--color-*)` design tokens |
| Fonts | `font-family` direct declarations | Replace with `var(--font-*)` font tokens |
| Spacing | Non-4/8-multiple spacing values | Replace with `var(--space-*)` spacing tokens |

### Design System Compliance Check

Reviews whether code follows design system conventions:

- **Component compliance**: Are PrimaryButton / SecondaryButton etc. used instead of custom implementations?
- **Brand asset compliance**: Are real logos / product shots / UI screenshots used, not CSS silhouettes / SVG hand-drawn substitutes?
- **Token compliance**: Are colors / fonts / spacing referenced via CSS variables, not hardcoded?

### Design Direction Advisor

When users need design direction guidance:

- Recommend 3 differentiated directions from 10 schools × 40 philosophies, each **from a different school**
- Each direction includes designer/studio name, signature visual traits, gestalt keywords
- Schools covered: Information Architecture / Kinetic Poetry / Minimalism / Experimental Avant-garde / Eastern Philosophy / Brutalist Growth / Postmodern Carnival / Organic Biomimetic / Retro-Futurism / Maximalism

### Anti AI-slop Rules

Detect the visual common denominator of AI output:

| Avoid | Use instead |
|---|---|
| Purple gradients, invented colors | Brand colors / oklch-defined harmonious colors |
| Emoji as icons | Real icon libraries or honest placeholders |
| Rounded cards + left border accent | Honest boundaries / dividers |
| SVG-drawn people and objects | Real assets or placeholders |
| Inter/Roboto as display | Distinctive display + body font pairing |
| Fabricated stats/quotes as decoration | Whitespace, or ask user for real content |

### SVG Radar Chart Report

Review reports include an inline SVG radar chart with 5 axes for 5 dimensions. The filled area visually shows score distribution — weak dimensions are immediately visible (concave areas), no need to read scores one by one.

### Scoring Discipline

4 iron rules ensuring objective scoring:
- **No score inflation**: Self-check triggered when all dimensions ≥ 7
- **No averaging up**: Score reflects worst sustained segment, not average
- **Must cite evidence**: Must reference specific elements / class names / line numbers
- **Low originality is OK**: 5/10 is reasonable for production deliverables

### Issue Severity Classification

| Level | Mark | Meaning |
|-------|------|---------|
| P0 | ⚠️ Fatal | Blocking issue, must fix before release |
| P1 | ⚡ Important | Affects UX/consistency, fix next iteration |
| P2 | 💡 Optimize | Nice-to-have, improve when time allows |

### Design System Baseline

Uses DESIGN.md 9-segment framework as review baseline: color / typography / spacing / layout / components / motion / voice / brand / anti-patterns. When a design system exists, compare segment by segment and flag deviations. When none exists, use the framework as baseline.

---

## Review Workflow

```
Discovery (incl. trigger command identification) → Understand target → [Page traversal] → Extract context → Brand asset extraction → [Reference search] → Execute review → Output report → [Persist + score improvement] → Self-check iteration
```

0. **Discovery** (incl. trigger command identification): Confirm trigger command / input format / design type / review scope / focus area. Refuse to guess when the brief is vague
1. **Understand review target**: What are we reviewing — screenshot / HTML / code / Figma? Whole or partial?
1.5. **Page traversal** (full-flow review): Discover all pages → per-page review → cross-page consistency check
2. **Extract design context**: Design system? Brand guidelines? Read code to extract tokens / components / brand assets
3. **Brand asset extraction**: 5-step systematic extraction (locate → download → extract colors → write brand-spec → confirm)
3.5. **Reference search** (conditional): Lazyweb reference screenshots (optional)
4. **Execute review**: 5-dimension critique + multi-perspective review + platform-specific review + hardcoded detection + compliance check + UX review + user flow review + feature journey review + UI design review + feature presentation review + anti-slop check + artifact structure check + accessibility check
5. **Output report**: Three-layer progressive report (conclusion + diagnosis + action) or design suggestion report
5.5. **Persist + score improvement**: Save report as .md + .html + generate score improvement suggestion document
6. **Self-check iteration**: Score-description consistency + Fix actionability + contradiction check. Never ship a flawed report

---

## Repository Structure

```
monkren-design/
├── SKILL.md                 # Main doc (agent entry point)
├── README.md                # Chinese README (default)
├── README.en.md             # English README (this file)
├── DESIGN.md                # Monkren project design system
├── index.html               # Landing page
├── case/                    # Visual reference samples (review report / score improvement / design suggestion HTML examples)
│   ├── Design Review — Landing Page.html
│   ├── Score Improvement — Landing Page.html
│   └── Design Suggestion — Landing Page.html
├── skills/                  # Sub-skill modules
│   ├── add-inspo-source/
│   ├── design-brainstorm/
│   ├── design-improve/
│   ├── design-research/
│   ├── quick-references/
│   ├── remove-inspo-source/
│   └── visual-taste-lab/
└── references/              # Drill-down docs by three layers (Chinese)
    ├── philosophy.md        # Belief Layer: 40 philosophies + 12-dim project profile + 8-field output + 5 iron rules + Demo spec
    ├── aesthetics.md        # Standards Layer (Aesthetics): 5 dimensions + slop blacklist + scoring discipline + copy/icon rules
    ├── design-system.md     # Standards Layer (System): 9-segment framework + hardcoded detection + compliance + SwiftLint + Token architecture
    ├── implementation.md    # Execution Layer: workflow + report template + persistence + self-check + review examples
    ├── platform-guides.md   # Platform guides: mobile / desktop / web / PPT / illustration / character IP
    ├── review-perspectives.md # Multi-perspective review: 10 perspectives (visual / interaction / brand / a11y / conversion / UX / flow / journey / UI / feature presentation)
    └── lazyweb-integration.md # Lazyweb integration: real product screenshots as evidence + Prompt engineering
```

---

## License · Usage Rights

**Personal use is free and unrestricted** — studying, research, creating things for yourself, writing articles, side projects, personal social media. Use it freely, no need to ask.

**Enterprise / commercial use is restricted** — any company, team, or for-profit organization integrating this skill into a product, external service, or client deliverable **must obtain authorization from the author first**. Including but not limited to:
- Using the skill as part of internal company tooling
- Using skill outputs as the primary review method for external deliverables
- Building a commercial product on top of the skill
- Using it in paid client projects

**Commercial licensing contact**: any of the social platforms below.

---

## Connect · Monkren

| Platform | Link |
|---|---|
| GitHub | https://github.com/monkren |
