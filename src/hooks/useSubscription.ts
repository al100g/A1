"use client";

import { useEffect, useMemo, useState } from "react";
import { SubscriptionTier, TIER_DEFINITIONS, TierFeatureFlags } from "@/lib/subscription-tiers";

type SubscriptionState = {
  tier: SubscriptionTier;
  status: string;
  features: TierFeatureFlags;
};

const FALLBACK_SUBSCRIPTION: SubscriptionState = {
  tier: "free",
  status: "active",
  features: TIER_DEFINITIONS.free.features,
};

export function useSubscription(userId = "demo-user") {
  const [subscription, setSubscription] = useState<SubscriptionState>(FALLBACK_SUBSCRIPTION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function run() {
      try {
        const response = await fetch(`/api/subscriptions/current?userId=${encodeURIComponent(userId)}`);
        if (!response.ok) throw new Error("Failed to fetch subscription");
        const data = await response.json();

        if (!mounted) return;
        setSubscription({
          tier: data.subscription.tier,
          status: data.subscription.status,
          features: data.subscription.features,
        });
      } catch {
        if (mounted) setSubscription(FALLBACK_SUBSCRIPTION);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, [userId]);

  const isVip = useMemo(() => subscription.tier === "vip", [subscription.tier]);

  return {
    subscription,
    loading,
    isVip,
  };
}
