import Image from "next/image";
import { heroImage } from "@/data/gallery";
import { formatPrice, packages } from "@/data/packages";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">FOTOGRAFIE · FILMARE · PROMOVARE</p>
        <h1 id="hero-title">
          O zi de lucru.
          <br />
          <em>O lună de materiale.</em>
        </h1>
        <p className="hero-promise">
          Creăm pentru salonul tău fotografii, filme scurte și postări care
          prezintă clar rochiile și invită miresele la probă.
        </p>
        <div className="hero-actions">
          <a href="#pachete" className="button button-dark">
            Vezi pachetele <span aria-hidden="true">↓</span>
          </a>
          <a href="#contact" className="text-link">
            Cere o recomandare <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="hero-price-list" aria-label="Prețurile pachetelor">
          {packages.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              <span>{item.name}</span>
              <strong>{formatPrice(item.price)} lei</strong>
            </a>
          ))}
        </div>
      </div>
      <figure className="hero-visual">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          sizes="(max-width: 800px) 100vw, 48vw"
          loading="eager"
          fetchPriority="high"
        />
        <figcaption>
          <span>Cluj-Napoca</span>
          <span>Pentru saloane de rochii de mireasă</span>
        </figcaption>
      </figure>
    </section>
  );
}

