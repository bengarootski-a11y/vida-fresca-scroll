"use client";

import { useEffect, useRef, useState } from "react";
import { colors, fonts } from "./tokens";
import { getLenis } from "./lenisInstance";

// Fixed waypoint rail on the right edge. One dot per major section; the active
// dot (the section currently filling the viewport) grows and fills pink. Uses
// IntersectionObserver — no scroll listener. Click a dot to glide to a section.
const WAYPOINTS = [
  { id: "top", label: "Drinks" },
  { id: "ingredients", label: "Inside" },
  { id: "features", label: "Why" },
  { id: "about", label: "About" },
  { id: "specs", label: "Details" },
  { id: "visit", label: "Visit" },
];

export default function WaypointNav() {
  const [active, setActive] = useState(0);
  const ratios = useRef<number[]>(WAYPOINTS.map(() => 0));

  useEffect(() => {
    const targets = WAYPOINTS.map((w) => document.getElementById(w.id)).filter(
      Boolean,
    ) as HTMLElement[];
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = WAYPOINTS.findIndex((w) => w.id === e.target.id);
          if (i >= 0) ratios.current[i] = e.intersectionRatio;
        }
        let best = 0;
        let bestR = -1;
        ratios.current.forEach((r, i) => {
          if (r > bestR) {
            bestR = r;
            best = i;
          }
        });
        setActive(best);
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1] },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="vf-waypoints"
      style={{
        position: "fixed",
        right: "clamp(0.9rem, 2vw, 1.8rem)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        alignItems: "flex-end",
      }}
    >
      {WAYPOINTS.map((w, i) => {
        const on = i === active;
        return (
          <button
            key={w.id}
            onClick={() => {
              const el = document.getElementById(w.id);
              if (!el) return;
              const lenis = getLenis();
              if (lenis) lenis.scrollTo(el, { offset: 0 });
              else el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            aria-label={`Go to ${w.label}`}
            aria-current={on ? "true" : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 2px 6px 14px",
              borderRadius: 999,
            }}
            className="vf-waypoint"
          >
            <span
              className="vf-waypoint-label"
              style={{
                fontFamily: fonts.body,
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: colors.ink,
                opacity: on ? 0.85 : 0,
                transform: on ? "translateX(0)" : "translateX(6px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              {w.label}
            </span>
            <span
              style={{
                display: "block",
                width: on ? 13 : 8,
                height: on ? 13 : 8,
                borderRadius: "50%",
                background: on ? colors.pink : "transparent",
                border: `2px solid ${on ? colors.pink : "rgba(26,77,46,0.4)"}`,
                boxShadow: on ? "0 0 12px rgba(249,44,110,0.6)" : "none",
                transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
