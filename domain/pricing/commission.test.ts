import { describe, expect, it } from "vitest";
import { calculateCommission, DEFAULT_FEE_CONFIG } from "./commission";

describe("calculateCommission", () => {
  it.each([
    [35_000, 3_500, 0, 31_500],
    [120_000, 8_400, 200, 111_400],
    [450_000, 22_500, 200, 427_300],
    [1_500_000, 60_000, 500, 1_439_500],
  ])("worked example %i", (price, commission, fee, payout) => {
    const cfg = { ...DEFAULT_FEE_CONFIG, payoutFee: fee };
    const r = calculateCommission(price, cfg);
    expect(r.commission).toBe(commission);
    expect(r.payout).toBe(payout);
  });

  it("picks the right band at every boundary", () => {
    const rate = (p: number) => calculateCommission(p).rateBp;
    expect(rate(50_000)).toBe(1000);
    expect(rate(50_001)).toBe(700);
    expect(rate(200_000)).toBe(700);
    expect(rate(200_001)).toBe(500);
    expect(rate(1_000_000)).toBe(500);
    expect(rate(1_000_001)).toBe(400);
  });

  it("applies the minimum fee floor", () => {
    expect(calculateCommission(5_000).commission).toBe(1_000);
  });

  it("caps commission at the price", () => {
    const r = calculateCommission(500);
    expect(r.commission).toBe(500);
    expect(r.payout).toBe(0);
    expect(r.commission + r.payoutFee + r.payout).toBe(500);
  });

  it("rounds half up", () => {
    const cfg = { bands: [{ upTo: Infinity, rateBp: 1000, minFee: 0 }], payoutFee: 0 };
    expect(calculateCommission(25, cfg).commission).toBe(3);
  });

  it.each([0, -1, 10.5, NaN])("rejects invalid price %s", (p) => {
    expect(() => calculateCommission(p)).toThrow("INVALID_PRICE");
  });

  it("split always sums to the price (1000 random prices)", () => {
    for (let i = 0; i < 1000; i++) {
      const price = 1 + Math.floor(Math.random() * 3_000_000);
      const r = calculateCommission(price);
      expect(r.commission + r.payoutFee + r.payout).toBe(price);
      expect(r.payout).toBeGreaterThanOrEqual(0);
    }
  });
});
