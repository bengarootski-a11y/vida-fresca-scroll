"use client";

import { useEffect, useRef } from "react";
import { colors } from "./tokens";

// Ambient brand-colored field that lives behind all content (the cream
// sections are transparent so this shows through). Each blob drifts vertically
// and rotates as a function of global scroll position — different depths give a
// layered parallax. One rAF loop drives every blob; no per-blob React state.
type Blob = {
  left: string;
  top: string;
  size: number;
  color: string;
  depth: number; // vertical parallax factor (px per px scrolled)
  rot: number; // deg per 1000px scrolled
  blur: number;
  opacity: number;
};

const BLOBS: Blob[] = [
  { left: "8%", top: "14%", size: 260, color: colors.pink, depth: -0.12, rot: 40, blur: 70, opacity: 0.1 },
  { left: "82%", top: "8%", size: 320, color: colors.green, depth: 0.08, rot: -30, blur: 90, opacity: 0.09 },
  { left: "68%", top: "40%", size: 200, color: colors.mango, depth: -0.18, rot: 60, blur: 60, opacity: 0.1 },
  { left: "16%", top: "56%", size: 240, color: colors.pineapple, depth: 0.14, rot: -50, blur: 70, opacity: 0.09 },
  { left: "46%", top: "72%", size: 300, color: colors.pink, depth: -0.1, rot: 35, blur: 95, opacity: 0.08 },
  { left: "90%", top: "66%", size: 180, color: colors.watermelon, depth: 0.2, rot: -70, blur: 55, opacity: 0.08 },
  { left: "30%", top: "30%", size: 150, color: colors.green, depth: -0.22, rot: 80, blur: 50, opacity: 0.07 },
];

export default function AmbientField() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      for (let i = 0; i < BLOBS.length; i++) {
        const el = refs.current[i];
        const b = BLOBS[i];
        if (!el) continue;
        const dy = y * b.depth;
        const deg = (y / 1000) * b.rot;
        el.style.transform = `translate3d(0, ${dy.toFixed(1)}px, 0) rotate(${deg.toFixed(1)}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {BLOBS.map((b, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          style={{
            position: "absolute",
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: b.color,
            opacity: b.opacity,
            filter: `blur(${b.blur}px)`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
