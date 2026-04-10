---
name: ccc-proposal-draft
description: "Drafts a cost proposal for a CCC consulting engagement and renders it as a branded PDF. Reads the prospect person file and call notes, asks 2-3 scoping questions, drafts content in Markdown, builds a CCC-branded HTML document for review, then renders to PDF only after Daniel approves the HTML. USE THIS SKILL when Daniel says 'draft a proposal for X', 'write a cost proposal', 'put together a proposal', or after a discovery call where pricing came up. Also trigger if Daniel says 'they asked for a number' or 'it's time to send something over'."
allowed-tools: Read, Write, Bash
---

# CCC Proposal Draft

**Workflow: Research → Draft → HTML → Review → PDF.** Gathers context, drafts proposal content in Markdown, renders it as a CCC-branded HTML document, presents for review, then renders to final PDF only after explicit approval.

---

## Phase 1: Load Context (Silent)

Read:
1. Person file: `03 - OPERATIONS/Relationships & Network/People/[Name].md`
2. Recent meeting notes in `03 - OPERATIONS/Intelligence/meetings/client-calls/` for this person
3. `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/offer.md` — pricing reference
4. `03 - OPERATIONS/Claude Cowork Consultants/00 - CCC Foundations/pricing-log.md` — past pricing decisions for calibration

If pricing is genuinely uncertain, suggest running the `ccc-pricing` skill before continuing.

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
[Mirror back the client's situation and priorities. Specific quotes from the call if available. This proves you listened.]

## Your Priorities, in order:
1. [Priority name]: [what it means in their language]
2. [Priority name]: [what it means]
3. [Priority name]: [what it means]

## The Options

### Option A — [Name] · €X,XXX
[Deliverables + timeline]

### Option B — [Name] · €X,XXX  ← Recommended
[Deliverables + timeline. Include an "info box" explaining why two options.]

## What Comes After
[Honest framing of the long-term path. If relevant: "If you want to run parallel projects with other consultants? That's the right move. I'd rather you see the difference in practice than take my word for it."]

## Next Steps
1. Reply with your choice: Option A or Option B
2. I'll send a short agreement + invoice (50% upfront, 50% on delivery)
3. Kickoff call/workshop scheduled for [proposed date]

[Closing line — direct, not corporate. e.g., "Questions? Reply directly on WhatsApp or simply call me."]
```

Save the Markdown to:
`03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Name]/[YYYY-MM-DD] - Proposal — [Engagement Name].md`

Confirm: "Markdown draft saved. Review content and confirm before I build the HTML."

---

## Phase 4: Build Branded HTML

Only after Daniel confirms the Markdown content — take the approved content and render it as a CCC-branded HTML document. **Copy the text verbatim — including all punctuation, colons, em-dashes, and phrasing — exactly as written. Never make editorial changes.**

### Brand System
- **Fonts**: Space Grotesk (700, 600 weights) + Inter (400, 500) — load from Google Fonts
- **CCC Gold**: `#C9A84C`
- **Background**: white (`#FFFFFF`) — required for clean PDF printing
- **Dark pages** (cover + closing): `#1A1A1A` background, white text
- **Body text**: `#2A2A2A`, 10.5–11pt, Inter
- **Headings**: Space Grotesk 700, `#1A1A1A`
- **Blockquotes**: left border in CCC Gold, italic, `#3A3A3A`

### Standard Page Structure (6 pages)
1. **Dark cover** — proposal title, prepared for/by with LinkedIn link, valid until date, CCC branding
2. **About Daniel** — who CCC is and why this engagement
3. **What I Heard** — client's situation mirrored back, blockquoted key phrases, numbered priorities
4. **The Engagement + Options** — option cards with pricing; recommended option gets a gold border
5. **What Comes After + Next Steps** — long-term path and numbered action steps, italic WhatsApp closing
6. **Dark closing** — tagline, name (LinkedIn link), role, CCC wordmark

### Layout Rules
- Each page is a self-contained `<div class="page">` with `min-height: 297mm` and internal padding (~18–22mm)
- Content pages have a footer: `<span>[CCC — Proposal Name]</span>` — label only, **no page numbers**
- Option cards: `border: 1.5px solid #E0E0E0`; recommended card: `border-color: #C9A84C`
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

1. **"What I Heard" must be specific.** If it reads like a template, it wasn't built from the actual call. Use their words, their framing, their priorities. Specific quotes are proof of listening.
2. **Commit to a number.** Never leave pricing as a range in the final draft. Ranges signal uncertainty. One number per option.
3. **Copy punctuation exactly.** If Daniel's draft uses `:`, the HTML uses `:`. If it uses `—`, the HTML uses `—`. Never substitute one for the other or make editorial changes to phrasing or punctuation.
4. **No page numbers in HTML.** Puppeteer paginates at render time — hardcoded numbers will be wrong. Footer labels only.
5. **HTML review before PDF, every time.** No exceptions, even for "small fixes." Every iteration goes through the review gate.
6. **Don't overwrite existing PDFs.** The mount blocks it with EACCES. Use a version suffix instead.
7. **"Next Steps" must have a specific, dated ask.** Not "let me know if you have questions." A named choice, a payment structure, a proposed week.

---

## Anti-Patterns

| Situation | Broken output | Root cause | Fix |
|-----------|---------------|------------|-----|
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
