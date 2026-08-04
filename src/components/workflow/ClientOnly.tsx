"use client";

import { useSyncExternalStore, type ReactNode } from "react";

function subscribeNoop() {
  return () => {};
}

/** Avoid hydration mismatch for localStorage-driven UI. */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  if (!mounted) return fallback;
  return children;
}
