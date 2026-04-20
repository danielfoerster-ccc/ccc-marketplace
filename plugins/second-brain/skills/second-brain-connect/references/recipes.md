# Recipes — Pre-composed Operation Sequences

*Last updated: 2026-04-19. Append new recipes here when an ad-hoc sequence has been used 3+ times.*

A Recipe is a named sequence of cognitive operations applied in a deliberate order for a recurring use case. Each recipe specifies: target type, operations in order, and what the combined output should reveal that no single operation could.

---

## Weekly Knowledge Sweep

**Use when:** End-of-week review of the past 7 days of captures and active beliefs.

**Target:** Recent captures (`find ... -mtime -7`) + 1–2 active beliefs Daniel names.

**Sequence:**
1. **Bayesian Updating** across the week's captures — how should beliefs shift given what came in?
2. **Falsification** on one active belief Daniel names — was anything in the new captures evidence against it?
3. **Perspective Simulation** on one stalled relationship — what would they have done differently this week?

**Combined output reveals:** Where the week shifted Daniel's worldview, what to do about it, and which relationship needs an unblocking move next week.

---

## Pre-Call Cognitive Prep

**Use when:** Preparing for a high-stakes conversation (prospect call, partner meeting, family decision).

**Target:** Person file + last 3–5 interactions + any open thread between them and Daniel.

**Sequence:**
1. **Perspective Simulation** on the person — what's their current state, priority, blind spot?
2. **Counterfactual Analysis** on prior interactions — what would have happened if Daniel had played each prior move differently? (Calibrates whether his read of the relationship is right.)
3. **Abductive Reasoning** on their likely current priorities — given recent signals, what's the most likely thing on their mind right now?

**Combined output reveals:** A pre-call brief that's tighter than the existing `ccc-sales-prep` skill — adds operation-grounded predictions.

---

## New-Concept Integration

**Use when:** A new idea, framework, or mental model has entered the vault (via Inbox capture or distill).

**Target:** The new concept note + the existing Lenses cluster + the existing Concepts cluster.

**Sequence:**
1. **Analogical Reasoning** — what existing Lenses does this new concept structurally resemble?
2. **First Principles** — strip the new concept's jargon; what's the actual claim underneath?
3. **Dialectical Synthesis** — find the existing Lens most opposed to it; can both hold?

**Combined output reveals:** Where to file the concept (which Lens cluster), how to reframe it in Daniel's vocabulary, and whether it earns Lens status or stays as a Concept.

---

## Decision Pressure-Test

**Use when:** A consequential decision is on the table — pricing a deal, taking a client, killing a project, hiring.

**Target:** The decision framing note (Daniel writes a paragraph) + relevant context notes.

**Sequence:**
1. **Falsification** — what would prove this decision wrong?
2. **Counterfactual** — if Daniel had to make this decision again in 12 months knowing the outcome, what would he wish he had done?
3. **Perspective Simulation** — pick the sharpest dissenting advisor (real or constructed); what would they say?
4. **First Principles** — strip the framing; rebuild from axioms (the actual goals + non-negotiables).

**Combined output reveals:** Whether the decision survives four independent stress tests. If it does, ship it. If any one breaks it, name what.

---

## Trademark Candidate Graduation

**Use when:** A concept Daniel has been developing might be promoted to a Trademark Idea (CCC IP).

**Target:** The candidate note + the Trademark Ideas folder + any related Lenses.

**Sequence:**
1. **Systems Thinking** — where does this concept fit in the broader CCC framework? Does it fill a gap or duplicate something?
2. **Analogical Reasoning** — what existing IP (Simmons, Hormozi, others) does it structurally resemble? Is it differentiated enough to own?
3. **Falsification** — what would invalidate it? Is there a single counter-example that breaks the entire concept?

**Combined output reveals:** Whether this is a genuine Trademark candidate or a derivative idea that should stay internal. Includes a "differentiation statement" if it graduates.

---

## Opportunity Discovery

**Use when:** Scanning for unexploited leverage in the current portfolio (CCC, EI, LONNEL, personal).

**Target:** Active project files across `03 - OPERATIONS/` + the current 90-day sprint.

**Sequence:**
1. **Systems Thinking** — map the current portfolio as a system. Where are the highest-leverage points being underused?
2. **Abductive Reasoning** — given recent results, what's the most likely **non-obvious** explanation for what's working / not working?
3. **Bayesian Updating** — given everything in the last quarter, which beliefs about the portfolio should shift?

**Combined output reveals:** A short list of leverage points the current sprint missed, with reasoning.

---

## How to add a new Recipe

When an ad-hoc operation sequence has been used 3+ times and produced strong outputs each time, append it here. Format:

```
## Recipe Name

**Use when:** [one sentence]

**Target:** [what to load]

**Sequence:**
1. [Operation] — [why this one first]
2. [Operation] — [why this one builds on #1]
3. [Operation] — [why this one closes the loop]

**Combined output reveals:** [what the recipe gives that no single operation could]
```

Recipes are how this skill compounds. The 9 operations are fixed (Simmons stress-tested them); the recipes are infinite and personal.
