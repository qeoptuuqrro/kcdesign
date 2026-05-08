# Prompt Refinement Examples

These examples show how to turn rough user prompts into stronger execution prompts.

## Example 1: "this page looks weird can you make it better"

### Interpretation

The user wants UI polish, but the target page and meaning of "better" may be unclear.

### Clarification

Ask if the target page is unclear. If the current page is obvious from context, proceed.

### Improved Execution Prompt

Improve the visual polish of the target page while preserving its existing structure and behavior. Inspect the current layout, identify the most visible issues in spacing, alignment, hierarchy, typography, and responsive behavior, then make focused CSS/component changes using existing design tokens and patterns. Validate with a build and, if possible, a browser check.

## Example 2: "fix the api it returns html not json"

### Interpretation

The user reports an API bug where a route likely falls through to an HTML response or error page.

### Clarification

Ask for the endpoint only if it is not clear from context or logs.

### Improved Execution Prompt

Find the API endpoint that should return JSON but currently returns HTML. Identify whether the issue is routing, error handling, middleware order, content negotiation, or a frontend fallback. Fix the root cause so the endpoint consistently returns the expected JSON response and status code. Preserve the existing API contract and add focused validation if the project has API tests.

## Example 3: "make this match figma more"

### Interpretation

The user wants visual alignment with a Figma design, but the exact differences may need inspection.

### Clarification

Ask for the Figma link, node, or screenshot if not already available.

### Improved Execution Prompt

Compare the target component against the provided Figma reference. Adjust spacing, typography, color, sizing, alignment, and states to improve visual fidelity while reusing existing design system tokens where possible. Avoid changing unrelated behavior. Validate the result against the reference at relevant desktop and mobile sizes.

## Example 4: "clean this code"

### Interpretation

The user wants a refactor, but the scope and acceptable behavior changes must be clear.

### Clarification

Ask what area to clean if the target is unclear. Do not change behavior unless asked.

### Improved Execution Prompt

Refactor the target code for readability and maintainability while preserving external behavior. Remove duplication, simplify control flow, improve naming where helpful, and keep the diff focused. Do not introduce new dependencies or change public APIs. Run the relevant build or tests after editing.

## Example 5: "add this feature but make it nice"

### Interpretation

The user wants a feature plus thoughtful UX.

### Clarification

Ask about expected behavior if the feature is underspecified.

### Improved Execution Prompt

Implement the requested feature using existing app patterns. Define the main user flow, expected states, and edge cases before editing. Use current components and design tokens for a polished experience. Include hover, focus, loading, empty, and error states where relevant. Validate the feature with targeted checks and preserve existing behavior.

## Example 6: "make it more modern"

### Interpretation

The user wants visual modernization, which must be translated into concrete design choices.

### Clarification

Ask what surface this applies to if unclear. If the target is obvious, proceed with conservative polish.

### Improved Execution Prompt

Modernize the target UI by improving hierarchy, spacing, typography, interaction feedback, and visual consistency while preserving the product's existing identity. Use the current design system where available. Avoid decorative changes that do not improve usability. Validate responsive behavior and make sure text remains readable.

## Example 7: "the spacing feels off"

### Interpretation

The user is noticing alignment or rhythm issues.

### Improved Execution Prompt

Audit the target section for spacing rhythm, alignment, and responsive behavior. Identify inconsistent gaps, padding, and content widths. Normalize spacing using existing layout tokens or nearby patterns. Ensure related content aligns as a group and that changes do not affect unrelated sections.

## Example 8: "this animation should feel more luxury"

### Interpretation

The user wants motion polish, not necessarily more movement.

### Improved Execution Prompt

Refine the target animation so it feels smoother, calmer, and more premium. Use subtle easing, slower timing where appropriate, and restrained movement. Preserve readability and avoid adding visual noise. Respect reduced-motion preferences if the project supports them.
