const steps = [
  ["Discutăm", "Înțelegem salonul, colecția și obiectivele."],
  ["Alegem rochiile", "Selectăm modelele care merită promovate."],
  ["Construim conceptul", "Direcție vizuală, scenarii, model și pregătirea completă a echipei."],
  ["Producem", "Fotografii, video și cadre din culise."],
  ["Edităm", "Retuș, montaj, introduceri, texte și îndemnuri la acțiune."],
  ["Publicăm", "Transformăm materialele într-un calendar real de conținut."],
] as const;

export function Process() {
  return (
    <section id="proces" className="process-section section-shell">
      <div className="section-heading">
        <p className="eyebrow">Cum lucrăm</p>
        <h2>De la rochii pe umeraș<br /><em>la o campanie completă.</em></h2>
        <p className="process-promise">Salonul are un singur punct de contact. Noi coordonăm producția cap-coadă.</p>
      </div>
      <ol className="process-grid">
        {steps.map(([title, copy], i) => <li key={title}><span className="process-number">0{i + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}
      </ol>
    </section>
  );
}
