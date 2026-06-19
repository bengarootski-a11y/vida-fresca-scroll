"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { colors, fonts, labelOnCream } from "./tokens";
import { revealContainer, revealItem, revealViewport, EASE } from "./motion";

const flavors = [
  {
    name: "Watermelon Blast",
    note: "Crisp, juicy, summer-red.",
    from: "#FF5C72",
    to: colors.watermelon,
    h: 380,
    dir: -1,
  },
  {
    name: "Pineapple Paradise",
    note: "Bright, tangy, tropical.",
    from: "#FAD65E",
    to: colors.pineapple,
    h: 450,
    dir: 1,
  },
  {
    name: "Mango Madness",
    note: "Lush, sweet, golden.",
    from: "#FBB761",
    to: colors.mango,
    h: 400,
    dir: -1,
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  // rAF parallax — tiles drift at ~0.5x, opposite directions. No scroll listener.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;
    let raf = 0;
    const tick = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const p = (vh / 2 - center) / vh; // ~-1..1 as the section crosses the viewport
      tileRefs.current.forEach((el, i) => {
        if (!el) return;
        const amp = 46 * (flavors[i]?.dir ?? 1);
        el.style.transform = `translateY(${(p * amp).toFixed(1)}px)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: colors.cream,
        padding: "clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 5rem)",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={revealContainer}
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <motion.p variants={revealItem} style={labelOnCream}>
          Taste the Colors
        </motion.p>
        <motion.h2
          variants={revealItem}
          style={{
            fontFamily: fonts.display,
            fontWeight: 400,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.05,
            color: colors.ink,
            margin: "1rem 0 2.6rem",
          }}
        >
          Every sip, a moment.
        </motion.h2>

        <motion.div className="vf-gallery" variants={revealContainer}>
          {flavors.map((f, i) => (
            <motion.div key={f.name} variants={revealItem} whileHover="hover">
              <div
                ref={(el) => {
                  tileRefs.current[i] = el;
                }}
                style={{ willChange: "transform" }}
              >
                <motion.div
                  variants={{ hover: { scale: 1.05 } }}
                  transition={{ duration: 0.4, ease: EASE }}
                  style={{
                    position: "relative",
                    height: f.h,
                    borderRadius: 18,
                    overflow: "hidden",
                    background: `linear-gradient(160deg, ${f.from} 0%, ${f.to} 100%)`,
                    boxShadow: "0 16px 38px rgba(26,77,46,0.16)",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(120% 60% at 50% 0%, rgba(255,255,255,0.34), transparent 60%)",
                    }}
                  />
                  <motion.div
                    variants={{ hover: { opacity: 1 } }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0,
                      background:
                        "linear-gradient(to top, rgba(15,58,32,0.58), transparent 62%)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 18,
                      right: 18,
                      bottom: 18,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: fonts.display,
                        fontWeight: 400,
                        fontSize: "1.7rem",
                        color: "#FFFFFF",
                        lineHeight: 1,
                        textShadow: "0 2px 12px rgba(15,58,32,0.4)",
                      }}
                    >
                      {f.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: fonts.script,
                        fontSize: "1.3rem",
                        color: "rgba(255,255,255,0.96)",
                        marginTop: 2,
                      }}
                    >
                      {f.note}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
