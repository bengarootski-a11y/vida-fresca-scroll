"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { colors, fonts, labelOnDark } from "./tokens";
import { EASE } from "./motion";
import ScrollAnchor, { type ScrollAnchorHandle } from "./ScrollAnchor";

// Frames extracted from hero.mp4 (fps 24). Updated after frame extraction.
const FRAME_COUNT = 193;
const framePath = (i: number) =>
  `/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`;

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const anchorRef = useRef<ScrollAnchorHandle>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let currentIdx = -1;
    let rafId = 0;

    const draw = (idx: number) => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      ctx.fillStyle = colors.void;
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

    const sizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();

    let firstDrawn = false;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      images[i] = img;
      if (i === 0)
        img.onload = () => {
          if (!firstDrawn) {
            firstDrawn = true;
            draw(0);
          }
        };
    }

    // rAF loop — no scroll listener. Maps scroll progress to a frame index
    // and updates the pinned HUD.
    const tick = () => {
      const top = container.getBoundingClientRect().top;
      const progress = Math.max(
        0,
        Math.min(1, -top / (container.offsetHeight - window.innerHeight)),
      );
      const target = Math.round(progress * (FRAME_COUNT - 1));
      if (target !== currentIdx) draw(target);
      anchorRef.current?.update(progress, target, FRAME_COUNT);
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
    visible: { transition: { delayChildren: 0.7, staggerChildren: 0.14 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE },
    },
  };
  const h1Var = {
    hidden: { opacity: 0, scale: 0.82, rotate: -4, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: EASE },
    },
  };
  const taglineVar = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section
      ref={containerRef}
      style={{ height: "400vh", position: "relative", background: colors.void }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: colors.void,
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
              "linear-gradient(to top, rgba(7,28,17,0.92) 0%, rgba(7,28,17,0.35) 45%, transparent 100%)",
          }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.05rem",
              padding:
                "clamp(1.5rem,5vw,4rem) clamp(1.5rem,6vw,5rem) clamp(3.2rem,8vw,6rem)",
              maxWidth: 840,
            }}
          >
            <motion.span variants={fadeUp} style={labelOnDark}>
              Fresh Fruit Drinks · Los Angeles
            </motion.span>
            <motion.h1
              variants={h1Var}
              style={{
                fontFamily: fonts.display,
                fontWeight: 400,
                fontSize: "clamp(2.6rem,7vw,6rem)",
                lineHeight: 0.98,
                color: colors.creamText,
                transformOrigin: "left center",
              }}
            >
              Vida Fresca
            </motion.h1>
            <motion.p
              variants={taglineVar}
              style={{
                fontFamily: fonts.script,
                fontWeight: 600,
                fontSize: "clamp(1.4rem,3vw,2.2rem)",
                color: colors.creamBody,
                lineHeight: 1,
              }}
            >
              made fresh. made simple. made for you.
            </motion.p>
            <motion.a
              variants={fadeUp}
              href="#features"
              whileHover={{
                scale: 1.05,
                backgroundColor: colors.pinkHover,
                boxShadow: "0 0 34px rgba(249,44,110,0.55)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{
                pointerEvents: "auto",
                alignSelf: "flex-start",
                marginTop: "0.5rem",
                background: colors.pink,
                color: colors.creamText,
                fontFamily: fonts.body,
                fontWeight: 600,
                fontSize: "0.72rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.95rem 2.7rem",
                borderRadius: 999,
                textDecoration: "none",
              }}
            >
              See the Flavors
            </motion.a>
          </motion.div>
        </div>

        <ScrollAnchor ref={anchorRef} />
      </div>
    </section>
  );
}
