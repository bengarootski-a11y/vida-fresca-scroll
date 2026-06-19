"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user" auto-disables transform/layout animations for visitors
// who set prefers-reduced-motion, while keeping opacity fades.
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
