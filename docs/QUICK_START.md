# 🚀 Quick Start — Launch A1 in 5 Minutes

This guide gets you from zero to a live production app as fast as possible.

---

## Prerequisites

- [Node.js 18+](https://nodejs.org) installed
- A [GitHub account](https://github.com) (you probably already have one)
- 5 minutes ⏱️

---

## Step 1 — Clone & Install (1 min)

```bash
git clone https://github.com/al100g/A1.git
cd A1
npm install
```

---

## Step 2 — Run Setup Script (1 min)

The script auto-generates your `NEXTAUTH_SECRET` and walks you through entering each key.

**Mac / Linux / WSL:**
```bash
bash scripts/setup.sh
```

**Windows (no bash):**
```bash
node scripts/setup.js
```

The script creates `.env.local` in the project root.

---

## Step 3 — Get Your API Keys (2 minutes)

You need 3 things. Each takes about 30 seconds:

### A) Supabase Database (free)

1. Go to → **https://supabase.com** → "Start your project"
2. Sign in with GitHub → "New project"
3. **Project name:** `A1 Music`  |  **Region:** nearest to you
4. Wait ~2 min for DB to start
5. Go to **Settings → Database** → copy the **Connection string (URI)**
6. Paste into `.env.local` as `DATABASE_URL`

### B) GitHub OAuth (free)

1. Go to → **https://github.com/settings/developers** → "New OAuth App"
2. Fill in:
   - **App name:** `A1 Music`
   - **Homepage URL:** `http://localhost:3000`
   - **Callback URL:** `http://localhost:3000/api/auth/callback/github`
3. Click "Register application"
4. Copy **Client ID** → paste as `GITHUB_ID`
5. Click "Generate a new client secret" → paste as `GITHUB_SECRET`

### C) OpenAI API Key (pay-as-you-go, ~$0.01/request)

1. Go to → **https://platform.openai.com/account/api-keys**
2. Click "Create new secret key"
3. Copy it immediately → paste as `OPENAI_API_KEY`

> **No OpenAI key?** The app still works — AI features fall back to pre-written responses.

---

## Step 4 — Test Locally (30 sec)

```bash
npm run dev
```

Open **http://localhost:3000** — you should see the A1 Music app! 🎵

---

## Step 5 — Deploy to Vercel (1 min)

1. Go to → **https://vercel.com/new**
2. Click "Import Git Repository" → select `al100g/A1`
3. In "Environment Variables", add all 6 variables from your `.env.local`
4. Click **Deploy**

Vercel gives you a URL like `a1-music.vercel.app`.

### Update GitHub OAuth Callback

After your Vercel URL is ready:

1. Go back to → **https://github.com/settings/developers**
2. Edit your OAuth app
3. Update **Authorization callback URL** to:
   ```
   https://a1-music.vercel.app/api/auth/callback/github
   ```
4. Update `NEXTAUTH_URL` in Vercel to your Vercel URL

---

## ✅ You're Live!

Your app is deployed. Here's what works out of the box:

| Feature | Status |
|---------|--------|
| Mood Detection | ✅ Works immediately |
| GitHub Login | ✅ With GitHub OAuth keys |
| AI Songwriting | ✅ With OpenAI key |
| Music Playlists | ✅ Works immediately |
| Database | ✅ With DATABASE_URL set |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `NEXTAUTH_SECRET is missing` | Run `bash scripts/setup.sh` again |
| Login redirect fails | Check callback URL in GitHub OAuth settings |
| Database connection error | Verify `DATABASE_URL` format in `.env.local` |
| Build fails on Vercel | Check all env vars are added in Vercel settings |
| AI features not working | Check `OPENAI_API_KEY` is correct (starts with `sk-`) |

---

## 📚 More Guides

- **[docs/GET_API_KEYS.md](GET_API_KEYS.md)** — Detailed API key instructions
- **[docs/DATABASE_SETUP.md](DATABASE_SETUP.md)** — Full database setup options
- **[docs/ENV_SETUP.md](ENV_SETUP.md)** — All environment variables explained
- **[docs/DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** — Pre-launch checklist
