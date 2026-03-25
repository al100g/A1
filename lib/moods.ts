import { Mood } from '@/types';

export const MOODS: Record<string, Mood> = {
  happy: {
    name: 'Happy',
    emoji: '😊',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/20',
    description: 'Feeling joyful and positive',
  },
  sad: {
    name: 'Sad',
    emoji: '😢',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/20',
    description: 'Feeling down or melancholic',
  },
  calm: {
    name: 'Calm',
    emoji: '😌',
    color: 'text-green-400',
    bgColor: 'bg-green-400/20',
    description: 'Feeling peaceful and serene',
  },
  excited: {
    name: 'Excited',
    emoji: '🤩',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/20',
    description: 'Feeling energetic and enthusiastic',
  },
  anxious: {
    name: 'Anxious',
    emoji: '😰',
    color: 'text-red-400',
    bgColor: 'bg-red-400/20',
    description: 'Feeling worried or stressed',
  },
  hopeful: {
    name: 'Hopeful',
    emoji: '🌟',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/20',
    description: 'Feeling optimistic about the future',
  },
};

export const MOOD_NAMES = Object.keys(MOODS);

export function getMood(moodName: string): Mood | undefined {
  return MOODS[moodName.toLowerCase()];
}

export function getMoodEmoji(moodName: string): string {
  return MOODS[moodName.toLowerCase()]?.emoji ?? '🎵';
}

export function getMoodColor(moodName: string): string {
  return MOODS[moodName.toLowerCase()]?.color ?? 'text-purple-400';
}

export function getMoodBgColor(moodName: string): string {
  return MOODS[moodName.toLowerCase()]?.bgColor ?? 'bg-purple-400/20';
}

export const GENRES = [
  'pop',
  'rock',
  'jazz',
  'classical',
  'hip-hop',
  'electronic',
];
