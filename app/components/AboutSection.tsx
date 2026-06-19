"use client";

import { motion } from "framer-motion";
import { colors, fonts, labelOnCream } from "./tokens";
import { revealContainer, revealItem, revealViewport, EASE } from "./motion";

export default function AboutSection() {
  return (
    <section
      id="about"
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
        className="vf-about"
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >
        {/* founders illustration */}
        <motion.div
          variants={revealItem}
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            background: "#FFFFFF",
            borderRadius: 20,
            padding: "clamp(1rem, 3vw, 2rem)",
            boxShadow: "0 20px 50px rgba(26,77,46,0.16)",
            border: `1px solid ${colors.border}`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/founders.png"
            alt="Vida Fresca founders Theo Seitzman and Cade Snyder, back to back"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </motion.div>

        {/* story */}
        <motion.div variants={revealContainer}>
          <motion.p variants={revealItem} style={labelOnCream}>
            The Founders
          </motion.p>
          <motion.h2
            variants={revealItem}
            style={{
              fontFamily: fonts.display,
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              lineHeight: 1.05,
              color: colors.ink,
              margin: "1rem 0 1.3rem",
            }}
          >
            Two friends. One fresh idea.
          </motion.h2>
          <motion.p
            variants={revealItem}
            style={{
              fontFamily: fonts.body,
              fontWeight: 300,
              fontSize: "clamp(1rem, 1.5vw, 1.12rem)",
              lineHeight: 1.65,
              color: colors.body,
              maxWidth: 520,
            }}
          >
            Vida Fresca started with two friends and a blender, chasing the
            bright, just-blended fruit drinks they grew up loving. Theo and Cade
            began making them for everyone they knew — and the line kept growing.
            Now they bring that same fresh-cut, made-to-order energy to Los
            Angeles, one cup at a time.
          </motion.p>

          <motion.p
            variants={revealItem}
            style={{
              fontFamily: fonts.script,
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
              color: colors.green,
              margin: "1.4rem 0 0.2rem",
            }}
          >
            Theo Seitzman &amp; Cade Snyder
          </motion.p>
          <motion.p
            variants={revealItem}
            style={{
              ...labelOnCream,
              color: colors.dim,
            }}
          >
            Founders
          </motion.p>

          <motion.div
            variants={revealItem}
            style={{
              marginTop: "1.6rem",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.7rem 1.4rem",
            }}
          >
            <span
              style={{
                fontFamily: fonts.body,
                fontWeight: 400,
                fontSize: "0.98rem",
                color: colors.body,
              }}
            >
              Catch them blending fresh across LA —
            </span>
            <motion.a
              href="https://instagram.com/vidafrescala"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, color: colors.pinkHover }}
              style={{
                fontFamily: fonts.body,
                fontWeight: 700,
                fontSize: "0.95rem",
                color: colors.pinkInk,
                textDecoration: "none",
              }}
            >
              @vidafrescala →
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
