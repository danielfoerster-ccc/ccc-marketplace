---
name: ccc-sop-creator
description: >
  Creates and updates CCC Standard Operating Procedures (SOPs) in the HEROIC format.
  USE THIS SKILL whenever Daniel or Heiko want to: build a new SOP, update an existing
  SOP, or document any repeatable CCC business process — including GTM channels
  (LinkedIn outreach, cold email, cold calling, workshops, discovery calls) AND
  operational processes (client onboarding, project delivery, reporting, internal
  workflows, team management, or anything else CCC does repeatedly).
  Also trigger on: "lass uns das als SOP festhalten", "schreib das als SOP raus",
  "erstelle einen SOP für...", "dokumentiere den Prozess", "write a SOP",
  "build a playbook", "document this workflow", "create an outreach SOP",
  "standardize this process", or any request to turn a CCC business activity into a
  repeatable, documented procedure.
  Requires: Read, Write, Bash tools.
allowed-tools: Read, Write, Bash
---

# CCC SOP Creator

**Workflow: Select → Research → Confirm → Generate → Save.**
You identify the SOP topic, read the relevant reference + live foundation docs, ask 2–3 targeted questions, then output a finished SOP to Obsidian.

This skill covers **all CCC business areas** — GTM channels, client delivery, operations, internal workflows. Any process CCC does repeatedly is a candidate for an SOP.

---

## Saved Output Path

All SOPs go to:
```
WELTENERNEUERER/A - A - Empire/Claude Cowork Consultants/03 - SOPs & Playbooks/
```
Full path: `/sessions/admiring-relaxed-brahmagupta/mnt/WELTENERNEUERER/A - A - Empire/Claude Cowork Consultants/03 - SOPs & Playbooks/`

Filename convention: `SOP [Name] — CCC [YYYY-MM-DD].md`

---

## Step 1: Identify the SOP

The user may name a specific SOP, describe a workflow, or ask you to capture what they just explained. Identify which type it is and confirm before proceeding.

**Pre-built SOP types** (reference files available in `references/`):
1. Master GTM SOP — the full acquisition funnel overview
2. LinkedIn Content & Outreach SOP — posts + intent-based DM sequences
3. Cold Email SOP — lead list, email copy, campaign setup
4. Cold Calling SOP — opener, objection handling, meeting booking

**Custom SOP types** (no reference file — rely on foundation docs + user interview):
5. Workshop / Event SOP — designing and running lead-gen workshops
6. Discovery Call SOP — running the first sales conversation
7. Client Onboarding SOP — first steps after a client signs
8. Project Delivery SOP — how CCC executes client work
9. Reporting / Tracking SOP — weekly/monthly performance reviews
10. Any other CCC process — confirm the scope and workflow with the user

If the user describes a workflow rather than naming an SOP type, identify the best fit and confirm.

---

## Step 2: Read Context

Before asking any questions, always read:

**1. Relevant reference file** (for pre-built types 1–4 above):
- Master GTM → `references/gtm-overview.md`
- LinkedIn → `references/linkedin-outreach.md`
- Cold Email → `references/cold-email.md`
- Cold Calling → `references/cold-calling.md`

**2. Live CCC foundation docs** (always read for any SOP):
- ICP: `mnt/WELTENERNEUERER/A - A - Empire/Claude Cowork Consultants/00 - CCC Foundation/ICP.md`
- Offer: `mnt/WELTENERNEUERER/A - A - Empire/Claude Cowork Consultants/00 - CCC Foundation/offer.md`
- Positioning: `mnt/WELTENERNEUERER/A - A - Empire/Claude Cowork Consultants/00 - CCC Foundation/positioning.md`
- Voice: `mnt/WELTENERNEUERER/A - A - Empire/Claude Cowork Consultants/00 - CCC Foundation/voice.md`

Do NOT skip reading these — even operational or delivery SOPs must reflect CCC's actual offer, ICP, and approach.

---

## Step 3: Light Interview (2–3 questions max)

Ask only what can't be answered from the docs. Ask all at once. For custom/operational SOPs, up to 5 questions may be needed — tell the user that more detail upfront means a better SOP.

**Defaults to confirm per SOP type:**

| SOP Type | Confirm |
|----------|---------|
| LinkedIn | Weekly post frequency? Audience size / engagement level? |
| Cold Email | Sending tool (Instantly, Lemlist, Apollo)? Daily send volume? |
| Cold Calling | Daily call volume? DE only or full DACH? |
| Workshop | Online or in-person? Duration? How promoted? |
| Discovery Call | Call length? CRM or note-taking tool? |
| Client Onboarding | Number of onboarding steps? Handoff process from sales? |
| Project Delivery | Service type? How is client progress tracked? |
| Custom | Full process walkthrough: what triggers it? What are the steps? What is the output? What does failure look like? |

---

## Step 4: Generate the SOP

Use this exact HEROIC format for every SOP. All sections are mandatory — never skip or collapse them.

**Depth standard:** The SOP must be written at the level where someone could execute it on day one, without additional coaching. This means:
- **Procedures must be phased** (Phase 1: Preparation, Phase 2: Execution, etc.) with time blocks where applicable
- **Decision points and sub-cases must be explicit** (if X → then Y, if Z → then W) — especially for objection handling, client responses, or branching workflows
- **Scripts, templates, and checklists must be complete** in the Appendix — not summarized or abbreviated
- **KPIs must include a Ramp Timeline** showing Week 1–2, 3–4, and 4+ targets
- **Typical length**: 500–1000+ lines for execution SOPs; shorter for strategy/planning SOPs

```markdown
Category: [[Standard Operating Procedure (SOP)]]
Version: 1.0
Last Updated: [YYYY-MM-DD]

# SOP: [Name] — CCC

## Purpose

[1–2 sentences: what this SOP exists to achieve for CCC. Be specific about the outcome and scale — include measurable targets where known. E.g., "200 dials per week and 10+ qualified discovery meetings by Week 4", not just "run cold calls efficiently".]

**Core philosophy:** [The key mental model for executing this process correctly — one sentence that captures the spirit. E.g., "You are not here to pitch or convince. You are here to qualify and book meetings."]

## Summary Steps

1. **[Phase or Step Name]:** [One-line description]
2. **[Phase or Step Name]:** [One-line description]
3. **[Phase or Step Name]:** [One-line description]
...

## Frequency

[Daily / Weekly / Per-campaign / As-needed — be specific. Include time blocks where applicable, e.g.:]
- Morning prep (08:00–08:30): [what happens]
- Execution window (08:30–12:00): [what happens]
- Follow-up / review (17:00–17:30): [what happens]

## Output / Deliverable

[What gets produced per cycle — with quantities and destination. E.g.:]
- **40–50 live conversations** (connect rate ≥ 20%)
- **10–15 booked discovery calls** per week
- **1 weekly performance report** → saved to Notion CCC Dashboard

Deliverable Destination: [Where results land — Notion, CRM, email thread, client folder, etc.]

## KPI

| Metric | Target | Baseline |
|--------|--------|----------|
| [Metric 1] | [Target] | [Week 1 / starting point] |
| [Metric 2] | [Target] | [Week 1 / starting point] |

**Ramp Timeline:**
- **Week 1–2:** [Numbers + focus area] → Success indicator: [specific metric]
- **Week 3–4:** [Numbers + focus area] → Success indicator: [specific metric]
- **Week 4+:** [Numbers + focus area] → Success indicator: [specific metric]

## Procedure

### Phase 1: [Name] ([Time block if applicable])

1. **[Action]**
   - [Sub-detail — concrete and specific, not strategic]
   - [Sub-detail]

2. **[Action]**
   - [Sub-detail]

[Every step must be something a person can DO today. "Draft 10 connection request messages" — not "Build your LinkedIn presence".]

### Phase 2: [Name]

[Repeat structure. Use as many phases as the process requires — don't compress to keep it short.]

### Phase 3: [Name — Objection Handling / Decision Branch / etc.]

[For objection handling, client responses, or workflow branches: include a sub-section per scenario. Each scenario gets the full response or action written out — not just referenced.]

#### Scenario: [Name]

**Step 1 — [Action]:**
> "[Full response or action]"

**Step 2 — [Action]:**
> "[Full response]"

**If they say X:**
> "[Response]"

**If they say Y:**
> "[Response]"

[Repeat for every distinct scenario in this phase.]

...

## Rules & Anti-Patterns

| Situation | Error | Reason | Solution |
|-----------|-------|--------|----------|
| [When this trigger occurs] | [What goes wrong] | [Why it's a problem] | [What to do instead] |

[Include 6–10 rows covering the most common execution failures — specific failure modes with clear fixes, not generic reminders.]

## Tools & Resources

- **[Tool name]:** [What it's used for specifically in this SOP — e.g., "Notion CCC Acquisition Dashboard → Cold Calling Tracker for logging daily dial outcomes"]

## Related SOPs

- [[SOP Name — CCC]] ([relationship — e.g., "upstream: defines the ICP this SOP targets"])

## Appendix: Complete Scripts / Templates / Checklists

[Everything needed to execute this SOP — fully written out. No placeholders like "use your script here". Someone reading only this appendix should be able to run the process.]

### [Script or Template Name]

**Use when:** [Specific context]

**Script/Template:**
> "[Full text — verbatim and ready to use]"

**Variant — if they say X:**
> "[Response]"

**Variant — if they say Y:**
> "[Response]"

[Repeat for all scripts, templates, email variants, objection sub-cases, checklists, booking language, voicemail scripts, follow-up emails, etc.]

---

## Notes & Error Sources

**Most common mistakes in the first 2 weeks:**
1. [Specific, concrete error — not "don't rush"]
2. [Error 2]
3. [Error 3]

**Fix approach:** [What to do to correct these early mistakes]

**What to evaluate after Week 4:**
- [Question 1: is this metric on target?]
- [Question 2: what worked vs. didn't?]
- [If below target → what to adjust]
- [If above target → what to scale]

---

## Path to [X]+ [Outcomes] per [Week/Month]

[One paragraph: why these numbers are achievable and the math behind them. E.g., "200 dials × 20% connect = 40 conversations × 25% booking = 10 meetings. This is not optimistic — this is arithmetic."]

- **Week 1–2:** [Target numbers] — learning phase
  - Focus: [Specific skill or habit to build]
  - Success indicator: [Metric that confirms on track]

- **Week 3–4:** [Target numbers] — consistency phase
  - Focus: [What to nail]
  - Success indicator: [Specific metric]

- **Week 5+:** [Target numbers] — scaling phase
  - Focus: [What to optimize]
  - Success indicator: [Specific metric]

---

**Version History:**
- v1.0 ([YYYY-MM-DD]): [Brief description of what was created/changed]
```

---

## Step 5: Save and Confirm

1. Save the SOP to the output path with the correct filename
2. Tell the user: the filename, where it was saved, and the next SOP to create (if part of a series)
3. Offer to upload it to Notion via the notion-create-pages tool if they want it there too

---

## Rules (Update When Things Go Wrong)

1. **Always read foundation docs before generating.** Generic SOPs are useless. CCC's ICP (DACH marketing agencies), offer structure, and positioning must be reflected — even in operational or delivery SOPs.
2. **Never invent specific numbers without a source.** KPI targets should come from the reference file, the 90-day plan, or explicit user input. If unknown, write "TBD — validate after 4 weeks."
3. **Skill-Alignment: inline only.** If a process step is supported by a Claude skill, note it parenthetically (e.g., "→ use the LinkedIn Writer Skill"). No separate Skill-Alignment section.
4. **Keep the Procedure section executable.** Each step must be something a person can DO today — "Draft 10 DM connection requests" not "Build your LinkedIn presence."
5. **HEROIC format is non-negotiable.** All sections must appear in every SOP. Don't collapse or skip them. The format forces clarity on frequency, output, and KPIs — that's the point.
6. **Process depth is non-negotiable.** For execution SOPs (outreach, calling, email, delivery), the Procedure section must use phases. Every decision branch, objection type, or sub-case must be handled individually — not summarized. Thin procedures are unusable in practice.
7. **Scripts and templates must be complete.** The Appendix must contain every script, email template, and checklist verbatim and ready to use. No placeholders.
8. **SOPs are written in English.** CCC operates in DACH, but the SOP language is English. Technical terms, tool names, and direct course language stay in their original form.
9. **For Custom SOPs:** Ask more questions. The reference files won't cover custom processes — you need to understand the full workflow (trigger, steps, output, failure modes) before generating.
10. **Scope is all of CCC, not just GTM channels.** This skill applies to any repeatable CCC business process: sales, delivery, operations, client management, internal workflows.

---

## Self-Improvement

When a SOP is put into use and a process step turns out to be wrong, incomplete, or needs updating:
- Update the SOP file directly (bump version number, update Last Updated date)
- If the failure was a recurring mistake in SOP generation, add it to the Rules section above

When a SOP works well and becomes a model for future ones:
- Note the patterns that made it effective in a new entry in `references/good-examples.md` (create if doesn't exist)
