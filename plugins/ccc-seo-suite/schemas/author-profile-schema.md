# Author Profile Schema

Stored at `<client-folder>/_authors/<author-slug>.md`. Loaded by `ccc-seo-write-article` for author-byline injection + Schema.org Person markup.

## Required Frontmatter

```yaml
---
type: author-profile
name: <Full Name>
role: <Job title / role>
company: "[[<Company name as wikilink>]]"
brand_term: <Internal brand-term if applicable, optional>
location: <City, Country>
languages_writes:
  - <ISO code>
languages_fluent:
  - <ISO code>
photo_url: <HTTPS URL or TBD_<status>>
linkedin: <URL or empty>
instagram: <URL or empty>
website: <URL or empty>
email: <email or empty>
ymyl_domains_qualified:
  - <list of YMYL domains where this author has credible qualification>
ymyl_qualification_basis: <text — e.g., "lived_experience_plus_8_years_practice">
explicitly_not_qualified_for:
  - <list of YMYL domains explicitly NOT claimed>
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
---
```

## Required Body Sections

### Short Bio
1–2 sentences for article-top byline.

### Long Bio
3–6 sentences for article-bottom block.

### Credentials & Expertise
Bullet list with year ranges. Distinguish methodische Qualifikation vs. biographische Marker (lived experience).

### Methodische Werkzeug-Set
Table or list of concrete methods used by author. Used in voice-anchoring.

### Expertise Areas (Topic-Domänen)
Bullet list of topic domains the author owns.

### Sample-Topics Author Lehnt Ab
What this author refuses to write about. Important for topic-ideation filtering.

### Person-Schema.org JSON
Ready-to-inject JSON-LD block for article footer.

### Outstanding Items
Checklist of things still needed (photo, credentials list, etc.).

## YMYL Rule

When YMYL-status of article is non-zero, `ccc-seo-tools-content` checks:
1. `ymyl_domains_qualified` includes the article's YMYL-domain
2. `explicitly_not_qualified_for` does NOT include the article's YMYL-domain
3. Long bio mentions credential-basis

If any check fails → hard-block publish.

## Example

See `_authors/kai-reichel.md` in Kai Reichel's client folder for a worked example.

---

*Introduced: v0.2.0 (2026-05-18).*
