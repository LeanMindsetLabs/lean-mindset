import Link from "next/link";

export function SiteHeader({ signedIn }: { signedIn: boolean }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-display text-lg uppercase tracking-wide text-white">
          Lean Mindset
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-foreground-muted md:flex">
          <a href="#program" className="hover:text-accent">
            Program
          </a>
          <a href="#labs" className="hover:text-accent">
            Labs
          </a>
          <a href="#how" className="hover:text-accent">
            How it works
          </a>
          <Link href="/blog" className="hover:text-accent">
            Blog
          </Link>
        </nav>
        <div className="flex items-center gap-2">
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
