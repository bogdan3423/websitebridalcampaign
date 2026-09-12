import { heroImage } from "@/data/gallery";
import Image from "next/image";
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">CLUJ-NAPOCA · BRIDAL CONTENT & MARKETING</p>
        <h1 id="hero-title">
          BRIDAL
          <br />
          <span className="italic">GROWTH</span>
          <br />
          CAMPAIGNS<span className="title-dot">.</span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-promise">
            Transformăm colecția ta bridal în conținut care aduce mirese în
            showroom.
          </p>
          <p className="hero-description">
            Foto editorial. Marketing video. Social media.
            <br />O singură producție poate alimenta 30–45 de zile de conținut.
          </p>
          <div className="hero-actions">
            <a href="#pachete" className="button button-dark">
              Vezi pachetele <span aria-hidden="true">↗</span>
            </a>
            <a href="#galerie" className="text-link">
              Vezi galeria <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
      <figure className="hero-visual">
        <div className="hero-photo">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            sizes="(max-width: 767px) 100vw, 49vw"
            loading="eager"
            fetchPriority="high"
          />
          <span className="photo-tag">
            O NOUĂ PERSPECTIVĂ
            <br />
            ASUPRA COLECȚIEI TALE.
          </span>
        </div>
        <figcaption>
          <span>THE BRIDAL PERSPECTIVE</span>
          <span>SEZONUL 2026 / 27</span>
        </figcaption>
      </figure>
      <a className="hero-scroll" href="#sezon">
        <span>IMAGINE. PREZENȚĂ. PROGRAMĂRI.</span>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
