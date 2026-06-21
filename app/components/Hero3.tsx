"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { colors, fonts, labelOnCream } from "./tokens";
import { EASE } from "./motion";

// Three drinks, one scroll. As you scroll the pinned stage, all three drinks
// deconstruct in sync — each canvas scrubs its own frame sequence (assembled →
// exploded) driven by a single rAF loop reading the section's scroll position.
// No scroll listener, no per-frame React re-render.
type Drink = {
  key: string;
  dir: string;
  count: number;
  name: string;
  note: string;
  accent: string;
  zoom: number; // per-drink scale so the three read at a consistent size
  hold: number; // frame-x to pin the (spinning, drifting) cup at — keeps it centred
  driftPts: [number, number][]; // measured cup-centre (frame-x) vs scroll progress
  baseYPts: [number, number][]; // measured cup-base (frame-y) vs scroll progress
  // The cups are generated BLANK (no logo) so the clear cup never shows a
  // doubled label. We composite the one real, crisp VIDA FRESCA sticker on the
  // front and make it ride the cup's turntable spin: model the cup as a
  // cylinder of radius `radius` turning by `theta1` over the scroll, so the
  // label slides across the face (x = radius·sinθ) and foreshortens
  // (width = w0·cosθ) — it reads as printed on the cup, not pasted on top.
  sticker: {
    theta1: number; // total turn over the scroll (degrees)
    radius: number; // cup radius (frame px) — how far the label travels
    w0: number; // label width face-on (frame px)
    h: number; // label height (≈ constant; turn is about the vertical axis)
    yOff: number; // label centre above the cup base (negative = up)
  };
};

const DRINKS: Drink[] = [
  {
    key: "wm",
    dir: "/frames",
    count: 121,
    name: "Watermelon Blast",
    note: "Crisp, juicy, summer-red.",
    accent: colors.watermelon,
    zoom: 1.2,
    hold: 245,
    driftPts: [
      [0, 216],
      [0.25, 222],
      [0.5, 243],
      [0.75, 257],
      [1, 259],
    ],
    baseYPts: [
      [0, 619],
      [0.5, 621],
      [1, 623],
    ],
    sticker: { theta1: 32, radius: 92, w0: 158, h: 150, yOff: -150 },
  },
  {
    key: "mango",
    dir: "/frames-mango",
    count: 121,
    name: "Mango Madness",
    note: "Lush, sweet, golden.",
    accent: colors.mango,
    zoom: 1.2,
    hold: 245,
    driftPts: [
      [0, 226],
      [0.25, 233],
      [0.5, 249],
      [0.75, 256],
      [1, 256],
    ],
    baseYPts: [
      [0, 618],
      [0.5, 621],
      [1, 623],
    ],
    sticker: { theta1: 32, radius: 92, w0: 160, h: 152, yOff: -150 },
  },
  {
    key: "pa",
    dir: "/frames-pineapple",
    count: 121,
    name: "Pineapple Paradise",
    note: "Bright, tangy, tropical.",
    accent: colors.pineapple,
    zoom: 1.2,
    hold: 245,
    driftPts: [
      [0, 229],
      [0.25, 234],
      [0.5, 245],
      [0.75, 247],
      [1, 246],
    ],
    baseYPts: [
      [0, 628],
      [0.5, 625],
      [1, 623],
    ],
    sticker: { theta1: 30, radius: 90, w0: 160, h: 152, yOff: -152 },
  },
];

// As the cups spin they drift sideways AND down (a seedance quirk no prompt
// removed), differently per drink. Each drink carries its measured
// cup-centre-x (driftPts) and cup-base-y (baseYPts) curves; we re-pin the cup
// to a fixed spot every frame so it spins IN PLACE and never slides. Lookup:
const lerpPts = (pts: [number, number][], p: number) => {
  for (let i = 1; i < pts.length; i++) {
    if (p <= pts[i][0]) {
      const [p0, c0] = pts[i - 1];
      const [p1, c1] = pts[i];
      return c0 + ((c1 - c0) * (p - p0)) / (p1 - p0);
    }
  }
  return pts[pts.length - 1][1];
};
// Cup baseline as a fraction of stage height (sits a touch higher than before).
const BASELINE = 0.82;

// ?v bust: frame files keep the same names across regenerations, so bump this
// whenever the frames change to force browsers to fetch the new images.
const FRAMES_VERSION = 15;
const framePath = (dir: string, i: number) =>
  `${dir}/frame_${String(i + 1).padStart(4, "0")}.jpg?v=${FRAMES_VERSION}`;

export default function Hero3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const hintRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctxs: (CanvasRenderingContext2D | null)[] = [];
    const imagesByDrink: HTMLImageElement[][] = [];
    const currentIdx: number[] = DRINKS.map(() => -1);
    let rafId = 0;

    // One real, crisp sticker composited onto each blank cup's front.
    const stickerImg = new Image();
    stickerImg.src = "/brand/sticker.png";
    stickerImg.onload = () =>
      DRINKS.forEach((_, d) => draw(d, currentIdx[d] >= 0 ? currentIdx[d] : 0));
    // Offscreen buffer used to embed the sticker into the cup's lighting so it
    // reads as printed on the cup (picks up the frost highlights + curvature),
    // not pasted flat on top.
    const lbuf = document.createElement("canvas");
    const lctx = lbuf.getContext("2d");

    const draw = (d: number, idx: number) => {
      const canvas = canvasRefs.current[d];
      const ctx = ctxs[d];
      if (!canvas || !ctx) return;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      ctx.fillStyle = colors.cream;
      ctx.fillRect(0, 0, cw, ch);
      const img = imagesByDrink[d]?.[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      // contain-fit (× per-drink zoom): whole drink visible, cream margins
      // blend with the stage; zoom evens out the three drinks' apparent size.
      // On phones each column is narrow, so scale the cups up a notch (the
      // contents fly UP, so a little horizontal overflow is fine) — keeps the
      // hero from reading as three tiny cups on mobile.
      const zoomBoost = cw < 170 ? 1.42 : cw < 260 ? 1.18 : 1;
      const scale =
        Math.min(cw / iw, ch / ih) * (DRINKS[d]?.zoom ?? 1) * zoomBoost;
      const dw = iw * scale;
      const dh = ih * scale;
      // Pin the spinning cup to a fixed frame-x (`hold`) every frame: the cup
      // naturally drifts to driftCenter(progress), so shift by (hold - that) to
      // cancel the drift. Result: it spins in place, stays centred under its
      // name, and the garnish never slides off the edge. Base sits on BASELINE.
      const drink = DRINKS[d];
      const progress = drink.count > 1 ? idx / (drink.count - 1) : 0;
      const cupCenter = lerpPts(drink.driftPts, progress);
      const hold = drink?.hold ?? cupCenter;
      const cupBottom = lerpPts(drink.baseYPts, progress);
      ctx.drawImage(
        img,
        (cw - dw) / 2 + (hold - cupCenter) * scale,
        ch * BASELINE - cupBottom * scale,
        dw,
        dh,
      );
      // The one crisp VIDA FRESCA logo, riding the cup's turntable spin. Model
      // the cup as a cylinder turning by `theta1` over the scroll: the label
      // slides across the face (x = radius·sinθ) and foreshortens
      // (width = w0·cosθ), so it looks printed on the cup, not pasted on.
      const st = drink.sticker;
      if (st && stickerImg.complete && stickerImg.naturalWidth > 0 && lctx) {
        const theta = ((st.theta1 * Math.PI) / 180) * progress;
        const sw = st.w0 * Math.cos(theta) * scale;
        const sh = st.h * scale;
        const sx =
          (cw - dw) / 2 + (hold + st.radius * Math.sin(theta)) * scale;
        const sy = ch * BASELINE + st.yOff * scale;
        const lx = sx - sw / 2;
        const ly = sy - sh / 2;
        const ow = Math.max(1, Math.ceil(sw));
        const oh = Math.max(1, Math.ceil(sh));
        lbuf.width = ow;
        lbuf.height = oh;
        // 1) the crisp sticker
        lctx.clearRect(0, 0, ow, oh);
        lctx.drawImage(stickerImg, 0, 0, ow, oh);
        // 2) blend the cup underneath INTO it (soft-light) so the sticker picks
        // up the cup's frost highlights, shadows and curvature → looks printed.
        lctx.globalCompositeOperation = "soft-light";
        lctx.globalAlpha = 0.85;
        const fX = (cw - dw) / 2 + (hold - cupCenter) * scale;
        const fY = ch * BASELINE - cupBottom * scale;
        lctx.drawImage(img, fX - lx, fY - ly, dw, dh);
        // a touch of multiply for contact shading at the edges
        lctx.globalCompositeOperation = "multiply";
        lctx.globalAlpha = 0.18;
        lctx.drawImage(img, fX - lx, fY - ly, dw, dh);
        // 3) clip everything back to the sticker's shape
        lctx.globalCompositeOperation = "destination-in";
        lctx.globalAlpha = 1;
        lctx.drawImage(stickerImg, 0, 0, ow, oh);
        lctx.globalCompositeOperation = "source-over";
        // 4) drop the embedded sticker onto the cup
        ctx.drawImage(lbuf, lx, ly, sw, sh);
      }
      currentIdx[d] = idx;
    };

    const sizeCanvas = (d: number) => {
      const canvas = canvasRefs.current[d];
      const ctx = ctxs[d];
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Set up each canvas + preload its frame sequence.
    DRINKS.forEach((drink, d) => {
      const canvas = canvasRefs.current[d];
      ctxs[d] = canvas ? canvas.getContext("2d") : null;
      sizeCanvas(d);
      const arr: HTMLImageElement[] = new Array(drink.count);
      let firstDrawn = false;
      for (let i = 0; i < drink.count; i++) {
        const img = new Image();
        img.src = framePath(drink.dir, i);
        arr[i] = img;
        if (i === 0)
          img.onload = () => {
            if (!firstDrawn) {
              firstDrawn = true;
              draw(d, 0);
            }
          };
      }
      imagesByDrink[d] = arr;
    });

    const tick = () => {
      const top = container.getBoundingClientRect().top;
      const progress = Math.max(
        0,
        Math.min(1, -top / (container.offsetHeight - window.innerHeight)),
      );
      DRINKS.forEach((drink, d) => {
        const target = Math.round(progress * (drink.count - 1));
        if (target !== currentIdx[d]) draw(d, target);
      });
      if (hintRef.current)
        hintRef.current.style.opacity = String(Math.max(0, 1 - progress * 4));
      // Fade the title + top scrim as the decompose begins so the contents
      // flying up are never clipped/masked by the header.
      const headerFade = Math.max(0, Math.min(1, 1 - progress * 3.4));
      if (scrimRef.current) scrimRef.current.style.opacity = String(headerFade);
      if (titleRef.current) titleRef.current.style.opacity = String(headerFade);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onResize = () => {
      DRINKS.forEach((_, d) => {
        sizeCanvas(d);
        draw(d, currentIdx[d] >= 0 ? currentIdx[d] : 0);
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const titleContainer = {
    hidden: {},
    visible: { transition: { delayChildren: 0.4, staggerChildren: 0.13 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: EASE },
    },
  };
  const h1Var = {
    hidden: { opacity: 0, scale: 0.84, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: EASE },
    },
  };

  return (
    <section
      id="top"
      ref={containerRef}
      style={{ height: "420vh", position: "relative", background: colors.cream }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          background: colors.cream,
        }}
      >
        {/* THREE FULL-HEIGHT DECONSTRUCTING DRINKS */}
        <div
          className="vf-hero3-row"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {DRINKS.map((drink, d) => (
            <div key={drink.key} style={{ position: "relative", overflow: "hidden" }}>
              <canvas
                ref={(el) => {
                  canvasRefs.current[d] = el;
                }}
                role="img"
                aria-label={`${drink.name} — ${drink.note}`}
                style={{ display: "block", width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </div>

        {/* top scrim keeps the title legible over the full cups; both it and
            the title fade out as you scroll so the flying contents aren't
            masked by the header during the decompose. */}
        <div
          ref={scrimRef}
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "30vh",
            zIndex: 2,
            pointerEvents: "none",
            background:
              "linear-gradient(to bottom, rgba(246,238,220,0.97) 0%, rgba(246,238,220,0.7) 45%, rgba(246,238,220,0) 100%)",
          }}
        />

        {/* TITLE */}
        <motion.div
          ref={titleRef}
          variants={titleContainer}
          initial="hidden"
          animate="visible"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            textAlign: "center",
            padding: "clamp(1.3rem, 3.4vh, 2.8rem) 1.5rem 0",
            pointerEvents: "none",
            willChange: "opacity",
          }}
        >
          <motion.span variants={fadeUp} style={{ ...labelOnCream, display: "block" }}>
            Fresh Fruit Drinks · Los Angeles
          </motion.span>
          <motion.h1
            variants={h1Var}
            style={{
              fontFamily: fonts.display,
              fontWeight: 400,
              fontSize: "clamp(2.7rem, 7.5vw, 6.5rem)",
              lineHeight: 0.95,
              color: colors.ink,
              margin: "0.4rem 0 0.22rem",
            }}
          >
            Vida Fresca
          </motion.h1>
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: fonts.script,
              fontWeight: 600,
              fontSize: "clamp(1.2rem, 2.6vw, 2rem)",
              color: "#141414",
              lineHeight: 1,
            }}
          >
            made fresh. made simple. made for you.
          </motion.p>
        </motion.div>

        {/* bottom scrim keeps the flavor labels legible over the splashes */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "16vh",
            zIndex: 2,
            pointerEvents: "none",
            background:
              "linear-gradient(to top, rgba(246,238,220,0.98) 0%, rgba(246,238,220,0.7) 55%, rgba(246,238,220,0) 100%)",
          }}
        />

        {/* FLAVOR LABELS — sit directly under each cup's baseline */}
        <div
          className="vf-hero3-labels"
          style={{
            position: "absolute",
            top: "83.5%",
            left: 0,
            right: 0,
            zIndex: 3,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            pointerEvents: "none",
          }}
        >
          {DRINKS.map((drink) => (
            <div key={drink.key} style={{ textAlign: "center", padding: "0 0.5rem" }}>
              <div
                style={{
                  width: 42,
                  height: 4,
                  borderRadius: 2,
                  background: drink.accent,
                  margin: "0 auto 0.7rem",
                }}
              />
              <h2
                className="vf-hero3-name"
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 400,
                  fontSize: "clamp(1.05rem, 2vw, 2rem)",
                  lineHeight: 1,
                  color: colors.ink,
                }}
              >
                {drink.name}
              </h2>
              <p
                className="vf-hero3-note"
                style={{
                  fontFamily: fonts.script,
                  fontWeight: 600,
                  fontSize: "clamp(0.95rem, 1.4vw, 1.35rem)",
                  color: colors.pinkInk,
                  marginTop: "0.15rem",
                }}
              >
                {drink.note}
              </p>
            </div>
          ))}
        </div>

        {/* scroll hint — bottom-left so it never collides with a label */}
        <div
          ref={hintRef}
          style={{
            position: "absolute",
            bottom: 16,
            left: "clamp(1rem, 3vw, 2.4rem)",
            zIndex: 4,
            display: "flex",
            alignItems: "center",
            gap: 8,
            pointerEvents: "none",
            transition: "opacity 0.15s linear",
          }}
        >
          <span
            style={{
              fontFamily: fonts.body,
              fontWeight: 700,
              fontSize: "0.58rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: colors.green,
            }}
          >
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: colors.pink, fontSize: "1rem", lineHeight: 1 }}
          >
            ↓
          </motion.span>
        </div>
      </div>
    </section>
  );
}
