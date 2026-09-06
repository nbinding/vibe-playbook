---
title: 11 · Feedback Loop
description: Give users a place to tell you what's wrong or missing, and a routine for actually acting on it.
---

## What this step is for

Once something is live, feedback shows up whether you plan for it or not — app store reviews, DMs, a friend texting you a bug. Without a single place to catch it, most of it just evaporates. This step is about picking one low-effort place for feedback to land, and a small routine for turning it into the next entry in your task list ([`06d-task-list.md`](../06-full-build/#6d--task-list)) instead of letting it pile up unread.

**Builds on:** [`10-publishing`](../10-publishing/)

## Template

Copy this into `docs/11-feedback-loop.md`.

```markdown
# 11 · Feedback Loop

## Where feedback currently shows up
List every place it can already reach you (app store reviews, email,
socials, a Discord, friends texting you) — you don't need a tool to catch
these, just to know they exist.

## Chosen channel
- Tool: [Google/Microsoft Form, or a dedicated board tool — see options below]
- Why this one: (budget, self-host vs hosted, how much structure you need)
- Link: [public feedback form/board URL]

## Setup checklist
- [ ] Feedback channel is live and linked from the app / app profile / support contact
- [ ] You've tested submitting to it yourself
- [ ] It's linked from `08-app-profile.md`'s support & contact section

## Triage routine
- How often you'll check it: [e.g. weekly]
- What happens to each item: (tag it, reply, turn into a task-list entry, close it)
- Who does this (if more than just you)

## Feeding it back in
When an item is worth acting on, where does it go?
- Small fix → straight into `06d-task-list.md`
- Bigger idea → back through `01-problem-opportunity.md` for the next version
```

## LLM prompt

Hand this to your AI tool along with your `06b-architecture-and-stack.md` and `08-app-profile.md`.

```text
Using the attached architecture doc and app profile, recommend a feedback
channel and triage routine sized to this project: a solo/small project
probably just needs a simple form or a lightweight self-hosted board, not
an enterprise feedback platform. Propose:
1. One feedback channel choice (name a specific tool) with a one-line
   reason it fits this project's size and stack.
2. A setup checklist to get it live and linked from the app/support contact.
3. A triage cadence (how often, what happens to each item) appropriate to
   how much time I'm likely to have for this.
4. A rule for when an item becomes a task-list entry vs. when it goes back
   through problem/opportunity research for a future version.
```

## Feedback tool options

You don't need a dedicated tool for a small project — a form is a completely legitimate v1. Move down this list as the volume of feedback grows past what a form can organize.

### Zero-setup

- **Google Forms** / **Microsoft Forms** — free, no infrastructure, five minutes to set up. Fine until you're getting more submissions than you can track in the response spreadsheet.

### Self-hosted / open source (own your data, run it yourself)

- **[Fider](https://fider.io)** — the most established FOSS option: feedback boards with voting, OAuth login, AGPL-3.0, self-host via Docker or use their hosted version.
- **[Astuto](https://github.com/UPONU-GmbH/astuto-sitateru)** — GPL-3.0, Canny-inspired boards/voting/comments, one of the simplest to self-host (single Docker Compose file). No public roadmap, changelog, or issue-tracker integrations — pick this if you want the basics and nothing else.
- **[ClearFlask](https://clearflask.com)** — AGPL-3.0, adds a public roadmap and changelog on top of boards/voting. Self-hosting is more involved (multiple services, Java-based stack) — its managed cloud option is the easier path if you want this feature set without the ops work.
- **[Quackback](https://quackback.io)** — AGPL-3.0, boards + roadmap + changelog + AI-generated summaries, deploys with one click on Docker or Railway, and ships an MCP server so an AI agent can search/triage feedback directly — worth a look if you're already running most of your workflow through an AI coding agent.

### Hosted / paid (the category benchmark)

- **[Canny](https://canny.io)** — the tool most of the above position themselves against. Boards, roadmap, changelog, and integrations out of the box, at a monthly SaaS price. Worth it once feedback volume justifies not self-hosting.

### A different shape of problem: scattered reviews and mentions

If your actual pain point isn't "there's no place for users to submit ideas" but "feedback is scattered across app store reviews, social mentions, and DMs and I never see it in one place," that's a different tool category:

- **[OmniSaaSy](https://www.thesaasypeople.com)** — relays app store reviews, social mentions, and DMs into your existing Intercom inbox as conversations, rather than giving users a board to post to. Priced per channel (from ~$75/mo), aimed at teams already running support through Intercom.

:::note
One tool from the original ask — "Logtrack" — couldn't be verified as an existing product during research. If you meant a specific tool by that name, let it be known and it can be added here.
:::
