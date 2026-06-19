"use client";

import { useEffect, useRef } from "react";
import { colors } from "./tokens";

// Site-wide scroll progress — fills as you move through the whole page.
// rAF loop reading document scroll (no scroll listener).
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
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
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "rgba(26,77,46,0.10)",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <div
        ref={ref}
        style={{
          height: "100%",
          background: colors.pink,
          transformOrigin: "left center",
          transform: "scaleX(0)",
          boxShadow: "0 0 10px rgba(249,44,110,0.5)",
        }}
      />
    </div>
  );
}
