# Execution Rules

Use these rules after the prompt has been interpreted, clarified if needed, and rewritten.

## General Rules

- Prefer minimal, safe changes.
- Reuse existing components and patterns.
- Do not rewrite large files unless necessary.
- Do not add new dependencies unless justified.
- Do not silently remove existing behavior.
- Preserve existing API contracts unless the user asks to change them.
- Keep implementation aligned with the rewritten prompt.
- Avoid unrelated cleanup.

## Local Development Source Of Truth

- Use `npm run dev` as the only local dev command for this project.
- Treat `http://127.0.0.1:5174/` as the canonical local preview URL.
- Do not run multiple Vite dev servers for this project at the same time.
- If a visual change appears stale or inconsistent, check for duplicate listeners on ports `5173` and `5174` before changing UI code.
- The `npm run dev` script intentionally stops older same-project listeners on ports `5173` and `5174` before starting the canonical server.

## UI Work

- Use existing design tokens and components when available.
- Preserve established visual language unless the user asks for a new direction.
- Make spacing, alignment, typography, color, and motion decisions explicit.
- Consider responsive behavior.
- Keep hover, focus, active, disabled, loading, and empty states consistent with nearby UI.
- Avoid one-off styling when a reusable token or component already exists.

## Design System Alignment

- Treat tokens as the source of truth when available.
- Add new tokens only when a repeated design need exists.
- Name components and tokens clearly.
- Update design system documentation or visual references when the system changes.
- Do not duplicate an existing component under a new name without a reason.
- For overlay controls such as the case-study preview nav, preserve the established dock contract. The nav belongs to the overlay panel and is positioned with named dock tokens; do not re-position it from live content measurements or project-specific content changes.

## Bug Fixes

- Identify the likely root cause first.
- Reproduce or inspect the broken behavior when possible.
- Fix the root cause instead of hiding the symptom.
- Add or update a focused test when the codebase has a natural test pattern.
- Verify the specific bug is fixed.

## Refactors

- Preserve external behavior.
- Keep the diff focused.
- Improve readability, reuse, or correctness.
- Avoid combining refactors with unrelated feature changes.
- Validate that existing behavior still works.

## API Work

- Preserve response shape and status codes unless the user asks to change them.
- Handle errors explicitly.
- Avoid leaking internal implementation details.
- Consider auth, permissions, validation, and backwards compatibility.
- Update callers or docs when contracts change.

## Documentation

- Be direct and practical.
- Prefer concrete examples over abstract explanation.
- Keep docs close to the behavior they describe.
- Update docs when behavior, commands, tokens, or architecture change.
