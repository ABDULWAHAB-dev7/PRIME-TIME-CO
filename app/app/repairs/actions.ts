"use server";

import { randomBytes } from "node:crypto";
import { z } from "zod";
import { formatNumber } from "@/domain/tickets/numbering";
import { getService } from "@/data/services";

const bookingSchema = z.object({
  serviceId: z.string().refine((id) => !!getService(id), "Choose a service"),
  watchBrand: z.string().trim().min(1, "Enter the brand").max(80),
  watchModel: z.string().trim().max(80).optional(),
  issue: z.string().trim().min(10, "Describe the problem in at least 10 characters").max(1000),
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().min(7, "Enter a phone number").max(20),
});

export type BookingResult =
  | { ok: true; data: { ticketNo: string; token: string } }
  | { ok: false; error: { code: "VALIDATION"; message: string; fields: Record<string, string> } };

// Placeholder until the database is connected: sequence lives in memory per process.
let sequence = 0;

export async function createRepairTicket(input: unknown): Promise<BookingResult> {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) fields[String(issue.path[0])] ??= issue.message;
    return { ok: false, error: { code: "VALIDATION", message: "Please fix the highlighted fields", fields } };
  }
  sequence += 1;
  return {
    ok: true,
    data: { ticketNo: formatNumber("WCH", new Date().getFullYear(), sequence), token: randomBytes(16).toString("hex") },
  };
}
