import Image from "next/image";
import { reelFormats, packages } from "@/data/packages";
import { gallery } from "@/data/gallery";
import { SectionLabel } from "./SectionLabel";
export function VideoFormats() {
  return (
    <section className="video-section">
      <div className="section">
        <SectionLabel number="03" light>
          Marketing video
        </SectionLabel>
        <div className="video-heading">
          <h2>
            Reels de toate felurile.
            <br />
            <em>Fiecare are un rol.</em>
          </h2>
          <p>
            Nu filmăm 10–20 de clipuri identice cu modelul mergând în rochie.
            Construim un mix de conținut care prezintă, explică, creează dorință
            și conduce către programarea unei probe.
          </p>
        </div>
        <div className="video-layout">
          <div className="video-art">
            <div className="reel-image reel-image-back">
              <Image
                src={gallery[1].src}
                alt={gallery[1].alt}
                fill
                sizes="(max-width: 767px) 45vw, 22vw"
              />
              <span>02 / DETAIL</span>
            </div>
            <div className="reel-image reel-image-front">
              <Image
                src={gallery[5].src}
                alt={gallery[5].alt}
                fill
                sizes="(max-width: 767px) 50vw, 24vw"
              />
              <span>01 / MODEL + ROCHIE</span>
            </div>
            <p className="eyebrow">
              FOTO DE REFERINȚĂ · FORMATE VERTICALE 9:16
            </p>
          </div>
          <div className="format-list">
            {reelFormats.map(([title, text], i) => (
              <div key={title} className="format-item">
                <span className="format-no">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="reel-count">
          <span className="display">
            {packages.map((p) => p.reels).join(" / ")}
          </span>
          <div>
            <span className="eyebrow">REELS</span>
            <p>
              Trei pachete.
              <br />
              Un mix gândit pentru salonul tău.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
