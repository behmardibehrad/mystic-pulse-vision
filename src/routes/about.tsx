import { createFileRoute } from "@tanstack/react-router";
import emblem from "@/assets/mpc-emblem.png";
import { SiteHeader, SiteFooter, PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Mystic Pulse Capital" },
      {
        name: "description",
        content:
          "One trader, trading a real account and publishing the whole record. What I share, when I share it, and what I will never sell you.",
      },
      { property: "og:title", content: "About — Mystic Pulse Capital" },
      {
        property: "og:description",
        content: "One trader's public journal. Every win. Every loss. Zero illusions.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageShell
        title="About Mystic Pulse Capital"
        intro="I write about markets the way they actually behave: uneven, unforgiving and indifferent to conviction."
      >
        <img
          src={emblem}
          alt="Mystic Pulse Capital brand artwork: a hooded figure between a bull and a bear market"
          className="w-full rounded-lg border border-border/60"
        />

        <div>
          <h2 className="font-display text-xl tracking-wide text-foreground">Who this is</h2>
          <p className="mt-3">
            Mystic Pulse Capital is one person — a software engineer who day-trades a real account and
            decided to publish the whole record instead of the highlight reel. The daily briefs and videos
            are produced by automation I built and run myself; the trades, the wins and the losses are mine.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl tracking-wide text-foreground">What I publish, and when</h2>
          <p className="mt-3">
            Every trading morning I publish market data — the top gappers in both directions, volume,
            catalysts. Data only, before the open, with nothing to buy and nothing to follow. My own
            watchlist and picks stay private until my trading is done: they go public late morning with
            entries, stops and conviction as I scored them before the open, and the day ends with the
            receipts — results in percentages and R-multiples, losses in the same font as wins. I never
            publish a pick you could trade before I have.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl tracking-wide text-foreground">What I don't do</h2>
          <p className="mt-3">
            I do not provide signals, managed accounts, portfolio management or personal advice. I do not
            accept deposits, and I will never ask you to send funds anywhere. I hold no licence to advise,
            and I do not pretend otherwise. This is a personal journal made public — what I did, not what
            you should do.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl tracking-wide text-foreground">How this is funded</h2>
          <p className="mt-3">
            Everything here is free. Some outbound links to brokers or tools are affiliate links, which may
            pay me a commission when a reader opens an account. That relationship is disclosed on every page
            and never determines what I say or how I rank providers.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl tracking-wide text-foreground">The standard I hold</h2>
          <p className="mt-3">
            <span className="text-bull">Every win.</span> <span className="text-bear">Every loss.</span>{" "}
            <span className="text-foreground">Zero illusions.</span> If a trade failed, it gets published as
            it failed. Selective memory is the most expensive habit in this business.
          </p>
        </div>
      </PageShell>
      <SiteFooter />
    </div>
  );
}
