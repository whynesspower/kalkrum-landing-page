import type { Metadata } from "next";
import { founders, site } from "@/content/site";

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const full = `${title} — ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.name, locale: "en_GB", url: path, title: full, description },
    twitter: { card: "summary_large_image", title: full, description },
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ResearchOrganization"],
        "@id": ORG_ID,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: { "@type": "ImageObject", url: `${site.url}/static/brand/kalkram-mark-512.png`, width: 512, height: 512 },
        description: site.description,
        slogan: site.tagline,
        foundingDate: site.founded,
        location: site.locations.map((name) => ({ "@type": "Place", name })),
        founder: founders.map((f) => ({
          "@type": "Person",
          name: f.name,
          jobTitle: f.role.replace("Co-founder, ", ""),
          ...(f.url ? { url: f.url } : {}),
          ...(f.sameAs.length ? { sameAs: f.sameAs } : {}),
        })),
        knowsAbout: [
          "Automated scientific discovery",
          "Combinatorial search",
          "Hadamard matrices",
          "Difference sets",
          "Circulant weighing matrices",
          "Coding theory",
          "LDPC codes",
          "Quantum error correction",
          "SAT solving",
          "Formal verification",
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: site.url,
        name: site.name,
        description: site.shortDescription,
        inLanguage: "en",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function breadcrumbLd(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path === "/" ? "" : t.path}`,
    })),
  };
}
