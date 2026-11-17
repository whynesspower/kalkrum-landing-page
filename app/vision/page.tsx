import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarkField } from "@/components/MarkField";
import { PhotoBackdrop } from "@/components/Photo";
import { site } from "@/content/site";
import { breadcrumbLd, ORG_ID, pageMeta } from "@/lib/seo";

const title = "Superintelligence will be measured in discoveries.";
const description =
  "The gaps between inventions are shrinking. On the line they close on stands a machine that can discover. KalKram is building it: discovery a hundred times faster, wherever an answer can be checked.";

export const metadata = pageMeta({ title: "Vision", description, path: "/vision" });

export default function VisionPage() {
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${site.url}/vision`,
    mainEntityOfPage: `${site.url}/vision`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    datePublished: "2026-11-03",
    inLanguage: "en-GB",
  };

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Vision", path: "/vision" }])} />
      <JsonLd data={articleLd} />

      <header className="page-cine cine" data-nav-dark>
        <PhotoBackdrop image="southernRing" position="50% 50%" priority />
        <MarkField />
        <div className="page-head container">
          <h1 className="h1 rise" style={{ maxWidth: "12em" }}>
            {title}
          </h1>
        </div>
      </header>

      <article className="container grid" style={{ paddingTop: "clamp(72px, 9vw, 136px)" }}>
        <div className="essay">
          <p className="opening">
            From the first stone tool to the transistor took three million years. From the transistor to machines that
            settle open problems in mathematics took eighty.
          </p>
          <p>
            The gaps between inventions keep shrinking. A sequence whose gaps shrink by a steady ratio does not run on
            for ever. It closes on a line. No one knows whether history will hold that ratio. We do know what stands on
            the line.
          </p>

          <h2>The last invention</h2>
          <p>
            A machine that can discover. In 1965 I. J. Good called it “the last invention that man need ever make”.
            <a className="note-ref" href="#n1">
              1
            </a>{" "}
            After it, every other invention can come from the machine.
          </p>

          <h2>What we are building</h2>
          <p>
            That machine. A system that finds what no one has written down, and proves it. The proof matters as much as
            the finding: it is what lets a result be trusted, and the next one be built on it.
          </p>
          <p className="pull">Discovery a hundred times faster. A century of science, every year.</p>

          <h2>What it changes</h2>
          <p>
            It reaches wherever an answer can be checked: mathematics first, then far more of physics, chemistry,
            biology and engineering than it first appears. Questions that would have outlived the people who asked them
            get answered in time to matter.
          </p>

          <h2>Where we are</h2>
          <p>
            We began in mathematics, where a result is right or wrong and a computer can tell which.{" "}
            <Link href="/research" className="inline-link">
              The results so far
            </Link>{" "}
            are stepping stones. Superintelligence will be recognised the same way, by its record: discoveries no person
            made, each one verified, each making the next cheaper.
          </p>
        </div>
        <ol className="notes">
          <li id="n1">
            1. I. J. Good, “Speculations Concerning the First Ultraintelligent Machine”, <i>Advances in Computers</i> 6,
            1965.
          </li>
        </ol>
      </article>
    </>
  );
}
