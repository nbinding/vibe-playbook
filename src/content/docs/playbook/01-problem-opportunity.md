---
title: 01 · Problem & Opportunity Research
description: Find a real problem before you fall in love with a solution.
---

## What this step is for

It's tempting to start with "I want to build an app that does X." This step forces the question underneath that: *is there a real problem here, for real people, that isn't already solved well enough?* You're not designing anything yet — you're figuring out whether the thing is worth designing.

**Builds on:** nothing — this is where a new idea starts.

## Template

Copy this into `docs/01-problem-opportunity.md`.

```markdown
# 01 · Problem & Opportunity Research

## Raw idea
What's the rough concept, in a sentence or two? (It's fine if this changes later.)

## Who has this problem?
- Who, specifically? (Not "everyone" — a real segment.)
- How do you know? (Personal experience, seen it in the wild, a forum thread, etc.)

## The problem itself
- What's actually broken, slow, or missing today?
- What do people currently do instead? (Spreadsheets, a worse app, nothing, paying someone.)
- How painful is this, really? (Annoying vs. actively costing time/money/stress.)

## Evidence
- Anything concrete: conversations, existing threads/reviews complaining about this, data.
- Where did you look? (See the research toolkit below if you're not sure where to start.)
- If you have none yet, say so — that's a signal to go find some before building.

## Alternatives & competitors
- What already exists that half-solves this? (Check Product Hunt and the App/Play Store, not just Google.)
- Why isn't that good enough?

## Risks & unknowns
- What could make this not work? (No real demand, hard to build, legal/data issues, platform risk.)
- What don't you know yet that you'd want to find out?

## Why now / why you
- Is there a reason this is worth doing now, or by you specifically?

## Signal that this is worth pursuing
- What would tell you "yes, keep going" vs. "this isn't it"?
```

## LLM prompt

Hand this to your AI tool with your raw idea in a sentence or two.

```text
You are a sharp, skeptical product researcher. I'm going to give you a rough
idea. Your job is to stress-test it, not cheerlead it.

My rough idea: [describe your idea in 2-4 sentences]

Please produce a "Problem & Opportunity Research" document with these sections:
1. Who has this problem — propose a specific, narrow target segment (not
   "everyone"), and say what evidence would confirm or kill that guess.
2. The problem itself — what's broken/slow/missing today, and what people do
   instead right now.
3. Alternatives & competitors — realistic existing options, and why they
   likely fall short for this segment.
4. Risks & unknowns — the 3-5 things most likely to sink this (demand,
   technical difficulty, legal/data, distribution), stated plainly.
5. Signal to pursue — 2-3 concrete things I could check this week that would
   tell me whether to move to the next step or abandon this.

Be direct about weaknesses. Don't invent evidence I haven't given you —
mark anything you're guessing as a guess.
```

## Research toolkit

None of this is required — reading twenty or thirty real posts, reviews, or comments by hand is free and often enough for a first pass. These are places to look and tools that speed it up once you know you want to go deeper.

### Free & manual

- **Reddit, directly** — search relevant subreddits, or search Google for `site:reddit.com "the phrase someone with this problem would type"`. Sort by top/relevance, not new. Read complaints and rants, not just people asking for recommendations — those threads describe the problem in the person's own words.
- **Product Hunt** — search for existing products in the space. The comments are more useful than the upvote count: look for "does it also do X?" and "wish it had Y" replies.
- **Hacker News (Show HN) & Indie Hackers** — good for developer-adjacent or SaaS-shaped ideas. [HN Algolia search](https://hn.algolia.com/) surfaces prior discussions of the same problem.
- **App Store / Play Store reviews of existing alternatives** — 1–3 star reviews are usually the clearest, most specific description of the problem you're trying to solve.
- **Competitor feedback boards** — public roadmaps or feature-request boards (Canny, GitHub issues, Trello boards) show exactly what current users are asking for and not getting.
- **Niche forums, Discord/Slack communities** — wherever your target segment already gathers that isn't Reddit or an app store. Often the highest-signal, least-searched source.
- **[F5Bot](https://f5bot.com)** (free) — email/Discord alerts whenever a keyword you choose shows up on Reddit, Hacker News, and a few other sites. No AI scoring, just a tripwire so you're not re-searching by hand every day.

### Paid tools (accelerants, not requirements)

These layer AI-based buying-intent scoring, or a packaged validation report, on top of what the free options above already let you do manually:

- **[GummySearch](https://gummysearch.com)** — Reddit-focused audience research: track subreddits and keywords, surface recurring pain points and questions.
- **[Leadverse](https://leadverse.ai)** — similar territory to GummySearch, adds AI intent scoring and automated outreach drafting.
- **[OpenScout](https://openscout.so)** — multi-platform (Reddit, X/Twitter, LinkedIn, Hacker News) mention monitoring with buying-intent scoring and ready-to-post replies.
- **[Buska](https://www.buska.io)** — broader lead-generation/CRM tool spanning 30+ platforms, with semantic ICP (ideal-customer-profile) matching and one-click reply drafting.
- **[WorthBuild](https://worthbuild.io)** — a different shape of tool: pay-per-report (no subscription) idea validation. Searches Reddit/HN/X/forums for people describing your problem, then generates a report with market sizing, competitor analysis, and risk assessment — useful as a sanity check on this whole document rather than an ongoing listening tool.

Pricing and feature sets for all of these change often — check current pricing before subscribing to anything. For a weekend-sized idea, the free/manual routes above are usually enough to tell you whether to move to [`02-idea-and-pitch`](../02-idea-and-pitch/) or drop it.
