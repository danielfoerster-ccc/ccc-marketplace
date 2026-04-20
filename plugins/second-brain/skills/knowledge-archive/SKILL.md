---
name: knowledge-archive
description: |
  Archives the full text of articles and publications into the vault — opposite of knowledge-distill. Preserves complete article content with a summary header on top. Wikilinks people, projects, and concepts throughout the full text, with link depth calibrated to epistemic stance (resonates / expands / dialectical / entertaining).

  Two modes: (1) Single URL — fetch one article, save full text + summary to the right KB subfolder. (2) Publication feed — enumerate posts from any RSS-enabled platform (Substack, Ghost, Beehiiv, WordPress, any blog), filter by date (all / last 3 / 6 / 12 months / since last scrape), and batch-archive matching articles. Tracks last_scraped on thinker profiles for incremental scraping.

  USE THIS SKILL when: user drops a link and wants the full article saved (not summarized), says "archive this", "save the full article", "scrape this Substack", "get all posts from X", "archive the last 6 months", or wants to build a reading archive of a specific author or publication.
allowed-tools: "Read, Write, Glob, Grep, Bash"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.3.0
  created: 2026-04-16
  updated: 2026-04-19
---

# Knowledge Archive Skill

**Workflow: Stance → Fetch → Preserve → Wikilink → Save → Report**

Full text in. Summary on top. Nothing lost. Drop a link or publication URL, get the complete article archived and wikilinked in the vault — with links calibrated to how this piece actually relates to the user's thinking.

The key distinction from knowledge-distill: that skill *replaces* the source with extracted ideas. This skill *preserves* the source — the full article lives in the vault, and the summary is a navigation aid, not a substitute.

---

## Foundational Philosophy

Archiving is an epistemic act, not storage. When someone chooses to archive a piece of writing, that choice is already meaningful — they don't collect indiscriminately. Something gets archived because it serves one or more of these purposes:

- **Build and refine mental models** — the article offers a framework, mechanism, or lens that improves future reasoning
- **Widen the aperture** — it genuinely expands what seems possible, thinkable, or true about how the world works
- **Stress-test existing beliefs** — it challenges priors, creates productive tension, or provides a counterweight to the user's default view (the antidote to echo chambers)
- **Sharpen strategic and second-order thinking** — it reveals downstream effects, system dynamics, or implications that aren't obvious at first pass
- **Understand macro forces** — it maps where things are going: geopolitically, technologically, economically, civilizationally, in terms of power or health or society

This is a knowledge graph built for *better decisions*, not for storage. The question guiding every archiving session is: how does preserving this make the user's thinking sharper, wider, and more honest?

This matters because wikilinks are not just references — they are edges in the knowledge graph. Their depth and directionality should reflect the *role* this article plays in the user's thinking, not just the topics it mentions. The distinction between a topical link ("this article mentions [[Compound Learning]]") and a relational link ("this article *deepens* [[Compound Learning]] with a new mechanism") is what makes the graph useful rather than decorative.

---

## Epistemic Stance

Before processing any article, determine its epistemic stance — the role this piece plays in the user's thinking.

**Default stance: `resonates`** — if the user drops a link or paste with no context, assume the content matters because it affirms, deepens, or confirms something they already believe or are building toward. The decision to archive is itself a signal of personal relevance.

**Override if signals are present in what the user said:**

| Signal | Stance |
|--------|--------|
| "counterpoint to X", "I disagree but…", "devil's advocate", "this challenges my thinking on…", "playing the other side" | `dialectical` |
| "I'm exploring this", "not sure what I think", "interesting idea", "entertaining this", "don't know if I agree", heterodox or conspiratorial content being examined critically | `entertaining` |
| "new to me", "pushes my thinking on X", "expands my view of…", "hadn't considered this angle", "opens up…" | `expands` |
| Explicit agreement, resonance, or no context at all | `resonates` |

**On heterodox and conspiratorial content:** `entertaining` is the right stance for ideas the user is stress-testing rather than endorsing — including conspiracy-adjacent claims. The correct epistemic posture here is neither dismissal nor credulity: engage seriously, apply critical scrutiny, and extract whatever is genuinely useful (a mechanism, a power dynamic, a mental model being illustrated) while not treating unverified claims as facts. The wikilink strategy for this case reflects this — see Phase 4.

**Never ask** — infer and default. If the user provides context after the fact (e.g., "oh actually I'm skeptical of this"), update the stance in the frontmatter accordingly.

For **Mode 2 bulk archives**: apply one stance to the whole batch. Infer from any context provided about the publication or author. Default to `resonates` when there's no signal.

---

## Mode Detection

Determine which mode applies based on the user's input:

- **Content pasted directly** (article text in the chat) → **Mode 0** ← cheapest, no Tavily
- **Single URL** (e.g., `https://blockbuster.thoughtleader.school/p/the-chat-trap`) → **Mode 1**
- **Publication/author URL** (e.g., `https://blockbuster.thoughtleader.school` or `michael-simmons.substack.com`) → **Mode 2**
- **RSS feed URL** (e.g., `https://blockbuster.thoughtleader.school/feed`) → **Mode 2**
- **"Scrape all posts from X"** or **"last N months from X"** → **Mode 2**

When ambiguous, default to Mode 1 and ask if they want the full publication instead.

**On token cost:** Mode 0 costs nothing — the content is already in context. Mode 1 costs ~3–8K tokens per article via Tavily. Mode 2 multiplies that by the number of articles. If the user is archiving a single article they have open in their browser, suggest copy-pasting the text directly (Mode 0) to save tokens.

---

## Mode 0 — Paste-In

When the user pastes article text directly into the chat:

1. **Detect epistemic stance** from any context the user provided when pasting (see Epistemic Stance section above). Default to `resonates`.
2. **Extract metadata** from the pasted content: title, author, publication name, publication date (ask if not clear from the text)
3. **Skip Phase 1** (no fetch needed — content is already in context)
4. **Proceed directly to Mode 1 Phase 2** (classify, route, check for existing file, wikilink, write, update thinker profile, report)

The output format is identical to Mode 1. The only differences are the source of content and that stance is detected upfront rather than inferred from how the URL was shared.

---

## Mode 1 — Single Article

### Phase 1: Fetch

Use `mcp__e331d111-426d-43aa-b42f-7a747635bf2a__tavily_extract` with:
- `urls`: list containing the article URL
- `extract_depth: "advanced"` — always use advanced for full text; basic may truncate

If Tavily is unavailable, stop and ask the user to reconnect it before proceeding. Do not fall back to Bash/curl/Python or WebFetch. Connectors must be reconnected, not bypassed.

### Phase 2: Classify and Route

Determine the content domain and route to the appropriate Knowledge Base subfolder. The paths below follow the standard second-brain folder structure — adapt them if the vault uses a different layout, and ask the user if you're unsure where things should go.

| Content domain | Save to |
|----------------|---------|
| AI, technology, civilisation | `Knowledge Base/Concepts & Ideas/` |
| Business, marketing, GTM, growth | `Knowledge Base/Business & Marketing/` |
| Mental models, frameworks, thinking tools | `Knowledge Base/Mental Models/` |
| Psychology, archetypes, personality | `Knowledge Base/Archetypes & Psychology/` |
| Health, biology, performance | `Knowledge Base/Health & Performance/` |
| Books, films, music, cultural works | `Knowledge Base/Culture/` |
| Thinker profiles / author notes | `Knowledge Base/Thinkers & Philosophers/` |
| Unsorted / unclear | `Knowledge Base/📥 Inbox/` |

When in doubt, route to Inbox. Don't block on classification.

### Phase 3: Check for Existing File

Before creating anything:
```
Glob: "**/[Article Title]*" in the target subfolder
```
If the file already exists, skip and report. Never duplicate.

### Phase 4: Apply Wikilinks

Wikilinks are not just references — they are edges in the user's knowledge graph. Their depth and directionality should reflect the article's epistemic stance, not just the topics it mentions.

**Base rule (all stances):** Link any person, project, company, or product that exists or could be a vault note. Link any mental model or framework explicitly named in the text.

**Stance-specific depth:**

| Stance | Wikilink approach |
|--------|------------------|
| `resonates` | Link aggressively. Beyond named entities, also wikilink concepts this article *implicitly supports, illustrates, or deepens* — even if they aren't explicitly named. This content is being woven into the user's worldview; the graph should reflect that density of connection. |
| `expands` | Link named entities + the *frontier concepts* this article introduces or pushes past. Emphasise what's genuinely new. Link the existing vault notes at the edge this piece extends — not just what it confirms. |
| `dialectical` | Link named entities + explicitly link to the *opposing or complementary* vault notes — the ideas this article is in tension with. A `[[Compound Learning]]` link here means "this challenges that", not agreement. Create productive tension in the graph. |
| `entertaining` | Conservative on claims, generous on analytical lenses. Link named entities and explicit key concepts — but for heterodox or conspiratorial content specifically, do *not* link unverified claims as if they were facts. Instead, link to the *analytical frameworks being applied*: the mental models, power dynamics, epistemic concepts, or systemic forces the content is invoking or illustrating. The graph engages with the thinking, not the unverified assertion. |

Apply wikilinks inline throughout the full text — not just at the first mention, not just in the summary. Also wikilink throughout the summary section.

### Phase 5: Write the Archive File

**File naming:** `[Article Title] — [Author Last Name].md`
**Save to:** the routed subfolder from Phase 2

```markdown
---
source: [URL]
author: [[Author Name]]
publication: [Publication Name]
published: [YYYY-MM-DD if known, else omit]
ingested: [YYYY-MM-DD]
stance: [resonates | expands | dialectical | entertaining]
type: full-text-archive
tags: [3-5 relevant lowercase tags]
---

## Summary

[3–5 sentences capturing the core argument and why it matters, written from the user's perspective.
Not a table of contents — a genuine "what is this about and why does it matter" paragraph.
End with one sentence on *why the user archived this* — specifically which purpose it serves:
does it build or refine a mental model? Widen the aperture? Stress-test a belief or avoid an echo chamber?
Reveal second-order effects or macro forces? The sentence should complete: "This was archived because..."
Wikilinked where applicable.]

---

## Full Article

[Complete article text as clean markdown.
Preserve all headings, subheadings, lists, blockquotes, and structure from the original.
Apply [[wikilinks]] throughout — calibrated to stance per Phase 4.
Never truncate. If the article is long, it's long. That's the point.]
```

### Phase 6: Create or Update Thinker Profile

If the author is a recurring figure, thinker, practitioner, or researcher:
- Check `Knowledge Base/Thinkers & Philosophers/` for an existing profile
- If found: add the article to their Key Works table
- If not found and the author is likely to appear again: create a profile using the template from knowledge-distill

Skip profiles for: journalists writing one-off pieces, anonymous authors, or people unlikely to recur.

### Phase 7: Report

```
Archived:
- [[Article Title — Author]] → [subfolder path]
- [[Thinker Profile]] → Thinkers & Philosophers/ (created / updated)

Stance: [resonates | expands | dialectical | entertaining]
Wikilinks applied: [[X]], [[Y]], [[Z]]
Full text: [word count] words preserved
```

---

## Mode 2 — Publication / Feed (Bulk Archive)

### Phase 1: Resolve the RSS Feed

Given a publication URL, resolve its RSS feed:

| Platform | Feed URL pattern |
|----------|-----------------|
| Substack | `[publication].substack.com/feed` |
| Ghost | `[domain]/rss/` or `[domain]/feed/` |
| Beehiiv | `[publication].beehiiv.com/feed` |
| WordPress | `[domain]/feed/` or `[domain]/rss.xml` |
| Generic blog | Try `/feed`, `/rss`, `/feed.xml`, `/atom.xml` in order |

Fetch the RSS feed with Tavily to get a list of all posts with titles, URLs, and publication dates.

If Tavily is unavailable, stop and ask the user to reconnect it.

### Phase 2: Detect Stance and Apply Date Filter

**Stance:** Infer from any context provided about the publication or author. Default to `resonates`. One stance applies to the whole batch.

**Date filter:** Ask the user which filter to apply if not already specified:
- **All** — archive everything
- **Last 3 months** — posts published in the last 90 days
- **Last 6 months** — posts published in the last 180 days
- **Last 12 months** — posts published in the last 365 days
- **Since last scrape** — check `last_scraped` field in the author's thinker profile; only fetch posts published after that date

### Phase 3: Confirm Before Fetching

Always confirm with the user before proceeding:

> "Found [N] total posts. Filter: [filter] = [M] articles to archive. Stance: [stance]. Proceed?"

Do not fetch anything until the user confirms.

### Phase 4: Batch Fetch and Archive

For each article in the filtered list:
1. Check for existing file (skip duplicates)
2. Fetch full text via Tavily (`extract_depth: "advanced"`)
3. Apply wikilinks (calibrated to the batch stance)
4. Write the archive file (same format as Mode 1)
5. Proceed to next article

Fetch in sequence to avoid overwhelming the context window. Report progress as you go.

### Phase 5: Update last_scraped

After a successful bulk scrape, update the author's thinker profile frontmatter:
```yaml
last_scraped: YYYY-MM-DD
```

If no thinker profile exists, create one and add the `last_scraped` field.

### Phase 6: Report

```
Bulk archive complete — [Author Name] / [Publication]
Stance applied: [stance]
Articles archived: [N]
Articles skipped (already existed): [N]
Date range: [earliest] → [latest]
last_scraped updated: [date]

Files saved to: [subfolder path]
```

---

## Rules

1. **Full text is the point — never truncate.** If the article is 5,000 words, the vault file is 5,000 words plus the summary header. The summary is a navigation aid, not a replacement.

2. **Wikilinks go throughout the full text, not just the summary.** Every mention of a person, project, or concept in the body gets wikilinked — not just the first mention, and not just in the header. Depth is calibrated to stance.

3. **Default stance is `resonates` — never ask, always infer.** The act of archiving is itself a signal. Only override if the user provides clear context. If they correct the stance later, update the frontmatter.

4. **Tavily unavailable = stop and ask.** Do not silently fall back to Bash, curl, Python, or WebFetch. The user can reconnect Tavily in seconds. Bypassing it breaks the workflow contract.

5. **In Mode 2, always confirm article count AND stance before fetching.** Batch operations are slow and consume tokens. "Found 47 articles, stance: resonates, proceed?" is the minimum — never start without user confirmation.

6. **Never duplicate.** Check for existing files before saving. If the file exists, skip and report — don't overwrite.

7. **Route to Inbox when uncertain.** Classification ambiguity should never block saving. Better a well-saved Inbox item than a delayed archive.

8. **`last_scraped` must be updated after every successful bulk scrape.** This is what makes incremental scraping work. If it's not updated, "since last scrape" will re-fetch everything next time.

9. **The summary's final sentence belongs to the user's thinking, not the article's argument.** It should answer "why did they save this?" oriented to purpose — builds a mental model, widens the aperture, stress-tests a belief, reveals a macro force, sharpens second-order thinking. Not "what does the article conclude?"

10. **Folder paths in the routing table are defaults, not absolutes.** If the user's vault uses a different structure, adapt. When uncertain, ask before saving to the wrong place.

---

## Self-Improvement

When Tavily truncates content unexpectedly: note the domain and try `extract_depth: "advanced"` explicitly. Add a note to the Rules section if it's a recurring pattern.

When a routing decision is corrected: add a row to the routing table or update the rule.

When a wikilink is missing on review: apply it and note whether it's a person/project/concept that needs a vault note created.

When a stance assignment is corrected by the user: update the frontmatter, then note what signal was missed so future inference can improve.

When Mode 2 fails on a specific platform: document the RSS feed pattern for that platform and add it to the routing table above.

This skill compounds. Every archived article adds to the knowledge graph through backlinks. The epistemic stance makes those backlinks meaningful, not just topical.
