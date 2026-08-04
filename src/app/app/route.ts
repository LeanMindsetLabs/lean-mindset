import { redirect } from "next/navigation";
import { MOBILE_APP_ENTRY } from "@/lib/device/mobile-preview";

/** Desktop shortcut — always opens member home in iPhone 15 frame. */
export function GET() {
  redirect(MOBILE_APP_ENTRY);
}
