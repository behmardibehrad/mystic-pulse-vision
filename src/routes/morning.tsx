import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/morning")({
  head: () => ({
    meta: [
      { title: "Morning Watchlist — Mystic Pulse Capital" },
      {
        name: "description",
        content:
          "Premarket data before the open: top gappers both directions, volume, catalysts. Data only — my picks publish at 11:00 ET.",
      },
      { property: "og:title", content: "Morning Watchlist — Mystic Pulse Capital" },
    ],
  }),
  component: MorningPage,
});

const CARDS_BASE = "https://cards.mysticpulsecapital.com";

type Mover = {
  symbol: string; gap_pct: number; volume_ratio: number; price: number;
  catalyst_tags?: string[]; source?: string;
  pm_high?: number | null; pm_low?: number | null;
  earnings_tag?: string | null; ssr?: boolean;
};
type Feed = {
  date: string; generated_at_utc: string; disclaimer: string;
  econ_header?: string;
  gappers_up: Mover[]; gappers_down: Mover[]; core_movers: Mover[];
};

const etToday = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });

const chg = (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`;
const tone = (v: number) => (v >= 0 ? "text-bull" : "text-bear");

const humanTag = (t: string) => t.replaceAll("_", " ").replaceAll("-", " ");

function pmRange(m: Mover) {
  if (m.pm_low == null || m.pm_high == null) return "—";
  return `${m.pm_low.toFixed(2)}–${m.pm_high.toFixed(2)}`;
}

function MoverTable({ title, rows, accent }: { title: string; rows: Mover[]; accent: string }) {
  if (!rows?.length) return null;
  return (
    <section className="mt-12">
      <h2 className={`font-display text-xl tracking-wide ${accent}`}>{title}</h2>
      <div className="mt-4 overflow-x-auto rounded-lg border border-border/60">
        <table className="w-full min-w-[620px] border-collapse text-sm">
          <thead className="bg-card/60">
            <tr>
              {["Symbol", "Gap", "Vol ×", "Price", "PM Range", "Tags"].map((h, i) => (
                <th key={h}
                    className={`px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground ${i === 0 || i === 5 ? "text-left" : "text-right"}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.symbol} className="border-t border-border/40">
                <td className="px-4 py-2.5 font-bold text-foreground">{m.symbol}</td>
                <td className={`px-4 py-2.5 text-right font-medium ${tone(m.gap_pct)}`}>{chg(m.gap_pct)}</td>
                <td className="px-4 py-2.5 text-right text-foreground">{m.volume_ratio.toFixed(1)}×</td>
                <td className="px-4 py-2.5 text-right text-muted-foreground">${m.price.toFixed(2)}</td>
                <td className="px-4 py-2.5 text-right text-muted-foreground">{pmRange(m)}</td>
                <td className="px-4 py-2.5">
                  <span className="flex flex-wrap gap-1.5">
                    {m.ssr && (
                      <span className="rounded border border-bear/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bear">SSR</span>
                    )}
                    {m.earnings_tag && (
                      <span className="rounded border border-pulse/50 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{humanTag(m.earnings_tag)}</span>
                    )}
                    {(m.catalyst_tags ?? []).map((t) => (
                      <span key={t} className="rounded border border-border/60 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{humanTag(t)}</span>
                    ))}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MorningPage() {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const today = await fetch(`${CARDS_BASE}/feed/premarket-${etToday()}.json`);
        if (today.ok) { setFeed(await today.json()); setMissing(false); return; }
        const idx = await fetch(`${CARDS_BASE}/feed/index.json`).then((r) => r.json());
        const latest = idx?.days?.[0];
        if (!latest) { setMissing(true); return; }
        const prev = await fetch(`${CARDS_BASE}/feed/premarket-${latest}.json`);
        if (prev.ok) { setFeed(await prev.json()); setMissing(false); }
        else setMissing(true);
      } catch { setMissing(true); }
    };
    load();
    const t = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  const isToday = feed?.date === etToday();
  const stamp = feed
    ? new Date(feed.generated_at_utc).toLocaleString("en-US", {
        timeZone: "America/New_York",
        weekday: "short", month: "short", day: "numeric",
        hour: "numeric", minute: "2-digit",
      }) + " ET"
    : "";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pb-24">
        <section className="pt-16 text-center sm:pt-20">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Morning Watchlist</p>
          <h1 className="mt-6 font-display text-3xl leading-tight tracking-wide text-foreground sm:text-5xl">
            What gapped overnight.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Raw premarket data from my scanner, published before the open. Data only —{" "}
            <span className="text-foreground">no picks, no calls, nothing to follow.</span> My own picks
            publish at 11:00 ET on the board, after my trading is done.
          </p>
          {feed && (
            <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
              {isToday ? "" : `Showing ${feed.date} · `}Generated {stamp}
            </p>
          )}
        </section>

        {feed?.econ_header && (
          <div className="mt-10 rounded-lg border border-pulse/40 bg-pulse/10 px-5 py-4 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-foreground">⚠ {feed.econ_header}</p>
          </div>
        )}

        {missing && (
          <p className="mt-16 text-center text-muted-foreground">
            No morning data published yet — the watchlist lands around 8:55 AM ET on trading days.
          </p>
        )}

        {feed && (
          <>
            <MoverTable title="Gapping up" rows={feed.gappers_up} accent="text-bull" />
            <MoverTable title="Gapping down" rows={feed.gappers_down} accent="text-bear" />
            <MoverTable title="Core list & news movers" rows={feed.core_movers} accent="text-foreground" />
            <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
              {feed.disclaimer} Names appear because of price and volume math, not because anyone thinks you
              should trade them. Every win. Every loss. Zero illusions.
            </p>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
