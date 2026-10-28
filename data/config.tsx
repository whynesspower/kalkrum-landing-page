import { NextSeoProps } from "next-seo";

// Set NEXT_PUBLIC_SITE_URL (for example https://kalkram.com) so link
// previews get an absolute image URL.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

const siteConfig = {
  seo: {
    title: "KalKram | A frontier AI research lab",
    description:
      "KalKram is a frontier AI research lab building systems that keep learning: continual learning, long-term memory and efficient architectures, with interpretability built in.",
    openGraph: {
      type: "website",
      siteName: "KalKram",
      images: [
        {
          url: `${siteUrl}/api/og`,
          width: 1200,
          height: 630,
          alt: "KalKram: Intelligence that keeps learning.",
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
