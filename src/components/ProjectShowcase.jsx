import { getAssetPath } from "../utils/paths";

export const featuredProjects = [
  {
    id: "jpmorgan-ai",
    eyebrow: "JP Morgan",
    title: "Reimagining the future of investment banking origination through zero-to-one AI-powered idea generation.",
    bullets: [
      "Cut deal setup time by 40% through AI-assisted coordination.",
      "Accelerated handoffs by 45% with human-in-loop AI workflows.",
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
  },
];

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

  return (
    <article className="project-showcase-card">
      <a
        className={`project-showcase-media${project.showLockup === false ? " is-image-only" : ""}`}
        href={project.href}
        aria-label={`${project.eyebrow} case study`}
        onClick={handleProjectClick}
      >
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
      </a>

      <div className="project-showcase-copy">
        <p className="project-showcase-eyebrow">{project.eyebrow}</p>
        <h2 className="project-showcase-title">{project.title}</h2>
        <ul className="project-showcase-bullets">
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
