---
title: 06 · Full Build
description: Turn the validated design into a real spec, an architecture, and a build plan — then build it.
---

## What this step is for

This is the biggest step, and the one worth spending real effort on — everything before it was cheap to change; everything after it gets progressively more expensive to change. It has four parts. Do all four before you start telling your AI agent "now build it" — a spec an agent can build against beats a running conversation you're steering screen by screen.

**Builds on:** [`03-ux`](../03-ux/), [`04-ui-design-system`](../04-ui-design-system/), and [`05-prototype`](../05-prototype/)

---

## 6a · Product requirements (PRD)

### Template

Copy into `docs/06a-prd.md`.

```markdown
# 06a · Product Requirements

## Background
Why this, why now — one paragraph, pulled from steps 01-02.

## Objectives
What the product needs to achieve (user and business goals).

## Scope
What's in v1. What's explicitly **out** of v1 (this list matters as much as
the first one).

## Feature requirements

| Feature | Description | Priority (Must/Should/Could) |
|---------|-------------|-------------------------------|
| | | |

## Acceptance criteria
For each Must-have feature, a Given/When/Then or similar testable statement.

## Non-functional requirements
Performance, offline behaviour, data retention, privacy — anything that
isn't a feature but constrains how features are built.
```

### LLM prompt

```text
You are a product manager. Using the attached pitch, UX doc, and design
system, write a PRD with: Background, Objectives, Scope (explicitly listing
what's out of scope for v1), a feature requirements table with Must/Should/
Could priorities, Given/When/Then acceptance criteria for each Must-have
feature, and any non-functional requirements (performance, privacy,
offline behaviour) implied by the product. Be opinionated about what to cut
from v1 — a smaller v1 that ships is better than a complete one that doesn't.
```

---

## 6b · Architecture & stack

### Template

Copy into `docs/06b-architecture-and-stack.md`.

```markdown
# 06b · Architecture & Stack

## Overview
One paragraph + a simple diagram (text arrows are fine) of how the pieces
fit together.

## Frontend
| Element | Choice | Why |
|---------|--------|-----|

## Backend / data
| Element | Choice | Why |
|---------|--------|-----|

## Third-party services
APIs, auth providers, payment processors, AI providers — anything you're
depending on, and what happens if it's unavailable.

## Security & privacy
Auth model, data handling, anything regulatory (data residency, age
restrictions) relevant to this product.

## Folder structure
Rough shape of the repo, enough for an AI agent to know where new code goes.

## Key technical decisions
| Decision | Reasoning |
|----------|-----------|
```

### LLM prompt

```text
You are a pragmatic software architect. Using the attached PRD, propose an
architecture and stack for this product. Prefer boring, well-supported
technology over novel choices unless the PRD specifically requires
something unusual. Cover: frontend, backend/data, third-party services
(and what happens if each is unavailable), security & privacy
implications, a rough folder structure, and a short list of the key
technical decisions with one-line justifications. Flag anything in the PRD
that looks technically risky or unusually expensive to build.
```

---

## 6c · API spec _(skip if there's no API)_

### Template

Copy into `docs/06c-api-spec.md`.

```markdown
# 06c · API Spec

## Auth
How requests are authenticated.

## Endpoints
For each: method, path, purpose, request/response shape.

## Error format
Standard error shape and status codes used across the API.
```

### LLM prompt

```text
Using the attached PRD and architecture doc, define the API surface needed
to support the Must-have features: auth model, each endpoint (method,
path, purpose, request/response shape), and a standard error response
format. Keep it to what v1 actually needs.
```

---

## 6d · Task list

### Template

Copy into `docs/06d-task-list.md`.

```markdown
# 06d · Task List

## Phase 1 — Foundation
- [ ] Repo/project scaffold
- [ ] Auth
- [ ] Data models

## Phase 2 — Core features
- [ ] (one group of tasks per Must-have feature)

## Phase 3 — Polish
- [ ] Empty/loading/error states
- [ ] Accessibility pass

## Phase 4 — Pre-launch
- [ ] Testing (see step 07)
- [ ] App profile (see step 08)
```

### LLM prompt

```text
Using the attached PRD and architecture doc, break the Must-have features
into a phased task list an AI coding agent can work through one task at a
time: foundation/scaffolding first, then core features (grouped by
feature, in a sensible build order), then polish, then pre-launch tasks.
Keep tasks small enough that each one is a reasonable single work session.
```

---

Once these four documents exist, work through the task list with your AI coding agent, feeding it the relevant doc(s) as context for each task rather than the whole `/docs` folder at once.
