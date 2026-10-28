import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { SITE } from "@/lib/config";
import { productImage } from "@/lib/images";
import { WatchImage } from "@/components/WatchImage";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return { title: p ? `${p.brand} ${p.name}` : "Not found" };
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const preOwned = p.condition === "pre-owned";
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 grid gap-8 md:grid-cols-2">
      <WatchImage src={productImage(p.slug)} alt={`${p.brand} ${p.name}`} category={p.category} slug={p.slug} priority />
      <div className="grid gap-4 content-start">
        <p className="text-xs uppercase tracking-widest text-ink/60">{p.brand}</p>
        <h1 className="font-display text-4xl">{p.name}</h1>
        <p className="price text-2xl">{formatPrice(p.priceMinor)}</p>
        <p className={p.stock > 0 ? "text-sage font-medium" : "text-danger font-medium"}>
          {p.stock > 0 ? (preOwned ? "In stock - one only" : `In stock (${p.stock})`) : "Sold out"}
        </p>
        <p>{p.description}</p>
        <dl className="grid grid-cols-2 gap-y-2 text-sm border-t border-ink/15 pt-4">
          <dt className="text-ink/60">Movement</dt><dd className="capitalize">{p.movement}</dd>
          <dt className="text-ink/60">Condition</dt><dd className="capitalize">{p.condition}{p.grade ? `, grade ${p.grade}` : ""}</dd>
          <dt className="text-ink/60">Size</dt><dd>{p.caseMm} mm</dd>
          <dt className="text-ink/60">Strap</dt><dd>{p.strap}</dd>
          <dt className="text-ink/60">For</dt><dd className="capitalize">{p.gender}</dd>
        </dl>
        {preOwned && p.conditionReport && (
          <section className="bg-white border border-ink/15 p-4">
            <h2 className="font-display text-lg mb-1">Condition report</h2>
            <p className="text-sm">{p.conditionReport}</p>
          </section>
        )}
        <p className="text-sm text-ink/70">Includes {SITE.warrantyDays}-day workshop warranty. Cart and checkout arrive in the next milestone.</p>
        <Link href="/shop" className="underline text-sm">Back to shop</Link>
      </div>
    </div>
  );
}
