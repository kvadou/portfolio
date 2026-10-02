import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">{children}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
