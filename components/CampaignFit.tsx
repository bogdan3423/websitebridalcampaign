import { ArrowIcon } from "./ArrowIcon";

const criteria = [
  ["Numărul de rochii", "Selectăm modelele pe care vrei să le pui în față."],
  ["Tipul de conținut", "Stabilim mixul potrivit de fotografie, video, postări temporare și postări statice."],
  ["Direcția vizuală", "Alegem între studio editorial și producție într-o locație potrivită colecției."],
  ["Perioada de promovare", "Construim suficiente materiale pentru ritmul de comunicare al salonului."],
] as const;

export function CampaignFit() {
  return (
    <section className="campaign-fit section-shell" aria-labelledby="campaign-fit-title">
      <div className="campaign-fit-heading">
        <p className="eyebrow">Construit în jurul colecției</p>
        <h2 id="campaign-fit-title">Fiecare salon are o colecție diferită.</h2>
        <p>Pornim de la rochiile pe care vrei să le promovezi și construim în jurul lor campania potrivită.</p>
      </div>
      <div className="campaign-fit-details">
        {criteria.map(([title, copy], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></div>)}
      </div>
      <div className="campaign-fit-cta">
        <p>După o discuție scurtă îți recomandăm varianta potrivită pentru colecția ta.</p>
        <a href="#contact" className="button button-dark">Discutăm 10 minute <ArrowIcon /></a>
      </div>
    </section>
  );
}
