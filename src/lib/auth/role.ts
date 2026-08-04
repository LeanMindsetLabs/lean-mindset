import { createClient } from "@/lib/supabase/server";
import {
  getDemoMember,
} from "@/lib/auth/demo-session";

export type AppRole = "client" | "coach";

export type ProfileRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  role: AppRole;
};

function coachEmailAllowlist(): string[] {
  return (process.env.COACH_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/** DB role + optional COACH_EMAILS allowlist. Never trust client metadata alone. */
export function passesCoachGate(
  role: string | null | undefined,
  email: string | null | undefined,
): boolean {
  if (role !== "coach") return false;
  const allow = coachEmailAllowlist();
  if (allow.length === 0) return true;
  return Boolean(email && allow.includes(email.toLowerCase()));
}

export async function getSessionProfile(): Promise<{
  userId: string;
  email: string | null;
  profile: ProfileRow | null;
} | null> {
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id, full_name, email, role")
          .eq("id", user.id)
          .maybeSingle();

        return {
          userId: user.id,
          email: user.email ?? profile?.email ?? null,
          profile: (profile as ProfileRow | null) ?? null,
        };
      }
    } catch {
      // Supabase unreachable - fall through to demo session when allowed.
    }
  }

  const demo = await getDemoMember();
  if (demo) {
    return {
      userId: `demo:${demo.email}`,
      email: demo.email,
      profile: {
        id: `demo:${demo.email}`,
        full_name: demo.fullName,
        email: demo.email,
        role: "client",
      },
    };
  }

  return null;
}

export async function requireCoach(): Promise<{
  userId: string;
  email: string | null;
  profile: ProfileRow;
} | null> {
  const session = await getSessionProfile();
  if (!session?.profile) return null;
  if (!passesCoachGate(session.profile.role, session.email)) return null;
  return {
    userId: session.userId,
    email: session.email,
    profile: session.profile,
  };
}
