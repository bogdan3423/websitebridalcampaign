import { SectionLabel } from "./SectionLabel";
const steps = [
  [
    "Alegem rochiile",
    "Selectăm 3–5 modele pe care salonul vrea să le promoveze.",
  ],
  [
    "Facem conceptul",
    "Moodboard, scripturi, model, beauty look și plan de content.",
  ],
  ["Producem", "Foto + marketing video + BTS."],
  ["Edităm", "Retuș, montaj, hooks, captions și CTA-uri."],
  ["Publicăm", "Calendar de content, posting și Stories."],
  [
    "Refolosim",
    "Materialele pot fi utilizate ulterior pe website și în reclame, conform drepturilor agreate.",
  ],
];
export function Process() {
  return (
    <section id="proces" className="section process-section">
      <SectionLabel number="08">
        Simplu, de la început până la final
      </SectionLabel>
      <h2>
        De la rochii pe umeraș
        <br />
        <em>la o lună de marketing.</em>
      </h2>
      <ol className="process-grid">
        {steps.map(([title, text], i) => (
          <li key={title}>
            <span className="display">0{i + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="process-statement display">
        Salonul are un singur punct de contact.
        <br />
        <em>Noi coordonăm tot.</em>
      </p>
    </section>
  );
}
