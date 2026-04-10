*Last updated: April 10, 2026.*

# CCC Pricing Skill — Development Roadmap

## Current State: v1.1

Now includes BenAI practitioner pricing data alongside consulting theory. Four-lens model: Value-Based → BenAI Market Reality → CCC Architecture → Market & Relationship.

## Ingested Sources

| Source | What It Added | Status |
|--------|-------------|--------|
| BenAI — *How to Price Your AI & Automation Services* | Pricing Power formula, market-tested price anchors (€2-5k fixed, €2-5k/mo subscription), case study phase guidance, 2x-5x markup model | ✅ Ingested v1.1 |
| BenAI — *How to Plan, Scope & Build AI Automations* | 4-phase scoping model (Scope → Design → Build → Iterate), reality check for pricing all phases not just build | ✅ Ingested v1.1 |

## Planned Source Ingestion

| Priority | Source | What It Adds | Status |
|----------|--------|-------------|--------|
| 1 | Blair Enns — *Pricing Creativity* | Full options architecture, the 4 pricing conversations model, "price the client not the project" methodology | Pending — need PDF/book |
| 2 | Alan Weiss — *Value Based Fees* | Consulting-specific value model, the "1% solution" in full detail, conceptual agreement framework | Pending — need PDF/book |
| 3 | Alex Hormozi — *$100M Offers* | Offer-stacking logic, value equation with worked examples, "grand slam offer" structuring | Pending — need PDF/book |
| 4 | Jonathan Stark — *Hourly Billing is Nuts* | Mindset framework for value pricing, why-based pricing, client conversation scripts | Pending — need book |
| 5 | David C. Baker — *The Business of Expertise* | Expertise pricing, relationship between positioning depth and pricing power | Pending — need book |
| 6 | Van Westendorp PSM | Price sensitivity research framework — more relevant when CCC has productized offerings | Pending — for later phase |
| 7 | Patrick Campbell / ProfitWell | SaaS pricing research — applicable to CCC membership/community pricing (Track 2) | Pending — for later phase |

## Planned Features

### v1.2 — After first 5 engagements priced
- Calibrate framework weights based on actual pricing log data
- Add industry-specific adjustments (agency vs. SaaS vs. e-commerce)
- Refine the Weiss 1% ranges based on what actually converts
- Track BenAI anchor accuracy vs. value-based calculations

### v1.3 — After book ingestion
- Full Blair Enns options model (4 options, not just 2)
- Weiss conceptual agreement integration
- Hormozi value stack builder
- Reference files for each framework

### v2.0 — After 20+ engagements priced
- Pattern analysis across the pricing log
- Predictive confidence scoring
- Client-type pricing profiles (portfolio CEO vs. agency founder vs. solopreneur)
- Integration with proposal skill for automatic price population

## How to Ingest Sources

When Daniel has a book PDF ready:
1. Use `second-brain:knowledge-ingest` or manual extraction
2. Extract the pricing-relevant frameworks, models, and examples
3. Save as a reference file: `references/[author-name]-framework.md`
4. Update the SKILL.md to reference the new file at the appropriate step
5. Bump the version in this roadmap
