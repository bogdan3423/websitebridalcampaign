"use client";

import { useEffect, useRef } from "react";
import { Brand } from "./Brand";
import { navigation, site } from "@/data/site";
export function Navbar() {
  const header = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = header.current;
    const hero = document.querySelector(".hero-images");
    if (!element || !hero) return;
    let previousY = Math.max(0, window.scrollY);
    let travel = 0;
    let frame = 0;
    let swapTimer: ReturnType<typeof setTimeout> | undefined;
    let heroEnd = hero.getBoundingClientRect().bottom + window.scrollY;
    function setSurface(surface: "hero" | "paper") {
      if (element!.dataset.surface === surface) return;
      // Change positioning only while offscreen; never morph a visible masthead.
      element!.dataset.switching = "true";
      element!.dataset.surface = surface;
      element!.dataset.hidden = surface === "paper" ? "true" : "false";
      element!.getBoundingClientRect();
      delete element!.dataset.switching;
      travel = 0;
    }
    function update() {
      frame = 0;
      const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
      const delta = y - previousY;
      previousY = y;
      if (dialog.current?.open) { travel = 0; return; }
      if (y <= heroEnd) {
        if (element!.dataset.surface === "paper") {
          element!.dataset.hidden = "true";
          if (y < 88) {
            clearTimeout(swapTimer);
            swapTimer = undefined;
            setSurface("hero");
          } else if (!swapTimer) {
            swapTimer = setTimeout(() => {
              swapTimer = undefined;
              if (window.scrollY <= heroEnd) setSurface("hero");
            }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220);
          }
        }
        travel = 0;
        return;
      }
      clearTimeout(swapTimer);
      swapTimer = undefined;
      if (element!.dataset.surface === "hero") {
        setSurface("paper");
        return;
      }
      // Accumulate movement in one direction so tiny trackpad reversals don't flicker.
      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
      if (travel > 16) element!.dataset.hidden = "true";
      if (travel < -8) element!.dataset.hidden = "false";
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    const observer = new ResizeObserver(() => {
      heroEnd = hero!.getBoundingClientRect().bottom + window.scrollY;
      schedule();
    });
    observer.observe(hero);
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(swapTimer);
    };
  }, []);
  function close() {
    dialog.current?.close();
  }
  return (
    <header ref={header} className="navbar" data-surface="hero" data-hidden="false">
      <Brand />
      <nav className="desktop-nav" aria-label="Navigare principală">
        {navigation.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="nav-cta" href="#contact">
        Discutăm?
      </a>
      <button
        className="menu-toggle"
        aria-label="Deschide meniul"
        onClick={() => dialog.current?.showModal()}
      >
        <span />
        <span />
      </button>
      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-label="Meniu de navigare"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="menu-top">
          <Brand />
          <button onClick={close} aria-label="Închide meniul">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.25" /></svg>
          </button>
        </div>
        <nav>
          {[...navigation, ["Contact", "#contact"]].map(([label, href]) => (
            <a key={href} href={href} onClick={close}>
              {label}
            </a>
          ))}
        </nav>
        <div className="menu-contact"><p>Cluj-Napoca, România</p><a href={`tel:+${site.whatsapp}`}>{site.phoneDisplay}</a></div>
      </dialog>
    </header>
  );
}
