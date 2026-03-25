# A1 – Music & Mood Empowerment

A1 is a personalised song-creation web application. Tell A1 how you feel, pick a theme, and it instantly writes song lyrics tailored to your mood, describes a matching music composition, and outlines the vocal style — all powered by AI.

---

## Features

| Feature | Description |
|---|---|
| **Mood detection** | Choose from five moods: *happy, sad, reflective, anxious, energized* |
| **Personalised lyrics** | Verse–Chorus–Verse–Chorus–Bridge–Chorus structure, generated via GPT-4o-mini (with a rich offline fallback) |
| **Music composition** | Mood-mapped instrument, tempo, key, and style profiles; adjustable in real time |
| **Voice synthesis** | Mood-matched vocal style descriptions; live audio via Uberduck when credentials are provided |
| **Adjustable style** | Users can request tweaks like *"make it more upbeat"* or *"add piano"* after generation |
| **Copy & share** | One-click copy of the full lyrics |

---

## Quick Start

### 1. Clone & install

```bash
git clone https://github.com/al100g/A1.git
cd A1
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure environment variables (all optional)

Create a `.env` file in the project root:

```env
# AI lyric generation (GPT-4o-mini)
OPENAI_API_KEY=sk-...

# Music composition via AIVA
AIVA_API_KEY=...

# Vocal synthesis via Uberduck
UBERDUCK_API_KEY=...
UBERDUCK_API_SECRET=...

# Flask session secret (change in production)
SECRET_KEY=your-secret-key
```

The app works fully without any of these keys — it falls back to built-in lyrics and profile descriptions.

### 3. Run the app

```bash
python app.py
```

Open http://localhost:5000 in your browser.

---

## API Reference

### `GET /api/moods`

Returns all supported moods with descriptions and example lines.

### `POST /api/generate`

Generate a personalised song.

**Request body (JSON):**

```json
{
  "mood": "sad",
  "theme": "hope",
  "user_name": "Alice",
  "adjustment": "make it more upbeat"
}
```

All fields except `mood` are optional.

**Response:**

```json
{
  "mood": "sad",
  "theme": "hope",
  "lyrics": { "full_lyrics": "...", "sections": {}, "..." : "..." },
  "music":  { "profile": {}, "audio_url": null, "message": "..." },
  "voice":  { "profile": {}, "audio_url": null, "message": "..." }
}
```

### `POST /api/adjust`

Adjust the music profile for an existing mood.

**Request body:**

```json
{ "mood": "sad", "adjustment": "add strings" }
```

---

## Project Structure

```
A1/
├── app.py                    # Flask application & routes
├── requirements.txt
├── setup.cfg                 # Flake8 & pytest config
├── services/
│   ├── lyrics_generator.py   # Mood-based lyric generation (LLM + fallback)
│   ├── music_composer.py     # Music profile + AIVA integration
│   └── voice_synthesizer.py  # Voice profile + Uberduck integration
├── templates/
│   └── index.html            # Single-page UI
├── static/
│   ├── css/style.css
│   └── js/app.js
└── tests/
    ├── test_app.py
    ├── test_lyrics_generator.py
    ├── test_music_composer.py
    └── test_voice_synthesizer.py
```

---

## Running Tests

```bash
python -m pytest tests/ -v
```

---

## External AI Tools Supported

| Tool | Purpose | How to enable |
|---|---|---|
| OpenAI GPT-4o-mini | Lyric generation | Set `OPENAI_API_KEY` |
| AIVA | Music composition | Set `AIVA_API_KEY` |
| Uberduck | Vocal synthesis (singing) | Set `UBERDUCK_API_KEY` + `UBERDUCK_API_SECRET` |

---

## Roadmap

- [ ] Google Magenta integration for in-browser melody generation
- [ ] Replica Studios voice synthesis option
- [ ] Download full track (vocals + music) as a combined audio file
- [ ] Voice-based mood detection from microphone input
- [ ] Song sharing via a unique link
