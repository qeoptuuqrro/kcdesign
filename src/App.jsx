import { getAssetPath } from "./utils/paths";
import ProjectShowcase, { featuredProjects } from "./components/ProjectShowcase";
import DesignSystemInspector from "./components/DesignSystemInspector";
import { useEffect, useState } from "react";
import FluidCursor from "./components/FluidCursor";
import HeroStatement from "./components/HeroStatement";
import Navbar from "./components/Navbar";
import ProjectCaseOverlay from "./components/ProjectCaseOverlay";
import PlatformScrollbar from "./components/PlatformScrollbar";

const menuItems = [
  { id: "home", label: "Home", href: "#home" },
  { id: "work", label: "Work", href: "#work" },
  { id: "play", label: "Play", href: "#play" },
  { id: "about", label: "About", href: "#about" },
];

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
      ]);

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
  };

  const handleBack = () => {
    if (!selectedProject || isClosingProject) {
      return;
    }

    setIsClosingProject(true);
    window.setTimeout(() => {
      setSelectedProject(null);
      setProjectView(null);
      setActiveMenuId("home");
      setIsClosingProject(false);
    }, 220);
  };

  const handleOpenFullProject = () => {
    if (projectView !== "overlay") {
      return;
    }

    setProjectView("expanding");
  };

  const handleOpenPreviewProject = () => {
    if (!selectedProject || projectView !== "full") {
      return;
    }
    setProjectView("shrinking");
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

    setSelectedProject(featuredProjects[selectedProjectIndex + 1]);
  };

  const handlePreviousProject = () => {
    if (selectedProjectIndex <= 0) {
      return;
    }

    setSelectedProject(featuredProjects[selectedProjectIndex - 1]);
  };

  const handleMenuSelect = (id, href, event) => {
    setActiveMenuId(id);

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
