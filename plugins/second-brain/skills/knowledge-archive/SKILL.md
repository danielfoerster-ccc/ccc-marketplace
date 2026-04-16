---
name: knowledge-archive
description: |
  Archives the full text of articles and publications into the vault — opposite of knowledge-distill, which extracts key ideas. Preserves complete article content with a summary header on top. Wikilinks people, projects, and concepts throughout the full text.

  Two modes: (1) Single URL — fetch one article, save full text + summary to the right KB subfolder. (2) Publication feed — enumerate all posts from any RSS-enabled platform (Substack, Ghost, Beehiiv, WordPress, any blog), filter by date (all / last 3 / 6 / 12 months / since last scrape), and batch-archive matching articles. Tracks last_scraped on thinker profiles for incremental scraping.

  USE THIS SKILL when: user drops a link and wants the full article saved (not summarized), says "archive this", "save the full article", "scrape this Substack", "get all posts from X", "archive the last 6 months", "I want to be able to re-read this", or wants to build a reading archive of a specific author or publication.
allowed-tools: "Read, Write, Glob, Grep, Bash"
metadata:
  author: Daniel Förster · Claude Cowork Consultants
  version: 1.0.0
  created: 2026-04-16
---

# Knowledge Archive Skill

**Workflow: Fetch → Preserve → Wikilink → Save → Report**

Full text in. Summary on top. Nothing lost. Drop a link or publication URL, get the complete article archived and wikilinked in the vault.

The key distinction: knowledge-distill *replaces* the source with extracted ideas. This skill *preserves* the source — the full article lives in the vault, and the summary is a navigation aid, not a substitute.

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

1. **Extract metadata** from the pasted content: title, author, publication name, publication date (ask if not clear from the text)
2. **Skip Phase 1** (no fetch needed — content is already in context)
3. **Proceed directly to Mode 1 Phase 2** (classify, route, check for existing file, wikilink, write, update thinker profile, report)

The output format is identical to Mode 1. The only difference is the source of the content.

---

## Mode 1 — Single Article

### Phase 1: Fetch

Use `mcp__e331d111-426d-43aa-b42f-7a747635bf2a__tavily_extract` with:
- `urls`: list containing the article URL
- `extract_depth: "advanced"` — always use advanced for full text; basic may truncate

If Tavily is unavailable, stop and ask the user to reconnect it before proceeding. Do not fall back to Bash/curl/Python or WebFetch. Connectors must be reconnected, not bypassed.

### Phase 2: Classify and Route

Determine the content domain and route using this table:

| Content domain | Save to |
|----------------|---------|
| AI, technology, civilisation | `01 - KNOWLEDGE BASE/Concepts & Ideas/` |
| Business, marketing, GTM, growth | `01 - KNOWLEDGE BASE/Business & Marketing/` |
| Mental models, frameworks, thinking tools | `01 - KNOWLEDGE BASE/Mental Models/` |
| Psychology, archetypes, personality | `01 - KNOWLEDGE BASE/Archetypes & Psychology/` |
| Health, biology, performance | `01 - KNOWLEDGE BASE/Health & Performance/` |
| Books, films, music, cultural works | `01 - KNOWLEDGE BASE/Culture/` |
| Thinker profiles / author notes | `01 - KNOWLEDGE BASE/Thinkers & Philosophers/` |
| Unsorted / unclear | `01 - KNOWLEDGE BASE/📥 Inbox/` |

When in doubt, route to Inbox. Don't block on classification.

### Phase 3: Check for Existing File

Before creating anything:
```
Glob: "**/[Article Title]*" in the target subfolder
```
If the file already exists, skip and report. Never duplicate.

### Phase 4: Apply Wikilinks

Before writing the file, scan the full article text and apply `[[wikilinks]]` to:
- Any person referenced (thinkers, authors, public figures)
- Any project, company, or product that exists or could be a vault note
- Any mental model, concept, or framework that is or could be a KB note
- Any vault note the article clearly connects to

Apply wikilinks inline — don't add a separate "connections" list when they're already in the text. Also wikilink throughout the summary.

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
type: full-text-archive
tags: [3-5 relevant lowercase tags]
---

## Summary

[3–5 sentences capturing the core argument and why it matters, written in Daniel's framing.
Not a table of contents — a genuine "what is this about and why does it matter" paragraph.
Wikilinked where applicable.]

---

## Full Article

[Complete article text as clean markdown.
Preserve all headings, subheadings, lists, blockquotes, and structure from the original.
Apply [[wikilinks]] throughout — not just at the first mention.
Never truncate. If the article is long, it's long. That's the point.]
```

### Phase 6: Create or Update Thinker Profile

If the author is a recurring figure, thinker, practitioner, or researcher:
- Check `01 - KNOWLEDGE BASE/Thinkers & Philosophers/` for an existing profile
- If found: add the article to their Key Works table
- If not found and the author is likely to appear again: create a profile using the template from knowledge-distill

Skip profiles for: journalists writing one-off pieces, anonymous authors, or people unlikely to recur.

### Phase 7: Report

```
Archived:
- [[Article Title — Author]] → [subfolder path]
- [[Thinker Profile]] → Thinkers & Philosophers/ (created / updated)

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

### Phase 2: Apply Date Filter

Ask the user which filter to apply if not already specified:
- **All** — archive everything
- **Last 3 months** — posts published in the last 90 days
- **Last 6 months** — posts published in the last 180 days
- **Last 12 months** — posts published in the last 365 days
- **Since last scrape** — check `last_scraped` field in the author's thinker profile; only fetch posts published after that date

### Phase 3: Confirm Before Fetching

Always confirm with the user before proceeding:

> "Found [N] total posts. Filter: [filter] = [M] articles to archive. Proceed?"

Do not fetch anything until the user confirms.

### Phase 4: Batch Fetch and Archive

For each article in the filtered list:
1. Check for existing file (skip duplicates)
2. Fetch full text via Tavily (`extract_depth: "advanced"`)
3. Apply wikilinks
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
Articles archived: [N]
Articles skipped (already existed): [N]
Date range: [earliest] → [latest]
last_scraped updated: [date]

Files saved to: [subfolder path]
```

---

## Rules

1. **Full text is the point — never truncate.** If the article is 5,000 words, the vault file is 5,000 words plus the summary header. The summary is a navigation aid, not a replacement.

2. **Wikilinks go throughout the full text, not just the summary.** Every mention of a person, project, or concept in the body gets wikilinked — not just the first mention, and not just in the header.

3. **Tavily unavailable = stop and ask.** Do not silently fall back to Bash, curl, Python, or WebFetch. The user can reconnect Tavily in seconds. Bypassing it breaks the workflow contract.

4. **In Mode 2, always confirm the article count before fetching.** Batch operations are slow and consume tokens. "Found 47 articles, proceed?" is the minimum — never start fetching without user confirmation.

5. **Never duplicate.** Check for existing files before saving. If the file exists, skip and report — don't overwrite.

6. **Route to Inbox when uncertain.** Classification ambiguity should never block saving. Better a well-saved Inbox item than a delayed archive.

7. **`last_scraped` must be updated after every successful bulk scrape.** This is what makes incremental scraping work. If it's not updated, "since last scrape" will re-fetch everything next time.

---

## Self-Improvement

When Tavily truncates content unexpectedly: note the domain and try `extract_depth: "advanced"` explicitly. Add a note to the Rules section if it's a recurring pattern.

When a routing decision is corrected: add a row to the routing table or update the rule.

When a wikilink is missing on review: apply it and note whether it's a person/project/concept that needs a vault note created.

When Mode 2 fails on a specific platform: document the RSS feed pattern for that platform and add it to the routing table above.

This skill compounds. Every archived article adds to the knowledge graph through backlinks.
