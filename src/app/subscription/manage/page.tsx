"use client";

import { useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";

export default function SubscriptionManagePage() {
  const { subscription, loading } = useSubscription("demo-user");
  const [billingLoading, setBillingLoading] = useState(false);

  async function openBillingPortal() {
    setBillingLoading(true);
    try {
      const response = await fetch("/api/subscriptions/manage-billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "demo-user" }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to open billing portal");

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to open billing portal");
    } finally {
      setBillingLoading(false);
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-3xl px-4 py-16 text-white/70">Loading subscription...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-6 text-4xl font-black text-white">Subscription management</h1>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-white/60">Current tier</p>
        <p className="mt-1 text-2xl font-bold capitalize text-white">{subscription.tier}</p>
        <p className="mt-2 text-sm text-white/50">Status: {subscription.status}</p>

        <div className="mt-5 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
          {Object.entries(subscription.features).map(([key, enabled]) => (
            <div key={key} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <span className="font-medium">{key}</span>: {enabled ? "Enabled" : "Locked"}
            </div>
          ))}
        </div>

        <button
          onClick={openBillingPortal}
          disabled={billingLoading}
          className="mt-6 rounded-xl bg-purple-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-purple-500 disabled:opacity-50"
        >
          {billingLoading ? "Opening billing..." : "Manage billing in Stripe"}
        </button>

        <p className="mt-4 text-xs text-white/40">
          Billing history is available inside the Stripe customer portal.
        </p>
      </div>
    </div>
  );
}
