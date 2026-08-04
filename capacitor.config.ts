import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Native shell loads production V2 only (no V1, no marketing desktop chrome).
 * Build/archive on macOS or Codemagic - Windows cannot produce IPA.
 */
const config: CapacitorConfig = {
  appId: "app.leanmindset.labs",
  appName: "Lean Mindset",
  webDir: "native-shell",
  server: {
    url: "https://www.leanmindset.app/v2/home",
    cleartext: false,
    allowNavigation: [
      "leanmindset.app",
      "*.leanmindset.app",
      "*.supabase.co",
      "supabase.co",
    ],
  },
  ios: {
    contentInset: "automatic",
    preferredContentMode: "mobile",
    scheme: "Lean Mindset",
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      backgroundColor: "#000000",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#000000",
    },
  },
};

export default config;
