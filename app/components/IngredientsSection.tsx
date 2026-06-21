"use client";

import { motion } from "framer-motion";
import { colors, fonts, labelOnCream } from "./tokens";
import { flipContainer, flipItem, revealItem, revealContainer, revealViewport } from "./motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

// Real, organic ingredient lists — matches the hero order (Watermelon left,
// Mango middle, Pineapple right).
const drinks = [
  {
    name: "Watermelon Blast",
    accent: colors.watermelon,
    items: [
      "Organic watermelon",
      "Organic lime",
      "Organic cane sugar",
      "Filtered water",
      "Ice",
    ],
  },
  {
    name: "Mango Madness",
    accent: colors.mango,
    items: [
      "Organic mango",
      "Organic orange juice",
      "Organic lime",
      "Organic cane sugar",
      "Filtered water",
      "Ice",
    ],
  },
  {
    name: "Pineapple Paradise",
    accent: colors.pineapple,
    items: [
      "Organic pineapple",
      "Organic coconut water",
      "Organic lime",
      "Organic cane sugar",
      "Filtered water",
      "Ice",
    ],
  },
];

export default function IngredientsSection() {
  return (
    <section
      id="ingredients"
      style={{
        background: "transparent",
        padding: "clamp(4.5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={revealContainer}
        style={{ maxWidth: 760, margin: "0 auto 3.2rem", textAlign: "center" }}
      >
        <motion.p variants={revealItem} style={{ ...labelOnCream, display: "block" }}>
          What&apos;s Inside
        </motion.p>
        <motion.div
          variants={revealItem}
          role="heading"
          aria-level={2}
          style={{
            margin: "1rem 0 0.7rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TypewriterEffect
            words={[
              { text: "Organic," },
              { text: "down" },
              { text: "to" },
              { text: "the" },
              { text: "ice.", color: colors.pinkInk },
            ]}
            ariaLabel="Organic, down to the ice."
            fontFamily={fonts.display}
            cursorColor={colors.pink}
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: colors.ink,
              justifyContent: "center",
            }}
          />
        </motion.div>
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
          Every ingredient is organic — and we simmer our own simple syrup from
          organic cane sugar. No concentrate, no powders, nothing fake.
        </motion.p>
      </motion.div>

      <motion.div
        className="vf-ingredients-row"
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={flipContainer}
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >
        {drinks.map((d) => (
          <motion.div
            key={d.name}
            variants={flipItem}
            style={{
              background: "#FBF4E6",
              border: `1px solid ${colors.border}`,
              borderRadius: 18,
              padding: "1.9rem 1.6rem 2rem",
            }}
          >
            <div
              style={{
                width: 44,
                height: 4,
                borderRadius: 2,
                background: d.accent,
                marginBottom: "1rem",
              }}
            />
            <h3
              style={{
                fontFamily: fonts.display,
                fontWeight: 400,
                fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                lineHeight: 1,
                color: colors.ink,
                marginBottom: "1.2rem",
              }}
            >
              {d.name}
            </h3>
            <ul style={{ listStyle: "none", display: "grid", gap: "0.7rem" }}>
              {d.items.map((it) => (
                <li
                  key={it}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7rem",
                    fontFamily: fonts.body,
                    fontWeight: 400,
                    fontSize: "0.98rem",
                    color: colors.body,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: d.accent,
                      flex: "none",
                    }}
                  />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
