import { useEffect, useRef } from "react";
import SiteFooter from "./SiteFooter";

const experienceItems = [
  {
    company: "J.P. Morgan",
    year: "2025+",
    description: "AI-native origination, lending workflow systems, recommendation rationale, and human-in-the-loop product experiences.",
  },
  {
    company: "Incedo",
    year: "2024",
    description: "Financial-services product strategy, research synthesis, and client-ready workflows for complex enterprise teams.",
  },
  {
    company: "American Credit Acceptance",
    year: "2023",
    description: "Internal financial-product surfaces across employee tools, mobile flows, and operational decision-making.",
  },
  {
    company: "Bandwidth",
    year: "2022",
    description: "B2B SaaS workflows, enterprise dashboards, and the discipline of making dense tools easier to scan.",
  },
];

export default function AboutPage({ onWorkSelect }) {
  const aboutRef = useRef(null);

  useEffect(() => {
    const aboutElement = aboutRef.current;
    if (!aboutElement) {
      return undefined;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;

    const updateScrollAtmosphere = () => {
      rafId = 0;

      const experienceElement = aboutElement.querySelector(".about-experience");
      if (!experienceElement) {
        return;
      }

      const viewportHeight = window.innerHeight || 1;
      const experienceTop = experienceElement.getBoundingClientRect().top;
      const start = viewportHeight * 0.92;
      const end = viewportHeight * 0.18;
      const rawProgress = (start - experienceTop) / (start - end);
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      if (reducedMotion.matches) {
        aboutElement.style.setProperty("--about-scroll-progress", "1");
        aboutElement.style.setProperty("--about-halo-rise", "-12vh");
        aboutElement.style.setProperty("--about-stage-rise", "-5vh");
        aboutElement.style.setProperty("--about-lower-glow-opacity", "0.72");
        aboutElement.style.setProperty("--about-experience-rise", "0px");
        aboutElement.style.setProperty("--about-experience-opacity", "1");
        aboutElement.style.setProperty("--about-footer-rise", "0px");
        aboutElement.style.setProperty("--about-footer-opacity", "1");
        return;
      }

      aboutElement.style.setProperty("--about-scroll-progress", easedProgress.toFixed(4));
      aboutElement.style.setProperty("--about-halo-rise", `${(-18 * easedProgress).toFixed(2)}vh`);
      aboutElement.style.setProperty("--about-stage-rise", `${(-7.5 * easedProgress).toFixed(2)}vh`);
      aboutElement.style.setProperty("--about-lower-glow-opacity", (0.22 + easedProgress * 0.56).toFixed(3));
      aboutElement.style.setProperty("--about-experience-rise", `${(34 * (1 - easedProgress)).toFixed(2)}px`);
      aboutElement.style.setProperty("--about-experience-opacity", (0.84 + easedProgress * 0.16).toFixed(3));
      aboutElement.style.setProperty("--about-footer-rise", `${(22 * (1 - easedProgress)).toFixed(2)}px`);
      aboutElement.style.setProperty("--about-footer-opacity", (0.68 + easedProgress * 0.32).toFixed(3));
    };

    const requestUpdate = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(updateScrollAtmosphere);
    };

    updateScrollAtmosphere();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener?.("change", requestUpdate);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener?.("change", requestUpdate);
    };
  }, []);

  return (
    <main
      className="about-page"
      aria-labelledby="about-title"
      ref={aboutRef}
      style={{
        "--about-scroll-progress": 0,
        "--about-halo-rise": "0vh",
        "--about-stage-rise": "0vh",
        "--about-lower-glow-opacity": 0.22,
        "--about-experience-rise": "34px",
        "--about-experience-opacity": 0.84,
        "--about-footer-rise": "22px",
        "--about-footer-opacity": 0.68,
      }}
    >
      <section className="about-essay" aria-label="About Kris">
        <div className="about-essay-copy">
          <p className="about-kicker">Kris is a product designer @ J.P. Morgan</p>
          <h1 id="about-title">Designer, builder, and quiet observer of how people and intelligent systems learn from each other.</h1>
          <p>
            I design digital experiences where complex work becomes easier to understand: AI recommendations people can trust, workflows teams can operate, and prototypes that make future systems feel close enough to evaluate.
          </p>
          <p>
            My work sits between product strategy, interaction design, and code-backed prototyping. I care about the moments when an interface stops showing technology and starts helping someone make a clearer decision.
          </p>
          <p>
            Outside of designing and vibe-coding, I am probably looking for a beautiful cafe, collecting tiny interface details, or making one more elderflower gin cocktail than originally planned.
          </p>
        </div>
      </section>

      <section className="about-experience" aria-label="Experience">
        <div className="about-experience-shell">
          <p className="about-experience-label">Selected experience</p>
          <div className="about-experience-list">
            {experienceItems.map((item) => (
              <article className="about-experience-row" key={`${item.company}-${item.year}`}>
                <h2>{item.company}</h2>
                <span>{item.year}</span>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <SiteFooter className="about-footer" onCenterSelect={onWorkSelect} />
      </section>
    </main>
  );
}
