# CCC Publishing Workflow — Source of Truth

For CCC-owned skills, the canonical source of truth is the Obsidian vault. All skill files live there first; Cowork sessions are the working copy.

## 1. Write or edit in Obsidian

All CCC skill files live at:

```
02 - MISSION CONTROL/Claude Skills & Plugins/
  [plugin-name]/
    .claude-plugin/
      plugin.json          ← plugin manifest (name, description, version, author)
    skills/
      [skill-name]/
        SKILL.md           ← skill content
```

The CCC plugins and what goes in each:

| Plugin | Contents |
|---|---|
| `planning` | daily-checkin, daily-checkout, weekly-planning, 90-day-sprint, handoff-prep |
| `buyback` | audit, buyback, perfect-week, preloaded-year, replacement-ladder, vision |
| `ccc-audits` | ccc-seo-audit, ccc-wordpress-seo-implementation, gsc-cleanup-sop, gmb-audit, ccc-linkedin-profile-audit, ccc-instagram-audit |
| `gtm` | gtm-90-day-launch-plan, gtm-discovery |
| `ccc-operations` | ccc-sop-creator, skill-creator-pro, framework-extractor |
| `ccc-cashflow-management` | ccc-cashflow-start, ccc-cashflow-assessment, ccc-cashflow-setup, ccc-cashflow-cost-audit, ccc-cashflow-quarterly-review, ccc-cashflow-profit-points, ccc-cashflow-report, ccc-cashflow-client-onboard, ccc-cashflow-workshop-prep |
| `48hr-launch-blueprint` | mindset-reset, idea-generator, business-model-validator, dream-ten-launcher, validation-debrief |
| `ccc-seo-content-pipeline` | seo-competitor-analysis, seo-content-generate, seo-keyword-strategy, seo-pipeline-setup, seo-social-repurpose, seo-weekly-review |
| `second-brain` | second-brain, knowledge-ingest |

## 2. Commit to GitHub

The marketplace GitHub repo: `danielfoerster-ccc/ccc-marketplace`. Commit after every meaningful skill change.

## 3. Package into a .plugin file

Use the `cowork-plugin-management:create-cowork-plugin` skill to package, or run manually:

```bash
cd "/path/to/vault/02 - MISSION CONTROL/Claude Skills & Plugins"
zip -r [plugin-name].plugin [plugin-name]/
```

## 4. Install in Cowork

Install the `.plugin` file via the Cowork plugin manager. This puts skills into `/mnt/.claude/plugins/cache/[plugin-name]/`, which is **writable** from future sessions.

## 5. After session edits — sync back to vault

If you edit a skill from within a Cowork session, copy the updated file back to the vault immediately:

```bash
cp "$SESSION/mnt/.claude/plugins/cache/$PLUGIN/$VERSION/skills/$SKILL/SKILL.md" \
   "$SESSION/mnt/$VAULT/02 - MISSION CONTROL/Claude Skills & Plugins/$PLUGIN/skills/$SKILL/SKILL.md"
```

Then commit to GitHub to close the loop.

## Why this matters

Skills in "Meine Fähigkeiten" (the `.skills/` mount) are **read-only** from within sessions. Skills installed via plugins (`.claude/plugins/cache/`) are **writable**. The goal is for all CCC-owned skills to live in the plugin structure. Never edit the installed `.skills/` path directly — always edit the vault copy and re-package.
