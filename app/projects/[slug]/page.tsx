import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects, getProject } from "@/lib/projects";
import { TechBadge } from "@/app/components/tech-badge";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Use a sync approach for metadata
  return params.then((p) => {
    const project = getProject(p.slug);
    if (!project) return { title: "Project Not Found" };
    return {
      title: `${project.title} — Doug Kvamme`,
      description: project.pitch,
    };
  });
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

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to projects
      </Link>

      {/* Hero */}
      <div className="mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {project.pitch}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
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
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
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
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      {/* Problem */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">The Problem</h2>
        <p className="mt-3 leading-relaxed text-muted">{project.problem}</p>
      </section>

      {/* Architecture */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">Architecture</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
        <p className="mt-4 leading-relaxed text-muted">
          {project.architecture}
        </p>
      </section>

      {/* Screenshots */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">Screenshots</h2>
          <div className="mt-4 space-y-6">
            {project.screenshots.map((ss, i) => (
              <div key={i} className="overflow-hidden rounded-lg border border-border">
                <Image
                  src={ss.src}
                  alt={ss.label}
                  width={1400}
                  height={875}
                  className="w-full"
                />
                <div className="border-t border-border bg-card px-4 py-2">
                  <span className="text-sm text-muted">{ss.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Features */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">Key Features</h2>
        <ul className="mt-4 space-y-2.5">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-3 text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Impact */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">Impact</h2>
        <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-6">
          <p className="text-lg font-medium text-foreground">
            {project.outcome}
          </p>
        </div>
      </section>

      {/* Bottom nav */}
      <div className="mt-16 border-t border-border pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-accent transition-colors hover:text-accent-hover"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to all projects
        </Link>
      </div>
    </div>
  );
}
