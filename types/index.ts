export interface Mood {
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  description: string;
}

export interface Song {
  id: string;
  title: string;
  mood: string;
  genre: string;
  lyrics: {
    verse1: string;
    chorus: string;
    verse2: string;
    bridge: string;
  };
  createdAt: string;
}

export interface Playlist {
  id: string;
  name: string;
  mood: string;
  songs: Song[];
  createdAt: string;
}

export interface Duet {
  id: string;
  roomCode: string;
  status: 'waiting' | 'active' | 'ended';
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  createdAt: string;
}

export interface MoodEntry {
  id: string;
  text: string;
  mood: string;
  confidence: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}
