import { QueryResultRow } from "pg";
import { getPool } from "@/lib/db";
import {
  getFeaturesForTier,
  SubscriptionTier,
  TIER_DEFINITIONS,
  TierFeatureFlags,
} from "@/lib/subscription-tiers";

type SubscriptionRow = QueryResultRow & {
  user_id: string;
  tier: SubscriptionTier;
  status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_end: string | null;
  created_at: string;
  updated_at: string;
};

type VipProfileRow = QueryResultRow & {
  user_id: string;
  voice_clone_model: string | null;
  vip_badge: boolean;
  zoom_scheduled_date: string | null;
};

export type CurrentSubscription = {
  userId: string;
  tier: SubscriptionTier;
  status: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  currentPeriodEnd: string | null;
  features: TierFeatureFlags;
  vipProfile: {
    voiceCloneModel: string | null;
    vipBadge: boolean;
    zoomScheduledDate: string | null;
  } | null;
};

function toCurrentSubscription(row: SubscriptionRow, vipProfile: VipProfileRow | null): CurrentSubscription {
  return {
    userId: row.user_id,
    tier: row.tier,
    status: row.status,
    stripeCustomerId: row.stripe_customer_id,
    stripeSubscriptionId: row.stripe_subscription_id,
    currentPeriodEnd: row.current_period_end,
    features: getFeaturesForTier(row.tier),
    vipProfile: row.tier === "vip"
      ? {
          voiceCloneModel: vipProfile?.voice_clone_model ?? null,
          vipBadge: vipProfile?.vip_badge ?? true,
          zoomScheduledDate: vipProfile?.zoom_scheduled_date ?? null,
        }
      : null,
  };
}

export async function ensureFreeSubscription(userId: string) {
  const pool = getPool();

  await pool.query(
    `
      INSERT INTO subscriptions (user_id, tier, status)
      VALUES ($1, 'free', 'active')
      ON CONFLICT (user_id) DO NOTHING
    `,
    [userId],
  );
}

export async function getCurrentSubscription(userId: string): Promise<CurrentSubscription> {
  await ensureFreeSubscription(userId);

  const pool = getPool();
  const result = await pool.query<SubscriptionRow>(
    `
      SELECT user_id, tier, status, stripe_customer_id, stripe_subscription_id, current_period_end, created_at, updated_at
      FROM subscriptions
      WHERE user_id = $1
      LIMIT 1
    `,
    [userId],
  );

  const row = result.rows[0];
  if (!row) {
    return {
      userId,
      tier: "free",
      status: "active",
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      currentPeriodEnd: null,
      features: TIER_DEFINITIONS.free.features,
      vipProfile: null,
    };
  }

  const vipProfileResult = row.tier === "vip"
    ? await pool.query<VipProfileRow>(
        `
          SELECT user_id, voice_clone_model, vip_badge, zoom_scheduled_date
          FROM vip_profiles
          WHERE user_id = $1
          LIMIT 1
        `,
        [userId],
      )
    : { rows: [] as VipProfileRow[] };

  return toCurrentSubscription(row, vipProfileResult.rows[0] ?? null);
}

export type UpsertSubscriptionInput = {
  userId: string;
  tier: SubscriptionTier;
  status: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  currentPeriodEnd: Date | null;
};

export async function upsertSubscription(input: UpsertSubscriptionInput) {
  const pool = getPool();

  await pool.query(
    `
      INSERT INTO subscriptions (
        user_id,
        tier,
        status,
        stripe_customer_id,
        stripe_subscription_id,
        current_period_end
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (user_id)
      DO UPDATE SET
        tier = EXCLUDED.tier,
        status = EXCLUDED.status,
        stripe_customer_id = EXCLUDED.stripe_customer_id,
        stripe_subscription_id = EXCLUDED.stripe_subscription_id,
        current_period_end = EXCLUDED.current_period_end,
        updated_at = NOW()
    `,
    [
      input.userId,
      input.tier,
      input.status,
      input.stripeCustomerId,
      input.stripeSubscriptionId,
      input.currentPeriodEnd,
    ],
  );

  if (input.tier === "vip") {
    await pool.query(
      `
        INSERT INTO vip_profiles (user_id, vip_badge)
        VALUES ($1, TRUE)
        ON CONFLICT (user_id)
        DO UPDATE SET vip_badge = TRUE, updated_at = NOW()
      `,
      [input.userId],
    );
  }
}

export async function getTierFeatures(tier: SubscriptionTier): Promise<TierFeatureFlags> {
  const pool = getPool();
  const result = await pool.query<QueryResultRow>(
    `
      SELECT feature_key, enabled
      FROM subscription_features
      WHERE tier = $1
    `,
    [tier],
  );

  if (result.rows.length === 0) {
    return getFeaturesForTier(tier);
  }

  const baseFeatures = getFeaturesForTier(tier);
  const featureMap = { ...baseFeatures } as Record<keyof TierFeatureFlags, boolean>;

  for (const row of result.rows) {
    const key = row.feature_key as keyof TierFeatureFlags;
    if (key in featureMap) {
      featureMap[key] = Boolean(row.enabled);
    }
  }

  return featureMap as TierFeatureFlags;
}
