export type RepairService = {
  id: string;
  name: string;
  fromMinor: number;
  toMinor: number;
  turnaround: string;
  blurb: string;
};

export const SERVICES: RepairService[] = [
  { id: "battery", name: "Battery replacement", fromMinor: 800, toMinor: 2_500, turnaround: "Same day", blurb: "Fresh battery, seal check and pressure test where fitted." },
  { id: "strap", name: "Strap or bracelet fitting", fromMinor: 500, toMinor: 3_000, turnaround: "Same day", blurb: "Resize links, replace straps and spring bars." },
  { id: "glass", name: "Crystal replacement", fromMinor: 2_000, toMinor: 12_000, turnaround: "2-4 days", blurb: "Mineral, sapphire or acrylic crystals cut to fit." },
  { id: "service", name: "Mechanical service", fromMinor: 8_000, toMinor: 30_000, turnaround: "2-3 weeks", blurb: "Full strip, clean, oil, regulate and timing report." },
  { id: "quartz", name: "Quartz movement repair", fromMinor: 3_000, toMinor: 10_000, turnaround: "1-2 weeks", blurb: "Circuit, stepper and gear train diagnosis and repair." },
  { id: "water", name: "Water resistance test", fromMinor: 1_000, toMinor: 4_000, turnaround: "1-2 days", blurb: "Gasket replacement and pressure testing." },
  { id: "clock", name: "Clock repair", fromMinor: 3_000, toMinor: 20_000, turnaround: "1-3 weeks", blurb: "Wall, mantel and carriage clocks, mechanical and quartz." },
  { id: "unsure", name: "Not sure - diagnose it", fromMinor: 500, toMinor: 1_500, turnaround: "1-2 days", blurb: "Bring it in or post photos; we quote before any work." },
];

export const getService = (id: string) => SERVICES.find((s) => s.id === id);
