# 🔧 Environment Variables Setup Guide

Complete reference for every environment variable used by A1.

---

## How to Set Variables

### Local Development

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and fill in each value
3. Restart the dev server: `npm run dev`

> Git ignores `.env.local` automatically — your secrets stay safe.

### Production (Vercel)

1. Go to your project: https://vercel.com/dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable and select which environments apply
4. Click **Save**, then **Redeploy** your app

---

## Required Variables

### `NEXTAUTH_URL`
The public-facing URL of your app.

| Environment | Value |
|-------------|-------|
| Development | `http://localhost:3000` |
| Production | `https://your-app.vercel.app` |

```
NEXTAUTH_URL=http://localhost:3000
```

---

### `NEXTAUTH_SECRET`
A random string used to encrypt session cookies. **Must be unique per environment.**

**Generate it:**
```bash
# Option 1 — bash
openssl rand -hex 32

# Option 2 — Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 3 — Online
# https://generate-secret.vercel.app/32

# Option 4 — Setup script
bash scripts/setup.sh
```

```
NEXTAUTH_SECRET=a1b2c3d4e5f6a7b8a1b2c3d4e5f6a7b8a1b2c3d4e5f6a7b8a1b2c3d4e5f6a7b8
```

---

### `GITHUB_ID` and `GITHUB_SECRET`
OAuth credentials for GitHub login.

**How to get them:** [docs/GET_API_KEYS.md → GitHub OAuth](GET_API_KEYS.md#2-github-oauth-keys)

```
GITHUB_ID=Iv1.a1b2c3d4e5f6a7b8
GITHUB_SECRET=your_github_client_secret_here
```

---

### `DATABASE_URL`
PostgreSQL connection string.

**How to get it:** [docs/DATABASE_SETUP.md](DATABASE_SETUP.md)

```
DATABASE_URL=postgresql://user:password@host:5432/database
```

---

## Optional Variables

### `OPENAI_API_KEY`
API key for AI-powered features (mood detection, song generation).

> The app works without this — AI features fall back to pre-written responses.

**How to get it:** [docs/GET_API_KEYS.md → OpenAI](GET_API_KEYS.md#4-openai-api-key-for-ai-features)

```
OPENAI_API_KEY=sk-proj-abc123...
```

---

### `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`
For payment processing (optional).

**How to get them:** [docs/GET_API_KEYS.md → Stripe](GET_API_KEYS.md#5-stripe-keys-optional--for-payments)

```
STRIPE_SECRET_KEY=sk_test_abc123...    # development
STRIPE_PUBLISHABLE_KEY=pk_test_abc123... # development
```

---

### `REDIS_URL`
For caching API responses (optional). Reduces OpenAI costs significantly.

**Free tier:** https://upstash.com

```
REDIS_URL=redis://default:password@host.upstash.io:6379
```

---

### `NEXT_PUBLIC_API_URL`
The base URL for client-side API calls. Usually the same as `NEXTAUTH_URL`.

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

### `PORT`
Local development port (default: 3000).

```
PORT=3000
```

---

## Full .env.local Example

```bash
# ─── Required ───────────────────────────────────────────────
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_SECRET=a1b2c3d4e5f6a7b8a1b2c3d4e5f6a7b8a1b2c3d4e5f6a7b8a1b2c3d4e5f6a7b8
GITHUB_ID=Iv1.yourgithubclientid
GITHUB_SECRET=yourgithubclientsecrethere
DATABASE_URL=postgresql://postgres:password@db.abc.supabase.co:5432/postgres

# ─── Optional ───────────────────────────────────────────────
OPENAI_API_KEY=sk-proj-abc123...
STRIPE_SECRET_KEY=sk_test_abc123...
STRIPE_PUBLISHABLE_KEY=pk_test_abc123...
REDIS_URL=
PORT=3000
```

---

## Security Best Practices

- ✅ Use different `NEXTAUTH_SECRET` for dev and production
- ✅ Use Stripe **test keys** (`sk_test_`, `pk_test_`) in development
- ✅ Use Stripe **live keys** (`sk_live_`, `pk_live_`) only in production
- ✅ Set a **spending limit** on your OpenAI account
- ✅ Rotate secrets immediately if accidentally exposed
- ❌ Never commit `.env.local` or any file with real secrets
- ❌ Never share secret keys in GitHub issues, chat, or email

---

## Verifying Your Setup

After setting all variables, test that everything works:

```bash
npm run dev
```

Then visit:
- **http://localhost:3000** — home page should load
- **http://localhost:3000/api/auth/signin** — GitHub login should appear
- **http://localhost:3000/api/health** — API should respond (if implemented)

If you see errors, check:
1. All required variables are set
2. No extra spaces around `=` signs
3. No quotes around values in `.env.local` (unless the value contains spaces)
