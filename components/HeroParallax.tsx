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
    let travelDistance = 1;
    let widths: number[] = [];
    let visible = true;

    function paint() {
      raf = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / travelDistance));
      photos.forEach((photo, index) => {
        // 12% overscan on each side keeps a 10% horizontal drift inside the frame.
        const travel = Math.min(96, (widths[index] || 0) * 0.1);
        const direction = index === 0 ? -1 : 1;
        photo.style.transform = motion.matches
          ? "none"
          : `translate3d(${(progress * travel * direction).toFixed(2)}px, 0, 0) scale(1.24)`;
      });
    }

    function schedule() {
      if (!raf && visible && !motion.matches) raf = requestAnimationFrame(paint);
    }

    function measure() {
      const bounds = frame!.getBoundingClientRect();
      travelDistance = Math.max(1, bounds.height * 0.8);
      widths = Array.from(photos, (photo) => photo.offsetWidth);
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
