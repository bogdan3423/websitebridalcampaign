"use client";
import { ArrowIcon } from "./ArrowIcon";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { gallery } from "@/data/gallery";

const tabs = ["Postări", "Catalog", "Plan de filmare"];
const posts = [
  { day: "Luni", title: "Prima privire", copy: "Satin, lumină și o siluetă care vorbește de la sine.", photo: 0 },
  { day: "Miercuri", title: "Mai aproape", copy: "Detaliile pe care vrei să le vezi de aproape.", photo: 2 },
  { day: "Vineri", title: "Invitație la probă", copy: "Cum te simți în rochia ta? Descoperă la o probă în salon.", photo: 3 },
];
const spreads = [[0, 3], [2, 5], [1, 4]];
const frames = [
  { photo: 3, title: "Silueta", copy: "Cadru întreg. Modelul se întoarce lent, pentru a arăta linia rochiei.", time: "00–05 sec" },
  { photo: 2, title: "Detaliul", copy: "Cadru apropiat. Textura și finisajele, în lumină naturală.", time: "05–10 sec" },
  { photo: 5, title: "Mișcarea", copy: "Câțiva pași. Urmărim voalul și încheiem cu invitația la probă.", time: "10–15 sec" },
];
export function CampaignSamples() {
  const [active, setActive] = useState(0);
  const [spread, setSpread] = useState(0);
  const [frame, setFrame] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowRight" ? (index + 1) % tabs.length : event.key === "ArrowLeft" ? (index + tabs.length - 1) % tabs.length : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : null;
    if (next === null) return;
    event.preventDefault(); setActive(next); refs.current[next]?.focus();
  }
  return <div className="campaign-samples">
    <p className="sample-disclosure">Exemple demonstrative</p>
    <div className="sample-tabs" role="tablist" aria-label="Exemple de materiale">{tabs.map((tab, index) => <button key={tab} ref={(el) => { refs.current[index] = el; }} id={"sample-tab-" + index} role="tab" aria-selected={active === index} aria-controls={"sample-panel-" + index} tabIndex={active === index ? 0 : -1} onKeyDown={(event) => navigate(event, index)} onClick={() => setActive(index)}>{tab}</button>)}</div>
    {tabs.map((tab, index) => <div key={tab} className="sample-panel" id={"sample-panel-" + index} role="tabpanel" aria-labelledby={"sample-tab-" + index} tabIndex={0} hidden={active !== index}>
      {active === 0 && index === 0 && <div className="sample-posts">{posts.map((post) => <figure key={post.day} className="sample-post"><div className="post-photo"><Image src={gallery[post.photo].src} alt={gallery[post.photo].alt} fill sizes="(max-width: 650px) 85vw, 28vw" /></div><figcaption><details><summary>{post.day} · {post.title}</summary><p>{post.copy}</p></details></figcaption></figure>)}</div>}
      {active === 1 && index === 1 && <div className="catalog-sample"><div className="catalog-spread" key={spread}><div className="catalog-page"><span className="catalog-masthead">Colecția</span><div className="catalog-photo"><Image src={gallery[spreads[spread][0]].src} alt={gallery[spreads[spread][0]].alt} fill sizes="(max-width: 650px) 40vw, 30vw" /></div><span className="catalog-folio">{String(spread * 2 + 1).padStart(2, "0")} / O nouă privire</span></div><div className="catalog-page catalog-page-full"><Image src={gallery[spreads[spread][1]].src} alt={gallery[spreads[spread][1]].alt} fill sizes="(max-width: 650px) 40vw, 30vw" /></div></div><div className="sample-controls"><button onClick={() => setSpread((spread + 2) % 3)} aria-label="Paginile precedente"><ArrowIcon direction="left" /></button><p aria-live="polite">Exemplu de catalog · {spread + 1} / 3</p><button onClick={() => setSpread((spread + 1) % 3)} aria-label="Paginile următoare"><ArrowIcon direction="right" /></button></div></div>}
      {active === 2 && index === 2 && <div className="film-sample"><div className="film-photo" key={frame}><Image src={gallery[frames[frame].photo].src} alt={gallery[frames[frame].photo].alt} fill sizes="(max-width: 650px) 85vw, 30vw" /></div><div className="film-copy"><p>Plan de 15 secunde · fotografii de referință</p><div className="frame-steps">{frames.map((item, i) => <button key={item.title} aria-pressed={frame === i} onClick={() => setFrame(i)}><span>{item.time}</span><strong>{item.title}</strong><ArrowIcon /></button>)}</div><p className="frame-description" aria-live="polite">{frames[frame].copy}</p></div></div>}
    </div>)}
  </div>;
}
