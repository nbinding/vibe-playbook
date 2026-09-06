---
title: 07 · Testing
description: Decide what "working" means before you call it done.
---

## What this step is for

An AI agent will happily tell you a feature is done. This step is where you decide, in advance, what "done" actually means — so you're checking against a plan instead of a feeling.

**Builds on:** [`06-full-build`](../06-full-build/)

## Template

Copy this into `docs/07-testing.md`.

```markdown
# 07 · Testing

## What needs the most scrutiny
Pull this from the PRD's Must-have features — which ones break the product
if they're wrong?

## Test approach
- [ ] Manual click-through of the core flow (always do this, even for tiny projects)
- [ ] Automated unit tests for [specific risky logic]
- [ ] Automated integration/e2e tests for [core flow]
- [ ] Cross-browser / cross-device check

## Accessibility checklist
- [ ] Text contrast meets 4.5:1
- [ ] All interactive elements reachable by keyboard, with visible focus
- [ ] Form fields have labels; errors are described in text, not colour alone
- [ ] Touch targets ≥ 44px
- [ ] Screen reader pass on the core flow (VoiceOver/NVDA/TalkBack)

## Edge cases to check
- Empty states (no data yet)
- Slow/failed network requests
- Invalid or unexpected input
- What happens at the limits (very long text, very large lists, no results)

## Bugs found

| Bug | Severity | Fixed? |
|-----|----------|--------|

## Exit criteria
What has to be true before you move to launch? (e.g. "core flow works with
no console errors on the two browsers I care about, accessibility checklist
passed, no open Must-have bugs.")
```

## LLM prompt

Hand this to your AI tool along with your `06a-prd.md`.

```text
Using the attached PRD, write a testing plan for this product. Identify
which Must-have features most need scrutiny (i.e. where a bug would be
worst), propose a test approach appropriate to a small/solo project
(don't over-recommend heavy test infrastructure for a weekend project),
list the edge cases worth explicitly checking (empty states, network
failures, invalid input, scale limits), and propose concrete exit criteria
— a short, checkable list of what has to be true before this ships.
Keep the accessibility checklist to the essentials: contrast, keyboard
reachability, labels, touch target size, and one screen-reader pass.
```
