import { NextSeoProps } from "next-seo";
import { flags } from "lib/flags";

// Set NEXT_PUBLIC_SITE_URL (for example https://kalkram.com) so link
// previews get an absolute image URL.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");

const siteConfig = {
  // The registered company that owns and runs KalKram. The legal name is used
  // in every place the company is named.
  company: {
    legalName: "Aalaka Labs LLP",
    productOf: "KalKram is a product of Aalaka Labs LLP.",
    formerName: "Generalised Superintelligence (GSI)",
    // TODO(owner): say who owns the technology and IP, for example
    // "Aalaka Labs LLP owns the KalKram technology and all related IP."
    // Left empty on purpose: the site shows nothing in production until this
    // is filled, and a visible TODO in development.
    ipStatement: "",
  },
  seo: {
    title: "KalKram | A frontier AI lab for verified discovery",
    description:
      "KalKram is a frontier AI lab building a system that makes verified discoveries. It finds the structure in a hard problem, compiles a solver for it, and accepts a result only when independent verifiers re-derive it. A product of Aalaka Labs LLP.",
    openGraph: {
      type: "website",
      siteName: "KalKram",
      images: [
        {
          url: `${siteUrl}/api/og`,
          width: 1200,
          height: 630,
          alt: "KalKram: Every discovery should make the next one cheaper.",
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
