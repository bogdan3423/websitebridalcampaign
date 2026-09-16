import { PortfolioGallery } from "./PortfolioGallery";
import { CampaignSamples } from "./CampaignSamples";
export function Services() {
  return <section id="servicii" className="showcase section-shell">
    <div className="portfolio-intro"><h2>Dintr-o altă perspectivă.</h2><p>O selecție din portofoliu</p></div>
    <PortfolioGallery />
    <CampaignSamples />
  </section>;
}
