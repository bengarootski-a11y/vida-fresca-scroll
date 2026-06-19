"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { colors, fonts, labelOnCream } from "./tokens";
import { EASE } from "./motion";

// Three drinks, one scroll. As you scroll the pinned stage, all three drinks
// deconstruct in sync — each canvas scrubs its own frame sequence (assembled →
// exploded) driven by a single rAF loop reading the section's scroll position.
// No scroll listener, no per-frame React re-render.
type Drink = {
  key: string;
  dir: string;
  count: number;
  name: string;
  note: string;
  accent: string;
  zoom: number; // per-drink scale so the three read at a consistent size
};

const DRINKS: Drink[] = [
  {
    key: "wm",
    dir: "/frames",
    count: 193,
    name: "Watermelon Blast",
    note: "Crisp, juicy, summer-red.",
    accent: colors.watermelon,
    zoom: 0.9,
  },
  {
    key: "mango",
    dir: "/frames-mango",
    count: 121,
    name: "Mango Madness",
    note: "Lush, sweet, golden.",
    accent: colors.mango,
    zoom: 1.08,
  },
  {
    key: "pa",
    dir: "/frames-pineapple",
    count: 121,
    name: "Pineapple Paradise",
    note: "Bright, tangy, tropical.",
    accent: colors.pineapple,
    zoom: 0.98,
  },
];

const framePath = (dir: string, i: number) =>
  `${dir}/frame_${String(i + 1).padStart(4, "0")}.jpg`;

export default function Hero3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctxs: (CanvasRenderingContext2D | null)[] = [];
    const imagesByDrink: HTMLImageElement[][] = [];
    const currentIdx: number[] = DRINKS.map(() => -1);
    let rafId = 0;

    const draw = (d: number, idx: number) => {
      const canvas = canvasRefs.current[d];
      const ctx = ctxs[d];
      if (!canvas || !ctx) return;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      ctx.fillStyle = colors.cream;
      ctx.fillRect(0, 0, cw, ch);
      const img = imagesByDrink[d]?.[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      // contain-fit (× per-drink zoom): whole drink visible, cream margins
      // blend with the stage; zoom evens out the three drinks' apparent size.
      const scale = Math.min(cw / iw, ch / ih) * (DRINKS[d]?.zoom ?? 1);
      const dw = iw * scale;
      const dh = ih * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      currentIdx[d] = idx;
    };

    const sizeCanvas = (d: number) => {
      const canvas = canvasRefs.current[d];
      const ctx = ctxs[d];
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Set up each canvas + preload its frame sequence.
    DRINKS.forEach((drink, d) => {
      const canvas = canvasRefs.current[d];
      ctxs[d] = canvas ? canvas.getContext("2d") : null;
      sizeCanvas(d);
      const arr: HTMLImageElement[] = new Array(drink.count);
      let firstDrawn = false;
      for (let i = 0; i < drink.count; i++) {
        const img = new Image();
        img.src = framePath(drink.dir, i);
        arr[i] = img;
        if (i === 0)
          img.onload = () => {
            if (!firstDrawn) {
              firstDrawn = true;
              draw(d, 0);
            }
          };
      }
      imagesByDrink[d] = arr;
    });

    const tick = () => {
      const top = container.getBoundingClientRect().top;
      const progress = Math.max(
        0,
        Math.min(1, -top / (container.offsetHeight - window.innerHeight)),
      );
      DRINKS.forEach((drink, d) => {
        const target = Math.round(progress * (drink.count - 1));
        if (target !== currentIdx[d]) draw(d, target);
      });
      if (hintRef.current)
        hintRef.current.style.opacity = String(Math.max(0, 1 - progress * 4));
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onResize = () => {
      DRINKS.forEach((_, d) => {
        sizeCanvas(d);
        draw(d, currentIdx[d] >= 0 ? currentIdx[d] : 0);
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const titleContainer = {
    hidden: {},
    visible: { transition: { delayChildren: 0.5, staggerChildren: 0.13 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE },
    },
  };
  const h1Var = {
    hidden: { opacity: 0, scale: 0.84, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: EASE },
    },
  };

  return (
    <section
      id="top"
      ref={containerRef}
      style={{ height: "420vh", position: "relative", background: colors.cream }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: colors.cream,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* TITLE */}
        <motion.div
          variants={titleContainer}
          initial="hidden"
          animate="visible"
          style={{
            position: "relative",
            zIndex: 3,
            textAlign: "center",
            padding: "clamp(1.4rem, 3.5vh, 2.6rem) 1.5rem 0.4rem",
            pointerEvents: "none",
          }}
        >
          <motion.span
            variants={fadeUp}
            style={{ ...labelOnCream, display: "block" }}
          >
            Fresh Fruit Drinks · Los Angeles
          </motion.span>
          <motion.h1
            variants={h1Var}
            style={{
              fontFamily: fonts.display,
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
              lineHeight: 0.98,
              color: colors.ink,
              margin: "0.5rem 0 0.3rem",
            }}
          >
            Vida Fresca
          </motion.h1>
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: fonts.script,
              fontWeight: 600,
              fontSize: "clamp(1.2rem, 2.6vw, 1.9rem)",
              color: "#141414",
              lineHeight: 1,
            }}
          >
            made fresh. made simple. made for you.
          </motion.p>
        </motion.div>

        {/* THREE DECONSTRUCTING DRINKS */}
        <div
          className="vf-hero3-row"
          style={{
            position: "relative",
            zIndex: 1,
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            minHeight: 0,
          }}
        >
          {DRINKS.map((drink, d) => (
            <div
              key={drink.key}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
              }}
            >
              <canvas
                ref={(el) => {
                  canvasRefs.current[d] = el;
                }}
                style={{ display: "block", width: "100%", flex: 1, minHeight: 0 }}
              />
              {/* flavor label */}
              <div
                style={{
                  textAlign: "center",
                  padding:
                    "clamp(0.4rem, 1.5vh, 1.1rem) 0.5rem clamp(1.6rem, 4vh, 3rem)",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 4,
                    borderRadius: 2,
                    background: drink.accent,
                    margin: "0 auto 0.7rem",
                  }}
                />
                <h2
                  className="vf-hero3-name"
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 400,
                    fontSize: "clamp(1rem, 1.9vw, 1.8rem)",
                    lineHeight: 1,
                    color: colors.ink,
                  }}
                >
                  {drink.name}
                </h2>
                <p
                  className="vf-hero3-note"
                  style={{
                    fontFamily: fonts.script,
                    fontWeight: 600,
                    fontSize: "clamp(0.95rem, 1.4vw, 1.3rem)",
                    color: colors.pinkInk,
                    marginTop: "0.15rem",
                  }}
                >
                  {drink.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* scroll hint — a single arrow, tucked into the bottom-left so it
            never collides with the centre column's label */}
        <div
          ref={hintRef}
          style={{
            position: "absolute",
            bottom: 16,
            left: "clamp(1rem, 3vw, 2.4rem)",
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            gap: 8,
            pointerEvents: "none",
            transition: "opacity 0.15s linear",
          }}
        >
          <span
            style={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: "0.58rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: colors.green,
            }}
          >
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: colors.pink, fontSize: "1rem", lineHeight: 1 }}
          >
            ↓
          </motion.span>
        </div>
      </div>
    </section>
  );
}
