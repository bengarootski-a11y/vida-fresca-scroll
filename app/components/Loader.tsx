"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { colors, fonts } from "./tokens";
import { getLenis } from "./lenisInstance";

// Cinematic intro loader. The brand is built on a dark-green "void" that opens
// into the bright cream site, so the preloader IS that void: the wordmark
// resolves, a counter ticks 0→100 (faked to a calm ~2s minimum so it never
// feels rushed), then the whole panel wipes upward to reveal the hero. Honors
// reduced-motion (brief hold + fade) and locks scroll while it's up.
export default function Loader() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const lenis = getLenis();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    lenis?.stop();
    window.scrollTo(0, 0);

    const finish = () => {
      document.documentElement.style.overflow = prevOverflow;
      getLenis()?.start();
      setDone(true);
    };

    if (reduce) {
      setProgress(100);
      const t = window.setTimeout(finish, 500);
      return () => window.clearTimeout(t);
    }

    let p = 0;
    const id = window.setInterval(() => {
      p = Math.min(100, p + Math.random() * 6 + 3.5);
      setProgress(Math.floor(p));
      if (p >= 100) {
        window.clearInterval(id);
        window.setTimeout(finish, 360);
      }
    }, 105);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="vf-loader"
          aria-hidden
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100000,
            background: colors.void,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.3rem",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: fonts.display,
              fontWeight: 400,
              fontSize: "clamp(2.8rem, 9vw, 6rem)",
              lineHeight: 1,
              color: colors.creamText,
            }}
          >
            Vida Fresca
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: fonts.script,
              fontWeight: 700,
              fontSize: "clamp(1.1rem, 2.4vw, 1.7rem)",
              color: colors.pink,
              padding: "0 1.5rem",
              textAlign: "center",
            }}
          >
            made fresh. made simple. made for you.
          </motion.div>

          {/* progress: a thin pink bar + counter, brand-accent only */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(1.6rem, 5vh, 3rem)",
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.7rem",
            }}
          >
            <div
              style={{
                width: "min(260px, 56vw)",
                height: 2,
                background: "rgba(252,237,216,0.18)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
                style={{ height: "100%", background: colors.pink }}
              />
            </div>
            <div
              style={{
                fontFamily: fonts.body,
                fontWeight: 600,
                fontSize: "0.72rem",
                letterSpacing: "0.24em",
                color: colors.creamBody,
              }}
            >
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
