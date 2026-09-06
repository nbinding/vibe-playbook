---
title: 05 · Prototype
description: Prove the flow and the look on screen before you commit to a real build.
---

## What this step is for

Before you spend real effort on a database, auth, and a build pipeline, prove the idea looks and flows the way you think it does. A prototype here is disposable — one self-contained HTML file per key screen is often enough. The goal is to catch UX and design problems while they cost minutes to fix, not days.

**Builds on:** [`03-ux`](../03-ux/) and [`04-ui-design-system`](../04-ui-design-system/)

## Template

Copy this into `docs/05-prototype.md`.

```markdown
# 05 · Prototype

## Scope
Which screens/flows from the UX doc are being prototyped? (Usually the core
flow, not every screen.)

## Format
- [ ] Static HTML/CSS/JS files (one per screen, fastest to generate and view)
- [ ] Clickable Figma/design-tool mockup
- [ ] Throwaway code prototype (e.g. a single-page app with fake data)

## What you're trying to validate
- Does the flow make sense end-to-end?
- Does the visual language from the design system actually work in practice?
- Anything specific you're unsure about (a tricky interaction, information
  density, a layout that might not fit real content)?

## Feedback log
Who looked at it, and what did they say?

| Reviewer | Feedback | Change made? |
|----------|----------|---------------|
| | | |

## Decisions coming out of this
- What changed in the UX or design system as a result of prototyping?
- What's now considered "settled" and safe to build for real?
```

## LLM prompt

Hand this to your AI tool along with your `03-ux.md` and `04-ui-design-system.md`.

```text
You are a front-end engineer building a throwaway prototype. Using the
attached UX doc and design system, generate a single self-contained HTML
file (inline CSS, inline JS, no build step, no external dependencies except
a CDN font if needed) for this screen: [name the screen].

Requirements:
- Follow the colours, type, spacing, and component styles from the design
  system as closely as possible.
- Implement the primary and secondary actions listed for this screen in the
  UX doc, even if they just show/hide fake state — it needs to feel
  clickable, not just be a static image.
- Include the empty/loading/error states called out in the UX doc if this
  screen has them, toggleable via a small dev-only control if that's the
  easiest way to demo them.
- Use realistic placeholder content, not lorem ipsum.

Output just the HTML file, ready to open directly in a browser.
```

Repeat with a different screen name for each screen in scope.
