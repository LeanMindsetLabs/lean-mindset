"use client";

import { Inter } from "next/font/google";
import { V2UiProvider } from "@/components/v2/V2UiContext";
import { V2BottomNav } from "@/components/v2/V2BottomNav";
import { V2Sheets } from "@/components/v2/V2Sheets";
import "@/components/v2/v2.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`lm-v2 ${inter.variable}`}
      style={{
        background:
          "radial-gradient(ellipse 100% 70% at 50% -5%, rgba(59, 130, 246, 0.55), transparent 58%), linear-gradient(180deg, #1e4d9b 0%, #183868 14%, #101c33 32%, #0a0f18 55%, #06080d 100%)",
      }}
    >
      <V2UiProvider>
        <div className="v2-main">{children}</div>
        <V2Sheets />
        <V2BottomNav />
      </V2UiProvider>
    </div>
  );
}
