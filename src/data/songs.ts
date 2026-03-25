export type Mood = 'Happy' | 'Sad' | 'Calm' | 'Excited' | 'Hopeful' | 'Angry';
export type Genre = 'Pop' | 'Rock' | 'Jazz' | 'Classical' | 'Electronic' | 'Acoustic';

export interface Song {
  id: string;
  title: string;
  mood: Mood;
  genre: Genre;
  lyrics: string;
  melodyDescription: string;
  tempo: string;
  key: string;
  duration: string;
}

export interface Track {
  title: string;
  artist: string;
  duration: string;
}

export interface Playlist {
  id: string;
  name: string;
  mood: Mood;
  trackCount: number;
  duration: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  tags: string[];
  tracks: Track[];
}

const MOODS: Mood[] = ['Happy', 'Sad', 'Calm', 'Excited', 'Hopeful', 'Angry'];
const GENRES: Genre[] = ['Pop', 'Rock', 'Jazz', 'Classical', 'Electronic', 'Acoustic'];

const songMatrix: Record<Mood, Record<Genre, Omit<Song, 'id' | 'mood' | 'genre'>>> = {
  Happy: {
    Pop: {
      title: 'Sunshine & Smiles',
      lyrics: `Verse 1:\nWaking up to golden light,\nEvery moment feels so right.\nDancing through the open door,\nLife is giving me so much more.\n\nChorus:\nI'm on top of the world today,\nNothing's gonna get in my way.\nSunshine pouring through the rain,\nHappy days are here again.\n\nVerse 2:\nLaughter echoing down the street,\nEvery stranger that I meet.\nColors brighter than before,\nHappiness knocking at my door.`,
      melodyDescription: 'Upbeat, bouncy melody with a catchy hook and bright synth stabs.',
      tempo: '128 BPM',
      key: 'C Major',
      duration: '3:24',
    },
    Rock: {
      title: 'Jump Into the Sun',
      lyrics: `Verse 1:\nCranking up the volume loud,\nSinging freely to the crowd.\nGuitar riffs that shake the ground,\nHappiness is all around.\n\nChorus:\nJump into the sun with me,\nFeel the power, wild and free.\nRock the joy from soul to sky,\nWatch our spirits learn to fly.\n\nVerse 2:\nDrums are beating, hearts are soaring,\nThis good feeling keeps on pouring.\nFists are raised and eyes are bright,\nEverything is feeling right.`,
      melodyDescription: 'High-energy rock with crunchy guitar riffs, driving drums, and triumphant bridge.',
      tempo: '145 BPM',
      key: 'E Major',
      duration: '3:48',
    },
    Jazz: {
      title: 'Blue-Sky Bebop',
      lyrics: `Verse 1:\nSwinging through the afternoon,\nHumming a happy little tune.\nSaxophone and piano play,\nJazzing all my blues away.\n\nChorus:\nBlue-sky bebop, here we go,\nLet the joyful music flow.\nSnapping fingers, tapping feet,\nLife's a groovy, golden beat.\n\nVerse 2:\nTrumpet sings the sweetest song,\nAll the good vibes carry on.\nEvery note a celebration,\nPure and joyful jubilation.`,
      melodyDescription: 'Lively bebop-inspired jazz with walking bass, swinging hi-hats, and bright horn lines.',
      tempo: '165 BPM',
      key: 'Bb Major',
      duration: '4:02',
    },
    Classical: {
      title: 'Joyful Overture in C',
      lyrics: `Movement I:\nStrings rise like morning sun,\nA new day has begun.\nFlutes dance and violins sing,\nJoy is the gift they bring.\n\nMovement II:\nPiano cascades, light and free,\nA symphony of jubilee.\nOrchestra in full delight,\nFilling hearts with golden light.\n\nMovement III:\nGrand finale, trumpets high,\nHappy notes across the sky.\nAll the instruments unite,\nIn this joyful, bright delight.`,
      melodyDescription: 'Bright, Mozartian-inspired orchestral piece with soaring strings and triumphant brass.',
      tempo: '120 BPM',
      key: 'C Major',
      duration: '4:35',
    },
    Electronic: {
      title: 'Digital Euphoria',
      lyrics: `Verse 1:\nPixels dancing on the screen,\nBrightest colors ever seen.\nSynths are shining, bass is bright,\nEverything feels out of sight.\n\nChorus:\nDigital euphoria tonight,\nNeon colors, dazzling light.\nBeats are dropping, heart is high,\nFloating through the electric sky.\n\nVerse 2:\nArpeggios and filter sweeps,\nThis incredible feeling never sleeps.\nDrop it down, then take it high,\nTechno joy beneath the sky.`,
      melodyDescription: 'Euphoric EDM with soaring synth leads, festival drops, and uplifting arpeggios.',
      tempo: '138 BPM',
      key: 'F# Major',
      duration: '3:55',
    },
    Acoustic: {
      title: 'Morning Porch Song',
      lyrics: `Verse 1:\nCoffee in my hand at dawn,\nBirds are singing on the lawn.\nGuitar strings beneath my thumb,\nHappy days have finally come.\n\nChorus:\nOn this porch I found my peace,\nAll my worries seem to cease.\nSimple joy in simple things,\nHear the happiness that music brings.\n\nVerse 2:\nSunlight through the maple tree,\nAll of this belongs to me.\nStrum a chord and close my eyes,\nHappiness in no disguise.`,
      melodyDescription: 'Warm fingerpicked acoustic guitar with light percussion and gentle vocals.',
      tempo: '95 BPM',
      key: 'G Major',
      duration: '3:12',
    },
  },
  Sad: {
    Pop: {
      title: 'Rain on My Window',
      lyrics: `Verse 1:\nWatching raindrops trace the glass,\nAll the good times seem to pass.\nEmpty chair across the room,\nHeart is heavy with the gloom.\n\nChorus:\nRain on my window, tears in my eyes,\nLooking for answers in stormy skies.\nWhere did the sunshine go today?\nSomeone I loved just slipped away.\n\nVerse 2:\nPhotographs of better days,\nLost in melancholy haze.\nEven smiles feel out of place,\nMissing your familiar face.`,
      melodyDescription: 'Melancholic pop ballad with sparse piano, lush strings, and emotive vocals.',
      tempo: '68 BPM',
      key: 'A Minor',
      duration: '4:05',
    },
    Rock: {
      title: 'Hollow Ground',
      lyrics: `Verse 1:\nDistortion hums a mournful tune,\nBeneath a cold and faded moon.\nShattered glass on empty floors,\nNobody walks through these doors.\n\nChorus:\nStanding on hollow ground,\nLosing the one thing that I found.\nScreaming but there's no one there,\nHeavy heartache fills the air.\n\nVerse 2:\nMinor chords and broken strings,\nEchoing all the grief it brings.\nAmplifier on full distress,\nMusic healing all the rest.`,
      melodyDescription: 'Heavy, emotionally raw rock with minor key riffs, slow tempo, and cathartic bridge.',
      tempo: '75 BPM',
      key: 'D Minor',
      duration: '4:20',
    },
    Jazz: {
      title: 'Midnight Blue Lament',
      lyrics: `Verse 1:\nSolo trumpet in the night,\nPlaying till the morning light.\nSaxophone cries for what was lost,\nUnderstanding now the cost.\n\nChorus:\nMidnight blue, I feel you,\nEven jazz can't cure this blue.\nEvery note a teardrop falling,\nEchoes of a memory calling.\n\nVerse 2:\nPiano keys so soft and low,\nWatching the last embers glow.\nDouble bass a steady moan,\nEven in jazz, I feel alone.`,
      melodyDescription: 'Slow, moody jazz ballad with muted trumpet, sparse piano, and bittersweet saxophone.',
      tempo: '55 BPM',
      key: 'Eb Minor',
      duration: '5:10',
    },
    Classical: {
      title: 'Adagio for the Lost',
      lyrics: `Movement I:\nStrings descend in quiet grief,\nSearching slowly for relief.\nOboe sings what words can't say,\nMourning what has gone away.\n\nMovement II:\nCello's voice, so deep and low,\nCarrying the sorrow's flow.\nSilent pauses, then a sigh,\nMusic asking the question why.\n\nMovement III:\nGradual swell, then fade to peace,\nFinding where the aching cease.\nFinal note hangs in the air,\nA quiet prayer beyond despair.`,
      melodyDescription: 'Deeply expressive adagio for string quartet with sorrowful cello and oboe solos.',
      tempo: '48 BPM',
      key: 'C Minor',
      duration: '6:15',
    },
    Electronic: {
      title: 'Neon Tears',
      lyrics: `Verse 1:\nGlitch and static fill the void,\nSomething in me is destroyed.\nNeon lights reflect the rain,\nAlgorithms feel my pain.\n\nChorus:\nNeon tears on digital screens,\nProcessing all these broken dreams.\nBeat is slow and bass is low,\nSomewhere I've lost all the glow.\n\nVerse 2:\nSynth pads drifting like a ghost,\nMissing what I wanted most.\nLow-pass filter, dark and deep,\nElectronic lullabies to weep.`,
      melodyDescription: 'Melancholic ambient electronic with slow BPM, detuned synths, and heavy reverb textures.',
      tempo: '72 BPM',
      key: 'G Minor',
      duration: '4:40',
    },
    Acoustic: {
      title: 'Empty Strings',
      lyrics: `Verse 1:\nFingertips on silent frets,\nTrying hard to shake regrets.\nThe song I wrote for you is gone,\nI can't find the will to carry on.\n\nChorus:\nEmpty strings, and empty rooms,\nEcho of old afternoon's perfumes.\nJust me and this guitar tonight,\nTrying to make the darkness light.\n\nVerse 2:\nSoftly now the final chord,\nPlaying every feeling stored.\nTears and notes fall side by side,\nAcoustic songs where grief can hide.`,
      melodyDescription: 'Intimate fingerstyle acoustic with open tuning, sparse arrangement, and raw emotion.',
      tempo: '60 BPM',
      key: 'E Minor',
      duration: '3:45',
    },
  },
  Calm: {
    Pop: {
      title: 'Soft Landing',
      lyrics: `Verse 1:\nBreath by breath the mind unwinds,\nLeaving all the noise behind.\nSilver clouds drift slow and low,\nEasy rivers, gentle flow.\n\nChorus:\nSoft landing, here I rest,\nLaying worries in a nest.\nCalm and quiet, cool and clear,\nEverything I need is here.\n\nVerse 2:\nLavender and chamomile,\nSitting peacefully for a while.\nEvery heartbeat finds its pace,\nSettled in this gentle place.`,
      melodyDescription: 'Gentle pop ballad with soft synth pads, light acoustic guitar, and airy vocals.',
      tempo: '82 BPM',
      key: 'F Major',
      duration: '3:30',
    },
    Rock: {
      title: 'Still Waters',
      lyrics: `Verse 1:\nMuted strings and steady rhythm,\nPeace within the music's prism.\nRock can be a quiet art,\nCalming down the beating heart.\n\nChorus:\nStill waters, still my mind,\nLeaving all the rush behind.\nMellow groove on six bright strings,\nCalm is what this music brings.\n\nVerse 2:\nAlmost whispered vocal lines,\nMellow riffs and clear designs.\nEven rock has peaceful days,\nMoving in its gentle ways.`,
      melodyDescription: 'Mellow alternative rock with clean guitar arpeggios, soft dynamics, and steady groove.',
      tempo: '90 BPM',
      key: 'A Major',
      duration: '3:58',
    },
    Jazz: {
      title: 'Afternoon Reverie',
      lyrics: `Verse 1:\nPiano sips the afternoon,\nLazy clouds beneath the moon.\nTrio swings in easy time,\nMellow melody sublime.\n\nChorus:\nAfternoon reverie,\nJazz is all I need to be free.\nLetting go of all the strain,\nSmooth jazz falling like soft rain.\n\nVerse 2:\nBrush on snare so soft and light,\nDouble bass just feels right.\nFlowing through the chord changes,\nCalm that gently rearranges.`,
      melodyDescription: 'Relaxed cool jazz trio with brushed drums, walking bass, and impressionistic piano chords.',
      tempo: '72 BPM',
      key: 'D Major',
      duration: '4:50',
    },
    Classical: {
      title: 'Pastorale in G',
      lyrics: `Movement I:\nWoodwinds paint a countryside scene,\nGrasslands lush and meadows green.\nViolins like a gentle breeze,\nRustling through the willow trees.\n\nMovement II:\nHarp cascades like a babbling brook,\nOpen every peaceful book.\nFlute and oboe, hand in hand,\nDrawing calm across the land.\n\nMovement III:\nAll resolve to quiet close,\nPeaceful as a sleeping rose.\nNature's symphony at rest,\nCalm and quiet at its best.`,
      melodyDescription: 'Serene pastoral orchestral piece inspired by Beethoven, with woodwinds and harp.',
      tempo: '68 BPM',
      key: 'G Major',
      duration: '5:20',
    },
    Electronic: {
      title: 'Drift & Float',
      lyrics: `Verse 1:\nPad waves wash across the ears,\nDissolving all the anxious fears.\nAmbient textures, slow and wide,\nCalm and steady like the tide.\n\nChorus:\nDrift and float in sonic space,\nElectronic's calm embrace.\nBinaural beats and gentle hum,\nMind and body overcome.\n\nVerse 2:\nHigh-pass filtered morning light,\nSynth clouds drifting through the night.\nMinimal and meditating,\nCalmly, deeply contemplating.`,
      melodyDescription: 'Ambient electronic with slow evolving pads, subtle binaural pulses, and no drums.',
      tempo: '60 BPM',
      key: 'C Major',
      duration: '6:00',
    },
    Acoustic: {
      title: 'Lakeside Serenade',
      lyrics: `Verse 1:\nOpen strings ring clear and true,\nSitting by the lake so blue.\nRipples on the water's face,\nGuitar in the quietest space.\n\nChorus:\nLakeside serenade for one,\nPlaying softly till the sun.\nComes to rest behind the hill,\nEverything is calm and still.\n\nVerse 2:\nBirdsong joins my melody,\nSimple, natural, and free.\nNo applause, no audience here,\nJust the calm of atmosphere.`,
      melodyDescription: 'Delicate fingerstyle guitar with natural harmonics and gentle chord voicings.',
      tempo: '74 BPM',
      key: 'D Major',
      duration: '3:18',
    },
  },
  Excited: {
    Pop: {
      title: 'Firework Rush',
      lyrics: `Verse 1:\nCan't contain this feeling inside,\nBursting energy I can't hide.\nFingers tapping, feet on fire,\nSomething lifting me higher and higher.\n\nChorus:\nFirework rush, light up the sky,\nExcitement has me floating high.\nColors bursting, heart is blazing,\nThis incredible feeling is amazing!\n\nVerse 2:\nPre-chorus building to the drop,\nThis electric feeling won't stop.\nScreaming every word so loud,\nDancing on the top of the cloud.`,
      melodyDescription: 'High-octane pop anthem with anthemic chorus, stadium synths, and soaring bridge.',
      tempo: '140 BPM',
      key: 'D Major',
      duration: '3:20',
    },
    Rock: {
      title: 'Maximum Overdrive',
      lyrics: `Verse 1:\nGuitar screams into the night,\nEvery nerve is burning bright.\nDrums explode with massive power,\nThis is the electric hour.\n\nChorus:\nMaximum overdrive, go!\nCan't slow down, let the excitement flow.\nAmplified and overdriven,\nBy this unstoppable excitement driven!\n\nVerse 2:\nRiff to riff the tempo soars,\nKicking down the adrenaline doors.\nHands are shaking, voice is roaring,\nExcitement has been pouring.`,
      melodyDescription: 'Hard rock banger with heavy riffing, double-kick drums, and an explosive guitar solo.',
      tempo: '165 BPM',
      key: 'E Minor',
      duration: '3:55',
    },
    Jazz: {
      title: 'Fast Train to Anywhere',
      lyrics: `Verse 1:\nFingers flying over keys so fast,\nThis exhilaration's built to last.\nTrumpet blazing, alto burns,\nExcitement everywhere it turns.\n\nChorus:\nFast train to anywhere tonight,\nJazz is moving at the speed of light.\nAll the energy of bebop's chase,\nExcitement at a blazing pace.\n\nVerse 2:\nSolo spinning in the stratosphere,\nGreatest music of the year.\nRhythm section right on fire,\nEvery note is taking higher.`,
      melodyDescription: 'Blistering bebop with rapid-fire trumpet solos, complex chord changes, and explosive energy.',
      tempo: '220 BPM',
      key: 'F Major',
      duration: '3:40',
    },
    Classical: {
      title: 'Prestissimo Fantasia',
      lyrics: `Movement I:\nStrings cascade in wild rush,\nExcitement in a brilliant gush.\nPiano thunders, brass ignites,\nOrchestra at dizzy heights.\n\nMovement II:\nPercussion sets the frantic pace,\nWoodwinds join the thrilling race.\nAll the instruments collide,\nExcitement's exhilarating tide.\n\nMovement III:\nClimax builds to grand finale,\nOrchestra's excited salvo.\nFinal chord erupts with fire,\nExcitement climbing ever higher.`,
      melodyDescription: 'Electrifying prestissimo orchestral fantasia with thundering timpani and brass fanfares.',
      tempo: '176 BPM',
      key: 'D Major',
      duration: '4:45',
    },
    Electronic: {
      title: 'Hyperdrive',
      lyrics: `Verse 1:\nCount me in at light speed,\nThis energy is all I need.\nSynths are blasting, bass is pounding,\nExcitement all around me sounding.\n\nChorus:\nHyperdrive, we're going fast,\nThis incredible high is built to last.\nDrop it hard and feel the rush,\nElectronic euphoric gush.\n\nVerse 2:\nArp sequences spinning out of control,\nThis excited energy feeds my soul.\nFilter rising, pitch ascending,\nUnstoppable and never-ending.`,
      melodyDescription: 'Hard-hitting EDM with massive buildups, brain-rattling drops, and relentless energy.',
      tempo: '150 BPM',
      key: 'A Minor',
      duration: '4:10',
    },
    Acoustic: {
      title: 'Open Road Strumming',
      lyrics: `Verse 1:\nWindow down, the engine roars,\nGuitar strumming on all fours.\nCalloused fingers on the strings,\nExcitement is the song that sings.\n\nChorus:\nOpen road, open heart,\nEvery strum a brand new start.\nStrumming fast and singing free,\nExcitement lives inside of me.\n\nVerse 2:\nSunset dipping on the rise,\nGuitar notes beneath the skies.\nThis good feeling riding high,\nAcoustic joy beneath the sky.`,
      melodyDescription: 'Energetic strumming acoustic with lively rhythmic picking and an uplifting capo key.',
      tempo: '118 BPM',
      key: 'Capo 2 - D Major',
      duration: '3:05',
    },
  },
  Hopeful: {
    Pop: {
      title: 'Light at the End',
      lyrics: `Verse 1:\nDarkness tried to hold me down,\nBut hope has lifted from the ground.\nEven in the longest night,\nI can see a distant light.\n\nChorus:\nLight at the end of every tunnel,\nHope is pouring through the funnel.\nBetter days are on the way,\nHope is here, it's here to stay.\n\nVerse 2:\nRising through the clouds of doubt,\nHope is what it's all about.\nNew beginnings, fresh new starts,\nHope is living in our hearts.`,
      melodyDescription: 'Uplifting pop ballad that builds from gentle verses to an anthemic hopeful chorus.',
      tempo: '100 BPM',
      key: 'G Major',
      duration: '3:50',
    },
    Rock: {
      title: 'Rising Through the Storm',
      lyrics: `Verse 1:\nLightning struck but I'm still standing,\nNot yet done, still commanding.\nRock-solid hope beneath my feet,\nHope's not something I'll defeat.\n\nChorus:\nRising through the storm tonight,\nHope becomes my guiding light.\nEven when the thunder roars,\nI'll be standing when it pours.\n\nVerse 2:\nGuitar rising with the dawn,\nThe storm has passed, I'm carrying on.\nRock and roll and hope unite,\nLeading me toward morning's light.`,
      melodyDescription: 'Anthemic rock with crescendoing guitar, powerful drums, and a triumphant key change.',
      tempo: '115 BPM',
      key: 'B Major',
      duration: '4:15',
    },
    Jazz: {
      title: 'Tomorrow\'s Sunrise',
      lyrics: `Verse 1:\nMuted horn at break of day,\nPlaying all my hope away.\nNot away but into song,\nHope to carry all day long.\n\nChorus:\nTomorrow's sunrise, still to come,\nThe hopeful beat of a distant drum.\nJazz and hope, a perfect pair,\nFinding beauty in the air.\n\nVerse 2:\nMajor seventh chords of hope,\nHelping weary hearts to cope.\nSwing and sway through uncertainty,\nHope playing for eternity.`,
      melodyDescription: 'Warm, optimistic jazz with major seventh harmonies, gentle swing, and uplifting brass.',
      tempo: '88 BPM',
      key: 'Eb Major',
      duration: '4:25',
    },
    Classical: {
      title: 'Ode to Tomorrow',
      lyrics: `Movement I:\nHope ascends in strings so bright,\nGuiding toward the morning light.\nClarinet leads the hopeful way,\nOrchestra rings in a new day.\n\nMovement II:\nOboe sings of new beginnings,\nHope despite all past winnings.\nGentle swell and tender theme,\nLife is more than just a dream.\n\nMovement III:\nFull orchestra in hopeful bloom,\nDriving out all trace of gloom.\nGrand crescendo, spirits high,\nHope eternal, never die.`,
      melodyDescription: 'Inspirational symphonic piece that builds majestically, channeling Beethoven\'s optimism.',
      tempo: '96 BPM',
      key: 'F Major',
      duration: '5:40',
    },
    Electronic: {
      title: 'New Dawn Sequence',
      lyrics: `Verse 1:\nFrequencies align at dawn,\nSomething new is being born.\nSynth horizon glows with light,\nHope emerging from the night.\n\nChorus:\nNew dawn sequence, initiating,\nHope's new signal radiating.\nBrighter frequencies today,\nElectronic hope is here to stay.\n\nVerse 2:\nRising pad through morning mist,\nAll the things I might have missed.\nBuilding now from low to high,\nHopeful beams across the sky.`,
      melodyDescription: 'Uplifting progressive electronic with gradual build, shimmering synths, and hopeful drop.',
      tempo: '122 BPM',
      key: 'E Major',
      duration: '5:00',
    },
    Acoustic: {
      title: 'Seeds in the Ground',
      lyrics: `Verse 1:\nPlanting seeds I cannot see,\nTrusting what is yet to be.\nAcoustic hope in every strum,\nWaiting for the days to come.\n\nChorus:\nSeeds in the ground, hope in my heart,\nEvery ending is a start.\nWatering with patient care,\nHope is blooming everywhere.\n\nVerse 2:\nRoots grow deeper, branches rise,\nHope grows tall beneath the skies.\nAcoustic warmth and morning dew,\nEvery day begins anew.`,
      melodyDescription: 'Soulful acoustic folk with fingerpicking, harmonica-inspired melodies, and warm chord choices.',
      tempo: '88 BPM',
      key: 'A Major',
      duration: '3:35',
    },
  },
  Angry: {
    Pop: {
      title: 'Can\'t Hold Me Down',
      lyrics: `Verse 1:\nThought that you could silence me,\nTruth is I was born to be free.\nEvery word you used to break,\nMade me stronger, wide awake.\n\nChorus:\nCan't hold me down, not anymore,\nI'm breaking through that closed door.\nAll that anger fueling my rise,\nWatch me claim my rightful prize.\n\nVerse 2:\nFired up and standing tall,\nI refuse to ever fall.\nFueling forward with this rage,\nWriting on a brand new page.`,
      melodyDescription: 'Empowering pop-rock anthem with punchy production, driving rhythm, and anthemic chorus.',
      tempo: '132 BPM',
      key: 'F Minor',
      duration: '3:28',
    },
    Rock: {
      title: 'Burning Walls',
      lyrics: `Verse 1:\nHeavy riff ignites the stage,\nChanneling this burning rage.\nFists are clenched and jaw is tight,\nMusic is my way to fight.\n\nChorus:\nBurning walls and broken chains,\nAll this anger in my veins.\nScreaming till the mic goes hot,\nGiving rock music everything I got.\n\nVerse 2:\nDrum kit crashing like a storm,\nAnger is the truest form.\nOf expression, raw and real,\nThis is everything I feel.`,
      melodyDescription: 'Aggressive hard rock with drop-D tuning, screaming guitar solos, and explosive fills.',
      tempo: '158 BPM',
      key: 'B Minor',
      duration: '4:05',
    },
    Jazz: {
      title: 'Dissonant Blues',
      lyrics: `Verse 1:\nAngry chords clash in the night,\nJazz expressing something tight.\nDissonance in every bar,\nTension stretching near and far.\n\nChorus:\nDissonant blues running deep,\nAll this anger I must keep.\nChanneled through the saxophone,\nNever feeling more alone.\n\nVerse 2:\nTrumpet blares a sharp protest,\nPutting anger through the test.\nJazz has always known the truth,\nOf an angry, searching youth.`,
      melodyDescription: 'Tense, dissonant jazz-blues with heavy tritones, unresolved chords, and aggressive improv.',
      tempo: '110 BPM',
      key: 'C# Minor',
      duration: '4:30',
    },
    Classical: {
      title: 'Furioso in D Minor',
      lyrics: `Movement I:\nStrings attack with fierce fury,\nThe orchestra acts as judge and jury.\nTimpani pounds the case of rage,\nFire burns on every page.\n\nMovement II:\nBrass erupts in protest loud,\nAnger rises like a cloud.\nWoodwinds squeal their sharp dissent,\nForte showing what anger meant.\n\nMovement III:\nGrand and terrible finale,\nFull orchestra's angry salvo.\nLast great chord slams like a fist,\nAnger's force cannot be missed.`,
      melodyDescription: 'Furious orchestral storm channeling Beethoven\'s Op. 111 energy, with clashing dissonance.',
      tempo: '144 BPM',
      key: 'D Minor',
      duration: '5:55',
    },
    Electronic: {
      title: 'System Overload',
      lyrics: `Verse 1:\nRed alert, the system's breaking,\nAll the pressure I've been taking.\nGlitch and static, noise and clash,\nAnger's signal, lightning flash.\n\nChorus:\nSystem overload tonight,\nBeyond the boundary of what's right.\nDistorted bass and broken beat,\nThis anger will not know defeat.\n\nVerse 2:\nCorrupted data, signal lost,\nFeeling anger's total cost.\nSaw-wave screaming, filter slammed,\nAnger fully synthesized and programmed.`,
      melodyDescription: 'Aggressive industrial electronic with distorted bass, glitch elements, and relentless tempo.',
      tempo: '155 BPM',
      key: 'G# Minor',
      duration: '4:20',
    },
    Acoustic: {
      title: 'Splinters',
      lyrics: `Verse 1:\nSlamming chords on wooden strings,\nAnger's what this music brings.\nBruised fingers, tensed and tight,\nPlaying through my inner fight.\n\nChorus:\nSplinters in my hands tonight,\nStrumming anger with all my might.\nAcoustic rage, a contradiction,\nSoftness masking the addiction.\n\nVerse 2:\nTo this burning need to feel,\nMusic making anger real.\nEven gentle strings can show,\nHow deep this angry river flows.`,
      melodyDescription: 'Intense percussive acoustic with aggressive strumming, dark open chords, and raw energy.',
      tempo: '105 BPM',
      key: 'D Minor',
      duration: '3:15',
    },
  },
};

export const songs: Song[] = MOODS.flatMap((mood) =>
  GENRES.map((genre) => ({
    id: `${mood.toLowerCase()}-${genre.toLowerCase()}`,
    mood,
    genre,
    ...songMatrix[mood][genre],
  }))
);

export const getSong = (mood: Mood, genre: Genre): Song | undefined =>
  songs.find((s) => s.mood === mood && s.genre === genre);

export const playlists: Playlist[] = [
  {
    id: 'pl-01',
    name: 'Morning Euphoria',
    mood: 'Happy',
    trackCount: 18,
    duration: '1h 12m',
    description: 'Kick-start your day with uplifting beats and joyful melodies.',
    gradientFrom: '#f59e0b',
    gradientTo: '#ef4444',
    tags: ['Uplifting', 'Morning', 'Energy'],
    tracks: [
      { title: 'Golden Hour', artist: 'A1 AI', duration: '3:24' },
      { title: 'Rise & Shine', artist: 'A1 AI', duration: '3:10' },
      { title: 'Bright Side Up', artist: 'A1 AI', duration: '4:02' },
    ],
  },
  {
    id: 'pl-02',
    name: 'Rainy Day Feels',
    mood: 'Sad',
    trackCount: 14,
    duration: '58m',
    description: 'Embrace the melancholy with beautiful, introspective tracks.',
    gradientFrom: '#3b82f6',
    gradientTo: '#6366f1',
    tags: ['Melancholic', 'Reflective', 'Rainy'],
    tracks: [
      { title: 'Grey Skies', artist: 'A1 AI', duration: '4:15' },
      { title: 'Missing You', artist: 'A1 AI', duration: '3:50' },
      { title: 'Teardrops', artist: 'A1 AI', duration: '4:30' },
    ],
  },
  {
    id: 'pl-03',
    name: 'Zen Garden',
    mood: 'Calm',
    trackCount: 20,
    duration: '1h 40m',
    description: 'Find your inner peace with ambient sounds and gentle melodies.',
    gradientFrom: '#10b981',
    gradientTo: '#06b6d4',
    tags: ['Meditation', 'Peaceful', 'Ambient'],
    tracks: [
      { title: 'Still Waters', artist: 'A1 AI', duration: '5:00' },
      { title: 'Breath', artist: 'A1 AI', duration: '6:20' },
      { title: 'Tranquil', artist: 'A1 AI', duration: '4:55' },
    ],
  },
  {
    id: 'pl-04',
    name: 'Adrenaline Rush',
    mood: 'Excited',
    trackCount: 22,
    duration: '1h 30m',
    description: 'Pump up the energy with high-octane tracks built for action.',
    gradientFrom: '#f97316',
    gradientTo: '#ec4899',
    tags: ['High-Energy', 'Workout', 'Hype'],
    tracks: [
      { title: 'Full Speed', artist: 'A1 AI', duration: '3:05' },
      { title: 'Overdrive', artist: 'A1 AI', duration: '3:40' },
      { title: 'Ignition', artist: 'A1 AI', duration: '3:15' },
    ],
  },
  {
    id: 'pl-05',
    name: 'New Horizons',
    mood: 'Hopeful',
    trackCount: 16,
    duration: '1h 05m',
    description: 'Inspiring anthems to fuel your dreams and shape your future.',
    gradientFrom: '#8b5cf6',
    gradientTo: '#3b82f6',
    tags: ['Inspiring', 'Dreamy', 'Uplifting'],
    tracks: [
      { title: 'Tomorrow', artist: 'A1 AI', duration: '4:10' },
      { title: 'Believe', artist: 'A1 AI', duration: '3:55' },
      { title: 'New Chapter', artist: 'A1 AI', duration: '4:25' },
    ],
  },
  {
    id: 'pl-06',
    name: 'Rage Release',
    mood: 'Angry',
    trackCount: 12,
    duration: '52m',
    description: 'Channel your frustration into powerful, cathartic music.',
    gradientFrom: '#dc2626',
    gradientTo: '#7c3aed',
    tags: ['Cathartic', 'Powerful', 'Raw'],
    tracks: [
      { title: 'Fire Within', artist: 'A1 AI', duration: '4:05' },
      { title: 'Breakout', artist: 'A1 AI', duration: '3:50' },
      { title: 'Unleashed', artist: 'A1 AI', duration: '4:20' },
    ],
  },
  {
    id: 'pl-07',
    name: 'Sunset Vibes',
    mood: 'Happy',
    trackCount: 15,
    duration: '1h 02m',
    description: 'Perfect golden-hour soundtrack for the end of a great day.',
    gradientFrom: '#f59e0b',
    gradientTo: '#ec4899',
    tags: ['Chill', 'Sunset', 'Feel-Good'],
    tracks: [
      { title: 'Golden Dusk', artist: 'A1 AI', duration: '3:45' },
      { title: 'Last Light', artist: 'A1 AI', duration: '4:00' },
      { title: 'Evening Glow', artist: 'A1 AI', duration: '3:30' },
    ],
  },
  {
    id: 'pl-08',
    name: 'Solitude',
    mood: 'Sad',
    trackCount: 11,
    duration: '48m',
    description: 'Quiet, introspective music for moments of deep reflection.',
    gradientFrom: '#475569',
    gradientTo: '#1e293b',
    tags: ['Quiet', 'Introspective', 'Alone'],
    tracks: [
      { title: 'Alone in Silence', artist: 'A1 AI', duration: '5:10' },
      { title: 'Memory Lane', artist: 'A1 AI', duration: '4:20' },
      { title: 'Fading Echo', artist: 'A1 AI', duration: '3:55' },
    ],
  },
  {
    id: 'pl-09',
    name: 'Focus Flow',
    mood: 'Calm',
    trackCount: 25,
    duration: '2h 05m',
    description: 'Stay in the zone with minimalist, distraction-free music.',
    gradientFrom: '#0ea5e9',
    gradientTo: '#6366f1',
    tags: ['Focus', 'Work', 'Study'],
    tracks: [
      { title: 'Deep Focus', artist: 'A1 AI', duration: '8:00' },
      { title: 'Flow State', artist: 'A1 AI', duration: '7:30' },
      { title: 'Clarity', artist: 'A1 AI', duration: '6:50' },
    ],
  },
  {
    id: 'pl-10',
    name: 'Party Starter',
    mood: 'Excited',
    trackCount: 20,
    duration: '1h 25m',
    description: 'Get the party going with infectious, crowd-pleasing bangers.',
    gradientFrom: '#ec4899',
    gradientTo: '#f97316',
    tags: ['Party', 'Dance', 'Hype'],
    tracks: [
      { title: 'Let\'s Go', artist: 'A1 AI', duration: '3:20' },
      { title: 'Dance Floor', artist: 'A1 AI', duration: '3:45' },
      { title: 'Turn Up', artist: 'A1 AI', duration: '3:30' },
    ],
  },
  {
    id: 'pl-11',
    name: 'Dream Big',
    mood: 'Hopeful',
    trackCount: 18,
    duration: '1h 15m',
    description: 'Music that reminds you to keep reaching for your dreams.',
    gradientFrom: '#a855f7',
    gradientTo: '#06b6d4',
    tags: ['Motivational', 'Dreamy', 'Hopeful'],
    tracks: [
      { title: 'Limitless', artist: 'A1 AI', duration: '4:30' },
      { title: 'Reach Higher', artist: 'A1 AI', duration: '4:00' },
      { title: 'Dream Chaser', artist: 'A1 AI', duration: '3:55' },
    ],
  },
  {
    id: 'pl-12',
    name: 'Thunder & Lightning',
    mood: 'Angry',
    trackCount: 14,
    duration: '1h 00m',
    description: 'Heavy, electrifying tracks for when you need to let it all out.',
    gradientFrom: '#1f2937',
    gradientTo: '#dc2626',
    tags: ['Heavy', 'Intense', 'Electric'],
    tracks: [
      { title: 'Storm Surge', artist: 'A1 AI', duration: '4:15' },
      { title: 'Thunder Clap', artist: 'A1 AI', duration: '4:00' },
      { title: 'Lightning Rod', artist: 'A1 AI', duration: '3:45' },
    ],
  },
];
