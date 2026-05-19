---
name: ccc-seo-onboard
description: |
  Engagement-start orchestrator. Runs intake (interactive interview OR fast-forward from existing discovery-call findings), bootstraps the per-client SEO folder from template, captures author profile(s) + brand voice, sets up GSC service account + WordPress REST credentials + DataForSEO, runs the baseline tools-audit, and emits the Phase 1 readiness report. After this skill completes, the client is ready for `ccc-seo-strategy-session`.
  Use this skill when an operator says "onboard a client", "start engagement", "set up [Client] SEO", "bootstrap the client", "kick off SEO for [Client]", or anytime a new client's SEO engagement begins. ALSO use when a Discovery-Call has already happened and the intake-content is captured in a findings-file (intake_source=external_call) — the skill detects that and skips the 37-question interview. The first orchestrator any new client touches.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.2.0
  layer: orchestration-surface
  category: user-task-orchestrator
  composes:
    - ccc-seo-tools-audit
  shared_libs:
    - _lib/docx-helpers.js
  schemas:
    - schemas/onboarding-findings-schema.md
    - schemas/author-profile-schema.md
  folder_template: templates/_TEMPLATE - Client SEO Folder/
  reference_pattern: "BenAI Business & Personal Context Questionnaire (Courses/OS Setup Course/)"
distribution: ccc-internal
---

# ccc-seo-onboard — Engagement Start

**Workflow: Intake (interactive OR fast-forward from findings-file) → folder bootstrap → author + voice capture → credentials → baseline audit → readiness report.**

## What this is

The first session a new client goes through. Everything `ccc-seo-strategy-session` and downstream skills need is captured here: business context, ICP, focus, language(s), location(s), brand voice, author(s), credentials. Bootstraps the full per-client folder from the template. Runs the baseline audit so subsequent strategy work has a current state to plan against.

The skill supports three intake modes — choose by `intake_source`:

| Mode | When | What happens |
|------|------|--------------|
| `interactive` (default) | No prior call / no findings-file yet | Walks through the 30–45 min 37-question interview (Stage 1) |
| `external_call` | Discovery-Call already happened, findings captured in a findings-file | Validates findings against `schemas/onboarding-findings-schema.md`, skips Stage 1, jumps to Stage 2 (Folder Bootstrap). Only re-runs Stage 1 for individual blocks that fail validation |
| `brief_yaml` | Batch onboarding (e.g., partner firm with multiple sub-clients) | Reads YAML brief, no operator prompts |

This fast-forward pattern (added in v0.2.0) was developed after the first full engagement (Kai Reichel, May 2026) where the Discovery-Call had captured all 37 answers — re-running the interview would have been 30+ minutes of redundant work.

## When to use

- Engagement start: every new client onboarding to `ccc-seo-suite`.
- After Discovery-Call: when intake-content is already in a findings-file at `03 - OPERATIONS/Intelligence/meetings/client-calls/<date>-<client>-onboarding*.md` OR `02 - Clients/<Client>/SEO/_planning/onboarding-findings.md`.
- Re-onboarding: occasionally when major business pivot warrants re-baselining.

## Inputs

- `client_name` (required) — the new client's name.
- `intake_source` (optional, default `interactive`) — one of `interactive`, `external_call`, `brief_yaml`.
- `findings_path` (required if `intake_source=external_call`) — absolute path to findings-file (or wikilink resolvable from client folder).
- `brief_yaml` (required if `intake_source=brief_yaml`) — pre-filled answers to the intake questions.

## Procedure

### Stage 0 — Pre-flight

1. Verify client folder state at `02 - Clients/[Client_name]/SEO/`:
   - If folder doesn't exist → fresh onboarding, proceed.
   - If folder exists but `00 - Strategy.md` missing → onboarding partially started, continue from where left off.
   - If folder + `00 - Strategy.md` both exist → onboarding done before; STOP and confirm with operator whether to re-run.
2. Read the folder template at `templates/_TEMPLATE - Client SEO Folder/`.
3. **If `intake_source=external_call`:** locate findings-file (auto-search `03 - OPERATIONS/Intelligence/meetings/client-calls/*<Client>*onboarding*.md` if path not given) and validate against `schemas/onboarding-findings-schema.md`. Surface which blocks (A–I) are complete vs. missing.

### Stage 1 — Intake

**Mode-dependent.** Three branches:

#### Branch 1a: `intake_source=interactive` (default)

Run the 37 questions in this order. **One question at a time.** Wait for operator answer before moving on. Iterate if answers are vague.

#### Branch 1b: `intake_source=external_call` (fast-forward — added v0.2.0)

1. Read the findings-file in full.
2. For each onboarding-block A–I, validate per `schemas/onboarding-findings-schema.md`:
   - Block present (H2 with recognizable label)?
   - Required sub-fields present in block body (regex/heuristic match)?
3. Produce validation-report:
   ```
   Block A (Identity & Domain): ✓ complete — domain=kaireichel.de, library_prefix=/blog/
   Block B (Business Context):  ✓ complete — ICP captured
   ...
   Block F (Author Profile):    ⚠ partial — credentials-list missing year-ranges
   ```
4. **For blocks marked ⚠ partial or ✗ missing:** run only those specific blocks from Branch 1a interactively. **Do NOT re-ask blocks already complete in the findings.**
5. Capture all answers (existing-from-findings + newly-interactively-collected) into a unified intake-payload for Stage 2.

#### Branch 1c: `intake_source=brief_yaml` (batch mode)

Validate YAML against required-field list, proceed without operator prompts.

#### Question reference (used by Branch 1a + Branch 1b for missing blocks)

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

1. Copy the template folder structure from `templates/_TEMPLATE - Client SEO Folder/` (plugin-resident) to `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/[Client_name]/SEO/`. Use `mkdir -p` to create all subdirectories: `01 - Tech Audit`, `03 - Pillars`, `04 - Silos`, `05 - Sub-Silos`, `06 - Articles`, `07 - Research Briefs`, `08 - GSC`, `09 - Internal Linking`, `11 - Cohorts`, `_authors`, `_voice`, `_planning`, `_reports/onboarding`, `_reports/strategy-sessions`, `_reports/weekly`, `_reports/quarterly`.
2. Populate template-placeholders in the seeded files:
   - `00 - Strategy.md` frontmatter: client, url, focus, languages, locations, library_prefix, ymyl_client, ymyl_domains, authors (wikilinks), brand_voice, created.
   - `00 - Strategy.md` body: Business Overview from intake (Block B), Strategy Choice rationale (Block C). Pillar Tree placeholder (filled by strategy-session).
   - `02 - URL Inventory.md` placeholder (filled by classify-urls).
   - `08 - GSC/opportunities.md` initial empty state with prerequisites-check.
   - `10 - Publishing Log.md` initial empty state with schema + cohort-tracking table.
   - `11 - Cohorts/winners-pattern.md` `status: insufficient-data` initial state with expected-timeline.
   - `README.md` with client name in placeholders replaced + Quick-Nav.
3. Write author profile(s) per Block F to `02 - Clients/[Client_name]/SEO/_authors/<author-slug>.md` per `schemas/author-profile-schema.md`.
4. Write brand voice profile to `02 - Clients/[Client_name]/SEO/_voice/voice.<lang>.md` per primary language (one file per additional language).

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
2. Audit output persists to