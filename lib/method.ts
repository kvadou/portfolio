// Method content shared by /method and the home page.
export type Bucket = "delete" | "code" | "agent" | "human";

export const bucketMeta: Record<Bucket, { label: string; rule: string }> = {
  delete: {
    label: "Delete",
    rule: "The step only existed because of the old tooling. Remove it.",
  },
  code: {
    label: "Plain code",
    rule: "If X then Y, no judgment. Deterministic, cheap, testable.",
  },
  agent: {
    label: "Agent",
    rule: "Judgment is needed and there is enough history to ground it.",
  },
  human: {
    label: "Human decision",
    rule: "Money moves, people are judged, or a mistake is expensive.",
  },
};

export const steps = [
  {
    n: "01",
    title: "Map the real process",
    body: "The documented process is never the real one. I interview the people who do the work (where most of the knowledge lives), read the event history in the systems of record, and then check the docs. The output is the actual step sequence, including the loops, the exceptions, and how often each one fires.",
  },
  {
    n: "02",
    title: "Find where the time goes",
    body: "Speeding up each step rarely speeds up the process. The days hide in handoffs between people, rework loops, and state nobody can see. I price each loop in hours and dollars so the owner can see what the mess costs.",
  },
  {
    n: "03",
    title: "Sort every step",
    body: "Each step lands in exactly one of four buckets. Most of the value usually comes from the first two, before any model is involved.",
  },
  {
    n: "04",
    title: "Build inside the systems people already use",
    body: "Agents read from and write to the tools a team already works in: Slack, Google Workspace, the CRM, the payroll provider, the scheduling system. No new surface to learn, no migration pitch. I only build a new system of record when there isn't a real one.",
  },
  {
    n: "05",
    title: "Baseline, ship, prove it",
    body: "Numbers get captured before the build: steps, cycle time, exception rate, cost per unit. After launch the same numbers get measured again, and production AI output is graded against real outcomes on a schedule.",
  },
];

export const cases: {
  title: string;
  context: string;
  sort: { step: string; bucket: Bucket }[];
  results: { value: string; label: string }[];
  guardrail: string;
}[] = [
  {
    title: "SaaS spend teardown",
    context:
      "Software and card spend had drifted to about $20k a month at a small company. Renewals auto-charged, seats outlived the people using them, and nobody owned the question of whether a tool was still needed.",
    sort: [
      { step: "Finance skims the monthly statement for anything odd", bucket: "delete" },
      { step: "Join card transactions to SSO logins, seat counts, and owners", bucket: "code" },
      { step: "Rank each vendor by waste, with the evidence attached", bucket: "agent" },
      { step: "Tool owner keeps or cuts each subscription", bucket: "human" },
      { step: "License audit fires automatically on every offboarding", bucket: "code" },
    ],
    results: [
      { value: "$20k → $10k", label: "Monthly spend" },
      { value: "~$120k", label: "Annualized savings" },
    ],
    guardrail:
      "Nothing gets cancelled because a model said so. The owner defends or drops each tool, which is why the cuts held.",
  },
  {
    title: "Franchise market launch",
    context:
      "Bringing a new franchise market live touched about ten systems: accounts, DNS, the ops platform, CRM seeding, billing, hiring. It ran from one person's memory, took days, and every launch missed a different step.",
    sort: [
      { step: "Work from memory and a stale checklist", bucket: "delete" },
      { step: "Probe, provision, and verify each system idempotently", bucket: "code" },
      { step: "Independent pass re-checks the work and ignores the self-report", bucket: "agent" },
      { step: "Approve the go-live report", bucket: "human" },
    ],
    results: [
      { value: "Days → <1 hr", label: "Per market" },
      { value: "Every run", label: "Independently verified" },
    ],
    guardrail:
      "The run is idempotent and re-runnable. A person signs off before any franchisee sees the market.",
  },
  {
    title: "Tutor hiring pre-screen",
    context:
      "Every NYC tutor applicant needed a scheduled preliminary phone call with the hiring manager, mostly to hear the same teaching sample. The scheduling loop cost more time than the call.",
    sort: [
      { step: "Preliminary phone screen", bucket: "delete" },
      { step: "Candidate records a short story from their portal, Slack pings staff", bucket: "code" },
      { step: "Scorecard draft refined from interview transcripts against the rubric", bucket: "agent" },
      { step: "Advance or pass, every time", bucket: "human" },
    ],
    results: [
      { value: "1 step", label: "Removed from funnel" },
      { value: "0", label: "Calls to schedule" },
    ],
    guardrail:
      "The model never rejects anyone. It drafts evidence, and the hiring manager makes every call.",
  },
  {
    title: "Singapore payroll",
    context:
      "A monthly cycle of copying lesson data out of the scheduling system into spreadsheets, mapping roles to rates by hand, and chasing approvals over chat. Roughly five hours a month, with errors that showed up as wrong paychecks.",
    sort: [
      { step: "Copy and paste lessons into spreadsheets", bucket: "delete" },
      { step: "Import lessons, map roles to rates", bucket: "code" },
      { step: "Monthly audit flags unmapped roles and zero-rate lessons", bucket: "code" },
      { step: "Director approves before payout", bucket: "human" },
    ],
    results: [
      { value: "~5 hrs → minutes", label: "Monthly cycle" },
      { value: "$30k/mo", label: "Across 50+ tutors" },
    ],
    guardrail:
      "Money only moves after a named approver signs off. The system now runs fully with the local team.",
  },
];
