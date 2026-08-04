import Link from "next/link";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { IPHONE_15 } from "@/lib/device/iphone-15";
import { PreviewFrameClient } from "./PreviewFrameClient";

const ALLOWED = new Set([
  "/start",
  "/home",
  "/nutrition",
  "/train",
  "/check-in",
  "/program",
  "/profile",
  "/prescreens",
  "/v2/home",
  "/v2/meals",
  "/v2/train",
  "/v2/check-in",
  "/v2/program",
  "/v2/profile",
]);

function isAllowedPath(pathOnly: string) {
  return ALLOWED.has(pathOnly) || pathOnly.startsWith("/v2/");
}

export default async function PreviewFramePage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string }>;
}) {
  const { path: rawPath = "/home" } = await searchParams;
  const pathOnly = rawPath.split("?")[0] ?? "/home";
  const path = isAllowedPath(pathOnly) ? rawPath : "/home";

  // Meals A/B toggle lives in chrome outside the phone — client wrapper.
  if (pathOnly === "/v2/meals") {
    return <PreviewFrameClient initialPath={path} />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#050508] px-4 py-8">
      <div className="mb-4 flex w-full max-w-lg items-center justify-between text-sm text-white/60">
        <Link href="/preview" className="hover:text-[#60a5fa]">
          ← All previews
        </Link>
        <span>
          iPhone 15 · {IPHONE_15.width}×{IPHONE_15.height}
        </span>
      </div>
      <PhoneFrame iframeSrc={path} statusBar />
      <p className="mt-4 text-center text-xs text-white/40">{path}</p>
    </div>
  );
}
