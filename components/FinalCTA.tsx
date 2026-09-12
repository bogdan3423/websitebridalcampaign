import { packages, formatPrice } from "@/data/packages";
import { whatsappUrl } from "@/data/site";
import { ContactForm } from "./ContactForm";
export function FinalCTA() {
  return (
    <section className="final-section">
      <div className="section">
        <div className="final-heading">
          <p className="eyebrow">COLECȚIA TA MERITĂ SĂ FIE VĂZUTĂ.</p>
          <h2>
            Pregătim acum
            <br />
            ce va vedea mireasa
            <br />
            <em>până la iarnă.</em>
          </h2>
          <div className="final-description">
            <span aria-hidden="true" className="final-arrow">
              ↘
            </span>
            <p>
              În toamnă construim biblioteca de content. În sezonul de căutare,
              salonul trebuie să fie deja prezent, recognoscibil și pregătit să
              transforme interesul în programări.
            </p>
          </div>
        </div>
        <div className="final-offer">
          {packages.map((p) => (
            <a key={p.id} href="#pachete">
              <span className="eyebrow">{p.name}</span>
              <span className="display">
                {formatPrice(p.price)} <small>LEI</small>
              </span>
            </a>
          ))}
        </div>
        <div className="final-actions">
          <a className="button button-light" href="#contact">
            Vreau să discutăm <span aria-hidden="true">↗</span>
          </a>
          <a
            className="text-link"
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Scrie-ne pe WhatsApp <span aria-hidden="true">↗</span>
          </a>
          <p className="eyebrow">CLUJ-NAPOCA · CAMPANII BRIDAL 2026/27</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
