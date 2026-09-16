import { ArrowIcon } from "@/components/ArrowIcon";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SeasonalTimeline } from "@/components/SeasonalTimeline";
import { WhatWeDo } from "@/components/WhatWeDo";
import { VideoFormats } from "@/components/VideoFormats";
import { Services } from "@/components/Services";
import { SocialMediaSystem } from "@/components/SocialMediaSystem";
import { BridalEditorial } from "@/components/BridalEditorial";
import { CampaignFit } from "@/components/CampaignFit";
import { Process } from "@/components/Process";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    telephone: `+${site.whatsapp}`,
    description:
      "Campanii complete de conținut pentru saloane de rochii de mireasă: fotografie editorială, marketing video, social media și editorial bridal.",
    areaServed: { "@type": "City", name: "Cluj-Napoca" },
    ...(site.email ? { email: site.email } : {}),
    ...(site.instagram ? { sameAs: [site.instagram] } : {}),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main id="continut">
        <Hero />
        <SeasonalTimeline />
        <WhatWeDo />
        <VideoFormats />
        <Services />
        <SocialMediaSystem />
        <BridalEditorial />
        <CampaignFit />
        <Process />
        <FinalCTA />
      </main>
      <Footer />
      <a
        className="mobile-whatsapp"
        href={site.whatsapp ? `https://wa.me/${site.whatsapp}` : "#contact"}
        aria-label="Scrie-ne pe WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp <ArrowIcon />
      </a>
    </>
  );
}
