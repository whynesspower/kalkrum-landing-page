import { NextSeoProps } from "next-seo";

// Set NEXT_PUBLIC_SITE_URL (for example https://kalkram.com) so link
// previews get an absolute image URL.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

const siteConfig = {
  seo: {
    title: "KalKram | A frontier research lab",
    description:
      "KalKram is a frontier research lab building AI systems that can do science, through world models, continual learning and mechanistic interpretability.",
    openGraph: {
      type: "website",
      siteName: "KalKram",
      images: [
        {
          url: `${siteUrl}/api/og`,
          width: 1200,
          height: 630,
          alt: "KalKram: Intelligence that discovers.",
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
    },
  } as NextSeoProps,
  nav: [
    { label: "Research", href: "/research" },
    { label: "Vision", href: "/about#vision" },
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
  ] as Array<{ label: string; href: string }>,
  privacyUrl: "/privacy",
  footer: {
    contactEmail: "yashraj@kalkram.com",
    linkedin: "https://www.linkedin.com/company/kalkram",
  },
};

export default siteConfig;
