'use strict';

/**
 * A1 Mood Library
 *
 * A curated database of songs categorised by mood. Each entry contains:
 *   - title   : song title
 *   - artist  : performing artist
 *   - genre   : musical genre
 *   - bpm     : approximate tempo (beats per minute)
 *   - tags    : extra descriptive tags
 */

/** @type {Record<string, Array<{title:string, artist:string, genre:string, bpm:number, tags:string[]}>>} */
const MOOD_LIBRARY = {
  happy: [
    { title: 'Happy', artist: 'Pharrell Williams', genre: 'pop', bpm: 160, tags: ['upbeat', 'feel-good', 'dance'] },
    { title: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake', genre: 'pop', bpm: 113, tags: ['dance', 'fun', 'energetic'] },
    { title: 'Good as Hell', artist: 'Lizzo', genre: 'pop', bpm: 96, tags: ['empowerment', 'upbeat', 'feel-good'] },
    { title: 'Walking on Sunshine', artist: 'Katrina and the Waves', genre: 'pop', bpm: 109, tags: ['classic', 'uplifting', 'bright'] },
    { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', genre: 'funk-pop', bpm: 115, tags: ['groove', 'fun', 'dance'] },
    { title: 'I Gotta Feeling', artist: 'The Black Eyed Peas', genre: 'pop', bpm: 128, tags: ['party', 'celebration', 'energetic'] },
    { title: 'Shake It Off', artist: 'Taylor Swift', genre: 'pop', bpm: 160, tags: ['carefree', 'dance', 'upbeat'] },
  ],

  sad: [
    { title: 'The Night We Met', artist: 'Lord Huron', genre: 'indie', bpm: 80, tags: ['melancholy', 'heartbreak', 'slow'] },
    { title: 'Someone Like You', artist: 'Adele', genre: 'pop-ballad', bpm: 67, tags: ['heartbreak', 'longing', 'piano'] },
    { title: 'Skinny Love', artist: 'Bon Iver', genre: 'indie-folk', bpm: 76, tags: ['melancholy', 'acoustic', 'raw'] },
    { title: 'Fix You', artist: 'Coldplay', genre: 'alternative', bpm: 69, tags: ['comforting', 'hopeful', 'emotional'] },
    { title: 'Breathe (2 AM)', artist: 'Anna Nalick', genre: 'pop', bpm: 80, tags: ['soft', 'comforting', 'piano'] },
    { title: 'All I Want', artist: 'Kodaline', genre: 'indie', bpm: 76, tags: ['longing', 'gentle', 'heartfelt'] },
    { title: 'Hurt', artist: 'Johnny Cash', genre: 'country', bpm: 50, tags: ['raw', 'grief', 'acoustic'] },
  ],

  calm: [
    { title: 'Weightless', artist: 'Marconi Union', genre: 'ambient', bpm: 60, tags: ['relaxation', 'meditative', 'soothing'] },
    { title: 'Clair de Lune', artist: 'Claude Debussy', genre: 'classical', bpm: 54, tags: ['piano', 'serene', 'classical'] },
    { title: 'River Flows in You', artist: 'Yiruma', genre: 'classical', bpm: 68, tags: ['piano', 'gentle', 'peaceful'] },
    { title: 'Holocene', artist: 'Bon Iver', genre: 'indie-folk', bpm: 76, tags: ['serene', 'ambient', 'expansive'] },
    { title: 'Sunset Lover', artist: 'Petit Biscuit', genre: 'electronic', bpm: 85, tags: ['chill', 'lo-fi', 'dreamy'] },
    { title: 'Experience', artist: 'Ludovico Einaudi', genre: 'classical', bpm: 72, tags: ['piano', 'cinematic', 'serene'] },
    { title: 'Golden Hour', artist: 'JVKE', genre: 'indie-pop', bpm: 97, tags: ['warm', 'mellow', 'peaceful'] },
  ],

  energetic: [
    { title: 'Eye of the Tiger', artist: 'Survivor', genre: 'rock', bpm: 109, tags: ['motivation', 'workout', 'powerful'] },
    { title: 'Stronger', artist: 'Kanye West', genre: 'hip-hop', bpm: 104, tags: ['confidence', 'workout', 'power'] },
    { title: 'Lose Yourself', artist: 'Eminem', genre: 'hip-hop', bpm: 87, tags: ['focus', 'motivation', 'intense'] },
    { title: 'Run the World (Girls)', artist: 'Beyoncé', genre: 'pop', bpm: 127, tags: ['empowerment', 'energetic', 'dance'] },
    { title: 'Thunderstruck', artist: 'AC/DC', genre: 'rock', bpm: 133, tags: ['intense', 'powerful', 'adrenaline'] },
    { title: 'Don\'t Stop Me Now', artist: 'Queen', genre: 'rock', bpm: 156, tags: ['high-energy', 'fun', 'powerful'] },
    { title: 'Levels', artist: 'Avicii', genre: 'electronic', bpm: 126, tags: ['euphoric', 'dance', 'uplifting'] },
  ],

  angry: [
    { title: 'Break Stuff', artist: 'Limp Bizkit', genre: 'rock', bpm: 116, tags: ['release', 'cathartic', 'intense'] },
    { title: 'Given Up', artist: 'Linkin Park', genre: 'rock', bpm: 101, tags: ['frustration', 'raw', 'intense'] },
    { title: 'Killing in the Name', artist: 'Rage Against the Machine', genre: 'rock', bpm: 102, tags: ['protest', 'intense', 'cathartic'] },
    { title: 'Numb', artist: 'Linkin Park', genre: 'rock', bpm: 105, tags: ['frustration', 'emotional', 'powerful'] },
    { title: 'Smells Like Teen Spirit', artist: 'Nirvana', genre: 'grunge', bpm: 117, tags: ['raw', 'rebellious', 'cathartic'] },
    { title: 'Before He Cheats', artist: 'Carrie Underwood', genre: 'country', bpm: 127, tags: ['cathartic', 'empowerment', 'fierce'] },
    { title: 'Fighter', artist: 'Christina Aguilera', genre: 'pop', bpm: 154, tags: ['empowerment', 'fierce', 'triumphant'] },
  ],

  hopeful: [
    { title: 'Here Comes the Sun', artist: 'The Beatles', genre: 'rock', bpm: 129, tags: ['optimism', 'warm', 'uplifting'] },
    { title: 'Brave', artist: 'Sara Bareilles', genre: 'pop', bpm: 136, tags: ['courage', 'empowerment', 'uplifting'] },
    { title: 'Rise Up', artist: 'Andra Day', genre: 'soul', bpm: 75, tags: ['strength', 'perseverance', 'powerful'] },
    { title: 'Stronger (What Doesn\'t Kill You)', artist: 'Kelly Clarkson', genre: 'pop', bpm: 116, tags: ['resilience', 'empowerment', 'uplifting'] },
    { title: 'Beautiful Day', artist: 'U2', genre: 'rock', bpm: 137, tags: ['optimism', 'uplifting', 'anthemic'] },
    { title: 'Shake It Out', artist: 'Florence + The Machine', genre: 'indie', bpm: 126, tags: ['release', 'renewal', 'powerful'] },
    { title: 'Keep Your Head Up', artist: 'Ben Howard', genre: 'folk', bpm: 96, tags: ['gentle', 'encouragement', 'warm'] },
  ],
};

/** All recognised mood names. */
const MOODS = Object.keys(MOOD_LIBRARY);

/**
 * Retrieve songs for a given mood.
 * @param {string} mood
 * @returns {Array<{title:string, artist:string, genre:string, bpm:number, tags:string[]}>}
 */
function getSongsForMood(mood) {
  const key = mood.toLowerCase();
  return MOOD_LIBRARY[key] ? [...MOOD_LIBRARY[key]] : [];
}

/**
 * Return all moods available in the library.
 * @returns {string[]}
 */
function getAvailableMoods() {
  return [...MOODS];
}

module.exports = { MOOD_LIBRARY, MOODS, getSongsForMood, getAvailableMoods };
