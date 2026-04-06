"use client";

import Link from "next/link";
import { useTheme } from "@/lib/theme";
import { useState, useEffect } from "react";
import { projects } from "@/lib/projects";

export function Nav() {
  const { theme, toggle } = useTheme();
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-bold text-background transition-transform duration-200 group-hover:scale-105">
            DK
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="link-underline rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setProjectsOpen(true)}
            onMouseLeave={() => setProjectsOpen(false)}
          >
            <button className="link-underline rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground">
              Projects
            </button>
            {projectsOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
                <div className="min-w-[240px] overflow-hidden rounded-xl border border-border bg-background/95 p-1.5 shadow-xl backdrop-blur-xl">
                  {projects.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition-all hover:bg-card hover:text-foreground"
                      onClick={() => setProjectsOpen(false)}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
                      {p.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link
            href="/about"
            className="link-underline rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            About
          </Link>
          <div className="ml-2 h-4 w-px bg-border" />
          <button
            onClick={toggle}
            className="ml-2 rounded-md p-2 text-muted transition-colors hover:bg-card hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile nav toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            className="rounded-md p-2 text-muted transition-colors hover:bg-card hover:text-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-muted transition-colors hover:bg-card hover:text-foreground"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <Link
            href="/"
            className="block py-2.5 text-sm text-muted transition-colors hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <div className="py-2">
            <span className="text-xs font-medium uppercase tracking-widest text-accent">
              Projects
            </span>
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="block py-2 pl-3 text-sm text-muted transition-colors hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {p.title}
              </Link>
            ))}
          </div>
          <Link
            href="/about"
            className="block py-2.5 text-sm text-muted transition-colors hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
