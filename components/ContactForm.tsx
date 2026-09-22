"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { gallery } from "@/data/gallery";
import { site, whatsappUrl } from "@/data/site";
import { ArrowIcon } from "./ArrowIcon";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state === "sent" || state === "error") statusRef.current?.focus();
  }, [state]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    if (!site.formEndpoint) {
      setState("error");
      return;
    }

    setState("sending");
    try {
      const response = await fetch(site.formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Nume: values.name,
          Salon: values.salon,
          Telefon: values.phone,
          "Instagram / website": values.website || "—",
          Mesaj: values.message || "—",
          _subject: "Solicitare nouă — formular thebridalconcept.ro",
          _template: "table",
          _captcha: "false",
          _honey: values._honey,
          _url: window.location.href,
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Request failed");
      window.dispatchEvent(
        new CustomEvent("bridal:analytics", {
          detail: { name: "form_submit_success", parameters: { form_name: "contact" } },
        }),
      );
      form.reset();
      setState("sent");
    } catch {
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
          <p>Dacă vrei să vezi cum ar putea arăta o campanie construită pentru colecția salonului tău, discutăm 10 minute. Lucrăm din Cluj-Napoca cu saloane din România.</p>
          <div className="contact-direct">
            <a className="text-link contact-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Scrie-ne pe WhatsApp <ArrowIcon /></a>
            <a href={`tel:+${site.whatsapp}`}>{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <p className="contact-reassurance">Fără prezentări lungi. Vedem colecția, obiectivul și dacă are sens să lucrăm împreună.</p>
        </div>

        <form className="contact-form" onSubmit={submit} onChange={() => { if (state !== "sending") setState("idle"); }}>
          <label className="form-honeypot" aria-hidden="true">Nu completa acest câmp<input name="_honey" tabIndex={-1} autoComplete="off" /></label>
          <div className="form-fields">
            <label>Nume <span>*</span><input name="name" autoComplete="name" required maxLength={100} /></label>
            <label>Salon <span>*</span><input name="salon" autoComplete="organization" required maxLength={150} /></label>
            <label>Telefon <span>*</span><input name="phone" type="tel" autoComplete="tel" required pattern="[+]?[0-9][0-9 ]{5,22}[0-9]" title="Introdu un număr de telefon valid (7–25 caractere)." maxLength={25} placeholder="07xx xxx xxx" /></label>
            <label>Instagram / website<input name="website" maxLength={250} placeholder="@salon sau adresa site-ului" /></label>
            <label className="field-full">Mesaj (opțional)<textarea name="message" maxLength={2000} rows={3} placeholder="Ce vrei să promovezi din colecția ta?" /></label>
          </div>
          <div className="form-bottom">
            <p>Folosim datele doar pentru a răspunde cererii tale.</p>
            <button className="button button-light" type="submit" disabled={state === "sending"}>{state === "sending" ? "Se trimite…" : "Vreau să discutăm"}<ArrowIcon /></button>
          </div>

          {state !== "idle" && state !== "sending" && (
            <div ref={statusRef} tabIndex={-1} className="form-status" role={state === "error" ? "alert" : "status"}>
              {state === "sent" ? <><h3>Mulțumim. Mesajul a fost trimis.</h3><p>Revenim pentru o discuție scurtă despre colecție.</p></> : <><h3>Mesajul nu a putut fi trimis.</h3><p>Încearcă din nou sau <a href={whatsappUrl()}>scrie-ne direct pe WhatsApp</a>.</p></>}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
