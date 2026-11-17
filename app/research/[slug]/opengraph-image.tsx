import { getNote, noteLabel, notes, shortTitle } from "@/content/notes";
import { allNotes as markdownNotes, getNote as getMarkdownNote, kindLabel } from "@/lib/notes";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "A research note from KalKram";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return [...notes.map((n) => ({ slug: n.slug })), ...markdownNotes().map((n) => ({ slug: n.meta.slug }))];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (note) return renderOg({ eyebrow: noteLabel(note), title: shortTitle(note) });
  const written = getMarkdownNote(slug);
  if (!written) return new Response(null, { status: 404 });
  return renderOg({ eyebrow: `${kindLabel(written.meta.kind)} · ${written.meta.field}`, title: written.meta.title });
}
