'use strict';

/**
 * A1 Lyrics Generator
 *
 * Generates short, personalised uplifting lyrics tailored to the user's
 * name and current emotional state.  Uses template verses so no external
 * API is needed.
 */

/**
 * Verse templates keyed by mood.
 * Each template may include:
 *   {{name}}  — replaced with the user's name (or "friend" if not provided).
 *   {{mood}}  — replaced with the detected mood word.
 *
 * @type {Record<string, string[]>}
 */
const VERSE_TEMPLATES = {
  happy: [
    `Hey {{name}}, you're glowing today,\nThe sunshine follows you all the way,\nEvery step a rhythm, every breath a song,\nWith joy like yours, nothing can go wrong.`,
    `{{name}}, your laughter lights the room,\nBanishing every shadow, every gloom,\nKeep dancing through life at your own pace,\nThe world is brighter with your smiling face.`,
    `Rise and shine, oh wonderful {{name}},\nYour {{mood}} heart leads you every day,\nLet the music carry you up high,\nYou're the reason the stars light up the sky.`,
  ],

  sad: [
    `Hey {{name}}, I see your tears tonight,\nBut even in the dark there is a light,\nEvery storm must pass, the skies clear through,\nThe world is still so beautiful — and so are you.`,
    `{{name}}, it's okay to feel the rain,\nEvery drop of sadness washes pain,\nHold on tight, the dawn is coming soon,\nYou'll find your smile beneath the silver moon.`,
    `Brave {{name}}, you carry so much weight,\nBut you are stronger than you think — it's not too late,\nLet the music hold you, let the melody say,\nYou are loved, you matter, and you'll be okay.`,
  ],

  calm: [
    `{{name}}, breathe in the quiet air,\nLet go of every worry, every care,\nThe world can wait — this moment is yours,\nFloat on gentle waves to peaceful shores.`,
    `Still waters flow around you, {{name}},\nA gentle hum to carry you through the day,\nClose your eyes and let the music be,\nA tranquil song of who you're meant to be.`,
    `Soft and slow, the melody drifts for you, {{name}},\nA lullaby of skies forever blue,\nRest your mind, let your spirit roam free,\nIn this {{mood}} moment you are all you need to be.`,
  ],

  energetic: [
    `Go, {{name}}, go — you're built to soar,\nEvery obstacle just opens one more door,\nThe beat is yours, the rhythm drives you on,\nLight the world on fire before the night is gone.`,
    `{{name}}, you've got fire in your veins,\nBreaking through the walls, bursting all the chains,\nPush harder, run faster, reach up to the sky,\nWith energy like yours there's no limit — fly!`,
    `Let the bass drop, {{name}}, feel the surge,\nEvery muscle, every cell on the verge,\nOf something great, something bold and true,\nThe world has never seen a force like you.`,
  ],

  angry: [
    `{{name}}, I hear the fire inside you roar,\nYou're stronger than the thing that made you sore,\nLet the music carry all that heat away,\nTransform it into power — you'll be okay.`,
    `Channel that storm, {{name}}, let it fuel your rise,\nAnger turned to purpose is the greatest prize,\nThe world may push you down, but you push back,\nYou're on the right road — stay on track.`,
    `Every flame needs air to truly burn, {{name}},\nTurn that rage to rocket fuel and watch you churn,\nThrough barriers and doubters, stand your ground,\nYour triumph is the sweetest, deepest sound.`,
  ],

  hopeful: [
    `{{name}}, the dawn is breaking just for you,\nA brand new chapter painted gold and blue,\nKeep believing in the story yet to come,\nYour best verse hasn't even yet begun.`,
    `Hope is a melody, {{name}}, can you hear it sing?\nA promise of the joy that tomorrow will bring,\nEven the longest night gives way to light,\nYour future is so bright — hold on tight.`,
    `Step by step, {{name}}, you're closer than you know,\nEvery seed of {{mood}} is the start of something to grow,\nThe mountains you've climbed have made you strong and tall,\nRise again — you'll rise after every fall.`,
  ],
};

/** Fallback verse when no mood match is found. */
const FALLBACK_VERSE = `Hey {{name}}, you are one of a kind,\nA beautiful soul with a beautiful mind,\nWhatever you feel, wherever you roam,\nMusic is here to carry you home.`;

/**
 * Select a verse template for the given mood, replacing placeholders.
 *
 * @param {string} mood      - The user's current mood.
 * @param {string} [name=''] - The user's name.
 * @returns {string}         - The generated lyric verse.
 */
function generateLyrics(mood, name = '') {
  const displayName = name && name.trim() ? name.trim() : 'friend';
  const key = mood.toLowerCase();

  const templates = VERSE_TEMPLATES[key];
  const template = templates
    ? templates[Math.floor(Math.random() * templates.length)]
    : FALLBACK_VERSE;

  return template
    .replace(/\{\{name\}\}/g, displayName)
    .replace(/\{\{mood\}\}/g, key);
}

/**
 * Format the generated lyrics as a singable presentation block.
 *
 * @param {string} lyrics    - Raw lyrics text.
 * @param {string} mood      - Detected mood, used in the header.
 * @param {string} [name=''] - User name for the header.
 * @returns {string}
 */
function presentLyrics(lyrics, mood, name = '') {
  const displayName = name && name.trim() ? name.trim() : 'friend';
  const header = `🎤 A1 sings just for ${displayName} (feeling ${mood}):`;
  const divider = '─'.repeat(Math.min(header.length, 60));
  return `${header}\n${divider}\n${lyrics}\n${divider}`;
}

module.exports = { generateLyrics, presentLyrics, VERSE_TEMPLATES };
