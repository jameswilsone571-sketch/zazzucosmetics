"use client";

import { useEffect, useState } from "react";
import { getLaunchISO } from "@/lib/date";

function parts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return [
    { label: "Days", value: Math.floor(total / 86400) },
    { label: "Hours", value: Math.floor((total % 86400) / 3600) },
    { label: "Minutes", value: Math.floor((total % 3600) / 60) },
    { label: "Seconds", value: total % 60 },
  ];
}

export function Countdown({ compact = false }: { compact?: boolean }) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(getLaunchISO()).getTime();
    const tick = () => setRemaining(target - Date.now());
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const values = parts(remaining ?? 30 * 86400000);

  return (
    <div className={`flex w-full ${compact ? "gap-2" : "gap-2.5 sm:gap-4"}`} role="timer" aria-label="Countdown to launch">
      {values.map((item, index) => (
        <div key={item.label} className="flex flex-1 items-center gap-2 sm:gap-3">
          <div className={`flex-1 rounded-2xl border border-[#C9A66B]/35 bg-white/75 text-center backdrop-blur-sm ${compact ? "px-1 py-2" : "px-2 py-3 sm:px-4 sm:py-5"} shadow-[0_10px_30px_rgba(59,42,38,0.06)]`}>
            <div className={`serif tabular-nums text-cocoa ${compact ? "text-2xl" : "text-[clamp(1.9rem,4.6vw,3.7rem)]"} leading-none`}>
              {String(item.value).padStart(2, "0")}
            </div>
            <div className={`mt-2 uppercase tracking-[0.2em] text-[#8A7466] ${compact ? "text-[7px]" : "text-[9px] sm:text-[10px]"}`}>{item.label}</div>
          </div>
          {index < 3 && <span className={`serif text-gold ${compact ? "text-lg" : "text-2xl sm:text-4xl"}`}>:</span>}
        </div>
      ))}
    </div>
  );
}
