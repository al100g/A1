'use strict';

/**
 * A1 Music Recommender
 *
 * Recommends songs from the mood library based on the user's detected emotion.
 * Supports two strategies:
 *   - "amplify"  : stay in the current mood and enhance it.
 *   - "shift"    : move towards a target mood (e.g. sad → hopeful).
 */

const { getSongsForMood } = require('./moodLibrary');

/**
 * Mood transition map — where to shift to when the user wants to change mood.
 * @type {Record<string, string>}
 */
const MOOD_SHIFT_MAP = {
  sad: 'hopeful',
  angry: 'calm',
  hopeful: 'happy',
  calm: 'happy',
  energetic: 'calm',
  happy: 'happy', // already positive — amplify
};

/**
 * Return a shuffled copy of an array (Fisher-Yates).
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Recommend songs for the user.
 *
 * @param {string} mood          - The user's detected (or stated) mood.
 * @param {'amplify'|'shift'} strategy
 *   - 'amplify': recommend songs that enhance the current mood.
 *   - 'shift'  : recommend songs that gently move towards a better mood.
 * @param {number} [count=5]    - Number of songs to return.
 * @returns {{
 *   strategy: string,
 *   sourceMood: string,
 *   targetMood: string,
 *   songs: Array<{title:string, artist:string, genre:string, bpm:number, tags:string[]}>
 * }}
 */
function recommendSongs(mood, strategy = 'amplify', count = 5) {
  const normalised = mood.toLowerCase();

  let targetMood;
  if (strategy === 'shift') {
    targetMood = MOOD_SHIFT_MAP[normalised] || 'calm';
  } else {
    targetMood = normalised;
  }

  const pool = shuffle(getSongsForMood(targetMood));
  const songs = pool.slice(0, Math.max(1, count));

  return {
    strategy,
    sourceMood: normalised,
    targetMood,
    songs,
  };
}

/**
 * Build a human-readable playlist description.
 *
 * @param {{ strategy: string, sourceMood: string, targetMood: string, songs: Array }} recommendation
 * @param {string} [userName=''] - Optional user name for personalisation.
 * @returns {string}
 */
function formatRecommendation(recommendation, userName = '') {
  const { strategy, sourceMood, targetMood, songs } = recommendation;
  const greeting = userName ? `${userName}, ` : '';

  let intro;
  if (strategy === 'shift') {
    intro = `${greeting}I hear you're feeling ${sourceMood}. Here's a playlist to guide you towards a more ${targetMood} place 🎵`;
  } else {
    intro = `${greeting}Let's keep that ${sourceMood} energy going! Here's your ${targetMood} playlist 🎵`;
  }

  const trackList = songs
    .map((s, i) => `  ${i + 1}. "${s.title}" — ${s.artist} (${s.genre}, ~${s.bpm} BPM)`)
    .join('\n');

  return `${intro}\n\n${trackList}`;
}

module.exports = { recommendSongs, formatRecommendation, MOOD_SHIFT_MAP };
