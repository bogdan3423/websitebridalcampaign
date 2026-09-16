import { ArrowIcon } from "./ArrowIcon";
import { PackageCTA } from "./PackageCTA";
import { packages, formatPrice } from "@/data/packages";
const rows = [
  { label: "Actor pentru prezentare", values: packages.map(() => "Inclus") },
  { label: "Model", values: packages.map((p) => p.models) },
  { label: "Producție", values: packages.map((p) => p.production) },
  { label: "Fotografii", values: packages.map((p) => p.photos + " · " + p.photoNote) },
  { label: "Filme principale", values: packages.map((p) => p.heroes) },
  { label: "Postări", values: packages.map((p) => p.posts + " · " + p.content) },
  { label: "Zile cu postări temporare", values: packages.map((p) => p.stories) },
  { label: "Catalog", values: packages.map((p) => p.pages + " pagini") },
  { label: "Exemplare tipărite", values: packages.map((p) => p.copies) },
];
export function Pricing() {
  return <section id="pachete" className="pricing-section section-shell">
    <div className="section-heading"><h2>Alege pachetul.</h2><p className="pricing-included">Fiecare pachet include actor, model, machiaj, coafură, fotografii, videoclipuri scurte, catalog tipărit și materiale pentru publicare.</p></div>
    <div className="pricing-grid">{packages.map((item) => <article id={item.id} key={item.id} className={"package" + (item.recommended ? " package-recommended" : "")}>
      <div className="package-topline"><h3>{item.name}</h3>{item.recommended && <span>Recomandat</span>}</div>
      <p className="package-price"><strong>{formatPrice(item.price)}</strong> <span>lei</span></p>
      <p className="package-setting"><strong>{item.dresses}</strong><span aria-describedby={item.location.endsWith("*") ? "location-note" : undefined}>{item.location.replace(/\*$/, "")}{item.location.endsWith("*") && <sup>*</sup>}</span></p>
      <dl className="package-deliverables">
        <div><dt>Fotografii editate</dt><dd>{item.photos}</dd></div>
        <div><dt>Videoclipuri scurte</dt><dd>{item.reels}</dd></div>
        <div><dt>Actor pentru prezentare</dt><dd>Inclus</dd></div>
        <div><dt>Postări</dt><dd>{item.posts}</dd></div>
        <div><dt>Zile cu postări temporare</dt><dd>{item.stories}</dd></div>
        <div><dt>Catalog fizic</dt><dd>{item.copies === 1 ? "1 exemplar" : `${item.copies} exemplare`}</dd></div>
      </dl>
      <PackageCTA id={item.id} name={item.name} recommended={item.recommended} />
    </article>)}</div>
    <p id="location-note" className="pricing-note"><sup>*</sup> Taxele speciale de locație se aprobă separat.</p>
    <details className="package-comparison"><summary>Compară toate detaliile <ArrowIcon direction="down" /></summary><p className="comparison-intro">Toate pachetele includ concept, actor, model, machiaj, coafură, fotografiere, filmare, editare, catalog tipărit și materiale pregătite pentru publicare.</p><div className="comparison-scroll" role="region" aria-label="Comparație detaliată a pachetelor" tabIndex={0}><table><caption>Ce include fiecare pachet</caption><thead><tr><th scope="col">Materiale și producție</th>{packages.map((p) => <th scope="col" key={p.id}>{p.name}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th>{row.values.map((value, i) => <td key={i}>{value}</td>)}</tr>)}</tbody></table></div></details>
    <details id="proces" className="package-comparison"><summary>Cum lucrăm <ArrowIcon direction="down" /></summary><p className="comparison-intro">Alegem rochiile și direcția împreună. Noi coordonăm echipa și ședința foto-video, apoi edităm materialele și pregătim publicarea. Un singur punct de contact, de la idee la calendar.</p></details>
  </section>;
}
