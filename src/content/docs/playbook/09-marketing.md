---
title: 09 · Marketing
description: Know who you're talking to and what you're telling them before launch day.
---

## What this step is for

Even a tiny side project benefits from ten minutes spent on "who is this for, and what do I say to them" — it stops launch posts from reading like a changelog and helps you notice if the audience you're picturing has drifted from the one in your research.

**Builds on:** [`01-problem-opportunity`](../01-problem-opportunity/) and [`08-app-profile`](../08-app-profile/)

## Template

Copy this into `docs/09-marketing.md`.

```markdown
# 09 · Marketing

## Primary persona
- Who: name/role, one line
- Current behaviour: what they do today instead of using this
- Motivation: what would make them try something new
- Where to reach them: which channels/communities they're actually in

## Positioning statement
For [audience], [product] is the [category] that [key benefit] — unlike
[main alternative], it [key differentiator].

## Key messages
2-3 short statements you'll reuse across the listing, launch post, and any
ads/copy. These should survive being read out loud.

## Launch channels
Where you'll actually post/share this (be specific — "Twitter" is less
useful than "the r/[specific subreddit] and this Discord").

## Launch plan
| When | What | Where |
|------|------|-------|

## Post-launch
How you'll notice if it's working (signups, a specific metric, direct
feedback) and what you'll do with early feedback.
```

## LLM prompt

Hand this to your AI tool along with your `01-problem-opportunity.md` and `08-app-profile.md`.

```text
You are a marketing strategist. Using the attached research and app
profile, produce:
1. A primary persona: who they are, what they do today instead of this
   product, what would make them switch, and where they actually spend
   time online (be specific — named communities/channels, not generic
   platforms).
2. A positioning statement in the form: "For [audience], [product] is the
   [category] that [benefit] — unlike [alternative], it [differentiator]."
3. 2-3 key messages, written to be said out loud, not read as ad copy.
4. A short, realistic launch plan — 3-5 concrete actions with roughly when
   and where, sized for a solo/small launch rather than a funded go-to-
   market campaign.
5. One or two signals that would tell me the launch is working.

Ground the persona and channels in the research I gave you — don't invent
a generic "busy professional" persona if the research points somewhere
more specific.
```
