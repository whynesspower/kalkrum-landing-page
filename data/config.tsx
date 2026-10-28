import { NextSeoProps } from "next-seo";
import { flags } from "lib/flags";

// Set NEXT_PUBLIC_SITE_URL (for example https://kalkram.com) so link
// previews get an absolute image URL.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

const siteConfig = {
  seo: {
    title: "KalKram | A frontier AI lab",
    description:
      "KalKram is a frontier AI lab building agents that learn from their own experience, remember it across a lifetime, and stay legible.",
    openGraph: {
      type: "website",
      siteName: "KalKram",
      images: [
        {
          url: `${siteUrl}/api/og`,
          width: 1200,
          height: 630,
          alt: "KalKram: Intelligence that learns from experience.",
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
    },
  } as NextSeoProps,
  nav: [
    { label: "Vision", href: "/vision" },
    { label: "Research", href: "/research" },
    { label: "Approach", href: "/approach" },
    ...(flags.writing ? [{ label: "Writing", href: "/writing" }] : []),
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ] as Array<{ label: string; href: string }>,
  privacyUrl: "/privacy",
  footer: {
    contactEmail: "yashraj@kalkram.com",
    linkedin: "https://www.linkedin.com/company/kalkram",
  },
};

export default siteConfig;
