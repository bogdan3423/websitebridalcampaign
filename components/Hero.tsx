import Image from "next/image";
import { heroImage } from "@/data/gallery";
import { formatPrice, packages } from "@/data/packages";
export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <h1 id="hero-title">O campanie pentru<br />colecția ta.</h1>
      <p className="hero-promise">Foto, video și postări pentru salonul tău de mirese. O zi de producție, o lună de materiale.</p>
      <p className="hero-starting-price">De la {formatPrice(packages[0].price)} lei, cu echipa inclusă.</p>
      <a href="#pachete" className="button button-dark">Vezi pachetele <span aria-hidden="true">↓</span></a>
    </div>
    <figure className="hero-visual"><Image src={heroImage.src} alt={heroImage.alt} fill sizes="(max-width: 800px) 100vw, 50vw" loading="eager" fetchPriority="high" /></figure>
  </section>;
}
