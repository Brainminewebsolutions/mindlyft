import { User } from "lucide-react";
import { toUploadUrl } from "@/lib/api/image-url";

export interface InstructorProfileData {
  name:        string;
  avatar:      string | null;
  designation: string | null;
  description: string | null;
}

interface Props {
  instructor: InstructorProfileData;
  color?:     string;
  bgColor?:   string;
}

export default function InstructorProfile({
  instructor,
  color   = "#6c63ff",
  bgColor = "#ffffff",
}: Props) {
  const avatarUrl = toUploadUrl(instructor.avatar);

  return (
    <div
      className="flex flex-col sm:flex-row gap-6 items-start rounded-[20px] p-6"
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${color}1e`,
        boxShadow: `0 4px 24px ${color}12`,
      }}
    >
      {/* Photo */}
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={instructor.name}
          className="w-24 h-24 rounded-2xl object-cover shrink-0"
          style={{ border: `2px solid ${color}33` }}
        />
      ) : (
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0">
          <User className="w-10 h-10 text-white" />
        </div>
      )}

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-[#1a1046] mb-0.5">{instructor.name}</h3>
        {instructor.designation && (
          <p className="text-sm font-semibold mb-3" style={{ color }}>{instructor.designation}</p>
        )}
        {instructor.description && (
          <p className="text-[0.9rem] text-[#555] leading-[1.8]">{instructor.description}</p>
        )}
      </div>
    </div>
  );
}
