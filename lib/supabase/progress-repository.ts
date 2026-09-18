import type { ProgressRepository } from "@/lib/persistence/progress-store";
/** Cloud adapter boundary. Implement with Supabase Auth + RLS once credentials are configured. */
export type CloudProgressRepository = ProgressRepository & { sync(): Promise<void> };
