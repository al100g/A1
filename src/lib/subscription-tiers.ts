export type SubscriptionTier = "free" | "plus" | "pro" | "creator" | "vip";

export type TierFeatureFlags = {
  unlimitedDuets: boolean;
  voiceChoice: boolean;
  recordDuets: boolean;
  downloadMp3: boolean;
  fullAiGeneration: boolean;
  beatUpload: boolean;
  voiceClone: boolean;
  priorityGeneration: boolean;
  licensedHitsAccess: boolean;
  monthlyZoomSession: boolean;
  vipBadge: boolean;
};

export type TierDefinition = {
  tier: SubscriptionTier;
  name: string;
  priceInPence: number;
  monthlyLabel: string;
  isPaid: boolean;
  tagline: string;
  features: TierFeatureFlags;
};

export const TIER_ORDER: SubscriptionTier[] = ["free", "plus", "pro", "creator", "vip"];

export const TIER_DEFINITIONS: Record<SubscriptionTier, TierDefinition> = {
  free: {
    tier: "free",
    name: "Free",
    priceInPence: 0,
    monthlyLabel: "Try it",
    isPaid: false,
    tagline: "Basic duets with pre-set voices",
    features: {
      unlimitedDuets: false,
      voiceChoice: false,
      recordDuets: false,
      downloadMp3: false,
      fullAiGeneration: false,
      beatUpload: false,
      voiceClone: false,
      priorityGeneration: false,
      licensedHitsAccess: false,
      monthlyZoomSession: false,
      vipBadge: false,
    },
  },
  plus: {
    tier: "plus",
    name: "Plus",
    priceInPence: 299,
    monthlyLabel: "£2.99/month",
    isPaid: true,
    tagline: "Unlimited duets + voice choice",
    features: {
      unlimitedDuets: true,
      voiceChoice: true,
      recordDuets: false,
      downloadMp3: false,
      fullAiGeneration: false,
      beatUpload: false,
      voiceClone: false,
      priorityGeneration: false,
      licensedHitsAccess: false,
      monthlyZoomSession: false,
      vipBadge: false,
    },
  },
  pro: {
    tier: "pro",
    name: "Pro",
    priceInPence: 599,
    monthlyLabel: "£5.99/month",
    isPaid: true,
    tagline: "Record and download your songs",
    features: {
      unlimitedDuets: true,
      voiceChoice: true,
      recordDuets: true,
      downloadMp3: true,
      fullAiGeneration: false,
      beatUpload: false,
      voiceClone: false,
      priorityGeneration: false,
      licensedHitsAccess: false,
      monthlyZoomSession: false,
      vipBadge: false,
    },
  },
  creator: {
    tier: "creator",
    name: "Creator",
    priceInPence: 999,
    monthlyLabel: "£9.99/month",
    isPaid: true,
    tagline: "Full AI songs + upload your beats",
    features: {
      unlimitedDuets: true,
      voiceChoice: true,
      recordDuets: true,
      downloadMp3: true,
      fullAiGeneration: true,
      beatUpload: true,
      voiceClone: false,
      priorityGeneration: false,
      licensedHitsAccess: false,
      monthlyZoomSession: false,
      vipBadge: false,
    },
  },
  vip: {
    tier: "vip",
    name: "VIP",
    priceInPence: 1999,
    monthlyLabel: "£19.99/month",
    isPaid: true,
    tagline: "Backstage pass with premium access",
    features: {
      unlimitedDuets: true,
      voiceChoice: true,
      recordDuets: true,
      downloadMp3: true,
      fullAiGeneration: true,
      beatUpload: true,
      voiceClone: true,
      priorityGeneration: true,
      licensedHitsAccess: true,
      monthlyZoomSession: true,
      vipBadge: true,
    },
  },
};

export function isSubscriptionTier(value: string): value is SubscriptionTier {
  return value in TIER_DEFINITIONS;
}

export function getTierPriceId(tier: SubscriptionTier): string | null {
  const mapping: Record<Exclude<SubscriptionTier, "free">, string | undefined> = {
    plus: process.env.STRIPE_PRICE_PLUS,
    pro: process.env.STRIPE_PRICE_PRO,
    creator: process.env.STRIPE_PRICE_CREATOR,
    vip: process.env.STRIPE_PRICE_VIP,
  };

  if (tier === "free") return null;
  return mapping[tier] ?? null;
}

export function getTierByPriceId(priceId: string | null | undefined): SubscriptionTier | null {
  if (!priceId) return null;
  const paidTiers: Exclude<SubscriptionTier, "free">[] = ["plus", "pro", "creator", "vip"];

  for (const tier of paidTiers) {
    if (getTierPriceId(tier) === priceId) {
      return tier;
    }
  }

  return null;
}

export function getFeaturesForTier(tier: SubscriptionTier): TierFeatureFlags {
  return TIER_DEFINITIONS[tier].features;
}
