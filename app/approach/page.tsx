import Link from "next/link";
import { PhotoBackdrop } from "@/components/Photo";
import { LoopDiagram, SearchGrowthChart } from "@/components/Diagrams";
import { JsonLd } from "@/components/JsonLd";
import { SearchSpace } from "@/components/Plates";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

const description =
  "How KalKram makes discoveries: find a problem’s structure, compile a solver for it, run an optimise–simulate–experiment–verify loop, and re-derive every result with multiple independent verifiers.";

export const metadata = pageMeta({ title: "Approach", description, path: "/approach" });

function Chapter({
  n,
  name,
  title,
  children,
  aside,
}: {
  n: string;
  name: string;
  title: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="chapter container" aria-labelledby={`ch-${n}`}>
      <div className="grid">
        <div className="chapter-num">
          <span className="n">{n}</span>
          <span className="label">{name}</span>
        </div>
        <div className="chapter-body">
          <h2 id={`ch-${n}`} className="h2">
            {title}
          </h2>
          <div className="prose">{children}</div>
        </div>
        {aside ? <div className="chapter-aside">{aside}</div> : null}
      </div>
    </section>
  );
}

export default function ApproachPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Approach", path: "/approach" }])} />

      <div className="photo-head cine" data-nav-dark>
        <PhotoBackdrop image="cosmicCliffs" position="50% 14%" priority />
      <header className="page-head container">
        <h1 className="h1 rise">Structure first.</h1>
        <p className="lead rise" style={{ "--d": "0.1s" } as React.CSSProperties}>
          Most of the cost of a discovery is search, and most search is spent where no answer can be. The system works
          out what a problem is made of, builds a solver for exactly that, and keeps every tool it makes. Everything so
          far ran on two small cloud machines: one with an 8 GB GPU, one with four CPU cores and no GPU.
        </p>
      </header>
      </div>

      <Chapter
        n="1"
        name="Find the structure"
        title="Look before you search."
        aside={
          <figure className="figure-box">
            <SearchSpace />
            <figcaption>A space of candidates, and the thin part of it where an answer can be.</figcaption>
          </figure>
        }
      >
        <p>
          A hard problem is a space too large to list, with a thin region where the answers can be. Structure says where
          that region is: a symmetry, an algebraic identity, a way the problem splits into independent parts.
        </p>
        <p>
          Detectors look for structures the system has met before, and it commits to one only after a checker confirms
          it. In blind tests it found the right structure in five of eight models, with no false detections.
        </p>
      </Chapter>

      <Chapter
        n="2"
        name="Compile a solver"
        title="One engine per structure."
        aside={
          <figure className="figure-box">
            <SearchGrowthChart />
            <figcaption>
              Search effort against target distance, for our quantum-code engine and the best published tool. Six steps
              up, ours needs roughly 40 to 130 times less work.
            </figcaption>
          </figure>
        }
      >
        <p>
          A compiler turns the problem’s model into an engine made for it alone, with its own data layout, pruning rules
          and symmetry breaking. On Williamson and Legendre problems these engines run more than 30,000 times faster
          than Kissat and CP-SAT.
        </p>
        <p>
          Our first engine, the FLC method, was built by hand. It runs 1,100 to 5,000 times faster than the original
          authors’ code on the same machine. The compiler now matches it.
        </p>
      </Chapter>

      <Chapter
        n="3"
        name="Run the loop"
        title="Optimise, simulate, experiment, verify."
        aside={
          <figure className="figure-box">
            <LoopDiagram />
            <figcaption>
              Every verified result joins the library at the centre. Every later run starts from it.
            </figcaption>
          </figure>
        }
      >
        <p>
          Agents drive a closed loop. They choose the next bound to push, try the idea cheaply in simulation, run the
          compiled search at full scale, and hand the result to verification. A failed check shapes the next round.
        </p>
        <p>
          Language models write and run the experiments. We do not rely on any one of them being right: the loop around
          them is what makes the output trustworthy.
        </p>
      </Chapter>

      <Chapter n="4" name="Prove it" title="Nothing counts until it has been checked.">
        <p>
          Every result we accept is re-derived by multiple separately written verifiers, so a bug in one is unlikely to
          repeat in the others. Where we can, it carries a certificate anyone can check without trusting us: an explicit
          matrix, a SAT certificate.
        </p>
        <p>
          If a result rests on one engine, was closed only internally, may not be new, or someone else got there first,
          the research log says so.
        </p>
      </Chapter>

      <Chapter n="5" name="Keep everything" title="Each discovery makes the next one cheaper.">
        <p>
          Every verified result leaves its detector, checker and solver in a library, and the next problem starts there.
          Given a kind of problem it had never seen, the system produced a verified solver in five to six minutes.
        </p>
        <p>
          That is what we mean by generalisation: recognising known structure in a problem never seen before. It is also
          why the gap between one discovery and the next keeps closing.
        </p>
      </Chapter>

      <section className="band-accent" aria-labelledby="platform-title">
        <div className="container grid">
          <div className="closing">
            <h2 id="platform-title" className="h1">
              Bring a problem with a checkable answer.
            </h2>
            <p className="lead" style={{ marginTop: 28, maxWidth: "34em" }}>
              The first version opens to research teams in late November 2026. The system finds the structure, runs the
              search, and returns results you can verify and build on.
            </p>
            <div className="band-links">
              <Link href="/contact" className="link">
                Write to us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
