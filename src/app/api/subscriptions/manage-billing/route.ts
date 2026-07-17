import { NextRequest, NextResponse } from "next/server";
import { getCurrentSubscription } from "@/lib/subscriptions-db";
import { getStripeClient } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as { userId?: string };
    const userId = body.userId ?? request.headers.get("x-user-id") ?? "demo-user";

    const current = await getCurrentSubscription(userId);
    if (!current.stripeCustomerId) {
      return NextResponse.json(
        { error: "No Stripe customer found for this account." },
        { status: 400 },
      );
    }

    const stripe = getStripeClient();
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: current.stripeCustomerId,
      return_url: `${request.nextUrl.origin}/subscription/manage`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Failed to create billing portal session", error);
    return NextResponse.json(
      { error: "Unable to open billing portal." },
      { status: 500 },
    );
  }
}
