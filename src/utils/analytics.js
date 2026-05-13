const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID;

let isInitialized = false;

function appendScript(src, attributes = {}) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;

  Object.entries(attributes).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });

  document.head.appendChild(script);
}

function initializeGoogleAnalytics() {
  if (!gaMeasurementId) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", gaMeasurementId, {
    page_path: window.location.pathname + window.location.search + window.location.hash,
  });

  appendScript(`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`);
}

function initializeClarity() {
  if (!clarityProjectId) {
    return;
  }

  window.clarity =
    window.clarity ||
    function clarity() {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };

  appendScript("https://www.clarity.ms/tag/" + clarityProjectId, {
    "data-clarity-project-id": clarityProjectId,
  });
}

export function initializeAnalytics() {
  if (isInitialized || typeof window === "undefined") {
    return;
  }

  initializeGoogleAnalytics();
  initializeClarity();
  isInitialized = true;
}

export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.gtag?.("event", name, params);
  window.clarity?.("event", name);
}
