# 🗄️ Database Setup Guide

A1 uses PostgreSQL. This guide covers the three easiest free-tier options.

---

## Which Database Should I Use?

| Provider | Best For | Free Tier | Setup Time |
|----------|----------|-----------|------------|
| **Supabase** ⭐ | Beginners | 500 MB storage | 5 min |
| **Railway** | Developers | $5/month credit | 3 min |
| **Render** | Production | 1 GB storage, **⚠️ suspended after 90 days inactivity** | 5 min |

**Recommendation:** Start with **Supabase** — it's the simplest and includes a dashboard to view your data.

---

## Option 1: Supabase (Recommended) ⭐

**Go to:** https://supabase.com

### Setup Steps:

1. Click **"Start your project"**
2. Sign in with **GitHub**
3. Click **"New project"**
4. Fill in:
   - **Project name:** `A1 Music`
   - **Database password:** Choose something strong — save it!
   - **Region:** Pick the region closest to you
5. Click **"Create new project"**
6. Wait **2-3 minutes** for the database to initialize

### Get Your Connection String:

1. In the Supabase dashboard, click **Settings** (⚙️ in left sidebar)
2. Click **Database**
3. Scroll down to **"Connection string"**
4. Click the **"URI"** tab
5. Copy the full string

It looks like:
```
postgresql://postgres:[YOUR-PASSWORD]@db.abc123.supabase.co:5432/postgres
```

Replace `[YOUR-PASSWORD]` with the password you created.

### Add to .env.local:
```
DATABASE_URL=postgresql://postgres:yourpassword@db.abc123.supabase.co:5432/postgres
```

---

## Option 2: Railway

**Go to:** https://railway.app

### Setup Steps:

1. Click **"Start a New Project"**
2. Sign in with **GitHub**
3. Click **"Provision PostgreSQL"**
4. Railway creates the database in about 30 seconds

### Get Your Connection String:

1. Click on your **PostgreSQL** service
2. Click **"Variables"** tab
3. Copy the value of **`DATABASE_URL`**

It looks like:
```
postgresql://postgres:password@roundhouse.proxy.rlwy.net:12345/railway
```

### Add to .env.local:
```
DATABASE_URL=postgresql://postgres:password@roundhouse.proxy.rlwy.net:12345/railway
```

---

## Option 3: Render

**Go to:** https://render.com

### Setup Steps:

1. Click **"New +"** → **"PostgreSQL"**
2. Sign in / Create account
3. Fill in:
   - **Name:** `a1-music-db`
   - **Region:** Choose nearest
   - **Plan:** Free
4. Click **"Create Database"**
5. Wait 1-2 minutes

### Get Your Connection String:

1. On the database page, scroll to **"Connections"**
2. Copy the **"External Database URL"**

It looks like:
```
postgresql://a1_user:password@dpg-abc123.oregon-postgres.render.com/a1_music
```

> ⚠️ Render free databases are suspended after 90 days of inactivity and deleted after 97 days.

### Add to .env.local:
```
DATABASE_URL=postgresql://a1_user:password@dpg-abc123.oregon-postgres.render.com/a1_music
```

---

## Running Database Migrations

Once you have your `DATABASE_URL`, run the migrations to create your tables:

```bash
# Make sure DATABASE_URL is set in .env.local
npx prisma migrate deploy

# Or for first-time setup:
npx prisma db push
```

To explore your database visually:
```bash
npx prisma studio
```

This opens a browser-based database viewer at http://localhost:5555.

---

## Troubleshooting

### "Can't reach database server"
- Check that your `DATABASE_URL` is correct
- Make sure the database is running (Supabase/Railway dashboard shows status)
- If using Render free tier, the DB may have been suspended — log in to wake it up

### "SSL connection required"
Add `?sslmode=require` to your connection string:
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname?sslmode=require
```

### "Migration failed"
```bash
# Reset and re-run migrations (development only!)
npx prisma migrate reset
```

### Connection string format reference:
```
postgresql://[user]:[password]@[host]:[port]/[database]?[options]
```

---

## Local Development with Docker (Advanced)

If you prefer to run PostgreSQL locally:

```bash
docker run -d \
  --name a1-postgres \
  -e POSTGRES_DB=a1_music \
  -e POSTGRES_USER=a1_user \
  -e POSTGRES_PASSWORD=localpassword \
  -p 5432:5432 \
  postgres:16

# Then in .env.local:
DATABASE_URL=postgresql://a1_user:localpassword@localhost:5432/a1_music
```

---

## Next Steps

After setting up your database:

1. Run migrations: `npx prisma db push`
2. Test connection: `npx prisma studio`
3. Deploy your app following [docs/QUICK_START.md](QUICK_START.md)
