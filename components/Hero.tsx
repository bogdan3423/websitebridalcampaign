import { ArrowIcon } from "./ArrowIcon";
import Image from "next/image";
import { heroImage, heroSecondaryImage } from "@/data/gallery";
import { HeroParallax } from "./HeroParallax";
export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <HeroParallax>
      <figure className="hero-visual">
        <div className="hero-photo">
          <Image className="hero-mobile-primary" src={heroImage.src} alt={heroImage.alt} fill sizes="(max-width: 650px) 100vw, 58vw" loading="eager" fetchPriority="high" />
          <span className="hero-primary-darklayer" aria-hidden="true" />
        </div>
      </figure>
      <figure className="hero-detail"><div className="hero-photo"><Image src={heroSecondaryImage.src} alt={heroSecondaryImage.alt} fill sizes="42vw" loading="eager" /></div></figure>
      <div className="hero-title">
        <div>
          <p className="hero-kicker">Bridal Growth Campaigns</p>
          <h1 id="hero-title">Transformăm colecția ta bridal<br />{" "}în conținut care aduce mirese <em>în <span className="hero-showroom">showroom.</span></em></h1>
        </div>
      </div>
    </HeroParallax>
    <div className="hero-copy">
      <p className="hero-promise">Foto editorial. Marketing video. Social media. Construim campania, producem conținutul și îl transformăm într-o prezență constantă online.</p>
      <div className="hero-actions"><a href="#contact" className="button button-dark">Discutăm 10 minute <ArrowIcon /></a><a href="#proces" className="text-link">Vezi cum lucrăm <ArrowIcon /></a></div>
    </div>
  </section>;
}
