"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const COMPLETION_PERCENT = 90;

/** Max gap (seconds) between two time updates that still counts as continuous playback. */
const MAX_CONTINUOUS_STEP = 2;
/** Throttle for periodic progress reports while playing. */
const REPORT_INTERVAL_MS = 15_000;

interface Options {
  /** Percent already credited on the server (resume credit). */
  initialPercent: number;
  /** Sends progress to the server; resolve true on success. */
  report: (percent: number) => Promise<boolean>;
}

/**
 * Tracks how much of a video the student has *actually* watched.
 *
 * Credit only grows while playback advances continuously from inside the already-watched
 * region, so seeking ahead (scrubbing to the end) never counts. Mount one instance per
 * lesson (give the owner a `key={lesson.id}`) so state resets between lessons.
 */
export function useWatchProgress({ initialPercent, report }: Options) {
  const [percent, setPercent] = useState(initialPercent);

  const initial        = useRef(initialPercent); // read once per mount
  const reportRef      = useRef(report);
  const maxReached     = useRef(0);     // seconds of continuously watched video
  const lastTime       = useRef(0);
  const duration       = useRef(0);
  const percentRef     = useRef(initialPercent);
  const sentPercent    = useRef(initialPercent);
  const lastSentAt     = useRef(Date.now());
  const inFlight       = useRef(false);
  const seeded         = useRef(false);

  useEffect(() => { reportRef.current = report; }, [report]);

  const send = useCallback(async (force = false) => {
    const p = percentRef.current;
    if (inFlight.current || p <= sentPercent.current) return;
    if (!force && p < COMPLETION_PERCENT && Date.now() - lastSentAt.current < REPORT_INTERVAL_MS) return;
    // Once complete, the server only needs the crossing — skip further chatter.
    if (sentPercent.current >= COMPLETION_PERCENT && !force) return;

    inFlight.current = true;
    try {
      const ok = await reportRef.current(p);
      if (ok) {
        sentPercent.current = Math.max(sentPercent.current, p);
        lastSentAt.current  = Date.now();
      }
    } finally {
      inFlight.current = false;
    }
  }, []);

  /** Feed every player time update here. */
  const onTime = useCallback((seconds: number, dur: number) => {
    if (dur > 0) duration.current = dur;
    const d = duration.current;
    if (d <= 0) return;

    // Resume: start credit from what the server already recorded.
    if (!seeded.current) {
      seeded.current    = true;
      maxReached.current = (initial.current / 100) * d;
    }

    const step = seconds - lastTime.current;
    const fromWatchedRegion = lastTime.current <= maxReached.current + 0.5;
    if (step > 0 && step <= MAX_CONTINUOUS_STEP && fromWatchedRegion && seconds > maxReached.current) {
      maxReached.current = seconds;
    }
    lastTime.current = seconds;

    const p = d - maxReached.current < 1 ? 100 : Math.floor((maxReached.current / d) * 100);
    if (p > percentRef.current) {
      percentRef.current = p;
      setPercent(p);
      void send(p >= COMPLETION_PERCENT);
    }
  }, [send]);

  /** Report whatever is pending (pause, lesson switch, tab hidden). */
  const flush = useCallback(() => { void send(true); }, [send]);

  useEffect(() => {
    const onHide = () => { if (document.visibilityState === "hidden") flush(); };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      flush();
    };
  }, [flush]);

  return { percent, onTime, flush };
}
