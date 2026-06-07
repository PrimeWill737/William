import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "William Bosworth — Full-Stack Developer & CAIO",
    short_name: "William",
    description:
      "Full-Stack Developer, Professional Prompt Engineer, and Chief AI Officer of Nigerian AI Builders.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#07070b",
    theme_color: "#07070b",
    categories: ["portfolio", "business", "productivity"],
    icons: [
      {
        src: "/icons/icon-192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
