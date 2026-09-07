import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Mystic Pulse Capital" },
      {
        name: "description",
        content:
          "Who we are, what we publish, and what we will never sell you. Mystic Pulse Capital is education and research, not advice.",
      },
      { property: "og:title", content: "About — Mystic Pulse Capital" },
      {
        property: "og:description",
        content: "Education and research, not advice. Every win. Every loss. Zero illusions.",
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
        intro="We write about markets the way they actually behave: uneven, unforgiving and indifferent to conviction."
      >
        <img
          src={hero.url}
          alt="Mystic Pulse Capital brand artwork: a hooded figure between a bull and a bear market"
          className="w-full rounded-lg border border-border/60"
        />

        <div>
          <h2 className="font-display text-xl tracking-wide text-foreground">What we do</h2>
          <p className="mt-3">
            Mystic Pulse Capital is an independent publisher of trading education and broker research. We break down
            market structure, risk management and the mechanics of the venues traders use, in plain language and
            after the fact.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl tracking-wide text-foreground">What we don't do</h2>
          <p className="mt-3">
            We do not provide signals, managed accounts, portfolio management or personal advice. We do not accept
            deposits, and we will never ask you to send funds anywhere. We hold no licence to advise, and we do not
            pretend otherwise.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl tracking-wide text-foreground">How we're funded</h2>
          <p className="mt-3">
            Some outbound links to brokers or tools are affiliate links, which may pay us a commission when a reader
            opens an account. That relationship is disclosed on every page and never determines what we say or how we
            rank providers.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl tracking-wide text-foreground">The standard we hold</h2>
          <p className="mt-3">
            <span className="text-bull">Every win.</span> <span className="text-bear">Every loss.</span>{" "}
            <span className="text-foreground">Zero illusions.</span> If an idea failed, it gets published as it
            failed. Selective memory is the most expensive habit in this business.
          </p>
        </div>
      </PageShell>
      <SiteFooter />
    </div>
  );
}
