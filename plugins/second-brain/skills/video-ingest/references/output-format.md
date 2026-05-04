# Output Format Specification

This file defines the exact markdown structure that `video-ingest` produces. This format is designed to be consumed directly by `/knowledge-distill` in the next stage of the pipeline.

## Filename Convention

```
[Course Name] - Recording [N] - [Topic] - Raw Ingest.md
```

**Examples:**
- `Frontier Prompting - Recording 1 - Prompt Engineering Foundations - Raw Ingest.md`
- `AI Timeline - Recording 3 - Scaling Laws and Capability - Raw Ingest.md`
- `Untitled Recording - Recording 1 - Raw Ingest.md` (if no --course-name provided)

---

## YAML Frontmatter

```yaml
---
source: "[course name or URL]"
recording_duration: "[HH:MM:SS]"
timestamp_extracted: "[YYYY-MM-DD HH:MM:SS UTC]"
slide_count: "[N]"
ocr_success_rate: "[XX%]"
transcript_word_count: "[N]"
thinker: "[Name]"
course: "[Course Name]"
topic: "[Topic or Session Title]"
ingest_phase: "raw"
next_skill: "knowledge-distill"
---
```

**Field definitions:**
- `source`: Where this recording came from (course name, URL, or "Internal recording")
- `recording_duration`: Total duration of the audio (HH:MM:SS format)
- `timestamp_extracted`: When the ingest was run (ISO 8601, UTC)
- `slide_count`: Number of unique slides extracted (after deduplication)
- `ocr_success_rate`: Percentage of slides where OCR returned ≥10 characters (e.g., "85%")
- `thinker`: Name of the thinker/author whose course this is (e.g., "Michael Simmons") — omit if not set
- `course`: Course or event name (e.g., "Frontier Prompting") — omit if not set
- `topic`: Session or topic title (e.g., "Prompt Engineering Foundations") — omit if not set
- `ingest_phase`: Always "raw" — signals to `knowledge-distill` that this is pre-processing input
- `next_skill`: Always "knowledge-distill" — the recommended next step in the pipeline

---

## Body Content Structure

### Section 1: Transcript

**Header:**
```markdown
## Transcript

*Timestamped transcript from Whisper audio transcription.*
```

**Content:** Plain text lines from the SRT file, in order. Include timestamps inline:

```markdown
00:00:10,000 --> 00:00:15,000
Good morning, everyone. Today we're going to talk about prompt engineering.

00:00:15,500 --> 00:00:22,000
The core idea is that language models respond differently depending on how you phrase your request.
```

**Formatting:**
- Preserve SRT timestamp format: `HH:MM:SS,mmm --> HH:MM:SS,mmm`
- One speaker block per timestamp pair
- Blank line between timestamp blocks
- Don't add speaker names (Whisper outputs don't include them; add them manually if you have them)

---

### Section 2: Slides

For each slide extracted in Phase 3–4:

**Header:**
```markdown
## Slides

*Extracted slide images with OCR text below each.*
```

**Per-slide block:**
```markdown
### Slide — [HH:MM:SS]

![slide_HHMMSS](/_slides/slide_HHMMSS.png)

**OCR Text:**
```
[OCR-extracted text from tesseract, verbatim]
```
```

**Example:**
```markdown
### Slide — 00:05:30

![slide_000530](/_slides/slide_000530.png)

**OCR Text:**
```
Prompt Engineering Fundamentals

1. Be Specific
   - Clear instructions improve output quality
   - Vague prompts produce vague results

2. Provide Context
   - Tell the model what role to play
   - Give examples of desired output format
```
```

**Formatting rules:**
- Timestamp reflects the frame's timestamp in the original video
- Image path is relative: `_slides/slide_HHMMSS.png`
- OCR text is wrapped in a fenced code block (triple backticks) to preserve formatting
- Slides are ordered by timestamp (earliest first)
- If a slide's OCR text is empty or minimal, include the code block anyway but note "(minimal OCR)" in a comment

---

## Example Full Output

```markdown
---
source: "Frontier Prompting — Live Class"
recording_duration: "01:23:45"
timestamp_extracted: "2026-05-04 14:30:00 UTC"
slide_count: 12
ocr_success_rate: "92%"
transcript_word_count: 8427
thinker: "Michael Simmons"
course: "Frontier Prompting"
topic: "Session 1 — Prompt Engineering Foundations"
ingest_phase: "raw"
next_skill: "knowledge-distill"
---

## Transcript

*Timestamped transcript from Whisper audio transcription.*

00:00:10,000 --> 00:00:15,000
Good morning, everyone. Welcome to Frontier Prompting. Today we're diving into the foundations of effective prompt engineering.

00:00:15,500 --> 00:00:22,000
The core insight is this: language models are remarkably responsive to how you phrase your request. Small changes in wording can produce dramatically different outputs.

## Slides

*Extracted slide images with OCR text below each.*

### Slide — 00:05:30

![slide_000530](/_slides/slide_000530.png)

**OCR Text:**
```
Prompt Engineering Fundamentals

Key Principle: How you ask shapes what you get

- Specificity matters
- Context shapes behavior
- Examples anchor understanding
```

### Slide — 00:12:45

![slide_001245](/_slides/slide_001245.png)

**OCR Text:**
```
Three Layers of Prompt Design

1. Task Definition
   What do you want?

2. Role & Context
   What role should the model play?

3. Constraints & Format
   What limits and structure?
```

[... more slides ...]
```

---

## Why This Format

1. **Whisper integration:** SRT timestamps match the transcript directly, so indexing is trivial
2. **Slide ordering:** Chronological order matches the video flow — no shuffling or sorting needed
3. **Relative paths:** `_slides/` subfolder keeps everything self-contained; the markdown and images move together
4. **Code block wrapping:** OCR text formatting is preserved, and quoted code is searchable in vault
5. **Frontmatter completeness:** `knowledge-distill` reads `slide_count`, `ocr_success_rate`, `thinker`, and `course` to decide how aggressively to compress. Missing fields default to conservative behavior.

---

## Known Variations

### If OCR Returns No Text (Frame Is Not a Slide)

Skip the slide entirely (Phase 4 filtering should prevent this, but it can happen with very low-quality frames).

### If Whisper Fails on Part of the Audio

Leave a gap in the transcript with a note:
```markdown
00:15:30,000 --> 00:15:35,000
[Audio unclear — Whisper confidence low]

00:15:40,000 --> 00:15:45,000
...and that's why specificity matters.
```

### If the Video Has Multiple Languages

Add a note in the frontmatter:
```yaml
language: "English (primary), German (segments 12-18)"
```

And include language tags in the transcript if needed:
```markdown
00:30:00,000 --> 00:30:15,000
[German] Das ist ein wichtiges Konzept...

00:30:15,000 --> 00:30:20,000
[English] In English, this means the model responds to context.
```

---

## Validation Checklist

Before the output markdown is considered "done," verify:

- [ ] Frontmatter has all required fields filled in
- [ ] Transcript has at least one timestamp block
- [ ] Slides section exists (even if just one slide)
- [ ] All slide images are referenced with relative paths (`_slides/...`)
- [ ] OCR text is wrapped in triple backticks
- [ ] Slides are ordered by timestamp (earliest first)
- [ ] Image filenames match the SRT timestamps (e.g., slide extracted at 00:05:30 should be `slide_000530.png`)
- [ ] `_slides/` subfolder exists and contains all referenced PNGs
- [ ] Slide count in frontmatter matches actual number of slides in the body
- [ ] `next_skill: "knowledge-distill"` is set

---

## Post-Ingest Processing (knowledge-distill)

`knowledge-distill` consumes this output and:
1. Reads the frontmatter (especially `slide_count`, `ocr_success_rate`)
2. Compresses the transcript (summarizes, extracts key concepts)
3. Keeps only the most important slides (removes duplicates or low-signal slides)
4. Produces a clean, distilled output suitable for vault integration

The raw ingest format is intentionally verbose to preserve all information for distillation. Do not try to "clean up" before passing to `knowledge-distill` — the raw format is the expected input.
