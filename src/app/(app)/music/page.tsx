"use client";

import Image from "next/image";
import Link from "next/link";
import { playlists, musicMoods } from "@/data/music";
import { useLocalStorageValue } from "@/lib/useLocalStorage";
import { useMemo, useState } from "react";
import { musicThumbs, media } from "@/lib/media";
import { ImageBanner } from "@/components/ui/VisualKit";

export default function MusicPage() {
  const [mood, setMood] = useState<(typeof musicMoods)[number]>("All");
  const { value: selectedId, save: setSelected } = useLocalStorageValue<string | null>(
    "lm-music-playlist",
    null,
  );

  const filtered = useMemo(
    () => (mood === "All" ? playlists : playlists.filter((p) => p.mood === mood)),
    [mood],
  );

  const selected = playlists.find((p) => p.id === selectedId) ?? null;
  const selectedIdx = playlists.findIndex((p) => p.id === selectedId);

  return (
    <div className="flex flex-col gap-4 pt-2">
      <header>
        <Link href="/more" className="text-sm text-accent">
          ← More
        </Link>
        <h1 className="mt-1 font-display text-3xl uppercase">Music</h1>
        <p className="text-sm text-foreground-muted">Playlists for training & prep</p>
      </header>

      <ImageBanner
        src={media.ui.progress}
        position="50% 30%"
        heightClass="aspect-[21/9] min-h-[100px]"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Audio</p>
        <p className="text-sm font-semibold text-white">Fuel the session</p>
      </ImageBanner>

      {selected && (
        <section className="relative overflow-hidden rounded-[var(--lm-radius-lg)] border border-accent/50">
          <div className="absolute inset-0">
            <Image
              src={musicThumbs[Math.max(0, selectedIdx) % musicThumbs.length]}
              alt=""
              fill
              className="object-cover"
              sizes="512px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
          </div>
          <div className="relative p-4">
            <p className="text-[10px] font-bold uppercase text-white/80">Now selected</p>
            <p className="font-display mt-1 text-3xl uppercase text-white">{selected.title}</p>
            <p className="text-sm text-white/85">
              {selected.tracks} tracks · {selected.minutes} min
            </p>
            <div className="mt-4 flex h-10 items-end gap-1">
              {[40, 70, 55, 90, 45, 80, 60, 95, 50, 75, 65, 85].map((h, i) => (
                <div
                  key={i}
                  className="lm-eq-bar flex-1 rounded-sm bg-accent"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${(i % 5) * 0.08}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="flex gap-2 overflow-x-auto pb-1">
        {musicMoods.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMood(m)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
              mood === m
                ? "bg-accent text-white"
                : "border border-border text-foreground-muted"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-3">
        {filtered.map((p) => {
          const active = selectedId === p.id;
          const idx = playlists.findIndex((x) => x.id === p.id);
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setSelected(p.id)}
                className={`lm-card-lift w-full overflow-hidden rounded-[var(--lm-radius-lg)] border text-left transition ${
                  active ? "border-accent" : "border-border hover:border-accent/60"
                }`}
              >
                <div className="relative aspect-square">
                  <Image
                    src={musicThumbs[idx % musicThumbs.length]}
                    alt=""
                    fill
                    className="object-cover"
                    style={{ objectPosition: `${20 + (idx % 5) * 15}% center` }}
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <svg
                    className="absolute inset-0 m-auto h-12 w-12 text-white/50"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
                  </svg>
                  {active && (
                    <span className="absolute right-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold text-white">
                      SELECTED
                    </span>
                  )}
                </div>
                <div className="bg-background-card p-3">
                  <p className="text-sm font-semibold">{p.title}</p>
                  <p className="text-[10px] text-foreground-muted">
                    {p.mood} · {p.minutes}m
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="text-center text-[10px] text-foreground-subtle">
        Mock playlists — selection saved on this device. Spotify link later.
      </p>
    </div>
  );
}
