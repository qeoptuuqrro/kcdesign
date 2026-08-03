import { getAssetPath } from "../utils/paths";

export default function InterfaceMuseumSection({ onEnterMuseum }) {
  return (
    <section className="interface-museum-section" id="play" aria-labelledby="interface-museum-title">
      <button
        className="project-showcase-card interface-museum-card interface-museum-trigger"
        type="button"
        onClick={onEnterMuseum}
        aria-label="Enter The Interface Museum"
      >
        <div className="interface-museum-home-copy">
          <p className="project-showcase-eyebrow">Play / featured artifact</p>
          <h2 className="project-showcase-title" id="interface-museum-title">
            The Interface Museum
          </h2>
          <p className="interface-museum-home-description">
            A curated gallery of fictional interface worlds exploring how mood, motion, and product taste change perception.
          </p>
          <div className="interface-museum-home-meta" aria-label="Museum exhibits">
            <span>Broker Terminal</span>
            <span>Tokyo Night Map</span>
            <span>Memory Browser</span>
          </div>
          <span className="interface-museum-home-cta">Enter museum</span>
        </div>

        <div className="project-showcase-media interface-museum-media">
          <video
            className="interface-museum-video"
            src={getAssetPath("/project-preview.mp4")}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="Interface Museum preview"
          />

          <div className="interface-museum-preview-plaque" aria-hidden="true">
            <span>Gallery entry</span>
            <strong>The Interface Museum</strong>
            <em>3 exhibits / coded worlds</em>
          </div>

          <div className="interface-museum-preview-index" aria-hidden="true">
            <span>01</span>
            <span>02</span>
            <span>03</span>
          </div>
        </div>
      </button>
    </section>
  );
}
