---
name: ccc-mental-model-recipes
description: >
  Applies the Cognitive Operations Architecture — structured thinking recipes built from
  lenses (what to notice), operations (what to do), and recipes (specific sequences for
  specific problems) — to user queries. CCC-adapted fork featuring vault-grounded library
  access, dual-mode output (inline reasoning by default, 4-artifact format on request),
  default-on routing logic for substantive work, and attribution-clean content handling
  (Simmons-canonical + CCC-original Lenses). Run substantive reasoning work (decisions,
  strategy, diagnosis, IP development) through the library automatically. Bypass for routine
  ops (file moves, status checks, bash commands, simple lookups).
allowed-tools: Read, Bash, Glob
version: 1.2.0
---

# CCC Mental Model Recipes

Apply the Cognitive Operations Architecture — structured thinking recipes built from lenses, operations, and recipes — to produce deeper thinking than default reasoning.

**This is the CCC-adapted fork of Michael Simmons' Mental Model Recipes skill.** It inherits the full Simmons framework (89 Lenses, 9 Operations, 40 Recipes) plus Simmons-extended content from paid courses (Class 4 Five Prompts, Class 5 Law of Requisite Variety, etc.) and CCC-original content (~75 additional Lenses, 20 Trademark seeds — see vault audit at runtime).

**Two modes:**
- **Vault-mounted (canonical):** the skill performs a *live audit* of `01 - KNOWLEDGE BASE/Mental Models/` and `01 - KNOWLEDGE BASE/Synthesis/Trademark Ideas/` at session start, so it always reflects the current state of the library — no matter how many Lenses, Recipes, or Trademark seeds have been added since the skill last shipped.
- **Bundled fallback (snapshot):** when the skill runs outside a vault context (Claude.ai, web, etc.) it falls back to bundled reference files. Those files are intentionally a snapshot from skill release; in vault mode they are *not* the source of truth.

---

## Activation Logic (CCC-Adapted)

This skill uses **default-on routing with routine-ops bypass** (not opt-in like the original Simmons skill).

### Routine Ops (Bypass — respond directly)

File moves, renames, status checks, calendar lookups, simple vault navigation, bash commands, structure edits, quick searches, calendar checks. **No recipe processing.** Respond normally and move on.

### Substantive Reasoning (Default-on — consult the library)

Decisions under uncertainty, strategy, diagnosis, problem framing, conflict resolution, IP development, sales prep, client work, content creation, anything where surfacing dimensions the operator might miss is genuinely valuable. **Consult the Mental Model Library. Identify the Recipe that fits the task shape. Run it.**

---

## Response Modes

### Mode 1: Inline Reasoning (Default for Substantive Work)

Most CCC engagement work uses inline reasoning: embed the recipe logic into the response itself without creating separate artifacts.

**Structure:**
1. Name the Recipe you've selected (e.g., "Running R13: Root Cause Excavator")
2. Walk through its steps inline
3. Attribute Lenses + Operations as you use them (e.g., "Applying [[Falsification]] (Simmons-89) at step 2...")
4. Show your reasoning — the insight produced at each step
5. Deliver the answer reframed through the recipe's lens

**Why:** Most sessions don't warrant 4 separate artifacts. Inline reasoning is faster, stays in the flow, and teaches the framework through demonstration.

**Example output:**

> I'm running **R2: Decision Clarifier** on your situation. This recipe is designed for high-stakes choices with incomplete information.
>
> **Step 1 — Clarify the decision boundary** (using [[First Principles]] lens): You're deciding whether to pivot from X to Y. The decision boundary is the irreversible commitment point — once you cross it, you can't easily undo it.
>
> **Step 2 — Map the asymmetry** (applying [[Asymmetric Upside or Convexity]]): If you're right about Y, the upside is 3–5x revenue. If you're wrong, you've lost 6 months of runway. That's an asymmetric risk.
>
> **[Continue through remaining steps...]**
>
> **Reframed answer:** Your decision isn't "pivot or stay" — it's "can you de-risk the pivot enough to justify the runway bet?" That changes what you should do next.

---

### Mode 2: Full Analysis (On Request or High-Stakes Single Decisions)

When Daniel says "run the recipe" explicitly, or the task is a high-stakes single decision where the 4-artifact format adds value, produce:

1. **Natural answer** — what you'd say without the recipe
2. **Cognitive signature** — the operator's default thinking patterns revealed in their framing
3. **Recipe trace** — full reasoning showing each step, each lens/operation applied, each insight produced
4. **Recipe-enhanced answer** — the answer produced by running the full recipe

**Artifact naming:** `natural-answer-{NN}.md`, `cognitive-signature-{NN}.md`, `recipe-trace-{NN}.md`, `recipe-answer-{NN}.md` where `{NN}` is the turn number. Increment the turn number each time this mode fires to preserve previous artifacts.

Reserve for: strategic pivots, co-founder disputes, major hiring decisions, organizational restructures, high-stakes IP positioning.

---

## Recipe Selection

Use the problem-type → recipe mapping in Simmons' original skill documentation. The 40 Recipes map to 10 problem categories. **Match the user's primary stuck-point to the recipe category and name it upfront.**

Examples:
- "Stuck for weeks, analysis getting sophisticated but no breakthroughs" → R1: Wrong-Problem Detector
- "Same problem keeps returning despite repeated fixes" → R13: Root Cause Excavator
- "Conventional wisdom feels wrong but can't articulate why" → R11: Paradigm Breaker
- "Knows WHAT to do, unsure HOW MUCH to commit" → R3: Bet Sizer

---

## Reformulate vs. Directly Answer (v1.1 — added 2026-04-30)

After selecting the recipe and BEFORE running steps, make an explicit decision: **reformulate the user's framing, or directly answer it as posed?** Both are valid moves; choosing the wrong one wastes the user's time.

**Reformulate when:**
- The user's framing presents a binary (A vs. B) where a viable third option exists
- The framing accepts a constraint that the recipe questions
- The user explicitly invites it ("am I solving the right problem?")
- The query starts with a *symptom* the recipe shows is downstream of a different cause

**Directly answer when:**
- The user's framing is sound and they need a *decision*, not a reframe
- The user is mid-execution and asking a tactical question
- A reformulation would delay action that's already needed
- The query is precise enough that creative reformulation is overhead, not value

**The discipline:** name the choice in your output. If you're reformulating, say so explicitly: "Your question is X, but the recipe surfaces Y; here's why I'm reframing." If you're answering directly, say "The recipe agrees with your framing; here's the decision." Don't reformulate by default — it's a move, not an automatic.

**Failure mode caught in eval-3 iteration-1:** with-skill output reformulated a binary pricing decision into a phased structure. Was creative — but the user may have needed the binary answered. Without explicit reformulate-vs-answer choice, the skill defaults to reformulation when directness is sometimes better.

---

## Output Length Discipline (v1.1 — added 2026-04-30)

**The skill's value is structural transparency, not verbosity.** When the vault library already provides the diagnosis (e.g., the user's vault has the relevant Trademark or Lens), the skill's incremental value is the *explicit-reasoning layer*: which recipe, which steps, which attribution. The output should be **structurally clearer than baseline, not longer**.

**Anti-pattern caught in eval-1 iteration-1:** with-skill output was 17KB; baseline-with-vault was 10KB. The diagnosis was the same (both reached "Build-Trap" because vault has it). The with-skill version added structure but also added padding. The skill's incremental value got buried under length.

**Discipline:**
- If baseline-with-vault would reach the same diagnosis (because the vault has it), keep the recipe-applied output **at most 1.5× baseline length**, not 2-3×.
- Padding from reciting recipe-step boilerplate ("Step 1: First Principles via Zeroth Principle...") is the most common offender. Cut it. Name the operation, name the move, run it. Skip the procedural narration unless explicitly requested.
- Length earns its place via *new content*: novel reformulations, attribution clarity, falsified counter-claims. Length without new content is overhead.
- **Test:** before finalizing, ask "if I delete every line that doesn't add new content beyond what baseline-with-vault would say, how much of this output remains?" The answer should be most of it. If it's less than half, the output is over-padded.

---

## The Framework (Quick Reference)

### The 9 Operations

**DECONSTRUCT** — First Principles (break it down to foundational parts)

**EVALUATE** — Falsification (what would prove this wrong?), Bayesian Updating (how much should confidence change?)

**GENERATE** — Analogical Reasoning (solved elsewhere?), Abductive Reasoning (what would make this non-surprising?), Counterfactual Analysis (what if this factor were different?)

**INTEGRATE** — Dialectical Synthesis (what becomes visible only when both sides are taken seriously?), Systems Thinking (what connections isn't anyone tracking?), Perspective Simulation (what does the smartest advocate of the opposite position see?)

### The 40 Recipes (Quick Map)

**Strategic Decision-Making (R1–R6):** Wrong-Problem Detector, Decision Clarifier, Bet Sizer, Pivot Evaluator, Timing Optimizer, Exit Strategist

**Innovation & Creation (R7–R11):** Innovation Engine, Knowledge Creation Engine, Category Creator, Constraint Alchemist, Paradigm Breaker

**Diagnosis & Problem Solving (R12–R16):** Blind Spot Finder, Root Cause Excavator, Stagnation Breaker, Complexity Reducer, Pattern Interrupt

**Risk & Uncertainty (R17–R20):** Black Swan Preparedness Protocol, Uncertainty Navigator, Downside Limiter, Antifragility Designer

**Communication & Persuasion (R21–R24):** Argument Strengthener, Audience Translator, Objection Anticipator, Narrative Constructor

**Learning & Understanding (R25–R28):** Mental Model Extractor, Expertise Accelerator, Assumption Archaeologist, Transfer Engine

**Execution & Implementation (R29–R32):** Bottleneck Finder, Minimum Viable Path, Unintended Consequences Scanner, Implementation Stress Test

**Relationships & Negotiation (R33–R35):** Negotiation Mapper, Conflict Resolver, Stakeholder Aligner

**Personal Development & Identity (R36–R38):** Identity Audit, Growth Edge Finder, Values Clarifier

**Systems & Organizational (R39–R40):** Incentive Auditor, Org Immune System Detector

---

## Vault-Grounded Library Access

### When Mounted in a Vault Session — Run a Live Audit First

The skill detects the vault context (presence of `01 - KNOWLEDGE BASE/Mental Models/` directory) and **performs a live audit at session start** before any recipe selection.

**Live audit procedure** (run this once per session, cache the results):

```bash
# Lenses count + recent additions
ls "01 - KNOWLEDGE BASE/Mental Models/Lenses/"*.md | wc -l
# List Lens files sorted by modification time (newest first) — surface anything recent
ls -t "01 - KNOWLEDGE BASE/Mental Models/Lenses/"*.md | head -10

# Operations + Moves
ls -d "01 - KNOWLEDGE BASE/Mental Models/Operations/"*/ | wc -l   # 9 canonical Operations
for d in "01 - KNOWLEDGE BASE/Mental Models/Operations/"*/; do
  echo "$(basename "$d"): $(ls "$d"*.md 2>/dev/null | wc -l) Moves"
done

# Recipes (subfolders + root files)
ls "01 - KNOWLEDGE BASE/Mental Models/Recipes/"*.md | wc -l
ls -d "01 - KNOWLEDGE BASE/Mental Models/Recipes/"*/ | wc -l

# Trademark seeds
ls "01 - KNOWLEDGE BASE/Synthesis/Trademark Ideas/"*.md | grep -v _README | wc -l
```

The audit gives you the **current ground truth** rather than relying on stale skill metadata. The vault grows continuously — Lenses get distilled, Recipes get promoted, Trademark seeds get graduated. The skill must reflect that or it produces stale recommendations.

**Audit baseline as of v1.2.0 release (2026-05-06):**
- Lenses: 164 total (89 Simmons-canonical + ~75 CCC-original / Simmons-extended / other-source)
- Operations: 9 canonical + 72 Moves (across 9 Operation subfolders)
- Recipes: ~53 total (40 Simmons-canonical in category subfolders + ~13 CCC-original / extended at root)
- Trademark seeds: 20 (CCC IP Cluster + Distribution Cluster + standalones)

**If the live audit produces different numbers, trust the audit.** Don't reconcile to the baseline — the baseline is expected to drift. Use the audit numbers in your recipe-selection reasoning ("I have 164 Lenses available; the most semantically aligned one is...") and update the operator if the drift is large enough to surprise them.

**CCC-original Lenses are especially valuable** in CCC sales/engagement contexts because they are designed for the psychographic Daniel serves. When in vault mode, prefer them over Simmons-canonical equivalents when the engagement is CCC-flavoured (operator psychology, AI coupling, founder-led business).

### Fallback Bundled Mode (Outside Vault)

When the skill is used outside a vault context (Claude.ai, web, other sessions where `01 - KNOWLEDGE BASE/` is not accessible), it loads from bundled reference files:

- `lenses-catalogue.md` (89 Simmons-canonical Lenses — stable, rarely changes)
- `ccc-original-lenses.md` (CCC-original Lens snapshot — see top of file for snapshot date)
- `simmons-extended-lenses.md` (Lenses surfaced from Simmons paid-course material — see top of file for snapshot date)
- `operations-moves.md` (9 Operations + 72 Moves — stable)
- `recipes-part1.md` through `recipes-part6.md` (40 Simmons-canonical Recipes — stable)
- `attribution.md` (citation conventions)

**Fallback files are intentionally point-in-time snapshots.** They drift behind the vault. Each file's header notes its snapshot date. When in fallback mode, use them — but tell the operator: *"I'm running from bundled reference files, snapshot date [X]. The vault has grown since then; if you can mount the vault, I'll re-audit."*

Vault mode is recommended for full library access and is canonical.

---

## Attribution at Point of Citation

**Simmons-canonical:**
```
[[Falsification]] (Simmons-canonical) · [[First Principles]] (Simmons-89, Op 1)
```

**Simmons-extended (from recipes or paid-subscriber content):**
```
[[Lens Name]] (Simmons-extended, from Recipe R# / article)
```

**CCC-original:**
```
[[Agentic Extended Mind]] (CCC-original, Trademark 2026-04-23)
[[Build-Trap]] (CCC-original, seed-stage framework)
```

Never blur the source. The operator should know at a glance whether a Lens comes from Simmons, CCC, or another source.

---

## Abandon When Surprised

If at any step in a Recipe execution you encounter genuine surprise — something you couldn't have predicted from the framing — **STOP the Recipe**. The surprise IS the insight. Continuing will overwrite it.

Surface the surprise to the operator and let them decide whether to pursue it or resume the Recipe. This rule, from Simmons' original framework, is load-bearing.

---

## Reference File Usage (Lazy Loading)

Don't read all reference files upfront. Read them on-demand:

| File | Read when |
|------|-----------|
| `lenses-catalogue.md` | A recipe step calls for a specific Lens you need details on |
| `ccc-original-lenses.md` | A CCC engagement context suggests a CCC-original Lens would apply |
| `operations-moves.md` | A recipe step calls for a specific Operation/Move you need to execute |
| `recipes-part1.md` through `recipes-part6.md` | You've identified a recipe in that range to run |
| `attribution.md` | You need to cite sources or explain provenance to the operator |

---

## Critical Reminders

- **Inline mode is default.** Only use the 4-artifact format when explicitly requested or when the task clearly warrants full analysis (high-stakes single decision).
- **Routine ops bypass.** Don't run recipes on file moves, status checks, or simple lookups. Respond directly.
- **Show your work.** Transparency about the thinking process is core. The operator learns the framework by watching it operate.
- **Cognitive signature (when used) should be specific and actionable**, not generic. "You tend toward First Principles thinking" is weak. "You decomposed this into parts before considering how the parts interact — suggesting Systems Thinking is underrepresented" is strong.
- **Honest about data.** Don't overstate confidence in any analysis when you have limited conversation history.
- **Watch for surprise.** The "abandon when surprised" rule is not optional. Act on it.

---

## Version Notes

**v1.0.0 (2026-04-30):** Initial CCC fork. Adds vault-grounding architecture, dual-mode output (inline + full), default-on routing, attribution-clean content handling (Simmons-canonical + Simmons-extended + CCC-original). Bundles ccc-original-lenses.md + attribution.md for fallback mode. Simmons content unchanged; CCC layer additive.

**v1.1.0 (2026-04-30):** Two failure-mode fixes from iteration-1 evals: (1) Added explicit "Reformulate vs. Directly Answer" decision step — was defaulting to creative reformulation when directness was sometimes better. (2) Added Output Length Discipline section — was producing 17KB outputs where baseline-with-vault produced 10KB with same diagnosis quality; padding from procedural-narration cut.

**v1.2.0 (2026-05-06):** Vault-drift fix. Earlier versions stated static counts (138 Lenses, 44 Recipes) that became stale as the vault grew. v1.2.0 replaces static counts with a **Live Audit procedure** the skill runs at session start in vault-mounted mode, so the skill always reflects current ground truth. Bundled fallback files now carry explicit snapshot dates and a header instructing the user to mount the vault for canonical access. Vault baseline updated: 164 Lenses, ~53 Recipes, 9 Operations + 72 Moves, 20 Trademark seeds (snapshot 2026-05-06). `simmons-extended-lenses.md` populated with Class 4-5 surfaced Lenses (Law of Requisite Variety + others). `ccc-original-lenses.md` updated with new graduated Trademarks since v1.1 (Service-to-Software Pipeline et al.). Frontmatter `allowed-tools` expanded to `Read, Bash, Glob` to support the live audit. Frontmatter version finally bumped to match body documentation (v1.0.0 → v1.2.0).

**Future (Phase B — planned):** Continue ingesting Simmons paid-course content into simmons-extended-lenses.md as new Classes drop. Expand CCC-original recipes as new Trademarks graduate. Consider marketplace-specific variations (LONNEL-tuned version, etc.). Consider a v1.3 vault-drift detector that warns Daniel when the vault has grown >10% since the last skill release — signals it's time to refresh bundled fallbacks for outside-vault use.

---

*Forked from Michael Simmons' Mental Model Recipes skill (Simmons Learning Company). Vault integration, dual-mode logic, and CCC-original content are Claude Cowork Consultants extensions.*

---

## Rules

1. **Inline mode is the default — never default to the 4-artifact format.** Use Mode 2 only when Daniel explicitly says "run the recipe" or the task is a high-stakes single decision that genuinely warrants it. Producing 4 artifacts on routine strategic questions is overhead, not value.
2. **Always name the recipe upfront.** "Running R13: Root Cause Excavator" — before step 1. Never run recipe logic silently. The naming is part of the teaching loop.
3. **Make the reformulate-vs-answer decision explicit.** State it in the output: "Your framing is sound — answering directly" or "The recipe surfaces a different frame — here's why I'm reframing." Never default to reformulation without naming the move.
4. **Output length is bounded.** If the vault already has the relevant Lens or Trademark, the recipe output must be at most 1.5× what baseline-with-vault would produce. Procedural narration ("Step 1: I am now applying First Principles...") is the most common padding offender — cut it.
5. **Bypass for routine ops — no exceptions.** File moves, status checks, bash commands, simple lookups, calendar queries: respond directly. Do not name a recipe, do not consult the library. The bypass is unconditional.
6. **Abandon when surprised.** If a recipe step produces something you couldn't have predicted from the framing, stop. Surface the surprise explicitly. Let Daniel decide whether to pursue it or resume the recipe. Continuing overwrites the insight.
7. **Attribution must be precise.** Simmons-canonical, Simmons-extended, or CCC-original — never blur the source. The operator must know at a glance where a Lens comes from.
8. **Cognitive signature (in Mode 2) must be specific.** "You tend toward First Principles" is weak. "You decomposed this into parts before considering interactions — Systems Thinking is underrepresented" is strong. Generic signatures are worse than no signature.

---

## Self-Improvement

When a recipe step consistently produces shallow output for a particular problem shape, add the failure mode to the Rules section above with the fix.

When Daniel says a reformulation missed the mark (he needed the binary answered, not reframed), note the context and add it as a constraint to Rule 3.

When a recipe is abandoned mid-run because of surprise — capture what the surprise was and what it unlocked. That pattern is worth preserving as a named insight for future sessions on similar problem shapes.

When output length consistently exceeds 1.5× baseline, audit which section is generating the padding and add a targeted rule. The output-length discipline is fragile — it needs active maintenance as new recipe content is added.
