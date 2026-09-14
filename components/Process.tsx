const steps = [
  [
    "Alegem împreună",
    "Ne spui ce colecție vrei să promovezi, iar noi recomandăm pachetul potrivit.",
  ],
  [
    "Realizăm totul într-o zi",
    "Coordonăm modelul, machiajul, coafura, locația, fotografierea și filmarea.",
  ],
  [
    "Primești materialele pregătite",
    "Prelucrăm fotografiile și filmele, scriem textele și pregătim publicarea.",
  ],
];

export function Process() {
  return (
    <section id="proces" className="process-section">
      <div className="process-heading">
        <p className="eyebrow">CUM LUCRĂM</p>
        <h2>
          Simplu, de la colecție
          <br />
          <em>la promovare.</em>
        </h2>
      </div>
      <ol className="process-grid">
        {steps.map(([title, text], index) => (
          <li key={title}>
            <span className="process-number">0{index + 1}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

