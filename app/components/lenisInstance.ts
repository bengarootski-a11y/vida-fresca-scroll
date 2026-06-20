import type Lenis from "lenis";

// Tiny singleton so non-provider components (e.g. the waypoint rail) can ask
// Lenis to smooth-scroll to a target, with a graceful native fallback.
let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;
