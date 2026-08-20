"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Loader2, Wrench, Wifi, MapPin, Clock, User,
  Calendar, ExternalLink, IndianRupee,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { studentWorkshopService, type RegisteredWorkshop } from "@/services/student/studentWorkshopService";
import { toUploadUrl } from "@/lib/api/image-url";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${((h % 12) || 12)}:${String(m).padStart(2, "0")} ${ampm}`;
}

export default function StudentWorkshopsPage() {
  const [workshops, setWorkshops] = useState<RegisteredWorkshop[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);

  useEffect(() => {
    studentWorkshopService
      .getMyWorkshops("Workshop")
      .then((data) => setWorkshops(Array.isArray(data) ? data : []))
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
        <h1 className="text-2xl font-bold text-foreground">My Workshops</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {error
            ? error
            : workshops.length > 0
              ? `${workshops.length} workshop${workshops.length !== 1 ? "s" : ""} registered`
              : "You haven't registered for any workshops yet"}
        </p>
      </div>

      {workshops.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Wrench className="mb-4 size-12 text-muted-foreground/30" />
            <p className="text-sm font-medium text-foreground">No workshops yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Browse available workshops and register to see them here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.orderId} workshop={workshop} />
          ))}
        </div>
      )}
    </div>
  );
}

function WorkshopCard({ workshop }: { workshop: RegisteredWorkshop }) {
  const imageUrl = toUploadUrl(workshop.image);
  const isFree   = workshop.subscriptionType === "Free";

  return (
    <Card className="overflow-hidden transition hover:shadow-md flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-40 w-full bg-muted shrink-0">
        {imageUrl ? (
          <Image src={imageUrl} alt={workshop.name} fill style={{ objectFit: "cover" }} />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center">
            <Wrench className="size-10 text-violet-300" />
          </div>
        )}
        <Badge className="absolute right-2 top-2 gap-1 text-[10px]" variant="secondary">
          {workshop.mode === "Online"
            ? <Wifi className="size-2.5" />
            : <MapPin className="size-2.5" />}
          {workshop.mode}
        </Badge>
        {isFree && (
          <span className="absolute left-2 top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
            Free
          </span>
        )}
      </div>

      <CardContent className="p-4 space-y-3 flex flex-col flex-1">
        <h4 className="line-clamp-2 text-sm font-semibold text-foreground leading-snug">
          {workshop.name}
        </h4>

        <div className="grid grid-cols-2 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <User className="size-3 shrink-0" />{workshop.instructor}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3 shrink-0" />{workshop.duration}h
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3 shrink-0" />{formatDate(workshop.date)}
          </span>
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            {formatTime(workshop.time)}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-2 mt-auto">
          <span className="flex items-center gap-0.5 text-sm font-semibold text-violet-600">
            {isFree ? (
              "Free"
            ) : (
              <>
                <IndianRupee className="size-3.5" />
                {workshop.amount.toLocaleString("en-IN")}
              </>
            )}
          </span>

          {workshop.mode === "Online" ? (
            workshop.link && (
              <a
                href={workshop.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors"
              >
                Join <ExternalLink className="size-3" />
              </a>
            )
          ) : (
            workshop.address && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3 shrink-0" />
                {workshop.address}
              </span>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
