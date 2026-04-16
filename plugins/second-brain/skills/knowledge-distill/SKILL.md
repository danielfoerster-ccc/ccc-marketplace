---
name: knowledge-distill
description: |
  Distills articles, essays, blog posts, or YouTube transcripts into compact knowledge notes in the vault.
  Extracts key ideas, core argument, and connections — output is always shorter than the original.
  NOT for archiving full text (use knowledge-archive for that).
  Fetches URLs automatically via Tavily, creates properly wikilinked notes,
  routes to the right KB subfolder, and creates or updates thinker/author profiles.
  Use this skill whenever a URL is dropped for learning and the user wants key ideas extracted —
  "save this", "add to vault", "what's the key idea here", "summarize this article",
  "distill this into the knowledge base". Also handles YouTube transcripts (pasted or file path).
  Handles single URLs, batches of URLs, and local transcript files.
  Never asks the user to copy-paste — fetches content automatically.
allowed-tools: "Read, Write, Glob, Grep, Bash"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.1.0
  created: 2026-04-01
  updated: 2026-04-16
---

# Knowledge Distill Skill

**Workflow: Fetch → Classify → Route → Save → Report**

Zero friction from URL to vault. Drop a link, get a wikilinked knowledge note. No copy-paste.

---

## Phase 0 — Input Detection

Detect what the user has provided:

- **Single URL** → fetch with `tavily_extract`, proceed
- **Multiple URLs** → fetch all in parallel with `tavily_extract`, process each
- **File path (YouTube transcript, .txt, .md)** → use `Read` tool, proceed
- **Content pasted directly** → use as-is, proceed

If Tavily is not connected, fall back to Chrome browser tools. Never use Bash/curl/Python to fetch URLs.

---

## Phase 1 — Fetch Content

Use `mcp__e331d111-426d-43aa-b42f-7a747635bf2a__tavily_extract` with:
- `extract_depth: "advanced"` for paywalled, LinkedIn, or content-heavy pages
- `extract_depth: "basic"` for everything else (faster, cheaper)
- `query`: set to "main argument key ideas thesis" to surface the most relevant content

For YouTube transcripts already in the vault: read with `Read` tool from the file path provided.

---

## Phase 2 — Classify Content

Determine:

1. **Content type**: article / essay / blog post / video transcript / podcast / thread
2. **Author**: who wrote or created it? Is this a notable public figure, thinker, or practitioner?
3. **Domain**: what area of knowledge does this cover?

Use this routing table:

| Content domain | Save to |
|---------------|---------|
| AI, technology, civilisation | `01 - KNOWLEDGE BASE/Concepts & Ideas/` |
| Business, marketing, GTM, growth | `01 - KNOWLEDGE BASE/Business & Marketing/` |
| Mental models, frameworks, thinking tools | `01 - KNOWLEDGE BASE/Mental Models/` |
| Psychology, archetypes, personality | `01 - KNOWLEDGE BASE/Archetypes & Psychology/` |
| Health, biology, performance | `01 - KNOWLEDGE BASE/Health & Performance/` |
| Books, films, music, cultural works | `01 - KNOWLEDGE BASE/Culture/` |
| Thinker profiles / author notes | `01 - KNOWLEDGE BASE/Thinkers & Philosophers/` |
| Unsorted / unclear | `01 - KNOWLEDGE BASE/📥 Inbox/` |

When in doubt, use the Inbox. Better to file loosely than to block.

---

## Phase 3 — Check for Existing Files

Before creating anything:

```
Glob: "**/[Author Name]*" in 01 - KNOWLEDGE BASE/Thinkers & Philosophers/
Glob: "**/[Article Title]*" in the target subfolder
```

If an author file exists: update it (add the new work to their Key Works table, update Connections if relevant).
If a note for this article already exists: update rather than duplicate.

---

## Phase 4 — Write the Knowledge Note

**File naming**: `[Article/Essay Title] — [Author Last Name].md`
Save to the routed subfolder determined in Phase 2.

**Note template**:

```markdown
# [Title]
**Author:** [[Author Name]]
**Published:** [Year if known]
**Source:** [URL]
**Type:** [Article / Essay / Video / Thread]
**Domain:** [domain tags]

---

## The Core Argument

[2–4 sentences capturing the central thesis in the operator's own framing. What is the author claiming? Why does it matter?]

---

## Key Ideas

### 1. [Idea Name]
[3–5 sentences explaining the idea. Include examples from the source where useful.]

*Connection: [[Related Mental Model or Concept]] — [one sentence on why]*

### 2. [Idea Name]
[Continue for each major idea — typically 3–7]

---

## Quotes Worth Keeping

> "[Short, sharp quote that captures something precise]"

(Maximum 1–2 quotes. Only if genuinely worth keeping. Skip section if nothing stands out.)

---

## Connections to Your Work

[1–3 sentences on how this connects to the operator's current projects, active thinking, or ongoing work. Make this specific — not generic "this is relevant to AI."]

---

## Mental Model / Concept Connections

- [[Mental Model 1]] — [why]
- [[Concept 2]] — [why]
- [[Thinker Name]] — [relationship to this author/idea]

---

*Ingested: [YYYY-MM-DD] via Tavily extraction + vault workflow*
```

---

## Phase 5 — Create or Update Thinker Profile

**Create a new thinker profile if:**
- The author is a notable public figure, thinker, researcher, or practitioner
- They are referenced in multiple sources or are likely to appear again
- They have a distinctive intellectual contribution worth tracking

**Update an existing profile if:**
- The author already has a file in `Thinkers & Philosophers/`
- Add the new work to their **Key Works** table
- Add any new concepts or connections discovered

**Thinker profile template** (for new profiles):

```markdown
# [Full Name]
**Type:** Thinker / Researcher / Practitioner / Founder
**Domain:** [primary domain(s)]
**Role:** [current role or what they're known for]

---

## Who They Are

[3–5 sentences on their background, intellectual contribution, and why they matter to the operator's thinking.]

---

## Core Ideas

- **[Idea]** — [one sentence]
- **[Idea]** — [one sentence]

---

## Key Works

| Title | Year | Theme |
|-------|------|-------|
| [[Article Title — Author]] | [year] | [one phrase] |

---

## Connections

- [[Related Thinker]] — [relationship]
- [[Relevant Concept]] — [why]

---

*First added: [YYYY-MM-DD]*
```

Skip thinker profiles for: journalists writing one-off pieces, anonymous authors, or people unlikely to be referenced again.

---

## Phase 6 — Handle YouTube Transcripts

When a YouTube transcript is provided (pasted or as a file path):

1. **If pasted directly**: token-heavy — process immediately from context, then offer to save the raw transcript to `01 - KNOWLEDGE BASE/📥 Inbox/[video-title]-transcript.md` for future reference
2. **If a file path**: use `Read` tool to read the transcript, process it
3. **Preferred workflow going forward**: save transcript file to vault first → run this skill with the file path → cheaper and cleaner

Extract from transcripts:
- Speaker's main argument (what was the 1–3 core claims?)
- Key frameworks, models, or stories referenced
- Memorable quotes or phrasing
- Apply same routing + wikilink logic as articles

---

## Phase 7 — Report

After saving, always report:

```
Saved:
- [[Note Title]] → [subfolder path]
- [[Thinker Profile]] → Thinkers & Philosophers/ (created / updated)

Wikilinks added: [[X]], [[Y]], [[Z]]
```

Keep it brief. The user can open the files if they want detail.

---

## Rules

1. **Never ask the user to copy-paste content.** Always fetch via Tavily or Read tool.
2. **Always wikilink** every person, concept, mental model, and project name that is (or could become) a vault note. This is how the knowledge graph compounds.
3. **Never create duplicate notes.** Check for existing files before creating.
4. **Route to Inbox when uncertain** — don't block on classification.
5. **Thinker profiles are for recurring figures only** — don't create one for every author.
6. **Keep summaries shorter than the original** — never reproduce large blocks of source text. Extract ideas, don't transcribe.
7. **Always connect to the operator's current work** — a knowledge note with no "Connections to Your Work" section is just a bookmark. Make it relevant.
8. **Batch processing**: if given multiple URLs, process all in parallel via parallel Tavily calls, then save sequentially.
9. **YouTube transcripts in the chat = token-heavy** — gently remind the operator of the preferred flow: save file → skill reads it. Process current one but note the better path.

---

## Self-Improvement

When the operator corrects a routing decision or wikilink: add a rule above.
When a content type doesn't fit the routing table: add a new row.
When a thinker appears repeatedly: create their profile proactively even if not prompted.
When a note produces a strong "aha" connection: note what made the connection click and apply that framing to future notes in the same domain.

This skill compounds. Every article ingested makes the next one richer through backlinks.
