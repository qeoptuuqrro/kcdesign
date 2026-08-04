# JPMorgan HD Media Restoration Design

Date: 2026-08-03
Status: Approved direction A

## Goal

Restore the earlier AI prototype media experience in the JPMorgan case study, improve the readability of the current product screenshots, and preserve all current case-study content.

The finished section should make the work feel inspectable rather than merely decorative: current interface screenshots remain fully visible, the AI prototype motion demo returns, the three earlier proof images can be browsed, and all relevant still images can be enlarged.

## Preservation Rules

- Keep the current dashboard image and all four current feature images.
- Keep the existing governed workflow console and all content that follows it.
- Keep the current dark case-study visual language and page structure.
- Do not crop away meaningful interface content.
- Do not replace the restored media with newly generated or approximate assets.

## Exact Media

### Current product overview media to retain

- `/jpmc-refresh/jpmc-dashboard.webp`
- `/jpmc-refresh/jpmc-calendar.webp`
- `/jpmc-refresh/jpmc-todos.webp`
- `/jpmc-refresh/jpmc-portcos.webp`
- `/jpmc-refresh/jpmc-announced-deals.webp`

### Earlier AI prototype media to restore

- Motion demo: `/jpmc-ai-enrichment-flow.mp4`
- Proof image 1: `/ai-features-tearsheet.png`
- Proof image 2: `/investor-crm-ai-prototype.png`
- Proof image 3: `/ai-enrichment-prototype.png`

The motion file is an MP4 rather than a GIF. It should be presented as a silent, looping, inline prototype demo so it behaves like the earlier GIF-style experience while retaining better image quality.

## Approved Sequence

### Product overview

The current dashboard and four feature screenshots remain in their existing order. Each image is rendered substantially larger inside its stage, using a stage ratio closer to the source image so the browser does not shrink the interface unnecessarily. Images remain full-frame and use the existing high-resolution WebP files.

Each product screenshot is also clickable to open the existing image lightbox. The lightbox uses the source asset at contain scale so viewers can inspect fine interface details without destructive cropping.

### AI-native workflow

Immediately after the `AI-native workflow` section heading:

1. Show the restored AI prototype motion demo in a full-width media stage.
2. Add a concise caption explaining that the demo represents early AI prototyping used to explore concepts before engineering investment.
3. Show the restored three-image proof gallery.
4. Continue into the existing governed workflow console and the rest of the current section unchanged.

The approved narrative is therefore:

`Section heading -> AI prototype demo -> early-concept caption -> three-image proof gallery -> governed workflow system`

## Gallery Interaction

The gallery reuses the existing `aiProofArtifacts` data, active-index state, and lightbox behavior.

- One proof image is shown prominently at a time.
- Visible Previous and Next controls cycle through all three images.
- A visible `01 / 03` counter and progress indicators show position.
- Clicking the main image opens it in the existing lightbox.
- The lightbox supports previous and next navigation across the same three assets.
- Controls use semantic buttons, keyboard focus states, and descriptive accessible labels.
- Touch targets are at least 44 by 44 CSS pixels.

The current cursor-zone interaction may remain as a secondary desktop enhancement, but it cannot be the only way to discover navigation or enlargement.

## Image Clarity

The source product images are already high resolution. The deployed page currently renders them at roughly 411 to 607 CSS pixels wide, which is the main cause of poor readability. The implementation should improve perceived sharpness by increasing their rendered footprint rather than applying artificial sharpening filters.

- Keep `object-fit: contain` and `image-rendering: auto`.
- Increase the product screenshot width and height allowance within each stage.
- Use source-aligned aspect ratios so vertical limits do not force excessive downscaling.
- Avoid blur, CSS filters, transforms, or low-resolution intermediary assets on the product screenshots.
- Preserve declared dimensions or aspect ratios to prevent layout shift.

## Motion And Performance

- Render the prototype as `<video>` with `muted`, `loop`, `playsInline`, and `autoPlay` for the GIF-like behavior.
- Use `preload="metadata"` and avoid loading duplicate video instances.
- Pause the video when the document is hidden or the section is far offscreen if the existing component structure allows this without broad refactoring.
- Respect `prefers-reduced-motion`: show a stable frame and provide playback controls instead of forcing continuous motion.
- Keep below-fold still images lazy-loaded and asynchronously decoded.
- If the video cannot load, leave the stage stable and show a concise fallback rather than collapsing the section.

## Responsive Behavior

Desktop and tablet layouts use the full available case-study width while preserving readable gutters. Mobile layouts stack the same sequence vertically without hiding media behind tabs or horizontal scrolling.

- Product screenshots remain full-frame on mobile and can be enlarged.
- Gallery controls remain visible below the stage.
- Captions wrap without overlapping controls.
- Video and image stages use stable aspect ratios.
- Fixed case-study navigation must not cover the gallery controls or captions.

## Architecture

The change stays inside the JPMorgan case-study ownership boundary.

- Update the existing JPMorgan media data and handlers in `src/components/ProjectCaseOverlay.jsx`.
- Reuse the current `aiProofArtifacts`, active index, lightbox state, and image error handler.
- Move the existing proof-gallery markup rather than duplicating it.
- Add only the small amount of state or helper logic needed for current-product-image enlargement and reduced-motion video behavior.
- Add feature-scoped CSS beside the existing JPMorgan and AI proof-gallery rules in `src/styles.css`.
- Do not introduce a new library, routing change, state-management layer, or broad component refactor.

## Error Handling

- Continue using `handleProjectImageError` for still images.
- Give the restored video a stable stage even when loading fails.
- Keep gallery navigation bounded through the existing normalized-index logic.
- Prevent missing media from resizing or shifting subsequent content.

## Validation

1. Run `npm run typecheck` and `npm run build`.
2. Inspect the JPMorgan overlay at desktop and mobile viewport sizes.
3. Confirm all five current overview images remain present and render larger than before.
4. Confirm the restored MP4 loops silently and remains inline.
5. Confirm Previous, Next, counter, indicators, image enlargement, lightbox navigation, close behavior, and keyboard focus.
6. Confirm reduced-motion behavior and mobile touch targets.
7. Confirm no horizontal overflow, media overlap, layout shift, missing assets, or console errors.

## Out Of Scope

- Replacing or regenerating the supplied JPMorgan screenshots.
- Redesigning the broader case study.
- Removing or rewriting the governed workflow content.
- Changing project navigation, routing, or analytics.
