import Link from "next/link";
import { PRODUCTS, BRANDS } from "@/data/products";
import { SERVICES } from "@/data/services";
import { ProductCard } from "@/components/ProductCard";
import { SITE } from "@/lib/config";
import { formatPrice } from "@/lib/format";

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.condition === "new" && p.category === "watch").slice(0, 4);
  const preOwned = PRODUCTS.filter((p) => p.condition === "pre-owned").slice(0, 3);
  return (
    <>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-[1280px] px-4 py-20 grid gap-6">
          <h1 className="font-display text-4xl md:text-6xl max-w-3xl">Time well kept, bought well, mended right.</h1>
          <p className="text-paper/80 max-w-xl">{SITE.tagline}. Browse new and pre-owned pieces, or book a repair and follow it every step of the way.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className="bg-bronze text-ink px-6 py-3 font-medium min-h-11">Shop watches</Link>
            <Link href="/repairs/book" className="border border-paper px-6 py-3 font-medium min-h-11">Book a repair</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-12" aria-labelledby="featured">
        <h2 id="featured" className="font-display text-3xl mb-6">Featured</h2>
        <ul className="grid gap-4 grid-cols-2 lg:grid-cols-4">{featured.map((p) => <ProductCard key={p.slug} product={p} />)}</ul>
      </section>

      <section className="bg-white border-y border-ink/10" aria-labelledby="repair">
        <div className="mx-auto max-w-[1280px] px-4 py-12 grid gap-6 md:grid-cols-2">
          <div>
            <h2 id="repair" className="font-display text-3xl mb-3">Repair workshop</h2>
            <p className="mb-4">No work starts until you approve the quote. Every job has a tracking link, and repairs carry a 90-day warranty.</p>
            <Link href="/repairs" className="underline">See services and prices</Link>
          </div>
          <ul className="grid gap-2 text-sm">
            {SERVICES.slice(0, 4).map((s) => (
              <li key={s.id} className="flex justify-between border-b border-ink/10 py-2">
                <span>{s.name}</span>
                <span className="price">from {formatPrice(s.fromMinor)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-12" aria-labelledby="preowned">
        <div className="flex items-end justify-between mb-6">
          <h2 id="preowned" className="font-display text-3xl">Pre-owned, graded and serviced</h2>
          <Link href="/outlet" className="underline text-sm">View all</Link>
        </div>
        <ul className="grid gap-4 grid-cols-2 lg:grid-cols-3">{preOwned.map((p) => <ProductCard key={p.slug} product={p} />)}</ul>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-16">
        <h2 className="font-display text-xl mb-3">Brands</h2>
        <ul className="flex flex-wrap gap-2">
          {BRANDS.map((b) => (
            <li key={b}><Link href={`/shop?brand=${encodeURIComponent(b)}`} className="inline-block border border-ink/30 px-3 py-2 text-sm">{b}</Link></li>
          ))}
        </ul>
      </section>
    </>
  );
}
