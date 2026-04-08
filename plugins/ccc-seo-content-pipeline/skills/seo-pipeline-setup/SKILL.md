---
name: seo-pipeline-setup
description: "Guided setup wizard for the CCC Automated SEO Content Pipeline. Collects brand context (voice, CTAs, audience, sitemap), validates Arvo API and Blotato connections, creates the client SEO project folder in the vault, and produces a pipeline configuration document."
allowed-tools: "Read, Write, Edit, Bash, Glob, Grep"
---

## Overview

This skill runs the **Interview → Configure → Validate → Save** workflow to onboard a new client into the CCC SEO Content Pipeline. It collects brand strategy, validates external API connections, creates vault structure, and documents the pipeline configuration for future reference.

**Entry triggers:** "set up SEO pipeline", "configure SEO automation", "new SEO client setup", "connect Arvo", "pipeline setup"

---

## Workflow: Interview → Configure → Validate → Save

### Step 1: Brand Context Interview

Ask the client to provide:

1. **Business fundamentals**
   - Business name & URL
   - Industry / vertical
   - Target audience persona (role, pain, budget level)
   - 2-3 sentence brand voice (tone, preferred style)

2. **Content strategy**
   - Primary CTA (sign-up, call, demo, purchase?)
   - Secondary CTAs
   - Sitemap URL (or ask to generate one)
   - Top 5 direct competitors (names/URLs)

3. **Publishing preferences**
   - Target: blog articles per month?
   - Tone preference (technical, conversational, educational?)
   - Length preference (1500–2500 words typical)
   - Social distribution desired? (LinkedIn, Facebook, Instagram)

### Step 2: API Configuration

Collect and record:

```
Arvo Integration:
- API Key: [redacted in logs]
- Endpoint: https://api.arvo.io/v1/articles
- Test: POST /health

Blotato Integration (if social enabled):
- API Key: [redacted in logs]
- Endpoint: https://api.blotato.io/v1/posts
- Page IDs: [one per line]
- Test: POST /auth/verify
```

### Step 3: Validation & Connection Tests

Run these Bash tests:

```bash
# Test Arvo API
curl -s -H "Authorization: Bearer $ARVO_API_KEY" \
  https://api.arvo.io/v1/health | jq .status

# Test Blotato API (if enabled)
curl -s -H "Authorization: Bearer $BLOTATO_API_KEY" \
  https://api.blotato.io/v1/auth/verify | jq .authenticated
```

Record results. If either fails, debug and re-test before proceeding.

### Step 4: Create Vault Folder Structure

Create folder tree at `03 - OPERATIONS/[client]/SEO/`:

```
03 - OPERATIONS/[client]/SEO/
├── competitor-analysis/
│   └── [competitor-gap-report].md
├── keyword-strategy/
│   └── [keyword-list].md
├── content-calendar/
│   └── [13-week-calendar].md
├── published-articles/
│   └── [article-log].md
├── social-posts/
│   └── [social-log].md
├── weekly-reports/
│   └── [weekly-review-log].md
└── pipeline-config.md
```

### Step 5: Save Pipeline Configuration

Create `03 - OPERATIONS/[client]/SEO/pipeline-config.md`:

```markdown
# [[Client Name]] — SEO Content Pipeline Config

## Brand Context

**Business:** [name]
**URL:** [url]
**Industry:** [industry]
**Target Audience:** [persona]
**Brand Voice:** [2-3 sentences]
**Primary CTA:** [CTA]
**Secondary CTAs:** [list]

## Publishing Strategy

**Target Cadence:** [X articles/month]
**Article Length:** [1500–2500 words]
**Tone Preference:** [technical|conversational|educational]
**Social Distribution:** [yes|no]

## Competitors (Top 5)

1. [Name] — [URL]
2. [Name] — [URL]
3. [Name] — [URL]
4. [Name] — [URL]
5. [Name] — [URL]

## API Integrations

**Arvo API:** [Status: ✓ Connected]
**Blotato API:** [Status: ✓ Connected | N/A]

## Vault Structure

- Competitor analysis → `competitor-analysis/`
- Keywords & strategy → `keyword-strategy/`
- Content calendar → `content-calendar/`
- Published articles → `published-articles/`
- Social posts → `social-posts/`
- Weekly reports → `weekly-reports/`

## Next Steps

1. Run [[seo-competitor-analysis]] to identify keyword gaps
2. Generate [[seo-keyword-strategy]] and approve
3. Begin [[seo-content-generate]] for first batch

**Setup Date:** [date]
**Last Updated:** [date]
```

### Step 6: Confirm & Next Step

Once saved, confirm:
> "Setup complete! Pipeline config saved to `03 - OPERATIONS/[client]/SEO/pipeline-config.md`. Next: run the **Competitor Gap Analysis** skill to identify your first set of keyword opportunities."

---

## Rules

1. **Always use wikilinks** for skill references: `[[skill-name]]`, not markdown links.
2. **API keys are redacted in logs.** Never display raw keys in reports or vault files.
3. **Vault paths are case-sensitive.** Use exact folder names: `03 - OPERATIONS/`, not `03-OPERATIONS/`.
4. **Sitemap is critical.** If the client doesn't have one, generate it before proceeding. (See [[SOP SEO Pipeline — Setup & Configuration]] for sitemap generation.)
5. **Competitors must be direct.** Ask for 5 direct, same-market competitors. Indirect competitors waste analysis time.

---

## Self-Improvement

After each setup session:

1. **Template refinement:** Did the interview questions capture all needed context? Add clarifying questions if gaps emerged.
2. **Validation debugging:** Did API tests fail? Document the error and update troubleshooting steps in the SOP.
3. **Folder naming:** Did the client naming convention cause issues? Standardize on `FirstName LastName` or `Company Name` early.
4. **Completeness check:** Did the config doc answer all future questions about brand voice, CTAs, and competitors? If not, update the template.

---

## Reference

**SOP:** [[SOP SEO Pipeline — Setup & Configuration]]
**Next Skill:** [[seo-competitor-analysis]]
