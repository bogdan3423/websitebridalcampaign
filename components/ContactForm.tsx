"use client";
import { ArrowIcon } from "./ArrowIcon";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { packages } from "@/data/packages";
import { site, whatsappUrl } from "@/data/site";
export function ContactForm() {
  const [selected, setSelected] = useState("");
  const [state, setState] = useState<
    "idle" | "sending" | "prepared" | "sent" | "error"
  >("idle");
  const [contactLink, setContactLink] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handle = (e: Event) => {
      setSelected((e as CustomEvent<string>).detail);
      setState("idle");
    };
    window.addEventListener("select-package", handle);
    return () => window.removeEventListener("select-package", handle);
  }, []);
  useEffect(() => {
    if (state === "prepared" || state === "sent" || state === "error")
      statusRef.current?.focus();
  }, [state]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    );
    const packageName = packages.find((item) => item.id === values.package)?.name || "Aș dori o recomandare";
    const text = `Bună! Aș vrea să discutăm despre promovarea salonului meu.\n\nNume: ${values.name}\nSalon: ${values.salon}\nTelefon: ${values.phone}\nInstagram / site: ${values.website || "—"}\nPachet: ${packageName}\nMesaj: ${values.message || "—"}`;
    if (site.formEndpoint) {
      setState("sending");
      try {
        const response = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
          signal: AbortSignal.timeout(15000),
        });
        if (!response.ok) throw new Error("Request failed");
        setState("sent");
      } catch {
        setState("error");
      }
    } else if (site.whatsapp || site.email) {
      setContactLink(
        site.whatsapp
          ? whatsappUrl(text)
          : `mailto:${site.email}?subject=${encodeURIComponent("Cerere campanie bridal")}&body=${encodeURIComponent(text)}`,
      );
      setState("prepared");
    } else setState("error");
  }
  return (
    <div className="contact-form-area" id="contact">
      <div className="contact-form-intro">
        <h2>Hai să vorbim.</h2>
        <p>Despre colecția ta și cum o aducem în prim-plan.</p>
        <div className="contact-direct">
          <a className="text-link contact-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Scrie-ne pe WhatsApp <ArrowIcon /></a>
          <a className="contact-phone" href={`tel:+${site.whatsapp}`}>{site.phoneDisplay}</a>
        </div>
      </div>
      <form
        className="contact-form"
        onSubmit={submit}
        onChange={() => {
          if (state !== "sending") setState("idle");
        }}
      >
        <div className="form-fields">
          <label>
            Nume <span>*</span>
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={100}
            />
          </label>
          <label>
            Salon <span>*</span>
            <input
              name="salon"
              autoComplete="organization"
              required
              maxLength={150}
            />
          </label>
          <label>
            Telefon <span>*</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              pattern="[+]?[0-9][0-9 ]{5,22}[0-9]"
              title="Introdu un număr de telefon valid (7–25 caractere)."
              maxLength={25}
              placeholder="07xx xxx xxx"
            />
          </label>
          <label>
            Pachet de interes
            <span className="contact-select">
            <select
              name="package"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="">Aș dori o recomandare</option>
              {packages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true"><path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </label>
          <label className="field-full">Mesaj (opțional)<textarea name="message" maxLength={2000} rows={3} placeholder="Ce ai în minte pentru colecția ta?" /></label>
          <details className="brief-details">
            <summary>Instagram / site (opțional)<span aria-hidden="true">+</span></summary>
            <label>Instagram / site<input name="website" maxLength={250} placeholder="@salon sau adresa site-ului" /></label>
          </details>
        </div>
        <div className="form-bottom">
          <p>
            {site.formEndpoint
              ? "Folosim datele doar pentru a răspunde cererii tale."
              : "Cererea se pregătește aici. O trimiți apoi prin WhatsApp."}
          </p>
          <button
            className="button button-light"
            type="submit"
            disabled={state === "sending"}
          >
            {state === "sending" ? "Se trimite…" : site.formEndpoint ? "Trimite cererea" : "Pregătește mesajul"}
            <ArrowIcon />
          </button>
        </div>
        {state !== "idle" && state !== "sending" && (
          <div
            ref={statusRef}
            tabIndex={-1}
            className="form-status"
            role={state === "error" ? "alert" : "status"}
          >
            {state === "prepared" ? (
              <>
                <h4>Cererea ta este pregătită.</h4>
                <p>
                  Mai ai un singur pas: deschide conversația și trimite mesajul.
                </p>
                <a
                  className="text-link"
                  href={contactLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.whatsapp
                    ? "Continuă în WhatsApp"
                    : "Continuă prin email"}{" "}
                  <ArrowIcon />
                </a>
              </>
            ) : state === "sent" ? (
              <>
                <h4>Mulțumim. Cererea ta a fost trimisă.</h4>
                <p>Revenim la tine pentru a vorbi despre colecție.</p>
              </>
            ) : (
              <>
                <h4>Cererea nu a putut fi trimisă.</h4>
                <p>
                  Încearcă din nou sau{" "}
                  <a href={whatsappUrl()}>scrie-ne direct pe WhatsApp</a>.
                </p>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
