import { ArrowIcon } from "@/components/ArrowIcon";
import { whatsappUrl } from "@/data/site";
import { photoStory, videoStory } from "@/data/storytelling";
import { EditorialStory } from "./EditorialStory";
import { SocialStory } from "./SocialStory";
import { StoryChapter } from "./StoryChapter";

export function Storytelling() {
  return (
    <div className="storytelling" id="servicii">
      <section className="storytelling-intro section-shell" aria-labelledby="storytelling-title">
        <p className="eyebrow">Campanie completă</p>
        <h2 id="storytelling-title">Tu alegi rochiile.<br /><em>Noi ne ocupăm de restul.</em></h2>
        <p>Venim cu echipa, facem fotografiile și video-urile, construim postările, publicăm și putem transforma imaginile într-un editorial al salonului.</p>
        <div className="storytelling-path" aria-label="Etapele campaniei"><span>01 Photo</span><span>02 Video</span><span>03 Social</span><span>04 Editorial</span></div>
      </section>

      <StoryChapter chapter={photoStory} />
      <StoryChapter chapter={videoStory} />
      <SocialStory />
      <EditorialStory />

      <section className="story-cta section-shell" aria-labelledby="story-cta-title">
        <div>
          <p className="eyebrow">Campania salonului tău</p>
          <h2 id="story-cta-title">Tu alegi rochiile.<br /><em>Noi construim campania.</em></h2>
        </div>
        <div className="story-cta-copy">
          <p>Spune-ne ce vrei să promovezi și îți arătăm cum am construi producția pentru salonul tău.</p>
          <div className="story-cta-actions"><a className="button button-dark" href="#contact">Discutăm 10 minute <ArrowIcon /></a><a className="text-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Scrie-ne pe WhatsApp <ArrowIcon /></a></div>
          <small>Vedem colecția, ce vrei să promovezi și dacă are sens să lucrăm împreună.</small>
        </div>
      </section>
    </div>
  );
}
