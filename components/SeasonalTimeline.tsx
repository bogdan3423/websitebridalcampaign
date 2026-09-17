import { SectionLabel } from "./SectionLabel";
const months = [
  ["Septembrie", "Pregătim"],
  ["Octombrie", "Producem"],
  ["Noiembrie", "Lansăm"],
  ["Decembrie", "Construim vizibilitate"],
  ["Ianuarie", "Transformăm interesul în programări"],
];
export function SeasonalTimeline() {
  return (
    <section id="sezon" className="seasonal section-shell">
      <SectionLabel number="01">Momentul potrivit</SectionLabel>
      <div className="split-heading">
        <h2>
          Sezonul nunților
          <br />
          se încheie.
          <br />
          <em>
            Sezonul deciziilor
            <br />
            începe.
          </em>
        </h2>
        <div className="season-copy">
          <p>
            În toamnă pregătim imaginea și conținutul salonului pentru perioada în
            care viitoarele mirese încep să caute, să salveze și să compare
            rochii.
          </p>
          <p>Când interesul crește, conținutul trebuie să fie deja online.</p>
        </div>
      </div>
      <ol className="timeline">
        {months.map(([month, text]) => (
          <li key={month}>
            <span className="timeline-dot" />
            <h3>{month}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
