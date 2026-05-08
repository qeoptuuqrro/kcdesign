# Prompt Refinement Instructions

These instructions help Codex turn rough user prompts into clear execution work.

## Core Principle

Do not treat the user's raw prompt as the final instruction. Treat it as rough intent. First interpret, clarify if needed, rewrite into a better execution prompt, then execute.

## Required Workflow

1. Interpret the user's intent before touching code.
2. Identify the task type and likely target area.
3. Identify missing or risky context.
4. Ask clarification questions only when the missing information changes the correct implementation.
5. Rewrite the request into a cleaner execution prompt.
6. Execute from the rewritten prompt, while preserving the user's original goal.

## Supporting Files

- `prompt-intake.md`: Full intake workflow.
- `clarification-rules.md`: When to ask questions and when to proceed.
- `prompt-rewrite-template.md`: Reusable structure for refined prompts.
- `execution-rules.md`: Rules for coding after the prompt is refined.
- `examples.md`: Messy prompt examples and improved execution prompts.

## Operating Rules

- Keep the user moving forward.
- Do not over-ask.
- If the ambiguity is small, state a reasonable assumption and continue.
- If the ambiguity affects architecture, behavior, data, routing, auth, or the design system, pause and clarify.
- For design requests, translate vague taste language into concrete UI decisions before implementing.
- For bug reports, identify the likely root cause before editing.
- For refactors, preserve external behavior unless the user explicitly asks for behavior changes.

## Expected Response Shape

When useful, briefly tell the user:

- What you understood.
- Any assumption you are making.
- The improved execution prompt you will follow, if the task is complex.
- What you changed and how it was validated.

Do not show a rewritten prompt for every tiny request. Use judgment. The purpose is better execution, not extra ceremony.
