"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { apps } from "@/lib/system";
import { Mark } from "./mark";

const links = [
  { href: "/platform", label: "Platform" },
  { href: "/projects/cash-forecast-eval", label: "Evals" },
  { href: "/method", label: "Method" },
  { href: "/about", label: "About" },
];

export const EMAIL = "dougkvamme@gmail.com";

export function Nav() {
  const pathname = usePathname();
  const [appsOpen, setAppsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const appsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation (render-time reset, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setAppsOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!appsOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAppsOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (appsOpen && appsRef.current && !appsRef.current.contains(e.target as Node)) setAppsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
      document.body.style.overflow = "";
    };
  }, [appsOpen, mobileOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen ? "border-b border-rule bg-paper/92 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 md:px-8">
        <Link href="/" aria-label="Doug Kvamme, home" className="-m-2 rounded-md p-2">
          <Mark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <div ref={appsRef} className="relative">
            <button
              type="button"
              aria-expanded={appsOpen}
              aria-controls="apps-menu"
              onClick={() => setAppsOpen((o) => !o)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-ink ${
                pathname.startsWith("/projects/") && pathname !== "/projects/cash-forecast-eval" ? "text-ink" : "text-ink-2"
              }`}
            >
              Apps
              <svg className={`h-3.5 w-3.5 transition-transform ${appsOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" />
              </svg>
            </button>
            {appsOpen && (
              <div id="apps-menu" className="absolute left-0 top-full mt-2 w-[22rem] animate-fade-in rounded-[14px] border border-rule bg-panel p-2 frame-shadow">
                {apps.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/projects/${a.slug}`}
                    className="flex items-center justify-between gap-3 rounded-md px-3 py-2 transition-colors hover:bg-signal-wash"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal-bright" aria-hidden="true" />
                      <span className="text-sm font-semibold text-ink">{a.name}</span>
                    </span>
                    <span className="text-xs text-ink-2">{a.role}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-ink ${
                isActive(l.href) ? "text-ink" : "text-ink-2"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={`mailto:${EMAIL}`}
            className="ml-3 inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-panel transition-colors hover:bg-field"
          >
            Email me
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 items-center rounded-lg bg-ink px-3.5 text-sm font-semibold text-panel">
            Email
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-rule bg-panel px-3 text-sm font-semibold text-ink"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-rule bg-paper px-4 pb-10 pt-4 lg:hidden">
          <nav aria-label="Mobile">
            <p className="data px-1 pb-2 text-ink-2">Apps</p>
            <ul className="overflow-hidden rounded-[14px] border border-rule bg-panel">
              {apps.map((a) => (
                <li key={a.slug} className="border-b border-rule last:border-b-0">
                  <Link href={`/projects/${a.slug}`} className="flex min-h-12 items-center justify-between gap-3 px-4 py-3 active:bg-signal-wash">
                    <span className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal-bright" aria-hidden="true" />
                      <span className="font-semibold text-ink">{a.name}</span>
                    </span>
                    <span className="text-right text-xs text-ink-2">{a.role}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {[{ href: "/", label: "Home" }, ...links].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex min-h-12 items-center rounded-lg border border-rule bg-panel px-4 font-semibold text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
