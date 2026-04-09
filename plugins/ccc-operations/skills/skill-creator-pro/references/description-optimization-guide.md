# Description Optimization — Detailed Guide

The description field in SKILL.md frontmatter is the primary mechanism that determines whether Claude invokes a skill. After creating or improving a skill, offer to optimize the description for better triggering accuracy.

## Step 1: Generate trigger eval queries

Create 20 eval queries — a mix of should-trigger (8-10) and should-not-trigger (8-10). Save as JSON:

```json
[
  {"query": "the user prompt", "should_trigger": true},
  {"query": "another prompt", "should_trigger": false}
]
```

Queries must be realistic — concrete, specific, with file paths, personal context, column names. Not abstract. Include edge cases, casual speech, typos, abbreviations.

**Should-trigger:** Different phrasings of the same intent, cases where user doesn't name the skill/file type but clearly needs it, uncommon use cases, competitive cases where this skill should win.

**Should-not-trigger:** Near-misses that share keywords but need something different. Adjacent domains, ambiguous phrasing. Avoid obviously irrelevant negatives.

## Step 2: Review with user

Present eval set using `assets/eval_review.html`:
1. Replace `__EVAL_DATA_PLACEHOLDER__` → JSON array, `__SKILL_NAME_PLACEHOLDER__` → name, `__SKILL_DESCRIPTION_PLACEHOLDER__` → description
2. Write to temp file and open
3. User edits, exports to `~/Downloads/eval_set.json`

## Step 3: Run the optimization loop

```bash
python -m scripts.run_loop \
  --eval-set <path-to-trigger-eval.json> \
  --skill-path <path-to-skill> \
  --model <model-id-powering-this-session> \
  --max-iterations 5 \
  --verbose
```

This handles the full loop: splits 60/40 train/test, evaluates current description (3 runs per query), proposes improvements via extended thinking, re-evaluates, iterates up to 5 times. Selects by test score to avoid overfitting.

## How skill triggering works

Skills appear in Claude's `available_skills` list. Claude only consults skills for tasks it can't easily handle with basic tools. Simple one-step queries may not trigger even with perfect descriptions. Eval queries should be substantive enough that Claude would benefit from a skill.

## Step 4: Apply the result

Take `best_description` from JSON output, update SKILL.md frontmatter. Show before/after and scores.

## Package and Present (only if `present_files` tool is available)

```bash
python -m scripts.package_skill <path/to/skill-folder>
```
