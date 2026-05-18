import { featuredProjects } from "../../content/projects";
import { getAssetPath } from "../../utils/paths";

const deepcutThumbnailReference = "/optimized/deepcut-thumbnail-reference.png";
const deepcutTvPreviewVideo = "https://assets.mixkit.co/videos/4451/4451-720.mp4";

export function DeepCutNightGuideThumbnail() {
  const referenceImage = getAssetPath(deepcutThumbnailReference);

  return (
    <div className="deepcut-case-thumb is-reference" aria-hidden="true">
      <img
        className="deepcut-reference-image"
        src={referenceImage}
        alt=""
        loading="eager"
        decoding="async"
      />
      <div className="deepcut-reference-tv-window">
        <video
          src={deepcutTvPreviewVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={(event) => {
            event.currentTarget.currentTime = 3.2;
          }}
          onCanPlay={(event) => {
            event.currentTarget.play().catch(() => {});
          }}
        />
        <span />
        <div className="deepcut-reference-tv-ui">
          <div>
            <strong>Now playing</strong>
            <small>Tokyo at night: hidden food walks</small>
          </div>
          <i><b /></i>
        </div>
      </div>
      <img className="deepcut-reference-tv-frame is-top" src={referenceImage} alt="" decoding="async" />
      <img className="deepcut-reference-tv-frame is-left" src={referenceImage} alt="" decoding="async" />
      <img className="deepcut-reference-tv-frame is-right" src={referenceImage} alt="" decoding="async" />
      <img className="deepcut-reference-tv-frame is-bottom" src={referenceImage} alt="" decoding="async" />
      <div className="deepcut-reference-left-scrim" />
      <div className="deepcut-reference-brand-lockup">
        <span aria-hidden="true" />
        <strong>DeepCut</strong>
      </div>
      <div className="deepcut-reference-copy">
        <p>AI video discovery</p>
        <h3>Find videos<br />worth your time</h3>
        <span>AI searches across YouTube, Bilibili, and more to surface long-form videos you'll actually want to watch.</span>
        <div>
          <em>Ratings + saves</em>
          <em>Bilibili + YouTube</em>
        </div>
      </div>
      <img className="deepcut-reference-foreground is-laptop" src={referenceImage} alt="" decoding="async" />
      <img className="deepcut-reference-foreground is-phone" src={referenceImage} alt="" decoding="async" />
    </div>
  );
}

function ProjectCard({ project, onProjectSelect }) {
  const isUnavailableWip = project.isWip;

  const handleProjectClick = (event) => {
    event.preventDefault();
    if (isUnavailableWip) {
      return;
    }
    onProjectSelect(project);
  };

  const setWipCursor = () => {
    if (isUnavailableWip) {
      document.documentElement.setAttribute("data-cursor-mode", "wip");
    }
  };

  const clearWipCursor = () => {
    if (isUnavailableWip && document.documentElement.getAttribute("data-cursor-mode") === "wip") {
      document.documentElement.removeAttribute("data-cursor-mode");
    }
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
  const hasJpmorganAiTreatment = project.thumbnailVariant === "jpmorgan-ai";

  return (
    <article className="project-showcase-card">
      <a
        className={`project-showcase-media${project.showLockup === false || isDeepCutNightGuide ? " is-image-only" : ""}${hasJpmorganAiTreatment ? " is-jpmorgan-ai" : ""}${isDeepCutNightGuide ? " is-deepcut-night-guide" : ""}`}
        href={project.href}
        aria-label={isUnavailableWip ? `${project.eyebrow} case study still in progress` : `${project.eyebrow} case study`}
        aria-disabled={isUnavailableWip ? "true" : undefined}
        onClick={handleProjectClick}
        onFocus={setWipCursor}
        onBlur={clearWipCursor}
        onPointerEnter={setWipCursor}
        onPointerLeave={clearWipCursor}
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
            {hasJpmorganAiTreatment && (
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
