// Identity mark: a tiny four-row commit strip (the system board in
// miniature) beside the name. app/icon.svg is the same glyph.
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

export function Mark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BoardGlyph size={22} />
      <span className="text-[1.05rem] font-bold tracking-[-0.02em] text-ink">Doug Kvamme</span>
    </span>
  );
}
