# Problem Identification Chart (PIC) — Builder Reference

*Reference doc for the [[ccc-sales-process]] plugin. Source: [[Gap Selling — Keenan]] Ch. 8. The CCC-filled PIC lives at [[CCC-PIC]]; this doc explains how to build / refresh / extend one.*

---

## What a PIC is

A three-column inventory of every problem your offer can solve, the impact each problem has on a buyer's business, and the root cause of each problem. Built **before** any prospect outreach. The PIC is the seller's map — without it, discovery is improvisation.

| Problem | Impact | Root Cause |
|---------|--------|-----------|
| What's broken | What it costs (in buyer's currency) | Why it persists |

## Why it matters

Three operational consequences:

1. **It defines who you sell to.** The ICP is built from the PIC: rank prospects A/B/C/D by problem-count × impact-severity. (Lots of problems + lots of impact = A. Few problems + little impact = D — don't bother.)
2. **It shapes the discovery.** Every Probing/Process/Provoking question targets a row in the PIC. Without it, discovery wanders.
3. **It anchors the proposal.** Every deliverable in the proposal must trace back to a PIC row for this specific buyer. If a deliverable doesn't anchor, kill it — it's "nice to have" and dilutes the gap.

## How to build one (first version)

Step 1: **Fill in the blank.** *"The reason my product or service exists is to ________."* Write 3-5 sentences. This is the seed.

Step 2: **List every problem your offer can solve.** Brain-dump. Don't filter. Aim for 10-25 problems. They should be the *real* problems your buyers struggle with — operational, financial, emotional — not feature-gaps in your product.

Step 3: **For each problem, fill in Impact.** Use the buyer's currency: % growth, € revenue, hours, headcount, churn rate, conversion rate. Ranges are OK on first pass; refine with real client data.

Step 4: **For each problem, fill in Root Cause.** What underlying mechanism makes this problem persist? Not the symptom — the cause. The doctor finds the arterial blockage, not the heartburn.

Step 5: **Group by domain.** Problems usually cluster (in CCC's case: AI/Architecture, Cognitive/OS, Sales/Revenue, Cashflow, Time). Domain grouping makes the PIC easier to navigate during discovery.

Step 6: **Cross-link.** Every PIC row should be referencable from skill files, proposal drafts, and discovery prep. Use anchor IDs (1.1, 1.2, etc.) for stability.

## How to refresh one (ongoing)

After every client engagement that produces new evidence:

- **New Problem surfaced** that the PIC didn't capture → add a row.
- **Impact range needs updating** with real client data → revise the range.
- **Root Cause was wrong** when discovery revealed a deeper layer → rewrite, archive the prior version with date.
- **Problem was actually two problems** that should be split → split, renumber, cross-reference.

## Anti-patterns

- **Listing features as problems** — "lacks integration with X" is a feature gap, not a buyer problem. The buyer problem is the operational consequence of the gap.
- **Generic impact** — "saves time" is open-ended; refuse it. *"How much time? For whom? In what currency?"*
- **Single root cause** — most problems have multiple plausible root causes. The PIC should list the one your offer addresses; if your offer addresses multiple, list them.
- **Static PIC** — a PIC that hasn't been updated in 6 months is decaying. Treat it as living.

## CCC's filled PIC

See [[CCC-PIC]] — the operational, in-vault version that all `ccc-sales-process` skills load when they need to hypothesise an operator's problems.
