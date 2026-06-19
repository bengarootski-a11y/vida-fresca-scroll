"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { colors, fonts, labelStyle } from "./tokens";

// Total frames extracted from hero.mp4 (fps=24). Updated after frame extraction.
const FRAME_COUNT = 193;

const framePath = (i: number) =>
  `/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`;

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let currentIdx = -1;
    let rafId = 0;

    // Cover-fit draw: scale the frame to fill the canvas, centered, on the void.
    const draw = (idx: number) => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, cw, ch);
      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      currentIdx = idx;
    };

    // Size the backing store to devicePixelRatio for crisp rendering.
    const sizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    sizeCanvas();

    // Preload every frame; draw frame 0 as soon as it lands.
    let firstDrawn = false;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      images[i] = img;
      if (i === 0) {
        img.onload = () => {
          if (!firstDrawn) {
            firstDrawn = true;
            draw(0);
          }
        };
      }
    }

    // rAF loop — no scroll listener. Map scroll progress to a frame index.
    const tick = () => {
      const top = container.getBoundingClientRect().top;
      const progress = Math.max(
        0,
        Math.min(1, -top / (container.offsetHeight - window.innerHeight)),
      );
      const target = Math.round(progress * (FRAME_COUNT - 1));
      if (target !== currentIdx) draw(target);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onResize = () => {
      sizeCanvas();
      draw(currentIdx >= 0 ? currentIdx : 0);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.8, staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  };

  return (
    <div ref={containerRef} style={{ height: "300vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: colors.bg,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            pointerEvents: "none",
            background:
              "linear-gradient(to top, rgba(6,24,12,0.88) 0%, rgba(6,24,12,0.35) 50%, transparent 100%)",
          }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem",
              padding:
                "clamp(1.5rem, 5vw, 4rem) clamp(1.5rem, 6vw, 5rem) clamp(2.5rem, 7vw, 5rem)",
              maxWidth: 760,
            }}
          >
            <motion.span variants={itemVariants} style={labelStyle}>
              Made Fresh · Los Angeles
            </motion.span>
            <motion.h1
              variants={itemVariants}
              style={{
                fontFamily: fonts.display,
                fontWeight: 400,
                fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
                lineHeight: 1,
                color: colors.textPrimary,
              }}
            >
              Vida Fresca
            </motion.h1>
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: fonts.body,
                fontWeight: 300,
                fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                lineHeight: 1.55,
                color: colors.textBody,
                maxWidth: 460,
              }}
            >
              Real fruit, blended fresh and made for sunny LA days.
            </motion.p>
            <motion.a
              variants={itemVariants}
              href="#features"
              style={{
                pointerEvents: "auto",
                alignSelf: "flex-start",
                marginTop: "0.4rem",
                background: colors.accent,
                color: colors.textPrimary,
                fontFamily: fonts.body,
                fontWeight: 500,
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.9rem 2.6rem",
                borderRadius: 999,
                textDecoration: "none",
              }}
            >
              See the Flavors
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
