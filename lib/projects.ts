export interface Project {
  slug: string;
  title: string;
  pitch: string;
  stack: string[];
  highlights: string[];
  outcome: string;
  problem: string;
  architecture: string;
  github: string;
  demo: string;
  demoAdmin?: string;
  image: string;
  screenshots?: { src: string; label: string }[];
}

export const projects: Project[] = [
  {
    slug: "ops-command-center",
    title: "Ops Command Center",
    pitch:
      "Operations platform managing sales pipeline, scheduling, analytics, and multi-market franchise operations",
    stack: [
      "React 18",
      "Express.js",
      "PostgreSQL",
      "Redis",
      "Tailwind",
      "MUI",
    ],
    highlights: [
      "138+ API routes across multiple Express servers",
      "200+ React components with modular architecture",
      "5 PostgreSQL databases with raw SQL for performance-critical queries",
      "FullCalendar-based scheduling system with drag-and-drop",
      "Real-time analytics dashboards with custom charting",
      "Role-based access control (RBAC) across multiple user types",
      "185 database migrations tracking schema evolution",
    ],
    outcome: "Daily operational backbone for a $3M education company",
    problem:
      "A growing education company needed a unified platform to manage its sales pipeline, tutor scheduling, multi-market operations, and business analytics. Off-the-shelf tools were fragmented, expensive, and couldn't handle the company's specific workflows across multiple US markets and international locations.",
    architecture:
      "Built on React 18 with Express.js backend servers, backed by PostgreSQL with raw SQL for complex reporting queries. Redis handles caching and session management. The frontend uses a combination of Tailwind CSS and MUI for a dense, data-rich operational interface.",
    github: "https://github.com/kvadou/ops-command-center",
    demo: "https://ops-command-center.onrender.com",
    image: "/screenshots/ops-command-center.png",
  },
  {
    slug: "talent-acquisition-platform",
    title: "Talent Acquisition Platform",
    pitch:
      "Full-featured ATS built to replace Greenhouse — AI-powered candidate matching, Kanban pipeline, interview management",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "Clerk",
      "PostgreSQL",
      "pgvector",
    ],
    highlights: [
      "83 database models covering the full hiring lifecycle",
      "AI resume scoring with OpenAI embeddings and pgvector similarity search",
      "Drag-and-drop Kanban pipeline with real-time stage transitions",
      "Zoom integration for automated interview scheduling",
      "Multi-market RBAC with granular permission controls",
      "E-signature workflows for offer letters and onboarding documents",
    ],
    outcome: "Replaced $12k/year SaaS with custom solution",
    problem:
      "The company was paying $12,000/year for Greenhouse but only using a fraction of its features. The tool couldn't handle multi-market hiring workflows, lacked AI-powered candidate matching, and required manual workarounds for the company's unique interview and onboarding processes.",
    architecture:
      "Next.js 14 with App Router and server components for fast page loads. Prisma ORM manages 83 models across a PostgreSQL database extended with pgvector for AI similarity search. Clerk handles authentication with multi-tenant support. The AI pipeline uses OpenAI embeddings for resume vectorization and cosine similarity matching.",
    github: "https://github.com/kvadou/talent-platform",
    demo: "https://talent-platform-mu.vercel.app",
    image: "/screenshots/talent-dashboard.png",
    screenshots: [
      { src: "/screenshots/talent-dashboard.png", label: "Dashboard" },
      { src: "/screenshots/talent-jobs.png", label: "Jobs Board" },
      { src: "/screenshots/talent-candidates.png", label: "Candidate Pool" },
    ],
  },
  {
    slug: "franchise-management-system",
    title: "Franchise Management System",
    pitch:
      "B2B platform for franchise prospecting, onboarding, and lifecycle management with AI chatbot",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "NextAuth v5",
      "Stripe Connect",
      "Mapbox",
    ],
    highlights: [
      "80+ Prisma models covering the full franchise lifecycle",
      "RAG-powered AI chatbot with document retrieval and contextual responses",
      "Territory mapping with Mapbox for market analysis and visualization",
      "Financial dashboards with real-time revenue tracking",
      "8-stage prospect pipeline from inquiry to signed agreement",
      "E-signature integration for franchise agreements and legal documents",
    ],
    outcome:
      "End-to-end franchise operations from first inquiry to signed agreement",
    problem:
      "Managing franchise prospects across an 8-stage pipeline required juggling spreadsheets, email threads, and manual territory analysis. There was no unified system to track prospects, manage financial agreements, or provide prospects with self-service access to franchise information.",
    architecture:
      "Next.js 14 with NextAuth v5 for role-based authentication across franchise owners and corporate admins. Prisma manages 80+ models with Stripe Connect handling franchise payment flows. Mapbox powers interactive territory maps for market analysis. The RAG chatbot uses embeddings for document retrieval with contextual AI responses.",
    github: "https://github.com/kvadou/franchise-manager",
    demo: "https://franchise-manager-liard.vercel.app",
    demoAdmin: "https://franchise-manager-liard.vercel.app/admin",
    image: "/screenshots/franchise-manager.png",
    screenshots: [
      { src: "/screenshots/franchise-frontend.png", label: "Public Marketing Site" },
      { src: "/screenshots/franchise-admin-dashboard.png", label: "Admin Command Center" },
      { src: "/screenshots/franchise-admin-learning.png", label: "Learning Center" },
      { src: "/screenshots/franchise-admin-franchisees.png", label: "Franchisee Management" },
      { src: "/screenshots/franchise-admin-settings.png", label: "System Settings" },
    ],
  },
  {
    slug: "workforce-training-portal",
    title: "Workforce Training Portal",
    pitch:
      "Contractor portal with gamified onboarding, LMS, training system, and multi-tenant architecture",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Prisma 7",
      "NextAuth",
      "TanStack Query",
    ],
    highlights: [
      "6-tier RBAC system with granular permission controls",
      "Gamified onboarding with points, badges, and streak tracking",
      "Training modules with Elo rating system for skill assessment",
      "Subdomain-based multi-tenancy for market-specific deployments",
      "184+ API routes covering training, scheduling, and performance",
    ],
    outcome: "Manages 100+ contractor workforce across multiple markets",
    problem:
      "A rapidly growing contractor workforce needed structured onboarding, ongoing training, and performance tracking. Existing LMS platforms were too generic, couldn't handle multi-market deployment, and lacked the gamification needed to keep a distributed contractor workforce engaged.",
    architecture:
      "Next.js 16 with Prisma 7 and NextAuth for authentication. TanStack Query handles client-side data fetching and caching. The multi-tenant architecture uses subdomain routing to serve market-specific content and configurations. The gamification engine tracks points, badges, and streaks with real-time leaderboards.",
    github: "https://github.com/kvadou/workforce-portal",
    demo: "https://workforce-portal-kappa.vercel.app",
    image: "/screenshots/workforce-portal.png",
  },
  {
    slug: "creative-studio",
    title: "Creative Studio",
    pitch:
      "AI-powered creative platform for curriculum content generation and illustration creation, backed by RAG for grounded accuracy",
    stack: [
      "React 18",
      "Vite",
      "Express.js",
      "TypeScript",
      "Prisma",
      "Claude API",
      "OpenAI Embeddings",
    ],
    highlights: [
      "Full RAG pipeline with semantic search, keyword matching, and RRF fusion ranking",
      "AI curriculum generation with citation grounding for factual accuracy",
      "Illustration generation integrated with content creation workflow",
      "Collaborative project workspaces for team content review",
      "Batch content creation for producing multiple lessons simultaneously",
    ],
    outcome:
      "Reduced content creation time by 10x — from days to minutes per lesson module",
    problem:
      "Creating curriculum content was a manual, multi-day process involving research, writing, illustration sourcing, and review cycles. The company needed a way to leverage AI for content generation while ensuring factual accuracy through grounding in existing curriculum materials.",
    architecture:
      "React 18 frontend with Vite for fast development iteration, backed by Express.js with TypeScript. Prisma manages content models and project state. The RAG pipeline combines OpenAI embeddings for semantic search with keyword matching, fused via Reciprocal Rank Fusion (RRF) for optimal retrieval. Claude API powers content generation with retrieved context for citation grounding.",
    github: "https://github.com/kvadou/creative-studio",
    demo: "https://creative-studio-upgd.onrender.com",
    image: "/screenshots/creative-studio-home.png",
    screenshots: [
      { src: "/screenshots/creative-studio-home.png", label: "Home — Daily content suggestions, character roster, chess news feed" },
      { src: "/screenshots/creative-studio-curriculum.png", label: "Curriculum — Module browser with 31 lessons across 8 modules" },
      { src: "/screenshots/creative-studio-images.png", label: "Illustrations — AI-generated and original art gallery with character tagging" },
      { src: "/screenshots/creative-studio-video.png", label: "Video — Animated character videos with generation pipeline" },
      { src: "/screenshots/creative-studio-audio.png", label: "Audio — Character voice design and dialogue generation" },
      { src: "/screenshots/creative-studio-episodes.png", label: "Episodes — YouTube content pipeline with shot-by-shot production tracking" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
