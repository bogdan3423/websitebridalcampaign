import { PackageCTA } from "./PackageCTA";
import { packages, formatPrice, type Package } from "@/data/packages";

const included = [
  "Ideea și planul zilei",
  "Model, machiaj și coafură",
  "Fotografiere și filmare",
  "Selectarea și prelucrarea materialelor",
  "Textele pentru postări",
  "Planificarea și publicarea postărilor",
];

function PackageSection({ item }: { item: Package }) {
  return (
    <article
      id={item.id}
      className={`package${item.recommended ? " package-recommended" : ""}`}
    >
      <div className="package-topline">
        <span>Pachetul {item.name}</span>
        {item.recommended && <strong>Cel mai ales</strong>}
      </div>
      <h3>{item.name}</h3>
      <p className="package-description">{item.description}</p>
      <p className="package-price">
        <strong>{formatPrice(item.price)}</strong>
        <span>lei</span>
      </p>
      <PackageCTA
        id={item.id}
        name={item.name}
        recommended={item.recommended}
      />

      <dl className="package-features">
        <div className="feature-main">
          <dt>În ziua realizării</dt>
          <dd>
            <strong>{item.dresses}</strong>
            <span>{item.models}</span>
            <span>{item.location}</span>
            <small>{item.production}</small>
          </dd>
        </div>
        <div>
          <dt>Fotografii finale</dt>
          <dd>
            <strong>{item.photos}</strong>
            <small>{item.photoNote}</small>
          </dd>
        </div>
        <div>
          <dt>Filme scurte verticale</dt>
          <dd>
            <strong>{item.reels}</strong>
            <small>pregătite pentru rețelele sociale</small>
          </dd>
        </div>
        <div>
          <dt>Film principal</dt>
          <dd>{item.heroes}</dd>
        </div>
        <div>
          <dt>Postări pregătite</dt>
          <dd>
            <strong>{item.posts}</strong>
            <small>{item.content}</small>
          </dd>
        </div>
        <div>
          <dt>Zile cu postări temporare</dt>
          <dd>
            <strong>{item.stories}</strong>
          </dd>
        </div>
        <div>
          <dt>{item.editorialName}</dt>
          <dd>
            <strong>{item.pages} pagini</strong>
            <small>
              variantă digitală + {item.copies}{" "}
              {item.copies === 1 ? "exemplar tipărit" : "exemplare tipărite"}
            </small>
          </dd>
        </div>
      </dl>
    </article>
  );
}

export function Pricing() {
  return (
    <section id="pachete" className="pricing-section">
      <div className="section-heading">
        <p className="eyebrow">PACHETE ȘI PREȚURI</p>
        <h2>
          Alege cât de mult vrei
          <br />
          <em>să pregătim pentru salon.</em>
        </h2>
        <p>
          Diferența dintre pachete este cantitatea. Grija pentru imagine și
          calitatea realizării rămân aceleași.
        </p>
      </div>

      <div className="included-strip">
        <h3>În toate pachetele sunt incluse:</h3>
        <ul>
          {included.map((item) => (
            <li key={item}>
              <span aria-hidden="true">✓</span> {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="pricing-grid">
        {packages.map((item) => (
          <PackageSection key={item.id} item={item} />
        ))}
      </div>
      <p className="pricing-note">
        *Locația din pachetul Complet este inclusă în limita bugetului obișnuit.
        Spațiile cu taxe speciale se calculează separat și se aprobă înainte.
      </p>
    </section>
  );
}

