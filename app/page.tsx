import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { TechBadge } from "./components/tech-badge";
import { Reveal } from "./components/reveal";

const stats = [
  { value: "5", label: "Production Apps" },
  { value: "600+", label: "API Routes" },
  { value: "400+", label: "DB Models" },
  { value: "$42K+", label: "SaaS Replaced" },
];

export default function Home() {
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-24 sm:pb-28 sm:pt-32">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium tracking-wide text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Open to opportunities
            </span>
          </div>
          <h1 className="animate-fade-up delay-100 mt-8 font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl">
            Doug Kvamme
          </h1>
          <p className="animate-fade-up delay-200 mt-4 font-display text-xl text-accent sm:text-2xl">
            Full-Stack Engineer
          </p>
          <p className="animate-fade-up delay-300 mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            I build production systems that replace expensive SaaS. Solo
            full-stack engineer with 5 applications in production — from
            operations platforms and AI-powered hiring tools to franchise
            management systems used daily by non-technical teams.
          </p>
          <div className="animate-fade-up delay-400 mt-10 flex flex-wrap gap-4">
            <a
              href="https://github.com/kvadou"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/dougkvamme"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent/30 hover:bg-card"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="mailto:doug@dougkvamme.com"
              className="group inline-flex items-center gap-2.5 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent/30 hover:bg-card"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div className={`py-8 text-center ${i > 0 ? "border-l border-border" : ""}`}>
                  <div className="font-display text-3xl font-bold text-accent sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-widest text-muted">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        {/* Featured Project */}
        <section className="py-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Featured Work
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <Link
              href={`/projects/${featured.slug}`}
              className="card-glow group mt-8 block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-accent/20"
            >
              <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800 lg:aspect-auto lg:min-h-[400px]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <span className="text-xs font-medium uppercase tracking-widest text-accent">
                    Operations Platform
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted">
                    {featured.pitch}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {featured.stack.map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                  </div>
                  <p className="mt-6 text-sm font-medium text-foreground">
                    {featured.outcome}
                  </p>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3">
                      View Case Study
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </section>

        {/* Other Projects */}
        <section className="pb-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                More Projects
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {rest.map((project, i) => (
              <Reveal key={project.slug} delay={i * 100}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="card-glow group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-accent/20"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="font-display text-lg font-bold text-foreground drop-shadow-sm">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 pt-4">
                    <p className="text-sm leading-relaxed text-muted">
                      {project.pitch}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((tech) => (
                        <TechBadge key={tech} name={tech} />
                      ))}
                      {project.stack.length > 4 && (
                        <span className="inline-flex items-center rounded-md border border-zinc-500/20 bg-zinc-500/10 px-2 py-0.5 text-[11px] font-medium text-muted">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs text-muted">{project.outcome}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent transition-all group-hover:gap-2">
                        View
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <Reveal>
          <section className="mb-20 rounded-2xl border border-accent/20 bg-accent/5 p-12 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Let&apos;s build something together
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              I specialize in replacing fragmented SaaS with unified, custom-built platforms.
              Looking for a full-stack engineer who ships?
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:doug@dougkvamme.com"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-background transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20"
              >
                Get in Touch
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/dougkvamme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent/30 hover:bg-card"
              >
                Connect on LinkedIn
              </a>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
