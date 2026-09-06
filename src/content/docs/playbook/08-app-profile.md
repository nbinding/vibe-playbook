---
title: 08 · App Profile
description: Give your product the identity it needs to show up somewhere — a store listing, a landing page, a Product Hunt post.
---

## What this step is for

Wherever you publish — an app store, a Product Hunt launch, a plain landing page — someone has to first decide in three seconds whether to look closer. This step is where you write that identity down once, so it's consistent everywhere you use it.

**Builds on:** [`02-idea-and-pitch`](../02-idea-and-pitch/) and [`03-ux`](../03-ux/)

## Template

Copy this into `docs/08-app-profile.md`.

```markdown
# 08 · App Profile

## Name & tagline
- Name: [confirmed name, from step 02]
- Tagline: one line, under ~10 words

## Short description
1-2 sentences, for places with tight character limits (app store subtitle,
social bio).

## Long description
A few paragraphs, for places with room (app store listing, landing page,
Product Hunt post). Lead with the problem, not the feature list.

## Category & keywords
- Category: (App Store / Play Store category, or the closest equivalent)
- Keywords: for search/ASO — what would someone type to find this?

## Visuals needed
- [ ] Icon
- [ ] Screenshots (which screens, in what order — first one matters most)
- [ ] Optional: preview video/GIF

## Pricing / access model
Free, paid, freemium, waitlist — and why.

## Support & contact
Where users go if something breaks (email, form, GitHub issues).
```

## LLM prompt

Hand this to your AI tool along with your `02-idea-and-pitch.md` and `03-ux.md`.

```text
You are an ASO/App Store copywriter. Using the attached pitch and UX doc,
write:
1. A tagline (under 10 words).
2. A short description (1-2 sentences, for a character-limited field).
3. A long description (2-3 paragraphs, leading with the problem the reader
   has, not a feature list), suitable for an app store listing or a
   Product Hunt post.
4. A suggested category and a list of search keywords a real user might
   type to find something like this.
5. A recommended order for screenshots, based on the screens in the UX doc
   — which screen should be shown first to make the strongest case in
   under 2 seconds.

Write for someone scanning quickly, not someone already sold on the idea.
```
