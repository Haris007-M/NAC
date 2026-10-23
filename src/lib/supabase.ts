import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(url && anon && !url.includes("YOUR-PROJECT"));

/** Public client (respects Row Level Security). Null when env vars are missing. */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anon!, { auth: { persistSession: false } })
  : null;

/** Server-only admin client for inserting orders. Never import into client components. */
export function supabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseConfigured || !service) return null;
  return createClient(url!, service, { auth: { persistSession: false } });
}
