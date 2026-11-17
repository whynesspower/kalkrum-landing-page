import Link from "next/link";
import { noteForResult, type Note } from "@/content/notes";
import type { Result } from "@/content/results";
import type { Note as MarkdownNote } from "@/lib/note-parse";
import { formatDate, getNote as getMarkdownNote, kindLabel } from "@/lib/notes";
import { NoteTitle } from "./NoteMarkdown";
import { Rich } from "./Rich";

/**
 * The document that sets a result out in full: a numbered note or paper that lists the result (content/notes/*.ts),
 * or the Markdown note the result names in its `note` field (content/notes/*.md).
 */
function documentFor(result: Result) {
  const note = noteForResult(result.id);
  if (note)
    return {
      href: `/research/${note.slug}`,
      id: note.id,
      read: note.kind === "paper" ? "Read the paper" : "Read the note",
    };
  const written = result.note ? getMarkdownNote(result.note) : undefined;
  if (written)
    return {
      href: `/research/${written.meta.slug}`,
      read: written.meta.kind === "white-paper" ? "Read the white paper" : "Read the note",
    };
  return undefined;
}

/** One result, as a row in the research ledger. */
export function LedgerRow({ result, topic }: { result: Result; topic?: string }) {
  const doc = documentFor(result);
  return (
    <article className="ledger-row" id={result.id}>
      <div className="ledger-topic label">{topic ?? result.topic}</div>
      <div className="ledger-body">
        <h3 className="ledger-claim">
          <Rich text={result.claim} />
        </h3>
        {result.context ? (
          <p className="ledger-context">
            <Rich text={result.context} />
          </p>
        ) : null}
        {result.refs || doc ? (
          <div className="ledger-meta">
            {result.refs ? (
              <span className="refs">
                {result.refs.map((r) =>
                  r.href ? (
                    <a key={r.label} href={r.href} className="inline-link" rel="noopener" target="_blank">
                      {r.label}
                    </a>
                  ) : (
                    <span key={r.label}>{r.label}</span>
                  ),
                )}
              </span>
            ) : null}
            {doc ? (
              <Link href={doc.href} className="ledger-note" aria-label={doc.id ? `${doc.read}, ${doc.id}` : undefined}>
                {doc.id ? <span className="ledger-note-id">{doc.id}</span> : null}
                <span>{doc.read}</span>
                <span className="ledger-note-go" aria-hidden="true">
                  →
                </span>
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
      <a className="permalink" href={`#${result.id}`} aria-label="Link to this result">
        #
      </a>
    </article>
  );
}

/** One numbered paper or note, as a row in the list at the foot of the research page. */
export function NoteRow({ note }: { note: Note }) {
  return (
    <article className="ledger-row doc-row">
      <div className="ledger-topic label">{note.id}</div>
      <div className="ledger-body">
        <h3 className="ledger-claim">
          <Link href={`/research/${note.slug}`}>
            <Rich text={note.title} />
          </Link>
        </h3>
        <p className="doc-meta">{[note.kind === "paper" ? "Paper" : "Note", note.type, note.field].join(" · ")}</p>
      </div>
    </article>
  );
}

/** One note or white paper written in Markdown, as a row in the same list. */
export function MarkdownNoteRow({ note }: { note: MarkdownNote }) {
  const { meta } = note;
  return (
    <article className="ledger-row doc-row doc-row-plain">
      <div className="ledger-topic label">{kindLabel(meta.kind)}</div>
      <div className="ledger-body">
        <h3 className="ledger-claim">
          <Link href={`/research/${meta.slug}`}>
            <NoteTitle title={meta.title} />
          </Link>
        </h3>
        <p className="doc-meta">{[meta.field, formatDate(meta.date)].join(" · ")}</p>
      </div>
    </article>
  );
}
