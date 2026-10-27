import { describe, expect, it } from "vitest";
import { cartTotal } from "./totals";
import { formatNumber } from "../tickets/numbering";

describe("cartTotal", () => {
  it("sums integer minor units", () => {
    expect(cartTotal([{ unitPriceMinor: 1000, quantity: 2 }, { unitPriceMinor: 550, quantity: 1 }])).toBe(2550);
  });
  it("caps single-unit (pre-owned) items at quantity 1", () => {
    expect(cartTotal([{ unitPriceMinor: 80_000, quantity: 3, singleUnit: true }])).toBe(80_000);
  });
  it("rejects floats and bad quantities", () => {
    expect(() => cartTotal([{ unitPriceMinor: 10.5, quantity: 1 }])).toThrow();
    expect(() => cartTotal([{ unitPriceMinor: 10, quantity: 0 }])).toThrow();
  });
});

describe("formatNumber", () => {
  it("formats per-year sequence numbers", () => {
    expect(formatNumber("WCH", 2026, 1)).toBe("WCH-2026-0001");
    expect(formatNumber("LST", 2026, 123)).toBe("LST-2026-0123");
  });
});
