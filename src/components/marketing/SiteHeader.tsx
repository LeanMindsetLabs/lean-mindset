import Link from "next/link";

export function SiteHeader({ signedIn }: { signedIn: boolean }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-display text-lg uppercase tracking-wide text-white">
          Lean Mindset
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-foreground-muted md:flex">
          <Link href="/labs" className="hover:text-accent">
            Labs
          </Link>
          <Link href="/blog" className="hover:text-accent">
            Blog
          </Link>
          <Link href={signedIn ? "/nutrition" : "/signup"} className="hover:text-accent">
            Program
          </Link>
          <Link href={signedIn ? "/check-in" : "/signup"} className="hover:text-accent">
            Coaching
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {/* Mobile quick menu chips */}
          <nav className="flex items-center gap-1 md:hidden" aria-label="Quick">
            <Link
              href="/labs"
              className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/80"
            >
              Labs
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/80"
            >
              Blog
            </Link>
          </nav>
          {signedIn ? (
            <Link
              href="/home"
              className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-white hover:bg-accent-hover"
            >
              App
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full px-3 py-1.5 text-xs font-semibold text-foreground-muted hover:text-white sm:inline"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-white hover:bg-accent-hover"
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
