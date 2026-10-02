import Link from "next/link";
import { apps } from "@/lib/system";
import { formatCount, totalCommits } from "@/lib/activity";

const EMAIL = "dougkvamme@gmail.com";

export function Footer() {
  return (
    <footer className="bg-field text-field-ink">
      <div className="mx-auto max-w-[1200px] px-4 pb-10 pt-20 md:px-8 md:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="max-w-[14ch] text-[clamp(2.25rem,5.5vw,4.25rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">
              Want this inside your company?
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-field-ink-2">
              I map how the work really flows, decide what should be code, an agent, or a person, and ship it inside
              the tools your team already uses.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex min-h-12 items-center gap-3 rounded-lg bg-field-ink px-5 font-semibold text-field transition-colors hover:bg-panel"
              >
                {EMAIL}
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M3 10a1 1 0 011-1h9.6l-3.3-3.3a1 1 0 111.4-1.4l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4l3.3-3.3H4a1 1 0 01-1-1z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/dougkvamme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center rounded-lg border border-field-ink/30 px-5 font-semibold text-field-ink transition-colors hover:border-field-ink"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/kvadou"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center rounded-lg border border-field-ink/30 px-5 font-semibold text-field-ink transition-colors hover:border-field-ink"
              >
                GitHub
              </a>
            </div>
          </div>

          <nav aria-label="All apps" className="lg:pt-3">
            <p className="data text-field-ink-2">The system, {apps.length} apps</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 border-t border-field-ink/15">
              {apps.map((a) => (
                <li key={a.slug} className="border-b border-field-ink/15">
                  <Link href={`/projects/${a.slug}`} className="block py-3 text-sm text-field-ink transition-colors hover:text-panel">
                    {a.name.replace("Kingside ", "")}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link href="/platform" className="text-field-ink-2 hover:text-field-ink">Platform</Link>
              <Link href="/projects/cash-forecast-eval" className="text-field-ink-2 hover:text-field-ink">Evals</Link>
              <Link href="/method" className="text-field-ink-2 hover:text-field-ink">Method</Link>
              <Link href="/about" className="text-field-ink-2 hover:text-field-ink">About</Link>
            </div>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-field-ink/15 pt-6 text-field-ink-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="data">&copy; {new Date().getFullYear()} Doug Kvamme</span>
          <span className="data">{formatCount(totalCommits)} commits since April, one engineer</span>
        </div>
      </div>
    </footer>
  );
}
