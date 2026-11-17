"use client";

import { useEffect, useState } from "react";

/** Sticky index of research domains that tracks the section in view. */
export function ResearchToc({ items }: { items: Array<{ id: string; title: string; count: number }> }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="toc" aria-label="Research fields">
      <ol>
        {items.map((i) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className={active === i.id ? "is-active" : undefined}>
              <span>{i.title}</span>
              <span className="count">{i.count}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
