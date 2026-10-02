"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Shot } from "@/lib/system";
import { ScreenFrame } from "./screen-frame";

export function Gallery({ shots, domain }: { shots: Shot[]; domain: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const count = shots.length;
  const go = useCallback((d: number) => setIndex((i) => (i + d + count) % count), [count]);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    };
  }, [open, go]);

  if (!count) return null;
  const shot = shots[index];

  return (
    <div
      onKeyDown={(e) => {
        if (open) return;
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <ScreenFrame domain={domain} right={`${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block w-full cursor-zoom-in"
          aria-label={`Enlarge screenshot: ${shot.caption}`}
        >
          <Image
            key={shot.src}
            src={shot.src}
            alt={shot.caption}
            width={shot.w}
            height={shot.h}
            className="w-full animate-fade-in"
            sizes="(max-width: 1024px) 100vw, 1100px"
            priority={index === 0}
          />
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-ink/85 px-2.5 py-1.5 text-xs font-medium text-panel opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            Enlarge
          </span>
        </button>
      </ScreenFrame>

      <div className="mt-4 flex items-start justify-between gap-4">
        <p className="min-h-[3rem] max-w-[70ch] text-sm leading-relaxed text-ink-2 sm:text-base" aria-live="polite">
          <span className="data mr-2 text-signal">Fig. {index + 1}</span>
          {shot.caption}
        </p>
        {count > 1 && (
          <div className="flex shrink-0 gap-2">
            <NavButton dir="prev" onClick={() => go(-1)} />
            <NavButton dir="next" onClick={() => go(1)} />
          </div>
        )}
      </div>

      {count > 1 && (
        <div className="rail -mx-4 mt-4 flex gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0" role="tablist" aria-label="Screenshots">
          {shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={s.caption}
              onClick={() => setIndex(i)}
              className={`relative aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-md border transition-all sm:w-36 ${
                i === index
                  ? "border-ink ring-2 ring-signal-bright/40"
                  : "border-rule opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={s.src} alt="" fill className="object-cover object-top" sizes="144px" />
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-ink/95"
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot viewer"
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center justify-between px-4 py-3 text-sm text-white/80 sm:px-6">
            <span className="font-mono text-xs">
              {index + 1} / {count}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-1.5 text-white hover:bg-white/10"
            >
              Close <span className="text-white/50">Esc</span>
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16" onClick={(e) => e.stopPropagation()}>
            <Image
              src={shot.src}
              alt={shot.caption}
              width={shot.w}
              height={shot.h}
              className="max-h-full w-auto max-w-full rounded-lg object-contain"
              sizes="100vw"
            />
            {count > 1 && (
              <>
                <button type="button" aria-label="Previous screenshot" onClick={() => go(-1)} className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:block">
                  <Chevron dir="prev" />
                </button>
                <button type="button" aria-label="Next screenshot" onClick={() => go(1)} className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:block">
                  <Chevron dir="next" />
                </button>
              </>
            )}
          </div>
          <p className="mx-auto max-w-3xl px-6 py-4 text-center text-sm text-white/80" onClick={(e) => e.stopPropagation()}>
            {shot.caption}
          </p>
        </div>
      )}
    </div>
  );
}

function NavButton({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous screenshot" : "Next screenshot"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-rule bg-panel text-ink-2 transition-colors hover:border-ink hover:text-ink"
    >
      <Chevron dir={dir} />
    </button>
  );
}

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={dir === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}
