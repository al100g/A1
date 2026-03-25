# A1 – Music & Mood Empowerment

A1 is a cutting-edge AI-powered music and mood empowerment platform. It creates personalized songs based on your mood, connects you with live duet partners, and curates playlists tailored to your emotions.

## Features

### 🎭 Mood Detection
AI analyzes your emotions through text input. Share how you feel and the platform identifies your current mood — happy, sad, energetic, calm, romantic, or melancholic — with intensity scoring and keyword signals.

### 🎵 AI Songwriting & Singing
Generate original lyrics and melodies tailored to your emotional state. Each song includes:
- Custom title and genre
- Chord progression
- Full verse/chorus/bridge structure
- Tempo and BPM guidance

### 🎤 Live Duets
Connect with other users in real-time music creation sessions:
- Browse available partners filtered by mood
- Collaborative lyrics and humming in session
- Live audio waveform visualization
- Recording support

### 🎧 Mood Playlists
Discover AI-curated tracks that resonate with your current emotions:
- Six mood categories with curated track libraries
- Energy-level indicators per track
- Full playback controls (play, pause, next, previous, shuffle)

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **API**: Next.js Route Handlers (API Routes)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home / landing page
│   ├── layout.tsx               # Root layout with navigation
│   ├── globals.css              # Global styles & animations
│   ├── mood-detection/
│   │   └── page.tsx             # Mood Detection feature
│   ├── ai-songwriting/
│   │   └── page.tsx             # AI Songwriting feature
│   ├── live-duets/
│   │   └── page.tsx             # Live Duets feature
│   ├── mood-playlists/
│   │   └── page.tsx             # Mood Playlists feature
│   └── api/
│       ├── mood/route.ts        # POST /api/mood — analyze text mood
│       ├── lyrics/route.ts      # POST /api/lyrics — generate song
│       └── playlist/route.ts   # GET /api/playlist?mood= — curate tracks
└── components/
    └── Navigation.tsx           # Sticky navigation bar
```
