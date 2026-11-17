import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { Epochs } from "@/components/Epochs";
import { Frontier } from "@/components/Frontier";
import { ConstellationPlate, RingPlate } from "@/components/Plates";
import { ImageBand } from "@/components/Photo";
import { TalkToUsButton } from "@/components/TalkToUsButton";
import { Ticker } from "@/components/Ticker";
import { TorusCode } from "@/components/TorusCode";
import { featuredIds, getResult } from "@/content/results";

export default function Home() {
  const featured = featuredIds.map(getResult);

  return (
    <>
      <section className="hero cine" data-nav-dark aria-labelledby="hero-title">
        <div className="hero-stage">
          <Frontier />
          <div className="container hero-copy">
            <h1 id="hero-title" className="display rise">
              We are building superintelligence for discovery.
            </h1>
            <p className="lead rise" style={{ "--d": "0.12s" } as React.CSSProperties}>
              A system that finds what no one has written down, and proves it. The aim: discovery a hundred times
              faster, in every field where an answer can be checked.
            </p>
            <div className="hero-actions rise" style={{ "--d": "0.22s" } as React.CSSProperties}>
              <Link href="/research" className="btn">
                See our research <Arrow />
              </Link>
              <TalkToUsButton className="btn btn-ghost">Request Early Access</TalkToUsButton>
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <div className="container">
            <Ticker items={featured.map((r) => ({ claim: r.claim, domain: r.domain.title }))} />
          </div>
        </div>
      </section>

      <section className="band-epochs cine" aria-labelledby="last-title">
        <div className="container">
          <div className="grid">
            <h2 id="last-title" className="h1 thesis-statement">
              The last invention people will need to make.
            </h2>
            <div className="thesis-cols prose">
              <p>
                People have been inventing for 3.3 million years, and nearly all of it happened at the very end. Each
                line below magnifies the bright tip of the line above it.
              </p>
            </div>
          </div>
          <Epochs />
          <div className="epochs-foot">
            <p>
              In 1965 I. J. Good called the first ultraintelligent machine “the last invention that man need ever make”.
              Once a machine can discover, every discovery after it can come from the machine. That is what we are
              building.
            </p>
            <small>Dates are approximate. Every line is drawn to scale.</small>
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="method-title">
        <div className="grid">
          <h2 id="method-title" className="h2 thesis-statement">
            Every discovery should make the next one cheaper.
          </h2>
          <div className="thesis-cols prose">
            <p>
              Machine discovery today is bought with scale. OpenAI’s{" "}
              <a
                className="inline-link"
                href="https://openai.com/index/navier-stokes-solution"
                rel="noopener"
                target="_blank"
              >
                Navier–Stokes run
              </a>{" "}
              took about ten thousand agents and 130 billion output tokens.
            </p>
            <p>
              Most of that cost is search where no answer can be. We find a problem’s structure first and build a solver
              for exactly that: up to 47,000 times faster than published run times, on one machine with an 8 GB GPU.
            </p>
            <p>
              A result counts only when multiple separately written verifiers re-derive it. Where only one engine stands
              behind a claim, we say so.
            </p>
            <p>
              Every verified result leaves its tools behind. A kind of problem the system had never seen got a verified
              solver in five to six minutes.
            </p>
          </div>
        </div>
        <div className="grid">
          <div className="section-link">
            <Link href="/approach" className="link">
              How the system works
            </Link>
          </div>
        </div>
      </section>

      <ImageBand image="pillars" position="50% 38%" />


      <section className="section container" aria-labelledby="results-title">
        <div className="grid" style={{ marginBottom: "clamp(48px, 6vw, 88px)" }}>
          <h2 id="results-title" className="h2 thesis-statement">
            The first stepping stones.
          </h2>
          <div className="thesis-cols prose">
            <p>
              Open questions settled in six fields so far: combinatorial designs, integer sequences, coding theory,
              quantum error correction, SAT and proof, physics and materials.
            </p>
            <p>
              None of them is the goal. We began where a result is simply right or wrong, and each field left tools that
              made the next cheaper to enter.
            </p>
          </div>
        </div>
        <div className="plates">
          <Link className="plate" href="/research#cyclic-difference-set-465">
            <div className="plate-art cine">
              <RingPlate />
            </div>
            <span className="plate-claim">No cyclic (465, 145, 45) difference set exists.</span>
            <span className="plate-note">
              There are about 8.3 × 10<sup>123</sup> ways to choose 145 of 465 points on a circle. None works. It was
              the smallest case still listed as open.
            </span>
          </Link>
          <Link className="plate" href="/research#ibm-two-gross-circuit-distance">
            <div className="plate-art cine">
              <TorusCode />
            </div>
            <span className="plate-claim">IBM’s two-gross quantum memory has circuit distance 16, not 18.</span>
            <span className="plate-note">
              288 qubits joined to 288 checks around a torus. Crocker showed the distance is at most 16. We proved it
              cannot be less.
            </span>
          </Link>
          <Link className="plate" href="/research#oeis-a003111">
            <div className="plate-art cine">
              <ConstellationPlate />
            </div>
            <span className="plate-claim">Three new terms of OEIS A003111.</span>
            <span className="plate-note">
              One mark in every row, column and wrapped diagonal of a 31 × 31 grid. With the corner fixed there are
              2,427,915,096,775,283,929,115 ways to do it.
            </span>
          </Link>
        </div>
        <div className="grid">
          <div className="section-link">
            <Link href="/research" className="link">
              All results, and how each was checked
            </Link>
          </div>
        </div>
      </section>

      <ImageBand image="deepField" position="50% 42%" />


      <section className="band-accent" aria-labelledby="vision-title">
        <div className="container grid">
          <div className="closing">
            <h2 id="vision-title" className="h1">
              A century of science, every year.
            </h2>
            <p className="lead" style={{ marginTop: 28, maxWidth: "30em" }}>
              That is what a hundred times faster means, and it is what we are building toward.
            </p>
            <div className="band-links">
              <Link href="/vision" className="link">
                Read the vision
              </Link>
              <Link href="/contact" className="link">
                Bring us a problem
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
