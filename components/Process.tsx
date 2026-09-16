export function Process() {
  return <section id="proces" className="process-section section-shell"><div className="section-heading"><h2>Tu alegi rochiile.<br /><em>Noi legăm totul.</em></h2></div><ol className="process-grid">{[
    ["Stabilim direcția", "Alegem rochiile, locația și planul zilei împreună."],
    ["Coordonăm ședința", "Model, machiaj, coafură, foto și film. Un singur punct de contact."],
    ["Pregătim publicarea", "Selectăm, edităm și așezăm materialele în calendarul salonului."],
  ].map(([title, copy], i) => <li key={title}><span className="process-number">0{i + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></section>;
}
