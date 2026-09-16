"use client";
import { ArrowIcon } from "./ArrowIcon";

import { useRef } from "react";
import { Brand } from "./Brand";
import { navigation } from "@/data/site";
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
        Hai să vorbim <ArrowIcon />
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
            Închide ×
          </button>
        </div>
        <nav>
          {navigation.map(([label, href], index) => (
            <a key={href} href={href} onClick={close}>
              <small>0{index + 1}</small>
              {label}
              <ArrowIcon />
            </a>
          ))}
        </nav>
        <p>Cluj-Napoca · Promovare pentru saloane de rochii de mireasă</p>
      </dialog>
    </header>
  );
}
