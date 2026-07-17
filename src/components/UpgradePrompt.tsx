import Link from "next/link";

type UpgradePromptProps = {
  requiredTier: string;
  featureName: string;
};

export default function UpgradePrompt({ requiredTier, featureName }: UpgradePromptProps) {
  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
      <p className="font-semibold">{featureName} is a {requiredTier} feature.</p>
      <p className="mt-1 text-amber-100/80">
        Upgrade your plan to unlock this feature and keep creating with A1.
      </p>
      <Link
        href="/pricing"
        className="mt-3 inline-block rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-black transition hover:bg-amber-400"
      >
        View plans
      </Link>
    </div>
  );
}
