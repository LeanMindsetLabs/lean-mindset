import Link from "next/link";
import { programMeta, programNav } from "@/data/program";
import { DailyWorkflowStrip } from "@/components/workflow/DailyWorkflow";
import { LeanMindsetLogo } from "@/components/brand/LeanMindsetLogo";

export default function ProgramHubPage() {
  return (
    <div className="flex flex-col gap-4 pt-1">
      <DailyWorkflowStrip active="program" />

      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <LeanMindsetLogo variant="icon" iconSize={32} className="mb-2" />
          <p className="text-xs text-[#94a3b8]">Your lab materials</p>
          <h1 className="text-xl font-bold text-white">{programMeta.name}</h1>
          <p className="mt-1 text-sm text-[#64748b]">{programMeta.promise}</p>
        </div>
        <Link href="/home" className="shrink-0 text-xs font-semibold text-[#60a5fa]">
          Home →
        </Link>
      </header>

      <section className="rounded-[18px] border border-[#93c5fd]/30 bg-[#2563eb] p-4 text-white">
        <p className="text-xs text-white/80">Active structure</p>
        <p className="mt-1 text-3xl font-bold leading-none">{programMeta.durationWeeks} weeks</p>
        <p className="mt-2 text-sm text-white/90">
          {programMeta.mealsPerDay} meals/day · {programMeta.waterLitersTarget}L water target
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-white">Daily workflow links</h2>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/nutrition"
            className="rounded-2xl border border-[#64748b]/28 bg-[#0d1118] px-3 py-3 text-sm font-semibold text-white"
          >
            Meals →
          </Link>
          <Link
            href="/train"
            className="rounded-2xl border border-[#64748b]/28 bg-[#0d1118] px-3 py-3 text-sm font-semibold text-white"
          >
            Train →
          </Link>
          <Link
            href="/check-in"
            className="rounded-2xl border border-[#64748b]/28 bg-[#0d1118] px-3 py-3 text-sm font-semibold text-white"
          >
            Check-in →
          </Link>
          <Link
            href="/profile"
            className="rounded-2xl border border-[#64748b]/28 bg-[#0d1118] px-3 py-3 text-sm font-semibold text-white"
          >
            Profile →
          </Link>
        </div>
      </section>

      <ul className="flex flex-col gap-2">
        {programNav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center justify-between rounded-[var(--lm-radius-lg)] border border-[#64748b]/28 bg-[#0d1118] px-4 py-3.5 transition hover:border-[#60a5fa]/50"
            >
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="text-xs text-[#64748b]">{item.desc}</p>
              </div>
              <span className="text-[#60a5fa]">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
