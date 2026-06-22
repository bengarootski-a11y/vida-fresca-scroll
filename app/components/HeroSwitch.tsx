"use client";

import { useIsMobile } from "./useDevice";
import Hero3 from "./Hero3";
import HeroMobile from "./HeroMobile";

// Picks the hero per device. Until the viewport is measured (isMobile === null)
// we render the lightweight HeroMobile, so the heavy 363-frame scroll-scrub
// Hero3 canvas is *only ever mounted* once we've confirmed a desktop viewport —
// phones never preload those frames. On desktop the brief swap happens beneath
// the intro Loader, so it's invisible.
export default function HeroSwitch() {
  const isMobile = useIsMobile();
  if (isMobile === false) return <Hero3 />;
  return <HeroMobile />;
}
