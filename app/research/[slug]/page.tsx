import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { NoteView } from "@/components/Note";
import { NoteBody, NoteTitle } from "@/components/NoteMarkdown";
import { Rich } from "@/components/Rich";
import { getNote, noteLabel, notes, plainTitle } from "@/content/notes";
import { allResults, plain } from "@/content/results";
import { site } from "@/content/site";
import type { Note as MarkdownNote } from "@/lib/note-parse";
import { allNotes as markdownNotes, formatDate, getNote as getMarkdownNote, kindLabel } from "@/lib/notes";
import { breadcrumbLd, ORG_ID, pageMeta } from "@/lib/seo";
import "katex/dist/katex.min.css";
import "./note.css";

/**
 * One route, two kinds of document. The numbered notes and papers (content/notes/*.ts, KK-R-nnnn) account for
 * the results of the ledger; the notes and white papers written in Markdown (content/notes/*.md) set out the
 * limits-and-certificates results. A slug belongs to exactly one of them.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [...notes.map((n) => ({ slug: n.slug })), ...markdownNotes().map((n) => ({ slug: n.meta.slug }))];
}

/** Inline markup stripped, for descriptions. */
const text = (s: string) =>
  plain(s)
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (note)
    return pageMeta({ title: plainTitle(note), description: text(note.statement), path: `/research/${note.slug}` });
  const written = getMarkdownNote(slug);
  if (written)
    return pageMeta({ title: written.meta.title, description: written.meta.summary, path: `/research/${slug}` });
  return {};
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) {
    const written = getMarkdownNote(slug);
    if (!written) notFound();
    return <MarkdownNotePage note={written} />;
  }
  const url = `${site.url}/research/${note.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Research", path: "/research" },
          { name: noteLabel(note), path: `/research/${note.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ScholarlyArticle",
          headline: `${plainTitle(note)}.`,
          description: text(note.statement),
          url,
          mainEntityOfPage: url,
          datePublished: note.published,
          ...(note.revised ? { dateModified: note.revised } : {}),
          about: note.field,
          author: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
          inLanguage: "en-GB",
          citation: note.refs.filter((r) => r.href).map((r) => r.href),
        }}
      />
      <NoteView note={note} />
    </>
  );
}

/** A note or white paper written in Markdown, set as a paper. */
function MarkdownNotePage({ note }: { note: MarkdownNote }) {
  const { meta, blocks, refs } = note;
  const path = `/research/${meta.slug}`;
  const sections = blocks.flatMap((b) => (b.t === "h2" ? [{ id: b.id, text: b.text }] : []));
  const results = allResults.filter((r) => r.note === meta.slug);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: meta.title,
    description: meta.summary,
    url: `${site.url}${path}`,
    mainEntityOfPage: `${site.url}${path}`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    datePublished: meta.date,
    about: meta.field,
    inLanguage: "en-GB",
    ...(refs.some((r) => r.url) ? { citation: refs.filter((r) => r.url).map((r) => r.url) } : {}),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Research", path: "/research" },
          { name: meta.title, path },
        ])}
      />
      <JsonLd data={articleLd} />

      <header className="page-head container paper-head">
        <p className="label rise">
          <Link href="/research#papers-and-notes">Research</Link> · {kindLabel(meta.kind)} · {meta.field}
        </p>
        <h1 className="h2 paper-title rise" style={{ "--d": "0.06s" } as React.CSSProperties}>
          <NoteTitle title={meta.title} />
        </h1>
        {/* The aside holds the date and the byline, and is hidden on narrow screens and on paper: say them here then. */}
        <p className="label paper-byline">
          <time dateTime={meta.date}>{formatDate(meta.date)}</time> · {site.name}
        </p>
      </header>

      <div className="container grid paper-layout">
        <aside className="paper-aside" aria-label="About this note">
          <dl>
            <div>
              <dt>Published</dt>
              <dd>
                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              </dd>
            </div>
            <div>
              <dt>By</dt>
              <dd>{site.name}</dd>
            </div>
          </dl>
          <nav aria-label="Sections">
            <ol>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.text}</a>
                </li>
              ))}
              <li>
                <a href="#references">References</a>
              </li>
            </ol>
          </nav>
        </aside>

        <article className="paper">
          <NoteBody blocks={blocks} refs={refs} />

          <footer className="paper-foot">
            {results.length ? (
              <>
                <h2>In the ledger</h2>
                <ul>
                  {results.map((r) => (
                    <li key={r.id}>
                      <Link href={`/research#${r.id}`} className="inline-link">
                        <Rich text={r.claim} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            <p>
              The proofs in this note have not been peer reviewed. Full proofs and certificate files are available to
              reviewers on request:{" "}
              <Link href="/contact" className="inline-link">
                write to us
              </Link>
              .
            </p>
          </footer>
        </article>
      </div>
    </>
  );
}
