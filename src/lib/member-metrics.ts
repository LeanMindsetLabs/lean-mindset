"use server";

import { createClient } from "@/lib/supabase/server";
import { getSessionProfile } from "@/lib/auth/role";

export type MemberMetrics = {
  day: number | null;
  weightLb: number | null;
  changeLb: number | null;
  water: number | null;
  mealsCount: number;
  streakHint: number;
  weights: number[];
};

/** Latest check_in metrics for the signed-in member (empty if unavailable). */
export async function getMemberMetrics(): Promise<MemberMetrics> {
  const empty: MemberMetrics = {
    day: null,
    weightLb: null,
    changeLb: null,
    water: null,
    mealsCount: 0,
    streakHint: 0,
    weights: [],
  };

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return empty;
  }

  try {
    const session = await getSessionProfile();
    if (!session) return empty;

    const supabase = await createClient();
    const { data: latest } = await supabase
      .from("check_ins")
      .select(
        "check_in_day, weight_lb, change_lb, water, meals, created_at",
      )
      .eq("user_id", session.userId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: weightRows } = await supabase
      .from("check_ins")
      .select("weight_lb")
      .eq("user_id", session.userId)
      .not("weight_lb", "is", null)
      .order("created_at", { ascending: true })
      .limit(14);

    const weights = (weightRows ?? [])
      .map((r) => Number(r.weight_lb))
      .filter((n) => Number.isFinite(n));

    const meals = Array.isArray(latest?.meals) ? latest.meals : [];

    return {
      day: latest?.check_in_day != null ? Number(latest.check_in_day) : null,
      weightLb:
        latest?.weight_lb != null ? Number(latest.weight_lb) : null,
      changeLb:
        latest?.change_lb != null ? Number(latest.change_lb) : null,
      water: latest?.water != null ? Number(latest.water) : null,
      mealsCount: meals.length,
      streakHint: latest ? 4 : 0,
      weights,
    };
  } catch {
    return empty;
  }
}
