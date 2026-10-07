import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import type { Webinar } from "@/types/admin/webinar";
import WorkshopsCardClient from "./WorkshopsCardClient";

interface WebinarEnvelope {
  isSuccess: boolean;
  data: Webinar[];
}

const HOME_WORKSHOP_LIMIT = 8;

async function getWebinars(): Promise<Webinar[]> {
  try {
    const envelope = await dotnetFetch<WebinarEnvelope>(
      "/v1/workshopWebinar/public",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    const items = envelope.isSuccess ? (envelope.data ?? []) : [];

    // Nearest upcoming sessions first, then the most recent past ones, so the
    // row stays capped but never goes empty between events.
    const todayStr = new Date().toISOString().slice(0, 10);
    const upcoming = items
      .filter((w) => w.date >= todayStr)
      .sort((a, b) => a.date.localeCompare(b.date));
    const past = items
      .filter((w) => w.date < todayStr)
      .sort((a, b) => b.date.localeCompare(a.date));
    return [...upcoming, ...past].slice(0, HOME_WORKSHOP_LIMIT);
  } catch {
    return [];
  }
}

export default async function WorkshopsCard() {
  const webinars = await getWebinars();
  return <WorkshopsCardClient webinars={webinars} />;
}

