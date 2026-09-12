import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/board")({
  head: () => ({
    meta: [
      { title: "The Board — Mystic Pulse Capital" },
      {
        name: "description",
        content:
          "My actual picks, revealed at 11:00 ET after my trading is done — entries, stops, conviction, and results either way.",
      },
      { property: "og:title", content: "The Board — Mystic Pulse Capital" },
    ],
  }),
  component: BoardPage,
});

const CARDS_BASE = "https://cards.mysticpulsecapital.com";

type Result = { r_multiple: number | null; pct: number | null; outcome: string };
type Pick = {
  symbol: string; direction: "long" | "short"; setup?: string;
  catalyst_tags?: string[]; conviction?: number | null;
  entry_zone?: [number, number] | null; stop?: number | null;
  target?: number | null; target2?: number | null; rr?: number | null;
  days_from_earnings?: number | null; ssr?: boolean;
  status: "closed" | "still_holding" | "not_taken";
  result?: Result;
};
type Ctx = {
  vix?: number; vix_regime?: string; spy_premarket_pct?: number;
  days_to_fomc?: number | null; days_to_cpi?: number | null;
};
type Rating = {
  symbol: string; direction: "BUY" | "SELL"; conviction: number;
  tier?: string; reasons?: string[]; scored_at?: string;
  bull_share_90d_pct?: number | null;
};
type RatingsMeta = {
  scored_today_total?: number; published?: number;
  baseline_bull_share_pct?: number; label?: string; note?: string;
  performance?: { window_days?: number; strong_hit_rate_pct?: number; resolved?: number } | null;
};
type Board = {
  date: string; generated_at_utc: string; disclaimer: string;
  decided_at_utc?: string | null;
  market_context?: Ctx;
  picks: Pick[];
  watch?: { symbol: string; score?: number; note?: string }[];
  news_ratings?: Rating[];
  news_ratings_meta?: RatingsMeta;
  note?: string;
};

const etToday = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
const etHour = () =>
  Number(new Date().toLocaleString("en-US", { timeZone: "America/New_York", hour: "numeric", hour12: false }));

const num = (v: number | null | undefined, d = 2) => (v == null ? "—" : v.toFixed(d));
const human = (t: string) => t.replaceAll("_", " ").replaceAll("-", " ");

const REGIME_TONE: Record<string, string> = {
  low: "text-bull", mid: "text-foreground", high: "text-pulse", extreme: "text-bear",
};

function PickCard({ p, rating }: { p: Pick; rating?: Rating }) {
  const long = p.direction === "long";
  const res = p.result;
  return (
    <article className="rounded-lg border border-border/60 bg-card/50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-wide text-foreground">{p.symbol}</span>
          <span className={`rounded border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${long ? "border-bull/60 text-bull" : "border-bear/60 text-bear"}`}>
            {p.direction}
          </span>
          {p.ssr && (
            <span className="rounded border border-bear/60 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-bear">SSR</span>
          )}
        </div>
        <span className="flex items-center gap-4 text-sm text-muted-foreground">
          {rating && (
            <span>
              AI scorer{" "}
              <span className={`font-bold ${rating.direction === "BUY" ? "text-bull" : "text-bear"}`}>
                {rating.direction} {rating.conviction}/10
              </span>
            </span>
          )}
          {p.conviction != null && (
            <span>
              conviction <span className="font-bold text-foreground">{p.conviction}/10</span>
            </span>
          )}
        </span>
      </div>

      <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
        {[p.setup && human(p.setup), ...(p.catalyst_tags ?? []).map(human)].filter(Boolean).join(" · ")}
        {p.days_from_earnings != null && (
          <> · earnings {p.days_from_earnings === 0 ? "today" : p.days_from_earnings < 0 ? `${-p.days_from_earnings}d ago` : `in ${p.days_from_earnings}d`}</>
        )}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-5">
        <div><p className="text-[11px] uppercase tracking-widest text-muted-foreground">Entry</p>
          <p className="mt-1 font-medium text-foreground">
            {p.entry_zone ? (p.entry_zone[0] === p.entry_zone[1] ? num(p.entry_zone[0]) : `${num(p.entry_zone[0])}–${num(p.entry_zone[1])}`) : "—"}
          </p></div>
        <div><p className="text-[11px] uppercase tracking-widest text-muted-foreground">Stop</p>
          <p className="mt-1 font-medium text-foreground">{num(p.stop)}</p></div>
        <div><p className="text-[11px] uppercase tracking-widest text-muted-foreground">Target 1</p>
          <p className="mt-1 font-medium text-foreground">{num(p.target)}</p></div>
        <div><p className="text-[11px] uppercase tracking-widest text-muted-foreground">Target 2</p>
          <p className="mt-1 font-medium text-foreground">{num(p.target2)}</p></div>
        <div><p className="text-[11px] uppercase tracking-widest text-muted-foreground">R : R</p>
          <p className="mt-1 font-medium text-foreground">{p.rr != null ? p.rr.toFixed(1) : "—"}</p></div>
      </div>

      <div className="mt-4">
        {p.status === "still_holding" && (
          <p className="rounded-md border border-pulse/60 bg-pulse/10 px-3 py-2 text-center text-sm font-bold uppercase tracking-widest text-foreground">
            Still holding — disclosed, not resolved
          </p>
        )}
        {p.status === "not_taken" && (
          <p className="text-sm text-muted-foreground">Not taken.</p>
        )}
        {p.status === "closed" && res && (
          <p className="text-sm">
            <span className={`font-bold uppercase tracking-wider ${res.outcome === "win" ? "text-bull" : res.outcome === "loss" ? "text-bear" : "text-muted-foreground"}`}>
              {res.outcome}
            </span>
            <span className="ml-3 text-foreground">{res.pct != null ? `${res.pct >= 0 ? "+" : ""}${res.pct.toFixed(2)}%` : ""}</span>
            {res.r_multiple != null && (
              <span className="ml-3 text-muted-foreground">{res.r_multiple >= 0 ? "+" : ""}{res.r_multiple.toFixed(2)}R</span>
            )}
          </p>
        )}
      </div>
    </article>
  );
}

function BoardPage() {
  const [board, setBoard] = useState<Board | null>(null);
  const [holdback, setHoldback] = useState(false);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const load = async () => {
    const get = (u: string) =>
      fetch(u).then((r) => (r.ok ? r.json() : null)).catch(() => null);
      const today = await get(`${CARDS_BASE}/feed/board-${etToday()}.json`);
      if (today) { setBoard(today); setHoldback(false); setMissing(false); return; }
      // today's board not out yet — before 11 that's expected; show latest with label
      setHoldback(etHour() < 11);
      const idx = await get(`${CARDS_BASE}/feed/index.json`);
      const latest = idx?.days?.find?.((d: string) => d !== etToday()) ?? idx?.days?.[0];
      const prev = latest ? await get(`${CARDS_BASE}/feed/board-${latest}.json`) : null;
      if (prev) { setBoard(prev); setMissing(false); } else setMissing(true);
    };
    load();
    const t = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  const isToday = board?.date === etToday();
  const ctx = board?.market_context;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 pb-24">
        <section className="pt-16 text-center sm:pt-20">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">The Board</p>
          <h1 className="mt-6 font-display text-3xl leading-tight tracking-wide text-foreground sm:text-5xl">
            My picks, after the fact.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Scored before the open, revealed at 11:00 ET — after my trading is done.{" "}
            <span className="text-foreground">Never something you could trade before I have.</span>
          </p>
        </section>

        {holdback && (
          <div className="mt-10 rounded-lg border border-border/60 bg-card/40 px-5 py-4 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-foreground">
              Today's board reveals at 11:00 AM ET
            </p>
            {board && <p className="mt-1 text-xs text-muted-foreground">Showing the previous board ({board.date}) below.</p>}
          </div>
        )}

        {missing && (
          <p className="mt-16 text-center text-muted-foreground">No board published yet.</p>
        )}

        {board && (
          <>
            {!holdback && !isToday && (
              <p className="mt-8 text-center text-xs uppercase tracking-widest text-muted-foreground">
                Showing {board.date}
              </p>
            )}

            {ctx && (
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {ctx.vix != null && (
                  <div className="rounded-lg border border-border/60 bg-card/50 p-3 text-center">
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">VIX</p>
                    <p className="mt-1 text-sm font-bold text-foreground">
                      {ctx.vix.toFixed(1)}{" "}
                      {ctx.vix_regime && (
                        <span className={`text-xs uppercase ${REGIME_TONE[ctx.vix_regime] ?? "text-muted-foreground"}`}>{ctx.vix_regime}</span>
                      )}
                    </p>
                  </div>
                )}
                {ctx.spy_premarket_pct != null && (
                  <div className="rounded-lg border border-border/60 bg-card/50 p-3 text-center">
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">SPY premarket</p>
                    <p className={`mt-1 text-sm font-bold ${ctx.spy_premarket_pct >= 0 ? "text-bull" : "text-bear"}`}>
                      {ctx.spy_premarket_pct >= 0 ? "+" : ""}{ctx.spy_premarket_pct.toFixed(2)}%
                    </p>
                  </div>
                )}
                {ctx.days_to_fomc != null && (
                  <div className="rounded-lg border border-border/60 bg-card/50 p-3 text-center">
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">FOMC</p>
                    <p className="mt-1 text-sm font-bold text-foreground">{ctx.days_to_fomc === 0 ? "today" : `in ${ctx.days_to_fomc}d`}</p>
                  </div>
                )}
                {ctx.days_to_cpi != null && (
                  <div className="rounded-lg border border-border/60 bg-card/50 p-3 text-center">
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">CPI</p>
                    <p className="mt-1 text-sm font-bold text-foreground">{ctx.days_to_cpi === 0 ? "today" : `in ${ctx.days_to_cpi}d`}</p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-10 space-y-5">
              {board.picks.length === 0 && (
                <p className="text-center text-sm text-muted-foreground">No picks this day — passing is a position too.</p>
              )}
              {board.picks.map((p, i) => (
                <PickCard
                  key={`${p.symbol}-${i}`}
                  p={p}
                  rating={board.news_ratings?.find((r) => r.symbol === p.symbol)}
                />
              ))}
            </div>

            {board.decided_at_utc && (
              <p className="mt-6 text-center text-xs uppercase tracking-widest text-muted-foreground">
                Scored{" "}
                {new Date(board.decided_at_utc).toLocaleString("en-US", {
                  timeZone: "America/New_York", hour: "numeric", minute: "2-digit",
                })}{" "}
                ET · published 11:00 ET
              </p>
            )}

            {!!board.watch?.length && (
              <section className="mt-14">
                <h2 className="font-display text-xl tracking-wide text-foreground">Watch — not picks</h2>
                <p className="mt-2 text-xs text-muted-foreground">
                  Names that passed my gates but scored below pick threshold. Informational only.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {board.watch.map((w) => (
                    <span key={w.symbol} className="rounded-lg border border-border/60 bg-card/50 px-3 py-2 text-sm">
                      <span className="font-bold text-foreground">{w.symbol}</span>
                      {w.score != null && <span className="ml-2 text-muted-foreground">{w.score}</span>}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {!!board.news_ratings?.length && (
              <section className="mt-14">
                <h2 className="font-display text-xl tracking-wide text-foreground">
                  {board.news_ratings_meta?.label ?? "AI news scorer"}
                </h2>
                {board.news_ratings_meta?.note && (
                  <p className="mt-2 text-xs text-muted-foreground">{board.news_ratings_meta.note}</p>
                )}
                {board.news_ratings_meta && (
                  <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {board.news_ratings_meta.scored_today_total ?? "?"} scored today ·{" "}
                    {board.news_ratings_meta.published ?? board.news_ratings.length} published (7+) ·
                    universe baseline {board.news_ratings_meta.baseline_bull_share_pct?.toFixed(0) ?? "—"}% bullish
                  </p>
                )}
                {board.news_ratings_meta?.performance?.strong_hit_rate_pct != null && (
                  <p className="mt-2 rounded-md border border-border/60 bg-card/50 px-3 py-2 text-xs text-muted-foreground">
                    Scorer record: strong (9–10) ratings hit{" "}
                    <span className="font-bold text-foreground">
                      {board.news_ratings_meta.performance.strong_hit_rate_pct.toFixed(0)}%
                    </span>{" "}
                    over {board.news_ratings_meta.performance.resolved} resolved calls.
                  </p>
                )}
                <div className="mt-4 space-y-3">
                  {board.news_ratings.map((r, i) => (
                    <div key={`${r.symbol}-${i}`} className="rounded-lg border border-border/40 bg-card/30 p-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-bold text-foreground">{r.symbol}</span>
                        <span className={`rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${r.direction === "BUY" ? "border-bull/60 text-bull" : "border-bear/60 text-bear"}`}>
                          {r.direction}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {r.conviction}/10{r.tier ? ` · ${r.tier}` : ""}
                        </span>
                        {r.bull_share_90d_pct != null && (
                          <span className="text-xs text-muted-foreground">
                            {r.bull_share_90d_pct.toFixed(0)}% bullish vs{" "}
                            {board.news_ratings_meta?.baseline_bull_share_pct?.toFixed(0) ?? "—"}% baseline
                          </span>
                        )}
                      </div>
                      {!!r.reasons?.length && (
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {r.reasons.join(" · ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {board.note && (
              <p className="mt-10 rounded-lg border border-border/60 bg-card/40 p-4 text-sm leading-relaxed text-muted-foreground">
                {board.note}
              </p>
            )}

            <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
              {board.disclaimer} Results shown in percentages and R-multiples. Every win. Every loss. Zero illusions.
            </p>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
