// Vida Fresca design tokens — use everywhere, never deviate.
export const colors = {
  bg: "#06180C", // deep forest green (the void)
  textPrimary: "#FCEDD8", // cream
  textBody: "#E7DAC2", // soft cream
  accent: "#FB0654", // Vida Fresca hot pink
  accentHover: "#FF3D7F",
  dim: "#9FB0A2", // muted sage, never below this on green
  border: "rgba(252,237,216,0.18)", // subtle border
  borderFaint: "rgba(252,237,216,0.07)",
} as const;

export const fonts = {
  display: "var(--font-knewave)", // Knewave 400
  body: "var(--font-jakarta)", // Plus Jakarta Sans 300–500
  script: "var(--font-caveat)", // Caveat — tagline only
} as const;

// Label style: Plus Jakarta Sans, 0.65rem, letter-spacing 0.25em, uppercase, accent.
export const labelStyle: React.CSSProperties = {
  fontFamily: fonts.body,
  fontSize: "0.65rem",
  fontWeight: 600,
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: colors.accent,
};
