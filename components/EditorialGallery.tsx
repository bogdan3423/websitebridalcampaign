"use client";
import { ArrowIcon } from "./ArrowIcon";

import Image from "next/image";
import { useRef, useState } from "react";
import { gallery } from "@/data/gallery";
import { SectionLabel } from "./SectionLabel";
export function EditorialGallery() {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  function move(by: number) {
    setActive((i) => (i + by + gallery.length) % gallery.length);
  }
  return (
    <section id="galerie" className="section gallery-section">
      <SectionLabel number="04">
        O colecție. Mai multe perspective.
      </SectionLabel>
      <div className="gallery-heading">
        <h2>
          Când rochia
          <br />
          <em>devine imagine.</em>
        </h2>
        <p>
          Cadre create pentru feed, website, campanii și materiale editoriale.
        </p>
      </div>
      <div className="editorial-gallery">
        {gallery.map((photo, index) => (
          <figure key={photo.src} className={photo.className}>
            <button
              className="gallery-image"
              onClick={() => {
                setActive(index);
                dialog.current?.showModal();
              }}
              aria-label={`Deschide fotografia: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={index === 3 ? "92vw" : "(max-width: 767px) 88vw, 50vw"}
              />
              <span className="image-expand" aria-hidden="true">
                <ArrowIcon direction="up-right" />
              </span>
            </button>
            <figcaption>{photo.label}</figcaption>
          </figure>
        ))}
      </div>
      <p className="gallery-note">
        Selecție vizuală de referință. Fotografiile sunt provizorii și vor fi
        înlocuite cu imaginile campaniilor.
      </p>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Galerie foto"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="lightbox-top">
          <span>
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(gallery.length).padStart(2, "0")}
          </span>
          <button
            aria-label="Închide fotografia"
            onClick={() => dialog.current?.close()}
          >
            Închide <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="lightbox-image">
          <Image
            src={gallery[active].src}
            alt={gallery[active].alt}
            fill
            sizes="90vw"
          />
        </div>
        <div className="lightbox-bottom">
          <button onClick={() => move(-1)} aria-label="Fotografia precedentă">
            <ArrowIcon direction="left" />
          </button>
          <p>{gallery[active].label}</p>
          <button onClick={() => move(1)} aria-label="Fotografia următoare">
            <ArrowIcon direction="right" />
          </button>
        </div>
      </dialog>
    </section>
  );
}
