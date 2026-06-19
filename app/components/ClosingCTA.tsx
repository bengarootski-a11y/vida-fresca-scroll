"use client";

import { motion } from "framer-motion";
import { colors, fonts, labelStyle } from "./tokens";
import { revealContainer, revealItem, revealViewport } from "./motion";

export default function ClosingCTA() {
  return (
    <section
      style={{
        background: colors.bg,
        padding: "clamp(5rem, 12vw, 9rem) clamp(1.5rem, 6vw, 5rem)",
        textAlign: "center",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={revealContainer}
        style={{
          maxWidth: 720,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.4rem",
        }}
      >
        <motion.p variants={revealItem} style={labelStyle}>
          Come Find Us
        </motion.p>

        <motion.h2
          variants={revealItem}
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
            lineHeight: 1.04,
            margin: 0,
          }}
        >
          <span
            style={{
              fontFamily: fonts.display,
              fontWeight: 400,
              color: colors.textPrimary,
              display: "block",
            }}
          >
            Made fresh. Made simple.
          </span>
          <span
            style={{
              fontFamily: fonts.script,
              fontWeight: 600,
              color: colors.textBody,
              display: "block",
              fontSize: "1.15em",
              marginTop: "0.1em",
            }}
          >
            Made for you.
          </span>
        </motion.h2>

        <motion.p
          variants={revealItem}
          style={{
            fontFamily: fonts.body,
            fontWeight: 300,
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            lineHeight: 1.6,
            color: colors.textBody,
            maxWidth: 480,
          }}
        >
          Our first pop-up lands in Larchmont Village this July — then we keep
          moving. Follow along to catch the next corner we pour on.
        </motion.p>

        <motion.div
          variants={revealItem}
          style={{ position: "relative", marginTop: "0.8rem" }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-120% -60%",
              background:
                "radial-gradient(ellipse, rgba(251,6,84,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <motion.a
            href="https://instagram.com/vidafrescala"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ backgroundColor: colors.bg, color: colors.accent }}
            transition={{ duration: 0.25 }}
            style={{
              position: "relative",
              display: "inline-block",
              backgroundColor: colors.accent,
              color: colors.textPrimary,
              border: `1px solid ${colors.accent}`,
              fontFamily: fonts.body,
              fontWeight: 500,
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "0.9rem 2.6rem",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            Follow @vidafrescala
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
