# Dependency Installation Guide

This file covers install instructions for `ffmpeg`, `whisper`, `tesseract`, `imagehash`, and `Pillow` across major platforms.

## Quick Check

Before running `video-ingest`, verify all dependencies are installed:

```bash
# Check ffmpeg
ffmpeg -version

# Check whisper (OpenAI)
whisper --version

# Check tesseract
tesseract --version

# Check Python libraries
python3 -c "import imagehash; import PIL; print('OK')"
```

If any command fails, follow the install instructions for your OS below.

---

## macOS (Homebrew)

**Fastest method:**
```bash
brew install ffmpeg tesseract
pip install openai-whisper imagehash Pillow --break-system-packages
```

**If you don't have Homebrew:** install from https://brew.sh

**If you prefer Macports:**
```bash
sudo port install ffmpeg tesseract
pip install openai-whisper imagehash Pillow --break-system-packages
```

**For M1/M2 Macs:** the Homebrew commands above work natively. If you hit arm64 issues, ensure you're using an arm64 Python:
```bash
which python3  # should show /opt/homebrew/bin/python3 or similar
```

---

## Linux (Ubuntu/Debian)

```bash
sudo apt-get update
sudo apt-get install -y ffmpeg tesseract-ocr
pip install openai-whisper imagehash Pillow --break-system-packages
```

**For GPU acceleration (CUDA, requires NVIDIA card):**
```bash
# First install CUDA toolkit from NVIDIA, then:
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118 --break-system-packages
pip install openai-whisper imagehash Pillow --break-system-packages
```

---

## Linux (Fedora/CentOS/RHEL)

```bash
sudo dnf install -y ffmpeg tesseract
pip install openai-whisper imagehash Pillow --break-system-packages
```

**For older systems (CentOS 7):**
```bash
sudo yum install -y ffmpeg tesseract
pip install openai-whisper imagehash Pillow --break-system-packages
```

---

## Windows (Chocolatey)

```bash
choco install ffmpeg tesseract
pip install openai-whisper imagehash Pillow --break-system-packages
```

**If you don't have Chocolatey:** install from https://chocolatey.org/install

**Manual install (no package manager):**
- FFmpeg: download from https://ffmpeg.org/download.html, add to PATH
- Tesseract: download from https://github.com/UB-Mannheim/tesseract/wiki, run installer
- Python: install from https://www.python.org/downloads/
- Then: `pip install openai-whisper imagehash Pillow --break-system-packages`

---

## Docker (Any Platform)

For a self-contained environment without polluting your system:

```bash
# Build a custom image with all deps
docker run -it --rm \
  -v /path/to/video:/work \
  -w /work \
  jrottenberg/ffmpeg:latest-ubuntu bash

# Inside container:
apt-get update && apt-get install -y tesseract-ocr python3-pip
pip install openai-whisper imagehash Pillow
whisper audio.mp3 --output_format=srt
tesseract slide_001530.png stdout
```

---

## Alternative: whisper-cpp (Lighter Weight)

If you prefer a smaller footprint or faster local inference:

```bash
git clone https://github.com/ggerganov/whisper.cpp
cd whisper.cpp
make
./models/download-ggml-model.sh base  # or tiny, small, medium, large
./main -m models/ggml-base.bin -f audio.mp3 -osrt
```

This trades slight accuracy for speed and zero external API calls. Compatible with the skill's SRT output requirement.

---

## Troubleshooting

### `ffmpeg: command not found`
- macOS: `brew install ffmpeg`
- Linux: `apt-get install ffmpeg` (Ubuntu) or `dnf install ffmpeg` (Fedora)
- Windows: Add ffmpeg to PATH after installing via Chocolatey or manually

### `tesseract: command not found`
- macOS: `brew install tesseract`
- Linux: `apt-get install tesseract-ocr`
- Windows: Run the Tesseract installer and add to PATH

### `whisper: command not found`
- Ensure pip is using the same Python you'll run the skill with
- Try `python3 -m pip install openai-whisper`
- Check: `python3 -m whisper --version`

### `ModuleNotFoundError: No module named 'imagehash'`
```bash
pip install imagehash --break-system-packages
```

### `CUDA out of memory` (if using GPU for Whisper)
- Reduce model size: use `--model tiny` or `--model small` instead of `--model base`
- Or run CPU-only: `CUDA_VISIBLE_DEVICES="" whisper audio.mp3`

### Tesseract segfaults on certain images
- Ensure Tesseract is up-to-date: `brew upgrade tesseract` or `apt-get upgrade tesseract-ocr`
- Try preprocessing frames (convert to grayscale, increase contrast) before OCR

---

## Whisper Configuration (VAD Trade-off)

The video-ingest skill uses Whisper for audio transcription. There are two modes:

### Default (vad_filter=False)
- Faster first-segment output (segments appear within seconds)
- Good for clean course/presentation audio with clear speech
- Language: auto-detect or set to `--language=en` (English)
- Beam search: `beam_size=1` (fastest)

**Use this for:** most educational videos, course recordings, webinars with clear audio

### With VAD (Voice Activity Detection)
- `vad_filter=True` — Whisper pre-scans the entire audio for silence before producing segments
- Upfront processing delay: 60+ seconds for 60-minute audio (no output while scanning)
- More aggressive at removing background silence/noise

**Use this for:** noisy environments, multiple speakers with long pauses, if you need segment-level silence removal. Enable with `--vad` flag.

**Why VAD is NOT the default:** On long, clean recordings (e.g., a 1-hour course), VAD's upfront pass can make it appear that Whisper has crashed or hung. For production use, the skill defaults to `vad_filter=False` so operators see immediate feedback.

---

## Version Requirements

Minimum supported versions (skill will work with newer):
- **ffmpeg:** 4.0+
- **Whisper (OpenAI):** 20231117+ (or any recent version)
- **Tesseract:** 4.0+
- **imagehash:** 4.2+
- **Pillow:** 8.0+
- **Python:** 3.8+
