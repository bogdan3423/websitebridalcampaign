import { ContactForm } from "./ContactForm";

export function FinalCTA() {
  return (
    <section className="final-section">
      <div className="final-heading">
        <p className="eyebrow">URMĂTORUL PAS</p>
        <h2>
          Nu știi ce pachet
          <br />
          <em>se potrivește salonului?</em>
        </h2>
        <p>
          Spune-ne câte rochii vrei să prezinți și ce rezultat urmărești. Îți
          recomandăm direct varianta potrivită.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}

