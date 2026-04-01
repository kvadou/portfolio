# Portfolio Site & Sanitized Demo Apps — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a professional portfolio site with 5 sanitized, deployable demo versions of Doug's production apps — all on Vercel with public GitHub repos.

**Architecture:** A Next.js portfolio hub site links to 5 standalone demo apps. Each demo is a sanitized clone of a production app with fake seed data, stripped branding, and disabled external integrations (stubbed). All 6 projects get their own GitHub repo and Vercel deployment.

**Tech Stack:** Next.js 15 (portfolio site), Vercel (hosting), PostgreSQL on Neon or Supabase (free tier for demos), Tailwind CSS, GitHub

---

## Phase 0: Project Setup & GitHub Repos

### Task 0.1: Create GitHub Repos and Local Project Structure

**Files:**
- Create: `~/projects/portfolio/README.md`

**Steps:**
1. Create 5 GitHub repos (public):
   - `dougkvamme/portfolio` — the hub site
   - `dougkvamme/ops-command-center` — OpsHub demo
   - `dougkvamme/talent-platform` — HiringHub demo
   - `dougkvamme/franchise-manager` — Franchising demo
   - `dougkvamme/workforce-portal` — StoryTimeTutors demo
   - `dougkvamme/creative-studio` — Studio demo

2. Create local project directories:
   ```
   ~/projects/portfolio/          # Hub site
   ~/projects/portfolio-demos/
     ops-command-center/           # Sanitized OpsHub
     talent-platform/              # Sanitized HiringHub
     franchise-manager/            # Sanitized Franchising
     workforce-portal/             # Sanitized StoryTimeTutors
     creative-studio/              # Sanitized Studio
   ```

3. Each demo app gets initialized with the same stack as the original (preserving the tech story).

---

## Phase 1: Portfolio Hub Site

### Task 1.1: Scaffold Next.js Portfolio Site

**Files:**
- Create: `~/projects/portfolio/` (Next.js 15 app)

**Steps:**
1. `npx create-next-app@latest portfolio` with TypeScript, Tailwind, App Router
2. Deploy to Vercel immediately (empty shell) to confirm pipeline works
3. Commit: `feat: scaffold portfolio site`

### Task 1.2: Build Portfolio Landing Page

**Files:**
- Create: `app/page.tsx` — hero + project cards
- Create: `app/layout.tsx` — global layout with nav
- Create: `components/ProjectCard.tsx`

**Design:**
- Clean, minimal dark/light theme (not flashy — let the apps speak)
- Hero: Name, title ("Full-Stack Engineer"), 1-line pitch
- 4 project cards with: screenshot, title, tech badges, 1-line description, links to live demo + GitHub
- Links section: GitHub, LinkedIn, resume PDF

### Task 1.3: Build Project Case Study Pages

**Files:**
- Create: `app/projects/[slug]/page.tsx`
- Create: `lib/projects.ts` — project data

**Each case study page includes:**
- Problem statement (what business need it solved)
- Architecture diagram (simple, text-based or SVG)
- Tech stack badges
- Key features list (3-5 bullets)
- Screenshots (2-3 per app)
- Metrics/outcomes (e.g., "Replaced $30k/yr SaaS", "Used daily by 15+ non-technical staff")
- Links: Live Demo | GitHub

**Project data for each app:**

#### Ops Command Center (OpsHub)
- **Pitch:** Operations platform managing sales pipeline, scheduling, analytics, and multi-market franchise operations
- **Stack:** React 18, Express.js, PostgreSQL (raw SQL), Redis, Tailwind + MUI
- **Highlights:** 138+ API routes, 200+ components, 5 databases, FullCalendar scheduling, real-time analytics dashboards, RBAC, 185 database migrations
- **Outcome:** Daily operational backbone for a $3M education company

#### Talent Acquisition Platform (HiringHub)
- **Pitch:** Full-featured ATS built to replace Greenhouse — AI-powered candidate matching, Kanban pipeline, interview management
- **Stack:** Next.js 14, TypeScript, Prisma, Clerk, PostgreSQL + pgvector
- **Highlights:** 83 database models, AI resume scoring with embeddings, drag-and-drop Kanban, Zoom integration, multi-market RBAC, e-signature workflows
- **Outcome:** Replaced $30k/year SaaS with custom solution

#### Franchise Management System (Franchising)
- **Pitch:** B2B platform for franchise prospecting, onboarding, and lifecycle management with AI chatbot
- **Stack:** Next.js 14, TypeScript, Prisma, NextAuth v5, Stripe Connect
- **Highlights:** 80+ models, RAG-powered AI chatbot, territory mapping with Mapbox, financial dashboards, 8-stage prospect pipeline, e-signature integration
- **Outcome:** End-to-end franchise operations from first inquiry to signed agreement

#### Workforce Training Portal (StoryTimeTutors)
- **Pitch:** Contractor portal with gamified onboarding, LMS, chess training system, and multi-tenant architecture
- **Stack:** Next.js 16, TypeScript, Prisma 7, NextAuth, TanStack Query
- **Highlights:** 6-tier RBAC, gamified onboarding (points, badges, streaks), 8K chess puzzles with Elo rating, subdomain-based multi-tenancy, 184+ API routes
- **Outcome:** Manages 100+ contractor workforce across multiple markets

#### Creative Studio (Studio)
- **Pitch:** AI-powered creative platform for curriculum content generation and illustration creation, backed by RAG for grounded accuracy
- **Stack:** React 18 + Vite, Express.js + TypeScript, Prisma, Claude API, OpenAI Embeddings
- **Highlights:** Full RAG pipeline (semantic + keyword + RRF fusion), AI curriculum generation with citation grounding, illustration generation, collaborative project workspaces, batch content creation
- **Outcome:** Reduced content creation time by 10x — from days to minutes per lesson module

### Task 1.4: Add Resume/About Page

**Files:**
- Create: `app/about/page.tsx`

**Content:**
- Brief professional summary
- Skills matrix (languages, frameworks, databases, tools)
- Link to downloadable resume PDF
- Contact info

### Task 1.5: Deploy Portfolio Site to Vercel

**Steps:**
1. Connect GitHub repo to Vercel
2. Configure custom domain if available
3. Verify deployment
4. Commit: `feat: complete portfolio site v1`

---

## Phase 2: Sanitized Demo Apps

**Strategy for all 4 apps:**
1. Clone the production repo into the demo directory (fresh git history — `git init`, not `git clone`)
2. Global find-and-replace for company names, domains, branding
3. Strip all `.env` values — create `.env.example` with placeholders
4. Replace all seed data with realistic fake data (using Faker.js)
5. Stub external integrations (Stripe, Zoom, etc.) — return mock responses
6. Replace logos/images with generic placeholders
7. Add comprehensive README with setup instructions
8. Deploy to Vercel with Neon/Supabase free-tier PostgreSQL

### Task 2.1: Ops Command Center (from OpsHub)

**Sanitization checklist:**
- [ ] Copy source files (no git history) into `ops-command-center/`
- [ ] Replace all "Story Time Chess" / "STC" references with "Acme Operations"
- [ ] Replace all real email addresses, phone numbers, names
- [ ] Strip TutorCruncher integration — stub with mock API responses
- [ ] Strip Stripe keys — use Stripe test mode or stub
- [ ] Strip Meta Ads / Google Ads integrations — stub
- [ ] Strip Missive / Brevo email integrations — stub with console.log
- [ ] Remove all mcp-configs (nashville, orlando, production, staging)
- [ ] Replace database connection strings with single local/Neon connection
- [ ] Remove multi-database architecture — consolidate to single DB
- [ ] Replace all logos in public/ with generic placeholder
- [ ] Update Tailwind/MUI theme colors to neutral palette
- [ ] Create seed script with Faker.js data (fake clients, contractors, appointments, invoices)
- [ ] Create `.env.example` with all required vars documented
- [ ] Write README: what it is, how to run locally, tech stack, architecture
- [ ] Ensure app boots and key pages render with seed data
- [ ] Deploy to Vercel (with Neon PostgreSQL)

**Key pages to preserve (most visually impressive):**
- Dashboard with analytics charts
- Sales pipeline / CCT board
- Scheduling calendar (FullCalendar)
- Contractor management table (MUI DataGrid)
- Client detail page

### Task 2.2: Talent Acquisition Platform (from HiringHub)

**Sanitization checklist:**
- [ ] Copy source files (no git history) into `talent-platform/`
- [ ] Replace all "Story Time Chess" / "STC" references with "Acme Talent"
- [ ] Replace Clerk config — use Clerk dev instance or stub auth
- [ ] Strip Zoom Server-to-Server integration — stub
- [ ] Strip Checkr integration — stub
- [ ] Strip Dropbox Sign integration — stub
- [ ] Strip Postmark — stub with console.log
- [ ] Remove market-specific data (Nashville, Orlando, etc.)
- [ ] Replace all candidate/job data with Faker.js generated data
- [ ] Replace logos and brand colors
- [ ] Disable pgvector if Neon free tier doesn't support it (fallback to simple scoring)
- [ ] Create seed script: fake jobs, candidates, interviews, scorecards
- [ ] Write README
- [ ] Deploy to Vercel (with Neon PostgreSQL)

**Key pages to preserve:**
- Kanban pipeline board (drag-and-drop)
- Candidate detail with resume scoring
- Job posting management
- Interview scheduling
- Analytics dashboard

### Task 2.3: Franchise Management System (from Franchising)

**Sanitization checklist:**
- [ ] Copy source files (no git history) into `franchise-manager/`
- [ ] Replace all "Story Time Chess" / franchise-specific references with "Acme Franchise Co"
- [ ] Replace NextAuth config — use dev credentials
- [ ] Strip Stripe Connect — stub payment flows
- [ ] Strip Postmark — stub
- [ ] Strip Dropbox Sign — stub
- [ ] Replace Mapbox token — use free tier token or stub with static map
- [ ] Strip Claude API / OpenAI chatbot — stub with canned responses (or keep with user's own API key via env var)
- [ ] Remove real prospect/franchisee data from seed files
- [ ] Replace territory data with fictional territories
- [ ] Replace all logos and brand colors
- [ ] Create seed script: fake prospects, franchisees, pre-work modules, financial data
- [ ] Write README
- [ ] Deploy to Vercel (with Neon PostgreSQL)

**Key pages to preserve:**
- Admin prospect pipeline dashboard
- Territory mapping page
- Financial projections / dashboards (Recharts)
- Pre-work module management
- AI chatbot (Earl) — even stubbed, show the UI
- Prospect portal view

### Task 2.4: Workforce Training Portal (from StoryTimeTutors)

**Sanitization checklist:**
- [ ] Copy source files (no git history) into `workforce-portal/`
- [ ] Replace all "Story Time Chess" / "STC" / "Tutor" references with "Acme Workforce"
- [ ] Replace NextAuth config — use dev credentials
- [ ] Strip TutorCruncher integration — stub
- [ ] Strip Branch Payments — stub
- [ ] Strip SendGrid — stub
- [ ] Strip Vimeo embeds — use placeholder video URLs
- [ ] Strip AWS S3 — use local file storage or stub
- [ ] Remove subdomain multi-tenancy (nashville/orlando) — single tenant
- [ ] Replace all personnel data with Faker.js
- [ ] Replace chess-specific content (puzzles, lessons) with generic training content
- [ ] Replace logos and brand colors
- [ ] Create seed script: fake users, training modules, badges, progress data
- [ ] Write README
- [ ] Deploy to Vercel (with Neon PostgreSQL)

**Key pages to preserve:**
- Admin command center (47+ admin pages — show the best ones)
- Onboarding journey (gamified steps)
- Training module builder / LMS
- Badge/points dashboard
- Worker profile page

### Task 2.5: Creative Studio (from Studio)

**Sanitization checklist:**
- [ ] Copy source files (no git history) into `creative-studio/`
- [ ] Replace all "Story Time Chess" / "STC" / chess-specific references with "Acme Creative Studio"
- [ ] Rebrand as a generic curriculum content & illustration generation platform
- [ ] Replace Google OAuth config — use dev credentials
- [ ] Replace Claude API key — make it configurable via env var (user provides their own key)
- [ ] Replace OpenAI embeddings key — same, configurable via env var
- [ ] Strip domain restriction (@storytimechess.com) — allow any authenticated user
- [ ] Remove all chess-specific curriculum content from seed data (lessons, characters, mnemonics)
- [ ] Replace with generic educational content (e.g., science lessons, history modules, language arts)
- [ ] Replace logos and brand colors (Poppins font can stay — it's generic)
- [ ] Create seed script: fake curriculum documents, lesson plans, generated illustrations, projects
- [ ] Pre-generate embeddings for seed documents so RAG works out of the box
- [ ] Replace web search augmentation — stub or keep with user's API key
- [ ] Write README with clear instructions for adding your own API keys
- [ ] Deploy to Vercel (with Neon PostgreSQL + pgvector for embeddings)

**Key pages to preserve:**
- Chat interface with citation cards (RAG in action)
- Curriculum generation / batch generation UI
- Illustration generation workflow
- Project workspaces (collaborative content creation)
- Document/source management
- Conversation history sidebar

**Why this app matters for portfolio:**
This is a dual AI showcase — RAG architecture end-to-end (ingestion, chunking, embedding, hybrid retrieval with RRF fusion, grounded generation with citations) PLUS generative content creation (curriculum writing and illustration generation). Shows both retrieval-augmented and creative AI engineering in one app.

---

## Phase 3: Screenshots & Final Polish

### Task 3.1: Capture Screenshots for Portfolio Site

**Steps:**
1. For each demo app, capture 2-3 high-quality screenshots of key pages
2. Save to `~/projects/portfolio/public/screenshots/`
3. Use browser at 1440x900 for consistent sizing
4. Update portfolio site project cards and case study pages with real screenshots

### Task 3.2: Final Review & Cross-linking

**Steps:**
1. Verify all 5 demo apps boot and render correctly on Vercel
2. Verify all GitHub repos have clean READMEs
3. Verify portfolio site links to correct demo URLs and GitHub repos
4. Check for any remaining STC/Story Time Chess references across all repos
5. Final commit and deploy

---

## Execution Order

| Phase | What | Est. Effort |
|-------|------|-------------|
| 0 | GitHub repos + project structure | Quick setup |
| 1 | Portfolio hub site | Medium |
| 2.1 | Ops Command Center sanitization | Large (biggest app) |
| 2.2 | Talent Platform sanitization | Medium |
| 2.3 | Franchise Manager sanitization | Medium |
| 2.4 | Workforce Portal sanitization | Medium |
| 2.5 | Creative Studio sanitization | Small-Medium (focused scope) |
| 3 | Screenshots + polish | Quick |

**Recommended approach:** Do Phase 0 + 1 first (portfolio site), then tackle demo apps one at a time. Each demo app is independent so they can be parallelized with agents if desired. Studio (2.5) is the smallest scope — good candidate for first or last.

---

## Key Decisions

1. **Fresh git history** — Don't clone with history (would expose real commits with customer data). Start each demo with `git init`.
2. **Stub integrations, don't remove** — Keep the integration code visible in GitHub (shows your integration skills) but stub the actual API calls to return mock data.
3. **Single database per demo** — No multi-tenant complexity for demos. Simpler to deploy on free tier.
4. **Neon PostgreSQL** — Free tier, works great with Vercel, supports pgvector.
5. **Keep AI features where possible** — If the reviewer has their own API key, let them enable AI features via env var. Otherwise, stub with canned responses.
