"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { colors, fonts, labelOnCream } from "./tokens";
import { EASE } from "./motion";

// Phone hero. The desktop hero is a 420vh pinned, scroll-scrubbed canvas
// (three drinks decomposing through 363 frames) — that interaction doesn't read
// well on touch and is heavy to load, so on mobile we drop it entirely and show
// the three drinks as clean static product shots in the normal document flow.
//
// The frames already sit on the same cream as the page (their background is
// ~#F5EFDD, the page is #F6EEDC), so the cups blend straight into the surface —
// no cutout or shadow needed. (The old rectangular drop-shadow was what read as
// a "white box" behind each cup, since the images are opaque and have no alpha.)
//
// Cups and labels live in two separate grid rows: the cup row is bottom-aligned
// so the three cup bases line up, and the labels sit in their own row beneath —
// so a two-line name (Pineapple Paradise) can no longer push its cup out of
// line with the others. One gentle parallax drives the whole trio together.
const DRINKS = [
  {
    key: "wm",
    img: "/frames/frame_0001.webp",
    name: "Watermelon Blast",
    note: "Crisp, juicy, summer-red.",
    accent: colors.watermelon,
  },
  {
    key: "mango",
    img: "/frames-mango/frame_0001.webp",
    name: "Mango Madness",
    note: "Lush, sweet, golden.",
    accent: colors.mango,
  },
  {
    key: "pa",
    img: "/frames-pineapple/frame_0001.webp",
    name: "Pineapple Paradise",
    note: "Bright, tangy, tropical.",
    accent: colors.pineapple,
  },
];

const cupVariants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

const labelVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function HeroMobile() {
  const rowRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // A single, uniform parallax for the whole trio: the cups always stay in line
  // with one another and just drift together as the hero scrolls past.
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [26, -26]);

  return (
    <section
      id="top"
      style={{
        background: colors.cream,
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(3rem, 10vh, 5rem) 1.25rem 2.5rem",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { delayChildren: 0.35, staggerChildren: 0.12 } },
        }}
        style={{ textAlign: "center", marginBottom: "clamp(1.6rem, 4.5vh, 2.6rem)" }}
      >
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
          }}
          style={{ ...labelOnCream, display: "block" }}
        >
          Fresh Fruit Drinks · Los Angeles
        </motion.span>
        <motion.h1
          variants={{
            hidden: { opacity: 0, scale: 0.86, filter: "blur(10px)" },
            visible: {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 0.85, ease: EASE },
            },
          }}
          style={{
            fontFamily: fonts.display,
            fontWeight: 400,
            fontSize: "clamp(3.2rem, 16vw, 5rem)",
            lineHeight: 0.95,
            color: colors.ink,
            margin: "0.5rem 0 0.3rem",
          }}
        >
          Vida Fresca
        </motion.h1>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
          }}
          style={{
            fontFamily: fonts.script,
            fontWeight: 600,
            fontSize: "clamp(1.15rem, 5vw, 1.6rem)",
            color: colors.pinkInk,
            lineHeight: 1.1,
          }}
        >
          made fresh. made simple. made for you.
        </motion.p>
      </motion.div>

      <motion.div ref={rowRef} style={{ y: reduce ? 0 : y, width: "100%" }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { delayChildren: 0.45, staggerChildren: 0.1 } },
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            columnGap: "0.5rem",
            rowGap: "0.65rem",
            alignItems: "end",
            maxWidth: 460,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {/* Row 1 — the cups (bottom-aligned so the bases line up) */}
          {DRINKS.map((drink) => (
            <motion.div key={`cup-${drink.key}`} variants={cupVariants} style={{ alignSelf: "end", lineHeight: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={drink.img}
                alt={`${drink.name} — ${drink.note}`}
                loading="eager"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </motion.div>
          ))}

          {/* Row 2 — the labels (hang from a shared baseline; a two-line name
              just extends downward without moving its cup) */}
          {DRINKS.map((drink) => (
            <motion.div
              key={`label-${drink.key}`}
              variants={labelVariants}
              style={{ alignSelf: "start", textAlign: "center" }}
            >
              <div
                aria-hidden
                style={{
                  width: 28,
                  height: 3,
                  borderRadius: 2,
                  background: drink.accent,
                  margin: "0 auto 0.45rem",
                }}
              />
              <h2
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 400,
                  fontSize: "clamp(0.8rem, 3.2vw, 1.05rem)",
                  lineHeight: 1.08,
                  color: colors.ink,
                }}
              >
                {drink.name}
              </h2>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          marginTop: "clamp(1.6rem, 5vh, 2.6rem)",
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
      </motion.div>
    </section>
  );
}
