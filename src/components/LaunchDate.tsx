"use client";

import { useEffect, useState } from "react";
import { formatLaunchDate, formatLaunchMonth, getLaunchISO } from "@/lib/date";

export function LaunchDate({ className = "", fallback = "launch day", format = "full" }: { className?: string; fallback?: string; format?: "full" | "month" }) {
  const [date, setDate] = useState<string | null>(null);
  useEffect(() => {
    const iso = getLaunchISO();
    setDate(format === "month" ? formatLaunchMonth(iso) : formatLaunchDate(iso));
  }, [format]);
  return <span className={className}>{date ?? fallback}</span>;
}
