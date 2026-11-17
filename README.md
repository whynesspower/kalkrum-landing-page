# KalKram

The website of KalKram, a product of Aalaka Labs LLP. Next.js (App Router), fully static, no UI framework.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static production build
npm run typecheck
```

`NEXT_PUBLIC_*` variables are not used. The site URL, the contact address and the names live in `content/site.ts`.

## Where things live

- `content/results.ts`: the ledger of research results, with evidence levels and references. Pages, JSON-LD and `llms-full.txt` are all generated from it. The rows of the first fields are written here; the rows of the limits-and-certificates line are written in `content/results-frontiers.ts`, which this file merges in. Add or correct a result in the file that holds it and nowhere else.
- `content/results-frontiers.ts`: the limits-and-certificates results (superconductivity, the electron gas, long-range order, materials design, catalysis, chip design). Same shape as `content/results.ts`, which merges them in. An entry's `note` field names the research note that sets it out in full.
- `content/notes/*.ts`: the numbered research notes and papers (KK-R-0001 onwards), one file each, registered in `content/notes/index.ts` and served at `/research/<slug>`. Each lists in `results` the ledger ids it accounts for, and the ledger row links to it. The shape is fixed by `content/notes/types.ts` (claim, statement, five header rows, sections in a set order) and rendered by `components/Note.tsx`; files a note cites live in `public/files/<slug>/`.
- `content/notes/*.md`: notes and white papers of the limits-and-certificates line, one file each, served at the same `/research/<slug>` route and rendered by `components/NoteMarkdown.tsx`. The format is a small fixed dialect (front matter, `##` headings, `$…$` and `$$` mathematics typeset by KaTeX at build time, `> ` statement blocks, pipe tables, a numbered reference list). `lib/note-parse.ts` is the parser and its header describes the format; `node scripts/check-note.mjs content/notes/<slug>.md` checks a note before it goes in (mathematics renders, every citation has a reference, no banned words, no internal names). A malformed note fails the build. The order of notes on the research page is the `ORDER` list in `lib/notes.ts`.
- `lib/generated/`: the Markdown notes and the social-card mark, compiled into modules by `scripts/embed-assets.mjs`. No page reads a file from disk (`node:fs`, `process.cwd()`) while it is served, so the site runs on a host that has no project folder. `npm run dev` and `npm run build` run the script first; after adding or editing a `.md` note, run `npm run embed`.
- `content/site.ts`: name, URL, contact address, the founder (with a LinkedIn link, which the contact page uses), navigation.
- `content/plates.ts`: the data behind the pictures (a complete mapping of Z₃₁, the polynomials of IBM’s two-gross code).
- `app/globals.css`: the whole design system (tokens, type, layout). The site is dark only.
- `assets/fonts/ddin`: D-DIN, the brand face. `assets/fonts/lm`: Latin Modern Roman, under the GUST Font License, which sets the text of the research papers.
- `content/images.ts` and `public/static/science`: the telescope images (James Webb and Hubble, from the NASA Image and Video Library), their descriptions and credits. `components/Photo.tsx` draws them as dimmed backdrops behind page headers and as full-width bands on the home page; the footer carries the credit line. `public/static/science/CREDITS.md` lists the NASA IDs.
- `public/static/brand`: the KalKram mark. `public/static/favicons`: the icon set; `app/favicon.ico`, `app/icon.png` and `app/apple-icon.png` are copies of three of its files.

## The pictures

- The hero (`components/Frontier.tsx`) draws discoveries as stepping stones towards a horizon. The nearest six are the fields with results so far.
- The timeline on the home page (`components/Epochs.tsx`) is four lines, each to scale, each magnifying the last sliver of the one above: 3.3 million years, 12,000 years, 600 years, 80 years. Dates are in the file.
- `components/TorusCode.tsx` draws the Tanner graph of IBM’s two-gross code from its published polynomials.
- `components/Plates.tsx` draws the ring of Z₄₆₅, a complete mapping of Z₃₁, and a window onto `public/plates/h2148.png`, the Hadamard matrix of order 2148.

`python3 -I scripts/verify-plates.py <H2148.csv.gz> <out_dir>` rebuilds the matrix image and checks all of it: every pair of rows of the matrix is orthogonal, the polynomials give a [[288, 12]] code, and the mapping of Z₃₁ is complete.

## Search and answer engines

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter cards (`lib/seo.ts`), with a generated social card for every page (`opengraph-image.tsx`).
- JSON-LD: `Organization`/`ResearchOrganization` with its founder, `WebSite`, `BreadcrumbList`, an `ItemList` of results, `Article` for the vision.
- `/sitemap.xml`, `/robots.txt` (AI crawlers explicitly allowed), `/llms.txt` and `/llms-full.txt`.
- `/careers` and `/privacy` belonged to the earlier site and redirect to `/contact` (`next.config.ts`). The site sets no cookies and runs no analytics.
