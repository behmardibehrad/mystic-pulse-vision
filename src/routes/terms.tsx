import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Mystic Pulse Capital" },
      {
        name: "description",
        content:
          "The terms governing use of the Mystic Pulse Capital website, including our no-advice policy, risk disclosure and limitation of liability.",
      },
      { property: "og:title", content: "Terms of Use — Mystic Pulse Capital" },
      { property: "og:description", content: "No-advice policy, risk disclosure and limitation of liability." },
    ],
  }),
  component: Terms,
});

const SECTIONS = [
  {
    h: "Acceptance",
    p: "By accessing this website you agree to these terms. If you do not agree, please stop using the site.",
  },
  {
    h: "Educational content only",
    p: "All content is published for general education and information. It is not financial, investment, tax or legal advice, is not tailored to your circumstances, and must not be treated as a recommendation to buy, sell or hold any instrument.",
  },
  {
    h: "Risk disclosure",
    p: "Trading foreign exchange, CFDs, futures, crypto assets and other leveraged products carries a high level of risk and is not suitable for everyone. You can lose more than your initial deposit with some products. Past performance, hypothetical results and examples shown here do not predict future results. Never risk money you cannot afford to lose, and seek independent advice from a licensed professional where appropriate.",
  },
  {
    h: "No client relationship",
    p: "Mystic Pulse Capital is not a broker, dealer, fund manager or licensed adviser. We do not accept deposits, manage money or execute orders. Using this site creates no advisory or fiduciary relationship.",
  },
  {
    h: "Affiliate links",
    p: "Outbound links to brokers, platforms and tools may be affiliate links that earn us a commission at no additional cost to you. Compensation never affects our assessments, and inclusion is not an endorsement or a guarantee of suitability.",
  },
  {
    h: "Third-party sites",
    p: "We are not responsible for the content, products, security or practices of any third-party website reached from here. Verify any provider independently, including with the relevant regulator.",
  },
  {
    h: "Accuracy",
    p: "Content is provided \u201cas is\u201d without warranty of any kind. Market data, costs and regulatory details change, and we do not undertake to keep every page current.",
  },
  {
    h: "Limitation of liability",
    p: "To the fullest extent permitted by law, Mystic Pulse Capital and its contributors are not liable for any trading losses or for any direct, indirect, incidental or consequential damages arising from use of this site or reliance on its content.",
  },
  {
    h: "Intellectual property",
    p: "All branding, artwork and written content on this site belongs to Mystic Pulse Capital and may not be reproduced or redistributed without written permission.",
  },
  {
    h: "Changes",
    p: "We may amend these terms at any time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.",
  },
];

function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageShell
        title="Terms of Use"
        intro="Read these terms before relying on anything published here. In short: this is education, not advice, and trading risk is entirely yours."
      >
        {SECTIONS.map((s) => (
          <div key={s.h}>
            <h2 className="font-display text-lg tracking-wide text-foreground">{s.h}</h2>
            <p className="mt-3">{s.p}</p>
          </div>
        ))}
      </PageShell>
      <SiteFooter />
    </div>
  );
}
