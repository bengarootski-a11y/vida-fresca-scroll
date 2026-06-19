"use client";

import { motion } from "framer-motion";
import { colors, fonts, labelOnCream } from "./tokens";
import { revealContainer, revealItem, revealRow, revealViewport } from "./motion";

const specs: [string, string][] = [
  ["Flavors", "Watermelon Blast · Pineapple Paradise · Mango Madness"],
  ["Base", "Fresh fruit, blended with water"],
  ["Sweetener", "A touch of cane sugar"],
  ["Ice", "Always"],
  ["Size", "16 oz cup"],
  ["Price", "$6 each"],
  ["Texture", "Smooth & icy"],
  ["Ingredients", "Real fruit, never concentrate"],
  ["Artificial Anything", "None"],
  ["First Pop-Up", "July 11, 2026 · Larchmont Village, LA"],
];

export default function SpecsSection() {
  return (
    <section
      id="specs"
      style={{
        background: colors.cream,
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={revealContainer}
        style={{ maxWidth: 820, margin: "0 auto" }}
      >
        <motion.p variants={revealItem} style={labelOnCream}>
          The Details
        </motion.p>
        <motion.h2
          variants={revealItem}
          style={{
            fontFamily: fonts.display,
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.05,
            color: colors.ink,
            margin: "1rem 0 2.6rem",
          }}
        >
          Built for real days.
        </motion.h2>

        <div>
          {specs.map(([label, value]) => (
            <motion.div
              key={label}
              variants={revealRow}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "1.5rem",
                flexWrap: "wrap",
                padding: "1rem 0",
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <span
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: colors.pinkInk,
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 400,
                  fontSize: "0.98rem",
                  color: colors.body,
                  textAlign: "right",
                }}
              >
                {value}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
