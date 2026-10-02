import type { Metadata } from "next";
import Link from "next/link";
import { platform } from "@/lib/system";
import { Reveal } from "@/app/components/reveal";
import { AiBadge } from "@/app/components/ai-badge";
import { SectionLabel } from "@/app/components/section-label";

export const metadata: Metadata = {
  title: "Platform · Doug Kvamme",
  description:
    "The layer under every app: model gateway, forecast eval harness, warehouse and MCP server, SRE agents, backups, log archive, security automation, review gate, and the shared design system.",
};

export default function PlatformPage() {
  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-20 sm:pt-28">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Platform</span>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              The part nobody sees, so everything else can be trusted
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Ten apps built by one person only work if the boring layer is solid. Every model call goes through one
              governed gateway, every database is backed up and drill-tested, every push is graded by risk, and the
              production forecast is graded by a service that can&apos;t be talked into a better score.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16">
        <SectionLabel>Ten pieces, one fleet</SectionLabel>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {platform.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 60}>
              <article className="h-full rounded-xl border border-border bg-card p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-muted">{p.kind}</span>
                    <h2 className="mt-1 font-display text-xl font-bold text-foreground">{p.title}</h2>
                  </div>
                  {p.ai && <AiBadge />}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
                <ul className="mt-4 space-y-1.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm text-foreground/90">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
                {p.title === "Forecast eval harness" && (
                  <Link href="/projects/cash-forecast-eval" className="mt-5 inline-flex text-sm font-semibold text-accent hover:underline">
                    Read the case study
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
