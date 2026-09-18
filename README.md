# ChessMentor

ChessMentor is a bilingual (English/Hindi) learning-first chess web app. Phase 1 delivers a runnable local vertical slice: onboarding, a language switcher, three interactive beginner lessons powered by `chess.js`, coaching hints/feedback, and browser-persisted progress.

## Stack

- Next.js App Router, React, TypeScript, CSS
- `chess.js` for trusted chess position parsing and legal move validation
- Vitest for domain tests
- A repository abstraction separates local progress from the planned Supabase implementation.

## Local setup

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. No credentials are required: demo progress is stored in localStorage. Copy `.env.example` to `.env.local` only when configuring the future Supabase adapter.

## Quality checks

```bash
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```

## Product status

This initial release intentionally implements Phase 1 only. The foundation is functional, but authentication/cloud sync, puzzles, computer play, engine analysis, and persistent Supabase migrations are planned subsequent vertical slices—not simulated UI features.

See [architecture](docs/ARCHITECTURE.md), [product scope](docs/PRODUCT.md), [curriculum](docs/CURRICULUM.md), [database plan](docs/DATABASE.md), and [development guide](docs/DEVELOPMENT.md).
