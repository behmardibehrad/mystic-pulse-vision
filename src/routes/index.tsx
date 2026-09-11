import emblem from "@/assets/mpc-emblem-round.png";
import { createFileRoute, Link } from "@tanstack/react-router";
import { LineChart, ShieldCheck, BookOpen, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mystic Pulse Capital — One Trader. Every Trade. On the Record." },
      {
        name: "description",
        content:
          "A solo trader's public journal: morning market data, my actual trades, and the results either way. Every win. Every loss. Zero illusions.",
      },
      { property: "og:title", content: "Mystic Pulse Capital" },
      {
        property: "og:description",
        content: "One trader's public journal. Data in the morning, trades revealed after, receipts always. Every win. Every loss. Zero illusions.",
      },
    ],
  }),
  component: Home,
});

const PILLARS = [
  {
    icon: LineChart,
    title: "Morning data, not signals",
    body: "Every trading morning I publish what my scanner sees — top gappers both directions, volume ratios, catalysts. Raw data before the open. No picks, no calls, nothing sold in advance.",
  },
  {
    icon: ShieldCheck,
    title: "Trades on the record",
    body: "My actual picks go public only after my trading is done — entries, stops, conviction, and the result in R-multiples. Wins and losses get the same font size. Risk math decides survival, so it's part of the record too.",
  },
  {
    icon: BookOpen,
    title: "Broker research",
    body: "Regulation, spreads, execution and withdrawal reality — compared side by side so you can pick with your eyes open.",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.10),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(239,68,68,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        <div className="relative mx-auto max-w-4xl px-4 py-28 text-center sm:py-40">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">A solo trader's public journal</p>
          <h1 className="mt-6 font-display text-4xl leading-tight tracking-wide text-foreground sm:text-6xl">
            The market keeps score.
            <br />
            So do I.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I'm one person trading my own account and publishing the whole record — the data I scan every
            morning, the trades I actually take, and the results either way.{" "}
            <span className="text-bull">Every win.</span> <span className="text-bear">Every loss.</span>{" "}
            <span className="text-foreground">Zero illusions.</span>
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/daily"
              className="group inline-flex items-center gap-2 rounded-md border border-pulse/50 bg-pulse/10 px-6 py-3 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-pulse/20"
            >
              See the record
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/brokers"
              className="inline-flex items-center gap-2 rounded-md border border-border/60 px-6 py-3 text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              Compare brokers
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4">
        <section className="grid gap-6 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <article key={p.title} className="rounded-lg border border-border/60 bg-card/50 p-6">
              <p.icon className="h-6 w-6 text-pulse" aria-hidden />
              <h2 className="mt-4 font-display text-lg tracking-wide text-foreground">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-24 grid items-center gap-10 sm:grid-cols-[auto_minmax(0,1fr)]">
          <img src={emblem} alt="" className="mx-auto h-32 w-32 rounded-full sm:h-40 sm:w-40" />
          <div>
            <h2 className="font-display text-2xl tracking-wide text-foreground sm:text-3xl">
              No signals. No guarantees. No illusions.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              I don't sell trade calls, managed accounts or performance promises. This site is my personal
              trading journal made public: morning data before the open, my picks revealed only after my
              trading is done, and results attached either way — including the losses. If a claim sounds
              effortless, it is being sold to you. Nothing here is financial advice.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline"
            >
              What I stand for <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
