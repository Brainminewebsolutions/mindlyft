"use client";

import { ErrorState, type ErrorBoundaryProps } from "@/components/ui/ErrorState";

export default function Error(props: ErrorBoundaryProps) {
  return <ErrorState {...props} homeHref="/employee/support" homeLabel="Back to Support" />;
}
