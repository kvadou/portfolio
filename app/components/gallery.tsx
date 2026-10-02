"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { Shot } from "@/lib/system";
import { ScreenFrame } from "./screen-frame";
import { Chevron, Lightbox } from "./lightbox";

export function Gallery({ shots, domain }: { shots: Shot[]; domain: string }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const count = shots.length;
  const go = useCallback((d: number) => setIndex((i) => (i + d + count) % count), [count]);
  const close = useCallback(() => setOpen(false), []);

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
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-ink/85 px-2.5 py-1.5 text-xs font-medium text-panel opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
            <span className="sm:hidden">Tap to zoom</span>
            <span className="hidden sm:inline">Enlarge</span>
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

      {open && <Lightbox shots={shots} index={index} onIndex={setIndex} onClose={close} />}
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
