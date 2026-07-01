import { dotnetFetch } from "@/lib/api/dotnet-client";
import type { Webinar } from "@/types/admin/webinar";
import WorkshopsHero from "@/components/site/workshops/WorkshopsHero";
import WorkshopsAudience from "@/components/site/workshops/WorkshopsAudience";
import WorkshopsList from "./_components/WorkshopsList";

type Envelope = { isSuccess: boolean; data: Webinar[] };

async function getWorkshops(): Promise<Webinar[]> {
  try {
    const envelope = await dotnetFetch<Envelope>(
      "/v1/workshopWebinar?status=Active&type=Workshop",
      { next: { revalidate: 300 } } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data ?? []) : [];
  } catch {
    return [];
  }
}

export default async function WorkshopsPage() {
  const items = await getWorkshops();

  return (
    <div className="min-h-screen bg-white">
      <WorkshopsHero count={items.length} />
      <div id="workshops"><WorkshopsList items={items} /></div>
      <WorkshopsAudience bg="bg-violet-50" />
    </div>
  );
}
