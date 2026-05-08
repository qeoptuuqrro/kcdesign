# Prompt Rewrite Template

Use this template to convert messy prompts into clear execution prompts.

## Original User Intent

Summarize what the user appears to want in plain language.

## Better Execution Prompt

Write a concise, actionable version of the request.

## Task

Define the primary task type:

- Bug fix
- Feature
- UI polish
- Refactor
- API work
- Documentation
- Design system alignment
- Architecture decision

## Context

Include relevant context:

- Target page, route, component, or file.
- Current behavior.
- Desired behavior.
- Existing patterns or source of truth.

## Requirements

List concrete requirements:

- Functional requirements.
- Content requirements.
- Interaction requirements.
- Responsive requirements.
- Accessibility requirements.

## Design / UX Expectations

Translate taste language into clear design direction:

- Visual hierarchy.
- Spacing and alignment.
- Typography.
- Color and opacity.
- Motion and interaction feel.
- States such as hover, active, loading, empty, and error.

## Engineering Expectations

Define how the work should be implemented:

- Reuse existing components and tokens.
- Keep changes scoped.
- Preserve existing behavior.
- Avoid unnecessary dependencies.
- Follow local code style.

## Constraints

List constraints:

- Files or areas to avoid changing.
- API contracts to preserve.
- Design system rules.
- Browser or device requirements.
- Performance limits.

## Assumptions

State reasonable assumptions when the user did not specify every detail.

Example:

- "Assume this applies only to the homepage overlay, not the full detail route."
- "Assume existing typography tokens should remain the source of truth."

## Validation Steps

Define how to verify the work:

- Run build.
- Run targeted tests.
- Check relevant route in browser.
- Compare against screenshot or Figma.
- Verify responsive behavior.
- Confirm no existing behavior was removed.
