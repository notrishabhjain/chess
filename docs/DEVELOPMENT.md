# Development

Use pnpm. Run `pnpm dev` for local development and execute test, lint, typecheck, and production build before submitting changes. Keep lesson text out of React components and provide manually authored `en` and `hi` values for every learner-facing curriculum field. Do not add runtime translation dependencies.

## Phase 1 implementation summary

- Implemented application shell, mobile navigation, language persistence, onboarding, curriculum cards, lesson engine, chessboard, local progress, and progress/profile views.
- No database migration is included because this vertical slice deliberately runs with no Supabase credentials.
- Known limitation: puzzle/play routes explicitly state they are deferred; account sync and the full content library are later phases.
- Next step: add Supabase Auth/migrations and authenticated synchronization, then build the puzzle vertical slice.
