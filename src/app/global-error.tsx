"use client";

import "./globals.css";
import { ErrorState, type ErrorBoundaryProps } from "@/components/ui/ErrorState";

// Last-resort boundary: replaces the root layout when the layout itself throws,
// so it has to render its own <html> and <body>.
export default function GlobalError(props: ErrorBoundaryProps) {
  return (
    <html lang="en">
      <body>
        <ErrorState {...props} />
      </body>
    </html>
  );
}
