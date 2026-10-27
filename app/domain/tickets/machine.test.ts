import { describe, expect, it } from "vitest";
import { allowedTransitions, canTransition, isTerminal, TICKET_STATUSES } from "./machine";

describe("ticket machine", () => {
  it("rejects RECEIVED -> IN_REPAIR", () => {
    expect(canTransition("RECEIVED", "IN_REPAIR", { staffRole: true }).ok).toBe(false);
  });

  it("rejects QUOTE_SENT -> IN_REPAIR without approval", () => {
    expect(canTransition("QUOTE_SENT", "IN_REPAIR").ok).toBe(false);
  });

  it("requires a staff role to diagnose", () => {
    expect(canTransition("RECEIVED", "DIAGNOSED")).toEqual({ ok: false, reason: "STAFF_ROLE_REQUIRED" });
    expect(canTransition("RECEIVED", "DIAGNOSED", { staffRole: true }).ok).toBe(true);
  });

  it("requires a quote line item to send a quote", () => {
    expect(canTransition("DIAGNOSED", "QUOTE_SENT").ok).toBe(false);
    expect(canTransition("DIAGNOSED", "QUOTE_SENT", { quoteLineItems: 1 }).ok).toBe(true);
  });

  it("requires a QC note before READY", () => {
    expect(canTransition("QC", "READY", { qcNote: "  " }).ok).toBe(false);
    expect(canTransition("QC", "READY", { qcNote: "Rate +2s/day" }).ok).toBe(true);
  });

  it("terminal states reject everything", () => {
    for (const t of ["COLLECTED", "RETURNED", "CANCELLED"] as const) {
      expect(isTerminal(t)).toBe(true);
      for (const to of TICKET_STATUSES) expect(canTransition(t, to, { staffRole: true, quoteLineItems: 1, qcNote: "x" }).ok).toBe(false);
    }
  });

  it("a declined quote can only be returned (no charge path)", () => {
    expect(allowedTransitions("DECLINED")).toEqual(["RETURNED"]);
  });
});
