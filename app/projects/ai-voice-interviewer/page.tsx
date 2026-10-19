import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/app/components/reveal";
import { SectionLabel } from "@/app/components/section-label";
import { AiBadge } from "@/app/components/ai-badge";
import { TechBadge } from "@/app/components/tech-badge";

export const metadata: Metadata = {
  title: "AI Voice Interviewer · Doug Kvamme",
  description:
    "Bella, a voice AI phone screen for tutor hiring: grounded in real recruiter calls, scored on a weighted rubric, run in production, and retired on purpose when candidates told us they wanted a human first.",
};

const flow = [
  {
    title: "Candidate applies",
    body: "The applicant lands on a private status portal. No account, no app to install.",
  },
  {
    title: "Text screen first",
    body: "About a dozen questions in a chat, each with its own evaluation prompt. Knockouts are explicit; a weak answer is never treated as a knockout.",
  },
  {
    title: "Voice call in the browser",
    body: "Strong text screens unlock a live voice interview with Bella over WebRTC, with live captions. Calls that are too short or have no candidate audio are marked failed, not scored, and can be retried.",
  },
  {
    title: "Signed webhooks",
    body: "When the call ends, a signature-verified webhook stores the transcript, recording, and cost. When analysis lands, the scorer runs.",
  },
  {
    title: "Structured scorecard",
    body: "A JSON scorecard across six weighted dimensions, plus a summary, strengths, and concerns, with ADVANCE, REVIEW, or REJECT bands.",
  },
  {
    title: "Human decision",
    body: "Recruiters see the transcript, recording, and scorecard and record their own decision. Slack and email alerts fire, and a phone-screen scheduler is offered next.",
  },
];

const rubric: { label: string; weight: number; note: string }[] = [
  { label: "Creative background", weight: 25, note: "Theater, music, improv, storytelling" },
  { label: "Experience with kids", weight: 25, note: "Especially ages 3 to 8" },
  { label: "Availability", weight: 15, note: "Part-time afternoon fit" },
  { label: "Location", weight: 15, note: "Market and transportation fit" },
  { label: "Motivation", weight: 10, note: "Interest in the mission and role" },
  { label: "Chess", weight: 10, note: "Basic familiarity, nothing advanced" },
];

const built = [
  {
    when: "Late Mar to Apr",
    title: "Ground truth first",
    body: "Pulled 26 of my own recorded phone screens from the phone system, transcribed them, and extracted the questions, follow-ups, and criteria I actually use. Compared six voice vendors on cost and capability before writing code.",
  },
  {
    when: "Apr 8 to 9",
    title: "First version in two days",
    body: "Text screen, browser voice call, webhook pipeline, GPT-4o scorecard, and the recruiter view shipped behind per-job flags, then went live for headquarters markets.",
  },
  {
    when: "Apr to May",
    title: "Hardened on real calls",
    body: "Fixed about 22 seconds of garbled speech at the start of calls by cleaning the prompt before it is synced to the voice agent. Tuned turn-taking. After reviewing the first 10 calls, added hard caps for car-dependent markets and contradicted motivation, because the scorer was too generous.",
  },
  {
    when: "May to Jun",
    title: "Tools for the people running it",
    body: "A configuration hub with calibration and a sandbox playground that shares the production scorer so the two cannot drift. Per-call cost tracking, throughput and automation-coverage metrics, and a regression eval that scores each call three times and takes the majority.",
  },
  {
    when: "Jun 23",
    title: "Retired on purpose",
    body: "Candidates for a role working with young children were wary of an AI first conversation, and the team wanted a person at the first touch. A kill switch turned it off for every job in one change. The replacement is a plain questionnaire where people make every call except two legal knockouts.",
  },
];

const guardrails = [
  "The AI score and recommendation are stripped from anything the candidate can see.",
  "Interviewers can't see the AI score until they submit their own scorecard, enforced in the API, not just the UI.",
  "Franchise markets never auto-advance or auto-reject, use the franchisee's own legal name in the persona, and fail closed.",
  "If a candidate asks for a human, the transcript check alerts a recruiter.",
  "Sandbox calls route down a separate path, guarded by an isolation test.",
  "One flag per job, one per market, and a global kill switch.",
];

const caveats = [
  "Volume was small: a 10-call review and 13 voice screens in a 90-day calibration audit. That is a pilot, not a statistic.",
  "Recruiters rarely recorded their own decision, so the scorer was never validated against human judgment. The eval measures consistency, not accuracy.",
  "The ROI model in the product uses assumed minutes per screen. I don't claim hours saved.",
  "The best decision in the project was turning it off. The pipeline, scorer, and guardrails now power the human-first questionnaire.",
];

export default function AiVoiceInterviewerPage() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 pb-14 pt-14 sm:pt-20">
          <Link href="/projects/hiring" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Hiring
          </Link>
          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="data text-signal">Case study</span>
              <AiBadge label="Voice AI" />
            </div>
            <h1 className="mt-3 max-w-[22ch] text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1] tracking-[-0.03em] text-ink">
              A voice AI interviewer, built from my own phone screens
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted sm:text-xl">
              After a decade of recruiting, I was still doing about 50 tutor phone screens a month. I built Bella, a voice
              AI interviewer inside our applicant tracking system that runs a structured first conversation in the
              browser, scores it on a weighted rubric, and hands a recruiter the transcript, recording, and evidence. It
              ran in production for our headquarters markets, and then we retired it on purpose.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-field text-field-ink">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-center">
          <div>
            <p className="max-w-[24ch] text-[clamp(1.5rem,2.8vw,2.25rem)] font-bold leading-[1.15] tracking-[-0.02em]">
              The rubric is the product. The voice is just how it asks the questions.
            </p>
            <p className="mt-5 max-w-[48ch] text-field-ink-2">
              Six dimensions, each scored 0 to 100 by GPT-4o in structured JSON at low temperature. Weights reflect the criteria I
              screen for on my own calls. ADVANCE at 70 and up, REVIEW from 50 to 69, REJECT below 50, with
              hard caps added after real calls exposed generous scoring.
            </p>
          </div>
          <figure>
            <ul className="space-y-5">
              {rubric.map((r) => (
                <li key={r.label}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-semibold text-field-ink">{r.label}</span>
                    <span className="data text-field-ink">{r.weight}%</span>
                  </div>
                  <div className="relative mt-2 h-3 rounded-[2px] bg-field-ink/10">
                    <div className="absolute inset-y-0 left-0 rounded-[2px] bg-signal-bright" style={{ width: `${r.weight * 4}%` }} />
                  </div>
                  <p className="data mt-1.5 text-field-ink-2">{r.note}</p>
                </li>
              ))}
            </ul>
            <figcaption className="mt-6 border-t border-field-ink/15 pt-3 text-field-ink-2">
              <span className="data">Voice scorecard weights, bar scale 0 to 25%</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <section className="py-16">
          <Reveal>
            <SectionLabel>How a screen works</SectionLabel>
          </Reveal>
          <Reveal>
            <ol className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {flow.map((s, i) => (
                <li key={s.title} className="relative border-t-2 border-ink pb-8 pt-4">
                  <span className="absolute -top-[5px] left-0 h-2 w-2 rounded-full bg-signal-bright" aria-hidden="true" />
                  <span className="data text-ink-2">
                    Step {i + 1} of {flow.length}
                  </span>
                  <h3 className="mt-2 text-lg font-bold tracking-[-0.01em] text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="pb-16">
          <Reveal>
            <SectionLabel>How it was built</SectionLabel>
          </Reveal>
          <Reveal>
            <ol className="mt-8 border-l-2 border-rule">
              {built.map((b) => (
                <li key={b.title} className="relative pb-8 pl-6 last:pb-0">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-signal-bright" aria-hidden="true" />
                  <span className="data text-ink-2">{b.when}</span>
                  <h3 className="mt-1 text-lg font-bold tracking-[-0.01em] text-ink">{b.title}</h3>
                  <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-ink-2">{b.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="grid gap-10 pb-16 lg:grid-cols-2">
          <Reveal>
            <SectionLabel>Guardrails</SectionLabel>
            <ul className="mt-6 space-y-3">
              {guardrails.map((g) => (
                <li key={g} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-bright" aria-hidden="true" />
                  {g}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <SectionLabel>Honest caveats</SectionLabel>
            <ul className="mt-6 space-y-3">
              {caveats.map((c) => (
                <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-bright" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="pb-16">
          <Reveal>
            <SectionLabel>What I&apos;d carry into the next one</SectionLabel>
            <p className="mt-6 max-w-3xl leading-relaxed text-muted">
              Design the human decision capture on day one, because without it there is nothing to calibrate against.
              Keep the prompt in version control and sync it to the voice platform, so every change is reviewable. Share
              one scorer between production and the sandbox. And treat candidate trust as a product requirement: the
              strongest signal we got was not in the scores, it was candidates telling us when they wanted a person.
            </p>
          </Reveal>
        </section>

        <section className="pb-24">
          <Reveal>
            <SectionLabel>Built with</SectionLabel>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Retell AI (WebRTC)", "GPT-4o", "GPT-4o mini", "Whisper", "Next.js", "TypeScript", "Prisma", "PostgreSQL", "Braintrust", "Slack"].map((t) => (
                <TechBadge key={t} name={t} />
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
              The agent prompt lives in git and a sync script pushes it to the voice platform. Webhooks are signature
              verified and idempotent on the call ID. Every call records its voice cost, which feeds the company&apos;s SaaS
              spend tracking. About 150 commits from first prototype to retirement.
            </p>
          </Reveal>
        </section>
      </div>
    </>
  );
}
