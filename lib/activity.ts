import data from "./activity.json";

export interface Activity {
  total: number;
  weeks: number[];
}

const apps = data.apps as Record<string, Activity>;

export const activityMeta = {
  since: data.since,
  weekStart: data.weekStart,
  generated: data.generated,
  weeks: apps.opshub?.weeks.length ?? 26,
};

export function activityFor(slug: string): Activity {
  return apps[slug] ?? { total: 0, weeks: [] };
}

export const totalCommits = Object.values(apps).reduce((n, a) => n + a.total, 0);

/** Highest single week across every app, so all strips share one scale. */
export const peakWeek = Math.max(...Object.values(apps).flatMap((a) => a.weeks));

export function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatDay(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

/** Weekly commits summed across every app and the platform. */
export const totalWeeks: number[] = Object.values(apps).reduce<number[]>(
  (sum, a) => a.weeks.map((w, i) => (sum[i] ?? 0) + w),
  []
);
