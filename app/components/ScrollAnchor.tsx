"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { motion } from "framer-motion";
import { colors, fonts } from "./tokens";

export type ScrollAnchorHandle = {
  update: (progress: number, frame: number, frameCount: number) => void;
};

// Pinned hero HUD on the cream stage: scroll progress bar, "scroll to explore"
// prompt that fades as you advance, drifting accent particles, and a live frame
// counter. Driven imperatively by ScrollHero's rAF loop — no extra scroll
// listener, no per-frame React re-render.
const ScrollAnchor = forwardRef<ScrollAnchorHandle>(function ScrollAnchor(
  _props,
  ref,
) {
  const fillRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      update(progress, frame, frameCount) {
        if (fillRef.current)
          fillRef.current.style.transform = `scaleX(${progress})`;
        if (exploreRef.current)
          exploreRef.current.style.opacity = String(
            Math.max(0, 1 - progress * 3),
          );
        if (counterRef.current)
          counterRef.current.textContent = `Frame ${String(frame + 1).padStart(3, "0")} / ${frameCount}`;
      },
    }),
    [],
  );

  const particles = [
    { left: "12%", top: "28%", size: 8, dur: 6, dy: 18 },
    { left: "84%", top: "30%", size: 6, dur: 7, dy: 24 },
    { left: "72%", top: "64%", size: 11, dur: 8.5, dy: 16 },
    { left: "22%", top: "70%", size: 5, dur: 5.5, dy: 22 },
    { left: "46%", top: "16%", size: 5, dur: 6.5, dy: 26 },
    { left: "90%", top: "78%", size: 7, dur: 7.5, dy: 20 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden>
      {/* top progress bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "rgba(26,77,46,0.14)",
        }}
      >
        <div
          ref={fillRef}
          style={{
            height: "100%",
            background: colors.pink,
            transform: "scaleX(0)",
            transformOrigin: "left center",
            boxShadow: "0 0 12px rgba(249,44,110,0.55)",
          }}
        />
      </div>

      {/* drifting accent particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -p.dy, 0], opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: colors.pink,
          }}
        />
      ))}

      {/* frame counter */}
      <span
        ref={counterRef}
        style={{
          position: "absolute",
          top: 16,
          right: 18,
          fontFamily: fonts.body,
          fontWeight: 600,
          fontSize: "0.62rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(26,77,46,0.5)",
        }}
      >
        Frame 001 / 193
      </span>

      {/* scroll to explore */}
      <div
        ref={exploreRef}
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          transition: "opacity 0.15s linear",
        }}
      >
        <span
          style={{
            fontFamily: fonts.body,
            fontWeight: 700,
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: colors.green,
          }}
        >
          Scroll to Explore
        </span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: colors.pink, fontSize: "1.05rem", lineHeight: 1 }}
        >
          ↓
        </motion.span>
      </div>
    </div>
  );
});

export default ScrollAnchor;
