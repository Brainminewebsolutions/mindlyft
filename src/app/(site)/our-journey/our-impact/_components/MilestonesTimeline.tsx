"use client";

import { useState } from "react";
import { MediaGallery, ViewMoreButton, type MediaItem } from "@/components/site/our-journey/MediaGallery";

export type Milestone = {
  id:    string;
  label: string;
  title: string;
  desc:  string | null;
  media: MediaItem[];
};

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const [expanded, setExpanded] = useState(false);
  const hasMedia = milestone.media.length > 0;

  return (
    <div className="flex gap-4 items-start">
      {/* Date pill */}
      <div className="shrink-0 w-[80px] text-right hidden sm:block pt-3">
        <span className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-1 rounded-full">
          {milestone.label}
        </span>
      </div>
      {/* Dot */}
      <div className="shrink-0 hidden sm:flex flex-col items-center pt-[14px]">
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 ring-4 ring-violet-50" />
      </div>
      {/* Card */}
      <div className="flex-1 bg-white rounded-2xl border border-violet-100 shadow-sm px-5 py-4 hover:shadow-md transition-shadow">
        <span className="text-xs font-bold text-violet-600 sm:hidden mb-1 block">{milestone.label}</span>
        <p className="text-[15px] font-bold text-gray-900 mb-1" style={{ color: "#1a1046" }}>{milestone.title}</p>
        {milestone.desc && <p className="text-sm text-gray-500">{milestone.desc}</p>}

        {hasMedia && (
          <div className="mt-3 pt-3 border-t border-violet-50">
            <ViewMoreButton expanded={expanded} count={milestone.media.length} onClick={() => setExpanded((v) => !v)} />
          </div>
        )}

        {hasMedia && expanded && (
          <div className="mt-4">
            <MediaGallery media={milestone.media} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function MilestonesTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[88px] top-0 bottom-0 w-px bg-violet-100 hidden sm:block" />

      <div className="space-y-4">
        {milestones.map((m) => <MilestoneCard key={m.id} milestone={m} />)}
      </div>
    </div>
  );
}
