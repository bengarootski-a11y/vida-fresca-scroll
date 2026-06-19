"use client";

import { motion } from "framer-motion";
import { colors, fonts, labelStyle } from "./tokens";
import { revealContainer, revealItem, revealViewport } from "./motion";

const specs: [string, string][] = [
  ["Flavors", "Watermelon Blast · Pineapple Paradise · Mango Madness"],
  ["Base", "Fresh fruit, blended with water"],
  ["Sweetener", "A touch of cane sugar"],
  ["Ice", "Always"],
  ["Size", "16 oz cup"],
  ["Price", "$6 each"],
  ["Made", "To order, fresh"],
  ["Ingredients", "Real fruit, never concentrate"],
  ["Artificial Anything", "None"],
  ["First Pop-Up", "July 11, 2026 · Larchmont Village, LA"],
];

export default function SpecsSection() {
  return (
    <section
      id="specs"
      style={{
        background: colors.bg,
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
        <motion.p variants={revealItem} style={labelStyle}>
          The Details
        </motion.p>
        <motion.h2
          variants={revealItem}
          style={{
            fontFamily: fonts.display,
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.05,
            color: colors.textPrimary,
            margin: "1rem 0 2.6rem",
          }}
        >
          Simple, by design.
        </motion.h2>

        <div>
          {specs.map(([label, value]) => (
            <motion.div
              key={label}
              variants={revealItem}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: "1.5rem",
                flexWrap: "wrap",
                padding: "1rem 0",
                borderBottom: `1px solid ${colors.borderFaint}`,
              }}
            >
              <span
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  letterSpacing: "0.02em",
                  color: colors.accent,
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 300,
                  fontSize: "0.98rem",
                  color: colors.textBody,
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
