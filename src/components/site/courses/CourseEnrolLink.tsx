"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useOwnsProduct } from "@/hooks/useOwnsProduct";

interface Props {
  courseId:  string | number;
  className: string;
  children:  ReactNode;
}

// Enrol link that turns into "Go to My Course" once the student already owns it.
export default function CourseEnrolLink({ courseId, className, children }: Props) {
  const owned = useOwnsProduct(courseId, "Course");

  // Ownership not known yet — hold the button's space without showing either
  // label, so a signed-in owner never sees "Enrol" flash before the swap.
  if (owned === null) {
    return (
      <span aria-hidden className={cn(className, "pointer-events-none animate-pulse opacity-60")}>
        <span className="invisible inline-flex items-center gap-2">{children}</span>
      </span>
    );
  }

  return owned ? (
    <Link href={`/student/courses/${courseId}`} className={className}>
      Go to My Course
    </Link>
  ) : (
    <Link href={`/checkout/${courseId}`} className={className}>
      {children}
    </Link>
  );
}
