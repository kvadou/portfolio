import manifest from "./shots-manifest.json";

export type Layer = "operate" | "grow" | "serve" | "platform";

export interface Shot {
  src: string;
  caption: string;
  w: number;
  h: number;
}

export interface FeatureGroup {
  title: string;
  items: string[];
  ai?: boolean;
}

export interface App {
  slug: string;
  name: string;
  role: string;
  layer: Layer;
  tagline: string;
  users: string;
  summary: string;
  stats: { value: string; label: string }[];
  features: FeatureGroup[];
  recent: { date: string; text: string }[];
  stack: string[];
  domain: string;
  legacy?: string[];
}

export const layers: Record<Layer, { label: string; blurb: string }> = {
  operate: { label: "Run the business", blurb: "Daily operations, finance, and leadership" },
  grow: { label: "Grow the network", blurb: "Hiring, franchising, contracts, and content" },
  serve: { label: "Serve every audience", blurb: "Portals for tutors, families, schools, and students" },
  platform: { label: "Platform underneath", blurb: "AI, data, reliability, and security shared by every app" },
};

export const apps: App[] = [
  {
    slug: "opshub",
    legacy: ["ops-command-center"],
    name: "OpsHub",
    role: "Operations platform",
    layer: "operate",
    domain: "ops.kingside.app",
    tagline: "The operating system for a multi-market education business: sales, scheduling, billing, schools, and analytics in one place.",
    users: "HQ admins, franchise market owners, and ops staff across 12 markets",
    summary:
      "OpsHub started as a reporting layer on top of a scheduling SaaS and grew into the system that is replacing it. Every market runs its own instance with its own database. Since April it has picked up native job and lesson scheduling, a full accounting suite, a schools CRM, a marketing hub, an AI analyst, and a production cash forecast graded by an independent eval service.",
    stats: [
      { value: "460+", label: "Routes" },
      { value: "290+", label: "API routers" },
      { value: "680+", label: "Test files" },
      { value: "4,600+", label: "Commits since Apr" },
    ],
    features: [
      { title: "Sales funnel", items: ["Booking Hub with form builder and CSV export", "Client Conversion kanban from lead to paired tutor", "Win-back, retention, and bundle offers"] },
      { title: "Native scheduling", items: ["Job Builder with default locations", "Lessons with mobile attendance", "Calendar, tutor availability, tenders, and reviews"] },
      { title: "People", items: ["Client, student, and tutor records with a unified timeline", "Shared-inbox email ingest onto each record", "Welcome emails that provision family and tutor logins"] },
      { title: "Accounting", items: ["Draft and raised invoices with a per-dollar explanation", "Payment orders, credits, refunds, and class packs", "Payment Issues queue that keeps asking until resolved"] },
      { title: "Schools and clubs", items: ["Schools CRM with a territory map", "Licensing, school billing, and delivery-tracked reports", "Clubs and camps with printable rosters and check-in"] },
      { title: "Growth", items: ["Marketing Hub with a content calendar and social inbox", "Materials and merch store with cart and fulfillment", "AI campaign briefs, blog drafts, and budget optimizer"], ai: true },
      { title: "Analytics and forecasting", items: ["Weekly 26-week cash forecast blended with a seasonal anchor", "Ask Analyst: plain-English questions answered by tools, never by model arithmetic", "Churn prediction and lead scoring"], ai: true },
      { title: "Guide and automation", items: ["In-app Guide with per-page How-to links and feedback triage", "Renewal agents and a bug-triage QA loop", "Production watchdog, payment deadman, and canaries"], ai: true },
    ],
    recent: [
      { date: "Sep 27", text: "Kingside OS shell, toasts, and confirm-only-irreversible with per-user opt out" },
      { date: "Sep 22", text: "Collapsible, resizable sidebar; SOP library folded into the Guide" },
      { date: "Sep 18", text: "Marketing Hub rebuilt" },
      { date: "Sep 3", text: "Searchable market switcher with a sandbox market" },
      { date: "Aug 31", text: "Every route checked clean at 320 and 390 px" },
      { date: "Aug 24", text: "Cash forecast switched to the seasonal blend after the eval found a naive baseline beating it" },
    ],
    stack: ["React", "Express", "PostgreSQL", "Redis", "Stripe", "LiteLLM gateway", "Heroku"],
  },
  {
    slug: "hq",
    name: "Kingside HQ",
    role: "Company portal",
    layer: "operate",
    domain: "hq.kingside.app",
    tagline: "Where the company runs itself: people, work, strategy, finance, compliance, and AI governance.",
    users: "Every employee, with leadership, finance, and ops views by role",
    summary:
      "HQ replaced a work-management SaaS, a docs tool, and a spreadsheet finance pack. It holds the handbook and org chart, Monday-style boards and Notion-style docs, an EOS traction suite, and a finance command center that reconciles the books, forecasts 13 weeks of cash, and checks whether the company can afford a raise. A RAG analyst and tool-using agents answer questions across all of it.",
    stats: [
      { value: "108", label: "Pages" },
      { value: "369", label: "API routes" },
      { value: "167", label: "Data models" },
      { value: "300+", label: "Test files" },
    ],
    features: [
      { title: "Company", items: ["Announcements, handbook with acknowledgements, holidays", "Company guide that can be told it is wrong"] },
      { title: "People", items: ["Directory, org chart, ranks and leveling", "PTO, performance, onboarding, compensation"] },
      { title: "Work", items: ["Boards with templates, groups, and an item modal", "Docs with slash commands, inline databases, version history", "Importers from the tools it replaced"] },
      { title: "Strategy and traction", items: ["Vision, rocks, scorecard, issues, meetings", "AI traction coach and strategy personalities"], ai: true },
      { title: "Finance command center", items: ["P&L against the books with a trust verdict and drill-down", "13-week cash forecast and forecast vs actual", "Raise Capacity: a four-gate verdict with a leadership brief"] },
      { title: "Tech and governance", items: ["SaaS spend review and budget pacing", "AI governance dashboard over the model gateway", "Fleet SRE health, product usage per app"], ai: true },
      { title: "Intelligence", items: ["RAG analyst over company data", "Agents with tools for finance, leads, territory, and research"], ai: true },
    ],
    recent: [
      { date: "Sep 27", text: "Kingside OS workspace shell, launcher, and phone drawer" },
      { date: "Sep 20", text: "Company guide feedback loop" },
      { date: "Sep 7", text: "One sortable, filterable DataTable across 48 tables" },
      { date: "Jul 24", text: "Finance consolidated from 17 pages to 10" },
      { date: "Jun", text: "Boards, docs editor, template gallery" },
    ],
    stack: ["Next.js", "Turborepo", "Prisma", "PostgreSQL", "Claude", "OpenAI embeddings"],
  },
  {
    slug: "hiring",
    legacy: ["talent-acquisition-platform"],
    name: "Kingside Hiring",
    role: "Applicant tracking system",
    layer: "grow",
    domain: "hiring.kingside.app",
    tagline: "High-volume hourly hiring across markets, with AI that drafts evidence and humans who make every call.",
    users: "HQ recruiters, market hiring managers, franchise owners, and candidates",
    summary:
      "Hiring replaced a paid ATS, including a full API migration of its history. It runs the pipeline for every market, scores applications against a rubric, matches candidates with keyword plus vector search, transcribes and summarizes interviews, and handles offers, e-signatures, background checks, and the handoff to tutor onboarding. Candidates can now record a short teaching sample instead of booking a phone screen.",
    stats: [
      { value: "123", label: "Pages" },
      { value: "352", label: "API routes" },
      { value: "110", label: "Data models" },
      { value: "1,600+", label: "Commits since Apr" },
    ],
    features: [
      { title: "Pipeline", items: ["Kanban per job, review board, triage", "Stage rules, SLA targets, undo a reject", "Starred shortlists and bulk moves"] },
      { title: "Candidate AI", items: ["Application scoring against a weighted rubric", "Keyword plus pgvector matching", "Resume parsing and success traits, with an eval harness"], ai: true },
      { title: "Interview AI", items: ["Whisper transcription and AI summaries", "AI scorecards and interview kits", "Talk-time analytics"], ai: true },
      { title: "Async screens", items: ["Recorded teaching-sample track with teleprompter and trim", "AI voice phone-screen agent with question sets (built, gated off)"], ai: true },
      { title: "Scheduling", items: ["Calendar and video integration", "Candidate self-serve times and reschedule", "Interviewer groups and attendance"] },
      { title: "Jobs and compliance", items: ["Job setup wizard with kits and scorecards", "Multi-board syndication with pay-transparency gates", "Background checks and per-jurisdiction requirements"] },
      { title: "Offers and onboarding", items: ["Offer form with cohort and a five-step hire checklist", "E-signature and welcome email you can edit before sending"] },
    ],
    recent: [
      { date: "Oct 1", text: "Welcome email shows the exact message and is editable" },
      { date: "Sep 28", text: "Searchable market picker" },
      { date: "Sep 27", text: "Kingside OS shell, toasts, and confirms" },
      { date: "Sep 17", text: "Recorded teaching-sample track replaces the phone screen" },
      { date: "Sep 10", text: "One DataTable that never scrolls sideways, swept across every table" },
      { date: "Aug 1", text: "App launcher and searchable settings with Cmd+K" },
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "pgvector", "Whisper", "Claude"],
  },
  {
    slug: "franchise",
    legacy: ["franchise-management-system"],
    name: "Kingside Franchise",
    role: "Franchise CRM and launch platform",
    layer: "grow",
    domain: "franchise.kingside.app",
    tagline: "From first inquiry to a running market: prospect CRM, a 90-day launch journey, coaching, help desk, and royalties.",
    users: "HQ franchise team, coaches, prospects, and franchise owners",
    summary:
      "Franchise runs the whole franchise lifecycle. HQ works prospects through a CRM with territory mapping; signed owners follow a 90-day launch plan with recorded launch labs; coaches run weekly calls that are transcribed and summarized; owners get a help desk, a merch store, and royalty billing. An AI guide answers owner questions from the playbooks.",
    stats: [
      { value: "279", label: "Pages" },
      { value: "511", label: "API routes" },
      { value: "174", label: "Data models" },
      { value: "1,400+", label: "Commits since Apr" },
    ],
    features: [
      { title: "Sales CRM", items: ["Pipeline kanban, campaigns, A/B tests", "Territory mapping and competitive benchmarks"] },
      { title: "Launch journey", items: ["90-day plan with phase emails", "Launch labs with recordings, transcripts, and AI chapters", "State registration checklist and countdowns"], ai: true },
      { title: "Coaching", items: ["Weekly calls recorded, transcribed, and summarized", "Training hours and performance scorecards"], ai: true },
      { title: "Help desk", items: ["Tickets with SLA reminders and a workload strip", "AI support guide over the playbooks"], ai: true },
      { title: "Finance", items: ["Royalties, ACH, invoices, and forecasts", "Reimbursement intake where AI picks the category and learns from reviews"], ai: true },
      { title: "Provisioning", items: ["One-command market provisioning across about ten systems", "Merch catalog, fulfillment, and tax"] },
    ],
    recent: [
      { date: "Sep 30", text: "Help-desk bell, workload strip, AI support guide" },
      { date: "Sep 29", text: "Shared date and time pickers with visible time zone" },
      { date: "Sep 27", text: "Kingside OS shell across admin, owner, and prospect surfaces" },
      { date: "Sep 25", text: "Competitive benchmark table" },
      { date: "Sep 17", text: "Coaching unified into one timeline; owner profile cut from 11 tabs to 7" },
    ],
    stack: ["Next.js", "Prisma", "PostgreSQL", "Stripe Connect", "Claude", "OpenAI embeddings"],
  },
  {
    slug: "tutors",
    legacy: ["workforce-training-portal"],
    name: "Kingside Tutors",
    role: "Tutor workforce portal",
    layer: "serve",
    domain: "tutors.kingside.app",
    tagline: "Onboarding, training, scheduling, and pay for a tutor workforce across markets.",
    users: "Tutors, lead tutors, onboarding cohorts, and market admins",
    summary:
      "Tutors is where a new hire becomes a working tutor and stays one. It runs a cohort-based onboarding academy, a course and puzzle training system, a schedule and job board that mirror the scheduling system, lesson reports, monthly pay summaries, and payment profiles set up through a payments-platform API at onboarding.",
    stats: [
      { value: "174", label: "Pages" },
      { value: "370", label: "API routes" },
      { value: "112", label: "Data models" },
      { value: "240", label: "Test files" },
    ],
    features: [
      { title: "Schedule and jobs", items: ["Month and week calendar with lesson peek", "Available jobs and job summaries", "Cancel and propose-new-time flows"] },
      { title: "Lessons and pay", items: ["Lesson pages and student progress by chapter", "Monthly report with group bonus", "Payment orders and earnings"] },
      { title: "Onboarding academy", items: ["Welcome, video, quiz, certification, shadow lessons", "Cohort tracker grid and session scheduler"] },
      { title: "Training", items: ["Courses and learning paths", "Puzzle system with ratings", "Achievements, leaderboards, and forum"] },
      { title: "Content and admin", items: ["Rich-text CMS with slash menu and versions", "Roster, teams, background checks, tax forms"] },
    ],
    recent: [
      { date: "Sep 29", text: "Progress band key and sandbox market sidebar" },
      { date: "Sep 27", text: "Kingside OS shell on every page; no native dialogs anywhere" },
      { date: "Sep 23", text: "Phone calendar views and unified editor" },
      { date: "Sep 22", text: "OpsHub-style chrome, job cards, lesson page redesign" },
    ],
    stack: ["Next.js", "Prisma", "PostgreSQL", "S3", "Payments API"],
  },
  {
    slug: "family",
    name: "Kingside Family",
    role: "Parent portal",
    layer: "serve",
    domain: "family.kingside.app",
    tagline: "Everything a parent needs: schedule, lesson reports, progress, billing, and a growth plan for their child.",
    users: "Parents of enrolled students",
    summary:
      "Family gives parents a calm view of their child's lessons. It reads schedule, billing, and report data from OpsHub through an internal API, adds a readiness check that turns assessment results into a rule-based growth plan, and lets parents pause, reschedule, buy bundles, and join a live lesson in one tap.",
    stats: [
      { value: "25", label: "Pages" },
      { value: "39", label: "API routes" },
      { value: "43", label: "Test files" },
      { value: "230+", label: "Commits since Apr" },
    ],
    features: [
      { title: "Schedule", items: ["Week and month calendar", "Lesson page with the full emailed report", "Self-serve cancel and reschedule proposals"] },
      { title: "Progress", items: ["Band progression journey and badges", "Readiness check with a growth plan", "Activity library and a printable challenge"] },
      { title: "Billing", items: ["Invoices with refunds shown", "Card update, upcoming charges, pause and resume", "Bundles with checkout"] },
      { title: "Live lessons", items: ["Join Live Lesson into the classroom via single sign-on"] },
    ],
    recent: [
      { date: "Sep 30", text: "Refunded amounts on invoices" },
      { date: "Sep 27", text: "Kingside OS shell" },
      { date: "Sep 23", text: "Lesson, child, and billing pages redesigned; parents edit their own profile" },
      { date: "Sep 15", text: "Phone bottom tab bar" },
    ],
    stack: ["Next.js", "Prisma", "Supabase", "Stripe"],
  },
  {
    slug: "school",
    name: "Kingside School",
    role: "School partner portal",
    layer: "serve",
    domain: "school.kingside.app",
    tagline: "Partner schools see classes, attendance, reports, invoices, and program impact without emailing anyone.",
    users: "School administrators at partner schools",
    summary:
      "School reads directly from a pooled platform database through row-level security, so each school sees only its own classes. Pay-by-school partners see invoices and statements; parent-pay program schools see their enrollment funnel instead. Requests route to the local team.",
    stats: [
      { value: "17", label: "Pages" },
      { value: "RLS", label: "Tenant isolation" },
      { value: "16", label: "Test files" },
      { value: "130+", label: "Commits since Apr" },
    ],
    features: [
      { title: "Classes", items: ["My Classes with students per lesson", "Lesson page with attendance and report"] },
      { title: "Impact", items: ["Program impact report", "Roster and program funnel by school type"] },
      { title: "Billing", items: ["Invoices, detail, and statements", "Next-term card with agreement signing"] },
      { title: "Self-serve", items: ["Editable school profile and contacts", "Requests queue to the local team"] },
    ],
    recent: [
      { date: "Sep 27", text: "Kingside OS kit with launcher" },
      { date: "Sep 24", text: "Editable profile and data-freshness display" },
      { date: "Sep 23", text: "Sidebar shell, My Classes, lesson page, next-term card" },
      { date: "Aug 20", text: "Requests queue, impact report, program funnel" },
    ],
    stack: ["Next.js", "Supabase", "Row-level security"],
  },
  {
    slug: "classroom",
    name: "Kingside Classroom",
    role: "Live online classroom",
    layer: "serve",
    domain: "play.kingside.app",
    tagline: "A real-time chess classroom with synced boards, video, quizzes, and games, built to replace a paid platform.",
    users: "Tutors, students, and parents",
    summary:
      "Classroom syncs the board over websockets, runs video with a consent gate for kids, and gives tutors a lesson-plan navigator, live guess-the-move quizzes, and multi-board games with clocks. Students join by code or straight from the family portal.",
    stats: [
      { value: "14", label: "API controllers" },
      { value: "24", label: "Data models" },
      { value: "Real-time", label: "Sockets + video" },
      { value: "130+", label: "Commits since Apr" },
    ],
    features: [
      { title: "Live classroom", items: ["Synced board, video, chat, raise hand", "1:1, small group, grid, and phone layouts"] },
      { title: "Board tools", items: ["Position editor, annotations, evaluation bar", "FEN and PGN import, themes, piece sets"] },
      { title: "Teaching", items: ["Lesson plan navigator and puzzle panel", "Live guess-the-move quiz", "Multi-board games with clocks and board takeover"] },
      { title: "Engagement", items: ["Story reader, rewards, mini-games", "Homework queue and parent dashboard"] },
    ],
    recent: [
      { date: "Sep 7", text: "Tutor dashboard on phones" },
      { date: "Jul 5", text: "Board takeover, clocks, result banners, homework queue" },
      { date: "Jul 4", text: "Live quiz flow" },
      { date: "May 6", text: "Layout pass: board clamps, laptop grid, 44px targets" },
    ],
    stack: ["React", "NestJS", "Socket.IO", "LiveKit", "PostgreSQL", "Redis"],
  },
  {
    slug: "sign",
    name: "Kingside Sign",
    role: "E-signature platform",
    layer: "grow",
    domain: "sign.kingside.app",
    tagline: "An in-house e-signature platform with a hash-chained audit trail, built to replace a paid one.",
    users: "Staff, franchise teams, and external signers",
    summary:
      "Sign handles offer letters, agreements, and forms. Templates are built with a drag-and-drop field editor, sent singly or in bulk, signed in person or by link, and every event is written to a hash-chained audit log. A versioned API with signed webhooks lets the other apps send documents.",
    stats: [
      { value: "98", label: "API routes" },
      { value: "29", label: "Data models" },
      { value: "Hash-chained", label: "Audit trail" },
      { value: "370+", label: "Commits since Apr" },
    ],
    features: [
      { title: "Templates", items: ["Drag-and-drop field editor with nudge keys", "Prepared templates and bulk send"] },
      { title: "Signing", items: ["Link, in-person, embedded, and public forms", "Access codes and identity checks"] },
      { title: "Evidence", items: ["Hash-chained audit trail", "Activity feed, analytics, and search"] },
      { title: "Platform", items: ["Teams with their own sender addresses", "API keys and signed webhooks", "Two-factor auth and logged impersonation"] },
    ],
    recent: [
      { date: "Sep 27", text: "Kingside OS shell and launcher" },
      { date: "Sep", text: "Dashboard tiles with per-row remind and download" },
      { date: "Sep", text: "Previous-page control while signing; repeat answers across fields" },
    ],
    stack: ["Next.js", "Prisma", "pdf-lib", "S3", "Postmark"],
  },
  {
    slug: "studio",
    legacy: ["creative-studio"],
    name: "Kingside Studio",
    role: "Curriculum and content studio",
    layer: "grow",
    domain: "studio.kingside.app",
    tagline: "RAG over the whole curriculum, plus AI generation for lessons, illustrations, and storyboards that stay on-canon.",
    users: "Curriculum, creative, and training staff",
    summary:
      "Studio answers questions about lessons, characters, and teaching cues with cited answers from hybrid search, generates curriculum adapted for 25+ markets, and produces illustrations and multi-scene storyboards that check against the character canon before anything is used.",
    stats: [
      { value: "53", label: "Data models" },
      { value: "RRF", label: "Hybrid search" },
      { value: "25+", label: "Markets adapted" },
      { value: "380+", label: "Commits since Apr" },
    ],
    features: [
      { title: "Ask the curriculum", items: ["Chat with citations", "Semantic plus keyword search fused with RRF"], ai: true },
      { title: "Generate", items: ["Curriculum generator and batch runs", "Cultural adaptation per market"], ai: true },
      { title: "Illustrate", items: ["Image generation with canon references", "Canon-readiness gate and flagged-image review"], ai: true },
      { title: "Story", items: ["Multi-scene storyboards with continuity", "World map, cast, props, and lore"], ai: true },
    ],
    recent: [
      { date: "Sep 27", text: "Kingside OS kit migration" },
      { date: "Sep", text: "30-day session with deep links kept through sign-in" },
      { date: "Sep", text: "Universal search and 44px touch targets" },
    ],
    stack: ["React", "Express", "Prisma", "Claude", "OpenAI embeddings", "Gemini images"],
  },
];

export interface PlatformItem {
  title: string;
  kind: string;
  body: string;
  points: string[];
  ai?: boolean;
}

export const platform: PlatformItem[] = [
  {
    title: "Forecast eval harness",
    kind: "AI quality",
    ai: true,
    body: "An independent Python service that grades the production cash forecast against settled bank cash every week, from outside the app that makes it.",
    points: ["Frozen point-in-time predictions, so grading is honest", "Baselines, bootstrap ranges, and a noise gate before any change ships", "Adoption ledger: the model only changes on eval evidence"],
  },
  {
    title: "Model gateway",
    kind: "AI governance",
    ai: true,
    body: "A self-hosted LiteLLM gateway every app routes through, with a virtual key and budget per app.",
    points: ["Routing across Anthropic, OpenAI, and Gemini", "Per-app spend, rate limits, and alerts", "Disaster runbook and direct-provider fallback"],
  },
  {
    title: "Warehouse and MCP server",
    kind: "Data",
    ai: true,
    body: "Nightly copies of every app database joined into one warehouse, with entity resolution across apps and a read-only MCP server for agents.",
    points: ["One schema per app, joined with foreign data wrappers", "People and client resolution across systems", "SELECT-only, read-only transactions, 15s timeout"],
  },
  {
    title: "SRE agent fleet",
    kind: "Reliability",
    ai: true,
    body: "An autonomous triage agent for 14 production apps, with tools gated by autonomy level and every action audited.",
    points: ["Logs, releases, diffs, and state tools", "Incident write-ups and an action audit log", "Fleet health dashboard"],
  },
  {
    title: "Backups and disaster recovery",
    kind: "Reliability",
    body: "Nightly encrypted backups of 14 databases to object storage, a local third copy, and per-datastore recovery runbooks proven by restore drills.",
    points: ["AES-256, 14-day retention, Slack status", "DNS cutover script and recovery quick reference", "Restore drill evidence kept on file"],
  },
  {
    title: "Fleet log archive",
    kind: "Observability",
    body: "An edge worker receives every app's log drain, keeps everything forever in cheap storage, and feeds one labeled dataset that alert monitors run on.",
    points: ["Deadman alerts on missing webhooks", "Payment-signature and database failure monitors"],
  },
  {
    title: "Security automation",
    kind: "Security",
    ai: true,
    body: "Weekly model-driven audits of 17 repos, daily dependency and 2-step-verification watchers, and an authenticated scan suite. Silence is the designed output.",
    points: ["Built after a sweep found six high-severity issues", "Transitive CVE fixer", "Security header audit before every config change"],
  },
  {
    title: "Risk-tiered review gate",
    kind: "Dev workflow",
    ai: true,
    body: "Every push across the fleet is graded by blast radius. Money, auth, schema, and webhook changes get a mandatory AI review pass before they can ship.",
    points: ["Generated per repo from one source", "Tests for the gate itself", "CI fallback when the self-hosted runner goes down"],
  },
  {
    title: "Kingside OS kit",
    kind: "Design system",
    body: "One shared shell, token set, data table, feedback rules, and app launcher, vendored into every app with checksums so nobody edits it in place.",
    points: ["Zero accessibility violations at 390, 768, and 1280 px", "Lint plugin enforces the system", "Rolled out to 8 apps in a week"],
  },
  {
    title: "Slack operations agent",
    kind: "AI assistant",
    ai: true,
    body: "A Slack bot that answers staff questions from the SOP library using a read-only agent, one thread per session.",
    points: ["Grounded in the same playbooks as the in-app Guide", "Read-only tools"],
  },
];

export const fleet = {
  apps: apps.length,
  commits: "11,000+",
  tests: "1,700+",
  apiRoutes: "2,000+",
  models: "800+",
};

type ManifestEntry = { file: string; caption: string; w: number; h: number };
const shotsBySlug = manifest as Record<string, ManifestEntry[]>;

export function shotsFor(slug: string): Shot[] {
  return (shotsBySlug[slug] || []).map((s) => ({
    src: `/shots/${slug}/${s.file}`,
    caption: s.caption,
    w: s.w,
    h: s.h,
  }));
}

export function getApp(slug: string): App | undefined {
  return apps.find((a) => a.slug === slug);
}

export function appsIn(layer: Layer): App[] {
  return apps.filter((a) => a.layer === layer);
}
