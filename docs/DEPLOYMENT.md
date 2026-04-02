# A1 Music Platform — Deployment Guide

Step-by-step instructions for deploying the A1 app to production on Vercel.

---

## Prerequisites

Before you start, make sure you have:

- [ ] A [Vercel account](https://vercel.com/signup) (free tier works)
- [ ] A [GitHub account](https://github.com) with the A1 repo access
- [ ] A PostgreSQL database (see [DATABASE_SETUP.md](DATABASE_SETUP.md))
- [ ] A GitHub OAuth app (see [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md))
- [ ] `node` ≥ 18 and `npm` ≥ 9 installed locally

---

## Phase 1: Local Setup

### 1. Clone and install dependencies

```bash
git clone https://github.com/al100g/A1.git
cd A1
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in every variable. See [ENVIRONMENT_SETUP.md](ENVIRONMENT_SETUP.md) for detailed instructions on obtaining each value.

### 3. Set up the database

```bash
# Apply the Prisma schema to your database
npx prisma db push

# (Optional) Seed with sample data for development
npx prisma db seed
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see the A1 landing page.

---

## Phase 2: Vercel Deployment

### 1. Install the Vercel CLI

```bash
npm install -g vercel
vercel login
```

### 2. Link to Vercel

From the project root:

```bash
vercel link
```

Follow the prompts to connect to your Vercel account and create (or link) a project.

### 3. Add environment variables to Vercel

Go to your [Vercel project settings → Environment Variables](https://vercel.com/dashboard) and add **all** variables from `.env.example`. Set the appropriate scope for each:

| Variable | Production | Preview | Development |
|---|---|---|---|
| `NEXTAUTH_URL` | Your prod URL | Auto (preview URL) | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Strong secret | Same as prod | Any dev secret |
| `GITHUB_ID` | Prod OAuth app | Preview OAuth app | Dev OAuth app |
| `GITHUB_SECRET` | Prod OAuth secret | Preview secret | Dev secret |
| `DATABASE_URL` | Prod DB | Staging DB (recommended) | Local DB |
| `OPENAI_API_KEY` | Your key | Your key | Optional |
| `REDIS_URL` | Prod Redis | Optional | Optional |
| `STRIPE_SECRET_KEY` | Live key | Test key | Test key |
| `STRIPE_PUBLISHABLE_KEY` | Live key | Test key | Test key |
| `STRIPE_WEBHOOK_SECRET` | Prod webhook | Optional | Optional |

> **Tip:** For `NEXTAUTH_URL` in preview deployments, leave it blank — Vercel automatically injects `VERCEL_URL` which NextAuth can detect.

### 4. Deploy

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

After deployment, Vercel will output your production URL (e.g. `https://a1.vercel.app`).

### 5. Update GitHub OAuth callback URL

In your [GitHub OAuth app settings](https://github.com/settings/developers), update the **Authorization callback URL** to:

```
https://your-production-url.vercel.app/api/auth/callback/github
```

### 6. Run database migrations in production

```bash
# Run against your production database
DATABASE_URL="your-production-db-url" npx prisma db push
```

---

## Phase 3: Automatic Deployments (CI/CD)

The `.github/workflows/deploy.yml` workflow automatically:

1. **On every pull request**: Runs lint, type-check, tests, and builds the app
2. **On merge to `main`**: Deploys to Vercel production

### Required GitHub Secrets

Go to your [repo settings → Secrets and variables → Actions](https://github.com/al100g/A1/settings/secrets/actions) and add:

| Secret name | Value |
|---|---|
| `VERCEL_TOKEN` | From [Vercel account settings → Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | From `.vercel/project.json` after running `vercel link` |
| `VERCEL_PROJECT_ID` | From `.vercel/project.json` after running `vercel link` |
| `NEXTAUTH_SECRET` | Same as in Vercel env vars |
| `DATABASE_URL` | Production DB connection string |

---

## Rollback

If a deployment introduces a bug:

### Via Vercel Dashboard
1. Go to your [Vercel project deployments](https://vercel.com/dashboard)
2. Find the last good deployment
3. Click "..." → **"Promote to Production"**

### Via Vercel CLI
```bash
vercel rollback
```

---

## Health Check

After deployment, verify the app is working:

```bash
# Check the app responds
curl -I https://your-app.vercel.app

# Check the auth endpoint
curl https://your-app.vercel.app/api/auth/providers
```

Expected: HTTP 200 responses.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| `NEXTAUTH_SECRET` not set | Set the env var in Vercel and redeploy |
| Auth callback URL mismatch | Update the OAuth callback URL in GitHub settings |
| Prisma can't connect | Check `DATABASE_URL` format and that the DB is reachable |
| Build fails on `prisma generate` | Ensure `prisma` is in `devDependencies` and `postinstall` runs `prisma generate` |
| OpenAI errors | App uses fallbacks — errors are non-fatal |
| Cold start latency | Expected on Vercel hobby tier; upgrade for production workloads |

For more help, see the project [README](../README.md) or open an issue on GitHub.
