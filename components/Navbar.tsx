"use client";

import { useRef } from "react";
import { Brand } from "./Brand";
import { navigation, site } from "@/data/site";
export function Navbar() {
  const dialog = useRef<HTMLDialogElement>(null);
  function close() {
    dialog.current?.close();
  }
  return (
    <header className="navbar">
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
