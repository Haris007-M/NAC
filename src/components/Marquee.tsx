const ITEMS = ["Anua", "COSRX", "Beauty of Joseon", "Aestura", "SKINEVER", "Glass skin", "Low pH", "SPF50+ PA++++", "Ceramides", "Snail 96"];
export function Marquee() {
  return (
    <div aria-hidden className="overflow-hidden bg-ink py-3.5 text-white [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex w-max animate-marquee items-center gap-6 hover:[animation-play-state:paused]">
        {[...ITEMS, ...ITEMS].map((t, i) => (
          <span key={i} className="flex items-center gap-6 whitespace-nowrap font-head text-xl font-extrabold uppercase md:text-2xl">{t}<i className="not-italic text-rasp-light">✦</i></span>
        ))}
      </div>
    </div>
  );
}
