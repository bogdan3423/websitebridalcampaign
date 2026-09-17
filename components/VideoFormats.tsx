import Image from "next/image";
import { gallery } from "@/data/gallery";
import { SectionLabel } from "./SectionLabel";

const formats = [
  ["Presenter", "Actor, consultant sau proprietar în fața camerei: prezentări, explicații, întrebări frecvente, recomandări și introduceri care captează atenția."],
  ["Model + rochie", "Mers, mișcare, voal, cadre principale și atmosfera colecției."],
  ["Detalii", "Cadre apropiate cu corsetul, broderiile, dantela, trena, materialul și aplicațiile."],
  ["Educațional", "Cum alegi croiala, diferențe între modele, ce urmărești la probă și sfaturi utile pentru mirese."],
  ["Comparație", "Rochia A sau rochia B, princess sau mermaid, satin sau dantelă, cu voal sau fără voal."],
  ["Trend", "Puncte de vedere, tranziții, formate dinamice și tendințe potrivite salonului."],
  ["Vânzare / programare", "Colecții noi, disponibilitate, invitație la probă și îndemn clar la acțiune."],
  ["Din culise", "Pregătirea modelului, machiaj, coafură, schimbarea rochiilor și atmosfera din ziua filmării."],
] as const;

export function VideoFormats() {
  return (
    <section id="video" className="video-section">
      <div className="section-shell">
        <SectionLabel number="03" light>Marketing video</SectionLabel>
        <div className="video-heading">
          <h2>Reels de toate felurile.<br /><em>Fiecare are un rol.</em></h2>
          <p>Nu producem clipuri identice doar ca să bifăm un număr. Construim un mix de formate care prezintă rochiile, răspunde întrebărilor mireselor, creează interes și conduce către programarea unei probe.</p>
        </div>
        <div className="video-layout">
          <div className="video-art">
            <div className="reel-image reel-image-back"><Image src={gallery[1].src} alt={gallery[1].alt} fill sizes="(max-width: 767px) 45vw, 22vw" /><span>02 / DETALIU</span></div>
            <div className="reel-image reel-image-front"><Image src={gallery[5].src} alt={gallery[5].alt} fill sizes="(max-width: 767px) 50vw, 24vw" /><span>01 / MODEL + ROCHIE</span></div>
            <p className="eyebrow">FORMATE VERTICALE · 9:16</p>
          </div>
          <div className="format-list">
            {formats.map(([title, text], i) => <div key={title} className="format-item"><span className="format-no">0{i + 1}</span><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
        <div className="reel-count"><span className="display">Un mix.</span><div><span className="eyebrow">CONȚINUT VIDEO</span><p>Construit în jurul colecției,<br />obiectivelor și perioadei de promovare.</p></div></div>
      </div>
    </section>
  );
}
