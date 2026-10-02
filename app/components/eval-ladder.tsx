// Forecast accuracy, drawn on a 50 to 100% track with the 95% target as a
// dashed rule through every row. Figures are the published eval results.
const MIN = 50;
const MAX = 100;
const TARGET = 95;
const pos = (v: number) => `${((v - MIN) / (MAX - MIN)) * 100}%`;

const rows: { label: string; grain: string; value: number; range?: [number, number]; emphasis?: boolean }[] = [
  { label: "Launch baseline", grain: "weekly, Aug 24", value: 71 },
  { label: "Live, weekly", grain: "Oct 1", value: 74 },
  { label: "Live, rolling 4-week", grain: "Oct 1, likely range 76 to 91", value: 84, range: [76, 91], emphasis: true },
  { label: "Best replay candidate", grain: "point-in-time replay, pending a data sync", value: 92 },
];

export function EvalLadder() {
  return (
    <figure>
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 border-l border-dashed border-field-ink/60"
          style={{ left: `calc(${pos(TARGET)})` }}
          aria-hidden="true"
        />
        <ul className="space-y-5">
          {rows.map((r) => (
            <li key={r.label}>
              <div className="flex items-baseline justify-between gap-4">
                <span className={`text-sm ${r.emphasis ? "font-semibold text-field-ink" : "text-field-ink-2"}`}>{r.label}</span>
                <span className={`data ${r.emphasis ? "text-field-ink" : "text-field-ink-2"}`}>{r.value}%</span>
              </div>
              <div className="relative mt-2 h-3 rounded-[2px] bg-field-ink/10">
                {r.range && (
                  <div
                    className="absolute inset-y-0 rounded-[2px] bg-field-ink/20"
                    style={{ left: pos(r.range[0]), width: `calc(${pos(r.range[1])} - ${pos(r.range[0])})` }}
                    aria-hidden="true"
                  />
                )}
                <div
                  className={`absolute inset-y-0 left-0 rounded-[2px] ${r.emphasis ? "bg-signal-bright" : "bg-field-ink/45"}`}
                  style={{ width: pos(r.value) }}
                />
              </div>
              <p className="data mt-1.5 text-field-ink-2">{r.grain}</p>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-6 flex flex-wrap justify-between gap-2 border-t border-field-ink/15 pt-3 text-field-ink-2">
        <span className="data">Accuracy, axis 50 to 100%</span>
        <span className="data">Dashed line: 95% target</span>
      </figcaption>
    </figure>
  );
}
