# Vibe Coding Playbook

A versioned, step-by-step process for going from a raw idea to a published app with an AI coding partner — built as an [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) docs site.

Eleven steps, each with a fill-in template and a matching LLM prompt that consumes the previous step's document:

1. Problem & Opportunity Research
2. Idea & Pitch
3. UX
4. UI & Design System
5. Prototype
6. Full Build (PRD, architecture & stack, API spec, task list)
7. Testing
8. App Profile
9. Marketing
10. Publishing
11. Feedback Loop

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## Developing

```sh
npm install
npm run dev       # http://localhost:4321/vibe-playbook/
npm run build     # outputs to ./dist
npm run preview
```

Content lives in [`src/content/docs/`](./src/content/docs/) — `playbook/` holds the eleven numbered steps, plus `index.mdx`, `how-to-use.md`, and `changelog.md`.

## Roadmap

An in-browser "vibe-spec" tool is planned as a follow-up: bring your own model (Claude or Codex API key, OpenRouter key, or OAuth credits from a Claude/ChatGPT subscription), work through the playbook steps interactively, and push the finished documents into a new GitHub repo's `/docs` folder plus a generated `README.md` via the GitHub API.
