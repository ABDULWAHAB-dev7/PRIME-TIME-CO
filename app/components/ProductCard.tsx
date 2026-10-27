import Link from "next/link";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <li className="border border-ink/15 bg-white flex flex-col">
      <Link href={`/shop/${product.slug}`} className="flex flex-col h-full">
        <div
          aria-hidden="true"
          className="aspect-square bg-ink text-bronze grid place-items-center font-display text-5xl"
        >
          {product.category === "clock" ? "◷" : "⌚"}
        </div>
        <div className="p-4 flex flex-col gap-1 flex-1">
          <p className="text-xs uppercase tracking-widest text-ink/60">{product.brand}</p>
          <h3 className="font-display text-lg">{product.name}</h3>
          <p className="text-sm text-ink/70 capitalize">
            {product.movement} · {product.condition}
            {product.grade ? ` · Grade ${product.grade}` : ""}
          </p>
          <p className="price mt-auto pt-2 font-medium">{formatPrice(product.priceMinor)}</p>
        </div>
      </Link>
    </li>
  );
}
