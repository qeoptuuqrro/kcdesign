import { useEffect, useRef, useState } from "react";

export default function RightMenu({ items, activeId, onSelect }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="right-menu" aria-label="Primary">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <a
              key={item.id}
              href={item.href}
              className={`menu-item${isActive ? " is-active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              onClick={(event) => onSelect(item.id, item.href, event)}
            >
              {isActive ? <span className="active-dot" aria-hidden="true" /> : null}
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      <nav className={`mobile-menu${isMobileMenuOpen ? " is-open" : ""}`} ref={menuRef} aria-label="Primary mobile">
        <button
          className="mobile-menu-trigger"
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="active-dot" aria-hidden="true" />
          <span>{activeItem.label}</span>
          <span className="mobile-menu-icon" aria-hidden="true" />
        </button>

        <div className="mobile-menu-panel">
          {items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <a
                key={item.id}
                href={item.href}
                className={`mobile-menu-item${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={(event) => {
                  setIsMobileMenuOpen(false);
                  onSelect(item.id, item.href, event);
                }}
              >
                <span>{item.label}</span>
                {isActive ? <span className="mobile-menu-current" aria-hidden="true" /> : null}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
