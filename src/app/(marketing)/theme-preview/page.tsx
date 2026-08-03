import Link from "next/link";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { themeList } from "@/lib/themes";

const PREVIEW_ROUTES = [
  { href: "/home", label: "Home" },
  { href: "/train", label: "Train" },
  { href: "/nutrition", label: "Meals" },
  { href: "/check-in", label: "Check-in" },
] as const;

export default function ThemePreviewPage() {
  return (
    <>
      <SiteHeader signedIn={false} />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            Color iterations
          </p>
          <h1 className="font-display mt-2 text-3xl uppercase md:text-4xl">
            Violet &amp; Blue themes
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
            Trust Blue is the live default. Compare alternates below, or append{" "}
            <code className="rounded bg-background-card px-1.5 py-0.5 text-foreground">
              ?theme=a
            </code>
            ,{" "}
            <code className="rounded bg-background-card px-1.5 py-0.5 text-foreground">
              ?theme=b
            </code>
            , or{" "}
            <code className="rounded bg-background-card px-1.5 py-0.5 text-foreground">
              ?theme=c
            </code>{" "}
            to any app URL to preview live.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {themeList.map((theme) => (
            <section
              key={theme.id}
              className="flex flex-col overflow-hidden rounded-[var(--lm-radius-lg)] border border-border bg-background-elevated"
            >
              <div className="border-b border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-subtle">
                      {theme.label}
                    </p>
                    <h2 className="font-display mt-1 text-xl uppercase">
                      {theme.name}
                      {"isDefault" in theme && theme.isDefault ? (
                        <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-middle font-sans text-[9px] font-bold uppercase tracking-wide text-white">
                          Active
                        </span>
                      ) : null}
                    </h2>
                    <p className="mt-1 text-[11px] text-foreground-muted">{theme.reference}</p>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    <span
                      className="h-9 w-9 rounded-full border border-white/10 shadow-inner"
                      style={{ background: theme.accent }}
                      title={theme.accent}
                    />
                    <span
                      className="h-9 w-9 rounded-full border border-white/10 shadow-inner"
                      style={{ background: theme.accentHover }}
                      title={theme.accentHover}
                    />
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-foreground-muted">
                  {theme.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-mono text-foreground-subtle">
                  <span className="rounded-md border border-border bg-background px-2 py-1">
                    {theme.accent}
                  </span>
                  <span className="rounded-md border border-border bg-background px-2 py-1">
                    hover {theme.accentHover}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={`/home?theme=${theme.id}`}
                    className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-hover"
                  >
                    Apply {theme.id.toUpperCase()} live
                  </Link>
                  {PREVIEW_ROUTES.map((route) => (
                    <Link
                      key={route.href}
                      href={`${route.href}?theme=${theme.id}`}
                      className="rounded-full border border-border px-3 py-2 text-xs font-medium text-foreground-muted transition hover:border-accent hover:text-foreground"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative bg-black p-3">
                <iframe
                  title={`${theme.label} home preview`}
                  src={`/home?theme=${theme.id}`}
                  className="mx-auto block h-[640px] w-full max-w-[390px] rounded-[1.75rem] border border-border bg-background"
                />
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-5">
          <h3 className="font-display text-lg uppercase">UI samples</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {themeList.map((theme) => (
              <div
                key={theme.id}
                className={`lm-theme-${theme.id} rounded-[var(--lm-radius-md)] border border-border bg-background p-4`}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground-subtle">
                  {theme.label}
                </p>
                <button
                  type="button"
                  className="mt-3 w-full rounded-full bg-accent py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
                >
                  Primary button
                </button>
                <button
                  type="button"
                  className="mt-2 w-full rounded-full border border-accent py-2.5 text-sm font-semibold text-accent"
                >
                  Secondary outline
                </button>
                <div className="mt-3 rounded-2xl bg-accent p-3 text-white lm-shadow-accent-lg">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                    Lean Mindset Score
                  </p>
                  <p className="font-display mt-1 text-3xl">65</p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-border">
                  <div className="lm-bar-fill h-full w-[72%] rounded-full bg-accent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
