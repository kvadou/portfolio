import type { ReactNode } from "react";

// A console pane, not a fake browser: live dot, domain, optional right slot.
export function ScreenFrame({
  domain,
  right,
  children,
  className = "",
  dark = false,
}: {
  domain?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[14px] border frame-shadow ${
        dark ? "border-field-ink/20 bg-field-2" : "border-rule bg-panel"
      } ${className}`}
    >
      <div
        className={`flex h-9 items-center justify-between gap-3 border-b px-3.5 ${
          dark ? "border-field-ink/15 text-field-ink-2" : "border-rule text-ink-2"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal-bright" aria-hidden="true" />
          {domain && <span className="data truncate">{domain}</span>}
        </span>
        {right && <span className="data shrink-0">{right}</span>}
      </div>
      <div className="bg-paper">{children}</div>
    </div>
  );
}
