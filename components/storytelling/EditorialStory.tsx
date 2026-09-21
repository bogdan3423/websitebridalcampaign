"use client";

import Image from "next/image";
import { gallery } from "@/data/gallery";
import { editorialSteps } from "@/data/storytelling";
import { useStoryProgress } from "./useStoryProgress";

export function EditorialStory() {
  const { rootRef, active } = useStoryProgress();
  const visualState = active < 2 ? "cover" : active < 4 ? "spread" : "details";

  return (
    <section
      ref={rootRef}
      id="editorial"
      className="story-chapter story-chapter--editorial editorial-story"
      aria-labelledby="editorial-story-title"
    >
      <div className="section-shell">
        <header className="story-chapter-header">
          <div className="story-chapter-label"><span aria-hidden="true">04</span><p>Bridal editorial</p></div>
          <div>
            <h2 id="editorial-story-title">Iar imaginile nu dispar<br /><em>după Instagram.</em></h2>
            <p>Le transformăm într-un editorial al salonului tău.</p>
          </div>
        </header>

        <div className="story-layout editorial-story-layout">
          <div className="story-visual-shell editorial-reveal-shell">
            <div className="editorial-reveal" data-state={visualState}>
              <div className="editorial-cover">
                <div className="editorial-cover-head"><span>THE BRIDAL</span><em>EDIT</em><small>COLLECTION</small></div>
                <div className="editorial-cover-photo"><Image src={gallery[4].src} alt="Concept de copertă pentru un editorial bridal" fill sizes="(max-width: 900px) 72vw, 34vw" /></div>
                <div className="editorial-cover-foot"><span>LOOKBOOK</span><span>No. 01</span></div>
              </div>
              <div className="editorial-spread">
                <div className="editorial-page editorial-page--photo"><Image src={gallery[3].src} alt="Rochie de mireasă prezentată într-un spread editorial" fill sizes="(max-width: 900px) 44vw, 20vw" /><span>DRESS<br />SPOTLIGHT</span></div>
                <div className="editorial-page editorial-page--copy"><small>THE COLLECTION</small><h3>Detalii care merită văzute de aproape.</h3><div className="editorial-detail-photo"><Image src={gallery[1].src} alt="Detaliu al unei rochii de mireasă într-un lookbook" fill sizes="(max-width: 900px) 38vw, 18vw" /></div><p>Material · Corset · Trenă</p></div>
              </div>
            </div>
          </div>

          <div className="story-steps">
            <p className="editorial-story-intro">O selecție din fotografii poate deveni un lookbook fizic și digital, construit în identitatea salonului.</p>
            {editorialSteps.map(([title, copy], index) => (
              <article className="story-step" data-story-step data-index={index} data-active={index === active ? "true" : "false"} key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
            <div className="story-closing"><p>Formatul editorialului este stabilit în funcție de colecție.</p><strong>Fizic și digital, în identitatea salonului.</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}
