import { dotnetFetch } from "@/lib/api/dotnet-client";
import Circularcarousel from "@/components/site/home/Circularcarousel";

type ToolApiItem = {
  id:           number;
  image:        string | null;
  title:        string;
  description:  string;
  link:         string;
  displayOrder: number;
  status:       string;
};

type ToolsEnvelope = {
  isSuccess: boolean;
  data: ToolApiItem[];
};

type CarouselCard = {
  id:    number;
  image: string | null;
  title: string;
  desc:  string;
  link:  string;
};

async function getActiveTools(): Promise<CarouselCard[]> {
  try {
    const envelope = await dotnetFetch<ToolsEnvelope>(
      "/v1/tools?status=ACTIVE",
      { cache: "no-store" } as RequestInit,
    );
    if (!envelope.isSuccess || !Array.isArray(envelope.data)) return [];
    return envelope.data.map((t) => ({
      id:    t.id,
      image: t.image,
      title: t.title,
      desc:  t.description,
      link:  t.link,
    }));
  } catch {
    return [];
  }
}

export default async function ToolSection() {
  const cards = await getActiveTools();
  return <Circularcarousel cards={cards} />;
}
