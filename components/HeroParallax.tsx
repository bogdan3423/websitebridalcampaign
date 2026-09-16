"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Keeps the server-rendered photographs and headline in one fixed frame. */
export function HeroParallax({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const photos = frame.querySelectorAll<HTMLElement>(".hero-photo");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let height = 0;
    let bottom = 1;
    let visible = true;

    function paint() {
      raf = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / bottom));
      photos.forEach((photo, index) => {
        // Scale provides 5% overscan on each edge; travel stays below it.
        const travel = index === 0
          ? Math.min(25, height * 0.03)
          : Math.min(35, height * 0.045);
        photo.style.transform = motion.matches
          ? "none"
          : `translate3d(0, ${(progress * travel).toFixed(2)}px, 0) scale(1.1)`;
      });
    }

    function schedule() {
      if (!raf && visible && !motion.matches) raf = requestAnimationFrame(paint);
    }

    function measure() {
      const bounds = frame!.getBoundingClientRect();
      height = bounds.height;
      bottom = Math.max(1, bounds.top + window.scrollY + height);
      if (raf) cancelAnimationFrame(raf);
      paint();
    }

    const resize = new ResizeObserver(measure);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    resize.observe(frame);
    visibility.observe(frame);
    window.addEventListener("scroll", schedule, { passive: true });
    motion.addEventListener("change", measure);
    measure();

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      visibility.disconnect();
      window.removeEventListener("scroll", schedule);
      motion.removeEventListener("change", measure);
    };
  }, []);

  return <div ref={frameRef} className="hero-images">{children}</div>;
}
