---
name: ccc-seo-onboard
description: |
  Engagement-start orchestrator. Runs the interactive intake interview (BenAI Context Questionnaire pattern adapted for CCC), bootstraps the per-client SEO folder from template, captures author profile(s) per the author profile schema, captures brand voice, sets up GSC service account (or Cowork connector), captures WordPress REST API credentials, runs the baseline tools-audit, and emits the Phase 1 readiness report. After this skill completes, the client is ready for `ccc-seo-strategy-session`.
  Use this skill when an operator says "onboard a client", "start engagement", "set up [Client] SEO", "bootstrap the client", "kick off SEO for [Client]", or anytime a new client's SEO engagement begins. The first orchestrator any new client touches.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.1.0
  layer: orchestration-surface
  category: user-task-orchestrator
  composes:
    - ccc-seo-tools-audit
  reference_pattern: "BenAI Business & Personal Context Questionnaire (Courses/OS Setup Course/)"
distribution: ccc-internal
---

# ccc-seo-onboard — Engagement Start

**Workflow: Interactive intake → folder bootstrap → author + voice capture → credentials → baseline audit → readiness report.**

## What this is

The first session a new client goes through. Everything `ccc-seo-strategy-session` and downstream skills need is captured here: business context, ICP, focus (Service / Product / Hybrid), language(s), location(s), brand voice, author(s), credentials. Bootstraps the full per-client folder from the template. Runs the baseline audit so subsequent strategy work has a current state to plan against.

Modeled on BenAI's Business & Personal Context Questionnaire pattern (from the OS Setup course) but extended for SEO-specific capture (focus decision, library prefix, GSC connection, WP REST credentials, per-language voice profiles).

## When to use

- Engagement start: every new client onboarding to `ccc-seo-suite`.
- Re-onboarding: occasionally when major business pivot warrants re-baselining (rare — usually a strategy refresh handles drift).

## Inputs

- `client_name` (required) — the new client's name.
- `interactive` (optional, default true) — interactive intake. Non-interactive mode requires a pre-filled YAML brief instead.
- `brief_yaml` (required if non-interactive) — pre-filled answers to the intake questions.

## Procedure

### Stage 0 — Pre-flight

1. Verify client doesn't already exist (no folder collision at `02 - Clients/[Client_name]/`).
2. Read [[02 - Methodology|the methodology]] sections relevant to onboarding (§2 dual strategy, §3 company wikipedia, §10 operator's mental model — to be ready to explain what we're setting up).
3. Read the per-client folder template at `04 - Templates/_TEMPLATE - Client SEO Folder/`.

### Stage 1 — Interactive intake (~30-45 minutes)

If interactive, run the questions in this order. **One question at a time.** Wait for operator answer before moving on. Iterate if answers are vague.

**Block A — Identity & domain (5 min)**
1. Client legal name + display name.
2. Primary domain URL.
3. Subdomain or path-prefix arrangement (e.g., is the SEO content at `domain.com/library` or `blog.domain.com`?).
4. Library prefix preference (default `/library/`; common alternatives `/resources/`, `/insights/`, `/learn/`).

**Block B — Business context (10 min — adapted from BenAI Context Questionnaire)**
5. What does the business do? (1-2 sentence elevator pitch.)
6. Who is the ICP? (Specific role + company type + scale. Push past "anyone who needs X".)
7. What problem does the business solve for the ICP? (Specific, measurable.)
8. What's the offer mix? (Self-serve / high-touch / both.)
9. What's the rough revenue scale? (Affects engagement tier expectations.)

**Block C — Strategy decision (5-10 min)**
10. Walk operator through the dual strategy (Service Pillar→Silo→Sub-Silo vs. Product BOFU→MOFU→TOFU). Use methodology §2.
11. Operator decides focus: `Service` / `Product` / `Hybrid`. If Hybrid, partition decision (which URL space gets which strategy).
12. YMYL flag: is the client's content YMYL across all surfaces, partial YMYL (specific articles), or non-YMYL? Capture which YMYL domains apply (finance, health, legal, safety, parenting, government, major life decisions).

**Block D — Languages + locations (5 min)**
13. Primary language.
14. Additional languages (if any).
15. Primary location (country) — drives DataForSEO `location_code`.
16. Additional locations (if any).
17. For multi-language: WPML or Polylang installed? Hreflang setup needed?

**Block E — Brand voice (5-10 min)**
18. Existing brand voice document or guidelines? (If yes, read; we'll extract structure rather than re-derive.)
19. 3-5 tone characteristics (operator describes — direct, conviction-driven, accessible, technical, etc.).
20. Language DOs (3-5 specific patterns to use — outcome verbs, named examples, numbers, etc.).
21. Language DON'Ts (3-5 specific patterns to avoid — buzzwords, vague promises, passive voice, etc.).
22. 2-3 conviction statements (the brand's strong POVs about the market / problem / solution).

**Block F — Author profile(s) (5-10 min per author)**
23. Who writes? (Could be Daniel, the operator, the client themselves, or multiple.)
24. For each author: name, role, short bio (1-2 sentences), long bio (3-6 sentences for article-bottom block), credentials (3-5 items with year ranges), photo URL, LinkedIn URL, website (optional), Twitter (optional), languages they write in fluently, expertise areas.
25. YMYL qualification per author: per applicable YMYL domain (finance / health / legal / safety / etc.), is this author qualified? **Critical for YMYL clients — unqualified author + YMYL content = guaranteed indexing failure.**

**Block G — Credentials capture (5 min)**
26. GSC: does Cowork's GSC connector exist OR do we need a service account? Walk through service account setup (link to BenAI checklist's GSC instructions).
27. WordPress: REST API enabled? Application Password generated for Cowork to publish?
28. DataForSEO: API key available? (Pay-per-call. Operator decides whether client pays or CCC absorbs.)
29. Tavily: standing CCC credential — confirm available.

**Block H — Existing state (3-5 min)**
30. Existing pillar tree or content strategy? (If yes, capture as starting context — strategy-session won't re-derive from scratch.)
31. Existing GSC history? (How long has GSC been connected?)
32. Existing publishing cadence? (What rhythm is the client used to?)
33. Any prior SEO agency engagement? Outcomes? Lessons?

**Block I — Engagement parameters (3 min)**
34. Engagement length committed? (Default: 6 months minimum per methodology.)
35. Publishing cadence target? (1/wk / 2/wk / 3/wk / daily.)
36. Reporting cadence? (Weekly review default.)
37. Operator + client roles: who reviews drafts? Who approves publishes? Who receives weekly reports?

### Stage 2 — Bootstrap the folder

1. Copy the template folder structure from `04 - Templates/_TEMPLATE - Client SEO Folder/` to `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client_name]/SEO/`.
2. Populate template-placeholders in the seeded files:
   - `00 - Strategy.md` frontmatter: client, url, focus, languages, locations, library_prefix, ymyl_client, ymyl_domains, authors (wikilinks), brand_voice, created.
   - `00 - Strategy.md` body: Business Overview from intake (Block B), Strategy Choice rationale (Block C). Pillar Tree placeholder (filled by strategy-session).
   - `02 - URL Inventory.md` placeholder (filled by classify-urls).
   - `08 - GSC/opportunities.md` initial empty state.
   - `10 - Publishing Log.md` initial empty state.
   - `11 - Cohorts/winners-pattern.md` `status: insufficient-data` initial state.
   - `README.md` with client name in placeholders replaced.
3. Write author profile(s) per Block F to `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client_name]/SEO/_authors/` OR for canonical authors (Daniel, etc.) to `00 - COMMAND CENTER/Foundational Docs/Authors/`. See `03 - Schemas/author-profile-schema.md` for structure.
4. Write brand voice profile to `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client_name]/SEO/_voice/voice.md` (per primary language) and `_voice/voice.{lang}.md` for additional languages.

### Stage 3 — Credentials configuration

1. **GSC:**
   - If Cowork connector available: walk operator through OAuth.
   - If service account: walk through Google Cloud Console setup (creating a service account, granting it access to the GSC property). Reference BenAI setup checklist for the exact steps.
   - Verify connection: pull a small GSC query to confirm credentials work.
2. **WordPress:**
   - Walk operator through WordPress Application Password generation.
   - Store credentials securely (NOT inline anywhere — use Cowork's credential store).
   - Verify connection: GET `[domain]/wp-json/wp/v2/users/me` to confirm auth works.
3. **DataForSEO:**
   - Verify API key (operator-supplied).
   - Test call: small KW lookup to confirm.
4. **Tavily:**
   - Confirm standing CCC credential available.

### Stage 4 — Baseline audit

1. Invoke `ccc-seo-tools-audit` against the client domain in full mode.
2. Audit output persists to `01 - Tech Audit/full-{YYYY-MM-DD}.md`.
3. Summary surfaced to operator.

### Stage 5 — Readiness report

Generate a one-page readiness report at `_reports/onboarding/{YYYY-MM-DD}-readiness.docx`:
- Client overview (name, domain, focus, languages, locations).
- ICP + business context.
- Strategy decision + rationale.
- Author(s) captured + YMYL qualifications.
- Credentials status (all green or any missing flagged).
- Baseline audit summary (critical / high / medium / low issue counts).
- Recommended next step: run `ccc-seo-strategy-session` to build the pillar tree + topic queue.

### Stage 6 — Return

```yaml
status: ready | partial | aborted
client: "[[Client]]"
folder_path: "03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client]/SEO/"
strategy_choice: Service | Product | Hybrid
languages: [...]
authors_captured: <int>
ymyl_flagged: bool
credentials:
  gsc: connected | service-account-pending | missing
  wordpress: connected | missing
  dataforseo: connected | missing
  tavily: connected | missing
baseline_audit: { critical: <int>, high: <int>, ... }
readiness_report_path: "_reports/onboarding/..."
recommended_next: "Run ccc-seo-strategy-session"
```

## Non-interactive mode

If `interactive: false`, expect a `brief_yaml` input that pre-answers all 37 questions across Blocks A-I. Skill validates the YAML against required-field list and proceeds without operator prompts. Useful for batch onboarding of related clients (e.g., a partner firm onboarding multiple sub-clients with shared characteristics).

## Reference

Full methodology: [[02 - Methodology|CCC SEO AI Suite Methodology]] §10 (operator's mental model — what we're setting up), §2 (dual strategy decision), §5 (E-E-A-T + YMYL).

Author profile schema: [[03 - Schemas/author-profile-schema|author-profile-schema]].

Article frontmatter schema: [[03 - Schemas/article-frontmatter-schema|article-frontmatter-schema]] (for what subsequent skills will write).

Folder template: `04 - Templates/_TEMPLATE - Client SEO Folder/`.

BenAI Context Questionnaire reference: `01 - KNOWLEDGE BASE/Thinkers & Philosophers/Ben van Sprundel/Courses/OS Setup Course/Full Walkthrough - Setting Up The Second Brain/Business & Personal Context Questionnaire.md`.

## Anti-patterns

- Do NOT skip the strategy decision (Block C). Subsequent skills need this to know which prompt template family applies.
- Do NOT capture vague answers. "We help businesses with marketing" is not an ICP. Push for specificity.
- Do NOT skip YMYL flagging on YMYL clients. Hard-block thresholds depend on it.
- Do NOT skip author qualification check on YMYL clients. Unqualified author + YMYL = indexing failure.
- Do NOT inline credentials in any vault file. Use Cowork's credential store or the vault's secret-handling pattern.
- Do NOT proceed to strategy-session without a baseline audit. Strategy without current-state knowledge produces theoretical plans.
- Do NOT compress the intake. The 30-45 minutes pays off across the entire engagement; compressing produces missing context that later skills have to backfill awkwardly.
