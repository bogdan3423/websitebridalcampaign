import { PortfolioGallery } from "./PortfolioGallery";
import { CampaignSamples } from "./CampaignSamples";
export function Services() {
  return <section id="galerie" className="showcase section-shell">
    <div className="portfolio-intro"><h2>Când rochia devine imagine.</h2><p>Construim cadre pentru postări, website, reclame și materiale editoriale.</p></div>
    <PortfolioGallery />
    <CampaignSamples />
  </section>;
}
