import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, PageShell } from "@/components/site-chrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Mystic Pulse Capital" },
      {
        name: "description",
        content:
          "How Mystic Pulse Capital handles personal data, analytics, cookies and affiliate tracking, and the rights you hold over your information.",
      },
      { property: "og:title", content: "Privacy Policy — Mystic Pulse Capital" },
      { property: "og:description", content: "How we handle data, cookies and affiliate tracking." },
    ],
  }),
  component: Privacy,
});

const SECTIONS = [
  {
    h: "Information we collect",
    p: "This site has no accounts or logins. We collect only what your browser sends when you visit — such as IP address, device and browser type, referring page and pages viewed — plus anything you voluntarily send us by email.",
  },
  {
    h: "Cookies and analytics",
    p: "We may use privacy-respecting analytics to understand which articles are read. Affiliate partners may set their own cookies when you follow an outbound link, which allows them to attribute a referral to us. You can block or delete cookies in your browser at any time.",
  },
  {
    h: "How we use information",
    p: "To operate and secure the site, measure aggregate traffic, improve our content, and respond to messages you send us. We do not sell personal data, and we do not build advertising profiles.",
  },
  {
    h: "Third parties",
    p: "Hosting, analytics and affiliate networks may process data on our behalf or as independent controllers. Once you leave this site through an outbound link, the destination's own privacy policy governs your data.",
  },
  {
    h: "Retention",
    p: "Aggregate analytics are retained no longer than necessary for trend analysis. Email correspondence is kept only as long as needed to handle your enquiry.",
  },
  {
    h: "Your rights",
    p: "Depending on where you live, you may have the right to access, correct, delete or restrict processing of your personal data, and to object to it. Contact us and we will act on valid requests within the timeframes required by law.",
  },
  {
    h: "Children",
    p: "This site is not intended for anyone under 18, and we do not knowingly collect data from minors.",
  },
  {
    h: "Changes and contact",
    p: "We may update this policy as the site evolves; the revised version applies from the date it is posted. Questions about privacy can be sent to us via the contact address published on the site.",
  },
];

function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageShell
        title="Privacy Policy"
        intro="Mystic Pulse Capital keeps data collection to the minimum needed to run a website. There are no accounts here and nothing to sign up for."
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
