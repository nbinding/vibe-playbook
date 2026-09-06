# Contributing

This repo uses three branches:

- **`main`** — the project owner's working branch, for direct edits.
- **`approval`** — where outside contributions land. Fork the repo and open your pull request against this branch.
- **`public`** — the live branch. Pushing here triggers the GitHub Pages deploy at [nbinding.github.io/vibe-playbook](https://nbinding.github.io/vibe-playbook). Only the project owner merges into it, via a reviewed pull request — nothing lands on the live site without that review.

## To propose a change

1. Fork the repo.
2. Branch from `approval`, make your change.
3. Open a pull request back into `approval`.

Once a batch of changes is ready to go live, they're merged forward into `public` (which redeploys the site automatically) by the project owner.
