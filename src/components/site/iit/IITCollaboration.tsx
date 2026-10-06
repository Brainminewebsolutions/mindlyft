import InfoSection from "@/components/site/courses/landing/InfoSection";
import { AnimateIn } from "@/components/ui/AnimateIn";
import CollaborationLogos from "@/components/site/CollaborationLogos";
import { IIT_COLLABORATION } from "./content";

export default function IITCollaboration({ bg = "bg-white" }: { bg?: string }) {
  return (
    <InfoSection
      bg={bg}
      badge="The Collaboration"
      heading="Why the IIT Kanpur collaboration matters"
      intro={
        <p>
          By bringing together Mindlyft AI&apos;s industry-facing learning platform and IIT Kanpur
          C3iHub&apos;s research depth in cybersecurity, this partnership bridges academic excellence
          and industry-ready skills.
        </p>
      }
      items={IIT_COLLABORATION}
      columns={3}
    >
      <AnimateIn delay={300} direction="up">
        <CollaborationLogos
          size="responsive"
          showLabels
          className="mt-10 px-6 py-4 rounded-2xl"
        />
      </AnimateIn>
    </InfoSection>
  );
}
