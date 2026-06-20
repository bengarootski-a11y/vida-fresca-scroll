import type { CSSProperties } from "react";

// Vida Fresca brand tokens — extracted from the official logo, menu poster,
// and circular sticker. Dual surface: a dark moody green hero "void" that
// opens into a bright cream body.
export const colors = {
  // Light brand surface (body)
  cream: "#F6EEDC",
  creamDeep: "#EFE3CB",
  // Primary brand color
  green: "#1A4D2E",
  greenDeep: "#0F3A20",
  // Dark hero void (matches the hero frames)
  void: "#0E3420",
  // Accent
  pink: "#F92C6E",
  pinkHover: "#FF5C92",
  pinkInk: "#D81B5A", // deeper pink for pink text on cream (contrast-safe)
  // Text
  ink: "#1A4D2E", // headings on cream
  body: "#3E4B43", // body copy on cream
  dim: "#5C6A61", // muted on cream — AA-compliant (4.9:1), never lighter than this
  creamText: "#FCEDD8", // text on the dark hero
  creamBody: "#E7DAC2", // soft text on the dark hero
  // Flavor colors
  watermelon: "#EF3A4D",
  pineapple: "#F2C12E",
  mango: "#F2982B",
  // Borders
  border: "rgba(26,77,46,0.16)",
  borderFaint: "rgba(26,77,46,0.09)",
  borderOnDark: "rgba(252,237,216,0.18)",
} as const;

export const fonts = {
  display: "var(--font-knewave)", // Knewave — brushy display, echoes the logo
  body: "var(--font-jakarta)", // Plus Jakarta Sans
  script: "var(--font-caveat)", // Caveat — the "made fresh…" script tagline
} as const;

// Label: Plus Jakarta Sans, letter-spaced uppercase.
export const labelOnCream: CSSProperties = {
  fontFamily: fonts.body,
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: colors.pinkInk,
};

export const labelOnDark: CSSProperties = {
  fontFamily: fonts.body,
  fontSize: "0.7rem",
  fontWeight: 600,
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: colors.pink,
};
