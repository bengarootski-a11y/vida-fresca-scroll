"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { usePrecisePointer } from "./useDevice";

// A custom cursor for pointer devices: a small solid pink dot that tracks the
// mouse exactly, plus a hollow ring that lags behind with easing for a premium,
// liquid feel. The ring grows and fills when hovering anything interactive.
// Only mounts on precise-pointer (mouse/trackpad) devices, and never under
// reduced-motion — touchscreens and motion-sensitive users keep the native
// cursor untouched. One rAF loop, no React re-renders per frame.
const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, .vf-waypoint";

export default function CustomCursor() {
  const precise = usePrecisePointer();
  const reduce = useReducedMotion();
  const active = precise && !reduce;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("vf-cursor-on");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let shown = false;
    let raf = 0;

    const show = () => {
      if (shown) return;
      shown = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };
    const hide = () => {
      shown = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      show();
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      ring.classList.toggle("is-hover", !!t?.closest(INTERACTIVE));
    };
    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");

    const loop = () => {
      // Ring eases toward the pointer; dot is pinned to it.
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      document.body.classList.remove("vf-cursor-on");
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div ref={ringRef} className="vf-cursor-ring" aria-hidden />
      <div ref={dotRef} className="vf-cursor-dot" aria-hidden />
    </>
  );
}
