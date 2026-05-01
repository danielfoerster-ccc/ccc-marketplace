---
name: ccc-seo-link-internal
description: |
  Cross-article internal linking. Dual-mode: (a) NEW-article scaffolding — for a newly-published article, identifies and applies ≥3 inbound links from related existing content within 14 days post-publish (the empirical winner predictor per methodology §4.5); (b) RETROFIT — full audit + improvement pass across an existing content base (called by ccc-seo-rescue for engagement-start retrofit on clients with substantial pre-existing content). Both modes enforce 3-4 cross-cluster recommendations per article (not just same-silo). Updates WordPress via REST API. Diff reports persisted to `09 - Internal Linking/`.
  Use this skill when an operator says "internal linking", "link audit", "scaffold links", "build internal links", "fix internal linking", or when `ccc-seo-publish-next` runs the post-publish scaffolding pass, or when `ccc-seo-rescue` runs the retrofit pass at engagement start.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: atomic-substrate
  category: novel-ccc
distribution: ccc-internal
---

# ccc-seo-link-internal — Internal Linking (Scaffold + Retrofit)

**Workflow: Receive mode → load article tree + GSC + cohort → propose links → apply via WP REST → diff report.**

## What this is

The internal linking skill. Fixes one of the highest-ROI / lowest-effort SEO levers in existence. Works in two modes:

- **NEW-article scaffolding** (default): for a newly-published article, find related existing articles + add inbound internal links from them to the new one. Runs at publish + 7d + 14d (the empirical "≥3 inbound within 14 days" winner predictor).
- **RETROFIT**: full audit-and-improve pass over an existing content base. Called by `ccc-seo-rescue` at engagement start. Identifies orphan pages, weak-linking pages, missing cross-cluster connections, broken internal links. Builds an improvement queue ordered by ROI.

Both modes enforce the cross-cluster requirement (3–4 cross-cluster recommendations per article, not just same-silo) — this is what builds the wikipedia-style entity-relationship signal that compounds topical authority.

## When to use

- **Scaffolding mode:** triggered by `ccc-seo-publish-next` orchestrator at publish time; re-triggered at 7d + 14d post-publish via scheduled task.
- **Retrofit mode:** triggered by `ccc-seo-rescue` at engagement start (if client has > 20 existing articles); also operator-triggerable for periodic full audits (e.g., quarterly).
- **Manual:** operator wants to add specific links between specific articles.

## Inputs

- `client` (required) — wikilink.
- `mode` (required) — `scaffold` (default for new-article post-publish) or `retrofit` (for engagement-start full audit) or `manual` (operator-driven specific changes).
- `target_article` (required if `scaffold` mode) — the article that needs inbound links built.
- `apply` (optional, default false) — if true, applies changes via WP REST. If false, produces diff report only for operator review.

## Procedure

### Mode: scaffold (post-publish)

#### Step 1 — Load context

Read:
- The target article (frontmatter, body, parent_silo, cluster, language).
- Client `02 - URL Inventory.md` (full list of existing articles + their classifications).
- Client `06 - Articles/` (suite-published articles with full frontmatter — for relevance scoring).
- Client `00 - Strategy.md` (pillar tree).
- Client `winners-pattern.md` (if available — informs which articles are higher-leverage to link from).
- The most recent GSC pull (top-performing pages — linking from them transfers more authority).

#### Step 2 — Identify candidate source articles

For each existing article in the inventory, score relevance to the target on:
- Same parent silo (high relevance — strong topical match)
- Cross-cluster but topically adjacent (medium relevance — these become the cross-cluster recommendations, mandatory)
- Pillar-level pages (always candidates — articles should up-link to their pillar; this is the authoritative source-of-truth direction)
- Currently ranking well in GSC (high authority — links from them transfer more juice)
- Recently updated (Google weights links from recently-active pages)

Output: top 8–12 candidate source articles, ranked by combined score.

#### Step 3 — Generate anchor text suggestions

For each candidate, propose:
- The exact insertion point in the source article body (paragraph + sentence).
- The anchor text (natural language, not exact-match keyword stuffing).
- Why this candidate matters (relevance rationale).

Use Claude (Sonnet) with this system prompt:

```
You are inserting cross-article internal links into an existing source article. The link points to a newly-published target article.

For each suggested insertion:
- Find a natural sentence in the source article that already mentions the target article's topic or a closely-related concept.
- Propose anchor text that fits the sentence's flow — natural, contextual, not exact-match keyword stuffing.
- Provide the exact paragraph + sentence + character offset for insertion.

Constraints:
- Do NOT alter source article meaning. Inserts only — never paraphrase the source.
- Do NOT use exact-match keyword anchors. "Click here" is bad. "[exact target keyword]" is also bad. Aim for natural noun phrases that contextualize the link.
- Do NOT propose insertions in already-linked sentences (would create double-linking).
- Do NOT propose insertions in headings, FAQ blocks, or author bio sections.
```

#### Step 4 — Filter to ≥3 inbound + ≥3 cross-cluster

Select the top suggestions ensuring:
- ≥3 total inbound links (the empirical winner threshold).
- Of those, ≥2 are cross-cluster (different parent silo from the target).
- ≥1 is from a high-GSC-authority page (top 20% of client's pages by clicks).

If the candidate pool can't meet these thresholds, surface the constraint to the operator — there isn't enough related content yet to scaffold properly. This is actually useful signal ("strategic review: target article has no cross-cluster anchors — consider whether it needs more sister content").

#### Step 5 — Apply (if `apply: true`) or report (if `apply: false`)

**Apply mode:**
- For each selected insertion, fetch the source article from WordPress, apply the inserts, PUT back via WP REST.
- Capture diff per article.
- Update target article frontmatter: `internal_links_in: <new count>`.

**Report mode:**
- Generate a proposed-changes report at `09 - Internal Linking/scaffold-{target-slug}-{YYYY-MM-DD}.md`.
- Operator reviews + approves before re-running with `apply: true`.

#### Step 6 — Append to internal-linking log

Append a row to `09 - Internal Linking/log.md`:
```
| Date | Target | Mode | Source articles modified | Inbound count | Cross-cluster count | Operator notes |
```

### Mode: retrofit (engagement-start)

#### Step 1 — Full inventory load

Read entire URL inventory + every existing article's metadata (title, H1, internal-link counts, cluster) — both suite-published AND pre-suite content.

#### Step 2 — Build the link graph

For each article, count:
- `internal_links_out` — links it currently has to other articles on the site
- `internal_links_in` — inbound links from other articles
- `cross_cluster_in` — inbound links from articles in other clusters
- `cross_cluster_out` — outbound links to other clusters
- `up_link_to_pillar` — does it link up to its parent pillar?
- `orphan` — `internal_links_in == 0`?

#### Step 3 — Identify retrofit opportunities

Categorise articles into improvement buckets, ranked by ROI (highest first):

**Tier 1 — Orphans:** articles with 0 inbound internal links. Highest leverage; usually a 5-link retrofit doubles their inbound score. Propose 5+ inbound from related content per orphan.

**Tier 2 — Weak inbound (< 3):** articles with 1–2 inbound links. Common pattern in agency-built sites. Propose enough inbound to bring them to ≥ 5 (winner-cohort threshold + buffer).

**Tier 3 — No cross-cluster connections:** articles with all inbound from same silo only. Propose cross-cluster recommendations from topically-adjacent silos.

**Tier 4 — Missing up-link to pillar:** silos / sub-silos that don't link up to their parent pillar. The hub-and-spoke breaks without up-links. One-line fix per article.

**Tier 5 — Broken internal links:** outbound links pointing to URLs that 404 or have moved. Fix via redirect or remove.

**Tier 6 — High-authority sources under-linking:** top 20% pages by GSC clicks have fewer than 5 outbound internal links. Adding 3–5 outbound from each transfers significant authority.

#### Step 4 — Build the retrofit queue

For each opportunity, propose:
- The change (what link to add, where, anchor text).
- The expected impact (low / medium / high).
- The effort (one-link insertion vs. multi-article batch).

Order by ROI (impact / effort).

#### Step 5 — Operator review

Surface the retrofit queue for operator approval. Operator can:
- Approve the full queue → proceed to apply.
- Approve in batches (Tier 1 first, then re-run for Tier 2-6).
- Reject specific items.
- Drop entire tiers (e.g., skip Tier 5 if it's tackled elsewhere).

#### Step 6 — Apply

Same as scaffolding mode's Step 5 — fetch source articles from WP, apply inserts, PUT back.

For Tier 1 (orphans), this often means modifying many source articles to insert links pointing to one orphan. Batch carefully to avoid stale-fetch race conditions.

#### Step 7 — Retrofit report

Generate a `.docx` report at `_reports/rescue-retrofit/internal-linking-{YYYY-MM-DD}.docx`:
- Pre-retrofit state (orphan count, weak-inbound count, etc.).
- Changes applied per tier.
- Post-retrofit state.
- Recommendations for ongoing maintenance (link-internal in scaffold mode runs from publish-next + 7d + 14d going forward).

### Mode: manual

Operator-driven. Provides source article + target article + proposed anchor + insertion point. Skill validates + applies. Used for ad-hoc cross-linking decisions.

## Cross-cluster enforcement

Both scaffold and retrofit modes ENFORCE the cross-cluster requirement. From methodology §3.5: "Every article carries 3-4 cross-cluster internal-link recommendations in addition to same-silo links. This is the single biggest differentiator between a real 'company wikipedia' and a flat blog."

If at any point the proposed links can't meet cross-cluster thresholds (target has no topically-adjacent silos, retrofit can't find cross-cluster sources for orphans), surface explicitly:
- "Target article has no cross-cluster anchors available. Consider whether the topic warrants its own silo or whether it should fold into an adjacent cluster."

This often surfaces strategic gaps the strategy skill missed.

## Diff reports

Every retrofit / scaffold run produces a diff report at `09 - Internal Linking/{mode}-{date}.md` showing exactly what changed. The internal linking log at `09 - Internal Linking/log.md` is the running record. Both are read by `ccc-seo-trigger-rewrite` as input for opportunity evaluation.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §3.5 (cross-cluster linking — the wikipedia mechanic), §4.5 (internal linking timing — ≥ 3 inbound within 14 days as winner predictor).

## Anti-patterns

- Do NOT propose exact-match keyword anchors. Natural noun phrases only.
- Do NOT propose links from FAQ blocks, headings, or author bio sections.
- Do NOT skip cross-cluster enforcement. Same-silo-only linking flattens the topical authority signal.
- Do NOT auto-apply in retrofit mode without operator approval. Bulk changes have bulk consequences.
- Do NOT delete inventory entries when retrofitting orphans. Orphan resolution is a fix, not a deletion.
- Do NOT modify source article meaning. Insert links into existing sentences, never paraphrase or restructure.
- Do NOT scaffold from low-quality source articles to a new target. The candidate scoring should already filter these out, but double-check: linking from junk content hurts, doesn't help.
