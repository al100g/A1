# 🔑 How to Get API Keys

Step-by-step instructions for every key A1 needs.

---

## Overview

| Variable | Service | Required | Free Tier |
|----------|---------|----------|-----------|
| `DATABASE_URL` | Supabase / Railway / Render | ✅ Yes | ✅ Yes |
| `GITHUB_ID` + `GITHUB_SECRET` | GitHub OAuth | ✅ Yes | ✅ Always free |
| `NEXTAUTH_SECRET` | Generated locally | ✅ Yes | ✅ Free |
| `OPENAI_API_KEY` | OpenAI | ⚡ Optional | ❌ Pay-as-you-go |
| `STRIPE_SECRET_KEY` | Stripe | ❌ Optional | ✅ Test mode |

---

## 1. Database URL (Supabase — Recommended)

**Go to:** https://supabase.com

### Steps:
1. Click **"Start your project"**
2. Sign in with **GitHub**
3. Click **"New project"**
4. Fill in:
   - **Project name:** `A1 Music`
   - **Database password:** Create a strong password (save it!)
   - **Region:** Choose the one closest to your users
5. Click **"Create new project"** — wait 2-3 minutes for setup
6. Once ready, go to → **Settings** (⚙️ gear icon in left sidebar)
7. Click → **Database**
8. Scroll to **"Connection string"** section
9. Select **"URI"** tab
10. Copy the full connection string

**What to copy:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

**Where to paste:**
```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

> ⚠️ Replace `[YOUR-PASSWORD]` with the password you set in step 4.

---

## 2. GitHub OAuth Keys

**Go to:** https://github.com/settings/developers

### Steps:
1. Click **"New OAuth App"** (top right)
2. Fill in the form:
   - **Application name:** `A1 Music`
   - **Homepage URL:** `http://localhost:3000` *(update after deploying)*
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
3. Click **"Register application"**
4. You'll see the app's page with a **Client ID** — copy it

**Client ID:**
```
GITHUB_ID=Iv1.a1b2c3d4e5f6a7b8   ← copy this value
```

5. Click **"Generate a new client secret"**
6. Copy the secret immediately — it won't be shown again!

**Client Secret:**
```
GITHUB_SECRET=your_secret_value_here
```

### After deploying to Vercel:
Go back to this page and update the **Authorization callback URL** to:
```
https://your-app.vercel.app/api/auth/callback/github
```

---

## 3. NEXTAUTH_SECRET (Auto-Generated)

This is a random secret used to encrypt session cookies. **Never reuse between environments.**

### Option A — Run setup script (easiest):
```bash
bash scripts/setup.sh
# or
node scripts/setup.js
```

### Option B — Generate manually:
```bash
# Mac/Linux
openssl rand -hex 32

# Node.js (any platform)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Option C — Online generator:
Go to: **https://generate-secret.vercel.app/32**

Copy the output and paste it as:
```
NEXTAUTH_SECRET=a1b2c3d4e5f6a7b8...  (32+ character random string)
```

---

## 4. OpenAI API Key (for AI features)

**Go to:** https://platform.openai.com/account/api-keys

> 💡 The app still works without this — AI features use fallback responses.

### Steps:
1. Sign up or log in at **https://platform.openai.com**
2. Click your profile (top right) → **"API keys"**
   - Or go directly to: https://platform.openai.com/account/api-keys
3. Click **"Create new secret key"**
4. Give it a name: `A1 Music App`
5. Copy the key immediately — **it will never be shown again!**

**What to copy:**
```
OPENAI_API_KEY=sk-proj-abc123...
```

### Cost estimate:
- ~$0.002 per song generation (GPT-3.5)
- ~$0.02 per song generation (GPT-4)
- Free $5 credit for new accounts

### Billing:
- Go to https://platform.openai.com/account/billing to add a payment method
- Set a **monthly spending limit** to avoid surprises

---

## 5. Stripe Keys (optional — for payments)

**Go to:** https://dashboard.stripe.com/apikeys

### Steps:
1. Sign up or log in at **https://stripe.com**
2. Go to **Dashboard → Developers → API keys**
3. You'll see two keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

**For development** (use test keys):
```
STRIPE_SECRET_KEY=sk_test_abc123...
STRIPE_PUBLISHABLE_KEY=pk_test_abc123...
```

**For production** (use live keys):
```
STRIPE_SECRET_KEY=sk_live_abc123...
STRIPE_PUBLISHABLE_KEY=pk_live_abc123...
```

> ⚠️ Never use live keys in development — you'll charge real money!

---

## Adding Keys to Vercel

Once you have all your keys, add them to Vercel:

1. Go to → **https://vercel.com/dashboard**
2. Click your **A1 Music** project
3. Click **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)
5. For each variable:
   - Enter the **Name** (e.g., `NEXTAUTH_SECRET`)
   - Enter the **Value** (e.g., `a1b2c3...`)
   - Select environments: ✅ Production ✅ Preview ✅ Development
   - Click **Save**
6. **Redeploy** your app for variables to take effect

---

## Security Reminders

- ✅ Use different secrets for development and production
- ✅ Set spending limits on OpenAI
- ✅ Rotate secrets if they are ever accidentally exposed
- ❌ Never commit `.env.local` to git
- ❌ Never share secret keys in chat, email, or GitHub issues
- ❌ Never use production (live) Stripe keys in development
