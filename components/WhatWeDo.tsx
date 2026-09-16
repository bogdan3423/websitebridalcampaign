import Image from "next/image";
import { gallery } from "@/data/gallery";

const services = [
  {
    number: "01",
    eyebrow: "Foto editorial",
    title: "Fotografiem rochia din toate unghiurile care contează.",
    text: "Construim cadre premium pentru social media, website și campanii: imagini principale, cadre întregi, spatele rochiei, trenă, corset, material și detalii.",
    note: "Imagine principală · Cadru întreg · Trenă · Detalii",
  },
  {
    number: "02",
    eyebrow: "Marketing video",
    title: "Filmăm videoclipuri scurte, fiecare cu un rol clar.",
    text: "Actorul, consultantul sau proprietarul salonului prezintă. Modelul arată rochia în mișcare. Noi filmăm formatele care explică, inspiră și conduc către programarea unei probe.",
  },
  {
    number: "03",
    eyebrow: "Social media",
    title: "Transformăm producția într-un ritm real de promovare.",
    text: "Pregătim videoclipuri scurte, carusele, cadre de detaliu, postări temporare, texte și îndemnuri clare. Materialele nu rămân într-un folder.",
  },
  {
    number: "04",
    eyebrow: "Bridal editorial",
    title: "Dăm colecției o formă pe care mireasa o poate răsfoi.",
    text: "Selecția de fotografii devine un material editorial fizic și digital, construit în identitatea salonului și în jurul colecției promovate.",
  },
] as const;

export function WhatWeDo() {
  return (
    <section id="servicii" className="what-we-do section-shell" aria-labelledby="what-we-do-title">
      <div className="what-we-do-intro">
        <p className="eyebrow">Campanie completă</p>
        <h2 id="what-we-do-title">O campanie.<br /><em>Nu doar niște poze.</em></h2>
        <p>Ne ocupăm cap-coadă de imaginea colecției: concept, echipă, producție foto-video, materiale pentru social media și editorial.</p>
        <span>Salonul are un singur punct de contact. Noi coordonăm întreaga producție.</span>
      </div>

      <div className="what-we-do-grid">
        {services.map((service, index) => (
          <article className={`what-we-do-card${index === 0 ? " what-we-do-card-featured" : ""}`} key={service.number}>
            {index === 0 && (
              <div className="what-we-do-video" aria-hidden="true">
                <Image src={gallery[3].src} alt="" fill sizes="(max-width: 800px) 90vw, 30vw" />
                <small>Fotografie editorială</small>
              </div>
            )}
            <div className="what-we-do-card-copy">
              <span className="what-we-do-number">{service.number}</span>
              <span className="what-we-do-eyebrow">{service.eyebrow}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              {"note" in service && <small>{service.note}</small>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
