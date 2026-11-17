import { JsonLd } from "@/components/JsonLd";
import { PhotoBackdrop } from "@/components/Photo";
import { LedgerRow, MarkdownNoteRow, NoteRow } from "@/components/Ledger";
import { ConstellationPlate, MatrixDetail } from "@/components/Plates";
import { ResearchToc } from "@/components/ResearchToc";
import { Rich } from "@/components/Rich";
import { TorusCode } from "@/components/TorusCode";
import { notes } from "@/content/notes";
import { allResults, domains, plain } from "@/content/results";
import { site } from "@/content/site";
import { allNotes as markdownNotes } from "@/lib/notes";
import { breadcrumbLd, ORG_ID, pageMeta } from "@/lib/seo";

const description =
  "Verified results from KalKram: no cyclic (465, 145, 45) difference set, exact circuit distance 16 for IBM’s two-gross code, CW(120, 36), new OEIS terms, and more.";

export const metadata = pageMeta({ title: "Research", description, path: "/research" });

/** Fields whose heading carries a picture of one of their objects, in place of a headline number. */
const plates: Record<string, { art: React.ReactNode; caption: React.ReactNode }> = {
  "combinatorial-designs": {
    art: <MatrixDetail />,
    caption: "Part of our Hadamard matrix of order 2148, at two pixels an entry.",
  },
  "integer-sequences": {
    art: (
      <div className="plate-art cine">
        <ConstellationPlate />
      </div>
    ),
    caption: (
      <>
        One complete mapping of Z<sub>31</sub>.
      </>
    ),
  },
  "quantum-error-correction": {
    art: (
      <div className="plate-art cine">
        <TorusCode />
      </div>
    ),
    caption: "IBM’s two-gross code on its torus.",
  },
};

export default function ResearchPage() {
  const written = markdownNotes();
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Results from KalKram",
    numberOfItems: allResults.length,
    itemListElement: allResults.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        "@id": `${site.url}/research#${r.id}`,
        url: `${site.url}/research#${r.id}`,
        name: plain(r.claim),
        ...(r.context ? { description: plain(r.context) } : {}),
        about: r.domain.title,
        creator: { "@id": ORG_ID },
        ...(r.refs?.some((x) => x.href) ? { citation: r.refs.filter((x) => x.href).map((x) => x.href) } : {}),
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Research", path: "/research" }])} />
      <JsonLd data={itemList} />

      <div className="photo-head cine" data-nav-dark>
        <PhotoBackdrop image="hubbleDeepField" position="50% 40%" priority />
      <header className="page-head container">
        <h1 className="h1 rise">What the system has found.</h1>
        <p className="lead rise" style={{ "--d": "0.1s" } as React.CSSProperties}>
          Everything here ran on two small cloud machines: one with an 8 GB GPU, one with four CPU cores and no GPU.
          Each entry says what was known before and what we found; its paper or note says how it was checked.
        </p>
      </header>
      </div>

      <div className="container grid research-layout" style={{ paddingBottom: "var(--section)" }}>
        <ResearchToc
          items={[
            ...domains.map((d) => ({ id: d.id, title: d.title, count: d.results.length })),
            { id: "papers-and-notes", title: "Papers and notes", count: notes.length + written.length },
          ]}
        />
        <div className="research-main">
          {domains.map((d) => {
            const plate = plates[d.id];
            const fig = d.results.find((r) => r.figure)?.figure;
            const long = fig && fig.value.length > 12;
            return (
              <section className="domain" id={d.id} key={d.id} aria-labelledby={`${d.id}-title`}>
                <div className="domain-head">
                  <div>
                    <h2 id={`${d.id}-title`} className="h2">
                      {d.title}
                    </h2>
                    <div className="prose">
                      <p>{d.intro}</p>
                    </div>
                  </div>
                  {plate ? (
                    <figure className="domain-plate">
                      {plate.art}
                      <figcaption>{plate.caption}</figcaption>
                    </figure>
                  ) : fig && !long ? (
                    <div className="domain-figure" aria-hidden="true">
                      <div className="value">{fig.value}</div>
                      <div className="label">
                        <Rich text={fig.caption} />
                      </div>
                    </div>
                  ) : null}
                </div>
                {fig && long ? (
                  <div className="bignum">
                    <div className="value">{fig.value}</div>
                    <span className="label">
                      <Rich text={fig.caption} />
                    </span>
                  </div>
                ) : null}
                <div className="ledger">
                  {d.results.map((r) => (
                    <LedgerRow key={r.id} result={r} />
                  ))}
                </div>
              </section>
            );
          })}
          <section className="domain" id="papers-and-notes" aria-labelledby="papers-and-notes-title">
            <div className="domain-head">
              <div>
                <h2 id="papers-and-notes-title" className="h2">
                  Papers and notes
                </h2>
                <div className="prose">
                  <p>
                    Every result above is set out in one of these: the claim, what was known before, how it was checked
                    and what it does not establish.
                  </p>
                </div>
              </div>
            </div>
            <div className="ledger">
              {notes.map((n) => (
                <NoteRow key={n.id} note={n} />
              ))}
              {written.map((n) => (
                <MarkdownNoteRow key={n.meta.slug} note={n} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
