import { useEffect, useState } from "react";

function getNewYorkTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/New_York",
  }).format(new Date());
}

export default function HeroStatement() {
  const [localTime, setLocalTime] = useState(getNewYorkTime);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLocalTime(getNewYorkTime());
    }, 30000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" aria-label="Hero">
      <div className="hero-identity">
        <h1 className="hero-name glow-text">
          KRIS CHEN <span className="hero-name-cjk">陳俊豪</span>
        </h1>

        <p className="hero-copy">
          <span className="hero-role-line" aria-label="Product Designer, AI Builder, Engineer, Building zero to one AI products">
            <span className="hero-role-line-row">
              <span className="hero-role-muted">Product</span>
              <span className="hero-role-word">Designer</span>
            </span>
            <span className="hero-role-line-row">
              <span className="hero-role-muted">AI</span>
              <span className="hero-role-word">Builder</span>
              <span className="hero-role-dot">•</span>
              <span className="hero-role-word">Engineer</span>
            </span>
            <span className="hero-role-line-row hero-role-line-row-wide">
              <span className="hero-role-muted">Building</span>
              <span className="hero-role-word">0→1 AI Products</span>
            </span>
          </span>
        </p>
      </div>

      <aside className="hero-details" aria-label="Experience credits">
        <div className="hero-facts-group">
          <p className="hero-fact">
            <span>CURRENT LOCATION: NEW YORK</span>
          </p>
          <p className="hero-fact">
            <span>LOCAL TIME: {localTime}</span>
          </p>
        </div>

        <div className="hero-facts-group">
          <p className="hero-fact hero-role">
            <span>PRODUCT DESIGNER @ J.P. MORGAN</span>
          </p>
          <p className="hero-fact hero-role">
            <span>PREVIOUS @ BANDWIDTH(B2B SAAS)</span>
          </p>
        </div>

        <a className="hero-learn-more" href="#about">
          Learn more
        </a>
      </aside>
    </section>
  );
}
