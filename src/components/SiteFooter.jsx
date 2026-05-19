import { useEffect, useRef, useState } from "react";

export default function SiteFooter({ className = "", centerHref = "#work", centerLabel = "selected work", onCenterSelect, encourageCenter = false }) {
  const centerLinkRef = useRef(null);
  const [isCenterHinting, setIsCenterHinting] = useState(false);

  useEffect(() => {
    if (!encourageCenter || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const centerLink = centerLinkRef.current;
    if (!centerLink) {
      return undefined;
    }

    let hintTimer = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setIsCenterHinting(true);
        if (hintTimer != null) {
          window.clearTimeout(hintTimer);
        }
        hintTimer = window.setTimeout(() => setIsCenterHinting(false), 2365);
      },
      { threshold: 0.72 }
    );

    observer.observe(centerLink);

    return () => {
      observer.disconnect();
      if (hintTimer != null) {
        window.clearTimeout(hintTimer);
      }
    };
  }, [encourageCenter]);

  return (
    <footer className={`site-footer${className ? ` ${className}` : ""}`} aria-label="Portfolio links">
      <a href="https://www.linkedin.com/in/kris-chen-4b4948224/" target="_blank" rel="noreferrer">
        linkedin
      </a>
      <div className="site-footer-center">
        <a
          className={isCenterHinting ? "is-about-hinting" : undefined}
          href={centerHref}
          onClick={(event) => onCenterSelect?.(event)}
          ref={centerLinkRef}
        >
          {centerLabel}
        </a>
        <span>built with curiosity about people, systems, and the world</span>
      </div>
      <a href="mailto:junhaochen718@gmail.com">email</a>
    </footer>
  );
}
