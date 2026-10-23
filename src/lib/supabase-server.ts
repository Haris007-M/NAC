import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "./supabase";

/** Supabase client bound to the visitor's auth cookies (server components / actions only). */
export function createSupabaseServer() {
  const store = cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* called from a server component */ }
      },
    },
  });
}

export type AdminCtx = { sb: ReturnType<typeof createSupabaseServer>; user: { id: string; email: string }; role: "owner" | "admin" };

/**
 * Gatekeeper for every admin page and action.
 * 1. getUser() verifies the JWT with Supabase (cannot be faked by editing cookies).
 * 2. The user must exist in the `admins` table, otherwise they are signed out.
 */
export async function requireAdmin(): Promise<AdminCtx> {
  if (!isSupabaseConfigured) redirect("/admin/login?e=config");
  const sb = createSupabaseServer();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data } = await sb.from("admins").select("role").eq("user_id", user.id).maybeSingle();
  if (!data) {
    await sb.auth.signOut();
    redirect("/admin/login?e=denied");
  }
  return { sb, user: { id: user.id, email: user.email ?? "" }, role: data.role };
}
