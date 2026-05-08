import { useEffect, useMemo, useState } from "react";

const tokenGroups = [
  { title: "Layout", match: ["width", "height", "gap", "padding", "radius"] },
  { title: "Color", match: ["bg", "text", "active"] },
  { title: "Material", match: ["glass", "blur", "shadow", "scrollbar"] },
  { title: "Component", match: ["hero", "landing", "collections", "project", "case", "glass", "menu", "dot"] },
];

const componentRegistry = [
  {
    name: "Navbar",
    selector: ".site-header",
    role: "Top navigation with logo and section menu.",
    preview: "navbar",
    classes: ["site-header", "logo-mark", "right-menu", "menu-item", "active-dot"],
  },
  {
    name: "Hero Identity",
    selector: ".hero-identity",
    role: "Main nameplate plus the value statement.",
    preview: "heroIdentity",
    classes: ["hero", "hero-identity", "hero-name", "hero-copy", "hero-role-line", "hero-role-word", "hero-role-dot", "hero-role-tail"],
  },
  {
    name: "Hero Details",
    selector: ".hero-details",
    role: "Right-side one-line location, time, and role facts.",
    preview: "heroDetails",
    classes: ["hero-details", "hero-facts-group", "hero-fact", "hero-learn-more"],
  },
  {
    name: "Landing Media",
    selector: ".landing-media-frame",
    role: "Introductory homepage motion preview.",
    preview: "landingMedia",
    classes: ["landing-media-section", "landing-media-frame", "landing-media-video"],
  },
  {
    name: "Collections Intro",
    selector: ".collections-intro",
    role: "Centered transition cue into the work collection.",
    preview: "collectionsIntro",
    classes: ["collections-intro", "collections-intro-group", "scroll-cue"],
  },
  {
    name: "Project Showcase",
    selector: ".project-showcase-card",
    role: "Reusable work card with media lockup, title, description, and bullets.",
    preview: "projectShowcase",
    classes: [
      "project-showcase-section",
      "project-showcase-card",
      "project-showcase-media",
      "project-showcase-copy",
      "project-showcase-points",
    ],
  },
  {
    name: "Case Preview Dialog",
    selector: ".case-overlay-panel",
    role: "Responsive preview modal for case-study reading before full view.",
    preview: "casePreviewDialog",
    classes: ["case-overlay", "case-overlay-panel", "case-overlay-scroll", "case-section-nav", "case-project-nav-button"],
  },
];

const typographySamples = [
  { name: "Body", selector: "body", text: "Base type used across the site." },
  { name: "Hero Name", selector: ".hero-name", text: "KRIS CHEN 陳俊豪" },
  { name: "Hero Statement", selector: ".hero-role-line", text: "Product Designer / AI Builder / Engineer / Building 0→1 AI Products" },
  { name: "Hero Details", selector: ".hero-fact", text: "CURRENT LOCATION: NEW YORK" },
  { name: "Collections Label", selector: ".collections-intro-label", text: "COLLECTIONS OF WORKS" },
  { name: "Project Lockup", selector: ".project-showcase-brand", text: "JP.Morgan." },
  { name: "Project Eyebrow", selector: ".project-showcase-eyebrow", text: "JP Morgan" },
  {
    name: "Project Description",
    selector: ".project-showcase-title",
    text: "Building human-in-the-loop agentic AI workflow experiences.",
  },
  { name: "Project Bullets", selector: ".project-showcase-points", text: "Reduced origination research time by 40%." },
];

const spacingSamples = [
  {
    label: "Section stack gap",
    token: "--section-stack-gap",
    preview: "sectionStack",
    description: "The vertical rhythm between hero, media, collection cue, and work cards.",
  },
  {
    label: "Project bullet gap",
    token: "--project-showcase-bullet-gap",
    preview: "projectBullets",
    description: "The tight space between proof-point bullets under each project.",
  },
  {
    label: "Project copy gap",
    token: "--project-showcase-copy-gap",
    preview: "projectCopy",
    description: "The stack rhythm between eyebrow, title, and bullet list.",
  },
  {
    label: "Collections icon gap",
    token: "--collections-intro-gap",
    preview: "collectionsGap",
    description: "The horizontal lockup gap between the label and scroll cue.",
  },
  {
    label: "Hero identity frame",
    token: "--hero-identity-width",
    secondaryToken: "--hero-identity-height",
    preview: "heroFrame",
    description: "The nameplate block that contains Kris Chen plus the hero statement.",
  },
  {
    label: "Primary media frame",
    token: "--landing-media-width",
    secondaryToken: "--landing-media-height",
    preview: "mediaFrame",
    description: "The reusable visual width for landing media and project showcase.",
  },
  {
    label: "Case preview shell",
    token: "--case-preview-width",
    secondaryToken: "--case-preview-margin",
    preview: "casePreviewDialog",
    description: "The responsive dialog footprint: content stays aligned while the shell creates breathing room.",
  },
];

const styleFields = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "lineHeight",
  "letterSpacing",
  "color",
  "width",
  "height",
  "gap",
  "marginTop",
  "borderRadius",
];

function getCssVariables() {
  const rootStyles = getComputedStyle(document.documentElement);
  return Array.from(document.styleSheets)
    .flatMap((sheet) => {
      try {
        return Array.from(sheet.cssRules);
      } catch {
        return [];
      }
    })
    .filter((rule) => rule.selectorText === ":root")
    .flatMap((rule) =>
      Array.from(rule.style)
        .filter((name) => name.startsWith("--"))
        .map((name) => ({
          name,
          value: rootStyles.getPropertyValue(name).trim(),
        })),
    );
}

function getClassInventory() {
  const names = new Set();
  document.querySelectorAll("[class]").forEach((node) => {
    node.classList.forEach((className) => names.add(className));
  });
  return Array.from(names).sort();
}

function readComputedStyle(selector) {
  const node = document.querySelector(selector);
  if (!node) {
    return null;
  }

  const styles = getComputedStyle(node);
  return styleFields
    .map((field) => [field, styles[field]])
    .filter(([, value]) => value && value !== "normal" && value !== "auto" && value !== "0px");
}

function groupTokens(tokens) {
  const used = new Set();
  const groups = tokenGroups.map((group) => {
    const matches = tokens.filter((token) => {
      const normalized = token.name.replace("--", "");
      return group.match.some((part) => normalized.includes(part));
    });
    matches.forEach((token) => used.add(token.name));
    return { ...group, tokens: matches };
  });

  const otherTokens = tokens.filter((token) => !used.has(token.name));
  return otherTokens.length ? [...groups, { title: "Other", tokens: otherTokens }] : groups;
}

function getTokenType(token) {
  if (token.value.includes("#") || token.value.includes("rgb")) {
    return "color";
  }

  if (token.value.includes("px")) {
    return "size";
  }

  return "text";
}

function TokenPreview({ token }) {
  const type = getTokenType(token);
  const size = Number.parseFloat(token.value);

  if (type === "color") {
    return <span className="ds-token-swatch" style={{ background: token.value }} />;
  }

  if (type === "size") {
    const width = Number.isFinite(size) ? Math.max(18, Math.min(size, 140)) : 42;
    return (
      <span className="ds-token-measure">
        <span style={{ width }} />
      </span>
    );
  }

  return <span className="ds-token-pill">Aa</span>;
}

function getStyleValue(styles, key) {
  return styles?.find(([name]) => name === key)?.[1];
}

function getTokenValue(tokens, name) {
  return tokens.find((token) => token.name === name)?.value ?? "";
}

function SpacingPreview({ value }) {
  const pixels = Number.parseFloat(value);
  const width = Number.isFinite(pixels) ? Math.max(12, Math.min(pixels * 4, 220)) : 32;

  return (
    <div className="ds-spacing-preview" aria-hidden="true">
      <span className="ds-spacing-track">
        <span className="ds-spacing-fill" style={{ width }} />
      </span>
    </div>
  );
}

function SpecPill({ children }) {
  return <span className="ds-spec-pill">{children}</span>;
}

function MeasurementLabel({ children, axis = "horizontal" }) {
  return <span className={`ds-measurement-label is-${axis}`}>{children}</span>;
}

function VisualSpacingCard({ sample, tokens }) {
  const value = getTokenValue(tokens, sample.token);
  const secondaryValue = sample.secondaryToken ? getTokenValue(tokens, sample.secondaryToken) : "";

  return (
    <article className="ds-visual-spacing-card">
      <div className="ds-spacing-stage">
        <SpacingScene type={sample.preview} value={value} secondaryValue={secondaryValue} />
      </div>
      <div className="ds-spacing-card-copy">
        <div>
          <h4>{sample.label}</h4>
          <p>{sample.description}</p>
        </div>
        <div className="ds-spacing-pills">
          <SpecPill>{sample.token}: {value}</SpecPill>
          {secondaryValue ? <SpecPill>{sample.secondaryToken}: {secondaryValue}</SpecPill> : null}
        </div>
      </div>
    </article>
  );
}

function SpacingScene({ type, value, secondaryValue }) {
  if (type === "projectBullets") {
    return (
      <div className="ds-scene-bullets">
        <ul style={{ gap: value }}>
          <li>Cut deal setup time by 40% through AI-assisted coordination.</li>
          <li>Accelerated handoffs by 45% with human-in-loop AI workflows.</li>
        </ul>
        <div className="ds-gap-callout ds-gap-callout-vertical">
          <span />
          <MeasurementLabel axis="vertical">{value}</MeasurementLabel>
        </div>
      </div>
    );
  }

  if (type === "projectCopy") {
    return (
      <div className="ds-scene-project-copy" style={{ gap: value }}>
        <p>JP Morgan</p>
        <strong>Building human-in-the-loop agentic AI workflow experiences.</strong>
        <ul>
          <li>Cut deal setup time by 40%.</li>
          <li>Accelerated handoffs by 45%.</li>
        </ul>
        <div className="ds-gap-callout ds-gap-callout-copy">
          <span />
          <MeasurementLabel>{value}</MeasurementLabel>
        </div>
      </div>
    );
  }

  if (type === "collectionsGap") {
    return (
      <div className="ds-scene-collections">
        <div className="collections-intro-group" style={{ gap: value }}>
          <p className="collections-intro-label">COLLECTIONS OF WORKS</p>
          <span className="scroll-cue-mouse">
            <span className="scroll-cue-wheel" />
          </span>
        </div>
        <div className="ds-gap-callout ds-gap-callout-horizontal">
          <span />
          <MeasurementLabel>{value}</MeasurementLabel>
        </div>
      </div>
    );
  }

  if (type === "heroFrame") {
    return (
      <div className="ds-scene-frame">
        <div className="ds-scene-hero-frame">
          <strong>KRIS CHEN 陳俊豪</strong>
          <span>I solve complex business problems</span>
        </div>
        <MeasurementLabel>{value} x {secondaryValue}</MeasurementLabel>
      </div>
    );
  }

  if (type === "mediaFrame") {
    return (
      <div className="ds-scene-frame">
        <div className="ds-scene-media-frame">
          <span>JP.Morgan.</span>
          <span className="ds-scene-ai-line">with <span className="ds-sparkle-mark" aria-hidden="true" /> AI</span>
        </div>
        <MeasurementLabel>{value} x {secondaryValue}</MeasurementLabel>
      </div>
    );
  }

  if (type === "casePreviewDialog") {
    return (
      <div className="ds-scene-case-dialog">
        <div className="ds-scene-case-panel">
          <div className="ds-scene-case-header">
            <span>Back</span>
            <span>Preview / Full</span>
          </div>
          <div className="ds-scene-case-media">JP.Morgan. with AI</div>
          <div className="ds-scene-case-copy">
            <span />
            <span />
            <span />
          </div>
        </div>
        <MeasurementLabel>{value} shell / {secondaryValue} edge</MeasurementLabel>
      </div>
    );
  }

  return (
    <div className="ds-scene-stack" style={{ gap: value }}>
      <div className="ds-scene-hero-strip">
        <span>Hero statement</span>
        <span>Right-side facts</span>
      </div>
      <div className="ds-gap-callout ds-gap-callout-stack">
        <span />
        <MeasurementLabel axis="vertical">{value}</MeasurementLabel>
      </div>
      <div className="ds-scene-media-strip">Landing media / showcase media</div>
    </div>
  );
}

function TypographyPreview({ sample }) {
  const styles = sample.styles || [];
  const style = {
    fontFamily: getStyleValue(styles, "fontFamily"),
    fontSize: getStyleValue(styles, "fontSize"),
    fontWeight: getStyleValue(styles, "fontWeight"),
    lineHeight: getStyleValue(styles, "lineHeight"),
    letterSpacing: getStyleValue(styles, "letterSpacing"),
    color: getStyleValue(styles, "color"),
  };

  return (
    <div className="ds-type-preview" style={style}>
      {sample.text}
    </div>
  );
}

function ComponentPreview({ type, tokens = [] }) {
  if (type === "navbar") {
    return (
      <div className="ds-preview-navbar">
        <span className="ds-preview-logo" />
        <span className="ds-preview-menu active">Home</span>
        <span className="ds-preview-menu">Work</span>
      </div>
    );
  }

  if (type === "heroIdentity") {
    return (
      <div className="ds-preview-hero">
        <strong>KRIS CHEN 陳俊豪</strong>
        <span>I solve complex business problems</span>
      </div>
    );
  }

  if (type === "heroDetails") {
    return (
      <div className="ds-preview-details">
        <span>CURRENT LOCATION: NEW YORK</span>
        <span>LOCAL TIME: 16:24</span>
      </div>
    );
  }

  if (type === "landingMedia") {
    return <div className="ds-preview-media" />;
  }

  if (type === "collectionsIntro") {
    return (
      <div className="collections-intro-group ds-preview-collections">
        <p className="collections-intro-label">COLLECTIONS OF WORKS</p>
        <div className="scroll-cue" aria-hidden="true">
          <span className="scroll-cue-mouse">
            <span className="scroll-cue-wheel" />
          </span>
        </div>
      </div>
    );
  }

  if (type === "casePreviewDialog") {
    return (
      <div className="ds-preview-case-dialog">
        <div className="ds-preview-case-top">
          <span>Back</span>
          <span>Preview / Full</span>
        </div>
        <div className="ds-preview-case-hero">JP.Morgan. with AI</div>
        <div className="ds-preview-case-lines">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  return (
    <div className="ds-preview-project">
      <div className="ds-preview-project-image">
        <span>JP.Morgan.</span>
        <span className="ds-preview-ai-line">with <span className="ds-sparkle-mark" aria-hidden="true" /> AI</span>
      </div>
      <p>JP Morgan</p>
      <strong>Building human-in-the-loop agentic AI workflow experiences.</strong>
      <ul style={{ gap: getTokenValue(tokens, "--project-showcase-bullet-gap") || undefined }}>
        <li>Cut deal setup time by 40%.</li>
        <li>Accelerated handoffs by 45%.</li>
      </ul>
    </div>
  );
}

function ColorSwatch({ token }) {
  return (
    <article className="ds-color-card">
      <div className="ds-color-swatch" style={{ background: token.value }} />
      <div className="ds-color-meta">
        <p className="ds-color-name">{token.name}</p>
        <p className="ds-color-value">{token.value}</p>
      </div>
    </article>
  );
}

export default function DesignSystemInspector() {
  const [isOpen, setIsOpen] = useState(false);
  const [snapshot, setSnapshot] = useState({
    tokens: [],
    classes: [],
    typography: [],
    components: [],
  });

  const refreshSnapshot = () => {
    const typography = typographySamples.map((sample) => ({
      ...sample,
      styles: readComputedStyle(sample.selector),
    }));

    const components = componentRegistry.map((component) => ({
      ...component,
      styles: readComputedStyle(component.selector),
    }));

    setSnapshot({
      tokens: getCssVariables(),
      classes: getClassInventory(),
      typography,
      components,
    });
  };

  useEffect(() => {
    refreshSnapshot();
  }, []);

  useEffect(() => {
    const handleShortcut = (event) => {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

      if (isTyping || !event.metaKey || event.key.toLowerCase() !== "d") {
        return;
      }

      event.preventDefault();
      setIsOpen((current) => !current);
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    refreshSnapshot();
    window.addEventListener("resize", refreshSnapshot);
    return () => window.removeEventListener("resize", refreshSnapshot);
  }, [isOpen]);

  const groupedTokens = useMemo(() => groupTokens(snapshot.tokens), [snapshot.tokens]);
  const colorTokens = useMemo(
    () => snapshot.tokens.filter((token) => getTokenType(token) === "color"),
    [snapshot.tokens],
  );

  return (
    <>
      <button className="ds-trigger" type="button" onClick={() => setIsOpen(true)}>
        DS
      </button>

      {isOpen ? (
        <div className="ds-overlay" role="dialog" aria-modal="true" aria-label="Design system">
          <div className="ds-backdrop" onClick={() => setIsOpen(false)} />
          <section className="ds-panel">
            <header className="ds-panel-header">
              <div>
                <p className="ds-kicker">Live Reference</p>
                <h2 className="ds-title">Design System Stack</h2>
              </div>
              <div className="ds-panel-actions">
                <button className="ds-action" type="button" onClick={refreshSnapshot}>
                  Refresh
                </button>
                <button className="ds-close" type="button" onClick={() => setIsOpen(false)} aria-label="Close design system">
                  Close
                </button>
              </div>
            </header>

            <div className="ds-panel-body">
              <section className="ds-section">
                <div className="ds-section-heading">
                  <div>
                    <h3 className="ds-section-title">System Canvas</h3>
                    <p className="ds-section-subtitle">A live visual map of the main pieces we are building right now.</p>
                  </div>
                  <SpecPill>Max width: {getTokenValue(snapshot.tokens, "--content-max-width")}</SpecPill>
                </div>
                <div className="ds-system-canvas">
                  <article className="ds-canvas-hero">
                    <ComponentPreview type="heroIdentity" tokens={snapshot.tokens} />
                    <ComponentPreview type="heroDetails" tokens={snapshot.tokens} />
                    <div className="ds-canvas-caption">
                      <strong>Hero row</strong>
                      <span>Identity block plus one-line facts.</span>
                    </div>
                  </article>
                  <article className="ds-canvas-project">
                    <ComponentPreview type="projectShowcase" tokens={snapshot.tokens} />
                    <div className="ds-canvas-caption">
                      <strong>Project showcase</strong>
                      <span>Full card preview shrunk to fit, with bullet spacing preserved.</span>
                    </div>
                  </article>
                </div>
              </section>

              <section className="ds-section">
                <div className="ds-section-heading">
                  <div>
                    <h3 className="ds-section-title">Spacing In Context</h3>
                    <p className="ds-section-subtitle">Every gap is shown on the component where you would actually use it.</p>
                  </div>
                </div>
                <div className="ds-visual-spacing-grid">
                  {spacingSamples.map((sample) => (
                    <VisualSpacingCard key={sample.token} sample={sample} tokens={snapshot.tokens} />
                  ))}
                </div>
              </section>

              <section className="ds-section">
                <div className="ds-section-heading">
                  <div>
                    <h3 className="ds-section-title">Tokens</h3>
                    <p className="ds-section-subtitle">Compact source-of-truth values pulled from CSS variables.</p>
                  </div>
                </div>
                <div className="ds-token-groups">
                  {groupedTokens.map((group) => (
                    <div className="ds-token-group" key={group.title}>
                      <h4 className="ds-group-title">{group.title}</h4>
                      <div className="ds-token-list">
                        {group.tokens.map((token) => (
                          <div className="ds-token-row" key={token.name}>
                            <TokenPreview token={token} />
                            <span className="ds-token-name">{token.name}</span>
                            <span className="ds-token-value">{token.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="ds-section">
                <div className="ds-section-heading">
                  <div>
                    <h3 className="ds-section-title">Color Board</h3>
                    <p className="ds-section-subtitle">Compact swatches so color tokens do not create a wall of empty cards.</p>
                  </div>
                </div>
                <div className="ds-color-board">
                  {colorTokens.map((token) => (
                    <ColorSwatch key={token.name} token={token} />
                  ))}
                </div>
              </section>

              <section className="ds-section">
                <div className="ds-section-heading">
                  <div>
                    <h3 className="ds-section-title">Typography</h3>
                    <p className="ds-section-subtitle">Rendered samples plus the important computed specs.</p>
                  </div>
                </div>
                <div className="ds-table">
                  {snapshot.typography.map((sample) => (
                    <div className="ds-style-card" key={sample.name}>
                      <TypographyPreview sample={sample} />
                      <p className="ds-style-name">{sample.name}</p>
                      <p className="ds-style-selector">{sample.selector}</p>
                      <dl className="ds-style-list">
                        {(sample.styles || []).slice(0, 6).map(([name, value]) => (
                          <div key={name}>
                            <dt>{name}</dt>
                            <dd>{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
              </section>

              <section className="ds-section">
                <div className="ds-section-heading">
                  <div>
                    <h3 className="ds-section-title">Components</h3>
                    <p className="ds-section-subtitle">The names to use when referencing each reusable piece.</p>
                  </div>
                </div>
                <div className="ds-component-list">
                  {snapshot.components.map((component) => (
                    <article className="ds-component-card" key={component.name}>
                      <ComponentPreview type={component.preview} tokens={snapshot.tokens} />
                      <div>
                        <h4>{component.name}</h4>
                        <p>{component.role}</p>
                      </div>
                      <div className="ds-class-stack">
                        {component.classes.map((className) => (
                          <span key={className}>.{className}</span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="ds-section">
                <div className="ds-section-heading">
                  <div>
                    <h3 className="ds-section-title">Visual Atlas</h3>
                    <p className="ds-section-subtitle">Fast visual lookup for the pieces you are most likely to ask for.</p>
                  </div>
                </div>
                <div className="ds-atlas-grid">
                  <article className="ds-atlas-card">
                    <ComponentPreview type="heroIdentity" tokens={snapshot.tokens} />
                    <div className="ds-atlas-tags">
                      <span>{getTokenValue(snapshot.tokens, "--hero-identity-width")} block</span>
                      <span>hero name</span>
                      <span>glow statement</span>
                    </div>
                  </article>
                  <article className="ds-atlas-card">
                    <ComponentPreview type="projectShowcase" tokens={snapshot.tokens} />
                    <div className="ds-atlas-tags">
                      <span>{getTokenValue(snapshot.tokens, "--project-showcase-width")} media</span>
                      <span>80px lockup</span>
                      <span>{getTokenValue(snapshot.tokens, "--project-showcase-bullet-gap")} bullet gap</span>
                    </div>
                  </article>
                  <article className="ds-atlas-card">
                    <ComponentPreview type="collectionsIntro" tokens={snapshot.tokens} />
                    <div className="ds-atlas-tags">
                      <span>14px label</span>
                      <span>{getTokenValue(snapshot.tokens, "--collections-intro-gap")} icon gap</span>
                      <span>scroll cue</span>
                    </div>
                  </article>
                </div>
              </section>

              <section className="ds-section">
                <div className="ds-section-heading">
                  <div>
                    <h3 className="ds-section-title">Naming Index</h3>
                    <p className="ds-section-subtitle">Rendered class inventory from the current page.</p>
                  </div>
                </div>
                <div className="ds-class-cloud">
                  {snapshot.classes.map((className) => (
                    <span key={className}>.{className}</span>
                  ))}
                </div>
              </section>

              <section className="ds-section">
                <div className="ds-section-heading">
                  <div>
                    <h3 className="ds-section-title">Quick Reference</h3>
                  </div>
                </div>
                <div className="ds-reference-note">
                  Use the visual sections first when naming things. Use the token cards only when you need exact CSS values. Press Command + D to open or close this panel.
                </div>
              </section>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
