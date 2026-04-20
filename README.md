# CCC Skills Marketplace

Claude Cowork skills built by **Claude Cowork Consultants** — for AI automation consultants, marketing agencies, and operators who use Claude Cowork.

## Installation

```
/plugin marketplace add danielfoerster-ccc/ccc-marketplace
```

Then install the plugins you need:

```
/plugin install ccc-gtm@ccc-marketplace
/plugin install ccc-audits@ccc-marketplace
/plugin install ccc-planning@ccc-marketplace
/plugin install ccc-buyback@ccc-marketplace
/plugin install ccc-operations@ccc-marketplace
/plugin install 48hr-launch-blueprint@ccc-marketplace
/plugin install ccc-cashflow-management@ccc-marketplace
/plugin install ccc-seo-content-pipeline@ccc-marketplace
/plugin install second-brain@ccc-marketplace
/plugin install ccc-ai-audit@ccc-marketplace
/plugin install ccc-sales-process@ccc-marketplace
```

---

## Plugins

### ccc-gtm — Go-To-Market for AI Automation Consultants

Build your full GTM foundation and 90-day execution plan in one session.

| Skill | What it does |
|-------|-------------|
| `gtm-discovery` | Structured interview → ICP, positioning, offer, voice — saved to your vault |
| `gtm-90-day-launch-plan` | Reads your foundation docs → phased 90-day plan with week-by-week actions |

**Recommended flow:** Run `gtm-discovery` first. Then `gtm-90-day-launch-plan`.

---

### ccc-audits — Full-Stack Audit Toolkit

Scored, actionable audit reports for you and your clients.

| Skill | What it does |
|-------|-------------|
| `ccc-linkedin-profile-audit` | Audits LinkedIn profiles against CCC's profile-as-landing-page framework. Scores 6 dimensions + generates ready-to-paste copy rewrites |
| `ccc-instagram-audit` | Audits Instagram via live Chrome browser inspection. Scores 7 dimensions + 30-day action plan |
| `ccc-seo-audit` | Full technical SEO audit using Seomator + live GSC data. Weighted scorecard + sourced action plan |
| `gmb-audit` | Google My Business audit via Chrome. Scores 7 dimensions + competitor benchmarking |
| `ccc-wordpress-seo-implementation` | Implements SEO audit fixes on WordPress sites. Covers robots.txt, meta descriptions, H1 tags, Yoast settings via WPCode bulk operations |
| `gsc-cleanup-sop` | Automated Google Search Console cleanup for WordPress sites. Diagnoses indexing issues + produces robots.txt template |

---

### ccc-planning — Execution-First Planning System

Daily and weekly planning that reads your vault — no redundant input.

| Skill | What it does |
|-------|-------------|
| `daily-checkin` | 10-minute morning session: Revenue First, Daily Drumbeat, TOP 3, timeboxing, dependencies |
| `daily-checkout` | End-of-day shutdown ritual: review TOP 3, carry-forward, three-part reflection (what went well / what needs work / what should never happen again) |
| `weekly-planning` | Weekly review + plan: wins, issues, TOP 3 goals, TOP 10 tasks, day assignments, delegation queue |
| `90-day-sprint` | Quarterly OKR and sprint planning: Boulders → Rocks → Pebbles → Activities |
| `handoff-prep` | 5-minute delegation brief builder for Claude or human team members |

---

### ccc-buyback — Buy Back Your Time (Dan Martell System)

The full Buy Back Your Time framework, implemented for AI-first operators.

| Skill | What it does |
|-------|-------------|
| `buyback` | Entry point: 5-question assessment → routes to the right sub-skill |
| `audit` | DRIP Matrix time audit: categorise every task, calculate your Buyback Rate, build delegation roadmap |
| `perfect-week` | Design a weekly template that protects deep work and eliminates wasted buffer time |
| `vision` | 10X Vision session: limitless dreaming → detailed vision across Team, Business, Empire, Lifestyle |
| `preloaded-year` | Annual calendar: Big Rocks first, then Pebbles — proactive not reactive |
| `replacement-ladder` | Sequenced hiring roadmap: which role to hire first and in what order, with Test-First hiring method |

---

### ccc-operations — Build and Document Like CCC

Tools for creating CCC-standard SOPs and production-quality Claude skills.

| Skill | What it does |
|-------|-------------|
| `ccc-sop-creator` | Builds HEROIC-format SOPs from live CCC foundation docs. Covers all GTM channels and operational processes |
| `skill-creator-pro` | Full skill engineering loop: draft → test → evaluate → iterate. Includes practitioner patterns and anti-patterns |

**Note:** Framework Extractor moved to the `second-brain` plugin in v1.6.0 — it's a knowledge-extraction tool and now lives with the rest of the Second Brain stack.

---

### 48hr-launch-blueprint — Rapid Business Validation (Noah Kagan)

Validate any business idea by getting 3 paying customers in 48 hours — before building anything. Based on Noah Kagan's *Million Dollar Weekend*.

| Skill | What it does |
|-------|-------------|
| `mindset-reset` | Calculate Freedom Number, build rejection tolerance via Rejection Goals + Coffee Challenge |
| `idea-generator` | Customer First Approach (WHO/WHAT/WHERE) + 4 Idea Generators → shortlist of 3 validated ideas |
| `business-model-validator` | Million-Dollar Opportunity Test + One-Minute Business Model + Revenue Dials → select ONE idea |
| `dream-ten-launcher` | Name 10 real prospects, craft the offer, draft outreach messages — **48hr clock starts here** |
| `validation-debrief` | Scorecard analysis, rejection diagnostics, hit/pivot/kill decision + next-action plan |

**Recommended flow:** Run skills in order. Skip `mindset-reset` if you're already comfortable asking for money.

---


### ccc-cashflow-management — Profit First Cashflow System

Complete Profit First implementation for consultants and business owners. Built on Mike Michalowicz's methodology, extended with Daniel Foerster's Cashflow Control System, CBS Score, 12 Profit Points, and PRUN Formula.

| Skill | What it does |
|-------|-------------|
| `ccc-cashflow-start` | Entry point: detects user context (consultant vs. self-service, new vs. returning) and routes to the right skill |
| `ccc-cashflow-assessment` | Instant Assessment: revenue, TAPs comparison, CBS Score, gap analysis, rollout plan |
| `ccc-cashflow-setup` | Multi-account structure setup: 5+2 accounts, bank selection, MwSt handling for DACH |
| `ccc-cashflow-cost-audit` | PRUN Formula cost audit: classify every expense as Fat/Muscle/Bone, build cut list |
| `ccc-cashflow-quarterly-review` | Quarterly review with 4R Framework, profit distribution, CBS tracking, CDT update |
| `ccc-cashflow-profit-points` | Score and optimize across 12 Profit Points for continuous improvement |
| `ccc-cashflow-report` | Generate client-ready reports with CBS headline, bilingual DACH tables, visualizations |
| `ccc-cashflow-client-onboard` | Consultant-only: structured 10-12 meeting client onboarding with implementation benchmarks |
| `ccc-cashflow-workshop-prep` | Consultant-only: prepare Cashflow Control workshops with M&M simulation and materials checklists |

**Recommended flow:** Start with `ccc-cashflow-start`. For consultants: `assessment` → `setup` → `cost-audit` → `quarterly-review` cycle.

---

### ccc-seo-content-pipeline

| Skill | What it does |
|-------|-------------|
| `seo-competitor-analysis` | Runs structured competitor gap analysis for the CCC SEO Content Pipeline |
| `seo-content-generate` | Orchestrates SEO article generation via Arvo API |
| `seo-keyword-strategy` | Generates prioritized keyword list and 13-week content calendar from competitor gap analysis |
| `seo-pipeline-setup` | Guided setup wizard for the CCC Automated SEO Content Pipeline |
| `seo-social-repurpose` | Repurposes published SEO articles into platform-specific social posts and schedules via Blotato API |
| `seo-weekly-review` | Weekly SEO performance review for the content pipeline |

---

### second-brain — Cognitive Exoskeleton for Obsidian

Tools for the cognitive-exoskeleton era, built on Michael Simmons' Three Brains framework. Turns an Obsidian vault into an active thinking partner — substrate, capture, synthesis, and framework extraction.

| Skill | What it does |
|-------|-------------|
| `second-brain` | Setup mode: interview → 5-folder Layer-1 substrate + Three Brains primer. Audit mode: scans vault structure and runs operation-readiness diagnostics (wikilink density, root CLAUDE.md, category grammar, person profiles, Decisions & Rules). Proposes a migration plan — backup-first |
| `knowledge-distill` | Drop any URL or YouTube transcript → Tavily-fetched, distilled to key ideas, wikilinked, and routed to the right KB subfolder. Creates or updates thinker profiles automatically |
| `knowledge-archive` | Full-text article archiving — opposite of distill. Preserves complete content with summary header. Single URL or bulk publication feed (Substack, Ghost, Beehiiv, WordPress, any RSS) with date filtering |
| `second-brain-connect` | Runs Simmons' 9 cognitive operations — Analogical, Abductive, Counterfactual, Falsification, Bayesian, First Principles, Dialectical, Systems, Perspective Simulation — against vault clusters. Returns numbered proposal file with human approval gate before writing connections |
| `framework-extractor` | Ingests books, courses, and methodologies → decodes the framework skeleton → produces SOPs, skills, and plugins via a 5-phase decode-build-audit-architect workflow |

---


### ccc-ai-audit

| Skill | What it does |
|-------|-------------|
| `ccc-audit-discovery` | Runs Phase 1+2 of the AI Automation Audit: scoped discovery and process documentation |
| `ccc-audit-proposal` | Generates the Phase 5b tiered commercial proposal from audit findings |
| `ccc-audit-report` | Generates the Phase 5a audit report: a professional 5-page findings document with executive summary, current state assessment, opportunity matrix, solution recommendations, and implementation roadmap |
| `ccc-audit-scoring` | Runs Phase 3+4 of the AI Automation Audit: VALUE opportunity scoring and solution matching |
| `ccc-audit-start` | Entry router for the CCC AI Automation Audit |

---


### ccc-sales-process — End-to-End Sales Process for Consulting Engagements

Daniel's personal sales workflow: pre-call preparation, post-call logging with 8-category behavioural signal capture (feeding downstream Perspective Simulation), four-lens pricing, and branded proposal generation.

| Skill | What it does |
|-------|-------------|
| `ccc-sales-prep` | Pre-call brief: reads person file from vault, loads CCC positioning, outputs profile snapshot, opening hook, 5 key questions, 3 objections + responses, recommended CCC service angle, and the next step to close for |
| `ccc-post-call-log` | Post-call vault update: structures raw call notes into meeting note, captures 8 behavioural signals (energy / trust / decision style / power / priority / language / timing / cultural), updates person file interaction log, routes decisions to Decisions & Rules. Signals feed downstream Perspective Simulation inside `second-brain-connect` |
| `ccc-pricing` | Four-lens pricing analysis: value-based (Weiss/Enns), Hormozi value equation, CCC offer architecture, BenAI market reality (2 years AI automation pricing data). Outputs recommendation with full reasoning + maintains pricing log for compounding learning |
| `ccc-proposal-draft` | Drafts a cost proposal → reviews as CCC-branded HTML → renders to PDF only after approval. Reads person file + call notes, asks 2-3 scoping questions, produces engagement summary, deliverables, timeline, pricing, next step |

---

## About

Built by [Claude Cowork Consultants](https://claudecowork-consultants.com).
Questions or custom implementations: reach out via the website.

---

*Last updated: 2026-04-19 | Version 1.4.0*
