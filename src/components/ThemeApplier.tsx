"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { isThemeId, themeClass } from "@/lib/themes";

/** Applies ?theme=a|b|c to `<html>` for live preview across the app. */
export function ThemeApplier() {
  const params = useSearchParams();
  const theme = params.get("theme");

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("theme-a", "theme-b", "theme-c");

    if (isThemeId(theme)) {
      html.classList.add(themeClass[theme]);
    }
  }, [theme]);

  return null;
}
