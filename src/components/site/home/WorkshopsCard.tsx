import { dotnetFetch } from "@/lib/api/dotnet-client";
import type { Webinar } from "@/types/admin/webinar";
import WorkshopsCardClient from "./WorkshopsCardClient";

interface WebinarEnvelope {
  isSuccess: boolean;
  data: Webinar[];
}

async function fetchWebinarsByStatus(status: string): Promise<Webinar[]> {
  try {
    const envelope = await dotnetFetch<WebinarEnvelope>(
      `/v1/workshopWebinar?status=${status}`,
      { next: { revalidate: 300 } } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data ?? []) : [];
  } catch {
    return [];
  }
}

async function getWebinars(): Promise<Webinar[]> {
  const [active, upcoming] = await Promise.all([
    fetchWebinarsByStatus("Active"),
    fetchWebinarsByStatus("Upcoming"),
  ]);
  return [...active, ...upcoming].sort((a, b) => b.date.localeCompare(a.date));
}

export default async function WorkshopsCard() {
  const webinars = await getWebinars();
  return <WorkshopsCardClient webinars={webinars} />;
}

