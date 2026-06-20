"use client";

import { motion } from "framer-motion";
import { colors, fonts, labelOnCream } from "./tokens";
import { revealContainer, revealItem, flipItem, revealViewport, EASE } from "./motion";
import Parallax from "./Parallax";

export default function AboutSection() {
  return (
    <section
      id="about"
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
        className="vf-about"
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >
        {/* founders illustration */}
        <Parallax amount={34}>
        <motion.div
          variants={flipItem}
          whileHover={{ scale: 1.02 }}
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
          <p
            style={{
              fontFamily: fonts.script,
              fontWeight: 700,
              fontSize: "clamp(1.1rem, 1.9vw, 1.55rem)",
              color: "#141414",
              textAlign: "center",
              margin: "0.5rem 0 0.15rem",
            }}
          >
            made fresh. made simple. made for you.
          </p>
          <a
            href="https://instagram.com/vidafrescala"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Vida Fresca on Instagram"
            style={{
              display: "block",
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: "0.92rem",
              letterSpacing: "0.04em",
              color: "#141414",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            @vidafrescala
          </a>
        </motion.div>
        </Parallax>

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
            bright, blended fruit drinks they grew up loving. Theo and Cade
            began making them for everyone they knew — and the line kept growing.
            Now they bring that same real-fruit, ice-cold energy to Los
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

          <motion.p
            variants={revealItem}
            style={{
              marginTop: "1.4rem",
              fontFamily: fonts.body,
              fontWeight: 400,
              fontSize: "0.98rem",
              color: colors.body,
            }}
          >
            Catch them around Los Angeles all summer long.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
