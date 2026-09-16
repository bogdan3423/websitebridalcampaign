"use client";
import { ArrowIcon } from "./ArrowIcon";


import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
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
  const [isOpen, setIsOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const photoRatio = useRef(2 / 3);
  const pointers = useRef(new Map<number, Point>());
  const pinch = useRef<{ distance: number; zoom: number } | null>(null);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(minZoom);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dragStart = useRef<DragStart | null>(null);
  const returnFocusIndex = useRef(0);

  useEffect(() => {
    const onResize = () => {
      setZoom(minZoom);
      setOffset({ x: 0, y: 0 });
      setDragging(false);
      dragStart.current = null;
      pointers.current.clear();
      pinch.current = null;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function constrain(point: Point, scale: number): Point {
    const stage = stageRef.current;
    if (!stage) return { x: 0, y: 0 };
    const width = Math.min(stage.clientWidth, stage.clientHeight * photoRatio.current);
    const height = width / photoRatio.current;
    const maxX = Math.max(0, (width * scale - stage.clientWidth) / 2);
    const maxY = Math.max(0, (height * scale - stage.clientHeight) / 2);
    return { x: Math.max(-maxX, Math.min(maxX, point.x)), y: Math.max(-maxY, Math.min(maxY, point.y)) };
  }

  function resetView() {
    setZoom(minZoom);
    setOffset({ x: 0, y: 0 });
    setDragging(false);
    dragStart.current = null;
    pointers.current.clear();
    pinch.current = null;
  }

  function open(index: number, triggerIndex = index) {
    returnFocusIndex.current = triggerIndex;
    setActive(index);
    setIsOpen(true);
    resetView();
    dialogRef.current?.showModal();
  }

  function move(by: number) {
    setActive((index) => (index + by + gallery.length) % gallery.length);
    resetView();
  }

  function changeZoom(by: number) {
    const next = Math.min(maxZoom, Math.max(minZoom, zoom + by));
    setZoom(next);
    setOffset(constrain(offset, next));
  }

  function toggleZoom() {
    if (zoom > minZoom) resetView();
    else changeZoom(1);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)), zoom };
      dragStart.current = null;
      setDragging(true);
      return;
    }
    dragStart.current = {
      pointerId: event.pointerId, x: event.clientX, y: event.clientY,
      offsetX: offset.x, offsetY: offset.y,
    };
    if (zoom > minZoom) setDragging(true);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pinch.current && pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const next = Math.min(maxZoom, Math.max(minZoom,
        pinch.current.zoom * Math.hypot(a.x - b.x, a.y - b.y) / pinch.current.distance));
      setZoom(next);
      setOffset(constrain(offset, next));
      return;
    }
    const start = dragStart.current;
    if (!start || start.pointerId !== event.pointerId || zoom === minZoom) return;
    setOffset(constrain({
      x: start.offsetX + event.clientX - start.x,
      y: start.offsetY + event.clientY - start.y,
    }, zoom));
  }

  function cancelGesture() {
    pointers.current.clear();
    pinch.current = null;
    dragStart.current = null;
    setDragging(false);
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const start = dragStart.current;
    if (!pinch.current && start?.pointerId === event.pointerId && zoom === minZoom) {
      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25) move(dx < 0 ? 1 : -1);
    }
    cancelGesture();
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
                Vezi <ArrowIcon direction="up-right" />
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
        <ArrowIcon />
      </button>

      <dialog
        ref={dialogRef}
        className="portfolio-lightbox"
        aria-label="Galerie foto din portofoliu"
        onClose={() => { setIsOpen(false); resetView(); triggerRefs.current[returnFocusIndex.current]?.focus(); }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.ctrlKey || event.metaKey || event.altKey) return;
          if (["ArrowRight", "ArrowLeft", "+", "=", "-", "0"].includes(event.key)) event.preventDefault();
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
          <button className="lightbox-zoom" type="button" onClick={toggleZoom}
            aria-label={zoom > minZoom ? "Restabilește fotografia" : "Mărește fotografia"}
            aria-pressed={zoom > minZoom}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="m16 16 5 5M7.5 10.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              {zoom === minZoom && <path d="M10.5 7.5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
            </svg>
          </button>
          <button
            className="lightbox-close"
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Închide galeria"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div
          ref={stageRef}
          className={`lightbox-stage${zoom > minZoom ? " is-zoomed" : ""}${dragging ? " is-dragging" : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={cancelGesture}
          onLostPointerCapture={cancelGesture}
          onDoubleClick={toggleZoom}
        >
          <div
            className="lightbox-photo"
            style={{
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`,
            }}
          >
            {isOpen && <Image
              className="lightbox-image"
              key={gallery[active].src}
              src={gallery[active].src}
              alt={gallery[active].alt}
              fill
              sizes="(max-width: 650px) 100vw, 85vw"
              loading="eager"
              onLoad={(event) => { photoRatio.current = event.currentTarget.naturalWidth / event.currentTarget.naturalHeight; }}
            />}
          </div>
        </div>

        <div className="lightbox-navigation">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Fotografia precedentă"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Fotografia următoare"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
        <nav className="lightbox-thumbnails" aria-label="Fotografiile din galerie">
          {isOpen && gallery.map((photo, index) => (
            <button type="button" key={photo.src} aria-label={`Vezi fotografia ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => { setActive(index); resetView(); }}>
              <Image src={photo.src} alt="" fill sizes="44px" />
            </button>
          ))}
        </nav>
      </dialog>
    </>
  );
}
