import { useEffect, useState } from "react";

/** True once the viewport is at least `px` wide. It is false on the server and on first render. */
export function useMinWidth(px: number) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${px}px)`);
    const update = () => setMatches(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [px]);
  return matches;
}
