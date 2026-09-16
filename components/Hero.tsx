import Image from "next/image";
import { heroImage, gallery } from "@/data/gallery";
import { formatPrice, packages } from "@/data/packages";
export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-images">
      <figure className="hero-visual"><Image src={heroImage.src} alt={heroImage.alt} fill sizes="(max-width: 650px) 100vw, 58vw" loading="eager" fetchPriority="high" /></figure>
      <figure className="hero-detail"><Image src={gallery[2].src} alt={gallery[2].alt} fill sizes="42vw" loading="eager" /></figure>
      <div className="hero-title"><h1 id="hero-title">La prima<br /><em>privire.</em></h1></div>
    </div>
    <div className="hero-copy">
      <p className="hero-promise">O campanie pentru colecția ta.<br />Foto, video și postări pentru saloane de mirese.</p>
      <div className="hero-offer"><p className="hero-starting-price">De la {formatPrice(packages[0].price)} lei · Echipa inclusă</p><a href="#pachete" className="text-link">Vezi pachetele <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>;
}
