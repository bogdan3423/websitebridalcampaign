"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { gallery } from "@/data/gallery";
import { site, whatsappUrl } from "@/data/site";
import { ArrowIcon } from "./ArrowIcon";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "prepared" | "sent" | "error">("idle");
  const [contactLink, setContactLink] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state === "prepared" || state === "sent" || state === "error") statusRef.current?.focus();
  }, [state]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    const text = `Bună! Aș vrea să discutăm 10 minute despre promovarea salonului meu.\n\nNume: ${values.name}\nSalon: ${values.salon}\nTelefon: ${values.phone}\nInstagram / website: ${values.website || "—"}\nMesaj: ${values.message || "—"}`;

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
      return;
    }

    if (site.whatsapp || site.email) {
      setContactLink(site.whatsapp ? whatsappUrl(text) : `mailto:${site.email}?subject=${encodeURIComponent("Discuție campanie bridal")}&body=${encodeURIComponent(text)}`);
      setState("prepared");
    } else {
      setState("error");
    }
  }

  return (
    <div className="contact-form-area">
      <figure className="contact-portrait">
        <Image src={gallery[5].src} alt={gallery[5].alt} fill sizes="(max-width: 800px) 100vw, 48vw" />
      </figure>
      <div className="contact-content" id="contact">
        <div className="contact-form-intro">
          <h2>Pregătim acum<br />ce va vedea mireasa<br /><em>în sezonul următor.</em></h2>
          <p>Dacă vrei să vezi cum ar putea arăta o campanie construită pentru colecția salonului tău, discutăm 10 minute.</p>
          <div className="contact-direct">
            <a className="text-link contact-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Scrie-ne pe WhatsApp <ArrowIcon /></a>
          </div>
          <p className="contact-reassurance">Fără prezentări lungi. Vedem colecția, obiectivul și dacă are sens să lucrăm împreună.</p>
        </div>

        <form className="contact-form" onSubmit={submit} onChange={() => { if (state !== "sending") setState("idle"); }}>
          <div className="form-fields">
            <label>Nume <span>*</span><input name="name" autoComplete="name" required maxLength={100} /></label>
            <label>Salon <span>*</span><input name="salon" autoComplete="organization" required maxLength={150} /></label>
            <label>Telefon <span>*</span><input name="phone" type="tel" autoComplete="tel" required pattern="[+]?[0-9][0-9 ]{5,22}[0-9]" title="Introdu un număr de telefon valid (7–25 caractere)." maxLength={25} placeholder="07xx xxx xxx" /></label>
            <label>Instagram / website<input name="website" maxLength={250} placeholder="@salon sau adresa site-ului" /></label>
            <label className="field-full">Mesaj (opțional)<textarea name="message" maxLength={2000} rows={3} placeholder="Ce vrei să promovezi din colecția ta?" /></label>
          </div>
          <div className="form-bottom">
            <p>{site.formEndpoint ? "Folosim datele doar pentru a răspunde cererii tale." : "Mesajul se pregătește aici. Îl trimiți apoi prin WhatsApp."}</p>
            <button className="button button-light" type="submit" disabled={state === "sending"}>{state === "sending" ? "Se trimite…" : "Vreau să discutăm"}<ArrowIcon /></button>
          </div>

          {state !== "idle" && state !== "sending" && (
            <div ref={statusRef} tabIndex={-1} className="form-status" role={state === "error" ? "alert" : "status"}>
              {state === "prepared" ? <><h4>Mesajul este pregătit.</h4><p>Deschide conversația și trimite-l când ești gata.</p><a className="text-link" href={contactLink} target="_blank" rel="noopener noreferrer">{site.whatsapp ? "Continuă în WhatsApp" : "Continuă prin email"} <ArrowIcon /></a></> : state === "sent" ? <><h4>Mulțumim. Mesajul a fost trimis.</h4><p>Revenim pentru o discuție scurtă despre colecție.</p></> : <><h4>Mesajul nu a putut fi trimis.</h4><p>Încearcă din nou sau <a href={whatsappUrl()}>scrie-ne direct pe WhatsApp</a>.</p></>}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
