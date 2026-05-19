# `_lib/` — Shared Code for CCC SEO Suite

Shared utilities used by multiple skills in the suite. Solves recurring problems identified in the first full engagement run (Kai Reichel, May 2026).

## Files

| File | Purpose | Used by |
|------|---------|---------|
| `docx-helpers.js` | CCC-branded docx builder primitives, smart-quote-safe string escaping, cover-page factory, document factory | `ccc-seo-onboard` (readiness report), `ccc-seo-strategy-session` (strategy-session report), `ccc-seo-weekly-review`, `ccc-seo-quarterly-review`, `ccc-seo-client-handoff` |
| `dataforseo-client.js` | DataForSEO API wrapper with auto cost-logging, parallel-bulk-SERP pattern, retry-aware | `ccc-seo-research-brief`, `ccc-seo-ideate-topics`, `ccc-seo-tools-plan`, `ccc-seo-strategy-session` |
| `voice-loader.js` | Loads client brand-voice profile + author profile, distills into prompt-constraint | `ccc-seo-write-article`, `ccc-seo-client-handoff` |

## Why this exists

Without shared libs, every build-script in v0.1 redefined the same CCC-brand constants, re-hit the same smart-quote bug, and re-implemented the same DataForSEO call patterns. v0.2 consolidates.

## Convention

All skill build-scripts should `require()` from `_lib/`:

```js
const helpers = require('../../_lib/docx-helpers');
const { makeClient } = require('../../_lib/dataforseo-client');
const { loadVoiceProfile, distillVoiceForPrompt } = require('../../_lib/voice-loader');
```

If a new shared problem emerges across 2+ skills, add it to `_lib/` rather than duplicating.

## CCC Brand Constants

Available from `docx-helpers.js`:
- Colors: `COL_NAVY`, `COL_BLUE`, `COL_CORAL`, `COL_RED`, `COL_ORANGE`, `COL_GREEN`, `COL_GRAY_BG`, `COL_LIGHTBLUE_BG`, `COL_LIGHTRED_BG`, `COL_LIGHTGREEN_BG`, `COL_LIGHTYELLOW_BG`, `COL_BORDER`
- Helpers: `safeStr()`, `P()`, `PR()`, `R()`, `H1()`, `H2()`, `H3()`, `BULLET()`, `NUMBERED()`, `Cell()`, `PAGE_BREAK()`
- Factories: `makeCccDocument()`, `makeCoverPage()`, `saveDocx()`

---

*Introduced: v0.2.0 (2026-05-18) — consolidation pass after first full engagement.*
