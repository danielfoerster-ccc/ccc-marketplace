---
name: skill-creator-pro
description: |
  Creates, improves, and evaluates Claude skills and plugins to production quality.
  Use when a user wants to build a skill from scratch, upgrade an existing skill,
  run evals, benchmark skill performance, or optimize a skill's triggering description.
  Also trigger on: "turn this into a skill", "make a skill for X", "improve my skill",
  "test my skill", "why isn't my skill triggering", "build a plugin", "make this repeatable".
  Covers the full engineering loop (draft → test → evaluate → iterate) PLUS practitioner
  patterns: named workflow patterns, rules sections, self-improvement instructions,
  anti-patterns tables, and guidance on process skills vs. transform skills.
allowed-tools: "Read, Write, Bash, Glob, Grep"
metadata:
  author: Daniel Förster · Claude Cowork Consultants (claudecoworkconsultants.com)
  based-on: >
    Anthropic skill-creator (base engineering loop) ·
    BenAI "How to Build Claude Skills Better than 99% of People" (Feb 2026) ·
    Jeremy Longshore / Intent Solutions skill standard
  version: 1.3.0
  updated: 2026-03-20
  license: Free to use and share. Attribution appreciated.
distribution: marketplace-ready
---

# Skill Creator

A skill for creating new skills and iteratively improving them.

At a high level, the process of creating a skill goes like this:

- Decide what you want the skill to do and roughly how it should do it
- Write a draft of the skill
- Create a few test prompts and run claude-with-access-to-the-skill on them
- Help the user evaluate the results both qualitatively and quantitatively
  - While the runs happen in the background, draft some quantitative evals if there aren't any (if there are some, you can either use as is or modify if you feel something needs to change about them). Then explain them to the user (or if they already existed, explain the ones that already exist)
  - Use the `eval-viewer/generate_review.py` script to show the user the results for them to look at, and also let them look at the quantitative metrics
- Rewrite the skill based on feedback from the user's evaluation of the results (and also if there are any glaring flaws that become apparent from the quantitative benchmarks)
- Repeat until you're satisfied
- Expand the test set and try again at larger scale

Your job when using this skill is to figure out where the user is in this process and then jump in and help them progress through these stages. So for instance, maybe they're like "I want to make a skill for X". You can help narrow down what they mean, write a draft, write the test cases, figure out how they want to evaluate, run all the prompts, and repeat.

On the other hand, maybe they already have a draft of the skill. In this case you can go straight to the eval/iterate part of the loop.

Of course, you should always be flexible and if the user is like "I don't need to run a bunch of evaluations, just vibe with me", you can do that instead.

Then after the skill is done (but again, the order is flexible), you can also run the skill description improver, which we have a whole separate script for, to optimize the triggering of the skill.

Cool? Cool.

## Communicating with the user

The skill creator is liable to be used by people across a wide range of familiarity with coding jargon. If you haven't heard (and how could you, it's only very recently that it started), there's a trend now where the power of Claude is inspiring plumbers to open up their terminals, parents and grandparents to google "how to install npm". On the other hand, the bulk of users are probably fairly computer-literate.

So please pay attention to context cues to understand how to phrase your communication! In the default case, just to give you some idea:

- "evaluation" and "benchmark" are borderline, but OK
- for "JSON" and "assertion" you want to see serious cues from the user that they know what those things are before using them without explaining them

It's OK to briefly explain terms if you're in doubt, and feel free to clarify terms with a short definition if you're unsure if the user will get it.

---

## Creating a skill

### Capture Intent

Start by understanding the user's intent. The current conversation might already contain a workflow the user wants to capture (e.g., they say "turn this into a skill"). If so, extract answers from the conversation history first — the tools used, the sequence of steps, corrections the user made, input/output formats observed. The user may need to fill the gaps, and should confirm before proceeding to the next step.

1. What should this skill enable Claude to do?
2. When should this skill trigger? (what user phrases/contexts)
3. What's the expected output format?
4. Should we set up test cases to verify the skill works? Skills with objectively verifiable outputs (file transforms, data extraction, code generation, fixed workflow steps) benefit from test cases. Skills with subjective outputs (writing style, art) often don't need them. Suggest the appropriate default based on the skill type, but let the user decide.

### Interview and Research

Proactively ask questions about edge cases, input/output formats, example files, success criteria, and dependencies. Wait to write test prompts until you've got this part ironed out.

Check available MCPs - if useful for research (searching docs, finding similar skills, looking up best practices), research in parallel via subagents if available, otherwise inline. Come prepared with context to reduce burden on the user.

### Write the SKILL.md

Based on the user interview, fill in these components:

- **name**: Skill identifier
- **description**: When to trigger, what it does. This is the primary triggering mechanism - include both what the skill does AND specific contexts for when to use it. All "when to use" info goes here, not in the body. Note: currently Claude has a tendency to "undertrigger" skills -- to not use them when they'd be useful. To combat this, please make the skill descriptions a little bit "pushy". So for instance, instead of "How to build a simple fast dashboard to display internal Anthropic data.", you might write "How to build a simple fast dashboard to display internal Anthropic data. Make sure to use this skill whenever the user mentions dashboards, data visualization, internal metrics, or wants to display any kind of company data, even if they don't explicitly ask for a 'dashboard.'"
  Write descriptions in **third person** ("Runs a structured…", "Guides the user through…", "Extracts text from…"). Third-person reads better in the context where skills are listed together, and it's easier to scan than first-person.
  **⚠️ Hard limit: the `description` field must be ≤ 1024 characters.** This is enforced at install time — exceeding it causes the `.skill` install to fail with the error `"field 'description' in SKILL.md must be at most 1024 characters"`. Always check length before packaging: `python3 -c "text='YOUR_DESC_HERE'; print(len(text))"`. If you're over the limit, tighten the wording — remove version/author metadata from the description block, cut redundant trigger phrases, and abbreviate where natural. The limit applies to the raw character count of the description value.
- **allowed-tools**: Comma-separated list of tools the skill needs (e.g., `"Read, Write, Bash"`). Scoping tools prevents the skill from being used in environments where required tools aren't available, and signals to the user what permissions the skill will exercise. (optional, but worth including for any skill that uses more than just Read)
- **compatibility**: Required tools, dependencies (optional, rarely needed)
- **the rest of the skill :)**

### Skill Writing Guide

#### Anatomy of a Skill

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter (name, description required)
│   └── Markdown instructions
└── Bundled Resources (optional)
    ├── scripts/    - Executable code for deterministic/repetitive tasks
    ├── references/ - Docs loaded into context as needed
    └── assets/     - Files used in output (templates, icons, fonts)
```

#### Progressive Disclosure

Skills use a three-level loading system:
1. **Metadata** (name + description) - Always in context (~100 words)
2. **SKILL.md body** - In context whenever skill triggers (<500 lines ideal)
3. **Bundled resources** - As needed (unlimited, scripts can execute without loading)

These word counts are approximate and you can feel free to go longer if needed.

**Key patterns:**
- Keep SKILL.md under 500 lines; if you're approaching this limit, add an additional layer of hierarchy along with clear pointers about where the model using the skill should go next to follow up.
- Reference files clearly from SKILL.md with guidance on when to read them
- For large reference files (>300 lines), include a table of contents

#### Named Workflow Patterns

Give your skill's core process a name. This makes the SKILL.md easier to navigate and helps the skill communicate its operating mode to users.

Common patterns and when to use them:

| Pattern | Description | Use when |
|---------|-------------|----------|
| **Wizard + Feedback Loop** | One question at a time; draft options; iterate to lock | Discovery, positioning, strategy — subjective decisions |
| **Extract → Transform → Load** | Read input → process → write output | File conversion, data transformation, report generation |
| **Research → Draft → Review** | Gather context → produce document → human approval | Reports, proposals, briefings |
| **Scan → Flag → Fix** | Read codebase/docs → identify issues → apply changes | Code review, audit, proofreading |
| **Interview → Synthesize → Deliver** | Ask structured questions → build artifact from answers | Custom document creation, intake workflows |

You don't have to pick from this list. If your skill has a distinctive flow, name it and describe it briefly at the top of the SKILL.md body: `**Workflow: [Name].** [One sentence on how it works.]`

**Domain organization**: When a skill supports multiple domains/frameworks, organize by variant:
```
cloud-deploy/
├── SKILL.md (workflow + selection)
└── references/
    ├── aws.md
    ├── gcp.md
    └── azure.md
```
Claude reads only the relevant reference file.

#### Principle of Lack of Surprise

This goes without saying, but skills must not contain malware, exploit code, or any content that could compromise system security. A skill's contents should not surprise the user in their intent if described. Don't go along with requests to create misleading skills or skills designed to facilitate unauthorized access, data exfiltration, or other malicious activities. Things like a "roleplay as an XYZ" are OK though.

#### Writing Patterns

Prefer using the imperative form in instructions.

**Defining output formats** - You can do it like this:
```markdown
## Report structure
ALWAYS use this exact template:
# [Title]
## Executive summary
## Key findings
## Recommendations
```

**Examples pattern** - It's useful to include examples. You can format them like this (but if "Input" and "Output" are in the examples you might want to deviate a little):
```markdown
## Commit message format
**Example 1:**
Input: Added user authentication with JWT tokens
Output: feat(auth): implement JWT-based authentication
```

**Rules section** — For any skill that has a process (as opposed to a pure transform), add a `## Rules` section. This is where failure modes live. It starts with the things you know before launch and grows over time as the skill is used. Format: numbered list, one failure mode per rule, phrased as a constraint or correction, with the reasoning.

```markdown
## Rules (Update This Section When Things Go Wrong)

1. Never generate the output document without completing all phases. Partial context produces generic outputs.
2. Never accept vague answers. "[Too-broad thing]" is not specific enough. Push every time.
3. Always offer multiple options at decision points — the user's reaction to choices reveals more than their open answers.
```

**Self-improvement instruction** — Include a brief `## Self-Improvement` section at the end of process skills. This makes the skill a living document rather than a static prompt:

```markdown
## Self-Improvement

When a user corrects an output or identifies something that consistently goes wrong:
- Add a rule to the Rules section above
- Note what the failure mode was and what fixed it

When a user approves a final output:
- Note which specific framings or choices produced the strongest result
- Save approved examples as reference files for future runs

This skill is never finished. The more it is used, the better it gets.
```

**Anti-patterns table** — For complex skills, a concise anti-patterns table is more useful than a long list of NEVER-do-this instructions. It documents failure modes, their symptoms, and fixes in a scannable format:

```markdown
| Situation | Broken output | Root cause | Fix |
|-----------|---------------|------------|-----|
| [Trigger] | [What goes wrong] | [Why] | [What to do instead] |
```

Use this when you've identified 3+ distinct failure modes. For simpler skills, the Rules section is sufficient.

**Reference file freshness** — Time-sensitive information (pricing, market conditions, tool capabilities, competitor names) goes stale. Keep it in dated reference files, not in SKILL.md. Add a note at the top of any such reference file: `*Last updated: [date]. Review before use if older than 90 days.*`

### Writing Style

Try to explain to the model why things are important in lieu of heavy-handed musty MUSTs. Use theory of mind and try to make the skill general and not super-narrow to specific examples. Start by writing a draft and then look at it with fresh eyes and improve it.

### Test Cases

After writing the skill draft, come up with 2-3 realistic test prompts — the kind of thing a real user would actually say. Share them with the user: [you don't have to use this exact language] "Here are a few test cases I'd like to try. Do these look right, or do you want to add more?" Then run them.

Save test cases to `evals/evals.json`. Don't write assertions yet — just the prompts. You'll draft assertions in the next step while the runs are in progress.

```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "User's task prompt",
      "expected_output": "Description of expected result",
      "files": []
    }
  ]
}
```

See `references/schemas.md` for the full schema (including the `assertions` field, which you'll add later).

## Running and evaluating test cases

Full step-by-step guide: `references/eval-and-testing-guide.md`

**5-step sequence (don't stop partway through):**

1. **Spawn all runs** — for each test case, launch with-skill AND baseline subagents in the same turn. Results go to `<skill-name>-workspace/iteration-<N>/eval-<ID>/`. Write `eval_metadata.json` for each.
2. **Draft assertions** — while runs are in progress, draft quantitative assertions. Good assertions are objectively verifiable with descriptive names.
3. **Capture timing data** — save `total_tokens` and `duration_ms` from each subagent notification to `timing.json`. This is the only chance to capture this.
4. **Grade, aggregate, launch viewer** — grade with `agents/grader.md`, aggregate with `scripts.aggregate_benchmark`, do analyst pass per `agents/analyzer.md`, launch viewer with `eval-viewer/generate_review.py`. Headless: use `--static`.
5. **Read feedback** — `feedback.json` from viewer. Empty = fine. Focus on specific complaints.

---

## Improving the skill

This is the heart of the loop. You've run the test cases, the user has reviewed the results, and now you need to make the skill better based on their feedback.

### Process skills vs. transform skills

Not all skills improve the same way. The eval loop above (spawn runs, grade assertions, benchmark) is built for **transform skills** — where there's an objectively verifiable output (a converted file, extracted data, a correctly formatted document). For these, quantitative benchmarking is the right primary signal.

**Process skills** — discovery, strategy, coaching, structured conversations — produce outputs that depend on what the user brings into the conversation. Quantitative benchmarking is less meaningful here because you can't write assertions against "the ICP feels right" or "the positioning is specific enough." For process skills:
- Make the human review loop the primary signal, not the quantitative benchmark
- Run 2–3 test conversations with realistic user inputs; review the outputs qualitatively
- Focus on: Did it ask the right questions? Did it push back on vague answers? Did the output document feel earned rather than generic?
- Skip or minimize assertions; they'll be superficial at best

**Feeding improvements back into the skill itself** — This is the most underused improvement strategy. When the eval loop reveals a recurring failure mode, don't just fix the current output — add the failure as a rule to the skill's `## Rules` section. When an output is approved, note which framing worked and save it as a reference example. Skills that accumulate real examples and real rules become dramatically better over iterations. Encourage users to treat the Rules section as a living document, not a static prompt.

### How to think about improvements

1. **Generalize from the feedback.** The big picture thing that's happening here is that we're trying to create skills that can be used a million times (maybe literally, maybe even more who knows) across many different prompts. Here you and the user are iterating on only a few examples over and over again because it helps move faster. The user knows these examples in and out and it's quick for them to assess new outputs. But if the skill you and the user are codeveloping works only for those examples, it's useless. Rather than put in fiddly overfitty changes, or oppressively constrictive MUSTs, if there's some stubborn issue, you might try branching out and using different metaphors, or recommending different patterns of working. It's relatively cheap to try and maybe you'll land on something great.

2. **Keep the prompt lean.** Remove things that aren't pulling their weight. Make sure to read the transcripts, not just the final outputs — if it looks like the skill is making the model waste a bunch of time doing things that are unproductive, you can try getting rid of the parts of the skill that are making it do that and seeing what happens.

3. **Explain the why.** Try hard to explain the **why** behind everything you're asking the model to do. Today's LLMs are *smart*. They have good theory of mind and when given a good harness can go beyond rote instructions and really make things happen. Even if the feedback from the user is terse or frustrated, try to actually understand the task and why the user is writing what they wrote, and what they actually wrote, and then transmit this understanding into the instructions. If you find yourself writing ALWAYS or NEVER in all caps, or using super rigid structures, that's a yellow flag — if possible, reframe and explain the reasoning so that the model understands why the thing you're asking for is important. That's a more humane, powerful, and effective approach.

4. **Look for repeated work across test cases.** Read the transcripts from the test runs and notice if the subagents all independently wrote similar helper scripts or took the same multi-step approach to something. If all 3 test cases resulted in the subagent writing a `create_docx.py` or a `build_chart.py`, that's a strong signal the skill should bundle that script. Write it once, put it in `scripts/`, and tell the skill to use it. This saves every future invocation from reinventing the wheel.

This task is pretty important (we are trying to create billions a year in economic value here!) and your thinking time is not the blocker; take your time and really mull things over. I'd suggest writing a draft revision and then looking at it anew and making improvements. Really do your best to get into the head of the user and understand what they want and need.

### The iteration loop

After improving the skill:

1. Apply your improvements to the skill
2. Rerun all test cases into a new `iteration-<N+1>/` directory, including baseline runs. If you're creating a new skill, the baseline is always `without_skill` (no skill) — that stays the same across iterations. If you're improving an existing skill, use your judgment on what makes sense as the baseline: the original version the user came in with, or the previous iteration.
3. Launch the reviewer with `--previous-workspace` pointing at the previous iteration
4. Wait for the user to review and tell you they're done
5. Read the new feedback, improve again, repeat

Keep going until:
- The user says they're happy
- The feedback is all empty (everything looks good)
- You're not making meaningful progress

---

## Advanced: Blind comparison

For situations where you want a more rigorous comparison between two versions of a skill (e.g., the user asks "is the new version actually better?"), there's a blind comparison system. Read `agents/comparator.md` and `agents/analyzer.md` for the details. The basic idea is: give two outputs to an independent agent without telling it which is which, and let it judge quality. Then analyze why the winner won.

This is optional, requires subagents, and most users won't need it. The human review loop is usually sufficient.

---

## Description Optimization

Full guide: `references/description-optimization-guide.md`

**4-step process to optimize the SKILL.md description for triggering accuracy:**

1. **Generate 20 trigger eval queries** — 8-10 should-trigger + 8-10 should-not-trigger. Must be realistic (file paths, personal context, typos). Focus on edge cases, not obvious matches. Near-miss negatives are most valuable.
2. **Review with user** — present via `assets/eval_review.html` template. User edits and exports `eval_set.json`.
3. **Run optimization loop** — `python -m scripts.run_loop --eval-set <path> --skill-path <path> --model <model-id> --max-iterations 5 --verbose`. Splits 60/40 train/test, iterates up to 5 times, selects by test score.
4. **Apply result** — take `best_description` from JSON output, update frontmatter, show before/after.

**Key insight:** Claude only consults skills for complex tasks it can't handle alone. Simple queries won't trigger regardless of description quality. Design eval queries accordingly.

**Package (if `present_files` available):** `python -m scripts.package_skill <path/to/skill-folder>`

---

## Claude.ai-specific instructions

In Claude.ai, the core workflow is the same (draft → test → review → improve → repeat), but because Claude.ai doesn't have subagents, some mechanics change. Here's what to adapt:

**Running test cases**: No subagents means no parallel execution. For each test case, read the skill's SKILL.md, then follow its instructions to accomplish the test prompt yourself. Do them one at a time. This is less rigorous than independent subagents (you wrote the skill and you're also running it, so you have full context), but it's a useful sanity check — and the human review step compensates. Skip the baseline runs — just use the skill to complete the task as requested.

**Reviewing results**: If you can't open a browser (e.g., Claude.ai's VM has no display, or you're on a remote server), skip the browser reviewer entirely. Instead, present results directly in the conversation. For each test case, show the prompt and the output. If the output is a file the user needs to see (like a .docx or .xlsx), save it to the filesystem and tell them where it is so they can download and inspect it. Ask for feedback inline: "How does this look? Anything you'd change?"

**Benchmarking**: Skip the quantitative benchmarking — it relies on baseline comparisons which aren't meaningful without subagents. Focus on qualitative feedback from the user.

**The iteration loop**: Same as before — improve the skill, rerun the test cases, ask for feedback — just without the browser reviewer in the middle. You can still organize results into iteration directories on the filesystem if you have one.

**Description optimization**: This section requires the `claude` CLI tool (specifically `claude -p`) which is only available in Claude Code. Skip it if you're on Claude.ai.

**Blind comparison**: Requires subagents. Skip it.

**Packaging**: The `package_skill.py` script works anywhere with Python and a filesystem. On Claude.ai, you can run it and the user can download the resulting `.skill` file.

**Updating an existing skill**: The user might be asking you to update an existing skill, not create a new one. In this case:
- **Preserve the original name.** Note the skill's directory name and `name` frontmatter field -- use them unchanged. E.g., if the installed skill is `research-helper`, output `research-helper.skill` (not `research-helper-v2`).
- **Copy to a writeable location before editing.** The installed skill path may be read-only. Copy to `/tmp/skill-name/`, edit there, and package from the copy.
- **If packaging manually, stage in `/tmp/` first**, then copy to the output directory -- direct writes may fail due to permissions.

---

## Cowork-Specific Instructions

If you're in Cowork, the main things to know are:

- You have subagents, so the main workflow (spawn test cases in parallel, run baselines, grade, etc.) all works. (However, if you run into severe problems with timeouts, it's OK to run the test prompts in series rather than parallel.)
- You don't have a browser or display, so when generating the eval viewer, use `--static <output_path>` to write a standalone HTML file instead of starting a server. Then proffer a link that the user can click to open the HTML in their browser.
- For whatever reason, the Cowork setup seems to disincline Claude from generating the eval viewer after running the tests, so just to reiterate: whether you're in Cowork or in Claude Code, after running tests, you should always generate the eval viewer for the human to look at examples before revising the skill yourself and trying to make corrections, using `generate_review.py` (not writing your own boutique html code). Sorry in advance but I'm gonna go all caps here: GENERATE THE EVAL VIEWER *BEFORE* evaluating inputs yourself. You want to get them in front of the human ASAP!
- Feedback works differently: since there's no running server, the viewer's "Submit All Reviews" button will download `feedback.json` as a file. You can then read it from there (you may have to request access first).
- Packaging works — `package_skill.py` just needs Python and a filesystem.
- Description optimization (`run_loop.py` / `run_eval.py`) should work in Cowork just fine since it uses `claude -p` via subprocess, not a browser, but please save it until you've fully finished making the skill and the user agrees it's in good shape.
- **Updating an existing skill — Cowork file-system reality**: Installed skills live at `.skills/skills/<name>/SKILL.md`, which is a **read-only filesystem** in Cowork. You will hit `EROFS: read-only file system` if you try to edit there directly. The required procedure every single time is:

  ```bash
  # 1. Copy to a writable temp location
  cp -r /sessions/<session>/mnt/.skills/skills/<skill-name> /tmp/<skill-name>

  # 2. Fix permissions (the copy inherits read-only bits — chmod is mandatory)
  chmod -R u+w /tmp/<skill-name>

  # 3. Edit the copy  (use Edit tool on /tmp/<skill-name>/SKILL.md)

  # 4. Package
  zip -j /sessions/<session>/<skill-name>.skill /tmp/<skill-name>/SKILL.md

  # 5. Copy to the user's workspace folder so they can download it
  cp /sessions/<session>/<skill-name>.skill "/sessions/<session>/mnt/[vault-root]/<destination>/"
  ```

  Then use `present_files` on the `.skill` file. The user clicks "Copy to your skills" to reinstall it — **Claude cannot install the skill directly**. This is the complete, correct workflow. Do not attempt to edit the installed path or skip the `chmod` step.

---

## CCC Publishing Workflow — Source of Truth

Full workflow with plugin table and sync commands: `references/ccc-publishing-workflow.md`

**5-step cycle:** Obsidian vault (source of truth) → GitHub commit → package .plugin → install in Cowork → sync edits back to vault.

Key rule: `.skills/` mount is **read-only**; `.claude/plugins/cache/` is **writable**. Always edit vault copy and re-package.

---

## Rules (Update When Things Go Wrong)

- Never ship a skill without running at least 2 test cases. Untested skills always have blind spots.
- The Rules section inside code blocks (examples) doesn't count — the skill itself must have its own Rules section outside code blocks.
- Description optimization requires realistic eval queries — abstract or obvious queries produce misleading trigger scores.
- Never merge baseline and with-skill timing data — keep them separate for clean comparison.
- When a skill exceeds 500 lines, move detailed procedure steps to `references/` first before trimming content.
- Always capture subagent timing on notification arrival — it's not persisted anywhere else.

---

## Self-Improvement

When a skill-creation session reveals a new failure mode (wrong eval structure, missed assertion, packaging error), add it to the Rules section above. When a session produces a particularly clean output, save the approach as a reference example for future runs.

---

## Reference files

The agents/ directory contains instructions for specialized subagents. Read them when you need to spawn the relevant subagent.

- `agents/grader.md` — How to evaluate assertions against outputs
- `agents/comparator.md` — How to do blind A/B comparison between two outputs
- `agents/analyzer.md` — How to analyze why one version beat another

The references/ directory has additional documentation:
- `references/schemas.md` — JSON structures for evals.json, grading.json, etc.

---

Repeating one more time the core loop here for emphasis:

- Figure out what the skill is about
- Draft or edit the skill
- Run claude-with-access-to-the-skill on test prompts
- With the user, evaluate the outputs:
  - Create benchmark.json and run `eval-viewer/generate_review.py` to help the user review them
  - Run quantitative evals
- Repeat until you and the user are satisfied
- Package the final skill and return it to the user.

Please add steps to your TodoList, if you have such a thing, to make sure you don't forget. If you're in Cowork, please specifically put "Create evals JSON and run `eval-viewer/generate_review.py` so human can review test cases" in your TodoList to make sure it happens.

Good luck!
