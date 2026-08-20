"use client";

import { useState } from "react";
import { FileText, Link2, Download, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export type ResourceItem = {
  id:          number;
  name:        string;
  description: string | null;
  image:       string | null;
  type:        "File" | "Link";
  url:         string | null;
};

const TABS = [
  { label: "All",   value: "All"  as const },
  { label: "Files", value: "File" as const },
  { label: "Links", value: "Link" as const },
];

function ResourceCard({ resource }: { resource: ResourceItem }) {
  const isLink = resource.type === "Link";
  return (
    <a
      href={resource.url ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-white border border-violet-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
    >
      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-violet-50 to-blue-50 flex items-center justify-center shrink-0">
        {resource.image ? (
          <img
            src={resource.image}
            alt={resource.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : isLink ? (
          <Link2 className="w-10 h-10 text-violet-300" />
        ) : (
          <FileText className="w-10 h-10 text-violet-300" />
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 text-white mb-3 w-fit">
          {isLink ? <ExternalLink className="w-3 h-3" /> : <Download className="w-3 h-3" />}
          {isLink ? "Link" : "Free"}
        </div>

        <h3 className="text-[15px] font-bold text-gray-900 mb-2 leading-snug group-hover:text-violet-700 transition-colors line-clamp-2">
          {resource.name}
        </h3>

        {resource.description && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
            {resource.description}
          </p>
        )}

        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-violet-600 group-hover:gap-2 transition-all">
          Access Resource <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </a>
  );
}

export default function ResourcesClient({ resources }: { resources: ResourceItem[] }) {
  const [filter, setFilter] = useState<(typeof TABS)[number]["value"]>("All");
  const filtered = filter === "All" ? resources : resources.filter((r) => r.type === filter);

  return (
    <div className="max-w-[1100px] mx-auto px-[6vw] pb-20">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900" style={{ color: "#1a1046" }}>All Resources</h2>
        </div>

        <div className="flex gap-1.5 rounded-full border border-violet-100 bg-violet-50/60 p-1 w-fit">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setFilter(t.value)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                filter === t.value ? "bg-white text-violet-700 shadow-sm" : "text-gray-500 hover:text-violet-600",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <FileText className="w-10 h-10 text-violet-200 mb-3" />
          <p className="text-gray-600 font-semibold">No resources here yet</p>
          <p className="text-sm text-gray-400 mt-1">Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => <ResourceCard key={r.id} resource={r} />)}
        </div>
      )}
    </div>
  );
}
