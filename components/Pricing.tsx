import { PackageCTA } from "./PackageCTA";
import { packages, formatPrice, type Package } from "@/data/packages";
import { SectionLabel } from "./SectionLabel";
export function PackageSection({ item }: { item: Package }) {
  return (
    <article
      className={`package${item.recommended ? " package-recommended" : ""}`}
    >
      <div className="package-status">
        {item.recommended ? "RECOMANDAT" : "\u00a0"}
      </div>
      <h3>{item.name}</h3>
      <p className="package-description">{item.description}</p>
      <p className="package-price display">
        {formatPrice(item.price)}
        <span>LEI</span>
      </p>
      <PackageCTA
        id={item.id}
        name={item.name}
        recommended={item.recommended}
      />
      <div className="package-production">
        <strong>
          {item.dresses} <span> / </span> {item.models}
        </strong>
        <span>{item.location}</span>
        <span>Makeup + hair</span>
        <span>Foto + video + BTS</span>
      </div>
      <dl className="package-features">
        <div>
          <dt>Fotografii finale</dt>
          <dd>
            <strong>{item.photos}</strong>
            <small>{item.photoNote}</small>
          </dd>
        </div>
        <div>
          <dt>Reels verticale</dt>
          <dd>
            <strong>{item.reels}</strong>
            <small>Mix de 8 formate video</small>
          </dd>
        </div>
        <div>
          <dt>Hero video</dt>
          <dd>{item.heroes}</dd>
        </div>
        <div>
          <dt>Postări feed</dt>
          <dd>
            <strong>{item.posts}</strong>
            <small>{item.content}</small>
          </dd>
        </div>
        <div>
          <dt>Stories</dt>
          <dd>
            <strong>{item.stories}</strong> zile
          </dd>
        </div>
        <div className="package-editorial">
          <dt>{item.editorialName}</dt>
          <dd>
            <strong>{item.pages}</strong> pagini
            <small>
              PDF digital + {item.copies}{" "}
              {item.copies === 1 ? "exemplar fizic" : "exemplare fizice"}
            </small>
          </dd>
        </div>
      </dl>
      <div className="package-included">
        <p>Captions + CTA-uri</p>
        <p>Programare și publicare</p>
      </div>
      <p className="package-duration">{item.production}</p>
    </article>
  );
}
export function Pricing() {
  return (
    <section id="pachete" className="section pricing-section">
      <SectionLabel number="06">Investiția în colecția ta</SectionLabel>
      <div className="pricing-heading">
        <h2>
          Alege cât de mult vrei
          <br />
          <em>să construim</em> într-o
          <br />
          singură producție.
        </h2>
        <p>
          Trei niveluri de conținut.
          <br />
          Aceeași atenție pentru fiecare rochie.
          <br />
          <span>Prețurile, de la început la vedere.</span>
        </p>
      </div>
      <div className="pricing-grid">
        {packages.map((item) => (
          <PackageSection key={item.id} item={item} />
        ))}
      </div>
      <p className="fine-print pricing-note">
        *Locația premium din pachetul Plus este inclusă în limita bugetului
        standard de producție. Locațiile cu taxe speciale se cotează separat.
      </p>
    </section>
  );
}
