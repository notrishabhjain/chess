# Database plan

Phase 1 persists guest progress locally and does not require Supabase credentials. The planned Supabase schema will use `profiles`, `topics`, `lessons`, `lesson_progress`, `topic_progress`, `puzzles`, `puzzle_attempts`, `games`, `game_moves`, `daily_activity`, and `user_settings`. User-owned tables will use UUID owner columns and RLS policies enforcing `auth.uid() = user_id`; public curriculum content will be readable without user data exposure.

The cloud adapter must preserve the `ProgressRepository` contract and merge guest progress explicitly at sign-in.
