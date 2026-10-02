import type { Metadata } from "next";
import { BoardGlyph, Mark, MARK, markVariants } from "@/app/components/mark";

export const metadata: Metadata = {
  title: "Marks · Doug Kvamme",
  robots: { index: false, follow: false },
};

// Side-by-side review of the identity options that replace the DK monogram.
export default function BrandPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8">
      <h1 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold tracking-[-0.025em] text-ink">Logo options</h1>
      <p className="mt-3 max-w-[60ch] text-ink-2">
        Each option in the nav bar, on the dark green band, and as a browser tab icon. The live site uses{" "}
        <span className="font-semibold text-ink">{markVariants.find((m) => m.id === MARK)?.name}</span>.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {markVariants.map((m) => (
          <section key={m.id} className="overflow-hidden rounded-[14px] border border-rule bg-panel">
            <div className="flex h-16 items-center justify-between border-b border-rule bg-paper px-5">
              <Mark variant={m.id} />
              <span className="text-sm text-ink-2">Apps · Platform · Evals</span>
            </div>
            <div className="flex h-32 items-center justify-center bg-field">
              <span className="[--ink:var(--field-ink)] scale-150">
                <Mark variant={m.id} />
              </span>
            </div>
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <h2 className="font-semibold text-ink">
                  {m.name}
                  {m.id === MARK && <span className="data ml-2 text-signal">live</span>}
                </h2>
                <p className="mt-1 text-sm text-ink-2">{m.note}</p>
              </div>
              <TabIcon variant={m.id} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function TabIcon({ variant }: { variant: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 rounded-md border border-rule bg-paper px-2.5 py-1.5" aria-label="Tab icon preview">
      {variant === "board" ? (
        <BoardGlyph size={16} />
      ) : variant === "period" ? (
        <span className="flex h-4 w-4 items-end justify-end rounded-[3px] bg-ink p-[3px]">
          <span className="h-1.5 w-1.5 bg-signal-bright" />
        </span>
      ) : variant === "plain" ? (
        <span className="h-4 w-4 rounded-[3px] bg-ink" />
      ) : (
        <span className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-signal-bright" />
        </span>
      )}
      <span className="data text-ink-2">Doug Kvamme</span>
    </div>
  );
}
