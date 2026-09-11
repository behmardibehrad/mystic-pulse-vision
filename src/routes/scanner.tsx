import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/scanner")({
  head: () => ({
    meta: [
      { title: "The Machine — Mystic Pulse Capital" },
      {
        name: "description",
        content:
          "Live output from the market scanner I built and run myself: what my system is watching right now. Data, not recommendations.",
      },
      { property: "og:title", content: "The Machine — Mystic Pulse Capital" },
    ],
  }),
  component: ScannerPage,
});

const CARDS_BASE = "https://cards.mysticpulsecapital.com";

const SECTOR_NAMES: Record<string, string> = {
  SPY: "S&P 500", QQQ: "Nasdaq 100", IWM: "Russell 2000", DIA: "Dow",
  XLE: "Energy", XLK: "Tech", XLF: "Financials", XLV: "Health",
  XLI: "Industrials", XLY: "Discretionary", XLP: "Staples",
  XLU: "Utilities", XLB: "Materials", XLRE: "Real Estate", SMH: "Semis",
};

type Ctx = { price: number; change_pct: number };
type Candidate = {
  symbol: string; price: number; change_pct: number; volume_ratio: number;
  score?: number;
  technicals?: { atr_pct?: number; pct_from_20d_high?: number; "50d_ma"?: number };
};
type Pub = {
  scan_time_local: string; universe_size: number; candidates_count: number;
  market_context: Record<string, Ctx>; candidates: Candidate[];
};

const chg = (v: number) => `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
const tone = (v: number) => (v >= 0 ? "text-bull" : "text-bear");

function ScannerPage() {
  const [data, setData] = useState<Pub | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = () =>
      fetch(`${CARDS_BASE}/scanner_public.json`)
        .then((r) => r.json())
        .then(setData)
        .catch(() => setError(true));
    load();
    const t = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  const scanned = data
    ? new Date(data.scan_time_local).toLocaleString("en-US", {
        weekday: "short", month: "short", day: "numeric",
        hour: "numeric", minute: "2-digit",
      }) + " ET"
    : "";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pb-24">
        <section className="pt-16 text-center sm:pt-20">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">The Machine</p>
          <h1 className="mt-6 font-display text-3xl leading-tight tracking-wide text-foreground sm:text-5xl">
            What my machine is watching.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Live output from the scanner I built and run myself — a {data?.universe_size ?? "~1,400"}-name
            universe screened for unusual price and volume. This is raw machine output.{" "}
            <span className="text-foreground">It is not a recommendation to buy or sell anything.</span>
          </p>
          {data && (
            <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
              Last scan: {scanned} · {data.candidates_count} names flagged
            </p>
          )}
        </section>

        {error && (
          <p className="mt-16 text-center text-muted-foreground">
            Scanner feed temporarily unavailable.
          </p>
        )}

        {data && (
          <>
            <section className="mt-14">
              <h2 className="font-display text-xl tracking-wide text-foreground">Market context</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {Object.entries(data.market_context).map(([sym, c]) => (
                  <div key={sym}
                       className={`rounded-lg border bg-card/50 p-3 text-center ${c.change_pct >= 0 ? "border-bull/40" : "border-bear/40"}`}>
                    <p className="text-sm font-bold text-foreground">{sym}</p>
                    <p className="text-[11px] text-muted-foreground">{SECTOR_NAMES[sym] ?? ""}</p>
                    <p className={`mt-1 text-sm font-bold ${tone(c.change_pct)}`}>{chg(c.change_pct)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-14">
              <h2 className="font-display text-xl tracking-wide text-foreground">
                Currently flagged
              </h2>
              <div className="mt-5 overflow-x-auto rounded-lg border border-border/60">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead className="bg-card/60">
                    <tr>
                      {["Symbol", "Price", "Change", "Vol ×", "ATR %", "vs 20d High", "Score"].map((h, i) => (
                        <th key={h}
                            className={`px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground ${i === 0 ? "text-left" : "text-right"}`}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.candidates.map((c) => (
                      <tr key={c.symbol} className="border-t border-border/40">
                        <td className="px-4 py-3 font-bold text-foreground">{c.symbol}</td>
                        <td className="px-4 py-3 text-right text-muted-foreground">${c.price.toFixed(2)}</td>
                        <td className={`px-4 py-3 text-right font-medium ${tone(c.change_pct)}`}>{chg(c.change_pct)}</td>
                        <td className="px-4 py-3 text-right text-foreground">{c.volume_ratio.toFixed(1)}×</td>
                        <td className="px-4 py-3 text-right text-muted-foreground">
                          {c.technicals?.atr_pct != null ? `${c.technicals.atr_pct.toFixed(1)}%` : "—"}
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">
                          {c.technicals?.pct_from_20d_high != null ? chg(c.technicals.pct_from_20d_high) : "—"}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-foreground">
                          {c.score != null ? c.score.toFixed(1) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Unusual movement is just that — movement. Names appear here because of price and volume
                math, not because anyone thinks you should trade them. Scanner runs every 30 minutes
                during market hours. Every win. Every loss. Zero illusions.
              </p>
            </section>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
