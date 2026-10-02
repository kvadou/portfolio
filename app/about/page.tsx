import type { Metadata } from "next";
import { Reveal } from "@/app/components/reveal";
import { SectionLabel } from "@/app/components/section-label";
import { CommitStrip } from "@/app/components/commit-strip";
import { formatCount, totalCommits, totalWeeks } from "@/lib/activity";

export const metadata: Metadata = {
  title: "About · Doug Kvamme",
  description:
    "Forward deployed AI engineer: maps real business processes, re-engineers them around agents, and ships ten production apps and their AI platform for a multi-market education company as its only engineer.",
};

const log = [
  { when: "2025 to now", role: "VP, Technology and HR", org: "Multi-market education company", line: "Only engineer. Ten production apps, the AI and data platform, and the evals that grade it." },
  { when: "2023 to 2025", role: "Director of HR and Technology", org: "Same company", line: "Built the first systems: an AI applicant tracking system that replaced a paid ATS, then operations and franchise tooling." },
  { when: "2022 to 2023", role: "Leadership Recruiter, Software Engineering", org: "Meta", line: "Hired engineering leaders for Reality Labs: AR/VR, operating systems, firmware." },
  { when: "2021 to 2022", role: "Senior Talent Acquisition Partner", org: "Electric", line: "Engineering and professional services hiring at an IT startup." },
  { when: "2017 to 2021", role: "Recruiter, Talent Advocate", org: "Nerdery", line: "Engineers, designers, and technical PMs for a digital consultancy." },
  { when: "2014 to 2017", role: "Recruiting Manager", org: "Robert Half Technology", line: "Built and ran a recruiting team." },
];

const principles = [
  { title: "Build inside the system of record", body: "Agents go into the tools a team already lives in: Slack, Google Workspace, payroll, scheduling. Where no real system of record existed, I built one and retired the SaaS that didn't fit." },
  { title: "Ship for non-technical users", body: "Every app is used daily by people who did not ask for new software. Polished UI and plain language are the job, not a finish." },
  { title: "Own the whole stack", body: "Schema, API, auth, real-time, AI integration, and responsive frontends, plus the backups, logs, and review gates that let one person run it." },
  { title: "Prove it in production", body: "Numbers before the build, the same numbers after, and production AI graded against real outcomes on a schedule." },
];

const skills: [string, string][] = [
  ["Languages", "TypeScript, JavaScript, SQL, Python"],
  ["Apps", "Next.js, React, Express, NestJS, Prisma, Tailwind"],
  ["Data", "PostgreSQL, pgvector, Redis, Supabase, a cross-app warehouse"],
  ["AI", "Claude and OpenAI APIs, RAG, embeddings, tool-using agents, MCP, LiteLLM, evals"],
  ["Ops", "Vercel, Heroku, GitHub Actions, Docker, Stripe, Sentry"],
];

export default function AboutPage() {
  return (
    <>
      <section>
        <div className="mx-auto grid max-w-[1200px] gap-12 px-4 pb-16 pt-14 md:px-8 md:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-end">
          <div>
            <h1 className="max-w-[16ch] text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1] tracking-[-0.03em] text-ink">
              I ship production AI, not demos.
            </h1>
            <div className="mt-8 max-w-[60ch] space-y-5 text-lg leading-relaxed text-ink-2">
              <p>
                I&apos;m a forward deployed AI engineer. As the only engineer at a multi-market education company, I
                designed and shipped its whole operating system: ten production apps for staff, tutors, families, schools,
                and franchise owners, plus the model gateway, eval harness, warehouse, and reliability layer underneath.
              </p>
              <p>
                Before that I spent a decade recruiting engineers at Meta, Nerdery, and Robert Half, which is where I
                learned how work actually gets done inside a company. That is still the first thing I look at.
              </p>
            </div>
          </div>
          <figure className="rounded-[14px] border border-rule bg-panel p-5">
            <figcaption className="flex items-baseline justify-between gap-3">
              <span className="data text-ink-2">Every repo, per week</span>
              <span className="data text-ink">{formatCount(totalCommits)}</span>
            </figcaption>
            <CommitStrip weeks={totalWeeks} peak={Math.max(...totalWeeks)} height={72} className="mt-4 h-[72px] w-full" />
            <p className="data mt-3 text-ink-2">Commits since Apr 1, one engineer</p>
          </figure>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 pb-24 md:px-8">
        <section className="py-12">
          <Reveal>
            <SectionLabel>Career log</SectionLabel>
            <ol className="mt-8 overflow-hidden rounded-[14px] border border-rule bg-panel">
              {log.map((r) => (
                <li
                  key={r.when}
                  className="grid gap-1 border-b border-rule px-4 py-4 last:border-b-0 sm:px-5 md:grid-cols-[9rem_minmax(0,16rem)_minmax(0,1fr)] md:gap-6"
                >
                  <span className="data pt-1 text-ink-2">{r.when}</span>
                  <span>
                    <span className="block font-semibold text-ink">{r.role}</span>
                    <span className="block text-sm text-ink-2">{r.org}</span>
                  </span>
                  <span className="text-sm leading-relaxed text-ink-2 md:pt-0.5">{r.line}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="py-12">
          <Reveal>
            <SectionLabel>How I work</SectionLabel>
            <dl className="mt-8 grid gap-x-12 sm:grid-cols-2">
              {principles.map((p) => (
                <div key={p.title} className="border-t border-rule py-5">
                  <dt className="font-bold text-ink">{p.title}</dt>
                  <dd className="mt-1.5 leading-relaxed text-ink-2">{p.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        <section className="py-12">
          <Reveal>
            <SectionLabel>Tools I use daily</SectionLabel>
            <dl className="mt-8 overflow-hidden rounded-[14px] border border-rule bg-panel">
              {skills.map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b border-rule px-4 py-3.5 last:border-b-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6 sm:px-5">
                  <dt className="data pt-0.5 text-ink-2">{k}</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>
      </div>
    </>
  );
}
