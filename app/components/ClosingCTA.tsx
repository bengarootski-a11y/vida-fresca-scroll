"use client";

import { motion } from "framer-motion";
import { colors, fonts, labelOnDark } from "./tokens";
import { revealContainer, revealItem, revealViewport, EASE } from "./motion";

export default function ClosingCTA() {
  return (
    <section
      id="visit"
      style={{
        position: "relative",
        overflow: "hidden",
        background: colors.greenDeep,
        padding: "clamp(5rem, 12vw, 9rem) clamp(1.5rem, 6vw, 5rem)",
        textAlign: "center",
      }}
    >
      {/* radial accent glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-20% -10% auto -10%",
          height: "120%",
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(249,44,110,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={revealContainer}
        style={{
          position: "relative",
          maxWidth: 720,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.4rem",
        }}
      >
        <motion.p variants={revealItem} style={labelOnDark}>
          Come By.
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
              color: colors.creamText,
              display: "block",
            }}
          >
            Made fresh.
          </span>
          <span
            style={{
              fontFamily: fonts.script,
              fontStyle: "italic",
              fontWeight: 700,
              color: colors.pink,
              display: "block",
              fontSize: "1.15em",
              marginTop: "0.08em",
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
            color: colors.creamBody,
            maxWidth: 480,
          }}
        >
          Real fruit, blended cold, served with LA sunshine. Our first pop-up is
          July 11 in Larchmont Village — follow along to catch it.
        </motion.p>

        <motion.a
          variants={revealItem}
          href="https://instagram.com/vidafrescala"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.06,
            y: -3,
            backgroundColor: colors.pinkHover,
            boxShadow: "0 14px 40px rgba(249,44,110,0.5)",
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 14 }}
          style={{
            marginTop: "0.6rem",
            display: "inline-block",
            background: colors.pink,
            color: colors.creamText,
            fontFamily: fonts.body,
            fontWeight: 600,
            fontSize: "0.72rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "0.95rem 2.7rem",
            borderRadius: 999,
            textDecoration: "none",
          }}
        >
          Follow on Instagram
        </motion.a>
      </motion.div>
    </section>
  );
}
