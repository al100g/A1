"use client";

import { useMemo, useState } from "react";
import {
  SubscriptionTier,
  TIER_DEFINITIONS,
  TIER_ORDER,
  TierFeatureFlags,
} from "@/lib/subscription-tiers";

const FEATURE_LABELS: Record<keyof TierFeatureFlags, string> = {
  unlimitedDuets: "Unlimited duets",
  voiceChoice: "Voice choice selector",
  recordDuets: "Record duets",
  downloadMp3: "Download songs as MP3",
  fullAiGeneration: "Full AI song generation",
  beatUpload: "Upload your own beats",
  voiceClone: "AI voice clone",
  priorityGeneration: "Priority generation (<3 seconds)",
  licensedHitsAccess: "Licensed hits access (future)",
  monthlyZoomSession: "Monthly Zoom session with creator",
  vipBadge: "VIP badge in app and shared videos",
};

export default function PricingPage() {
  const [loadingTier, setLoadingTier] = useState<SubscriptionTier | null>(null);
  const tiers = useMemo(() => TIER_ORDER.map((tier) => TIER_DEFINITIONS[tier]), []);

  async function subscribe(tier: SubscriptionTier) {
    if (tier === "free") return;

    setLoadingTier(tier);
    try {
      const response = await fetch("/api/subscriptions/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, userId: "demo-user" }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Checkout failed");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to start checkout");
    } finally {
      setLoadingTier(null);
    }
  }

  const allFeatures = Object.keys(FEATURE_LABELS) as (keyof TierFeatureFlags)[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-black text-white">Choose your A1 plan</h1>
        <p className="text-white/60">Five tiers from free to VIP backstage access.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {tiers.map((tier) => (
          <div
            key={tier.tier}
            className={`rounded-2xl border p-5 ${
              tier.tier === "vip"
                ? "border-yellow-500/50 bg-yellow-500/10"
                : "border-white/10 bg-white/5"
            }`}
          >
            <h2 className="text-xl font-black text-white">{tier.name}</h2>
            <p className="mt-1 text-sm text-white/60">{tier.monthlyLabel}</p>
            <p className="mt-3 text-sm text-white/70">{tier.tagline}</p>
            <button
              onClick={() => subscribe(tier.tier)}
              disabled={loadingTier === tier.tier || tier.tier === "free"}
              className="mt-5 w-full rounded-xl bg-purple-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {tier.tier === "free"
                ? "Current starter tier"
                : loadingTier === tier.tier
                  ? "Starting checkout..."
                  : `Subscribe to ${tier.name}`}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 p-4">
        <table className="min-w-full text-left text-sm text-white/80">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase text-white/50">
              <th className="px-3 py-2">Feature</th>
              {tiers.map((tier) => (
                <th key={tier.tier} className="px-3 py-2">{tier.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((featureKey) => (
              <tr key={featureKey} className="border-b border-white/5">
                <td className="px-3 py-2">{FEATURE_LABELS[featureKey]}</td>
                {tiers.map((tier) => (
                  <td key={`${tier.tier}-${featureKey}`} className="px-3 py-2">
                    {tier.features[featureKey] ? "✅" : "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
