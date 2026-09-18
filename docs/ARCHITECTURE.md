# Architecture

The application is organized around data-driven curriculum modules and small client components. `lib/curriculum` holds locale-independent lesson IDs and fully authored English/Hindi learner-facing fields. `components/lessons/LessonPlayer` renders exercises without lesson-specific UI logic. `components/chess/Chessboard` delegates positions and legal moves to `chess.js`.

`ProgressRepository` is the persistence boundary. `localProgressRepository` enables offline-friendly demo use today; `CloudProgressRepository` defines the future Supabase adapter without coupling learning components to a database client. Progress includes locale, onboarding status, level, lesson state, mastery, and timestamps.

Future modules (puzzles, games, engine, recommendations) should consume curriculum IDs and repository interfaces rather than mutate UI state directly.
