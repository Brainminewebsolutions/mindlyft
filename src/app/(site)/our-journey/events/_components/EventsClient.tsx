"use client";

import { useState } from "react";
import { Calendar, MapPin, Clock, Users, Trophy } from "lucide-react";
import { MediaGallery, ViewMoreButton, type MediaItem } from "@/components/site/our-journey/MediaGallery";

export type EventMedia = MediaItem;

export type EventItem = {
  id:          string;
  title:       string;
  date:        string;
  time:        string | null;
  location:    string | null;
  description: string | null;
  attendees:   string | null;
  image:       string | null;
  media:       EventMedia[];
};

function FeaturedEvent({ event }: { event: EventItem }) {
  const [expanded, setExpanded] = useState(false);
  const hasMedia = event.media.length > 0;

  return (
    <div className="bg-white rounded-3xl border border-violet-100 shadow-md overflow-hidden mb-8 group">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative h-64 lg:h-auto min-h-[280px] overflow-hidden bg-gradient-to-br from-violet-600 to-blue-500">
          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/40 to-transparent" />
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-blue-400 text-white shadow">
            ★ Featured Event
          </span>
        </div>
        <div className="p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-3 leading-snug" style={{ color: "#1a1046" }}>
            {event.title}
          </h3>
          {event.description && (
            <p className="text-gray-500 text-[15px] leading-relaxed mb-5">{event.description}</p>
          )}
          <div className="space-y-2.5 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4 text-violet-500 shrink-0" />{event.date}
            </div>
            {event.time && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4 text-blue-500 shrink-0" />{event.time}
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-violet-500 shrink-0" />{event.location}
              </div>
            )}
            {event.attendees && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Users className="w-4 h-4 text-blue-500 shrink-0" />{event.attendees} Attendees
              </div>
            )}
          </div>
          {hasMedia && (
            <ViewMoreButton expanded={expanded} count={event.media.length} onClick={() => setExpanded((v) => !v)} />
          )}
        </div>
      </div>

      {hasMedia && expanded && (
        <div className="border-t border-violet-50 p-6">
          <MediaGallery media={event.media} />
        </div>
      )}
    </div>
  );
}

function EventGridCard({ event }: { event: EventItem }) {
  const [expanded, setExpanded] = useState(false);
  const hasMedia = event.media.length > 0;

  return (
    <div className="bg-white rounded-2xl border border-violet-100 shadow-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-violet-500 to-blue-400">
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-violet-600 to-blue-400 text-white">
          Event
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-[15px] font-bold text-gray-900 mb-2 leading-snug group-hover:text-violet-700 transition-colors" style={{ color: "#1a1046" }}>
          {event.title}
        </h3>
        {event.description && (
          <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{event.description}</p>
        )}
        <div className="space-y-1.5 border-t border-violet-50 pt-3">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5 text-violet-500 shrink-0" />{event.date}
          </div>
          {event.location && (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />{event.location}
            </div>
          )}
          {event.attendees && (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Users className="w-3.5 h-3.5 text-violet-500 shrink-0" />{event.attendees} Attendees
            </div>
          )}
        </div>

        {hasMedia && (
          <div className="mt-4 pt-3 border-t border-violet-50">
            <ViewMoreButton expanded={expanded} count={event.media.length} onClick={() => setExpanded((v) => !v)} />
          </div>
        )}
      </div>

      {hasMedia && expanded && (
        <div className="border-t border-violet-50 p-5 pt-4">
          <MediaGallery media={event.media} />
        </div>
      )}
    </div>
  );
}

export default function EventsClient({ events }: { events: EventItem[] }) {
  const [featured, ...rest] = events;

  if (!featured) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Trophy className="w-10 h-10 text-violet-200 mb-3" />
        <p className="text-gray-600 font-semibold">No events yet</p>
        <p className="text-sm text-gray-400 mt-1">Check back soon!</p>
      </div>
    );
  }

  return (
    <>
      <FeaturedEvent event={featured} />

      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((event) => <EventGridCard key={event.id} event={event} />)}
        </div>
      )}
    </>
  );
}
