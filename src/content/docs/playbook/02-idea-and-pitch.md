---
title: 02 · Idea & Pitch
description: Turn validated research into a crisp, one-page pitch.
---

## What this step is for

Your research told you the problem is real. Now shape it into something you could explain to a friend in thirty seconds — and could still recognize as the same idea after you've built it. A clear pitch here keeps you from quietly building a different product than the one you set out to build.

**Builds on:** [`01-problem-opportunity`](../01-problem-opportunity/)

## Template

Copy this into `docs/02-idea-and-pitch.md`.

```markdown
# 02 · Idea & Pitch

## The hook
One or two sentences. If someone only reads this, what should stick?

## The problem (recap)
One line, pulled from your research.

## The solution
What are you actually building? Plain language, no feature list yet.

## Who it's for
- Primary audience
- Who benefits (if different from who uses it)

## Why it's better than the alternatives
What makes this worth switching to, vs. what people do today?

## What success looks like
- What would make you glad you built this? (Usage, feedback, a specific outcome.)

## Working name
Not final — just something to call it while you work. (See the naming prompt below if you want more options.)

## Open questions
Anything still unresolved before you move to UX.
```

## LLM prompt

Hand this to your AI tool along with your `01-problem-opportunity.md`.

```text
You are a product strategist. Using the attached problem/opportunity
research, write a one-page pitch for this idea.

Produce these sections:
1. The hook — 1-2 sentences that would make someone want to hear more.
2. The problem — one line, distilled from the research.
3. The solution — plain-language description of what we're building, with
   no feature list.
4. Who it's for — the primary audience, and who benefits if different.
5. Why it's better than the alternatives — grounded in the research's
   "alternatives & competitors" section, not generic claims.
6. What success looks like — a concrete, checkable outcome.
7. Open questions — anything from the research that's still unresolved and
   should be settled before UX work starts.

Keep it to one page. Cut anything that sounds like marketing filler.
```

## Bonus: naming prompt

If you want a working name and don't already have one, try this after the pitch is drafted:

```text
Help me find a name for this: [paste your one-line solution description].

Act as three different people brainstorming independently:
1. Someone who deeply understands this product space
2. A branding expert
3. A marketing strategist

Each of them proposes 3 names from their own angle, with one sentence on
why it fits. I want short, easy-to-pronounce names. Key qualities to
reflect: [quality 1], [quality 2], [quality 3].

Once I tell you which ones I like, run another round from the same three
angles, refined toward my picks.
```
