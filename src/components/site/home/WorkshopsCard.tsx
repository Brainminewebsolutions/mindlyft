import { dotnetFetch } from "@/lib/api/dotnet-client";
import type { Webinar } from "@/types/admin/webinar";
import WorkshopsCardClient from "./WorkshopsCardClient";

interface WebinarEnvelope {
  isSuccess: boolean;
  data: Webinar[];
}

async function getWebinars(): Promise<Webinar[]> {
  try {
    const envelope = await dotnetFetch<WebinarEnvelope>(
      "/v1/workshopWebinar?status=Active",
      { next: { revalidate: 300 } } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data ?? []) : [];
  } catch {
    return [];
  }
}

export default async function WorkshopsCard() {
  const webinars = await getWebinars();
  return <WorkshopsCardClient webinars={webinars} />;
}

