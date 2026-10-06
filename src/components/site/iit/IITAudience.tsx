import InfoSection from "@/components/site/courses/landing/InfoSection";
import { IIT_AUDIENCES } from "./content";

export default function IITAudience({ bg = "bg-white" }: { bg?: string }) {
  return (
    <InfoSection
      bg={bg}
      badge="Who This Is Built For"
      heading="Who these programmes are for"
      intro={
        <p>
          What this credential does for you depends on where you&apos;re standing right now. Pick the
          one that&apos;s closest to your situation.
        </p>
      }
      items={IIT_AUDIENCES}
      columns={3}
    />
  );
}
