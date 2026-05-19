export default function SiteFooter({ className = "", centerHref = "#work", centerLabel = "selected work", onCenterSelect }) {
  return (
    <footer className={`site-footer${className ? ` ${className}` : ""}`} aria-label="Portfolio links">
      <a href="https://www.linkedin.com/in/kris-chen-4b4948224/" target="_blank" rel="noreferrer">
        linkedin
      </a>
      <div className="site-footer-center">
        <a href={centerHref} onClick={(event) => onCenterSelect?.(event)}>
          {centerLabel}
        </a>
        <span>built with curiosity about people, systems, and the world</span>
      </div>
      <a href="mailto:junhaochen718@gmail.com">email</a>
    </footer>
  );
}
