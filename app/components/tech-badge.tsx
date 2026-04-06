const colorMap: Record<string, string> = {
  "React 18": "bg-sky-500/10 text-sky-500 border-sky-500/20",
  "Express.js": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  PostgreSQL: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Redis: "bg-red-500/10 text-red-500 border-red-500/20",
  Tailwind: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  "Tailwind CSS": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  MUI: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  "Next.js 14": "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
  "Next.js 16": "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
  "Next.js": "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
  TypeScript: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Prisma: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Prisma 7": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Clerk: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  pgvector: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "NextAuth v5": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  NextAuth: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Stripe Connect": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Stripe: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Mapbox: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  "TanStack Query": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Vite: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Claude API": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "OpenAI Embeddings": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "OpenAI API": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  React: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  Supabase: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Docker: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "GitHub Actions": "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
  Vercel: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
  Heroku: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

const fallback = "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";

export function TechBadge({ name }: { name: string }) {
  const colors = colorMap[name] || fallback;
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase ${colors}`}
    >
      {name}
    </span>
  );
}
