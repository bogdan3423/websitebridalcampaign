import { SectionLabel } from "./SectionLabel";
const months = [
  ["Septembrie", "Pregătim colecția"],
  ["Octombrie", "Foto + video"],
  ["Noiembrie", "Lansăm conținutul"],
  ["Decembrie", "Construim vizibilitate"],
  ["Ianuarie", "Transformăm interesul în programări"],
];
export function SeasonalTimeline() {
  return (
    <section id="sezon" className="section seasonal">
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
            În septembrie și toamnă pregătim imaginea salonului pentru lunile în
            care viitoarele mirese încep să caute, să salveze și să compare
            rochii.
          </p>
          <p>Când interesul crește, conținutul trebuie să fie deja online.</p>
          <span className="season-year">TOAMNĂ — IARNĂ / 2026–27</span>
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
      <p className="season-statement display">
        Nu așteptăm sezonul.
        <br />
        <em>Pregătim terenul înainte să înceapă.</em>
      </p>
    </section>
  );
}
