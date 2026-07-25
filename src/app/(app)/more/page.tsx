import Image from "next/image";
import Link from "next/link";
import { media } from "@/lib/media";

const sections = [
  {
    title: "Daily",
    items: [
      { href: "/nutrition", label: "Nutrition day", desc: "Rings · meal timing", img: media.ui.nutrition, pos: "30% 20%" },
      { href: "/train", label: "Training", desc: "Sessions · AI picks", img: media.ui.train, pos: "55% 30%" },
      { href: "/program/water", label: "Water", desc: "Hydration gauges", img: media.ui.progress, pos: "40% 40%" },
    ],
  },
  {
    title: "Discover",
    items: [
      { href: "/recipes", label: "Recipes", desc: "Card grid", img: media.marketing.lifestyle, pos: "70% 35%" },
      { href: "/recipes/ai", label: "AI recipes", desc: "Suggested plates", img: media.ui.recipe1, pos: "40% 30%" },
      { href: "/train/ai", label: "AI exercises", desc: "Suggested sessions", img: media.ui.trainCard, pos: "50% 40%" },
      { href: "/blog", label: "Blog", desc: "Mindset articles", img: media.ui.blog, pos: "35% 25%" },
      { href: "/music", label: "Music", desc: "Workout playlists", img: media.ui.progress, pos: "60% 20%" },
    ],
  },
  {
    title: "Logs & program",
    items: [
      { href: "/logs", label: "Logs hub", desc: "Running · workouts", img: media.ui.train, pos: "45% 50%" },
      { href: "/program", label: "Program hub", desc: "Guide · grocery · more", img: media.ui.dashboard, pos: "25% 15%" },
      { href: "/program/supplements", label: "Supplements", desc: "Core + optional", img: media.ui.nutrition, pos: "60% 50%" },
      { href: "/program/trackers", label: "Trackers", desc: "What to log", img: media.ui.progress, pos: "30% 60%" },
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

      <div className="relative overflow-hidden rounded-[var(--lm-radius-lg)] border border-border">
        <div className="relative aspect-[21/9] min-h-[96px]">
          <Image
            src={media.marketing.hero}
            alt=""
            fill
            className="object-cover object-[center_25%]"
            sizes="512px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
              Lean Mindset
            </p>
            <p className="text-sm font-semibold text-white">Everything in one hub</p>
          </div>
        </div>
      </div>

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
                  className="lm-card-lift block overflow-hidden rounded-[var(--lm-radius-lg)] border border-border transition hover:border-accent"
                >
                  <div className="relative aspect-[5/3]">
                    <Image
                      src={item.img}
                      alt=""
                      fill
                      className="object-cover"
                      style={{ objectPosition: item.pos }}
                      sizes="200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-3">
                      <p className="text-sm font-bold text-white">{item.label}</p>
                      <p className="text-[10px] text-white/75">{item.desc}</p>
                    </div>
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
