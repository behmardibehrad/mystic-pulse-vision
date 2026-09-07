import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import wordmark from "@/assets/mpc-wordmark.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/record", label: "The Record" },
  { to: "/brokers", label: "Brokers" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:flex sm:justify-between sm:gap-6">
        <Link
          to="/"
          className="block min-w-0 shrink-0 overflow-visible" style={{ width: "min(16rem, 60vw)" }}
          aria-label="Mystic Pulse Capital home"
        >
          <img
            src={wordmark}
            alt="Mystic Pulse Capital — Every win. Every loss. Zero illusions."
            className="block h-auto w-full object-contain object-center"
          />
        </Link>

        <nav className="hidden items-center gap-7 sm:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "!text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 rounded-md border border-border p-2 text-foreground sm:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border/60 px-4 pb-4 pt-2 sm:hidden">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "!text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg tracking-[0.2em] text-foreground">MYSTIC PULSE CAPITAL</p>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="text-bull">Every win.</span> <span className="text-bear">Every loss.</span> Zero
              illusions.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {[...NAV, { to: "/privacy", label: "Privacy" }, { to: "/terms", label: "Terms" }].map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-10 border-t border-border/60 pt-6 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Risk disclaimer:</strong> Mystic Pulse Capital publishes educational
          and informational content only. Nothing on this site is financial, investment, tax, or legal advice, and no
          content constitutes a recommendation to buy or sell any instrument. Trading foreign exchange, derivatives,
          and other leveraged products carries a high level of risk and can result in the loss of all deposited funds.
          Past performance is never a guarantee of future results. You alone are responsible for your decisions.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          <strong className="text-foreground">Affiliate disclosure:</strong> Some outbound links to brokers and tools
          may be affiliate links. If you open an account through them we may earn a commission at no additional cost
          to you. This never changes our assessments or the order in which providers appear.
        </p>
        <p className="mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mystic Pulse Capital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-16">
      <h1 className="font-display text-3xl tracking-wide text-foreground sm:text-4xl">{title}</h1>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>}
      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </main>
  );
}
