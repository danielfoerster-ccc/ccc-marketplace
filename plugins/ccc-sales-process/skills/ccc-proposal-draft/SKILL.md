---
name: ccc-proposal-draft
description: "Drafts a Gap-anchored cost proposal for a CCC consulting engagement and renders it as a branded PDF. Reads the prospect person file, call notes, and CCC Problem Identification Chart, asks 2-3 scoping questions only if needed, drafts content in Markdown with quantified Current State / Future State / Gap / Intrinsic Motivation in 'What I Heard' and every deliverable mapped to a documented PIC row, builds a CCC-branded HTML document for review, then renders to PDF only after Daniel approves the HTML. USE THIS SKILL when Daniel says 'draft a proposal for X', 'write a cost proposal', 'put together a proposal', or after a discovery call where pricing came up. Also trigger if Daniel says 'they asked for a number' or 'it's time to send something over'."
allowed-tools: Read, Write, Bash
---

# CCC Proposal Draft

**Workflow: Research → Anchor → Draft → HTML → Review → PDF.** Gathers context, anchors the proposal narrative to the documented Gap (Future − Current in the client's currency), drafts proposal content in Markdown with every deliverable mapped to a PIC row, renders as a CCC-branded HTML document, presents for review, then renders to final PDF only after explicit approval.

The skill rejects deliverable-first proposals — every paid line must trace to a problem, an impact, and a root cause documented during discovery. This is what makes a CCC proposal feel non-generic and what allows the price to be quoted as a fraction of the gap value rather than competed against the deliverable list.

---

## Phase 1: Load Context (Silent)

Read:
1. Person file: `03 - OPERATIONS/Relationships & Network/People/[Name].md`
2. Recent meeting notes in `03 - OPERATIONS/Intelligence/meetings/client-calls/` for this person — extract Current State, Future State, Intrinsic Motivation, and any quantified gap data
3. `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/offer.md` — pricing reference
4. `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/pricing-log.md` — past pricing decisions for calibration
5. `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/CCC-PIC.md` — the Problem Identification Chart that every deliverable must anchor to

If pricing is genuinely uncertain, suggest running the `ccc-pricing` skill before continuing.

---

## Phase 1.5: Gap Anchoring Check (silent — gate to Phase 3)

Before drafting, confirm the four anchors are documented:

1. **Current State** — quantified facts, problems, impact (in client's currency), root cause
2. **Future State** — Layer 1 (technical), Layer 2 (business, quantified), Layer 3 (intrinsic motivation, the personal WHY)
3. **The Gap** — Future − Current, expressed in the client's currency
4. **PIC mapping** — each suspected deliverable maps to one or more PIC rows for this client

**If any of these four are missing or not specific:**
- Don't draft yet. Tell Daniel which anchor is missing.
- If the missing piece is the Gap math: suggest running `ccc-pricing` for value-based calibration.
- If the missing piece is intrinsic motivation: suggest scheduling a 15-min follow-up call to surface it directly. Proposals drafted without Layer 3 land flat.
- If the missing piece is PIC mapping: ask Daniel to identify which PIC rows apply to this engagement.

This gate exists because per [[Gap Selling — Keenan]] Ch. 13, price objections trace almost exclusively to insufficient discovery. A proposal without a documented gap will get negotiated on price; a proposal with a documented gap gets accepted at quote.

---

## Phase 2: Scoping Questions (Ask Only What's Missing)

If the engagement scope is clear from context, skip directly to Phase 3. Otherwise ask:

1. **What's the deliverable?** (e.g., 2-week sprint → working system / ongoing retainer / custom build)
2. **What's the primary constraint?** (time, budget, internal resources)
3. **What number are they expecting?** (any signals from the call — budget range hinted, day rate mentioned)

Don't ask more than these 3. Generate the proposal from what's known.

---

## Phase 3: Draft Content (Markdown)

Write the full proposal content in Markdown. This is the content layer — structure, words, pricing, logic. The Markdown draft is the source of truth for the HTML build. Daniel may edit it directly before the HTML is built.

Use this structure as a starting point, adapting to what the engagement actually requires:

```
## The Engagement
[2-3 sentences. What we're doing and why. Ties directly to the problem they stated — no generic consulting language.]

## What I Heard

**Where you are today (current state):**
[Specific, quantified. Facts + the 1-3 most material problems + their impact in your numbers + the root cause we identified together. Use their words. Specific quotes where available.]

**Where you're trying to get to (future state):**
- Operationally: [Layer 1 — what the system does once we're done]
- For the business: [Layer 2 — quantified outcome in your currency]
- For you: [Layer 3 — the personal WHY they shared, expressed respectfully and specifically]

**The gap we're closing:**
[Future − Current, in their currency. Specific. e.g., "From 22% growth to your 25% target = €X in additional revenue, or roughly €Y/month from quarter 2 onwards." This is the line that makes the price feel small.]

## Your Priorities, in order:
1. [Priority name]: [what it means in their language] — *closes PIC #X*
2. [Priority name]: [what it means] — *closes PIC #Y*
3. [Priority name]: [what it means] — *closes PIC #Z*

## The Options

### Option A — [Name] · €X,XXX  *(≈ [Y%] of the [€Z] gap above)*
**Closes PIC #[N], #[M].**

[Deliverables — each one anchored to a problem from "What I Heard". Format: deliverable → which problem it solves → quantified outcome in their currency. No deliverable that can't be anchored makes it onto the page.]

Timeline: [specific weeks].

### Option B — [Name] · €X,XXX  *(≈ [Y%] of the [€Z] gap above)*  ← Recommended
**Closes PIC #[N], #[M], #[K].**

[Deliverables, anchored as above. The recommended option closes more of the gap, not because it's bigger but because it's the right scope for this client's specific gap math.]

Timeline: [specific weeks].

[Brief info-box: why two options. Frame around scope of gap closed, not feature count.]

## What Comes After
[Honest framing of the long-term path. If relevant: "If you want to run parallel projects with other consultants? That's the right move. I'd rather you see the difference in practice than take my word for it."]

## Next Steps
1. Reply with your choice: Option A or Option B
2. I'll send a short agreement + invoice (50% upfront, 50% on delivery)
3. Kickoff call/workshop scheduled for [proposed date]

[Closing line — direct, not corporate. e.g., "Questions? Reply directly on WhatsApp or simply call me."]
```

**Why this structure works (per [[Gap Selling — Keenan]]):**
- "What I Heard" with quantified Current State + 3-layer Future State + the Gap is the proof of discovery. The buyer reads it and knows they were heard at architectural depth.
- Pricing as a percentage of the gap inverts the negotiation: instead of "is €40K worth it for these deliverables?", the buyer asks "is €40K worth it for €500K of gap closure?" The math defends itself.
- Anchoring every deliverable to a PIC row means nothing decorative slips in. If a deliverable can't anchor, it gets killed — which sharpens the proposal and protects the margin.

Save the Markdown to:
`03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Name]/[YYYY-MM-DD] - Proposal — [Engagement Name].md`

Confirm: "Markdown draft saved. Review content and confirm before I build the HTML."

---

## Phase 4: Build Branded HTML

Only after Daniel confirms the Markdown content — take the approved content and render it as a branded HTML document. **Copy the text verbatim — including all punctuation, colons, em-dashes, and phrasing — exactly as written. Never make editorial changes.**

### Load Brand Guidelines

Before building the HTML, load the brand for this engagement:

1. **Check the client folder first** — look for a `brand-guideline.md` or `brand.md` in the client's project folder (e.g., `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Name]/`)
2. **Fall back to CCC brand** — `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/brand-guideline.md`

The brand file provides: color palette, typography (fonts + weights + sizes), design language, logo usage rules, and document-specific guidance. Apply all of these to the HTML build.

If no brand file exists for the client and none is specified, ask Daniel which brand to use before building.

### Standard Page Structure (adapt per brand)
1. **Dark cover** — proposal title, prepared for/by, valid until date, brand identity
2. **About Daniel** — who the firm is and why this engagement
3. **What I Heard** — client's situation mirrored back, key quotes, numbered priorities
4. **The Engagement + Options** — option cards with pricing; recommended option gets a highlighted border
5. **What Comes After + Next Steps** — long-term path and numbered action steps, closing line
6. **Dark closing** — tagline, name, role, brand wordmark

### Layout Rules
- Each page is a self-contained `<div class="page">` with `min-height: 297mm` and internal padding (~18–22mm)
- Content pages have a footer label (e.g., `[Brand] — Proposal Name`) — **no page numbers**
- Option cards: light border by default; recommended card uses the brand's accent color for the border
- Use `page-break-inside: avoid` on option cards so they don't split across PDF pages

### Puppeteer PDF Render
```javascript
await page.pdf({
  path: '[output].pdf',
  format: 'A4',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 }
});
```
If overwriting an existing PDF fails with EACCES, render with a version suffix (v2, v3) — the mount blocks overwriting existing files.

Save HTML to:
`03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Name]/[YYYY-MM-DD] - Proposal — [Engagement Name].html`

---

## Phase 5: Review Gate ← MANDATORY STOP

**After building the HTML, STOP. Present the HTML file link to Daniel for review. Do not render the PDF.**

Example message: "Here's the HTML: [computer:// link]. Review content and layout, then tell me to render — or give me changes."

If Daniel requests changes: edit the HTML, present the updated link. Repeat until approved.

This stop exists because HTML edits are cheap; re-renders create versioning clutter. The review gate keeps the PDF clean and final.

---

## Phase 6: Render to PDF

Only after explicit approval — render the HTML to PDF using Puppeteer (Node.js, `--no-sandbox` flag).

Save PDF to the same client folder. Confirm: "PDF rendered at [path]. Ready to send."

---

## Phase 7: Log Pricing

Append the approved pricing to the pricing log:
`03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/pricing-log.md`

```
| [Date] | [Client] | [Option A €X] / [Option B €X] | [Notes — e.g., case study pricing, framework divergence] |
```

---

## Rules

1. **Never quote a price before the Gap is documented.** If "What I Heard" can't be filled with quantified Current State + 3-layer Future State + Gap math, run discovery again — or run [[ccc-pricing]] for value-based calibration. Proposals without a documented gap get negotiated on price; proposals with one get accepted at quote.

2. **Every deliverable must anchor to a PIC row from [[CCC-PIC]].** If a deliverable can't anchor, kill it — it's decorative and dilutes the proposal's gap-closure narrative.

3. **"What I Heard" must be specific.** If it reads like a template, it wasn't built from the actual call. Use their words, their framing, their priorities. Specific quotes are proof of listening. Layer 3 (intrinsic motivation) must be in the buyer's voice — never invent it.

4. **Pricing must reference the gap.** Each option's price tag should include the percentage-of-gap reference (e.g., "≈ 8% of the €500K gap"). This turns the price conversation from cost-of-deliverables into outcome-ROI math.

5. **Commit to a number.** Never leave pricing as a range in the final draft. Ranges signal uncertainty. One number per option.

6. **Copy punctuation exactly.** If Daniel's draft uses `:`, the HTML uses `:`. If it uses `—`, the HTML uses `—`. Never substitute one for the other or make editorial changes to phrasing or punctuation.

7. **No page numbers in HTML.** Puppeteer paginates at render time — hardcoded numbers will be wrong. Footer labels only.

8. **HTML review before PDF, every time.** No exceptions, even for "small fixes." Every iteration goes through the review gate.

9. **Don't overwrite existing PDFs.** The mount blocks it with EACCES. Use a version suffix instead.

10. **"Next Steps" must have a specific, dated ask.** Not "let me know if you have questions." A named choice, a payment structure, a proposed week.

11. **If the buyer pushes back on price, never defend the deliverables.** Use the [[I'm Confused You Said — Reframe (Keenan)]] technique — see `references/im-confused-you-said.md` for the price-objection templates. The reframe holds the buyer accountable to their own stated future state, not to the proposal's feature list.

---

## Anti-Patterns

| Situation | Broken output | Root cause | Fix |
|-----------|---------------|------------|-----|
| Proposal drafted without quantified Gap | Buyer negotiates on price; proposal feels generic | Phase 1.5 anchoring check skipped | Refuse to draft. Tell Daniel which anchor is missing. Suggest discovery follow-up or [[ccc-pricing]]. |
| Deliverable list contains items that don't anchor to a PIC row | Proposal looks like a service catalogue, not a gap-closure plan | Skill defaulted to listing capabilities | Kill any deliverable that can't anchor. If a useful deliverable doesn't fit a PIC row, propose adding the row to [[CCC-PIC]] in Self-Improvement. |
| Layer 3 (intrinsic motivation) is generic | "...so you can grow the business" reads as boilerplate | Discovery didn't surface the personal WHY | Don't fabricate. Either pull it from meeting notes or ask Daniel for it. Generic Layer 3 destroys trust on read. |
| Daniel edits the MD after the HTML is built | HTML is outdated | Build HTML from MD before any edits happen | Confirm MD is final before Phase 4 |
| Content reviews are happening on the PDF | Hard to fix, creates v2/v3/v4 clutter | PDF rendered too early | Enforce Phase 5 review gate every time |
| HTML uses `—` but MD used `:` | Punctuation mismatch, Daniel thinks text wasn't read | Editorial override during HTML build | Copy text verbatim — no editorial changes |
| Page content bleeds into PDF header area | Visual clutter, unfinished look | Insufficient top padding on continuation pages | Add `padding-top: 8mm` to `.page` or set top margin in Puppeteer |

---

## Self-Improvement

When a proposal is accepted without negotiation: note what framing or pricing worked → add to pricing-log.

When a proposal gets pushed back: note the number, context, and client response → add to pricing-log with the delta.

When an HTML layout issue surfaces during review: add a CSS rule or layout note to Phase 4 above to prevent recurrence.

When Daniel corrects punctuation or phrasing in the HTML: the source was the Markdown — check whether it was in the MD and missed, or whether an editorial change was made. If the latter, add it as a rule.
