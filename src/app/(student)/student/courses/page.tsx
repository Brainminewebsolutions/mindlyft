"use client";

import { useEffect, useState } from "react";
import Image        from "next/image";
import Link         from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge }    from "@/components/ui/badge";
import { Button }   from "@/components/ui/button";
import { Loader2, BookOpen, Wifi, MapPin, Clock, User, Globe, IndianRupee, PlayCircle } from "lucide-react";

import { studentCoursesService } from "@/services/student/studentCoursesService";
import type { PurchasedCourse }  from "@/types/student/course";

const API_BASE = process.env.NEXT_PUBLIC_DOTNET_API_URL ?? "";

function resolveImage(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  if (!API_BASE) return null;
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<PurchasedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    studentCoursesService.getMyCourses()
      .then(setCourses)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {error
            ? error
            : courses.length > 0
              ? `${courses.length} course${courses.length !== 1 ? "s" : ""} purchased`
              : "No courses purchased yet"}
        </p>
      </div>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <BookOpen className="mb-4 size-12 text-muted-foreground/30" />
            <p className="text-sm font-medium text-foreground">No courses yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Browse the catalog and purchase a course to get started
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.orderId} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

function CourseCard({ course }: { course: PurchasedCourse }) {
  const gradient  = "linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--primary)/0.05))";
  const imageUrl  = resolveImage(course.courseImage);

  return (
    <Card className="overflow-hidden transition hover:shadow-md">
      <Link href={`/student/courses/${course.courseId}`} className="block">
        <div className="relative h-40 w-full bg-muted">
          {imageUrl ? (
            <Image src={imageUrl} alt={course.courseName} fill style={{ objectFit: "cover" }} />
          ) : (
            <div className="h-full w-full" style={{ background: gradient }} />
          )}
          <Badge className="absolute right-2 top-2 gap-1 text-[10px]" variant="secondary">
            {course.mode === "Online" ? <Wifi className="size-2.5" /> : <MapPin className="size-2.5" />}
            {course.mode}
          </Badge>
        </div>
      </Link>

      <CardContent className="p-4 space-y-3">
        <h4 className="line-clamp-2 text-sm font-semibold text-foreground leading-snug">
          {course.courseName}
        </h4>
        <div className="grid grid-cols-2 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><User className="size-3 shrink-0" />{course.instructor}</span>
          <span className="flex items-center gap-1.5"><Globe className="size-3 shrink-0" />{course.language}</span>
          <span className="flex items-center gap-1.5"><Clock className="size-3 shrink-0" />{course.duration}h</span>
          <span className="flex items-center gap-1.5"><IndianRupee className="size-3 shrink-0" />{course.amount.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-2">
          <p className="text-[10px] text-muted-foreground">Purchased {course.purchasedAt}</p>
          <Button asChild size="sm" variant="ghost" className="h-7 gap-1.5 text-xs px-2">
            <Link href={`/student/courses/${course.courseId}`}>
              <PlayCircle className="size-3.5" />
              Start
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
