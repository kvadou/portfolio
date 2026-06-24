export interface Project {
  slug: string;
  title: string;
  category: string;
  pitch: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  highlights: string[];
  outcome: string;
  problem: string;
  architecture: string;
  github: string;
  demo: string;
  demoLabel?: string;
  demoAdmin?: string;
  image: string;
  screenshots?: { src: string; label: string }[];
}

export const projects: Project[] = [
  {
    slug: "ops-command-center",
    title: "Ops Command Center",
    category: "Production Platform · Operations & AI",
    pitch:
      "The operational backbone of a $3M education company — sales pipeline, scheduling, multi-market analytics, and an AI-powered marketing command center, unified in a single platform used every day.",
    stack: ["React 18", "Express.js", "PostgreSQL", "Redis", "Tailwind", "MUI"],
    metrics: [
      { value: "138+", label: "API Routes" },
      { value: "200+", label: "Components" },
      { value: "5", label: "Databases" },
      { value: "$3M", label: "Ops Backbone" },
    ],
    highlights: [
      "AI marketing command center: ad-spend analytics, content calendar, and LLM-assisted campaign workflows",
      "138+ API routes across multiple Express services with role-based access control",
      "200+ React components in a modular, dense, data-rich operational UI",
      "5 PostgreSQL databases with hand-tuned raw SQL for performance-critical reporting",
      "Drag-and-drop scheduling built on FullCalendar across markets and tutors",
      "Real-time analytics dashboards with custom charting and KPI rollups",
      "185 tracked database migrations documenting years of schema evolution",
    ],
    outcome:
      "Runs the daily operations of a $3M, multi-market education company — sales, scheduling, billing, and analytics in one system.",
    problem:
      "A fast-growing education company was operating across multiple US markets and international locations on a patchwork of disconnected SaaS tools. Nothing talked to each other, the per-seat costs were climbing, and none of it fit the company's actual workflows. They needed one platform that could run the whole operation.",
    architecture:
      "A React 18 front end backed by multiple Express.js services and five PostgreSQL databases, with hand-written raw SQL for the heavy reporting paths and Redis for caching and sessions. The UI pairs Tailwind with MUI for a dense, operator-grade interface, and the marketing module layers LLM-assisted workflows on top of live ad-spend and content data.",
    github: "https://github.com/kvadou/ops-command-center",
    demo: "https://ops-command-center.onrender.com",
    demoLabel: "ops-command-center.onrender.com",
    image: "/screenshots/occ-dashboard.png",
    screenshots: [
      { src: "/screenshots/occ-dashboard.png", label: "HQ Dashboard — weekly revenue, lessons, live activity, and attention alerts at a glance" },
      { src: "/screenshots/occ-analytics.png", label: "Analytics — revenue, profit margin, and student/tutor KPIs rolled up across every market" },
      { src: "/screenshots/occ-pipeline.png", label: "Booking Hub — booking submissions feeding the multi-stage client-conversion pipeline" },
      { src: "/screenshots/occ-clubs.png", label: "Clubs — per-location revenue, enrollment, and session tracking" },
      { src: "/screenshots/occ-schools.png", label: "Schools — partnership dashboard with health, markets, billing, and term tracking" },
      { src: "/screenshots/occ-tutors.png", label: "Workforce — tutor metrics, performance tiers, and roster management" },
      { src: "/screenshots/occ-admin.png", label: "Admin — user management with role-based, per-market access controls" },
    ],
  },
  {
    slug: "talent-acquisition-platform",
    title: "Talent Acquisition Platform",
    category: "Production AI · Hiring",
    pitch:
      "An applicant tracking system that replaced Greenhouse — AI candidate matching over pgvector embeddings, a drag-and-drop pipeline, and automated interview scheduling, built for multi-market hiring.",
    stack: ["Next.js 14", "TypeScript", "Prisma", "Clerk", "PostgreSQL", "pgvector"],
    metrics: [
      { value: "83", label: "Data Models" },
      { value: "pgvector", label: "AI Matching" },
      { value: "$12K/yr", label: "SaaS Replaced" },
      { value: "Multi-market", label: "RBAC" },
    ],
    highlights: [
      "AI resume scoring with OpenAI embeddings and pgvector cosine-similarity search",
      "Candidate-to-role matching that ranks applicants by semantic fit, not keywords",
      "Drag-and-drop Kanban pipeline with real-time stage transitions",
      "Zoom integration for automated interview scheduling",
      "83 Prisma models covering the full hiring lifecycle",
      "E-signature workflows for offer letters and onboarding documents",
      "Multi-market RBAC with granular, role-based permission controls",
    ],
    outcome:
      "Replaced a $12K/year Greenhouse subscription with a custom ATS that fits the company's exact hiring workflow — and ranks candidates with AI.",
    problem:
      "The company paid $12,000 a year for Greenhouse and used a fraction of it. It couldn't model multi-market hiring, had no AI candidate matching, and forced manual workarounds for the team's interview and onboarding process. The spend kept rising while the fit kept shrinking.",
    architecture:
      "Next.js 14 with the App Router and server components for fast loads. Prisma manages 83 models over PostgreSQL extended with pgvector. The AI pipeline vectorizes resumes with OpenAI embeddings and ranks candidates by cosine similarity against each role, so matching is semantic rather than keyword-based. A live AI Screening Playground runs the same engine that powers production candidate screens: a GPT-4o-mini chat screener that scores each answer and a real browser voice call to a Retell AI agent. Clerk handles multi-tenant auth.",
    github: "https://github.com/kvadou/talent-platform",
    demo: "https://talent-platform-mu.vercel.app",
    demoLabel: "talent-platform-mu.vercel.app",
    image: "/screenshots/talent-dashboard.png",
    screenshots: [
      { src: "/screenshots/talent-dashboard.png", label: "Dashboard — hiring pipeline health, open roles, and candidate flow" },
      { src: "/screenshots/talent-jobs.png", label: "Jobs Board — role management with stage and status tracking" },
      { src: "/screenshots/talent-candidates.png", label: "Candidate Pool — AI-ranked applicants scored by semantic fit" },
      { src: "/screenshots/talent-playground.png", label: "AI Screening Playground — live chat + voice candidate screening with real-time scoring" },
    ],
  },
  {
    slug: "creative-studio",
    title: "Creative Studio",
    category: "Production AI · RAG Content Engine",
    pitch:
      "An AI content platform that turns days of curriculum work into minutes — a full RAG pipeline with citation grounding, so every generated lesson stays factually accurate to source material.",
    stack: ["React 18", "Vite", "Express.js", "TypeScript", "Prisma", "Claude API", "OpenAI Embeddings"],
    metrics: [
      { value: "10x", label: "Faster Output" },
      { value: "RAG + RRF", label: "Retrieval" },
      { value: "Claude API", label: "Generation" },
      { value: "Grounded", label: "Citations" },
    ],
    highlights: [
      "Full RAG pipeline: semantic search plus keyword matching, fused with Reciprocal Rank Fusion (RRF)",
      "AI curriculum generation grounded in source material with inline citations for factual accuracy",
      "Claude API generation conditioned on retrieved context, not free-floating prompts",
      "Illustration generation wired directly into the content-creation workflow",
      "Batch generation for producing multiple lesson modules at once",
      "Collaborative project workspaces for team content review",
    ],
    outcome:
      "Cut content creation from multi-day cycles to minutes per lesson module — a 10x speedup without sacrificing factual accuracy.",
    problem:
      "Producing curriculum was a manual, multi-day grind: research, writing, sourcing illustrations, and review cycles for every lesson. The team wanted AI to do the heavy lifting, but generic LLM output couldn't be trusted to stay accurate to the existing curriculum. They needed generation that was grounded.",
    architecture:
      "A React 18 + Vite front end over a TypeScript Express.js backend, with Prisma managing content and project state. The retrieval layer combines OpenAI embeddings for semantic search with keyword matching, fused via Reciprocal Rank Fusion for the best of both. Claude generates each lesson conditioned on the retrieved context and emits citations, so output stays grounded in real source material.",
    github: "https://github.com/kvadou/creative-studio",
    demo: "https://creative-studio-upgd.onrender.com",
    demoLabel: "creative-studio-upgd.onrender.com",
    image: "/screenshots/creative-studio-home.png",
    screenshots: [
      { src: "/screenshots/creative-studio-home.png", label: "Home — daily content suggestions, character roster, and a live news feed" },
      { src: "/screenshots/creative-studio-curriculum.png", label: "Curriculum — module browser spanning 31 lessons across 8 modules" },
      { src: "/screenshots/creative-studio-images.png", label: "Illustrations — AI-generated and original art gallery with character tagging" },
      { src: "/screenshots/creative-studio-video.png", label: "Video — animated character clips with a generation pipeline" },
      { src: "/screenshots/creative-studio-audio.png", label: "Audio — character voice design and dialogue generation" },
      { src: "/screenshots/creative-studio-episodes.png", label: "Episodes — content pipeline with shot-by-shot production tracking" },
    ],
  },
  {
    slug: "franchise-management-system",
    title: "Franchise Management System",
    category: "Production AI · B2B Platform",
    pitch:
      "End-to-end franchise operations from first inquiry to signed agreement — with a RAG-powered AI chatbot, interactive territory mapping, and an 8-stage prospect pipeline.",
    stack: ["Next.js 14", "TypeScript", "Prisma", "NextAuth v5", "Stripe Connect", "Mapbox"],
    metrics: [
      { value: "80+", label: "Data Models" },
      { value: "RAG", label: "AI Chatbot" },
      { value: "8-Stage", label: "Pipeline" },
      { value: "Stripe", label: "Connect" },
    ],
    highlights: [
      "RAG-powered AI chatbot with document retrieval and contextual, grounded responses",
      "Interactive territory mapping with Mapbox for market analysis and visualization",
      "8-stage prospect pipeline from first inquiry to signed franchise agreement",
      "80+ Prisma models covering the full franchise lifecycle",
      "Stripe Connect for franchise payment flows and revenue tracking",
      "E-signature integration for franchise agreements and legal documents",
      "Self-service prospect portal with role-based access for owners and corporate admins",
    ],
    outcome:
      "Replaced spreadsheets and email threads with one system that runs the entire franchise lifecycle, inquiry to signature.",
    problem:
      "Managing franchise prospects across an 8-stage pipeline meant juggling spreadsheets, email threads, and manual territory research. There was no single source of truth for prospects, no clean way to handle financial agreements, and no self-service access for prospects who wanted answers fast.",
    architecture:
      "Next.js 14 with NextAuth v5 for role-based auth across franchise owners and corporate admins. Prisma manages 80+ models, Stripe Connect handles payment flows, and Mapbox powers interactive territory maps. The AI chatbot runs a RAG loop — retrieving from franchise documents and answering in context — so prospects get grounded answers instead of generic ones.",
    github: "https://github.com/kvadou/franchise-manager",
    demo: "https://franchise-manager-liard.vercel.app",
    demoLabel: "franchise-manager-liard.vercel.app",
    demoAdmin: "https://franchise-manager-liard.vercel.app/admin",
    image: "/screenshots/franchise-manager.png",
    screenshots: [
      { src: "/screenshots/franchise-frontend.png", label: "Public Marketing Site — prospect-facing site with the RAG chatbot" },
      { src: "/screenshots/franchise-admin-dashboard.png", label: "Admin Command Center — pipeline, revenue, and prospect activity" },
      { src: "/screenshots/franchise-admin-franchisees.png", label: "Franchisee Management — lifecycle tracking across the franchise network" },
      { src: "/screenshots/franchise-admin-learning.png", label: "Learning Center — onboarding and training for new franchisees" },
      { src: "/screenshots/franchise-admin-settings.png", label: "System Settings — configuration and role-based access controls" },
    ],
  },
  {
    slug: "workforce-training-portal",
    title: "Workforce Training Portal",
    category: "Production Platform · Multi-Tenant LMS",
    pitch:
      "A multi-tenant training portal for a 100+ contractor workforce — gamified onboarding, an LMS with Elo-based skill assessment, and subdomain-per-market deployment.",
    stack: ["Next.js 16", "TypeScript", "Prisma 7", "NextAuth", "TanStack Query"],
    metrics: [
      { value: "184+", label: "API Routes" },
      { value: "100+", label: "Contractors" },
      { value: "6-Tier", label: "RBAC" },
      { value: "Multi-Tenant", label: "Subdomains" },
    ],
    highlights: [
      "Subdomain-based multi-tenancy serving market-specific content and configuration",
      "Gamified onboarding with points, badges, streaks, and real-time leaderboards",
      "Training modules with an Elo rating system for skill assessment",
      "6-tier RBAC with granular, role-based permission controls",
      "184+ API routes spanning training, scheduling, and performance",
      "TanStack Query for fast, cached client-side data fetching",
    ],
    outcome:
      "Onboards and trains a 100+ contractor workforce across multiple markets from one multi-tenant platform.",
    problem:
      "A rapidly growing contractor workforce needed structured onboarding, ongoing training, and performance tracking. Off-the-shelf LMS platforms were too generic, couldn't deploy per market, and had none of the gamification needed to keep a distributed workforce actually engaged.",
    architecture:
      "Next.js 16 with Prisma 7 and NextAuth. TanStack Query handles client-side fetching and caching. Multi-tenancy runs through subdomain routing, so each market gets its own content and configuration. A gamification engine tracks points, badges, and streaks with live leaderboards, and an Elo system scores skill progression over time.",
    github: "https://github.com/kvadou/workforce-portal",
    demo: "https://workforce-portal-kappa.vercel.app",
    demoLabel: "workforce-portal-kappa.vercel.app",
    image: "/screenshots/workforce-portal-dashboard.png",
    screenshots: [
      { src: "/screenshots/workforce-portal-dashboard.png", label: "Dashboard — training progress, course continuation, and latest updates" },
      { src: "/screenshots/workforce-portal-course.png", label: "Curriculum — course browser with modules, lessons, and structure" },
      { src: "/screenshots/workforce-portal-onboarding.png", label: "Onboarding — phased training pipeline with video lessons and quizzes" },
      { src: "/screenshots/workforce-portal-admin.png", label: "Admin — operations view of pipeline, training, and engagement metrics" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
