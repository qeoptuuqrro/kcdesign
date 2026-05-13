import { getAssetPath } from "./utils/paths";
import ProjectShowcase, { featuredProjects } from "./components/ProjectShowcase";
import DesignSystemInspector from "./components/DesignSystemInspector";
import { useEffect, useState } from "react";
import FluidCursor from "./components/FluidCursor";
import HeroStatement from "./components/HeroStatement";
import Navbar from "./components/Navbar";
import ProjectCaseOverlay from "./components/ProjectCaseOverlay";
import PlatformScrollbar from "./components/PlatformScrollbar";
import { setAnalyticsTag, trackEvent } from "./utils/analytics";

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
  const [activeMenuId, setActiveMenuId] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectView, setProjectView] = useState(null);
  const [isClosingProject, setIsClosingProject] = useState(false);

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
    setIsClosingProject(false);
    setSelectedProject(project);
    setProjectView("overlay");
    setActiveMenuId("work");
    updateProjectUrl(project);
    setAnalyticsTag("project_id", project.id);
    setAnalyticsTag("project_title", project.title);
    trackEvent("project_open", {
      project_id: project.id,
      project_title: project.title,
    });
  };

  const handleBack = () => {
    if (!selectedProject || isClosingProject) {
      return;
    }

    trackEvent("project_close", {
      project_id: selectedProject.id,
      project_title: selectedProject.title,
      project_view: projectView,
    });
    setIsClosingProject(true);
    window.setTimeout(() => {
      setSelectedProject(null);
      setProjectView(null);
      setActiveMenuId("home");
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
    trackEvent("project_full_view_open", {
      project_id: selectedProject.id,
      project_title: selectedProject.title,
    });
  };

  const handleOpenPreviewProject = () => {
    if (!selectedProject || projectView !== "full") {
      return;
    }
    setProjectView("shrinking");
    updateProjectUrl(selectedProject);
    trackEvent("project_full_view_close", {
      project_id: selectedProject.id,
      project_title: selectedProject.title,
    });
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
    trackEvent("project_next", {
      from_project_id: selectedProject.id,
      to_project_id: nextProject.id,
    });
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
    trackEvent("project_previous", {
      from_project_id: selectedProject.id,
      to_project_id: previousProject.id,
    });
  };

  const handleMenuSelect = (id, href, event) => {
    setActiveMenuId(id);
    trackEvent("navigation_select", {
      navigation_id: id,
      navigation_href: href,
    });

    if (!href?.startsWith("#")) {
      return;
    }

    event?.preventDefault();
    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <div className="landing-shell" id="home">
      <div className="page-frame">
        <Navbar items={menuItems} activeId={activeMenuId} onSelect={handleMenuSelect} />
        <HeroStatement />
        <ProjectShowcase onProjectSelect={handleProjectSelect} />
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
