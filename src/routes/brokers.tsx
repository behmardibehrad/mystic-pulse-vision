import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/brokers")({
  head: () => ({
    meta: [
      { title: "Broker Guides — Mystic Pulse Capital" },
      {
        name: "description",
        content:
          "Practical, no-hype guides to setting up and using US brokers: Robinhood, Alpaca, and Interactive Brokers.",
      },
      { property: "og:title", content: "Broker Guides — Mystic Pulse Capital" },
      {
        property: "og:description",
        content: "Step-by-step broker guides for Robinhood, Alpaca, and Interactive Brokers.",
      },
    ],
  }),
  component: Brokers,
});

const BROKERS = [
  {
    name: "Robinhood",
    description: "Commission-free stocks, options, and ETFs with a mobile-first experience.",
  },
  {
    name: "Alpaca",
    description: "API-first brokerage built for algorithmic trading and automated strategies.",
  },
  {
    name: "Interactive Brokers",
    description: "Global market access, advanced tools, and professional-grade pricing.",
  },
];

const LEVELS = ["Getting Started", "Intermediate", "Advanced"];

function Brokers() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-4 pt-16">
        <h1 className="font-display text-3xl tracking-wide text-foreground sm:text-4xl">Broker Guides</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Practical, no-hype guides to setting up and using US brokers.
        </p>

        <div className="mt-8 rounded-lg border border-pulse/30 bg-pulse/5 p-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Some guides contain referral links. If you sign up through one, we may both receive a bonus. That's the
            whole deal — recommendations don't change because of it.
          </p>
        </div>

        <div className="mt-12 space-y-14">
          {BROKERS.map((broker) => (
            <section key={broker.name}>
              <div className="border-b border-border/60 pb-4">
                <h2 className="font-display text-2xl tracking-wide text-foreground">{broker.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{broker.description}</p>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {LEVELS.map((level) => (
                  <article
                    key={level}
                    className="flex flex-col rounded-lg border border-border/60 bg-card/50 p-6"
                  >
                    <h3 className="font-display text-lg tracking-wide text-foreground">{level}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      A focused walkthrough for {broker.name} at the {level.toLowerCase()} level.
                    </p>
                    <span className="mt-5 inline-flex items-center self-start rounded-full border border-border/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                      Coming soon
                    </span>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
