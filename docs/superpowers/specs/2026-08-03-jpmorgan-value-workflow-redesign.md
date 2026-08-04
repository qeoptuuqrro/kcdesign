# JPMorgan Value Workflow Redesign

## Goal

Make the product-value section immediately explain the TD origination problem, show the current workflow clearly, and compare the old and proposed workflows without clipped content or inconsistent padding.

## Selected Direction

Use a stable responsive narrative instead of an image-reveal slider:

1. Introduce the work context with four concise TD pressure points.
2. Trace the current workflow from a trigger through screening, sponsor research, thesis drafting, review, and ideabook packaging.
3. Compare the fragmented and structured workflows in two complete columns on wide screens and a vertical before-to-after sequence on narrow screens.
4. End with the AI support boundary and explicit banker decision ownership.

This direction was selected over two alternatives:

- Repairing the reveal slider would keep an interaction that inherently clips two different information structures.
- Using only static pain-point cards would improve context but would not make the workflow transformation easy to scan.

## Content

### TD pressure points

- Signals are scattered across CRM, spreadsheets, market data, notes, email, and decks.
- Sponsor fit must be reconstructed from fund strategy, portfolio context, relationship history, and timing.
- High-value rationale is difficult to find and reuse because it remains in one-off artifacts.
- Review handoffs repeatedly compress and rebuild context before an idea can move forward.

### Current flow

Market or relationship trigger -> company screening -> sponsor research -> thesis drafting -> team review -> ideabook packaging.

Friction labels call out context switching, manual joins, and repeated synthesis without adding unsupported quantitative claims.

### Before and after

The before side groups the current workflow into four repeatable jobs and names the tools or artifacts involved. The after side presents five structured workflow stages, a single AI support layer, and a clear human-review statement.

## Visual System

- Reuse the current case-study typography, spacing rhythm, border colors, surface treatments, and indigo signal accent.
- Use one full-width unframed context band followed by one comparison surface; avoid nested cards.
- Align all section content to the same inner padding token.
- Keep card radius at or below the existing case-study radius.
- Avoid decorative gradients beyond the restrained surface treatments already used in the case study.

## Responsive Behavior

- Wide: four pressure points in a single rail, horizontal current-flow trace, and two equal comparison columns.
- Medium: pressure points and flow wrap predictably; comparison remains readable without clipping.
- Narrow: pressure points become a two-column or one-column list, the current flow becomes vertical, and before/after stacks in reading order.
- No horizontal scrolling. All labels wrap and the fixed case navigation must not obscure the section's final content.

## Accessibility

- Use semantic headings, ordered lists for workflows, and text labels for every friction and ownership cue.
- Remove the transparent full-surface range input and its precision drag requirement.
- Preserve at least 44px touch targets for any remaining controls; this section is primarily informational.

## Verification

- Typecheck and production build.
- Desktop visual QA at 1280x720 or wider.
- Narrow overlay QA near the reported 739px viewport.
- Mobile QA at 390x844.
- Confirm no clipping, horizontal overflow, text overlap, or console errors.
