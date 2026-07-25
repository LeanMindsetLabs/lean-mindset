import Image from "next/image";
import Link from "next/link";
import { AreaSparkline, SparkBars } from "@/components/ui/Charts";
import { media } from "@/lib/media";
import { ImageBanner } from "@/components/ui/VisualKit";

export default function LogsHubPage() {
  return (
    <div className="flex flex-col gap-5 pt-2">
      <header>
        <Link href="/more" className="text-sm text-accent">
          ← More
        </Link>
        <h1 className="mt-1 font-display text-3xl uppercase">Logs</h1>
        <p className="text-sm text-foreground-muted">Running & workout history</p>
      </header>

      <ImageBanner
        src={media.ui.progress}
        position="45% 25%"
        heightClass="aspect-[21/9] min-h-[100px]"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-accent">History</p>
        <p className="text-sm font-semibold text-white">Track every session</p>
      </ImageBanner>

      <section className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4">
        <p className="text-xs text-foreground-muted">7-day activity</p>
        <div className="mt-2">
          <AreaSparkline values={[20, 45, 30, 60, 40, 75, 55]} height={64} />
        </div>
        <div className="mt-3">
          <SparkBars values={[20, 45, 30, 60, 40, 75, 55]} height={40} />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-3">
        <Link
          href="/logs/running"
          className="lm-card-lift relative overflow-hidden rounded-[var(--lm-radius-lg)] border border-border"
        >
          <div className="relative aspect-[5/2]">
            <Image
              src={media.ui.train}
              alt=""
              fill
              className="object-cover object-[40%_30%]"
              sizes="512px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <p className="font-display text-3xl uppercase text-white">Running</p>
              <p className="text-xs text-white/80">Distance · pace · notes</p>
            </div>
          </div>
        </Link>
        <Link
          href="/logs/workouts"
          className="lm-card-lift relative overflow-hidden rounded-[var(--lm-radius-lg)] border border-border"
        >
          <div className="relative aspect-[5/2]">
            <Image
              src={media.ui.trainCard}
              alt=""
              fill
              className="object-cover object-[60%_40%]"
              sizes="512px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <p className="font-display text-3xl uppercase text-white">Workouts</p>
              <p className="text-xs text-white/80">Sessions · duration · RPE</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
