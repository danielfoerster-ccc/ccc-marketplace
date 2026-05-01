---
name: ccc-seo
description: |
  Entry router for the CCC SEO AI Suite. Top-level skill that operators invoke when they don't know which sub-skill to use. Reads the operator's intent + the client's current state, routes to the appropriate orchestrator (onboard / strategy-session / publish-next / weekly-review / quarterly-review) or atomic skill. Also explains what the suite contains, what each skill does, and the typical workflow rhythms.
  Use this skill when an operator says "SEO suite", "ccc seo", "what should I do for [Client]'s SEO", "where do I start", "I'm not sure which SEO skill to run", "help me with SEO", or anytime the operator is uncertain which suite skill applies. Always use as the entry point if the user hasn't specified a specific sub-skill.
allowed-tools: "Read, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: orchestration-surface
  category: entry-router
  routes_to:
    - ccc-seo-onboard
    - ccc-seo-strategy-session
    - ccc-seo-publish-next
    - ccc-seo-weekly-review
    - ccc-seo-quarterly-review
    - ccc-seo-tools-audit
    - ccc-seo-tools-page
    - ccc-seo-tools-optimize
    - ccc-seo-classify-urls
    - ccc-seo-ideate-topics
distribution: ccc-internal
---

# ccc-seo — Suite Entry Router

**Workflow: Listen for intent → assess client state → route to the right skill.**

## What this is

The front door of `ccc-seo-suite`. Operators don't need to memorise 22 skill names. They invoke `ccc-seo`, describe what they want or what client they're working on, and this router picks the right next step.

Mirrors the entry-router pattern used by `ccc-cashflow-start`, `ccc-buyback`, `ccc-audit-start`.

## When to use

- Operator is uncertain which skill to invoke.
- Operator describes a goal in plain language and wants the suite to figure out the path.
- New operator orienting to the suite for the first time.
- Cross-client context-switching ("I want to do something for Client A vs. Client B").

## Procedure

### Step 1 — Determine operator intent

Listen for one of these intent types. Often the operator says one directly; sometimes you derive from context.

| Intent | Routes to |
|---|---|
| "I want to start with a new client" / "onboard [Client]" | `ccc-seo-onboard` |
| "Build the strategy" / "generate the pillar tree" / "topic queue" | `ccc-seo-strategy-session` (mode=initial if first time, mode=refresh if existing strategy) |
| "Publish the next article" / "ship the next one" / "do today's content session" | `ccc-seo-publish-next` |
| "Weekly review" / "GSC review" / "what should I act on this week" | `ccc-seo-weekly-review` |
| "Quarterly review" / "cohort analysis" / "strategy refresh" | `ccc-seo-quarterly-review` (Phase 4 — until then, route to `weekly-review` with a note) |
| "Audit the site" / "Seomator audit" / "tech audit" | `ccc-seo-tools-audit` |
| "Audit this page" / "single-page review" | `ccc-seo-tools-page` |
| "Pull GSC" / "GSC opportunities" / "striking distance" | `ccc-seo-tools-optimize` |
| "Classify URLs" / "URL inventory" | `ccc-seo-classify-urls` |
| "Generate topics" / "ideate" | `ccc-seo-ideate-topics` |
| "What does the suite do?" / "explain the suite" | (this skill — explain inline, Step 4 below) |
| "What's the status of [Client]?" | (this skill — read state + summarise, Step 5 below) |

### Step 2 — Assess client state

If the intent involves a specific client, check the client folder at `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/`:

- Folder exists? → existing client.
- Folder doesn't exist? → suggest `ccc-seo-onboard` first regardless of stated intent.
- `00 - Strategy.md` populated with pillar tree? → strategy is built.
- Topic queue has queued items? → ready for `publish-next`.
- `10 - Publishing Log.md` has rows? → has published content.
- `11 - Cohorts/winners-pattern.md` status ≠ `insufficient-data`? → cohort intelligence active.

Use this state assessment to:
- Validate the operator's intent is achievable (e.g., can't run `weekly-review` on a client with no published articles yet).
- Suggest the right mode for the chosen orchestrator (e.g., `strategy-session` mode=`initial` vs. `refresh`).
- Flag missing prerequisites ("client onboarded but no strategy yet — run `ccc-seo-strategy-session` before `publish-next`").

### Step 3 — Route or guide

If the intent + state combination has a clear next skill: confirm with the operator, then suggest invoking it.

Example:
> "You want to publish the next article for [[Heiko Lube]]. Their topic queue has 27 queued items, with 'Efflorescence Removal' as next-up by priority. Run `ccc-seo-publish-next` against [[Heiko Lube]]?"

If the intent + state combination has dependencies: surface them.

Example:
> "You want to run weekly review for [[New Client]]. They've onboarded but no articles published yet — weekly review against an empty publishing log will produce a near-empty report. Suggest waiting until at least 4 articles are live, OR running `ccc-seo-publish-next` to get started. Which do you prefer?"

If the operator is uncertain: walk them through the typical workflow (Step 4).

### Step 4 — Explain the suite (when asked)

Briefly:

> The CCC SEO AI Suite runs an AI-native SEO operation for any client end-to-end. Three sessions on cadence:
>
> - **`ccc-seo-publish-next`** — daily / 2-3x weekly. One article shipped end-to-end (research → write → quality gates → WordPress publish).
> - **`ccc-seo-weekly-review`** — weekly. GSC pull + opportunity surfacing + action queue + .docx report.
> - **`ccc-seo-quarterly-review`** — quarterly (Phase 4+). Cohort analysis + strategy refresh decision + brand-presence audit.
>
> Plus the one-time setup skills:
>
> - **`ccc-seo-onboard`** — engagement start. Intake, folder bootstrap, credentials, baseline audit.
> - **`ccc-seo-strategy-session`** — full strategy build (audit → classify → plan → topic queue). Runs at onboarding and at quarterly refreshes.
>
> 6 months minimum engagement. Sirion's 5-6 month timeline is the anchor — anything shorter sells premature failure.
>
> Methodology: [[02 - Methodology]]. Project plan: [[00 - Project Plan]].

### Step 5 — Surface client status (when asked)

If asked "what's the status of [Client]?", read:
- `00 - Strategy.md` (focus, languages, pillar tree, queue state)
- `10 - Publishing Log.md` (last 10 publishes + cohort eligibility)
- `08 - GSC/opportunities.md` (top 5 active opportunities)
- `01 - Tech Audit/` most recent (last audit date + critical count)
- `11 - Cohorts/winners-pattern.md` (status)

Produce a 1-paragraph summary:
> [Client] is on Service strategy, German + English, Surface Cleaning + Manufacturing pillars active. 14 articles published, 12 in queue. Last weekly review 2026-04-23 surfaced 3 striking-distance rewrites + 1 content-gap candidate. Last audit 2026-03-15 showed 2 critical issues (now resolved). Cohort: insufficient data (n=4 at d90).

## Decision matrix

When operator's intent isn't crystal clear, this matrix helps:

| If client folder doesn't exist | → `ccc-seo-onboard` |
| If onboard done but no strategy | → `ccc-seo-strategy-session` mode=initial |
| If strategy exists but topic queue empty | → `ccc-seo-strategy-session` mode=refresh OR `ccc-seo-ideate-topics` against an existing parent |
| If queue has items + no recent publish | → `ccc-seo-publish-next` |
| If 4+ articles published + no recent weekly review | → `ccc-seo-weekly-review` |
| If 12+ articles aged ≥90d + no recent quarterly | → `ccc-seo-quarterly-review` (Phase 4+) |
| If site has technical issues + audit stale | → `ccc-seo-tools-audit` |
| If single-page concern surfaces | → `ccc-seo-tools-page` |

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]].

All skills:
- Orchestration: [[ccc-seo-onboard]], [[ccc-seo-strategy-session]], [[ccc-seo-publish-next]], [[ccc-seo-weekly-review]]
- Atomic substrate: [[ccc-seo-tools-audit]], [[ccc-seo-tools-optimize]], [[ccc-seo-tools-content]], [[ccc-seo-tools-geo]], [[ccc-seo-tools-plan]], [[ccc-seo-tools-page]], [[ccc-seo-tools-technical]], [[ccc-seo-tools-schema]], [[ccc-seo-tools-sitemap]], [[ccc-seo-classify-urls]], [[ccc-seo-ideate-topics]], [[ccc-seo-research-brief]], [[ccc-seo-write-article]], [[ccc-seo-publish-wp]], [[ccc-seo-trigger-rewrite]]
- Future (Phase 4+): `ccc-seo-analyze-cohort`, `ccc-seo-link-internal`, `ccc-seo-quarterly-review`
- Future (Phase 5+): `ccc-seo-brand-presence`, `ccc-seo-dashboard`

## Anti-patterns

- Do NOT route directly without confirming with operator. Operator may want to do something different than the obvious next step.
- Do NOT route to a skill whose prerequisites aren't met. Surface the gap and guide.
- Do NOT explain the entire suite when operator just wants a quick route. Match the verbosity to the intent.
- Do NOT make up client state. If client folder doesn't exist, say so. Don't synthesize a status from nothing.
