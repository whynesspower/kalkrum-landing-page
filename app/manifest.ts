import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.shortDescription,
    start_url: "/",
    display: "browser",
    background_color: "#05060a",
    theme_color: "#05060a",
    icons: [
      { src: "/static/favicons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/static/favicons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
