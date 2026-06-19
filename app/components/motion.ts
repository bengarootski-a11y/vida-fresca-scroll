import type { Variants } from "framer-motion";

// Smooth cinematic easing (cubic-bezier).
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const revealViewport = { once: true, margin: "-80px" } as const;

export const revealContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.04 } },
};

// Entrance: fade + slide-up (48→0) + blur (12→0).
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

// Left-to-right reveal (spec rows).
export const revealRow: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

// Gentle infinite float for decorative particles.
export const floatKeyframes = (dy = 14, dur = 6) => ({
  y: [0, -dy, 0],
  transition: { duration: dur, repeat: Infinity, ease: "easeInOut" as const },
});
