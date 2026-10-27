export type CartLine = { unitPriceMinor: number; quantity: number; singleUnit?: boolean };

export function cartTotal(lines: CartLine[]) {
  return lines.reduce((sum, l) => {
    if (!Number.isInteger(l.unitPriceMinor) || l.unitPriceMinor < 0) throw new Error("INVALID_PRICE");
    if (!Number.isInteger(l.quantity) || l.quantity < 1) throw new Error("INVALID_QUANTITY");
    const qty = l.singleUnit ? 1 : l.quantity;
    return sum + l.unitPriceMinor * qty;
  }, 0);
}
