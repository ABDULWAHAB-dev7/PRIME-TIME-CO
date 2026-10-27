import type { Metadata } from "next";
import { ShopView, type SP } from "@/components/ShopView";

export const metadata: Metadata = { title: "Shop" };

export default async function ShopPage({ searchParams }: { searchParams: Promise<SP> }) {
  return (
    <>
      <div className="mx-auto max-w-[1280px] px-4 pt-10"><h1 className="font-display text-4xl">Shop</h1></div>
      <ShopView searchParams={await searchParams} />
    </>
  );
}
