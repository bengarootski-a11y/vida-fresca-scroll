"use client";

import { motion } from "framer-motion";
import { colors, fonts, labelOnCream } from "./tokens";
import { revealContainer, revealViewport, EASE } from "./motion";

const iconProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: colors.pink,
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const features = [
  {
    label: "Real Fruit",
    copy: "Made with real, whole fruit — never powders, never concentrate. Just the good stuff.",
    icon: (
      <svg {...iconProps}>
        <path d="M5 19c0-7 5-13 14-13 0 9-6 14-14 13z" />
        <path d="M5 19c4-4 7-6 10-7" />
      </svg>
    ),
  },
  {
    label: "Blended Smooth",
    copy: "Real fruit blended smooth and poured over plenty of ice — cold, easy, and seriously refreshing.",
    icon: (
      <svg {...iconProps}>
        <path d="M6.5 8h11l-1.2 11.3a1 1 0 0 1-1 .9H8.7a1 1 0 0 1-1-.9L6.5 8z" />
        <path d="M9.2 12.2c1.7 1.2 3.9 1.2 5.6 0" />
        <path d="M6 8h12" />
      </svg>
    ),
  },
  {
    label: "Three Signature Flavors",
    copy: "Watermelon Blast, Pineapple Paradise, and Mango Madness — pick your kind of sunshine.",
    icon: (
      <svg {...iconProps}>
        <circle cx="7" cy="12" r="2.6" />
        <circle cx="12" cy="12" r="2.6" />
        <circle cx="17" cy="12" r="2.6" />
      </svg>
    ),
  },
  {
    label: "No Artificial Anything",
    copy: "No dyes, no syrups, no preservatives. If it isn't real fruit, it isn't going in the cup.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="8" />
        <path d="M6.6 6.6l10.8 10.8" />
      </svg>
    ),
  },
  {
    label: "Naturally Sweet",
    copy: "Ripe fruit and a whisper of cane sugar. Refreshing and light, never sugary.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 4.5c3.2 4 5 6.6 5 9.5a5 5 0 0 1-10 0c0-2.9 1.8-5.5 5-9.5z" />
      </svg>
    ),
  },
  {
    label: "Made in LA",
    copy: "Served ice-cold at our Los Angeles pop-ups. Catch the sunshine in a cup.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 21c4.5-4.2 7-7.6 7-11a7 7 0 1 0-14 0c0 3.4 2.5 6.8 7 11z" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 48, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
  hover: {
    y: -6,
    scale: 1.05,
    boxShadow: "0 24px 50px rgba(26,77,46,0.18)",
    transition: { duration: 0.3, ease: EASE },
  },
};
const iconVariants = {
  hover: { rotate: 10, scale: 1.12, transition: { duration: 0.3, ease: EASE } },
};
const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: EASE, delay: 0.12 },
  },
};

export default function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        background: "transparent",
        padding: "clamp(4.5rem, 10vw, 8.5rem) clamp(1.5rem, 6vw, 5rem)",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={revealContainer}
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <motion.p variants={cardVariants} style={labelOnCream}>
          Why Vida Fresca
        </motion.p>
        <motion.h2
          variants={cardVariants}
          style={{
            fontFamily: fonts.display,
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.05,
            color: colors.ink,
            margin: "1rem 0 2.8rem",
          }}
        >
          Real. Fresh. Simple.
        </motion.h2>

        <motion.div className="vf-grid-3" variants={revealContainer}>
          {features.map((f) => (
            <motion.div
              key={f.label}
              variants={cardVariants}
              whileHover="hover"
              style={{
                position: "relative",
                background: "#FBF4E6",
                border: `1px solid ${colors.border}`,
                borderRadius: 16,
                padding: "1.7rem 1.5rem 1.6rem",
                overflow: "hidden",
              }}
            >
              <motion.div
                variants={lineVariants}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: colors.pink,
                  transformOrigin: "left center",
                }}
              />
              <motion.div
                variants={iconVariants}
                style={{ display: "inline-flex", marginBottom: "1.1rem" }}
              >
                {f.icon}
              </motion.div>
              <h3
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 700,
                  fontSize: "1.08rem",
                  color: colors.ink,
                  marginBottom: "0.55rem",
                }}
              >
                {f.label}
              </h3>
              <p
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 400,
                  fontSize: "0.95rem",
                  lineHeight: 1.55,
                  color: colors.body,
                }}
              >
                {f.copy}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
