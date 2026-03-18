---
name: ccc-wordpress-seo-implementation
description: Implements SEO fixes on WordPress client websites for CCC. Takes audit findings (from ccc-seo-audit, Seomator, or any SEO report) and systematically applies On-Page and technical improvements. Uses Chrome MCP for live site inspection and WPCode plugin for bulk Yoast meta operations — including the WPCode 3-Step Pattern for safe bulk meta-description and title updates. Covers the full implementation checklist: robots.txt, security headers (.htaccess), H1 tags, meta descriptions, page titles, OG image, canonical verification, and Yoast archive/sitemap settings. USE THIS SKILL when implementing SEO audit results on a WordPress site, setting meta descriptions or titles in bulk, fixing H1 tags across multiple pages, configuring Yoast settings, running a WordPress SEO implementation sprint for a CCC client, or any task that involves executing on SEO findings rather than just discovering them. Always use after ccc-seo-audit has been run.
allowed-tools: Read, Write, Edit, Bash, mcp__Claude_in_Chrome__navigate, mcp__Claude_in_Chrome__javascript_tool, mcp__Claude_in_Chrome__get_page_text, mcp__Claude_in_Chrome__tabs_context_mcp, mcp__Claude_in_Chrome__read_page
---

# CCC WordPress SEO Implementation

**Workflow: Diagnose → Implement → Verify → Report**

This skill bridges the gap between an SEO audit report and a clean, implemented result on a live WordPress website. It assumes Chrome MCP access to the client's WordPress admin, and the WPCode plugin installed on the site. If the audit hasn't been run yet, run `ccc-seo-audit` first.

---

## Before You Start

Confirm the following before touching anything:

1. **Chrome is connected** — run `tabs_context_mcp` to get a tab ID. If it fails, ask the user to click "Connect" in the Chrome extension.
2. **WP admin access** — navigate to `[client-domain]/wp-admin/`. If redirected to login, the session has expired.
3. **WPCode plugin is active** — check Plugins list. If missing, note it and fall back to manual page editing only.
4. **Audit findings are available** — either in context, as a PDF, or in the client workbook.
5. **Recent backup exists** — ask the client to confirm before editing robots.txt or .htaccess. A WordPress backup plugin (UpdraftPlus, BackWPup, etc.) is sufficient.

If the client's domain is blocked by the proxy (WebFetch/Bash return errors for that domain), use Chrome MCP for all site inspection — it works even when WebFetch doesn't.

---

## Phase 0: Discovery

Before implementing, understand the site stack. Run the WPCode Diagnostic Snippet (see `references/wpcode-snippets.md`) to get all page IDs, titles, slugs, and current Yoast meta state in one pass.

Also check manually:
- **Site URL protocol**: WordPress → Settings → General. Is the WordPress Address using HTTPS? If not, this causes sitemap and OG image issues.
- **Active theme**: Is Avia/Enfold active? (affects robots.txt parameter blocking)
- **WooCommerce**: Is it installed and active? (biggest source of crawl budget waste — 700+ phantom URLs)
- **Archive settings**: Yoast → Einstellungen → Webseiten-Darstellung → Archive (are Autoren-Archive and Kategorie-Archive being indexed?)

---

## Phase 1: Technical SEO

### 1a. robots.txt

Navigate to `[client-domain]/robots.txt` and review the current state. Compare against the audit findings.

Key questions to answer before rewriting:
- WooCommerce active? → Block `?add-to-cart=`, `?orderby=`, `?filter_*`, `?pa_*`, `?product_tag=` etc.
- Avia/Enfold theme active? → Block `?av-*`, `?avia-*` parameters
- Is the Sitemap URL using HTTPS? (must be `https://`, not `http://`)
- Is `Allow: /wp-admin/admin-ajax.php` present? (required for WooCommerce AJAX to work even after WooCommerce removal)

Edit via: **Yoast SEO → Einstellungen → Tools → robots.txt-Datei bearbeiten**

See `references/templates.md` for the full WordPress + WooCommerce robots.txt template.

Verify after saving by navigating to the live robots.txt URL.

### 1b. Security Headers (.htaccess)

Add to .htaccess via: **Yoast SEO → Einstellungen → Tools → .htaccess-Datei bearbeiten**

Append at the end of the file (don't touch existing WordPress rewrite rules):

```apache
# Security Headers
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

Verify by loading the homepage in Chrome and checking Network → response headers for these three values.

---

## Phase 2: On-Page SEO

### 2a. H1 Tags

**Always inspect the actual page before drafting an H1.** The URL slug often doesn't match the page content (e.g., `/quantenphysik/` is actually the "Leistungen" page). Use Chrome MCP to read what's actually on each page.

Diagnostic JS to run on each page:
```javascript
const h1s = Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim());
const h2s = Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim()).slice(0, 3);
({h1Count: h1s.length, h1s, firstH2s: h2s, url: window.location.href})
```

Pages with `h1Count === 0` need an H1. Draft it based on the page's actual content, not the slug.

**To fix in Avia/Enfold page builder:** Open the page in WP admin → edit with page builder → find the main heading element → change its heading level from H3/H4 to H1. One H1 per page maximum.

### 2b. Meta Descriptions — The WPCode 3-Step Pattern

This is the core technique for bulk Yoast meta updates. It's faster and safer than editing pages individually. Always follow all three steps — never skip to bulk without testing first.

Full code templates in `references/wpcode-snippets.md`.

**Step 1: Diagnostic Snippet**
- Creates a table showing all pages with their IDs, slugs, and current meta descriptions
- Access by appending `?ccc_check=1` to any page URL while logged in as admin
- Note down page IDs for all pages that need meta descriptions
- Deactivate after use

**Step 2: Test Snippet (1 page)**
- Updates a single low-risk page (e.g., Impressum) to verify the pattern works on this site
- Uses a one-time flag (`ccc_meta_test_done`) so it fires exactly once
- Verify success: `document.querySelector('meta[name="description"]').content` in Chrome console
- **Deactivate the snippet before moving to Step 3**

**Step 3: Bulk Snippet**
- Updates all target pages in one pass
- Uses a one-time flag (`ccc_meta_bulk_done`)
- Verify 2–3 pages via Chrome after running
- **Deactivate after confirming**

**Rollback:** If something goes wrong, the Rollback Snippet deletes the `_yoast_wpseo_metadesc` field from specified pages. See `references/wpcode-snippets.md`.

**Yoast meta field names for reference:**
- Meta description: `_yoast_wpseo_metadesc`
- SEO title: `_yoast_wpseo_title`
- Focus keyphrase: `yoast_wpseo_focuskw`
- robots noindex: `_yoast_wpseo_meta-robots-noindex`

### 2c. Homepage Title

Check current rendered title first:
```javascript
document.title + ' (' + document.title.length + ' chars)'
```

Optimal length: 50–60 characters. Format: `Hauptkeyword | Markenname`

To fix: Yoast meta box on the homepage page → "SEO-Titel" field. Or via WPCode using `_yoast_wpseo_title` field.

### 2d. OG Fallback Image

**WordPress admin → Yoast SEO → Einstellungen → Webseiten-Darstellung → Startseite → Standard-Bild für Social Media**

Ideal specs: 1200×630px, HTTPS URL, horizontal format. If only a vertical image is available, set it anyway — it's better than no image.

Note: If the WordPress Address is still HTTP, the OG image URL will also be HTTP. Fix the WordPress Address first, then reset the image, or use Better Search Replace to update the URL in the database.

### 2e. Favicon

**WordPress admin → Design → Customizer → Website-Identität → Website-Symbol**

Requires a 512×512px square image from the client. If no asset is available, leave this pending and note it in the status report.

---

## Phase 3: Yoast Settings

### 3a. Archive Pages (Quick win — 2 minutes)

**Yoast SEO → Einstellungen → Webseiten-Darstellung → Archive**

- Autoren-Archive → "Von Suchmaschinen anzeigen lassen" → **AUS**
- Kategorie-Archive → **AUS** (unless they contain genuinely unique, valuable content)

This prevents duplicate content and concentrates ranking signals on the real content pages.

### 3b. Old/Unused Sitemaps

If WooCommerce or Portfolio post types were once active but are no longer used, their sitemaps may still be registered (product-sitemap.xml, portfolio-sitemap.xml).

**Yoast → Einstellungen → Webseiten-Darstellung → Inhaltstypen** → disable "Produkte" and "Portfolio" if present.

Verify by checking `[client-domain]/sitemap_index.xml` — old entries should no longer appear.

### 3c. Canonical Verification

Verify the homepage canonical is correct before closing:
```javascript
fetch('https://[client-domain].de/')
  .then(r => r.text())
  .then(html => {
    const m = html.match(/<link rel="canonical" href="([^"]+)"/);
    window._canonical = m ? m[1] : 'not found';
  });
// Then: window._canonical
```

Expected: `https://[client-domain].de/` — if it points to a blog post URL, something is misconfigured.

To fix: Yoast meta box on homepage → "Erweitert" tab → clear the canonical field (empty = Yoast uses the page's own URL automatically).

---

## Phase 4: Verify & Report

After completing each section, verify via Chrome before marking as done:

| Check | JS to run in Chrome console |
|-------|-----------------------------|
| Meta description | `document.querySelector('meta[name="description"]').content` |
| H1 present | `document.querySelector('h1')?.innerText` |
| Title length | `document.title.length + ' chars'` |
| Canonical correct | `document.querySelector('link[rel="canonical"]').href` |
| OG image set | `document.querySelector('meta[property="og:image"]')?.content` |
| Security headers | Check Network tab → Response Headers |

Update the client Statusbericht (status report) with all completed items marked ✅. Items blocked on client assets (Favicon, OG image) should be noted with what's needed.

---

## Implementation Priority Order

When time is limited, work in this order — highest SEO leverage first:

1. **robots.txt** — if WooCommerce is present, this is the single biggest crawl budget fix
2. **Archive deactivation** (Yoast) — 2 minutes, immediate duplicate content fix
3. **Meta descriptions** (WPCode 3-step) — CTR impact, systematic via WPCode
4. **H1 tags** — direct ranking signal, needs Chrome inspection per page
5. **Security headers** (.htaccess) — moderate impact, 5 minutes
6. **Old sitemaps** (Yoast) — quick, removes waste
7. **Homepage title + OG image** — presentation and CTR
8. **Favicon** — needs client asset
9. **WooCommerce deinstallation** — largest single lever, but needs backup + separate session

---

## Rules

1. **Always run the Diagnostic Snippet before writing any page IDs into code.** Page IDs in WordPress are not predictable — never guess.
2. **Always test on one page (Step 2) before bulk rollout (Step 3).** One botched bulk run can overwrite meta descriptions across the entire site.
3. **Always deactivate WPCode snippets after they've run.** Snippets with one-time flags fire once correctly — but leaving them active is unnecessary noise.
4. **If WebFetch is blocked for the client domain, use Chrome MCP.** The proxy blocks many client domains; Chrome MCP works regardless.
5. **Never edit .htaccess or robots.txt without confirming a backup exists.** A bad .htaccess can take down the entire site.
6. **Blog article meta descriptions come after main pages.** Main pages are fewer and higher priority; blog posts can wait for a dedicated session.
7. **Do not attempt WooCommerce deinstallation in the same session as other site changes if a client call is within 2 hours.** If something goes wrong with the restore, there's no time to fix it.
8. **Read the actual page content before drafting H1 tags.** URL slugs regularly don't match page content on sites with rebuilt navigation.

---

## Self-Improvement

When a WPCode snippet fails on a new site (wrong hooks, page builder conflicts, custom post types):
- Note the site's theme/plugin stack and the fix in `references/wpcode-snippets.md`
- Add a rule above if it's a repeatable failure mode

When a client's theme generates headings in an unexpected way (e.g., H1 hardcoded in the template, not editable via page builder):
- Note the theme name and the workaround here

When a new Yoast version changes where canonical or archive settings live:
- Update Phase 2e and Phase 3a with the new navigation path
