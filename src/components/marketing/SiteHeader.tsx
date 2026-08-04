import Link from "next/link";
import { LeanMindsetLogo } from "@/components/brand/LeanMindsetLogo";
import { MOBILE_APP_ENTRY } from "@/lib/device/mobile-preview";

export function SiteHeader({ signedIn }: { signedIn: boolean }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Official squircle lm + lean(white)/mindset(blue) — replaces old circle + gray */}
        <LeanMindsetLogo variant="lockup" iconSize={28} href="/" />
        <nav className="hidden items-center gap-5 text-sm text-foreground-muted md:flex">
          <Link href="/labs" className="hover:text-accent">
            Labs
          </Link>
          <Link href="/#pricing" className="hover:text-accent">
            Pricing
          </Link>
          <Link href="/blog" className="hover:text-accent">
            Blog
          </Link>
          <Link href={signedIn ? "/check-in" : "/start"} className="hover:text-accent">
            Coaching
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {signedIn ? (
            <Link
              href={MOBILE_APP_ENTRY}
              className="rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold text-white hover:bg-accent-hover"
            >
              App
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-foreground-muted hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/start"
                className="rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold text-white hover:bg-accent-hover"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
