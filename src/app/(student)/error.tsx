"use client";

import { ErrorState, type ErrorBoundaryProps } from "@/components/ui/ErrorState";

export default function Error(props: ErrorBoundaryProps) {
  return <ErrorState {...props} homeHref="/student/courses" homeLabel="Back to My Courses" />;
}
