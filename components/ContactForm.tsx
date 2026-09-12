"use client";
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
    const text = `Bună! Aș vrea să discutăm despre o campanie bridal.\n\nNume: ${values.name}\nSalon: ${values.salon}\nTelefon: ${values.phone}\nInstagram / Website: ${values.website || "—"}\nPachet: ${values.package || "Aș dori o recomandare"}\nMesaj: ${values.message || "—"}`;
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
        <span className="eyebrow">SĂ VORBIM DESPRE SALONUL TĂU</span>
        <h3 className="display">
          Începem cu
          <br />
          <em>o conversație.</em>
        </h3>
        <p>
          Spune-ne ce colecție pregătești. Alegem împreună pachetul potrivit.
        </p>
        <a className="contact-phone" href={`tel:+${site.whatsapp}`}>
          {site.phoneDisplay} <span aria-hidden="true">↗</span>
        </a>
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
              placeholder="Numele tău"
            />
          </label>
          <label>
            Salon <span>*</span>
            <input
              name="salon"
              autoComplete="organization"
              required
              maxLength={150}
              placeholder="Numele salonului"
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
            Instagram / Website
            <input
              name="website"
              maxLength={250}
              placeholder="@salon sau website.ro"
            />
          </label>
          <label className="field-full">
            Pachet de interes
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
          </label>
          <label className="field-full">
            Mesaj
            <textarea
              name="message"
              maxLength={2000}
              rows={3}
              placeholder="Ce ai vrea să știm despre colecția ta?"
            />
          </label>
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
            {state === "sending" ? "Se trimite…" : "Trimite cererea"}
            <span aria-hidden="true">↗</span>
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
                  <span aria-hidden="true">↗</span>
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
