export const site = {
  name: "KalKram",
  shortName: "KalKram",
  /** The registered company that owns and runs KalKram. */
  legalName: "Aalaka Labs LLP",
  url: "https://kalkram.com",
  contactEmail: "yashraj@kalkram.com",
  locations: ["Bengaluru", "San Francisco"],
  founded: "2026",
  tagline: "Every discovery should make the next one cheaper.",
  description:
    "KalKram is a research lab building superintelligence for scientific discovery. Its system finds the structure in a hard problem, compiles a solver for that structure, and accepts a result only when multiple independent verifiers re-derive it. Each discovery leaves tools behind that make the next one cheaper. The aim is to make discovery a hundred times faster in every field where an answer can be checked.",
  metaDescription:
    "KalKram is building superintelligence for discovery: a system that finds what no one has written down, and proves it.",
  shortDescription:
    "A research lab building superintelligence for discovery: a system that finds what no one has written down, and proves it.",
} as const;

export const founders = [
  {
    name: "Yashraj Shukla",
    role: "Co-founder, CEO",
    line: "Leads the company and builds the harness that runs and checks every experiment. Previously co-founder and CTO of Kernely and AI researcher at Hexo Labs.",
    url: "https://www.linkedin.com/in/whynesspower",
    linkedin: "https://www.linkedin.com/in/whynesspower",
    sameAs: ["https://www.linkedin.com/in/whynesspower"],
  },
] as const;

export const nav = [
  { href: "/vision", label: "Vision" },
  { href: "/research", label: "Research" },
  { href: "/approach", label: "Approach" },
  { href: "/contact", label: "Contact" },
] as const;
