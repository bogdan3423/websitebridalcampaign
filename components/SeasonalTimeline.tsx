import { SectionLabel } from "./SectionLabel";

const deliverables = [
  {
    title: "Fotografie editorială",
    copy: "Fotografiem modelele și rochiile: cadre principale, full-body, spate, trenă, corset, material și detalii.",
  },
  {
    title: "Reels & video",
    copy: "Filmăm rochiile în mișcare și producem Reels de prezentare, educaționale, comparison, trend, CTA și BTS.",
  },
  {
    title: "Postări & design",
    copy: "Selectăm imaginile, scriem textele și construim postări, carusele și Stories cu o direcție vizuală coerentă.",
  },
  {
    title: "Revista salonului",
    copy: "Punem fotografiile într-un editorial al salonului: copertă, rochii, detalii, povestea brandului și invitație la programare.",
  },
] as const;

export function SeasonalTimeline() {
  return (
    <section id="rezumat-campanie" className="campaign-summary section-shell" aria-labelledby="campaign-summary-title">
      <SectionLabel number="01">Campania, pe scurt</SectionLabel>
      <div className="campaign-summary-head">
        <h2 id="campaign-summary-title">
          Fotografii, Reels, postări
          <br />
          <em>și revista salonului.</em>
        </h2>
        <div className="campaign-summary-intro">
          <p>
            Organizăm producția și transformăm materialele într-un sistem complet
            de conținut pentru salon.
          </p>
          <p>De la shooting până la design, texte, publicare și editorialul final.</p>
        </div>
      </div>
      <ol className="campaign-summary-grid" aria-label="Livrabilele campaniei">
        {deliverables.map((deliverable, index) => (
          <li key={deliverable.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{deliverable.title}</h3>
            <p>{deliverable.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
