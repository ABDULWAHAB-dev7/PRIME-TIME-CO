import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { formatPrice } from "@/lib/format";
import { SITE } from "@/lib/config";

export const metadata: Metadata = { title: "Repairs" };

const STEPS = ["Book online with photos", "We diagnose and send a quote", "You approve or decline", "Track it until it is ready"];

export default function RepairsPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 grid gap-10">
      <header className="grid gap-3">
        <h1 className="font-display text-4xl">Repair workshop</h1>
        <p className="max-w-2xl text-ink/80">Prices are indicative until we diagnose your watch. Nothing chargeable happens until you approve the quote, and our work carries a {SITE.warrantyDays}-day warranty.</p>
        <div><Link href="/repairs/book" className="inline-block bg-ink text-paper px-6 py-3 min-h-11">Book a repair</Link></div>
      </header>
      <section aria-labelledby="services">
        <h2 id="services" className="font-display text-2xl mb-4">Services</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <li key={s.id} className="border border-ink/15 bg-white p-4 grid gap-1">
              <h3 className="font-display text-lg">{s.name}</h3>
              <p className="text-sm text-ink/70">{s.blurb}</p>
              <p className="price mt-2 font-medium">{formatPrice(s.fromMinor)} - {formatPrice(s.toMinor)}</p>
              <p className="text-sm">{s.turnaround}</p>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="how">
        <h2 id="how" className="font-display text-2xl mb-4">How it works</h2>
        <ol className="grid gap-3 sm:grid-cols-4 list-decimal pl-5">
          {STEPS.map((s) => <li key={s}>{s}</li>)}
        </ol>
      </section>
    </div>
  );
}
