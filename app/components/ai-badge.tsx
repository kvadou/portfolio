export function AiBadge({ label = "AI" }: { label?: string }) {
  return (
    <span className="data inline-flex shrink-0 items-center gap-1 rounded-[4px] border border-rule-strong px-1.5 py-0.5 text-ink-2">
      <span className="h-1.5 w-1.5 rounded-full bg-signal-bright" aria-hidden="true" />
      {label}
    </span>
  );
}
