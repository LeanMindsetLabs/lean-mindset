import Link from "next/link";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { IPHONE_15 } from "@/lib/device/iphone-15";

/** Production member app = V2 */
const WORKFLOW_ROUTES = [
  { path: "/start", label: "Onboarding" },
  { path: "/v2/home", label: "Home" },
  { path: "/v2/meals", label: "Meals" },
  { path: "/v2/train", label: "Train" },
  { path: "/v2/check-in", label: "Check-in" },
  { path: "/v2/program", label: "Program" },
  { path: "/v2/profile", label: "Profile" },
] as const;

export default function MobilePreviewHubPage() {
  return (
    <div className="min-h-screen bg-[#050508] px-4 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-widest text-[#60a5fa]">Mobile preview</p>
        <h1 className="mt-2 text-2xl font-bold">iPhone 15 · {IPHONE_15.width}×{IPHONE_15.height}</h1>
        <p className="mt-2 max-w-xl text-sm text-white/55">
          Production member app is V2. All previews use the iPhone 15 frame.
        </p>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-[#6ea1ff]">
          Production (V2)
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {WORKFLOW_ROUTES.map((r) => (
            <li key={r.path}>
              <Link
                href={`/preview/frame?path=${encodeURIComponent(r.path)}`}
                className="rounded-full border border-[#2f6fed]/40 bg-[#2f6fed]/15 px-3 py-1.5 text-xs font-semibold text-[#6ea1ff] hover:border-[#6ea1ff]"
              >
                {r.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-8">
          {WORKFLOW_ROUTES.filter((r) => r.path.startsWith("/v2/")).map((r) => (
            <div key={r.path} className="flex flex-col items-center gap-2">
              <Link href={`/preview/frame?path=${encodeURIComponent(r.path)}`} className="block">
                <PhoneFrame iframeSrc={r.path} statusBar />
              </Link>
              <span className="text-xs text-white/50">{r.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
