---
name: video-ingest
description: Ingests split-format video recordings (muted video + separate audio) into a single markdown file with timestamped Whisper transcripts, extracted slide images, OCR slide text, and vault-ready frontmatter. Handles talking-head false positives via perceptual-hash deduplication—a two-layer fix that kills naive head-movement detection. Use this whenever you have a course recording, class video, or educational content in split format (video file + audio file) that needs to become a searchable vault note.
allowed-tools: Bash, Read, Write
version: 0.2.0
---

**Workflow: Extract → Dedupe → OCR → Combine.** This skill ingests a muted video + audio pair, transcribes the audio to timestamped SRT, extracts candidate frames via ffmpeg scene detection, filters out talking-head false positives with perceptual-hash deduplication, OCRs surviving frames, and produces a single markdown ready for `knowledge-distill` to compress into a clean distill note.

## Inputs

The operator provides:
1. **Path to video file** (muted, visual content only — slides + possible talking head overlay)
2. **Path to audio file** (separate audio track)
3. **Optional flags:**
   - `--crop X:Y:W:H` — ffmpeg crop coordinates to exclude talking head (optional, sharpens deduplication)
   - `--thinker-folder [Name]` — route output to `01 - KNOWLEDGE BASE/Thinkers & Philosophers/[Name]/Courses/[course]/` (optional; default is `📥 Inbox/`)
   - `--course-name "Course Title"` — used in output filename (optional; default is generic timestamp)

## Outputs

**Single markdown file:** `[Course Name] - Recording [N] - [Topic] - Raw Ingest.md`

Structure:
- YAML frontmatter (ready for `knowledge-distill`)
- Timestamped transcript (from Whisper SRT, inline)
- Slide images embedded at their timestamps
- OCR text below each image (searchable in vault)
- Relative `_slides/` subfolder with all extracted PNGs

Example path (with --thinker-folder):
```
01 - KNOWLEDGE BASE/Thinkers & Philosophers/Michael Simmons/Courses/Frontier Prompting/
  [Course Title] - Recording 1 - Prompt Engineering - Raw Ingest.md
  _slides/
    slide_000530.png
    slide_001245.png
    ...
```

Example path (without --thinker-folder):
```
01 - KNOWLEDGE BASE/📥 Inbox/
  Untitled Recording - Recording 1 - Raw Ingest.md
  _slides/
    slide_000530.png
    ...
```

## Expected Output by Video Type

The skill's output varies significantly depending on your video content. Knowing what to expect prevents confusion:

- **Slide-first lectures** (e.g., a structured course with 20+ slides): Expect dozens of slide images retained in `_slides/`, with rich OCR text. Output is slide-heavy; the transcript is secondary.
- **Talking-head presentations** (e.g., a webinar with a presenter at the bottom and minimal slides): Expect 0–5 slides retained, possibly zero if the video is purely presenter-to-camera. Output is transcript-dominated; slides are optional.
- **Few/zero slides retained IS NOT A BUG.** If the video has minimal text-based slide content, the OCR text-length filter (Rule 3: ≥10 characters per slide) correctly identifies that there are no text-rich frames to extract. The transcript is the primary artifact.

Tailor your expectations to your input content. If you expected slides but got none, the video likely had no text-based slides.

## Phase-by-Phase Workflow

### Phase 0: Inputs & Validation
Ask for video path, audio path. Confirm ffmpeg, whisper, tesseract, imagehash are available (or will install). If not installed, return exact install commands for the operator's OS.

### Phase 1: Audio Transcription
Run Whisper on audio file with `--output_format=srt`. Produces `transcript.srt` with `HH:MM:SS,mmm --> HH:MM:SS,mmm` timestamps and speaker text. Extract total duration from the SRT for Phase 7 reporting.

**Whisper Configuration Trade-offs:**
- Default: `vad_filter=False`, `language="en"`, `beam_size=1` (speed-optimized for clean course audio)
- With `vad_filter=True`: Whisper performs an upfront Voice Activity Detection pass on the full audio, which can delay first-segment output by 60+ seconds on long recordings (e.g., 60-min audio). Use only if you need aggressive silence-skipping (rarely needed).
- Operator can enable VAD with `--vad` flag if desired, but default is disabled for immediate feedback.

### Phase 2: Frame Extraction
ffmpeg with optional `--crop` + scene detection (threshold default 0.5):
```bash
ffmpeg -i video.mp4 \
  -vf "select=gt(scene\,0.5),fps=1" \
  [optional: -vf "crop=W:H:X:Y,select=..."] \
  frame_%04d.png
```
Produces candidate frames named `frame_HHMMSS.png` in temp dir. Record the timestamp from each filename.

### Phase 3: pHash Deduplication (The Head-Moving Fix)
Load frames in timestamp order. For each frame:
1. Compute perceptual hash (pHash) using `imagehash` library
2. Compare pHash to the previously-kept frame's pHash
3. If normalized hamming distance > threshold (default 0.15), keep the frame; otherwise skip as duplicate

**Why this works:** talking-head micro-motions produce pHash distances of ~0.02–0.05 (filtered out). Real slide changes produce ~0.3+ distances (kept). This is the non-negotiable killer feature.

### Phase 4: OCR Each Surviving Frame
For each frame that passed deduplication:
```bash
tesseract frame_HHMMSS.png stdout > slide_HHMMSS.txt
```
Skip frames where OCR text is < 10 characters (likely video noise, not a slide).

### Phase 5: Combine Into Markdown
Create a single `[Course Name] - Recording [N] - [Topic] - Raw Ingest.md` file with:
- YAML frontmatter (source, duration, slide count, thinker, course)
- Inline transcript from SRT (all timestamps preserved)
- For each surviving slide frame: embedded PNG image + OCR text below it

### Phase 6: Organize & Cleanup
1. Create `_slides/` subfolder next to the markdown
2. Move all retained PNG images into `_slides/`
3. Update image paths in the markdown to `_slides/slide_HHMMSS.png`
4. Delete temp working directory
5. Leave audio file in its original location

### Phase 7: Report
Output summary:
- Total frames extracted by ffmpeg
- Frames retained after pHash deduplication (+ filtering rate)
- OCR success rate (slides with ≥10 chars)
- Transcript word count + duration
- Output markdown path
- Suggestion to run `/knowledge-distill` on the output

## Rules (Update This Section When Things Go Wrong)

1. **Never extract frames without deduplication.** Raw ffmpeg scene detection on talking-head video produces dozens of near-duplicate frames (different head positions, same slide). Always run Phase 3 — it's the core innovation here.

2. **Perceptual hash threshold is not arbitrary.** The default 0.12 normalized hamming distance is tuned for typical slide layouts. If you see excessive duplicates (talking head still sneaking through), lower threshold to 0.10. If you're losing legitimate slide changes, raise to 0.20. See `references/phash-tuning.md` for diagnostic steps.

3. **OCR text < 10 chars is noise.** Animations, transitions, or pure-video frames that aren't slides will OCR to 1–5 chars. The 10-char floor filters these out without manual review. If a real slide is getting filtered, it means OCR failed — try increasing the threshold to 15 chars, or investigate the frame quality (blurry/dark slides may need preprocessing).

4. **Crop flag is optional but powerful.** For known layouts (Zoom speaker corner, PiP overlay, Riverside camera inset), a `--crop` flag removes the talking head before scene detection, dramatically sharpening results. See `references/crop-presets.md` for common coordinates. If the operator doesn't provide `--crop`, warn them it's available but not required.

5. **ffmpeg must extract frames WITH timestamps.** Use ffmpeg's `-fps=1` or scene-based extraction to generate frames, and embed the timestamp in the filename (e.g., `frame_001530.png` for 15:30). Without timestamps, Phase 5 cannot sync slides to transcript.

6. **Whisper SRT format is mandatory.** Always use `--output_format=srt` (or equivalent) to get `HH:MM:SS,mmm` timestamps. JSON or VTT formats are ambiguous during parsing. SRT is the canonical format here.

7. **Never embed audio in the output markdown.** The audio file stays in its original location. The output is ONLY the markdown + extracted slides. This keeps the output lightweight and respects the operator's file layout.

8. **Always create the `_slides/` subfolder.** Even if there's only one slide, create the subfolder. Consistency makes the vault navigable and ready for future scale. Relative paths in the markdown should point to `_slides/slide_*.png`.

## Self-Improvement

When a user corrects output or identifies a failure mode:
- If deduplication threshold is wrong for their video style, update `references/phash-tuning.md` with their specific case (e.g., "high-contrast slides fail at 0.15, need 0.18" + symptoms to watch for)
- If a new talking-head layout appears that `--crop` doesn't cover, add it to `references/crop-presets.md` with coordinates and the platform/tool
- If OCR fails on a specific slide type (e.g., dark theme slides, handwritten notes), note it in `references/ocr-edge-cases.md` with the workaround

When a user approves a final output:
- Note which `--crop` coordinates worked best for which platform (update `crop-presets.md`)
- Note which phash threshold worked best for which slide style (update `phash-tuning.md`)
- If the operator used `--course-name` or `--thinker-folder`, note the routing convention so future outputs follow the same pattern

This skill compounds with use. The more recordings it processes, the better the reference files become, and the fewer tweaks future operators will need.

## Dependency Check (Phase 0)

Before starting, verify:
- `ffmpeg` — frame extraction + optional cropping
- `whisper` (OpenAI) OR `whisper-cpp` — audio transcription
- `tesseract` — OCR on extracted frames
- `imagehash` + `Pillow` Python libraries — perceptual hashing for deduplication

If any are missing, provide exact install commands for the operator's OS. Do NOT fail — instead, report what's missing and let the operator install before re-running.

### Install Commands (Provide if Needed)

**macOS (Homebrew):**
```bash
brew install ffmpeg tesseract
pip install openai-whisper imagehash Pillow --break-system-packages
```

**Linux (Ubuntu/Debian):**
```bash
apt-get update && apt-get install -y ffmpeg tesseract-ocr
pip install openai-whisper imagehash Pillow --break-system-packages
```

**Linux (Fedora/CentOS):**
```bash
dnf install -y ffmpeg tesseract
pip install openai-whisper imagehash Pillow --break-system-packages
```

**Windows (Chocolatey):**
```bash
choco install ffmpeg tesseract
pip install openai-whisper imagehash Pillow --break-system-packages
```

**Or use pre-built Docker image** (if operator prefers isolation):
```bash
docker run -v /path/to/files:/work -it jrottenberg/ffmpeg:latest bash
```

---

## Next Steps After Output

Once the markdown is produced, the operator should:
1. Review the output markdown in the vault to check for obvious slide extraction issues
2. Run `/knowledge-distill` on the output file to compress it into a clean distill note (removes raw frames, keeps key concepts + timestamps)
3. Route the distill output to the appropriate Knowledge Base subfolder (e.g., `01 - KNOWLEDGE BASE/Thinkers & Philosophers/[Name]/`)

The output markdown is **intentionally raw** — it's meant to be consumed by the next skill in the pipeline, not polished for human reading.
