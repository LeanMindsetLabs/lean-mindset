import Link from "next/link";
import { HomeDashboard } from "@/components/HomeDashboard";
import { getMemberMetrics } from "@/lib/member-metrics";
import { createClient } from "@/lib/supabase/server";

export default async function MemberHomePage() {
  let email: string | null = null;
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      email = user?.email ?? null;
    } catch {
      email = null;
    }
  }

  const metrics = email ? await getMemberMetrics() : null;
  const firstName = email?.split("@")[0] ?? "there";

  return (
    <div className="flex flex-col gap-3">
      {!email && (
        <section className="rounded-2xl border border-accent/40 bg-accent-soft p-3">
          <p className="text-sm font-semibold">Create your account</p>
          <p className="mt-0.5 text-xs text-foreground-muted">Unlock rings, meals, and check-ins.</p>
          <div className="mt-2 flex gap-2">
            <Link href="/signup" className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white">
              Sign up
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
