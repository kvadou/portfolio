// Builds lib/activity.json: weekly non-merge commit counts per app from the
// local repos. Runs on Doug's machine only (repos are private); the JSON is
// committed. Usage: REPO_ROOT=~/code bun scripts/build-activity.ts
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.argv[2] ?? process.env.REPO_ROOT;
if (!ROOT) {
  console.error("Set REPO_ROOT to the folder that holds the app repos.");
  process.exit(1);
}
const WEEKS = 26;
const SINCE = "2026-04-01";

// slug -> repo folder names. Kept in the gitignored capture folder because the
// real repo names identify the company.
const repos: Record<string, string[]> = JSON.parse(
  readFileSync(join(process.cwd(), "scripts", "capture", "activity-repos.json"), "utf8")
);

// Week buckets start on Monday; the last bucket is the current week.
const now = new Date();
const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7));
const start = new Date(monday);
start.setUTCDate(start.getUTCDate() - (WEEKS - 1) * 7);

function timestamps(repo: string, since: string): number[] {
  const dir = join(ROOT, repo);
  if (!existsSync(join(dir, ".git"))) return [];
  const out = execFileSync("git", ["-C", dir, "log", "--no-merges", `--since=${since}`, "--format=%ct"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return out.split("\n").filter(Boolean).map((s) => Number(s) * 1000);
}

const result: Record<string, { total: number; weeks: number[] }> = {};
for (const [slug, list] of Object.entries(repos)) {
  const weeks = new Array<number>(WEEKS).fill(0);
  let total = 0;
  for (const repo of list) {
    for (const t of timestamps(repo, SINCE)) {
      total++;
      const idx = Math.floor((t - start.getTime()) / (7 * 864e5));
      if (idx >= 0 && idx < WEEKS) weeks[idx]++;
    }
  }
  result[slug] = { total, weeks };
}

const payload = { generated: now.toISOString().slice(0, 10), weekStart: start.toISOString().slice(0, 10), since: SINCE, apps: result };
writeFileSync(join(process.cwd(), "lib", "activity.json"), JSON.stringify(payload, null, 2) + "\n");
const sum = Object.values(result).reduce((n, r) => n + r.total, 0);
console.log(`wrote lib/activity.json: ${sum} commits since ${SINCE}`);
for (const [k, v] of Object.entries(result)) console.log(k.padEnd(10), v.total, v.weeks.join(" "));
