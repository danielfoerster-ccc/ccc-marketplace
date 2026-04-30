# Attribution & Content Provenance

The `ccc-mental-model-recipes` plugin includes content from three distinct sources, each with different attribution requirements and deployment contexts.

---

## Content Categories

### 1. Simmons-Canonical (89 Lenses + 9 Operations + 72 Moves + 40 Recipes)

**Source:** Michael Simmons' Mental Model Recipes skill (original bundled Simmons content)

**Files:** 
- `lenses-catalogue.md` (89 Lenses)
- `operations-moves.md` (9 Operations + 72 Moves)
- `recipes-part1.md` through `recipes-part6.md` (40 Recipes)

**Attribution Format:**
```
[[Lens Name]] (Simmons-canonical, via mental-model-recipes)
or
[[Recipe Name]] (R#, Simmons-canonical)
```

**Usage:** Deploy in recipes exactly as Simmons intended. No modification; preserve the original structure and examples.

**Copyright:** Michael Simmons / Simmons Learning Company. Used with permission within the Cowork ecosystem.

---

### 2. Simmons-Extended (Lenses & Operations Referenced in Recipes but Not in the 89-Lens Catalogue)

**Source:** Michael Simmons' published work (articles, courses, paid-subscriber content) featuring Lenses and Operations that appear in his 40 Recipes but were not included in the original 89-Lens catalogue.

**Files:**
- `simmons-extended-lenses.md` (NEW — Lens references from Recipes R1–R40 that fall outside the canonical 89)

**Attribution Format:**
```
[[Lens Name]] (Simmons-extended, from Recipe R# / article / course)
```

**Usage:** Deploy identically to Simmons-canonical; these are Simmons-authored and ship with full fidelity to his framing. The "extended" label simply indicates they weren't in the original bundled catalogue.

**Copyright:** Michael Simmons. Used with permission.

**Note:** This category is a reconciliation layer. When Simmons' Recipes reference a Lens not in the original 89-catalogue, that Lens gets documented here so the skill can resolve the reference without breaking. As Daniel ingests more Simmons paid-subscriber content (Phase B), this file will grow.

---

### 3. CCC-Original (Lenses, Trademarks, Recipes)

**Source:** Daniel Förster / Claude Cowork Consultants, developed within [[WELTENERNEUERER]]

**Files:**
- `ccc-original-lenses.md` (7 graduated Lenses + 3 seed-stage frameworks)
- Recipes developed in `Mental Models/Recipes/` (4 CCC-original recipes in root, e.g. `[[Gap-Selling Discovery (Keenan)]]` — actually Keenan-sourced but published in Daniel's vault, treated as CCC-curated)

**Attribution Format:**
```
[[Lens Name]] (CCC-original, [distilled | seed] [YYYY-MM-DD])
[[Trademark Idea Name]] (CCC-original, Trademark seed candidate)
```

**Usage:** Deploy in recipes as functional equivalents to Simmons Lenses. CCC-original Lenses are _not_ subordinate to Simmons' — they are peer-tier, developed through the same rigor (Falsification, distillation, deployment testing).

**Copyright:** Daniel Förster / Claude Cowork Consultants.

**Deployment Notes:** CCC-original Lenses are highest-value in CCC engagement work (LONNEL sales, Execution Intelligence content, agency consulting). They are designed for the specific psychographic Daniel serves. External deployment (marketplace, public courses) requires explicit licensing agreement with Daniel.

---

## When the Skill Is Deployed

### In a Vault Session (Daniel's vault at WELTENERNEUERER)

The skill auto-detects the vault context and loads from the vault library. This gives access to:

- All 89 Simmons-canonical Lenses (+ all 89 Operations and Moves, all 40 Recipes)
- All Simmons-extended Lenses (from Simmons paid-subscriber ingestion, Phase B)
- All 151 CCC-original and other-source Lenses in `Mental Models/Lenses/`
- All 44 CCC + other-source Recipes in `Mental Models/Recipes/`

**Default behavior:** When citing a Lens or Operation, the skill includes the provenance tag automatically. Example output:

> Applying [[Agentic Extended Mind]] (CCC-original, 2026-04-23, Trademark seed) at the coupling-design stage...

This transparency allows Daniel to quickly assess whether a recommendation comes from Simmons, CCC, or another source, and to make decisions about public vs. private deployment accordingly.

---

### Outside Vault (Fallback Bundled Mode)

When the skill is used outside the vault context (Claude Desktop, web, other Cowork sessions), it falls back to the bundled reference files:

- `lenses-catalogue.md` (89 Simmons-canonical only)
- `operations-moves.md` (9 Simmons Operations + 72 Moves)
- `recipes-part1.md` through `recipes-part6.md` (40 Simmons Recipes)
- `ccc-original-lenses.md` (7 graduated + 3 seed CCC-original Lenses, bundled for fallback)
- `simmons-extended-lenses.md` (Lenses from recipes; bundled for fallback)

In fallback mode, Simmons-canonical and Simmons-extended Lenses are available. CCC-original Lenses are available (bundled) but the skill notes that vault-connected mode would provide more comprehensive options.

**Attribution in fallback mode:**

> This skill is operating in fallback mode (not connected to your vault). Full library includes 151 Lenses; this fallback has 89 Simmons + 7 CCC-original. To access the full 138 Lenses (49 CCC-original + other-source), mount [[WELTENERNEUERER]].

---

## The Attribution Convention (Per Decisions & Rules)

**From [[00 - COMMAND CENTER/Foundational Docs/Decisions & Rules.md]]:**

> **Attribution Convention:** When citing Lenses, Operations, or Recipes: (1) **Simmons-canonical** — cite as "(Simmons-89)" or "(Simmons, via mental-model-recipes)". (2) **Simmons-extended** — cite as "(Simmons-extended, from Recipe R# / article / course)". (3) **CCC-original** — cite their Trademark Idea seed or creation date, e.g., "(CCC-original, Trademark seed 2026-04-23)" or "(Daniel, WELTENERNEUERER 2026-04-29)". Don't blur the source. *Adopted 2026-04-20.*

---

## Trademarks & IP Protection

CCC-original content in this skill (particularly Lenses and Trademark Ideas like [[Agentic Extended Mind]], [[Craft Sovereignty in the AI Era]], [[Fractal Three Brains]], [[Autarky Fallacy in AI Adoption]]) is owned by Daniel Förster and Claude Cowork Consultants.

**Licensed to:** Cowork ecosystem (Claude Desktop, Cowork sessions, skills)

**Restricted:** Commercial republishing, course material, consulting engagement models require explicit licensing from Daniel.

**Public deployment OK:** LinkedIn content, Execution Intelligence shows, blog posts, articles (non-paywalled) — as long as attribution is explicit ("CCC-original Lens from [[name]]").

---

## Changelog

### v1.0.0 (2026-04-30)

- Initial fork from Simmons-canonical mental-model-recipes
- Added vault-grounding architecture (fallback to bundled when outside vault)
- Added `ccc-original-lenses.md` with 7 graduated + 3 seed-stage Lenses
- Added `simmons-extended-lenses.md` (reconciliation layer for recipe references)
- Added this `attribution.md` document
- Bumped plugin.json to 1.0.0

---

*For licensing questions or integration requests, contact Daniel Förster at dafoerst87@googlemail.com.*
