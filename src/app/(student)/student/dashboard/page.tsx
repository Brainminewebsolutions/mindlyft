import {
  BookOpen, Video, Award, Clock, TrendingUp, GraduationCap,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function StudentDashboardPage() {
  const stats = [
    { label: "Enrolled Courses",  value: 0,   icon: BookOpen, color: "text-violet-600"                       },
    { label: "Webinars Attended", value: 0,   icon: Video,    color: "text-violet-600 dark:text-violet-400"   },
    { label: "Certificates",      value: 0,   icon: Award,    color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Hours Learned",     value: "0", icon: Clock,    color: "text-amber-600 dark:text-amber-400"     },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-blue-50 p-6">
        <div className="relative z-10">
          <p className="text-sm font-medium text-violet-600">Welcome back 👋</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Student</h1>
          <div className="mt-4 flex flex-wrap gap-3">
            <Badge variant="outline" className="gap-1.5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Active Student
            </Badge>
          </div>
        </div>
        <div className="absolute -right-6 -top-6 flex h-32 w-32 items-center justify-center rounded-full bg-violet-200/50">
          <GraduationCap className="h-16 w-16 text-violet-300" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{label}</p>
                <Icon className={`size-4 ${color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Two-column section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-violet-600" />
              <CardTitle className="text-sm">Continue Learning</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <BookOpen className="mb-3 size-10 text-muted-foreground/30" />
            <p className="text-sm font-medium text-foreground">No courses yet</p>
            <p className="mt-1 text-xs text-muted-foreground">Browse the catalog to get started</p>
            <Button size="sm" className="mt-4">Browse Courses</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b pb-4">
            <div className="flex items-center gap-2">
              <Video className="size-4 text-violet-600 dark:text-violet-400" />
              <CardTitle className="text-sm">Upcoming Webinars</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <Video className="mb-3 size-10 text-muted-foreground/30" />
            <p className="text-sm font-medium text-foreground">No webinars scheduled</p>
            <p className="mt-1 text-xs text-muted-foreground">Check back soon for live sessions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
