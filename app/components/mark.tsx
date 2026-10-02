// Identity marks that replace the old DK monogram. `MARK` picks the live one;
// /brand shows every variant side by side.
export type MarkVariant = "signal" | "board" | "period" | "plain";

export const MARK: MarkVariant = "board";

export const markVariants: { id: MarkVariant; name: string; note: string }[] = [
  { id: "signal", name: "Signal", note: "Name plus the live green status dot from the board. Quiet, reads as 'in production'." },
  { id: "board", name: "Board glyph", note: "A tiny four-row commit strip as the symbol. Works alone as a favicon." },
  { id: "period", name: "Full stop", note: "Lowercase heavy wordmark ending in a green square. Most graphic, most confident." },
  { id: "plain", name: "No logo", note: "Just the name, set well. Nothing to like or dislike." },
];

export function BoardGlyph({ size = 18, className = "" }: { size?: number; className?: string }) {
  const rows = [
    [3, 5, 4, 7, 6],
    [5, 3, 6, 4, 7],
    [2, 4, 3, 5, 4],
    [7, 7, 7, 7, 7],
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" className={className} aria-hidden="true">
      <rect width="18" height="18" rx="4" fill="var(--ink)" />
      {rows.map((r, y) =>
        r.map((h, x) => (
          <rect
            key={`${x}-${y}`}
            x={3 + x * 2.6}
            y={3 + y * 3.2 + (2.4 - (h / 7) * 2.4)}
            width={1.7}
            height={(h / 7) * 2.4}
            rx={0.3}
            fill={y === 3 ? "var(--field-ink-2)" : "var(--signal-bright)"}
          />
        ))
      )}
    </svg>
  );
}

export function Mark({ variant = MARK, className = "" }: { variant?: MarkVariant; className?: string }) {
  if (variant === "board") {
    return (
      <span className={`inline-flex items-center gap-2.5 ${className}`}>
        <BoardGlyph size={22} />
        <span className="text-[1.05rem] font-bold tracking-[-0.02em] text-ink">Doug Kvamme</span>
      </span>
    );
  }
  if (variant === "period") {
    return (
      <span className={`inline-flex items-baseline text-[1.35rem] font-extrabold tracking-[-0.04em] text-ink ${className}`}>
        kvamme
        <span className="ml-[1px] inline-block h-[0.32em] w-[0.32em] bg-signal-bright" aria-hidden="true" />
      </span>
    );
  }
  if (variant === "plain") {
    return <span className={`text-[1.05rem] font-bold tracking-[-0.02em] text-ink ${className}`}>Doug Kvamme</span>;
  }
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="beacon h-2.5 w-2.5 rounded-full bg-signal-bright" aria-hidden="true" />
      <span className="text-[1.05rem] font-bold tracking-[-0.02em] text-ink">Doug Kvamme</span>
    </span>
  );
}
