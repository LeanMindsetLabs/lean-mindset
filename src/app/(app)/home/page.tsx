import Link from "next/link";
import { HomeDashboard } from "@/components/HomeDashboard";
import { getFounderOfferStatus } from "@/lib/onboarding/founder-offer";
import { getSessionProfile } from "@/lib/auth/role";
import { getMemberMetrics } from "@/lib/member-metrics";

export default async function MemberHomePage() {
  const founderOffer = await getFounderOfferStatus();
  const session = await getSessionProfile();
  const email = session?.email ?? null;
  const metrics =
    email && session && !session.userId.startsWith("demo:") ? await getMemberMetrics() : null;
  const firstName =
    session?.profile?.full_name?.split(" ")[0] ??
    email?.split("@")[0] ??
    "there";

  return (
    <div className="flex flex-col gap-3">
      {!email && (
        <section className="rounded-2xl border border-accent/40 bg-accent-soft p-3">
          <p className="text-sm font-semibold">Start your 6-week lab</p>
          <p className="mt-0.5 text-xs text-foreground-muted">
            {founderOffer.active
              ? "Pick a lab, choose a plan - join free."
              : "Pick a lab and choose a plan to get started."}
          </p>
          <div className="mt-2 flex gap-2">
            <Link href="/start" className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white">
              Get started
            </Link>
            <Link href="/login" className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold">
              Log in
            </Link>
          </div>
        </section>
      )}

      <HomeDashboard firstName={firstName} metrics={metrics} />
    </div>
  );
}
