'use strict';

/**
 * A1 Mood Detector
 *
 * Analyses free-form text and returns a scored map of detected moods.
 * Uses a keyword-based scoring approach so no external API is required.
 */

/** @typedef {'happy'|'sad'|'calm'|'energetic'|'angry'|'hopeful'} Mood */

/**
 * Keyword banks for each mood.
 * Each word carries a weight (default 1). Higher weight = stronger signal.
 * @type {Record<string, Array<{word:string, weight:number}>>}
 */
const MOOD_KEYWORDS = {
  happy: [
    { word: 'happy', weight: 2 }, { word: 'joy', weight: 2 }, { word: 'joyful', weight: 2 },
    { word: 'excited', weight: 1.5 }, { word: 'great', weight: 1 }, { word: 'amazing', weight: 1.5 },
    { word: 'wonderful', weight: 1.5 }, { word: 'fantastic', weight: 1.5 }, { word: 'good', weight: 1 },
    { word: 'love', weight: 1 }, { word: 'laugh', weight: 1 }, { word: 'smile', weight: 1 },
    { word: 'celebrate', weight: 1.5 }, { word: 'fun', weight: 1 }, { word: 'cheerful', weight: 2 },
    { word: 'elated', weight: 2 }, { word: 'delighted', weight: 2 }, { word: 'bliss', weight: 2 },
    { word: 'thrilled', weight: 1.5 }, { word: 'upbeat', weight: 1.5 },
  ],
  sad: [
    { word: 'sad', weight: 2 }, { word: 'cry', weight: 2 }, { word: 'crying', weight: 2 },
    { word: 'depressed', weight: 2 }, { word: 'lonely', weight: 2 }, { word: 'miss', weight: 1 },
    { word: 'missing', weight: 1 }, { word: 'heartbroken', weight: 2 }, { word: 'grief', weight: 2 },
    { word: 'grieve', weight: 2 }, { word: 'lost', weight: 1 }, { word: 'hurt', weight: 1.5 },
    { word: 'pain', weight: 1.5 }, { word: 'unhappy', weight: 2 }, { word: 'miserable', weight: 2 },
    { word: 'down', weight: 1 }, { word: 'blue', weight: 1 }, { word: 'tears', weight: 1.5 },
    { word: 'hopeless', weight: 1.5 }, { word: 'broken', weight: 1.5 },
  ],
  calm: [
    { word: 'calm', weight: 2 }, { word: 'relaxed', weight: 2 }, { word: 'peaceful', weight: 2 },
    { word: 'serene', weight: 2 }, { word: 'chill', weight: 1.5 }, { word: 'quiet', weight: 1 },
    { word: 'still', weight: 1 }, { word: 'tranquil', weight: 2 }, { word: 'mellow', weight: 1.5 },
    { word: 'easy', weight: 1 }, { word: 'rest', weight: 1 }, { word: 'breathe', weight: 1 },
    { word: 'meditate', weight: 1.5 }, { word: 'zen', weight: 1.5 }, { word: 'soothing', weight: 1.5 },
  ],
  energetic: [
    { word: 'energetic', weight: 2 }, { word: 'energy', weight: 1.5 }, { word: 'pumped', weight: 2 },
    { word: 'motivated', weight: 2 }, { word: 'workout', weight: 1.5 }, { word: 'exercise', weight: 1.5 },
    { word: 'run', weight: 1 }, { word: 'running', weight: 1 }, { word: 'active', weight: 1 },
    { word: 'power', weight: 1 }, { word: 'strong', weight: 1.5 }, { word: 'focused', weight: 1.5 },
    { word: 'hustle', weight: 1.5 }, { word: 'driven', weight: 1.5 }, { word: 'fired up', weight: 2 },
    { word: 'unstoppable', weight: 2 }, { word: 'hype', weight: 1.5 }, { word: 'hyped', weight: 1.5 },
  ],
  angry: [
    { word: 'angry', weight: 2 }, { word: 'anger', weight: 2 }, { word: 'furious', weight: 2 },
    { word: 'frustrated', weight: 2 }, { word: 'mad', weight: 1.5 }, { word: 'rage', weight: 2 },
    { word: 'hate', weight: 1.5 }, { word: 'annoyed', weight: 1.5 }, { word: 'irritated', weight: 1.5 },
    { word: 'upset', weight: 1 }, { word: 'fed up', weight: 1.5 }, { word: 'livid', weight: 2 },
    { word: 'outraged', weight: 2 }, { word: 'resentful', weight: 1.5 },
  ],
  hopeful: [
    { word: 'hopeful', weight: 2 }, { word: 'hope', weight: 1.5 }, { word: 'optimistic', weight: 2 },
    { word: 'better', weight: 1 }, { word: 'improve', weight: 1 }, { word: 'future', weight: 1 },
    { word: 'believe', weight: 1.5 }, { word: 'faith', weight: 1.5 }, { word: 'grateful', weight: 1.5 },
    { word: 'thankful', weight: 1.5 }, { word: 'inspired', weight: 2 }, { word: 'courage', weight: 1.5 },
    { word: 'brave', weight: 1.5 }, { word: 'determined', weight: 1.5 }, { word: 'persevere', weight: 1.5 },
    { word: 'rise', weight: 1 }, { word: 'overcome', weight: 1.5 }, { word: 'grow', weight: 1 },
  ],
};

/**
 * Detect and score moods present in the provided text.
 *
 * @param {string} text - Free-form text describing how the user feels.
 * @returns {{ scores: Record<string, number>, dominantMood: string, confidence: number }}
 *   `scores`       — normalised score (0–1) per mood.
 *   `dominantMood` — highest-scoring mood.
 *   `confidence`   — normalised score of the dominant mood (0–1).
 */
function detectMood(text) {
  if (typeof text !== 'string' || text.trim() === '') {
    return { scores: {}, dominantMood: 'calm', confidence: 0 };
  }

  const lower = text.toLowerCase();
  const rawScores = {};

  for (const [mood, keywords] of Object.entries(MOOD_KEYWORDS)) {
    let score = 0;
    for (const { word, weight } of keywords) {
      // Use word-boundary matching to avoid partial hits (e.g. "go" inside "good")
      const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'gi');
      const matches = lower.match(pattern);
      if (matches) {
        score += matches.length * weight;
      }
    }
    rawScores[mood] = score;
  }

  // Normalise to 0-1 range
  const maxScore = Math.max(...Object.values(rawScores), 1);
  const scores = {};
  let dominantMood = 'calm';
  let highestScore = 0;

  for (const [mood, score] of Object.entries(rawScores)) {
    scores[mood] = score / maxScore;
    if (scores[mood] > highestScore) {
      highestScore = scores[mood];
      dominantMood = mood;
    }
  }

  return { scores, dominantMood, confidence: highestScore };
}

/**
 * Escape special regex characters in a string.
 * @param {string} str
 * @returns {string}
 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { detectMood, MOOD_KEYWORDS };
