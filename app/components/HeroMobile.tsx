"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { colors, fonts, labelOnCream } from "./tokens";
import { EASE } from "./motion";

// Phone hero. The desktop hero is a 420vh pinned, scroll-scrubbed canvas
// (three drinks decomposing through 363 frames) — that interaction doesn't read
// well on touch and is heavy to load, so on mobile we drop it entirely and show
// the three drinks as clean static product shots that flow in the normal
// document, letting the rest of the page move up. Still scroll-driven: the cups
// gently parallax and reveal as they enter the viewport.
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

function MobileCup({ drink, index }: { drink: (typeof DRINKS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Each cup drifts up at a slightly different rate as the hero scrolls past —
  // a subtle depth cue that replaces the desktop turntable.
  const drift = 26 + index * 10;
  const y = useTransform(scrollYProgress, [0, 1], [drift, -drift]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay: 0.45 + index * 0.12, ease: EASE }}
      style={{ textAlign: "center" }}
    >
      <motion.div style={{ y: reduce ? 0 : y }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={drink.img}
          alt={`${drink.name} — ${drink.note}`}
          loading="eager"
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            margin: "0 auto",
            filter: "drop-shadow(0 14px 22px rgba(26,77,46,0.18))",
          }}
        />
      </motion.div>
      <div
        aria-hidden
        style={{
          width: 30,
          height: 3,
          borderRadius: 2,
          background: drink.accent,
          margin: "0.7rem auto 0.5rem",
        }}
      />
      <h2
        style={{
          fontFamily: fonts.display,
          fontWeight: 400,
          fontSize: "clamp(0.85rem, 3.4vw, 1.15rem)",
          lineHeight: 1.05,
          color: colors.ink,
        }}
      >
        {drink.name}
      </h2>
    </motion.div>
  );
}

export default function HeroMobile() {
  return (
    <section
      id="top"
      style={{
        background: colors.cream,
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(3.5rem, 12vh, 6rem) 1.25rem 2.5rem",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { delayChildren: 0.35, staggerChildren: 0.12 } },
        }}
        style={{ textAlign: "center", marginBottom: "clamp(1.8rem, 5vh, 3rem)" }}
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.6rem",
          alignItems: "end",
          maxWidth: 520,
          width: "100%",
          margin: "0 auto",
        }}
      >
        {DRINKS.map((drink, i) => (
          <MobileCup key={drink.key} drink={drink} index={i} />
        ))}
      </div>

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
