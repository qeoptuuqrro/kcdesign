import { useEffect, useRef, useState } from "react";

const investors = [
  { rank: "01", name: "Northbridge Partners", fit: 92, relationship: "Warm relationship", overlap: "3 portfolio overlaps", logo: "NP", sector: "Retail services", color: "#d8d9ff" },
  { rank: "02", name: "Harborline Capital", fit: 86, relationship: "Moderate relationship", overlap: "2 portfolio overlaps", logo: "HC", sector: "Consumer growth", color: "#9fc7ff" },
  { rank: "03", name: "Summit Vale Partners", fit: 79, relationship: "Developing relationship", overlap: "1 portfolio overlap", logo: "SV", sector: "Platform rollups", color: "#d7c58c" },
  { rank: "04", name: "Cedar Rock Equity", fit: 68, relationship: "Low relationship", overlap: "Limited overlap", logo: "CR", sector: "Generalist PE", color: "#c99086" },
];

const governanceSteps = [
  { title: "AI project memory", detail: "design.md, skill.md, architecture rules", artifact: "18 context files" },
  { title: "Prototype architecture", detail: "routes, Zustand state, modular CSS", artifact: "branch-ready app" },
  { title: "Design-system mapping", detail: "Salt references, token rules, UI states", artifact: "0 violations" },
  { title: "Shared delivery path", detail: "prototype review to spec to Jira", artifact: "PM / Design / Eng" },
];

const outcomeMetrics = [
  "~3x faster exploration",
  "18 AI context files",
  "Zustand + modular CSS",
  "3 disciplines / 1 artifact",
  "Prototype branch -> spec -> Jira",
  "Less Figma-to-code translation loss",
];

const outreachAngle =
  "Position Meridian Retail as a scalable consumer platform with adjacency to Northbridge's retail services portfolio and clear expansion potential.";

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const progressBetween = (value, start, end) => clamp01((value - start) / Math.max(0.001, end - start));

const buildFrames = [
  {
    tab: "design.md",
    status: "intent",
    lines: [
      "# Investor recommendation surface",
      "User: banker reviewing sponsor fit",
      "Need: compare rationale, evidence, and next action",
      "Tone: enterprise, compact, reviewable",
      "Output: working UI direction, not a static frame",
    ],
  },
  {
    tab: "module.css",
    status: "surface",
    lines: [
      ".platformShell {",
      "  display: grid;",
      "  grid-template-columns: 124px 1fr 350px;",
      "}",
      "",
      ".recommendationRow {",
      "  min-height: 58px;",
      "  border-radius: var(--salt-radius-100);",
      "}",
      "",
      ".rationaleDrawer { background: var(--salt-container-primary); }",
    ],
  },
  {
    tab: "scale.md",
    status: "density",
    lines: [
      "Surface scale: compact review mode",
      "Spacing: var(--salt-spacing-100)",
      "Hierarchy: list -> evidence -> action",
      "Motion: staged reveal, no layout shift",
      "Mobile: drawer collapses below list",
    ],
  },
  {
    tab: "architecture.md",
    status: "wired",
    lines: [
      "Route: /ideas/investors",
      "Panels: source, recommendations, IdeaBook",
      "Drawer owns AI rationale",
      "Review path: prototype -> spec -> Jira",
      "Guardrail: PM / Design / Eng can inspect one branch",
    ],
  },
  {
    tab: "store.ts",
    status: "state",
    lines: [
      'import { create } from "zustand";',
      "",
      "export const useIdeaStudioStore = create<IdeaState>()(() => ({",
      '  selectedInvestorId: "northbridge-partners",',
      "  addToIdeaBook: queueIdeaForReview,",
      "}));",
    ],
  },
];

const prototypeSequence = [
  {
    name: "module.css",
    label: "Visual rules shape the platform shell",
    lines: ["compact table rows", "drawer elevation", "selected states"],
    output: "Surface hierarchy resolves",
  },
  {
    name: "scale.md",
    label: "Scale rules shape platform density",
    lines: ["review-mode spacing", "responsive columns", "motion timing"],
    output: "Layout feels intentional",
  },
  {
    name: "architecture.md",
    label: "Structure connects product modules",
    lines: ["Route: /ideas/investors", "List + rationale ownership", "Prototype -> spec -> Jira"],
    output: "Views stay connected",
  },
  {
    name: "store.ts",
    label: "State makes the prototype interactive",
    lines: ["create<IdeaState>()", "selectedInvestorId", "addToIdeaBook(id)"],
    output: "Actions become clickable",
  },
];

function useSectionScrollProgress(sectionRef) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const scrollRoot = section.closest(".case-overlay-scroll") || window;
    let frameId = 0;

    const readProgress = () => {
      const scrollTop = scrollRoot === window ? window.scrollY : scrollRoot.scrollTop;
      const viewportHeight = scrollRoot === window ? window.innerHeight : scrollRoot.clientHeight;
      const rootRect = scrollRoot === window ? { top: 0 } : scrollRoot.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = scrollRoot === window ? section.offsetTop : scrollTop + (sectionRect.top - rootRect.top);
      const sectionHeight = section.offsetHeight;
      const start = sectionTop - viewportHeight * 0.18;
      const end = sectionTop + Math.max(1, sectionHeight - viewportHeight * 0.82);
      const nextProgress = Math.max(0, Math.min(1, (scrollTop - start) / Math.max(1, end - start)));

      setScrollProgress((current) => (Math.abs(current - nextProgress) < 0.001 ? current : nextProgress));
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(readProgress);
    };

    readProgress();

    if (scrollRoot === window) {
      window.addEventListener("scroll", requestUpdate, { passive: true });
    } else {
      scrollRoot.addEventListener("scroll", requestUpdate, { passive: true });
    }

    window.addEventListener("resize", requestUpdate);
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(requestUpdate) : null;

    resizeObserver?.observe(section);
    if (scrollRoot !== window) {
      resizeObserver?.observe(scrollRoot);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", requestUpdate);
      resizeObserver?.disconnect();

      if (scrollRoot === window) {
        window.removeEventListener("scroll", requestUpdate);
      } else {
        scrollRoot.removeEventListener("scroll", requestUpdate);
      }
    };
  }, [sectionRef]);

  return scrollProgress;
}

function SourceArtifact({ active = true, compact = false }) {
  return (
    <aside className={`workflow-source-artifact${compact ? " is-compact" : ""}`} aria-label="DISCOVERY.md source artifact">
      <div>
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <strong>DISCOVERY.md</strong>
      </div>
      <p><em>01</em> Opportunity</p>
      <p><em>02</em> Generate investor recommendations for Meridian Retail.</p>
      <p><em>03</em> Signals</p>
      <p><em>04</em> <mark className={active ? "is-active" : ""}>Portfolio overlap</mark></p>
      <p><em>05</em> Sector appetite</p>
      <p><em>06</em> <mark className={active ? "is-active" : ""}>Outreach angle</mark></p>
    </aside>
  );
}

function BuildSystemPoster({ scrollProgress = 0 }) {
  const buildProgress = progressBetween(scrollProgress, 0.04, 0.96);
  const activeFrameIndex = Math.min(buildFrames.length - 1, Math.round(buildProgress * (buildFrames.length - 1)));
  const generatedReveal = progressBetween(scrollProgress, 0.24, 0.96);
  const frameSegment = 1 / Math.max(1, buildFrames.length - 1);
  const frameFadeWindow = frameSegment * 0.5;

  return (
    <div className="workflow-build-poster" aria-label="Product intent to code-backed prototype generation">
      <aside className="workflow-design-editor" aria-label="Platform rule source card">
        <div className="workflow-design-tabs" aria-label="Platform rule files">
          {["FILES", ...buildFrames.map((frame) => frame.tab)].map((tab, index) => (
            <span className={index === activeFrameIndex + 1 ? "is-active" : ""} key={tab}>{tab}</span>
          ))}
        </div>
        <div className="workflow-editor-window">
          <header>
            <div aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <strong>platform rules - code-backed prototype</strong>
            <button type="button" aria-label="Expand platform rule preview">↗</button>
          </header>
          <div className="workflow-intent-frame" aria-label="Animated platform rule files">
            {buildFrames.map((frame, frameIndex) => {
              const frameVisibility = clamp01(1 - Math.abs(buildProgress - (frameIndex * frameSegment)) / frameFadeWindow);
              const isFrameVisible = frameVisibility > 0.035;

              return (
                <section
                  style={{
                    "--frame-visibility": frameVisibility,
                    "--frame-depth": Math.abs(activeFrameIndex - frameIndex),
                    zIndex: Math.round(frameVisibility * 100),
                    visibility: isFrameVisible ? "visible" : "hidden",
                  }}
                  aria-hidden={!isFrameVisible}
                  key={frame.tab}
                >
                  <header>
                    <strong>{frame.tab}</strong>
                    <span>{frame.status}</span>
                  </header>
                  {frame.lines.map((line, lineIndex) => (
                    <p style={{ "--line-index": lineIndex, "--line-reveal": progressBetween(frameVisibility, 0.08 + lineIndex * 0.045, 0.42 + lineIndex * 0.045) }} key={`${frame.tab}-${lineIndex}`}>
                      <code>{line || " "}</code>
                    </p>
                  ))}
                </section>
              );
            })}
          </div>
        </div>
      </aside>

      <article
        className="workflow-generated-product"
        style={{
          "--workflow-product-reveal": generatedReveal,
          "--generated-list-reveal": progressBetween(scrollProgress, 0.36, 0.68),
          "--generated-viz-reveal": progressBetween(scrollProgress, 0.58, 0.84),
          "--generated-checks-reveal": progressBetween(scrollProgress, 0.72, 0.98),
        }}
        aria-label="Generated prototype artifact"
      >
        <header>
          <div>
            <strong>Generated UI</strong>
            <span>prototype branch compiling</span>
          </div>
          <span>rules + runtime</span>
        </header>
        <div className="workflow-generation-meter">
          {[
            ["05%", "context"],
            ["36%", "structure"],
            ["70%", "states"],
            ["100%", "reviewable"],
          ].map(([value, label], index) => (
            <span style={{ "--meter-progress": progressBetween(scrollProgress, 0.22 + index * 0.15, 0.42 + index * 0.15) }} key={value}>
              <b>{value}</b>
              {label}
            </span>
          ))}
        </div>
        <div className="workflow-generated-bridge" aria-label="File inputs connected to platform output">
          <span style={{ "--bridge-reveal": progressBetween(scrollProgress, 0.24, 0.42) }}>
            <b>module.css</b>
            <em>component shell</em>
          </span>
          <i aria-hidden="true" />
          <span style={{ "--bridge-reveal": progressBetween(scrollProgress, 0.4, 0.58) }}>
            <b>scale.md</b>
            <em>density + hierarchy</em>
          </span>
          <i aria-hidden="true" />
          <span style={{ "--bridge-reveal": progressBetween(scrollProgress, 0.56, 0.74) }}>
            <b>architecture.md</b>
            <em>routes + panels</em>
          </span>
          <i aria-hidden="true" />
          <span style={{ "--bridge-reveal": progressBetween(scrollProgress, 0.7, 0.9) }}>
            <b>store.ts</b>
            <em>state + actions</em>
          </span>
        </div>
        <div className="workflow-generated-ui">
          <small>Investor Recommendations</small>
          <span className="is-selected"><b>Northbridge Partners</b><em>92</em></span>
          <span><b>Harborline Capital</b><em>86</em></span>
          <div className="workflow-generated-mini-viz" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="workflow-generated-checks">
            {["Route mounted", "State connected", "Drawer ready"].map((item, index) => (
              <span style={{ "--check-delay": `${index * 4200}ms` }} key={item}>{item}</span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

function RelationshipGraph() {
  return (
    <div className="workflow-relationship-graph" aria-label="Relationship and overlap graph">
      <span className="is-company">MR</span>
      <i />
      <span>Retail thesis</span>
      <i />
      <span className="is-selected">NP</span>
      <small>Warm path · 3 overlaps</small>
    </div>
  );
}

function SectionIntro({ kicker, title, children, id }) {
  return (
    <div className="workflow-section-intro">
      <h3 id={id}>{title}</h3>
      <div>
        <p>{children}</p>
        <span>{kicker}</span>
      </div>
    </div>
  );
}

function ValidationBadge({ compact = false, packaged = true }) {
  return (
    <aside className={`workflow-validation-badge${compact ? " is-compact" : ""}${packaged ? " is-visible" : ""}`} aria-label="Production-near validation">
      <strong>{compact ? "Production-near · 4/4 checks passed" : "Production-near"}</strong>
      {!compact && <span>4/4 checks passed</span>}
      {!compact && (
        <ul>
          <li>Behavior mapped</li>
          <li>States defined</li>
          <li>Ready for PM / Design / Eng review</li>
        </ul>
      )}
    </aside>
  );
}

function ThesisSection() {
  const sectionRef = useRef(null);
  const scrollProgress = useSectionScrollProgress(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="workflow-story-section workflow-thesis-section is-scroll-built"
      style={{
        "--workflow-build-scroll": scrollProgress,
        "--workflow-build-reveal": Math.max(0, Math.min(1, (scrollProgress - 0.08) / 0.84)),
      }}
      aria-labelledby="workflow-thesis-title"
    >
      <div className="workflow-thesis-sticky">
        <SectionIntro kicker="01 · Product intent to shipped prototype" title="Turning product intent into production-near prototypes." id="workflow-thesis-title">
          Instead of shipping static Figma images, the workflow turned product direction into a reviewable branch where layout files, scale rules, architecture, and state could be inspected together.
        </SectionIntro>
        <div className="workflow-transformation-poster" aria-label="Discovery source to production-near prototype transformation">
          <BuildSystemPoster scrollProgress={scrollProgress} />
        </div>
      </div>
    </section>
  );
}

function ProductMomentSection() {
  const [ideaBookAdded, setIdeaBookAdded] = useState(false);
  const sectionRef = useRef(null);
  const scrollProgress = useSectionScrollProgress(sectionRef);
  const prototypeProgress = progressBetween(scrollProgress, 0.04, 0.96);
  const packaged = scrollProgress > 0.95;
  const activePrototypeStepIndex = Math.min(prototypeSequence.length - 1, Math.round(prototypeProgress * (prototypeSequence.length - 1)));
  const productReveal = progressBetween(scrollProgress, 0.22, 0.94);
  const signalsActive = scrollProgress > 0.38;
  const outreachReady = scrollProgress > 0.78;
  const isComplete = scrollProgress > 0.95;

  useEffect(() => {
    if (!isComplete) {
      setIdeaBookAdded(false);
    }
  }, [isComplete]);

  const handleGenerateOutreach = () => {
    if (isComplete) {
      setIdeaBookAdded(true);
    }
  };

  const addToIdeaBook = () => {
    if (isComplete) {
      setIdeaBookAdded(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="workflow-story-section workflow-product-section is-scroll-built"
      style={{
        "--workflow-product-scroll": scrollProgress,
        "--workflow-product-reveal": productReveal,
        "--workflow-active-step": activePrototypeStepIndex,
        "--workflow-signal-reveal": progressBetween(scrollProgress, 0.4, 0.76),
        "--workflow-drawer-reveal": progressBetween(scrollProgress, 0.62, 0.96),
      }}
      aria-labelledby="workflow-product-title"
    >
      <div className="workflow-product-sticky">
        <SectionIntro kicker="02 · Prototype in use" title="The AI-created prototype behaved like a real product." id="workflow-product-title">
          module.css and scale.md shaped the platform surface; architecture.md and store.ts carried routing, ownership, and state, so the artifact could show real interactions instead of a static mock.
        </SectionIntro>
        <article className="workflow-product-stage" aria-label="Idea Generation Studio investor recommendation product moment">
        <header className="workflow-appbar">
          <div>
            <strong>Idea Generation Studio</strong>
            <span>Investor Recommendations</span>
          </div>
          <nav aria-label="Product mode">
            <span>Source</span>
            <span className="is-active">Recommendations</span>
            <span>IdeaBook</span>
          </nav>
          <em>{packaged ? "IdeaBook-ready" : "High confidence"}</em>
        </header>

        <div className={`workflow-prototype-context${signalsActive ? " is-active" : ""}`} aria-label="Prototype build context">
          {prototypeSequence.map((step, index) => {
            const stepSegment = 1 / Math.max(1, prototypeSequence.length - 1);
            const stepVisibility = clamp01(1 - Math.abs(prototypeProgress - (index * stepSegment)) / (stepSegment * 0.48));
            const isStepVisible = stepVisibility > 0.035;

            return (
              <article
                className="workflow-prototype-step"
                style={{
                  "--step-visibility": stepVisibility,
                  visibility: isStepVisible ? "visible" : "hidden",
                }}
                aria-hidden={!isStepVisible}
                key={step.name}
              >
                <div>
                  <strong>{step.name}</strong>
                  <span>{step.label}</span>
                  {step.lines.map((line) => (
                    <code key={line}>{line}</code>
                  ))}
                </div>
                <i aria-hidden="true" />
                <b>{step.output}</b>
              </article>
            );
          })}
        </div>

        <div className="workflow-product-shell">
          <aside className="workflow-product-rail" aria-label="Workspace navigation">
            {["Inbox", "Companies", "Investors", "IdeaBooks"].map((item) => (
              <span className={item === "Investors" ? "is-active" : ""} key={item}>
                {item}
              </span>
            ))}
          </aside>

          <main className="workflow-recommendation-list">
            <div className="workflow-list-header">
              <span>Meridian Retail</span>
              <strong>Recommended investors</strong>
            </div>
            <div className={`workflow-logo-strip${signalsActive ? " is-active" : ""}`} aria-label="Company and investor signals">
              <span className="is-company">
                <b>MR</b>
                <em>Meridian Retail</em>
              </span>
              {investors.map((investor, index) => (
                <span style={{ "--logo-color": investor.color, "--logo-delay": `${index * 160}ms` }} key={investor.name}>
                  <b>{investor.logo}</b>
                  <em>{investor.sector}</em>
                </span>
              ))}
            </div>
            <div className={`workflow-signal-dashboard${signalsActive ? " is-active" : ""}`} aria-label="Recommendation signal dashboard">
              <div className="workflow-fit-chart">
                <span>Fit distribution</span>
                {investors.map((investor, index) => (
                  <i
                    className={index === 0 ? "is-selected" : ""}
                    style={{ "--bar": `${investor.fit}%`, "--bar-color": investor.color, "--bar-delay": `${index * 90}ms` }}
                    key={investor.name}
                  >
                    <b>{investor.logo}</b>
                  </i>
                ))}
              </div>
              <div className="workflow-signal-matrix">
                {[
                  ["Overlap", "3 comps", 92],
                  ["Appetite", "Active", 84],
                  ["Relationship", "Warm", 88],
                ].map(([label, value, score], index) => (
                  <span style={{ "--meter": `${score}%`, "--meter-delay": `${index * 120}ms` }} key={label}>
                    <b>{label}</b>
                    <em>{value}</em>
                    <i />
                  </span>
                ))}
              </div>
              <div className="workflow-source-evidence">
                <span>AI evidence scan</span>
                {[
                  ["portfolio", 3, "overlaps"],
                  ["consumer", 8, "recent deals"],
                  ["warm", 2, "paths"],
                ].map(([label, value, detail], index) => (
                  <em style={{ "--evidence-delay": `${index * 140}ms` }} key={label}>
                    <b>{value}</b>
                    <small>{label}</small>
                    <i>{detail}</i>
                  </em>
                ))}
              </div>
            </div>
            <RelationshipGraph />
            <div className="workflow-table-head" aria-hidden="true">
              <span>Investor</span>
              <span>Relationship</span>
              <span>Overlap</span>
              <span>Fit</span>
            </div>
            {investors.map((investor, index) => (
              <button className={`workflow-investor-row${index === 0 ? " is-selected" : ""}`} type="button" key={investor.name}>
                <span>
                  <i style={{ "--logo-color": investor.color }}>{investor.logo}</i>
                  <em>{investor.rank}</em>
                  <strong>{investor.name}</strong>
                </span>
                <span>{investor.relationship}</span>
                <span>{investor.overlap}</span>
                <b>{investor.fit}</b>
              </button>
            ))}
          </main>

          <aside
            className={`workflow-rationale-drawer${signalsActive ? " has-active-signals" : ""}${outreachReady ? " is-ready" : ""}`}
            aria-label="AI rationale drawer"
          >
            <div className="workflow-drawer-title">
              <div>
                <span>
                  <i aria-hidden="true" /> AI rationale
                </span>
                <strong>Northbridge Partners</strong>
              </div>
              <em>{packaged ? "IdeaBook-ready" : "High confidence"}</em>
            </div>
            <div className="workflow-confidence-visual" aria-label="High confidence score">
              <strong>92</strong>
              <span>confidence</span>
              <i />
            </div>
            <p>Northbridge is a strong fit based on retail services thesis, recent activity in adjacent consumer categories, and relevant portfolio overlap.</p>
            <div className={`workflow-ai-path${signalsActive ? " is-active" : ""}`} aria-label="AI recommendation reasoning path">
              <span>Overlap</span>
              <i />
              <span>Activity</span>
              <i />
              <span>Warm path</span>
              <strong>92 fit</strong>
            </div>
            <div className="workflow-signal-list">
              {[
                ["Portfolio overlap", "3 relevant companies"],
                ["Sector appetite", "Active in consumer services"],
                ["Relationship signal", "Warm"],
                ["Source confidence", "High"],
              ].map(([label, value], index) => (
                <span style={{ "--signal-delay": `${index * 130}ms` }} key={label}>
                  <b>{label}</b>
                  {value}
                </span>
              ))}
            </div>
            <div className="workflow-outreach-composer">
              <span>Outreach angle</span>
              <p>{outreachReady ? outreachAngle : "Scroll to reveal the rationale, then the outreach angle will materialize here."}</p>
            </div>
            {ideaBookAdded && <div className="workflow-added-confirmation">Added to IdeaBook</div>}
            <div className="workflow-drawer-actions">
              <button type="button" disabled={!isComplete} onClick={handleGenerateOutreach}>
                Generate outreach angle
              </button>
              <button type="button" disabled={!isComplete || ideaBookAdded} onClick={addToIdeaBook}>
                {ideaBookAdded ? "Added" : "Add to IdeaBook"}
              </button>
            </div>
          </aside>
        </div>
        {isComplete && <ValidationBadge compact />}
        </article>
      </div>
    </section>
  );
}

function OperatingModelSection() {
  return (
    <section className="workflow-story-section workflow-operating-section" aria-labelledby="workflow-operating-title">
      <SectionIntro kicker="03 · Operating model + proof" title="AI-native, but governed." id="workflow-operating-title">
        The prototype shipped faster because AI had project memory, front-end architecture, design-system mapping, and a shared review path.
      </SectionIntro>

      <div className="workflow-governance-visual" aria-label="Governed AI operating model">
        <div className="workflow-governance-line" aria-hidden="true" />
        {governanceSteps.map((step, index) => (
          <article style={{ "--step-delay": `${index * 160}ms` }} key={step.title}>
            <em>{String(index + 1).padStart(2, "0")}</em>
            <strong>{step.title}</strong>
            <p>{step.detail}</p>
            <span>{step.artifact}</span>
          </article>
        ))}
        <div className="workflow-token-scan" aria-label="Design-system verification example">
          <span>Prototype governance</span>
          <code>static Figma frame</code>
          <i />
          <code>Zustand state + Salt tokens + modules.css</code>
          <b>production-translatable</b>
        </div>
      </div>

      <div className="workflow-outcome-metrics" aria-label="AI workflow outcome metrics">
        {outcomeMetrics.map((metric) => (
          <span key={metric}>{metric}</span>
        ))}
      </div>
    </section>
  );
}

export default function ExecutableDirectionConsole() {
  const rootRef = useRef(null);

  return (
    <div ref={rootRef} className="workflow-chapter" aria-label="AI workflow chapter">
      <ThesisSection />
      <ProductMomentSection />
      <OperatingModelSection />
    </div>
  );
}
