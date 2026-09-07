import { createFileRoute, Link } from "@tanstack/react-router";
import { LineChart, ShieldCheck, BookOpen, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import hero from "@/assets/mpc-hero.jpg.asset.json";
import orb from "@/assets/mpc-orb.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mystic Pulse Capital — Honest Trading Education & Broker Research" },
      {
        name: "description",
        content:
          "Dark, no-nonsense market education: broker breakdowns, risk frameworks and trading journals. Every win. Every loss. Zero illusions.",
      },
      { property: "og:title", content: "Mystic Pulse Capital" },
      {
        property: "og:description",
        content: "Trading education and broker research with no hype. Every win. Every loss. Zero illusions.",
      },
    ],
  }),
  component: Home,
});

const PILLARS = [
  {
    icon: LineChart,
    title: "Market breakdowns",
    body: "Structured reviews of price action, volatility regimes and the setups that actually repeat — written after the fact, not sold in advance.",
  },
  {
    icon: ShieldCheck,
    title: "Risk before returns",
    body: "Position sizing, drawdown limits and the arithmetic of recovery. The part of trading that decides whether you survive long enough to be right.",
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
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Market research & education</p>
          <h1 className="mt-6 font-display text-4xl leading-tight tracking-wide text-foreground sm:text-6xl">
            The market keeps score.
            <br />
            So do we.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Mystic Pulse Capital publishes trading education for people tired of screenshots and promises.{" "}
            <span className="text-bull">Every win.</span> <span className="text-bear">Every loss.</span>{" "}
            <span className="text-foreground">Zero illusions.</span>
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              to="/brokers"
              className="group inline-flex items-center gap-2 rounded-md border border-pulse/50 bg-pulse/10 px-6 py-3 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-pulse/20"
            >
              Compare brokers
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
          <img src="/favicon.png" alt="" className="mx-auto h-32 w-32 rounded-full sm:h-40 sm:w-40" />
          <div>
            <h2 className="font-display text-2xl tracking-wide text-foreground sm:text-3xl">
              No signals. No guarantees. No illusions.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We do not sell trade calls, managed accounts or performance promises. What we publish is research,
              process and the uncomfortable numbers behind leverage. If a claim sounds effortless, it is being sold to
              you — including here.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline"
            >
              What we stand for <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
