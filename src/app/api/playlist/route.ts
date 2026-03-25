import { NextRequest, NextResponse } from "next/server";

type Track = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  mood: string;
  energy: number; // 0–100
};

const TRACK_LIBRARY: Record<string, Track[]> = {
  happy: [
    { id: "h1", title: "Can't Stop the Feeling", artist: "Justin Timberlake", duration: "3:56", genre: "Pop", mood: "Happy", energy: 88 },
    { id: "h2", title: "Happy", artist: "Pharrell Williams", duration: "3:53", genre: "Pop / Soul", mood: "Happy", energy: 85 },
    { id: "h3", title: "Good as Hell", artist: "Lizzo", duration: "2:39", genre: "Pop", mood: "Happy", energy: 82 },
    { id: "h4", title: "Walking on Sunshine", artist: "Katrina & The Waves", duration: "3:58", genre: "Pop Rock", mood: "Happy", energy: 90 },
    { id: "h5", title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", duration: "4:30", genre: "Funk / Pop", mood: "Happy", energy: 92 },
  ],
  sad: [
    { id: "s1", title: "The Night We Met", artist: "Lord Huron", duration: "3:28", genre: "Indie Folk", mood: "Sad", energy: 38 },
    { id: "s2", title: "Someone Like You", artist: "Adele", duration: "4:45", genre: "Pop / Soul", mood: "Sad", energy: 42 },
    { id: "s3", title: "Skinny Love", artist: "Bon Iver", duration: "3:58", genre: "Indie Folk", mood: "Sad", energy: 35 },
    { id: "s4", title: "Fix You", artist: "Coldplay", duration: "4:55", genre: "Alt Rock", mood: "Sad", energy: 40 },
    { id: "s5", title: "Hurt", artist: "Johnny Cash", duration: "3:38", genre: "Folk / Country", mood: "Sad", energy: 30 },
  ],
  energetic: [
    { id: "e1", title: "Power", artist: "Kanye West", duration: "4:52", genre: "Hip-Hop", mood: "Energetic", energy: 95 },
    { id: "e2", title: "Eye of the Tiger", artist: "Survivor", duration: "4:05", genre: "Rock", mood: "Energetic", energy: 97 },
    { id: "e3", title: "Don't Stop Me Now", artist: "Queen", duration: "3:29", genre: "Rock", mood: "Energetic", energy: 96 },
    { id: "e4", title: "Stronger", artist: "Kanye West", duration: "5:11", genre: "Hip-Hop / Electronic", mood: "Energetic", energy: 93 },
    { id: "e5", title: "Titanium", artist: "David Guetta ft. Sia", duration: "4:05", genre: "Electronic / Pop", mood: "Energetic", energy: 91 },
  ],
  calm: [
    { id: "c1", title: "River", artist: "Leon Bridges", duration: "3:59", genre: "Soul / R&B", mood: "Calm", energy: 38 },
    { id: "c2", title: "Holocene", artist: "Bon Iver", duration: "5:37", genre: "Indie Folk", mood: "Calm", energy: 32 },
    { id: "c3", title: "Lost in the Light", artist: "Bahamas", duration: "3:24", genre: "Folk Pop", mood: "Calm", energy: 35 },
    { id: "c4", title: "Breathe (2 AM)", artist: "Anna Nalick", duration: "4:01", genre: "Pop Rock", mood: "Calm", energy: 40 },
    { id: "c5", title: "A Case of You", artist: "Joni Mitchell", duration: "4:19", genre: "Folk", mood: "Calm", energy: 28 },
  ],
  romantic: [
    { id: "r1", title: "At Last", artist: "Etta James", duration: "2:59", genre: "R&B / Soul", mood: "Romantic", energy: 60 },
    { id: "r2", title: "Make You Feel My Love", artist: "Adele", duration: "3:32", genre: "Pop / Soul", mood: "Romantic", energy: 52 },
    { id: "r3", title: "Perfect", artist: "Ed Sheeran", duration: "4:23", genre: "Pop", mood: "Romantic", energy: 65 },
    { id: "r4", title: "Can't Help Falling in Love", artist: "Elvis Presley", duration: "3:00", genre: "Pop", mood: "Romantic", energy: 55 },
    { id: "r5", title: "All of Me", artist: "John Legend", duration: "4:30", genre: "R&B / Soul", mood: "Romantic", energy: 58 },
  ],
  melancholic: [
    { id: "m1", title: "motion picture soundtrack", artist: "Radiohead", duration: "6:59", genre: "Art Rock", mood: "Melancholic", energy: 28 },
    { id: "m2", title: "Lua", artist: "Bright Eyes", duration: "3:37", genre: "Indie Folk", mood: "Melancholic", energy: 30 },
    { id: "m3", title: "4th of July", artist: "Sufjan Stevens", duration: "4:44", genre: "Indie Folk", mood: "Melancholic", energy: 25 },
    { id: "m4", title: "Casimir Pulaski Day", artist: "Sufjan Stevens", duration: "5:08", genre: "Folk", mood: "Melancholic", energy: 22 },
    { id: "m5", title: "Fade Into You", artist: "Mazzy Star", duration: "5:31", genre: "Dream Pop", mood: "Melancholic", energy: 35 },
  ],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mood = searchParams.get("mood")?.toLowerCase() ?? "calm";

  const tracks = TRACK_LIBRARY[mood] ?? TRACK_LIBRARY.calm;

  return NextResponse.json({
    playlist: {
      name: `${mood.charAt(0).toUpperCase() + mood.slice(1)} Vibes`,
      mood,
      trackCount: tracks.length,
      tracks,
    },
  });
}
