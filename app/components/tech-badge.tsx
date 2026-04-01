const colorMap: Record<string, string> = {
  "React 18": "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  "Express.js": "bg-green-500/15 text-green-600 dark:text-green-400",
  PostgreSQL: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  Redis: "bg-red-500/15 text-red-600 dark:text-red-400",
  Tailwind: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  MUI: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
  "Next.js 14": "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400",
  "Next.js 16": "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400",
  TypeScript: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  Prisma: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  "Prisma 7": "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  Clerk: "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  pgvector: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "NextAuth v5": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  NextAuth: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  "Stripe Connect": "bg-purple-500/15 text-purple-600 dark:text-purple-400",
  Mapbox: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
  "TanStack Query": "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  Vite: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
  "Claude API": "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  "OpenAI Embeddings": "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
};

const fallback = "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400";

export function TechBadge({ name }: { name: string }) {
  const colors = colorMap[name] || fallback;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors}`}
    >
      {name}
    </span>
  );
}
