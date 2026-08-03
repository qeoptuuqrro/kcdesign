import { useCallback, useEffect, useRef } from "react";

export default function PlatformScrollbar() {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const dragRef = useRef({ offsetY: 0 });
  const metricsRef = useRef({ maxScroll: 0, maxThumbOffset: 0, thumbHeight: 0 });
  const visibleRef = useRef(false);
  const hideAtRef = useRef(0);

  const reveal = useCallback((hideDelay = 980) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    if (!visibleRef.current) {
      track.classList.add("is-visible");
      visibleRef.current = true;
    }
    hideAtRef.current = performance.now() + hideDelay;
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const documentElement = document.documentElement;

    if (!track || !thumb) {
      return;
    }

    const maxScroll = documentElement.scrollHeight - window.innerHeight;
    const trackHeight = track.clientHeight;
    const proportionalHeight = maxScroll > 0 ? (window.innerHeight / documentElement.scrollHeight) * trackHeight : trackHeight;
    const thumbHeight = Math.min(trackHeight * 0.43, Math.max(36, proportionalHeight * 0.72));
    const maxThumbOffset = Math.max(0, trackHeight - thumbHeight);

    metricsRef.current = { maxScroll, maxThumbOffset, thumbHeight };
    thumb.style.height = `${thumbHeight.toFixed(2)}px`;
  }, []);

  const sync = useCallback((shouldReveal = false) => {
    const thumb = thumbRef.current;
    if (!thumb) {
      return;
    }

    if (shouldReveal) {
      reveal();
    }

    const { maxScroll, maxThumbOffset } = metricsRef.current;
    const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    thumb.style.transform = `translate3d(0, ${maxThumbOffset * progress}px, 0)`;
  }, [reveal]);

  const scrollToPointer = useCallback((clientY, offsetY) => {
    const track = trackRef.current;
    const thumb = thumbRef.current;

    if (!track || !thumb) {
      return;
    }

    const { maxScroll, maxThumbOffset } = metricsRef.current;
    if (maxScroll <= 0) {
      return;
    }

    const trackRect = track.getBoundingClientRect();
    const rawThumbOffset = clientY - trackRect.top - offsetY;
    const progress = Math.min(1, Math.max(0, rawThumbOffset / Math.max(1, maxThumbOffset)));

    window.scrollTo({ top: progress * maxScroll, behavior: "auto" });
    thumb.style.transform = `translate3d(0, ${maxThumbOffset * progress}px, 0)`;
  }, []);

  const handlePointerDown = useCallback((event) => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const trackElement = event.currentTarget;
    const thumbRect = thumb.getBoundingClientRect();
    const offsetY = event.target === thumb ? event.clientY - thumbRect.top : thumbRect.height / 2;
    dragRef.current.offsetY = offsetY;
    measure();

    track.classList.add("is-visible", "is-dragging");
    visibleRef.current = true;
    trackElement.setPointerCapture?.(event.pointerId);
    scrollToPointer(event.clientY, offsetY);

    const handlePointerMove = (moveEvent) => {
      moveEvent.preventDefault();
      scrollToPointer(moveEvent.clientY, dragRef.current.offsetY);
    };

    const handlePointerUp = (upEvent) => {
      upEvent.preventDefault();
      track.classList.remove("is-dragging");
      trackElement.releasePointerCapture?.(event.pointerId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      reveal(720);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", handlePointerUp, { passive: false, once: true });
  }, [measure, reveal, scrollToPointer]);

  useEffect(() => {
    let frameId = null;
    let measureFrameId = null;
    let lastScrollY = -1;

    const tick = (now) => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 0.5) {
        sync(true);
        lastScrollY = currentScrollY;
      } else if (visibleRef.current && hideAtRef.current > 0 && now >= hideAtRef.current) {
        trackRef.current?.classList.remove("is-visible");
        visibleRef.current = false;
        hideAtRef.current = 0;
      }

      frameId = window.requestAnimationFrame(tick);
    };

    const handleResize = () => {
      measure();
      sync(false);
    };

    const scheduleMeasure = () => {
      if (measureFrameId != null) {
        return;
      }

      measureFrameId = window.requestAnimationFrame(() => {
        measureFrameId = null;
        measure();
        sync(false);
      });
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleMeasure);

    measure();
    sync(true);
    frameId = window.requestAnimationFrame(tick);
    resizeObserver?.observe(document.documentElement);
    if (document.body) {
      resizeObserver?.observe(document.body);
    }
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
      if (frameId != null) {
        window.cancelAnimationFrame(frameId);
      }
      if (measureFrameId != null) {
        window.cancelAnimationFrame(measureFrameId);
      }
    };
  }, [measure, sync]);

  return (
    <div className="platform-scrollbar" ref={trackRef} onPointerDown={handlePointerDown} aria-hidden="true">
      <span ref={thumbRef} />
    </div>
  );
}
