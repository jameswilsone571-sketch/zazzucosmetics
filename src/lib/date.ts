import { brand } from "./brand";

const KEY = "zazzu_launch_date";

export function getLaunchISO(): string {
  if (typeof window === "undefined") return new Date(Date.now() + brand.launchWindowDays * 86400000).toISOString();
  try {
    const saved = window.sessionStorage.getItem(KEY);
    if (saved) return saved;
    const iso = new Date(Date.now() + brand.launchWindowDays * 86400000).toISOString();
    window.sessionStorage.setItem(KEY, iso);
    return iso;
  } catch {
    return new Date(Date.now() + brand.launchWindowDays * 86400000).toISOString();
  }
}

export function formatLaunchDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "Australia/Sydney" });
}

export function formatLaunchMonth(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", { month: "long", timeZone: "Australia/Sydney" });
}
