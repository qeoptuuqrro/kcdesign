# Clarification Rules

Ask questions when important details are unclear. Do not ask questions just to avoid making a reasonable decision.

## Ask Questions When

- The target file, page, component, or feature is unclear.
- The expected behavior is ambiguous.
- The request could affect architecture, data model, API contract, auth, routing, or design system patterns.
- The user asks vague things like "make it better", "fix this", "clean it up", "make it modern", or "match the screenshot".
- The user references a screenshot, Figma file, design, API, or component that is not available.
- The request has conflicting instructions.
- The change may remove or alter existing behavior.
- The implementation has a meaningful product tradeoff.

## Do Not Over-Ask

- Ask no more than 3 clarification questions at a time.
- Prefer one focused question when possible.
- Do not ask questions whose answers can be discovered from the codebase.
- Do not ask for confirmation on low-risk, reversible changes.
- Do not ask the user to restate obvious intent.

## Make Assumptions When

- The ambiguity is small.
- The existing codebase has a clear pattern.
- The request is visual polish and the direction is already established.
- The change is local, reversible, and low-risk.
- The user has asked for momentum or trusted judgment.

When making assumptions, state them briefly before or after the work.

## Good Clarification Questions

- "Which page should this apply to: the homepage overlay, the full case page, or both?"
- "Should this change preserve the current API response shape, or can the contract change?"
- "Should the new component use the existing design system tokens, or are we introducing a new visual style?"

## Poor Clarification Questions

- "What do you mean?"
- "Can you explain everything again?"
- "Should I do this?"
- "What file should I edit?" when the target can be found from the codebase.
