---
name: ccc-seo-publish-next
description: |
  The weekly content session — orchestrator that ships ONE complete article end-to-end. Operator-facing user-task skill. Composes (each as a scoped sub-agent dispatch): pull next topic from queue → research-brief → write-article → quality gates (E-E-A-T + GEO + schema) → publish-wp → log + scaffold inbound links. The first orchestrator in the suite. Runs daily / 2-3x weekly per the client's cadence. One invocation = one article shipped to WordPress (or one explicit failure with diagnosis).
  Use this skill when an operator says "publish next article", "ship the next one", "write and publish", "do the content session", "next article please", or when the operator's daily rhythm calls for the content session. The orchestrator plans and decides; each atomic skill runs as a dispatched sub-agent in its own clean context. Operator just confirms each major stage and reviews the final article before publish.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob, Task"
metadata:
  author: Claude Cowork Consultants
  version: 0.2.0
  layer: orchestration-surface
  category: user-task-orchestrator
  pattern: orchestrator-dispatch
  composes:
    - ccc-seo-research-brief
    - ccc-seo-write-article
    - ccc-seo-tools-content
    - ccc-seo-tools-geo
    - ccc-seo-tools-schema
    - ccc-seo-publish-wp
    - ccc-seo-link-internal
distribution: ccc-internal
---

# ccc-seo-publish-next — The Content Session

**Workflow: Orchestrate-by-Dispatch.** Pick topic → dispatch research → dispatch write → dispatch quality-gates → dispatch publish → dispatch log + link. The orchestrator plans, sequences, and decides; each atomic skill executes as a scoped sub-agent in its own clean context.

## What this is

The weekly content session, end-to-end, in a single skill invocation. Composes 6+ atomic skills into one operator-facing flow. Designed to run as a Cowork session of ~45-90 minutes (depending on shape complexity + how much operator review is requested at each stage).

Operator's view: "I want the next article shipped." This skill handles the plumbing.

## The orchestration model — read this before running

This skill is an **orchestrator-by-dispatch**, not an inline runner. The distinction is the whole point of v0.2.

Each composed atomic skill (`ccc-seo-research-brief`, `ccc-seo-write-article`, the three quality gates, `ccc-seo-publish-wp`, `ccc-seo-link-internal`) is a self-contained operational unit that does heavy work: DataForSEO SERP calls, multi-URL Tavily scrapes, long-form article generation, JSON-LD validation, WordPress REST pushes. If all of that runs *inline* in one context, every stage's scrape noise, raw API output, and generation scratch-work pollutes the next stage — and for production content that noise costs quality.

So the orchestrator **does not run those skills inline.** For each stage it:

1. **Assembles a complete brief** — exactly what the atomic skill needs to run standalone: the topic/article it's working on, the client folder, the specific file *paths* it must read (paths, never contents — see Rules), the expected output format, and the constraints. The brief is written as if to a smart colleague who just walked in with zero prior context. This is the [[Decisions & Rules#The Dispatch Decision Rule|briefing-quality principle]] — a sub-agent's output quality is a function of the brief, not of the sub-agent.
2. **Dispatches it as a scoped sub-agent** via the `Task` tool. The sub-agent loads the atomic skill, does the heavy work in a fresh throwaway context, writes its output file to the vault.
3. **Receives a summary back** — the structured return contract that atomic skill defines (a file path plus a short summary), nothing more.
4. **Carries only that summary forward.** The orchestrator's own context stays light: it holds the topic pick, the operator checkpoints, the cross-stage judgment, and the accumulating summaries — not the scrape dumps or the generation scratch.

**What stays in the orchestrator (never dispatched):** topic selection, sequencing decisions, the go/no-go call on quality-gate results, operator checkpoints, the publishing-flow judgment ("gate failed → send back to writer with X as a constraint"), and the final summary. The orchestrator *decides*; the sub-agents *execute*. This is the protected judgment layer — dispatching it would defeat the orchestrator's purpose.

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

### Stage 0 — Pre-flight (orchestrator, inline)

This stage is pure orchestrator judgment — topic selection and validation. It is NOT dispatched; it reads light config files and makes a decision.

1. Read client config from `00 - Strategy.md` — capture the client SEO folder root path, library prefix, languages, locations, and credential pointers. The orchestrator needs the *folder root path* to construct briefs for every downstream dispatch.
2. Verify required credentials are configured (DataForSEO, Tavily, GSC, WordPress). The orchestrator confirms they exist; the sub-agents will use them.
3. If `topic` not provided: read topic queue from `00 - Strategy.md`, pick highest-priority topic with status `queued` and a satisfied research dependency. If queue is empty, surface and abort.
4. Validate the topic file (resolves, frontmatter complete: `target_kw`, `intent`, `language`, `parent_silo`, `shape`, `author`).
5. **Operator checkpoint** (if interactive): confirm the topic to write. Operator can approve, swap, or refine before proceeding.

### Stage 1 — Research (dispatch `ccc-seo-research-brief`)

**Dispatch a scoped sub-agent** for `ccc-seo-research-brief`. The orchestrator does NOT run the SERP scan or the Tavily scrape itself — that is exactly the heavy, noisy work that belongs in a clean context.

**Brief to hand the sub-agent:**
- The skill to load: `ccc-seo-research-brief`.
- Task: produce a complete research brief for the confirmed topic.
- `topic_path` — full path to the topic file.
- `client` — the client wikilink, plus the client SEO folder root path.
- Files it must read (pass paths, not contents): the topic file, client `00 - Strategy.md`, client `02 - URL Inventory.md`, client `11 - Cohorts/winners-pattern.md` (note if status is `insufficient-data`), client brand voice profile.
- Credentials pointer: where DataForSEO + Tavily creds live (vault config path — never inline the creds).
- Expected output: a research brief written to `07 - Research Briefs/[topic-slug].md` with the structure that skill defines (SERP shape, content-gap hypothesis, outline, FAQ candidates, internal-link candidates, voice notes, cohort constraints, citation candidates).
- Return contract: the brief file path + a 1-paragraph content-gap hypothesis.

**On return:** the orchestrator receives `{brief_path, gap_hypothesis}`. Surface both to the operator.

**Operator checkpoint** (if interactive): operator reviews the brief. Three options:
- Approve → proceed to write.
- Refine the brief → operator edits the brief file directly, then approves.
- Reject the topic → mark queue entry as `deferred` with reason; abort the session.

### Stage 2 — Write (dispatch `ccc-seo-write-article`)

**Dispatch a scoped sub-agent** for `ccc-seo-write-article`. Long-form generation plus the writer's internal validate-and-re-prompt cycle is heavy and self-contained — it belongs in a fresh context, not the orchestrator's.

**Brief to hand the sub-agent:**
- The skill to load: `ccc-seo-write-article`.
- Task: produce the full article from the research brief.
- `brief_path` — the brief path returned by Stage 1.
- `client` — the client wikilink + SEO folder root path.
- `mode` — `new` or `rewrite`. If `rewrite`, also `existing_article_path`.
- Files it must read (paths, not contents): the research brief, client `00 - Strategy.md`, client brand voice profile, the resolved author profile, client `11 - Cohorts/winners-pattern.md` (if available), methodology §4 + §4.6.
- Expected output: a complete article (body + FAQ + author byline + meta + JSON-LD schema + hero image prompt) written to `06 - Articles/[YYYY-MM-DD] - [slug].md`.
- Constraints: enforce methodology hard requirements at the prompt level; the writer does its own one-cycle re-prompt on validation failure and returns an error rather than auto-iterating past that.
- Return contract: the article path + word count + FAQ count + internal-link counts + a 1-paragraph summary of what the article does.

**On return:** the orchestrator receives `{article_path, word_count, faq_count, link_counts, summary}`.

**Operator checkpoint** (if interactive): operator reviews the draft. Three options:
- Approve → proceed to gates.
- Request revision → operator describes what to change. The orchestrator **re-dispatches** `ccc-seo-write-article` with the revision instructions added to the brief (a fresh sub-agent, given the operator's change request as an explicit constraint).
- Reject the draft → if a re-dispatched write can't produce something acceptable in 2 cycles, surface to operator for manual rewrite or topic refinement.

### Stage 3 — Quality gates (dispatch each gate; orchestrator owns the go/no-go)

The three gates run in order. **Each gate is dispatched as its own scoped sub-agent** — raw gate output (scoring breakdowns, validation traces) is noise the orchestrator should not carry. But the **go/no-go decision on each gate result stays in the orchestrator** — that is protected judgment.

For each gate, dispatch with this brief shape: the skill to load, the mode, `article_path`, `client` + SEO folder root, the article file path to read, and the return contract (pass / warn / fail + score + reason). Then the orchestrator evaluates the returned verdict.

1. **Dispatch `ccc-seo-tools-schema`** in validate mode against the article's JSON-LD blob. Return contract: `pass | fail` + reason. Orchestrator: hard-fail aborts.
2. **Dispatch `ccc-seo-tools-content`** in `gate` mode against the article. Return contract: `pass | warn | fail` + E-E-A-T score + breakdown + whether the article is YMYL. Orchestrator: hard-fail aborts (YMYL + below threshold); warn-only logged otherwise.
3. **Dispatch `ccc-seo-tools-geo`** in `article-gate` mode. Return contract: GEO score + per-platform breakdown + structural-ceiling flag. Orchestrator: warn-only at any level.

**Orchestrator's go/no-go logic (inline, not dispatched):**

If any hard-fail aborts: surface the failure reason + recommended fix. Operator can:
- Send back to writer (re-dispatch Stage 2) with the fix as an explicit constraint in the brief, OR
- Manually edit the article + the orchestrator re-dispatches the gates, OR
- Abort entirely.

If all pass (or warn-only): article is publish-ready.

**Operator checkpoint** (if interactive): operator sees the gate results. If only warnings (no hard-fails), operator approves to publish or sends back for tightening.

### Stage 4 — Publish (dispatch `ccc-seo-publish-wp`)

**Dispatch a scoped sub-agent** for `ccc-seo-publish-wp`. The WordPress REST push, image upload, markdown-to-HTML conversion, and payload build are self-contained operational work.

Note: `ccc-seo-publish-wp` *also* composes the three quality gates internally as its own last-line-of-defence. That is intentional and preserved — Stage 3's gate pass is the orchestrator's pre-flight; publish-wp re-runs them as the final hard gate before the article exists publicly. Do not strip that.

**Brief to hand the sub-agent:**
- The skill to load: `ccc-seo-publish-wp`.
- Task: publish the validated article to WordPress.
- `article_path` — the article path from Stage 2.
- `client` — the client wikilink + SEO folder root path.
- `mode` — `new` (POST) or `update` (PUT, rewrite mode — article frontmatter must carry `wp_post_id`).
- `schedule_date` — if the operator wants a scheduled publish rather than immediate.
- Files it must read (paths, not contents): the article file, client `00 - Strategy.md` (for URL pattern + categories), the `10 - Publishing Log.md`.
- Credentials pointer: where the WordPress Application Password lives (vault config — never inline).
- Expected output: article POSTed/PUT to WordPress; article frontmatter updated (status, publish date, WP IDs, gate scores); a row appended to `10 - Publishing Log.md`.
- Return contract: `success` + `wp_post_id` + `wp_url` + `publish_date` + gate verdicts + warnings + errors.

**On return:** the orchestrator receives the publish result.

If publish fails: surface the error. Common causes: WP REST API auth, slug collision, network timeout. The sub-agent does NOT retry automatically; the orchestrator surfaces it and the operator decides retry strategy (which is a re-dispatch).

### Stage 5 — Inbound link scaffolding (dispatch `ccc-seo-link-internal`)

**Dispatch a scoped sub-agent** for `ccc-seo-link-internal` in `scaffold` mode for the immediate-publish pass. Building the link graph and scoring candidate source articles across the client's content base is heavy, self-contained work.

**Brief to hand the sub-agent:**
- The skill to load: `ccc-seo-link-internal`.
- Task: scaffold ≥3 inbound internal links (≥2 cross-cluster) to the newly-published article.
- `client` — the client wikilink + SEO folder root path.
- `mode` — `scaffold`.
- `target_article` — the article path from Stage 4.
- `apply` — `true` if the operator has pre-approved auto-apply, otherwise `false` (produces a diff report for operator review).
- Files it must read (paths, not contents): the target article, client `02 - URL Inventory.md`, client `06 - Articles/`, client `00 - Strategy.md`, client `11 - Cohorts/winners-pattern.md` (if available), the most recent GSC pull.
- Credentials pointer: WordPress Application Password location (if `apply: true`).
- Expected output: either applied inbound links via WP REST + a diff report, or a proposed-changes report at `09 - Internal Linking/scaffold-{slug}-{date}.md`.
- Return contract: inbound count + cross-cluster count + the diff/report path + whether thresholds were met (if not, the strategic-gap signal).

**On return:** the orchestrator receives the scaffolding result. If thresholds couldn't be met, carry that strategic-gap signal into the final summary.

*Note: the 7-day and 14-day re-scaffold passes (methodology §4.5 cadence) run from their own scheduled task, also as dispatched `ccc-seo-link-internal` sub-agents — they are not this orchestrator's responsibility, but the final summary should note that the cadence is now armed.*

### Stage 6 — Update topic queue (orchestrator, inline)

Pure orchestrator bookkeeping — not dispatched.

Mark the topic's queue entry in `00 - Strategy.md` as `published`. Add `published_date` and `wp_url`.

If the queue is now low (< 3 topics queued), surface a recommendation to run `ccc-seo-strategy-session` to refill via topic ideation.

### Stage 7 — Return summary (orchestrator, inline)

The orchestrator assembles the final summary from the stage-return summaries it carried forward — it does NOT re-read the heavy intermediate files.

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
inbound_links_scaffolded: 4   # cross_cluster: 2
warnings: [...]
errors: []
duration_minutes: 47
operator_checkpoints: [<which stages required operator input>]
stages_dispatched: [research-brief, write-article, tools-schema, tools-content, tools-geo, publish-wp, link-internal]
queue_remaining: 12   # topics still queued after this publish
```

## Special cases

### Mode: rewrite

When `mode: rewrite`:
- Stage 0: skip topic queue; use the supplied `existing_article_path`.
- Stage 1: the dispatched `ccc-seo-research-brief` still produces a brief; the brief's purpose shifts to "what's not working + how to fix it." Add `existing_article_path` to its brief so it can read the underperforming article as context.
- Stage 2: the dispatched `ccc-seo-write-article` runs in rewrite mode (brief includes `existing_article_path`; the writer preserves slug + URL).
- Stage 3: gates dispatched as normal.
- Stage 4: the dispatched `ccc-seo-publish-wp` runs in `update` mode (PUT not POST, preserves `wp_post_id` + URL).
- Publishing log row: `update` instead of `new publish`.

### Interactive vs non-interactive

In non-interactive mode (`interactive: false`):
- All operator checkpoints skipped.
- The dispatch structure is unchanged — every stage still runs as a scoped sub-agent.
- Hard-fails still abort; warnings still logged.
- The orchestrator produces or aborts; it does not pause for human decisions.
- Useful for: scheduled autonomous sessions, batch backfills, recovery sweeps.
- Risk: operator can't catch a bad write before it ships. Reserve for high-confidence flows.

### Auto-publish

`auto_publish: true` skips the post-gate operator approval (Stage 3 final checkpoint). Even if gates pass with warnings, the orchestrator proceeds to dispatch Stage 4.

Use case: high-cadence operations where the writer + gate pattern is well-calibrated and warnings rate is low.

Risk: warnings stop being seen by an operator. Combine with weekly reviews to catch drift.

## Rules (Update This Section When Things Go Wrong)

1. **Every dispatch carries a complete, self-contained brief.** The orchestrator's job at each stage is to compress the *relevant* context into a brief that lets the atomic skill run standalone: the skill to load, the task, the exact file paths, the expected output, the return contract, the constraints. An under-briefed sub-agent corrodes the output — a well-briefed one does not. Write the brief as if to a smart colleague with zero prior context. This is the briefing-quality principle and it is non-negotiable.
2. **Pass file paths, not file contents, in briefs.** For anything over ~30 lines (strategy doc, voice profile, URL inventory, the article itself), hand the sub-agent the *path* and let it read the file once in its own context. Pasting contents into the brief re-bloats the orchestrator's context — the exact thing dispatch is meant to avoid.
3. **The orchestrator never does an atomic skill's work inline.** No running the SERP scan, no generating the article, no building the WP payload in the orchestrator's context. If you catch yourself doing the work instead of briefing-and-dispatching, stop — that is the v0.1 monolithic-session failure mode this skill exists to fix.
4. **Protected judgment stays in the orchestrator — never dispatched.** Topic selection, stage sequencing, the go/no-go call on quality-gate results, operator checkpoints, the "gate failed → re-dispatch writer with X as constraint" decision, and the final summary. The orchestrator decides; the sub-agents execute.
5. **Quality-gate hard-fails abort — no exceptions.** A dispatched gate returning a hard-fail (schema HowTo/missing-type, YMYL E-E-A-T below threshold) aborts the publish. Hard-fails exist for indexing-failure reasons; the orchestrator does not override a sub-agent's hard-fail verdict.
6. **`ccc-seo-publish-wp` re-running the gates internally is intentional — do not strip it.** Stage 3's gate pass is the orchestrator's pre-flight; publish-wp re-runs them as the final hard gate before the article goes public. Two passes, by design.
7. **Carry summaries forward, not intermediate files.** The orchestrator holds the stage-return summaries (paths + short summaries) — it does not re-read the research brief, the article body, or the gate breakdowns to assemble the final summary. The summaries it received are sufficient.
8. **Do NOT skip operator checkpoints in interactive mode.** They exist because writer output requires human judgment, especially in early client engagements before voice + cohort calibrate.
9. **Do NOT auto-publish without explicit `auto_publish: true`.** Default behaviour requires operator sign-off after gates.
10. **Do NOT pull topics with status other than `queued`** (e.g., `deferred`, `published`, `archived`).
11. **Do NOT silently update strategy or methodology files.** Those evolve through their own skills, not from publish-flow side effects. The orchestrator's only write to `00 - Strategy.md` is the Stage 6 queue-entry status update.

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] § all — this skill is the methodology in motion.

Article schema: [[03 - Schemas/article-frontmatter-schema|article-frontmatter-schema]].

Dispatch doctrine: [[Decisions & Rules#The Dispatch Decision Rule|The Dispatch Decision Rule]] — the briefing-quality principle is the core of this skill's orchestration model.

Atomic skills composed (each dispatched as a scoped sub-agent):
- [[ccc-seo-research-brief]] — Stage 1
- [[ccc-seo-write-article]] — Stage 2
- [[ccc-seo-tools-schema]] — Stage 3
- [[ccc-seo-tools-content]] — Stage 3
- [[ccc-seo-tools-geo]] — Stage 3
- [[ccc-seo-publish-wp]] — Stage 4
- [[ccc-seo-link-internal]] — Stage 5

## Anti-patterns

| Situation | Broken output | Root cause | Fix |
|-----------|---------------|------------|-----|
| Orchestrator runs the SERP scan / article generation itself | Orchestrator context bloats with scrape dumps + generation scratch; later-stage quality degrades | Treating composed skills as inline steps instead of dispatch targets | Brief-and-dispatch every atomic skill; the orchestrator only plans, sequences, and decides |
| Brief pastes the strategy doc / article body inline | The dispatch saves nothing — the orchestrator's context still carries the heavy content | Confusing "hand off the work" with "hand off the text" | Pass file *paths*; the sub-agent reads them once in its own context |
| Thin brief ("write the article for this topic") | Sub-agent produces generic output, missing voice / cohort constraints / methodology requirements | Under-briefing — the quality risk is briefing quality, not the sub-agent | Complete brief: skill, task, exact paths, expected output, return contract, constraints |
| Orchestrator overrides a dispatched gate's hard-fail | Article with E-E-A-T/schema failure ships; indexing fails | Treating the gate verdict as advisory | Hard-fail aborts; the go/no-go is the orchestrator's only gate authority, and hard-fail is not negotiable |
| Dispatching topic selection or the gate go/no-go | Loses the cross-stage judgment that makes the session coherent | Over-dispatching — dispatching the decisions, not just the execution | Protected judgment stays in the orchestrator; only execution is dispatched |
| Final summary rebuilt by re-reading intermediate files | Orchestrator re-bloats at the end; defeats the whole pattern | Not trusting the stage-return summaries | Assemble the final summary from the summaries already carried forward |

## Self-Improvement

When an operator corrects an output or identifies something that consistently goes wrong:
- Add a rule to the Rules section above.
- Note what the failure mode was and what fixed it.

When a dispatch produces a weak sub-agent output:
- The first suspect is brief quality, not the atomic skill. Check what context the brief omitted, then tighten the brief shape for that stage.

When an operator approves a clean run:
- Note which brief shapes produced the strongest sub-agent outputs; those become the reference brief templates.

This skill is never finished. The more it is used, the better the briefs get.

## Version history

- **v0.2.0 (2026-05-14)** — Restructured from inline-invocation to **orchestrator-by-dispatch**. Each composed atomic skill (research-brief, write-article, the three quality gates, publish-wp, link-internal) is now an explicit scoped sub-agent dispatch with a complete brief and a stated return contract, rather than an inline "invoke X" step. The orchestrator's protected judgment — topic selection, sequencing, gate go/no-go, operator checkpoints — stays inline; only execution is dispatched. `ccc-seo-link-internal` added to `composes:` (Stage 5 was a Phase 4 hook in v0.1). Added `## Rules`, anti-patterns table, `## Self-Improvement`, and `pattern: orchestrator-dispatch`. Implements Phase 1 of the [[2026-05-14 — Multi-Agent & Token-Efficiency Architecture — Assessment]]. Note: this skill is all-dispatch only because all 7 of its composed units are independently heavy + self-contained — that is a property of this skill, not a template to copy. The reference for the other SEO orchestrators is the **Dispatch-Selection Rule** (dispatch a composed unit only when it is both heavy AND self-contained; keep light decision units and synthesis stages inline), established by the [[2026-05-20 — SEO Orchestrator Dispatch — Head-to-Head Test]]. Per skill-creator-pro: this was a surgical structural pattern-change against a pre-defined target, so the full eval loop was not run — the real validation is the dispatched-vs-sequential test in Phase 2.
- **v0.1.0** — Initial build. Inline-invocation orchestrator composing 6 atomic skills.
