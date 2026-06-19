"use client";

import { motion } from "framer-motion";
import { colors, fonts, labelStyle } from "./tokens";
import { revealContainer, revealItem, revealViewport } from "./motion";

const iconProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: colors.accent,
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const features = [
  {
    label: "Real Fruit",
    copy: "Every cup starts with whole fruit we cut and blend that same day — never powders, never concentrate.",
    icon: (
      <svg {...iconProps}>
        <path d="M5 19c0-7 5-13 14-13 0 9-6 14-14 13z" />
        <path d="M5 19c4-4 7-6 10-7" />
      </svg>
    ),
  },
  {
    label: "Blended Fresh",
    copy: "We blend each drink to order, so what you sip is as fresh as the moment you walked up.",
    icon: (
      <svg {...iconProps}>
        <path d="M6.5 8h11l-1.2 11.3a1 1 0 0 1-1 .9H8.7a1 1 0 0 1-1-.9L6.5 8z" />
        <path d="M9.2 12.2c1.7 1.2 3.9 1.2 5.6 0" />
        <path d="M6 8h12" />
      </svg>
    ),
  },
  {
    label: "No Artificial Anything",
    copy: "No dyes, no syrups, no preservatives. If you can't picture the ingredient, it isn't in the cup.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="8" />
        <path d="M6.6 6.6l10.8 10.8" />
      </svg>
    ),
  },
  {
    label: "Natural Sweetness",
    copy: "Ripe fruit does the heavy lifting; a touch of cane sugar just lets the flavor sing.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 4.5c3.2 4 5 6.6 5 9.5a5 5 0 0 1-10 0c0-2.9 1.8-5.5 5-9.5z" />
      </svg>
    ),
  },
  {
    label: "Three Signature Flavors",
    copy: "Watermelon Blast, Pineapple Paradise, and Mango Madness — each its own kind of refreshing.",
    icon: (
      <svg {...iconProps}>
        <circle cx="7" cy="12" r="2.6" />
        <circle cx="12" cy="12" r="2.6" />
        <circle cx="17" cy="12" r="2.6" />
      </svg>
    ),
  },
  {
    label: "Local LA Pop-Up",
    copy: "Catch us around Los Angeles, blending fresh and pouring cold wherever the sun is out.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 21c4.5-4.2 7-7.6 7-11a7 7 0 1 0-14 0c0 3.4 2.5 6.8 7 11z" />
        <circle cx="12" cy="10" r="2.6" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        background: colors.bg,
        padding: "clamp(4.5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 5rem)",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={revealContainer}
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <motion.p variants={revealItem} style={labelStyle}>
          Real, Always
        </motion.p>
        <motion.h2
          variants={revealItem}
          style={{
            fontFamily: fonts.display,
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.05,
            color: colors.textPrimary,
            margin: "1rem 0 2.8rem",
            maxWidth: 640,
          }}
        >
          Fresh is the whole point.
        </motion.h2>

        <motion.div
          className="vf-features-grid"
          variants={revealContainer}
        >
          {features.map((f) => (
            <motion.div
              key={f.label}
              variants={revealItem}
              style={{
                borderTop: `1px solid ${colors.border}`,
                paddingTop: "1.4rem",
              }}
            >
              <div style={{ marginBottom: "1.1rem" }}>{f.icon}</div>
              <h3
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  color: colors.textPrimary,
                  marginBottom: "0.6rem",
                }}
              >
                {f.label}
              </h3>
              <p
                style={{
                  fontFamily: fonts.body,
                  fontWeight: 300,
                  fontSize: "0.95rem",
                  lineHeight: 1.55,
                  color: colors.textBody,
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
