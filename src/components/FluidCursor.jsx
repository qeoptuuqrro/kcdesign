import { useEffect, useRef, useState } from "react";

const CURSOR_SELECTOR = 'a, button, input[type="submit"], [role="button"]';
const CURSOR_MODE_ATTR = "data-cursor-mode";
const EXPAND_CURSOR_MODE = "expand";
const ARROW_LEFT_CURSOR_MODE = "arrow-left";
const ARROW_RIGHT_CURSOR_MODE = "arrow-right";

function lerp(current, target, amount) {
  return current + (target - current) * amount;
}

export default function FluidCursor() {
  const cursorRef = useRef(null);
  const frameRef = useRef(null);
  const pointerRef = useRef({
    desiredX: 0,
    desiredY: 0,
    x: 0,
    y: 0,
    previousX: 0,
    previousY: 0,
    size: 24,
    targetSize: 24,
    stretch: 1,
    angle: 0,
    isCustomCursor: false,
  });
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabled = () => {
      setIsEnabled(finePointerQuery.matches && !reducedMotionQuery.matches);
    };

    updateEnabled();
    finePointerQuery.addEventListener("change", updateEnabled);
    reducedMotionQuery.addEventListener("change", updateEnabled);

    return () => {
      finePointerQuery.removeEventListener("change", updateEnabled);
      reducedMotionQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("has-fluid-cursor", isEnabled);
    return () => document.documentElement.classList.remove("has-fluid-cursor");
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const applyCursorState = (target) => {
      const clickableElement = target instanceof Element ? target.closest(CURSOR_SELECTOR) : null;
      const cursorMode = document.documentElement.getAttribute(CURSOR_MODE_ATTR);
      const isExpandable = cursorMode === EXPAND_CURSOR_MODE;
      const isArrowLeft = cursorMode === ARROW_LEFT_CURSOR_MODE;
      const isArrowRight = cursorMode === ARROW_RIGHT_CURSOR_MODE;
      const isCustomCursor = isExpandable || isArrowLeft || isArrowRight;
      const isClickable = Boolean(clickableElement || isCustomCursor);
      pointerRef.current.targetSize = isClickable ? 58 : 24;
      pointerRef.current.isCustomCursor = isCustomCursor;
      cursorRef.current?.classList.toggle("is-expand", isExpandable);
      cursorRef.current?.classList.toggle("is-arrow-left", isArrowLeft);
      cursorRef.current?.classList.toggle("is-arrow-right", isArrowRight);
    };

    const onPointerMove = (event) => {
      pointerRef.current.desiredX = event.clientX;
      pointerRef.current.desiredY = event.clientY;
      applyCursorState(document.elementFromPoint(event.clientX, event.clientY) ?? event.target);
      setIsHidden(false);
    };

    const onPointerLeave = () => {
      cursorRef.current?.classList.remove("is-expand", "is-arrow-left", "is-arrow-right");
      setIsHidden(true);
    };
    const onPointerEnter = () => setIsHidden(false);
    const onPointerOver = (event) => {
      applyCursorState(event.target);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("pointerenter", onPointerEnter);
    document.addEventListener("pointerover", onPointerOver);

    const animate = () => {
      const cursor = cursorRef.current;
      const pointer = pointerRef.current;

      pointer.x = lerp(pointer.x, pointer.desiredX, 0.18);
      pointer.y = lerp(pointer.y, pointer.desiredY, 0.18);
      const velocityX = pointer.x - pointer.previousX;
      const velocityY = pointer.y - pointer.previousY;
      const speed = Math.hypot(velocityX, velocityY);
      const targetStretch = 1 + Math.min(speed / 220, 0.18);
      const targetAngle = speed > 0.12 ? Math.atan2(velocityY, velocityX) : pointer.angle;
      const isCustomCursor = Boolean(pointer.isCustomCursor);

      pointer.size = lerp(pointer.size, pointer.targetSize, pointer.targetSize > pointer.size ? 0.24 : 0.18);
      pointer.stretch = lerp(pointer.stretch, isCustomCursor ? 1 : targetStretch, 0.18);
      pointer.angle = lerp(pointer.angle, isCustomCursor ? 0 : targetAngle, 0.16);

      if (cursor) {
        const scaleX = pointer.stretch;
        const scaleY = 1 / Math.sqrt(pointer.stretch);

        cursor.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%) rotate(${pointer.angle}rad) scale(${scaleX}, ${scaleY})`;
        cursor.style.width = `${pointer.size}px`;
        cursor.style.height = `${pointer.size}px`;
      }

      pointer.previousX = pointer.x;
      pointer.previousY = pointer.y;
      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("pointerenter", onPointerEnter);
      document.removeEventListener("pointerover", onPointerOver);
      document.documentElement.removeAttribute(CURSOR_MODE_ATTR);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`fluid-cursor${isHidden ? " is-hidden" : ""}`}
      aria-hidden="true"
    >
      <svg className="fluid-cursor-expand-icon" viewBox="0 0 18 18" focusable="false">
        <path d="M5.8 3.8H3.8v2" />
        <path d="M12.2 3.8h2v2" />
        <path d="M14.2 12.2v2h-2" />
        <path d="M3.8 12.2v2h2" />
        <path d="M7.15 7.15h3.7v3.7h-3.7z" />
      </svg>
      <svg className="fluid-cursor-arrow-icon fluid-cursor-arrow-left-icon" viewBox="0 0 18 18" focusable="false">
        <path d="M11.4 3.9 6.3 9l5.1 5.1" />
      </svg>
      <svg className="fluid-cursor-arrow-icon fluid-cursor-arrow-right-icon" viewBox="0 0 18 18" focusable="false">
        <path d="M6.6 3.9 11.7 9l-5.1 5.1" />
      </svg>
    </div>
  );
}
