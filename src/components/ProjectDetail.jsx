const handleProjectImageError = (event) => {
  event.currentTarget.classList.add("is-missing");
  event.currentTarget.setAttribute("aria-hidden", "true");
};

export default function ProjectDetail({ project, onBack, onOpenPreview }) {
  return (
    <main className="project-detail-page" id={project.id}>
      <div className="page-frame project-detail-frame">
        <header className="project-detail-header">
          <button className="project-detail-back" type="button" onClick={onBack} aria-label="Back to home">
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </button>

          <div className="case-overlay-actions project-detail-view-actions is-full-selected" aria-label="View mode">
            <button className="case-overlay-mode-pill case-overlay-mode-button" type="button" onClick={onOpenPreview}>
              Preview
            </button>
            <span className="case-overlay-expand is-active" aria-current="page">
              Full
            </span>
          </div>
        </header>

        <section className="project-detail-hero" aria-labelledby={`${project.id}-title`}>
          <p className="project-detail-kicker">
            <span className="project-detail-kicker-dot" aria-hidden="true" />
            <span id={`${project.id}-title`}>{project.eyebrow}</span>
          </p>
          <p className="project-detail-subtitle">{project.title}</p>

          <div className={`project-detail-media project-showcase-media${project.showLockup === false ? " is-image-only" : ""}`}>
            <img
              className="project-showcase-bg"
              src={project.image}
              srcSet={project.imageSrcSet}
              sizes={project.imageSizes}
              alt={project.imageAlt}
              decoding="async"
              onError={handleProjectImageError}
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
          </div>
        </section>

        <section className="project-detail-meta" aria-label="Project information">
          <div className="project-detail-meta-column">
            <article className="project-detail-info-block">
              <h2>Company</h2>
              <p>
                J.P. Morgan — Investment Banking (0→1 AI Origination & Idea Gen Platform)
                <br />
                Shaping the next generation of origination at a market-leading investment bank.
              </p>
            </article>

            <article className="project-detail-info-block">
              <h2>Responsibility</h2>
              <p>
                Led end-to-end design for a zero-to-one AI platform redefining idea generation and origination in Investment Banking. Defined
                product vision, strategy, and workflow architecture, using AI-assisted prototyping to accelerate alignment and iteration.
              </p>
            </article>
          </div>

          <div className="project-detail-meta-column">
            <article className="project-detail-info-block">
              <h2>Timeline</h2>
              <p>Dec 2025 - Current</p>
            </article>

            <article className="project-detail-info-block">
              <h2>Role & Team</h2>
              <p>
                Product designer working closely with PM, product strategy, a fellow designer, and engineering partners on a zero-to-one AI
                initiative within Investment Banking.
              </p>
            </article>
          </div>
        </section>

        <section className="project-detail-overview" aria-labelledby={`${project.id}-overview`}>
          <p className="project-detail-section-label">
            <span className="project-detail-kicker-dot" aria-hidden="true" />
            <span>Overview</span>
          </p>
          <h2 id={`${project.id}-overview`}>
            Building the all-in-one intelligence and workflow system behind faster, more proactive deal opportunities in investment banking.
          </h2>
          <p>
            I led product design for a zero-to-one AI platform within J.P. Morgan's Investment Bank, built for Transaction Development bankers
            to generate, evaluate, and advance deal opportunities more effectively. The platform unified investor and corporate data, firm
            relationship history, meeting notes, and banker feedback in one shared system.
          </p>
          <p>
            More importantly, it created better workflows for capturing intelligence that would otherwise be lost across teams and deal stages.
            By making knowledge easier to record, reuse, and act on, the product reduced inefficient handoffs, improved pipeline visibility,
            and helped turn scattered institutional context into a more proactive origination engine.
          </p>
        </section>
      </div>
    </main>
  );
}
