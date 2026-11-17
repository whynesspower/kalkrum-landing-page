import Link from "next/link";
import { evidenceLabels } from "@/content/results";
import { anchor, type Block, type Note, noteLabel } from "@/content/notes";
import { noteFigures } from "./NoteFigures";
import { Rich } from "./Rich";

const DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
export const noteDate = (iso: string) => DATE.format(new Date(`${iso}T00:00:00Z`));

function BlockView({ block }: { block: Block }) {
  if ("p" in block)
    return (
      <p>
        <Rich text={block.p} />
      </p>
    );
  if ("statement" in block)
    return (
      <div className="note-statement">
        {block.label ? <span className="label">{block.label}</span> : null}
        <p>
          <Rich text={block.statement} />
        </p>
      </div>
    );
  if ("list" in block)
    return (
      <ul>
        {block.list.map((item) => (
          <li key={item}>
            <Rich text={item} />
          </li>
        ))}
      </ul>
    );
  if ("table" in block) {
    const { head, rows, caption, numeric = [], nowrap = [] } = block.table;
    const cell = (i: number) =>
      [numeric.includes(i) ? "num" : "", nowrap.includes(i) ? "nowrap" : ""].join(" ").trim() || undefined;
    return (
      <figure className="note-table">
        <div className="note-table-scroll">
          <table>
            <thead>
              <tr>
                {head.map((h, i) => (
                  <th key={h} scope="col" className={cell(i)}>
                    <Rich text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((text, i) => (
                    <td key={`${i}:${text}`} className={cell(i)}>
                      <Rich text={text} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {caption ? (
          <figcaption>
            <Rich text={caption} />
          </figcaption>
        ) : null}
      </figure>
    );
  }
  if ("code" in block)
    return (
      <figure className="note-code">
        <pre tabIndex={0}>
          <code>{block.code}</code>
        </pre>
        {block.caption ? (
          <figcaption>
            <Rich text={block.caption} />
          </figcaption>
        ) : null}
      </figure>
    );
  if ("figure" in block) {
    const Figure = noteFigures[block.figure];
    return (
      <figure className="note-figure">
        {Figure ? <Figure /> : null}
        <figcaption>
          <Rich text={block.caption} />
        </figcaption>
      </figure>
    );
  }
  return (
    <p className="note-small">
      <Rich text={block.small} />
    </p>
  );
}

/** A research note or paper, laid out the same way every time. */
export function NoteView({ note }: { note: Note }) {
  const back = note.results.length ? `/research#${note.results[0]}` : "/research";
  return (
    <article className="note">
      <header className="note-head container">
        <p className="note-kicker label">
          <Link href={back}>Research</Link>
          <span aria-hidden="true">/</span>
          <span>{note.field}</span>
          <span aria-hidden="true">/</span>
          <span>{noteLabel(note)}</span>
        </p>
        <h1 className="note-title rise">
          <Rich text={note.title} />
        </h1>
        <p className="note-lede rise" style={{ "--d": "0.08s" } as React.CSSProperties}>
          <Rich text={note.statement} />
        </p>
        <dl className="note-facts">
          <div>
            <dt>Before this work</dt>
            <dd>
              <Rich text={note.header.before} />
            </dd>
          </div>
          <div>
            <dt>Evidence</dt>
            <dd>
              <strong className="note-evidence">{evidenceLabels[note.evidence].label}.</strong>{" "}
              <Rich text={note.header.evidence} />
            </dd>
          </div>
          <div>
            <dt>What you can check</dt>
            <dd>
              <Rich text={note.header.check} />
            </dd>
          </div>
          <div>
            <dt>Not established</dt>
            <dd>
              <Rich text={note.header.notEstablished} />
            </dd>
          </div>
          <div>
            <dt>Method</dt>
            <dd>
              <Rich text={note.header.method} />
            </dd>
          </div>
        </dl>
      </header>

      <div className="container grid note-layout">
        <nav className="note-toc" aria-label="Sections">
          <ol>
            {note.sections.map((s) => (
              <li key={s.title}>
                <a href={`#${anchor(s.title)}`}>{s.title}</a>
              </li>
            ))}
            {note.files?.length ? (
              <li>
                <a href="#files">Files</a>
              </li>
            ) : null}
            <li>
              <a href="#references">References</a>
            </li>
          </ol>
        </nav>

        <div className="note-body">
          {note.sections.map((s) => (
            <section key={s.title} id={anchor(s.title)} aria-labelledby={`${anchor(s.title)}-title`}>
              <h2 id={`${anchor(s.title)}-title`}>{s.title}</h2>
              {s.blocks.map((b, i) => (
                <BlockView key={i} block={b} />
              ))}
            </section>
          ))}

          {note.files?.length ? (
            <section id="files" aria-labelledby="files-title">
              <h2 id="files-title">Files</h2>
              <ul className="note-files">
                {note.files.map((f) => (
                  <li key={f.href}>
                    <a href={f.href} className="inline-link" rel="noopener" target="_blank">
                      {f.label}
                    </a>
                    {f.detail ? (
                      <span>
                        <Rich text={f.detail} />
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section id="references" aria-labelledby="references-title">
            <h2 id="references-title">References</h2>
            <ol className="note-refs">
              {note.refs.map((r, i) => (
                <li key={r.text} id={`ref-${i + 1}`}>
                  <span className="n">[{i + 1}]</span>
                  <span>
                    <Rich text={r.text} />{" "}
                    {r.href ? (
                      <a href={r.href} className="inline-link" rel="noopener" target="_blank">
                        Link
                      </a>
                    ) : null}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <footer className="note-foot">
            <p>
              <span className="label">Cite as</span>
              {note.cite}
            </p>
            <p>
              <span className="label">Published</span>
              {noteDate(note.published)}
              {note.revised ? `. Revised ${noteDate(note.revised)}.` : ""}
            </p>
            {note.history?.length ? (
              <div>
                <span className="label">History</span>
                <ul className="note-history">
                  {note.history.map((h) => (
                    <li key={h.date + h.text}>
                      <time dateTime={h.date}>{noteDate(h.date)}</time>
                      <span>
                        <Rich text={h.text} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <p>
              <Link href={back} className="link">
                All results
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </article>
  );
}
