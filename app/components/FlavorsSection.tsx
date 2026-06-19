"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { colors, fonts, labelOnCream } from "./tokens";
import { revealContainer, revealItem, revealViewport } from "./motion";

const flavors = [
  {
    name: "Watermelon Blast",
    note: "Crisp, juicy, summer-red.",
    blurb:
      "Ripe watermelon blended with ice into the most refreshing red in LA. Nothing else needed.",
    img: "/brand/flavors/watermelon_cut.png",
    accent: colors.watermelon,
  },
  {
    name: "Mango Madness",
    note: "Lush, sweet, golden.",
    blurb:
      "Sweet, ripe mango blended smooth and poured over ice — like sunshine in a cup.",
    img: "/brand/flavors/mango_cut.png",
    accent: colors.mango,
  },
  {
    name: "Pineapple Paradise",
    note: "Bright, tangy, tropical.",
    blurb:
      "Tangy-sweet pineapple with a clean tropical finish. The taste of a day off.",
    img: "/brand/flavors/pineapple_cut.png",
    accent: colors.pineapple,
  },
];

export default function FlavorsSection() {
  const drinkRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Scroll-driven float + scale: each drink peaks as its panel centers. rAF only.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      const vh = window.innerHeight;
      drinkRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const p = Math.max(-1, Math.min(1, (center - vh / 2) / vh));
        const scale = (1.07 - Math.abs(p) * 0.14).toFixed(3);
        const ty = (p * -54).toFixed(1);
        el.style.transform = `translateY(${ty}px) scale(${scale})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="flavors"
      style={{
        background: colors.cream,
        padding: "clamp(4.5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem) 0",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={revealContainer}
        style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}
      >
        <motion.p variants={revealItem} style={{ ...labelOnCream, display: "block" }}>
          Taste the Colors
        </motion.p>
        <motion.h2
          variants={revealItem}
          style={{
            fontFamily: fonts.display,
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.05,
            color: colors.ink,
            margin: "1rem 0 0.7rem",
          }}
        >
          Every sip, a moment.
        </motion.h2>
        <motion.p
          variants={revealItem}
          style={{
            fontFamily: fonts.body,
            fontWeight: 300,
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            lineHeight: 1.6,
            color: colors.body,
          }}
        >
          Watch each flavor come apart into the real fruit it&apos;s made from.
          Three drinks, zero shortcuts.
        </motion.p>
      </motion.div>

      {flavors.map((f, i) => (
        <div
          key={f.name}
          style={{
            minHeight: "clamp(640px, 94vh, 1040px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealContainer}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <motion.div
              variants={revealItem}
              style={{
                width: 56,
                height: 4,
                borderRadius: 2,
                background: f.accent,
                marginBottom: "1rem",
              }}
            />
            <motion.h3
              variants={revealItem}
              style={{
                fontFamily: fonts.display,
                fontWeight: 400,
                fontSize: "clamp(2.2rem, 6vw, 5rem)",
                lineHeight: 1,
                color: colors.ink,
              }}
            >
              {f.name}
            </motion.h3>
            <motion.p
              variants={revealItem}
              style={{
                fontFamily: fonts.script,
                fontWeight: 600,
                fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
                color: colors.pinkInk,
                margin: "0.3rem 0 1.2rem",
              }}
            >
              {f.note}
            </motion.p>
          </motion.div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={(el) => {
              drinkRefs.current[i] = el;
            }}
            src={f.img}
            alt={`${f.name} drink deconstructed into its raw ingredients`}
            style={{
              height: "clamp(320px, 58vh, 720px)",
              width: "auto",
              maxWidth: "90vw",
              objectFit: "contain",
              willChange: "transform",
              filter: "drop-shadow(0 34px 54px rgba(26,77,46,0.22))",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: fonts.body,
              fontWeight: 300,
              fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
              lineHeight: 1.6,
              color: colors.body,
              maxWidth: 440,
              marginTop: "1.6rem",
            }}
          >
            {f.blurb}
          </motion.p>
        </div>
      ))}
    </section>
  );
}
