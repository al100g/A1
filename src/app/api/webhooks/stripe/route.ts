import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe";
import { getTierByPriceId, SubscriptionTier } from "@/lib/subscription-tiers";
import { upsertSubscription } from "@/lib/subscriptions-db";

function tierFromSubscription(subscription: Stripe.Subscription): SubscriptionTier {
  const priceId = subscription.items.data[0]?.price?.id;
  return getTierByPriceId(priceId) ?? "free";
}

function periodEndDate(subscription: Stripe.Subscription) {
  if (!subscription.current_period_end) return null;
  return new Date(subscription.current_period_end * 1000);
}

async function resolveUserId(stripe: Stripe, subscription: Stripe.Subscription) {
  const subscriptionUserId = subscription.metadata.user_id;

  if (subscriptionUserId) return subscriptionUserId;

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id;

  if (!customerId) return null;

  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) return null;

  return customer.metadata.user_id ?? null;
}

async function handleSubscriptionChange(stripe: Stripe, subscription: Stripe.Subscription) {
  const userId = await resolveUserId(stripe, subscription);
  if (!userId) {
    console.warn("Skipping Stripe webhook without user_id metadata", subscription.id);
    return;
  }

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id ?? null;

  await upsertSubscription({
    userId,
    tier: tierFromSubscription(subscription),
    status: subscription.status,
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscription.id,
    currentPeriodEnd: periodEndDate(subscription),
  });
}

async function handleSubscriptionDeleted(stripe: Stripe, subscription: Stripe.Subscription) {
  const userId = await resolveUserId(stripe, subscription);
  if (!userId) return;

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id ?? null;

  await upsertSubscription({
    userId,
    tier: "free",
    status: "canceled",
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscription.id,
    currentPeriodEnd: periodEndDate(subscription),
  });
}

export async function POST(request: NextRequest) {
  const stripe = getStripeClient();

  try {
    const signature = request.headers.get("stripe-signature");
    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Missing stripe-signature or STRIPE_WEBHOOK_SECRET." },
        { status: 400 },
      );
    }

    const body = await request.text();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    const eventType = event.type as string;

    switch (eventType) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "subscription.created":
      case "subscription.updated": {
        await handleSubscriptionChange(stripe, event.data.object as Stripe.Subscription);
        break;
      }
      case "customer.subscription.deleted":
      case "subscription.deleted": {
        await handleSubscriptionDeleted(stripe, event.data.object as Stripe.Subscription);
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook failed", error);
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 400 });
  }
}
