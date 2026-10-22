"use client";

import { useEffect, useState } from "react";

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days:    Math.floor(s / 86_400),
    hours:   Math.floor((s % 86_400) / 3_600),
    minutes: Math.floor((s % 3_600) / 60),
    seconds: s % 60,
  };
}

export function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return split(new Date(target).getTime() - now);
}

/** Compact one-line countdown, e.g. "Starts in 2d 4h 10m". */
export function InlineCountdown({ target }: { target: string }) {
  const { days, hours, minutes, seconds } = useCountdown(target);
  const text = days > 0
    ? `${days}d ${hours}h ${minutes}m`
    : hours > 0
      ? `${hours}h ${minutes}m`
      : `${minutes}m ${seconds}s`;
  return <span className="tabular-nums">Starts in {text}</span>;
}

/** Large countdown blocks for the live page waiting room. */
export function CountdownBlocks({ target }: { target: string }) {
  const { days, hours, minutes, seconds } = useCountdown(target);
  const blocks = [
    { label: "Days",    value: days },
    { label: "Hours",   value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {blocks.map((b) => (
        <div key={b.label} className="rounded-xl border border-violet-100 bg-white px-2 py-3 text-center shadow-sm sm:px-4">
          <div className="text-2xl font-bold tabular-nums text-violet-600 sm:text-3xl">
            {String(b.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
            {b.label}
          </div>
        </div>
      ))}
    </div>
  );
}
