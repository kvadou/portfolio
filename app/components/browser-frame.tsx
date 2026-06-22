import type { ReactNode } from "react";

export function BrowserFrame({
  url,
  children,
  className = "",
}: {
  url?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/20 dark:shadow-black/40 ${className}`}
    >
      {/* Chrome bar */}
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
        <div className="flex shrink-0 gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        {url && (
          <div className="mx-auto flex max-w-[70%] items-center gap-1.5 truncate rounded-md border border-border bg-background/60 px-3 py-1">
            <svg
              className="h-3 w-3 shrink-0 text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <span className="truncate font-mono text-[11px] text-muted">{url}</span>
          </div>
        )}
      </div>
      {/* Viewport */}
      <div className="bg-background">{children}</div>
    </div>
  );
}
