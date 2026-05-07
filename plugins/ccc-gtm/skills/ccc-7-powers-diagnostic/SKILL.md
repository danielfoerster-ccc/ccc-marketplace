---
name: ccc-7-powers-diagnostic
description: Strategic-positioning diagnostic using Hamilton Helmer's 7 Powers framework. Systematic application of all 7 Powers against a target — surfaces which 1-2 are held, emerging, or accessible. Then constructs a Vision-of-Domination Anchor for hot leads (counterfactual + gap + bridge to CCC engagement scope). Two output modes — Discovery Call one-pager or Workshop Deck outline (BRYX-pattern philosophy → industry examples → company self-assessment → strategic focus). USE THIS SKILL when preparing for a discovery call with a strategic prospect, evaluating an existing client's competitive position, building a vision-anchor for a hot lead, or designing a C-Suite strategic workshop. Especially valuable for AI-threatened incumbents and Counter-Positioning vulnerability assessment. Triggers — '7 Powers analysis', 'strategic diagnostic', 'discovery call prep', 'moat analysis', 'competitive position', 'vision-of-domination', 'hot lead prep', 'C-Suite workshop prep'.
allowed-tools: Read, Write, Edit, Glob, AskUserQuestion
---

# CCC 7 Powers Diagnostic

**Workflow: Intake → Diagnose → Anchor → Deliver.** Four-phase systematic application of [[Hamilton Helmer]]'s 7 Powers framework to a target company, producing either a discovery-call one-pager or a workshop deck outline. Built on two vault Recipes — the methodology Recipe ([[The 7 Powers Strategic Diagnostic]] — Helmer-canonical) and the application Recipe ([[Vision-of-Domination Anchor for Hot Leads]] — CCC-original).

This is a **process skill** — quality comes from the quality of the conversation between operator and skill, not from rigid templates. The 7 Powers framework provides the rigour; Daniel's CCC application pattern (extracted from the Sep 2025 BRYX C-Suite workshop) provides the deliverable shape.

---

## Why This Matters

CCC's value to clients is not "AI consulting" — it's **strategic positioning made concrete**. The 7 Powers framework gives you the rigour layer: a defensible, decade-tested taxonomy of competitive moats. Daniel's Vision-of-Domination application gives the relationship layer: how to anchor a narrower CCC engagement (business strategy, GTM, AI automation) in a bigger market-domination story that the C-Suite recognises themselves in.

Used together, they produce discovery-call material that doesn't pitch a deliverable — it shows the prospect the strategic ground their decision is being made on, and the structural moves that close the gap. That's a different kind of conversation than transactional consulting.

---

## When To Use

- **Discovery-call prep with a strategic prospect** — produces a 1-page brief Daniel walks them through during/after the call
- **C-Suite workshop design** — produces a slide-by-slide deck outline using the BRYX-pattern three-question scaffolding (philosophy → industry examples → company self-assessment → strategic focus)
- **Existing-client competitive-position review** — produces a strategic memo when a client is approaching an inflection point
- **Hot-lead Vision-of-Domination anchor** — produces a Strategic Anchor doc that frames the engagement in market-domination terms

## When NOT To Use

- Pure tactical engagements (single deliverable; no strategic-positioning question)
- Cold outreach (the prospect has no awareness of CCC yet — too early for a vision-of-domination frame)
- Companies with no scale yet (the 7 Powers diagnose moats, not seed-stage feasibility — use [[gtm-discovery]] instead)
- When the prospect is buying a deliverable, not a relationship — vision framing oversells
- When CCC has insufficient context on the target's business model — collect more info first

---

## Phase 0 — Intake (4 required inputs before diagnosis starts)

Use `AskUserQuestion` to collect efficiently. Don't proceed without all four.

1. **Target company** — name, URL, brief description (3-5 sentences) of business model: what they sell, who buys, transactional or subscription, B2C / B2B / B2B2C, current revenue scale (rough — $1M / $10M / $100M / $1B+).

2. **Use case** — pick one (single-select):
   - **Discovery call prep** — operator about to have a discovery call with this prospect
   - **C-Suite workshop design** — operator preparing a strategic workshop for the company's leadership
   - **Existing client review** — operator already in engagement, doing competitive-position assessment
   - **Hot-lead vision anchor** — operator has a warm lead and needs a strategic-vision doc to anchor the engagement scope

3. **Strategic context** — 3-5 sentences capturing what's HAPPENING strategically right now:
   - Are they at an inflection point? Threatened by something specific (AI, regulatory, new entrant, supply shock)?
   - What's their stated brief / what they're hoping CCC can do?
   - Operator's gut hypothesis on which Power they actually have or could claim (this is the falsification anchor — compare against the diagnostic output)

4. **Competitive landscape** — 1-2 main competitors + 1-2 sentences on each company's relative positioning. Doesn't need to be exhaustive; the diagnostic surfaces gaps as it runs.

**Save intake to a scratch file** at `/tmp/7-powers-intake-[company-slug].json` for use in later phases.

---

## Phase 1 — Run the 7 Powers Strategic Diagnostic

Read the canonical Recipe at `01 - KNOWLEDGE BASE/Mental Models/Recipes/Strategic Decision-Making/The 7 Powers Strategic Diagnostic.md` — that's the methodology spine.

Apply each of the 7 Lens triggers sequentially against the target. For each Power:

1. **State the trigger phrase** (1-line diagnostic from the Lens file)
2. **Apply it to the target** — does the company have this Power? Score: **Held / Emerging / Inaccessible / Unknown**
3. **If Held or Emerging:** identify the specific Benefit (cost / value / differential pricing) AND the specific Barrier (rational expectation / hysteresis / collateral damage / etc.)
4. **If Inaccessible:** name why (lifecycle stage / competitive context / structural constraint)
5. **If Unknown:** name what evidence would resolve the score — surface as an explicit research-needed flag

The 7 Powers (read each Lens file for full deployment guidance):
- [[Scale Economies]] — *cost per unit declines with volume*
- [[Network Economies]] — *value to user increases with other users*
- [[Counter-Positioning]] — *running a model an incumbent can't copy without collateral damage*
- [[Switching Costs]] — *users locked in by financial / procedural / relational costs of leaving*
- [[Branding]] — *brand drives differential pricing, not just recognition*
- [[Cornered Resource]] — *preferential access to a scarce input*
- [[Process Power]] — *embedded organisational system complex+opaque enough to resist cloning for 2-3 cycles*

**Output of Phase 1:** a Power Profile — 7 lines, one per Power, with Held/Emerging/Inaccessible/Unknown + brief justification.

**Apply the Abandon-When-Surprised rule** — if a Power assessment produces something genuinely unexpected (e.g., target has Cornered Resource the operator didn't suspect; or the operator's stated hypothesis is contradicted), STOP and surface to the operator. Surprise IS the insight.

---

## Phase 2 — Power Profile Synthesis

From the Power Profile, identify:

- **The 1-2 Powers the company actually holds today** (or the strongest Emerging one if no clear Held)
- **The strategic move that secures or unlocks the next Power** (per [[The Path to Power]] chapter — what's the inflection move?)
- **The Power Progression assessment** — what lifecycle stage is the company in (Origination / Takeoff / Stability)? Which Powers are accessible at this stage? (per [[The Power Progression]] chapter)

**Apply the Five Tests for Cornered Resource if relevant** (Idiosyncratic / Non-arbitraged / Transferable / Ongoing / Sufficient) — especially for talent-heavy or IP-heavy claims, where the Power often fails one of these tests.

**Output of Phase 2:** a 3-paragraph Power Profile synthesis — current state, accessible Power, strategic move.

---

## Phase 3 — Vision-of-Domination Anchor (CCC-original layer)

Read the canonical Recipe at `01 - KNOWLEDGE BASE/Mental Models/Recipes/Strategic Decision-Making/Vision-of-Domination Anchor for Hot Leads.md` — that's the application Recipe.

Construct the anchor:

1. **The Counterfactual** — *"If you held [Power X] fully, what would your market look like?"* — paint the vision in 3-5 sentences. Don't overstate; the C-Suite has to recognise themselves in this.
2. **The Gap** — what specifically is missing today between current state and that vision? Be concrete: capability, data, organisational design, brand asset, pricing power, distribution.
3. **The Bridge to CCC** — which CCC capabilities address which parts of the gap? (Business strategy / GTM / AI automation / specific plugin from the marketplace.) Don't widen CCC's scope to fit the gap — narrow the gap framing to fit CCC's scope.
4. **The Trojan Horse** — identify ONE concrete first-30-day deliverable that's both a credibility move AND the start of the gap-close work. This is what closes the discovery call.
5. **Frame Test** — would the C-Suite recognise themselves in this story? If no, narrow the scope of the vision (don't broaden CCC's scope). If yes, lock the frame.

**Output of Phase 3:** the Vision-of-Domination paragraph (~150 words) + Gap statement + Bridge + Trojan Horse + Frame-test verdict.

---

## Phase 4 — Deliverable

Output shape depends on intake's `use_case`:

### Use case: Discovery Call prep → 1-page brief

Save to `03 - OPERATIONS/Claude Cowork Consultants/Prospects/[Company Slug]/7 Powers Diagnostic — [YYYY-MM-DD].md`

Sections (concise, scannable):
1. **The Power Profile** (one line per Power, scoring + 1-line justification — 7 lines)
2. **The 1-2 Powers held / accessible** (named + Benefit + Barrier)
3. **The Strategic Move** (the inflection move identified in Phase 2)
4. **Vision-of-Domination Anchor** (the paragraph + Gap + Bridge from Phase 3)
5. **The First-30-Day Trojan Horse** (the one concrete deliverable that opens the engagement)
6. **Discovery Call Talking Points** (3-5 things to say + 3-5 questions to ask + 1-2 things NOT to mention — keep the strategic-vision frame as Trojan Horse, not the lead)

Cap at 1.5 pages. Discovery-call material is rifle, not shotgun.

### Use case: C-Suite Workshop design → Deck Outline (BRYX-pattern)

Save to `03 - OPERATIONS/Claude Cowork Consultants/Workshops/[Company Slug] — 7 Powers Workshop Outline — [YYYY-MM-DD].md`

Use Daniel's three-question scaffolding (extracted from BRYX Sep 2025 deck):

**Section 1 — Philosophy** (3-5 slides)
- What is "Power" / what is a moat — short Helmer framing
- The seven types of Power as a visual reference (one slide showing all 7 in a grid)
- The moat-as-durable-structure framing — "Powers persist across price and quality changes"
- The "innovation as singular origin" framing — "every Power roots in innovation"

**Section 2 — Industry Examples** (5-7 slides)
- One Power per slide, with a recognisable industry example NOT from the target's industry (Netflix for Scale, LinkedIn for Network, etc. — adjust to whatever industry makes the example land for THIS C-Suite)
- Avoid examples from the target's direct competitive set — those become political

**Section 3 — Company Self-Assessment** (4-7 slides)
- One slide per Power that's Held / Emerging — assessment + evidence + strategic implication
- Skip Inaccessible Powers unless the C-Suite needs to confront a misperception they hold
- Closing slide: the 1-2 Powers actually accessible + the strategic move

**Section 4 — Strategic Focus & Next Steps** (2-3 slides)
- The Vision-of-Domination paragraph
- The Gap statement
- The first-30-day move
- (For workshops where CCC engagement scope is being proposed:) the Bridge to CCC

Cap at 18-22 slides total. Workshop material that runs 30+ slides loses C-Suite attention before strategic move lands.

### Use case: Existing client review → Strategic Memo

Save to `03 - OPERATIONS/Claude Cowork Consultants/Engagements/[Client Slug]/[YYYY-MM-DD] — 7 Powers Competitive Position Review.md`

Long-form memo: full Power Profile, Power Progression analysis, strategic options ranked by ROI, recommended move with timeline. ~3-5 pages.

### Use case: Hot-Lead Vision Anchor → Strategic Anchor doc

Save to `03 - OPERATIONS/Claude Cowork Consultants/Prospects/[Company Slug]/[YYYY-MM-DD] — Strategic Anchor.md`

The full Phase 3 output as a standalone deliverable + the Discovery Call Talking Points block. Used during the call AND left with the prospect after.

---

## Rules

1. **Never produce the deliverable without showing the Power Profile draft to the operator first.** Phase 1 + 2 outputs require operator validation before Phase 3 anchor construction. Operator's gut hypothesis from intake is the falsification anchor — compare explicitly.

2. **Apply the Abandon-When-Surprised rule.** If a Power score contradicts the operator's stated hypothesis, STOP and surface. Don't smooth over the contradiction.

3. **Never broaden CCC's scope to fit the gap.** Phase 3 Step 3 — narrow the gap framing to what CCC's scope actually addresses. The vision-of-domination is bigger than the engagement; the engagement is *one move* toward the vision, not the vision itself.

4. **The C-Suite Frame Test is non-negotiable** (Phase 3 Step 5). If the C-Suite wouldn't recognise themselves in the vision, the vision is wrong — narrow it. Daniel's BRYX-deck pattern is built on the C-Suite assessing themselves; the skill must produce material that respects that recognition.

5. **No long quotes from Helmer's book.** Reference [[Hamilton Helmer]]'s 7 Powers as the source; use the vault Lens files for deployment language.

6. **Cap deliverables.** Discovery-call brief: 1.5 pages. Workshop deck: 18-22 slides. Strategic memo: 3-5 pages. Workshop material that runs longer loses C-Suite attention.

7. **Apply the Five Tests when claiming Cornered Resource** — talent-heavy or IP-heavy claims fail this test most often. Specifically check Non-arbitraged (does compensation fully capture the value?) and Ongoing (does the resource stay valuable?).

8. **Cross-link aggressively** — wikilink to [[Hamilton Helmer]], [[7 Powers]], the 7 Lens files, both Recipes, [[Service-to-Software Pipeline]] when CCC's own moat comes up, [[ccc-mental-model-recipes]] for cognitive routing.

9. **Workshop deliverables avoid the target's direct competitors as examples.** Section 2 industry examples should illuminate the framework, not stir competitive politics.

10. **Always offer the Frame Test out loud to the operator** — "Would the [target] C-Suite recognise themselves in this vision? If yes, lock; if no, what specifically feels off?" This is the moment Daniel's CCC-original IP becomes Daniel's specifically.

---

## Self-Improvement

When the operator corrects a Power score:
- Note which Power was misjudged and which signal was missed
- Update the Lens file's trigger phrase if the failure is generalisable
- If the same Power gets misjudged across multiple runs, flag the trigger phrase as needing refinement

When a Vision-of-Domination paragraph fails the Frame Test:
- Note the specific framing language the operator rejected and what they substituted
- The substitution pattern is data on Daniel's voice — preserve as reference example for future runs

When the deliverable produces a closed engagement:
- Capture which Power profile + which Bridge framing produced the close
- Use as reference example in the [[Vision-of-Domination Anchor for Hot Leads]] Recipe (Trademark seed candidate — graduation depends on this evidence)

When the Five Tests collapse a claimed Cornered Resource:
- Capture the specific test that failed and the evidence
- Pattern over time: which tests fail most often for which industry types?

This skill compounds. Each diagnostic + close adds evidence to the [[Vision-of-Domination Anchor for Hot Leads]] Trademark seed; each failed Frame Test sharpens the operator's voice for future runs.

---

## When NOT to use this skill — alternatives

- **The prospect needs market-fit validation** → use [[gtm-discovery]] (different question; pre-Power)
- **The prospect needs a 90-day GTM launch plan** → use [[gtm-90-day-launch-plan]] (downstream of this diagnostic)
- **Cognitive routing for a strategic question (which Recipe to run)** → use [[ccc-mental-model-recipes]]
- **Pure pricing question** → use [[ccc-pricing]]
- **Stage-test of a positioning frame** → manual review or [[ccc-discovery-roleplay]]

---

## Future plans (Daniel-flagged 2026-05-07)

This skill currently lives in `ccc-gtm` plugin. Daniel flagged that after ingesting **Brian Balfour's 100 Tasks Framework**, more foundational business-strategy skills will be added — at that point, consider promoting `ccc-7-powers-diagnostic` to a dedicated `ccc-strategy` plugin alongside the new skills. Until then, ccc-gtm is the right home (close to ICP / positioning / launch-plan work; the 7 Powers diagnostic feeds those skills with the strategic-positioning ground).

---

*Skill v0.1 created 2026-05-07. Built on [[The 7 Powers Strategic Diagnostic]] (Helmer-canonical) + [[Vision-of-Domination Anchor for Hot Leads]] (CCC-original Trademark seed candidate). Workshop deliverable shape extracted from Daniel's Sep 2025 BRYX C-Suite workshop deck. Future v0.2 work: integrate with vector-DB semantic retrieval (May 17 pilot) for auto-surfacing similar past diagnostics.*
