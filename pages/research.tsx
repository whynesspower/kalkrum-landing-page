import * as React from "react";
import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import { SEO } from "components/seo/seo";
import { TimeAxis } from "components/lab/graphics/time-axis";
import { StateFlow } from "components/lab/graphics/state-flow";
import { NeuralLattice } from "components/lab/graphics/neural-lattice";
import {
  AreaPanel,
  Closing,
  ImageBand,
  PanelArea,
  PanelGroup,
  ResearchHero,
} from "components/lab/research/blocks";
import { ResultsLedger } from "components/lab/research/results-ledger";

const AREAS: PanelArea[] = [
  {
    index: "01",
    title: "Find the structure",
    paragraph:
      "General solvers pay for the whole search space. Structure, whether a symmetry, an identity or a way the problem splits, shows where answers can live. So the system first runs detectors over the problem, and commits to a structure only after a checker confirms it holds. On blind tests it recognised the right structure in 5 of 8 models, with no false detections.",
    graphic: <NeuralLattice />,
  },
  {
    index: "02",
    title: "Compile a solver",
    paragraph:
      "A compiler turns the problem's model into an engine made for that structure alone: its own data layout, pruning and symmetry breaking. We hand-built the FLC method for Williamson, good and best matrices. The compiler now matches it automatically, more than 30,000× faster than Kissat and CP-SAT. Agents then choose the next bound to push, test it in simulation, run the compiled search at scale and send the result to verification.",
    graphic: <StateFlow />,
  },
  {
    index: "03",
    title: "Prove it and keep everything",
    paragraph:
      "Every result we accept is re-derived by multiple separately written verifiers, so a bug in one is unlikely to repeat in the others. Where possible, a result ships with a certificate anyone can check. Every verified result leaves behind a detector, a checker and a solver, and the next problem starts from that library. On a problem type it had never seen, the system built a verified solver in 5 to 6 minutes.",
    graphic: <TimeAxis />,
  },
];

const Research: NextPage = () => (
  <Box>
    <SEO
      title="Research | KalKram"
      description="Every result the KalKram system has found: what was known before, what we found and how it was checked. All of it ran on one cloud machine with an 8 GB GPU."
    />
    <ResearchHero />

    <PanelGroup>
      {AREAS.map((a, i) => (
        <AreaPanel key={a.index} area={a} flip={i % 2 === 1} />
      ))}
    </PanelGroup>

    <ResultsLedger />

    <ImageBand image="stephansQuintet" />

    <Closing />
  </Box>
);

export default Research;
