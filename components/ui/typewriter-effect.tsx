"use client";

// Typewriter effect, adapted to Vida Fresca. The original is a shadcn/Tailwind
// component; this codebase styles with inline styles + brand tokens (no
// Tailwind), so the same Framer Motion behaviour is kept but driven by inline
// styles and per-word `color`. Same public API: `words`, plus optional sizing.
import { useEffect } from "react";
import {
  motion,
  stagger,
  useAnimate,
  useInView,
  type Easing,
} from "framer-motion";

type Word = { text: string; color?: string };

const cn = (...parts: (string | undefined | false)[]) =>
  parts.filter(Boolean).join(" ");

const EASE: Easing = [0.16, 1, 0.3, 1];

// Per-character reveal — each letter fades/scales in, left to right, when the
// element scrolls into view.
const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

export const TypewriterEffect = ({
  words,
  className,
  cursorColor = "#F92C6E",
  fontFamily = "var(--font-knewave)",
  ariaLabel,
  style,
}: {
  words: Word[];
  className?: string;
  cursorColor?: string;
  fontFamily?: string;
  ariaLabel?: string;
  style?: React.CSSProperties;
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    chars: word.text.split(""),
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-12% 0px" });

  useEffect(() => {
    if (isInView) {
      animate(
        "span.tw-char",
        { opacity: 1, y: 0, filter: "blur(0px)" },
        { duration: 0.32, delay: stagger(0.045), ease: EASE },
      );
    }
  }, [isInView, animate]);

  return (
    <div
      className={cn("tw-root", className)}
      style={{
        fontFamily,
        lineHeight: 1.04,
        display: "inline-flex",
        alignItems: "baseline",
        flexWrap: "wrap",
        ...style,
      }}
    >
      {ariaLabel ? <span style={srOnly}>{ariaLabel}</span> : null}
      <motion.span ref={scope} aria-hidden={!!ariaLabel} style={{ display: "inline" }}>
        {wordsArray.map((word, idx) => (
          <span key={`word-${idx}`} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.chars.map((char, i) => (
              <motion.span
                key={`char-${i}`}
                className="tw-char"
                style={{
                  display: "inline-block",
                  opacity: 0,
                  // start slightly low + blurred, animate to crisp
                  transform: "translateY(0.12em)",
                  filter: "blur(6px)",
                  color: word.color,
                }}
              >
                {char}
              </motion.span>
            ))}
            <span style={{ display: "inline-block", width: "0.32em" }} />
          </span>
        ))}
      </motion.span>
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        style={{
          display: "inline-block",
          width: "0.5ch",
          height: "0.95em",
          marginLeft: "0.08em",
          borderRadius: 3,
          transform: "translateY(0.08em)",
          background: cursorColor,
        }}
      />
    </div>
  );
};

// Smooth variant — reveals the whole line by wiping its width open, with a
// blinking cursor. Triggers when scrolled into view.
export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorColor = "#F92C6E",
  fontFamily = "var(--font-knewave)",
  duration = 1.8,
  style,
}: {
  words: Word[];
  className?: string;
  cursorColor?: string;
  fontFamily?: string;
  duration?: number;
  style?: React.CSSProperties;
}) => {
  return (
    <div
      className={cn("tw-smooth", className)}
      style={{ display: "flex", alignItems: "center", gap: "0.18em", ...style }}
    >
      <motion.div
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration, ease: "linear", delay: 0.2 }}
        style={{ overflow: "hidden", whiteSpace: "nowrap" }}
      >
        <div style={{ fontFamily, lineHeight: 1.04, whiteSpace: "nowrap" }}>
          {words.map((word, idx) => (
            <span key={`word-${idx}`} style={{ color: word.color }}>
              {word.text}
              {idx < words.length - 1 ? " " : ""}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.span
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        style={{
          display: "inline-block",
          width: "0.5ch",
          height: "0.92em",
          borderRadius: 3,
          background: cursorColor,
        }}
      />
    </div>
  );
};
