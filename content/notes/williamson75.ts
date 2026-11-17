import type { Note } from "./types";

/**
 * Sources used, all opened on 15 November 2026.
 *
 * Public literature:
 *   Bright, Kotsireas, Ganesh, arXiv:1804.01172v2 (14 May 2019), Sections 1, 4 and 5 and Tables 1 and 3 (full text).
 *   Bright, Đoković, Kotsireas, Ganesh, arXiv:1811.05094v1 (13 November 2018), Sections 1, 4 and 5 and Table 1 (full text).
 *   Kharaghani, Mohammadian, Tayfeh-Rezaie, arXiv:2605.08661v1 (9 May 2026), introduction: the scope of Holzmann et al. and
 *   Turyn's theorem.
 *   Lang, Schneider, Designs, Codes and Cryptography 62 (2012) 79-84, doi:10.1007/s10623-011-9492-2: bibliographic data from
 *   Crossref; the zbMATH review as mirrored on the MaRDI portal (item Q663472), which defines Turyn type and lists the orders
 *   whose representatives it says are first printed there. The paper itself was not read.
 *   Holzmann, Kharaghani, Tayfeh-Rezaie, doi:10.1007/s10623-007-9163-5, and Turyn, doi:10.1016/0097-3165(72)90095-7:
 *   bibliographic data from Crossref; the papers were not read.
 *   Dated web searches of 15 November 2026 for classifications of Williamson or good matrices at order 75 or at odd orders above
 *   69: none found.
 *
 * Private records of the lab: nothing in them is cited as a public source, and no file name, session name or property of the
 * search from them appears on the page.
 *
 * Run on 15 November 2026 in a copy of public/files/williamson-good-order-75: the short check printed in this note, and
 * verify_williamson.py on williamson_75_set.txt (Python 3.15.0).
 */
const FILES = "/files/williamson-good-order-75";

export const williamson75: Note = {
  slug: "williamson-good-order-75",
  id: "KK-R-0007",
  kind: "note",
  type: "Classification",
  title:
    "An exhaustive computer search finds exactly one inequivalent set of circulant Williamson matrices of order 75 and no circulant good matrices of order 75.",
  statement:
    "Order-75 circulant ±1 matrices `A, B, C, D` with `AA^{T} + BB^{T} + CC^{T} + DD^{T} = 300I` are Williamson if symmetric, good if `A` skew-type (`a_{0} = 1`, `a_{75−i} = −a_{i}`) and `B, C, D` symmetric. Up to reordering, block negation and multipliers `x_{i} → x_{gi}`, `g ∈ ℤ_{75}^{*}`, we find exactly 1 Williamson set and no good set.",
  field: "Combinatorial designs",
  results: ["williamson-75", "good-75", "good-59-65", "flc-method"],
  published: "2026-11-15",
  evidence: "single",
  header: {
    before:
      "Odd orders classified: Williamson ≤ 59 [1], 61 [2]; good ≤ 49 [3]; both at multiples of 3 ≤ 69 [2] and [3]. Web search, 15 November 2026, found only a printed Turyn-type set at order 75 [4] and no odd-order classification above 69.",
    evidence:
      "One program per family completed at order 75. Separately written code re-derived the good instance list; an earlier Williamson version with different algorithms reproduces list and set; the search recovers Turyn’s set; a separate solver and [3]’s code re-ran some completions. Apart from [3] these share the search’s problem definition. No review outside the lab.",
    check:
      "One half: the Williamson set. Run the short check below (tests Turyn type) or the checker under Files, both in Python 3.10 or later, under a second: passing shows a Williamson set. With no certificate published, completeness cannot be checked.",
    notEstablished:
      "That order 75 has no second Williamson set and no good matrix: both rest on programs of one method, with no certificate and no complete run by separately written code.",
    method: "Not published.",
  },
  sections: [
    {
      title: "What was known",
      blocks: [
        {
          p: "Bright, Kotsireas and Ganesh [2] enumerated Williamson sets, and Bright, Đoković, Kotsireas and Ganesh [3] circulant good sets, at every odd multiple of 3 below 70: 1 Williamson set at 69, no good set at 51, 63 and 69. Both name the SAT step as the bottleneck, [3] at 99.9 % of the running time.",
        },
        {
          p: "Turyn [5] constructed Williamson sets of order `(q + 1)/2` for every prime power `q ≡ 1 (mod 4)` [6], which gives order 75 at `q = 149`. Lang and Schneider [4] adapted the algorithm of Holzmann, Kharaghani and Tayfeh-Rezaie [1] to Turyn-type sets (`A = I + Q`, `B = I − Q`, `C = D`, `Q` symmetric circulant with zero diagonal) and print representatives up to order 99, among them order 75.",
        },
      ],
    },
    {
      title: "The result",
      blocks: [
        {
          label: "Williamson matrices, order 75",
          statement: "Our program finds exactly 1 set, of Turyn type, with row sums 11, 7, 7, −9 (first rows below).",
        },
        {
          label: "Good matrices, order 75",
          statement: "Our program for good matrices finds none.",
        },
        {
          p: "An instance, as in [2] and [3], is a quadruple of 3-compressions `c_{j} = x_{j} + x_{j+25} + x_{j+50}` whose periodic autocorrelations sum to 300 at shift 0 and to 0 elsewhere. Completing an instance means finding the sequences it compresses from; [2] and [3] do this with a SAT solver.",
        },
        {
          table: {
            head: ["Order", "Williamson sets", "Williamson instances", "Good sets", "Good instances"],
            rows: [
              ["9", "3", "3", "1", "2"],
              ["15", "4", "8", "11", "11"],
              ["21", "7", "30", "10", "39"],
              ["27", "6", "172", "13", "186"],
              ["33", "5", "364", "15", "840"],
              ["39", "1", "1,527", "5", "1,934"],
              ["45", "1", "15,542", "4", "19,205"],
              ["51", "2", "17,403", "0", "23,611"],
              ["57", "1", "58,376", "1", "102,402"],
              ["63", "2", "466,561", "0", "808,642"],
              ["69", "1", "600,338", "0", "918,940"],
              ["75", "1", "3,214,732", "0", "4,898,576"],
            ],
            caption:
              "Odd multiples of 3 from 9 to 75. At orders 9 to 69 all 44 counts equal Table 3 of [2] (Williamson) and Table 1 of [3] (good). Order 75 is our count; no published count found.",
            numeric: [0, 1, 2, 3, 4],
          },
        },
        {
          label: "Good matrices, orders 59 and 65 (Internal level)",
          statement: "Our searches found none at either order, each run to completion by two programs of one method.",
        },
        {
          table: {
            head: ["Timing comparison", "Orders", "Ratio"],
            rows: [
              [
                "Mean completion time per instance, one 2.8 GHz core, the same 300 sampled instances per order: the SAT step of [2] (MathCheck2 with MapleSAT, three of its scripts ported to Python 3 with no change of logic) over our program",
                "Williamson 45, 51, 57, 63",
                "1,106; 1,717; 3,179; 4,956",
              ],
              [
                "Whole run: the hours printed in Table 3 of [2] over our CPU time on one core",
                "Williamson 45, 57, 63, 69",
                "15,000; 6,900; 38,000; 11,000",
              ],
              [
                "Whole run: the hours printed in Table 1 of [3] over our CPU time on one core",
                "Good 45, 57, 63, 69",
                "3,100; 11,000; 28,000; 47,000",
              ],
            ],
            caption:
              "Measured by us (Internal level); our times are unpublished. Row 1 is an earlier build than row 2; over repeats its ratio ranged 600 to 1,100 at order 45 and 3,100 to 5,000 at order 63; a later five-run median at order 63 was 5,481.",
          },
        },
      ],
    },
    {
      title: "How to check it",
      blocks: [
        {
          code: 'rows = {\n    "A": "+--+--+++++--++-+----+--+++-+-+-++++++++++++-+-+-+++--+----+-++--+++++--+--",\n    "B": "+---+++--++-+--+-++++---+-+++-+++--+-++-+--+++-+++-+---++++-+--+-++--+++---",\n    "C": "+---+++--++-+--+-++++---+-+++-+++--+-++-+--+++-+++-+---++++-+--+-++--+++---",\n    "D": "+++-++-----++--+-++++-++---+-+-+------------+-+-+---++-++++-+--++-----++-++",\n}\nn = 75\nx = {k: [1 if c == "+" else -1 for c in v] for k, v in rows.items()}\npaf = lambda v, s: sum(v[t] * v[(t + s) % n] for t in range(n))\nassert all(len(v) == n and v[1:] == v[:0:-1] for v in x.values())  # symmetric\nassert all(sum(paf(v, s) for v in x.values()) == 0 for s in range(1, n))  # AAT+BBT+CCT+DDT = 4nI\nassert x["B"] == x["C"] and x["A"][0] == x["D"][0] == 1 and all(x["A"][i] == -x["D"][i] for i in range(1, n))  # Turyn type\nprint([sum(v) for v in x.values()])',
          caption:
            "Checks symmetry, the identity and Turyn type on the first rows x_0 … x_74 of A, B, C, D; + is 1 and − is −1. Output (0.02 s): [11, 7, 7, -9].",
        },
        {
          code: "python3 verify_williamson.py 75 williamson_75_set.txt --array-all\nn=75: sets read: 1\nsets passing all checks: 1; distinct classes: 1\nRESULT: PASS",
          caption:
            "Output of the checker under Files on the hexadecimal line of the set (0.04 s). It tests symmetry, autocorrelations, row sums, canonical form and H H^T = 300 I for the Williamson array of order 300; it does not test Turyn type.",
        },
        {
          p: "A second inequivalent Williamson set of order 75, or a good matrix of order 75, would refute the result.",
        },
      ],
    },
    {
      title: "What it changes",
      blocks: [
        {
          p: "Existence of Williamson matrices of order 75 is unchanged: [5] constructs them. If the search is complete, order 75 joins the odd orders 41, 47, 49, 51, 63 and 69 [3] without circulant good matrices.",
        },
      ],
    },
    {
      title: "Limits",
      blocks: [
        {
          list: [
            "Completeness. These results rest on the output of programs of one method, with no certificate; a programming error, or a flaw in the argument that they discard no solution, could hide a set. A second complete search by separately written code would close it.",
            "Good matrices. Completion was re-run on a minority of the instances only, and no check at order 75 shows that a run finds a known solution (two of the re-runs find the order-57 matrix). A complete second run by separately written code would close it.",
            "Instance counts. Our even-order Williamson program differs from Table 1 of [2] at orders 16, 22, 30 and 36 (7, 24, 286, 1,026 against 5, 22, 281, 1,013), though set counts agree; the cause is unknown. A published count at order 75 would settle ours.",
            "Prior work. [1], [4] and [5] were not read (cited via [2], [6] and a zbMATH review). If [4] enumerates the Turyn-type sets of order 75, the search adds only that no other type exists. Reading them would close it.",
            "Timings. Measured by us only. The hours printed in [2] and [3] are for older hardware and not stated as CPU or elapsed time; on our machine the code of [2] needs 0.44 to 0.61 of the time per instance that [2] implies, and no factor was measured for [3]. A rerun by others would close it.",
          ],
        },
      ],
    },
  ],
  files: [
    {
      label: "williamson_75_set.txt",
      href: `${FILES}/williamson_75_set.txt`,
      detail: "the set of order 75 as one line of four hexadecimal words and as four ± rows, with row sums",
    },
    {
      label: "verify_williamson.py",
      href: `${FILES}/verify_williamson.py`,
      detail:
        "pure-Python checker: symmetry, autocorrelations, row sums, canonical form and the Williamson array of order 300",
    },
  ],
  refs: [
    {
      text: "W. H. Holzmann, H. Kharaghani, B. Tayfeh-Rezaie, Williamson matrices up to order 59, Designs, Codes and Cryptography 46, 343–352 (2008), doi:10.1007/s10623-007-9163-5.",
      href: "https://doi.org/10.1007/s10623-007-9163-5",
    },
    {
      text: "C. Bright, I. Kotsireas, V. Ganesh, Applying computer algebra systems with SAT solvers to the Williamson conjecture, Journal of Symbolic Computation 100, 187–209 (2020), arXiv:1804.01172v2, Tables 1 and 3; reports Lang and Schneider’s classification at order 61.",
      href: "https://arxiv.org/abs/1804.01172",
    },
    {
      text: "C. Bright, D. Ž. Đoković, I. Kotsireas, V. Ganesh, A SAT+CAS approach to finding good matrices: new examples and counterexamples, Proceedings of the AAAI Conference on Artificial Intelligence 33, 1435–1442 (2019), doi:10.1609/aaai.v33i01.33011435, arXiv:1811.05094v1, Table 1; reports the 2018 classification of good sets by Đoković and Kotsireas.",
      href: "https://arxiv.org/abs/1811.05094",
    },
    {
      text: "W. Lang, E. Schneider, Turyn type Williamson matrices up to order 99, Designs, Codes and Cryptography 62, 79–84 (2012; online 5 March 2011), doi:10.1007/s10623-011-9492-2. Cited from the zbMATH review (MaRDI portal item Q663472), which defines Turyn type and says that representatives for orders 69, 75, 79, 85, 87, 91, 97 and 99 are first printed there.",
      href: "https://doi.org/10.1007/s10623-011-9492-2",
    },
    {
      text: "R. J. Turyn, An infinite class of Williamson matrices, Journal of Combinatorial Theory, Series A 12, 319–321 (1972), doi:10.1016/0097-3165(72)90095-7.",
      href: "https://doi.org/10.1016/0097-3165(72)90095-7",
    },
    {
      text: "H. Kharaghani, A. Mohammadian, B. Tayfeh-Rezaie, A search for Hadamard matrices of Williamson type, arXiv:2605.08661v1, introduction: the scope of [1] and the theorem of [5].",
      href: "https://arxiv.org/abs/2605.08661",
    },
  ],
  cite: "KalKram, Williamson and good matrices of order 75, KK-R-0007, https://kalkram.com/research/williamson-good-order-75, 2026.",
  history: [
    {
      date: "2011-03-05",
      text: "Lang and Schneider’s paper appears online, with Turyn-type Williamson matrices up to order 99, including a representative at order 75 [4].",
    },
    { date: "2026-11-15", text: "This account published." },
  ],
};
