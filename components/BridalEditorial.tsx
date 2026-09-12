import Image from "next/image";
import { gallery } from "@/data/gallery";
import { packages } from "@/data/packages";
import { SectionLabel } from "./SectionLabel";
export function BridalEditorial() {
  return (
    <section className="editorial-section">
      <div className="section">
        <SectionLabel number="07">Dincolo de ecran</SectionLabel>
        <div className="editorial-layout">
          <div className="magazine-stage">
            <div className="magazine">
              <div className="magazine-head">
                <span>THE BRIDAL</span>
                <em>EDIT</em>
                <small>COLLECTION 2027</small>
              </div>
              <div className="magazine-photo">
                <Image
                  src={gallery[4].src}
                  alt="Concept de copertă pentru lookbook bridal, cu portret de mireasă"
                  fill
                  sizes="(max-width: 767px) 74vw, 32vw"
                />
              </div>
              <div className="magazine-foot">
                <span>
                  O COLECȚIE.
                  <br />O NOUĂ POVESTE.
                </span>
                <span>No. 01</span>
              </div>
            </div>
            <p className="eyebrow">
              CONCEPT EDITORIAL · PERSONALIZAT PENTRU SALON
            </p>
          </div>
          <div className="editorial-copy">
            <h2>
              Un material
              <br />
              pe care mireasa
              <br />
              <em>
                îl poate ține
                <br />
                în mână.
              </em>
            </h2>
            <p>
              La final, fotografiile devin și un lookbook fizic și digital,
              construit în identitatea salonului.
            </p>
            <ul className="editorial-contents">
              <li>Dress Spotlight</li>
              <li>Details & Texture</li>
              <li>Brand Story</li>
              <li>Call to Appointment</li>
            </ul>
            <div className="editorial-options">
              {packages.map((p) => (
                <div key={p.id}>
                  <span>{p.name}</span>
                  <span>
                    {p.pages} pagini / {p.copies}{" "}
                    {p.copies === 1 ? "exemplar" : "exemplare"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
