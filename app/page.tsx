import Link from "next/link";
import Image from "next/image";
import { apps, appsIn, fleet, layers, platform, shotsFor, type Layer } from "@/lib/system";
import { Reveal } from "./components/reveal";
import { BrowserFrame } from "./components/browser-frame";
import { AiBadge } from "./components/ai-badge";
import { SectionLabel } from "./components/section-label";

const stats = [
  { value: String(fleet.apps), label: "Production apps" },
  { value: fleet.commits, label: "Commits since April" },
  { value: fleet.apiRoutes, label: "API routes" },
  { value: fleet.tests, label: "Test files" },
];

const showcase = ["opshub", "hiring", "franchise", "tutors", "family", "hq"];

function firstShot(slug: string) {
  return shotsFor(slug)[0];
}

export default function Home() {
  const hero = ["opshub", "hiring", "family"].map((s) => ({ slug: s, shot: firstShot(s) })).filter((h) => h.shot);

  return (
    <>
      <section className="hero-gradient relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-20 sm:pb-24 sm:pt-24 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium tracking-wide text-accent">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Open to forward deployed AI roles
            </span>
            <h1 className="animate-fade-up delay-100 mt-7 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              Doug Kvamme
            </h1>
            <p className="animate-fade-up delay-200 mt-3 font-display text-xl text-accent sm:text-2xl">Forward Deployed AI Engineer</p>
            <p className="animate-fade-up delay-300 mt-6 max-w-xl text-lg leading-relaxed text-muted">
              I built a company&apos;s whole operating system as a solo engineer: ten production apps for staff, tutors,
              families, schools, and franchise owners, plus the AI, data, and reliability platform underneath. Every
              app replaced a workflow that used to live in spreadsheets, inboxes, or someone&apos;s head.
            </p>
            <div className="animate-fade-up delay-400 mt-9 flex flex-wrap gap-3">
              <Link href="#system" className="group inline-flex items-center gap-2.5 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20">
                Explore the system
                <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
              <Link href="/method" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent/30 hover:bg-card">
                How I work
              </Link>
              <a href="https://linkedin.com/in/dougkvamme" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent/30 hover:bg-card">
                LinkedIn
              </a>
            </div>
          </div>

          {hero.length > 0 && (
            <Reveal delay={200} className="relative hidden h-[440px] lg:block">
              {hero.map((h, i) => (
                <Link
                  key={h.slug}
                  href={`/projects/${h.slug}`}
                  className="absolute block w-[88%] transition-transform duration-500 hover:z-30 hover:-translate-y-2"
                  style={{ top: `${i * 70}px`, left: `${i * 6}%`, zIndex: 10 + i }}
                  aria-label={`Open ${apps.find((a) => a.slug === h.slug)?.name}`}
                >
                  <BrowserFrame url={apps.find((a) => a.slug === h.slug)?.domain}>
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image src={h.shot!.src} alt={h.shot!.caption} fill className="object-cover object-top" sizes="40vw" priority={i === 0} />
                    </div>
                  </BrowserFrame>
                </Link>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-6 sm:grid-cols-4 sm:divide-x sm:divide-border">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="px-4 py-9 text-center">
                <div className="font-display text-3xl font-bold text-accent sm:text-4xl">{s.value}</div>
                <div className="mt-2 text-xs font-medium uppercase tracking-widest text-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <section id="system" className="scroll-mt-24 py-20">
          <Reveal>
            <SectionLabel>The system</SectionLabel>
            <h2 className="mt-6 max-w-3xl font-display text-3xl font-bold text-foreground sm:text-4xl">
              One operating system, four layers
            </h2>
            <p className="mt-4 max-w-3xl text-muted">
              Every app shares one design system, one sign-in, one app launcher, and one platform for AI, data, and
              reliability. Shown here as Kingside Learning; the real company is a multi-market children&apos;s education
              business.
            </p>
          </Reveal>

          <div className="mt-10 space-y-8">
            {(["operate", "grow", "serve"] as Layer[]).map((layer) => (
              <Reveal key={layer}>
                <div className="grid gap-4 lg:grid-cols-[13rem_1fr]">
                  <div className="pt-1">
                    <h3 className="font-display text-lg font-bold text-foreground">{layers[layer].label}</h3>
                    <p className="mt-1 text-sm text-muted">{layers[layer].blurb}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {appsIn(layer).map((a) => {
                      const shot = firstShot(a.slug);
                      const ai = a.features.some((f) => f.ai);
                      return (
                        <Link key={a.slug} href={`/projects/${a.slug}`} className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-accent/40">
                          <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-surface">
                            {shot ? (
                              <Image src={shot.src} alt="" fill className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 640px) 100vw, 25vw" />
                            ) : (
                              <div className="flex h-full items-center justify-center font-display text-2xl text-muted/40">{a.name}</div>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-semibold text-foreground group-hover:text-accent">{a.name}</span>
                              {ai && <AiBadge />}
                            </div>
                            <p className="mt-1 text-xs text-muted">{a.role}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div className="grid gap-4 lg:grid-cols-[13rem_1fr]">
                <div className="pt-1">
                  <h3 className="font-display text-lg font-bold text-foreground">{layers.platform.label}</h3>
                  <p className="mt-1 text-sm text-muted">{layers.platform.blurb}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5">
                  <div className="flex flex-wrap gap-2">
                    {platform.map((p) => (
                      <span key={p.title} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-sm text-foreground">
                        {p.ai && <span className="h-1.5 w-1.5 rounded-full bg-violet-500" aria-hidden="true" />}
                        {p.title}
                      </span>
                    ))}
                  </div>
                  <Link href="/platform" className="mt-4 inline-flex text-sm font-semibold text-accent hover:underline">
                    See the platform
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Reveal>
          <section id="eval" className="mb-20 scroll-mt-24 overflow-hidden rounded-2xl border border-accent/20 bg-accent/5">
            <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">Case study · Evals in production</span>
                <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
                  The cash forecast has a referee
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  An independent service grades the production cash forecast every week against money that actually
                  landed. Its first run caught a naive same-week-last-year baseline beating the model 2.3x. The fix
                  shipped on evidence, and nothing changes now without clearing a noise gate.
                </p>
                <Link href="/projects/cash-forecast-eval" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-all hover:scale-[1.02]">
                  Read the case study
                </Link>
              </div>
              <dl className="grid grid-cols-2 gap-3">
                {[
                  ["84%", "Live accuracy, rolling 4-week"],
                  ["92%", "Best replay candidate"],
                  ["2.3x", "Baseline beat the first model"],
                  ["95%", "Target"],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-xl border border-border bg-background p-4">
                    <dt className="sr-only">{l}</dt>
                    <dd className="font-display text-3xl font-bold text-foreground">{v}</dd>
                    <dd className="mt-1 text-xs text-muted">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </Reveal>

        <section className="pb-12">
          <Reveal>
            <SectionLabel>Inside the apps</SectionLabel>
          </Reveal>
          <div className="mt-10 space-y-20">
            {showcase.map((slug, i) => {
              const a = apps.find((x) => x.slug === slug)!;
              const shot = firstShot(slug);
              return (
                <Reveal key={slug}>
                  <article className="grid items-center gap-10 lg:grid-cols-2">
                    <div className={i % 2 ? "lg:order-2" : ""}>
                      <span className="text-xs font-semibold uppercase tracking-widest text-accent">{a.role}</span>
                      <h3 className="mt-2 font-display text-3xl font-bold text-foreground">{a.name}</h3>
                      <p className="mt-3 leading-relaxed text-muted">{a.tagline}</p>
                      <ul className="mt-5 space-y-2">
                        {a.features.slice(0, 4).map((f) => (
                          <li key={f.title} className="flex items-start gap-2 text-sm text-foreground/90">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            <span>
                              <span className="font-semibold">{f.title}:</span> <span className="text-muted">{f.items[0]}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Link href={`/projects/${slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3">
                        Full walkthrough
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                    {shot && (
                      <Link href={`/projects/${slug}`} className="group block" aria-label={`${a.name} walkthrough`}>
                        <BrowserFrame url={a.domain} className="transition-transform duration-500 group-hover:scale-[1.01]">
                          <Image src={shot.src} alt={shot.caption} width={shot.w} height={shot.h} className="w-full" sizes="(max-width: 1024px) 100vw, 50vw" />
                        </BrowserFrame>
                      </Link>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <Reveal>
          <section className="mb-20 mt-12 rounded-2xl border border-border bg-card p-10 text-center sm:p-12">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Want this inside your company?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              I map how the work really flows, decide what should be code, agents, or people, and ship it inside the
              tools your team already uses.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="mailto:dougkvamme@gmail.com" className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-all hover:scale-[1.02]">
                Get in touch
              </a>
              <Link href="/method" className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground hover:border-accent/30">
                Read the method
              </Link>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
