# Prompt Intake Workflow

Use this workflow whenever the user's request is messy, fast, ambiguous, or mixed with design thinking.

## Step 1: Interpret The Raw Request

Read the prompt as rough intent, not a final spec.

Identify:

- What outcome the user wants.
- What part of the product or codebase is likely involved.
- Whether the request is asking for implementation, advice, debugging, review, or design direction.
- Which details are firm requirements versus exploratory thoughts.

## Step 2: Identify Task Type

Classify the request into one or more task types:

- Bug fix
- Feature
- UI polish
- Refactor
- API work
- Documentation
- Design system alignment
- Architecture decision
- Content update
- Interaction or animation work
- Performance or accessibility improvement

Task type determines how much clarification, validation, and caution are needed.

## Step 3: Identify Missing Context

Look for missing information such as:

- Target file, page, route, component, or feature.
- Current behavior and expected behavior.
- Source of truth, such as Figma, screenshot, existing component, API docs, or design tokens.
- Responsive behavior.
- Data shape or API contract.
- Auth, permissions, persistence, or routing implications.
- Visual details such as spacing, typography, color, hierarchy, animation, and states.
- Validation method, such as tests, build, browser check, or visual comparison.

## Step 4: Decide Whether Clarification Is Needed

Ask clarification questions only if the missing context materially affects the implementation.

Ask if:

- Multiple reasonable implementations would lead to different user-facing outcomes.
- The request may affect architecture, data model, API contract, auth, routing, or design system patterns.
- The user references something that cannot be located or inferred.
- A visual request depends on a missing screenshot, Figma node, or target component.

Proceed with assumptions if:

- The ambiguity is small.
- The existing codebase clearly suggests the right pattern.
- The change is easy to reverse.
- Asking would slow down a simple, low-risk fix.

## Step 5: Rewrite The Prompt

Convert the raw request into a structured execution prompt with:

- Task
- Context
- Requirements
- Design and UX expectations
- Engineering expectations
- Constraints
- Assumptions
- Validation steps

For complex work, share the rewritten prompt or a concise version with the user before executing. For small work, use it internally.

## Step 6: Execute From The Rewritten Prompt

Use the rewritten prompt as the implementation guide.

While executing:

- Read the relevant code before editing.
- Reuse existing components, tokens, and patterns.
- Make minimal, safe changes.
- Preserve existing behavior unless the rewritten prompt says to change it.
- Validate with the narrowest useful check first, then broader checks if needed.
- Summarize the outcome clearly.
