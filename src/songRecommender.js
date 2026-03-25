/**
 * A1 Song Recommender
 *
 * Recommends songs to the user based on their detected mood.
 * Supports two recommendation modes:
 *   - "amplify"  : Suggest songs that match and reinforce the current mood.
 *   - "shift"    : Suggest songs that gently transition the user to a different mood.
 */

const { MOOD_LIBRARY, MOOD_SHIFT_MAP } = require("./moodLibrary");

const SUPPORTED_MOODS = Object.keys(MOOD_LIBRARY);

/**
 * Returns a random subset of items from an array.
 *
 * @param {Array} array - Source array.
 * @param {number} count - Number of items to pick.
 * @returns {Array} Randomly selected items.
 */
function pickRandom(array, count) {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Recommends songs based on a detected mood.
 *
 * @param {string} mood     - Detected mood (e.g. "happy", "sad", "calm", "energetic", "hopeful").
 * @param {string} [mode="amplify"] - Recommendation mode: "amplify" or "shift".
 * @param {number} [count=3]        - Number of songs to recommend.
 * @returns {{ mood: string, targetMood: string, songs: Array<{title: string, artist: string, genre: string}> }}
 *
 * @throws {Error} If the mood is not supported.
 * @throws {Error} If the mode is not "amplify" or "shift".
 */
function recommendSongs(mood, mode = "amplify", count = 3) {
  const normalizedMood = (mood || "").toLowerCase().trim();

  if (!SUPPORTED_MOODS.includes(normalizedMood)) {
    throw new Error(
      `Unsupported mood: "${mood}". Supported moods are: ${SUPPORTED_MOODS.join(", ")}.`
    );
  }

  if (!["amplify", "shift"].includes(mode)) {
    throw new Error(`Unsupported mode: "${mode}". Use "amplify" or "shift".`);
  }

  const targetMood =
    mode === "shift" ? MOOD_SHIFT_MAP[normalizedMood] : normalizedMood;

  const songs = pickRandom(MOOD_LIBRARY[targetMood], count);

  return {
    mood: normalizedMood,
    targetMood,
    songs,
  };
}

/**
 * Formats a recommendation result into a human-readable string for display.
 *
 * @param {{ mood: string, targetMood: string, songs: Array }} recommendation
 * @returns {string}
 */
function formatRecommendation(recommendation) {
  const { mood, targetMood, songs } = recommendation;

  const moodLabel =
    mood === targetMood
      ? `You're feeling ${mood} — here are some songs to keep that vibe going:`
      : `You're feeling ${mood} — here are some songs to help shift your mood to ${targetMood}:`;

  const songList = songs
    .map((s, i) => `  ${i + 1}. "${s.title}" by ${s.artist} (${s.genre})`)
    .join("\n");

  return `${moodLabel}\n${songList}`;
}

module.exports = { recommendSongs, formatRecommendation, SUPPORTED_MOODS };
