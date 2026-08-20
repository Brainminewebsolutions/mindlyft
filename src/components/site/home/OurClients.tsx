import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import type { Partner } from "@/types/admin/partner";
import OurClientsClient from "./OurClientsClient";

interface PartnersEnvelope {
  isSuccess: boolean;
  data: Partner[];
}

async function getActivePartners(): Promise<Partner[]> {
  try {
    const envelope = await dotnetFetch<PartnersEnvelope>(
      "/v1/partners?status=Active",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    const partners = envelope.isSuccess ? (envelope.data ?? []) : [];
    return Array.isArray(partners) ? partners : [];
  } catch {
    return [];
  }
}

export default async function OurClients() {
  const partners = await getActivePartners();
  if (partners.length === 0) return null;
  return <OurClientsClient partners={partners} />;
}
