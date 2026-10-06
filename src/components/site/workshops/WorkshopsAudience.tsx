import InfoSection from "@/components/site/courses/landing/InfoSection";
import { WORKSHOP_AUDIENCES } from "./content";

export default function WorkshopsAudience({ bg = "bg-stone-50" }: { bg?: string }) {
  return (
    <InfoSection
      bg={bg}
      badge="Who It's For"
      heading="Who these workshops are for"
      items={WORKSHOP_AUDIENCES}
      columns={4}
    />
  );
}
