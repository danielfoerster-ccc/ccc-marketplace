# robots.txt Templates for WordPress Sites

*Last updated: 2026-03-04. Review before use if older than 90 days.*

---

## Why robots.txt Matters for GSC Health

Many WordPress plugins and themes generate parameter URLs that waste Google's crawl budget.
A well-configured robots.txt prevents Googlebot from even requesting these URLs, freeing up
the budget for real content.

**Symptom:** High count of "Gecrawlt – zurzeit nicht indexiert" pages in GSC — especially when
the actual site has under 200 real pages but GSC shows 500+ not-indexed pages.

**Template selection — choose based on the client's installed plugins:**

| Client setup | Template |
|---|---|
| WordPress only (no shop, no special plugins) | WordPress Baseline |
| WordPress + WooCommerce, no specific theme | WooCommerce |
| WordPress + WooCommerce + Avia/Enfold theme | WooCommerce + Avia/Enfold |
| WordPress + WPML or Polylang | WPML / Polylang |
| WordPress + FacetWP or Search & Filter | Faceted Search |
| Multiple plugins active | Combine relevant blocks |

---

## Template 1: WordPress Baseline (No Shop, No Special Plugins)

Use for: Standard WordPress sites with Yoast/RankMath and no shop or multilingual setup.

```
User-agent: *

# WordPress core
Disallow: /wp-login.php
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-json/

# Search and low-value pages
Disallow: /feed/
Disallow: /comments/feed/
Disallow: /?s=
Disallow: /search/
Disallow: /tag/
Disallow: /author/

Sitemap: https://[domain]/sitemap_index.xml
```

---

## Template 2: WooCommerce (No Avia/Enfold Theme)

Use for: WordPress + WooCommerce, any theme *except* Avia/Enfold.

```
User-agent: *

# WordPress core
Disallow: /wp-login.php
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-json/

# WooCommerce parameter URLs (crawl budget killers)
Disallow: /shop/?*
Disallow: /?wc-ajax=
Disallow: /?add-to-cart=
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/
Disallow: /wc-api/

# Search and low-value pages
Disallow: /feed/
Disallow: /comments/feed/
Disallow: /?s=
Disallow: /search/
Disallow: /tag/
Disallow: /author/

Sitemap: https://[domain]/sitemap_index.xml
```

---

## Template 3: WooCommerce + Avia/Enfold Theme

Use for: WordPress + WooCommerce + Avia/Enfold (by Kriesi). Avia adds its own shop filter
URL parameters on top of WooCommerce, requiring additional Disallow rules.

```
User-agent: *

# WordPress core
Disallow: /wp-login.php
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-json/

# WooCommerce parameter URLs (crawl budget killers)
Disallow: /shop/?*
Disallow: /?wc-ajax=
Disallow: /?add-to-cart=
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/
Disallow: /wc-api/

# Avia / Enfold theme parameter URLs (crawl budget killers)
Disallow: /?avia_extended_shop_select=
Disallow: /?avia=
Disallow: /?paged=
Disallow: /page/

# Search and low-value pages
Disallow: /feed/
Disallow: /comments/feed/
Disallow: /?s=
Disallow: /search/
Disallow: /tag/
Disallow: /author/

Sitemap: https://[domain]/sitemap_index.xml
```

---

## Template 4: WPML or Polylang (Multilingual)

Use for: WordPress with WPML or Polylang installed. Multilingual plugins can generate
language parameter variants and duplicate pages if not configured correctly.

```
User-agent: *

# WordPress core
Disallow: /wp-login.php
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-json/

# WPML / Polylang — block language switcher redirect pages
Disallow: /?lang=
Disallow: /?wpml_lang=

# Search and low-value pages
Disallow: /feed/
Disallow: /comments/feed/
Disallow: /?s=
Disallow: /search/
Disallow: /tag/
Disallow: /author/

Sitemap: https://[domain]/sitemap_index.xml
```

**Note for WPML/Polylang:** Subdirectory language URLs (e.g., `/de/`, `/en/`) should generally
be crawlable — do NOT block them unless they are test/incomplete languages. The primary fix for
WPML duplicate content is hreflang tags, not robots.txt.

---

## Template 5: FacetWP or Search & Filter (Faceted Search)

Use for: WordPress with FacetWP, Search & Filter, or similar faceted search/filter plugins.
These generate URLs like `?fwp_color=red&fwp_size=large` or `?filter_color=red`.

```
User-agent: *

# WordPress core
Disallow: /wp-login.php
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-json/

# FacetWP parameter URLs
Disallow: /?fwp_
Disallow: /?fwp=

# Search & Filter parameter URLs
Disallow: /?filter_
Disallow: /?orderby=
Disallow: /?min_price=
Disallow: /?max_price=

# Search and low-value pages
Disallow: /feed/
Disallow: /comments/feed/
Disallow: /?s=
Disallow: /search/
Disallow: /tag/
Disallow: /author/

Sitemap: https://[domain]/sitemap_index.xml
```

---

## Combining Templates

If a client has multiple plugins (e.g., WooCommerce + Polylang), combine the relevant
sections. Always include the WordPress core block from Template 1 as the base.

Example — WooCommerce + WPML:
- Start with WordPress core block
- Add WooCommerce block (Template 2)
- Add WPML block (Template 4)
- End with Search/low-value pages block

---

## How to Add in WordPress

1. **Via Yoast SEO** (recommended): SEO → Tools → File editor → robots.txt
2. **Via RankMath**: General Settings → Edit robots.txt
3. **Via FTP/SFTP**: Edit `/robots.txt` in the WordPress root directory

---

## Expected Timeline After robots.txt Fix

- **Week 1–2**: Googlebot stops requesting parameter URLs
- **Week 2–4**: Freed crawl budget starts reaching real content pages
- **Week 4–8**: Indexed page count increases; "Gecrawlt – zurzeit nicht indexiert" count drops
- **Week 8–12**: Rankings may improve as content gets re-crawled more frequently
