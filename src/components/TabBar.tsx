"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";

const I = {
  home: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  shop: "M4 7h16l-1.5 12a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2zM9 7a3 3 0 0 1 6 0",
  journal: "M5 4h11l3 3v13H5zM9 10h7M9 14h7M9 18h4",
  bag: "M6 8h12l1 12H5zM9 8V6a3 3 0 0 1 6 0v2",
};
const Svg = ({ d }: { d: string }) => <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] fill-none stroke-current stroke-[1.8]" strokeLinejoin="round" strokeLinecap="round"><path d={d} /></svg>;

export function TabBar() {
  const path = usePathname();
  const { count, setOpen } = useCart();
  const item = "relative grid justify-items-center gap-0.5 rounded-xl py-1.5 text-[10.5px] font-semibold";
  const on = (h: string) => (h === "/" ? path === "/" : path.startsWith(h)) ? "text-rasp before:absolute before:-top-1.5 before:h-[3px] before:w-6 before:rounded before:bg-brand" : "text-neutral-500";
  return (
    <nav aria-label="App navigation" className="fixed inset-x-0 bottom-0 z-[85] grid grid-cols-4 border-t border-line bg-white/90 px-1.5 pb-[calc(6px+env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-md md:hidden dark:border-white/10 dark:bg-[#0e0c0f]/90">
      <Link href="/" className={`${item} ${on("/")}`}><Svg d={I.home} />Home</Link>
      <Link href="/shop" className={`${item} ${on("/shop")}`}><Svg d={I.shop} />Shop</Link>
      <Link href="/journal" className={`${item} ${on("/journal")}`}><Svg d={I.journal} />Journal</Link>
      <button onClick={() => setOpen(true)} className={`${item} text-neutral-500`}><Svg d={I.bag} />Bag
        {count > 0 && <b className="absolute left-[calc(50%+6px)] top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-rasp px-1 text-[10px] text-white">{count}</b>}
      </button>
    </nav>
  );
}
