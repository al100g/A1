# Stripe subscription setup

Create monthly Stripe prices in test mode and copy their IDs into `.env.local`.

## Products and prices
- Plus — £2.99/month
- Pro — £5.99/month
- Creator — £9.99/month
- VIP — £19.99/month

## Required environment variables
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_PLUS`
- `STRIPE_PRICE_PRO`
- `STRIPE_PRICE_CREATOR`
- `STRIPE_PRICE_VIP`

## Webhook endpoint
Configure Stripe webhook endpoint:

`/api/webhooks/stripe`

Subscribe to events:
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `subscription.created`
- `subscription.updated`
- `subscription.deleted`
