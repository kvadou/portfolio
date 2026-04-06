import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects, getProject } from "@/lib/projects";
import { TechBadge } from "@/app/components/tech-badge";
import { Reveal } from "@/app/components/reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Doug Kvamme`,
    description: project.pitch,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pb-16 sm:pt-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to projects
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {project.pitch}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {project.demoAdmin ? "Frontend Demo" : "Live Demo"}
              </a>
              {project.demoAdmin && (
                <a
                  href={project.demoAdmin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition-all hover:bg-accent/20"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin Demo
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-accent/30 hover:bg-card"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Source Code
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        {/* Problem & Architecture */}
        <section className="py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                    The Problem
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <p className="mt-6 leading-relaxed text-muted">{project.problem}</p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                    Architecture
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <p className="mt-6 leading-relaxed text-muted">
                  {project.architecture}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section className="pb-16">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Screenshots
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
            </Reveal>
            <div className="mt-8 space-y-8">
              {project.screenshots.map((ss, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="card-glow overflow-hidden rounded-xl border border-border">
                    <Image
                      src={ss.src}
                      alt={ss.label}
                      width={1400}
                      height={875}
                      className="w-full"
                    />
                    <div className="border-t border-border bg-card px-5 py-3">
                      <span className="text-sm text-muted">{ss.label}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Key Features */}
        <section className="pb-16">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Key Features
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {project.highlights.map((h, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-accent/20">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">{h}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Impact */}
        <Reveal>
          <section className="mb-16 rounded-2xl border border-accent/20 bg-accent/5 p-8 sm:p-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Impact
            </span>
            <p className="mt-4 font-display text-2xl font-bold text-foreground sm:text-3xl">
              {project.outcome}
            </p>
          </section>
        </Reveal>

        {/* Next Project */}
        <section className="mb-20 border-t border-border pt-12">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              All projects
            </Link>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all hover:gap-3"
            >
              {nextProject.title}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
