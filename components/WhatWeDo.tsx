import Image from "next/image";
import { gallery } from "@/data/gallery";

const services = [
  {
    number: "01",
    title: "Videoclipuri scurte cu actor",
    text: "Venim cu echipament profesional și un actor care prezintă rochiile, salonul, colecțiile și motivele pentru care o viitoare mireasă să programeze o probă.",
    note: "Filmăm vertical, pregătit pentru rețelele sociale.",
  },
  {
    number: "02",
    title: "Fotografii profesionale",
    text: "Fotografiem rochiile cele mai vândute și piesele pe care vrei să le promovezi, cu atenție la croială, detalii și felul în care arată în mișcare.",
  },
  {
    number: "03",
    title: "Model pregătit de noi",
    text: "Aducem modelul potrivit pentru ședința foto, machiat și coafat. Salonul pregătește rochiile, iar noi coordonăm restul producției.",
  },
  {
    number: "04",
    title: "Catalog fizic",
    text: "Selectăm fotografiile realizate și le așezăm într-un catalog tipărit, pe care clientele îl pot răsfoi direct în salon.",
  },
  {
    number: "05",
    title: "Postări și prezență constantă",
    text: "Pregătim postări temporare constante și postări statice cu un design clar, orientate spre promovare, vânzare și programări la probă.",
  },
] as const;

export function WhatWeDo() {
  return (
    <section id="ce-facem" className="what-we-do section-shell" aria-labelledby="what-we-do-title">
      <div className="what-we-do-intro">
        <p className="eyebrow">Tot ce primește salonul</p>
        <h2 id="what-we-do-title">Ce facem concret?</h2>
        <p>
          O singură echipă pentru tot ce ai nevoie ca să prezinți rochiile mai bine și să rămâi activ în fața viitoarelor mirese.
        </p>
        <span>Toate cele 5 servicii sunt incluse în fiecare pachet.</span>
      </div>

      <div className="what-we-do-grid">
        {services.map((service, index) => (
          <article className={`what-we-do-card${index === 0 ? " what-we-do-card-featured" : ""}`} key={service.number}>
            {index === 0 && (
              <div className="what-we-do-video" aria-hidden="true">
                <Image src={gallery[3].src} alt="" fill sizes="(max-width: 800px) 90vw, 30vw" />
                <span className="video-play">▶</span>
                <small>Format vertical · 9:16</small>
              </div>
            )}
            <div className="what-we-do-card-copy">
              <span className="what-we-do-number">{service.number}</span>
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
