# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: a hiring manager, engineering lead, or founder at an AI company hiring a Forward Deployed AI Engineer (Anthropic, OpenAI, Varick-style agent shops). They arrive from a resume link, LinkedIn, or an application form, usually skimming several candidates in one sitting, often first on a phone, then on a laptop if hooked. Their job: decide in under two minutes whether Doug can walk into a messy business, map how work really flows, and ship production AI and software inside it. Success = they email Doug or ask for a call.

## Product Purpose
Personal portfolio for Doug Kvamme. It proves, with real production evidence, that one engineer built a company's whole operating system: ten production apps across four layers plus a shared AI, data, and reliability platform, used daily by non-technical staff, tutors, families, schools, and franchise owners.

## Positioning
Not a dev who builds demos: a forward deployed engineer whose evidence is one live company run on software he alone built and operates, with evals in production (the cash-forecast referee) and an explicit method (map the work, sort each step into delete, code, agent, or human, ship inside the systems of record).

## Operating Context
Reviewers compare candidates quickly. Screenshots are the primary proof. The real company is anonymized as "Kingside Learning"; Chesslandia is the fictional sandbox market used for record-level screens.

## Capabilities and Constraints
- Next.js 16 + Tailwind 4 on Vercel, public repo kvadou/portfolio, deploy on push to main.
- Content model in `lib/system.ts` (apps, layers, platform, fleet stats); screenshots in `public/shots` via `lib/shots-manifest.json`, built by `scripts/build-shots.py`.
- Routes: `/`, `/projects/[slug]` (10 apps), `/projects/cash-forecast-eval`, `/platform`, `/method`, `/about`. Legacy slugs 308-redirect.
- Must be fully responsive on phone, tablet, desktop.
- No native browser dialogs. No em dashes in copy.
- Light/dark theme exists today; keeping it is not required.

## Brand Commitments
- Name: Doug Kvamme. Title: Forward Deployed AI Engineer.
- The "DK" monogram logo is NOT liked; remove it or replace it (user to choose from variations).
- Never show the real company's name, logo, staff, clients, tutors, or real figures. Anonymized as Kingside Learning.
- Voice: direct, plain, specific numbers, no hype.

## Evidence on Hand
- 48 anonymized production screenshots, `public/shots/<slug>/` with captions in `lib/shots-manifest.json`.
- Fleet stats: 10 apps, 11,000+ commits since April, 2,000+ API routes, 1,700+ test files, 800+ data models.
- Cash forecast eval: launch 71% weekly; live 74% weekly / 84% rolling 4-week (range 76 to 91); best replay 92%; target 95%; naive baseline beat first model 2.3x; 30/70 model/seasonal blend; noise gate.
- Method page: 5 steps, 4 real workflows.
- No testimonials, client logos, or press exist. Do not fabricate any.

## Product Principles
1. Proof over claims: show the running system, real numbers, honest caveats.
2. Respect the skimmer: the thesis and the action must land in the first viewport on a phone.
3. Honest about status: label what is built but gated, what is in progress.
4. Anonymized, never fake: fictional brand, real software.

## Accessibility & Inclusion
WCAG AA contrast, keyboard navigable gallery, reduced-motion respected.
