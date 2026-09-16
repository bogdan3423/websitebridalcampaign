import { ArrowIcon } from "./ArrowIcon";
import Image from "next/image";
import { heroImage, gallery } from "@/data/gallery";
import { formatPrice, packages } from "@/data/packages";
import { HeroParallax } from "./HeroParallax";
export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <HeroParallax>
      <figure className="hero-visual"><div className="hero-photo"><Image src={heroImage.src} alt={heroImage.alt} fill sizes="(max-width: 650px) 100vw, 58vw" loading="eager" fetchPriority="high" /></div></figure>
      <figure className="hero-detail"><div className="hero-photo"><Image src={gallery[2].src} alt={gallery[2].alt} fill sizes="42vw" loading="eager" /></div></figure>
      <div className="hero-title"><h1 id="hero-title">La prima<br /><em>privire.</em></h1></div>
    </HeroParallax>
    <div className="hero-copy">
      <p className="hero-promise">O campanie pentru colecția ta.<br />Foto, video și postări pentru saloane de mirese.</p>
      <div className="hero-offer"><p className="hero-starting-price">De la {formatPrice(packages[0].price)} lei · Echipa inclusă</p><a href="#pachete" className="text-link">Vezi pachetele <ArrowIcon /></a></div>
    </div>
  </section>;
}
