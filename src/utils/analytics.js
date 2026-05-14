const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID;
const analyticsOptOutKey = "portfolioAnalyticsOptOut";

let isInitialized = false;

const clarityTagKeys = [
  "project_id",
  "project_title",
  "section_id",
  "section_label",
  "navigation_id",
  "view_mode",
  "source",
  "direction",
];

function normalizeEventPart(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function getAnalyticsEventName(name, ...parts) {
  return [name, ...parts]
    .map(normalizeEventPart)
    .filter(Boolean)
    .join("_");
}

function getStoredAnalyticsOptOut() {
  try {
    return window.localStorage.getItem(analyticsOptOutKey) === "true";
  } catch {
    return false;
  }
}

function setStoredAnalyticsOptOut(isOptedOut) {
  try {
    if (isOptedOut) {
      window.localStorage.setItem(analyticsOptOutKey, "true");
      return;
    }

    window.localStorage.removeItem(analyticsOptOutKey);
  } catch {
    // Browsers can block storage in strict privacy modes.
  }
}

function applyAnalyticsQueryPreference() {
  const analyticsPreference = new URLSearchParams(window.location.search).get("analytics");

  if (analyticsPreference === "off") {
    setStoredAnalyticsOptOut(true);
    return true;
  }

  if (analyticsPreference === "on") {
    setStoredAnalyticsOptOut(false);
  }

  return getStoredAnalyticsOptOut();
}

function isLocalAnalyticsHost(hostname) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname.endsWith(".local")
  );
}

function shouldDisableAnalytics() {
  return (
    typeof window === "undefined" ||
    import.meta.env.DEV ||
    isLocalAnalyticsHost(window.location.hostname) ||
    navigator.doNotTrack === "1" ||
    applyAnalyticsQueryPreference()
  );
}

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
  if (isInitialized || shouldDisableAnalytics()) {
    return;
  }

  initializeGoogleAnalytics();
  initializeClarity();
  isInitialized = true;
}

export function trackEvent(name, params = {}, options = {}) {
  if (typeof window === "undefined") {
    return;
  }

  window.gtag?.("event", name, params);

  const clarityEventName = options.clarityEventName ?? name;
  const clarityEvents = new Set([name, clarityEventName].filter(Boolean));

  clarityEvents.forEach((eventName) => {
    window.clarity?.("event", eventName);
  });

  window.clarity?.("set", "last_event", clarityEventName);
  clarityTagKeys.forEach((key) => {
    const value = params[key];
    if (value != null) {
      window.clarity?.("set", `last_${key}`, String(value));
    }
  });

  if (options.upgrade) {
    window.clarity?.("upgrade", options.upgrade);
  }
}

export function setAnalyticsTag(key, value) {
  if (typeof window === "undefined" || value == null) {
    return;
  }

  window.clarity?.("set", key, String(value));
}
