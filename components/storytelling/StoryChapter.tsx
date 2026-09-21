"use client";

import Image from "next/image";
import type { StoryChapterData, StoryMedia } from "@/data/storytelling";
import { useStoryProgress } from "./useStoryProgress";

function StoryAsset({ media }: { media: StoryMedia }) {
  if (media.type === "video") {
    return (
      <video
        src={media.src}
        poster={media.poster}
        muted
        playsInline
        loop
        preload="metadata"
        aria-label={media.alt}
      />
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes="(max-width: 900px) 100vw, 45vw"
      style={{ objectPosition: media.position }}
    />
  );
}

export function StoryChapter({ chapter }: { chapter: StoryChapterData }) {
  const { rootRef, active } = useStoryProgress();

  return (
    <section
      ref={rootRef}
      id={chapter.id}
      className={`story-chapter story-chapter--${chapter.tone} story-chapter--${chapter.visualMode}${chapter.steps.length > 6 ? " story-chapter--dense" : ""}`}
      aria-labelledby={`${chapter.id}-title`}
    >
      <div className="section-shell">
        <header className="story-chapter-header">
          <div className="story-chapter-label">
            <span aria-hidden="true">{chapter.number}</span>
            <p>{chapter.label}</p>
          </div>
          <div>
            <h2 id={`${chapter.id}-title`}>
              {chapter.title[0]}
              <br />
              <em>{chapter.title[1]}</em>
            </h2>
            <p>{chapter.intro}</p>
          </div>
        </header>

        <div className="story-layout">
          <div className="story-visual-shell" aria-live="polite">
            <div className="story-visual">
              {chapter.steps.map((step, index) => (
                <div
                  className="story-media"
                  data-active={index === active ? "true" : "false"}
                  key={`${step.title}-${step.media.src}`}
                >
                  <StoryAsset media={step.media} />
                </div>
              ))}
              <div className="story-visual-meta" aria-hidden="true">
                <span>{String(active + 1).padStart(2, "0")}</span>
                <span>{chapter.steps[active]?.title}</span>
              </div>
            </div>
          </div>

          <div className="story-steps">
            {chapter.steps.map((step, index) => (
              <article
                className="story-step"
                data-story-step
                data-index={index}
                data-active={index === active ? "true" : "false"}
                key={step.title}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
            <div className="story-closing">
              <p>{chapter.closing[0]}</p>
              <strong>{chapter.closing[1]}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
