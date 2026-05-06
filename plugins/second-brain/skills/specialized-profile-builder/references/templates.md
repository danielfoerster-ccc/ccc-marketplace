# Output Templates — Usage Guide, Prompt Templates, Refresh SOP

Read this when generating the secondary three artefacts (after Profile Card is locked).

---

## Usage Guide.md template

```markdown
# Usage Guide — [Domain Name] Profile

**Profile:** [[Profile Card]] (v0.1, created YYYY-MM-DD)

---

## When to load this profile

Load `Profile Card.md` as system-prompt context whenever you start a session that involves:
- [List 3-5 specific session types — e.g., "Drafting CCC client proposals", "Reviewing CCC engagement scope decisions", "Pricing analysis for CCC"]

Do NOT load this profile when:
- The session is about a different domain (load that domain's profile instead, or no profile)
- The session is a single-shot factual question (overhead not worth it)
- The session is about a venture's market-facing work (use `gtm-discovery` outputs as context, not this profile)

---

## How to load it

**Option A — Manual paste:** Copy the Profile Card body into the system prompt or first message.

**Option B — Skill-managed (preferred once integrated):**
- `second-brain-connect` auto-detects matching profiles by domain when running cognitive operations
- `ccc-mental-model-recipes` reads the Frameworks dimension when matching task shape
- `third-brain-mastery` Stage 2+ requires this profile as foundation
- Future: vector-DB semantic retrieval will auto-surface this profile by topic similarity (see [[Vector DB Pilot — Project Plan]])

---

## What this profile is NOT

- Not a venture/product document — those live in [[gtm-discovery]] outputs
- Not a static identity statement — refreshed on the cadence noted in [[Refresh SOP]]
- Not exhaustive — it's the *2-5 sentences per dimension* that capture priors, not the full operator psychology

---

## Where it lives in the graph

This profile cites:
- [Specific wikilinks the Profile Card references — populate from the actual card]

This profile is cited by:
- [Where it's loaded — populate as integrations happen]

---

*Refresh cadence: [weekly|monthly|quarterly|ad-hoc] — see [[Refresh SOP]].*
```

---

## Prompt Templates.md template

Generate 3-5 templates that pre-load the profile. They should be copy-pasteable and address the operator's actual prototypical problem from the intake.

```markdown
# Prompt Templates — [Domain Name]

**Profile:** [[Profile Card]] (load before using these templates)

---

## Template 1 — Decision pressure-test

> "Using my [Domain Name] profile (loaded above), pressure-test this decision: [insert decision].
> Specifically:
> - Apply the Frameworks dimension to surface which mental model I'd default to here
> - Apply Disconfirming Evidence to my reasoning — where am I rationalising vs. deciding?
> - Apply the Decision History dimension — which past decision is this most similar to, and what's the lesson?
> - Apply the Constraints dimension — am I respecting real constraints or accepting inherited ones?
> Return: a 5-bullet pressure-test, no more than 200 words."

## Template 2 — Domain-specific drafting

> "Using my [Domain Name] profile, draft [thing to draft]. Match my Thinking Style (specifically [Thinking Style summary]). Cite the Frameworks I would actually use, not generic ones. Constraint: [length / format / tone]."

## Template 3 — Blindspot check

> "Using my [Domain Name] profile, review this [decision/draft/plan/email] specifically through the Blindspots dimension. Where am I doing the thing the profile says I systematically miss? Be direct — don't soften."

## Template 4 — Goals alignment check

> "Using my [Domain Name] profile, check whether [current activity / commitment / project] is actually in service of the Goals dimension. If not, what's the misalignment, and what would re-aligned work look like?"

## Template 5 — [Custom — derived from intake's prototypical problem]

> [A template that addresses the specific prototypical problem the operator named at intake. E.g., if the prototypical problem was "deciding which CCC engagement to take", the template here scaffolds that decision using the loaded profile.]

---

## Usage tips

- **Always load Profile Card first** — these templates assume the profile is already in context.
- **Edit the templates** as the operator finds wording that works better — these are starting points, not gospel.
- **Add new templates** when a recurring use-case emerges that the originals don't cover.

---

*Last refreshed: YYYY-MM-DD. New templates added during use should preserve the "loaded profile + specific dimension callout + constraint" structure.*
```

---

## Refresh SOP.md template

```markdown
# Refresh SOP — [Domain Name] Profile

**Profile:** [[Profile Card]]
**Cadence:** [weekly|monthly|quarterly|ad-hoc]
**Last refreshed:** YYYY-MM-DD
**Next scheduled refresh:** YYYY-MM-DD

---

## When to refresh

### Scheduled refresh
On the cadence above. Default Monthly is the right baseline for most domains.

### Trigger refresh (regardless of schedule) when:
- A decision in this domain *surprises* the operator (their stated framework didn't predict the actual choice)
- Advisor / partner / coach gives pushback that maps to a Blindspot the profile didn't capture
- Constraints change materially (revenue level, role, life stage, partnership change)
- Goals evolve — a 6-month checkpoint hits or shifts
- The operator notices: "this profile no longer feels like me in this domain"

---

## How to refresh

### Full re-run (most rigorous)
Re-invoke `specialized-profile-builder` skill with the same domain. The skill will read the existing Profile Card as context, ask only what's changed, and produce v0.N+1.

### Dimension-specific update (lighter)
If only 1-2 dimensions need updating (e.g., Constraints changed because revenue doubled, but Values didn't):
1. Read the existing Profile Card
2. Ask the operator: "What's changed in [dimension] since last refresh?"
3. Apply Disconfirming Evidence Questioning
4. Update only that dimension in the Profile Card
5. Bump version (v0.1 → v0.1.1) and update last_refreshed date

### Decommission (rare)
If the operator no longer works in this domain:
1. Move the profile folder to `04 - ARCHIVE/Profiles/[Domain Name]/`
2. Note the decommission date and reason on the Profile Card
3. Remove from `_index.md` in active Profiles folder

---

## What to preserve at refresh

- **The intake** (`_intake.md`) — never overwrite the original prototypical problem
- **Version history** — append, don't replace. v0.1 → v0.2 means the v0.1 stays in version-control history
- **Wikilinks** to vault nodes — re-validate they still exist; remove broken ones; add new ones the refresh surfaces

---

## What changes at refresh

- Last_refreshed date
- Version number (v0.N → v0.N+1)
- Dimension content (selectively or fully)
- Cross-references — the operator may now cite different vault nodes
- Branch_fit field — if MVP forced a fit, v0.2 may now have the right branch

---

## When NOT to refresh

- The cadence is up but nothing in the operator's domain has actually shifted
- The operator is mid-decision and refreshing would change the priors mid-flight (refresh after the decision, not during)
- The current v0.N is producing useful outputs in real sessions — "if it ain't broke"

---

*Refresh SOP last updated: 2026-05-06.*
```

---

## _intake.md template (audit trail file)

```markdown
# Intake — [Domain Name]

**Profile build session:** YYYY-MM-DD
**Skill version used:** specialized-profile-builder v0.1
**Branch chosen:** Strategic / Learning-Creative
**Branch_fit:** clean / forced (if forced, why: [reason])

---

## 4 intake answers

1. **Domain name:** [verbatim answer]
2. **Prototypical problem:** [verbatim answer, 1-3 sentences]
3. **Use case:** Personal / Team / Product
4. **Refresh cadence:** Weekly / Monthly / Quarterly / Ad-hoc

---

## Branch decision rationale

[1-2 sentences: why this branch was chosen given the prototypical problem.]

---

## Notable Disconfirming Evidence pushbacks

[List 2-3 pushbacks during questioning where the operator's first answer changed materially after pushback. These are gold for skill self-improvement — they show what's working.]

---

## Vault nodes the operator cited during questioning

[List of [[wikilinks]] the operator named — used to ground the Profile Card in the existing graph.]

---

*Audit trail file — do not edit after creation. Used by v0.2 (domain branching expansion) to learn which prototypical-problem signals correlate with which branch.*
```

---

## Notes for the synthesis phase

- **Do not skip `_intake.md` creation.** v0.2 of this skill will need this data to learn domain-branching signals automatically.
- **The Profile Card is the only artefact the operator must validate before saving.** The other three (Usage Guide, Prompt Templates, Refresh SOP) are derived and can be regenerated cheaply if the operator finds them off.
- **Wikilink density on the Profile Card is calibrated to vault density.** Don't manufacture orphan links — only wikilink to nodes that actually exist (or have explicit stubs queued).
- **If the operator names a thinker not yet in the vault** (e.g., a new author they're reading), surface the gap as a TODO in the synthesis report rather than silently dropping the reference.

---

*Last updated: 2026-05-06. Review before use if older than 90 days.*
