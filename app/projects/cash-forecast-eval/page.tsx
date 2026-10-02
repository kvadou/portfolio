import type { Metadata } from "next";
import Link from "next/link";
import { shotsFor } from "@/lib/system";
import { Reveal } from "@/app/components/reveal";
import { Gallery } from "@/app/components/gallery";
import { SectionLabel } from "@/app/components/section-label";
import { AiBadge } from "@/app/components/ai-badge";
import { TechBadge } from "@/app/components/tech-badge";

export const metadata: Metadata = {
  title: "Cash Forecast Eval · Doug Kvamme",
  description:
    "An independent eval service that grades a production cash forecast against settled bank cash every week, and only lets the model change on evidence.",
};

const accuracy = [
  { label: "Launch baseline", value: 71, note: "Week by week, Aug 24" },
  { label: "Live, week by week", value: 74, note: "Latest run, Oct 1" },
  { label: "Live, rolling 4-week", value: 84, note: "Likely range 76 to 91%" },
  { label: "Best replay candidate", value: 92, note: "Rolling 4-week, 64 weeks" },
  { label: "Target", value: 95, note: "Rolling 4-week" },
];

const steps = [
  {
    title: "Freeze every prediction",
    body: "The production forecast writes a weekly and daily snapshot before the week happens. The eval only ever grades what was actually predicted at the time, never a recomputed version.",
  },
  {
    title: "Grade against money that landed",
    body: "Ground truth is settled cash by settlement date: card payouts, bank debits, and deposited checks. Not invoices, not bookings.",
  },
  {
    title: "Compare to dumb baselines",
    body: "Every run scores the model next to a 4-week mean, an exponentially weighted mean, and same-week-last-year. On the first run, same-week-last-year beat the model by 2.3x.",
  },
  {
    title: "Only change on evidence",
    body: "A challenger has to beat production by more than 2 points at both weekly and rolling grains, through a paired bootstrap noise gate and a walk-forward check. Adoptions are logged in a ledger.",
  },
];

const caveats = [
  "With about 15 graded weeks, the noise band is 6 to 13 points. Only one change so far has cleared the gate.",
  "One window scored 96% because two misses cancelled out. The headline metric was changed so that can't flatter the model again.",
  "School payments are 7% of cash but a third of the error. Mailed checks aren't recorded yet, so actuals undercount them.",
  "Winter break is the worst slice at 48%. The next challengers target school receivables lag and camp prepayments.",
];

export default function CashForecastEvalPage() {
  const shots = shotsFor("cash-forecast-eval");
  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-14 sm:pt-20">
          <Link href="/#eval" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Case study · Evals in production</span>
              <AiBadge label="Model quality" />
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              A forecast that gets graded by something it can&apos;t influence
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
              Leadership plans payroll and spending off a 26-week cash forecast. I built a separate service that grades
              that forecast every week against cash that actually reached the bank, compares it to simple baselines, and
              blocks any model change that can&apos;t prove it is better than noise.
            </p>
          </div>

          <figure className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <figcaption className="text-sm font-semibold text-foreground">
              Forecast accuracy <span className="font-normal text-muted">(1 minus weighted absolute % error on settled cash)</span>
            </figcaption>
            <div className="mt-6 space-y-4">
              {accuracy.map((a) => (
                <div key={a.label} className="grid grid-cols-[8.5rem_1fr] items-center gap-4 sm:grid-cols-[12rem_1fr]">
                  <div>
                    <div className="text-sm font-medium text-foreground">{a.label}</div>
                    <div className="text-xs text-muted">{a.note}</div>
                  </div>
                  <div className="relative h-8 rounded-md bg-surface">
                    <div
                      className={`flex h-8 items-center justify-end rounded-md pr-3 text-sm font-bold ${
                        a.label === "Target" ? "border-2 border-dashed border-accent text-accent" : "bg-accent text-background"
                      }`}
                      style={{ width: `${a.value}%` }}
                    >
                      {a.value}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </figure>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <section className="py-16">
          <Reveal>
            <SectionLabel>How it works</SectionLabel>
          </Reveal>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <li className="h-full rounded-xl border border-border bg-card p-6">
                  <span className="font-display text-2xl font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-2 font-display text-lg font-semibold text-foreground">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {shots.length > 0 && (
          <section className="pb-16">
            <Reveal>
              <SectionLabel>In the product</SectionLabel>
              <div className="mt-8">
                <Gallery shots={shots} domain="ops.kingside.app/analytics/cash-flow" />
              </div>
            </Reveal>
          </section>
        )}

        <section className="grid gap-10 pb-16 lg:grid-cols-2">
          <Reveal>
            <SectionLabel>What the eval changed</SectionLabel>
            <p className="mt-6 leading-relaxed text-muted">
              The first run showed that same-week-last-year cash, a baseline anyone could compute in a spreadsheet,
              beat the production model by 2.3x. Instead of tuning the model by feel, production switched to a blend:
              30% model, 70% seasonal anchor. It is the only change so far that cleared the noise gate, by about 7 points.
              The latest run scores the live forecast at 84% on the rolling 4-week headline (likely range 76 to 91%) and 74% week by week. Two
              structural challengers score 90 to 92% in point-in-time replay and are waiting on one data sync before
              they can be tested live.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <SectionLabel>Honest caveats</SectionLabel>
            <ul className="mt-6 space-y-3">
              {caveats.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="pb-16">
          <Reveal>
            <SectionLabel>Built with</SectionLabel>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Python", "FastAPI", "pandas", "PostgreSQL", "pytest", "Heroku Scheduler", "Slack"].map((t) => (
                <TechBadge key={t} name={t} />
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
              Runs weekly with a read-only credential, keeps its own ledger of runs, posts a scorecard to Slack and email,
              and feeds an Eval tab inside the forecast page through a server-side proxy so no key reaches the browser.
              Metrics: WAPE, MAPE, bias, weekday fit, skill score against each baseline, a horizon curve, per-channel
              grading, and 80% moving-block bootstrap ranges.
            </p>
          </Reveal>
        </section>

        <Reveal>
          <section className="mb-20 rounded-2xl border border-accent/20 bg-accent/5 p-8 sm:p-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Why it matters</span>
            <p className="mt-4 font-display text-2xl font-bold leading-snug text-foreground sm:text-3xl">
              Most AI and forecasting work ships on vibes. This one has a referee, a ledger, and a rule that says the
              model doesn&apos;t change until the numbers say so.
            </p>
          </section>
        </Reveal>
      </div>
    </>
  );
}
