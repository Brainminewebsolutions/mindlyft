import type { Employee } from "@/types/admin/employee";
import OurLeaders from "@/components/site/about/OurLeaders";

interface Props {
  instructors: Employee[];
}

export default function CategoryInstructors({ instructors }: Props) {
  if (instructors.length === 0) return null;

  const categories = [
    {
      title: "Instructors",
      icon: "👨‍🏫",
      leaders: instructors.map((e) => ({
        name:        e.name,
        designation: e.designation ?? "",
        subject:     e.department ?? undefined,
        imageUrl:    e.avatar ?? "",
        description: e.description ?? undefined,
        video:       e.video ?? undefined,
      })),
    },
  ];

  return (
    <div className="bg-violet-50">
      <OurLeaders categories={categories} />
    </div>
  );
}
