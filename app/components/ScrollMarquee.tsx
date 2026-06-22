"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { colors, fonts } from "./tokens";

// A full-bleed brand band whose text streams sideways. It drifts on its own,
// but scroll *velocity* feeds the speed and direction — scroll down and it
// races forward, scroll up and it reverses. A tactile, premium "this page
// reacts to you" moment between sections. Static under reduced-motion.
const SEP = "✺";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const phrases = ["Made Fresh", "Made Simple", "Made for You"];

function Strip() {
  return (
    <span style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
      {phrases.map((p) => (
        <span key={p} style={{ display: "flex", alignItems: "center" }}>
          <span style={{ padding: "0 1.4rem" }}>{p}</span>
          <span style={{ color: colors.pink, fontSize: "0.7em" }}>{SEP}</span>
        </span>
      ))}
    </span>
  );
}

export default function ScrollMarquee() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const directionRef = useRef(1);

  // -20% → -45% keeps a seamless loop across the repeated strips.
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = directionRef.current * 2 * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) directionRef.current = -1;
    else if (factor > 0) directionRef.current = 1;
    moveBy += directionRef.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  const band = {
    background: colors.green,
    padding: "clamp(0.9rem, 2.2vw, 1.5rem) 0",
    overflow: "hidden",
    borderTop: `1px solid ${colors.greenDeep}`,
    borderBottom: `1px solid ${colors.greenDeep}`,
  } as const;

  const text = {
    fontFamily: fonts.display,
    fontWeight: 400,
    fontSize: "clamp(1.5rem, 4vw, 3rem)",
    lineHeight: 1.1,
    color: colors.creamText,
  } as const;

  if (reduce) {
    return (
      <section aria-hidden style={{ ...band, textAlign: "center" }}>
        <span style={text}>made fresh. made simple. made for you.</span>
      </section>
    );
  }

  return (
    <section aria-hidden style={band}>
      <motion.div style={{ ...text, x, display: "flex", whiteSpace: "nowrap" }}>
        <Strip />
        <Strip />
        <Strip />
        <Strip />
      </motion.div>
    </section>
  );
}
