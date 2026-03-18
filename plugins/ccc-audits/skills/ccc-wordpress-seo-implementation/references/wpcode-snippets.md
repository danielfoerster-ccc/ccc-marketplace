# WPCode Snippets — CCC WordPress SEO Implementation

All snippets follow the same safety pattern:
- `current_user_can('manage_options')` — only fires for admins
- One-time flag via `get_option()` / `update_option()` — fires exactly once, then self-deactivates logically
- Always deactivate the snippet in WPCode after it has run

---

## Snippet 1: Diagnostic — Page IDs + Current Meta State

**When to use:** Always first, before writing any page IDs into other snippets.

**How to use:**
1. Add to WPCode → activate
2. Visit any page on the site with `?ccc_check=1` in the URL while logged in as admin
3. A table appears at the bottom of the page with all pages, their IDs, slugs, and current Yoast meta descriptions
4. Note the IDs for pages that need meta descriptions
5. Deactivate the snippet

```php
add_action('wp_footer', function() {
    if (!current_user_can('manage_options')) return;
    if (!isset($_GET['ccc_check'])) return;

    $pages = get_pages([
        'post_status' => 'publish',
        'number'      => 200,
    ]);

    echo '<div style="background:#fff;padding:20px;margin:20px;font-family:monospace;font-size:12px;border:2px solid red;z-index:9999;position:relative;">';
    echo '<h3 style="color:red;">CCC SEO Diagnostic</h3>';
    echo '<table border="1" cellpadding="5" style="border-collapse:collapse;">';
    echo '<tr><th>ID</th><th>Titel</th><th>Slug</th><th>Meta Description</th></tr>';

    foreach ($pages as $page) {
        $meta = get_post_meta($page->ID, '_yoast_wpseo_metadesc', true);
        $title = get_post_meta($page->ID, '_yoast_wpseo_title', true);
        $color = empty($meta) ? '#ffcccc' : '#ccffcc';
        echo '<tr style="background:' . $color . '">';
        echo '<td>' . $page->ID . '</td>';
        echo '<td>' . esc_html($page->post_title) . '</td>';
        echo '<td>' . esc_html($page->post_name) . '</td>';
        echo '<td>' . (empty($meta) ? '<em>LEER</em>' : esc_html(substr($meta, 0, 80))) . '</td>';
        echo '</tr>';
    }

    echo '</table>';
    echo '<p>Gesamt: ' . count($pages) . ' Seiten</p>';
    echo '</div>';
});
```

---

## Snippet 2: Test Snippet — Single Page

**When to use:** After Diagnostic, before Bulk. Always test on one low-risk page first.

**Customize:** Replace `1311` with the target page ID. Replace the meta description text.

**How to use:**
1. Update the page ID and description text
2. Add to WPCode → activate
3. Visit the page — Yoast meta description is now set
4. Verify in Chrome console: `document.querySelector('meta[name="description"]').content`
5. **Deactivate the snippet**

```php
add_action('init', function() {
    if (!current_user_can('manage_options')) return;
    if (get_option('ccc_meta_test_done')) return;

    // Replace with your target page ID and description
    $page_id     = 1311;
    $description = 'Ihre Kurzbeschreibung hier — 120 bis 155 Zeichen, mit klarer Aussage.';

    update_post_meta($page_id, '_yoast_wpseo_metadesc', $description);
    update_option('ccc_meta_test_done', true);
});
```

**To reset the one-time flag** (if you need to run it again):
```php
// Run once in WPCode, then remove:
delete_option('ccc_meta_test_done');
```

---

## Snippet 3: Bulk Meta Descriptions

**When to use:** After Step 2 (Test) is confirmed working. Rolls out to all target pages.

**Customize:** Fill in the `$descriptions` array with page ID => description pairs. Get IDs from the Diagnostic snippet.

**How to use:**
1. Fill in all page IDs and their descriptions
2. Add to WPCode → activate
3. Visit any page on the site to trigger the `init` hook
4. Verify 2–3 pages in Chrome console
5. **Deactivate the snippet**

```php
add_action('init', function() {
    if (!current_user_can('manage_options')) return;
    if (get_option('ccc_meta_bulk_done')) return;

    $descriptions = [
        // Page ID => Meta Description (120–155 Zeichen)
        // Beispiel:
        // 154    => 'Krey & Krey verbindet Quantenphysik mit modernem Management — für Unternehmen, die Stille Kündigung nachhaltig überwinden wollen.',
        // 952    => 'Unsere Leistungen: Analyse, Beratung und Umsetzung gegen Stille Kündigung im Unternehmen.',
        // 357591 => 'Stille Kündigung im Unternehmen erkennen und lösen — mit dem quantenphysikalischen Ansatz von Krey & Krey.',
        // Add all target pages here...
    ];

    foreach ($descriptions as $id => $desc) {
        update_post_meta((int)$id, '_yoast_wpseo_metadesc', $desc);
    }

    update_option('ccc_meta_bulk_done', true);
});
```

---

## Snippet 4: Bulk SEO Titles (optional)

**When to use:** If page titles also need updating (same pattern as meta descriptions).

```php
add_action('init', function() {
    if (!current_user_can('manage_options')) return;
    if (get_option('ccc_titles_bulk_done')) return;

    $titles = [
        // Page ID => SEO Title (50–60 Zeichen)
        // 357558 => 'Stille Kündigung erkennen & lösen | kreyundkrey',
    ];

    foreach ($titles as $id => $title) {
        update_post_meta((int)$id, '_yoast_wpseo_title', $title);
    }

    update_option('ccc_titles_bulk_done', true);
});
```

---

## Snippet 5: Rollback — Delete Meta Descriptions

**When to use:** If a bulk snippet wrote incorrect data and you need to start over.

**Customize:** Add the page IDs that need to be cleared to the `$page_ids` array.

```php
add_action('init', function() {
    if (!current_user_can('manage_options')) return;
    if (get_option('ccc_rollback_done')) return;

    $page_ids = [
        // Add IDs to roll back, e.g.:
        // 154, 952, 357591, 357592
    ];

    foreach ($page_ids as $id) {
        delete_post_meta((int)$id, '_yoast_wpseo_metadesc');
    }

    // Optional: also clear the one-time flag so the bulk snippet can run again
    delete_option('ccc_meta_bulk_done');

    update_option('ccc_rollback_done', true);
});
```

---

## Notes & Troubleshooting

**Snippet fires but meta description doesn't appear on the page:**
- Check that Yoast SEO is active and generating meta tags
- Verify with: `document.querySelector('meta[name="description"]').content` in Chrome console
- Some caching plugins (WP Rocket, LiteSpeed) may serve a cached version — purge the cache

**`current_user_can('manage_options')` check fails unexpectedly:**
- The `init` hook may fire before the user session is fully loaded on some server setups
- Alternative: use `wp_loaded` hook instead of `init`

**Page IDs from Diagnostic don't match live site:**
- This can happen on staging/production setups where IDs differ between environments
- Always run the Diagnostic on the same environment you're updating

**WooCommerce product pages need meta descriptions too:**
- Use `get_posts()` with `post_type => 'product'` instead of `get_pages()`
- Or handle after WooCommerce deinstallation (they'll be deleted anyway)

**One-time flags persist after deinstalling WPCode:**
- The `wp_options` table stores these: `ccc_meta_test_done`, `ccc_meta_bulk_done`, `ccc_rollback_done`
- Clean up via phpMyAdmin or a WP-CLI command if needed: `wp option delete ccc_meta_bulk_done`
