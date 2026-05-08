export default function LandingMedia() {
  return (
    <section className="landing-media-section" id="work" aria-label="Landing media">
      <div className="landing-media-frame">
        <video
          className="landing-media-video"
          src="/project-preview.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="Homepage motion preview"
        />
      </div>
    </section>
  );
}
