import { useEffect, useMemo, useState } from "react";

const rooms = [
  {
    id: "broker",
    number: "01",
    title: "The Broker Terminal",
    year: "1987",
    summary: "A cold Wall Street terminal for live intelligence and market signals.",
    accent: "#9cf28a",
    accentSoft: "rgba(156, 242, 138, 0.12)",
    shellClass: "is-broker",
  },
  {
    id: "tokyo",
    number: "02",
    title: "Tokyo Night Map",
    year: "2031",
    summary: "A city discovery interface for food, transit, and hidden nightlife.",
    accent: "#ff73d8",
    accentSoft: "rgba(255, 115, 216, 0.12)",
    shellClass: "is-tokyo",
    locked: true,
  },
  {
    id: "memory",
    number: "03",
    title: "The Memory Browser",
    year: "2040",
    summary: "A personal archive where photos, notes, places, and songs become artifacts.",
    accent: "#f0d6b2",
    accentSoft: "rgba(240, 214, 178, 0.12)",
    shellClass: "is-memory",
    locked: true,
  },
  {
    id: "alpine",
    number: "04",
    title: "Alpine Command",
    year: "Coming soon",
    summary: "A snow, gear, and weather interface for mountain decisions.",
    accent: "#9ecaff",
    accentSoft: "rgba(158, 202, 255, 0.12)",
    shellClass: "is-alpine",
    locked: true,
  },
];

const brokerSignals = [
  {
    id: "merger-rumor",
    name: "MERGER RUMOR INDEX",
    confidence: 91,
    movement: "+12bps",
    entities: ["Hawthorne Group", "Northline Partners"],
    note: "Cross-checking late-night filings, sponsor appetite, and timing pressure.",
    chart: [36, 41, 44, 52, 58, 66, 73, 81],
  },
  {
    id: "retail-activity",
    name: "CONSUMER RETAIL ACTIVITY",
    confidence: 84,
    movement: "+7bps",
    entities: ["Metro Retail Co.", "Summit Value"],
    note: "Volume is steady; cross-references point to a widening buyer conversation.",
    chart: [48, 45, 47, 55, 61, 64, 69, 74],
  },
  {
    id: "credit-spread",
    name: "CREDIT SPREAD WATCH",
    confidence: 77,
    movement: "-4bps",
    entities: ["Westfield Credit", "Arden Capital"],
    note: "A small but persistent tighten pattern is showing in comparable deals.",
    chart: [66, 61, 58, 55, 52, 48, 44, 39],
  },
  {
    id: "private-buyer",
    name: "PRIVATE BUYER SIGNAL",
    confidence: 88,
    movement: "+9bps",
    entities: ["Private Growth Fund", "Crescent Holdings"],
    note: "The relationship signal is warm; sponsor overlap is becoming more obvious.",
    chart: [27, 33, 39, 46, 52, 63, 69, 78],
  },
  {
    id: "portfolio-alert",
    name: "PORTFOLIO OVERLAP ALERT",
    confidence: 93,
    movement: "+15bps",
    entities: ["Signal Atlas", "Mosaic Capital"],
    note: "High overlap with adjacent holdings and strong fit on recent activity.",
    chart: [31, 37, 46, 53, 61, 68, 79, 86],
  },
];

const tokyoVibes = [
  {
    id: "ramen",
    title: "Ramen after midnight",
    subtitle: "A quiet route for when the city is almost asleep.",
    note: "Warm broth, dim corners, and a last train home.",
    steps: ["Yurakucho alley", "Midnight ramen counter", "Last train platform"],
    transit: "JR line · 11 min",
    food: "tonkotsu + tea",
    points: [
      [16, 74],
      [38, 54],
      [68, 37],
      [84, 24],
    ],
  },
  {
    id: "jazz",
    title: "Tiny jazz bar",
    subtitle: "A late route built around sound, not distance.",
    note: "Small room, low light, and a set that starts after 11.",
    steps: ["Side street entrance", "Record shop stop", "Basement jazz room"],
    transit: "Metro line · 7 min",
    food: "sake + skewers",
    points: [
      [18, 28],
      [42, 44],
      [61, 60],
      [79, 53],
    ],
  },
  {
    id: "train",
    title: "Last train route",
    subtitle: "A clean route with one eye on the platform clock.",
    note: "The city narrows into one straight line at the end of the night.",
    steps: ["Transfer hall", "Platform edge", "Final train"],
    transit: "Yamanote line · 4 min",
    food: "coffee + convenience snack",
    points: [
      [12, 64],
      [34, 59],
      [58, 42],
      [86, 31],
    ],
  },
  {
    id: "alley",
    title: "Hidden alley dinner",
    subtitle: "A route found by turning one block too early.",
    note: "Anonymous signage, glowing windows, and a seat for two.",
    steps: ["Taxi drop", "Lantern alley", "Counter seat"],
    transit: "Walk · 6 min",
    food: "seasonal omakase",
    points: [
      [20, 67],
      [42, 46],
      [66, 50],
      [82, 62],
    ],
  },
  {
    id: "crawl",
    title: "Convenience crawl",
    subtitle: "A playful route for a city that is still open at 2 a.m.",
    note: "Warm drinks, cold air, and a very small perfect loop.",
    steps: ["Convenience store", "Arcade corner", "Quiet roof edge"],
    transit: "Walk · 9 min",
    food: "onigiri + iced coffee",
    points: [
      [13, 43],
      [31, 58],
      [57, 40],
      [84, 58],
    ],
  },
];

const memoryClusters = [
  {
    id: "apartment",
    title: "First apartment",
    date: "2040 / 03 / 14",
    location: "Queens, NY",
    song: "Cigarettes After Sex - Nothing's Gonna Hurt You Baby",
    note: "Boxes on the floor, one lamp, rain on the window.",
    related: ["A message I kept", "Snow day"],
    tone: "warm",
    x: "12%",
    y: "22%",
  },
  {
    id: "song",
    title: "A song from summer",
    date: "2040 / 07 / 02",
    location: "Brooklyn, NY",
    song: "Sufjan Stevens - Mystery of Love",
    note: "A track that made a whole walk feel like a scene.",
    related: ["Tokyo evening", "First apartment"],
    tone: "soft",
    x: "72%",
    y: "18%",
  },
  {
    id: "snow",
    title: "Snow day",
    date: "2040 / 01 / 22",
    location: "Upstate NY",
    song: "Explosions in the Sky - Your Hand in Mine",
    note: "Everything went quiet except the streetlight and the shoveling.",
    related: ["A message I kept", "First apartment"],
    tone: "cool",
    x: "18%",
    y: "72%",
  },
  {
    id: "tokyo",
    title: "Tokyo evening",
    date: "2039 / 11 / 09",
    location: "Shibuya, Tokyo",
    song: "BTS - Blue & Grey",
    note: "Neon rain, a convenience snack, and a long station walk.",
    related: ["A song from summer", "A message I kept"],
    tone: "violet",
    x: "77%",
    y: "72%",
  },
  {
    id: "message",
    title: "A message I kept",
    date: "2040 / 05 / 28",
    location: "Notebook / archive",
    song: "Bon Iver - Holocene",
    note: "One small text thread that turned into a map of the year.",
    related: ["First apartment", "Tokyo evening"],
    tone: "amber",
    x: "46%",
    y: "46%",
  },
];

const lockedRoom = {
  number: "04",
  title: "Alpine Command Center",
  year: "Coming soon",
  summary: "A snow, gear, and weather interface for mountain decisions.",
};

const initialTraceLines = ["Ready to run signal trace."];

function getExhibit(id) {
  return rooms.find((room) => room.id === id) ?? rooms[0];
}

function useTraceSequence(trigger, signal) {
  const [lines, setLines] = useState(initialTraceLines);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!trigger) {
      return undefined;
    }

    setLines([]);
    setIsRunning(true);

    const sequence = [
      `Scanning ${signal.name.toLowerCase()}...`,
      `Linking ${signal.entities[0]} + ${signal.entities[1]}...`,
      `Confidence ${signal.confidence}% · movement ${signal.movement}`,
      "TRACE COMPLETE · 3 SIGNALS LINKED",
    ];

    const timers = sequence.map((line, index) =>
      window.setTimeout(() => {
        setLines((current) => [...current, line]);
        if (index === sequence.length - 1) {
          setIsRunning(false);
        }
      }, 220 + index * 360),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [signal, trigger]);

  return { lines: lines.length ? lines : initialTraceLines, isRunning };
}

function MuseumNavigation({ activeView, onSelectView, onClose }) {
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <div className="museum-nav" aria-label="Museum navigation">
      <button
        className={`museum-nav-item${activeView === "gallery" ? " is-active" : ""}`}
        type="button"
        onClick={() => onSelectView("gallery")}
      >
        Gallery
      </button>
      {rooms.map((room) => (
        <button
          key={room.id}
          className={`museum-nav-item${activeView === room.id ? " is-active" : ""}${room.locked ? " is-locked" : ""}`}
          type="button"
          disabled={room.locked}
          onClick={() => onSelectView(room.id)}
        >
          {room.number}
        </button>
      ))}
      <button
        className={`museum-sound-toggle${soundEnabled ? " is-active" : ""}`}
        type="button"
        aria-pressed={soundEnabled}
        onClick={() => setSoundEnabled((current) => !current)}
      >
        Sound {soundEnabled ? "on" : "off"}
      </button>
      <button className="museum-nav-close" type="button" onClick={onClose}>
        Return to portfolio
      </button>
    </div>
  );
}

function BrokerPortalPreview() {
  return (
    <div className="artifact-preview-broker">
      <div className="artifact-terminal-ticker">
        <span>MRI 67.2</span>
        <span>EXEC +12.4</span>
        <span>LIVE FEED</span>
      </div>
      <div className="artifact-terminal-grid">
        {Array.from({ length: 18 }).map((_, index) => (
          <i key={index} style={{ "--terminal-delay": `${index * 52}ms` }} />
        ))}
      </div>
      <div className="artifact-terminal-chart">
        {[34, 52, 41, 63, 49, 58, 72, 88].map((height, index) => (
          <span key={index} style={{ "--bar-height": `${height}%`, "--terminal-delay": `${index * 70}ms` }} />
        ))}
      </div>
    </div>
  );
}

function TokyoPortalPreview() {
  return (
    <div className="artifact-preview-tokyo">
      <i />
      <i />
      <i />
      <span />
    </div>
  );
}

function MemoryPortalPreview() {
  return (
    <div className="artifact-preview-memory">
      <span />
      <span />
      <span />
      <i />
    </div>
  );
}

function AlpinePortalPreview() {
  return (
    <div className="artifact-preview-alpine">
      <span />
      <i />
      <i />
    </div>
  );
}

function MuseumArtifactPortal({ room, isActive, onEnter }) {
  return (
    <button
      className={`museum-artifact-portal museum-artifact-${room.id}${isActive ? " is-active" : ""}${room.locked ? " is-locked" : ""}`}
      type="button"
      onClick={room.locked ? undefined : onEnter}
      disabled={room.locked}
      aria-label={room.locked ? `${room.title} coming soon` : `Enter ${room.title}`}
    >
      <div className="museum-artifact-aura" aria-hidden="true" />
      <div className="museum-artifact-screen" aria-hidden="true">
        {room.id === "broker" ? <BrokerPortalPreview /> : null}
        {room.id === "tokyo" ? <TokyoPortalPreview /> : null}
        {room.id === "memory" ? <MemoryPortalPreview /> : null}
        {room.id === "alpine" ? <AlpinePortalPreview /> : null}
      </div>

      <div className="museum-artifact-plaque">
        <span>{room.number}</span>
        <strong>{room.title}</strong>
        <em>{room.year}</em>
        <em>{room.summary}</em>
        {room.locked ? <small>Locked room</small> : <small>Enter exhibit</small>}
      </div>
    </button>
  );
}

function MuseumLobby({ activeView, onSelectView }) {
  return (
    <div className="museum-lobby">
      <div className="museum-lobby-title">
        <span className="museum-lobby-mark" aria-hidden="true" />
        <p className="museum-kicker">The</p>
        <h2>Interface Museum</h2>
        <p>Living artifacts. Digital worlds.</p>
      </div>

      <div className="museum-artifact-stage" aria-label="Museum exhibits">
        {rooms.map((room) => (
          <MuseumArtifactPortal
            key={room.id}
            room={room}
            isActive={activeView === room.id}
            onEnter={() => onSelectView(room.id)}
          />
        ))}
      </div>

      <div className="museum-floor-reflection" aria-hidden="true" />
      <div className="museum-step-prompt" aria-hidden="true">
        <span>Step into the collection</span>
        <i />
      </div>
    </div>
  );
}

function RoomFrame({ room, children, onBackToGallery }) {
  return (
    <div className={`museum-room-shell ${room.shellClass}`}>
      <div className="museum-room-plaque">
        <span>Exhibit {room.number}</span>
        <strong>{room.title}</strong>
        <em>{room.year}</em>
      </div>

      <div className="museum-room-actions">
        <button className="museum-room-back" type="button" onClick={onBackToGallery}>
          Return to museum
        </button>
      </div>

      {children}
    </div>
  );
}

function BrokerTerminalExhibit({ onBackToGallery }) {
  const [selectedSignalId, setSelectedSignalId] = useState(brokerSignals[0].id);
  const [traceToken, setTraceToken] = useState(0);

  const selectedSignal = useMemo(
    () => brokerSignals.find((signal) => signal.id === selectedSignalId) ?? brokerSignals[0],
    [selectedSignalId],
  );
  const { lines, isRunning } = useTraceSequence(traceToken, selectedSignal);

  return (
    <RoomFrame room={getExhibit("broker")} onBackToGallery={onBackToGallery}>
      <div className="broker-terminal">
        <div className="broker-terminal-topline">
          <span>LIVE TAPE</span>
          <div className="broker-terminal-marquee" aria-hidden="true">
            <div>MERGER RUMOR INDEX / CREDIT SPREAD WATCH / PRIVATE BUYER SIGNAL / PORTFOLIO OVERLAP ALERT</div>
            <div>MERGER RUMOR INDEX / CREDIT SPREAD WATCH / PRIVATE BUYER SIGNAL / PORTFOLIO OVERLAP ALERT</div>
          </div>
        </div>

        <div className="broker-terminal-grid">
          <aside className="broker-signal-list" aria-label="Signal list">
            {brokerSignals.map((signal) => {
              const isActive = signal.id === selectedSignal.id;
              return (
                <button
                  key={signal.id}
                  className={`broker-signal-row${isActive ? " is-active" : ""}`}
                  type="button"
                  onClick={() => setSelectedSignalId(signal.id)}
                >
                  <span>{signal.name}</span>
                  <strong>{signal.confidence}%</strong>
                </button>
              );
            })}
          </aside>

          <section className="broker-signal-detail" aria-label="Selected signal">
            <div className="broker-signal-header">
              <p>Selected signal</p>
              <strong>{selectedSignal.name}</strong>
            </div>

            <div className="broker-signal-stats">
              <div>
                <span>Confidence</span>
                <strong>{selectedSignal.confidence}%</strong>
              </div>
              <div>
                <span>Movement</span>
                <strong>{selectedSignal.movement}</strong>
              </div>
            </div>

            <div className="broker-sparkline" aria-hidden="true">
              {selectedSignal.chart.map((point, index) => (
                <i key={index} style={{ "--spark-height": `${point}%`, "--spark-delay": `${index * 70}ms` }} />
              ))}
            </div>

            <div className="broker-signal-notes">
              <span>Related entities</span>
              <p>{selectedSignal.entities.join(" / ")}</p>
              <em>{selectedSignal.note}</em>
            </div>

            <button
              className="broker-trace-button"
              type="button"
              onClick={() => setTraceToken((current) => current + 1)}
              disabled={isRunning}
            >
              {isRunning ? "Tracing..." : "Run signal trace"}
            </button>

            <div className="broker-trace-console" aria-live="polite">
              {lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              {isRunning ? <span className="broker-trace-cursor" aria-hidden="true" /> : null}
            </div>
          </section>
        </div>
      </div>
    </RoomFrame>
  );
}

function TokyoNightMapExhibit({ onBackToGallery }) {
  const [selectedVibeId, setSelectedVibeId] = useState(tokyoVibes[1].id);
  const [hasGenerated, setHasGenerated] = useState(false);

  const selectedVibe = useMemo(
    () => tokyoVibes.find((vibe) => vibe.id === selectedVibeId) ?? tokyoVibes[0],
    [selectedVibeId],
  );

  useEffect(() => {
    setHasGenerated(false);
  }, [selectedVibeId]);

  const points = selectedVibe.points.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <RoomFrame room={getExhibit("tokyo")} onBackToGallery={onBackToGallery}>
      <div className="tokyo-night-map">
        <div className="tokyo-map-stage">
          <div className="tokyo-map-grid" aria-hidden="true">
            {Array.from({ length: 20 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>

          <svg className={`tokyo-map-route${hasGenerated ? " is-active" : ""}`} viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <linearGradient id="tokyo-route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff73d8" />
                <stop offset="52%" stopColor="#64d9ff" />
                <stop offset="100%" stopColor="#ffc77a" />
              </linearGradient>
            </defs>
            <polyline points={points} />
          </svg>

          {selectedVibe.points.map(([x, y], index) => (
            <span
              key={`${selectedVibe.id}-${index}`}
              className={`tokyo-marker${hasGenerated ? " is-active" : ""}`}
              style={{ left: `${x}%`, top: `${y}%`, "--marker-delay": `${index * 140}ms` }}
              aria-hidden="true"
            />
          ))}

          <div className="tokyo-map-legend">
            <span>Night routes</span>
            <strong>{selectedVibe.title}</strong>
          </div>
        </div>

        <div className="tokyo-route-panel">
          <div className="tokyo-vibe-selector" aria-label="Route vibes">
            {tokyoVibes.map((vibe) => {
              const isActive = vibe.id === selectedVibe.id;
              return (
                <button
                  key={vibe.id}
                  className={`tokyo-vibe-pill${isActive ? " is-active" : ""}`}
                  type="button"
                  onClick={() => setSelectedVibeId(vibe.id)}
                >
                  {vibe.title}
                </button>
              );
            })}
          </div>

          <div className="tokyo-route-card">
            <p>{selectedVibe.subtitle}</p>
            <strong>{selectedVibe.title}</strong>
            <em>{selectedVibe.note}</em>

            <div className="tokyo-route-meta">
              <span>{selectedVibe.transit}</span>
              <span>{selectedVibe.food}</span>
            </div>

            <button className="tokyo-route-button" type="button" onClick={() => setHasGenerated(true)}>
              Generate night route
            </button>
          </div>

          <div className={`tokyo-itinerary${hasGenerated ? " is-active" : ""}`}>
            {selectedVibe.steps.map((step, index) => (
              <div key={step} style={{ "--step-delay": `${index * 120}ms` }}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
            <p>
              {selectedVibe.title}
              <br />
              {selectedVibe.note}
            </p>
          </div>
        </div>
      </div>
    </RoomFrame>
  );
}

function MemoryBrowserExhibit({ onBackToGallery }) {
  const [selectedMemoryId, setSelectedMemoryId] = useState(memoryClusters[4].id);
  const [traceActive, setTraceActive] = useState(false);

  const selectedMemory = useMemo(
    () => memoryClusters.find((memory) => memory.id === selectedMemoryId) ?? memoryClusters[0],
    [selectedMemoryId],
  );

  useEffect(() => {
    setTraceActive(false);
  }, [selectedMemoryId]);

  const selectedIndex = memoryClusters.findIndex((memory) => memory.id === selectedMemory.id);

  return (
    <RoomFrame room={getExhibit("memory")} onBackToGallery={onBackToGallery}>
      <div className="memory-browser">
        <div className="memory-browser-timeline" aria-label="Memory cluster map">
          {memoryClusters.map((memory, index) => (
            <button
              key={memory.id}
              className={`memory-node${memory.id === selectedMemory.id ? " is-active" : ""}`}
              type="button"
              style={{ left: memory.x, top: memory.y, "--node-delay": `${index * 120}ms` }}
              onClick={() => setSelectedMemoryId(memory.id)}
            >
              <span />
            </button>
          ))}

          <svg className={`memory-links${traceActive ? " is-active" : ""}`} viewBox="0 0 100 100">
            <line x1="50" y1="50" x2="16" y2="22" />
            <line x1="50" y1="50" x2="77" y2="18" />
            <line x1="50" y1="50" x2="18" y2="74" />
            <line x1="50" y1="50" x2="77" y2="74" />
          </svg>

          <div className="memory-browser-detail">
            <p>Memory {String(selectedIndex + 1).padStart(2, "0")}</p>
            <strong>{selectedMemory.title}</strong>
            <span>{selectedMemory.date}</span>
            <em>{selectedMemory.location}</em>
            <blockquote>{selectedMemory.note}</blockquote>
            <div className="memory-browser-song">{selectedMemory.song}</div>
            <div className="memory-browser-related">
              {selectedMemory.related.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <button className="memory-trace-button" type="button" onClick={() => setTraceActive((current) => !current)}>
              Trace memory
            </button>
          </div>
        </div>

        <div className="memory-browser-archive" aria-label="Memory archive">
          {memoryClusters.map((memory) => {
            const isActive = memory.id === selectedMemory.id;
            return (
              <button
                key={memory.id}
                className={`memory-card${isActive ? " is-active" : ""}`}
                type="button"
                onClick={() => setSelectedMemoryId(memory.id)}
              >
                <p>{memory.date}</p>
                <strong>{memory.title}</strong>
                <span>{memory.location}</span>
              </button>
            );
          })}
        </div>
      </div>
    </RoomFrame>
  );
}

function AlpineComingSoon({ onBackToGallery }) {
  return (
    <RoomFrame room={getExhibit("alpine")} onBackToGallery={onBackToGallery}>
      <div className="alpine-coming-soon">
        <p>Locked room</p>
        <strong>Alpine Command Center</strong>
        <span>A snow, gear, and weather interface for mountain decisions.</span>
      </div>
    </RoomFrame>
  );
}

export default function InterfaceMuseumOverlay({ isOpen, isClosing, onClose }) {
  const [activeView, setActiveView] = useState("gallery");

  useEffect(() => {
    if (isOpen) {
      setActiveView("gallery");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (activeView === "gallery") {
          onClose();
        } else {
          setActiveView("gallery");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeView, isOpen, onClose]);

  const activeRoom = useMemo(() => rooms.find((room) => room.id === activeView), [activeView]);

  if (!isOpen && !isClosing) {
    return null;
  }

  return (
    <div className={`museum-overlay${isClosing ? " is-closing" : ""}${activeRoom ? ` ${activeRoom.shellClass}` : " is-gallery"}`}>
      <div className="museum-overlay-backdrop" onClick={onClose} />
      <section className="museum-overlay-panel">
        <header className="museum-overlay-header">
          <div className="museum-overlay-brand">
            <p>The Interface Museum</p>
            <strong>Gallery of fictional product worlds</strong>
          </div>
          <MuseumNavigation activeView={activeView} onSelectView={setActiveView} onClose={onClose} />
        </header>

        <div className="museum-overlay-body">
          {activeView === "gallery" ? (
            <MuseumLobby activeView={activeView} onSelectView={setActiveView} />
          ) : null}

          {activeView === "broker" ? <BrokerTerminalExhibit onBackToGallery={() => setActiveView("gallery")} /> : null}
          {activeView === "tokyo" ? <TokyoNightMapExhibit onBackToGallery={() => setActiveView("gallery")} /> : null}
          {activeView === "memory" ? <MemoryBrowserExhibit onBackToGallery={() => setActiveView("gallery")} /> : null}
          {activeView === "alpine" ? <AlpineComingSoon onBackToGallery={() => setActiveView("gallery")} /> : null}
        </div>
      </section>
    </div>
  );
}
