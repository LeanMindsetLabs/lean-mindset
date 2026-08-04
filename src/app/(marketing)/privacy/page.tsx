import Link from "next/link";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { getSessionProfile } from "@/lib/auth/role";

export default async function PrivacyPage() {
  let signedIn = false;
  try {
    signedIn = Boolean(await getSessionProfile());
  } catch {
    signedIn = false;
  }

  return (
    <div className="min-h-dvh bg-black text-foreground">
      <SiteHeader signedIn={signedIn} />
      <main className="mx-auto max-w-2xl px-4 pb-16 pt-24 sm:px-6">
        <Link href="/" className="text-sm text-accent hover:text-accent-hover">
          ← Home
        </Link>
        <h1 className="mt-6 font-display text-3xl uppercase tracking-wide text-white">Privacy</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/65">
          Lean Mindset collects account and check-in data only to run labs and coaching. We do not
          sell personal information. Full policy TBD - contact us with questions.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
