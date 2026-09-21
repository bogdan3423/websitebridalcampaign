"use client";

import Image from "next/image";
import { gallery, feedImages } from "@/data/gallery";
import { socialFormats, socialWorkflow } from "@/data/storytelling";
import { useStoryProgress } from "./useStoryProgress";

const feedLabels = [
  "REEL",
  "CAROUSEL",
  "CLOSE-UP",
  "DRESS SPOTLIGHT",
  "STORY",
  "BTS",
  "EDUCATIONAL",
  "SALES POST",
  "CAMPAIGN",
] as const;

export function SocialStory() {
  const { rootRef, active } = useStoryProgress();

  return (
    <section
      ref={rootRef}
      id="social-media"
      className="story-chapter story-chapter--light social-story"
      aria-labelledby="social-story-title"
    >
      <div className="section-shell">
        <header className="story-chapter-header">
          <div className="story-chapter-label"><span aria-hidden="true">03</span><p>Social media</p></div>
          <div>
            <h2 id="social-story-title">Conținutul nu rămâne<br /><em>într-un folder.</em></h2>
            <p>Îl transformăm într-un ritm real de promovare.</p>
          </div>
        </header>

        <div className="story-layout social-story-layout">
          <div className="story-steps">
            {socialFormats.map(([title, copy], index) => (
              <article
                className="story-step"
                data-story-step
                data-index={index}
                data-active={index === active ? "true" : "false"}
                key={title}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
            <article
              className="story-step social-workflow-step"
              data-story-step
              data-index={socialFormats.length}
              data-active={active === socialFormats.length ? "true" : "false"}
            >
              <span>09</span>
              <div>
                <h3>De la conținut la calendar</h3>
                <ul>
                  {socialWorkflow.map(([title, copy]) => (
                    <li key={title}><strong>{title}</strong><p>{copy}</p></li>
                  ))}
                </ul>
              </div>
            </article>
            <div className="story-closing">
              <p>Transformăm o producție într-o bibliotecă de conținut.</p>
              <strong>Conținut pregătit pentru săptămâni de promovare.</strong>
            </div>
          </div>

          <div className="story-visual-shell social-feed-shell">
            <div className="social-feed">
              <div className="social-feed-head">
                <span>DE LA SHOOTING</span><span>LA CONTENT CALENDAR</span>
              </div>
              <div className="social-feed-grid">
                {feedImages.map((imageIndex, index) => (
                  <figure
                    className={`social-feed-post${index === 4 ? " social-feed-post--story" : ""}`}
                    data-visible={index <= Math.min(active, 8) ? "true" : "false"}
                    key={`${imageIndex}-${index}`}
                  >
                    <Image
                      src={gallery[imageIndex].src}
                      alt={gallery[imageIndex].alt}
                      fill
                      sizes="(max-width: 900px) 30vw, 16vw"
                    />
                    <figcaption>{feedLabels[index]}</figcaption>
                  </figure>
                ))}
              </div>
              <p>Instagram · Facebook · TikTok, unde are sens</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
