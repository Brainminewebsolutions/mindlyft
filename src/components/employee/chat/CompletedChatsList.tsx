"use client";

import { CheckCircle2, Clock, Star, UserCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ChatSessionDto } from "@/hooks/useChatHub";

interface Props {
  sessions: ChatSessionDto[];
  selectedId: number | null;
  onSelect: (session: ChatSessionDto) => void;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export function CompletedChatsList({ sessions, selectedId, onSelect }: Props) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm font-medium text-muted-foreground">No completed chats yet</p>
        <p className="text-xs text-muted-foreground">Ended sessions will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sessions.map((s) => (
        <Card
          key={s.id}
          onClick={() => onSelect(s)}
          className={`cursor-pointer transition hover:ring-1 hover:ring-primary/20 ${
            selectedId === s.id ? "ring-1 ring-primary" : ""
          }`}
        >
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <UserCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <span className="truncate text-sm font-semibold">{s.studentName}</span>
              </div>
              <Badge variant="secondary" className="shrink-0 text-[10px]">Ended</Badge>
            </div>
            <div className="flex items-center gap-3 pl-7 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDate(s.endedAt)}
              </span>
              {s.reviewRating != null && (
                <span className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {s.reviewRating}/5
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
