"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Content is visible by default. Only elements still below the fold when JS
// runs are hidden and then revealed, so static loads and screenshots never
// see blank sections.
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.classList.add("pending");
    const fallback = window.setTimeout(() => el.classList.remove("pending"), 2500);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        window.setTimeout(() => el.classList.remove("pending"), delay);
        observer.disconnect();
        window.clearTimeout(fallback);
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
