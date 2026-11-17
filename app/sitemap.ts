import type { MetadataRoute } from "next";
import { notes } from "@/content/notes";
import { site } from "@/content/site";
import { allNotes } from "@/lib/notes";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/research", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/approach", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/vision", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.5, changeFrequency: "yearly" as const },
    ...notes.map((n) => ({ path: `/research/${n.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...allNotes().map((n) => ({
      path: `/research/${n.meta.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
  ].map(({ path, ...rest }) => ({ url: `${site.url}${path}`, lastModified: now, ...rest }));
}
