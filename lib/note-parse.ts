/**
 * Parser for research notes (content/notes/*.md).
 *
 * A note is a small, fixed dialect, not general Markdown: front matter, `##` and `###` headings, paragraphs,
 * display mathematics between `$$` lines, statement blocks (lines starting with `> `), flat lists, pipe tables with
 * an optional `Table:` caption, and a final `## References` list. Inline: `$math$`, **strong**, *emphasis*, `code`,
 * [links](https://…) and citations [1] or [2, 3].
 *
 * This file has no imports and uses only erasable type syntax, so `scripts/check-note.mjs` can load it directly.
 */

export type Inline =
  | { t: "text"; v: string }
  | { t: "math"; v: string }
  | { t: "code"; v: string }
  | { t: "strong"; c: Inline[] }
  | { t: "em"; c: Inline[] }
  | { t: "link"; href: string; c: Inline[] }
  | { t: "cite"; n: number[] };

export type Block =
  | { t: "h2" | "h3"; id: string; text: string; c: Inline[] }
  | { t: "p"; c: Inline[] }
  | { t: "math"; v: string }
  | { t: "statement"; c: Inline[][] }
  | { t: "ul" | "ol"; items: Inline[][] }
  | { t: "table"; head: Inline[][]; rows: Inline[][][]; caption?: Inline[] };

export type Reference = { n: number; c: Inline[]; url?: string };

export type NoteMeta = {
  title: string;
  slug: string;
  kind: "white-paper" | "note";
  field: string;
  date: string;
  summary: string;
};

export type Note = {
  meta: NoteMeta;
  /** Opening paragraphs and sections, without the reference list. */
  blocks: Block[];
  refs: Reference[];
  /** Words of running text, without mathematics and references. */
  words: number;
  /** Problems found while parsing. An empty list means the note is well formed. */
  errors: string[];
};

const KINDS = ["white-paper", "note"];

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\$[^$]*\$/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Position of the `$` that closes inline mathematics opened at `from - 1`, or -1. */
function closingDollar(s: string, from: number) {
  for (let i = from; i < s.length; i++) {
    if (s[i] === "\\") i++;
    else if (s[i] === "$") return i;
  }
  return -1;
}

export function parseInline(src: string, errors: string[] = []): Inline[] {
  const out: Inline[] = [];
  let buf = "";
  const flush = () => {
    if (buf) out.push({ t: "text", v: buf });
    buf = "";
  };
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (ch === "\\" && i + 1 < src.length && "$*[]`|\\".includes(src[i + 1])) {
      buf += src[i + 1];
      i += 2;
    } else if (ch === "$") {
      const j = closingDollar(src, i + 1);
      if (j < 0) {
        errors.push(`unclosed $ in: ${src.slice(i, i + 60)}`);
        buf += ch;
        i++;
      } else {
        flush();
        out.push({ t: "math", v: src.slice(i + 1, j) });
        i = j + 1;
      }
    } else if (ch === "`") {
      const j = src.indexOf("`", i + 1);
      if (j < 0) {
        errors.push(`unclosed backtick in: ${src.slice(i, i + 60)}`);
        buf += ch;
        i++;
      } else {
        flush();
        out.push({ t: "code", v: src.slice(i + 1, j) });
        i = j + 1;
      }
    } else if (src.startsWith("**", i)) {
      const j = src.indexOf("**", i + 2);
      if (j < 0) {
        errors.push(`unclosed ** in: ${src.slice(i, i + 60)}`);
        buf += "**";
        i += 2;
      } else {
        flush();
        out.push({ t: "strong", c: parseInline(src.slice(i + 2, j), errors) });
        i = j + 2;
      }
    } else if (ch === "*") {
      let j = i + 1;
      while (j < src.length && src[j] !== "*") {
        if (src[j] === "$") {
          const k = closingDollar(src, j + 1);
          j = k < 0 ? src.length : k;
        }
        j++;
      }
      if (j >= src.length) {
        buf += ch;
        i++;
      } else {
        flush();
        out.push({ t: "em", c: parseInline(src.slice(i + 1, j), errors) });
        i = j + 1;
      }
    } else if (ch === "[") {
      const close = src.indexOf("]", i + 1);
      const inner = close < 0 ? "" : src.slice(i + 1, close);
      if (close > 0 && src[close + 1] === "(") {
        const end = src.indexOf(")", close + 2);
        if (end < 0) {
          errors.push(`unclosed link in: ${src.slice(i, i + 60)}`);
          buf += ch;
          i++;
        } else {
          flush();
          out.push({ t: "link", href: src.slice(close + 2, end).trim(), c: parseInline(inner, errors) });
          i = end + 1;
        }
      } else if (close > 0 && /^\d+(\s*,\s*\d+)*$/.test(inner)) {
        flush();
        out.push({ t: "cite", n: inner.split(",").map((x) => parseInt(x.trim(), 10)) });
        i = close + 1;
      } else {
        buf += ch;
        i++;
      }
    } else {
      buf += ch;
      i++;
    }
  }
  flush();
  return out;
}

/** Splits a table row on `|`, leaving bars inside mathematics and escaped bars alone. */
function splitRow(line: string) {
  const cells: string[] = [];
  let cur = "";
  let math = false;
  const s = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "\\" && i + 1 < s.length) {
      cur += ch + s[i + 1];
      i++;
    } else if (ch === "$") {
      math = !math;
      cur += ch;
    } else if (ch === "|" && !math) {
      cells.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  cells.push(cur.trim());
  return cells;
}

export function plainInline(c: Inline[]): string {
  return c
    .map((x) => {
      switch (x.t) {
        case "text":
        case "code":
          return x.v;
        case "math":
          return x.v;
        case "cite":
          return `[${x.n.join(", ")}]`;
        default:
          return plainInline(x.c);
      }
    })
    .join("");
}

function countWords(c: Inline[]): number {
  let n = 0;
  for (const x of c) {
    if (x.t === "text") n += x.v.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
    else if (x.t === "strong" || x.t === "em" || x.t === "link") n += countWords(x.c);
  }
  return n;
}

const isBlockStart = (l: string) =>
  /^(##|###) /.test(l) || l === "$$" || l.startsWith(">") || l.startsWith("|") || /^- /.test(l) || /^\d+\. /.test(l);

export function parseNote(source: string): Note {
  const errors: string[] = [];
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const meta: Record<string, string> = {};
  let i = 0;

  if (lines[0]?.trim() !== "---") errors.push("the file must start with front matter between --- lines");
  else {
    i = 1;
    while (i < lines.length && lines[i].trim() !== "---") {
      const m = /^([a-z]+):\s*(.*)$/.exec(lines[i]);
      if (m) meta[m[1]] = m[2].trim();
      else if (lines[i].trim()) errors.push(`front matter line not understood: ${lines[i]}`);
      i++;
    }
    if (i >= lines.length) errors.push("front matter is not closed");
    i++;
  }
  for (const k of ["title", "slug", "kind", "field", "date", "summary"])
    if (!meta[k]) errors.push(`front matter is missing "${k}"`);
  if (meta.kind && !KINDS.includes(meta.kind)) errors.push(`kind must be one of: ${KINDS.join(", ")}`);
  if (meta.date && !/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) errors.push("date must be YYYY-MM-DD");

  const blocks: Block[] = [];
  const refs: Reference[] = [];
  const ids = new Set<string>();
  let inRefs = false;
  let words = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const h = /^(#{1,6}) +(.*)$/.exec(line);
    if (h) {
      if (h[1].length !== 2 && h[1].length !== 3) errors.push(`only ## and ### headings exist: ${line}`);
      const text = h[2].trim();
      if (inRefs) errors.push("References must be the last section");
      if (text.toLowerCase() === "references") inRefs = true;
      else {
        const c = parseInline(text, errors);
        let id = slugify(text) || "section";
        while (ids.has(id)) id += "-2";
        ids.add(id);
        blocks.push({ t: h[1].length === 3 ? "h3" : "h2", id, text: plainInline(c), c });
      }
      i++;
    } else if (line.trim() === "$$") {
      const body: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== "$$") body.push(lines[i++]);
      if (i >= lines.length) errors.push("display mathematics is not closed by a $$ line");
      i++;
      blocks.push({ t: "math", v: body.join("\n").trim() });
    } else if (line.startsWith(">")) {
      const paras: string[] = [];
      let cur: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        const t = lines[i].replace(/^> ?/, "");
        if (!t.trim()) {
          if (cur.length) paras.push(cur.join(" "));
          cur = [];
        } else cur.push(t.trim());
        i++;
      }
      if (cur.length) paras.push(cur.join(" "));
      const c = paras.map((p) => parseInline(p, errors));
      c.forEach((p) => (words += countWords(p)));
      if (c[0]?.[0]?.t !== "strong") errors.push(`a statement block opens with a bold label: ${paras[0]?.slice(0, 50)}`);
      blocks.push({ t: "statement", c });
    } else if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) rows.push(splitRow(lines[i++]));
      if (rows.length < 3 || !rows[1].every((c) => /^:?-+:?$/.test(c)))
        errors.push(`a table needs a header row, a |---| row and at least one body row: ${rows[0]?.join(" | ")}`);
      const width = rows[0].length;
      rows.forEach((r) => {
        if (r.length !== width) errors.push(`table row has ${r.length} cells, header has ${width}: ${r.join(" | ")}`);
      });
      const block: Block = {
        t: "table",
        head: rows[0].map((c) => parseInline(c, errors)),
        rows: rows.slice(2).map((r) => r.map((c) => parseInline(c, errors))),
      };
      if (i < lines.length && /^Table:/.test(lines[i])) {
        const cap: string[] = [lines[i++].replace(/^Table:\s*/, "")];
        while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) cap.push(lines[i++].trim());
        block.caption = parseInline(cap.join(" "), errors);
        words += countWords(block.caption);
      }
      blocks.push(block);
    } else if (/^- /.test(line) || /^\d+\. /.test(line)) {
      const ordered = !/^- /.test(line);
      const marker = ordered ? /^\d+\. +/ : /^- +/;
      const items: string[] = [];
      while (i < lines.length && lines[i].trim()) {
        if (marker.test(lines[i])) items.push(lines[i].replace(marker, "").trim());
        else if (/^\s+\S/.test(lines[i]) && items.length) items[items.length - 1] += " " + lines[i].trim();
        else break;
        i++;
      }
      if (inRefs) {
        if (!ordered) errors.push("the reference list is a numbered list");
        for (const item of items) {
          const m = /^(.*?)\s*(https?:\/\/\S+?)[.\s]*$/.exec(item);
          refs.push({
            n: refs.length + 1,
            c: parseInline((m ? m[1] : item).trim(), errors),
            ...(m ? { url: m[2] } : {}),
          });
        }
      } else {
        const parsed = items.map((x) => parseInline(x, errors));
        parsed.forEach((p) => (words += countWords(p)));
        blocks.push({ t: ordered ? "ol" : "ul", items: parsed });
      }
    } else {
      const para: string[] = [];
      while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) para.push(lines[i++].trim());
      if (inRefs) errors.push(`text after the reference list: ${para[0].slice(0, 60)}`);
      else {
        const c = parseInline(para.join(" "), errors);
        words += countWords(c);
        blocks.push({ t: "p", c });
      }
    }
  }

  return {
    meta: {
      title: meta.title ?? "",
      slug: meta.slug ?? "",
      kind: (KINDS.includes(meta.kind) ? meta.kind : "note") as NoteMeta["kind"],
      field: meta.field ?? "",
      date: meta.date ?? "",
      summary: meta.summary ?? "",
    },
    blocks,
    refs,
    words,
    errors,
  };
}

/** Every inline run of a note, for checks that walk the whole text. */
export function allInlines(note: Note): Inline[][] {
  const out: Inline[][] = [];
  for (const b of note.blocks) {
    if (b.t === "h2" || b.t === "h3" || b.t === "p") out.push(b.c);
    else if (b.t === "statement") out.push(...b.c);
    else if (b.t === "ul" || b.t === "ol") out.push(...b.items);
    else if (b.t === "table") {
      out.push(...b.head, ...b.rows.flat());
      if (b.caption) out.push(b.caption);
    }
  }
  for (const r of note.refs) out.push(r.c);
  return out;
}

export function walkInline(c: Inline[], f: (x: Inline) => void) {
  for (const x of c) {
    f(x);
    if (x.t === "strong" || x.t === "em" || x.t === "link") walkInline(x.c, f);
  }
}
