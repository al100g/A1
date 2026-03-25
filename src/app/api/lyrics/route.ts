import { NextRequest, NextResponse } from "next/server";

type LyricsRequest = {
  mood: string;
  theme?: string;
};

type Song = {
  title: string;
  genre: string;
  tempo: string;
  lyrics: string;
  chords: string[];
};

const LYRICS_TEMPLATES: Record<string, Song[]> = {
  happy: [
    {
      title: "Golden Days",
      genre: "Pop",
      tempo: "Upbeat (130 BPM)",
      chords: ["C", "G", "Am", "F"],
      lyrics: `[Verse 1]
The sun is rising over mountain peaks
A brand new day is calling out to me
I feel it in my chest, this warming glow
A happiness that only I can know

[Chorus]
These are my golden days, yeah
Dancing in the sunlit haze, yeah
Every step I take feels right
Everything is shining bright
These are my golden days

[Verse 2]
The world looks different through these hopeful eyes
Colors brighter underneath the skies
My heart is open, ready to receive
All the joy this life has up its sleeve

[Bridge]
And I know that I'll keep going
Even when the sun stops showing
'Cause I carry light inside me
On this journey that defines me`,
    },
  ],
  sad: [
    {
      title: "Empty Room",
      genre: "Indie Folk",
      tempo: "Slow (72 BPM)",
      chords: ["Am", "F", "C", "G"],
      lyrics: `[Verse 1]
There's a silence in this empty room
Like the echo of a forgotten tune
Your photograph still hangs upon the wall
Watching over me as teardrops fall

[Chorus]
And I miss you in the morning light
I miss you in the middle of the night
The space between us grows each day
As slowly you are fading away

[Verse 2]
Your coffee cup still sitting on the shelf
I keep pretending everything is well
But every corner holds a memory
Of all the things we used to be

[Bridge]
Maybe someday this will turn to peace
Maybe someday all this ache will cease
But for tonight I let myself just feel
Everything that's broken, everything that's real`,
    },
  ],
  energetic: [
    {
      title: "Unstoppable",
      genre: "Electronic / Rock",
      tempo: "Fast (145 BPM)",
      chords: ["E5", "A5", "D5", "B5"],
      lyrics: `[Verse 1]
Got fire running through my veins tonight
Every single cell is burning bright
The world can't hold me down no more
I'm kicking open every door

[Chorus]
I'm unstoppable, unbreakable
Shaking the ground beneath my feet
I'm unstoppable, undeniable
The rhythm of my heart won't beat in defeat

[Verse 2]
They said I'd never make it this far
But look at me — I'm chasing every star
No ceiling can contain what I've become
When the music drops I know I've won

[Bridge]
Turn it up, turn it up, turn it up
Feel the bass drop in your gut
We are rising, never stopping
Keep on moving, never dropping`,
    },
  ],
  calm: [
    {
      title: "Still Waters",
      genre: "Ambient / Folk",
      tempo: "Gentle (60 BPM)",
      chords: ["Dmaj7", "Amaj7", "Bm", "G"],
      lyrics: `[Verse 1]
Breathe in the morning air so still
Watch the mist roll off the distant hill
Let the quiet fill the space inside
On these still waters I will ride

[Chorus]
Everything is fine right now
I don't need to know the how
Just this moment, just this breath
Soft as petals, calm as depth

[Verse 2]
Leave the noise behind the door
I don't need anything more
Than the sound of gentle rain
Washing all away the pain

[Bridge]
Peace is not a place we find
It's the stillness of the mind
When we stop and listen deep
To the quiet we can keep`,
    },
  ],
  romantic: [
    {
      title: "Closer to You",
      genre: "R&B / Soul",
      tempo: "Medium (95 BPM)",
      chords: ["Dm", "Gm", "Bb", "C"],
      lyrics: `[Verse 1]
I've been searching through the stars above
Wondering if I'd ever find this love
And then you walked into my world one day
And took my breath completely away

[Chorus]
I want to be closer to you
Every heartbeat bringing me to you
In the warmth of your arms I find
Everything I've longed to find

[Verse 2]
Your laughter sounds like music in the air
The way you look at me — nothing could compare
I'd cross a thousand miles to reach your side
With you is where I want to reside

[Bridge]
Tell me this is real and not a dream
Because with you things are not what they seem
Everything is softer, brighter, true
When I'm here right next to you`,
    },
  ],
  melancholic: [
    {
      title: "Autumn Letters",
      genre: "Alternative / Indie",
      tempo: "Moderate (88 BPM)",
      chords: ["Em", "C", "G", "D"],
      lyrics: `[Verse 1]
Old photographs scattered on the floor
Of all the people I don't see anymore
The seasons change but I stay still the same
A fading ember in the autumn rain

[Chorus]
These autumn letters never reach their home
Written to the versions of the people I have known
Bittersweet and tinged with gold and grey
Like the memory of a perfect day

[Verse 2]
I hear your voice sometimes in passing songs
Like melodies that never quite belong
Yet carry something warm and something dear
A ghost of all the beauty we held near

[Bridge]
And I wouldn't trade these aching, tender years
For anything — not even drying tears
Because to have loved is to have lived in full
And that is something beautiful`,
    },
  ],
};

function generateLyrics(mood: string, theme?: string): Song {
  const moodKey = mood.toLowerCase();
  const songs = LYRICS_TEMPLATES[moodKey] ?? LYRICS_TEMPLATES.calm;
  const song = songs[0];

  if (theme) {
    return {
      ...song,
      title: `${song.title} (${theme})`,
    };
  }

  return song;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LyricsRequest;
    const { mood, theme } = body;

    if (!mood || typeof mood !== "string") {
      return NextResponse.json(
        { error: "mood field is required" },
        { status: 400 }
      );
    }

    const song = generateLyrics(mood, theme);

    return NextResponse.json({ song });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate lyrics" },
      { status: 500 }
    );
  }
}
