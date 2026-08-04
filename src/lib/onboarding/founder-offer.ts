import { ALL_ACCESS_FREE, FOUNDER_OFFER } from "@/data/product-config";
import { createClient } from "@/lib/supabase/server";

export type FounderOfferStatus = {
  limit: number;
  claimed: number;
  remaining: number;
  active: boolean;
};

/** Server-only: free-access flag or founder spot count from profiles. */
export async function getFounderOfferStatus(): Promise<FounderOfferStatus> {
  if (ALL_ACCESS_FREE) {
    return { limit: 0, claimed: 0, remaining: 0, active: true };
  }

  const limit = FOUNDER_OFFER.freeMemberLimit;
  let claimed = 0;

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = await createClient();
      const { count, error } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "client");

      if (!error && typeof count === "number") {
        claimed = count;
      }
    } catch {
      claimed = 0;
    }
  }

  const remaining = Math.max(0, limit - claimed);
  return {
    limit,
    claimed,
    remaining,
    active: remaining > 0,
  };
}
