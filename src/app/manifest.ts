import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LeanMindset",
    short_name: "LeanMindset",
    description:
      "6-week structured weight-loss labs - nutrition, training, and daily accountability.",
    start_url: "/v2/home",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#2563EB",
    orientation: "portrait-primary",
    categories: ["health", "fitness", "lifestyle"],
    icons: [
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
