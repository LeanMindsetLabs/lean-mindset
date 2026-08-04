/**
 * Lean Mindset Lab — hardcoded project identity.
 * This workspace uses ONLY this block. Do not import other product credential files.
 */
export const LEAN_MINDSET = {
  id: "lean-mindset",
  name: "Lean Mindset Lab",
  ownerEmail: "LeanMindsetLabs@gmail.com",
  googleSsoEmail: "LeanMindsetLabs@gmail.com",
  github: {
    org: "LeanMindsetLabs",
    repo: "lean-mindset",
    remote: "https://github.com/LeanMindsetLabs/lean-mindset.git",
  },
  domain: {
    apex: "leanmindset.app",
    primaryHost: "www.leanmindset.app",
    productionUrl: "https://www.leanmindset.app",
    registrar: "Globehost.com",
  },
  vercel: {
    team: "lean-mindset-labs",
    project: "leanmindset",
    /** Legacy Vercel hostname — keep as alias after custom domain is live */
    deploymentUrl: "https://leanmindset.vercel.app",
  },
  supabase: {
    ref: "fdsccpcapzgzyxnuweit",
    url: "https://fdsccpcapzgzyxnuweit.supabase.co",
  },
  coachEmails: ["LeanMindsetLabs@gmail.com"] as const,
} as const;

/** Accounts that must never be used in this workspace */
export const FORBIDDEN_ACCOUNTS = ["ComeAround-io", "comearound-io"] as const;

export type ActiveProjectId = typeof LEAN_MINDSET.id;

/** Single source of truth: which product this repo belongs to */
export const ACTIVE_PROJECT: ActiveProjectId = "lean-mindset";
