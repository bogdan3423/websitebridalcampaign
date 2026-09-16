import { ArrowIcon } from "./ArrowIcon";
import Image from "next/image";
import { gallery, feedImages } from "@/data/gallery";
import { site } from "@/data/site";
import { SectionLabel } from "./SectionLabel";
export function SocialMediaSystem() {
  return (
    <section className="social-section">
      <div className="section">
        <SectionLabel number="05">Social media, cu continuitate</SectionLabel>
        <div className="social-layout">
          <div className="social-copy">
            <h2>
              Conținutul nu
              <br />
              rămâne într-un
              <br />
              <em>folder.</em>
            </h2>
            <p className="social-intro">
              Îl transformăm într-o lună de prezență online.
            </p>
            <p>
              Instagram. Facebook. TikTok, unde este relevant. O imagine
              coerentă a salonului, de la prima postare până la invitația la
              probă.
            </p>
            <div className="social-deliverables">
              {[
                "Carusele & close-up posts",
                "Dress spotlight & Reels",
                "Stories zilnice",
                "Captions & CTA-uri",
                "Programare & publicare",
                "Cross-posting",
              ].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
            <p className="social-days display">
              30{" "}
              <span>
                ZILE
                <br />
                DE PREZENȚĂ
              </span>
            </p>
            <p className="fine-print">
              Community management extins și răspunsurile la DM-uri nu sunt
              incluse.
            </p>
          </div>
          <div className="feed-preview">
            <div className="feed-heading">
              <span className="eyebrow">SHOWROOM-UL TĂU DIGITAL</span>
              <ArrowIcon />
            </div>
            <div className="feed-grid">
              {feedImages.map((index, i) => (
                <div key={i} className="feed-post">
                  <Image
                    src={gallery[index].src}
                    alt={`Exemplu de postare bridal: ${gallery[index].alt}`}
                    fill
                    sizes="(max-width: 767px) 28vw, 17vw"
                  />
                  {i === 4 && (
                    <span className="feed-wordmark">
                      The
                      <br />
                      <em>bridal</em>
                      <br />
                      edit.
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="feed-caption">
              <span>CONCEPT DE FEED</span>
              <span>{site.name}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
