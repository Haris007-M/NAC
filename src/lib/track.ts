"use client";
/* Lightweight first-party analytics. No cookies, no personal data: a random session id in localStorage. */
function sessionId() {
  try {
    let id = localStorage.getItem("nac-sid");
    if (!id) { id = crypto.randomUUID(); localStorage.setItem("nac-sid", id); }
    return id;
  } catch { return "anon"; }
}

export function track(type: "page_view" | "product_view" | "product_click" | "add_to_cart" | "checkout_start", extra: { product?: string } = {}) {
  if (typeof window === "undefined" || location.pathname.startsWith("/admin")) return;
  const body = JSON.stringify({ type, sessionId: sessionId(), path: location.pathname, referrer: document.referrer || null, ...extra });
  try { fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } }); } catch {}
}
