import Link from "next/link";
import { projects } from "@/lib/projects";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Doug Kvamme
            </h3>
            <p className="mt-2 text-sm text-muted">
              Full-stack engineer building production systems.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Projects</h3>
            <ul className="mt-2 space-y-1.5">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Links</h3>
            <ul className="mt-2 space-y-1.5">
              <li>
                <a
                  href="https://github.com/kvadou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/dougkvamme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:doug@dougkvamme.com"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} Doug Kvamme
        </div>
      </div>
    </footer>
  );
}
