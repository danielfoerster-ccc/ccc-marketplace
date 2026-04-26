---
name: knowledge-distill
description: |
  Distills articles, essays, blog posts, YouTube transcripts, or pasted content into compact, wikilinked knowledge notes in the vault — output is always shorter than the source. Sibling of knowledge-archive which preserves full text; this skill compresses. Applies the Archiving Lens at intake ("will I re-read this in a year?"), names the author's Lineage, categorises on ingest (Lens / Operation / Recipe / Concept / Reference / Reflection / Trademark-candidate), and wikilinks depth-calibrated to epistemic stance (resonates / expands / dialectical / entertaining).

  Three modes: paste-in (zero Tavily cost), single URL via Tavily, batch URLs or local transcripts. Paywalled and book-PDF sources are human-in-the-loop.

  USE THIS SKILL whenever a link, transcript, or snippet is dropped for learning — "save this", "add to vault", "distill this", "core argument", "summarize this article", "turn this into a note", or when a YouTube transcript or URL is shared.
allowed-tools: "Read, Write, Glob, Grep, Bash"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.3.0
  created: 2026-04-01
  updated: 2026-04-19
---

# Knowledge Distill Skill

**Workflow: Lens → Stance → Fetch → Categorise → Wikilink → Route → Report**

Drop a link, a transcript, or a paste — get a wikilinked knowledge note in the right vault folder. Distill ≠ archive: this skill *compresses* the source into key ideas. [[knowledge-archive]] *preserves* the full text. If you are not sure which to use: if the user wants to re-read the original later, archive; if the user wants the ideas to compound with the rest of the graph, distill.

---

## Foundational Philosophy

Distilling is an epistemic act, not note-taking. The decision to distill is itself meaningful — sources enter the vault because they serve one or more of these purposes:

- **Build and refine mental models** — the source offers a framework, mechanism, or lens that improves future reasoning
- **Widen the aperture** — it genuinely expands what seems possible, thinkable, or true about how the world works
- **Stress-test existing beliefs** — it challenges priors, creates productive tension, or provides a counterweight to the user's default view (the antidote to echo chambers)
- **Sharpen strategic and second-order thinking** — it reveals downstream effects, system dynamics, or implications that aren't obvious at first pass
- **Understand macro forces** — it maps where things are going: geopolitically, technologically, economically, civilizationally, in terms of power, health, or society

This is a knowledge graph built for *better decisions*, not for storage. Every distill session answers: how does compressing this make the user's thinking sharper, wider, and more honest? The summary's closing sentence belongs to the user's thinking, not the source's conclusion — it names *which purpose* this distill serves.

Wikilinks are edges, not decorations. Depth and directionality reflect the *role* this source plays in the user's thinking, not just the topics it mentions.

---

## The Archiving Lens (gate before any work happens)

Before distilling, answer in one sentence: **"Will the user want to re-read this — or the distilled version of it — in a year?"**

If **No** → do not distill. Either triage to 📥 Inbox for weekly review with a one-line note, or discard. Distilling sources that fail this lens is how vaults become cemeteries.

If **Yes** or **Unsure, worth a week** → continue.

The user normally pre-screens what enters the distill flow; this gate is the safety net. When you're unsure, err on keeping the source — but file it to Inbox with the lens verdict recorded, not to a final destination.

---

## Epistemic Stance

Before processing, determine the source's epistemic stance — the role this piece plays in the user's thinking. Wikilink depth calibrates to stance (see Phase 4).

**Default stance: `resonates`** — if the user drops a source with no context, assume the content matters because it affirms, deepens, or confirms something they already believe or are building toward. The decision to distill is itself a signal of personal relevance.

**Override if signals are present in what the user said:**

| Signal                                                                                                                               | Stance          |
| ------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| "counterpoint to X", "I disagree but…", "devil's advocate", "this challenges my thinking on…", "playing the other side"              | `dialectical`   |
| "I'm exploring this", "not sure what I think", "interesting idea", "entertaining this", heterodox/conspiratorial content under critical examination | `entertaining`  |
| "new to me", "pushes my thinking on X", "expands my view of…", "hadn't considered this angle", "opens up…"                           | `expands`       |
| Explicit agreement, resonance, or no context at all                                                                                  | `resonates`     |

**Never ask** — infer and default. If the user provides context after the fact ("oh, I'm actually skeptical of this"), update the `stance` field in frontmatter and re-calibrate wikilinks accordingly.

For **Mode 2 batch runs**: apply one stance to the whole batch unless signals differ per item. Default to `resonates` when there's no signal.

**On heterodox / conspiratorial content:** `entertaining` is the right stance for ideas the user is stress-testing rather than endorsing. Engage seriously, apply critical scrutiny, and extract whatever is genuinely useful — a mechanism, a power dynamic, a mental model being illustrated — without treating unverified claims as facts. The wikilink strategy for this case is specified in Phase 4.

---

## Mode Detection

Decide the mode based on the user's input:

| Input                                                                                             | Mode                                    |
| ------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Article text pasted directly into chat                                                            | **Mode 0** — cheapest, no Tavily        |
| YouTube transcript pasted directly                                                                | **Mode 0** — process from context       |
| Single URL (`https://example.com/post`)                                                           | **Mode 1** — Tavily extract             |
| File path to a saved transcript (`.txt`, `.md`)                                                   | **Mode 1** — Read tool, no Tavily       |
| Multiple URLs                                                                                     | **Mode 2** — parallel Tavily fetch      |
| "Distill these N links…"                                                                          | **Mode 2** — parallel Tavily fetch      |

**Token note:** Mode 0 costs nothing beyond what's already in context. Mode 1 via Tavily costs ~3–8K tokens per article. Mode 2 multiplies by source count. If the user has the article open in a browser and is about to paste a URL for a single piece, suggest Mode 0 (paste the text) to save tokens.

---

## Mode 0 — Paste-In

When content is already in the chat:

1. Apply the **Archiving Lens** (see above). If fails → triage, stop.
2. Detect **epistemic stance** from any context. Default `resonates`.
3. Extract metadata: title, author, publication, date (ask if unclear from the text itself).
4. Skip Phase 1 (no fetch needed).
5. Proceed to Phase 2 (Classify & Route) onward.

Output format is identical to Mode 1. The only differences: content source, and stance is detected upfront rather than inferred from how a URL was shared.

---

## Mode 1 — Single Source (URL or File)

### Phase 1 — Fetch

**For URLs:** use `mcp__e331d111-426d-43aa-b42f-7a747635bf2a__tavily_extract` with:
- `urls`: list containing the URL
- `extract_depth: "advanced"` for paywalled, LinkedIn, or content-heavy pages
- `extract_depth: "basic"` otherwise (faster, cheaper)

**For file paths** (YouTube transcripts, saved `.md` / `.txt`): use the `Read` tool directly.

**If Tavily is unavailable or errors → stop and ask the user to reconnect it.** Do not fall back to Bash, curl, Python, WebFetch, or Chrome. Tavily sessions can log out or expire; that is the usual cause, and the user can reconnect in seconds. Silent fallbacks hide a recurring infra issue and break the workflow contract.

**If the source is paywalled or gated → stop and ask the user** whether they have access (existing subscription, institutional access, or a copy they can paste as Mode 0). Do not scrape partial text and pretend it's the article.

### Phase 1.5 — Attribution Check (added 2026-04-26)

**This step runs before Classify & Route. It applies the [[Attribution Convention]] codified in Decisions & Rules.**

For every framework, lens, recipe, or named concept the source introduces, ask:

1. **Is this an existing CCC-original Trademark Idea or vault Lens?** If yes → cite its existing vault location; treat the source as deepening or illustrating it, not creating it.
2. **Is this substantially the source author's framework?** If yes → name with author attribution (e.g., "Simmons-LOR-Taxonomy", "Stutz Three Qualities of Tools-Readiness", "Kübler-Ross Grief Cycle"). Even when CCC coins the term, if the work is substantially the author's, the naming reflects that.
3. **Is this CCC's discovery surfacing in this source?** Rare but possible — only mark as Trademark-candidate when the framework genuinely emerged from CCC's vault work (not the source). Default: assume the framework is the author's unless specific evidence says otherwise.

**Flag for the operator at distill-time** when an extracted framework needs an attribution decision. Do not silently auto-name. Add to the Report:
```
Attribution flags requiring decision:
- [Framework Name] — possible names: [author-attributed form] | [CCC-coined form] | [keep as-is in source]
  Recommendation: [author-attributed] because [reasoning]
```

**Frontmatter additions:**
- `paid_source: true` — when source is paywalled (Substack paid, paid courses, Mastery Manuals, paid PDFs). Triggers IP caveats at use-time (no full-text quoting in client deliverables or public CCC content without explicit licensing).
- `attribution_status: author-ip-canonical | ccc-original | parallel-developed-attribution-deferred | imported-with-attribution`
- `attribution_target: "[[Author Name]]"` (when applicable)

**Operator-decision rule (per [[Decisions & Rules]]):** Daniel decides distill vs. archive per-instance. Never default to one based on paid status alone. The `paid_source: true` flag is documentation, not a routing trigger.

### Phase 2 — Classify & Route

Determine the content domain and route to the appropriate subfolder. The routes below assume the default WELTENERNEUERER layout — if the vault uses a different structure (or no prefix numbers), adapt and ask when uncertain.

| Content domain                                                 | Route to                                                  |
| -------------------------------------------------------------- | --------------------------------------------------------- |
| **Lens** (mental model that shapes what the user sees)         | `01 - KNOWLEDGE BASE/Mental Models/Lenses/`               |
| **Operation** (repeatable cognitive move — e.g. Summarise, Contextualise) | `01 - KNOWLEDGE BASE/Mental Models/Operations/`    |
| **Recipe** (named sequence of operations for a result)         | `01 - KNOWLEDGE BASE/Mental Models/Recipes/`              |
| **Concept** (domain idea — AI, technology, business, civilisation) | `01 - KNOWLEDGE BASE/Concepts & Ideas/Domain Concepts/` |
| **Business / Marketing / GTM / Growth**                        | `01 - KNOWLEDGE BASE/Business & Marketing/`               |
| **Psychology / Archetypes / Personality**                      | `01 - KNOWLEDGE BASE/Archetypes & Psychology/`            |
| **Health / Biology / Performance**                             | `01 - KNOWLEDGE BASE/Health & Performance/`               |
| **Politics / History / Geopolitics / Power**                   | `01 - KNOWLEDGE BASE/Politics & History/`                 |
| **Books / Films / Music / Cultural works**                     | `01 - KNOWLEDGE BASE/Culture/`                            |
| **Reference** (author-focused — a thinker's body of work)      | `01 - KNOWLEDGE BASE/Thinkers & Philosophers/<Author>/`   |
| **Reflection** (the user's own draft, journal, or synthesis)   | `01 - KNOWLEDGE BASE/Concepts & Ideas/Personal Reflections/` |
| **Trademark-candidate** (looks like the user's named claim)    | Flag in Inbox; do NOT auto-file as Trademark              |
| **Unsorted / genuinely ambiguous**                             | `01 - KNOWLEDGE BASE/📥 Inbox/` — triage in weekly review |

**Category rules:**
- **Others' ideas are Lenses; the user's named claims are Trademarks.** If the source is by another thinker, do not file as a Trademark Idea even if the user agrees strongly — that violates the three-layer architecture and contaminates the Synthesis layer.
- **When a source doesn't fit any category, flag it** — do not silently auto-route to Inbox as a cop-out. A genuinely-new category is worth naming in the next weekly triage.
- **Meeting notes / call transcripts** route to `03 - OPERATIONS/Intelligence/meetings/<subtype>/`, not here. This skill distills *learning sources*; meeting intel has different retention and privacy rules.

### Phase 3 — Check for Existing Files

Before writing:
- `Glob` the target subfolder for the article title (stem match)
- `Glob` `Thinkers & Philosophers/` for the author

If an author profile exists → update (add the new work to their Key Works, update Connections).
If a note for this source already exists → update rather than duplicate.

### Phase 4 — Apply Wikilinks (Stance-Calibrated)

Wikilinks are graph edges. Depth and directionality reflect how this source relates to the user's existing thinking — not just what it names.

**Base rule (all stances):** Link any person, project, company, product, book, or framework that is (or could plausibly become) a vault note. Only link to **existing nodes** — creating `[[Cashflow Control Playbook]]` when no such note exists manufactures orphan links and fake graph density. If you want the node to exist, surface it as a TODO in the Report.

**Stance-specific depth:**

| Stance          | Wikilink approach                                                                                                                                                                                                                                                                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resonates`     | Link aggressively. Beyond named entities, also wikilink concepts this source *implicitly supports, illustrates, or deepens* — even if not explicitly named. This content is being woven into the user's worldview; graph density should reflect that.                                                                                                                    |
| `expands`       | Link named entities + the *frontier concepts* this source introduces or pushes past. Emphasise what's genuinely new. Link the existing vault notes at the edge this piece extends — not just what it confirms.                                                                                                                                                            |
| `dialectical`   | Link named entities + explicitly link the *opposing or complementary* vault notes — the ideas this source is in tension with. `[[Compound Learning]]` here means "this challenges that", not agreement. Create productive tension in the graph.                                                                                                                            |
| `entertaining`  | Conservative on claims, generous on analytical lenses. Link named entities and explicit key concepts — but for heterodox or conspiratorial content, do *not* link unverified claims as if they were facts. Instead, link to the *analytical frameworks* the content is invoking: power dynamics, epistemic concepts, systemic forces, mental models being illustrated. |

Apply wikilinks inline throughout the note — in the Core Argument, in each Key Idea, and in Connections. Not just at first mention.

### Phase 5 — Write the Knowledge Note

**File naming:** `[Title] — [Author Last Name].md`
**Save to:** the routed subfolder from Phase 2.

```markdown
---
source: [URL or file path]
author: [[Author Name]]
publication: [Publication name if applicable]
published: [YYYY if known, else omit]
ingested: [YYYY-MM-DD]
paid_source: [true | false]                           # added v1.5.1
attribution_status: [author-ip-canonical | ccc-original | parallel-developed-attribution-deferred | imported-with-attribution]   # added v1.5.1
attribution_target: "[[Author Name]]"                 # when applicable, added v1.5.1
stance: [resonates | expands | dialectical | entertaining]
archiving_lens: [pass | unsure-inbox]
category: [Lens | Operation | Recipe | Concept | Reference | Reflection | Trademark-candidate]
type: distill
tags: [3–5 lowercase tags]
---

## The Core Argument

[One to two sentences capturing the central thesis in the user's framing. What does the source claim? Why does it matter? Wikilinked.]

---

## Key Ideas

### 1. [Idea Name]

[3–5 sentences. Include a concrete example from the source where useful. Wikilinked.]

*Connection: [[Related node]] — one sentence on why.*

### 2. [Idea Name]

[Continue for each major idea — typically 3–7.]

---

## Quotes Worth Keeping

> "[Short, sharp quote that captures something precise]"

(Maximum 1–2. Only if genuinely worth keeping. Skip the section if nothing stands out.)

---

## Connections to the User's Work

[1–3 sentences. Specific, not generic ("this is relevant to AI"). Name the project, lens, decision, or active question this distill touches.]

---

## Mental Model / Concept Connections

- [[Existing node 1]] — why
- [[Existing node 2]] — why
- [[Thinker name]] — relationship to this author/idea

---

*Ingested [YYYY-MM-DD] · Distilled via knowledge-distill · Archived because: [one sentence naming WHICH of the five purposes — builds a mental model / widens the aperture / stress-tests a belief / reveals second-order effects / maps a macro force]*
```

### Phase 6 — Create or Update the Thinker Profile

**Create a new profile** if the author is a notable thinker, researcher, or practitioner who is likely to recur — and a profile doesn't yet exist.

**Update an existing profile** by appending to the Key Works table and updating Connections.

**Skip profiles** for journalists writing one-off pieces, anonymous authors, or clearly non-recurring figures.

```markdown
# [Full Name]
**Type:** Thinker / Researcher / Practitioner / Founder
**Domain:** [primary domain(s)]
**Role:** [current or best-known]

---

## Who They Are

[3–5 sentences. Background, intellectual contribution, why they matter.]

---

## Core Ideas

- **[Idea]** — one sentence
- **[Idea]** — one sentence

---

## Key Works

| Title                          | Year  | Theme        |
| ------------------------------ | ----- | ------------ |
| [[Article Title — Author]]     | [yr]  | [one phrase] |

---

## Connections

- [[Related Thinker]] — relationship
- [[Relevant Concept]] — why

---

*First added: [YYYY-MM-DD]*
```

### Phase 7 — Report

```
Distilled:
- [[Note Title]] → [subfolder]
- [[Author Profile]] → Thinkers & Philosophers/ (created | updated | skipped)

Category: [Lens | Operation | Recipe | Concept | Reference | Reflection | Trademark-candidate]
Stance: [resonates | expands | dialectical | entertaining]
Archiving Lens: [pass | unsure-inbox]
Wikilinks added: [[X]], [[Y]], [[Z]]
TODO nodes flagged: [[A]] (not yet created)  ← only if any
```

Keep it brief. The user can open the file if they want detail.

---

## Mode 2 — Batch (Multiple Sources)

### Phase 1 — Plan

Given multiple URLs or a list of file paths:
1. Apply the **Archiving Lens** per source. Drop the ones that fail; continue with those that pass. Report the drops.
2. Infer **one batch stance** when signals allow; otherwise detect per-source. Default `resonates`.
3. Confirm before fetching: "Found N sources. M pass the Archiving Lens. Stance: [X]. Proceed?"

### Phase 2 — Parallel Fetch

Fetch all URLs in parallel via `tavily_extract` (one call, `urls` = list). If Tavily is unavailable, stop and ask to reconnect — same rule as Mode 1. For file paths, use `Read` sequentially.

### Phase 3 — Process Sequentially

For each source:
1. Check for existing file (skip duplicates)
2. Categorise & route
3. Apply wikilinks (calibrated to stance)
4. Write the note
5. Create or update the thinker profile
6. Proceed to next

Report progress as you go.

### Phase 4 — Summary Report

```
Batch distill complete — N sources
Passed Archiving Lens: [M]
Skipped (failed lens): [K]
Stance applied: [stance]

Distilled:
- [[Note 1]] → [subfolder] (category)
- [[Note 2]] → [subfolder] (category)
...

Thinker profiles: [N created, M updated]
TODO nodes flagged: [[A]], [[B]]
```

---

## Special Source Types

### YouTube Transcripts

- **Pasted directly in chat**: token-heavy. Process from context (Mode 0), then offer to save the raw transcript to `01 - KNOWLEDGE BASE/📥 Inbox/[video-title]-transcript.md` for future reference.
- **File path to a saved transcript**: read with the `Read` tool (Mode 1, no Tavily). Preferred workflow: save transcript to vault → run the skill with the file path — cheaper and cleaner.
- Extract: speaker's 1–3 core claims, frameworks / models / stories referenced, memorable phrasings. Route + wikilink as any other source.

### Books (PDF or similar)

**Do not archive PDFs as Markdown** — the PDF itself IS the archive; duplicating it into the vault creates storage without compounding.

Instead: **chapter-level distills**. For each chapter, produce a distill note at the appropriate route. When the book teaches a framework worth operationalising, the full chain is:

`knowledge-distill` → [[framework-extractor]] → [[ccc-sop-creator]] → [[skill-creator-pro]]

This is the shipped path — the GTM plugin was produced from source material along this chain.

### Courses (video series, structured curricula)

**Do archive courses in the vault** — course structure benefits from being queryable as Markdown, unlike books which live better as PDF-plus-distills. After the archive, distill + SOP + skill along the same chain chapter-by-chapter.

### Client conversations / calls

Route to `03 - OPERATIONS/Intelligence/meetings/<subtype>/`, not the Knowledge Base. Meeting intel has different retention and privacy rules. This skill is for *learning sources*.

### The user's own drafts / reflections

Route to `01 - KNOWLEDGE BASE/Concepts & Ideas/Personal Reflections/` or `01 - KNOWLEDGE BASE/Synthesis/`, not Inbox. The user's own work skips the intake filter — it's already Identity-layer material.

---

## Rules (update when things go wrong)

1. **Never silently fall back from Tavily to Bash / curl / Python / WebFetch / Chrome.** Tavily failure = stop and ask the user to reconnect. Silent fallbacks hide recurring infra issues and break the workflow contract.
2. **Never scrape partial text from a paywalled source.** Paywall = stop and ask the user whether they have access (subscription, institutional, or a paste-in copy). Partial scrapes produce distorted distills.
3. **Output must be shorter than input.** If the distill is longer than the source, this is archival work — use [[knowledge-archive]] instead. A distill is a compression.
4. **Core claim in one sentence.** "This article discusses X" is metadata, not a distill. State what the source *argues*, not what topic it *covers*.
5. **Lineage named, every time.** An idea without an author or tradition cannot compound — it's a rumour. Create or update the thinker profile in the same pass.
6. **Wikilink only to existing nodes.** Orphan links manufacture fake density. Flag desired-but-missing nodes in the Report as TODO.
7. **Others' ideas are Lenses, not Trademarks.** Trademark-candidate flag surfaces in Inbox for the user to promote manually — never auto-file a source by another thinker as the user's named claim.
8. **Archiving Lens before work.** "Will the user want to re-read this — or its distilled form — in a year?" If no, stop. If unsure, Inbox with a one-line verdict — not final destination.
9. **Archive stance default `resonates`, never ask, always infer.** Override only on explicit signal. Update the frontmatter if the user corrects later.
10. **Folder paths above are defaults, not absolutes.** If the vault uses a different layout, adapt. When uncertain, ask before saving to the wrong place.
11. **Books don't get Markdown archives — chapter distills instead.** Courses do. Apply the book/course → plugin chain when the source teaches an operationalisable framework.
12. **Meeting notes route to Operations/Intelligence, not the Knowledge Base.**

---

## Anti-patterns

| Situation                                                                 | Broken output                                 | Root cause                                                  | Fix                                                                                     |
| ------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Distill of a source that failed the Archiving Lens                        | Vault bloats with "just in case" items        | Lens skipped; urgency to be complete                        | Apply the Lens first; triage to Inbox or discard.                                       |
| Distill longer than the source                                            | Full paragraphs copied in                     | Skill confused with archive                                 | Compress. If archiving is what the user wants, invoke [[knowledge-archive]] instead.    |
| Distill with no wikilinks to existing nodes                               | Orphan note; graph doesn't grow               | Categorise step skipped the Connect move                    | Surface at least one existing-node link or flag an honest TODO in the Report.           |
| Source by another thinker filed as Trademark                              | Three-layer architecture violated             | Strong agreement mistaken for authorship                    | Flag Trademark-candidate in Inbox; never auto-promote.                                  |
| Tavily quietly replaced with Bash/Chrome when it fails                    | Partial text; inconsistent results            | Old instruction to "fall back to Chrome"                    | Stop and ask the user to reconnect Tavily.                                              |
| Paywalled source scraped partially                                        | Distorted distill based on teaser content     | No paywall handling                                         | Stop and ask; accept a paste-in (Mode 0) if the user has access.                        |
| Stance never assigned; wikilinks applied identically to every source      | Graph is topical, not relational              | Epistemic stance skipped                                    | Infer stance (default `resonates`); calibrate wikilink depth in Phase 4.                |

---

## Self-Improvement

When the user corrects a routing decision: add a row (or clarify one) in Phase 2's routing table, and note the signal that was missed.

When the user corrects a stance: update the frontmatter, note the signal-to-stance heuristic that should have caught it, append to the stance table.

When a wikilink is missing on review: apply it if the node exists; if not, note whether that node needs to be created (and surface as TODO).

When a thinker appears repeatedly: create their profile proactively even if not prompted.

When a distill produces a strong "aha" connection (the user quotes it back, or it seeds a Trademark Idea): note what made the connection click and apply that framing to future notes in the same domain.

When Tavily fails on a specific domain pattern: note the pattern; document the paste-in workaround.

This skill compounds. Every source distilled adds to the knowledge graph through backlinks; the epistemic stance makes those backlinks meaningful rather than topical.
