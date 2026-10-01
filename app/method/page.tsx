import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/app/components/reveal";

export const metadata: Metadata = {
  title: "Method · Doug Kvamme",
  description:
    "How I deploy AI into a business: map the real process, sort every step into delete, code, agent, or human, build inside the systems people already use, and prove it with before-and-after numbers.",
};

type Bucket = "delete" | "code" | "agent" | "human";

const bucketMeta: Record<Bucket, { label: string; rule: string; tone: string }> = {
  delete: {
    label: "Delete",
    rule: "The step only existed because of the old tooling. Remove it.",
    tone: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
  code: {
    label: "Plain code",
    rule: "If X then Y, no judgment. Deterministic, cheap, testable.",
    tone: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  },
  agent: {
    label: "Agent",
    rule: "Judgment is needed and there is enough history to ground it.",
    tone: "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  },
  human: {
    label: "Human decision",
    rule: "Money moves, people are judged, or a mistake is expensive.",
    tone: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
};

const steps = [
  {
    n: "01",
    title: "Map the real process",
    body: "The documented process is never the real one. I interview the people who do the work (where most of the knowledge lives), read the event history in the systems of record, and then check the docs. The output is the actual step sequence, including the loops, the exceptions, and how often each one fires.",
  },
  {
    n: "02",
    title: "Find where the time goes",
    body: "Speeding up each step rarely speeds up the process. The days hide in handoffs between people, rework loops, and state nobody can see. I price each loop in hours and dollars so the owner can see what the mess costs.",
  },
  {
    n: "03",
    title: "Sort every step",
    body: "Each step lands in exactly one of four buckets. Most of the value usually comes from the first two, before any model is involved.",
  },
  {
    n: "04",
    title: "Build inside the systems people already use",
    body: "Agents read from and write to the tools a team already works in: Slack, Google Workspace, the CRM, the payroll provider, the scheduling system. No new surface to learn, no migration pitch. I only build a new system of record when there isn't a real one.",
  },
  {
    n: "05",
    title: "Baseline, ship, prove it",
    body: "Numbers get captured before the build: steps, cycle time, exception rate, cost per unit. After launch the same numbers get measured again, and production AI output is graded against real outcomes on a schedule.",
  },
];

const cases: {
  title: string;
  context: string;
  sort: { step: string; bucket: Bucket }[];
  results: { value: string; label: string }[];
  guardrail: string;
}[] = [
  {
    title: "SaaS spend teardown",
    context:
      "Software and card spend had drifted to about $20k a month at a ~$3M company. Renewals auto-charged, seats outlived the people using them, and nobody owned the question of whether a tool was still needed.",
    sort: [
      { step: "Finance skims the monthly statement for anything odd", bucket: "delete" },
      { step: "Join card transactions to SSO logins, seat counts, and owners", bucket: "code" },
      { step: "Rank each vendor by waste, with the evidence attached", bucket: "agent" },
      { step: "Tool owner keeps or cuts each subscription", bucket: "human" },
      { step: "License audit fires automatically on every offboarding", bucket: "code" },
    ],
    results: [
      { value: "$20k → $10k", label: "Monthly spend" },
      { value: "~$120k", label: "Annualized savings" },
    ],
    guardrail:
      "Nothing gets cancelled because a model said so. The owner defends or drops each tool, which is why the cuts held.",
  },
  {
    title: "Franchise market launch",
    context:
      "Bringing a new franchise market live touched about ten systems: accounts, DNS, the ops platform, CRM seeding, billing, hiring. It ran from one person's memory, took days, and every launch missed a different step.",
    sort: [
      { step: "Work from memory and a stale checklist", bucket: "delete" },
      { step: "Probe, provision, and verify each system idempotently", bucket: "code" },
      { step: "Independent pass re-checks the work and ignores the self-report", bucket: "agent" },
      { step: "Approve the go-live report", bucket: "human" },
    ],
    results: [
      { value: "Days → <1 hr", label: "Per market" },
      { value: "Every run", label: "Independently verified" },
    ],
    guardrail:
      "The run is idempotent and re-runnable. A person signs off before any franchisee sees the market.",
  },
  {
    title: "Tutor hiring pre-screen",
    context:
      "Every NYC tutor applicant needed a scheduled preliminary phone call with the hiring manager, mostly to hear the same teaching sample. The scheduling loop cost more time than the call.",
    sort: [
      { step: "Preliminary phone screen", bucket: "delete" },
      { step: "Candidate records a short story from their portal, Slack pings staff", bucket: "code" },
      { step: "Scorecard draft refined from interview transcripts against the rubric", bucket: "agent" },
      { step: "Advance or pass, every time", bucket: "human" },
    ],
    results: [
      { value: "1 step", label: "Removed from funnel" },
      { value: "0", label: "Calls to schedule" },
    ],
    guardrail:
      "The model never rejects anyone. It drafts evidence, and the hiring manager makes every call.",
  },
  {
    title: "Singapore payroll",
    context:
      "A monthly cycle of copying lesson data out of the scheduling system into spreadsheets, mapping roles to rates by hand, and chasing approvals over chat. Roughly five hours a month, with errors that showed up as wrong paychecks.",
    sort: [
      { step: "Copy and paste lessons into spreadsheets", bucket: "delete" },
      { step: "Import lessons, map roles to rates", bucket: "code" },
      { step: "Monthly audit flags unmapped roles and zero-rate lessons", bucket: "code" },
      { step: "Director approves before payout", bucket: "human" },
    ],
    results: [
      { value: "~5 hrs → minutes", label: "Monthly cycle" },
      { value: "$30k/mo", label: "Across 50+ tutors" },
    ],
    guardrail:
      "Money only moves after a named approver signs off. The system now runs fully with the local team.",
  },
];

function BucketChip({ bucket }: { bucket: Bucket }) {
  const m = bucketMeta[bucket];
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${m.tone}`}
    >
      {m.label}
    </span>
  );
}

export default function MethodPage() {
  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Method
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              AI goes into the process,
              <br />
              not on top of it
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-muted">
              Most AI projects stall because they skip the boring part. Before
              anything gets built, I find out how the work actually flows, what
              each loop costs, and which steps should not exist at all. Then the
              agents go where the judgment is, the code goes where it isn&apos;t,
              and people keep the decisions that matter.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <section className="py-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                The Five Steps
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>
          <ol className="mt-10 space-y-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 60}>
                <li className="grid gap-4 rounded-xl border border-border bg-card p-6 sm:grid-cols-[4rem_1fr]">
                  <span className="font-display text-3xl font-bold text-accent">{s.n}</span>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-foreground">{s.title}</h2>
                    <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                    {s.n === "03" && (
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {(Object.keys(bucketMeta) as Bucket[]).map((b) => (
                          <div key={b} className="rounded-lg border border-border bg-background p-4">
                            <BucketChip bucket={b} />
                            <p className="mt-2 text-sm leading-relaxed text-muted">
                              {bucketMeta[b].rule}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="pb-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                In Production
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <p className="mt-6 max-w-3xl text-muted">
              Four workflows from Story Time Chess, each sorted step by step. All
              of them are live and run by non-technical operators.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {cases.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
                  <h3 className="font-display text-xl font-bold text-foreground">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.context}</p>
                  <ul className="mt-5 space-y-2.5">
                    {c.sort.map((row) => (
                      <li key={row.step} className="flex items-start justify-between gap-3 border-b border-border pb-2.5 text-sm last:border-0">
                        <span
                          className={
                            row.bucket === "delete"
                              ? "text-muted line-through decoration-rose-500/60"
                              : "text-foreground"
                          }
                        >
                          {row.step}
                        </span>
                        <BucketChip bucket={row.bucket} />
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {c.results.map((r) => (
                      <div key={r.label} className="rounded-lg border border-border bg-background px-3 py-3 text-center">
                        <div className="font-display text-lg font-bold text-foreground">{r.value}</div>
                        <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted">{r.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-muted">
                    <span className="font-semibold text-foreground">Guardrail: </span>
                    {c.guardrail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <section className="mb-20 rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              See the systems behind it
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              The platforms these workflows run on are in production, with
              sanitized demos you can click through.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20"
              >
                View the work
              </Link>
              <a
                href="mailto:dougkvamme@gmail.com"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent/30 hover:bg-card"
              >
                Get in touch
              </a>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
