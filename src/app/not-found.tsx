import Link from "next/link";
export default function NotFound() {
  return <div className="mx-auto mt-20 max-w-xl px-5 text-center"><h1 className="h-section">Page not <em>found</em></h1><p className="mt-3 text-neutral-500">The page you&apos;re looking for doesn&apos;t exist.</p><Link href="/shop" className="btn-primary mt-6">Go to shop</Link></div>;
}
