export function formatNumber(prefix: "WCH" | "LST" | "ORD", year: number, seq: number) {
  if (!Number.isInteger(seq) || seq < 1) throw new Error("INVALID_SEQUENCE");
  return `${prefix}-${year}-${String(seq).padStart(4, "0")}`;
}
