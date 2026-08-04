import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { ALL_ACCESS_FREE } from "@/data/product-config";
import {
  readDemoMemberFromRequest,
} from "@/lib/auth/demo-session";

function coachEmailAllowlist(): string[] {
  return (process.env.COACH_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function passesCoachGate(
  role: string | null | undefined,
  email: string | null | undefined,
): boolean {
  if (role !== "coach") return false;
  const allow = coachEmailAllowlist();
  if (allow.length === 0) return true;
  return Boolean(email && allow.includes(email.toLowerCase()));
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const demoMember = readDemoMemberFromRequest(request);

  let user: { id: string; email?: string | null } | null = null;

  if (url && key) {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    });

    try {
      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();
      user = supabaseUser;
    } catch {
      user = null;
    }
  }

  const isSignedIn = Boolean(user) || (ALL_ACCESS_FREE && Boolean(demoMember));
  const signedInEmail = user?.email ?? demoMember?.email ?? null;

  const path = request.nextUrl.pathname;
  const isAuthPage = path.startsWith("/login") || path.startsWith("/signup");
  const isCoachRoute = path === "/coach" || path.startsWith("/coach/");
  const isProtected =
    path.startsWith("/program") ||
    path.startsWith("/add") ||
    path.startsWith("/profile") ||
    path.startsWith("/check-in") ||
    path.startsWith("/logs") ||
    isCoachRoute;

  if (!isSignedIn && isProtected) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", path);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && isCoachRoute) {
    const supabase = createServerClient(url!, key!, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    });

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (!passesCoachGate(profile?.role, user.email)) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/";
        redirectUrl.search = "";
        return NextResponse.redirect(redirectUrl);
      }
    } catch {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/";
      redirectUrl.search = "";
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (isSignedIn && isAuthPage) {
    const next = request.nextUrl.searchParams.get("next");
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname =
      next && next.startsWith("/") && !next.startsWith("//") ? next : "/";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
