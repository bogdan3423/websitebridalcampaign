import { Brand } from "./Brand";
import { site, whatsappUrl } from "@/data/site";
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <Brand />
        <p>Cluj-Napoca, România</p>
        <nav aria-label="Rețele sociale și contact">
          {site.instagram && (
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              Instagram ↗
            </a>
          )}
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            WhatsApp ↗
          </a>
          {site.email && <a href={`mailto:${site.email}`}>Email ↗</a>}
        </nav>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {site.name}. Toate drepturile rezervate.
        </p>
        <nav aria-label="Navigare subsol">
          <a href="#pachete">Pachete</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="#" className="back-top">
          Înapoi sus ↑
        </a>
      </div>
    </footer>
  );
}
