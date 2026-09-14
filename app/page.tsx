import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
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
      "Fotografiere, filmare și pregătirea postărilor pentru saloane de rochii de mireasă.",
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
        <Pricing />
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
