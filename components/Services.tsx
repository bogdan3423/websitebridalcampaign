import { PortfolioGallery } from "./PortfolioGallery";
import { CampaignSamples } from "./CampaignSamples";
export function Services() {
  return <section id="servicii" className="showcase section-shell">
    <PortfolioGallery />
    <CampaignSamples />
  </section>;
}
