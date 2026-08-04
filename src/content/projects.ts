export type ProjectDetail = {
  accentColor: string;
  accentGlow: string;
  company: string[];
  responsibility: string;
  timeline: string;
  role?: string;
  roleTeam: string;
};

export type FeaturedProject = {
  id: "jpmorgan-ai" | "jpmorgan-lobby" | "deepcut-ai-night-guide" | "evergreen-finance";
  eyebrow: string;
  title: string;
  bullets: string[];
  href: `#${string}`;
  image?: string;
  imageSrcSet?: string;
  imageSizes?: string;
  imageAlt?: string;
  brandLine?: string;
  subLinePrefix?: string;
  subLineSuffix?: string;
  showLockup?: boolean;
  isWip?: boolean;
  thumbnailVariant?: "jpmorgan-ai";
  customThumbnail?: "deepcut-night-guide" | "evergreen-rtp";
  highlights?: string[];
  detail?: ProjectDetail;
  wipTitle?: string;
  wipBody?: string;
  wipCardTitle?: string;
  wipCardBody?: string;
};

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
    imageSrcSet: "/optimized/jpmc-showcase-bg-1200.png 1200w, /optimized/jpmc-showcase-bg-1940.png 1940w, /jpmc-showcase-bg.png 6160w",
    imageSizes: "(max-width: 760px) calc(100vw - 40px), 970px",
    imageAlt: "JP Morgan AI origination platform thumbnail.",
    brandLine: "JP.Morgan.",
    subLinePrefix: "with",
    subLineSuffix: "AI",
    href: "#jpmorgan-ai",
    showLockup: true,
    thumbnailVariant: "jpmorgan-ai",
  },
  {
    id: "jpmorgan-lobby",
    eyebrow: "JP Morgan",
    title: "Designing human-in-the-loop AI workflows for complex deal setup and coordination.",
    bullets: [
      "Cut deal setup time by 40% through AI-assisted coordination.",
      "Accelerated handoffs by 45% with human-in-loop AI workflows.",
    ],
    image: "/optimized/jp-lobby-1200.png",
    imageSrcSet: "/optimized/jp-lobby-1200.png 1200w, /jp-lobby.png 1408w",
    imageSizes: "(max-width: 760px) calc(100vw - 40px), 970px",
    imageAlt: "JP Morgan lobby thumbnail.",
    brandLine: "JP.Morgan.",
    subLinePrefix: "with",
    subLineSuffix: "AI",
    href: "#jpmorgan-lobby",
    showLockup: false,
    isWip: true,
    wipTitle: "Aurora Booking Express NEXT case study",
    wipBody:
      "This case study is still being refined, but the current WIP view now includes two sanitized product artifacts from the Booking Express NEXT flow.",
    wipCardTitle: "Full Aurora narrative is still in progress",
    wipCardBody:
      "The deeper story, decision rationale, and outcomes are being shaped. For a complete JPMorgan case study today, continue to the refined AI origination platform.",
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
      "Designed an IMDb-style review layer for long-form YouTube and Bilibili, turning ratings, reviews, and best-start timestamps into a clear watch decision.",
      "Shaped the cross-device story across desktop browsing, mobile decision-making, and TV playback so the portfolio case study feels visual and easy to follow.",
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
        "An IMDb-style platform for finding, rating, saving, and watching long-form videos.",
      ],
      responsibility:
        "Designed the product narrative, cross-device interaction story, AI decision layer, review system, and visual case-study artifacts for a premium long-form video discovery platform.",
      timeline: "2026",
      role: "Product Designer",
      roleTeam: "Concept, interaction design, visual design, and responsive prototyping.",
    },
    wipTitle: "DeepCut long-form video review case study",
    wipBody:
      "The homepage thumbnail and project context are live now while the deeper product narrative is being shaped.",
    wipCardTitle: "AI Night Guide + source intelligence",
    wipCardBody:
      "The full story will expand on search, ratings, save flows, source scraping, and mobile-first discovery behavior.",
  },
  {
    id: "evergreen-finance",
    eyebrow: "Evergreen Finance",
    title: "Designing a real-time performance system that made daily goals visible, motivating, and actionable.",
    bullets: [
      "Created a responsive dashboard for 1,000+ agents, bringing goals, activity, and leaderboard context into one daily workspace.",
      "Raised agent satisfaction by 100% and efficiency by 36% within the first month of rollout to 400+ agents.",
    ],
    href: "#evergreen-finance",
    image: "/optimized/evergreen-rtp-source-2200.png",
    imageAlt: "Evergreen Finance real-time performance dashboard shown across desktop and mobile.",
    customThumbnail: "evergreen-rtp",
    showLockup: false,
    isWip: true,
  },
] satisfies FeaturedProject[];
