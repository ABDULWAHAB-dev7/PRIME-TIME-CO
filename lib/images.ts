import { existsSync } from "node:fs";
import path from "node:path";

const EXTENSIONS = ["webp", "jpg", "jpeg", "png", "avif", "svg"];

function findImage(dir: "products" | "brands", name: string) {
  for (const ext of EXTENSIONS) {
    if (existsSync(path.join(process.cwd(), "public", dir, `${name}.${ext}`))) return `/${dir}/${name}.${ext}`;
  }
  return null;
}

export const productImage = (slug: string) => findImage("products", slug);

export const brandLogo = (brand: string) =>
  findImage("brands", brand.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
