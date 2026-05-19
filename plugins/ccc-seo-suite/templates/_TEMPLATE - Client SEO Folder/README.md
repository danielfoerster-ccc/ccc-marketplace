# Client SEO Folder Template

Bootstrapped by `ccc-seo-onboard` Stage 2. Mirror this structure into `03 - OPERATIONS/Claude Cowork Consultants/02 - Clients/<Client>/SEO/`.

## Folder Layout

```
SEO/
├── README.md                          # Quick-Navigation for this client
├── 00 - Strategy.md                   # Pillar-Tree + Topic-Queue + Decisions-Log
├── 01 - Tech Audit/                   # Quarterly Seomator audits + .docx reports
├── 02 - URL Inventory.md              # classify-urls output
├── 03 - Pillars/                      # One file per Pillar (cluster-index briefs)
├── 04 - Silos/<Pillar>/               # One file per Silo per Pillar
├── 05 - Sub-Silos/<Pillar>/<Silo>/    # One file per Sub-Silo per Silo
├── 06 - Articles/                     # Published article markdown
├── 07 - Research Briefs/              # Per-article research briefs
├── 08 - GSC/
│   └── opportunities.md               # Weekly GSC snapshots + action queue
├── 09 - Internal Linking/             # Diff-reports per link-internal run
├── 10 - Publishing Log.md             # Append-only row per publish
├── 11 - Cohorts/
│   └── winners-pattern.md             # winners-pattern.md + cohort run snapshots
├── _authors/                          # Author profiles (per schema)
│   └── <author-slug>.md
├── _voice/                            # Brand voice per language
│   └── voice.<lang>.md
├── _planning/                         # Per-strategy-session artifacts
│   ├── competitors-<date>.md          # Competitor SERP-scan findings
│   ├── pillar-tree-<date>.json        # Structured pillar tree
│   ├── queue-snapshot-<date>.json     # Topic queue snapshot
│   ├── serp/                          # Raw SERP-query JSONs
│   └── dataforseo-spend-log.md        # Append-only DataForSEO spend tracking
└── _reports/
    ├── onboarding/<date>-readiness.docx
    ├── strategy-sessions/<date>-strategy-session-<mode>.docx
    ├── weekly/<YYYY-Www>.docx
    └── quarterly/<YYYY-Qn>.docx
```

## Initial Files (created by `ccc-seo-onboard`)

These get created with seeded content as part of Stage 2 bootstrap:

- `README.md` (this file, with client-specific Quick-Nav)
- `00 - Strategy.md` (frontmatter + Business Overview + ICP + empty pillar-tree placeholder)
- `_authors/<author>.md` (per author-profile-schema)
- `_voice/voice.<lang>.md` (per brand-voice template)
- `10 - Publishing Log.md` (empty schema + cohort-tracking table)
- `08 - GSC/opportunities.md` (empty action-queue + GSC-prerequisites check)
- `11 - Cohorts/winners-pattern.md` (status: insufficient-data with expected-timeline)

## What stays empty until later

- `01 - Tech Audit/` — populated by `ccc-seo-tools-audit` Stage 4
- `02 - URL Inventory.md` — populated by `ccc-seo-classify-urls`
- `03 - Pillars/` through `05 - Sub-Silos/` — populated by `ccc-seo-strategy-session` Stage 6–8
- `06 - Articles/` — populated by `ccc-seo-publish-next` per week
- `07 - Research Briefs/` — populated by `ccc-seo-research-brief` per article
- `_planning/dataforseo-spend-log.md` — auto-appended by `_lib/dataforseo-client.js`

---

*Used by: `ccc-seo-onboard` Stage 2 (Folder Bootstrap)*
*Introduced: v0.2.0 (2026-05-18).*
