"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  signIn,
  signUp,
  type AuthState,
} from "@/app/auth/actions";

const initial: AuthState = {};

export function AuthForm({
  mode,
  next = "/",
}: {
  mode: "login" | "signup";
  next?: string;
}) {
  const action = mode === "login" ? signIn : signUp;
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="next" value={next} />

      {mode === "signup" && (
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="text-foreground-muted">Full name</span>
          <input
            name="fullName"
            required
            autoComplete="name"
            className="rounded-[var(--lm-radius-md)] border border-border bg-background-card px-3 py-3 outline-none focus:border-accent"
            placeholder="Jordan Lee"
          />
        </label>
      )}

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-foreground-muted">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-[var(--lm-radius-md)] border border-border bg-background-card px-3 py-3 outline-none focus:border-accent"
          placeholder="you@email.com"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-foreground-muted">Password</span>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          className="rounded-[var(--lm-radius-md)] border border-border bg-background-card px-3 py-3 outline-none focus:border-accent"
          placeholder="••••••••"
        />
      </label>

      {state.error && (
        <p className="rounded-[var(--lm-radius-md)] bg-danger/15 px-3 py-2 text-sm text-danger">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 rounded-[var(--lm-radius-md)] bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover disabled:opacity-60"
      >
        {pending
          ? "Please wait…"
          : mode === "login"
            ? "Log in"
            : "Create account"}
      </button>

      <p className="text-center text-sm text-foreground-muted">
        {mode === "login" ? (
          <>
            New here?{" "}
            <Link href={`/signup?next=${encodeURIComponent(next)}`} className="text-accent">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href={`/login?next=${encodeURIComponent(next)}`} className="text-accent">
              Log in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
