import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { platform, shotsFor } from "@/lib/system";
import { activityFor, formatCount } from "@/lib/activity";
import { Reveal } from "@/app/components/reveal";
import { SectionLabel } from "@/app/components/section-label";
import { ScreenFrame } from "@/app/components/screen-frame";
import { CommitStrip } from "@/app/components/commit-strip";

export const metadata: Metadata = {
  title: "Platform · Doug Kvamme",
  description:
    "The layer under every app: model gateway, forecast eval harness, warehouse and MCP server, SRE agents, backups, log archive, security automation, review gate, and the shared design system.",
};

export default function PlatformPage() {
  const governance = shotsFor("hq").find((s) => s.src.endsWith("03-ai-governance.webp"));
  const act = activityFor("platform");

  return (
    <>
      <section>
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 pb-14 pt-14 md:px-8 md:pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end">
          <div>
            <h1 className="max-w-[20ch] text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[1] tracking-[-0.03em] text-ink">
              The part nobody sees, so everything else can be trusted.
            </h1>
            <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-ink-2">
              Ten apps built by one person only work if the boring layer is solid. Every model call goes through one
              governed gateway, every database is backed up and drill-tested, every push is graded by risk, and the
              production forecast is graded by a service that can&apos;t be talked into a better score.
            </p>
          </div>
          <figure className="rounded-[14px] border border-rule bg-panel p-5">
            <figcaption className="flex items-baseline justify-between gap-3">
              <span className="data text-ink-2">Platform repos, per week</span>
              <span className="data text-ink">{formatCount(act.total)}</span>
            </figcaption>
            <CommitStrip weeks={act.weeks} peak={Math.max(...act.weeks)} height={64} className="mt-4 h-16 w-full" />
            <p className="data mt-3 text-ink-2">11 repos, commits since Apr 1</p>
          </figure>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-4 pb-24 md:px-8">
        {governance && (
          <Reveal>
            <figure>
              <ScreenFrame domain="hq.kingside.app/ai-governance" right="figures scrambled">
                <Image src={governance.src} alt={governance.caption} width={governance.w} height={governance.h} className="w-full" sizes="(max-width: 1200px) 100vw, 1136px" />
              </ScreenFrame>
              <figcaption className="mt-4 max-w-[70ch] text-sm leading-relaxed text-ink-2">
                <span className="data mr-2 text-signal">Fig. 1</span>
                {governance.caption}
              </figcaption>
            </figure>
          </Reveal>
        )}

        <section className="pt-16">
          <Reveal>
            <SectionLabel>Ten pieces, one fleet</SectionLabel>
            <ul className="mt-6 grid md:grid-cols-2 md:gap-x-12">
              {platform.map((p) => (
                <li key={p.title} className="border-b border-rule py-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-bold tracking-[-0.01em] text-ink">{p.title}</h3>
                    <span className="data shrink-0 text-ink-2">
                      {p.kind}
                      {p.ai ? " · AI" : ""}
                    </span>
                  </div>
                  <p className="mt-2 leading-relaxed text-ink-2">{p.body}</p>
                  <ul className="mt-3 space-y-1.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-sm text-ink">
                        <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-signal-bright" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  {p.title === "Forecast eval harness" && (
                    <Link href="/projects/cash-forecast-eval" className="mt-4 inline-flex min-h-11 items-center font-semibold text-ink link-underline">
                      Read the case study
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      </div>
    </>
  );
}
