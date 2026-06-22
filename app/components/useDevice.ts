"use client";

import { useEffect, useState } from "react";

// Viewport-based mobile detection. Returns `null` until measured on the client,
// so we never assume a layout during SSR / first paint, then settles to
// true/false and stays in sync via matchMedia. The intro Loader covers the
// brief null→resolved swap, so phones never even mount the heavy frame-scrub
// hero. Breakpoint matches the CSS mobile breakpoint (768px).
export function useIsMobile(query = "(max-width: 768px)"): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return isMobile;
}

// True only on devices with a precise, hovering pointer (a real mouse/trackpad).
// Used to gate the custom cursor so it never fights a touchscreen.
export function usePrecisePointer(): boolean {
  const [precise, setPrecise] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine) and (hover: hover)");
    const update = () => setPrecise(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return precise;
}
