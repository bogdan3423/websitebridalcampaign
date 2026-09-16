"use client";

import Image from "next/image";
import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { gallery } from "@/data/gallery";

const visibleImages = gallery.slice(0, 3);
const minZoom = 1;
const maxZoom = 3;

type Point = { x: number; y: number };
type DragStart = Point & {
  pointerId: number;
  offsetX: number;
  offsetY: number;
};

export function PortfolioGallery() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(minZoom);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dragStart = useRef<DragStart | null>(null);
  const returnFocusIndex = useRef(0);

  function resetView() {
    setZoom(minZoom);
    setOffset({ x: 0, y: 0 });
    setDragging(false);
  }

  function open(index: number, triggerIndex = index) {
    returnFocusIndex.current = triggerIndex;
    setActive(index);
    resetView();
    dialogRef.current?.showModal();
  }

  function move(by: number) {
    setActive((index) => (index + by + gallery.length) % gallery.length);
    resetView();
  }

  function changeZoom(by: number) {
    setZoom((current) => {
      const next = Math.min(maxZoom, Math.max(minZoom, current + by));
      if (next === minZoom) setOffset({ x: 0, y: 0 });
      return next;
    });
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
    if (zoom > minZoom) setDragging(true);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const start = dragStart.current;
    if (!start || start.pointerId !== event.pointerId || zoom === minZoom)
      return;
    setOffset({
      x: start.offsetX + event.clientX - start.x,
      y: start.offsetY + event.clientY - start.y,
    });
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const start = dragStart.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const distanceX = event.clientX - start.x;
    if (zoom === minZoom && Math.abs(distanceX) > 55)
      move(distanceX < 0 ? 1 : -1);
    dragStart.current = null;
    setDragging(false);
  }

  function handleWheel(event: ReactWheelEvent<HTMLDivElement>) {
    event.preventDefault();
    changeZoom(event.deltaY < 0 ? 0.25 : -0.25);
  }

  return (
    <>
      <div className="portfolio-gallery">
        {visibleImages.map((photo, index) => (
          <figure
            className={`portfolio-image portfolio-image-${index + 1}`}
            key={photo.src}
          >
            <button
              ref={(element) => {
                triggerRefs.current[index] = element;
              }}
              className="portfolio-image-button"
              type="button"
              aria-label={`Deschide fotografia ${index + 1} din galerie`}
              onClick={() => open(index)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 650px) 90vw, 30vw"
              />
              <span className="portfolio-open" aria-hidden="true">
                Vezi ↗
              </span>
            </button>
          </figure>
        ))}
      </div>

      <button
        ref={(element) => {
          triggerRefs.current[visibleImages.length] = element;
        }}
        className="open-full-gallery"
        type="button"
        onClick={() => open(0, visibleImages.length)}
      >
        <span>Deschide galeria completă</span>
        <strong>{gallery.length} fotografii</strong>
        <span aria-hidden="true">↗</span>
      </button>

      <dialog
        ref={dialogRef}
        className="portfolio-lightbox"
        aria-label="Galerie foto din portofoliu"
        onClose={() => triggerRefs.current[returnFocusIndex.current]?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") move(1);
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "+" || event.key === "=") changeZoom(0.5);
          if (event.key === "-") changeZoom(-0.5);
          if (event.key === "0") resetView();
        }}
      >
        <div className="lightbox-toolbar">
          <p aria-live="polite">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(gallery.length).padStart(2, "0")}
          </p>
          <div className="zoom-controls" aria-label="Comenzi pentru apropierea imaginii">
            <button
              type="button"
              onClick={() => changeZoom(-0.5)}
              disabled={zoom === minZoom}
              aria-label="Micșorează fotografia"
            >
              −
            </button>
            <output aria-label="Nivel de apropiere">{Math.round(zoom * 100)}%</output>
            <button
              type="button"
              onClick={() => changeZoom(0.5)}
              disabled={zoom === maxZoom}
              aria-label="Mărește fotografia"
            >
              +
            </button>
            <button type="button" onClick={resetView}>
              Restabilește
            </button>
          </div>
          <button
            className="lightbox-close"
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Închide galeria"
          >
            Închide <span aria-hidden="true">×</span>
          </button>
        </div>

        <div
          className={`lightbox-stage${zoom > minZoom ? " is-zoomed" : ""}${dragging ? " is-dragging" : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onWheel={handleWheel}
          onDoubleClick={() => {
            if (zoom === minZoom) changeZoom(1);
            else resetView();
          }}
        >
          <div
            className="lightbox-photo"
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
            }}
          >
            <Image
              key={gallery[active].src}
              src={gallery[active].src}
              alt={gallery[active].alt}
              fill
              sizes="95vw"
              loading="eager"
            />
          </div>
        </div>

        <div className="lightbox-navigation">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Fotografia precedentă"
          >
            ← <span>Înapoi</span>
          </button>
          <p>{gallery[active].label}</p>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Fotografia următoare"
          >
            <span>Înainte</span> →
          </button>
        </div>
      </dialog>
    </>
  );
}
