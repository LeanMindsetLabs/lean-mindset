import Link from "next/link";
import { signOut } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  let email: string | null = null;
  let name: string | null = null;

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
      name = (user?.user_metadata?.full_name as string | undefined) ?? null;
    } catch {
      /* unset */
    }
  }

  return (
    <div className="flex min-h-[60dvh] flex-col gap-4 pt-4">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <p className="text-sm text-foreground-muted">Signed in as</p>
        <p className="mt-1 text-lg font-semibold">{name || "Member"}</p>
        <p className="text-sm text-foreground-muted">{email || "Not connected"}</p>
      </div>

      <div className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <p className="text-sm text-foreground-muted">Active lab</p>
        <p className="mt-1 text-lg font-semibold">6-Week Weight Loss Lab</p>
        <p className="mt-1 text-sm text-accent">Foundation track</p>
        <Link href="/program" className="mt-3 inline-block text-sm text-accent">
          Open materials →
        </Link>
      </div>

      <form action={signOut}>
        <button
          type="submit"
          className="w-full rounded-[var(--lm-radius-md)] border border-border px-4 py-3 text-sm font-medium text-foreground-muted hover:border-danger hover:text-danger"
        >
          Log out
        </button>
      </form>

      <p className="text-xs text-foreground-subtle">
        Accounts powered by Supabase. Light theme toggle can land here later.
      </p>
    </div>
  );
}
