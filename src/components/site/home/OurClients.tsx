import { dotnetFetch, cachedHomeSection } from "@/lib/api/dotnet-client";
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
      cachedHomeSection("partners"),
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
