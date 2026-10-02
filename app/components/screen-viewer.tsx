"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ScreenFrame } from "./screen-frame";

export interface ViewerApp {
  slug: string;
  name: string;
  role: string;
  domain: string;
  tagline: string;
  features: { title: string; item: string; ai?: boolean }[];
  shot: { src: string; caption: string; w: number; h: number };
  shotCount: number;
}

// Tabs over one console pane: the visitor flips through real screens without
// leaving the page. Arrow keys move between tabs (WAI-ARIA tabs pattern).
export function ScreenViewer({ items }: { items: ViewerApp[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const app = items[active];

  const move = (to: number) => {
    const next = (to + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Apps"
        className="rail -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(active + 1);
          if (e.key === "ArrowLeft") move(active - 1);
        }}
      >
        {items.map((it, i) => (
          <button
            key={it.slug}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${it.slug}`}
            aria-selected={i === active}
            aria-controls="screen-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`min-h-11 shrink-0 rounded-lg border px-4 text-sm font-semibold transition-colors ${
              i === active ? "border-ink bg-ink text-panel" : "border-rule bg-panel text-ink-2 hover:border-rule-strong hover:text-ink"
            }`}
          >
            {it.name.replace("Kingside ", "")}
          </button>
        ))}
      </div>

      <div
        id="screen-panel"
        role="tabpanel"
        aria-labelledby={`tab-${app.slug}`}
        className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12"
      >
        <Link href={`/projects/${app.slug}`} className="group block" aria-label={`Open the ${app.name} walkthrough`}>
          <ScreenFrame domain={app.domain} right={`${app.shotCount} screens`}>
            <div className="relative overflow-hidden" style={{ aspectRatio: `${app.shot.w} / ${app.shot.h}` }}>
              <Image
                key={app.shot.src}
                src={app.shot.src}
                alt={app.shot.caption}
                fill
                className="animate-fade-in object-contain object-top transition-transform duration-700 group-hover:scale-[1.015]"
                sizes="(max-width: 1024px) 100vw, 820px"
              />
            </div>
          </ScreenFrame>
        </Link>

        <div key={app.slug} className="animate-rise">
          <p className="data text-signal">{app.role}</p>
          <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] text-ink">{app.name}</h3>
          <p className="mt-3 leading-relaxed text-ink-2">{app.tagline}</p>
          <dl className="mt-6 divide-y divide-rule border-y border-rule">
            {app.features.map((f) => (
              <div key={f.title} className="py-3">
                <dt className="flex items-center gap-2 text-sm font-semibold text-ink">
                  {f.title}
                  {f.ai && <span className="data rounded-[3px] border border-rule-strong px-1 leading-[1.35] text-ink-2">AI</span>}
                </dt>
                <dd className="mt-0.5 text-sm text-ink-2">{f.item}</dd>
              </div>
            ))}
          </dl>
          <Link
            href={`/projects/${app.slug}`}
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-ink link-underline"
          >
            Full walkthrough
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M3 10a1 1 0 011-1h9.6l-3.3-3.3a1 1 0 111.4-1.4l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4l3.3-3.3H4a1 1 0 01-1-1z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
