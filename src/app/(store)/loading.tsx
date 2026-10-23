export default function Loading() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-8" aria-busy="true" aria-label="Loading">
      <div className="mb-8 h-10 w-64 animate-pulse rounded-lg bg-sunk dark:bg-white/10" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="grid gap-3"><div className="aspect-[4/5] animate-pulse rounded-md bg-sunk dark:bg-white/10" /><div className="h-3 w-1/2 animate-pulse rounded bg-sunk dark:bg-white/10" /><div className="h-4 w-4/5 animate-pulse rounded bg-sunk dark:bg-white/10" /></div>
        ))}
      </div>
    </div>
  );
}
