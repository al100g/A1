# A1 — Music & Mood Empowerment AI

A1 is a Python prototype that writes a **personalised song** for every user — from mood detection all the way through to a fully structured lyric sheet, music composition guidance, and a vocal performance script.

---

## Features

| Pillar | What A1 does |
|---|---|
| **Mood Detection** | Infers emotion (happy, sad, reflective, anxious, energized, calm, romantic, inspired) from free text or a vibe choice |
| **Lyrics Generation** | Produces a full **Verse → Chorus → Verse → Chorus → Bridge → Chorus** song in the matching emotional register |
| **Music Composition** | Recommends tempo, key, time signature, instruments, and style — with pluggable adapters for AIVA and Google Magenta |
| **Voice Synthesis** | Generates a vocal-direction script; pluggable adapters for Replica Studios and Uberduck |

---

## Quick Start

\`\`\`bash
# 1. Clone & enter the repo
git clone https://github.com/al100g/A1.git
cd A1

# 2. Create a virtual environment (Python 3.10+)
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# 3. Install in editable mode
pip install -e ".[dev]"

# 4. Run the interactive CLI
python -m a1.main
\`\`\`

---

## Using A1 Programmatically

\`\`\`python
from a1.song_builder import SongBuilder

builder = SongBuilder()

# From free text
song = builder.build_from_text("I feel so inspired and ready to take on the world!")
print(song.full_display())

# From a vibe label
song = builder.build_from_vibe("hopeful")
print(song.full_display())

# With style adjustments
song = builder.build_from_vibe("sad", style_hint="try piano instead")
print(song.composition.summary())
\`\`\`

---

## Project Layout

\`\`\`
src/
  a1/
    __init__.py          – Package metadata
    mood_detector.py     – Text-based mood detection
    lyrics_generator.py  – Personalised lyric generation (V-C-V-C-B-C)
    music_composer.py    – Mood-based composition guidance + AIVA / Magenta stubs
    voice_synthesizer.py – Vocal script generation + Replica Studios / Uberduck stubs
    song_builder.py      – Facade that wires all four stages together
    main.py              – Interactive CLI entry point
tests/
  test_mood_detector.py
  test_lyrics_generator.py
  test_music_composer.py
  test_voice_synthesizer.py
  test_song_builder.py
\`\`\`

---

## Running Tests

\`\`\`bash
pytest           # run all 78 tests
pytest --cov=a1  # with coverage report
\`\`\`

---

## Extending A1

### Plug in a Real Music API (AIVA)

\`\`\`python
from a1.music_composer import AivaComposerAdapter
from a1.song_builder import SongBuilder

builder = SongBuilder(composer=AivaComposerAdapter(api_key="YOUR_AIVA_KEY"))
song = builder.build_from_vibe("inspired")
print(song.composition.audio_url)  # URL to generated audio
\`\`\`

### Plug in a Real Voice API (Replica Studios)

\`\`\`python
from a1.voice_synthesizer import ReplicaStudiosAdapter
from a1.song_builder import SongBuilder

builder = SongBuilder(synthesizer=ReplicaStudiosAdapter(api_key="YOUR_KEY"))
song = builder.build_from_vibe("calm")
print(song.performance.audio_url)  # URL to sung audio file
\`\`\`

---

## Roadmap

- [ ] Real-time voice tone analysis for automatic mood detection
- [ ] Google Magenta MIDI melody generation
- [ ] Web API (FastAPI) wrapper
- [ ] React / mobile front-end
- [ ] User-driven feedback loop ("make it more upbeat")
