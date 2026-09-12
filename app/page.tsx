import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SeasonalTimeline } from "@/components/SeasonalTimeline";
import { Services } from "@/components/Services";
import { VideoFormats } from "@/components/VideoFormats";
import { EditorialGallery } from "@/components/EditorialGallery";
import { SocialMediaSystem } from "@/components/SocialMediaSystem";
import { Pricing } from "@/components/Pricing";
import { BridalEditorial } from "@/components/BridalEditorial";
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
      "Campanii de fotografie editorială, Reels și social media pentru saloane de rochii de mireasă.",
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
        <Services />
        <VideoFormats />
        <EditorialGallery />
        <SocialMediaSystem />
        <Pricing />
        <BridalEditorial />
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
        WhatsApp <span aria-hidden="true">↗</span>
      </a>
    </>
  );
}
