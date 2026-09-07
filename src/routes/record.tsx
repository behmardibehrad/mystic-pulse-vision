import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import trades from "@/assets/trades.json";

export const Route = createFileRoute("/record")({
  head: () => ({
    meta: [
      { title: "The Record — Mystic Pulse Capital" },
      {
        name: "description",
        content:
          "394 closed trades, Feb 2024 – Sep 2026. Every win, every loss, including the margin call. The complete realized P&L record.",
      },
      { property: "og:title", content: "The Record — Mystic Pulse Capital" },
      {
        property: "og:description",
        content: "394 closed trades. +$536,738 realized — and a -$216,336 day. All of it.",
      },
    ],
  }),
  component: RecordPage,
});

type Trade = { d: string; s: string; g: number };
type SortKey = "d" | "s" | "g";

const STATS = [
  { label: "Realized P&L", value: "+$536,738", tone: "text-bull" },
  { label: "Win rate", value: "70.4%", tone: "text-bull" },
  { label: "Avg win", value: "+$4,488", tone: "text-bull" },
  { label: "Avg loss", value: "−$6,052", tone: "text-bear" },
  { label: "Worst day", value: "−$216,336", tone: "text-bear" },
];

const usd = (v: number) =>
  (v >= 0 ? "+$" : "−$") +
  Math.abs(v).toLocaleString("en-US", { maximumFractionDigits: 2 });

function RecordPage() {
  const [sortKey, setSortKey] = useState<SortKey>("d");
  const [desc, setDesc] = useState(true);

  const rows = useMemo(() => {
    const r = [...(trades as Trade[])];
    r.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      const cmp = typeof va === "number" && typeof vb === "number" ? va - vb : String(va).localeCompare(String(vb));
      return desc ? -cmp : cmp;
    });
    return r;
  }, [sortKey, desc]);

  const th = (key: SortKey, label: string, align = "text-left") => (
    <th
      className={`cursor-pointer select-none px-4 py-3 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground ${align}`}
      onClick={() => {
        if (sortKey === key) setDesc(!desc);
        else {
          setSortKey(key);
          setDesc(true);
        }
      }}
    >
      {label}
      {sortKey === key ? (desc ? " ↓" : " ↑") : ""}
    </th>
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 pb-24">
        <section className="pt-16 text-center sm:pt-24">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">The Record</p>
          <h1 className="mt-6 font-display text-3xl leading-tight tracking-wide text-foreground sm:text-5xl">
            394 closed trades.
            <br />
            Feb 2024 — Sep 2026. All of it.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            One brokerage account, scrolled top to bottom — including the margin call that liquidated 13 positions in
            one day. <span className="text-bull">Every win.</span> <span className="text-bear">Every loss.</span>{" "}
            <span className="text-foreground">Zero illusions.</span>
          </p>
        </section>

        <section className="mt-14">
          <div className="relative mx-auto aspect-[9/16] max-w-sm overflow-hidden rounded-lg border border-border/60">
            <iframe
              src="https://www.youtube.com/embed/5zLokAMXDJw"
              title="My Real Trading Record: +$536K and a Margin Call"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        <section className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-lg border border-border/60 bg-card/50 p-4 text-center">
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <p className={`mt-2 font-display text-lg tracking-wide sm:text-xl ${s.tone}`}>{s.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl tracking-wide text-foreground">Every closed trade</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Realized P&L on closed trades in one Robinhood account, pulled from the account history. Not account
            returns. Not investment advice. Two entries show “—” where the instrument was delisted; a handful of
            crypto sales report no P&L and are excluded.
          </p>

          <div className="mt-6 overflow-x-auto rounded-lg border border-border/60">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <thead className="bg-card/60">
                <tr>
                  {th("d", "Date")}
                  {th("s", "Symbol")}
                  {th("g", "Realized P&L", "text-right")}
                </tr>
              </thead>
              <tbody>
                {rows.map((t, i) => (
                  <tr key={i} className="border-t border-border/40">
                    <td className="px-4 py-2.5 text-muted-foreground">{t.d}</td>
                    <td className="px-4 py-2.5 font-medium text-foreground">{t.s}</td>
                    <td className={`px-4 py-2.5 text-right font-medium ${t.g >= 0 ? "text-bull" : "text-bear"}`}>
                      {usd(t.g)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
