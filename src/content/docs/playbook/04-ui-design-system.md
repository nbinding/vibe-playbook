---
title: 04 · UI & Design System
description: Give the UX a visual language, so every screen you (or an AI) build afterward looks like it belongs to the same product.
---

## What this step is for

Without this, an AI coding agent will invent slightly different colors, spacing, and button styles every time you ask it to build a new screen. This step exists so you decide those things once, then point every future prompt at this document instead of re-deciding them each time.

**Builds on:** [`03-ux`](../03-ux/)

## Template

Copy this into `docs/04-ui-design-system.md`. Keep it short if the product is small — a color palette, a font, and a few component rules might be all you need.

```markdown
# 04 · UI & Design System

## Colour
- **Primary:** [hex] — brand, primary buttons, key highlights
- **Accent:** [hex] — links, icons, secondary emphasis
- **Background / Text / Border:** [hex values]
- **Status:** success / warning / error [hex values]
- Rule: minimum 4.5:1 contrast for text; don't rely on colour alone to convey meaning.

## Typography
- **Font family:** [choice], with a system-font fallback
- **Scale:** heading sizes (H1/H2/H3), body size, label/button size
- **Line height & weight:** body line height, and which weights are used where

## Spacing & layout
- **Base spacing unit:** (e.g. 8px grid)
- **Grid / max width:** how content is laid out at different screen sizes

## Core components
For each: default, hover/focus, disabled, and loading/error states if relevant.
- Buttons (primary, secondary, destructive)
- Inputs & form fields (including validation states)
- Cards / list items
- Navigation (tabs, nav bar, sidebar — whichever applies)

## Feedback patterns
- Loading, empty state, success, and error — how each is shown (inline text,
  toast/snackbar, modal, etc.)

## Accessibility baseline
- Tap targets ≥ 44px
- Keyboard reachable + visible focus states
- Text scales with system/browser font size settings

## Dark mode
Supported? If yes, note how tokens map (or don't) between light and dark.

## Notes / platform conventions
Anything specific to the platform you're targeting (iOS Human Interface
Guidelines, Material Design, web accessibility norms) worth calling out.
```

## LLM prompt

Hand this to your AI tool along with your `03-ux.md`.

```text
You are a senior product designer. Using the attached UX document, produce
a design system for this product, following this structure exactly:

1. Colour — primary, accent, background/text/border, and status colours,
   with a contrast rule.
2. Typography — font family + fallback, a type scale (H1-H3, body,
   label/button), line height, and weight usage.
3. Spacing & layout — base spacing unit and a grid/max-width approach.
4. Core components — buttons, inputs, cards, and navigation, each with
   default/hover/disabled/error states as relevant to this product.
5. Feedback patterns — how loading, empty, success, and error states are
   shown.
6. Accessibility baseline — tap target size, keyboard/focus behaviour,
   text scaling.
7. Dark mode — whether it's supported and how.
8. Platform notes — anything specific to the target platform(s).

Ground every choice in the product's tone and audience from the UX doc —
don't default to generic SaaS blue-and-white unless that actually fits.
Keep it concise: this should be short enough that someone builds screens by
referring back to it, not long enough that they'd rather guess.
```

## Tools for iterating on the look

Writing the design system as text is enough to keep an AI coding agent consistent, but it's often faster to actually *see* a few directions before locking one in. These let you iterate visually — on a real canvas, not just a text description — before committing to it in code:

- **[pen.dev](https://www.pen.dev)** — free (during early access) AI design canvas that lives inside Claude Code, Codex, Cursor, or VS Code. Design on an infinite canvas and it hands your coding agent a structured design file to generate pixel-accurate React/HTML/CSS from, instead of the agent guessing from a screenshot.
- **[OpenPencil](https://op.zseven.tech)** — open source (MIT), similar canvas-plus-AI-agent workflow, runs on your own model API key. Opens Figma `.fig` files natively and exports to React + Tailwind, HTML/CSS, Vue, Svelte, Flutter, SwiftUI, Jetpack Compose, or React Native.
- **Claude Design** — Anthropic's built-in design canvas (available as the `design` skill in Claude Code / Claude apps): describe the screens you want and get draggable, editable artboards you can refine by hand before handing them to a coding agent.
- **[Google Stitch](https://stitch.withgoogle.com)** — free Google Labs tool: describe a screen in plain language and get a full UI layout with a consistent design system applied, exportable to Figma or production HTML/CSS.

None of these replace the written design system above — treat them as a fast way to settle the "which direction looks right" question, then fold whatever you land on back into the document.
