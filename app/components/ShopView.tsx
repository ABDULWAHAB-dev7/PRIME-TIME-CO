import { BRANDS, findProducts, type ProductFilters } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;
const num = (v: string | undefined) => (v && Number.isFinite(Number(v)) && Number(v) >= 0 ? Number(v) : undefined);

export async function ShopView({ searchParams, fixed }: { searchParams: SP; fixed?: Partial<ProductFilters> }) {
  const f: ProductFilters = {
    brand: one(searchParams.brand),
    movement: one(searchParams.movement),
    condition: one(searchParams.condition),
    gender: one(searchParams.gender),
    category: one(searchParams.category),
    min: num(one(searchParams.min)),
    max: num(one(searchParams.max)),
    sort: one(searchParams.sort) as ProductFilters["sort"],
    ...fixed,
  };
  const results = findProducts(f);
  const select = (name: string, label: string, options: string[], value?: string) => (
    <label className="grid gap-1 text-sm">
      {label}
      <select name={name} defaultValue={value ?? ""} className="border border-ink/30 bg-white px-2 py-2 min-h-11">
        <option value="">All</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 grid gap-8 lg:grid-cols-[240px_1fr]">
      <form method="get" className="grid gap-4 content-start" aria-label="Filters">
        {select("brand", "Brand", BRANDS, f.brand)}
        {select("movement", "Movement", ["automatic", "quartz", "manual", "solar"], f.movement)}
        {!fixed?.condition && select("condition", "Condition", ["new", "pre-owned"], f.condition)}
        {select("gender", "Gender", ["men", "women", "unisex"], f.gender)}
        {select("category", "Type", ["watch", "clock"], f.category)}
        <div className="grid grid-cols-2 gap-2">
          <label className="grid gap-1 text-sm">Min price
            <input name="min" type="number" min={0} defaultValue={f.min} className="border border-ink/30 px-2 py-2 min-h-11" />
          </label>
          <label className="grid gap-1 text-sm">Max price
            <input name="max" type="number" min={0} defaultValue={f.max} className="border border-ink/30 px-2 py-2 min-h-11" />
          </label>
        </div>
        <label className="grid gap-1 text-sm">Sort
          <select name="sort" defaultValue={f.sort ?? ""} className="border border-ink/30 bg-white px-2 py-2 min-h-11">
            <option value="">Name</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
          </select>
        </label>
        <button className="bg-ink text-paper px-4 py-3 min-h-11">Apply filters</button>
      </form>
      <section aria-live="polite">
        <p className="mb-4 text-sm text-ink/70">{results.length} {results.length === 1 ? "result" : "results"}</p>
        {results.length === 0 ? (
          <p className="border border-dashed border-ink/30 p-8 text-center">No watches match those filters. Try widening your price range.</p>
        ) : (
          <ul className="grid gap-4 grid-cols-2 xl:grid-cols-3">
            {results.map((p) => <ProductCard key={p.slug} product={p} />)}
          </ul>
        )}
      </section>
    </div>
  );
}


