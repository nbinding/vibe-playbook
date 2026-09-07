# Changelog

## v1.2 — 2026-09-07

Added the Vibe-Spec Tool (`/tool/`): an interactive, entirely client-side page for working through all 14 fillable playbook documents, drafting each with a Claude or OpenRouter API key (called directly from the browser — no backend), and exporting a README + `/docs` folder as a zip. Drafts stream in live, and Next/Previous buttons (with auto-save and a progress bar) let you run through every document in order with no manual saving. See `docs/changelog.md` on the published site for details. GitHub push is a planned follow-up (Epic 3 of the Phase 2 plan).

## v1.1 — 2026-09-07

Added an 11th step, Feedback Loop (post-launch feedback channel + triage routine); a research toolkit to step 01 pointing at where to actually look for evidence (Reddit, Product Hunt, Show HN, app store reviews) plus paid audience-research tools; a flow-validation section to step 03 (Quant-UX, Reddit testing groups); and a visual-iteration tools section to step 04 (pen.dev, OpenPencil, Claude Design, Google Stitch). See `docs/changelog.md` on the published site for details.

## v1.0 — 2026-09-06

Initial release: Astro + Starlight docs site publishing the ten-step vibe coding playbook (problem research → publishing), each step with a fill-in template and a matching LLM prompt. Content adapted and expanded from an earlier `product_ideation` workflow — see `docs/changelog.md` on the published site for the step-by-step mapping.

Planned next: an in-browser "vibe-spec" tool for populating these templates against a bring-your-own model (Claude/Codex API keys, OpenRouter, OAuth credits) and pushing the result into a new GitHub repo's `/docs` folder.
