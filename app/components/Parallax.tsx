"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

// Lightweight scroll parallax: translates its children vertically as the
// element crosses the viewport. Respects reduced-motion (renders static).
export default function Parallax({
  children,
  amount = 60,
  className,
  style,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, y: reduce ? 0 : y }}
    >
      {children}
    </motion.div>
  );
}
