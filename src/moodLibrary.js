/**
 * A1 Mood Library
 *
 * A curated database of songs organized by mood. Each entry includes the
 * song title, artist, genre, and the mood(s) it belongs to.
 *
 * Supported moods: happy, sad, calm, energetic, hopeful
 */

const MOOD_LIBRARY = {
  happy: [
    { title: "Happy", artist: "Pharrell Williams", genre: "pop" },
    { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", genre: "pop" },
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", genre: "pop/funk" },
    { title: "Walking on Sunshine", artist: "Katrina and the Waves", genre: "pop" },
    { title: "Good as Hell", artist: "Lizzo", genre: "pop/R&B" },
    { title: "Shake It Off", artist: "Taylor Swift", genre: "pop" },
    { title: "Dance Monkey", artist: "Tones and I", genre: "pop" },
  ],
  sad: [
    { title: "Someone Like You", artist: "Adele", genre: "pop/ballad" },
    { title: "The Night Will Always Win", artist: "Manchester Orchestra", genre: "indie rock" },
    { title: "Fix You", artist: "Coldplay", genre: "alternative rock" },
    { title: "Let Her Go", artist: "Passenger", genre: "acoustic/folk" },
    { title: "Say Something", artist: "A Great Big World", genre: "pop/piano ballad" },
    { title: "Skinny Love", artist: "Bon Iver", genre: "indie folk" },
    { title: "The Night We Met", artist: "Lord Huron", genre: "indie folk" },
  ],
  calm: [
    { title: "Weightless", artist: "Marconi Union", genre: "ambient" },
    { title: "Clair de Lune", artist: "Claude Debussy", genre: "classical" },
    { title: "Chasing Cars", artist: "Snow Patrol", genre: "alternative rock" },
    { title: "Banana Pancakes", artist: "Jack Johnson", genre: "acoustic pop" },
    { title: "Coffee", artist: "beabadoobee", genre: "lo-fi/indie pop" },
    { title: "Comptine d'un autre été", artist: "Yann Tiersen", genre: "classical/piano" },
    { title: "River Flows in You", artist: "Yiruma", genre: "classical/piano" },
  ],
  energetic: [
    { title: "Eye of the Tiger", artist: "Survivor", genre: "rock" },
    { title: "Lose Yourself", artist: "Eminem", genre: "hip-hop" },
    { title: "Mr. Brightside", artist: "The Killers", genre: "indie rock" },
    { title: "Don't Stop Me Now", artist: "Queen", genre: "rock" },
    { title: "Thunderstruck", artist: "AC/DC", genre: "hard rock" },
    { title: "Levels", artist: "Avicii", genre: "electronic/EDM" },
    { title: "Stronger", artist: "Kanye West", genre: "hip-hop" },
  ],
  hopeful: [
    { title: "Here Comes the Sun", artist: "The Beatles", genre: "pop rock" },
    { title: "Beautiful Day", artist: "U2", genre: "alternative rock" },
    { title: "Rise Up", artist: "Andra Day", genre: "R&B/gospel" },
    { title: "Brave", artist: "Sara Bareilles", genre: "pop" },
    { title: "Count on Me", artist: "Bruno Mars", genre: "pop/acoustic" },
    { title: "Somewhere Over the Rainbow", artist: "Israel Kamakawiwoʻole", genre: "folk/ukulele" },
    { title: "A Sky Full of Stars", artist: "Coldplay", genre: "alternative/electronic" },
  ],
};

/**
 * Defines which mood to transition to when shifting the user's mood.
 * e.g. if the user is sad, shifting leads to "hopeful".
 */
const MOOD_SHIFT_MAP = {
  sad: "hopeful",
  energetic: "calm",
  happy: "calm",
  calm: "energetic",
  hopeful: "happy",
};

module.exports = { MOOD_LIBRARY, MOOD_SHIFT_MAP };
