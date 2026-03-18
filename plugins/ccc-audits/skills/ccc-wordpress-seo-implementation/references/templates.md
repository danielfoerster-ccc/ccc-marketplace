# Templates — robots.txt & .htaccess

---

## robots.txt: WordPress + WooCommerce + Avia/Enfold

Use this template when WooCommerce AND the Avia/Enfold theme are both active.

Replace `https://[CLIENT-DOMAIN]/` with the actual client domain.

```
User-agent: *

# === WooCommerce Parameter-URLs (Crawlbudget-Schutz) ===
Disallow: /?add-to-cart=
Disallow: /?orderby=
Disallow: /?filter_
Disallow: /?pa_
Disallow: /?product_tag=
Disallow: /?product_cat=
Disallow: /?min_price=
Disallow: /?max_price=
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/
Disallow: /wp-json/wc/

# === Avia/Enfold Theme Parameter-URLs ===
Disallow: /?av-
Disallow: /?avia-

# === WordPress Standard ===
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/cache/
Disallow: /wp-content/upgrade/
Disallow: /?s=
Disallow: /search/
Disallow: /xmlrpc.php
Disallow: /trackback/
Disallow: /feed/

# Sitemap (immer HTTPS!)
Sitemap: https://[CLIENT-DOMAIN]/sitemap_index.xml
```

**After WooCommerce deinstallation**, remove the entire WooCommerce block (lines 3–12). The Avia block can stay until the theme is also replaced.

---

## robots.txt: WordPress only (no WooCommerce)

For sites where WooCommerce has been removed:

```
User-agent: *

# === WordPress Standard ===
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /wp-includes/
Disallow: /wp-content/plugins/
Disallow: /wp-content/cache/
Disallow: /wp-content/upgrade/
Disallow: /?s=
Disallow: /search/
Disallow: /xmlrpc.php
Disallow: /trackback/
Disallow: /feed/

Sitemap: https://[CLIENT-DOMAIN]/sitemap_index.xml
```

---

## .htaccess Security Headers

Add at the end of the existing .htaccess file — after the WordPress rewrite rules block. Don't modify the existing `# BEGIN WordPress` / `# END WordPress` block.

```apache
# === CCC Security Headers ===
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

**Verification:** After saving, load the homepage in Chrome → DevTools → Network → click the main HTML response → Response Headers. You should see all three headers listed.

**Extended version** (if the client wants stronger security):
```apache
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>
```

Note: `Strict-Transport-Security` (HSTS) should only be added if you're certain the site will always be on HTTPS. It's hard to undo once set in browsers.

---

## .htaccess Default (WordPress Rewrite Rules)

For reference — this is what a clean WordPress .htaccess looks like. The security headers go AFTER this block:

```apache
# BEGIN WordPress
# The directives (lines) between "BEGIN WordPress" and "END WordPress" are
# dynamically generated, and should only be modified via WordPress filters.
# Any changes to the directives between these markers will be overwritten.
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress

# === CCC Security Headers ===
<IfModule mod_headers.c>
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```
