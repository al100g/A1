'use strict';

const { MOOD_LIBRARY, MOODS, getSongsForMood, getAvailableMoods } = require('../src/moodLibrary');

describe('moodLibrary', () => {
  describe('MOODS', () => {
    it('contains the six expected moods', () => {
      expect(MOODS).toEqual(expect.arrayContaining(['happy', 'sad', 'calm', 'energetic', 'angry', 'hopeful']));
    });
  });

  describe('getAvailableMoods()', () => {
    it('returns an array matching MOODS', () => {
      expect(getAvailableMoods()).toEqual(MOODS);
    });

    it('returns a new array each time (not a reference)', () => {
      const a = getAvailableMoods();
      const b = getAvailableMoods();
      expect(a).toEqual(b);
      expect(a).not.toBe(b);
    });
  });

  describe('getSongsForMood()', () => {
    it('returns songs for every known mood', () => {
      for (const mood of MOODS) {
        const songs = getSongsForMood(mood);
        expect(Array.isArray(songs)).toBe(true);
        expect(songs.length).toBeGreaterThan(0);
      }
    });

    it('returns songs with the required shape', () => {
      const songs = getSongsForMood('happy');
      for (const song of songs) {
        expect(typeof song.title).toBe('string');
        expect(typeof song.artist).toBe('string');
        expect(typeof song.genre).toBe('string');
        expect(typeof song.bpm).toBe('number');
        expect(Array.isArray(song.tags)).toBe(true);
      }
    });

    it('is case-insensitive', () => {
      const lower = getSongsForMood('happy');
      const upper = getSongsForMood('HAPPY');
      const mixed = getSongsForMood('Happy');
      expect(lower).toEqual(upper);
      expect(lower).toEqual(mixed);
    });

    it('returns an empty array for an unknown mood', () => {
      expect(getSongsForMood('unknown-mood')).toEqual([]);
    });

    it('does not return the library reference (modifications are isolated)', () => {
      const songs = getSongsForMood('happy');
      songs.push({ title: 'Fake', artist: 'Test', genre: 'test', bpm: 0, tags: [] });
      const songs2 = getSongsForMood('happy');
      expect(songs2.find(s => s.title === 'Fake')).toBeUndefined();
    });
  });

  describe('MOOD_LIBRARY structure', () => {
    it('every mood has at least 5 songs', () => {
      for (const mood of MOODS) {
        expect(MOOD_LIBRARY[mood].length).toBeGreaterThanOrEqual(5);
      }
    });

    it('all BPM values are positive numbers', () => {
      for (const songs of Object.values(MOOD_LIBRARY)) {
        for (const song of songs) {
          expect(song.bpm).toBeGreaterThan(0);
        }
      }
    });
  });
});
