import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/brokers")({
  head: () => ({
    meta: [
      { title: "Broker Research — Mystic Pulse Capital" },
      {
        name: "description",
        content:
          "How we assess brokers: regulation, execution quality, real costs and withdrawal reliability — plus the questions to ask before funding an account.",
      },
      { property: "og:title", content: "Broker Research — Mystic Pulse Capital" },
      {
        property: "og:description",
        content: "Regulation, spreads, execution and withdrawals — a plain checklist for choosing a broker.",
      },
    ],
  }),
  component: Brokers,
});

const CRITERIA = [
  {
    title: "Regulation & client funds",
    body: "Which authority licences the entity you actually sign with, whether client money is segregated, and what compensation scheme (if any) applies to your residency.",
  },
  {
    title: "Real cost of a round turn",
    body: "Spread plus commission plus swap, measured at the hours you trade — not the marketing number quoted on a quiet London open.",
  },
  {
    title: "Execution quality",
    body: "Slippage on news, requote behaviour, order rejection rates and whether the broker takes the other side of your flow.",
  },
  {
    title: "Withdrawals",
    body: "Processing times, fees, and whether verified users report friction when taking profits out. This is where reputations are made.",
  },
  {
    title: "Platform & instruments",
    body: "The tooling you will live inside every day, the markets offered, and the leverage caps your jurisdiction imposes.",
  },
  {
    title: "Support that answers",
    body: "A human reachable in your language during your trading session, with a documented complaints path.",
  },
];

function Brokers() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-4 pt-16">
        <h1 className="font-display text-3xl tracking-wide text-foreground sm:text-4xl">Broker research</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          There is no single best broker — only the one that fits your jurisdiction, size and style with the fewest
          hidden costs. Below is the framework we apply before any provider is discussed on this site.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {CRITERIA.map((c, i) => (
            <article key={c.title} className="rounded-lg border border-border/60 bg-card/50 p-6">
              <span className="font-display text-xs tracking-[0.3em] text-pulse">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 font-display text-lg tracking-wide text-foreground">{c.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </article>
          ))}
        </div>

        <section className="mt-16 rounded-lg border border-bear/40 bg-bear/5 p-6">
          <h2 className="font-display text-lg tracking-wide text-foreground">Before you fund an account</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>Confirm the licence number on the regulator's own register, not on the broker's website.</li>
            <li>Read the withdrawal and dormancy clauses in the client agreement in full.</li>
            <li>Test with the smallest deposit you can, and complete one withdrawal before scaling.</li>
            <li>Assume the leverage on offer is a risk, not a feature.</li>
          </ul>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
          Any broker link published here may be an affiliate link. We may earn a commission if you open an account,
          at no extra cost to you, and it does not influence our assessment or ordering. Nothing on this page is a
          recommendation or personal advice.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
