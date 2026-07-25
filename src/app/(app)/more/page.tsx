import Link from "next/link";

const sections = [
  {
    title: "Daily",
    items: [
      { href: "/nutrition", label: "Nutrition day", desc: "Rings · meal timing", g: "linear-gradient(135deg,#2a1508,#ff6b00)" },
      { href: "/train", label: "Training", desc: "Sessions · AI picks", g: "linear-gradient(145deg,#1a0808,#ff6b00)" },
      { href: "/program/water", label: "Water", desc: "Hydration gauges", g: "linear-gradient(140deg,#0a1a2a,#ff8533)" },
    ],
  },
  {
    title: "Discover",
    items: [
      { href: "/recipes", label: "Recipes", desc: "Card grid", g: "linear-gradient(135deg,#1a2a0a,#ff6b00)" },
      { href: "/recipes/ai", label: "AI recipes", desc: "Suggested plates", g: "linear-gradient(145deg,#2a1020,#ff6b00)" },
      { href: "/train/ai", label: "AI exercises", desc: "Suggested sessions", g: "linear-gradient(150deg,#1a0a1a,#ff8533)" },
      { href: "/blog", label: "Blog", desc: "Mindset articles", g: "linear-gradient(140deg,#0a0a1a,#ff6b00)" },
      { href: "/music", label: "Music", desc: "Workout playlists", g: "linear-gradient(135deg,#1a1028,#ff6b00)" },
    ],
  },
  {
    title: "Logs & program",
    items: [
      { href: "/logs", label: "Logs hub", desc: "Running · workouts", g: "linear-gradient(145deg,#121212,#ff6b00)" },
      { href: "/program", label: "Program hub", desc: "Guide · grocery · more", g: "linear-gradient(140deg,#1a1408,#ff8533)" },
      { href: "/program/supplements", label: "Supplements", desc: "Core + optional", g: "linear-gradient(150deg,#1a1a0a,#ff6b00)" },
      { href: "/program/trackers", label: "Trackers", desc: "What to log", g: "linear-gradient(135deg,#0a1a14,#ff6b00)" },
    ],
  },
];

export default function MoreHubPage() {
  return (
    <div className="flex flex-col gap-6 pt-2">
      <header>
        <p className="text-sm text-foreground-muted">Member hub</p>
        <h1 className="font-display text-3xl uppercase">More</h1>
      </header>

      {sections.map((sec) => (
        <section key={sec.title}>
          <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
            {sec.title}
          </h2>
          <ul className="grid grid-cols-2 gap-2">
            {sec.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block overflow-hidden rounded-[var(--lm-radius-lg)] border border-border transition hover:border-accent"
                >
                  <div
                    className="flex aspect-[5/3] flex-col justify-end p-3"
                    style={{ background: item.g }}
                  >
                    <p className="text-sm font-bold text-white">{item.label}</p>
                    <p className="text-[10px] text-white/75">{item.desc}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <Link href="/" className="text-center text-xs text-foreground-subtle hover:text-accent">
        ← Marketing site
      </Link>
    </div>
  );
}
