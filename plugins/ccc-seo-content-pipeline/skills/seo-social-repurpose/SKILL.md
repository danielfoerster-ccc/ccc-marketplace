---
name: seo-social-repurpose
description: "Repurposes published SEO articles into platform-specific social posts and schedules via Blotato API. Generates LinkedIn/Facebook/Instagram captions, optionally creates visuals, sends to Blotato for scheduled publishing. OPTIONAL skill—only use when client wants social distribution."
allowed-tools: "Read, Write, Edit, Bash, WebSearch, WebFetch, Glob, Grep"
---

## Overview

This skill executes the **Read → Generate → Schedule → Log** workflow to amplify SEO article reach via social media. It's **entirely optional**—only activate if the client enabled social distribution during [[seo-pipeline-setup]].

The skill reads recently published articles, extracts key insights, generates platform-specific captions aligned with brand voice, and schedules posts via the Blotato API for optimal timing.

**Entry triggers:** "repurpose for social", "social media from blog", "schedule social posts", "run social repurposing", "send to Blotato"

**IMPORTANT:** This skill is OPTIONAL. Only use if client requested social distribution in their pipeline config.

---

## Workflow: Read → Generate → Schedule → Log

### Step 1: Verify Social Distribution is Enabled

Read `03 - OPERATIONS/[client]/SEO/pipeline-config.md` and check:

```yaml
Social Distribution: [yes | no]
```

If `no`, stop here. Notify user: "Social distribution not enabled for this client. To activate, update pipeline-config.md and re-run [[seo-pipeline-setup]]."

If `yes`, continue.

### Step 2: Identify Recently Published Articles

Read `03 - OPERATIONS/[client]/SEO/published-articles/article-log.md`:

- Filter for articles published in last 3 days
- Extract: keyword, article title, article URL, word count

Example:
- "SaaS pricing comparison" published 2026-04-08 → https://example.com/blog/seo-pricing-models

### Step 3: Extract Key Points from Articles

For each article:

1. Fetch the article URL (use WebFetch if available, or ask user to copy-paste key sections)
2. Extract 3–5 key takeaways (one-liners, not full sentences)
3. Identify relevant statistics/data points for social proof
4. Note any surprising findings or contrarian angles

**Example extraction:**

```
Article: "The Complete Guide to SaaS Pricing Models [2026]"
Key Points:
1. Per-user pricing remains the most popular model (63% of SaaS)
2. Usage-based pricing grows 25% YoY but requires solid metrics infrastructure
3. Freemium converts 10–15% of users on average
4. Tiered pricing outperforms flat-fee models by 2.3x in revenue
5. Price anchoring: Premium tier can increase average deal size by 35%
```

### Step 4: Generate Platform-Specific Captions

#### LinkedIn (Professional / Insight-driven)

**Audience:** B2B decision-makers, operators, CTOs
**Optimal length:** 1200–1500 characters
**Tone:** Professional, authoritative, data-driven
**CTA:** Book a demo, discuss with team, read full article

**Template:**

```
📊 SaaS Pricing: What Works (and What Doesn't)

We analyzed [X] SaaS companies and found some surprising patterns:

• Per-user pricing dominates (63% adoption), but usage-based is growing 25% YoY
• Freemium converts 10–15% of users—higher CAC, lower LTV
• Tiered pricing outperforms flat-fee models by 2.3x in revenue
• Strategic price anchoring can lift average deal size by 35%

The lesson? Your pricing model should match your unit economics and sales motion.

→ [Full article explores which model fits different business types]

Read the full breakdown: [URL]

#SaaS #Pricing #BusinessStrategy
```

**LinkedIn rules:**
- Lead with a hook or number
- 3–5 bullet points, not paragraphs
- Include a data point or stat
- End with a soft CTA (read article, discuss, comment)
- Hashtags: 3–5 relevant

#### Facebook (Conversational / Community-focused)

**Audience:** Founders, operators, small business owners
**Optimal length:** 200–400 characters
**Tone:** Conversational, relatable, helpful
**CTA:** Read the guide, share with your team

**Template:**

```
💰 Pricing Strategy Reality Check

Just published: The Complete Guide to SaaS Pricing Models

We broke down which pricing models actually work (and the data behind them). Whether you're per-user, usage-based, or freemium—find what fits your business.

Read it here: [URL]

What pricing model are you using? Drop a comment. 👇
```

**Facebook rules:**
- Shorter, conversational opener
- One clear benefit or insight
- Genuine question at the end (encourages comments)
- 1–2 emojis max
- Avoid LinkedIn-style bullet points

#### Instagram (Visual + Punchy)

**Audience:** Visual learners, entrepreneurs, content browsers
**Format:** Visual graphic + caption OR carousel
**Caption length:** 100–200 characters max (rest in first comment)
**Tone:** Punchy, visual, aspirational

**Template (text-based, no visual needed):**

```
💡 Pricing Model Cheat Sheet

Per-user = Predictable revenue
Usage-based = Scales with customer success
Freemium = Growth lever (with CAC trade-off)

Your model should match YOUR unit economics. Not someone else's.

[Visual: Simple infographic showing 3 pricing models with pros/cons]

→ See the full breakdown in bio 📌

#SaaS #PricingStrategy #StartupTips
```

**Instagram rules:**
- Emoji-heavy, visual-first thinking
- Hashtags in first comment (not caption)
- 15–20 hashtags total
- Emoji placement matters (scannability)
- Hook in first line

### Step 5: Create Visual Assets (Optional)

If time allows, generate a simple visual:

**Option A (No design skills needed):**
- Use Canva template: "Social Media Post" or "Quote"
- Overlay: 1–2 key stats + client logo
- Color: Match brand colors
- Save as PNG

**Option B (Simple data viz):**
- Text: "Pricing Model Comparison"
- Visual: 3 boxes with labels + % stats
- Design tool: Canva, Figma, or even ASCII art

**Example ASCII visual for Instagram:**

```
PRICING MODEL COMPARISON

📊 Per-User          📈 Usage-Based       💰 Tiered
63% adoption         +25% YoY growth     2.3x revenue lift
Predictable          Scales w/ customer   Premium tier power
Revenue per seat     Only pay for use    Best for enterprise

Read the full guide → [link in bio]
```

### Step 6: Format for Blotato API

For each platform, create a Blotato submission:

```json
{
  "platform": "linkedin",
  "caption": "[Full LinkedIn caption from Step 4]",
  "visual": "[URL to graphic, or null if text-only]",
  "scheduled_time": "2026-04-09T08:00:00Z",
  "hashtags": ["#SaaS", "#Pricing", "#BusinessStrategy"],
  "cta_link": "https://example.com/blog/seo-pricing-models",
  "engagement_goal": "comments",
  "page_id": "[from pipeline-config.md]"
}
```

### Step 7: Submit to Blotato API

Via Bash:

```bash
#!/bin/bash

BLOTATO_API_KEY="$1"
PLATFORM="$2"
CAPTION="$3"
VISUAL_URL="$4"
SCHEDULED_TIME="$5"
PAGE_ID="$6"

curl -X POST https://api.blotato.io/v1/posts/schedule \
  -H "Authorization: Bearer $BLOTATO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "'$PLATFORM'",
    "caption": "'$CAPTION'",
    "visual": "'$VISUAL_URL'",
    "scheduled_time": "'$SCHEDULED_TIME'",
    "page_id": "'$PAGE_ID'"
  }' \
  | jq .

# Response:
# {
#   "post_id": "blotato_67890",
#   "status": "scheduled",
#   "scheduled_time": "2026-04-09T08:00:00Z",
#   "platform": "linkedin"
# }
```

### Step 8: Optimal Posting Times by Platform

Schedule posts at **platform-specific peak times**:

| Platform | Best Day | Best Time (User TZ) | Posts/Week |
|---|---|---|---|
| LinkedIn | Tue–Thu | 08:00–10:00 AM | 2–3 |
| Facebook | Wed–Fri | 12:00–02:00 PM | 2–3 |
| Instagram | Mon–Tue, Thu | 09:00–11:00 AM | 3–5 |

**Rule:** Don't post all 3 platforms simultaneously. Stagger by 2–4 hours to maximize engagement.

**Example schedule for article published Tuesday:**

```
Article published: Tuesday, April 8, 2026

LinkedIn: Wed Apr 9, 08:30 AM
Facebook: Wed Apr 9, 01:30 PM
Instagram: Thu Apr 10, 09:30 AM
```

### Step 9: Log Social Posts

Create entry in `03 - OPERATIONS/[client]/SEO/social-posts/social-log.md`:

```markdown
# [[Client Name]] — Social Media Posts Log

| Article | Platform | Scheduled Date | Post ID | Status | Engagement (48h) |
|---|---|---|---|---|---|
| "SaaS Pricing Comparison" | LinkedIn | 2026-04-09 | blotato_67890 | SCHEDULED | — |
| "SaaS Pricing Comparison" | Facebook | 2026-04-09 | blotato_67891 | SCHEDULED | — |
| "SaaS Pricing Comparison" | Instagram | 2026-04-10 | blotato_67892 | SCHEDULED | — |

---

## Post Details: "SaaS Pricing Comparison"

**Article URL:** https://example.com/blog/seo-pricing-models
**Article Publish Date:** 2026-04-08
**Social Campaign Start:** 2026-04-09

### LinkedIn Post
- **Scheduled:** Wed Apr 9, 08:30 AM
- **Post ID:** blotato_67890
- **Engagement (48h):** [to be filled]
- **Notes:** Data-driven angle, professional tone

### Facebook Post
- **Scheduled:** Wed Apr 9, 01:30 PM
- **Post ID:** blotato_67891
- **Engagement (48h):** [to be filled]
- **Notes:** Community-focused, question at end

### Instagram Post
- **Scheduled:** Thu Apr 10, 09:30 AM
- **Post ID:** blotato_67892
- **Engagement (48h):** [to be filled]
- **Notes:** Visual-first, hashtag strategy

---
```

### Step 10: Notify & Suggest Next Steps

Confirm to user:

> "Social repurposing complete! Posted "[Article Title]" to LinkedIn, Facebook, and Instagram on the optimal schedule. Engagement metrics will update over the next 48 hours. Next week, we'll analyze performance in [[seo-weekly-review]]."

---

## Platform-Specific Caption Templates

### LinkedIn Template

```
[Hook/Number]

[3–5 bullet points with data]

[Why it matters to audience]

[Soft CTA: Read article | Discuss in comments | Explore more]

[Article URL]

#Hashtag1 #Hashtag2 #Hashtag3
```

### Facebook Template

```
[Conversational opener]

[1–2 key insights]

[Genuine question to encourage comments]

[Article URL or "Read full guide"]
```

### Instagram Template

```
[Punchy hook with emoji]

[3–4 short lines, emojis OK]

[Visual or simple stat graphic]

[Caption in first comment with link]

#Hashtag (20 per comment)
```

---

## Rules

1. **Social distribution is OPTIONAL.** Check pipeline-config.md before running this skill.
2. **Platform-specific captions.** Don't use the same caption across all platforms. Match tone to audience.
3. **Stagger posts.** Don't post all 3 platforms at the same time. Use optimal times from the table above.
4. **Visuals boost engagement.** If possible, always include a graphic or stat visualization.
5. **Blotato is the publisher.** You orchestrate only. Blotato handles scheduling and posting.
6. **Wikilinks always.** Reference [[seo-content-generate]], [[seo-weekly-review]], and [[SOP SEO Pipeline — Social Repurposing & Distribution]].

---

## Self-Improvement

After each social repurposing cycle (weekly):

1. **Engagement analysis:** Which platform posts performed best? Adjust posting times if needed.
2. **Caption patterns:** Which caption styles got the most comments? Refine templates.
3. **Visual impact:** Did posts with graphics outperform text-only? Allocate design time accordingly.
4. **Scheduling accuracy:** Did Blotato post on time? If delays occurred, debug with Blotato support.
5. **Click-through rates:** Are social posts driving traffic back to blog articles? Track in [[seo-weekly-review]].

---

## Reference

**SOP:** [[SOP SEO Pipeline — Social Repurposing & Distribution]]
**Prerequisite Skill:** [[seo-content-generate]] (generates articles to repurpose)
**Monitoring Skill:** [[seo-weekly-review]]
**Note:** This skill is OPTIONAL. Only run if social distribution enabled in pipeline-config.
