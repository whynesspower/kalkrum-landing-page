import { Fragment, type ReactNode } from "react";

/** Names that stay upright in mathematics: objects, operators and text labels, as opposed to variables. */
const UPRIGHT = new Set(["CW", "GF", "PG", "AG", "GR", "QR", "ln", "OH", "LO", "fl", "sw"]);

/**
 * Sets variables in italic, as printed mathematics does. A single letter is a variable, and so is each letter
 * of a pair such as HH or nI. Words of three letters or more (mod, det), the names above and units stay upright.
 */
function variables(s: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /[A-Za-z]+/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m[0].length > 2 || UPRIGHT.has(m[0])) continue;
    // A K straight after a number is the kelvin, a unit: 300 K.
    if (m[0] === "K" && /\d\s*$/.test(s.slice(0, m.index))) continue;
    if (m.index > last) out.push(s.slice(last, m.index));
    out.push(<i key={`${key}${m.index}`}>{m[0]}</i>);
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push(s.slice(last));
  return out;
}

/** Renders _{sub} and ^{sup} inside a string. In mathematics the letters are set as variables. */
function scripts(s: string, key: string, math = false): ReactNode[] {
  const out: ReactNode[] = [];
  const piece = (t: string, k: string) => (math ? variables(t, k) : [t]);
  const re = /([_^])\{([^}]*)\}/g;
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(...piece(s.slice(last, m.index), `${key}v${k}-`));
    const id = `${key}${k++}`;
    // A superscript T is the transpose, an operator, and stays upright.
    const inner = math && !(m[1] === "^" && m[2] === "T") ? variables(m[2], `${id}-`) : m[2];
    out.push(m[1] === "_" ? <sub key={id}>{inner}</sub> : <sup key={id}>{inner}</sup>);
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push(...piece(s.slice(last), `${key}v${k}-`));
  return out;
}

/**
 * Renders [label](href) links, *emphasis* and numbered citations such as [3], then sub/superscripts inside each piece.
 * An asterisk that touches a letter or digit on its outer side is not emphasis (OOH*, an adsorbed species), and
 * citations start at [1], so that x[0] stays text.
 */
function prose(s: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re =
    /\[([^\]]+)\]\(((?:https?:\/\/|\/|#)[^)\s]*)\)|(?<![A-Za-z0-9])\*([^*\n]+)\*(?![A-Za-z0-9])|\[([1-9]\d?)\](?!\()/g;
  let last = 0;
  let k = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(...scripts(s.slice(last, m.index), `${key}s${k}-`));
    const id = `${key}${k++}`;
    if (m[1] !== undefined) {
      const external = m[2].startsWith("http");
      out.push(
        <a key={id} href={m[2]} className="inline-link" {...(external ? { rel: "noopener", target: "_blank" } : {})}>
          {scripts(m[1], `${id}-`)}
        </a>,
      );
    } else if (m[3] !== undefined) {
      out.push(<em key={id}>{scripts(m[3], `${id}-`)}</em>);
    } else {
      out.push(
        <a key={id} href={`#ref-${m[4]}`} className="cite">
          [{m[4]}]
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < s.length) out.push(...scripts(s.slice(last), `${key}e-`));
  return out;
}

/**
 * Inline markup used in content: `math` spans, _{sub} and ^{sup}, [label](href) links, *emphasis*, and
 * citations such as [3], which link to the reference of that number. All but the first two are read only
 * outside math spans.
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split("`");
  return (
    <>
      {parts.map((p, i) =>
        i % 2 ? (
          // A short formula stays on one line; a long one may break at its spaces, or it would widen the page.
          <span className={p.length > 28 ? "math math-long" : "math"} key={i}>
            {scripts(p, `m${i}-`, true)}
          </span>
        ) : (
          <Fragment key={i}>{prose(p, `t${i}-`)}</Fragment>
        ),
      )}
    </>
  );
}
