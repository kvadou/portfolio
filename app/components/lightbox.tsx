"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Shot } from "@/lib/system";

// Full-screen screenshot viewer. On phones the shot fills the screen height and
// pans sideways, so a desktop screen is actually readable instead of shrunk.
export function Lightbox({
  shots,
  index,
  onIndex,
  onClose,
}: {
  shots: Shot[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panRef = useRef<HTMLDivElement>(null);
  const count = shots.length;
  const shot = shots[index];

  useEffect(() => {
    const lastFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % count);
      if (e.key === "ArrowLeft") onIndex((index - 1 + count) % count);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocus?.focus();
    };
  }, [index, count, onClose, onIndex]);

  useEffect(() => {
    panRef.current?.scrollTo({ left: 0 });
  }, [index]);

  const step = (d: number) => onIndex((index + d + count) % count);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-ink" role="dialog" aria-modal="true" aria-label="Screenshot viewer">
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 text-panel/80 sm:px-6">
        <span className="data">
          {index + 1} / {count}
          <span className="ml-3 text-panel/50 sm:hidden">swipe to pan</span>
        </span>
        <div className="flex items-center gap-1">
          {count > 1 && (
            <>
              <button type="button" aria-label="Previous screenshot" onClick={() => step(-1)} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-panel hover:bg-panel/10">
                <Chevron dir="prev" />
              </button>
              <button type="button" aria-label="Next screenshot" onClick={() => step(1)} className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-panel hover:bg-panel/10">
                <Chevron dir="next" />
              </button>
            </>
          )}
          <button ref={closeRef} type="button" onClick={onClose} className="inline-flex min-h-11 items-center rounded-lg px-3 text-panel hover:bg-panel/10">
            Close <span className="ml-1.5 hidden text-panel/50 sm:inline">Esc</span>
          </button>
        </div>
      </div>
      <div
        ref={panRef}
        className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden overscroll-contain sm:flex sm:items-center sm:justify-center sm:overflow-hidden sm:px-16"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <Image
          key={shot.src}
          src={shot.src}
          alt={shot.caption}
          width={shot.w}
          height={shot.h}
          className="h-full w-auto max-w-none animate-fade-in sm:h-auto sm:max-h-full sm:max-w-full sm:rounded-lg sm:object-contain"
          sizes="(max-width: 640px) 300vw, 100vw"
          loading="eager"
        />
      </div>
      <p className="mx-auto max-w-3xl px-5 py-3 text-center text-sm text-panel/80">{shot.caption}</p>
    </div>
  );
}

export function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={dir === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}
