import type { Metadata } from "next";
import { BookingWizard } from "@/components/BookingWizard";

export const metadata: Metadata = { title: "Book a repair" };

export default function BookPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 grid gap-6">
      <h1 className="font-display text-4xl">Book a repair</h1>
      <BookingWizard />
    </div>
  );
}
