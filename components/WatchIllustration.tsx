import { useId } from "react";
import type { Look } from "@/lib/looks";

function ink(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.55 ? "#1a1a1a" : "#f3efe6";
}

function Strap({ look, uid }: { look: Look; uid: string }) {
  const { strap, strapKind } = look;
  const link = (y: number) => <rect key={y} x="76" y={y} width="48" height="9" rx="2" fill={`url(#${uid}-metal)`} stroke="#0003" strokeWidth=".6" />;
  if (strapKind === "bracelet") {
    return <g>{[2, 12, 22, 32, 42].map(link)}{[158, 168, 178, 188, 198].map(link)}</g>;
  }
  const stripes = strapKind === "nato" || strapKind === "canvas";
  return (
    <g>
      <rect x="78" y="0" width="44" height="64" fill={strap} />
      <rect x="78" y="136" width="44" height="64" fill={strap} />
      {stripes && [86, 100, 114].map((x) => <rect key={x} x={x} y="0" width="3" height="200" fill="#0003" />)}
      {strapKind === "leather" && [10, 22, 34, 46, 160, 172, 184].map((y) => <rect key={y} x="80" y={y} width="1.4" height="6" fill="#fff4" />)}
      {strapKind === "rubber" && [14, 26, 38, 50, 150, 162, 174, 186].map((y) => <rect key={y} x="84" y={y} width="32" height="2" rx="1" fill="#fff2" />)}
    </g>
  );
}

function Hands({ color }: { color: string }) {
  return (
    <g stroke={color} strokeLinecap="round">
      <line x1="100" y1="100" x2="84" y2="88" strokeWidth="3.2" />
      <line x1="100" y1="100" x2="118" y2="62" strokeWidth="2.2" />
      <line x1="100" y1="108" x2="104" y2="70" strokeWidth=".8" stroke="#c0392b" />
      <circle cx="100" cy="100" r="2.4" fill={color} stroke="none" />
    </g>
  );
}

function Face({ look, r, c }: { look: Look; r: number; c: string }) {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    const major = i % 3 === 0;
    const r1 = r - 3, r2 = r - (major ? 10 : 7);
    return <line key={i} x1={100 + r1 * Math.sin(a)} y1={100 - r1 * Math.cos(a)} x2={100 + r2 * Math.sin(a)} y2={100 - r2 * Math.cos(a)} stroke={c} strokeWidth={major ? 2.4 : 1.2} />;
  });
  return (
    <g>
      {ticks}
      {look.date && <g><rect x={100 + r - 26} y="96" width="14" height="9" fill="#fff" stroke={c} strokeWidth=".6" /><text x={100 + r - 19} y="103" fontSize="7" textAnchor="middle" fill="#111">14</text></g>}
      {look.chrono && [[100, 78], [100, 122], [78, 100]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="9" fill="none" stroke={c} strokeWidth=".8" />)}
    </g>
  );
}

export function WatchIllustration({ look, category, slug }: { look: Look; category: "watch" | "clock"; slug: string }) {
  const uid = useId().replace(/:/g, "");
  const c = ink(look.dial);
  const defs = (
    <defs>
      <linearGradient id={`${uid}-metal`} x1="0" x2="1">
        <stop offset="0" stopColor={look.metal} /><stop offset=".5" stopColor="#fff" stopOpacity=".7" /><stop offset="1" stopColor={look.metal} />
      </linearGradient>
      <radialGradient id={`${uid}-dial`} cx=".35" cy=".3" r=".9">
        <stop offset="0" stopColor="#fff" stopOpacity=".28" /><stop offset="1" stopColor="#000" stopOpacity=".18" />
      </radialGradient>
    </defs>
  );
  const bg = <rect width="200" height="200" fill="#ece8df" />;

  if (category === "clock") {
    const arch = look.shape === "square";
    return (
      <svg viewBox="0 0 200 200" role="img" aria-label={`Illustration of ${slug.replace(/-/g, " ")}`} className="w-full h-full">
        {defs}{bg}
        {arch ? <rect x="46" y="38" width="108" height="130" rx="10" fill={`url(#${uid}-metal)`} stroke="#0003" /> : <circle cx="100" cy="100" r="74" fill={look.metal} stroke="#0003" strokeWidth="2" />}
        <circle cx="100" cy="100" r={arch ? 44 : 62} fill={look.dial} />
        <circle cx="100" cy="100" r={arch ? 44 : 62} fill={`url(#${uid}-dial)`} />
        <Face look={{ ...look, date: false }} r={arch ? 44 : 62} c="#222" />
        <Hands color="#222" />
        {arch && <rect x="40" y="168" width="120" height="10" rx="3" fill={look.metal} />}
      </svg>
    );
  }

  const square = look.shape === "square";
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={`Illustration of ${slug.replace(/-/g, " ")}`} className="w-full h-full">
      {defs}{bg}
      <Strap look={look} uid={uid} />
      <rect x="150" y="94" width="8" height="12" rx="2" fill={look.metal} />
      {square ? <rect x="54" y="54" width="92" height="92" rx="16" fill={look.metal} stroke="#0004" strokeWidth="1.5" /> : <circle cx="100" cy="100" r="50" fill={`url(#${uid}-metal)`} stroke="#0004" strokeWidth="1.5" />}
      {square ? <rect x="62" y="62" width="76" height="76" rx="10" fill={look.dial} /> : <circle cx="100" cy="100" r="42" fill={look.dial} />}
      {square ? <rect x="62" y="62" width="76" height="76" rx="10" fill={`url(#${uid}-dial)`} /> : <circle cx="100" cy="100" r="42" fill={`url(#${uid}-dial)`} />}
      <Face look={look} r={square ? 34 : 40} c={c} />
      <Hands color={c} />
    </svg>
  );
}
