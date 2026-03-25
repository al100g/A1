# A1

> A music and mood empowerment AI that detects emotions, recommends songs, and sings personalised lyrics.

---

## Features

| Feature | Description |
|---|---|
| **Mood Detection** | Analyses free-form text and scores it against six emotions: `happy`, `sad`, `calm`, `energetic`, `angry`, `hopeful`. |
| **Song Recommendations** | Returns a playlist from a curated song library matched to the detected mood. |
| **Amplify or Shift** | Choose to *amplify* the current mood or *shift* towards a healthier one (e.g. sad → hopeful). |
| **Personalised Lyrics** | A1 sings a short verse customised with the user's name and current emotion. |

---

## Project Structure

```
src/
  moodLibrary.js      — Curated song database categorised by mood
  moodDetector.js     — Keyword-based emotion scoring from text input
  musicRecommender.js — Playlist engine with amplify/shift strategies
  lyricsGenerator.js  — Personalised lyric verse generator
  a1.js               — Main A1 class (orchestrates all modules)
tests/
  moodLibrary.test.js
  moodDetector.test.js
  musicRecommender.test.js
  lyricsGenerator.test.js
  a1.test.js
```

---

## Quick Start

```js
const { A1 } = require('./src/a1');

const a1 = new A1({ userName: 'Alex' });

// Detect mood and get a personalised playlist + uplifting lyrics
const response = a1.respond("I've been feeling really sad and lonely today", 'shift');
console.log(response.text);

// Just get song recommendations
const playlist = a1.recommend('energetic', 'amplify');
console.log(playlist.songs);

// Just get personalised lyrics
console.log(a1.sing('hopeful'));
```

---

## API

### `new A1(options?)`

| Option | Type | Default | Description |
|---|---|---|---|
| `userName` | `string` | `''` | User's name for personalisation. |
| `recommendationCount` | `number` | `5` | Songs to return per playlist. |
| `singLyrics` | `boolean` | `true` | Whether A1 appends a lyric verse. |

### `a1.respond(userInput, strategy?)`

Detect mood from text, recommend songs, and optionally sing lyrics.

- `userInput` — free-form text describing how the user feels.
- `strategy` — `'amplify'` (default) or `'shift'`.
- Returns `{ detectedMood, confidence, scores, strategy, recommendation, lyrics, text }`.

### `a1.recommend(mood, strategy?)`

Returns a `{ strategy, sourceMood, targetMood, songs }` object.

### `a1.sing(mood)`

Returns a formatted lyric block personalised with the user's name.

---

## Running Tests

```bash
npm install
npm test
```

All 78 tests pass with **100% code coverage**.

---

## Supported Moods

| Mood | Shifts To | Example Songs |
|---|---|---|
| `happy` | — (amplified) | *Happy* — Pharrell Williams, *Shake It Off* — Taylor Swift |
| `sad` | `hopeful` | *Someone Like You* — Adele, *Fix You* — Coldplay |
| `calm` | `happy` | *Weightless* — Marconi Union, *Clair de Lune* — Debussy |
| `energetic` | `calm` | *Eye of the Tiger* — Survivor, *Don't Stop Me Now* — Queen |
| `angry` | `calm` | *Fighter* — Christina Aguilera, *Numb* — Linkin Park |
| `hopeful` | `happy` | *Brave* — Sara Bareilles, *Rise Up* — Andra Day |
