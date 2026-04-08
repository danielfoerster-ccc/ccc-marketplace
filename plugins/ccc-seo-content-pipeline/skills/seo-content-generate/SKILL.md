---
name: seo-content-generate
description: "Orchestrates SEO article generation via Arvo API. Formats article briefs from approved content calendar, sends to Arvo for writing with brand assets, monitors publishing status, and logs results. Claude handles orchestration only—Arvo handles writing."
allowed-tools: "Read, Write, Edit, Bash, Glob, Grep"
---

## Overview

This skill executes the **Brief → Submit → Monitor → Log** workflow to generate SEO articles via the Arvo external API. Claude orchestrates the pipeline; Arvo handles the actual content writing. This decoupling allows high-volume content production without overwhelming Claude's context.

**Entry triggers:** "generate articles", "run the blog plan", "send to Arvo", "publish this week's content", "create SEO articles"

**IMPORTANT:** Claude does NOT write the articles. Arvo does. This skill only orchestrates submission, monitoring, and logging.

---

## Workflow: Brief → Submit → Monitor → Log

### Step 1: Load Context

Read from vault:

1. `03 - OPERATIONS/[client]/SEO/pipeline-config.md` → Extract:
   - Arvo API key & endpoint
   - Brand voice, CTAs, sitemap URL
   - Client URL & publishing preferences

2. `03 - OPERATIONS/[client]/SEO/content-calendar/13-week-calendar.md` → Extract:
   - This week's scheduled articles (status: QUEUED)
   - Publish dates

3. `03 - OPERATIONS/[client]/SEO/content-calendar/article-briefs/` → Load briefs for all QUEUED articles

### Step 2: Format Article Brief for Arvo

Transform the vault brief into the Arvo API request body:

```json
{
  "keyword": "SaaS pricing comparison",
  "article_title": "The Complete Guide to SaaS Pricing Models [2026]",
  "intent": "BOFU",
  "word_count": 2000,
  "brand_voice": {
    "tone": "professional",
    "style_keywords": ["authoritative", "data-driven", "solution-focused"]
  },
  "ctas": {
    "primary": "Schedule a demo with our team",
    "secondary": "Download the SaaS Pricing Comparison Sheet"
  },
  "content_outline": [
    {
      "section": "Introduction",
      "key_points": [
        "Why SaaS pricing matters",
        "Overview of pricing models"
      ]
    },
    {
      "section": "Pricing Models Overview",
      "key_points": [
        "Per-user/per-seat",
        "Tiered/volume-based",
        "Usage-based",
        "Freemium model"
      ]
    },
    {
      "section": "Pricing Comparison",
      "key_points": [
        "Model A advantages & disadvantages",
        "Model B advantages & disadvantages",
        "Which model for different businesses"
      ]
    },
    {
      "section": "Call-to-Action",
      "key_points": [
        "Primary CTA placement",
        "Secondary CTA positioning"
      ]
    }
  ],
  "internal_links": {
    "target_keywords": [
      "SaaS infrastructure costs",
      "SaaS business model"
    ],
    "anchor_text": [
      "how much does SaaS cost",
      "building a SaaS product"
    ]
  },
  "publish_date": "2026-04-15",
  "client_url": "https://example.com",
  "sitemap_url": "https://example.com/sitemap.xml"
}
```

### Step 3: Submit to Arvo API

Via Bash, POST the brief to Arvo:

```bash
#!/bin/bash

ARVO_API_KEY="$1"
CLIENT_NAME="$2"
KEYWORD="$3"
BRIEF_JSON="$4"

curl -X POST https://api.arvo.io/v1/articles/generate \
  -H "Authorization: Bearer $ARVO_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$BRIEF_JSON" \
  | jq .

# Example invocation:
# bash submit_to_arvo.sh "[API_KEY]" "[CLIENT]" "[KEYWORD]" "[JSON_BRIEF]"
```

Capture the response:

```json
{
  "article_id": "arvo_12345",
  "status": "generating",
  "created_at": "2026-04-08T10:30:00Z",
  "estimated_completion": "2026-04-08T12:30:00Z",
  "keyword": "SaaS pricing comparison"
}
```

Record `article_id` and `created_at` timestamp for monitoring.

### Step 4: Monitor Publishing Status

Poll Arvo API every 30 minutes until article is published:

```bash
#!/bin/bash

ARVO_API_KEY="$1"
ARTICLE_ID="$2"

while true; do
  STATUS=$(curl -s https://api.arvo.io/v1/articles/$ARTICLE_ID/status \
    -H "Authorization: Bearer $ARVO_API_KEY" \
    | jq -r .status)
  
  echo "[$(date)] Article $ARTICLE_ID status: $STATUS"
  
  if [ "$STATUS" = "published" ]; then
    echo "Article published successfully!"
    break
  elif [ "$STATUS" = "failed" ]; then
    echo "ERROR: Article generation failed!"
    exit 1
  fi
  
  sleep 1800  # Wait 30 minutes before next check
done
```

Monitor states:
- `generating` → Arvo is writing
- `published` → Article live on client site
- `failed` → Error occurred (debug with Arvo support)

### Step 5: Verify Publication on Client Website

Once Arvo reports `published`, verify the article exists on the client's website:

```bash
#!/bin/bash

CLIENT_URL="$1"
ARTICLE_TITLE="$2"

# Fetch the blog page and look for the article title
curl -s "$CLIENT_URL/blog" | grep -q "$ARTICLE_TITLE"

if [ $? -eq 0 ]; then
  echo "✓ Article found on live site"
else
  echo "✗ Article NOT found on live site. Check manual publishing."
fi
```

### Step 6: Log Published Article

Update vault logs:

1. **Update content calendar status:**
   - Change from `QUEUED` to `PUBLISHED`
   - Record publish date/time
   - Note Arvo article_id

2. **Create publication log entry** in `03 - OPERATIONS/[client]/SEO/published-articles/article-log.md`:

```markdown
# [[Client Name]] — Published Articles Log

| Publish Date | Keyword | Article Title | Arvo ID | Status | Traffic (1wk) | Traffic (4wk) |
|---|---|---|---|---|---|---|
| 2026-04-08 | "SaaS pricing comparison" | The Complete Guide to SaaS Pricing Models [2026] | arvo_12345 | LIVE | — | — |

---

## Article Details: "SaaS pricing comparison"

**Publish Date:** 2026-04-08
**Article URL:** https://example.com/blog/seo-pricing-models
**Target Keyword:** "SaaS pricing comparison"
**Arvo ID:** arvo_12345
**Word Count:** 2047
**Published by:** [[seo-content-generate]] via Arvo API

### Internal Links

- Linked to: "SaaS infrastructure costs" article
- Linked to: "SaaS business model" article

### Performance Baseline

- **Week 1 traffic:** [to be filled by [[seo-weekly-review]]]
- **Target ranking:** Top 10 by week 8

### Notes

- [Any issues during generation/publishing?]
- [Outreach/promotion notes]

---
```

3. **Notify about next step:**
   - If social distribution enabled → Suggest running [[seo-social-repurpose]]
   - If more articles queued → Repeat steps 1–6 for next week's articles

### Step 7: Handle Failures

If Arvo reports `failed`:

1. **Check error message** from Arvo API response
2. **Debug categories:**
   - API authentication? → Regenerate Arvo API key
   - Brief formatting? → Validate JSON structure
   - Arvo service? → Wait 1 hour, retry
   - Brand conflict? → Adjust brand voice in brief, resubmit

3. **Log failure** to `03 - OPERATIONS/[client]/SEO/published-articles/failures.md`:

```markdown
# [[Client Name]] — Publishing Failures

| Date | Keyword | Arvo ID | Error | Resolution | Status |
|---|---|---|---|---|---|
| 2026-04-08 | "SaaS pricing" | arvo_12345 | Auth token expired | Regenerated token, resubmitted | RESUBMITTED |
```

---

## Article Brief Template

Use this format for all briefs sent to Arvo:

```markdown
# Article Brief: "[Target Keyword]"

**Article Title:** [Title including year]
**Target Keyword:** [Primary keyword]
**Search Intent:** [BOFU/MOFU/TOFU]
**Word Count Target:** 1800–2200 words
**Publish Date:** [YYYY-MM-DD]

## Content Outline

1. **Introduction (150–200w)**
   - Hook
   - Value promise
   - Preview

2. **[Section 1]: [Subtopic]**
   - Point 1
   - Point 2
   - Point 3

3. **[Section 2]: [Subtopic]**
   - [similar]

4. **[Section 3]: [Subtopic]**
   - [similar]

5. **Conclusion & CTA**
   - Summary
   - Primary CTA

## Brand Voice & CTAs

- **Tone:** [professional/conversational/educational]
- **Brand personality:** [examples from client brand]
- **Primary CTA:** [exact CTA copy]
- **Secondary CTA:** [if applicable]
- **Avoid:** [phrases/angles to skip]
- **Emphasize:** [unique client positioning]

## Internal Linking

- **Link to keywords:** [list 2–3 related articles]
- **Anchor text examples:** ["how much does X cost", "best practices for Y"]

## Publishing Details

- **Client URL:** [https://example.com]
- **Sitemap URL:** [https://example.com/sitemap.xml]
- **Target publish date:** [date]
```

---

## Rules

1. **Claude orchestrates only.** Do NOT write the article in this skill. Arvo writes. Your job is submission, monitoring, and logging.
2. **Brief formatting is critical.** JSON structure must be valid. Test with `jq` before sending.
3. **Monitor to completion.** Don't assume Arvo succeeded. Poll until `published` status, then verify on client site.
4. **Log failures immediately.** If publishing fails, create a failure record. Retry with corrected brief.
5. **Wikilinks always.** Reference [[seo-keyword-strategy]], [[seo-social-repurpose]], [[seo-weekly-review]], and [[SOP SEO Pipeline — Content Generation & Publishing]].

---

## Self-Improvement

After each publishing cycle (weekly or batch):

1. **Success rate:** What % of briefs published successfully? Identify patterns in failures.
2. **Time to publish:** How long does Arvo take? Adjust monitoring frequency if needed.
3. **Brief quality:** Did Arvo produce articles matching brand voice? Refine brief instructions.
4. **Traffic baseline:** Did published articles get traffic in week 1? Log baseline for future [[seo-weekly-review]] comparison.
5. **Failure debugging:** Build a troubleshooting guide for common Arvo errors.

---

## Reference

**SOP:** [[SOP SEO Pipeline — Content Generation & Publishing]]
**Previous Skill:** [[seo-keyword-strategy]]
**Next Skill (optional):** [[seo-social-repurpose]]
**Monitoring Skill:** [[seo-weekly-review]]
