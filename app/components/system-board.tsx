import Link from "next/link";
import { appsIn, layers, type Layer } from "@/lib/system";
import { activityFor, activityMeta, formatCount, formatDay, totalCommits } from "@/lib/activity";
import { CommitStrip } from "./commit-strip";

const order: Layer[] = ["operate", "grow", "serve"];

function Row({
  href,
  name,
  role,
  slug,
  ai,
}: {
  href: string;
  name: string;
  role: string;
  slug: string;
  ai: boolean;
}) {
  const act = activityFor(slug);
  return (
    <li>
      <Link
        href={href}
        className="group grid grid-cols-[minmax(0,1fr)_6.75rem_3.25rem] items-center gap-3 px-3.5 py-2 transition-colors hover:bg-signal-wash focus-visible:bg-signal-wash sm:grid-cols-[minmax(0,1fr)_minmax(0,11rem)_3.75rem] sm:gap-4 sm:px-4"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal-bright" aria-hidden="true" />
          <span className="flex min-w-0 items-baseline gap-2">
            <span className="shrink-0 text-sm font-semibold text-ink group-hover:text-signal">{name}</span>
            {ai && (
              <span className="data shrink-0 rounded-[3px] border border-rule-strong px-1 leading-[1.35] text-ink-2" title="Ships AI features">
                AI
              </span>
            )}
            <span className="hidden truncate text-xs text-ink-3 sm:inline">{role}</span>
          </span>
        </span>
        <CommitStrip weeks={act.weeks} height={20} className="h-5 w-full" />
        <span className="data text-right text-ink">{formatCount(act.total)}</span>
      </Link>
    </li>
  );
}

export function SystemBoard() {
  return (
    <figure className="overflow-hidden rounded-[14px] border border-rule bg-panel frame-shadow">
      <div className="flex h-10 items-center justify-between gap-3 border-b border-rule px-3.5 sm:px-4">
        <span className="flex items-center gap-2">
          <span className="beacon h-2 w-2 rounded-full bg-signal-bright" aria-hidden="true" />
          <span className="data text-ink">kingside.app<span className="hidden sm:inline"> / system</span></span>
        </span>
        <span className="data text-ink-2">10 apps live</span>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_6.75rem_3.25rem] gap-3 border-b border-rule bg-paper px-3.5 py-1.5 text-ink-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,11rem)_3.75rem] sm:gap-4 sm:px-4">
        <span className="data">App</span>
        <span className="data"><span className="sm:hidden">Commits/wk</span><span className="hidden sm:inline">Commits per week</span></span>
        <span className="data text-right">Total</span>
      </div>

      {order.map((layer) => (
        <section key={layer} aria-label={layers[layer].label}>
          <p className="data border-b border-rule px-3.5 pb-1 pt-2.5 text-ink-2 sm:px-4">{layers[layer].label}</p>
          <ul className="divide-y divide-rule border-b border-rule">
            {appsIn(layer).map((a) => (
              <Row
                key={a.slug}
                href={`/projects/${a.slug}`}
                name={a.name.replace("Kingside ", "")}
                role={a.role}
                slug={a.slug}
                ai={a.features.some((f) => f.ai)}
              />
            ))}
          </ul>
        </section>
      ))}
      <section aria-label={layers.platform.label}>
        <p className="data border-b border-rule px-3.5 pb-1 pt-2.5 text-ink-2 sm:px-4">{layers.platform.label}</p>
        <ul>
          <Row href="/platform" name="Platform" role="Gateway, evals, warehouse, SRE agents, backups" slug="platform" ai />
        </ul>
      </section>

      <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-rule bg-paper px-3.5 py-2.5 text-ink-2 sm:px-4">
        <span className="data">
          <span className="text-ink">{formatCount(totalCommits)}</span> commits, {formatDay(activityMeta.since)} to {formatDay(activityMeta.generated)}
        </span>
        <span className="data">26 weeks, √ scale, from git</span>
      </figcaption>
    </figure>
  );
}
