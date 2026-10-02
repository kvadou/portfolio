import type { Metadata } from "next";
import { Reveal } from "@/app/components/reveal";
import { SectionLabel } from "@/app/components/section-label";

export const metadata: Metadata = {
  title: "Method · Doug Kvamme",
  description:
    "How I deploy AI into a business: map the real process, sort every step into delete, code, agent, or human, build inside the systems people already use, and prove it with before-and-after numbers.",
};

import { bucketMeta, cases, steps, type Bucket } from "@/lib/method";

const tone: Record<Bucket, string> = {
  delete: "border-rule text-ink-3 line-through",
  code: "border-rule-strong text-ink",
  agent: "border-signal/40 bg-signal-wash text-signal",
  human: "border-ink bg-ink text-panel",
};

function BucketChip({ bucket }: { bucket: Bucket }) {
  const m = bucketMeta[bucket];
  return (
    <span
      className={`data inline-flex shrink-0 items-center rounded-[4px] border px-1.5 py-0.5 ${tone[bucket]}`}
    >
      {m.label}
    </span>
  );
}

export default function MethodPage() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-[1200px] px-4 pb-14 pt-14 md:px-8 md:pt-20">
          <h1 className="max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1] tracking-[-0.03em] text-ink">
            AI goes into the process, not on top of it.
          </h1>
          <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-ink-2">
            Most AI projects stall because they skip the boring part. Before anything gets built, I find out how the
            work actually flows, what each loop costs, and which steps should not exist at all. Then the agents go where
            the judgment is, the code goes where it isn&apos;t, and people keep the decisions that matter.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 pb-24 md:px-8">
        <section className="py-10">
          <Reveal>
            <SectionLabel>Five steps</SectionLabel>
            <ol className="mt-6">
              {steps.map((s) => (
                <li key={s.n} className="grid gap-2 border-b border-rule py-7 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-8">
                  <span className="data pt-1.5 text-signal">Step {Number(s.n)}</span>
                  <div className="max-w-[68ch]">
                    <h3 className="text-xl font-bold tracking-[-0.015em] text-ink">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-2">{s.body}</p>
                    {s.n === "03" && (
                      <dl className="mt-5 overflow-hidden rounded-[14px] border border-rule bg-panel">
                        {(Object.keys(bucketMeta) as Bucket[]).map((b) => (
                          <div key={b} className="grid gap-1 border-b border-rule px-4 py-3 last:border-b-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4">
                            <dt>
                              <BucketChip bucket={b} />
                            </dt>
                            <dd className="text-sm leading-relaxed text-ink-2">{bucketMeta[b].rule}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="py-10">
          <Reveal>
            <SectionLabel>Four workflows in production</SectionLabel>
            <p className="mt-4 max-w-[62ch] text-ink-2">
              Each one sorted step by step. All are live and run by non-technical operators.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {cases.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <article className="flex h-full flex-col overflow-hidden rounded-[14px] border border-rule bg-panel">
                  <div className="px-5 pb-4 pt-5">
                    <h3 className="text-xl font-bold tracking-[-0.015em] text-ink">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">{c.context}</p>
                  </div>
                  <ol className="divide-y divide-rule border-y border-rule">
                    {c.sort.map((row) => (
                      <li key={row.step} className="flex items-start justify-between gap-4 px-5 py-3 text-sm">
                        <span className={row.bucket === "delete" ? "text-ink-2 line-through decoration-ink-3" : "text-ink"}>{row.step}</span>
                        <BucketChip bucket={row.bucket} />
                      </li>
                    ))}
                  </ol>
                  <dl className="grid grid-cols-2 bg-paper">
                    {c.results.map((r, j) => (
                      <div key={r.label} className={`px-5 py-4 ${j ? "border-l border-rule" : ""}`}>
                        <dt className="sr-only">{r.label}</dt>
                        <dd className="text-xl font-extrabold tracking-[-0.02em] text-ink">{r.value}</dd>
                        <dd className="mt-0.5 text-sm text-ink-2">{r.label}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-auto border-t border-rule px-5 py-4 text-sm leading-relaxed text-ink-2">
                    <span className="font-semibold text-ink">Guardrail: </span>
                    {c.guardrail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
