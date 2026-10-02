import type { ReactNode } from "react";

// Section heading, not an eyebrow: a real h2 on a hairline.
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="border-t border-rule pt-5 text-2xl font-bold tracking-[-0.02em] text-ink sm:text-[1.75rem]">{children}</h2>
  );
}
