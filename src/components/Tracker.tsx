"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/track";

export function Tracker() {
  const path = usePathname();
  useEffect(() => {
    track("page_view");
    const m = path.match(/^\/product\/([^/]+)/);
    if (m) track("product_view", { product: m[1] });
    if (path === "/checkout") track("checkout_start");
  }, [path]);
  return null;
}
