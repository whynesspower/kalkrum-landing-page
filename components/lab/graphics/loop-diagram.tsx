import * as React from "react";
import { Box, BoxProps, chakra } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";

const STAGES = ["Question", "Hypothesis", "Experiment", "Evidence", "Understanding"];
const R = 27; // ring radius, in percent of the box
const LABEL_R = 35.5; // label distance from the centre, in percent
const SECONDS_PER_STAGE = 2.6;
const TRAIL = 14; // length of the glowing trail, out of 100

const angleOf = (pos: number) => ((-90 + 72 * pos) * Math.PI) / 180;
const polar = (r: number, a: number) => ({ x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) });
const smooth = (x: number) => x * x * (3 - 2 * x);

/**
 * The research loop: five stations on a ring, a dot that travels between them,
 * and the active stage highlighted in turn. Labels are HTML so they stay
 * readable on small screens.
 */
export const LoopDiagram: React.FC<BoxProps> = (props) => {
  const reduce = useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const dotRef = React.useRef<SVGCircleElement>(null);
  const glowRef = React.useRef<SVGCircleElement>(null);
  const trailRef = React.useRef<SVGCircleElement>(null);
  const [stage, setStage] = React.useState(0);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const place = (pos: number) => {
      const p = polar(R, angleOf(pos));
      [dotRef.current, glowRef.current].forEach((el) => {
        if (el) {
          el.setAttribute("cx", p.x.toFixed(2));
          el.setAttribute("cy", p.y.toFixed(2));
        }
      });
      if (trailRef.current) {
        trailRef.current.setAttribute("stroke-dashoffset", (TRAIL - pos * 20).toFixed(2));
      }
    };

    place(0);
    if (reduce) return;

    let raf = 0;
    let running = false;
    let visible = true;
    let t = 0;
    let last = 0;
    let current = 0;

    const loop = (now: number) => {
      t += Math.min(0.05, (now - last) / 1000);
      last = now;
      const p = t / SECONDS_PER_STAGE;
      const m = Math.floor(p);
      const f = p - m;
      // Move toward station m during the first 45% of the beat, then rest on it.
      const pos = m - 1 + smooth(Math.min(1, f / 0.45));
      place(((pos % 5) + 5) % 5);
      const active = (((f > 0.25 ? m : m - 1) % 5) + 5) % 5;
      if (active !== current) {
        current = active;
        setStage(active);
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting);
      if (visible) start();
      else stop();
    });
    io.observe(root);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduce]);

  return (
    <Box
      ref={rootRef}
      role="img"
      aria-label="The research loop: Question, Hypothesis, Experiment, Evidence, Understanding, and then back to a new question."
      position="relative"
      w="100%"
      maxW="520px"
      mx="auto"
      pb="100%"
      {...props}
    >
      <chakra.svg
        viewBox="0 0 100 100"
        position="absolute"
        inset="0"
        w="100%"
        h="100%"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id="loop-glow">
            <stop offset="0" stopColor="#8ee3ff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#8ee3ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r={R + 7}
          fill="none"
          stroke="#f2f4f8"
          strokeOpacity="0.07"
          strokeDasharray="0.4 1.6"
          strokeWidth="0.3"
        />
        <circle
          cx="50"
          cy="50"
          r={R - 8}
          fill="none"
          stroke="#f2f4f8"
          strokeOpacity="0.08"
          strokeDasharray="1 2"
          strokeWidth="0.25"
        />
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke="#f2f4f8"
          strokeOpacity="0.2"
          strokeWidth="0.35"
        />
        <circle
          ref={trailRef}
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke="#8ee3ff"
          strokeWidth="0.7"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${TRAIL} ${100 - TRAIL}`}
          strokeDashoffset={TRAIL}
          transform="rotate(-90 50 50)"
        />
        {STAGES.map((name, k) => {
          const p = polar(R, angleOf(k));
          const on = reduce || k === stage;
          return (
            <g key={name}>
              <circle
                cx={p.x}
                cy={p.y}
                r="2.4"
                fill="#05060a"
                stroke="#f2f4f8"
                strokeOpacity={on ? 0.9 : 0.35}
                strokeWidth="0.35"
              />
              <circle cx={p.x} cy={p.y} r="0.9" fill={on ? "#8ee3ff" : "#9aa3b5"} />
            </g>
          );
        })}
        <circle ref={glowRef} r="5" fill="url(#loop-glow)" />
        <circle ref={dotRef} r="1.1" fill="#ffffff" />
      </chakra.svg>

      {STAGES.map((name, k) => {
        const p = polar(LABEL_R, angleOf(k));
        const on = reduce || k === stage;
        return (
          <Box
            key={name}
            aria-hidden="true"
            position="absolute"
            left={`${p.x}%`}
            top={`${p.y}%`}
            transform="translate(-50%, -50%)"
            fontFamily="mono"
            fontSize={{ base: "11px", md: "13px" }}
            letterSpacing="0.06em"
            textTransform="uppercase"
            whiteSpace="nowrap"
            color={on ? "kk.fg" : "kk.muted"}
            opacity={on ? 1 : 0.65}
            textShadow={on && !reduce ? "0 0 14px rgba(142,227,255,0.55)" : "none"}
            transition="color 0.4s, opacity 0.4s, text-shadow 0.4s"
            textAlign="center"
          >
            <Box
              as="span"
              display="block"
              fontSize="9px"
              letterSpacing="0.2em"
              color="kk.accent"
              mb="2px"
            >
              {`0${k + 1}`}
            </Box>
            {name}
          </Box>
        );
      })}

      <Box
        aria-hidden="true"
        position="absolute"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        fontFamily="mono"
        color="kk.muted"
        fontSize="10px"
        letterSpacing="0.2em"
        textTransform="uppercase"
      >
        <Box
          color="kk.fg"
          fontSize={{ base: "18px", md: "24px" }}
          fontFamily="display"
          letterSpacing="0"
          textTransform="none"
          mb="2px"
        >
          {reduce ? "The loop" : `0${stage + 1} / 05`}
        </Box>
        Repeats
      </Box>
    </Box>
  );
};
