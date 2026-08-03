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

const intentCards = [
  {
    label: "Objective",
    body: "Help bankers understand sponsor fit, compare evidence, and move from recommendation to next action with confidence.",
  },
  {
    label: "Users",
    body: "Product, design, and engineering teams reviewing AI-assisted origination workflows.",
  },
  {
    label: "Outcomes",
    body: "Surface meaningful sponsor signals, reduce validation time, and preserve trust with reproducible rationale.",
  },
  {
    label: "Success criteria",
    body: "Actionable recommendations, reliable data, intuitive interaction states, and performance at enterprise scale.",
  },
];

const foundationRules = [
  ["Color", "swatches"],
  ["Typography", "Aa"],
  ["Spacing", "grid"],
  ["Radius", "rounded"],
  ["Elevation", "stack"],
  ["Motion", "orbit"],
];

const componentRules = ["Button", "Input", "Table", "Card", "Modal", "Tooltip"];
const behaviorRules = ["States", "Feedback", "Empty", "Loading", "Error", "Responsive"];

const verificationCards = [
  { title: "0 violations", body: "All rules validated against the design system.", badge: "check" },
  { title: "Branch-ready", body: "Context is traceable, versioned, and ready for the prototype.", badge: "branch", meta: "feat/idea-studio" },
  { title: "Prototype context assembled", body: "All inputs compiled for Copilot prototype generation.", badge: "stack" },
];

const layerOneFiles = ["design.md", "module.css", "scale.md"];

const layerOneFileDetails = [
  {
    title: "Product brief",
    body: "Sponsor-fit goals, users, confidence criteria, and the review outcome the prototype must support.",
    chips: ["objective", "users", "success"],
  },
  {
    title: "Interface rules",
    body: "Density, component states, motion limits, and reusable Salt-aligned CSS modules.",
    chips: ["tables", "states", "motion"],
  },
  {
    title: "Scale model",
    body: "Responsive behavior, compact review mode, and performance rules for enterprise data surfaces.",
    chips: ["density", "breakpoints", "latency"],
  },
];

const layerTwoFiles = [
  {
    name: "architecture.md",
    eyebrow: "Architecture",
    lines: [
      ["Route", "/ideas/investors"],
      ["Purpose", "surface AI-ranked investors"],
      ["State", "recommendations"],
      ["Ownership", "Investors domain"],
      ["Views", "list, detail, rationale"],
      ["Data", "profiles, fit scores, signals"],
      ["Prototype", "spec -> production"],
    ],
    note: "Views stay connected",
  },
  {
    name: "module.css",
    eyebrow: "Module rules",
    lines: [
      ["Shell", "rail + workspace grid"],
      ["Cards", "radius-200 + soft border"],
      ["Rows", "64px recommendation rows"],
      ["Drawer", "rationale panel"],
      ["Tokens", "Salt-aligned spacing"],
      ["Motion", "no layout shift"],
      ["Prototype", "visual contract"],
    ],
    note: "Surface resolves",
  },
  {
    name: "scale.md",
    eyebrow: "Density",
    lines: [
      ["Mode", "compact review"],
      ["Hierarchy", "recommendation -> evidence"],
      ["Tabs", "recommendations, ideabook"],
      ["Score", "fit ring + confidence"],
      ["Metrics", "overlap, activity, path"],
      ["Breakpoints", "desktop first"],
      ["Prototype", "ready to test"],
    ],
    note: "Density stays calm",
  },
  {
    name: "store.ts",
    eyebrow: "State",
    lines: [
      ["Store", "useIdeaStudioStore"],
      ["Selected", "northbridge-partners"],
      ["Actions", "addToIdeaBook(id)"],
      ["Signals", "portfolio, activity"],
      ["Drawer", "owns rationale"],
      ["Route", "keeps context"],
      ["Prototype", "clickable"],
    ],
    note: "Actions become real",
  },
];

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
    label: "Interface rules shape the workspace shell",
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
  const fileProgress = progressBetween(scrollProgress, 0.08, 0.74);
  const activeFileIndex = Math.min(layerOneFiles.length - 1, Math.floor(fileProgress * layerOneFiles.length));
  const activeFile = layerOneFileDetails[activeFileIndex] ?? layerOneFileDetails[0];
  const verificationProgress = progressBetween(scrollProgress, 0.52, 0.94);
  const stateProgress = progressBetween(scrollProgress, 0.34, 0.82);

  return (
    <div
      className="ai-layer-one-artifact"
      style={{
        "--layer-one-progress": scrollProgress,
        "--layer-one-file-progress": fileProgress,
        "--layer-one-state-progress": stateProgress,
        "--layer-one-verification-progress": verificationProgress,
      }}
      aria-label="Direction system artifact"
    >
      <header className="ai-layer-one-header">
        <div>
          <i aria-hidden="true" />
          <span>01 · Direction System</span>
        </div>
        <p>The artifact that turns product intent into reliable AI context.</p>
      </header>

      <div className="ai-layer-one-grid">
        <section className="ai-layer-one-column ai-layer-one-intent" aria-label="Product intent">
          <div className="ai-layer-title">
            <span aria-hidden="true">▤</span>
            <strong>Product intent</strong>
          </div>
          {intentCards.map((card) => (
            <article className="ai-intent-card" key={card.label}>
              <span>{card.label}</span>
              <p>{card.body}</p>
            </article>
          ))}
        </section>

        <section className="ai-layer-one-column ai-layer-one-system" aria-label="Design-system rules">
          <div className="ai-layer-title">
            <span aria-hidden="true">✣</span>
            <strong>Design-system rules</strong>
          </div>

          <div className="ai-rule-tabs" aria-label="Context source files">
            {layerOneFiles.map((file, index) => (
              <span
                className={index === activeFileIndex ? "is-active" : ""}
                style={{ "--tab-reveal": progressBetween(fileProgress, index * 0.24, 0.34 + index * 0.24) }}
                key={file}
              >
                <i aria-hidden="true" />
                {file}
              </span>
            ))}
          </div>

          <article className="ai-active-file-card" aria-live="polite">
            <div>
              <span>{layerOneFiles[activeFileIndex]}</span>
              <strong>{activeFile.title}</strong>
              <p>{activeFile.body}</p>
            </div>
            <ul>
              {activeFile.chips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </article>

          <div className="ai-rule-matrix">
            <section>
              <h4>Foundations</h4>
              {foundationRules.map(([rule, token]) => (
                <span key={rule}>
                  <b>{rule}</b>
                  <em className={`is-${token}`}>{token}</em>
                </span>
              ))}
            </section>
            <section>
              <h4>Component rules</h4>
              {componentRules.map((rule) => (
                <span key={rule}>
                  <b>{rule}</b>
                  <em>✓</em>
                </span>
              ))}
            </section>
            <section>
              <h4>Behavior</h4>
              {behaviorRules.map((rule) => (
                <span key={rule}>
                  <b>{rule}</b>
                  <em>✓</em>
                </span>
              ))}
            </section>
          </div>

          <div className="ai-rule-bottom">
            <article className="ai-architecture-card">
              <div className="ai-layer-title is-small">
                <span aria-hidden="true">⌘</span>
                <strong>Architecture</strong>
              </div>
              <div aria-hidden="true">
                <span>UI Layer</span>
                <i />
                <p>
                  <b>Features</b>
                  <b>Shared</b>
                </p>
                <p>
                  <b>Data</b>
                  <b>Services</b>
                  <b>Analytics</b>
                </p>
              </div>
            </article>
            <article className="ai-state-card">
              <div className="ai-layer-title is-small">
                <span aria-hidden="true">◉</span>
                <strong>State model</strong>
              </div>
              <div aria-hidden="true">
                {["idle", "loading", "loaded", "empty", "error"].map((state) => (
                  <span className={`is-${state}`} key={state}>{state}</span>
                ))}
                <i className="is-a" />
                <i className="is-b" />
                <i className="is-c" />
              </div>
            </article>
          </div>
        </section>

        <section className="ai-layer-one-column ai-layer-one-proof" aria-label="Verification">
          <div className="ai-layer-title">
            <span aria-hidden="true">◇</span>
            <strong>Verification</strong>
          </div>
          <div className="ai-review-strip">
            <span>PM / Design / Eng review</span>
            <p>
              {["PM", "DS", "ENG"].map((role) => (
                <b key={role}>{role}<i /></b>
              ))}
            </p>
          </div>
          <div className="ai-verification-stack">
            {verificationCards.map((card) => (
              <article key={card.title}>
                <i className={`is-${card.badge}`} aria-hidden="true" />
                <div>
                  <strong>{card.title}</strong>
                  <p>{card.body}</p>
                  {card.meta && <code>{card.meta}</code>}
                </div>
              </article>
            ))}
          </div>
          <div className="ai-ui-preview" aria-label="Preview of generated UI">
            <span>Preview of generated UI (from this context)</span>
            <div aria-hidden="true">
              <aside>
                <i />
                <i />
                <i />
                <i />
              </aside>
              <main>
                <b />
                <b />
                <b />
                <p>
                  <i />
                  <i />
                </p>
              </main>
              <aside>
                <i />
                <i />
                <i />
                <i />
              </aside>
            </div>
          </div>
        </section>
      </div>
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
        <SectionIntro kicker="01 · Direction system" title="A governed artifact before the prototype gets built." id="workflow-thesis-title">
          Product brief, design-system rules, state model, verification, and branch readiness are assembled before the product demo appears.
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
  const activeLayerTwoFile = layerTwoFiles[activePrototypeStepIndex];

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
        <article
          className="workflow-product-stage ai-layer-two-artifact"
          style={{
            "--layer-two-progress": scrollProgress,
            "--layer-two-product-reveal": productReveal,
            "--layer-two-signal-reveal": progressBetween(scrollProgress, 0.42, 0.82),
          }}
          aria-label="Prototype in use artifact"
        >
          <header className="ai-layer-two-header">
            <span aria-hidden="true"><i /></span>
            <em>02 · Prototype in use</em>
            <strong className="ai-layer-two-progress" aria-hidden="true">
              <i />
            </strong>
          </header>

          <div className="ai-layer-two-body">
            <aside className="ai-code-artifact" aria-label={`${activeLayerTwoFile.name} artifact`}>
              <nav aria-label="Prototype source files">
                {layerTwoFiles.map((file, index) => (
                  <span
                    className={index === activePrototypeStepIndex ? "is-active" : ""}
                    style={{ "--tab-reveal": progressBetween(prototypeProgress, index * 0.16, 0.28 + index * 0.16) }}
                    key={file.name}
                  >
                    {index === 0 && <i aria-hidden="true" />}
                    {file.name}
                  </span>
                ))}
              </nav>
              <div className="ai-code-lines">
                <span>{activeLayerTwoFile.eyebrow}</span>
                {activeLayerTwoFile.lines.map(([label, value], index) => (
                  <p style={{ "--line-reveal": progressBetween(prototypeProgress, index * 0.08, 0.28 + index * 0.08) }} key={`${label}-${value}`}>
                    <b>{label}:</b>
                    <code>{value}</code>
                  </p>
                ))}
              </div>
            </aside>

            <div className="ai-code-bridge" aria-hidden="true">
              <span>→</span>
              <p>{activeLayerTwoFile.note}</p>
            </div>

            <section className="ai-product-artifact" aria-label="Idea Generation Studio product prototype">
              <aside className="ai-product-rail" aria-hidden="true">
                {["◇", "⌂", "♧", "▥", "▥", "⚙"].map((icon, index) => (
                  <span className={index === 0 ? "is-active" : ""} key={`${icon}-${index}`}>{icon}</span>
                ))}
              </aside>
              <div className="ai-product-screen">
                <header>
                  <div>
                    <strong>Idea Generation Studio</strong>
                    <span>Investor Recommendations</span>
                  </div>
                  <em>High confidence</em>
                  <b>MR</b>
                </header>
                <nav>
                  <span className="is-active">Recommendations</span>
                  <span>Ideabook</span>
                </nav>
                <article className="ai-investor-card">
                  <h4>Recommended investors</h4>
                  <div className="ai-investor-profile">
                    <span>NP</span>
                    <div>
                      <strong>Northbridge Partners</strong>
                      <p>Private equity · Consumer · North America</p>
                    </div>
                    <b>92<i>fit</i></b>
                  </div>
                  <i className="ai-fit-bar" aria-hidden="true" />
                  <div className="ai-investor-evidence">
                    <span><b>3</b>portfolio overlap</span>
                    <span><b>8</b>activity signals</span>
                    <span><b>2</b>warm path strength</span>
                    <p>Northbridge is a strong fit based on retail services thesis, recent activity in adjacent consumer categories, and relevant portfolio overlap.</p>
                  </div>
                </article>
              </div>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}

function OperatingModelSection() {
  const sectionRef = useRef(null);
  const scrollProgress = useSectionScrollProgress(sectionRef);
  const operatingProgress = progressBetween(scrollProgress, 0.05, 0.96);
  const activeStepIndex = Math.min(governanceSteps.length - 1, Math.floor(operatingProgress * governanceSteps.length));

  return (
    <section
      ref={sectionRef}
      className="workflow-story-section workflow-operating-section is-scroll-built"
      style={{
        "--workflow-operating-scroll": scrollProgress,
        "--workflow-operating-reveal": operatingProgress,
        "--workflow-operating-active": activeStepIndex,
      }}
      aria-labelledby="workflow-operating-title"
    >
      <div className="workflow-operating-sticky">
        <SectionIntro kicker="03 · Operating model + proof" title="AI-native, but governed." id="workflow-operating-title">
          The prototype shipped faster because AI had project memory, front-end architecture, design-system mapping, and a shared review path.
        </SectionIntro>

        <div className="workflow-governance-visual" aria-label="Governed AI operating model">
          <div className="workflow-governance-line" aria-hidden="true" />
          <div className="workflow-governance-progress" aria-hidden="true">
            <strong>
              <b />
              <em>03 · Operating model + proof</em>
            </strong>
            <i />
            <span>scroll locks section · artifacts assemble</span>
          </div>

          <div className="workflow-governance-lanes">
            {governanceSteps.map((step, index) => (
              <article
                className={index <= activeStepIndex ? "is-active" : ""}
                style={{
                  "--step-delay": `${index * 160}ms`,
                  "--step-reveal": progressBetween(operatingProgress, index * 0.16, 0.34 + index * 0.16),
                }}
                key={step.title}
              >
                <i aria-hidden="true" />
                <em>{String(index + 1).padStart(2, "0")}</em>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
                <span>{step.artifact}</span>
              </article>
            ))}
          </div>

          <div className="workflow-token-scan" aria-label="Design-system verification example">
            <span>Prototype governance</span>
            <code>static Figma frame</code>
            <i />
            <code>Zustand state + Salt tokens + modules.css</code>
            <b>branch proof</b>
          </div>
        </div>

        <div className="workflow-outcome-metrics" aria-label="AI workflow outcome metrics">
          {outcomeMetrics.map((metric, index) => (
            <span style={{ "--metric-reveal": progressBetween(operatingProgress, 0.42 + index * 0.06, 0.64 + index * 0.06) }} key={metric}>{metric}</span>
          ))}
        </div>
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
