import katex from "katex";
import Link from "next/link";
import { Fragment } from "react";
import type { Block, Inline, Reference } from "@/lib/note-parse";

/** Mathematics, typeset at build time. A formula that does not parse fails the build. */
function Tex({ v, display }: { v: string; display?: boolean }) {
  const html = katex.renderToString(v, {
    displayMode: !!display,
    throwOnError: true,
    output: "htmlAndMathml",
    strict: "ignore",
  });
  return display ? (
    <div className="paper-math" dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function Inl({ c }: { c: Inline[] }) {
  return (
    <>
      {c.map((x, i) => {
        switch (x.t) {
          case "text":
            return <Fragment key={i}>{x.v}</Fragment>;
          case "math":
            return <Tex key={i} v={x.v} />;
          case "code":
            return (
              <span className="math" key={i}>
                {x.v}
              </span>
            );
          case "strong":
            return (
              <strong key={i}>
                <Inl c={x.c} />
              </strong>
            );
          case "em":
            return (
              <em key={i}>
                <Inl c={x.c} />
              </em>
            );
          case "link":
            return x.href.startsWith("/") ? (
              <Link key={i} href={x.href} className="inline-link">
                <Inl c={x.c} />
              </Link>
            ) : (
              <a key={i} href={x.href} className="inline-link" rel="noopener" target="_blank">
                <Inl c={x.c} />
              </a>
            );
          case "cite":
            return (
              <span className="cite" key={i}>
                {x.n.map((n, k) => (
                  <Fragment key={n}>
                    {k ? ", " : ""}
                    <a href={`#ref-${n}`}>{n}</a>
                  </Fragment>
                ))}
              </span>
            );
        }
      })}
    </>
  );
}

/** The body of a note written in Markdown (content/notes/*.md): its blocks, then its references. */
/**
 * A note's title, for display. The front matter is plain text, so a subscript is written there as T_c: set it as
 * one. Page titles and social cards keep the plain text.
 */
export function NoteTitle({ title }: { title: string }) {
  const parts = title.split(/(?<=\b[A-Za-z])_([A-Za-z0-9]{1,3})\b/);
  return <>{parts.map((p, i) => (i % 2 ? <sub key={i}>{p}</sub> : <Fragment key={i}>{p}</Fragment>))}</>;
}

export function NoteBody({ blocks, refs }: { blocks: Block[]; refs: Reference[] }) {
  const firstHeading = blocks.findIndex((b) => b.t === "h2");
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2":
            return (
              <h2 key={i} id={b.id}>
                <Inl c={b.c} />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={b.id}>
                <Inl c={b.c} />
              </h3>
            );
          case "p":
            return (
              <p key={i} className={firstHeading < 0 || i < firstHeading ? "lede" : undefined}>
                <Inl c={b.c} />
              </p>
            );
          case "math":
            return <Tex key={i} v={b.v} display />;
          case "statement":
            return (
              <div className="statement" key={i}>
                {b.c.map((p, k) => (
                  <p key={k}>
                    <Inl c={p} />
                  </p>
                ))}
              </div>
            );
          case "ul":
          case "ol": {
            const List = b.t;
            return (
              <List key={i}>
                {b.items.map((item, k) => (
                  <li key={k}>
                    <Inl c={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "table":
            return (
              <figure className="paper-table" key={i}>
                <div className="paper-table-scroll">
                  <table>
                    <thead>
                      <tr>
                        {b.head.map((c, k) => (
                          <th key={k} scope="col">
                            <Inl c={c} />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((r, k) => (
                        <tr key={k}>
                          {r.map((c, j) => (
                            <td key={j}>
                              <Inl c={c} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {b.caption ? (
                  <figcaption>
                    <Inl c={b.caption} />
                  </figcaption>
                ) : null}
              </figure>
            );
        }
      })}
      {refs.length ? (
        <section className="paper-refs" aria-labelledby="references">
          <h2 id="references">References</h2>
          <ol>
            {refs.map((r) => (
              <li key={r.n} id={`ref-${r.n}`}>
                <span className="n">{r.n}.</span>
                <span>
                  <Inl c={r.c} />{" "}
                  {r.url ? (
                    <a href={r.url} className="inline-link" rel="noopener" target="_blank">
                      {r.url.replace(/^https?:\/\//, "")}
                    </a>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </>
  );
}
