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
      <div className="hero-title">
        <div>
          <p className="hero-kicker">Foto · Video · Promovare</p>
          <h1 id="hero-title">Promovare pentru<br />saloane de <em>rochii de mireasă.</em></h1>
        </div>
      </div>
    </HeroParallax>
    <div className="hero-copy">
      <p className="hero-promise">Venim cu actor, model și echipament profesional. Filmăm videoclipuri scurte, fotografiem rochiile și pregătim conținutul salonului pentru promovare.</p>
      <div className="hero-offer"><p className="hero-starting-price">Totul inclus · de la {formatPrice(packages[0].price)} lei</p><a href="#ce-facem" className="text-link">Vezi ce facem <ArrowIcon /></a></div>
    </div>
  </section>;
}
