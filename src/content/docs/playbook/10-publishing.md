---
title: 10 · Publishing
description: Ship it, and know what you'll do the day after.
---

## What this step is for

The last mile — getting it live, and not disappearing the moment it is. This step is a checklist more than a document: most of the thinking already happened in earlier steps, this is where you make sure nothing gets forgotten on the way out the door.

**Builds on:** [`06-full-build`](../06-full-build/), [`07-testing`](../07-testing/), and [`08-app-profile`](../08-app-profile/)

## Template

Copy this into `docs/10-publishing.md`.

```markdown
# 10 · Publishing

## Pre-launch checklist
- [ ] Exit criteria from `07-testing.md` met
- [ ] Environment/hosting configured (domain, SSL, env vars/secrets)
- [ ] Analytics or basic usage tracking in place (even if minimal)
- [ ] App profile content (step 08) finalized and uploaded wherever it needs to go
- [ ] Support contact actually works (test it)

## Release
- Where: (app store / Play store / web / Product Hunt / etc.)
- Version: v1.0.0
- Release notes: what's in this version, in plain language

## Rollback plan
If something breaks right after launch, what's the fastest way back to a
working state?

## Day 1 monitoring
What you'll actually watch for the first 24-48 hours (errors, crash
reports, first user feedback) and where.

## Changelog
Start a running log here (or in a separate `CHANGELOG.md`) of what
changes in each version going forward.
```

## LLM prompt

Hand this to your AI tool along with your `06b-architecture-and-stack.md` and `08-app-profile.md`.

```text
Using the attached architecture doc and app profile, write a pre-launch
and launch checklist for this product: environment/hosting steps specific
to the stack described, a rollback plan appropriate to how it's deployed,
and what to monitor in the first 24-48 hours after release (errors,
crashes, and the earliest signal that something's wrong). Keep it
concrete and specific to this stack — not a generic "monitor your app"
checklist.
```

## After you publish

Next, set up [`11-feedback-loop`](../11-feedback-loop/) so what users tell you doesn't evaporate. From there, loop back to [`01-problem-opportunity`](../01-problem-opportunity/) for whatever you build next — or straight back to [`06-full-build`](../06-full-build/) for v1.1 of this one. The playbook doesn't end, it repeats.
