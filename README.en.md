<sub><b>🌐 English</b> · <a href="README.md">中文</a></sub>

> Current version: **v6.2** / 2026-07-17 / Architecture: **one installable design agent, a five-stage lifecycle, and one cross-stage second-opinion advisor**

<div align="center">

# Monkren

> *One design agent. Five stages. One deliberately challenging second opinion.*

[![License](https://img.shields.io/badge/License-Personal%20Use%20Only-orange.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-blueviolet)](https://skills.sh)
[![skills.sh](https://img.shields.io/badge/skills.sh-Compatible-green)](https://skills.sh)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://monkren-ai.github.io/monkren-designer/)

```bash
npx skills add monkren-ai/monkren-designer
```

[Live preview](https://monkren-ai.github.io/monkren-designer/) · [Quick start](#quick-start) · [Routing](#five-stage-routing) · [Structure](#repository-structure)

</div>

## Quick start

Install the skill, then describe the job directly:

```text
Research design directions for this space
Generate three distinct design variations
Build an interactive prototype
Deep-review this project
Fix every confirmed issue from the review
Ask the second design agent whether this direction should exist
```

A standard installation exposes one root skill, `monkren-design`. It is the sole entry point and loads the relevant bundled stage module. The 16 stage modules, one advisor, and two tools are not separate products users must install individually.

Review, audit, and critique requests are read-only by default. Files are changed only when the user explicitly asks to fix, improve, implement, build, or create. Browsers, MCP servers, and subagents are optional enhancements, not prerequisites for the core workflow.

## Five-stage routing

| # | Stage | Core question | Active modules |
|---|---|---|---:|
| 01 | Research & definition | What exists, what constrains us, and where should we go? | 6 |
| 02 | Creation definition | What should we make, and which direction should win? | 2 |
| 03 | Design execution | How do we turn the direction into an interactive artifact? | 1 |
| 04 | Design review | Is it good, and where exactly does it fail? | 6 |
| 05 | Design improvement | How should confirmed issues be fixed and reverified? | 1 |

One cross-stage advisor and two inspiration-source tools sit outside the five stages. See [SKILL.md](SKILL.md) for the complete executable routing table.

## Second design agent

“First Principles × Product Taste” joins only for major direction choices, expensive implementations, hard-to-reverse brand or architecture decisions, conflicting fixes, and pre-ship tradeoffs. Users can also invoke it explicitly.

It challenges requirements, removes unsupported scope, identifies hard constraints, and protects the core user promise and end-to-end experience. It returns one fused recommendation plus an engineering dissent and an experience dissent. It is always read-only and never impersonates real people; implementation returns to the relevant lifecycle module.

## Review standard

Monkren evaluates five dimensions: philosophical consistency, visual hierarchy, execution detail, functionality, and originality.

Four scoring disciplines keep the review honest:

1. If every dimension scores 7 or higher, actively search for counterevidence.
2. Score the weakest sustained experience instead of hiding it in an average.
3. Every score must cite a file, line, element, or observable fact.
4. An originality score of 5/10 can be appropriate for production work.

The full standard lives in [references/standards.md](references/standards.md). The prompts and references are primarily written in Chinese, but the agent accepts tasks and returns results in the user's language.

## Repository structure

```text
monkren-designer/
├── SKILL.md                  # sole installation entry and router
├── skills/
│   ├── 01-research/          # 6 research modules
│   ├── 02-create/            # 2 creation modules
│   ├── 03-execute/           # 1 execution module
│   ├── 04-review/            # 6 review modules, including 5-dim-review
│   ├── 05-improve/           # 1 improvement module
│   ├── advisors/             # 1 read-only cross-stage second opinion
│   ├── tools/                # 2 cross-stage tools
│   └── _deprecated/          # historical modules excluded from routing
├── references/               # progressively loaded methods and standards
├── assets/philosophy-images/ # 80 local reference images plus index
├── case/                     # 4 case artifacts
├── scripts/                  # repository validation
├── THIRD_PARTY_NOTICES.md    # third-party sources and MIT notices
└── index.html                # GitHub Pages site
```

## Compatibility

The root skill does not hardcode a proprietary agent path or tool variable. Agents that support skills.sh can install it directly; other environments can read `SKILL.md`. Missing optional capabilities fall back to local, sequential, or text-only execution.

## Development validation

```bash
ruby scripts/validate_repo.rb
```

The validator checks skill frontmatter, root routes, advisor boundaries, relative links, local site assets, and the 80-image philosophy index. GitHub Pages runs the same validation before deployment.

## License

Personal use is free. Enterprise or commercial use requires written authorization. See [LICENSE](LICENSE).

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for the source materials and licenses behind “First Principles × Product Taste.”

**v6.2 · 2026-07-17**
