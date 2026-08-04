"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ALL_ACCESS_FREE } from "@/data/product-config";
import {
  friendlyAuthError,
  isAuthNetworkError,
  setDemoMember,
} from "@/lib/auth/demo-session";
import { createClient } from "@/lib/supabase/server";

export type AuthState = {
  error?: string;
  success?: string;
};

function configured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

async function continueWithDemoMember(
  email: string,
  fullName: string,
  next: string,
): Promise<never> {
  await setDemoMember(email, fullName);
  revalidatePath("/", "layout");
  redirect(next || "/");
}

export async function signUp(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const fullName = String(formData.get("fullName") || "").trim();
  const next = String(formData.get("next") || "/");

  if (!email || password.length < 6) {
    return { error: "Use a valid email and a password of at least 6 characters." };
  }

  if (!configured()) {
    if (ALL_ACCESS_FREE) {
      await continueWithDemoMember(email, fullName, next);
    }
    return {
      error:
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      if (ALL_ACCESS_FREE && isAuthNetworkError(error)) {
        await continueWithDemoMember(email, fullName, next);
      }
      return { error: error.message };
    }

    revalidatePath("/", "layout");
    redirect(next || "/");
  } catch (err) {
    if (ALL_ACCESS_FREE) {
      await continueWithDemoMember(email, fullName, next);
    }
    return { error: friendlyAuthError(err) };
  }
}

export async function signIn(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  if (!configured()) {
    if (ALL_ACCESS_FREE) {
      await continueWithDemoMember(email, email.split("@")[0] ?? "Member", next);
    }
    return {
      error:
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local",
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      if (ALL_ACCESS_FREE && isAuthNetworkError(error)) {
        await continueWithDemoMember(email, email.split("@")[0] ?? "Member", next);
      }
      return { error: error.message };
    }

    revalidatePath("/", "layout");
    redirect(next || "/");
  } catch (err) {
    if (ALL_ACCESS_FREE) {
      await continueWithDemoMember(email, email.split("@")[0] ?? "Member", next);
    }
    return { error: friendlyAuthError(err) };
  }
}

export async function signOut() {
  if (!configured()) redirect("/login");
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
