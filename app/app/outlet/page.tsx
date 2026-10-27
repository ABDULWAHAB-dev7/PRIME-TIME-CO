import type { Metadata } from "next";
import { ShopView, type SP } from "@/components/ShopView";

export const metadata: Metadata = { title: "Pre-owned" };

export default async function OutletPage({ searchParams }: { searchParams: Promise<SP> }) {
  return (
    <>
      <div className="mx-auto max-w-[1280px] px-4 pt-10">
        <h1 className="font-display text-4xl">Pre-owned</h1>
        <p className="mt-2 max-w-xl text-ink/70">Each piece is graded, serviced and sold once. Serial numbers are held privately.</p>
      </div>
      <ShopView searchParams={await searchParams} fixed={{ condition: "pre-owned" }} />
    </>
  );
}
