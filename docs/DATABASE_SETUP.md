# A1 Music Platform — Database Setup Guide

Instructions for setting up a PostgreSQL database for the A1 app on free and paid providers.

---

## Overview

The A1 platform uses **PostgreSQL** managed via **Prisma ORM**. You need a database for:
- User accounts and authentication (NextAuth.js)
- Mood entries, generated songs, playlists
- Session management

---

## Option 1: Supabase (Recommended for beginners)

Supabase provides PostgreSQL with a generous free tier (500 MB, no credit card required).

### Steps

1. **Create an account** at [https://supabase.com](https://supabase.com)
2. **Create a new project**
   - Choose a region close to your users
   - Set a strong database password (save it — you'll need it)
   - Wait ~2 minutes for the project to provision
3. **Get the connection string**
   - Go to **Settings → Database → Connection string → URI**
   - Copy the string — it looks like:
     ```
     postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres
     ```
   - Append `?schema=public` to the end
4. **Set the variable**
   ```
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres?schema=public
   ```

> **IPv6 note:** Supabase's direct connection uses IPv4 by default. If you see connection errors from Vercel, use the **Session Pooler** connection string instead (port 5432 with `?pgbouncer=true`).

---

## Option 2: Railway

Railway provides a one-click PostgreSQL plugin with a free allowance.

### Steps

1. **Create an account** at [https://railway.app](https://railway.app)
2. **Create a new project** → Add **Database → PostgreSQL**
3. Click the PostgreSQL service → **Variables** tab
4. Copy `DATABASE_URL` — Railway provides it pre-formatted
5. Use the value directly as your `DATABASE_URL`

---

## Option 3: Render

Render offers a free PostgreSQL instance (expires after 90 days on free plan).

### Steps

1. **Create an account** at [https://render.com](https://render.com)
2. Go to **Dashboard → New → PostgreSQL**
3. Fill in:
   - **Name**: `a1-database`
   - **Database**: `a1_db`
   - **User**: `a1_user`
   - **Region**: Closest to your Vercel region
4. Click **Create Database**
5. Copy the **External Database URL** from the database info page
6. Append `?schema=public` if not already present

---

## Option 4: Neon (Serverless PostgreSQL)

Neon is optimised for serverless environments like Vercel and has a free tier.

### Steps

1. **Create an account** at [https://neon.tech](https://neon.tech)
2. **Create a new project** → choose your region
3. Go to **Dashboard → Connection Details**
4. Copy the **Connection string** (starts with `postgresql://`)
5. Ensure `?sslmode=require` is appended for secure connections

---

## Option 5: Local PostgreSQL (development only)

For local development without a cloud DB.

### Using Docker (easiest)

```bash
docker run -d \
  --name a1-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=a1_dev \
  -p 5432:5432 \
  postgres:16-alpine
```

Set:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/a1_dev?schema=public
```

### Using Homebrew (macOS)

```bash
brew install postgresql@16
brew services start postgresql@16
createdb a1_dev
```

Set:
```
DATABASE_URL=postgresql://$(whoami)@localhost:5432/a1_dev?schema=public
```

---

## Applying the Schema

After setting `DATABASE_URL`, apply the Prisma schema to your database:

```bash
# Push schema changes (no migration files — good for early development)
npx prisma db push

# Verify the schema was applied
npx prisma studio
```

### Using migrations (recommended for production)

```bash
# Create a migration
npx prisma migrate dev --name init

# Apply migrations in production
npx prisma migrate deploy
```

---

## Seeding Sample Data

Populate the database with sample data for development:

```bash
npx prisma db seed
```

This creates:
- 1 demo user (`demo@a1music.app`)
- 6 mood entries
- 3 sample songs
- 1 playlist

---

## Database Schema

The A1 platform has 8 models:

| Model | Purpose |
|---|---|
| `User` | User accounts (NextAuth) |
| `Account` | OAuth provider links (NextAuth) |
| `Session` | Active sessions (NextAuth) |
| `VerificationToken` | Email verification (NextAuth) |
| `MoodEntry` | User mood check-ins |
| `Song` | AI-generated songs |
| `Duet` | Live duet sessions |
| `Playlist` | Song collections |
| `PlaylistSong` | Playlist ↔ Song join table |
| `UserPreference` | Per-user settings |

See `prisma/schema.prisma` for the full schema definition.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| `Connection refused` | Check the host/port and that the DB server is running |
| `SSL required` | Add `?sslmode=require` to your connection string |
| `Permission denied` | Ensure the DB user has `CREATE` and `INSERT` privileges |
| `Can't reach database server` | Verify your IP is allowlisted in the DB provider's firewall |
| Prisma schema drift | Run `npx prisma db push --force-reset` (⚠️ deletes all data) |
| Slow queries | Add indexes in `schema.prisma` and run `npx prisma migrate dev` |

For Prisma-specific help: [https://www.prisma.io/docs](https://www.prisma.io/docs)
