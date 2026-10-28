export type Movement = "automatic" | "quartz" | "manual" | "solar";
export type Condition = "new" | "pre-owned";
export type Gender = "men" | "women" | "unisex";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  movement: Movement;
  condition: Condition;
  grade?: "A" | "B" | "C";
  conditionReport?: string;
  gender: Gender;
  caseMm: number;
  strap: string;
  priceMinor: number;
  stock: number;
  category: "watch" | "clock";
  description: string;
};

const p = (x: Product) => x;

export const PRODUCTS: Product[] = [
  p({ slug: "seiko-5-sports-srpd", name: "5 Sports SRPD", brand: "Seiko", movement: "automatic", condition: "new", gender: "men", caseMm: 40, strap: "Steel bracelet", priceMinor: 62_000, stock: 5, category: "watch", description: "Everyday automatic with day-date and a 41-hour power reserve." }),
  p({ slug: "casio-gshock-dw5600", name: "G-Shock DW-5600", brand: "Casio", movement: "quartz", condition: "new", gender: "unisex", caseMm: 43, strap: "Resin", priceMinor: 28_500, stock: 12, category: "watch", description: "The square classic. Shock resistant, 200 m water resistance." }),
  p({ slug: "casio-gshock-octagon-yellow", name: "G-Shock Octagon Yellow", brand: "Casio", movement: "quartz", condition: "new", gender: "men", caseMm: 45, strap: "Resin", priceMinor: 34_000, stock: 6, category: "watch", description: "Slim octagonal G-Shock in bright yellow with analog-digital display." }),
  p({ slug: "casio-gshock-octagon-black", name: "G-Shock Octagon Black", brand: "Casio", movement: "quartz", condition: "new", gender: "men", caseMm: 45, strap: "Resin", priceMinor: 32_000, stock: 8, category: "watch", description: "All-black octagonal G-Shock that goes with everything." }),
  p({ slug: "casio-gshock-octagon-purple", name: "G-Shock Octagon Purple", brand: "Casio", movement: "quartz", condition: "new", gender: "unisex", caseMm: 45, strap: "Resin", priceMinor: 34_000, stock: 4, category: "watch", description: "Bold purple colourway of the slim octagonal G-Shock." }),
  p({ slug: "casio-gshock-red", name: "G-Shock Red", brand: "Casio", movement: "quartz", condition: "new", gender: "men", caseMm: 53, strap: "Resin", priceMinor: 38_000, stock: 3, category: "watch", description: "Large-case G-Shock in red with analog-digital display." }),
  p({ slug: "casio-gshock-steel-blue", name: "G-Shock Steel Blue", brand: "Casio", movement: "quartz", condition: "new", gender: "men", caseMm: 44, strap: "Steel bracelet", priceMinor: 55_000, stock: 2, category: "watch", description: "Metal-covered G-Shock with a steel bracelet and blue dial accents." }),
  p({ slug: "casio-vintage-digital-steel", name: "Vintage Digital Steel", brand: "Casio", movement: "quartz", condition: "new", gender: "unisex", caseMm: 33, strap: "Steel bracelet", priceMinor: 9_500, stock: 10, category: "watch", description: "Retro digital with alarm and stopwatch on a steel bracelet." }),
  p({ slug: "casio-vintage-digital-silver", name: "Vintage Digital Silver", brand: "Casio", movement: "quartz", condition: "new", gender: "unisex", caseMm: 33, strap: "Steel bracelet", priceMinor: 10_500, stock: 10, category: "watch", description: "Silver-tone retro digital with illuminator backlight." }),
  p({ slug: "casio-vintage-digital-gold", name: "Vintage Digital Gold-tone", brand: "Casio", movement: "quartz", condition: "new", gender: "unisex", caseMm: 33, strap: "Steel bracelet", priceMinor: 12_000, stock: 6, category: "watch", description: "Gold-tone retro digital with a warm vintage look." }),
  p({ slug: "casio-digital-black-resin", name: "Black Digital Resin", brand: "Casio", movement: "quartz", condition: "new", gender: "men", caseMm: 44, strap: "Resin", priceMinor: 7_500, stock: 12, category: "watch", description: "Lightweight black digital with a resin strap for everyday wear." }),
  p({ slug: "citizen-ecodrive-bm", name: "Eco-Drive BM8180", brand: "Citizen", movement: "solar", condition: "new", gender: "men", caseMm: 42, strap: "Canvas", priceMinor: 54_000, stock: 4, category: "watch", description: "Light-powered field watch that never needs a battery." }),
  p({ slug: "orient-bambino-v4", name: "Bambino Gen 4", brand: "Orient", movement: "automatic", condition: "new", gender: "men", caseMm: 40.5, strap: "Leather", priceMinor: 48_000, stock: 3, category: "watch", description: "Dress automatic with a domed crystal and open heart." }),
  p({ slug: "tissot-prx-35", name: "PRX 35 mm", brand: "Tissot", movement: "quartz", condition: "new", gender: "women", caseMm: 35, strap: "Steel bracelet", priceMinor: 118_000, stock: 2, category: "watch", description: "70s-inspired integrated bracelet in a compact case." }),
  p({ slug: "hamilton-khaki-field", name: "Khaki Field Mechanical", brand: "Hamilton", movement: "manual", condition: "new", gender: "men", caseMm: 38, strap: "NATO", priceMinor: 165_000, stock: 2, category: "watch", description: "Hand-wound military heritage with an 80-hour reserve." }),
  p({ slug: "tissot-le-locle-pre", name: "Le Locle Powermatic 80", brand: "Tissot", movement: "automatic", condition: "pre-owned", grade: "A", conditionReport: "Near mint. Faint hairlines on clasp. Serviced 2026, 90-day shop warranty.", gender: "men", caseMm: 39, strap: "Leather", priceMinor: 79_000, stock: 1, category: "watch", description: "Classic dress watch, one owner, box and papers." }),
  p({ slug: "seiko-presage-pre", name: "Presage Cocktail Time", brand: "Seiko", movement: "automatic", condition: "pre-owned", grade: "B", conditionReport: "Light wear on case flanks. Crystal clean. Keeps +4 s/day.", gender: "men", caseMm: 40.5, strap: "Leather", priceMinor: 58_000, stock: 1, category: "watch", description: "Sunburst dial with the famous cocktail finish." }),
  p({ slug: "citizen-promaster-pre", name: "Promaster Diver", brand: "Citizen", movement: "quartz", condition: "pre-owned", grade: "B", conditionReport: "Bezel shows normal use. New battery fitted.", gender: "men", caseMm: 44, strap: "Rubber", priceMinor: 36_000, stock: 1, category: "watch", description: "200 m diver, unfussy and tough." }),
  p({ slug: "rado-centrix-pre", name: "Centrix Automatic", brand: "Rado", movement: "automatic", condition: "pre-owned", grade: "A", conditionReport: "Ceramic bezel unmarked. Full service history.", gender: "women", caseMm: 30.5, strap: "Steel bracelet", priceMinor: 210_000, stock: 1, category: "watch", description: "Scratch-resistant ceramic in a slim ladies' case." }),
  p({ slug: "seiko-wall-clock", name: "Quartz Wall Clock QXA", brand: "Seiko", movement: "quartz", condition: "new", gender: "unisex", caseMm: 300, strap: "n/a", priceMinor: 9_500, stock: 8, category: "clock", description: "Silent sweep movement, 30 cm wooden frame." }),
  p({ slug: "carriage-clock-brass", name: "Brass Carriage Clock", brand: "Bulova", movement: "quartz", condition: "new", gender: "unisex", caseMm: 120, strap: "n/a", priceMinor: 18_000, stock: 3, category: "clock", description: "Traditional brass case with beveled glass and chime." }),
];

export const BRANDS = Array.from(new Set(PRODUCTS.map((x) => x.brand))).sort();

export type ProductFilters = {
  brand?: string;
  movement?: string;
  condition?: string;
  gender?: string;
  category?: string;
  min?: number;
  max?: number;
  sort?: "price-asc" | "price-desc" | "name";
};

export function findProducts(f: ProductFilters) {
  const list = PRODUCTS.filter(
    (x) =>
      (!f.brand || x.brand === f.brand) &&
      (!f.movement || x.movement === f.movement) &&
      (!f.condition || x.condition === f.condition) &&
      (!f.gender || x.gender === f.gender) &&
      (!f.category || x.category === f.category) &&
      (f.min === undefined || x.priceMinor >= f.min) &&
      (f.max === undefined || x.priceMinor <= f.max),
  );
  if (f.sort === "price-asc") list.sort((a, b) => a.priceMinor - b.priceMinor);
  else if (f.sort === "price-desc") list.sort((a, b) => b.priceMinor - a.priceMinor);
  else list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

export const getProduct = (slug: string) => PRODUCTS.find((x) => x.slug === slug);
