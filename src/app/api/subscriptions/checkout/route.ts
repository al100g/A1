import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import {
  getTierPriceId,
  isSubscriptionTier,
  TIER_DEFINITIONS,
} from "@/lib/subscription-tiers";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { tier?: string; userId?: string; email?: string };
    const tier = body.tier;
    const userId = body.userId ?? request.headers.get("x-user-id") ?? "demo-user";

    if (!tier || !isSubscriptionTier(tier)) {
      return NextResponse.json({ error: "Invalid subscription tier." }, { status: 400 });
    }

    if (!TIER_DEFINITIONS[tier].isPaid) {
      return NextResponse.json(
        { error: "Free tier does not require checkout." },
        { status: 400 },
      );
    }

    const priceId = getTierPriceId(tier);
    if (!priceId) {
      return NextResponse.json(
        { error: `Stripe price ID is not configured for ${tier}.` },
        { status: 500 },
      );
    }

    const stripe = getStripeClient();
    const customer = await stripe.customers.create({
      email: body.email,
      metadata: {
        user_id: userId,
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        user_id: userId,
        tier,
      },
      subscription_data: {
        metadata: {
          user_id: userId,
          tier,
        },
      },
      success_url: `${request.nextUrl.origin}/subscription/manage?checkout=success`,
      cancel_url: `${request.nextUrl.origin}/pricing?checkout=cancelled`,
    });

    return NextResponse.json({
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Failed to create checkout session", error);
    return NextResponse.json(
      { error: "Unable to create checkout session." },
      { status: 500 },
    );
  }
}
