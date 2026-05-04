# Crop Presets for Talking-Head Removal

The `--crop` flag lets you exclude talking-head regions from frame extraction. This file contains ffmpeg crop coordinates for common recording platforms and layouts.

## ffmpeg Crop Syntax

```bash
ffmpeg -i video.mp4 -vf "crop=W:H:X:Y,select=gt(scene\,0.5),fps=1" frame_%04d.png
```

Where:
- `W` = crop width (pixels)
- `H` = crop height (pixels)
- `X` = crop X offset (pixels from left)
- `Y` = crop Y offset (pixels from top)

**Example:** Remove a 240px-wide camera feed from the right side of a 1920x1080 video:
```bash
ffmpeg -i video.mp4 -vf "crop=1680:1080:0:0" ...
```
This keeps a 1680x1080 region starting at (0,0), removing the right 240 pixels.

## Platform-Specific Presets

### Zoom (Gallery Mode, 16:9)

**Setup:** Camera in bottom-right corner, slides take up 70% of frame.

**Video dimensions:** 1920x1080

**Preset:**
```bash
video-ingest --video zoom.mp4 --audio audio.mp3 --crop 1600:1050:0:0
```

**Why:** Removes ~320px from right and ~30px from bottom, keeping only the main slide area.

---

### Zoom (Speaker Mode, 16:9)

**Setup:** Face fills most of screen, small slide preview in corner.

**Video dimensions:** 1920x1080

**Preset:**
```bash
video-ingest --video zoom.mp4 --audio audio.mp3 --crop 1280:1080:640:0
```

**Why:** Isolates the center ~67% (640px offset), where the slide preview usually sits.

**Alternative (if preview is on left):**
```bash
video-ingest --video zoom.mp4 --audio audio.mp3 --crop 1280:1080:0:0
```

---

### Riverside (PiP Overlay)

**Setup:** Screen recording with camera inset (Picture-in-Picture), often bottom-right.

**Video dimensions:** 1920x1080

**Preset:**
```bash
video-ingest --video riverside.mp4 --audio audio.mp3 --crop 1600:900:0:0
```

**Why:** Removes right 320px and bottom 180px where the camera usually sits.

---

### Loom (Floating Bubble)

**Setup:** Screen recording with camera as a floating circle/bubble, typically bottom-right.

**Video dimensions:** 1920x1080

**Preset:**
```bash
video-ingest --video loom.mp4 --audio audio.mp3 --crop 1760:1000:0:0
```

**Why:** Removes right 160px and bottom 80px (bubble is smaller than Riverside).

---

### OBS (Custom Screen + Camera)

**Setup:** Highly variable; camera position depends on user layout. Common: bottom-right corner at 25% size.

**Video dimensions:** 1920x1080 (typical)

**Preset (camera bottom-right, ~25% size):**
```bash
video-ingest --video obs.mp4 --audio audio.mp3 --crop 1600:900:0:0
```

**Preset (camera top-left, ~25% size):**
```bash
video-ingest --video obs.mp4 --audio audio.mp3 --crop 1600:900:320:180
```

**Preset (camera full-screen, minimal overlay):**
```bash
video-ingest --video obs.mp4 --audio audio.mp3 --crop 1728:972:96:54
```

**Tip:** Ask the operator where the camera appears and what % of the screen it takes. Then adjust crop values accordingly.

---

### StreamYard (Custom Overlay)

**Setup:** Branded overlay + camera inset, highly customizable.

**Video dimensions:** 1920x1080 (typical)

**Generic Preset (camera bottom-right, ~20% size):**
```bash
video-ingest --video streamyard.mp4 --audio audio.mp3 --crop 1600:950:0:0
```

**Tip:** This is highly variable per brand. Ask the operator to provide a screenshot of their layout, and custom-fit the crop.

---

### GoToWebinar / WebEx

**Setup:** Screen share with speaker video in corner (usually bottom-left or bottom-right).

**Video dimensions:** 1920x1080

**Preset (camera bottom-left):**
```bash
video-ingest --video webinar.mp4 --audio audio.mp3 --crop 1600:900:320:0
```

**Preset (camera bottom-right):**
```bash
video-ingest --video webinar.mp4 --audio audio.mp3 --crop 1600:900:0:0
```

---

### screenflow (macOS Native)

**Setup:** Often includes a floating camera bubble in corner.

**Video dimensions:** Variable (user's display resolution, often 2560x1440 on retina)

**Generic Preset (adjust for your resolution):**
```bash
# For 2560x1440 with camera ~25% in bottom-right:
video-ingest --video screenflow.mp4 --audio audio.mp3 --crop 2400:1350:0:0
```

**Tip:** Adjust proportionally if your resolution differs.

---

### Windows 11 Screen Capture / Xbox Game Bar

**Setup:** Often includes system UI or camera inset.

**Video dimensions:** Match your display resolution (e.g., 1920x1080, 2560x1440)

**Generic Preset (1920x1080, remove bottom-right):**
```bash
video-ingest --video capture.mp4 --audio audio.mp3 --crop 1600:900:0:0
```

---

## How to Custom-Fit a Preset

If your platform isn't listed, follow this procedure:

1. **Screenshot your recording setup** (show the layout before you start)
2. **Identify the camera position** — bottom-left, bottom-right, top-left, etc.
3. **Estimate the camera size as a % of the frame** — e.g., "25% of screen width"
4. **Calculate crop values:**
   - If camera is 25% wide on a 1920px video: remove 480px
   - New width: 1920 - 480 = 1440
   - If camera is bottom-right and takes 20% of height on 1080px video: remove 216px
   - New height: 1080 - 216 = 864
   - X offset = 0 (unless camera is on left, then X = removed width)
   - Y offset = 0 (unless camera is on top, then Y = removed height)
5. **Try it:**
   ```bash
   video-ingest --video yourfile.mp4 --audio audio.mp3 --crop 1440:864:0:0
   ```
6. **Review the output.** If slides are still duplicated, lower the crop further or try adjusting the phash threshold instead.

## Testing a Crop

Before running the full skill, test your crop on a 30-second clip:

```bash
# Generate test frames with crop
ffmpeg -i yourfile.mp4 -vf "crop=W:H:X:Y,select=gt(scene\,0.5),fps=1" -t 30 test_frame_%04d.png

# Count the frames
ls test_frame_*.png | wc -l

# Expected: 2–5 frames for a 30-second clip with 2–3 visible slide changes
```

If you got 20+ frames, the crop isn't working as intended — either the camera isn't in the region you removed, or talking-head motion is still present in the remaining region.

## When to Use --crop vs. pHash Tuning

| Scenario | Use --crop | Use pHash Tuning |
|----------|-----------|------------------|
| High-motion talking head (lots of movement) | ✓ More robust | ✗ Will need very low threshold |
| Subtle head/eye movement | ✗ Overkill | ✓ Fine-tuning works |
| Operator doesn't know their layout | ✗ Can't provide coords | ✓ Default threshold usually works |
| Ultra-high-motion (operator pacing around) | ✓ Best solution | ✗ pHash alone won't save it |
| Very subtle slide transitions | ✗ Crop doesn't help | ✓ Raise threshold to 0.20+ |

If in doubt, start with pHash tuning (it's the default). Use `--crop` only if threshold tuning fails.
