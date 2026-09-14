import Image from "next/image";
import { gallery } from "@/data/gallery";

const proofPoints = [
  "Un singur punct de contact",
  "Planul zilei stabilit înainte",
  "Echipa coordonată de noi",
  "Materiale pregătite pentru folosire",
];

const photoDetails = [
  "Rochia întreagă: față, spate și lateral",
  "Croială, dantelă, trenă, corset și texturi",
  "Portrete și cadre care transmit atmosfera colecției",
  "Selecție atentă și prelucrare finală",
];

const videoDetails = [
  "Rochia prezentată în mișcare",
  "Detalii văzute de aproape",
  "Sfaturi oferite de consultantul salonului",
  "Filme care invită mireasa la programarea unei probe",
];

const promotionDetails = [
  "Alegem materialele potrivite pentru fiecare zi",
  "Scriem textele într-un limbaj potrivit salonului",
  "Pregătim ordinea și calendarul postărilor",
  "Publicăm materialele conform planului stabilit",
];

const catalogDetails = [
  "Între 8 și 20 de pagini, în funcție de pachet",
  "Variantă digitală, ușor de trimis clientelor",
  "Exemplare tipărite pentru prezentarea din salon",
  "Aspect adaptat identității salonului",
];

export function Services() {
  return (
    <section id="servicii" className="services-section">
      <header className="services-intro">
        <p className="eyebrow">CE REALIZĂM</p>
        <h2>
          Fiecare rochie primește
          <br />
          <em>atenția pe care o merită.</em>
        </h2>
        <p>
          Nu venim doar să facem câteva fotografii. Pregătim fiecare etapă,
          coordonăm oamenii implicați și transformăm colecția într-un sistem
          complet de prezentare.
        </p>
      </header>

      <ul className="proof-points" aria-label="Cum asigurăm o realizare profesionistă">
        {proofPoints.map((point, index) => (
          <li key={point}>
            <span>0{index + 1}</span>
            {point}
          </li>
        ))}
      </ul>

      <article className="service-story photography-story">
        <div className="service-copy">
          <p className="service-index">01 / FOTOGRAFIERE</p>
          <h3>
            O imagine completă
            <br />
            <em>a fiecărei rochii.</em>
          </h3>
          <p>
            Construim o serie coerentă de imagini care arată atât forma rochiei,
            cât și detaliile care o fac specială. Fotografiile sunt gândite
            pentru site, rețele sociale și materiale tipărite.
          </p>
          <ul>
            {photoDetails.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="portfolio-area">
          <div className="portfolio-heading">
            <p>Exemple de direcție vizuală</p>
            <span>06 imagini</span>
          </div>
          <div className="portfolio-gallery">
            {gallery.slice(0, 6).map((photo, index) => (
              <figure
                className={`portfolio-image portfolio-image-${index + 1}`}
                key={photo.src}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 800px) 50vw, 30vw"
                />
                <figcaption>{photo.label.replace("&", "și")}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </article>

      <article className="service-story video-story">
        <figure className="service-visual">
          <Image
            src={gallery[6].src}
            alt={gallery[6].alt}
            fill
            sizes="(max-width: 800px) 100vw, 43vw"
          />
          <figcaption>Rochia în mișcare și detaliile ei</figcaption>
        </figure>
        <div className="service-copy">
          <p className="service-index">02 / FILMARE</p>
          <h3>
            Filme scurte,
            <br />
            <em>fiecare cu un scop.</em>
          </h3>
          <p>
            Nu repetăm același cadru de mai multe ori. Pregătim tipuri diferite
            de filme, astfel încât salonul să poată prezenta, explica și invita
            viitoarea mireasă la probă.
          </p>
          <ul>
            {videoDetails.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      </article>

      <article className="service-story promotion-story">
        <div className="service-copy">
          <p className="service-index">03 / PREGĂTIREA POSTĂRILOR</p>
          <h3>
            Materialele devin
            <br />
            <em>un plan clar.</em>
          </h3>
          <p>
            Salonul nu primește un folder pe care trebuie să îl organizeze
            singur. Transformăm fotografiile și filmele într-o prezență
            consecventă, ușor de urmărit.
          </p>
          <ul>
            {promotionDetails.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
        <div className="promotion-numbers" aria-label="Cantități disponibile în pachete">
          <div>
            <strong>30–45</strong>
            <span>zile cu materiale pregătite</span>
          </div>
          <div>
            <strong>8–16</strong>
            <span>postări complete</span>
          </div>
          <div>
            <strong>10–20</strong>
            <span>filme scurte verticale</span>
          </div>
        </div>
      </article>

      <article className="service-story catalog-story">
        <figure className="service-visual">
          <Image
            src={gallery[4].src}
            alt={gallery[4].alt}
            fill
            sizes="(max-width: 800px) 100vw, 43vw"
          />
          <figcaption>Fotografiile colecției, într-un material unitar</figcaption>
        </figure>
        <div className="service-copy">
          <p className="service-index">04 / CATALOGUL COLECȚIEI</p>
          <h3>
            Un material pe care
            <br />
            <em>mireasa îl poate păstra.</em>
          </h3>
          <p>
            Cele mai bune fotografii sunt așezate într-un catalog elegant,
            disponibil atât digital, cât și tipărit pentru prezentarea din
            salon.
          </p>
          <ul>
            {catalogDetails.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}

