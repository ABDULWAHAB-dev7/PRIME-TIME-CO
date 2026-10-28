export type StrapKind = "bracelet" | "leather" | "rubber" | "nato" | "canvas";
export type Look = { dial: string; metal: string; strap: string; strapKind: StrapKind; shape?: "round" | "square"; date?: boolean; chrono?: boolean };

const GOLD = "#b08d57";
const STEEL = "#c9ccd1";
const BLACK = "#16161a";

export const LOOKS: Record<string, Look> = {
  "seiko-5-sports-srpd": { dial: "#1d3b5c", metal: STEEL, strap: STEEL, strapKind: "bracelet", date: true },
  "casio-gshock-dw5600": { dial: "#2b2b2f", metal: BLACK, strap: BLACK, strapKind: "rubber", shape: "square" },
  "citizen-ecodrive-bm": { dial: "#4b5a3a", metal: STEEL, strap: "#6b6a4c", strapKind: "canvas", date: true },
  "orient-bambino-v4": { dial: "#f1ede2", metal: STEEL, strap: "#5a3a26", strapKind: "leather" },
  "tissot-prx-35": { dial: "#2f6f78", metal: STEEL, strap: STEEL, strapKind: "bracelet", date: true },
  "hamilton-khaki-field": { dial: "#33382c", metal: STEEL, strap: "#7a7355", strapKind: "nato" },
  "tissot-le-locle-pre": { dial: "#ebe6d8", metal: GOLD, strap: "#3a2a1f", strapKind: "leather", date: true },
  "seiko-presage-pre": { dial: "#7a2230", metal: STEEL, strap: "#2e2a26", strapKind: "leather" },
  "citizen-promaster-pre": { dial: "#0f1a2b", metal: STEEL, strap: BLACK, strapKind: "rubber", chrono: true },
  "rado-centrix-pre": { dial: "#e9e4dc", metal: GOLD, strap: GOLD, strapKind: "bracelet" },
  "seiko-wall-clock": { dial: "#f4f0e6", metal: "#6b4a2f", strap: "#6b4a2f", strapKind: "leather" },
  "carriage-clock-brass": { dial: "#f4f0e6", metal: GOLD, strap: GOLD, strapKind: "leather", shape: "square" },
};

export const DEFAULT_LOOK: Look = { dial: "#222", metal: STEEL, strap: BLACK, strapKind: "leather" };

export const lookFor = (slug: string) => LOOKS[slug] ?? DEFAULT_LOOK;
