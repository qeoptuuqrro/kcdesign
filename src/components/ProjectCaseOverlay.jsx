import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getAssetPath } from "../utils/paths";

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
    previewScale: 0.9,
    previewOffsetY: "-8px",
  },
  {
    title: "AI-generated ideas",
    body: "Ranked ideas with rationale, fit, and next actions.",
    image: getAssetPath("/product-ai-generated-ideas.png"),
    imageAlt: "AI-generated ideas product surface.",
    caption: "A product view for generated deal ideas, rationale, fit, and review actions.",
    focus: "50% 50%",
    previewScale: 0.94,
    previewOffsetY: "-6px",
  },
  {
    title: "Relationship signals",
    body: "Interaction history and outreach context for banker review.",
    image: getAssetPath("/product-relationship-signals.png"),
    imageAlt: "Relationship signals product surface.",
    caption: "A relationship intelligence view connecting interaction history, wallet share, and outreach context for banker review.",
    focus: "50% 50%",
    previewScale: 0.92,
    previewOffsetY: "-24px",
  },
];

const jpmorganProductPreview = {
  image: getAssetPath("/optimized/peak-rock-dashboard-1200.png"),
  imageSrcSet: `${getAssetPath('/optimized/peak-rock-dashboard-1200.png')} ${getAssetPath('/optimized/peak-rock-dashboard-2200.png')}`,
  imageSizes: "(max-width: 760px) calc(100vw - 40px), 970px",
  imageAlt: "Sanitized sponsor intelligence workspace.",
};

const beforeSignals = ["Scattered company data", "Sponsor notes", "Banker feedback", "Excel", "Decks", "Emails", "Relationship history", "One-off rationale"];

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
    title: "AI features tearsheet prototype",
    caption: "Vibe-coded an AI feature concept from product intent into a reviewable prototype, compressing early exploration time.",
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
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const [activeProductPreviewIndex, setActiveProductPreviewIndex] = useState(0);
  const [activeAiOperatingArtifactIndex, setActiveAiOperatingArtifactIndex] = useState(0);
  const [activeAiProofArtifactIndex, setActiveAiProofArtifactIndex] = useState(0);
  const [workflowReveal, setWorkflowReveal] = useState(50);
  const [aiWorkflowReveal, setAiWorkflowReveal] = useState(50);
  const isFullControlActive = isFull || isExpanding;
  const projectDetail = project.detail ?? defaultProjectDetail;
  const isCaseWip = Boolean(project.isWip);
  const activeAiOperatingArtifact = aiOperatingArtifacts[activeAiOperatingArtifactIndex];
  const activeAiProofArtifact = aiProofArtifacts[activeAiProofArtifactIndex];
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
    () =>
      isCaseWip
        ? [
            { id: "case-intro", label: "Hero" },
            { id: "case-wip", label: "WIP" },
          ]
        : [
            { id: "case-intro", label: "Hero" },
            { id: "case-overview", label: "Overview" },
            { id: "case-operating", label: "AI model" },
            { id: "case-value", label: "Value" },
            { id: "case-impact", label: "Impact" },
          ],
    [isCaseWip]
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
  }, [caseSections, syncMenuActiveItem]);

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
    if (!isExpanding && !isShrinking) {
      return undefined;
    }

    const fallbackTimer = window.setTimeout(() => {
      if (isExpanding) {
        expandCompleteRef.current?.();
        return;
      }
      shrinkCompleteRef.current?.();
    }, 280);

    return () => window.clearTimeout(fallbackTimer);
  }, [isExpanding, isShrinking]);

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
      frameId = requestAnimationFrame(() => {
        isScrollTickingRef.current = false;
        processScrollPosition();
      });
    };

    const handleScroll = () => {
      latestScrollTopRef.current = scrollElement.scrollTop;
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
    setWorkflowReveal(38);
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
  }, [project.id, setActiveSection]);

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

  const goToPreviousExpandedImage = useCallback(() => {
    if (expandedImage?.type === "ai-artifact") {
      const fallbackIndex = expandedImage.source === "operating" ? activeAiOperatingArtifactIndex : activeAiProofArtifactIndex;
      setExpandedAiArtifact((expandedImage.artifactIndex ?? fallbackIndex) - 1, expandedImage.source);
      return;
    }

    if (expandedImage?.type === "product-overview") {
      setExpandedProductPreview((expandedImage.productIndex ?? activeProductPreviewIndex) - 1);
    }
  }, [activeAiOperatingArtifactIndex, activeAiProofArtifactIndex, activeProductPreviewIndex, expandedImage, setExpandedAiArtifact, setExpandedProductPreview]);

  const goToNextExpandedImage = useCallback(() => {
    if (expandedImage?.type === "ai-artifact") {
      const fallbackIndex = expandedImage.source === "operating" ? activeAiOperatingArtifactIndex : activeAiProofArtifactIndex;
      setExpandedAiArtifact((expandedImage.artifactIndex ?? fallbackIndex) + 1, expandedImage.source);
      return;
    }

    if (expandedImage?.type === "product-overview") {
      setExpandedProductPreview((expandedImage.productIndex ?? activeProductPreviewIndex) + 1);
    }
  }, [activeAiOperatingArtifactIndex, activeAiProofArtifactIndex, activeProductPreviewIndex, expandedImage, setExpandedAiArtifact, setExpandedProductPreview]);

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
    if (!expandedImage) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setExpandedImage(null);
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

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedImage, goToNextExpandedImage, goToPreviousExpandedImage]);

  const workflowRevealNumber = Number(workflowReveal);
  const aiWorkflowRevealNumber = Number(aiWorkflowReveal);

  return (
    <div
      className={`case-overlay${isExpanding ? " is-expanding" : ""}${isFull ? " is-full" : ""}${isShrinking ? " is-shrinking" : ""}${isCaseWip ? " is-wip-case" : ""}`}
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
            disabled={isExpanding || isShrinking}
          >
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </button>

          <div className={`case-overlay-actions${isFullControlActive ? " is-full-selected" : " is-preview-selected"}`}>
            <button
              className={`case-overlay-mode-pill case-overlay-mode-button${!isFullControlActive ? " is-active" : ""}`}
              type="button"
              onClick={isFull ? onOpenPreview : undefined}
              disabled={isExpanding || isShrinking || !isFull}
              aria-current={!isFullControlActive ? "page" : undefined}
            >
              Preview
            </button>
            <button
              className={`case-overlay-expand${isFullControlActive ? " is-active" : ""}`}
              type="button"
              onClick={isFull ? undefined : onOpenFull}
              disabled={isExpanding || isShrinking || isFull}
              aria-current={isFullControlActive ? "page" : undefined}
            >
              Full
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
                {heroHighlights.map((highlight) => (
                  <span key={highlight}>{highlight}</span>
                ))}
              </div>

              <div className={`project-detail-media project-showcase-media${project.showLockup === false ? " is-image-only" : ""}`}>
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
                  title="Wholesale Lending Ops case study"
                  id={`${project.id}-wip`}
                >
                  The hero and project context are live now while the deeper narrative is being finalized.
                </CaseSectionHeader>
                <div className="case-wip-card">
                  <span aria-hidden="true" />
                  <div>
                    <h3>WIP case study</h3>
                    <p>
                      The full narrative, screens, and outcomes are still being refined.
                    </p>
                  </div>
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
                      <div className="case-signal-cloud">
                        {beforeSignals.map((signal) => (
                          <span key={signal}>{signal}</span>
                        ))}
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
                I created a faster, governed workflow that turned product intent into AI-explored, Salt-aligned, reviewable prototypes — giving AI project
                memory, quality guardrails, and a shared review model for PM, design, and engineering.
              </CaseSectionHeader>
              <div className="case-ai-method-hero">
                <div className="case-ai-method-copy">
                  <p className="case-operating-card-eyebrow">Operating model</p>
                  <h3>Making AI reliable for enterprise product design.</h3>
                  <strong className="case-ai-selling-line">
                    The value was not just faster prototyping. It was a faster, governed path from product intent to engineering-ready direction.
                  </strong>
                  <div className="case-ai-method-metrics" aria-label="AI-native workflow evidence">
                    {aiMethodHeroMetrics.map((metric) => (
                      <span key={metric.label}>
                        <strong>{metric.value}</strong>
                        {metric.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="case-ai-method-artifacts" aria-label="AI workflow artifact preview">
                  <button
                    className="case-ai-method-artifact-feature"
                    type="button"
                    onClick={handleAiOperatingArtifactStageClick}
                    onPointerMove={handleArtifactPointerMove}
                    onPointerEnter={handleArtifactPointerMove}
                    onPointerLeave={clearDocumentCursorMode}
                    onFocus={() => setDocumentCursorMode("expand")}
                    onBlur={clearDocumentCursorMode}
                    aria-label={`Open ${activeAiOperatingArtifact.title}`}
                  >
                    <img src={activeAiOperatingArtifact.image} alt={activeAiOperatingArtifact.title} onError={handleProjectImageError} />
                    <span className="case-ai-method-artifact-caption">
                      <strong>{activeAiOperatingArtifact.title}</strong>
                      <em>{activeAiOperatingArtifact.caption}</em>
                    </span>
                    <span className="case-ai-method-artifact-count">
                      {String(activeAiOperatingArtifactIndex + 1).padStart(2, "0")} / {String(aiOperatingArtifacts.length).padStart(2, "0")}
                    </span>
                  </button>
                  <div className="case-ai-method-artifact-controls" aria-label="Change AI workflow artifact">
                    <div>
                      {aiOperatingArtifacts.map((artifact, index) => (
                        <button
                          type="button"
                          key={artifact.title}
                          className={index === activeAiOperatingArtifactIndex ? "is-active" : ""}
                          onClick={() => setActiveAiOperatingArtifactIndex(index)}
                          aria-label={`Show ${artifact.title}`}
                          aria-current={index === activeAiOperatingArtifactIndex ? "true" : undefined}
                        >
                          <span>{artifact.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="case-ai-method-artifact-strip" aria-hidden="true">
                    {aiOperatingArtifacts.map((artifact, index) => (
                      <span key={artifact.title} className={index === activeAiOperatingArtifactIndex ? "is-active" : ""} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="case-ai-layer-heading">
                <p className="case-operating-card-eyebrow">Layer 01 · Transformation</p>
                <h3>From static handoff to AI-native product building.</h3>
              </div>
              <div className="case-ai-transformation" aria-label="Before and after AI-native workflow transformation">
                <article className="case-ai-transformation-card is-before">
                  <p className="case-operating-card-eyebrow">Before</p>
                  <h3>Static design handoff</h3>
                  <p>Design intent lived in Figma, then had to be interpreted, rebuilt, and re-checked across teams.</p>
                  <div>
                    <span>Translation loss</span>
                    <span>Rebuild work</span>
                    <span>Static review</span>
                  </div>
                </article>
                <div className="case-ai-transformation-bridge" aria-hidden="true">
                  <span>translation loss</span>
                  <strong>→</strong>
                  <span>governed speed</span>
                </div>
                <article className="case-ai-transformation-card is-after">
                  <p className="case-operating-card-eyebrow">After</p>
                  <h3>Executable product direction</h3>
                  <p>Product intent became a working prototype path: AI-explored, Salt-aligned, verified, branch-reviewed, and easier to evaluate.</p>
                  <div>
                    <span>Working prototype</span>
                    <span>Governed output</span>
                    <span>Shared review</span>
                    <span>Closer to engineering</span>
                  </div>
                </article>
              </div>

              <div className="case-ai-layer-heading">
                <p className="case-operating-card-eyebrow">Layer 02 · Operating loop</p>
                <h3>The workflow behind the workflow.</h3>
              </div>
              <div className="case-ai-operating-loop" aria-label="Repeatable AI-native product operating loop">
                <img
                  className="case-ai-loop-artifact"
                  src={getAssetPath("/figma-artifact-wide-a.png")}
                  alt=""
                  aria-hidden="true"
                  onError={handleProjectImageError}
                />
                <div className="case-ai-loop-orbit" aria-hidden="true" />
                {aiOperatingLoopSteps.map((step, index) => (
                  <span key={step} style={{ "--loop-index": index }}>
                    {step}
                  </span>
                ))}
                <strong>Engineering-ready direction</strong>
              </div>

              <div className="case-ai-layer-heading">
                <p className="case-operating-card-eyebrow">Layer 03 · Proof stack</p>
                <h3>The mechanisms that made AI output reliable and executable.</h3>
              </div>
              <div className="case-ai-proof-stack">
                <article className="case-ai-proof-card is-intake">
                  <div>
                    <p className="case-operating-card-eyebrow">01 · Accelerated exploration</p>
                    <h3>From product ask to prototype direction</h3>
                    <p>Used product tickets as input to understand scope, brainstorm directions, and move into prototype exploration quickly.</p>
                  </div>
                  <div className="case-ai-intake-flow" aria-label="Product intent intake to prototype direction">
                    <span>Jira / product intent</span>
                    <span>AI brainstorm</span>
                    <span>Flow options</span>
                    <strong>Prototype direction</strong>
                  </div>
                  <div className="case-operating-chip-cloud">
                    <span>Jira MCP</span>
                    <span>Product intent</span>
                    <span>Feature brainstorm</span>
                    <span>Prototype direction</span>
                  </div>
                </article>

                <article className="case-ai-proof-card is-memory">
                  <div>
                    <p className="case-operating-card-eyebrow">02 · AI project memory</p>
                    <h3>Copilot knew the project before generating UI</h3>
                    <p>Instructions and skills gave Copilot memory for components, ownership, interaction patterns, state rules, and verification.</p>
                  </div>
                  <div className="case-ai-proof-metric-row" aria-label="AI project memory metrics">
                    <span>18 AI knowledge files</span>
                    <span>3,165 instruction lines</span>
                    <span>5 domain skill files</span>
                    <span>12 design-system refs</span>
                  </div>
                  <div className="case-operating-file-tree is-compact" aria-label="AI knowledge file tree">
                    {operatingFileTree.map((line, index) => (
                      <code key={`${line}-${index}`}>{line}</code>
                    ))}
                  </div>
                  <div className="case-operating-hard-stop">
                    <strong>HARD STOP.</strong>
                    <span>Read skill files before generating code.</span>
                    <span>Do not rely on stale Salt, React, or CSS knowledge.</span>
                    <span>Run verification after writing code.</span>
                  </div>
                </article>

                <article className="case-ai-proof-card is-quality">
                  <div>
                    <p className="case-operating-card-eyebrow">03 · Governed design-system output</p>
                    <h3>Raw AI output became Salt-aligned UI</h3>
                    <p>Raw generated UI was translated into Salt tokens, reusable patterns, and design-system components.</p>
                  </div>
                  <div className="case-ai-token-translation" aria-label="Hardcoded CSS translated into enterprise design system tokens">
                    {aiMethodTokenRows.map(([raw, governed]) => (
                      <div key={raw}>
                        <code>{raw}</code>
                        <span />
                        <code>{governed}</code>
                      </div>
                    ))}
                  </div>
                  <div className="case-operating-chip-cloud">
                    {operatingQualityChips.map((chip) => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </div>
                </article>

                <article className="case-ai-proof-card is-handoff">
                  <div>
                    <p className="case-operating-card-eyebrow">04 · Delivery-ready handoff</p>
                    <h3>Prototype direction became reviewable work</h3>
                    <p>SDD-style specs, verification output, and branch reviews made prototype directions easier to compare and move toward engineering.</p>
                  </div>
                  <div className="case-ai-handoff-grid">
                    <div className="case-operating-market-flow is-compact" aria-label="Spec-ready handoff flow">
                      <span>Prototype direction</span>
                      <span>Design-focused spec</span>
                      <span>Jira-ready task breakdown</span>
                      <strong>Engineering review</strong>
                    </div>
                    <div className="case-operating-branch-map">
                      <strong>main / develop</strong>
                      {operatingBranchSteps.map((step) => (
                        <span key={step}>├── {step}</span>
                      ))}
                      <em>↓ PM + Design + Engineering review</em>
                      <b>shared prototype direction</b>
                    </div>
                    <div className="case-operating-terminal">
                      <strong>Salt verification</strong>
                      <span>3 violations → token fixes</span>
                      <code>Hardcoded font-size → var(--salt-text-*)</code>
                      <code>Hardcoded line-height → var(--salt-text-*)</code>
                      <b>passed · 0 violations</b>
                    </div>
                  </div>
                </article>
              </div>
              <div className="case-ai-proof-carousel" aria-label="AI workflow proof artifact showcase">
                <button
                  className="case-ai-proof-carousel-stage"
                  type="button"
                  onClick={handleAiProofArtifactStageClick}
                  onPointerMove={handleArtifactPointerMove}
                  onPointerEnter={handleArtifactPointerMove}
                  onPointerLeave={clearDocumentCursorMode}
                  onFocus={() => setDocumentCursorMode("expand")}
                  onBlur={clearDocumentCursorMode}
                  aria-label={`Open ${activeAiProofArtifact.title}`}
                >
                  <img src={activeAiProofArtifact.image} alt={activeAiProofArtifact.title} onError={handleProjectImageError} />
                  <span className="case-ai-proof-carousel-count">
                    {String(activeAiProofArtifactIndex + 1).padStart(2, "0")} / {String(aiProofArtifacts.length).padStart(2, "0")}
                  </span>
                  <span className="case-ai-proof-carousel-caption">
                    <strong>{activeAiProofArtifact.title}</strong>
                    <em>{activeAiProofArtifact.caption}</em>
                  </span>
                </button>
                <div className="case-ai-proof-carousel-controls" aria-label="Change proof artifact">
                  <div aria-hidden="true">
                    {aiProofArtifacts.map((artifact, index) => (
                      <span key={artifact.title} className={index === activeAiProofArtifactIndex ? "is-active" : ""} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="case-ai-layer-heading is-outcomes">
                <p className="case-operating-card-eyebrow">Layer 04 · Outcomes</p>
                <h3>Static handoff became executable product direction.</h3>
              </div>
              <div className="case-ai-outcome-grid" aria-label="AI-native operating model outcomes">
                {operatingOutcomeCards.map((outcome) => (
                  <article className="case-ai-outcome-card" key={outcome.value}>
                    <strong>{outcome.value}</strong>
                    <span>{outcome.note}</span>
                  </article>
                ))}
              </div>
              <p className="case-operating-closing-line">
                The value was not faster screen generation. It was turning product intent into a shared, executable artifact before engineering investment.
              </p>
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
              <span className="case-section-nav-mark" aria-hidden="true" />
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
                <button className="case-project-nav-button" type="button" onClick={onPreviousProject} aria-label="Previous project">
                  <span>Prev</span>
                </button>
              ) : null}
              {hasNextProject ? (
                <button className="case-project-nav-button" type="button" onClick={onNextProject} aria-label="Next project">
                  <span>Next</span>
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
              ) : null}
            </div>
            <p className="case-image-lightbox-caption">{expandedImage.caption}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
