import { ArrowIcon } from "@/components/ArrowIcon";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SeasonalTimeline } from "@/components/SeasonalTimeline";
import { Storytelling } from "@/components/storytelling/Storytelling";
import { Services } from "@/components/Services";
import { CampaignFit } from "@/components/CampaignFit";
import { Process } from "@/components/Process";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: `${site.url}/`,
        logo: `${site.url}/icon.svg`,
        description:
          "Studio de content și marketing pentru saloane de rochii de mireasă din România.",
        telephone: `+${site.whatsapp}`,
        email: site.email,
        areaServed: [
          { "@type": "City", name: "Cluj-Napoca" },
          { "@type": "Country", name: "România" },
        ],
        ...(site.instagram ? { sameAs: [site.instagram] } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: `${site.url}/`,
        inLanguage: "ro-RO",
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "Service",
        "@id": `${site.url}/#service`,
        name: "Content și marketing pentru saloane de rochii de mireasă",
        description:
          "Campanii de content pentru saloane bridal: fotografie editorială, Reels, social media și bridal lookbook.",
        serviceType: [
          "Fotografie editorială bridal",
          "Marketing video și Reels",
          "Social media pentru saloane bridal",
          "Bridal lookbook",
        ],
        provider: { "@id": `${site.url}/#organization` },
        areaServed: [
          { "@type": "City", name: "Cluj-Napoca" },
          { "@type": "Country", name: "România" },
        ],
      },
    ],
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
        <Storytelling />
        <Services />
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
