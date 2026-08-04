import Link from "next/link";
import { LeanMindsetLogo } from "@/components/brand/LeanMindsetLogo";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-10 sm:flex-row sm:justify-between sm:px-6">
        <div className="text-center sm:text-left">
          <LeanMindsetLogo variant="lockup" iconSize={24} href="/" className="justify-center sm:justify-start" />
          <p className="mt-2 text-xs text-white/40">
            6-week labs. Real food. Daily coaching.
          </p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/55">
          <Link href="/privacy" className="hover:text-accent">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-accent">
            Terms
          </Link>
          <a href="mailto:hello@leanmindset.app" className="hover:text-accent">
            Contact
          </a>
          <Link
            href="/start"
            className="rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-white hover:bg-accent-hover"
          >
            Start lab
          </Link>
        </nav>
      </div>
    </footer>
  );
}
