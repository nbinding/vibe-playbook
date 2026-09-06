---
title: How to use this playbook
description: How the steps, templates, and LLM prompts fit together.
---

## The shape of each step

Every step in the sidebar follows the same pattern:

1. **What this step is for** — a short explanation of the thinking this step forces you to do, and why it matters before you move on.
2. **Template** — a blank, fill-in-the-blank markdown document. Copy it into a new file in your project's `/docs` folder (e.g. `docs/03-ux.md`).
3. **LLM prompt** — a prompt you hand to your AI coding tool (Claude, Codex, whatever you're using) alongside your **previous** step's filled-in document. It drafts this step for you, which you then edit rather than write from scratch.

Steps build on each other in order. The prompt for step `04-ui-design-system` expects step `03-ux` to already exist — that's what makes this a *chain* instead of a pile of unrelated worksheets.

## A minimal workflow

1. Create a new repo (or a `/docs` folder in an existing one) for your idea.
2. Work through the steps in order. For each one:
   - Paste the step's **LLM prompt** into your AI tool, attaching the previous step's document as context.
   - Read the draft it gives you. Cut what doesn't apply, fix what it got wrong, add what it missed. This is the part that actually matters — the AI drafts, you decide.
   - Save the result as the next numbered file in `/docs`.
3. When you reach `06-full-build`, start actually building — using your `/docs` folder as the spec you (and your AI agent) keep referring back to.
4. Keep iterating: it's normal to bounce back to `03-ux` or `04-ui-design-system` after a build step reveals something the design didn't account for. The step numbers are a default order, not a one-way door.

## How much detail is enough?

Match the effort to the size of the project:

- **A weekend idea?** A few sentences per section is fine. Steps like `07-testing` or `09-marketing` might be a single paragraph.
- **Something you intend to actually ship and maintain?** Spend real time on `01-problem-opportunity`, `06-full-build`, and `07-testing` — these are the steps that save you from expensive rewrites later.

None of these templates are contracts. They're checklists for the things people forget to think about when an AI can make code appear in seconds.

## Versioning

This playbook itself is versioned (currently **v1.1** — see the [Changelog](../changelog/)). The templates and prompts will keep improving as they get used. If you're following along in a forked or cloned copy, it's worth checking back for updates between projects.
