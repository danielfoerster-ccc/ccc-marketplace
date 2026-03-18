# GSC Diagnosis Document Template

Use this structure when generating the .docx diagnosis report.

---

## Document Title
`GSC Diagnose: [Client Name] — [Date]`

---

## 1. Executive Summary

**2–4 sentences. Answer: What's wrong, why, and what's the single most important fix.**

Example: "kreyundkrey.de has 34 indexed pages vs. 1,380 not-indexed — a healthy site should be closer
to 95%+ indexed for real content. The primary cause is WooCommerce and Avia theme parameter URLs
(~700+ variations) consuming Google's entire crawl budget. The single most impactful fix is updating
robots.txt to block these parameter URLs; if WooCommerce is not needed, removing it entirely would
solve the problem at the root."

---

## 2. Current GSC Status

| Metric | Value | Status |
|--------|-------|--------|
| Indexed pages | [number] | ✅ / ⚠️ |
| Not indexed pages | [number] | ✅ / ⚠️ |
| "Gecrawlt – zurzeit nicht indexiert" | [number] | ✅ / ⚠️ |
| Sitemaps submitted | [count] | ✅ / ⚠️ |
| Sitemap errors | [count] | ✅ / ⚠️ |
| Key content pages indexed | [X of Y] | ✅ / ⚠️ |

---

## 3. Root Cause Analysis

### Primary Issue
**If "Gecrawlt – zurzeit nicht indexiert" is high:** State clearly that this is crawl budget waste
from WooCommerce/theme parameter URL explosion. Be specific: "Google found ~[N] parameter URL
variations from WooCommerce filters and Avia theme selectors. It crawls these before real content,
burns its daily crawl budget, and never reaches the actual service/blog pages."

### Secondary Issues (if any)
List clearly, but keep them secondary to the main crawl budget problem.

---

## 4. Action Plan

### Tier 1 — Quick Wins (This Week, No Developer Needed)
| # | Action | Impact | Time |
|---|--------|--------|------|
| 1 | Delete wrong sitemaps (HTML pages submitted as XML) | Fixes crawl errors | 5 min |
| 2 | Submit re-indexing for key content pages | Faster re-crawl | 10 min |
| 3 | Confirm noindex pages are correctly configured | Verify no data loss | 10 min |

### Tier 2 — WordPress Fixes (Needs Developer / Client Access)
| # | Action | Impact | Time |
|---|--------|--------|------|
| 1 | **Update robots.txt** (block WooCommerce + Avia parameters) | **HIGH** — fixes root cause | 15 min |
| 2 | Assess WooCommerce: needed or installed by mistake? | **HIGH** — remove if unused | 10 min |
| 3 | Canonical tags for /shop/?* → /shop/ (if WooCommerce stays) | Reduces duplicates | 30 min |
| 4 | Fix sitemap HTTPS references if HTTP is used | Fixes crawl chain | 10 min |
| 5 | Fix [N] broken 404 links (add 301 redirects) | Fixes link equity | 30 min |

### Tier 3 — Monitoring (4–8 Weeks After Tier 2)
- Check if "Gecrawlt – zurzeit nicht indexiert" count has decreased
- Verify indexed page count is growing
- Monitor key content pages for ranking improvements

---

## 5. robots.txt Recommendation

**Current robots.txt:** [Paste what's currently there]

**Recommended version:** [Paste the template from robots-txt-templates.md with domain filled in]

**How to implement:** Yoast SEO → Tools → File editor, or FTP to WordPress root

---

*Document prepared by: SEO Agency in a Box (BenAI)*
*Date: [date]*
*For: [Client name] — [domain]*
