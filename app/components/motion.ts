import type { Variants } from "framer-motion";

// Shared scroll-triggered reveal: y 24→0, opacity 0→1, stagger 100ms,
// ease [0.25,0,0,1], fires once.
export const revealViewport = { once: true, margin: "-80px" };

export const revealContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0, 0, 1] as [number, number, number, number],
    },
  },
};
