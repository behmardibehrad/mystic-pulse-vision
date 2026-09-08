import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/daily")({
  head: () => ({
    meta: [
      { title: "Daily Archive — Mystic Pulse Capital" },
      {
        name: "description",
        content:
          "Every daily brief and verdict, archived. Pick a day: pre-market, post-market, earnings and Fed coverage.",
      },
      { property: "og:title", content: "Daily Archive — Mystic Pulse Capital" },
    ],
  }),
  component: DailyPage,
});

const CARDS_BASE = "https://cards.mysticpulsecapital.com";

const SEGMENTS: { key: string; label: string }[] = [
  { key: "premarket", label: "Pre-Market Brief" },
  { key: "postmarket", label: "Post-Market Verdict" },
  { key: "earnings", label: "Earnings" },
  { key: "fed", label: "Fed Report" },
  { key: "session", label: "Session Recap" },
  { key: "live", label: "Live Trading" },
];

const VERDICT_CLASS: Record<string, string> = {
  bullish: "text-bull border-bull/60",
  bearish: "text-bear border-bear/60",
  choppy: "text-muted-foreground border-border",
};

type Seg = { yt?: string; card?: string; verdict?: string };
type Archive = { updated_utc: string; days: Record<string, Record<string, Seg>>; specials: { title: string; yt: string }[] };

function DailyPage() {
  const [archive, setArchive] = useState<Archive | null>(null);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${CARDS_BASE}/archive.json`)
      .then((r) => r.json())
      .then((a: Archive) => setArchive(a))
      .catch(() => setError(true));
  }, []);

  // only days that have at least one video
  const dates = useMemo(() => {
    if (!archive) return [];
    return Object.keys(archive.days)
      .filter((d) => Object.values(archive.days[d]).some((s) => s.yt))
      .sort()
      .reverse();
  }, [archive]);

  useEffect(() => {
    if (dates.length && !selected) setSelected(dates[0]);
  }, [dates, selected]);

  const day = selected && archive ? archive.days[selected] : null;
  const pretty = (d: string) =>
    new Date(d + "T12:00:00").toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
    });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pb-24">
        <section className="pt-16 text-center sm:pt-20">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Daily Archive</p>
          <h1 className="mt-6 font-display text-3xl leading-tight tracking-wide text-foreground sm:text-5xl">
            Every day, on the record.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Pick a day. The pre-market brief, the post-market verdict, and — when they happen —
            earnings and Fed coverage. Published daily, archived forever.
          </p>
        </section>

        {error && (
          <p className="mt-16 text-center text-muted-foreground">
            Archive temporarily unavailable — try again in a minute.
          </p>
        )}

        {!error && !archive && (
          <p className="mt-16 text-center text-muted-foreground">Loading archive…</p>
        )}

        {archive && dates.length > 0 && (
          <>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <select
                value={selected ?? ""}
                onChange={(e) => setSelected(e.target.value)}
                className="rounded-md border border-border/60 bg-card/60 px-4 py-2.5 text-sm text-foreground"
              >
                {dates.map((d) => (
                  <option key={d} value={d}>{pretty(d)}</option>
                ))}
              </select>
            </div>

            {day && (
              <div className="mt-10 space-y-10">
                {SEGMENTS.filter((s) => day[s.key]?.yt || day[s.key]?.card).map((s) => {
                  const seg = day[s.key]!;
                  const verdict = seg.verdict;
                  return (
                    <section key={s.key} className="rounded-lg border border-border/60 bg-card/40 p-5 sm:p-7">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h2 className="font-display text-xl tracking-wide text-foreground">{s.label}</h2>
                        {verdict && (
                          <span className={`rounded-md border px-3 py-1 text-xs font-bold uppercase tracking-widest ${VERDICT_CLASS[verdict] ?? ""}`}>
                            {verdict}
                          </span>
                        )}
                      </div>
                      <div className="mt-5 grid gap-6 sm:grid-cols-2">
                        {seg.yt ? (
                          <div className="relative aspect-[9/16] overflow-hidden rounded-lg border border-border/60">
                            <iframe
                              src={`https://www.youtube.com/embed/${seg.yt}`}
                              title={`${s.label} ${selected}`}
                              className="absolute inset-0 h-full w-full"
                              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center rounded-lg border border-dashed border-border/60 text-sm text-muted-foreground">
                            No video this day
                          </div>
                        )}
                        {seg.card ? (
                          <img
                            src={`${CARDS_BASE}/${seg.card}`}
                            alt={`${s.label} card, ${selected}`}
                            className="w-full rounded-lg border border-border/60"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex items-center justify-center rounded-lg border border-dashed border-border/60 text-sm text-muted-foreground">
                            No card this day
                          </div>
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
