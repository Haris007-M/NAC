import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/* Runs before every /admin request: refreshes the session and bounces anyone not signed in.
   (Admin-role membership is checked again on the server in requireAdmin().) */
export async function middleware(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isLogin = req.nextUrl.pathname.startsWith("/admin/login");
  let res = NextResponse.next({ request: req });
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  if (!url || !anon || url.includes("YOUR-PROJECT")) return isLogin ? res : NextResponse.redirect(new URL("/admin/login?e=config", req.url));

  const sb = createServerClient(url, anon, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req });
        res.headers.set("X-Robots-Tag", "noindex, nofollow");
        list.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });
  const { data: { user } } = await sb.auth.getUser();
  if (!user && !isLogin) return NextResponse.redirect(new URL("/admin/login", req.url));
  if (user && isLogin) return NextResponse.redirect(new URL("/admin", req.url));
  return res;
}

export const config = { matcher: ["/admin/:path*"] };
