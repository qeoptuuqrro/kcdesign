import { getAssetPath } from "./utils/paths";
import { featuredProjects } from "./content/projects";
import ProjectShowcase from "./features/project-showcase/ProjectShowcase";
import DesignSystemInspector from "./components/DesignSystemInspector";
import { useEffect, useRef, useState } from "react";
import FluidCursor from "./components/FluidCursor";
import AboutPage from "./components/AboutPage";
import HeroStatement from "./components/HeroStatement";
import Navbar from "./components/Navbar";
import ProjectCaseOverlay from "./components/ProjectCaseOverlay";
import PlatformScrollbar from "./components/PlatformScrollbar";
import SiteFooter from "./components/SiteFooter";
import { getAnalyticsEventName, setAnalyticsTag, trackEvent } from "./utils/analytics";

const menuItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "work", label: "Work", href: "#work" },
  { id: "about", label: "About", href: "#about" },
];

function getProjectUrl(project, view = "preview") {
  if (!project?.href?.startsWith("#")) {
    return null;
  }

  return `${project.href}-${view}`;
}

function updateProjectUrl(project, view = "preview") {
  const nextUrl = getProjectUrl(project, view);
  if (!nextUrl) {
    return;
  }

  window.history.pushState(null, "", nextUrl);
}

function resetProjectUrl() {
  window.history.pushState(null, "", window.location.pathname + window.location.search);
}

export default function App() {
  const [pageView, setPageView] = useState(() => (window.location.hash === "#about" ? "about" : "home"));
  const [activeMenuId, setActiveMenuId] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectView, setProjectView] = useState(null);
  const [isClosingProject, setIsClosingProject] = useState(false);
  const activeMenuIdRef = useRef("home");
  const pendingScrollTargetRef = useRef(null);

  const setSyncedActiveMenuId = (nextActiveMenuId) => {
    activeMenuIdRef.current = nextActiveMenuId;
    setActiveMenuId(nextActiveMenuId);
  };

  useEffect(() => {
    const syncActiveMenuFromHash = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      if (!menuItems.some((item) => item.id === hash)) {
        return;
      }

      setSyncedActiveMenuId(hash);
      setPageView(hash === "about" ? "about" : "home");

      if (hash !== "about") {
        window.requestAnimationFrame(() => {
          document.querySelector(`#${hash}`)?.scrollIntoView({
            behavior: "auto",
            block: "start",
            inline: "nearest",
          });
        });
        return;
      }

      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
    };

    syncActiveMenuFromHash();
    window.addEventListener("hashchange", syncActiveMenuFromHash);
    return () => window.removeEventListener("hashchange", syncActiveMenuFromHash);
  }, []);

  useEffect(() => {
    if (pageView !== "home" || projectView) {
      return undefined;
    }

    let frameId = 0;

    const syncActiveMenuFromScroll = () => {
      frameId = 0;

      const workSection = document.getElementById("work");
      if (!workSection) {
        return;
      }

      const activationLine = Math.min(160, window.innerHeight * 0.22);
      const workRect = workSection.getBoundingClientRect();
      const nextActiveMenuId = workRect.top <= activationLine && workRect.bottom > activationLine ? "work" : "home";

      if (activeMenuIdRef.current !== nextActiveMenuId) {
        setSyncedActiveMenuId(nextActiveMenuId);
      }
    };

    const requestSync = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(syncActiveMenuFromScroll);
    };

    requestSync();
    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, [pageView, projectView]);

  useEffect(() => {
    const pendingTarget = pendingScrollTargetRef.current;
    if (!pendingTarget || pageView === "about") {
      return;
    }

    pendingScrollTargetRef.current = null;
    window.requestAnimationFrame(() => {
      document.querySelector(pendingTarget)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    });
  }, [pageView]);

  useEffect(() => {
    document.body.style.overflow =
      projectView === "overlay" ||
      projectView === "expanding" ||
      projectView === "full" ||
      projectView === "shrinking"
        ? "hidden"
        : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [projectView]);

  useEffect(() => {
    const preloadImages = () => {
      const imageUrls = new Set([
        ...featuredProjects.flatMap((project) => [project.image, ...(project.imageSrcSet?.split(",").map((entry) => entry.trim().split(" ")[0]) ?? [])]),
        getAssetPath("/optimized/peak-rock-dashboard-1200.png"),
        getAssetPath("/optimized/peak-rock-dashboard-2200.png"),
      ].filter(Boolean));

      imageUrls.forEach((url) => {
        const image = new Image();
        image.decoding = "async";
        image.src = url;
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preloadImages, { timeout: 1600 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timerId = window.setTimeout(preloadImages, 600);
    return () => window.clearTimeout(timerId);
  }, []);

  const handleProjectSelect = (project) => {
    trackEvent(
      "project_card_click",
      {
        project_id: project.id,
        project_title: project.title,
        source: "project_showcase",
      },
      {
        clarityEventName: getAnalyticsEventName("project_card_click", project.id),
      }
    );
    setIsClosingProject(false);
    setSelectedProject(project);
    setProjectView("overlay");
    setSyncedActiveMenuId("work");
    updateProjectUrl(project);
    setAnalyticsTag("project_id", project.id);
    setAnalyticsTag("project_title", project.title);
    trackEvent(
      "project_open",
      {
        project_id: project.id,
        project_title: project.title,
        source: "project_showcase",
        view_mode: "preview",
      },
      {
        clarityEventName: getAnalyticsEventName("project_open", project.id),
        upgrade: "project case opened",
      }
    );
  };

  const handleBack = () => {
    if (!selectedProject || isClosingProject) {
      return;
    }

    trackEvent(
      "project_close",
      {
        project_id: selectedProject.id,
        project_title: selectedProject.title,
        view_mode: projectView,
      },
      {
        clarityEventName: getAnalyticsEventName("project_close", selectedProject.id, projectView),
      }
    );
    setIsClosingProject(true);
    window.setTimeout(() => {
      setSelectedProject(null);
      setProjectView(null);
      setSyncedActiveMenuId("home");
      setIsClosingProject(false);
      resetProjectUrl();
    }, 220);
  };

  const handleOpenFullProject = () => {
    if (projectView !== "overlay") {
      return;
    }

    setProjectView("expanding");
    updateProjectUrl(selectedProject, "full");
    trackEvent(
      "project_full_view_open",
      {
        project_id: selectedProject.id,
        project_title: selectedProject.title,
        view_mode: "full",
      },
      {
        clarityEventName: getAnalyticsEventName("project_full_view_open", selectedProject.id),
        upgrade: "case full view opened",
      }
    );
  };

  const handleOpenPreviewProject = () => {
    if (!selectedProject || projectView !== "full") {
      return;
    }
    setProjectView("shrinking");
    updateProjectUrl(selectedProject);
    trackEvent(
      "project_full_view_close",
      {
        project_id: selectedProject.id,
        project_title: selectedProject.title,
        view_mode: "preview",
      },
      {
        clarityEventName: getAnalyticsEventName("project_full_view_close", selectedProject.id),
      }
    );
  };

  const handleExpandComplete = () => {
    setProjectView((currentView) => (currentView === "expanding" ? "full" : currentView));
  };

  const handleShrinkComplete = () => {
    setProjectView((currentView) => (currentView === "shrinking" ? "overlay" : currentView));
  };

  const selectedProjectIndex = selectedProject
    ? featuredProjects.findIndex((project) => project.id === selectedProject.id)
    : -1;

  const handleNextProject = () => {
    if (selectedProjectIndex < 0 || selectedProjectIndex >= featuredProjects.length - 1) {
      return;
    }

    const nextProject = featuredProjects[selectedProjectIndex + 1];
    setSelectedProject(nextProject);
    updateProjectUrl(nextProject, projectView === "full" ? "full" : "preview");
    setAnalyticsTag("project_id", nextProject.id);
    setAnalyticsTag("project_title", nextProject.title);
    trackEvent(
      "project_next",
      {
        project_id: nextProject.id,
        project_title: nextProject.title,
        from_project_id: selectedProject.id,
        to_project_id: nextProject.id,
        direction: "next",
        view_mode: projectView === "full" ? "full" : "preview",
      },
      {
        clarityEventName: getAnalyticsEventName("project_next", selectedProject.id, nextProject.id),
      }
    );
  };

  const handlePreviousProject = () => {
    if (selectedProjectIndex <= 0) {
      return;
    }

    const previousProject = featuredProjects[selectedProjectIndex - 1];
    setSelectedProject(previousProject);
    updateProjectUrl(previousProject, projectView === "full" ? "full" : "preview");
    setAnalyticsTag("project_id", previousProject.id);
    setAnalyticsTag("project_title", previousProject.title);
    trackEvent(
      "project_previous",
      {
        project_id: previousProject.id,
        project_title: previousProject.title,
        from_project_id: selectedProject.id,
        to_project_id: previousProject.id,
        direction: "previous",
        view_mode: projectView === "full" ? "full" : "preview",
      },
      {
        clarityEventName: getAnalyticsEventName("project_previous", selectedProject.id, previousProject.id),
      }
    );
  };

  const handleMenuSelect = (id, href, event) => {
    setSyncedActiveMenuId(id);
    setPageView(id === "about" ? "about" : "home");
    trackEvent(
      "navigation_select",
      {
        navigation_id: id,
        navigation_href: href,
        source: "navbar",
      },
      {
        clarityEventName: getAnalyticsEventName("navigation_select", id),
      }
    );

    if (!href?.startsWith("#")) {
      return;
    }

    event?.preventDefault();
    window.history.pushState(null, "", href);

    if (id === "about") {
      pendingScrollTargetRef.current = null;
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      return;
    }

    pendingScrollTargetRef.current = href;
    window.requestAnimationFrame(() => {
      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      pendingScrollTargetRef.current = null;
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    });
  };

  const shellClassName = [
    "landing-shell",
    pageView === "about" ? "is-about-page" : "",
    pageView === "home" ? "is-home-page" : "",
    activeMenuId === "work" && pageView === "home" ? "is-work-active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={shellClassName} id="home">
      <div className="page-frame">
        <Navbar items={menuItems} activeId={activeMenuId} onSelect={handleMenuSelect} />
        {pageView === "about" ? (
          <div className="landing-view landing-view-about" key="about">
            <AboutPage onWorkSelect={(event) => handleMenuSelect("work", "#work", event)} />
          </div>
        ) : (
          <div className="landing-view landing-view-home" key="home">
            <HeroStatement onAboutSelect={(event) => handleMenuSelect("about", "#about", event)} />
            <ProjectShowcase onProjectSelect={handleProjectSelect} />
            <SiteFooter
              className="home-footer"
              centerHref="#about"
              centerLabel="about me"
              encourageCenter
              onCenterSelect={(event) => handleMenuSelect("about", "#about", event)}
            />
          </div>
        )}
      </div>
      {selectedProject &&
      (projectView === "overlay" || projectView === "expanding" || projectView === "full" || projectView === "shrinking") ? (
        <ProjectCaseOverlay
          project={selectedProject}
          onClose={handleBack}
          onOpenFull={handleOpenFullProject}
          onOpenPreview={handleOpenPreviewProject}
          isExpanding={projectView === "expanding"}
          isFull={projectView === "full"}
          isShrinking={projectView === "shrinking"}
          isClosing={isClosingProject}
          onExpandComplete={handleExpandComplete}
          onShrinkComplete={handleShrinkComplete}
          onNextProject={handleNextProject}
          onPreviousProject={handlePreviousProject}
          hasNextProject={selectedProjectIndex >= 0 && selectedProjectIndex < featuredProjects.length - 1}
          hasPreviousProject={selectedProjectIndex > 0}
        />
      ) : null}
      <DesignSystemInspector />
      <PlatformScrollbar />
      <FluidCursor />
    </div>
  );
}
