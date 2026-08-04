import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { ALL_ACCESS_FREE } from "@/data/product-config";

export const DEMO_MEMBER_COOKIE = "lm-demo-member";

export type DemoMember = {
  email: string;
  fullName: string;
};

export function parseDemoMemberCookie(raw: string | undefined): DemoMember | null {
  if (!raw || !ALL_ACCESS_FREE) return null;
  try {
    const parsed = JSON.parse(raw) as DemoMember;
    if (!parsed.email?.includes("@")) return null;
    return {
      email: parsed.email.trim().toLowerCase(),
      fullName: parsed.fullName?.trim() || parsed.email.split("@")[0] || "Member",
    };
  } catch {
    return null;
  }
}

export function readDemoMemberFromRequest(request: NextRequest): DemoMember | null {
  return parseDemoMemberCookie(request.cookies.get(DEMO_MEMBER_COOKIE)?.value);
}

export async function getDemoMember(): Promise<DemoMember | null> {
  if (!ALL_ACCESS_FREE) return null;
  const cookieStore = await cookies();
  return parseDemoMemberCookie(cookieStore.get(DEMO_MEMBER_COOKIE)?.value);
}

export async function setDemoMember(email: string, fullName: string) {
  if (!ALL_ACCESS_FREE) return;
  const cookieStore = await cookies();
  cookieStore.set(
    DEMO_MEMBER_COOKIE,
    JSON.stringify({
      email: email.trim().toLowerCase(),
      fullName: fullName.trim() || email.split("@")[0] || "Member",
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90,
      path: "/",
    },
  );
}

export function isAuthNetworkError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /fetch failed|ENOTFOUND|ECONNREFUSED|ECONNRESET|ETIMEDOUT|getaddrinfo|network/i.test(
    msg,
  );
}

export function friendlyAuthError(err: unknown): string {
  if (isAuthNetworkError(err)) {
    return "Can't reach the account server right now. Check your connection, or use Preview next step below.";
  }
  const msg = err instanceof Error ? err.message : String(err);
  return msg || "Something went wrong. Please try again.";
}
