import { ArrowIcon } from "./ArrowIcon";
import { site, whatsappUrl } from "@/data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-studio">
        <a className="footer-signature" href="#" aria-label={`${site.name} — început`}>{site.name}</a>
        <nav aria-label="Navigare subsol" className="footer-navigation">
          <a href="#servicii">Portofoliu</a>
          <a href="#pachete">Pachete</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      <div className="footer-colophon">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p className="footer-location">Cluj-Napoca, România</p>
        <nav aria-label="Rețele sociale și contact" className="footer-contact">
          <a href={`tel:+${site.whatsapp}`}>{site.phoneDisplay}</a>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowIcon /></a>
          {site.instagram && <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
          {site.email && <a href={`mailto:${site.email}`}>Email</a>}
        </nav>
      </div>
    </footer>
  );
}
