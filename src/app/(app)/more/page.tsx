import Image from "next/image";
import Link from "next/link";
import { media } from "@/lib/media";

const sections = [
  {
    title: "Daily",
    items: [
      { href: "/nutrition", label: "Nutrition day", desc: "Rings · meal timing", img: media.cards.mealEggs, pos: "center" },
      { href: "/train", label: "Training", desc: "Sessions · AI picks", img: media.cards.trainAction, pos: "center 25%" },
      { href: "/program/water", label: "Water", desc: "Hydration gauges", img: media.cards.mealSmoothie, pos: "center" },
    ],
  },
  {
    title: "Discover",
    items: [
      { href: "/recipes", label: "Recipes", desc: "Card grid", img: media.cards.mealChicken, pos: "center" },
      { href: "/recipes/ai", label: "AI recipes", desc: "Suggested plates", img: media.cards.mealSalad, pos: "center" },
      { href: "/train/ai", label: "AI exercises", desc: "Suggested sessions", img: media.cards.athlete, pos: "center 20%" },
      { href: "/blog", label: "Blog", desc: "Mindset articles", img: media.cards.mealBowls, pos: "center" },
      { href: "/music", label: "Music", desc: "Workout playlists", img: media.cards.dashChart, pos: "center" },
    ],
  },
  {
    title: "Logs & program",
    items: [
      { href: "/logs", label: "Logs hub", desc: "Running · workouts", img: media.cards.trainHiit, pos: "center" },
      { href: "/program", label: "Program hub", desc: "Guide · grocery · more", img: media.cards.dashScore, pos: "center" },
      { href: "/program/supplements", label: "Supplements", desc: "Core + optional", img: media.cards.mealPesto, pos: "center" },
      { href: "/program/trackers", label: "Trackers", desc: "What to log", img: media.cards.dashRadar, pos: "center" },
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
            src={media.cards.athlete}
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
