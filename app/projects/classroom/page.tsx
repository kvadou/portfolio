import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { shotsFor } from "@/lib/system";
import { Reveal } from "@/app/components/reveal";
import { Gallery } from "@/app/components/gallery";
import { SectionLabel } from "@/app/components/section-label";
import { TechBadge } from "@/app/components/tech-badge";
import { ScreenFrame } from "@/app/components/screen-frame";

export const metadata: Metadata = {
  title: "Kingside Classroom, a live chess classroom for kids · Doug Kvamme",
  description:
    "A real-time online classroom that replaced Chessable and Zoom: one synced board for every student, live quizzes, clocked games, video behind a parent-consent gate, and full state recovery when a kid's Wi-Fi drops.",
};

type Shot = ReturnType<typeof shotsFor>[number];

const stats = [
  { value: "337", label: "Commits since Nov 2025" },
  { value: "35", label: "Real-time event handlers" },
  { value: "24", label: "Data models" },
  { value: "~215", label: "Automated tests in CI" },
];

const sync = [
  {
    title: "The tutor moves",
    body: "The tutor plays a move, loads a position, or steps through a game. The client sends it over a WebSocket.",
  },
  {
    title: "The server checks",
    body: "The server confirms the sender is in this classroom and holds the floor, saves the position, and broadcasts it through a Redis adapter, so it works across several servers.",
  },
  {
    title: "Every board updates",
    body: "Each student's board, notation, and turn indicator change at once. Students can't move pieces unless the tutor gives them the floor.",
  },
  {
    title: "Late or dropped? Caught up",
    body: "A student who joins late or reconnects gets the whole state replayed: position, move history, lock state, player assignments, and who holds the floor. The client retries with backoff and says so on screen.",
  },
];

const decisions = [
  {
    title: "Games run on the server, clocks come from timestamps",
    body: "In multi-board games the server decides whether a move is legal and computes each clock from timestamps instead of a ticking loop. A deploy or server restart in the middle of a game loses nothing, and no client can fake a move.",
  },
  {
    title: "No video without a parent's consent",
    body: "A child's profile can't get a video token until a signed-in parent has joined on their behalf, which records consent and writes a COPPA consent entry to the audit log. Tokens go only to that classroom's tutor, an admin, or a participant.",
  },
  {
    title: "One video room per classroom, enforced by a linter",
    body: "Video rooms map one-to-one with classrooms, so a stray room name can't put two lessons together. A lint rule in CI checks it, instead of relying on someone remembering it.",
  },
  {
    title: "Quizzes that can't be gamed",
    body: "Answers stay hidden from students until the tutor reveals them, and revealing is idempotent, so a double click or a reconnect never grades twice.",
  },
  {
    title: "One sign-in from the family portal",
    body: "Families come in from the family portal with single sign-on. The token travels in the URL fragment, never reaches a server log, and is scrubbed from browser history on arrival.",
  },
];

const caveats = [
  "These screenshots come from a local run with a fictional tutor and students. Nothing on this page is from a real lesson or a real child.",
  "The main teaching board trusts the tutor's client for turn rules. Only multi-board games are fully server-authoritative, which is the right trade-off for a tutor-led board, but it is a trade-off.",
  "Staging this lesson surfaced a handful of rough edges (for example, a student's tile showing the parent's name), which went straight into the backlog.",
];

export default function ClassroomPage() {
  const shots = shotsFor("classroom");
  const by = (prefix: string) => shots.find((s) => s.src.includes(`/${prefix}-`));
  const tutor = by("02");
  const student = by("03");
  const phone = by("07");
  const parent = by("08");
  const teaching = ["04", "05", "06", "09"].map(by).filter((s): s is Shot => Boolean(s));

  return (
    <>
      <section>
        <div className="mx-auto max-w-[1200px] px-4 pb-14 pt-14 sm:pt-20 md:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            The system
          </Link>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="data text-signal">Serve every audience</span>
                <span className="data inline-flex items-center gap-2 text-ink-2">
                  <span className="h-2 w-2 rounded-full bg-signal-bright" aria-hidden="true" />
                  In production
                </span>
              </div>
              <h1 className="mt-3 max-w-[18ch] text-[clamp(2.25rem,4.4vw,3.75rem)] font-extrabold leading-[1] tracking-[-0.03em] text-ink">
                Kingside Classroom, a live chess classroom for kids
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
                Tutors teach small groups of young kids online. I built the classroom they teach in, replacing Chessable
                and Zoom: one board that every student sees move by move, live quizzes, clocked games, stickers, and
                video that a child can only join after a parent says yes.
              </p>
              <p className="data mt-6 text-ink-2">Used by tutors, students, and parents · React, NestJS, Socket.IO, LiveKit</p>
            </div>
            <HeroScreens tutor={tutor} phone={phone} />
          </div>

          <dl className="mt-14 grid grid-cols-2 border-y border-rule sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col border-rule py-5 pr-4 [&:not(:first-child)]:sm:border-l [&:not(:first-child)]:sm:pl-6">
                <dt className="data order-2 mt-1 text-ink-2">{s.label}</dt>
                <dd className="order-1 text-2xl font-bold tracking-[-0.02em] text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-field text-field-ink">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-20">
          <p className="max-w-[26ch] text-[clamp(1.5rem,2.8vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.02em]">
            One board. Every screen. In real time.
          </p>
          <p className="mt-5 max-w-[58ch] text-field-ink-2">
            A five-year-old on a family laptop and a tutor on a desktop have to see the same position at the same moment,
            and a dropped connection can&apos;t cost anyone the lesson.
          </p>
          <ol className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {sync.map((s, i) => (
              <li key={s.title} className="relative border-t-2 border-field-ink/40 pb-8 pt-4">
                <span className="absolute -top-[5px] left-0 h-2 w-2 rounded-full bg-signal-bright" aria-hidden="true" />
                <span className="data text-field-ink-2">
                  Step {i + 1} of {sync.length}
                </span>
                <h3 className="mt-2 text-lg font-bold tracking-[-0.01em] text-field-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-field-ink-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        {tutor && student && (
          <section className="py-16">
            <Reveal>
              <SectionLabel>Same moment, two seats</SectionLabel>
              <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-muted">
                The tutor&apos;s screen and Maya&apos;s screen, captured at the same move. Position, notation, and chat
                match because they come from one source.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {[
                { shot: tutor, label: "Tutor" },
                { shot: student, label: "Student" },
              ].map(({ shot, label }, i) => (
                <Reveal key={label} delay={i * 100}>
                  <figure>
                    <ScreenFrame domain={`classroom · ${label.toLowerCase()} view`}>
                      <Image src={shot.src} alt={shot.caption} width={shot.w} height={shot.h} sizes="(min-width: 1024px) 560px, 100vw" />
                    </ScreenFrame>
                    <figcaption className="mt-3 text-sm leading-relaxed text-ink-2">{shot.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {teaching.length > 0 && (
          <section className="pb-16">
            <Reveal>
              <SectionLabel>Teaching tools</SectionLabel>
              <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-muted">
                Quizzes that grade themselves, breakout games with real chess clocks, rewards that keep young kids
                engaged, and a prep view so the tutor knows where each student is in the curriculum.
              </p>
              <div className="mt-8">
                <Gallery shots={teaching} domain="classroom" />
              </div>
            </Reveal>
          </section>
        )}

        <section className="pb-16">
          <Reveal>
            <SectionLabel>Built for kids and their parents</SectionLabel>
          </Reveal>
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {parent && (
              <Reveal>
                <figure>
                  <ScreenFrame domain="classroom · parent dashboard">
                    <Image src={parent.src} alt={parent.caption} width={parent.w} height={parent.h} sizes="(min-width: 1024px) 760px, 100vw" />
                  </ScreenFrame>
                  <figcaption className="mt-3 text-sm leading-relaxed text-ink-2">
                    Parents join with a code, and joining is the consent step for their child&apos;s video. Afterward
                    they see progress, tutor-written lesson summaries, and what&apos;s next.
                  </figcaption>
                </figure>
              </Reveal>
            )}
            {phone && (
              <Reveal delay={100}>
                <figure className="mx-auto max-w-[260px]">
                  <div className="overflow-hidden rounded-[2rem] border-[6px] border-ink bg-ink frame-shadow">
                    <Image src={phone.src} alt={phone.caption} width={phone.w} height={phone.h} className="block h-auto w-full" sizes="260px" />
                  </div>
                  <figcaption className="mt-3 text-sm leading-relaxed text-ink-2">{phone.caption}</figcaption>
                </figure>
              </Reveal>
            )}
          </div>
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
              {["React", "TypeScript", "Vite", "NestJS", "Socket.IO", "Redis", "LiveKit", "PostgreSQL", "Prisma", "Firebase Auth", "GitHub Actions"].map((t) => (
                <TechBadge key={t} name={t} />
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted">
              Shown as Kingside Learning. Screenshots come from a local run with fictional users; no real customer,
              tutor, child, or financial data appears.
            </p>
          </Reveal>
        </section>
      </div>
    </>
  );
}

// The tutor's classroom with the phone view overlapping its corner, so the hero shows desktop and phone at once.
function HeroScreens({ tutor, phone }: { tutor?: Shot; phone?: Shot }) {
  if (!tutor) return null;
  return (
    <div className="relative mx-auto w-full max-w-[680px] pb-[14%] pr-[4%] lg:mx-0">
      <ScreenFrame domain="classroom · live lesson">
        <Image src={tutor.src} alt={tutor.caption} width={tutor.w} height={tutor.h} priority sizes="(min-width: 1024px) 640px, 100vw" />
      </ScreenFrame>
      {phone && (
        <div className="absolute bottom-0 right-0 w-[22%] rotate-2 overflow-hidden rounded-[18%/8%] border-[5px] border-ink bg-ink frame-shadow">
          <Image src={phone.src} alt={phone.caption} width={phone.w} height={phone.h} sizes="150px" className="block h-auto w-full" />
        </div>
      )}
    </div>
  );
}
