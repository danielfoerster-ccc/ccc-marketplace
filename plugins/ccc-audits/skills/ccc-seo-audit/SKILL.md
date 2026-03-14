---
name: ccc-seo-audit
description: >
  CCC-edition SEO audit skill. Runs comprehensive technical SEO audits using
  Seomator, live GSC data via Chrome MCP, and direct site inspection — then
  generates a professional .docx report with weighted scorecard, dimension
  analysis, Seomator technical crawl section, and a sourced 30-day action plan.
  Use when a user (or CCC client) wants a full SEO audit, technical SEO check,
  site audit, or analysis of rankings, indexing health, security, or on-page
  elements. Also triggers on: "Core Web Vitals", "broken links", "meta tags",
  "crawl issues", "Seomator", "structured data", "schema markup",
  "security headers", "robots.txt", "sitemap audit", "GSC data".
  For creating SEO pages at scale, see programmatic-seo.
  For GSC-only content optimization, see seo-optimizing.
---

# CCC SEO Audit Skill

> **Fork notice:** Based on BenAI `marketing:seo-audit` (benai.app).
> Improvements developed from live agency engagements by
> **Claude Cowork Consultants — Daniel Förster & Heiko Lube**.
> See HANDOVER.md for a full diff vs. the original and the rationale for each change.

---

## On Skill Load — Immediate Actions

Run these checks automatically:

```bash
# 1. Check if seomator is already available
which seomator 2>/dev/null || node ~/.npm-global/lib/node_modules/@seomator/seo-audit/dist/cli.js --version 2>/dev/null

# 2. If not found: install with sandbox-safe flags (--ignore-scripts bypasses native module compilation)
npm install -g @seomator/seo-audit --prefix ~/.npm-global --ignore-scripts

# 3. Alias for use in this session
alias seomator="node ~/.npm-global/lib/node_modules/@seomator/seo-audit/dist/cli.js"

# 4. Verify installation
seomator --version
```

> 📝 **Note on `--ignore-scripts`:** This bypasses `better-sqlite3` native compilation
> (which fails in sandboxes because nodejs.org is blocked). SQLite persistence is disabled
> but HTTP auditing works fully — scores, crawl results, and all rule checks are unaffected.

Then immediately test if the **target domain** is reachable (ask the user for the URL first, or use a placeholder):

```bash
# Test if the target domain is accessible through the Cowork egress proxy
curl -s -o /dev/null -w "%{http_code}" --max-time 5 https://<target-domain> 2>&1 | head -5
# OR check proxy response headers:
curl -v --max-time 5 https://<target-domain> 2>&1 | grep -i "x-proxy-error\|blocked\|403"
```

**If this returns `X-Proxy-Error: blocked-by-allowlist` or HTTP 403 from `localhost:3128`:**
→ See Troubleshooting → "Target Domain Blocked by Cowork Proxy" below.
→ Do NOT try to run the audit yet — seomator will silently return empty/zero results.

Then ask the user the **6 Discovery Questions** (Phase 2 below).

---

## Workflow

```
Phase 1: Setup → Phase 2: Discovery → Phase 3: Data Collection → Phase 3b: Checkpoint
→ Phase 4: Analysis → Phase 5: Report Generation → Phase 6: Recommendations
```

---

### Phase 1: Setup (Automatic)

Install and verify seomator per the On Skill Load block above. Then test domain accessibility. If the domain is blocked or seomator returns `fetch failed`, note this and escalate to the user — **do NOT proceed with an audit that will produce empty results**.

---

### Phase 2: Discovery — 6 Mandatory Questions

Ask all six before doing any work:

1. **Target URL** — What site to audit?
2. **Scope** — Single page or multi-page crawl? If crawl, how many pages? (See Phase 3 for guidance)
3. **Core Web Vitals** — Include CWV? (requires Playwright, ~200MB, skip unless asked)
4. **Specific concerns** — Any known issues to investigate?
5. **Platform** ← *[CCC addition]* — What CMS/framework is the site built on?
   *(WordPress, Framer, Webflow, Squarespace, custom, other?)*
   This determines which findings are fixable at code level vs. platform level vs. CDN.
6. **Site language** ← *[CCC addition — from Krey & Krey, March 2026]* — What language(s) is the site content in?
   *(English, German, French, multilingual, other?)*
   Seomator is English-calibrated. Non-English sites trigger false positives in text-analysis checks.
   See Phase 4 → Language Bias Warning for what to flag and skip.

---

### Phase 3: Data Collection

Collect ALL data sources before generating the report. Do not start the docx until all three are in hand.

**3a. Seomator crawl:**

**Crawl limit guidance** ← *[CCC addition — from Krey & Krey, March 2026]*

| Site Type | Recommended Limit | Rationale |
|-----------|------------------|-----------|
| Small site (<20 pages) | `-m 20` | Covers full site |
| Medium site (20–100 pages) | `-m 50` | Covers key templates |
| Large site (100+ pages) | `-m 100` | Focus on key templates; check for parameter URL inflation |
| WordPress + WooCommerce **active** | `-m 30` | Shop generates 100s of filter parameter URLs; crawl budget is the audit focus |
| WordPress + WooCommerce **disabled** | `-m 30` | ⚠️ Disabled ≠ gone — Avia/Enfold and other themes may still generate `?avia_extended_shop_select=` and similar parameter URLs. Verify in results. |

```bash
# Standard crawl (save to file — output can be >100KB)
seomator audit <url> --crawl -m 50 --format llm --no-cwv -o seomator-output.md

# If CWV requested:
seomator audit <url> --crawl -m 50 --format llm -o seomator-output.md
```

> ⚠️ **Large file warning** ← *[CCC addition]*
> On sites with 15+ pages, `--format llm` output commonly exceeds 100KB (sometimes 400–500KB),
> which is too large for Claude to read with the `Read` tool.
> **If the output file is >80KB, use this extraction script instead of reading the file directly:**

```bash
python3 -c "
import re, sys
text = open('seomator-output.md').read()
# Extract rule blocks with severity and page counts
pattern = r'(?:CRITICAL|WARNING|INFO)[^\n]*\n(?:.*\n){0,5}'
blocks = re.findall(r'(CRITICAL|WARNING|INFO)\s*\|\s*([\w-]+)\s*\|([^\n]+)', text)
results = {}
for severity, rule, detail in blocks:
    key = f'{severity} | {rule}'
    results[key] = results.get(key, 0) + 1
for k, v in sorted(results.items(), key=lambda x: -x[1]):
    print(f'{k} | {v} pages')
" seomator-output.md | head -60
```

**3b. GSC data (via Chrome MCP):**
Navigate through Google Search Console manually:
- Leistung / Performance → 28-day clicks, impressions, CTR, position, top queries
- Seitenindexierung / Page Indexing → indexed, not indexed (with reasons), 404s
- Sitemaps → submitted sitemaps, last read date
- Links → external backlinks, internal link counts
- Core Web Vitals → data availability (often "insufficient data" for smaller sites)
- HTTPS → non-HTTPS page count

**3c. Direct site inspection (via Chrome JS tool):**
```javascript
// Run on the target page to extract key on-page signals
({
  title: document.title,
  h1: [...document.querySelectorAll('h1')].map(e => e.textContent.trim()),
  metaDesc: document.querySelector('meta[name="description"]')?.content,
  canonical: document.querySelector('link[rel="canonical"]')?.href,
  hreflang: [...document.querySelectorAll('link[rel="alternate"]')].map(e => e.hreflang + ': ' + e.href),
  schema: [...document.querySelectorAll('script[type="application/ld+json"]')].map(e => JSON.parse(e.textContent)['@type']),
  images: { total: document.images.length, missingAlt: [...document.images].filter(i => !i.alt).length },
  wordCount: document.body.innerText.split(/\s+/).length,
  ogTitle: document.querySelector('meta[property="og:title"]')?.content,
})
```

---

### Phase 3b: Data Checkpoint ← *[CCC addition]*

**Before generating the report**, save all collected data to a local JSON file:

```bash
cat > audit-checkpoint.json << 'EOF'
{
  "url": "<target>",
  "platform": "<detected platform>",
  "site_language": "<language>",
  "date": "<audit date>",
  "gsc": {
    "clicks_28d": null,
    "impressions_28d": null,
    "avg_ctr": null,
    "avg_position": null,
    "indexed_pages": null,
    "not_indexed": null,
    "external_backlinks": null
  },
  "technical": {
    "h1_present": null,
    "images_total": null,
    "images_missing_alt": null,
    "schema_types": [],
    "canonical_present": null
  },
  "seomator": {
    "overall_score": null,
    "critical_count": null,
    "warning_count": null,
    "top_issues": []
  }
}
EOF
```

Fill in the values from Phase 3, then generate the report. This ensures the session can be resumed instantly if context limits are reached, and the report can be regenerated without re-running data collection.

---

### Phase 4: Analysis

Organize findings by the 8 SEO dimensions:

| Dimension | Weight | Key data sources | Tool availability |
|-----------|--------|-----------------|-------------------|
| Technical Foundation | 20% | GSC 404s, robots.txt, sitemap, HTTPS | Seomator + GSC |
| On-Page SEO | 20% | H1, meta desc, schema, alt text, viewport | Seomator + Direct |
| Content Quality | 15% | Word count, thin content, duplicate content, blog indexing | Seomator ⚠️ see Language Bias |
| Link Profile | 15% | GSC external backlinks, internal link distribution | GSC only (basic) — **see Tool Gap note** |
| Search Performance | 10% | GSC clicks, impressions, CTR, positions, top queries | GSC |
| UX & Images | 10% | Alt text, lazy loading, Core Web Vitals availability | Seomator + Direct |
| Indexing Health | 5% | GSC indexing breakdown, crawl errors | GSC |
| Local SEO Signals | 5% | LocalBusiness schema, GMB, local keyword rankings | Direct + Seomator |

**⚠️ Tool Gap: Link Profile & Search Performance** ← *[CCC addition — from Krey & Krey, March 2026]*

Link Profile (15%) and Search Performance (10%) require Ahrefs, Semrush, or Sistrix for full scoring.
Without these tools, use the following fallback approach:
- **Link Profile:** Use GSC → Links for external backlink count + internal link distribution. Score conservatively.
  Note in the report: `[GSC only — backlink quality/authority not assessed; Ahrefs/Semrush recommended for full link audit]`
- **Search Performance:** GSC covers this well for sites with data. For new sites (<3 months), note as insufficient data.

Do **not** skip these dimensions — estimate conservatively and document the limitation transparently.

---

**⚠️ Language Bias Warning — Non-English Sites** ← *[CCC addition — from Krey & Krey, March 2026]*

Seomator's text-analysis checks are calibrated for English. For sites in German, French, Spanish,
or any other language, the following checks produce **unreliable results** and must be manually validated:

| Check | Problem | Action |
|-------|---------|--------|
| **Keyword Stuffing** | German articles/conjunctions (die, der, das, und, in, von, zu...) appear at high frequency and will be flagged — these are stop words, not spam | Flag as **false positive**, do NOT report to client |
| **Readability Score** | Flesch-Kincaid is English-calibrated. German compound words and longer sentences score as "hard to read" even when perfectly normal | Ignore readability score for non-English content |
| **Thin Content / Word Count** | German compound words pack more information per word than English. A 250-word German text may equal a 350-word English text | Apply a 20–30% discount to word count thresholds |
| **TF-IDF / Keyword Prominence** | English stop-word lists don't filter German/French/etc. — keyword weighting is skewed | Use only for structural checks, not keyword relevance |

**Checks that remain reliable regardless of language:** Page speed, security headers, H1/meta presence,
broken links, favicon, sitemap, robots.txt, structured data, image alt text, canonical tags, HTTPS.

Add a **"Known False Positives"** section to the report when site language ≠ English.
Example phrasing: *"Note: Seomator's keyword density analysis is calibrated for English-language content.
The keyword stuffing warning for [word] is a false positive — this is a common [German/French/...] stop word.
No action required."*

---

**Score disambiguation** ← *[CCC addition]*
If Seomator produces a high score (e.g. 94/100 Grade A) alongside a low weighted score (e.g. 41/100):
- Seomator measures **technical code correctness** (valid HTML, HTTPS, hreflang, URL structure)
- The weighted audit score measures **real-world SEO effectiveness** (content depth, backlinks, keyword targeting)
- Both are valid — they measure different things. **Always explain this explicitly in the Executive Summary.**
  Otherwise a client reads "Grade A" and deprioritizes the work.

**Platform-specific fix mapping** ← *[CCC addition]*

| Finding | WordPress fix | Framer fix | Webflow fix |
|---------|--------------|------------|-------------|
| Security headers | `.htaccess` / plugin | Cloudflare Transform Rules | Hosting settings |
| Semantic HTML | Theme/blocks | Platform constraint — use heading hierarchy | Platform constraint |
| Inline CSS bulk | Theme optimization | Platform-generated — can't remove | Platform-generated |
| Meta description | Yoast / RankMath | Framer CMS SEO fields | Page settings |
| Canonical tag | Yoast / RankMath | Auto-populated from Framer CMS | Page settings |
| H1 tag | Theme / block editor | Framer CMS page title / text block | Page settings |
| Font-display:swap | Enqueue or plugin | Framer Typography settings | Site settings |

**WordPress + WooCommerce crawl budget cross-reference** ← *[CCC addition — from Krey & Krey, March 2026]*

If the site is WordPress and Seomator finds large numbers of similar URLs with filter/query parameters
(e.g. `?avia_extended_shop_select=`, `?product_cat=`, `?orderby=`):
→ This is a crawl budget waste issue caused by WooCommerce or Avia/Enfold shop theming.
→ This persists even when the WooCommerce shop is disabled — the URL parameters remain active.
→ **Cross-reference with the `gsc-cleanup-sop` skill** for the full diagnosis and robots.txt fix.
→ Do NOT attempt to address this in the SEO audit report alone — reference the GSC cleanup workflow.

---

### Phase 5: Report Generation

Generate a professional .docx report using the `docx` npm package. Structure:

1. Cover page (score badge, date, data sources, platform, site language)
2. Executive Summary (overall score, score disambiguation if needed, top 5 quick wins)
3. SEO Scorecard (8-dimension table, weighted overall score, tool gap notes where applicable)
4. Dimension Analysis (3.1–3.8, each with findings boxes: ✅ Working / ❌ Issues / → Actions)
5. **Seomator Technical Crawl** (summary stats, category scores table, critical issues by cluster)
6. **Known False Positives** *(if site language ≠ English)* — list flagged checks with explanation
7. 30-Day Action Plan (3 phases, sourced with [Seomator] / [GSC] / [Direct] tags)
8. Appendix (indexed pages table, technical snapshot table)

**Action plan source attribution** ← *[CCC addition]*
Tag every action item with its data source:
- `[Seomator]` — confirmed by automated crawl
- `[GSC]` — from Google Search Console data
- `[Direct]` — from manual inspection
- `[Seomator confirms]` — corroborated by both

---

### Phase 6: Recommendations Priority Framework

| Priority | Criteria | Action |
|----------|----------|--------|
| **P0 — Critical** | Blocks indexing, security vulnerability, or 404 cascade | Fix this week |
| **P1 — High** | Significant ranking impact (H1, alt text, metadata) | Fix within 2 weeks |
| **P2 — Medium** | On-page improvements, schema, internal links | Fix this sprint |
| **P3 — Growth** | Content expansion, backlinks, E-E-A-T | Backlog / ongoing |

---

## Command Reference

| Command | Description |
|---------|-------------|
| `seomator audit <url>` | Single page audit |
| `seomator audit <url> --crawl -m <N>` | Crawl up to N pages |
| `seomator audit <url> --no-cwv` | Skip Core Web Vitals (faster) |
| `seomator audit <url> -c <categories>` | Specific categories only |
| `seomator audit <url> --format llm -o output.md` | Save to file (recommended for crawls) |
| `seomator self doctor` | Verify system readiness |
| `seomator --version` | Check version |

---

## Troubleshooting — CCC Additions

### Target Domain Blocked by Cowork Proxy ← *[CCC addition — from Krey & Krey, March 2026]*
**Symptom:** `curl -I https://<client-domain>` returns HTTP 403 with header `X-Proxy-Error: blocked-by-allowlist` from `localhost:3128`.
**Cause:** Claude Cowork routes all outbound HTTP through an egress proxy at `localhost:3128`.
Client domains are not allowed by default. Seomator will silently return empty/zero results.

**Resolution path:**
1. Ask the user to add the domain in Cowork Admin → Fähigkeiten → Zusätzlich erlaubte Domains
2. Also add: `www.googleapis.com`, `pagespeed.web.dev` if PageSpeed data is needed
3. Restart the Cowork session
4. Re-run the domain accessibility test: `curl -v --max-time 5 https://<domain> 2>&1 | grep -i "x-proxy\|blocked\|403"`

> ⚠️ **Known bug:** Allowlist changes may not propagate to the running proxy process even after session restart.
> If the domain is still blocked after restart, this is a Cowork platform bug — not a user error.
> **Fallback: ask the user to run seomator from their local machine** (Windows/Mac) and upload the output `.md` file.
> See "User Running Seomator Locally" below.

### User Running Seomator Locally (Windows/Mac)
**When to use:** Domain blocked and Cowork proxy bug prevents access even after allowlist change.
**Instructions to give the user:**

*Windows (open Command Prompt or PowerShell):*
```
# Install Node.js if not present: https://nodejs.org → LTS → Windows Installer (.msi)
# Then in a new CMD window:
npm install -g @seomator/seo-audit
seomator audit https://<site-url> --crawl -m 30 --format llm --no-cwv -o seomator-output.md
# Upload seomator-output.md to this Cowork session
```

*Mac (Terminal):*
```
npm install -g @seomator/seo-audit
seomator audit https://<site-url> --crawl -m 30 --format llm --no-cwv -o ~/Desktop/seomator-output.md
# Drag the file into this Cowork session
```

> Do NOT estimate, skip, or use fallbacks if the user can run this locally.
> The local run produces full, accurate results. It takes 3–10 minutes.

### Fetch Failed / No Internet Access (Sandbox)
**Symptom:** `seomator audit <url>` returns `fetch failed` immediately — not a 403, just a timeout/error.
**Cause:** The sandbox has no outbound HTTP access at all (not a domain allowlist issue — complete block).
**Fix:** Ask the user to run seomator from their local machine per "User Running Seomator Locally" above.

### node-gyp Build Failure During Install
**Symptom:** Install fails with `node-gyp` errors, 403 downloading headers, or `ENOENT`.
**Cause:** `better-sqlite3` native module tries to download Node.js headers from nodejs.org (blocked in sandbox).
**Fix:**
```bash
npm install -g @seomator/seo-audit --prefix ~/.npm-global --ignore-scripts
# Then run directly:
node ~/.npm-global/lib/node_modules/@seomator/seo-audit/dist/cli.js audit <url> --format llm
```
Note: `--ignore-scripts` bypasses native compilation. SQLite persistence is disabled but HTTP auditing works normally.

### Output File Too Large to Read
**Symptom:** Seomator output `.md` is >80KB — `Read` tool can't load it.
**Fix:** Use the python3 extraction script in Phase 3 above to pull critical/warning issues by rule with page counts.

### EACCES Permission Error
**Fix:**
```bash
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
npm install -g @seomator/seo-audit --ignore-scripts
```

### Seomator Returns All-Zero Scores (Silent Failure)
**Symptom:** Seomator runs without errors but all scores are 0, no findings reported.
**Cause:** Two possible causes:
1. Target domain is blocked by proxy (most common in Cowork) — scores silently zero out
2. `--ignore-scripts` was not used and `better-sqlite3` wasn't compiled — audit runs but can't store results

**Diagnosis:**
```bash
# Check if domain is reachable:
curl -v --max-time 5 https://<domain> 2>&1 | grep -E "HTTP|x-proxy|blocked"
```
If blocked → use allowlist fix or local run.
If not blocked → re-install with `--ignore-scripts` and retry.

---

## 16 Audit Categories

| Category | Key Checks |
|----------|------------|
| Core SEO | Title, meta desc, H1 hierarchy, canonical |
| Performance | Page weight, inline CSS, DOM size, render-blocking resources |
| Links | Broken links, redirect chains, nofollow, anchor text |
| Images | Alt text, file sizes, lazy loading, WebP/AVIF |
| Security | HTTPS, X-Frame-Options, CSP, HSTS, Permissions-Policy |
| Technical SEO | Schema, sitemap, robots.txt, crawl budget |
| Crawlability | Robots directives, noindex, crawl depth, orphan pages |
| Structured Data | JSON-LD validation, schema types |
| Accessibility | ARIA labels, color contrast, keyboard navigation |
| Content | Word count, readability, duplicate content, thin pages ⚠️ English-calibrated |
| Social | Open Graph, Twitter cards |
| E-E-A-T | Author info, about page, contact info, trust signals |
| URL Structure | Length, special characters, depth |
| Mobile | Viewport, touch targets, responsive design, horizontal scroll |
| i18n | hreflang, language declarations, locale URLs |
| Legal | Cookie consent, privacy policy, terms |

---

## Related Skills

- **ccc-sop-creator** — Document the audit workflow as a repeatable CCC SOP
- **gsc-cleanup-sop** — WordPress crawl budget cleanup; always recommend alongside SEO audit for WordPress + WooCommerce sites
- **marketing:seo-optimizing** — GSC-data-driven content optimization (post-audit)
- **marketing:programmatic-seo** — Creating SEO pages at scale
