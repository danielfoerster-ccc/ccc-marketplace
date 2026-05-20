---
name: ccc-seo-onboard
description: |
  Engagement-start orchestrator. Runs intake (interactive interview OR fast-forward from existing discovery-call findings), bootstraps the per-client SEO folder from template, captures author profile(s) + brand voice, sets up GSC service account + WordPress REST credentials + DataForSEO, runs the baseline tools-audit, and emits the Phase 1 readiness report. After this skill completes, the client is ready for `ccc-seo-strategy-session`.
  Use this skill when an operator says "onboard a client", "start engagement", "set up [Client] SEO", "bootstrap the client", "kick off SEO for [Client]", or anytime a new client's SEO engagement begins. ALSO use when a Discovery-Call has already happened and the intake-content is captured in a findings-file (intake_source=external_call) — the skill detects that and skips the 37-question interview. The first orchestrator any new client touches.
allowed-tools: "Read, Write, Edit, Bash, WebFetch, Glob"
metadata:
  author: Claude Cowork Consultants
  version: 0.3.0
  layer: orchestration-surface
  category: user-task-orchestrator
  pattern: orchestrator-selective-dispatch
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

## The orchestration model — read this before running

This orchestrator uses **selective dispatch** — and it is the *lightest-dispatch* of the five SEO orchestrators, because most of its stages are interactive intake, light file-writes, or synthesis. The dispatch decision rule applies at *sub-skill granularity inside this orchestrator*: dispatch a composed unit as a scoped `Task` sub-agent **only when it is both (a) genuinely heavy** — loads a large playbook/wrap, scrapes, generates long-form, or processes large data — **and (b) self-contained** — its result is consumable by the next stage as a structured return or a persisted file read by path. Keep inline: interactive intake, light decision/config steps, and any synthesis stage where the orchestrator must see the data. This is the [[Decisions & Rules#The Dispatch Decision Rule|Dispatch Decision Rule]] applied per composed unit, established by the [[2026-05-20 — SEO Orchestrator Dispatch — Head-to-Head Test]].

Applied to this skill's stages:

- **Stage 1 — Intake → INLINE.** The 37-question interview (Branch 1a) is interactive operator dialogue; the findings-file validation (Branch 1b) and the YAML parse (Branch 1c) are light reads + heuristic checks. None of it is heavy or dispatchable — the interactive branch *cannot* be dispatched at all (a sub-agent has no operator to talk to). It must stay in the main session.
- **Stage 2 — Folder bootstrap → INLINE.** Copying the template tree and populating placeholder files is light file I/O over the intake payload the orchestrator already holds. No heavy load, no scrape — dispatching it would pay a sub-agent's spawn cost to isolate nothing.
- **Stage 3 — Credentials configuration → INLINE.** Interactive credential setup + small verification calls. Interactive and light — and credential handling must stay in the controlled main session, never handed to a sub-agent.
- **Stage 4 — `ccc-seo-tools-audit` baseline → DISPATCHED.** This is the one genuinely heavy + self-contained unit: it wraps the `seo:seo-audit` marketplace skill and runs a slow Seomator crawl (148 rules) across the full domain, persisting a dated audit file. The crawl output is pure noise to the orchestrator; the issue-count summary comes back as a structured return + a persisted path. The unit is heavy enough that its value far exceeds the fixed cost of spawning a sub-agent.
- **Stage 5 — Readiness report → INLINE.** The `.docx` report is a deliverable whose value is synthesis: the readiness verdict, the credential-state assessment, the recommended next step. That synthesis must be done in a context that has actually seen the intake payload, the credential state, and the Stage 4 audit return.

**What stays in the orchestrator (never dispatched):** the entire intake, the folder bootstrap, all credential handling, the readiness-report synthesis, the final summary. Only the one heavy audit unit is dispatched. This orchestrator is mostly inline by design — that is the correct selective-dispatch outcome for an intake-heavy engagement-start skill, not an under-application of the pattern.

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

### Stage 1 — Intake (orchestrator, inline)

Interactive / light — not dispatched. The interactive branch cannot be dispatched (no operator in a sub-agent's context).

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

### Stage 2 — Bootstrap the folder (orchestrator, inline)

Light file I/O over the intake payload the orchestrator already holds — not dispatched.

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

### Stage 3 — Credentials configuration (orchestrator, inline)

Interactive + light verification calls — not dispatched. Credential handling stays in the controlled main session and is never handed to a sub-agent.

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

### Stage 4 — Baseline audit (dispatch `ccc-seo-tools-audit`)

**Dispatch a scoped sub-agent** for `ccc-seo-tools-audit`. The orchestrator does NOT run the Seomator crawl itself — that is the one genuinely heavy, noisy, self-contained unit in this skill, and it belongs in a clean throwaway context so the crawl output never pollutes the readiness-report synthesis.

**Brief to hand the sub-agent:**
- The skill to load: `ccc-seo-tools-audit`.
- Task: run a full-domain baseline audit at engagement start; this is the baseline subsequent strategy work plans against.
- `client` — the client wikilink + the client SEO folder root path (the folder bootstrapped in Stage 2).
- `scope: full`.
- Note: the sub-agent runs its own time-budget-check; crawls ≥35s estimated route to local execution. The orchestrator does not pre-compute this — it just hands the task.
- Files it must read (paths, not contents): the bootstrapped `00 - Strategy.md`, the (empty) `01 - Tech Audit/` directory.
- Credentials pointer: where Seomator / DataForSEO credentials live (vault config path — never inline the creds).
- Expected output: the audit persisted to `01 - Tech Audit/full-{YYYY-MM-DD}.md`.
- Return contract: critical / high / medium / low issue counts + the prioritised findings + the persisted audit file path.

**On return:** the orchestrator carries `{audit_path, issue_counts, top_findings}` forward — paths, not file contents. Surface the summary to the operator.

### Stage 5 — Readiness report (orchestrator, inline)

Build the readiness report **inline** — the synthesis (the readiness verdict, the credential-state assessment, the recommended next step) must happen in a context that has seen the intake payload, the credential state, and the Stage 4 audit return.

Generate a readiness report at `_reports/onboarding/{YYYY-MM-DD}-readiness.docx`. **Use `_lib/docx-helpers.js`** for CCC-branded output:

```js
const helpers = require('../../_lib/docx-helpers');
const { makeCccDocument, makeCoverPage, H1, H2, P, BULLET, Cell, saveDocx, COL_NAVY, COL_LIGHTGREEN_BG, COL_LIGHTYELLOW_BG } = helpers;
// Build sections, then:
const doc = makeCccDocument({ title: '...', headerText: '...', children: [...] });
await saveDocx(doc, outPath);
```

Report contents:
- Cover with READY badge (green) or PARTIAL badge (yellow) depending on credential-state
- Client overview (name, domain, focus, languages, locations)
- ICP + business context
- Strategy decision + rationale
- Author(s) captured + YMYL qualifications
- Credentials status (all green or any missing flagged)
- Baseline audit summary (critical / high / medium / low issue counts)
- Recommended next step: run `ccc-seo-strategy-session` to build the pillar tree + topic queue

Persist build-script alongside output at `_reports/onboarding/build-readiness-report.js` so it can be re-run after late-arriving findings (HD-foto, credentials-list etc.) without re-invoking the whole skill.

### Stage 6 — Return

```yaml
status: ready | partial | aborted
intake_source: interactive | external_call | brief_yaml
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
intake_blocks_from_findings: [A, B, C, D, E, F, G, H, I]  # for external_call mode
intake_blocks_collected_live: []                           # for external_call mode — empty if findings complete
recommended_next: "Run ccc-seo-strategy-session"
stages_dispatched: [tools-audit]
```

## Reference

Full methodology: [[§10 — The Operator's Mental Model]] (operator's mental model — what we're setting up), [[§2 — Dual Strategy Framework]] (dual strategy decision), [[§5 — E-E-A-T as the Indexing Foundation]] (E-E-A-T + YMYL).

Dispatch doctrine: [[Decisions & Rules#The Dispatch Decision Rule|The Dispatch Decision Rule]] — applied here at sub-skill granularity (the Dispatch-Selection Rule). Test that produced this skill's selective-dispatch design: [[2026-05-20 — SEO Orchestrator Dispatch — Head-to-Head Test]].

Atomic skill composed:
- [[ccc-seo-tools-audit]] — Stage 4, dispatched (the only heavy unit; all other stages are inline intake / bootstrap / synthesis)

Schemas:
- `schemas/onboarding-findings-schema.md` (for external_call intake mode)
- `schemas/author-profile-schema.md` (author profile structure)
- `schemas/article-frontmatter-schema.md` (for what subsequent skills will write)

Folder template: `templates/_TEMPLATE - Client SEO Folder/`.

Shared libs:
- `_lib/docx-helpers.js` (readiness-report builder primitives)

BenAI Context Questionnaire reference: `01 - KNOWLEDGE BASE/Thinkers & Philosophers/Ben van Sprundel/Courses/OS Setup Course/Full Walkthrough - Setting Up The Second Brain/Business & Personal Context Questionnaire.md`.

## Rules (Update This Section When Things Go Wrong)

0a. **Dispatch Stage 4 with a complete, self-contained brief.** The brief must let `ccc-seo-tools-audit` run standalone: the skill to load, the task, `client` + folder root path, `scope: full`, the credentials pointer, the file paths to read, the expected output, the return contract. An under-briefed sub-agent corrodes the audit — a well-briefed one does not. Write the brief as if to a smart colleague with zero prior context.
0b. **Pass file paths, not file contents, in the Stage 4 brief.** Hand the sub-agent the bootstrapped client SEO folder root path; let it read config in its own context. Pasting contents re-bloats the orchestrator — the exact thing dispatch avoids.
0c. **Do NOT dispatch Stages 1, 2, 3, or 5.** Stage 1 intake is interactive (a sub-agent has no operator to talk to); Stage 2 bootstrap is light file I/O; Stage 3 credential handling must stay in the controlled main session; Stage 5 is report synthesis that must see the intake + credential + audit data. Dispatching any of them pays a sub-agent's fixed spawn cost for no real noise isolation. This orchestrator is mostly inline by design — that is the correct selective-dispatch outcome, not an under-application to "fix".
0d. **Never hand credential setup or credential values to a sub-agent.** Credentials stay in the main session's controlled context. The Stage 4 sub-agent gets a *pointer* to where credentials live, never the values.
1. **Never re-run the 37-question interview when intake_source=external_call** — that defeats the entire purpose of fast-forward mode. Only re-ask blocks that fail validation.
2. **Never skip the strategy decision (Block C).** Subsequent skills need this to know which prompt template family applies.
3. **Never capture vague answers.** "We help businesses with marketing" is not an ICP. Push for specificity. Vague intake produces generic Strategy.md content downstream.
4. **Never skip YMYL flagging on YMYL clients.** Hard-block thresholds in `ccc-seo-tools-content` depend on this field.
5. **Never skip author qualification check on YMYL clients.** Unqualified author + YMYL = guaranteed indexing failure (see Investment Mastery 37% non-indexing case in methodology §5).
6. **Never inline credentials in any vault file.** Use Cowork's credential store or the vault's secret-handling pattern.
7. **Never proceed to strategy-session without a baseline audit.** Strategy without current-state knowledge produces theoretical plans.
8. **In external_call mode, never blindly trust the findings-file.** Always run validation against the schema and surface what's missing — operator might not realize a block was skipped during the call.

## Anti-Patterns

| Situation | Broken output | Root cause | Fix |
|-----------|---------------|------------|-----|
| External Discovery-Call already happened, operator runs default interactive mode | 30-45 min of redundant questions, operator-frustration | Operator didn't know fast-forward mode existed | Always start by checking if a findings-file exists for this client; if yes, route to `intake_source=external_call` |
| Findings-file exists but lacks some blocks (e.g., voice DOs/DON'Ts not captured in call) | Stage 2 generates voice.md with empty sections | Schema validation skipped | Always run schema validation in Stage 0; partial-block ⚠ flag triggers Branch 1b interactive top-up |
| Operator skips Stage 4 (baseline audit) because "we already did one last week" | strategy-session works with stale audit data | No audit-staleness check | Check `01 - Tech Audit/`'s most recent file mtime; if > 30 days, re-run; if < 30 days, link-reference and skip |
| Orchestrator runs the Seomator crawl itself in Stage 4 | Orchestrator context bloats with the marketplace wrap + crawl output; the readiness-report synthesis degrades | Treating the heavy composed skill as an inline step | Brief-and-dispatch `ccc-seo-tools-audit`; the orchestrator only briefs, sequences, and synthesises |
| Stage 4 brief pastes `00 - Strategy.md` inline | The dispatch saves nothing — the orchestrator still carries the content | Confusing "hand off the work" with "hand off the text" | Pass the folder root path; the sub-agent reads files in its own context |
| Stage 2 / Stage 3 / Stage 5 dispatched to a sub-agent | A full sub-agent spawn cost paid to isolate light file I/O / credential setup / report synthesis; Stage 3 also leaks credential handling out of the controlled session | Over-applying the dispatch pattern to light + interactive stages | Keep intake, bootstrap, credentials, and the report inline — only the heavy audit is dispatched |

## Self-Improvement

When a user corrects an output or identifies something that consistently goes wrong:
- Add a rule to the Rules section above
- Note what the failure mode was and what fixed it

When the Stage 4 dispatch produces a weak audit:
- The first suspect is brief quality, not the atomic skill. Check what context the brief omitted, then tighten the Stage 4 brief shape.

When intake produces particularly strong downstream Strategy-Session output:
- Note which intake-block framings produced the strongest input quality
- Save approved Strategy.md sections as reference examples for future runs

This skill is never finished. The more clients we onboard, the better the question-flow + validation-heuristics get.

## Version history

- **v0.3.0 (2026-05-20)** — Restructured to **orchestrator-selective-dispatch**. Stage 4 (`ccc-seo-tools-audit` baseline) is now an explicit scoped sub-agent dispatch with a complete brief and a stated return contract — it is the one genuinely heavy + self-contained unit (the `seo:seo-audit` marketplace wrap + the slow Seomator 148-rule crawl). Stages 1 (intake), 2 (folder bootstrap), 3 (credentials configuration), and 5 (readiness report) stay inline by design: intake is interactive (un-dispatchable — no operator in a sub-agent context), bootstrap is light file I/O, credential handling must stay in the controlled main session, and the report is synthesis that must see the data. This is the lightest-dispatch of the five SEO orchestrators — mostly inline is the *correct* selective-dispatch outcome for an intake-heavy engagement-start skill. Added the orchestration-model section, dispatch rules to `## Rules`, anti-patterns rows, a `## Self-Improvement` dispatch note, `## Version history`, and `pattern: orchestrator-selective-dispatch`. Implements the rollout of the [[2026-05-20 — SEO Orchestrator Dispatch — Head-to-Head Test]] verdict per Phase 2 of the [[2026-05-14 — Multi-Agent & Token-Efficiency Architecture — Assessment]]. Per skill-creator-pro: this was a surgical structural pattern-change against a target validated by the head-to-head test, so the full eval loop was not re-run.
- **v0.2.0** — Added the fast-forward intake modes (`external_call` findings-file, `brief_yaml` batch) so a completed Discovery-Call skips the 37-question interview.
- **v0.1.0** — Initial build. Inline-invocation orchestrator with the interactive 37-question intake.
