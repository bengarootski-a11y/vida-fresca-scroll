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
    img: "/brand/flavors/watermelon.png",
    accent: colors.watermelon,
  },
  {
    name: "Mango Madness",
    note: "Lush, sweet, golden.",
    blurb:
      "Sweet, ripe mango blended smooth and poured over ice — like sunshine in a cup.",
    img: "/brand/flavors/mango.png",
    accent: colors.mango,
  },
  {
    name: "Pineapple Paradise",
    note: "Bright, tangy, tropical.",
    blurb:
      "Tangy-sweet pineapple with a clean tropical finish. The taste of a day off.",
    img: "/brand/flavors/pineapple.png",
    accent: colors.pineapple,
  },
];

export default function FlavorsSection() {
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  // rAF parallax — each flavor's ingredients drift as it scrolls through view.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const tick = () => {
      const vh = window.innerHeight;
      imgRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const p = (vh / 2 - center) / vh;
        el.style.transform = `translateY(${(p * 36).toFixed(1)}px)`;
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
        padding: "clamp(4.5rem, 10vw, 8.5rem) clamp(1.5rem, 6vw, 5rem)",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={revealContainer}
        style={{ maxWidth: 1150, margin: "0 auto 3.4rem" }}
      >
        <motion.p variants={revealItem} style={labelOnCream}>
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
            maxWidth: 560,
          }}
        >
          Watch each flavor come apart into the real fruit it&apos;s made from.
          Three drinks, zero shortcuts.
        </motion.p>
      </motion.div>

      <div
        style={{
          maxWidth: 1150,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(3rem, 7vw, 6rem)",
        }}
      >
        {flavors.map((f, i) => (
          <motion.div
            key={f.name}
            className="vf-flavor"
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
            variants={revealContainer}
          >
            <motion.div
              variants={revealItem}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                background: colors.void,
                boxShadow: "0 22px 54px rgba(26,77,46,0.20)",
              }}
            >
              <div
                ref={(el) => {
                  imgRefs.current[i] = el;
                }}
                style={{ willChange: "transform" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.img}
                  alt={`${f.name} drink deconstructed into its raw ingredients`}
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            </motion.div>

            <motion.div variants={revealItem} className="vf-flavor-text">
              <div
                style={{
                  width: 56,
                  height: 4,
                  borderRadius: 2,
                  background: f.accent,
                  marginBottom: "1.1rem",
                }}
              />
              <h3
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 400,
                  fontSize: "clamp(1.8rem, 3.6vw, 3rem)",
                  lineHeight: 1.02,
                  color: colors.ink,
                }}
              >
                {f.name}
              </h3>
              <p
                style={{
                  fontFamily: fonts.script,
                  fontWeight: 600,
                  fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)",
                  color: colors.pinkInk,
                  margin: "0.2rem 0 0.9rem",
                }}
              >
                {f.note}
              </p>
              <p
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 300,
                  fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
                  lineHeight: 1.6,
                  color: colors.body,
                  maxWidth: 420,
                }}
              >
                {f.blurb}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
