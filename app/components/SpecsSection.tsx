"use client";

import { motion } from "framer-motion";
import { colors, fonts, labelOnCream } from "./tokens";
import { revealContainer, revealItem, flipItem, revealViewport } from "./motion";

const stats = [
  { value: "$6", label: "per cup" },
  { value: "Iced", label: "over real ice" },
  { value: "3", label: "signature flavors" },
  { value: "100%", label: "real fruit" },
  { value: "0", label: "artificial anything" },
];

export default function SpecsSection() {
  return (
    <section
      id="specs"
      style={{
        background: "transparent",
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={revealContainer}
        style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}
      >
        <motion.p variants={revealItem} style={{ ...labelOnCream, display: "block" }}>
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

        <motion.div variants={revealContainer} className="vf-stats">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={flipItem}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              style={{
                background: "#FBF4E6",
                border: `1px solid ${colors.border}`,
                borderRadius: 16,
                padding: "1.6rem 1rem",
              }}
            >
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 400,
                  fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)",
                  lineHeight: 1,
                  color: colors.green,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: colors.dim,
                  marginTop: "0.6rem",
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={revealItem}
          style={{
            fontFamily: fonts.body,
            fontWeight: 300,
            fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
            lineHeight: 1.6,
            color: colors.body,
            maxWidth: 560,
            margin: "2.4rem auto 0",
          }}
        >
          Real fruit blended with water and a touch of cane sugar — never
          concentrate, always over ice.
        </motion.p>

        <motion.div
          variants={revealItem}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            marginTop: "1.8rem",
            background: "rgba(249,44,110,0.10)",
            border: `1px solid ${colors.pink}`,
            borderRadius: 999,
            padding: "0.65rem 1.5rem",
          }}
        >
          <span
            style={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: "0.82rem",
              letterSpacing: "0.05em",
              color: colors.pinkInk,
            }}
          >
            The first pour drops July 11 — Larchmont Village, LA
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
