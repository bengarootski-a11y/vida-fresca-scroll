"use client";

import { motion } from "framer-motion";
import { colors, fonts } from "./tokens";

// Slim closing footer. Continues the deep green of the CTA above so the page
// ends on a deliberate brand note rather than a hard cut.
export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: colors.greenDeep,
        borderTop: `1px solid ${colors.borderOnDark}`,
        padding: "clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 6vw, 5rem)",
        color: colors.creamBody,
      }}
    >
      <div
        className="vf-footer"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem 2rem",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 400,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: colors.creamText,
              lineHeight: 1,
            }}
          >
            Vida Fresca
          </div>
          <p
            style={{
              fontFamily: fonts.script,
              fontWeight: 700,
              fontSize: "1.15rem",
              color: colors.pink,
              marginTop: "0.3rem",
            }}
          >
            made fresh. made simple. made for you.
          </p>
        </div>

        <nav
          aria-label="Footer"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1.4rem",
          }}
        >
          <motion.a
            href="https://instagram.com/vidafrescala"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Vida Fresca on Instagram"
            whileHover={{ color: colors.pink, x: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: fonts.body,
              fontWeight: 600,
              fontSize: "0.92rem",
              letterSpacing: "0.02em",
              color: colors.creamText,
              textDecoration: "none",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
            </svg>
            @vidafrescala
          </motion.a>
        </nav>
      </div>

      <p
        style={{
          maxWidth: 1100,
          margin: "1.8rem auto 0",
          fontFamily: fonts.body,
          fontWeight: 400,
          fontSize: "0.78rem",
          letterSpacing: "0.02em",
          color: "rgba(231,218,194,0.65)",
        }}
      >
        © {year} Vida Fresca · Organic agua frescas, made fresh in Los Angeles.
      </p>
    </footer>
  );
}
