'use strict';

/**
 * A1 — Main orchestrator
 *
 * A1 is a music and mood empowerment AI that:
 *   1. Detects the user's mood from free-form text.
 *   2. Recommends songs that either amplify or gently shift that mood.
 *   3. Sings personalised lyrics to uplift the individual.
 *
 * Usage:
 *   const a1 = new A1({ userName: 'Alex' });
 *   const response = a1.respond("I'm feeling a bit sad today");
 *   console.log(response.text);
 */

const { detectMood } = require('./moodDetector');
const { recommendSongs, formatRecommendation } = require('./musicRecommender');
const { generateLyrics, presentLyrics } = require('./lyricsGenerator');

class A1 {
  /**
   * @param {object}  [options={}]
   * @param {string}  [options.userName='']         - User's name for personalisation.
   * @param {number}  [options.recommendationCount=5] - Songs per playlist.
   * @param {boolean} [options.singLyrics=true]     - Whether A1 sings lyrics.
   */
  constructor(options = {}) {
    this.userName = options.userName || '';
    this.recommendationCount = options.recommendationCount ?? 5;
    this.singLyrics = options.singLyrics !== undefined ? options.singLyrics : true;
  }

  /**
   * Analyse user input and return a full A1 music + lyrics response.
   *
   * @param {string} userInput - How the user is feeling, in their own words.
   * @param {'amplify'|'shift'} [strategy='amplify']
   *   - 'amplify': enhance the current mood.
   *   - 'shift'  : guide towards a better mood.
   * @returns {{
   *   detectedMood: string,
   *   confidence: number,
   *   strategy: string,
   *   recommendation: object,
   *   lyrics: string,
   *   text: string
   * }}
   */
  respond(userInput, strategy = 'amplify') {
    // 1. Detect mood
    const { dominantMood, confidence, scores } = detectMood(userInput);

    // 2. Recommend songs
    const recommendation = recommendSongs(dominantMood, strategy, this.recommendationCount);

    // 3. Generate and present personalised lyrics
    const rawLyrics = generateLyrics(dominantMood, this.userName);
    const lyricsBlock = presentLyrics(rawLyrics, dominantMood, this.userName);

    // 4. Build combined text output
    const playlistText = formatRecommendation(recommendation, this.userName);
    const fullText = this.singLyrics
      ? `${playlistText}\n\n${lyricsBlock}`
      : playlistText;

    return {
      detectedMood: dominantMood,
      confidence,
      scores,
      strategy,
      recommendation,
      lyrics: rawLyrics,
      text: fullText,
    };
  }

  /**
   * Recommend songs only (without lyrics) for the given mood and strategy.
   *
   * @param {string} mood
   * @param {'amplify'|'shift'} [strategy='amplify']
   * @returns {object} Recommendation object.
   */
  recommend(mood, strategy = 'amplify') {
    return recommendSongs(mood, strategy, this.recommendationCount);
  }

  /**
   * Sing personalised lyrics for a given mood.
   *
   * @param {string} mood
   * @returns {string} Formatted lyrics block.
   */
  sing(mood) {
    const lyrics = generateLyrics(mood, this.userName);
    return presentLyrics(lyrics, mood, this.userName);
  }
}

module.exports = { A1 };
