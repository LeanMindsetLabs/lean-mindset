import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-xl uppercase text-accent">Lean Mindset</p>
          <p className="mt-1 text-xs text-foreground-subtle">
            Educational wellness guidance — not medical advice.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-foreground-muted">
          <Link href="/labs" className="hover:text-accent">
            Labs
          </Link>
          <Link href="/blog" className="hover:text-accent">
            Blog
          </Link>
          <Link href="/login" className="hover:text-accent">
            Log in
          </Link>
          <Link href="/signup" className="hover:text-accent">
            Sign up
          </Link>
        </div>
      </div>
    </footer>
  );
}
