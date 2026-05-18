import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getAssetPath } from "../utils/paths";
import { getAnalyticsEventName, trackEvent } from "../utils/analytics";
import ExecutableDirectionConsole from "./ExecutableDirectionConsole";
import { DeepCutNightGuideThumbnail } from "./ProjectShowcase";

const handleProjectImageError = (event) => {
  event.currentTarget.classList.add("is-missing");
  event.currentTarget.setAttribute("aria-hidden", "true");
};

const getAssetSrcSet = (srcSet) => {
  if (!srcSet) {
    return srcSet;
  }

  return srcSet
    .split(", ")
    .map((entry) => {
      const [path, size] = entry.trim().split(" ");
      return `${getAssetPath(path)} ${size}`;
    })
    .join(", ");
};

const auroraCaseArtifacts = [
  {
    label: "Artifact 01",
    eyebrow: "Data extraction",
    title: "Review extracted deal fields against source evidence.",
    body: "A working view for validating AI-assisted extraction: users compare the deal form, source options, and original agreement before continuing the booking flow.",
    image: "/optimized/aurora-data-extraction-2200.png",
    alt: "Aurora data extraction review screen with deal fields, source selection, and a credit agreement preview.",
    width: 2200,
    height: 1146,
    kind: "extraction",
  },
  {
    label: "Artifact 02",
    eyebrow: "Booking Express NEXT",
    title: "A deal homepage that centralizes progress, tasks, and teams.",
    body: "The homepage concept brings deal metadata, task progression, ownership, contacts, and linked systems into one operational workspace for booking teams.",
    image: "/optimized/aurora-booking-express-home-2200.png",
    alt: "Aurora Booking Express NEXT homepage showing deal overview, task list, progress, team, contacts, and linked systems.",
    width: 2200,
    height: 1577,
    kind: "home",
  },
];

const isEditableShortcutTarget = (target) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
};

const detectMacLikePlatform = () => {
  if (typeof window === "undefined") {
    return true;
  }

  const platformSignals = [
    window.navigator.userAgentData?.platform,
    window.navigator.platform,
    window.navigator.userAgent,
  ]
    .filter(Boolean)
    .join(" ");

  return /mac|iphone|ipad|ipod/i.test(platformSignals);
};

function ShortcutHint({ label, isVisible = false, position = "after" }) {
  return (
    <span className={`project-detail-shortcut-group is-${position}${isVisible ? " is-visible" : ""}`} aria-hidden="true">
      <kbd className="project-detail-shortcut">{label}</kbd>
    </span>
  );
}

function ButtonShortcutContent({ label, shortcut, keyLabel, shortcutPosition = "after", isShortcutVisible = false }) {
  const visibleShortcut = isShortcutVisible ? keyLabel : shortcut;
  const shortcutHint = <ShortcutHint label={visibleShortcut} position={shortcutPosition} isVisible={isShortcutVisible} />;

  if (shortcutPosition === "before") {
    return (
      <>
        {shortcutHint}
        <span className="case-control-label">{label}</span>
      </>
    );
  }

  return (
    <>
      <span className="case-control-label">{label}</span>
      {shortcutHint}
    </>
  );
}

const deepCutReviewCards = [
  {
    name: "Sara J.",
    age: "2 weeks ago",
    rating: "★★★★★",
    body: "Incredible atmosphere. Paolo captures the soul of Tokyo after dark. I learned so much about small spots I'd never find.",
    helpful: "24",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Mike Chen",
    age: "1 month ago",
    rating: "★★★★☆",
    body: "Loved the food stops and the storytelling. The pacing makes the 1h+ fly by.",
    helpful: "18",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Aiko Tanaka",
    age: "2 months ago",
    rating: "★★★★★",
    body: "As someone from Tokyo, this is the most authentic night walk I've seen on camera. Beautiful work.",
    helpful: "31",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
  },
];

const deepCutRelatedCuts = [
  {
    title: "Shibuya Nightlife: Beyond the Lights",
    creator: "Only in Japan",
    duration: "2:05:42",
    score: "9.0",
    image: getAssetPath("/covers/shibuya-nightlife.png"),
  },
  {
    title: "Japan's Lost Railway Lines",
    creator: "Abroad in Japan",
    duration: "1:02:11",
    score: "8.8",
    image: getAssetPath("/covers/japan-railway.png"),
  },
  {
    title: "Osaka Street Food Night Walk",
    creator: "Paolo fromTOKYO",
    duration: "1:15:33",
    score: "9.2",
    image: getAssetPath("/covers/osaka-street-food.png"),
  },
  {
    title: "The Silk Road: A Modern Journey",
    creator: "DW Documentary",
    duration: "1:39:08",
    score: "8.7",
    image: getAssetPath("/covers/silk-road.png"),
  },
  {
    title: "Life Along Japan's Hidden Lines",
    creator: "Takahiro Bessho",
    duration: "1:24:10",
    score: "8.6",
    image: getAssetPath("/covers/japan-railway.png"),
  },
];

const deepCutCaseArtifacts = [
  {
    label: "Lead / TV watch",
    title: "AI becomes useful at the moment of choosing.",
    body: "The TV surface turns review intelligence into a confident start point: watch from 12:40, understand why it is worth it, then keep the lean-back experience clean.",
    image: "/deepcut-case-study/deepcut-tv-watch.png",
    alt: "DeepCut TV player experience with best-start controls, review insight, and up-next recommendations.",
    metrics: ["Start at 12:40", "Review insight", "Up next"],
    layout: "wide",
  },
  {
    label: "01 / Desktop browse",
    title: "Browse videos worth your time.",
    body: "Desktop is the research surface: users compare long-form picks, see review density, and decide whether a one-hour video deserves tonight.",
    image: "/deepcut-case-study/deepcut-pc-browse.png",
    alt: "DeepCut desktop browser experience showing top-rated long-form video cards and an Osaka street food recommendation.",
    metrics: ["Top picks", "Best start", "Ask DeepCut"],
    layout: "wide",
  },
  {
    label: "02 / Reviews + Ask AI",
    title: "Turn human reviews into an AI decision flow.",
    body: "This split artifact shows the core product promise: users can read real review signals, then ask AI to scan language, pacing, platform overlap, and best-start evidence before choosing a video.",
    image: "/deepcut-case-study/deepcut-mobile-detail.png",
    alt: "DeepCut split interface showing User Reviews and Ask AI Flow panels for an Osaka street food long-form video.",
    metrics: ["User reviews", "AI scan", "Best start"],
    layout: "wide",
  },
  {
    label: "03 / Mobile saved",
    title: "Build a queue with context preserved.",
    body: "Saved collections turn discovery into a personal long-form library where score, source, watch progress, and best-start context travel with the video.",
    image: "/deepcut-case-study/deepcut-mobile-saved-library.png",
    alt: "DeepCut mobile saved library showing a Worth My Time collection with long-form videos, scores, progress, and best-start timestamps.",
    metrics: ["Saved queue", "Continue watching", "Best start"],
    layout: "portrait",
  },
  {
    label: "04 / Review intelligence",
    title: "Make long-form reviews feel measurable.",
    body: "The rating page translates crowd judgment into pacing, trust, rewatch value, source overlap, chapter highlights, and review consensus.",
    image: "/deepcut-case-study/deepcut-interface-review-intelligence.png",
    alt: "DeepCut review intelligence dashboard showing an Osaka street food video, score, review distribution, source context, and chapter highlights.",
    metrics: ["Pacing", "Trust", "Source context"],
    layout: "standard",
  },
  {
    label: "05 / Mobile Ask AI",
    title: "Ask when the intent is specific.",
    body: "On mobile, the AI flow starts from a plain-language need, scans the evidence, recommends one video, and gives lightweight follow-ups.",
    image: "/deepcut-case-study/deepcut-mobile-ask-ai.png",
    alt: "DeepCut mobile Ask AI screen showing a Japanese street food recommendation with review signals, best-start timestamp, and reasons.",
    metrics: ["User intent", "Scanning", "Why this works"],
    layout: "portrait",
  },
  {
    label: "06 / Reviews before AI",
    title: "Keep human judgment at the center.",
    body: "The product earns the AI moment by first making reviews useful: distribution, reviewer notes, platform context, and best-start timestamps stay visible.",
    image: "/deepcut-case-study/deepcut-reviews-ai.png",
    alt: "DeepCut split interface showing user reviews beside an Ask AI flow for a long-form Osaka street food video.",
    metrics: ["2.8k reviews", "Best start", "Ask AI"],
    layout: "wide",
  },
  {
    label: "07 / AI decision flow",
    title: "Show the reasoning, not just the result.",
    body: "DeepCut breaks the recommendation into intent, scanning, candidate ranking, evidence, and follow-up prompts so users can trust the suggestion without surrendering control.",
    image: "/deepcut-case-study/deepcut-interface-ai-decision-flow.png",
    alt: "DeepCut Ask AI decision flow showing user intent, review scanning, top recommendation, evidence, and follow-up prompts.",
    metrics: ["Intent", "Evidence", "Follow-up"],
    layout: "wide",
  },
];

function DeepCutLogoGlyph() {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <defs>
        <linearGradient id="deepcut-review-logo-gradient" x1="18" y1="13" x2="80" y2="83" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#dcfffb" />
          <stop offset="0.48" stopColor="#68f3df" />
          <stop offset="1" stopColor="#2bd2bf" />
        </linearGradient>
      </defs>
      <rect x="13" y="13" width="70" height="70" rx="20" fill="#07100d" />
      <rect x="14.5" y="14.5" width="67" height="67" rx="18.5" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="3" />
      <path d="M37 28.5 66.5 48 37 67.5V28.5Z" fill="url(#deepcut-review-logo-gradient)" />
      <path d="M42.5 39.5 55.2 48 42.5 56.5V39.5Z" fill="#07100d" opacity="0.7" />
    </svg>
  );
}

function DeepCutIcon({ type }) {
  const paths = {
    home: "M5 10.5 12 4l7 6.5v8.8h-5v-5.8h-4v5.8H5v-8.8Z",
    compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.2-12.2-1.8 4.6-4.6 1.8 1.8-4.6 4.6-1.8Z",
    bookmark: "M7 4h10v16l-5-3.1L7 20V4Z",
    bars: "M6 17v-5m6 5V7m6 10v-8",
    settings: "M12 15.3a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Zm0-12.1 1.3 2.2 2.6.5.8 2.5 2.1 1.5-1 2.4 1 2.4-2.1 1.5-.8 2.5-2.6.5-1.3 2.2-1.3-2.2-2.6-.5-.8-2.5-2.1-1.5 1-2.4-1-2.4 2.1-1.5.8-2.5 2.6-.5L12 3.2Z",
    search: "M11 18a7 7 0 1 1 4.9-2l4.1 4.1",
    bell: "M18 16H6l1.2-1.8V10a4.8 4.8 0 0 1 9.6 0v4.2L18 16Zm-4 2a2 2 0 0 1-4 0",
    star: "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z",
    save: "M7 4h10v16l-5-3.1L7 20V4Z",
    like: "M7.5 10.2 11 4.5c.7-1.1 2.5-.6 2.5.8v3h4.3c1.3 0 2.2 1.2 1.9 2.4l-1.3 6.2a3 3 0 0 1-3 2.4H7.5v-9.1Z",
    shield: "M12 3.5 19 6v5.5c0 4.1-2.6 7.7-7 9-4.4-1.3-7-4.9-7-9V6l7-2.5Z",
    globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-8-9h16M12 3c2.2 2.5 3.3 5.5 3.3 9S14.2 18.5 12 21c-2.2-2.5-3.3-5.5-3.3-9S9.8 5.5 12 3Z",
    more: "M6 12h.1M12 12h.1M18 12h.1",
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[type]} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeepCutReviewsDemoArtifact() {
  return (
    <div className="deepcut-review-demo" aria-label="DeepCut reviews product demo">
      <div className="deepcut-review-city" aria-hidden="true" />
      <div className="deepcut-review-app">
        <header className="deepcut-review-topbar">
          <div className="deepcut-review-brand">
            <span className="deepcut-review-logo">
              <DeepCutLogoGlyph />
            </span>
            <strong>DeepCut</strong>
          </div>
          <nav className="deepcut-review-nav" aria-label="DeepCut demo navigation">
            <span>Explore</span>
            <span>Library</span>
            <span>Saved</span>
            <span className="is-active">Reviews</span>
          </nav>
          <div className="deepcut-review-search">
            <DeepCutIcon type="search" />
            <span>Search videos, creators, topics...</span>
            <kbd>⌘K</kbd>
          </div>
          <button type="button" aria-label="Notifications">
            <DeepCutIcon type="bell" />
          </button>
          <span className="deepcut-review-avatar">
            <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&q=80" alt="" />
            <i />
          </span>
        </header>

        <div className="deepcut-review-shell">
          <aside className="deepcut-review-rail" aria-label="Demo sections">
            {["home", "compass", "bookmark", "bars", "settings"].map((icon) => (
              <span key={icon} className={icon === "bars" ? "is-active" : ""}>
                <DeepCutIcon type={icon} />
              </span>
            ))}
          </aside>

          <section className="deepcut-review-main">
            <div className="deepcut-review-player">
              <img src={getAssetPath("/covers/restaurant-night.png")} alt="" />
              <video src="https://assets.mixkit.co/videos/4451/4451-360.mp4" autoPlay muted loop playsInline preload="metadata" />
              <div className="deepcut-review-controls">
                <span className="deepcut-review-progress">
                  <i />
                </span>
                <div>
                  <b>Ⅱ</b>
                  <b>▶</b>
                  <b>▰</b>
                  <span>3:42 / 1:28:47</span>
                  <em>cc</em>
                  <DeepCutIcon type="settings" />
                  <strong>⛶</strong>
                </div>
              </div>
            </div>

            <div className="deepcut-review-title-row">
              <div>
                <h3>Tokyo at Night: Food, Streets &amp; Hidden Gems</h3>
                <p>Paolo fromTOKYO <i /> · 1.3M views · 8 months ago · 1:28:47</p>
              </div>
              <div className="deepcut-review-actions">
                <span className="is-saved">
                  <DeepCutIcon type="save" />
                  Saved
                </span>
                <span>
                  <DeepCutIcon type="like" />
                  1.2K
                </span>
                <span>
                  <DeepCutIcon type="more" />
                </span>
              </div>
            </div>

            <div className="deepcut-review-body-grid">
              <div>
                <div className="deepcut-review-creator">
                  <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&q=80" alt="" />
                  <div>
                    <strong>Paolo fromTOKYO</strong>
                    <span>487K subscribers</span>
                  </div>
                  <button type="button">Follow</button>
                </div>
                <p className="deepcut-review-description">
                  A cinematic night walk through backstreets of Tokyo. Small restaurants, quiet corners, and real local rhythm—no tourist traps.
                </p>
              </div>

              <div className="deepcut-review-score">
                <div>
                  <strong>9.1</strong>
                  <span>★★★★★</span>
                  <p>Worth the long watch</p>
                </div>
                <ul>
                  {[92, 68, 42, 11, 4].map((value, index) => (
                    <li key={value}>
                      <span>{5 - index} ★</span>
                      <i style={{ "--rating-width": `${value}%` }} />
                    </li>
                  ))}
                </ul>
                <small>1,342 ratings</small>
              </div>
            </div>

            <div className="deepcut-review-meta">
              {["Travel", "Japan", "Night Walks", "Documentary"].map((item) => (
                <span key={item}>
                  <DeepCutIcon type="globe" />
                  {item}
                </span>
              ))}
              <span className="is-trust">
                <DeepCutIcon type="shield" />
                Source confidence <b>High</b>
              </span>
              <span>
                <DeepCutIcon type="bookmark" />
                12 sources
              </span>
            </div>
          </section>

          <aside className="deepcut-review-panel">
            <div className="deepcut-review-panel-head">
              <div>
                <h3>Reviews</h3>
                <p>Community takes on this cut</p>
              </div>
              <button type="button">
                <DeepCutIcon type="star" />
                Rate this cut
              </button>
            </div>
            {deepCutReviewCards.map((review) => (
              <article className="deepcut-review-card" key={review.name}>
                <div>
                  <img src={review.avatar} alt="" />
                  <span>
                    <strong>{review.name}</strong>
                    <small>{review.age}</small>
                  </span>
                </div>
                <b>{review.rating}</b>
                <p>{review.body}</p>
                <footer>
                  <span>♡ Helpful&nbsp; {review.helpful}</span>
                  <span>Reply</span>
                  <span>...</span>
                </footer>
              </article>
            ))}
            <button className="deepcut-review-more" type="button">More reviews⌄</button>
          </aside>

          <section className="deepcut-review-related" aria-label="More cuts you might like">
            <h3>More cuts you might like</h3>
            <div>
              {deepCutRelatedCuts.map((cut) => (
                <article key={cut.title}>
                  <img src={cut.image} alt="" />
                  <span>{cut.duration}</span>
                  <div>
                    <h4>{cut.title}</h4>
                    <p>{cut.creator} <i /></p>
                    <b>☆ {cut.score}</b>
                  </div>
                </article>
              ))}
            </div>
            <button type="button" aria-label="Next related cuts">›</button>
          </section>
        </div>
      </div>
    </div>
  );
}

const problemCards = [
  {
    title: "Fragmented signals",
    body: "Company data, sponsor context, notes, and feedback lived across different places.",
  },
  {
    title: "High-context judgment",
    body: "Strong ideas depended on timing, sponsor appetite, relationships, and banker intuition.",
  },
  {
    title: "Low reusability",
    body: "Valuable rationale stayed trapped in decks, spreadsheets, and one-off notes.",
  },
];

const productOverviewCards = [
  {
    title: "Sponsor intelligence",
    body: "Portfolio, fund, preference, and activity signals.",
    image: getAssetPath("/product-sponsor-intelligence.png"),
    imageAlt: "Sponsor intelligence product surface.",
    caption: "A sponsor intelligence workspace showing portfolio, fund, preference, and activity signals in one reviewable surface.",
    focus: "50% 50%",
    previewScale: 1,
    previewOffsetY: "0px",
  },
  {
    title: "AI-generated ideas",
    body: "Ranked ideas with rationale, fit, and next actions.",
    image: getAssetPath("/product-ai-generated-ideas.png"),
    imageAlt: "AI-generated ideas product surface.",
    caption: "A product view for generated deal ideas, rationale, fit, and review actions.",
    focus: "50% 50%",
    previewScale: 1,
    previewOffsetY: "0px",
  },
  {
    title: "Relationship signals",
    body: "Interaction history and outreach context for banker review.",
    image: getAssetPath("/product-relationship-signals.png"),
    imageAlt: "Relationship signals product surface.",
    caption: "A relationship intelligence view connecting interaction history, wallet share, and outreach context for banker review.",
    focus: "50% 50%",
    previewScale: 1,
    previewOffsetY: "0px",
  },
];

const jpmorganProductPreview = {
  image: getAssetPath("/optimized/peak-rock-dashboard-1200.png"),
  imageSrcSet: `${getAssetPath('/optimized/peak-rock-dashboard-1200.png')} ${getAssetPath('/optimized/peak-rock-dashboard-2200.png')}`,
  imageSizes: "(max-width: 760px) calc(100vw - 40px), 970px",
  imageAlt: "Sanitized sponsor intelligence workspace.",
};

const beforeWorkflowPanels = [
  {
    title: "CRM",
    rows: ["Apex Polymers", "BluePeak Materials"],
  },
  {
    title: "Excel",
    rows: ["Revenue / EBITDA", "Manual updates"],
  },
  {
    title: "Files",
    rows: ["Idea book.xlsx", "Market map.pdf"],
  },
  {
    title: "Email",
    rows: ["Review thread", "PDF attached"],
  },
];

const workflowSnapshotSteps = ["Company Screening", "Prioritization", "Sponsor Matching", "Idea Generation", "Ideabook Output"];

const aiSupportSteps = ["Screen signals", "Suggest fit", "Synthesize rationale", "Draft thesis", "Support packaging"];

const valueChips = ["Reduced fragmentation", "Reusable idea intelligence", "Sponsor-fit visibility", "Banker review built in"];

const operatingBefore = ["Figma screens", "Static handoff", "Engineering interpretation", "Rebuild", "Mismatch / rework"];

const operatingAfter = [
  "Product intent",
  "GitHub Copilot prototype",
  "AI knowledge layer",
  "Salt-aligned UI",
  "Verification",
  "Branch review",
  "PM / design / engineering alignment",
  "Engineering-ready direction",
];

const operatingInfrastructureStats = [
  "18 files",
  "3,165 lines",
  "5 domain skills",
  "12 Salt docs",
  "1 routing layer",
  "1 verification script",
];

const operatingFileTree = [
  ".github/",
  "  copilot-instructions.md",
  ".agents/",
  "  skills/",
  "    salt-ds/",
  "      SKILL.md",
  "      verify.mjs",
  "      references/",
  "    pages/",
  "    patterns/",
  "    store/",
  "    design-components/",
];

const operatingQualityChips = [
  "Raw React -> Salt components",
  "Hardcoded CSS -> semantic tokens",
  "Global CSS -> scoped CSS Modules",
  "AI output -> governed UI",
];

const operatingGuardrailSteps = ["Instructions", "Skills", "Code generation", "verify.mjs", "Fix", "Verified prototype"];

const operatingBranchSteps = ["prototype/company-screener", "prototype/sponsor-matching", "prototype/idea-generation"];

const operatingImpactChips = [
  "Faster product-to-prototype exploration",
  "More reliable AI-generated UI",
  "Reduced translation loss",
  "Better design-system consistency",
  "Earlier PM / engineering alignment",
  "More engineering-ready product direction",
];

const operatingOutcomeCards = [
  {
    value: "~3x faster exploration",
    note: "Moved from static screens to working prototypes so teams could evaluate behavior earlier.",
  },
  {
    value: "18 files / 3,165 lines",
    note: "Built reusable Copilot instructions, skills, and references for product and design-system context.",
  },
  {
    value: "12 Salt refs + verification",
    note: "Checked AI output against enterprise components, tokens, and interaction patterns.",
  },
  {
    value: "3 teams / 1 artifact",
    note: "Aligned PM, design, and engineering around one working prototype.",
  },
  {
    value: "Prototype → spec → Jira",
    note: "Turned product direction into clearer specs and delivery tickets.",
  },
  {
    value: "Less translation loss",
    note: "Teams reviewed workflows, states, and behavior before build.",
  },
];

const aiMethodHeroMetrics = [
  { value: "18", label: "AI knowledge files" },
  { value: "3,165", label: "instruction lines" },
  { value: "5", label: "domain skill files" },
];

const aiOperatingLoopSteps = [
  "Jira / product intent",
  "AI brainstorming",
  "Copilot prototype",
  "AI project memory",
  "Salt rules",
  "verify.mjs",
  "SDD-ready breakdown",
  "Branch review",
  "PM / design / engineering alignment",
];

const aiOperatingArtifacts = [
  {
    image: getAssetPath("/figma-artifact-wide-a.png"),
    title: "AI-assisted implementation workspace",
    caption: "Copilot-assisted prototype work with implementation notes, component decisions, and design-system translation.",
  },
  {
    image: getAssetPath("/figma-to-code.png"),
    title: "Figma-to-prototype operating model",
    caption: "Design references, prototype surfaces, and workflow artifacts organized for review.",
  },
  {
    image: getAssetPath("/reusable.png"),
    title: "Design-system review surface",
    caption: "Reusable screens, filters, drawers, and prototype states organized as reviewable product artifacts.",
  },
];

const aiProofArtifacts = [
  {
    image: getAssetPath("/ai-features-tearsheet.png"),
    title: "Branch-backed review prototype",
    caption: "The same branch carries module.css, scale.md, architecture.md, and store.ts into a review surface where the UI and runtime behavior are one system.",
  },
  {
    image: getAssetPath("/investor-crm-ai-prototype.png"),
    title: "Investor CRM AI prototype",
    caption: "Turned interview insights into a quick AI prototype for PM and engineering review.",
  },
  {
    image: getAssetPath("/ai-enrichment-prototype.png"),
    title: "AI enrichment interaction prototype",
    caption: "Used the Copilot workflow, design.md, and skill guidance to prototype live AI enrichment interactions while preserving design-system consistency.",
  },
];

const aiMethodTokenRows = [
  ["font-size: 12px", "var(--salt-text-fontSize)"],
  ["gap: 8px", "var(--salt-spacing-100)"],
  ["padding: 0 8px", "var(--salt-spacing-100)"],
];

const impactCards = [
  {
    title: "Product clarity",
    body: "Created a clearer 0→1 direction for TD idea generation and sponsor matching.",
  },
  {
    title: "Team alignment",
    body: "Helped PM, design, and engineering align earlier through working prototypes.",
  },
  {
    title: "Workflow maturity",
    body: "Reduced ambiguity between design intent and engineering-ready product direction.",
  },
  {
    title: "Org influence",
    body: "Shared AI-native prototyping and branch collaboration practices with the broader GIB team.",
  },
];

const heroHighlights = ["0→1 AI product", "Investment Banking", "TD origination workflow", "Prototype-led collaboration"];

const defaultProjectDetail = {
  accentColor: "#6670ff",
  accentGlow: "rgba(102, 112, 255, 0.62)",
  company: ["J.P. Morgan — Investment Banking", "0→1 AI Origination & Idea Gen Platform"],
  responsibility:
    "Led end-to-end product design for a zero-to-one AI platform redefining investment banking origination and sponsor intelligence workflows.",
  timeline: "Dec 2025 - Current",
  role: "Product Designer",
  roleTeam: "PM, product strategy, design, engineering",
};

function CaseSectionHeader({ label, title, children, id }) {
  return (
    <>
      <p className="project-detail-section-label">
        <span className="project-detail-kicker-dot" aria-hidden="true" />
        <span>{label}</span>
      </p>
      <div className="case-section-heading">
        <h2 id={id}>{title}</h2>
        {children ? <p>{children}</p> : null}
      </div>
    </>
  );
}

const getSectionActivationLine = (scrollElement) => Math.min(180, Math.max(112, scrollElement.clientHeight * 0.18));
const setDocumentCursorMode = (mode) => {
  if (document.documentElement.getAttribute("data-cursor-mode") !== mode) {
    document.documentElement.setAttribute("data-cursor-mode", mode);
  }
};
const clearDocumentCursorMode = () => {
  if (document.documentElement.hasAttribute("data-cursor-mode")) {
    document.documentElement.removeAttribute("data-cursor-mode");
  }
};

export default function ProjectCaseOverlay({
  project,
  onClose,
  onOpenFull,
  onOpenPreview,
  isExpanding = false,
  isFull = false,
  isShrinking = false,
  isClosing = false,
  onExpandComplete,
  onShrinkComplete,
  onNextProject,
  onPreviousProject,
  hasNextProject = false,
  hasPreviousProject = false,
}) {
  const scrollRef = useRef(null);
  const sectionNavRef = useRef(null);
  const progressRef = useRef(null);
  const scrollbarRef = useRef(null);
  const scrollbarThumbRef = useRef(null);
  const sectionElementsRef = useRef([]);
  const sectionRangesRef = useRef([]);
  const sectionItemsRef = useRef([]);
  const sectionLabelRef = useRef(null);
  const latestScrollTopRef = useRef(0);
  const latestActiveIndexRef = useRef(0);
  const isScrollTickingRef = useRef(false);
  const activeSectionIdRef = useRef("case-intro");
  const activeSectionIndexRef = useRef(0);
  const scrollbarDragRef = useRef({ offsetY: 0 });
  const scrollbarVisibleRef = useRef(false);
  const scrollbarHideAtRef = useRef(0);
  const scrollbarHideTimerRef = useRef(null);
  const expandCompleteRef = useRef(onExpandComplete);
  const shrinkCompleteRef = useRef(onShrinkComplete);
  const isIndexOpenRef = useRef(false);
  const isOverlayWarmingRef = useRef(true);
  const projectNavTimerRef = useRef(null);
  const pendingProjectDirectionRef = useRef(null);
  const viewedSectionsRef = useRef(new Set());
  const enrichmentFlowVideoRef = useRef(null);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const [projectNavPhase, setProjectNavPhase] = useState("");
  const [activeProductPreviewIndex, setActiveProductPreviewIndex] = useState(0);
  const [activeAiOperatingArtifactIndex, setActiveAiOperatingArtifactIndex] = useState(0);
  const [activeAiProofArtifactIndex, setActiveAiProofArtifactIndex] = useState(0);
  const [workflowReveal, setWorkflowReveal] = useState(50);
  const [aiWorkflowReveal, setAiWorkflowReveal] = useState(50);
  const [isShortcutMode, setIsShortcutMode] = useState(false);
  const [isMacLikePlatform] = useState(detectMacLikePlatform);
  const isFullControlActive = isFull || isExpanding;
  const isProjectNavigating = projectNavPhase.startsWith("exit");
  const projectDetail = project.detail ?? defaultProjectDetail;
  const isCaseWip = Boolean(project.isWip);
  const isAuroraWipCase = project.id === "jpmorgan-lobby";
  const isDeepCutNightGuide = project.customThumbnail === "deepcut-night-guide";
  const projectHighlights = project.highlights ?? heroHighlights;
  const activeAiOperatingArtifact = aiOperatingArtifacts[activeAiOperatingArtifactIndex];
  const activeAiProofArtifact = aiProofArtifacts[activeAiProofArtifactIndex];
  const shortcutModifierLabel = isMacLikePlatform ? "Cmd" : "Ctrl";
  const previewShortcutLabel = `${shortcutModifierLabel}+P`;
  const fullShortcutLabel = `${shortcutModifierLabel}+F`;
  const previousShortcutLabel = `${shortcutModifierLabel}+\u2190`;
  const nextShortcutLabel = `${shortcutModifierLabel}+\u2192`;
  const previewShortcutKey = "P";
  const fullShortcutKey = "F";
  const previousShortcutKey = "\u2190";
  const nextShortcutKey = "\u2192";
  const goToPreviousAiOperatingArtifact = useCallback(() => {
    setActiveAiOperatingArtifactIndex((current) => (current - 1 + aiOperatingArtifacts.length) % aiOperatingArtifacts.length);
  }, []);
  const goToNextAiOperatingArtifact = useCallback(() => {
    setActiveAiOperatingArtifactIndex((current) => (current + 1) % aiOperatingArtifacts.length);
  }, []);
  const goToPreviousAiProofArtifact = useCallback(() => {
    setActiveAiProofArtifactIndex((current) => (current - 1 + aiProofArtifacts.length) % aiProofArtifacts.length);
  }, []);
  const goToNextAiProofArtifact = useCallback(() => {
    setActiveAiProofArtifactIndex((current) => (current + 1) % aiProofArtifacts.length);
  }, []);
  const getCursorModeFromPointer = useCallback((event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / Math.max(bounds.width, 1);

    if (x < 0.24) {
      return "arrow-left";
    }
    if (x > 0.76) {
      return "arrow-right";
    }
    return "expand";
  }, []);
  const handleArtifactPointerMove = useCallback((event) => {
    setDocumentCursorMode(getCursorModeFromPointer(event));
  }, [getCursorModeFromPointer]);
  const caseSections = useMemo(
    () => {
      if (isDeepCutNightGuide) {
        return [
          { id: "case-intro", label: "Hero" },
          { id: "case-ai-rationale", label: "AI" },
          { id: "case-overview", label: "Thesis" },
          { id: "case-operating", label: "Artifacts" },
          { id: "case-coming-next", label: "Takeaway" },
        ];
      }

      if (isCaseWip) {
        return [
          { id: "case-intro", label: "Hero" },
          { id: "case-wip", label: "WIP" },
        ];
      }

      return [
        { id: "case-intro", label: "Hero" },
        { id: "case-overview", label: "Overview" },
        { id: "case-operating", label: "AI model" },
        { id: "case-value", label: "Value" },
        { id: "case-impact", label: "Impact" },
      ];
    },
    [isCaseWip, isDeepCutNightGuide]
  );
  const syncMenuActiveItem = useCallback((sectionId = activeSectionIdRef.current) => {
    sectionItemsRef.current.forEach((item) => {
      item.classList.toggle("is-active", item.dataset.sectionId === sectionId);
    });
  }, []);

  const setActiveSection = useCallback((sectionId, { syncMenu = false } = {}) => {
    if (activeSectionIdRef.current === sectionId) {
      if (syncMenu) {
        syncMenuActiveItem(sectionId);
      }
      return;
    }

    activeSectionIdRef.current = sectionId;
    const nextIndex = Math.max(0, caseSections.findIndex((section) => section.id === sectionId));
    activeSectionIndexRef.current = nextIndex;
    latestActiveIndexRef.current = nextIndex;

    if (sectionLabelRef.current) {
      sectionLabelRef.current.textContent = caseSections[nextIndex]?.label ?? sectionId;
    }

    if (syncMenu) {
      syncMenuActiveItem(sectionId);
    }

    const section = caseSections[nextIndex];
    const viewKey = `${project.id}:${sectionId}`;
    if (section && !viewedSectionsRef.current.has(viewKey)) {
      viewedSectionsRef.current.add(viewKey);
      trackEvent(
        "case_section_view",
        {
          project_id: project.id,
          project_title: project.title,
          section_id: section.id,
          section_label: section.label,
          source: syncMenu ? "section_nav" : "scroll",
        },
        {
          clarityEventName: getAnalyticsEventName("case_section_view", project.id, section.id),
        }
      );
    }
  }, [caseSections, project.id, project.title, syncMenuActiveItem]);

  const revealScrollbar = useCallback((hideDelay = 980) => {
    const scrollbar = scrollbarRef.current;
    if (!scrollbar) {
      return;
    }

    if (!scrollbarVisibleRef.current) {
      scrollbar.classList.add("is-visible");
      scrollbarVisibleRef.current = true;
    }
    scrollbarHideAtRef.current = performance.now() + hideDelay;
    if (scrollbarHideTimerRef.current == null) {
      const checkScrollbarIdle = () => {
        const remaining = scrollbarHideAtRef.current - performance.now();
        if (remaining > 0) {
          scrollbarHideTimerRef.current = window.setTimeout(checkScrollbarIdle, remaining);
          return;
        }

        scrollbar.classList.remove("is-visible");
        scrollbarVisibleRef.current = false;
        scrollbarHideAtRef.current = 0;
        scrollbarHideTimerRef.current = null;
      };

      scrollbarHideTimerRef.current = window.setTimeout(checkScrollbarIdle, hideDelay);
    }
  }, []);

  const scrollOverlayToPointer = useCallback((clientY, offsetY) => {
    const scrollElement = scrollRef.current;
    const scrollbar = scrollbarRef.current;
    const scrollbarThumb = scrollbarThumbRef.current;

    if (!scrollElement || !scrollbar || !scrollbarThumb) {
      return;
    }

    const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
    if (maxScroll <= 0) {
      return;
    }

    const trackRect = scrollbar.getBoundingClientRect();
    const proportionalHeight = (scrollElement.clientHeight / scrollElement.scrollHeight) * trackRect.height;
    const thumbHeight = Math.min(trackRect.height * 0.43, Math.max(54, proportionalHeight * 0.72));
    scrollbarThumb.style.height = `${thumbHeight}px`;
    const maxThumbOffset = Math.max(1, trackRect.height - thumbHeight);
    const rawThumbOffset = clientY - trackRect.top - offsetY;
    const nextProgress = Math.min(1, Math.max(0, rawThumbOffset / maxThumbOffset));

    scrollElement.scrollTop = nextProgress * maxScroll;
    scrollbarThumb.style.transform = `translate3d(0, ${maxThumbOffset * nextProgress}px, 0)`;
    progressRef.current?.style.setProperty("transform", `scaleX(${nextProgress.toFixed(4)})`);
  }, []);

  const handleScrollbarPointerDown = useCallback((event) => {
    const scrollbar = scrollbarRef.current;
    const scrollbarThumb = scrollbarThumbRef.current;
    if (!scrollbar || !scrollbarThumb) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const scrollbarElement = event.currentTarget;
    const thumbRect = scrollbarThumb.getBoundingClientRect();
    const isThumbTarget = event.target === scrollbarThumb;
    const offsetY = isThumbTarget ? event.clientY - thumbRect.top : thumbRect.height / 2;
    scrollbarDragRef.current.offsetY = offsetY;
    scrollbar.classList.add("is-visible", "is-dragging");
    scrollbarVisibleRef.current = true;
    scrollbarElement.setPointerCapture?.(event.pointerId);
    scrollOverlayToPointer(event.clientY, offsetY);

    const handlePointerMove = (moveEvent) => {
      moveEvent.preventDefault();
      scrollOverlayToPointer(moveEvent.clientY, scrollbarDragRef.current.offsetY);
    };

    const handlePointerUp = (upEvent) => {
      upEvent.preventDefault();
      scrollbar.classList.remove("is-dragging");
      scrollbarElement.releasePointerCapture?.(event.pointerId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      revealScrollbar(720);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", handlePointerUp, { passive: false, once: true });
  }, [revealScrollbar, scrollOverlayToPointer]);

  useEffect(() => {
    expandCompleteRef.current = onExpandComplete;
    shrinkCompleteRef.current = onShrinkComplete;
  }, [onExpandComplete, onShrinkComplete]);

  useEffect(() => {
    isIndexOpenRef.current = isIndexOpen;
  }, [isIndexOpen]);

  useEffect(() => {
    return () => {
      if (projectNavTimerRef.current != null) {
        window.clearTimeout(projectNavTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isExpanding && !isShrinking) {
      return undefined;
    }

    const fallbackTimer = window.setTimeout(() => {
      if (isExpanding) {
        expandCompleteRef.current?.();
        return;
      }
      shrinkCompleteRef.current?.();
    }, 620);

    return () => window.clearTimeout(fallbackTimer);
  }, [isExpanding, isShrinking]);

  useEffect(() => {
    const video = enrichmentFlowVideoRef.current;
    if (!video) {
      return undefined;
    }

    video.playbackRate = 1.1;
    video.pause();

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          video.play().catch(() => {});
          return;
        }

        video.pause();
      },
      { root: scrollRef.current, rootMargin: "180px 0px", threshold: 0.22 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [project.id]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) {
      return undefined;
    }

    let frameId = null;
    let warmFrameOne = null;
    let warmFrameTwo = null;
    let warmFrameThree = null;
    let warmupCancelled = false;
    let lastProgress = -1;
    let lastScrollTop = -1;
    let lastThumbHeight = -1;
    let lastScrollEventAt = 0;
    let scrollMetrics = {
      activationLine: 260,
      maxScroll: 0,
      maxThumbOffset: 0,
      thumbHeight: 54,
    };

    const measureSections = () => {
      sectionElementsRef.current = caseSections
        .map((section) => document.getElementById(section.id))
        .filter(Boolean);
      sectionItemsRef.current = Array.from(sectionNavRef.current?.querySelectorAll(".case-section-nav-item") ?? []);
      sectionRangesRef.current = sectionElementsRef.current.map((section, index, sections) => {
        const nextSection = sections[index + 1];
        return {
          id: section.id,
          start: section.offsetTop,
          end: nextSection ? nextSection.offsetTop : Number.POSITIVE_INFINITY,
        };
      });
    };

    const measureScrollMetrics = () => {
      const scrollbar = scrollbarRef.current;
      const scrollbarThumb = scrollbarThumbRef.current;
      const maxScroll = Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight);

      if (!scrollbar || !scrollbarThumb) {
        scrollMetrics = {
          activationLine: getSectionActivationLine(scrollElement),
          maxScroll,
          maxThumbOffset: 0,
          thumbHeight: 54,
        };
        return;
      }

      const trackHeight = scrollbar.clientHeight;
      const proportionalHeight = maxScroll > 0 ? (scrollElement.clientHeight / scrollElement.scrollHeight) * trackHeight : trackHeight * 0.38;
      const thumbHeight = Math.min(trackHeight * 0.43, Math.max(54, proportionalHeight * 0.72));
      const maxThumbOffset = Math.max(0, trackHeight - thumbHeight);

      scrollMetrics = {
        activationLine: getSectionActivationLine(scrollElement),
        maxScroll,
        maxThumbOffset,
        thumbHeight,
      };

      if (Math.abs(thumbHeight - lastThumbHeight) > 0.5) {
        scrollbarThumb.style.height = `${thumbHeight}px`;
        lastThumbHeight = thumbHeight;
      }
    };

    const measureLayout = () => {
      measureSections();
      measureScrollMetrics();
    };

    const updateProgressLine = (scrollTop = latestScrollTopRef.current) => {
      const rawProgress = scrollMetrics.maxScroll > 0 ? scrollTop / scrollMetrics.maxScroll : 0;
      const progress = Math.min(1, Math.max(0, rawProgress));

      if (Math.abs(progress - lastProgress) > 0.0005) {
        progressRef.current?.style.setProperty("transform", `scaleX(${progress.toFixed(4)})`);
        scrollbarThumbRef.current?.style.setProperty(
          "transform",
          `translate3d(0, ${scrollMetrics.maxThumbOffset * progress}px, 0)`
        );
        lastProgress = progress;
      }

      return { scrollTop, progress };
    };

    const updateActiveSection = (scrollTop) => {
      const sectionRanges = sectionRangesRef.current;
      if (!sectionRanges.length) {
        return;
      }

      const activeTop = scrollTop + scrollMetrics.activationLine;
      let currentIndex = 0;

      for (let index = 0; index < sectionRanges.length; index += 1) {
        const section = sectionRanges[index];
        if (activeTop >= section.start && activeTop < section.end) {
          currentIndex = index;
          break;
        }
      }

      if (currentIndex !== latestActiveIndexRef.current) {
        const currentSection = sectionRanges[currentIndex];
        if (currentSection) {
          setActiveSection(currentSection.id, { syncMenu: isIndexOpenRef.current });
        }
      }
    };

    const processScrollPosition = () => {
      const scrollTop = latestScrollTopRef.current;
      updateProgressLine(scrollTop);

      if (Math.abs(scrollTop - lastScrollTop) > 0.5) {
        updateActiveSection(scrollTop);
        revealScrollbar();
        lastScrollTop = scrollTop;
      }
    };

    const requestScrollTick = () => {
      if (isScrollTickingRef.current) {
        return;
      }

      isScrollTickingRef.current = true;

      const scrollLoop = () => {
        const actualScrollTop = scrollElement.scrollTop;
        const movedSinceLastFrame = Math.abs(actualScrollTop - latestScrollTopRef.current) > 0.25;
        latestScrollTopRef.current = actualScrollTop;
        processScrollPosition();

        if (performance.now() - lastScrollEventAt < 160 || movedSinceLastFrame) {
          frameId = requestAnimationFrame(scrollLoop);
          return;
        }

        isScrollTickingRef.current = false;
        frameId = null;
      };

      frameId = requestAnimationFrame(scrollLoop);
    };

    const handleScroll = () => {
      latestScrollTopRef.current = scrollElement.scrollTop;
      lastScrollEventAt = performance.now();
      requestScrollTick();
    };

    const handleResize = () => {
      measureLayout();
      latestScrollTopRef.current = scrollElement.scrollTop;
      processScrollPosition();
    };

    const runWarmup = () => {
      isOverlayWarmingRef.current = true;
      document.body.classList.add("case-overlay-warm");

      warmFrameOne = requestAnimationFrame(() => {
        warmFrameTwo = requestAnimationFrame(() => {
          const heroImage = scrollElement.querySelector(".project-showcase-bg");
          const decodePromise = heroImage?.decode ? heroImage.decode().catch(() => {}) : Promise.resolve();

          decodePromise.then(() => {
            if (warmupCancelled) {
              return;
            }

            warmFrameThree = requestAnimationFrame(() => {
              measureLayout();
              latestScrollTopRef.current = scrollElement.scrollTop;
              if (sectionLabelRef.current) {
                sectionLabelRef.current.textContent = caseSections[activeSectionIndexRef.current]?.label ?? "Hero";
              }
              sectionElementsRef.current.forEach((section) => {
                section.getBoundingClientRect();
              });
              processScrollPosition();
              isOverlayWarmingRef.current = false;
              document.body.classList.remove("case-overlay-warm");
            });
          });
        });
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(handleResize);
    resizeObserver?.observe(scrollElement);
    measureLayout();
    latestScrollTopRef.current = scrollElement.scrollTop;
    revealScrollbar();
    processScrollPosition();
    runWarmup();

    return () => {
      window.removeEventListener("resize", handleResize);
      scrollElement.removeEventListener("scroll", handleScroll);
      resizeObserver?.disconnect();
      warmupCancelled = true;
      if (frameId != null) {
        cancelAnimationFrame(frameId);
      }
      if (warmFrameOne != null) {
        cancelAnimationFrame(warmFrameOne);
      }
      if (warmFrameTwo != null) {
        cancelAnimationFrame(warmFrameTwo);
      }
      if (warmFrameThree != null) {
        cancelAnimationFrame(warmFrameThree);
      }
      if (scrollbarHideTimerRef.current != null) {
        window.clearTimeout(scrollbarHideTimerRef.current);
        scrollbarHideTimerRef.current = null;
      }
      isScrollTickingRef.current = false;
      isOverlayWarmingRef.current = false;
      document.body.classList.remove("case-overlay-warm");
    };
  }, [caseSections, project.id, revealScrollbar, setActiveSection]);

  /*
    Scroll progress is intentionally driven by the RAF watcher above instead of
    scroll-event timing. That keeps the glow line attached to the real scroll
    position even when browsers coalesce wheel/trackpad events during momentum.
  */

  useEffect(() => {
    setIsIndexOpen(false);
    setExpandedImage(null);
    setActiveProductPreviewIndex(0);
    setWorkflowReveal(50);
    viewedSectionsRef.current = new Set();
    activeSectionIdRef.current = "";
    activeSectionIndexRef.current = 0;
    latestActiveIndexRef.current = 0;
    latestScrollTopRef.current = 0;
    if (sectionLabelRef.current) {
      sectionLabelRef.current.textContent = "Hero";
    }
    setActiveSection("case-intro", { syncMenu: true });
    if (progressRef.current) {
      progressRef.current.style.transform = "scaleX(0)";
    }
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });

    const pendingDirection = pendingProjectDirectionRef.current;
    if (pendingDirection) {
      pendingProjectDirectionRef.current = null;
      setProjectNavPhase(`enter-${pendingDirection}`);
      const enterTimer = window.setTimeout(() => setProjectNavPhase(""), 360);
      return () => window.clearTimeout(enterTimer);
    }
  }, [project.id, setActiveSection]);

  const handleProjectNavigation = useCallback((direction, source = "project_nav") => {
    if (isProjectNavigating || isExpanding || isShrinking) {
      return;
    }

    const navigate = direction === "next" ? onNextProject : onPreviousProject;
    if (!navigate) {
      return;
    }

    const eventName = source === "wip_bridge" ? "wip_bridge_click" : "project_nav_click";
    trackEvent(
      eventName,
      {
        project_id: project.id,
        project_title: project.title,
        direction,
        source,
      },
      {
        clarityEventName: getAnalyticsEventName(eventName, project.id, direction),
        upgrade: source === "wip_bridge" ? "wip bridge clicked" : undefined,
      }
    );

    pendingProjectDirectionRef.current = direction;
    setProjectNavPhase(`exit-${direction}`);

    if (projectNavTimerRef.current != null) {
      window.clearTimeout(projectNavTimerRef.current);
    }

    projectNavTimerRef.current = window.setTimeout(() => {
      projectNavTimerRef.current = null;
      navigate();
    }, 170);
  }, [isExpanding, isProjectNavigating, isShrinking, onNextProject, onPreviousProject, project.id, project.title]);

  useEffect(() => {
    const preloaders = productOverviewCards.map((card) => {
      const image = new Image();
      image.decoding = "async";
      image.src = card.image;
      image.decode?.().catch(() => {});
      return image;
    });

    return () => {
      preloaders.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    const scrollbar = scrollbarRef.current;
    const scrollbarThumb = scrollbarThumbRef.current;
    if (!scrollElement || !scrollbar || !scrollbarThumb) {
      return undefined;
    }

    let frameId = null;
    const refreshScrollbarGeometry = () => {
      const maxScroll = Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight);
      const trackHeight = scrollbar.clientHeight;
      const proportionalHeight = maxScroll > 0 ? (scrollElement.clientHeight / scrollElement.scrollHeight) * trackHeight : trackHeight * 0.38;
      const thumbHeight = Math.min(trackHeight * 0.43, Math.max(54, proportionalHeight * 0.72));
      const maxThumbOffset = Math.max(0, trackHeight - thumbHeight);
      const progress = maxScroll > 0 ? scrollElement.scrollTop / maxScroll : 0;

      scrollbarThumb.style.height = `${thumbHeight}px`;
      scrollbarThumb.style.transform = `translate3d(0, ${maxThumbOffset * progress}px, 0)`;
    };

    frameId = requestAnimationFrame(() => {
      frameId = requestAnimationFrame(refreshScrollbarGeometry);
    });

    return () => {
      if (frameId != null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isFull, isExpanding, isShrinking]);

  useEffect(() => {
    if (!isIndexOpen) {
      return undefined;
    }

    syncMenuActiveItem();

    const handlePointerDown = (event) => {
      if (!sectionNavRef.current?.contains(event.target)) {
        setIsIndexOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isIndexOpen, syncMenuActiveItem]);

  const handleSectionSelect = (sectionId) => {
    const scrollElement = scrollRef.current;
    const sectionElement = document.getElementById(sectionId);
    if (!scrollElement || !sectionElement) {
      return;
    }

    setIsIndexOpen(false);
    const section = caseSections.find((item) => item.id === sectionId);
    trackEvent(
      "case_section_nav_select",
      {
        project_id: project.id,
        project_title: project.title,
        section_id: sectionId,
        section_label: section?.label ?? sectionId,
        source: "section_nav",
      },
      {
        clarityEventName: getAnalyticsEventName("case_section_nav_select", project.id, sectionId),
      }
    );
    setActiveSection(sectionId, { syncMenu: true });
    scrollElement.scrollTo({
      top: Math.max(0, sectionElement.offsetTop - getSectionActivationLine(scrollElement) + 8),
      behavior: "smooth",
    });
  };

  const handlePanelTransitionEnd = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (event.propertyName !== "border-radius") {
      return;
    }
    if (isExpanding) {
      expandCompleteRef.current?.();
      return;
    }
    if (isShrinking) {
      shrinkCompleteRef.current?.();
    }
  };

  const openProductPreviewLightbox = () => {
    const activeCard = productOverviewCards[activeProductPreviewIndex];
    setExpandedImage({
      type: "product-overview",
      productIndex: activeProductPreviewIndex,
      image: activeCard.image,
      imageAlt: activeCard.imageAlt,
      title: activeCard.title,
      caption: activeCard.caption,
    });
  };

  const setExpandedProductPreview = useCallback((nextIndex) => {
    const lastIndex = productOverviewCards.length - 1;
    const normalizedIndex = ((nextIndex % productOverviewCards.length) + productOverviewCards.length) % productOverviewCards.length;
    const activeCard = productOverviewCards[normalizedIndex];

    setActiveProductPreviewIndex(normalizedIndex);
    setExpandedImage({
      type: "product-overview",
      productIndex: normalizedIndex,
      image: activeCard.image,
      imageAlt: activeCard.imageAlt,
      title: activeCard.title,
      caption: activeCard.caption,
      hasPrevious: lastIndex > 0,
      hasNext: lastIndex > 0,
    });
  }, []);

  const setExpandedAiArtifact = useCallback((nextIndex, source = "proof") => {
    const artifacts = source === "operating" ? aiOperatingArtifacts : aiProofArtifacts;
    const normalizedIndex = ((nextIndex % artifacts.length) + artifacts.length) % artifacts.length;
    const artifact = artifacts[normalizedIndex];

    if (source === "operating") {
      setActiveAiOperatingArtifactIndex(normalizedIndex);
    } else {
      setActiveAiProofArtifactIndex(normalizedIndex);
    }
    setExpandedImage({
      type: "ai-artifact",
      source,
      artifactIndex: normalizedIndex,
      image: artifact.image,
      imageAlt: artifact.title,
      title: artifact.title,
      caption: artifact.caption,
    });
  }, []);

  const setExpandedDeepCutArtifact = useCallback((nextIndex) => {
    const normalizedIndex = ((nextIndex % deepCutCaseArtifacts.length) + deepCutCaseArtifacts.length) % deepCutCaseArtifacts.length;
    const artifact = deepCutCaseArtifacts[normalizedIndex];

    setExpandedImage({
      type: "deepcut-artifact",
      artifactIndex: normalizedIndex,
      image: getAssetPath(artifact.image),
      imageAlt: artifact.alt,
      title: artifact.title,
      caption: artifact.body,
    });
  }, []);

  const setExpandedAuroraArtifact = useCallback((nextIndex) => {
    const normalizedIndex = ((nextIndex % auroraCaseArtifacts.length) + auroraCaseArtifacts.length) % auroraCaseArtifacts.length;
    const artifact = auroraCaseArtifacts[normalizedIndex];

    setExpandedImage({
      type: "aurora-artifact",
      artifactIndex: normalizedIndex,
      image: getAssetPath(artifact.image),
      imageAlt: artifact.alt,
      title: artifact.title,
      caption: artifact.body,
    });
  }, []);

  const goToPreviousExpandedImage = useCallback(() => {
    if (expandedImage?.type === "ai-artifact") {
      const fallbackIndex = expandedImage.source === "operating" ? activeAiOperatingArtifactIndex : activeAiProofArtifactIndex;
      setExpandedAiArtifact((expandedImage.artifactIndex ?? fallbackIndex) - 1, expandedImage.source);
      return;
    }

    if (expandedImage?.type === "product-overview") {
      setExpandedProductPreview((expandedImage.productIndex ?? activeProductPreviewIndex) - 1);
      return;
    }

    if (expandedImage?.type === "deepcut-artifact") {
      setExpandedDeepCutArtifact((expandedImage.artifactIndex ?? 0) - 1);
      return;
    }

    if (expandedImage?.type === "aurora-artifact") {
      setExpandedAuroraArtifact((expandedImage.artifactIndex ?? 0) - 1);
    }
  }, [activeAiOperatingArtifactIndex, activeAiProofArtifactIndex, activeProductPreviewIndex, expandedImage, setExpandedAiArtifact, setExpandedAuroraArtifact, setExpandedDeepCutArtifact, setExpandedProductPreview]);

  const goToNextExpandedImage = useCallback(() => {
    if (expandedImage?.type === "ai-artifact") {
      const fallbackIndex = expandedImage.source === "operating" ? activeAiOperatingArtifactIndex : activeAiProofArtifactIndex;
      setExpandedAiArtifact((expandedImage.artifactIndex ?? fallbackIndex) + 1, expandedImage.source);
      return;
    }

    if (expandedImage?.type === "product-overview") {
      setExpandedProductPreview((expandedImage.productIndex ?? activeProductPreviewIndex) + 1);
      return;
    }

    if (expandedImage?.type === "deepcut-artifact") {
      setExpandedDeepCutArtifact((expandedImage.artifactIndex ?? 0) + 1);
      return;
    }

    if (expandedImage?.type === "aurora-artifact") {
      setExpandedAuroraArtifact((expandedImage.artifactIndex ?? 0) + 1);
    }
  }, [activeAiOperatingArtifactIndex, activeAiProofArtifactIndex, activeProductPreviewIndex, expandedImage, setExpandedAiArtifact, setExpandedAuroraArtifact, setExpandedDeepCutArtifact, setExpandedProductPreview]);

  const handleAiOperatingArtifactStageClick = useCallback((event) => {
    const mode = getCursorModeFromPointer(event);

    if (mode === "arrow-left") {
      goToPreviousAiOperatingArtifact();
      return;
    }
    if (mode === "arrow-right") {
      goToNextAiOperatingArtifact();
      return;
    }

    setExpandedAiArtifact(activeAiOperatingArtifactIndex, "operating");
  }, [activeAiOperatingArtifactIndex, getCursorModeFromPointer, goToNextAiOperatingArtifact, goToPreviousAiOperatingArtifact, setExpandedAiArtifact]);

  const handleAiProofArtifactStageClick = useCallback((event) => {
    const mode = getCursorModeFromPointer(event);

    if (mode === "arrow-left") {
      goToPreviousAiProofArtifact();
      return;
    }
    if (mode === "arrow-right") {
      goToNextAiProofArtifact();
      return;
    }

    setExpandedAiArtifact(activeAiProofArtifactIndex, "proof");
  }, [activeAiProofArtifactIndex, getCursorModeFromPointer, goToNextAiProofArtifact, goToPreviousAiProofArtifact, setExpandedAiArtifact]);

  const goToPreviousProductPreview = () => {
    const lastIndex = productOverviewCards.length - 1;
    setActiveProductPreviewIndex((currentIndex) => (currentIndex === 0 ? lastIndex : currentIndex - 1));
  };

  const goToNextProductPreview = () => {
    const lastIndex = productOverviewCards.length - 1;
    setActiveProductPreviewIndex((currentIndex) => (currentIndex === lastIndex ? 0 : currentIndex + 1));
  };

  useEffect(() => {
    const syncShortcutMode = (event) => {
      const modifierPressed = isMacLikePlatform ? event.metaKey : event.ctrlKey;
      setIsShortcutMode(modifierPressed);
      return modifierPressed;
    };

    const handleKeyDown = (event) => {
      const isPrimaryModifierPressed = syncShortcutMode(event);

      if (isEditableShortcutTarget(event.target)) {
        return;
      }

      if (event.key === "Escape") {
        if (expandedImage) {
          setExpandedImage(null);
          return;
        }

        if (!isExpanding && !isShrinking && !isClosing) {
          onClose();
        }
        return;
      }

      const isPrimaryShortcut = isPrimaryModifierPressed && !event.altKey && !event.shiftKey;

      if (isPrimaryShortcut && event.key.toLowerCase() === "f") {
        event.preventDefault();
        if (!isFull && !isExpanding && !isShrinking && !isClosing) {
          onOpenFull();
        }
        return;
      }

      if (isPrimaryShortcut && event.key.toLowerCase() === "p") {
        event.preventDefault();
        if (isFull && !isExpanding && !isShrinking && !isClosing) {
          onOpenPreview();
        }
        return;
      }

      if (isPrimaryShortcut && event.key === "ArrowLeft") {
        event.preventDefault();
        if (hasPreviousProject && !isProjectNavigating) {
          handleProjectNavigation("prev", "keyboard_shortcut");
        }
        return;
      }

      if (isPrimaryShortcut && event.key === "ArrowRight") {
        event.preventDefault();
        if (hasNextProject && !isProjectNavigating) {
          handleProjectNavigation("next", "keyboard_shortcut");
        }
        return;
      }

      if (!expandedImage) {
        return;
      }

      if (event.key === "ArrowLeft") {
        goToPreviousExpandedImage();
        return;
      }

      if (event.key === "ArrowRight") {
        goToNextExpandedImage();
      }
    };

    const handleKeyUp = (event) => {
      syncShortcutMode(event);
    };

    const handleWindowBlur = () => {
      setIsShortcutMode(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsShortcutMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    expandedImage,
    goToNextExpandedImage,
    goToPreviousExpandedImage,
    handleProjectNavigation,
    hasNextProject,
    hasPreviousProject,
    isMacLikePlatform,
    isClosing,
    isExpanding,
    isFull,
    isProjectNavigating,
    isShrinking,
    onClose,
    onOpenFull,
    onOpenPreview,
  ]);

  const workflowRevealNumber = Number(workflowReveal);
  const aiWorkflowRevealNumber = Number(aiWorkflowReveal);

  if (project.id === "deepcut-ai-night-guide") {
    const deepCutDeviceStory = [
      {
        title: "PC",
        device: "pc",
        body: "Browse, compare, and understand what is worth time.",
      },
      {
        title: "Mobile",
        device: "mobile",
        body: "Check the score, save the cut, or choose a watch option.",
      },
      {
        title: "TV",
        device: "tv",
        body: "Start confidently from the strongest moment.",
      },
    ];

    return (
      <div
        className={`case-overlay${isExpanding ? " is-expanding" : ""}${isFull ? " is-full" : ""}${isShrinking ? " is-shrinking" : ""}${isClosing ? " is-closing" : ""}${projectNavPhase ? ` is-project-${projectNavPhase}` : ""}${isShortcutMode ? " is-shortcut-mode" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.eyebrow} case study ${isFull ? "full view" : "preview"}`}
        style={{
          "--case-accent": projectDetail.accentColor,
          "--case-accent-glow": projectDetail.accentGlow,
        }}
      >
        <div className="case-overlay-backdrop" onClick={isExpanding || isFull || isShrinking ? undefined : onClose} />
        <section className="case-overlay-panel" onTransitionEnd={handlePanelTransitionEnd}>
          <header className="case-overlay-header">
            <button
              className="project-detail-back"
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              disabled={isExpanding || isShrinking || isClosing}
            >
              <span aria-hidden="true">←</span>
              <span>Back</span>
              <ShortcutHint label="Esc" isVisible={isShortcutMode} />
            </button>

            <div className={`case-overlay-actions${isFullControlActive ? " is-full-selected" : " is-preview-selected"}`}>
              <button
                className={`case-overlay-mode-pill case-overlay-mode-button${!isFullControlActive ? " is-active" : ""}`}
                type="button"
                onClick={isFull ? onOpenPreview : undefined}
                disabled={isExpanding || isShrinking || !isFull}
                aria-current={!isFullControlActive ? "page" : undefined}
              >
                <ButtonShortcutContent label="Preview" shortcut={previewShortcutLabel} keyLabel={previewShortcutKey} isShortcutVisible={isShortcutMode} />
              </button>
              <button
                className={`case-overlay-expand${isFullControlActive ? " is-active" : ""}`}
                type="button"
                onClick={isFull ? undefined : onOpenFull}
                disabled={isExpanding || isShrinking || isFull}
                aria-current={isFullControlActive ? "page" : undefined}
              >
                <ButtonShortcutContent label="Full" shortcut={fullShortcutLabel} keyLabel={fullShortcutKey} isShortcutVisible={isShortcutMode} />
              </button>
            </div>
          </header>

          <div className="case-overlay-scroll" ref={scrollRef}>
            <div className="case-overlay-content">
              <section className="project-detail-hero" id="case-intro" aria-labelledby={`${project.id}-overlay-title`}>
                <p className="project-detail-kicker">
                  <span className="project-detail-kicker-dot" aria-hidden="true" />
                  <span id={`${project.id}-overlay-title`}>{project.eyebrow}</span>
                </p>
                <p className="project-detail-subtitle">{project.title}</p>
                <div className="case-hero-highlight-row" aria-label="Case study highlights">
                  {projectHighlights.map((highlight) => (
                    <span key={highlight}>{highlight}</span>
                  ))}
                </div>

                <div className="project-detail-media project-showcase-media is-image-only is-deepcut-night-guide">
                  <DeepCutNightGuideThumbnail />
                </div>
              </section>

              <section className="project-detail-meta" aria-label="Project information">
                <article className="project-detail-info-block">
                  <h2>Company</h2>
                  <p>
                    {projectDetail.company.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                </article>
                <article className="project-detail-info-block">
                  <h2>Responsibility</h2>
                  <p>{projectDetail.responsibility}</p>
                </article>
                <article className="project-detail-info-block">
                  <h2>Timeline</h2>
                  <p>{projectDetail.timeline}</p>
                </article>
                <article className="project-detail-info-block">
                  <h2>Role & Team</h2>
                  <p>{projectDetail.roleTeam}</p>
                </article>
              </section>

              <section className="case-study-section deepcut-ai-rationale-section" id="case-ai-rationale" aria-labelledby={`${project.id}-ai-rationale`}>
                <CaseSectionHeader
                  label="AI rationale"
                  title="The AI feature only appears when it can answer a real user need."
                  id={`${project.id}-ai-rationale`}
                >
                  The strongest AI moment is not generation. It is decision support: when the user asks for a video worth watching tonight, DeepCut explains the recommendation using human reviews, pacing, best-start timestamps, and source confidence.
                </CaseSectionHeader>
                <button
                  className="deepcut-story-image-button deepcut-lead-artifact"
                  type="button"
                  onClick={() => setExpandedDeepCutArtifact(0)}
                  onPointerDown={(event) => {
                    if (event.button !== 0) {
                      return;
                    }

                    event.preventDefault();
                    clearDocumentCursorMode();
                    setExpandedDeepCutArtifact(0);
                  }}
                  onPointerEnter={() => setDocumentCursorMode("expand")}
                  onPointerLeave={clearDocumentCursorMode}
                  onPointerMove={() => setDocumentCursorMode("expand")}
                  aria-label={`Expand ${deepCutCaseArtifacts[0].title}`}
                >
                  <img src={getAssetPath(deepCutCaseArtifacts[0].image)} alt={deepCutCaseArtifacts[0].alt} loading="lazy" decoding="async" />
                </button>
              </section>

              <section className="case-study-section" id="case-overview" aria-labelledby={`${project.id}-overview`}>
                <CaseSectionHeader
                  label="Product narrative"
                  title="IMDb-style confidence for long-form YouTube and Bilibili."
                  id={`${project.id}-overview`}
                >
                  Long-form online video asks for real time, but discovery still treats it like a quick feed. DeepCut gives these videos a place to be rated, compared, reviewed, saved, and watched with intent.
                </CaseSectionHeader>
                <div className="deepcut-case-thesis" aria-label="DeepCut thesis">
                  <span>Market gap</span>
                  <p>Movies have IMDb. Anime has dedicated rating communities. Long-form YouTube and Bilibili still rely on thumbnails, comments, and guesswork.</p>
                </div>
                <section className="deepcut-device-story" aria-label="DeepCut cross-device journey">
                  {deepCutDeviceStory.map((card) => (
                    <article key={card.title}>
                      <span className={`deepcut-device-icon is-${card.device}`} aria-hidden="true">
                        <i />
                      </span>
                      <h2>{card.title}</h2>
                      <p>{card.body}</p>
                    </article>
                  ))}
                </section>
              </section>

              <section className="case-study-section" id="case-operating" aria-labelledby={`${project.id}-flow`}>
                <CaseSectionHeader
                  label="Case story"
                  title="One product, three viewing contexts."
                  id={`${project.id}-flow`}
                >
                  The case study is designed as a visual walkthrough: desktop for discovery, mobile for decision-making, and TV for the final watch.
                </CaseSectionHeader>
                <section className="deepcut-story-gallery" aria-label="DeepCut case study artifacts">
                  {deepCutCaseArtifacts.slice(1).map((frame, index) => {
                    const artifactIndex = index + 1;

                    return (
                    <article className={`deepcut-story-frame is-${frame.layout}`} key={frame.title}>
                      <button
                        className={`deepcut-story-image-button is-${frame.layout}`}
                        type="button"
                        onClick={() => setExpandedDeepCutArtifact(artifactIndex)}
                        onPointerDown={(event) => {
                          if (event.button !== 0) {
                            return;
                          }

                          event.preventDefault();
                          clearDocumentCursorMode();
                          setExpandedDeepCutArtifact(artifactIndex);
                        }}
                        onPointerEnter={() => setDocumentCursorMode("expand")}
                        onPointerLeave={clearDocumentCursorMode}
                        onPointerMove={() => setDocumentCursorMode("expand")}
                        aria-label={`Expand ${frame.title}`}
                      >
                        <img src={getAssetPath(frame.image)} alt={frame.alt} loading="lazy" decoding="async" />
                      </button>
                      <div className="deepcut-story-caption">
                        <span>{frame.label}</span>
                        <h2>{frame.title}</h2>
                        <p>{frame.body}</p>
                        <div className="deepcut-story-metrics" aria-label={`${frame.title} highlights`}>
                          {frame.metrics.map((metric) => (
                            <b key={metric}>{metric}</b>
                          ))}
                        </div>
                      </div>
                    </article>
                    );
                  })}
                </section>
              </section>

              <section className="case-study-section case-wip-section" id="case-coming-next" aria-labelledby={`${project.id}-coming-next`}>
                <CaseSectionHeader
                  label="Build status"
                  title="Currently building toward a web beta and future mobile release."
                  id={`${project.id}-coming-next`}
                >
                  The case study shows the product direction while the platform is still being built: web access first, with a future App Store path once the review, save, and AI decision flows are ready.
                </CaseSectionHeader>
                <div className="case-wip-card">
                  <span aria-hidden="true" />
                  <div>
                    <h3>Launch intent</h3>
                    <p>
                      DeepCut is an IMDb-style review and AI decision layer for long-form YouTube and Bilibili, designed to become available on the web and eventually as a mobile app.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className="case-overlay-scrollbar" ref={scrollbarRef} onPointerDown={handleScrollbarPointerDown} aria-hidden="true">
            <span ref={scrollbarThumbRef} />
          </div>
          <nav
            ref={sectionNavRef}
            className={`case-section-nav${isIndexOpen ? " is-open" : ""}`}
            aria-label="Case study sections"
          >
            <div className="case-section-nav-main">
              <button
                className="case-section-nav-trigger"
                type="button"
                onClick={() => setIsIndexOpen((current) => !current)}
                aria-expanded={isIndexOpen}
              >
                <span className="case-section-nav-mark" aria-hidden="true">
                  <img src={getAssetPath("/logo-mark-transparent.png?v=3")} alt="" />
                </span>
                <span className="case-section-nav-title" aria-hidden="true">
                  <span className="case-section-nav-title-label" ref={sectionLabelRef}>
                    Hero
                  </span>
                </span>
                <span className="sr-only">Case study sections</span>
                <span className="case-section-nav-chevron" aria-hidden="true" />
                <span className="case-section-nav-progress" ref={progressRef} aria-hidden="true" />
              </button>

              <div className="case-section-nav-menu">
                {caseSections.map((section) => (
                  <button
                    className={`case-section-nav-item${section.id === "case-intro" ? " is-active" : ""}`}
                    type="button"
                    key={section.id}
                    data-section-id={section.id}
                    onClick={() => handleSectionSelect(section.id)}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            {hasPreviousProject || hasNextProject ? (
              <div className="case-project-nav-controls" aria-label="Project navigation">
                {hasPreviousProject ? (
                  <button
                    className="case-project-nav-button"
                    type="button"
                    onClick={() => handleProjectNavigation("prev", "project_nav")}
                    disabled={isProjectNavigating}
                    aria-label="Previous project"
                  >
                    <ButtonShortcutContent label="Prev" shortcut={previousShortcutLabel} keyLabel={previousShortcutKey} shortcutPosition="before" isShortcutVisible={isShortcutMode} />
                  </button>
                ) : null}
                {hasNextProject ? (
                  <button
                    className="case-project-nav-button"
                    type="button"
                    onClick={() => handleProjectNavigation("next", "project_nav")}
                    disabled={isProjectNavigating}
                    aria-label="Next project"
                  >
                    <ButtonShortcutContent label="Next" shortcut={nextShortcutLabel} keyLabel={nextShortcutKey} isShortcutVisible={isShortcutMode} />
                  </button>
                ) : null}
              </div>
            ) : null}
          </nav>
        </section>
        {expandedImage ? (
          <div className="case-image-lightbox" role="dialog" aria-modal="true" aria-label={`${expandedImage.title} expanded image`}>
            <button
              className="case-image-lightbox-backdrop"
              type="button"
              onClick={() => {
                clearDocumentCursorMode();
                setExpandedImage(null);
              }}
              aria-label="Close expanded image"
            />
            <div className="case-image-lightbox-panel">
              <div className="case-image-lightbox-header">
                <div>
                  <p>Product image</p>
                  <h2>{expandedImage.title}</h2>
                </div>
                <button
                  className="case-image-lightbox-close"
                  type="button"
                  onClick={() => {
                    clearDocumentCursorMode();
                    setExpandedImage(null);
                  }}
                >
                  Close
                </button>
              </div>
              <div className="case-image-lightbox-frame">
                <img
                  src={expandedImage.image}
                  sizes="min(1500px, 96vw)"
                  alt={expandedImage.imageAlt}
                  decoding="async"
                />
                {expandedImage.type === "deepcut-artifact" ? (
                  <div className="case-image-lightbox-hit-zones" aria-label="Expanded image navigation">
                    <button
                      className="case-image-lightbox-hit-zone case-image-lightbox-hit-zone-left"
                      type="button"
                      onClick={goToPreviousExpandedImage}
                      onPointerEnter={() => setDocumentCursorMode("arrow-left")}
                      onPointerLeave={clearDocumentCursorMode}
                      aria-label="Previous DeepCut artifact"
                    />
                    <button
                      className="case-image-lightbox-hit-zone case-image-lightbox-hit-zone-right"
                      type="button"
                      onClick={goToNextExpandedImage}
                      onPointerEnter={() => setDocumentCursorMode("arrow-right")}
                      onPointerLeave={clearDocumentCursorMode}
                      aria-label="Next DeepCut artifact"
                    />
                  </div>
                ) : null}
              </div>
              <p className="case-image-lightbox-caption">{expandedImage.caption}</p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={`case-overlay${isExpanding ? " is-expanding" : ""}${isFull ? " is-full" : ""}${isShrinking ? " is-shrinking" : ""}${isClosing ? " is-closing" : ""}${isCaseWip ? " is-wip-case" : ""}${projectNavPhase ? ` is-project-${projectNavPhase}` : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.eyebrow} case study ${isFull ? "full view" : "preview"}`}
      style={{
        "--case-accent": projectDetail.accentColor,
        "--case-accent-glow": projectDetail.accentGlow,
      }}
    >
      <div className="case-overlay-backdrop" onClick={isExpanding || isFull || isShrinking ? undefined : onClose} />
      <section className="case-overlay-panel" onTransitionEnd={handlePanelTransitionEnd}>
        <header className="case-overlay-header">
          <button
            className="project-detail-back"
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            disabled={isExpanding || isShrinking || isClosing}
          >
            <span aria-hidden="true">←</span>
            <span>Back</span>
            <ShortcutHint label="Esc" isVisible={isShortcutMode} />
          </button>

          <div className={`case-overlay-actions${isFullControlActive ? " is-full-selected" : " is-preview-selected"}`}>
            <button
              className={`case-overlay-mode-pill case-overlay-mode-button${!isFullControlActive ? " is-active" : ""}`}
              type="button"
              onClick={isFull ? onOpenPreview : undefined}
              disabled={isExpanding || isShrinking || !isFull}
              aria-current={!isFullControlActive ? "page" : undefined}
            >
              <ButtonShortcutContent label="Preview" shortcut={previewShortcutLabel} keyLabel={previewShortcutKey} isShortcutVisible={isShortcutMode} />
            </button>
            <button
              className={`case-overlay-expand${isFullControlActive ? " is-active" : ""}`}
              type="button"
              onClick={isFull ? undefined : onOpenFull}
              disabled={isExpanding || isShrinking || isFull}
              aria-current={isFullControlActive ? "page" : undefined}
            >
              <ButtonShortcutContent label="Full" shortcut={fullShortcutLabel} keyLabel={fullShortcutKey} isShortcutVisible={isShortcutMode} />
            </button>
          </div>
        </header>

        <div className="case-overlay-scroll" ref={scrollRef}>
          <div className="case-overlay-content">
            <section className="project-detail-hero" id="case-intro" aria-labelledby={`${project.id}-overlay-title`}>
              <p className="project-detail-kicker">
                <span className="project-detail-kicker-dot" aria-hidden="true" />
                <span id={`${project.id}-overlay-title`}>{project.eyebrow}</span>
              </p>
              <p className="project-detail-subtitle">{project.title}</p>
              <div className="case-hero-highlight-row" aria-label="Case study highlights">
                {projectHighlights.map((highlight) => (
                  <span key={highlight}>{highlight}</span>
                ))}
              </div>

              <div className={`project-detail-media project-showcase-media${project.showLockup === false || isDeepCutNightGuide ? " is-image-only" : ""}${project.id === "jpmorgan-ai" ? " is-jpmorgan-ai" : ""}${isDeepCutNightGuide ? " is-deepcut-night-guide" : ""}`}>
                {isDeepCutNightGuide ? (
                  <DeepCutNightGuideThumbnail />
                ) : (
                  <>
                    <img
                      className="project-showcase-bg"
                      src={getAssetPath(project.image)}
                      srcSet={getAssetSrcSet(project.imageSrcSet)}
                      sizes={project.imageSizes}
                      alt={project.imageAlt}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      onError={handleProjectImageError}
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
              </div>
            </section>

            <section className="project-detail-meta" aria-label="Project information">
              <article className="project-detail-info-block">
                <h2>Company</h2>
                <p>
                  {projectDetail.company.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < projectDetail.company.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </p>
              </article>

              <article className="project-detail-info-block">
                <h2>Timeline</h2>
                <p>{projectDetail.timeline}</p>
              </article>

              <article className="project-detail-info-block">
                <h2>{projectDetail.responsibility ? "Responsibility" : "Role"}</h2>
                <p>{projectDetail.responsibility ?? projectDetail.role}</p>
              </article>

              <article className="project-detail-info-block">
                <h2>Role & Team</h2>
                <p>{projectDetail.roleTeam}</p>
              </article>
            </section>

            {isCaseWip ? (
              <section className="case-study-section case-wip-section" id="case-wip" aria-labelledby={`${project.id}-wip`}>
                <CaseSectionHeader
                  label="Case study in progress"
                  title={project.wipTitle ?? "Wholesale Lending Ops case study"}
                  id={`${project.id}-wip`}
                >
                  {project.wipBody ?? "The hero and project context are live now while the deeper narrative is being finalized."}
                </CaseSectionHeader>
                {isAuroraWipCase ? (
                  <div className="aurora-wip-artifacts" aria-label="Aurora work in progress artifacts">
                    <div className="aurora-wip-artifacts-intro">
                      <span>Sanitized WIP artifacts</span>
                      <p>
                        Two product moments are available now while the full case study is still being shaped: one for evidence-backed data extraction, and one for the Booking Express NEXT deal homepage.
                      </p>
                    </div>
                    <div className="aurora-wip-artifact-grid">
                      {auroraCaseArtifacts.map((artifact, index) => (
                        <article className={`aurora-wip-artifact-card is-${artifact.kind}`} key={artifact.title}>
                          <button
                            className="aurora-wip-artifact-preview"
                            type="button"
                            onClick={() => setExpandedAuroraArtifact(index)}
                            aria-label={`Expand ${artifact.eyebrow} artifact`}
                          >
                            <span className="aurora-wip-browser-bar" aria-hidden="true">
                              <span />
                              <span />
                              <span />
                            </span>
                            <span className="aurora-wip-artifact-image-shell">
                              <img
                                src={getAssetPath(artifact.image)}
                                alt={artifact.alt}
                                width={artifact.width}
                                height={artifact.height}
                                loading="lazy"
                                decoding="async"
                              />
                            </span>
                          </button>
                          <div className="aurora-wip-artifact-copy">
                            <span>{artifact.label} / {artifact.eyebrow}</span>
                            <h3>{artifact.title}</h3>
                            <p>{artifact.body}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ) : null}
                <div className="case-wip-card case-wip-bridge-card">
                  <span className="case-wip-card-orb" aria-hidden="true" />
                  <div className="case-wip-copy">
                    <h3>{project.wipCardTitle ?? "WIP case study"}</h3>
                    <p>
                      {project.wipCardBody ?? "The full narrative, screens, and outcomes are still being refined."}
                    </p>
                  </div>
                  {hasPreviousProject ? (
                    <button
                      className="case-wip-bridge-link"
                      type="button"
                      onClick={() => handleProjectNavigation("prev", "wip_bridge")}
                      disabled={isProjectNavigating}
                      aria-label="Open the refined J.P. Morgan AI origination case study"
                    >
                      <span className="case-wip-bridge-kicker">Refined case study</span>
                      <strong>Continue to the AI origination platform</strong>
                      <span className="case-wip-bridge-copy">
                        See the complete zero-to-one JPMorgan story with the deeper product architecture, workflow, and impact.
                      </span>
                      <span className="case-wip-bridge-preview" aria-hidden="true">
                        <span className="case-wip-preview-grid" />
                        <span className="case-wip-preview-beam" />
                        <span className="case-wip-preview-header">
                          <span>Complete case</span>
                          <span>AI origination</span>
                        </span>
                        <span className="case-wip-preview-stage">
                          <span className="case-wip-preview-orbit" />
                          <span className="case-wip-preview-product">
                            <span className="case-wip-preview-product-top">
                              <span />
                              <span />
                              <span />
                            </span>
                            <span className="case-wip-preview-product-body">
                              <span className="case-wip-preview-product-list">
                                <span />
                                <span />
                                <span />
                              </span>
                              <span className="case-wip-preview-product-panel">
                                <span />
                                <span />
                              </span>
                            </span>
                          </span>
                          <span className="case-wip-preview-path">
                            <span />
                            <span />
                            <span />
                          </span>
                        </span>
                        <span className="case-wip-preview-metrics">
                          <span>35% fewer steps</span>
                          <span>50%+ faster prep</span>
                          <span>1,400+ profiles</span>
                        </span>
                      </span>
                      <span className="case-wip-bridge-cta">
                        Open refined case
                        <i aria-hidden="true">→</i>
                      </span>
                    </button>
                  ) : null}
                </div>
              </section>
            ) : null}

            <section className="case-study-section" id="case-overview" aria-labelledby={`${project.id}-overview`}>
              <CaseSectionHeader
                label="Product overview"
                title="A sponsor intelligence workspace for AI-native origination."
                id={`${project.id}-overview`}
              >
                One surface for sponsor context, generated ideas, and banker review.
              </CaseSectionHeader>
              <div className="case-enrichment-flow">
                <div className="case-enrichment-flow-copy">
                  <span>AI enrichment in use</span>
                  <h3>Select companies, run enrichment, and review sourced answers.</h3>
                  <p>
                    Users can choose companies from the screening table, run AI enrichment against public and company sources, then review generated answers with confidence and source context.
                  </p>
                </div>
                <div className="case-enrichment-video-shell" aria-label="AI enrichment flow product recording">
                  <video
                    ref={enrichmentFlowVideoRef}
                    className="case-enrichment-video"
                    src={getAssetPath("/jpmc-ai-enrichment-flow.mp4")}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Screen recording of the AI enrichment flow selecting companies, running enrichment, and reviewing generated answers."
                  />
                </div>
              </div>
              <div
                className="case-product-preview-stage"
                aria-label="Interactive sanitized sponsor workspace preview"
              >
                {productOverviewCards.map((card, index) => (
                  <img
                    className={`case-product-preview-image${index === activeProductPreviewIndex ? " is-active" : ""}`}
                    src={card.image}
                    sizes={jpmorganProductPreview.imageSizes}
                    alt={index === activeProductPreviewIndex ? card.imageAlt : ""}
                    aria-hidden={index === activeProductPreviewIndex ? undefined : "true"}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    style={{ objectPosition: card.focus, "--preview-scale": card.previewScale, "--preview-y": card.previewOffsetY ?? "0px" }}
                    onError={handleProjectImageError}
                  />
                ))}
                <div className="case-product-hit-zones">
                  <button
                    className="case-product-hit-zone case-product-hit-zone-left"
                    type="button"
                    tabIndex={-1}
                    onClick={goToPreviousProductPreview}
                    onPointerEnter={() => setDocumentCursorMode("arrow-left")}
                    onPointerLeave={clearDocumentCursorMode}
                    aria-label="Previous product view"
                  />
                  <button
                    className="case-product-hit-zone case-product-hit-zone-center"
                    type="button"
                    tabIndex={-1}
                    onClick={openProductPreviewLightbox}
                    onPointerEnter={() => setDocumentCursorMode("expand")}
                    onPointerLeave={clearDocumentCursorMode}
                    aria-label="Expand product view"
                  />
                  <button
                    className="case-product-hit-zone case-product-hit-zone-right"
                    type="button"
                    tabIndex={-1}
                    onClick={goToNextProductPreview}
                    onPointerEnter={() => setDocumentCursorMode("arrow-right")}
                    onPointerLeave={clearDocumentCursorMode}
                    aria-label="Next product view"
                  />
                </div>
                <div className="case-product-preview-fallback" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="case-product-callouts">
                  {productOverviewCards.map((card, index) => (
                    <button
                      className={`case-product-callout${index === activeProductPreviewIndex ? " is-active" : ""}`}
                      type="button"
                      key={card.title}
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveProductPreviewIndex(index);
                      }}
                    >
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="case-study-section case-why-section" id="case-value" aria-labelledby={`${project.id}-value`}>
              <CaseSectionHeader label="Product value + workflow snapshot" title="Turning fragmented signals into actionable deal ideas" id={`${project.id}-value`}>
                The work was not AI for novelty. It made complex judgment easier to reuse.
              </CaseSectionHeader>
              <div className="case-compare-shell" style={{ "--case-reveal": `${workflowRevealNumber}%` }}>
                <div
                  className={`case-compare-stage${workflowRevealNumber <= 0 ? " is-after-only" : ""}${
                    workflowRevealNumber >= 100 ? " is-before-only" : ""
                  }`}
                  aria-label="Before and after workflow comparison"
                >
                  <article className="case-compare-layer case-compare-before">
                    <div className="case-compare-content">
                      <p>Before</p>
                      <h3>Fragmented workflow</h3>
                      <div className="case-before-artifact">
                        <div className="case-before-native-artifact" aria-hidden="true">
                          {beforeWorkflowPanels.map((panel) => (
                            <section key={panel.title}>
                              <strong>{panel.title}</strong>
                              {panel.rows.map((row) => (
                                <span key={row}>{row}</span>
                              ))}
                            </section>
                          ))}
                          <em>Context gets lost.</em>
                        </div>
                      </div>
                    </div>
                  </article>
                  <article className="case-compare-layer case-compare-after">
                    <div className="case-compare-content">
                      <p>After</p>
                      <h3>Structured origination workflow</h3>
                      <div className="case-workflow-snapshot">
                        {workflowSnapshotSteps.map((step, index) => (
                          <span key={step}>
                            <em>{String(index + 1).padStart(2, "0")}</em>
                            {step}
                          </span>
                        ))}
                      </div>
                      <div className="case-ai-support-layer">
                        <strong>AI support layer</strong>
                        <div>
                          {aiSupportSteps.map((step) => (
                            <span key={step}>{step}</span>
                          ))}
                        </div>
                      </div>
                      <p className="case-human-review-note">Human review remains central.</p>
                    </div>
                  </article>
                  <span className="case-compare-divider" aria-hidden="true" />
                  <input
                    className="case-compare-range"
                    type="range"
                    min="0"
                    max="100"
                    value={workflowReveal}
                    onChange={(event) => setWorkflowReveal(event.target.value)}
                    aria-label="Drag to compare fragmented and structured workflow"
                  />
                </div>
              </div>
              <div className="case-problem-grid">
                {problemCards.map((card) => (
                  <article className="case-context-card" key={card.title}>
                    <span className="case-card-index" aria-hidden="true" />
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </article>
                ))}
              </div>
              <div className="case-value-chip-row">
                {valueChips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
            </section>

            <section className="case-study-section case-operating-section" id="case-operating" aria-labelledby={`${project.id}-operating`}>
              <CaseSectionHeader label="AI-native workflow" title="Compressing product intent into engineering-ready direction" id={`${project.id}-operating`}>
                I created a faster, governed workflow that turned product intent into AI-explored, Salt-aligned, reviewable prototypes, with file-backed
                platform rules and runtime behavior visible for PM, design, and engineering review.
              </CaseSectionHeader>
              <ExecutableDirectionConsole />
              <div className="case-ai-proof-bridge" aria-hidden="true">
                <span>same branch</span>
                <i />
                <span>different proof surface</span>
                <i />
                <span>one review system</span>
              </div>
              <div className="case-ai-proof-carousel" aria-label="AI prototype proof carousel">
                <button
                  className="case-ai-proof-carousel-stage"
                  type="button"
                  onClick={handleAiProofArtifactStageClick}
                  onPointerMove={handleArtifactPointerMove}
                  onPointerLeave={clearDocumentCursorMode}
                  aria-label={`Open ${activeAiProofArtifact.title}`}
                >
                  <img
                    src={activeAiProofArtifact.image}
                    alt={activeAiProofArtifact.title}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="case-ai-proof-carousel-count">
                    {String(activeAiProofArtifactIndex + 1).padStart(2, "0")} / {String(aiProofArtifacts.length).padStart(2, "0")}
                  </span>
                  <span className="case-ai-proof-carousel-caption">
                    <strong>{activeAiProofArtifact.title}</strong>
                    <em>{activeAiProofArtifact.caption}</em>
                  </span>
                </button>
                <div className="case-ai-proof-carousel-controls" aria-hidden="true">
                  <div>
                    {aiProofArtifacts.map((artifact, index) => (
                      <span className={index === activeAiProofArtifactIndex ? "is-active" : ""} key={artifact.title} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="case-study-section case-impact-section" id="case-impact" aria-labelledby={`${project.id}-impact`}>
              <CaseSectionHeader
                label="Impact + confidentiality"
                title="Creating value beyond the interface"
                id={`${project.id}-impact`}
              >
                The work shaped product direction, team alignment, workflow maturity, and AI-native collaboration.
              </CaseSectionHeader>
              <div className="case-impact-grid">
                {impactCards.map((card) => (
                  <article className="case-impact-card" key={card.title}>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </article>
                ))}
              </div>
              <blockquote className="case-closing-thought">
                AI in banking is not just about generation. It is about context, control, review, and trust.
              </blockquote>
              <aside className="case-confidentiality-card" aria-label="Confidentiality note">
                <span aria-hidden="true" />
                <div>
                  <h3>Confidentiality note</h3>
                  <p>
                    Selected workflows, data, and product screens have been recreated or sanitized for confidentiality. I can share more context on the
                    design decisions, collaboration model, and product impact in conversation.
                  </p>
                </div>
              </aside>
            </section>
          </div>
        </div>
        <div className="case-overlay-scrollbar" ref={scrollbarRef} onPointerDown={handleScrollbarPointerDown} aria-hidden="true">
          <span ref={scrollbarThumbRef} />
        </div>
        <nav
          ref={sectionNavRef}
          className={`case-section-nav${isIndexOpen ? " is-open" : ""}`}
          aria-label="Case study sections"
        >
          <div className="case-section-nav-main">
            <button
              className="case-section-nav-trigger"
              type="button"
              onClick={() => setIsIndexOpen((current) => !current)}
              aria-expanded={isIndexOpen}
            >
              <span className="case-section-nav-mark" aria-hidden="true">
                <img src={getAssetPath("/logo-mark-transparent.png?v=3")} alt="" />
              </span>
              <span className="case-section-nav-title" aria-hidden="true">
                <span className="case-section-nav-title-label" ref={sectionLabelRef}>
                  Hero
                </span>
              </span>
              <span className="sr-only">Case study sections</span>
              <span className="case-section-nav-chevron" aria-hidden="true" />
              <span className="case-section-nav-progress" ref={progressRef} aria-hidden="true" />
            </button>

            <div className="case-section-nav-menu">
              {caseSections.map((section) => (
                <button
                  className={`case-section-nav-item${section.id === "case-intro" ? " is-active" : ""}`}
                  type="button"
                  key={section.id}
                  data-section-id={section.id}
                  onClick={() => handleSectionSelect(section.id)}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {hasPreviousProject || hasNextProject ? (
            <div className="case-project-nav-controls" aria-label="Project navigation">
              {hasPreviousProject ? (
                <button className="case-project-nav-button" type="button" onClick={() => handleProjectNavigation("prev", "project_nav")} disabled={isProjectNavigating} aria-label="Previous project">
                  <ButtonShortcutContent label="Prev" shortcut={previousShortcutLabel} keyLabel={previousShortcutKey} shortcutPosition="before" isShortcutVisible={isShortcutMode} />
                </button>
              ) : null}
              {hasNextProject ? (
                <button className="case-project-nav-button" type="button" onClick={() => handleProjectNavigation("next", "project_nav")} disabled={isProjectNavigating} aria-label="Next project">
                  <ButtonShortcutContent label="Next" shortcut={nextShortcutLabel} keyLabel={nextShortcutKey} isShortcutVisible={isShortcutMode} />
                </button>
              ) : null}
            </div>
          ) : null}
        </nav>
      </section>
      {expandedImage ? (
        <div className="case-image-lightbox" role="dialog" aria-modal="true" aria-label={`${expandedImage.title} expanded image`}>
          <button
            className="case-image-lightbox-backdrop"
            type="button"
            onClick={() => {
              clearDocumentCursorMode();
              setExpandedImage(null);
            }}
            aria-label="Close expanded image"
          />
          <div className="case-image-lightbox-panel">
            <div className="case-image-lightbox-header">
              <div>
                <p>Product image</p>
                <h2>{expandedImage.title}</h2>
              </div>
              <button
                className="case-image-lightbox-close"
                type="button"
                onClick={() => {
                  clearDocumentCursorMode();
                  setExpandedImage(null);
                }}
              >
                Close
              </button>
            </div>
            <div className="case-image-lightbox-frame">
              <img
                src={expandedImage.image}
                sizes="min(1500px, 96vw)"
                alt={expandedImage.imageAlt}
                decoding="async"
              />
              {expandedImage.type === "product-overview" || expandedImage.type === "ai-artifact" ? (
                <div className="case-image-lightbox-hit-zones" aria-label="Expanded image navigation">
                  <button
                    className="case-image-lightbox-hit-zone case-image-lightbox-hit-zone-left"
                    type="button"
                    onClick={goToPreviousExpandedImage}
                    onPointerEnter={() => setDocumentCursorMode("arrow-left")}
                    onPointerLeave={clearDocumentCursorMode}
                    aria-label="Previous product image"
                  />
                  <button
                    className="case-image-lightbox-hit-zone case-image-lightbox-hit-zone-right"
                    type="button"
                    onClick={goToNextExpandedImage}
                    onPointerEnter={() => setDocumentCursorMode("arrow-right")}
                    onPointerLeave={clearDocumentCursorMode}
                    aria-label="Next product image"
                  />
                </div>
              ) : expandedImage.type === "deepcut-artifact" ? (
                <div className="case-image-lightbox-hit-zones" aria-label="Expanded image navigation">
                  <button
                    className="case-image-lightbox-hit-zone case-image-lightbox-hit-zone-left"
                    type="button"
                    onClick={goToPreviousExpandedImage}
                    onPointerEnter={() => setDocumentCursorMode("arrow-left")}
                    onPointerLeave={clearDocumentCursorMode}
                    aria-label="Previous DeepCut artifact"
                  />
                  <button
                    className="case-image-lightbox-hit-zone case-image-lightbox-hit-zone-right"
                    type="button"
                    onClick={goToNextExpandedImage}
                    onPointerEnter={() => setDocumentCursorMode("arrow-right")}
                    onPointerLeave={clearDocumentCursorMode}
                    aria-label="Next DeepCut artifact"
                  />
                </div>
              ) : expandedImage.type === "aurora-artifact" ? (
                <div className="case-image-lightbox-hit-zones" aria-label="Expanded image navigation">
                  <button
                    className="case-image-lightbox-hit-zone case-image-lightbox-hit-zone-left"
                    type="button"
                    onClick={goToPreviousExpandedImage}
                    onPointerEnter={() => setDocumentCursorMode("arrow-left")}
                    onPointerLeave={clearDocumentCursorMode}
                    aria-label="Previous Aurora artifact"
                  />
                  <button
                    className="case-image-lightbox-hit-zone case-image-lightbox-hit-zone-right"
                    type="button"
                    onClick={goToNextExpandedImage}
                    onPointerEnter={() => setDocumentCursorMode("arrow-right")}
                    onPointerLeave={clearDocumentCursorMode}
                    aria-label="Next Aurora artifact"
                  />
                </div>
              ) : null}
            </div>
            <p className="case-image-lightbox-caption">{expandedImage.caption}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
