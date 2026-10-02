import { peakWeek } from "@/lib/activity";

// 26 weekly bars on one shared square-root scale, so a 40-commit week in a
// small app still reads while OpsHub's 350-commit weeks stay tallest.
export function CommitStrip({
  weeks,
  height = 22,
  className = "",
  tone = "signal",
  animate = true,
  peak = peakWeek,
}: {
  weeks: number[];
  height?: number;
  className?: string;
  tone?: "signal" | "field";
  animate?: boolean;
  peak?: number;
}) {
  const n = weeks.length || 1;
  const gap = 1.5;
  const barW = 4;
  const width = n * barW + (n - 1) * gap;
  const scale = Math.sqrt(peak || 1);
  const fill = tone === "field" ? "var(--field-ink)" : "var(--signal-bright)";
  const empty = tone === "field" ? "rgba(234,243,238,0.18)" : "var(--rule)";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={`block ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {weeks.map((c, i) => {
        const h = c === 0 ? 1.5 : Math.max(2.5, (Math.sqrt(c) / scale) * height);
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={height - h}
            width={barW}
            height={h}
            rx={0.8}
            fill={c === 0 ? empty : fill}
            className={animate ? "bar" : undefined}
            style={animate ? { animationDelay: `${200 + i * 18}ms` } : undefined}
          />
        );
      })}
    </svg>
  );
}
