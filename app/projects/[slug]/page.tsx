import { notFound } from "next/navigation";
import Link from "next/link";
import { apps, getApp, layers, shotsFor } from "@/lib/system";
import { TechBadge } from "@/app/components/tech-badge";
import { Reveal } from "@/app/components/reveal";
import { Gallery } from "@/app/components/gallery";
import { SectionLabel } from "@/app/components/section-label";
import { AiBadge } from "@/app/components/ai-badge";

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
  const aiCount = app.features.filter((f) => f.ai).length;

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-14 sm:pt-20">
          <Link href="/#system" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            The system
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                {layers[app.layer].label} · {app.role}
              </span>
              {aiCount > 0 && <AiBadge label={`${aiCount} AI feature area${aiCount > 1 ? "s" : ""}`} />}
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{app.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted sm:text-xl">{app.tagline}</p>
            <p className="mt-4 text-sm text-muted">
              <span className="font-semibold text-foreground">Used by: </span>
              {app.users}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {app.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-4">
                <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-widest text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
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
                  <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
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
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {app.features.map((f, idx) => (
              <Reveal key={f.title} delay={idx * 50}>
                <div className="h-full rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
                    {f.ai && <AiBadge />}
                  </div>
                  <ul className="mt-3 space-y-2">
                    {f.items.map((it) => (
                      <li key={it} className="flex gap-2 text-sm leading-relaxed text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" aria-hidden="true" />
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
            <span className="block text-xs uppercase tracking-widest">Previous</span>
            <span className="font-semibold text-foreground group-hover:text-accent">{prev.name}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group text-right text-sm text-muted hover:text-foreground">
            <span className="block text-xs uppercase tracking-widest">Next</span>
            <span className="font-semibold text-foreground group-hover:text-accent">{next.name}</span>
          </Link>
        </nav>
      </div>
    </>
  );
}
