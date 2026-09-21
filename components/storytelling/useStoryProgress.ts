"use client";

import { useEffect, useRef, useState } from "react";

export function useStoryProgress() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    const steps = Array.from(
      root.querySelectorAll<HTMLElement>("[data-story-step]"),
    );
    root.dataset.storyReady = "true";

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight / 2) -
              Math.abs(b.boundingClientRect.top - window.innerHeight / 2),
          );
        const index = visible[0]?.target.getAttribute("data-index");
        if (index !== null && index !== undefined) setActive(Number(index));
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );

    steps.forEach((step) => observer.observe(step));
    return () => {
      observer.disconnect();
      delete root.dataset.storyReady;
    };
  }, []);

  return { rootRef, active };
}
