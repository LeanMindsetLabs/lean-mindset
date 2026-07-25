import { ProgramPage } from "@/components/ProgramPage";
import { trackers } from "@/data/program";

export default function TrackersPage() {
  return (
    <ProgramPage title={trackers.title} subtitle={trackers.subtitle}>
      <ul className="flex flex-col gap-3">
        {trackers.items.map((item) => (
          <li
            key={item.name}
            className="rounded-[var(--lm-radius-lg)] border border-border bg-background-card p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold">{item.name}</h2>
              <span className="shrink-0 text-xs text-accent">{item.cadence}</span>
            </div>
            <p className="mt-2 text-sm text-foreground-muted">{item.note}</p>
          </li>
        ))}
      </ul>
    </ProgramPage>
  );
}
