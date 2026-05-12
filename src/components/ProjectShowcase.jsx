import { getAssetPath } from "../utils/paths";

const deepcutPreviewVideo = "https://assets.mixkit.co/videos/4451/4451-360.mp4";

export const featuredProjects = [
  {
    id: "jpmorgan-ai",
    eyebrow: "JP Morgan",
    title: "Reimagining the future of investment banking origination through zero-to-one AI-powered idea generation.",
    bullets: [
      "Unified 1,400+ investor profiles and 8,400+ corporate records into a sponsor intelligence workflow for screening, matching, and idea generation.",
      "Reduced manual origination workflow steps by 35% and cut early idea preparation time by 50%+ through AI-supported rationale, sponsor-fit context, and reusable idea structures.",
    ],
    image: "/optimized/jpmc-showcase-bg-1200.png",
    imageSrcSet: "/optimized/jpmc-showcase-bg-1200.png 1200w, /optimized/jpmc-showcase-bg-1940.png 1940w",
    imageSizes: "(max-width: 760px) calc(100vw - 40px), 970px",
    imageAlt: "",
    brandLine: "JP.Morgan.",
    subLinePrefix: "with",
    subLineSuffix: "AI",
    href: "#jpmorgan-ai",
  },
  {
    id: "jpmorgan-lobby",
    eyebrow: "JP Morgan",
    title: "Building human in-the-loop agentic AI workflow experiences for wholesale lending ops teams.",
    bullets: [
      "Cut deal setup time by 40% through AI-assisted coordination.",
      "Accelerated handoffs by 45% with human-in-loop AI workflows.",
    ],
    image: "/optimized/jp-lobby-1200.png",
    imageSrcSet: "/optimized/jp-lobby-1200.png 1200w, /jp-lobby.png 1408w",
    imageSizes: "(max-width: 760px) calc(100vw - 40px), 970px",
    imageAlt: "",
    brandLine: "JP.Morgan.",
    subLinePrefix: "with",
    subLineSuffix: "AI",
    href: "#jpmorgan-lobby",
    showLockup: false,
    isWip: true,
    detail: {
      accentColor: "#ffb0a6",
      accentGlow: "rgba(255, 176, 166, 0.58)",
      company: [
        "J.P. Morgan — Wholesale Lending Ops (Enterprise Workflow Platform)",
        "A workflow platform for coordinating complex bookings across teams and systems.",
      ],
      responsibility:
        "Led end-to-end product design for BX NEXT’s coordination experience—bringing complex booking work into a single guided flow. Defined the information architecture, form strategy, and human-in-the-loop AI automation to improve clarity, traceability, and audit readiness.",
      timeline: "May 2025 - Aug 2025",
      role: "UX Designer",
      roleTeam:
        "UX designer collaborating closely with two other designers, an adjacent design team, PMs, as well as engineering stakeholders.",
    },
  },
  {
    id: "deepcut-ai-night-guide",
    eyebrow: "DeepCut",
    title: "Designing an AI video discovery platform that helps people find, rate, save, and source long-form videos across desktop and mobile.",
    bullets: [
      "Built an AI Night Guide that surfaces the right long-form video, explains why it matters, and keeps discovery moving with live preview motion.",
      "Designed a responsive desktop and mobile landing experience for DeepCut, an IMDb-style video discovery layer for YouTube, Bilibili, and other sources.",
    ],
    href: "#deepcut-ai-night-guide",
    customThumbnail: "deepcut-night-guide",
    showLockup: false,
    isWip: false,
    highlights: ["AI video discovery", "Ratings + saves", "Source scraping", "Desktop + mobile"],
    detail: {
      accentColor: "#55e68a",
      accentGlow: "rgba(85, 230, 138, 0.58)",
      company: [
        "DeepCut — AI Video Discovery",
        "An AI-native platform for finding, rating, saving, and sourcing long-form videos.",
      ],
      responsibility:
        "Designed the landing page concept, AI Night Guide, and responsive thumbnail to show how contextual guidance, ratings, and source intelligence can make video discovery feel more useful and cinematic.",
      timeline: "2026",
      role: "Product Designer",
      roleTeam: "Concept, interaction design, visual design, and responsive prototyping.",
    },
    wipTitle: "DeepCut AI video discovery case study",
    wipBody:
      "The homepage thumbnail and project context are live now while the deeper product narrative is being shaped.",
    wipCardTitle: "AI Night Guide + source intelligence",
    wipCardBody:
      "The full story will expand on search, ratings, save flows, source scraping, and mobile-first discovery behavior.",
  },
];

export function DeepCutNightGuideThumbnail() {
  return (
    <div className="deepcut-case-thumb" aria-hidden="true">
      <div className="deepcut-thumb-ambient" />

      <div className="deepcut-thumb-desktop">
        <div className="deepcut-thumb-navbar">
          <div className="deepcut-thumb-brand">
            <span className="deepcut-thumb-mark" />
            <span>DeepCut</span>
          </div>
          <div className="deepcut-thumb-nav">
            <span className="is-active">Home</span>
            <span>Explore</span>
            <span>Library</span>
          </div>
          <div className="deepcut-thumb-search">
            Search creators, moods, sources...
          </div>
        </div>

        <div className="deepcut-thumb-hero">
          <div className="deepcut-thumb-hero-copy">
            <p className="deepcut-thumb-kicker">Cut 01 / Video discovery intelligence</p>
            <div className="deepcut-thumb-chip-row">
              <span className="deepcut-thumb-chip is-orange">AI-guided search</span>
              <span className="deepcut-thumb-chip">Ratings + saves</span>
              <span className="deepcut-thumb-chip">Bilibili + YouTube</span>
            </div>
            <h3>Find long-form videos worth your time.</h3>
            <p className="deepcut-thumb-body">
              DeepCut helps viewers discover, rate, save, and source long-form videos with AI guidance before they commit to play.
            </p>
            <div className="deepcut-thumb-actions">
              <span className="deepcut-thumb-button is-primary">Find a deep cut</span>
              <span className="deepcut-thumb-button">Preview AI guide</span>
            </div>
          </div>

          <div className="deepcut-thumb-panel">
            <div className="deepcut-thumb-panel-head">
              <div>
                <p>AI discovery guide</p>
                <h4>Why this video is worth it</h4>
              </div>
              <span className="deepcut-thumb-orb">✦</span>
            </div>
            <div className="deepcut-thumb-video-shell">
              <video
                className="deepcut-thumb-video"
                src={deepcutPreviewVideo}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="deepcut-thumb-overlay">
                <span>IMDb-style rating</span>
                <span>Source scan</span>
                <span>Save ready</span>
              </div>
            </div>
            <div className="deepcut-thumb-panel-list">
              <div>
                <strong>Find the right cut</strong>
                <span>Search by mood, creator, topic, or what you want to learn.</span>
              </div>
              <div>
                <strong>Rate and compare</strong>
                <span>Use community judgment to decide what deserves a long watch.</span>
              </div>
              <div>
                <strong>Source intelligence</strong>
                <span>Scrape and unify signals from Bilibili, YouTube, and more.</span>
              </div>
              <div>
                <strong>Save for later</strong>
                <span>Like, save, and build a library of videos worth returning to.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="deepcut-thumb-mobile">
        <div className="deepcut-thumb-mobile-top">
          <span className="deepcut-thumb-mark" />
          <strong>DeepCut</strong>
          <span className="deepcut-thumb-mobile-icon">⌕</span>
        </div>
        <div className="deepcut-thumb-mobile-search">Search creators, moods, sources...</div>
        <div className="deepcut-thumb-mobile-hero">
          <p>Cut 01 / AI video discovery</p>
          <h3>Find long-form videos worth your time.</h3>
          <video
            className="deepcut-thumb-video"
            src={deepcutPreviewVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="deepcut-thumb-overlay deepcut-thumb-overlay-mobile">
            <span>AI-guided search</span>
            <span>Ratings + saves</span>
            <span>Source scan</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onProjectSelect }) {
  const handleProjectClick = (event) => {
    event.preventDefault();
    onProjectSelect(project);
  };

  const handleImageError = (event) => {
    event.currentTarget.classList.add("is-missing");
    event.currentTarget.setAttribute("aria-hidden", "true");
  };

  // Helper function to transform srcSet with getAssetPath
  const transformSrcSet = (srcSet) => {
    if (!srcSet) return srcSet;
    return srcSet
      .split(", ")
      .map(entry => {
        const [path, size] = entry.trim().split(" ");
        return `${getAssetPath(path)} ${size}`;
      })
      .join(", ");
  };

  const isDeepCutNightGuide = project.customThumbnail === "deepcut-night-guide";

  return (
    <article className="project-showcase-card">
      <a
        className={`project-showcase-media${project.showLockup === false || isDeepCutNightGuide ? " is-image-only" : ""}${project.id === "jpmorgan-ai" ? " is-jpmorgan-ai" : ""}${isDeepCutNightGuide ? " is-deepcut-night-guide" : ""}`}
        href={project.href}
        aria-label={`${project.eyebrow} case study`}
        onClick={handleProjectClick}
      >
        {isDeepCutNightGuide ? (
          <DeepCutNightGuideThumbnail />
        ) : (
          <>
            <img
              className="project-showcase-bg"
              src={getAssetPath(project.image)}
              srcSet={transformSrcSet(project.imageSrcSet)}
              sizes={project.imageSizes}
              alt={project.imageAlt}
              loading="lazy"
              decoding="async"
              onError={handleImageError}
            />
            {project.id === "jpmorgan-ai" && (
              <div className="jpmorgan-ai-motion" aria-hidden="true">
                <span className="jpmorgan-ai-grid" />
                <span className="jpmorgan-ai-beam" />
              </div>
            )}
            {project.showLockup === false ? null : (
              <div className="project-showcase-lockup" aria-hidden="true">
                <p className="project-showcase-brand">{project.brandLine}</p>
                <p className="project-showcase-brand">
                  <span>{project.subLinePrefix}</span>
                  <span className="project-showcase-icon" aria-hidden="true" />
                  <span>{project.subLineSuffix}</span>
                </p>
              </div>
            )}
          </>
        )}
      </a>

      <div className="project-showcase-copy">
        <p className="project-showcase-eyebrow">{project.eyebrow}</p>
        <h2 className="project-showcase-title">{project.title}</h2>
        <ul className="project-showcase-points">
          {project.bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function ProjectShowcase({ onProjectSelect }) {
  return (
    <section className="landing-projects-section" id="work" aria-label="Featured work">
      <div className="landing-projects-frame">
        <div className="landing-projects-header">
          <h1 className="landing-projects-title">Featured work</h1>
        </div>
        <div className="landing-projects-showcase">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onProjectSelect={onProjectSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
