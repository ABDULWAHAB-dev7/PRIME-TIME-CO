export type FeeBand = { upTo: number; rateBp: number; minFee: number };
export type FeeConfig = { bands: FeeBand[]; payoutFee: number };

export const DEFAULT_FEE_CONFIG: FeeConfig = {
  bands: [
    { upTo: 50_000, rateBp: 1000, minFee: 1_000 },
    { upTo: 200_000, rateBp: 700, minFee: 3_500 },
    { upTo: 1_000_000, rateBp: 500, minFee: 10_000 },
    { upTo: Number.POSITIVE_INFINITY, rateBp: 400, minFee: 20_000 },
  ],
  payoutFee: 200,
};

export function calculateCommission(priceMinor: number, cfg: FeeConfig = DEFAULT_FEE_CONFIG) {
  if (!Number.isInteger(priceMinor) || priceMinor <= 0) throw new Error("INVALID_PRICE");
  const band = cfg.bands.find((b) => priceMinor <= b.upTo) ?? cfg.bands[cfg.bands.length - 1];
  const raw = Math.round((priceMinor * band.rateBp) / 10_000);
  const commission = Math.min(Math.max(raw, band.minFee), priceMinor);
  const payoutFee = Math.min(cfg.payoutFee, priceMinor - commission);
  const payout = priceMinor - commission - payoutFee;
  return { rateBp: band.rateBp, commission, payoutFee, payout };
}
