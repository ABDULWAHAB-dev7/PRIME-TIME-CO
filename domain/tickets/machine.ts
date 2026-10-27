export const TICKET_STATUSES = [
  "RECEIVED", "DIAGNOSED", "QUOTE_SENT", "APPROVED", "DECLINED", "PARTS_ORDERED",
  "IN_REPAIR", "QC", "READY", "COLLECTED", "RETURNED", "CANCELLED",
] as const;
export type TicketStatus = (typeof TICKET_STATUSES)[number];

export type TransitionContext = {
  staffRole?: boolean;
  quoteLineItems?: number;
  qcNote?: string;
};

const TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  RECEIVED: ["DIAGNOSED", "CANCELLED"],
  DIAGNOSED: ["QUOTE_SENT", "CANCELLED"],
  QUOTE_SENT: ["APPROVED", "DECLINED", "CANCELLED"],
  APPROVED: ["PARTS_ORDERED", "IN_REPAIR", "CANCELLED"],
  PARTS_ORDERED: ["IN_REPAIR", "CANCELLED"],
  IN_REPAIR: ["QC", "CANCELLED"],
  QC: ["IN_REPAIR", "READY"],
  READY: ["COLLECTED"],
  DECLINED: ["RETURNED"],
  COLLECTED: [],
  RETURNED: [],
  CANCELLED: [],
};

export type TransitionResult = { ok: true } | { ok: false; reason: string };

export function isTerminal(status: TicketStatus) {
  return TRANSITIONS[status].length === 0;
}

export function allowedTransitions(from: TicketStatus) {
  return TRANSITIONS[from];
}

export function canTransition(from: TicketStatus, to: TicketStatus, ctx: TransitionContext = {}): TransitionResult {
  if (!TRANSITIONS[from].includes(to)) return { ok: false, reason: `ILLEGAL_TRANSITION:${from}->${to}` };
  if (from === "RECEIVED" && to === "DIAGNOSED" && !ctx.staffRole) return { ok: false, reason: "STAFF_ROLE_REQUIRED" };
  if (to === "QUOTE_SENT" && !(ctx.quoteLineItems && ctx.quoteLineItems >= 1)) return { ok: false, reason: "QUOTE_NEEDS_LINE_ITEMS" };
  if (from === "QC" && to === "READY" && !ctx.qcNote?.trim()) return { ok: false, reason: "QC_NOTE_REQUIRED" };
  return { ok: true };
}
