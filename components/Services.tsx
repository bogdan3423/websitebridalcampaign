import { SectionLabel } from "./SectionLabel";
const services = [
  [
    "Foto editorial",
    "Hero shots, full-body, close-up, spatele rochiei, trenă, material, corset și detalii.",
  ],
  [
    "Marketing video",
    "Reels gândite pentru vizibilitate, interacțiune, educare și programări.",
  ],
  [
    "Social media",
    "Carusele, close-ups, Reels, captions, CTA-uri, posting și Stories zilnice.",
  ],
  [
    "Bridal editorial",
    "Lookbook / revistă fizică și digitală personalizată cu identitatea salonului.",
  ],
];
export function Services() {
  return (
    <section id="servicii" className="section services">
      <SectionLabel number="02">De la colecție la campanie</SectionLabel>
      <h2>
        O campanie.
        <br />
        <em>Nu doar niște poze.</em>
      </h2>
      <div className="service-list">
        {services.map(([title, text], index) => (
          <div className="service-row" key={title}>
            <span className="service-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <span aria-hidden="true" className="service-arrow">
              ↗
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
