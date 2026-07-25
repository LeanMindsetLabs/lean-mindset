import Link from "next/link";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { getSessionProfile } from "@/lib/auth/role";

export default async function TermsPage() {
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
        <h1 className="mt-6 font-display text-3xl uppercase tracking-wide text-white">Terms</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/65">
          Lean Mindset provides educational wellness guidance, not medical advice. Results vary.
          By using the app you agree to use labs and coaching responsibly. Full terms TBD.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
