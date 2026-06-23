"use client";

import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function EmployeeStudentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Students</h1>
        <p className="text-sm text-muted-foreground mt-1">Students enrolled in your courses</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 mb-4">
            <GraduationCap className="h-8 w-8 text-emerald-500/60" />
          </div>
          <p className="text-sm font-medium text-foreground">Coming Soon</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Your students will appear here once the feature is ready.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
