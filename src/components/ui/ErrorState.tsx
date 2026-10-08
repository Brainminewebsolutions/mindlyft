"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

export type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

type ErrorStateProps = ErrorBoundaryProps & {
  /** Where the secondary link goes — the home of the area the error happened in. */
  homeHref?:  string;
  homeLabel?: string;
};

// Shared body for every route-group `error.tsx`. Renders inside that group's
// layout, so the navbar / sidebar stays usable while the page itself failed.
export function ErrorState({ error, reset, homeHref = "/", homeLabel = "Back to Home" }: ErrorStateProps) {
  useEffect(() => {
    console.error("[error-boundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-6 pt-28 pb-16 text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-violet-500">Something went wrong</p>
      <h1 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">We couldn&apos;t load this page</h1>
      <p className="mb-8 max-w-md text-gray-500">
        This is usually temporary. Please try again — if it keeps happening, come back in a few minutes.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <RefreshCw className="h-4 w-4" /> Try again
        </button>
        <Link
          href={homeHref}
          className="inline-flex items-center gap-2 rounded-full border-2 border-violet-200 px-6 py-3 text-sm font-semibold text-violet-700 transition-colors hover:border-violet-500 hover:bg-violet-50"
        >
          {homeLabel}
        </Link>
      </div>
      {error.digest && <p className="mt-8 text-xs text-gray-400">Reference: {error.digest}</p>}
    </div>
  );
}
