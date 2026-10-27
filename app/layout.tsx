import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import { SITE } from "@/lib/config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  title: { default: `${SITE.name} | Watches, clocks and repairs`, template: `%s | ${SITE.name}` },
  description: SITE.tagline,
};

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/outlet", label: "Pre-owned" },
  { href: "/repairs", label: "Repairs" },
  { href: "/repairs/track", label: "Track a repair" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:bg-ink focus:text-paper focus:p-3">
          Skip to content
        </a>
        <header className="bg-ink text-paper">
          <div className="mx-auto max-w-[1280px] px-4 py-4 flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="font-display text-2xl tracking-wide">{SITE.name}</Link>
            <nav aria-label="Main" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="py-2 hover:text-bronze">{n.label}</Link>
              ))}
            </nav>
          </div>
        </header>
        <main id="main" className="flex-1">{children}</main>
        <footer className="bg-ink text-paper/70 text-sm">
          <div className="mx-auto max-w-[1280px] px-4 py-8 grid gap-2">
            <p className="font-display text-paper text-lg">{SITE.name}</p>
            <p>New and pre-owned watches, clocks, and a repair workshop with {SITE.warrantyDays}-day warranty on work performed.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
