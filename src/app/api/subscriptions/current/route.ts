import { NextRequest, NextResponse } from "next/server";
import { getCurrentSubscription, getTierFeatures } from "@/lib/subscriptions-db";

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
    const current = await getCurrentSubscription(userId);
    const features = await getTierFeatures(current.tier);

    return NextResponse.json({
      subscription: {
        ...current,
        features,
      },
    });
  } catch (error) {
    console.error("Failed to fetch current subscription", error);
    return NextResponse.json(
      { error: "Unable to fetch current subscription." },
      { status: 500 },
    );
  }
}
