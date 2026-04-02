/**
 * Prisma seed script for A1 Music & Mood Platform.
 * Populates the database with sample data for local development and testing.
 *
 * Run with: npx prisma db seed
 * (requires: "prisma": { "seed": "ts-node prisma/seed.ts" } in package.json)
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Demo User ─────────────────────────────────────────────────────────────
  const user = await prisma.user.upsert({
    where: { email: "demo@a1music.app" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@a1music.app",
      image: "https://avatars.githubusercontent.com/u/1?v=4",
    },
  });
  console.log(`✅ User: ${user.email}`);

  // ─── User Preferences ──────────────────────────────────────────────────────
  await prisma.userPreference.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      defaultGenre: "pop",
      defaultMood: "happy",
      theme: "dark",
    },
  });
  console.log("✅ User preferences");

  // ─── Mood Entries ──────────────────────────────────────────────────────────
  const moods = [
    { mood: "happy", intensity: 8, notes: "Feeling great today!" },
    { mood: "calm", intensity: 6, notes: "Relaxing afternoon" },
    { mood: "energetic", intensity: 9, notes: "Ready to conquer the world" },
    { mood: "melancholy", intensity: 4, notes: "Reflective mood" },
    { mood: "hopeful", intensity: 7, notes: "Looking forward to tomorrow" },
    { mood: "sad", intensity: 3, notes: "Missing someone" },
  ];

  const createdMoods = [];
  for (const moodData of moods) {
    const entry = await prisma.moodEntry.create({
      data: {
        userId: user.id,
        ...moodData,
      },
    });
    createdMoods.push(entry);
  }
  console.log(`✅ ${createdMoods.length} mood entries`);

  // ─── Sample Songs ──────────────────────────────────────────────────────────
  const songData = [
    {
      title: "Rise with the Sun",
      genre: "pop",
      mood: "happy",
      lyrics: `Verse 1:
Morning light breaks through my window pane,
Every worry fades like yesterday's rain.
I feel the warmth beneath my skin,
A brand new day is about to begin.

Chorus:
Rise with the sun, let your spirit fly,
No more doubts, reach up to the sky.
Rise with the sun, feel the golden glow,
This is your moment — let the whole world know.

Verse 2:
Every step I take feels lighter now,
I found my rhythm, I'm taking that vow.
The world is calling, I hear my name,
Nothing can stop me — I'll never be the same.

[Chorus]

Bridge:
When the darkness tried to pull me down,
I found my light, I turned it around.
Now every sunrise is a brand new song,
This is where I always belonged.

[Chorus]`,
      isPublic: true,
    },
    {
      title: "Still Water",
      genre: "r&b",
      mood: "calm",
      lyrics: `Verse 1:
Breathe in slow, let the tension go,
Like a river finding its flow.
No rush, no race, just this moment here,
Everything you need is always near.

Chorus:
Still water, running deep,
Peaceful thoughts, easy sleep.
Still water, calm and true,
Finding rest in all I do.

Verse 2:
The world outside can spin so fast,
But here inside, the storm has passed.
A gentle hum, a soft refrain,
Washing clean like summer rain.

[Chorus]

Outro:
Let it go, let it flow,
Still water, calm below.`,
      isPublic: true,
    },
    {
      title: "Electric Dream",
      genre: "electronic",
      mood: "energetic",
      lyrics: `Verse 1:
Neon lights ignite the night,
Energy surging, feeling right.
Heart is pounding, pulse is high,
We're electric, we're alive.

Chorus:
This is our electric dream,
Nothing's quite the way it seems.
Synth and bass and blazing beats,
Dancing wild on city streets.

Drop:
Go, go, go — feel the surge,
Every boundary starts to blur.
Go, go, go — rise and shine,
The whole world's yours and mine.

[Chorus]`,
      isPublic: true,
    },
  ];

  const createdSongs = [];
  for (let i = 0; i < songData.length; i++) {
    const song = await prisma.song.create({
      data: {
        userId: user.id,
        moodEntryId: createdMoods[i]?.id,
        source: "fallback",
        ...songData[i],
      },
    });
    createdSongs.push(song);
  }
  console.log(`✅ ${createdSongs.length} songs`);

  // ─── Sample Playlist ────────────────────────────────────────────────────────
  const playlist = await prisma.playlist.create({
    data: {
      userId: user.id,
      name: "My Mood Mix",
      description: "A curated collection of A1-generated songs for every mood",
      mood: "mixed",
      isPublic: true,
    },
  });

  for (let i = 0; i < createdSongs.length; i++) {
    await prisma.playlistSong.create({
      data: {
        playlistId: playlist.id,
        songId: createdSongs[i].id,
        position: i + 1,
      },
    });
  }
  console.log(`✅ Playlist: "${playlist.name}" with ${createdSongs.length} songs`);

  console.log("\n🎉 Seed complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
