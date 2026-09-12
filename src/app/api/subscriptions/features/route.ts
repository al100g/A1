import { NextRequest, NextResponse } from "next/server";
import { getCurrentSubscription, getTierFeatures } from "@/lib/subscriptions-db";
import { TIER_ORDER } from "@/lib/subscription-tiers";

function getUserId(request: NextRequest) {
  return (
    request.nextUrl.searchParams.get("userId") ??
    request.headers.get("x-user-id") ??
    "demo-user"
  );
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    const subscription = await getCurrentSubscription(userId);
    const features = await getTierFeatures(subscription.tier);

    return NextResponse.json({
      tier: subscription.tier,
      features,
      tierOrder: TIER_ORDER,
    });
  } catch (error) {
    console.error("Failed to fetch subscription features", error);
    return NextResponse.json(
      { error: "Unable to fetch subscription features." },
      { status: 500 },
    );
  }
}
