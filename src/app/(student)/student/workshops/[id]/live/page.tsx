"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LiveRoom } from "@/components/live/LiveRoom";

export default function StudentLiveSessionPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-4">
      <Link href="/student/workshops"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground">
        <ArrowLeft className="size-3.5" /> My workshops
      </Link>
      <LiveRoom workshopId={id} />
    </div>
  );
}
