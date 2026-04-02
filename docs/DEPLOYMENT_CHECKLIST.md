# ✅ Deployment Checklist

Use this checklist before every production deployment. Estimated total time: **~30 minutes** for first-time setup.

---

## Phase 1: Local Setup *(~10 minutes)*

### Environment
- [ ] Copied `.env.example` to `.env.local`
- [ ] `NEXTAUTH_SECRET` generated and set (32+ random chars)
- [ ] `NEXTAUTH_URL` set to `http://localhost:3000`
- [ ] `DATABASE_URL` connected and tested
- [ ] `GITHUB_ID` and `GITHUB_SECRET` set
- [ ] `OPENAI_API_KEY` set *(optional — app works without it)*

### Database
- [ ] PostgreSQL database provisioned (Supabase / Railway / Render)
- [ ] Migrations applied: `npx prisma db push`
- [ ] Database connection verified: `npx prisma studio`

### Local Testing
- [ ] `npm install` ran without errors
- [ ] `npm run dev` starts without errors
- [ ] Home page loads at http://localhost:3000
- [ ] GitHub login works (redirects correctly)
- [ ] AI features work *(if OpenAI key is set)*
- [ ] No console errors in browser DevTools

---

## Phase 2: Vercel Setup *(~5 minutes)*

### Account & Project
- [ ] Vercel account created at https://vercel.com
- [ ] GitHub repository connected to Vercel project
- [ ] `vercel.json` present in repository root

### Environment Variables (add all in Vercel → Settings → Environment Variables)
- [ ] `NODE_ENV` = `production`
- [ ] `NEXTAUTH_URL` = your Vercel URL (e.g., `https://a1music.vercel.app`)
- [ ] `NEXT_PUBLIC_API_URL` = same as `NEXTAUTH_URL`
- [ ] `NEXTAUTH_SECRET` = *production secret (different from dev!)*
- [ ] `DATABASE_URL` = production database connection string
- [ ] `GITHUB_ID` = GitHub OAuth client ID
- [ ] `GITHUB_SECRET` = GitHub OAuth client secret
- [ ] `OPENAI_API_KEY` = *(optional)*
- [ ] `STRIPE_SECRET_KEY` = *(optional — use `sk_live_` for production)*
- [ ] `STRIPE_PUBLISHABLE_KEY` = *(optional — use `pk_live_` for production)*

---

## Phase 3: GitHub OAuth Update *(~2 minutes)*

- [ ] Deployed to Vercel — URL confirmed (e.g., `a1music.vercel.app`)
- [ ] Updated GitHub OAuth app callback URL:
  - Go to: https://github.com/settings/developers
  - **Authorization callback URL:** `https://your-vercel-url.vercel.app/api/auth/callback/github`
  - **Homepage URL:** `https://your-vercel-url.vercel.app`
- [ ] Updated `NEXTAUTH_URL` in Vercel to match your Vercel URL
- [ ] Triggered a redeploy after URL change

---

## Phase 4: Production Testing *(~5 minutes)*

- [ ] Production URL loads correctly
- [ ] HTTPS is working (green lock in browser)
- [ ] GitHub login works on production URL
- [ ] Redirects back to app after login
- [ ] AI songwriting returns results *(if OpenAI key set)*
- [ ] Mood detection page works
- [ ] No errors in Vercel deployment logs
- [ ] No errors in browser DevTools console

---

## Phase 5: Optional Enhancements

- [ ] Custom domain configured (Vercel → Domains)
- [ ] DNS TTL reduced before cutover
- [ ] Uptime monitoring set up (e.g., https://betteruptime.com)
- [ ] Error tracking set up (e.g., https://sentry.io)
- [ ] Analytics added (e.g., Vercel Analytics)
- [ ] OpenAI spending limit configured
- [ ] Stripe webhooks configured *(if using payments)*

---

## Troubleshooting

### Build Fails on Vercel

1. Check **Vercel → Deployments → Build Logs** for error details
2. Common causes:
   - Missing environment variable → add it in Vercel settings
   - Type error in code → fix locally and push again
   - Missing dependency → run `npm install` locally and push

### Login Redirect Fails

- Confirm `NEXTAUTH_URL` matches your **exact** production URL
- Confirm GitHub OAuth callback URL matches exactly (no trailing slash)
- Confirm `NEXTAUTH_SECRET` is set in Vercel

### Database Connection Error

- Confirm `DATABASE_URL` in Vercel matches exactly what works locally
- Add `?sslmode=require` to the end if getting SSL errors
- Check database provider dashboard — free tiers may need to be woken up

### "Application Error" on Page Load

- Check Vercel **Function Logs** for the specific error
- Make sure all required env vars are set
- Try redeploying: Vercel → Deployments → Redeploy

---

## Reference Links

| Service | Link |
|---------|------|
| Vercel Dashboard | https://vercel.com/dashboard |
| GitHub OAuth Apps | https://github.com/settings/developers |
| Supabase | https://supabase.com |
| OpenAI API Keys | https://platform.openai.com/account/api-keys |
| Stripe Dashboard | https://dashboard.stripe.com |
| Vercel Build Logs | https://vercel.com/dashboard → Deployments |

---

## 📚 Related Guides

- [docs/QUICK_START.md](QUICK_START.md) — Fast path to launch
- [docs/GET_API_KEYS.md](GET_API_KEYS.md) — How to get each API key
- [docs/DATABASE_SETUP.md](DATABASE_SETUP.md) — Database setup options
- [docs/ENV_SETUP.md](ENV_SETUP.md) — Environment variables reference
