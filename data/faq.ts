/** Plain questions people ask about KalKram. Rendered on /approach and as FAQPage JSON-LD. */
export const faq = [
  {
    q: "What is KalKram?",
    a: "KalKram is a research lab building a system that makes verified scientific discoveries. It finds the structure in a hard problem, compiles a solver for it, and accepts a result only when multiple independent verifiers re-derive it.",
  },
  {
    q: "What has KalKram discovered so far?",
    a: "Among others: no cyclic (465, 145, 45) difference set exists, the smallest open case in the La Jolla repository; IBM's two-gross memory circuit has exact circuit distance 16, not the published 18; CW(120, 36) exists, contradicting a published theorem; 200+ Hadamard-family matrices at open orders; three new terms of OEIS A003111; and 860 exact minimum distances for 5G NR LDPC codes.",
  },
  {
    q: "How does KalKram verify a result?",
    a: "A result is accepted only when multiple separately written verifiers re-derive it. Where possible it ships with a certificate anyone can check, such as an explicit matrix or a SAT proof. Results resting on one engine, closed internally, or of unsettled novelty are labelled that way.",
  },
  {
    q: "How is this different from a SAT or constraint solver?",
    a: "General solvers such as Kissat and CP-SAT treat every problem the same way. KalKram first identifies a problem's structure, then compiles an engine for exactly that. On Williamson and Legendre problems these engines run at least 30,000× faster.",
  },
  {
    q: "How is KalKram different from frontier AI labs doing science?",
    a: "Frontier labs reach discoveries by spending at enormous scale: OpenAI's Navier-Stokes result used about ten thousand agents and 130 billion output tokens. KalKram makes search cheap by finding structure first. Its results ran on one cloud machine with an 8 GB GPU, and each leaves reusable tools behind.",
  },
  {
    q: "What kinds of problems can the system work on?",
    a: "Problems whose answers can be checked: combinatorial design, coding theory, quantum error correction, SAT and optimisation, physics and materials. It is strongest where a problem has structure general solvers ignore.",
  },
  {
    q: "What does generalisation mean here?",
    a: "A system generalises when it recognises, in a new problem, structure it has met before. Every verified result leaves tools that later problems reuse, so the system gets stronger with each discovery.",
  },
] as const;
