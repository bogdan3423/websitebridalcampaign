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
    let heroEnd = hero.getBoundingClientRect().bottom + window.scrollY;
    function update() {
      frame = 0;
      const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
      const delta = y - previousY;
      previousY = y;
      element!.dataset.surface = y < heroEnd - 88 ? "hero" : "paper";
      if (dialog.current?.open) { travel = 0; return; }
      if (y <= 24) {
        element!.dataset.hidden = "false";
        travel = 0;
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
    element.dataset.hidden = previousY > 24 ? "true" : "false";
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
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
        Contact
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
