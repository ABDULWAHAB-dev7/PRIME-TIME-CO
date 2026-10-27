import type { Metadata } from "next";

export const metadata: Metadata = { title: "Track a repair" };

export default function TrackPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 grid gap-6">
      <h1 className="font-display text-4xl">Track a repair</h1>
      <p>Enter your ticket number and the email or phone you booked with. Live tracking is the next milestone.</p>
      <form className="grid gap-4" aria-label="Find a repair">
        <label className="grid gap-1 text-sm font-medium">Ticket number
          <input name="ticket" placeholder="WCH-2026-0001" className="border border-ink/30 bg-white px-3 py-2 min-h-11 font-normal" />
        </label>
        <label className="grid gap-1 text-sm font-medium">Email or phone
          <input name="contact" className="border border-ink/30 bg-white px-3 py-2 min-h-11 font-normal" />
        </label>
        <button type="button" disabled className="bg-ink text-paper px-5 py-3 min-h-11 opacity-60 justify-self-start">Find my repair</button>
      </form>
    </div>
  );
}
