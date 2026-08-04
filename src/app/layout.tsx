import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Oswald, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeApplier } from "@/components/ThemeApplier";
import { getSiteOrigin } from "@/lib/site-url";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: "LeanMindset",
  description:
    "6-week structured weight-loss labs — nutrition, training, and daily accountability.",
  applicationName: "LeanMindset",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LeanMindset",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${oswald.variable} h-full`}>
      <body className="min-h-full bg-background text-foreground antialiased">
        <Suspense fallback={null}>
          <ThemeApplier />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
