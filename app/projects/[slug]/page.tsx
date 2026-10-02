import { notFound } from "next/navigation";
import Link from "next/link";
import { apps, getApp, layers, shotsFor } from "@/lib/system";
import { TechBadge } from "@/app/components/tech-badge";
import { Reveal } from "@/app/components/reveal";
import { Gallery } from "@/app/components/gallery";
import { SectionLabel } from "@/app/components/section-label";
import { AiBadge } from "@/app/components/ai-badge";
import { CommitStrip } from "@/app/components/commit-strip";
import { activityFor, formatCount } from "@/lib/activity";

export function generateStaticParams() {
  return apps.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return { title: "Not Found" };
  return { title: `${app.name} · Doug Kvamme`, description: app.tagline };
}

export default async function AppPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const shots = shotsFor(app.slug);
  const i = apps.findIndex((a) => a.slug === slug);
  const prev = apps[(i - 1 + apps.length) % apps.length];
  const next = apps[(i + 1) % apps.length];
  const act = activityFor(app.slug);
  const aiCount = app.features.filter((f) => f.ai).length;

  return (
    <>
      <section>
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 pb-12 pt-14 sm:pt-20">
          <Link href="/#apps" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            The system
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="data text-signal">
                {layers[app.layer].label} · {app.role}
              </span>
              {aiCount > 0 && <AiBadge label={`${aiCount} AI feature area${aiCount > 1 ? "s" : ""}`} />}
            </div>
            <h1 className="mt-3 max-w-[22ch] text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1] tracking-[-0.03em] text-ink">{app.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted sm:text-xl">{app.tagline}</p>
            <p className="mt-4 text-sm text-muted">
              <span className="font-semibold text-foreground">Used by: </span>
              {app.users}
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[14px] border border-rule bg-panel lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="border-b border-rule p-4 sm:p-5 lg:border-b-0 lg:border-r">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="data text-ink-2">Commits per week, last 26 weeks</span>
                <span className="data text-ink">{formatCount(act.total)} since Apr 1</span>
              </div>
              <CommitStrip weeks={act.weeks} height={56} className="mt-4 h-14 w-full" />
            </div>
            <dl className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2">
              {app.stats.map((s, idx) => (
                <div
                  key={s.label}
                  className={`border-rule px-4 py-4 sm:px-5 ${idx % 2 ? "border-l" : ""} ${idx > 1 ? "border-t sm:border-t-0 lg:border-t" : ""} ${idx === 2 ? "sm:border-l lg:border-l-0" : ""}`}
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-extrabold tracking-[-0.02em] text-ink">{s.value}</dd>
                  <dd className="mt-0.5 text-sm text-ink-2">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        {shots.length > 0 && (
          <section className="py-14">
            <Reveal>
              <SectionLabel>Walkthrough</SectionLabel>
              <div className="mt-8">
                <Gallery shots={shots} domain={app.domain} />
              </div>
            </Reveal>
          </section>
        )}

        <section className="grid gap-10 pb-16 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <SectionLabel>What it is</SectionLabel>
            <p className="mt-6 text-lg leading-relaxed text-muted">{app.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {app.stack.map((t) => (
                <TechBadge key={t} name={t} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionLabel>Since April</SectionLabel>
            <ol className="mt-6 space-y-4 border-l border-border pl-5">
              {app.recent.map((r) => (
                <li key={r.date + r.text} className="relative">
                  <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-signal-bright" aria-hidden="true" />
                  <span className="font-mono text-xs text-accent">{r.date}</span>
                  <p className="mt-0.5 text-sm leading-relaxed text-foreground">{r.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="pb-16">
          <Reveal>
            <SectionLabel>Feature map</SectionLabel>
          </Reveal>
          <div className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {app.features.map((f, idx) => (
              <Reveal key={f.title} delay={idx * 50}>
                <div className="h-full border-t border-rule py-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-ink">{f.title}</h3>
                    {f.ai && <AiBadge />}
                  </div>
                  <ul className="mt-3 space-y-2">
                    {f.items.map((it) => (
                      <li key={it} className="flex gap-2 text-sm leading-relaxed text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal-bright" aria-hidden="true" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <p className="pb-10 text-xs leading-relaxed text-muted">
          Shown as Kingside Learning. Screenshots come from a fictional sandbox market or have every name and figure
          replaced; no real customer, tutor, or financial data appears.
        </p>

        <nav className="mb-20 flex items-center justify-between gap-4 border-t border-border pt-10" aria-label="More apps">
          <Link href={`/projects/${prev.slug}`} className="group text-sm text-muted hover:text-foreground">
            <span className="block data">Previous</span>
            <span className="font-semibold text-foreground group-hover:text-ink">{prev.name}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group text-right text-sm text-muted hover:text-foreground">
            <span className="block data">Next</span>
            <span className="font-semibold text-foreground group-hover:text-ink">{next.name}</span>
          </Link>
        </nav>
      </div>
    </>
  );
}
