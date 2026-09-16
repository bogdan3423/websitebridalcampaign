import { ArrowIcon } from "./ArrowIcon";
import { site, whatsappUrl } from "@/data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-directory">
        <nav aria-label="Navigare subsol">
          <a href="#servicii">Portofoliu</a>
          <a href="#pachete">Pachete</a>
          <a href="#contact">Contact</a>
        </nav>
        <p className="footer-location">Cluj-Napoca<span>România</span></p>
        <nav aria-label="Rețele sociale și contact" className="footer-contact">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowIcon /></a>
          <a href={`tel:+${site.whatsapp}`}>{site.phoneDisplay}</a>
          {site.instagram && <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowIcon /></a>}
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
        </nav>
      </div>
      <a className="footer-signature" href="#" aria-label={`${site.name} — început`}>{site.name}</a>
      <div className="footer-colophon">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <a href="#" className="back-top">Înapoi sus <ArrowIcon direction="up" /></a>
      </div>
    </footer>
  );
}
