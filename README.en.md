<sub><b>🌐 English</b> · <a href="README.md">中文</a></sub>

> Current version: **v4.0** / 2026-07-07 / Architecture: **Four-Layer Knowledge Graph + Five-Stage Skill Matrix**

<div align="center">

# Monkren Design

> *"A design agent with two identities — a design critic and a design creator."*
> *「双重身份的设计智能体——既是设计审查员，也是设计创作者。」*

[![License](https://img.shields.io/badge/License-Personal%20Use%20Only-orange.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-blueviolet)](https://skills.sh)
[![Skills](https://img.shields.io/badge/skills.sh-Compatible-green)](https://skills.sh)

<br>

**Just talk to your agent: review a design, get directions, build a prototype.**

<br>

A cross-agent **21-skill design system** — **five-stage routing** (Discover → Define → Create → Review → Deliver) + **5 specialized review skills** (accessibility / anti-slop / hierarchy & rhythm / interaction states / polish orchestration) + a **9-reference** knowledge graph.

```
npx skills add monkren-ai/monkren-designer
```

Works across agents — Claude Code, Cursor, Codex, OpenClaw, Hermes all supported.

[Quick Start](#quick-start) · [Dual Identity](#dual-identity) · [Design Philosophy](#design-philosophy) · [Five-Stage Skill Matrix](#five-stage-skill-matrix) · [Core Mechanics](#core-mechanics) · [Workflows](#workflows) · [Repository Structure](#repository-structure)

> 📖 **Note for English readers**: this skill is built by a Chinese-speaking developer. The agent prompt framework (`SKILL.md`, `references/*.md`) is written in Chinese, but the **agent itself is bilingual** — it accepts English tasks, prompts, and design submissions without any setup. You can ask "review this design" in English and get a full English report back.

</div>

---

## Dual Identity

Monkren is a **design agent** — in the same conversation it can be both a critic and a creator. These two roles are not split; they are two sides of the same person:

| Role | You ask | It delivers |
|------|---------|-------------|
| **Critic** | "How does this design look?", "detect hardcoded values", "compliance check", "review this landing page" | 5-dimension critique + hardcoded detection + anti AI-slop + SVG radar chart + three-layer progressive report |
| **Creator** | "Make a wireframe", "build a prototype", "generate 3 variations", "extract tokens", "make a deck" | Lo-fi wireframe / interactive prototype / design variations / HTML slides / token & component inventory |

**Key difference**: not a "code generator that knows design", but a "designer who works in code".

> **Belief**: critique the design, not the designer. When creating, don't pile on templates. Every element must earn its place; no real data → placeholder > fabrication. → See [## Design Philosophy](#design-philosophy)

---

## Design Philosophy

Everything Monkren produces (review / creation / reports / demo) is grounded in an **explicit design philosophy** — **7 core beliefs** + **10 schools × 40 philosophies library** + **Monkren's own school affiliation**. This section is itself a sample of those principles in action: no bloat, no duplication, every paragraph earns its place.

### 7 Core Beliefs

| # | Belief | Meaning |
|---|--------|---------|
| 1 | **Start from existing context** | Good design always grows out of what's already there. Inventing hi-fi from scratch produces generic work. |
| 2 | **Anti AI-slop** | The visual "greatest common divisor" of AI training data = slop. Flag in reviews, avoid in creation. |
| 3 | **System first, no filler** | Every element must earn its place. An empty section is a layout problem — solve it with composition, not invented content. |
| 4 | **Placeholder > bad implementation** | An honest placeholder beats a poor real attempt by 10x. |
| 5 | **Brand = being recognized** | Recognition hierarchy: Logo > product photo > UI screenshot > color value > font. |
| 6 | **Quality > quantity** | 3 polished > 5 half-done; 1 strong choice > multiple safe choices. |
| 7 | **IP & content boundaries** | Don't replicate copyrighted designs; don't add scope unilaterally; don't fill space with filler. |

→ Full discussion: [`references/beliefs.md`](references/beliefs.md)

### 10 Schools × 40 Design Philosophies

The library catalogs 40 signature design languages, organized into 10 schools. When the user needs "**recommend a design direction**" or "**what style fits**", Monkren draws from here — **3 directions must come from different schools**:

| School | Representatives | Best for |
|--------|-----------------|----------|
| **Information Architecture** | Pentagram / Stamen / Fathom | safety / professional / data / reading choices |
| **Kinetic Poetry** | Locomotive / Active Theory / Field.io / Resn | immersive / digital / algorithmic / interactive choices |
| **Minimalism** | Experimental Jetset / Müller-Brockmann / Build / Sagmeister & Walsh | culture / system / luxury / experimental choices |
| **Experimental Avant-garde** | Zach Lieberman / Raven Kwok / Ash Thorp / Territory Studio | creative / parametric / cinematic / futurist choices |
| **Eastern Philosophy** | Takram / Kenya Hara / Irma Boom / Naoto Fukasawa | contemplative / whitespace / book / restraint choices |
| **Brutalist Growth** | Pascal Devoyre / Michele Mazzini / Bloomberg / Lotta Nieminen | rebellion / product / editorial / brand choices |
| **Postmodern Carnival** | Sottsass / Camille Walala / Morag Myerscough / Studio Moross | culture / space / community / pop choices |
| **Organic Biomimetic** | Neri Oxman / Ross Lovegrove / Daan Roosegaarde / Heatherwick | science / product / environment / architecture choices |
| **Retro-Futurism** | Syd Mead / Daniel Simon / Actual Source / Andrés Reisinger | classic / concept / trend / surreal choices |
| **Maximalism** | David Carson / Paula Scher / Peter Saville / Kelly Wearstler | rebellious / map / music / luxury choices |

→ Full library (philosophical core + signature features + prompt DNA + anti-pattern detection + improvement path): [`references/philosophy-library.md`](references/philosophy-library.md)

### Where Monkren Itself Sits

Monkren adopts **Graphic Monochrome Canvas** — an extreme extension of the **Minimalism** school. Rationale: Belief #1 (start from existing context) is best practiced as "let an existing design system grow", and Minimalism's Müller-Brockmann (Swiss grid) / Build (dark canvas) / Experimental Jetset (anti-commercial) are the purest samples of "context-first + geometric honesty". → See [`DESIGN.md`](DESIGN.md)

---

## Quick Start

```bash
npx skills add monkren-ai/monkren-designer
```

Then just talk to Claude Code:

**Review tasks**:
```
"Quick review this design" — 5-dimension score + hardcode detection, quick report
"Deep review this project" — All dimensions + all checks, full report
"Full-flow review the entire App" — Traverse all pages + deep review
"Detect hardcoded colors and spacing values in this code"
"Does this page violate our design system?"
```

**Creation tasks**:
```
"Help me make a wireframe to explore layouts"
"Build a clickable HTML prototype"
"Generate 3 design variations to compare"
"Extract design tokens from this codebase"
```

**Direction tasks**:
```
"Recommend 3 design directions for an AI product"
"I'm building a health app — what visual style should I pick?"
"This page feels generic — any counter-consensus directions?"
```

No buttons, no panels. Conversation = review. Conversation = creation.

---

## Five-Stage Skill Matrix

When a request arrives, Monkren first identifies the **stage** (Discover / Define / Create / Review / Deliver), then routes to the right skill. Each stage has its own dedicated skills + deep references.

### Discover (3 skills)

> User asks: "what do competitors do / best practices / how to start research"

| Skill | One-liner | Triggers |
|------|-----------|----------|
| `design-research` | Deep design research: Lazyweb screenshot DB + web research, produces structured report + downloaded reference screenshots | best practices / competitive analysis / research how others do |
| `quick-references` | Quickly find reference screenshots, grouped by pattern, downloaded locally | show me examples / how do other apps do / references for |
| `design-brainstorm` | Cross-pollination brainstorm: deliberately search domains nobody in your space is looking at | brainstorm / creative alternatives / think outside the box |

### Define (3 skills)

> User asks: "what style / aesthetic direction / what to ask at kickoff"

| Skill | One-liner | Triggers |
|------|-----------|----------|
| `discovery-questions` | Kickoff question protocol: 5 must-asks covering goal / users / constraints / brand / success criteria | kickoff / project start / discovery / requirements clarification |
| `frontend-aesthetic-direction` | Lock in aesthetic direction with no existing brand: 7-dimension commitment (color / type / spacing / container / image / motion / voice) | aesthetic direction / no brand / visual tone |
| `visual-taste-lab` | Distill a reusable design-language workflow from screenshots/URLs | better-looking UI / de-AI / visual direction |

### Create (8 skills)

> User asks: "make a wireframe / build a prototype / make slides / generate variations / extract"

| Skill | One-liner | Triggers |
|------|-----------|----------|
| `wireframe` | Lo-fi wireframe exploration: 5 phases, pure black-and-white to rapidly try layouts | wireframe / lo-fi / layout sketch |
| `make-a-prototype` | Interactive prototype: 7 phases, outputs a single-file HTML clickable prototype | prototype / interactive demo |
| `make-a-deck` | HTML slide deck: 6 phases, fullscreen in browser | deck / slides / HTML PPT |
| `make-tweakable` | Real-time tweak panel: sliders / inputs / toggles, host protocol for live linkage | tweakable / control panel / live parameter |
| `generate-variations` | Design variations: 3+ directions (conservative → balanced → bold) on the same brief | variations / multiple options / 3 options |
| `design-system-extract` | Token extraction from source files: color / type / spacing / radius / shadow / motion | extract tokens / design system extract |
| `component-extract` | Component inventory: 5-layer classification (atom → molecule → organism → template → page) | component inventory / component audit |
| `design-improve` | Screenshot + Lazyweb similar-search + concrete improvement ideas backed by real references | improve this design / design feedback / make this look better |

### Review (5 skills)

> User asks: "how does it look / detect / walkthrough / pre-delivery check"

| Skill | One-liner | Triggers |
|------|-----------|----------|
| `accessibility-audit` | 4 parallel agents: contrast / semantic HTML / keyboard nav / motion & forms | accessibility / a11y / WCAG |
| `ai-slop-check` | Detect 9 categories of AI-design traces (purple gradients / emoji / default left-border cards / hand-drawn SVG / generic fonts / etc.) | AI slop / de-AI / slop check |
| `hierarchy-rhythm-review` | 2 parallel agents: hierarchy (primary/secondary/tertiary + 5-second test) + rhythm | hierarchy / rhythm / visual hierarchy |
| `interaction-states-pass` | 6-state completeness check: default / hover / active / disabled / focus / loading | interaction states / state completeness |
| `polish-pass` | **Pre-delivery quality gate**: orchestrates 4 review agents, dedupes, prioritizes by blocker / quality / polish | polish / final check / quality gate |

### Deliver

> User asks: "produce report / generate demo / score improvement"

Driven by [`references/execution.md`](references/execution.md) — **4 report types** (full / quick / design suggestion / score improvement) + **three-layer progressive structure** (conclusion → diagnosis → action) + **SVG radar chart** + **Demo generation** (single-file HTML saved to `.monkren/demos/`).

### Tools (cross-cutting, 2 skills)

| Skill | Triggers |
|------|----------|
| `add-inspo-source` | Register an external inspiration source (Mobbin / Savee / Dribbble / Behance) as a first-class search source |
| `remove-inspo-source` | Disconnect a previously registered inspiration source |

> Full skill inventory + routing rules → [`SKILL.md`](SKILL.md)

---

## Four-Layer Knowledge Graph

All 21 skills share the same **four-layer reference knowledge graph** — Beliefs define worldview, Standards define what's good, Methods define how to do it, Execution defines what the output looks like.

| Layer | File | Responsibility |
|-------|------|----------------|
| **Beliefs** | [`references/beliefs.md`](references/beliefs.md) | Dual identity / existing context / anti AI-slop / system-first / placeholder > bad implementation / brand = being recognized / quality > quantity / IP boundaries |
| **Standards** | [`references/standards.md`](references/standards.md) | 5-dimension critique / scoring discipline / anti AI-slop blacklist / 9-segment framework / hardcoded detection / compliance / brand asset protocol / hierarchy / typography / color / a11y / interaction / simplification / system thinking |
| **Methods · Review** | [`references/methods-review.md`](references/methods-review.md) | 9-step review workflow / 7 trigger commands / page traversal / multi-perspective dispatch / 5 specialized review skills orchestration / polish / self-check |
| **Methods · Create** | [`references/methods-create.md`](references/methods-create.md) | 6-step creation workflow / question protocol / aesthetic direction / wireframe / variations / prototype / deck / tweakable / token & component extraction |
| **Execution** | [`references/execution.md`](references/execution.md) | Report templates / three-layer structure / 8-field design suggestion / radar chart / persistence / demo generation |

**Topic libraries** (read on demand):

| Topic | File | When to read |
|-------|------|--------------|
| Multi-perspective review | [`references/perspectives.md`](references/perspectives.md) | 10-perspective system (visual / interaction / brand / a11y / conversion / UX / flow / journey / UI / feature presentation) |
| Platform-specific | [`references/platforms.md`](references/platforms.md) | Mobile / desktop / Web / PPT / illustration / character IP guidelines |
| Philosophy library | [`references/philosophy-library.md`](references/philosophy-library.md) | 40 design philosophies + school matrix + case library + concept pack + gene recombination |
| Integration & reference | [`references/integration.md`](references/integration.md) | Lazyweb MCP / real product screenshot evidence / prompt engineering |

---

## Core Mechanics

### 5-Dimension Critique System

The core framework for design review, each dimension scored 0–10:

| Dimension | What it checks | High-score standard |
|-----------|----------------|---------------------|
| Philosophy alignment | Does the design embody a clear visual philosophy? | Every detail has philosophical grounding |
| Visual hierarchy | Does the user's eye flow naturally? | Squint test still reveals clear levels |
| Craft quality | Are alignment / spacing / colors pixel-perfect? | Unified spacing system, ≤3–4 colors |
| Functionality | Does every element serve the goal? | Removing any element would weaken the design |
| Originality | Are clichés avoided? | "Unexpected but logical" design decisions |

→ Full scoring rubric + 9-10 / 7-8 / 5-6 / 3-4 / 1-2 band descriptions: [`references/standards.md`](references/standards.md#1-5-维度评审体系)

### Hardcoded Value Detection

Auto-scans code for three categories of hardcoded issues:

| Type | Detection target | Fix suggestion |
|------|------------------|----------------|
| Colors | `#xxxxxx`, `rgb()`, `hsl()` written directly | Replace with `var(--color-*)` design tokens |
| Fonts | `font-family` direct declarations | Replace with `var(--font-*)` font tokens |
| Spacing | Non-4/8-multiple spacing values | Replace with `var(--space-*)` spacing tokens |

### Design System Compliance Check

Reviews whether code follows design system conventions:

- **Component compliance**: Are PrimaryButton / SecondaryButton etc. used instead of custom implementations?
- **Brand asset compliance**: Are real logos / product shots / UI screenshots used, not CSS silhouettes / SVG hand-drawn substitutes?
- **Token compliance**: Are colors / fonts / spacing referenced via CSS variables, not hardcoded?

### Anti AI-slop Rules

Detect the visual common denominator of AI output:

| Avoid | Use instead |
|-------|-------------|
| Purple gradients, invented colors | Brand colors / oklch-defined harmonious colors |
| Emoji as icons | Real icon libraries or honest placeholders |
| Rounded cards + left border accent | Honest boundaries / dividers |
| SVG-drawn people and objects | Real assets or placeholders |
| Inter / Roboto as display | Distinctive display + body font pairing |
| Fabricated stats / quotes as decoration | Whitespace, or ask user for real content |

→ Full 9-category blacklist: [`references/standards.md`](references/standards.md) §Anti AI-slop

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

### SVG Radar Chart Report

Review reports include an inline SVG radar chart with 5 axes for 5 dimensions. The filled area visually shows score distribution — weak dimensions are immediately visible (concave areas), no need to read scores one by one.

### Design Philosophy

Monkren itself follows the **Graphic Monochrome Canvas** visual language: pure black-and-white high contrast, zero-radius geometry, 1px borders, single 400 font weight. It is an extreme extension of the **Minimalism** school — for the full 7 core beliefs and Monkren's own school affiliation → see [## Design Philosophy](#design-philosophy).

---

## Design Direction Advisor

When users need "**recommend a design direction**" or "**what style fits**", Monkren enters the Define stage and outputs a **design suggestion report** (8-field structure):

### 5 Trigger Scenarios

| Scenario | Meaning | Output focus |
|----------|---------|--------------|
| Cold start (0→1) | New project with no design system | Onboarding cost / component-library fit |
| Incremental (1→N) | Existing system + new module | Style extensibility / token reuse |
| Direction diagnosis | Existing design → identify school | Classification / feature comparison |
| Bottleneck breakthrough | Stuck in sameness, want to switch | Maximize differentiation / flag risk |
| Benchmark alignment | Want to align with product X / brand Y | Path / refactor scope / feasibility |

### 8-Field Output

Each direction includes: project profile / designer or studio / school / signature visual traits / gestalt keywords / fit score / actionable concept pack (tokens + components + layout + motion + checklist) / risk notes.

### 12-Dimension Project Profile + 10 Schools × 40 Philosophies

From 10 schools (Information Architecture / Kinetic Poetry / Minimalism / Experimental Avant-garde / Eastern Philosophy / Brutalist Growth / Postmodern Carnival / Organic Biomimetic / Retro-Futurism / Maximalism) × 40 design philosophies, recommend **3 differentiated directions, each from a different school**.

### Philosophy Gene Recombination

Counter-consensus divergence + gradient evolution (conservative → balanced → radical) + actionable concept pack + demo generation.

→ Full rules: [`references/execution.md`](references/execution.md) §Design Direction Advisor + [`references/philosophy-library.md`](references/philosophy-library.md)

---

## Workflows

### Create Workflow · 6 Steps

1. Pre-creation question protocol → confirm goal / users / constraints / brand / success criteria
2. Lock aesthetic direction → 7-dimension commitment (color / type / spacing / container / image / motion / voice)
3. Lo-fi exploration → wireframe layout options
4. Output format selection → prototype / deck / tweakable / variations
5. Variation generation → 3+ style directions (conservative → balanced → radical)
6. Collaborate & deliver → show early / brief summary / delegate verification

→ Full 6-step workflow: [`references/methods-create.md`](references/methods-create.md)

### Review Workflow · 9 Steps

```
Discovery (incl. trigger command identification) → Understand target → [Page traversal]
→ Extract design context → Brand asset extraction → [Reference search] → Execute review
→ Output report → [Persist + score improvement] → Self-check iteration
```

0. **Discovery** (incl. trigger command identification): Confirm trigger command / input format / design type / review scope / focus area
1. **Understand review target**: What are we reviewing — screenshot / HTML / code / Figma? Whole or partial?
1.5. **Page traversal** (full-flow review): Discover all pages → per-page review → cross-page consistency check
2. **Extract design context**: Read code to extract tokens / components / brand assets
3. **Brand asset extraction**: 5-step extraction (locate → download → extract colors → write brand-spec → confirm)
3.5. **Reference search** (conditional): Lazyweb reference screenshots (optional)
4. **Execute review**: 5-dimension critique + multi-perspective review + platform-specific review + hardcoded detection + compliance check + UX review + user flow review + feature journey review + UI design review + feature presentation review + anti-slop check + artifact structure check + accessibility check
5. **Output report**: Three-layer progressive report (conclusion + diagnosis + action) or design suggestion report
5.5. **Persist + score improvement**: Save report as .md + .html + generate score improvement suggestion document
6. **Self-check iteration**: Score-description consistency + Fix actionability + contradiction check

→ Full 9-step workflow + 7 trigger commands: [`references/methods-review.md`](references/methods-review.md)

---

## Repository Structure

```
monkren-design/
├── SKILL.md                 # Agent main entry (five-stage routing)
├── README.md                # Chinese README (this file's mirror)
├── README.en.md             # English README
├── DESIGN.md                # Monkren project design system (Graphic Monochrome Canvas)
├── index.html               # Landing page
├── LICENSE                  # Personal use free / commercial requires authorization
├── case/                    # Visual reference samples
│   ├── Design Review — Landing Page.html
│   ├── Score Improvement — Landing Page.html
│   └── Design Suggestion — Landing Page.html
├── skills/                  # Five-stage skill matrix (21 skills)
│   ├── discover/            # Discover (3): design-research / quick-references / design-brainstorm
│   ├── define/              # Define (3): discovery-questions / frontend-aesthetic-direction / visual-taste-lab
│   ├── create/              # Create (8): wireframe / make-a-prototype / make-a-deck /
│   │                        #         make-tweakable / generate-variations / design-system-extract /
│   │                        #         component-extract / design-improve
│   ├── review/              # Review (5): accessibility-audit / ai-slop-check /
│   │                        #         hierarchy-rhythm-review / interaction-states-pass / polish-pass
│   ├── deliver/             # Deliver (README entry, driven by references/execution.md)
│   └── tools/               # Tools (2, cross-cutting): add-inspo-source / remove-inspo-source
└── references/              # Four-layer knowledge graph (9 files)
    ├── beliefs.md           # Beliefs: dual identity / anti-slop / system-first / brand = recognition
    ├── standards.md         # Standards: 5-dim / scoring discipline / slop blacklist / 9-segment / hardcode / compliance
    ├── philosophy-library.md # Philosophy library: 40 design philosophies + school matrix + concept pack + gene recombination
    ├── methods-create.md    # Methods · Create: 6-step workflow + question protocol + aesthetic direction + creation skills
    ├── methods-review.md    # Methods · Review: 9-step workflow + 7 triggers + page traversal + multi-perspective + specialized checks
    ├── execution.md         # Execution: report templates / 3-layer / 8-field / radar chart / persistence / demo
    ├── perspectives.md      # Multi-perspective: 10 perspectives (visual / interaction / brand / a11y / conversion / UX / flow / journey / UI / feature)
    ├── platforms.md         # Platform-specific: mobile / desktop / web / PPT / illustration / character IP
    └── integration.md       # Integration: Lazyweb MCP + real product screenshot evidence + prompt engineering
```

---

## License · Usage Rights

**Personal use is free and unrestricted** — studying, research, creating things for yourself, writing articles, side projects, personal social media. Use it freely, no need to ask.

**Enterprise / commercial use is restricted** — any company, team, or for-profit organization integrating this skill into a product, external service, or client deliverable **must obtain authorization from the author first**. Including but not limited to:

- Using the skill as part of internal company tooling
- Using skill outputs as the primary review method for external deliverables
- Building a commercial product on top of the skill
- Using it in paid client projects

**Commercial licensing contact**: see "Connect · Monkren" below.

---

## Connect · Monkren

| Platform | Link |
|----------|------|
| GitHub | https://github.com/monkren-ai/monkren-designer |

WeChat / Jike / X are not yet public — GitHub is the only release channel for now.

---

## Documentation Maintenance

This README is kept in sync with [`README.md`](README.md):

- `README.md` (Chinese) is the source of truth; `README.en.md` is a mirror
- After any change to the Chinese version, the English version must be updated; vice versa
- Any change to version number / skill count / reference count must be verified with `ls` + `grep`

→ Current version declaration: see the end of [`SKILL.md`](SKILL.md)
