import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { shotsFor } from "@/lib/system";
import { Reveal } from "@/app/components/reveal";
import { Gallery } from "@/app/components/gallery";
import { SectionLabel } from "@/app/components/section-label";
import { TechBadge } from "@/app/components/tech-badge";
import { ScreenFrame } from "@/app/components/screen-frame";

const DEMO = "https://drpv8p7ep5jv3.cloudfront.net";
const REPO = "https://github.com/kvadou/cubby";

export const metadata: Metadata = {
  title: "Cubby, a preschool ops copilot · Doug Kvamme",
  description:
    "A personal project on a stack I hadn't shipped before: Rails, Sidekiq, React and TypeScript, SwiftUI, Kotlin, Terraform, EKS, and Bedrock. Rules find the work, a model drafts, a director approves, and parents see it on their phones. Live demo, no sign-up.",
};

const loop = [
  {
    title: "Rules find the work",
    body: "Plain Ruby detectors scan each center nightly: a stale waitlist entry with an open seat for that age, past-due tuition, a room that will be under ratio tomorrow. Each finding carries the facts behind it.",
  },
  {
    title: "One open item per problem",
    body: "A partial unique index allows one open action per kind and subject, so a rescan refreshes the card instead of piling up duplicates, and an item that fixes itself closes on its own.",
  },
  {
    title: "A model drafts",
    body: "For family-facing items, Claude drafts the message from the facts plus the center's own handbook, and Cubby checks the amounts, names, and citations before a director sees it. A draft that fails the checks falls back to plain starting text built from the same facts.",
  },
  {
    title: "A director decides",
    body: "Approve, edit, snooze, or dismiss with a reason. Nothing reaches a family until a person approves it.",
  },
  {
    title: "Parents see it",
    body: "Approval writes the family's message in the same database transaction, so it lands in the parent app's inbox or not at all.",
  },
  {
    title: "Every decision is measured",
    body: "Each change publishes an event through an outbox to SNS and SQS. A consumer builds the analytics: approval rate, time to decision, drafts sent as written, AI cost per message.",
  },
];

const layers = [
  { name: "API and jobs", body: "Rails 8.1 in API mode, Sidekiq and sidekiq-cron, PostgreSQL 17 with pgvector, Redis or Valkey" },
  { name: "Director app", body: "React and TypeScript on Vite, TanStack Query, cookie sessions with a same-origin check" },
  { name: "Parent apps", body: "SwiftUI on iOS 18 (Keychain token) and Kotlin with Jetpack Compose on Android 10 (Keystore-encrypted token)" },
  { name: "AI", body: "Claude on Bedrock or the Anthropic API behind one client (Haiku 5.5 drafts, Sonnet 5.5 agent and judge), handbook retrieval with pgvector or Postgres full text, a tool-use agent for questions, and an eval suite that grades drafts" },
  { name: "Infrastructure", body: "Terraform, Docker, EKS with FluxCD, RDS, ElastiCache, SNS and SQS, S3 and CloudFront, GitHub Actions with OIDC, CloudWatch alarms" },
];

const decisions = [
  {
    title: "Constraints in the database, not just the model",
    body: "One open action per problem, one active enrollment per child, and paid invoices must have a paid date. These are partial unique indexes and check constraints, so a race between two jobs fails safely instead of creating a second nudge to the same family.",
  },
  {
    title: "Tenancy as a 404",
    body: "Every center-scoped query starts from the signed-in director's centers, and parents are scoped to their own family the same way. Another center's record is a 404 that doesn't reveal whether it exists. Request specs check it for directors and parents.",
  },
  {
    title: "Two ways to run on AWS",
    body: "The full stack is EKS with Flux, RDS, and Valkey behind an internal load balancer, about $5 a day, brought up and down on demand. The always-on demo is one Graviton instance running the same image under Docker Compose for about $18 a month. Both sit behind the same CloudFront distribution, which can only reach them through a private VPC origin.",
  },
  {
    title: "GitOps on both",
    body: "CI builds an arm64 image, pushes it to ECR with an immutable tag, and commits that tag to the deploy manifests. Flux applies it on EKS, and a timer on the demo host deploys the same tag.",
  },
  {
    title: "Reviewed before it went public",
    body: "An independent security review of the public demo found no high-severity issues. All four medium findings were fixed before the first deploy: secrets in the boot log, containers that could reach the instance role, a data wipe guarded only by configuration, and one visitor being able to use up a shared account's limits.",
  },
];

const caveats = [
  "My AWS account is still waiting on Bedrock model access, so the live demo runs the same AI code through the Anthropic API instead: one client speaks both, and handbook search uses Postgres full text until Titan embeddings are available.",
  "Analytics before today is generated demo history, labelled as such on the page. Decisions you make in the demo arrive through the real event pipeline.",
  "All data is fictional and generated with dates relative to today. No real center, family, or child is involved.",
  "The phone apps run in the iOS simulator and Android emulator. They aren't in either app store.",
  "Demo visitors share one director account, and everything they change is reset every night.",
];

export default function CubbyPage() {
  const shots = shotsFor("cubby");
  const director = shots.filter((s) => /\/0[12]-/.test(s.src));
  const ios = shots.filter((s) => s.src.includes("-ios-"));
  const android = shots.filter((s) => s.src.includes("-android-"));
  const inbox = director[0];
  const iphone = ios[0];
  const pixel = android[1] ?? android[0];
  return (
    <>
      <section>
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 pb-14 pt-14 sm:pt-20">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            All work
          </Link>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="data text-signal">Personal project</span>
              <span className="data inline-flex items-center gap-2 text-ink-2">
                <span className="h-2 w-2 rounded-full bg-signal-bright" aria-hidden="true" />
                Live demo
              </span>
            </div>
            <h1 className="mt-3 max-w-[22ch] text-[clamp(2.25rem,4.4vw,3.75rem)] font-extrabold leading-[1] tracking-[-0.03em] text-ink">
              Cubby, an operations copilot for preschool directors
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
              Childcare software is good at recording what happened. Cubby turns those records into a short daily queue
              of what a director should do next, drafts the message to the family, and waits for a person to approve it.
              I built it on a stack I hadn&apos;t shipped before (Rails, SwiftUI, Kotlin, Terraform, and EKS) to prove I
              can go end to end on someone else&apos;s production stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={DEMO}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-lg bg-ink px-5 font-semibold text-paper transition-colors hover:bg-ink-2"
              >
                Try the live demo
              </a>
              <a
                href={REPO}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-lg border border-rule px-5 font-semibold text-ink transition-colors hover:bg-panel"
              >
                Source on GitHub
              </a>
            </div>
            <p className="data mt-4 text-ink-2">One click signs you in as a fictional director. No sign-up, nothing to install.</p>
          </div>
          <HeroScreens inbox={inbox} iphone={iphone} pixel={pixel} />
          </div>
        </div>
      </section>

      <section className="bg-field text-field-ink">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-20">
          <p className="max-w-[26ch] text-[clamp(1.5rem,2.8vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.02em]">
            Rules find the work. A model drafts. A person decides.
          </p>
          <p className="mt-5 max-w-[56ch] text-field-ink-2">
            The model never decides what needs doing and never sends anything. Deterministic rules find problems you can
            check by hand, so the AI only writes, and an eval suite grades what it writes.
          </p>
          <ol className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {loop.map((s, i) => (
              <li key={s.title} className="relative border-t-2 border-field-ink/40 pb-8 pt-4">
                <span className="absolute -top-[5px] left-0 h-2 w-2 rounded-full bg-signal-bright" aria-hidden="true" />
                <span className="data text-field-ink-2">
                  Step {i + 1} of {loop.length}
                </span>
                <h3 className="mt-2 text-lg font-bold tracking-[-0.01em] text-field-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-field-ink-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <section className="py-16">
          <Reveal>
            <SectionLabel>What the director sees</SectionLabel>
            <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-muted">
              The queue groups the day&apos;s work by type, with the facts behind each item. Family-facing items open a
              message the director can edit before approving.
            </p>
            <div className="mt-8">
              <Gallery shots={director} domain="drpv8p7ep5jv3.cloudfront.net" />
            </div>
          </Reveal>
        </section>

        <section className="pb-16">
          <Reveal>
            <SectionLabel>What the parent sees</SectionLabel>
            <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-muted">
              Two native apps on the same family API. The message in each inbox is the one the director approved
              above.
            </p>
          </Reveal>
          {[
            { name: "iPhone", stack: "SwiftUI", list: ios },
            { name: "Android", stack: "Kotlin and Jetpack Compose", list: android },
          ].map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-bold tracking-[-0.01em] text-ink">{p.name}</h3>
                <span className="data text-ink-2">{p.stack}</span>
              </div>
              <ul className="mt-4 grid grid-cols-3 gap-3 sm:gap-6 lg:max-w-[52rem]">
                {p.list.map((s) => (
                  <li key={s.src}>
                    <figure>
                      <div className="overflow-hidden rounded-[14px] border border-rule bg-panel">
                        <Image src={s.src} alt={s.caption} width={s.w} height={s.h} className="h-auto w-full" sizes="(min-width: 1024px) 16rem, 30vw" />
                      </div>
                      <figcaption className="mt-2 hidden text-sm leading-relaxed text-ink-2 sm:block">{s.caption}</figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </section>

        <section className="pb-16">
          <Reveal>
            <SectionLabel>The stack</SectionLabel>
            <dl className="mt-8 divide-y divide-rule border-y border-rule">
              {layers.map((l) => (
                <div key={l.name} className="grid gap-1 py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="font-semibold text-ink">{l.name}</dt>
                  <dd className="text-sm leading-relaxed text-muted">{l.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        <section className="pb-16">
          <Reveal>
            <SectionLabel>Decisions worth explaining</SectionLabel>
          </Reveal>
          <Reveal>
            <ol className="mt-8 border-l-2 border-rule">
              {decisions.map((d) => (
                <li key={d.title} className="relative pb-8 pl-6 last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-signal-bright" aria-hidden="true" />
                  <h3 className="text-lg font-bold tracking-[-0.01em] text-ink">{d.title}</h3>
                  <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-ink-2">{d.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="pb-16">
          <Reveal>
            <SectionLabel>Honest caveats</SectionLabel>
            <ul className="mt-6 max-w-3xl space-y-3">
              {caveats.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-bright" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="pb-24">
          <Reveal>
            <SectionLabel>Built with</SectionLabel>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Ruby on Rails", "Sidekiq", "PostgreSQL", "pgvector", "React", "TypeScript", "SwiftUI", "Kotlin", "Jetpack Compose", "AWS Bedrock", "Terraform", "Amazon EKS", "FluxCD", "Docker", "GitHub Actions"].map((t) => (
                <TechBadge key={t} name={t} />
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
              Built in phases with Claude Code: research and a written plan for each phase, tests before the push, and
              an independent review on anything touching auth or the public internet. More than 200 API specs, plus
              client tests and UI flow tests on both phone apps, and CI on every part of the repo.
            </p>
          </Reveal>
        </section>
      </div>
    </>
  );
}

type Shot = ReturnType<typeof shotsFor>[number];

// Desktop inbox with both phone apps overlapping it, so the hero shows all three clients at a glance.
function HeroScreens({ inbox, iphone, pixel }: { inbox?: Shot; iphone?: Shot; pixel?: Shot }) {
  if (!inbox) return null;
  return (
    <a
      href={DEMO}
      aria-label="Open the live demo"
      className="group relative mx-auto block w-full max-w-[640px] pb-[18%] pr-[6%] lg:mx-0"
    >
      <ScreenFrame domain="cubby · director inbox" className="transition-transform duration-300 group-hover:-translate-y-0.5">
        <Image src={inbox.src} alt={inbox.caption} width={inbox.w} height={inbox.h} priority sizes="(min-width: 1024px) 600px, 100vw" />
      </ScreenFrame>
      {iphone && <Phone shot={iphone} className="bottom-0 right-[22%] w-[22%] -rotate-2" />}
      {pixel && <Phone shot={pixel} className="bottom-[4%] right-0 w-[21%] rotate-2" />}
    </a>
  );
}

function Phone({ shot, className }: { shot: Shot; className: string }) {
  return (
    <div className={`absolute overflow-hidden rounded-[18%/8%] border-[5px] border-ink bg-ink frame-shadow ${className}`}>
      <Image src={shot.src} alt={shot.caption} width={shot.w} height={shot.h} sizes="140px" className="block h-auto w-full" />
    </div>
  );
}
