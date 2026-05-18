import { useEffect, useRef } from "react";
import { getAssetPath } from "../utils/paths";

const timelineItems = [
  {
    year: "Now",
    title: "J.P. Morgan",
    description: "AI-native origination systems, recommendation rationale, review surfaces, and production-near prototypes.",
  },
  {
    year: "2024",
    title: "Incedo",
    description: "Research-to-strategy work for financial-services teams, turning ambiguity into client-ready product direction.",
  },
  {
    year: "2023",
    title: "American Credit Acceptance",
    description: "Financial product surfaces across employee tools, mobile flows, and operational decision-making.",
  },
  {
    year: "2022",
    title: "Bandwidth",
    description: "B2B SaaS workflows, enterprise dashboards, and the discipline of making dense tools easier to scan.",
  },
];

export default function AboutPage({ onWorkSelect }) {
  const writingRef = useRef(null);

  useEffect(() => {
    const writingNode = writingRef.current;
    if (!writingNode) {
      return undefined;
    }

    const paragraphs = Array.from(writingNode.querySelectorAll("p"));
    let frameId = 0;

    const updateParagraphLight = () => {
      frameId = 0;
      const viewportCenter = window.innerHeight * 0.48;
      const falloff = window.innerHeight * 0.52;

      paragraphs.forEach((paragraph) => {
        const rect = paragraph.getBoundingClientRect();
        const paragraphCenter = rect.top + rect.height / 2;
        const distance = Math.abs(paragraphCenter - viewportCenter);
        const light = Math.max(0, Math.min(1, 1 - distance / falloff));
        paragraph.style.setProperty("--about-copy-light", light.toFixed(3));
      });
    };

    const requestUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateParagraphLight);
    };

    updateParagraphLight();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <main className="about-page" aria-labelledby="about-title">
      <section className="about-hero" aria-label="About Kris">
        <div className="about-hero-copy">
          <p className="about-label">About</p>
          <h1 id="about-title">
            I’m Kris Chen, a product designer building <em>AI-native systems</em>.
          </h1>
          <p className="about-hero-note">New York · J.P. Morgan · product strategy, interaction systems, and production-near prototypes.</p>
        </div>

        <figure className="about-photo-frame">
          <img src={getAssetPath("/about-photo.jpg")} alt="Kris Chen smiling in a cafe" />
        </figure>
      </section>

      <section className="about-writing" aria-label="Personal introduction" ref={writingRef}>
        <p>I work where product strategy, interaction systems, and code-backed prototypes start to overlap.</p>
        <p>
          Most of my work is about making complicated tools feel composed: AI recommendations people can trust, workflows teams can operate, and
          prototypes that make a direction feel real before it is fully built.
        </p>
        <p>
          I care about restraint, speed, and precision. The best interface, to me, is the one that quietly helps people make a better decision.
        </p>
      </section>

      <section className="about-timeline" aria-labelledby="about-timeline-title">
        <div className="about-section-title">
          <p className="about-label">Timeline</p>
          <h2 id="about-timeline-title">A path through enterprise tools, financial products, and AI systems.</h2>
        </div>

        <div className="about-timeline-list">
          {timelineItems.map((item) => (
            <article className="about-timeline-row" key={`${item.year}-${item.title}`}>
              <span>{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-cta" aria-label="Contact Kris">
        <p>Currently designing AI-native product systems at J.P. Morgan.</p>
        <div className="about-cta-actions">
          <a href="mailto:junhaochen718@gmail.com">Email</a>
          <a href="https://www.linkedin.com/in/kris-chen-4b4948224/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="#work" onClick={(event) => onWorkSelect?.(event)}>
            Selected work
          </a>
        </div>
      </section>
    </main>
  );
}
