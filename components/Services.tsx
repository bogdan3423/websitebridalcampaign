import { PortfolioGallery } from "./PortfolioGallery";
import { CampaignSamples } from "./CampaignSamples";
export function Services() {
  return <section id="servicii" className="showcase section-shell">
    <div className="portfolio-intro"><h2>Din portofoliu.</h2></div>
    <PortfolioGallery />
    <CampaignSamples />
  </section>;
}
