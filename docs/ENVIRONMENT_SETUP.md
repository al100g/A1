# A1 Music Platform — Environment Setup Guide

This guide explains every environment variable used by the A1 app and how to obtain its value.

---

## Quick Start

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```
2. Fill in each value following the instructions below.
3. Never commit `.env.local` — it is git-ignored.

---

## Variable Reference

### `NODE_ENV`
**Values:** `development` | `staging` | `production`  
**Default:** `development`  
Controls which code paths and optimisations are active. Vercel sets this automatically in deployed environments.

---

### `NEXTAUTH_URL`
**Required in production**  
The canonical URL of your app — no trailing slash.

| Environment | Value |
|---|---|
| Local dev | `http://localhost:3000` |
| Vercel preview | Leave blank (Vercel injects `VERCEL_URL`) |
| Production | `https://your-app.vercel.app` (or custom domain) |

---

### `NEXT_PUBLIC_APP_URL`
**Optional**  
Same as `NEXTAUTH_URL` but exposed to the browser (`NEXT_PUBLIC_` prefix). Used for generating absolute links in the UI.

---

### `NEXTAUTH_SECRET`
**Required in production**  
A random string used to sign/encrypt NextAuth.js JWTs and cookies.

Generate one with:
```bash
openssl rand -base64 32
```

⚠️ Keep this secret. If it changes, all existing sessions will be invalidated.

---

### `GITHUB_ID` and `GITHUB_SECRET`

Used for "Sign in with GitHub" via NextAuth.js.

**How to create a GitHub OAuth app:**
1. Go to [https://github.com/settings/developers](https://github.com/settings/developers)
2. Click **"OAuth Apps"** → **"New OAuth App"**
3. Fill in:
   - **Application name**: A1 Music (or any name)
   - **Homepage URL**: Your app URL
   - **Authorization callback URL**: `https://your-app.vercel.app/api/auth/callback/github`
     (For local dev: `http://localhost:3000/api/auth/callback/github`)
4. Click **"Register application"**
5. Copy **Client ID** → `GITHUB_ID`
6. Click **"Generate a new client secret"** → copy the value → `GITHUB_SECRET`

> **Tip:** Create separate OAuth apps for development and production to avoid callback URL conflicts.

---

### `DATABASE_URL`
**Required**  
PostgreSQL connection string in the format:
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
```

See [DATABASE_SETUP.md](DATABASE_SETUP.md) for step-by-step instructions for Supabase, Railway, Render, and Neon.

---

### `OPENAI_API_KEY`
**Optional**  
Used for AI-powered mood analysis and song generation. The app works without this key using pre-written fallback prompts.

1. Create an account at [https://platform.openai.com](https://platform.openai.com)
2. Go to [API Keys](https://platform.openai.com/api-keys)
3. Click **"Create new secret key"**
4. Copy the key (you can only view it once!)

> **Cost note:** GPT-4o-mini is used by default to minimise costs. Enable Redis caching (`REDIS_URL`) to reduce API calls further.

---

### `REDIS_URL`
**Optional**  
Used for caching OpenAI API responses. If not set, caching is silently disabled and the app still works.

**Free options:**
- [Upstash](https://upstash.com) — free tier, Redis-compatible, works with Vercel
- [Redis Cloud](https://redis.com) — free 30MB tier

Connection string format: `redis://default:PASSWORD@HOST:PORT`

---

### `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`
**Required for payment features**  
Used for subscription billing.

1. Create an account at [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Go to **Developers → API Keys**
3. Copy **Publishable key** → `STRIPE_PUBLISHABLE_KEY`
4. Click **"Reveal test key"** → copy **Secret key** → `STRIPE_SECRET_KEY`

Use `sk_test_` / `pk_test_` keys in development and `sk_live_` / `pk_live_` in production.

---

### `STRIPE_WEBHOOK_SECRET`
**Required for Stripe webhooks**  
Used to verify that webhook events are genuinely from Stripe.

**For local development:**
```bash
# Install the Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copy the "webhook signing secret" printed in the terminal
```

**For production:**
1. Go to [Stripe Webhooks dashboard](https://dashboard.stripe.com/webhooks)
2. Click **"Add endpoint"**
3. Set URL: `https://your-app.vercel.app/api/webhooks/stripe`
4. Select events to listen for (e.g. `customer.subscription.*`)
5. Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`

---

## Vercel Environment Configuration

### Adding secrets to Vercel

```bash
# Install Vercel CLI
npm install -g vercel
vercel login

# Add a secret (prompted interactively)
vercel env add NEXTAUTH_SECRET production
```

Or use the [Vercel dashboard](https://vercel.com/dashboard) → **Project → Settings → Environment Variables**.

### Using Vercel secrets in vercel.json

The `vercel.json` references secrets with `@secret-name` notation (e.g. `@nextauth_secret`). These must match the secret names you created in Vercel.

---

## Security Checklist

Before going to production:

- [ ] `NEXTAUTH_SECRET` is a random 32+ character string (not the example value)
- [ ] `DATABASE_URL` points to production database
- [ ] `GITHUB_SECRET` is from a dedicated production OAuth app
- [ ] Stripe **live** keys are used (not test keys)
- [ ] `.env.local` is **not** committed to git
- [ ] Vercel environment variables are set to the correct scope (Production/Preview/Development)
