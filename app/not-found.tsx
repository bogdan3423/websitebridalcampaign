import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Brand } from "@/components/Brand";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Brand />
      <div className="not-found-content">
        <p className="eyebrow">Eroare 404</p>
        <h1>Pagina aceasta nu mai este aici.</h1>
        <p>Întoarce-te la prezentarea The Bridal Concept și descoperă serviciile noastre pentru saloane bridal.</p>
        <Link className="button button-dark" href="/">
          Înapoi la pagina principală <ArrowIcon />
        </Link>
      </div>
    </main>
  );
}
