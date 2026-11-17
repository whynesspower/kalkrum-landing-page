"use client";

import { useEffect, useState } from "react";
import { Rich } from "./Rich";

type Item = { claim: string; domain: string };

/** Cycles through results in the hero footer. Not a link: the hero carries one call to action. */
export function Ticker({ items }: { items: Item[] }) {
  const [i, setI] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let swap = 0;
    const id = window.setInterval(() => {
      setOut(true);
      swap = window.setTimeout(() => {
        setI((v) => (v + 1) % items.length);
        setOut(false);
      }, 520);
    }, 5200);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(swap);
    };
  }, [items.length]);

  const item = items[i];
  return (
    <p className="ticker" aria-live="off">
      <span className={`ticker-item${out ? " is-out" : ""}`}>
        <Rich text={item.claim} /> <span className="muted">{item.domain}</span>
      </span>
    </p>
  );
}
