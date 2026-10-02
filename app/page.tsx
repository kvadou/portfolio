import Link from "next/link";
import { apps, fleet, platform, shotsFor } from "@/lib/system";
import { cases, bucketMeta, type Bucket } from "@/lib/method";
import { formatCount, totalCommits } from "@/lib/activity";
import { Reveal } from "./components/reveal";
import { SystemBoard } from "./components/system-board";
import { ScreenViewer, type ViewerApp } from "./components/screen-viewer";
import { EvalLadder } from "./components/eval-ladder";

const EMAIL = "dougkvamme@gmail.com";
const showcase = ["opshub", "hiring", "franchise", "tutors", "hq", "family", "school", "classroom", "sign", "studio"];

const bucketStyle: Record<Bucket, string> = {
  delete: "text-ink-2 line-through decoration-ink-3",
  code: "text-ink",
  agent: "text-signal",
  human: "text-ink",
};

function Arrow() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M3 10a1 1 0 011-1h9.6l-3.3-3.3a1 1 0 111.4-1.4l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4l3.3-3.3H4a1 1 0 01-1-1z" />
    </svg>
  );
}

export default function Home() {
  const viewer: ViewerApp[] = showcase.flatMap((slug) => {
    const a = apps.find((x) => x.slug === slug);
    const shots = shotsFor(slug);
    if (!a || !shots.length) return [];
    return [
      {
        slug,
        name: a.name,
        role: a.role,
        domain: a.domain,
        tagline: a.tagline,
        features: a.features.slice(0, 3).map((f) => ({ title: f.title, item: f.items[0], ai: f.ai })),
        shots,
      },
    ];
  });
  const teardown = cases[0];

  return (
    <>
      {/* First viewport: thesis left, the running system right. */}
      <section className="mx-auto grid max-w-[1200px] gap-12 px-4 pb-20 pt-10 md:px-8 md:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,33rem)] lg:items-center lg:gap-16 lg:pb-28 lg:pt-12">
        <div>
          <p className="flex items-center gap-2.5 text-sm font-medium text-ink-2">
            <span className="beacon h-2 w-2 rounded-full bg-signal-bright" aria-hidden="true" />
            Open to forward deployed AI roles
          </p>
          <h1 className="mt-6 text-[clamp(2.6rem,5.6vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-ink">
            I built the operating system a company runs&nbsp;on.
          </h1>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-ink-2">
            I&apos;m Doug Kvamme, a forward deployed AI engineer. As the only engineer, I shipped ten production apps for
            staff, tutors, families, schools, and franchise owners, plus the AI, data, and reliability platform under
            them. Each one replaced a workflow that lived in spreadsheets, inboxes, or someone&apos;s head.
          </p>
          <div className="animate-rise delay-300 mt-9 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-lg bg-ink px-5 font-semibold text-panel transition-colors hover:bg-field"
            >
              Email me
              <Arrow />
            </a>
            <Link
              href="#apps"
              className="inline-flex min-h-12 items-center rounded-lg border border-rule-strong bg-panel px-5 font-semibold text-ink transition-colors hover:border-ink"
            >
              See the apps
            </Link>
          </div>
        </div>

        <div>
          <SystemBoard />
        </div>
      </section>

      {/* Inside the apps */}
      <section id="apps" className="scroll-mt-20 border-t border-rule bg-panel">
        <div className="mx-auto max-w-[1200px] px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end">
              <h2 className="max-w-[16ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-ink">
                Real screens from the apps people use every day.
              </h2>
              <p className="text-ink-2">
                Shown as Kingside Learning, a fictional brand. Record screens come from a sandbox market and company
                figures are scrambled, so no real customer, tutor, or financial data appears.
              </p>
            </div>
          </Reveal>
          <Reveal className="mt-12">
            <ScreenViewer items={viewer} />
          </Reveal>
        </div>
      </section>

      {/* The referee: the one drenched band. */}
      <section id="eval" className="scroll-mt-16 bg-field text-field-ink">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-center">
          <Reveal>
            <p className="data text-signal-bright">Evals in production</p>
            <h2 className="mt-4 max-w-[14ch] text-[clamp(2rem,4.4vw,3.5rem)] font-extrabold leading-[1] tracking-[-0.03em]">
              The cash forecast has a referee.
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-field-ink-2">
              A separate service grades the production forecast every week against the money that actually landed.
              Its first run caught a naive same-week-last-year baseline beating the model by{" "}
              <span className="font-semibold text-field-ink">2.3x</span>. The fix shipped on evidence, and nothing changes
              now without clearing a noise gate.
            </p>
            <Link
              href="/projects/cash-forecast-eval"
              className="mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-lg bg-field-ink px-5 font-semibold text-field transition-colors hover:bg-panel"
            >
              Read the case study
              <Arrow />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <EvalLadder />
          </Reveal>
        </div>
      </section>

      {/* Method, proven on one real case. */}
      <section className="mx-auto max-w-[1200px] px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)]">
          <Reveal>
            <h2 className="max-w-[15ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-ink">
              Every step gets sorted before anything gets built.
            </h2>
            <p className="mt-5 max-w-[50ch] leading-relaxed text-ink-2">
              I map how the work really flows, then put each step in one bucket: delete it, write plain code, hand it to
              an agent, or keep a person on it. Most of the value comes from the first two, before any model is involved.
            </p>
            <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {(Object.keys(bucketMeta) as Bucket[]).map((b) => (
                <div key={b}>
                  <dt className="font-semibold text-ink">{bucketMeta[b].label}</dt>
                  <dd className="mt-0.5 text-sm text-ink-2">{bucketMeta[b].rule}</dd>
                </div>
              ))}
            </dl>
            <Link href="/method" className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-ink link-underline">
              The full method and four workflows
              <Arrow />
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <figure className="overflow-hidden rounded-[14px] border border-rule bg-panel">
              <div className="flex items-center justify-between gap-3 border-b border-rule px-4 py-3">
                <span className="font-semibold text-ink">{teardown.title}</span>
                <span className="data text-ink-2">sorted</span>
              </div>
              <ol className="divide-y divide-rule">
                {teardown.sort.map((s) => (
                  <li key={s.step} className="grid grid-cols-[minmax(0,1fr)_6.5rem] items-baseline gap-4 px-4 py-3">
                    <span className={`text-sm ${bucketStyle[s.bucket]}`}>{s.step}</span>
                    <span className={`data text-right ${s.bucket === "agent" ? "text-signal" : "text-ink-2"}`}>
                      {bucketMeta[s.bucket].label}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="grid grid-cols-2 border-t border-rule bg-paper">
                {teardown.results.map((r, i) => (
                  <div key={r.label} className={`px-4 py-4 ${i ? "border-l border-rule" : ""}`}>
                    <div className="text-2xl font-extrabold tracking-[-0.02em] text-ink">{r.value}</div>
                    <div className="mt-0.5 text-sm text-ink-2">{r.label}</div>
                  </div>
                ))}
              </div>
              <figcaption className="border-t border-rule px-4 py-3 text-sm text-ink-2">{teardown.guardrail}</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* The platform underneath, as a spec sheet. */}
      <section className="border-t border-rule bg-panel">
        <div className="mx-auto max-w-[1200px] px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end">
              <h2 className="max-w-[17ch] text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-ink">
                The layer underneath, so one person can run all of it.
              </h2>
              <p className="text-ink-2">
                Every model call goes through one governed gateway, every database is backed up and drill-tested, and
                every push is graded by risk before it ships.
              </p>
            </div>
          </Reveal>
          <Reveal className="mt-12">
            <ul className="grid border-t border-rule md:grid-cols-2 md:gap-x-12">
              {platform.map((p) => (
                <li key={p.title} className="border-b border-rule py-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-semibold text-ink">{p.title}</h3>
                    <span className="data shrink-0 text-ink-2">
                      {p.kind}
                      {p.ai ? " · AI" : ""}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{p.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <dl className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                [formatCount(totalCommits), "commits since April"],
                [fleet.apiRoutes, "API routes"],
                [fleet.tests, "test files"],
                [fleet.models, "data models"],
              ].map(([v, l]) => (
                <div key={l} className="flex items-baseline gap-2">
                  <dt className="sr-only">{l}</dt>
                  <dd className="data text-ink">{v}</dd>
                  <dd className="text-sm text-ink-2">{l}</dd>
                </div>
              ))}
            </dl>
            <Link href="/platform" className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink link-underline">
              How the platform works
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
