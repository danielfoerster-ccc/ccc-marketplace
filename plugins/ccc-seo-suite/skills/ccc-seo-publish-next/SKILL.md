---
name: ccc-seo-publish-next
description: |
  The weekly content session — orchestrator that ships ONE complete article end-to-end. Operator-facing user-task skill. Composes: pull next topic from queue → research-brief → write-article → quality gates (E-E-A-T + GEO + schema) → publish-wp → log + scaffold inbound links. The first orchestrator in the suite. Runs daily / 2-3x weekly per the client's cadence. One invocation = one article shipped to WordPress (or one explicit failure with diagnosis).
  Use this skill when an operator says "publish next article", "ship the next one", "write and publish", "do the content session", "next article please", or when the operator's daily rhythm calls for the content session. The orchestrator handles all the atomic-skill plumbing — operator just confirms each major stage and reviews the final article before publish.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob, Task"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: orchestration-surface
  category: user-task-orchestrator
  composes:
    - ccc-seo-research-brief
    - ccc-seo-write-article
    - ccc-seo-tools-content
    - ccc-seo-tools-geo
    - ccc-seo-tools-schema
    - ccc-seo-publish-wp
distribution: ccc-internal
---

# ccc-seo-publish-next — The Content Session

**Workflow: Pick topic → research → write → quality-gate → publish → log + link.**

## What this is

The weekly content session, end-to-end, in a single skill invocation. Composes 6 atomic skills into one operator-facing flow. Designed to run as a Cowork session of ~45-90 minutes (depending on shape complexity + how much operator review is requested at each stage).

Operator's view: "I want the next article shipped." This skill handles the plumbing.

## When to use

- Daily / 2-3x weekly: the content cadence the client has agreed to.
- Manual: operator wants to ship a specific topic out of normal cadence.
- Recovery: ship a corrective rewrite for an article that hit indexing issues.

## Inputs

- `client` (required) — wikilink to client.
- `topic` (optional) — wikilink to a specific topic file. If not provided, skill auto-pulls the highest-priority queued topic from `00 - Strategy.md` topic queue.
- `mode` (optional) — `new` (default) or `rewrite` (for republishing an existing article — requires existing article path).
- `existing_article_path` (required if mode=rewrite).
- `interactive` (optional, default true) — if false, runs end-to-end without operator review checkpoints. Use with caution.
- `auto_publish` (optional, default false) — if true and all gates pass, publishes without final operator approval. Use with caution.

## Procedure

### Stage 0 — Pre-flight

1. Read client config from `00 - Strategy.md`.
2. Verify required credentials available (DataForSEO, Tavily, GSC, WordPress).
3. If `topic` not provided: read topic queue from `00 - Strategy.md`, pick highest-priority topic with status `queued` and a satisfied research dependency. If queue is empty, surface and abort.
4. Validate the topic file (resolves, frontmatter complete).
5. **Operator checkpoint** (if interactive): confirm the topic to write. Operator can approve, swap, or refine before proceeding.

### Stage 1 — Research

1. Invoke `ccc-seo-research-brief` with the topic.
2. Surface the resulting brief path + 1-paragraph content gap hypothesis to operator.
3. **Operator checkpoint** (if interactive): operator reviews the brief. Three options:
   - Approve → proceed to write.
   - Refine the brief → operator edits the brief file directly, then approves.
   - Reject the topic → mark queue entry as `deferred` with reason; abort the session.

### Stage 2 — Write

1. Invoke `ccc-seo-write-article` with the brief.
2. The writer produces the full article (body + FAQ + author byline + meta + schema + image prompt).
3. Capture the article path + summary.
4. **Operator checkpoint** (if interactive): operator reviews the draft. Three options:
   - Approve → proceed to gates.
   - Request revision → operator describes what to change, skill calls writer again with revision instructions.
   - Reject the draft → if the writer can't produce something acceptable in 2 cycles, surface to operator for manual rewrite or topic refinement.

### Stage 3 — Quality gates

Run in order. Hard-fail aborts; warnings logged + surfaced.

1. **`ccc-seo-tools-schema`** validate mode against the article's JSON-LD blob. Hard-fail aborts.
2. **`ccc-seo-tools-content`** in `gate` mode against the article. Hard-fail aborts (YMYL + below threshold). Warn-only logged otherwise.
3. **`ccc-seo-tools-geo`** in `article-gate` mode. Warn-only at any level.

If any hard-fail aborts: surface failure reason + recommended fix. Operator can:
- Send back to writer (Stage 2) with the fix as a constraint, OR
- Manually edit the article + re-run gates, OR
- Abort entirely.

If all pass (or warn-only): article is publish-ready.

**Operator checkpoint** (if interactive): operator sees the gate results. If only warnings (no hard-fails), operator approves to publish or sends back for tightening.

### Stage 4 — Publish

1. Invoke `ccc-seo-publish-wp` with the validated article.
2. The publish skill: validates URL pattern, uploads featured image, POSTs to WordPress REST, captures `wp_post_id` + `wp_url`.
3. Updates article frontmatter (status: published, publish date, WP IDs).
4. Appends row to publishing log.

If publish fails: surface error. Common causes: WP REST API auth, slug collision, network timeout. Operator decides retry strategy.

### Stage 5 — Inbound link scaffolding (Phase 4 hook)

Phase 4 invokes `ccc-seo-link-internal` here for the immediate-publish pass.

In v0.2 (Phase 2 era — before link-internal exists): log a marker in the publishing log row (`link_scaffolding_pending: true`) so a future run can backfill.

### Stage 6 — Update topic queue

Mark the topic's queue entry as `published`. Add `published_date` and `wp_url`.

If the queue is now low (< 3 topics queued), surface a recommendation to run `ccc-seo-strategy-session` to refill via topic ideation.

### Stage 7 — Return summary

Return:
```yaml
status: published | failed | aborted
client: "[[Client]]"
topic: "[[topic-slug]]"
shape: glossary
language: de
article_path: "06 - Articles/2026-04-30 - efflorescence-removal.md"
brief_path: "07 - Research Briefs/efflorescence-removal.md"
wp_post_id: 1247
wp_url: "https://example.com/library/surface-cleaning/efflorescence-removal/"
gates:
  schema: pass
  eeat: pass (84/100)
  geo: warn (76/100 — structural ceiling flagged)
warnings: [...]
errors: []
duration_minutes: 47
operator_checkpoints: [<which stages required operator input>]
queue_remaining: 12   # topics still queued after this publish
```

## Special cases

### Mode: rewrite

When `mode: rewrite`:
- Stage 0: skip topic queue; use the supplied existing_article_path.
- Stage 1: research-brief still produces a brief, but writer reads existing article body as additional context.
- Stage 2: writer in rewrite mode (preserves slug + URL).
- Stage 3: gates run as normal.
- Stage 4: publish-wp in update mode (PUT not POST, preserves wp_post_id + URL).
- Publishing log row: `update` instead of `new publish`.

### Interactive vs non-interactive

In non-interactive mode (`interactive: false`):
- All operator checkpoints skipped.
- Hard-fails still abort; warnings still logged.
- The orchestrator produces or aborts; it does not pause for human decisions.
- Useful for: scheduled autonomous sessions, batch backfills, recovery sweeps.
- Risk: operator can't catch a bad write before it ships. Reserve for high-confidence flows.

### Auto-publish

`auto_publish: true` skips the post-gate operator approval (Stage 3 final checkpoint). Even if gates pass with warnings, publish proceeds.

Use case: high-cadence operations where the writer + gate pattern is well-calibrated and warnings rate is low.

Risk: warnings stop being seen by an operator. Combine with weekly reviews to catch drift.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] § all — this skill is the methodology in motion.

Article schema: [[03 - Schemas/article-frontmatter-schema|article-frontmatter-schema]].

Atomic skills composed:
- [[ccc-seo-research-brief]]
- [[ccc-seo-write-article]]
- [[ccc-seo-tools-schema]]
- [[ccc-seo-tools-content]]
- [[ccc-seo-tools-geo]]
- [[ccc-seo-publish-wp]]

## Anti-patterns

- Do NOT skip operator checkpoints in interactive mode. They exist because writer output requires human judgment, especially in early client engagements before voice + cohort calibrate.
- Do NOT auto-publish without explicit `auto_publish: true`. Default behaviour requires operator sign-off after gates.
- Do NOT proceed past a hard-fail. Hard-fails exist for E-E-A-T + schema reasons; bypassing them creates indexing failures.
- Do NOT pull topics that have status other than `queued` (e.g., `deferred`, `published`, `archived`).
- Do NOT silently update strategy or methodology files — those evolve through their own skills, not from publish-flow side effects.
