# pHash Deduplication Tuning Guide

The perceptual hash (pHash) deduplication is the core innovation in `video-ingest`. This file explains how to tune the threshold for your specific video style.

## How pHash Deduplication Works

For each frame after ffmpeg extraction:
1. Compute the perceptual hash (a 64-bit hash representing visual content)
2. Compare the hash to the previously-kept frame's hash
3. Compute the normalized Hamming distance (0.0 = identical, 1.0 = completely different)
4. If distance > threshold, keep the frame; otherwise skip as a duplicate

**Default threshold: 0.12 normalized distance** (tuned for talking-head video; adjusted in v0.2 based on real-world test feedback)

## Why This Fixes Talking-Head False Positives

Naive ffmpeg scene detection treats every micro-movement of a presenter's head as a "scene change" because pixel values change slightly. This produces 10–50 near-duplicate frames of the same slide.

pHash deduplication filters these out because:
- Head movements produce pHash distance of ~0.02–0.05 (filtered out ✓)
- Real slide transitions produce pHash distance of ~0.3–0.7 (kept ✓)

The threshold at 0.15 sits squarely between these two ranges, giving a clean separation.

## Adjusting the Threshold

If you see problems, adjust as follows:

### Problem: Too Many Duplicates (Talking Head Still Sneaking Through)

**Symptom:** Output has 50–100 slide images even though the video only shows 15 slides.

**Diagnosis:** threshold is too high. The head-movement distance is greater than you expected.

**Fix:** Lower the threshold:
```bash
video-ingest --video input.mp4 --audio audio.mp3 --phash-threshold 0.10
```

**When to stop lowering:** If slides start merging together (real transitions get filtered), you've gone too far.

**Expected new threshold:** 0.08–0.12 for high-motion talking-head layouts

### Problem: Missing Slide Transitions (Real Changes Getting Filtered)

**Symptom:** Output has 5 slide images but the video showed 15 different slides.

**Diagnosis:** threshold is too low. Subtle slide transitions have pHash distance ≤ threshold.

**Fix:** Raise the threshold:
```bash
video-ingest --video input.mp4 --audio audio.mp3 --phash-threshold 0.20
```

**When to stop raising:** If talking-head artifacts start reappearing, you've gone too far.

**Expected new threshold:** 0.18–0.25 for subtle slide transitions (muted color changes, text updates, minimal visual change)

## Diagnostic Steps

To inspect pHash behavior without re-running the full skill:

```bash
# Extract frames (Phase 2)
ffmpeg -i video.mp4 -vf "select=gt(scene\,0.5),fps=1" frame_%04d.png

# Compute pHashes and distances (debug script below)
python3 detect_phash_distances.py frames/ 0.15

# Output shows each frame and whether it was kept or filtered
```

**Debug script** (save as `detect_phash_distances.py`):
```python
import sys
import imagehash
from PIL import Image
import os

frames_dir = sys.argv[1]
threshold = float(sys.argv[2])

frames = sorted([f for f in os.listdir(frames_dir) if f.endswith('.png')])
prev_hash = None

kept_count = 0
filtered_count = 0

for frame_file in frames:
    img = Image.open(os.path.join(frames_dir, frame_file))
    curr_hash = imagehash.phash(img)
    
    if prev_hash is None:
        print(f"{frame_file}: KEPT (first frame)")
        kept_count += 1
    else:
        distance = curr_hash - prev_hash  # normalized hamming distance
        if distance > threshold:
            print(f"{frame_file}: KEPT (distance={distance:.3f})")
            kept_count += 1
        else:
            print(f"{frame_file}: FILTERED (distance={distance:.3f} <= {threshold})")
            filtered_count += 1
            prev_hash = prev_hash  # don't update on filtered frames
            continue
    
    prev_hash = curr_hash

print(f"\nSummary: {kept_count} kept, {filtered_count} filtered")
print(f"Retention rate: {100*kept_count/(kept_count+filtered_count):.1f}%")
```

## Platform-Specific Tuning

Different recording platforms produce different pHash signatures due to compression, encoding, and camera/screen positioning:

| Platform | Talking Head Position | Typical Threshold | Notes |
|----------|----------------------|-------------------|-------|
| Zoom (gallery) | Bottom corner | 0.15 | Default; head movement ~0.03 |
| Zoom (speaker) | Full screen | 0.12 | Large head motion; lower threshold |
| Riverside | Side PiP | 0.15 | Similar to Zoom corner |
| Loom | Floating bubble | 0.15 | Default works well |
| StreamYard | Custom overlay | 0.13 | Overlay motion can be high |
| OBS + webcam | Variable | 0.10–0.20 | Highly dependent on layout; test |
| Screen-only (no head) | N/A | 0.18 | Use higher threshold; less noise to filter |

## Iterative Tuning Protocol

If you don't know your threshold:

1. **Start with the default (0.15)** and run Phase 2–4 on a 5-minute test clip
2. **Count the output:** is the slide count reasonable? (e.g., 5-minute Zoom presentation ≈ 2–5 slide changes)
3. **If too many slides:** lower to 0.12 or 0.10 and retry
4. **If too few slides:** raise to 0.18 or 0.20 and retry
5. **Once you find a good threshold for your platform/style, save it** for future recordings

## Edge Cases

### High-Contrast Slides (Black Backgrounds, Neon Colors)
These produce larger pHash distances even between near-identical frames. You may need to raise the threshold to 0.20+. If you have many high-contrast slides, consider `--crop` to remove the talking head entirely — this is more robust than tuning.

### Animated Slides (Fade-in, Fly-in Effects)
Animations produce gradual pHash changes. If an animation spans 30 frames, you might capture the animation at multiple stages instead of the final slide. Lowering the threshold to 0.08–0.10 helps, but you may still get animation frames. Consider telling the operator to skip animated transitions or trim the video to only final-frame states.

### Very Dark or Very Bright Slides
Poor lighting or high-contrast encoding can cause OCR failures (not pHash issues directly). See `references/ocr-edge-cases.md` for OCR preprocessing.

### Screen Flicker or Interlacing Artifacts
Older cameras or poor encoding produce flicker. These can trigger false positives in pHash. If you see this, try `--crop` to remove the camera and isolate the screen, or recommend the operator re-encode the video with deinterlacing (`ffmpeg -deinterlace`).

## When to Give Up on Tuning and Use --crop

If you're tweaking the threshold by more than ±0.05 and still not happy, the better fix is to use the `--crop` flag to remove the talking head entirely. This is more robust and requires zero tuning.

**When to recommend --crop:**
- Threshold tuning has failed (you've tried 0.08–0.22 with no luck)
- The operator says "my videos have a lot of presenter motion"
- High-motion camera setups (operator moves around while presenting)

See `references/crop-presets.md` for layout-specific crop coordinates.
