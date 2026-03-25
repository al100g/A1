'use strict';

const { recommendSongs, formatRecommendation, MOOD_SHIFT_MAP } = require('../src/musicRecommender');
const { MOODS } = require('../src/moodLibrary');

describe('musicRecommender', () => {
  describe('recommendSongs()', () => {
    it('returns an object with the expected shape', () => {
      const result = recommendSongs('happy', 'amplify', 3);
      expect(result).toMatchObject({
        strategy: 'amplify',
        sourceMood: 'happy',
        targetMood: 'happy',
      });
      expect(Array.isArray(result.songs)).toBe(true);
    });

    it('returns the requested number of songs', () => {
      const result = recommendSongs('happy', 'amplify', 3);
      expect(result.songs.length).toBe(3);
    });

    it('defaults to 5 songs when count is not provided', () => {
      const result = recommendSongs('happy');
      expect(result.songs.length).toBe(5);
    });

    it('amplify strategy targets the same mood', () => {
      for (const mood of MOODS) {
        const result = recommendSongs(mood, 'amplify');
        expect(result.targetMood).toBe(mood);
      }
    });

    it('shift strategy targets a different or improved mood', () => {
      const result = recommendSongs('sad', 'shift');
      expect(result.targetMood).toBe(MOOD_SHIFT_MAP['sad']);
      expect(result.sourceMood).toBe('sad');
    });

    it('shift strategy for "angry" targets "calm"', () => {
      const result = recommendSongs('angry', 'shift');
      expect(result.targetMood).toBe('calm');
    });

    it('songs have the correct shape', () => {
      const { songs } = recommendSongs('calm', 'amplify', 5);
      for (const song of songs) {
        expect(typeof song.title).toBe('string');
        expect(typeof song.artist).toBe('string');
        expect(typeof song.genre).toBe('string');
        expect(typeof song.bpm).toBe('number');
        expect(Array.isArray(song.tags)).toBe(true);
      }
    });

    it('normalises mood to lower case', () => {
      const result = recommendSongs('HAPPY', 'amplify', 3);
      expect(result.sourceMood).toBe('happy');
    });

    it('always returns at least 1 song even when count is 0', () => {
      const result = recommendSongs('happy', 'amplify', 0);
      expect(result.songs.length).toBeGreaterThanOrEqual(1);
    });

    it('defaults to "calm" for an unknown shift target', () => {
      const result = recommendSongs('unknownmood', 'shift');
      expect(result.targetMood).toBe('calm');
    });
  });

  describe('formatRecommendation()', () => {
    it('includes the song titles in the output', () => {
      const recommendation = recommendSongs('happy', 'amplify', 3);
      const text = formatRecommendation(recommendation);
      for (const song of recommendation.songs) {
        expect(text).toContain(song.title);
      }
    });

    it('includes the user name when provided', () => {
      const recommendation = recommendSongs('happy', 'amplify', 3);
      const text = formatRecommendation(recommendation, 'Alex');
      expect(text).toContain('Alex');
    });

    it('works without a user name', () => {
      const recommendation = recommendSongs('happy', 'amplify', 3);
      expect(() => formatRecommendation(recommendation)).not.toThrow();
    });

    it('mentions source mood in shift strategy output', () => {
      const recommendation = recommendSongs('sad', 'shift', 3);
      const text = formatRecommendation(recommendation);
      expect(text).toContain('sad');
    });

    it('returns a non-empty string', () => {
      const recommendation = recommendSongs('calm', 'amplify', 2);
      expect(formatRecommendation(recommendation).length).toBeGreaterThan(0);
    });
  });

  describe('MOOD_SHIFT_MAP', () => {
    it('covers all six moods', () => {
      for (const mood of MOODS) {
        expect(MOOD_SHIFT_MAP[mood]).toBeDefined();
      }
    });

    it('every target mood exists in the library', () => {
      for (const target of Object.values(MOOD_SHIFT_MAP)) {
        expect(MOODS).toContain(target);
      }
    });
  });
});
