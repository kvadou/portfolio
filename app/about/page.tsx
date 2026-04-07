import type { Metadata } from "next";
import { TechBadge } from "@/app/components/tech-badge";
import { Reveal } from "@/app/components/reveal";

export const metadata: Metadata = {
  title: "About — Doug Kvamme",
  description:
    "Full-stack engineer who built 5 production systems for a $3M education company as sole developer.",
};

const skills = {
  Languages: ["TypeScript", "JavaScript", "SQL", "HTML/CSS", "Python"],
  Frameworks: [
    "Next.js",
    "React",
    "Express.js",
    "Tailwind CSS",
    "TanStack Query",
    "Prisma",
  ],
  Databases: ["PostgreSQL", "Redis", "pgvector", "Supabase"],
  "AI / ML": [
    "Claude API",
    "OpenAI API",
    "RAG Pipelines",
    "Embeddings",
    "Vector Search",
  ],
  "Tools & Infrastructure": [
    "Vercel",
    "Heroku",
    "GitHub Actions",
    "Docker",
    "Stripe",
    "Clerk",
    "NextAuth",
    "Mapbox",
  ],
};

const experience = [
  {
    title: "Replace expensive SaaS",
    description:
      "Replaced $42K+ in annual SaaS spending with custom-built platforms that fit exactly how the business operates.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    title: "Ship for non-technical users",
    description:
      "Every system is used daily by non-technical teams. Polished UI and thoughtful UX are non-negotiable.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Full-stack ownership",
    description:
      "Database design, API architecture, auth, real-time features, AI integration, and responsive frontends — all in one person.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25L12 17.25 2.25 12l4.179-2.25m11.142 0L21.75 12l-9.75 5.25L2.25 12" />
      </svg>
    ),
  },
  {
    title: "AI-native development",
    description:
      "RAG pipelines, embeddings, vector search, and AI-powered content generation integrated into production workflows.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              About
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              I build the tools that<br />businesses run on
            </h1>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m a full-stack engineer who builds production systems that
                replace expensive SaaS. As the sole developer at a $3M education
                company, I&apos;ve designed, built, and shipped 5 applications —
                from operations platforms and AI-powered hiring tools to franchise
                management systems and training portals.
              </p>
              <p>
                Every system I build is used daily by non-technical teams. That means
                polished UI, reliable infrastructure, and thoughtful UX are
                non-negotiable. I work across the full stack: database design,
                API architecture, authentication, real-time features, AI integration,
                and responsive frontends.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        {/* What I Do */}
        <section className="py-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                What I Do
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {experience.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/20 hover:bg-card-hover">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="pb-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                Technical Skills
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
          </Reveal>
          <div className="mt-10 space-y-8">
            {Object.entries(skills).map(([category, items], i) => (
              <Reveal key={category} delay={i * 80}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-8">
                  <h3 className="w-44 shrink-0 text-sm font-semibold uppercase tracking-wider text-muted">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <TechBadge key={skill} name={skill} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <Reveal>
          <section className="mb-20 rounded-2xl border border-accent/20 bg-accent/5 p-12">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Get in touch
            </h2>
            <p className="mt-3 text-muted">
              Looking for a full-stack engineer who ships production systems?
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <a
                href="https://github.com/kvadou"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-4 text-muted transition-all hover:border-accent/20 hover:text-foreground"
              >
                <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <div>
                  <div className="text-sm font-medium text-foreground">GitHub</div>
                  <div className="text-xs text-muted">github.com/kvadou</div>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/dougkvamme"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-4 text-muted transition-all hover:border-accent/20 hover:text-foreground"
              >
                <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <div>
                  <div className="text-sm font-medium text-foreground">LinkedIn</div>
                  <div className="text-xs text-muted">dougkvamme</div>
                </div>
              </a>
              <a
                href="mailto:dougkvamme@gmail.com"
                className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-4 text-muted transition-all hover:border-accent/20 hover:text-foreground"
              >
                <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <div className="text-sm font-medium text-foreground">Email</div>
                  <div className="text-xs text-muted">dougkvamme@gmail.com</div>
                </div>
              </a>
            </div>
          </section>
        </Reveal>
      </div>
    </>
  );
}
