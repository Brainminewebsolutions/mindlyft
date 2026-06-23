"use client";

import { Clock, UserCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PendingChatRequestDto } from "@/hooks/useChatHub";

interface Props {
  requests:       PendingChatRequestDto[];
  acceptingId:    number | null;
  onAccept:       (sessionId: number) => void;
}

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60)  return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export function PendingRequestsList({ requests, acceptingId, onAccept }: Props) {
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <UserCircle2 className="h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm font-medium text-muted-foreground">No pending requests</p>
        <p className="text-xs text-muted-foreground">New requests will appear here in real time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((req) => (
        <Card key={req.sessionId} className="transition hover:ring-1 hover:ring-primary/20">
          <CardContent className="flex items-start justify-between gap-3 p-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <UserCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <span className="truncate text-sm font-semibold">{req.studentName}</span>
                <Badge variant="secondary" className="text-[10px]">Student</Badge>
              </div>
              {req.studentEmail && (
                <p className="mt-0.5 truncate pl-7 text-xs text-muted-foreground">{req.studentEmail}</p>
              )}
              <div className="mt-1 flex items-center gap-1 pl-7 text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3" />
                {timeAgo(req.requestedAt)}
              </div>
            </div>
            <Button
              size="sm"
              disabled={acceptingId === req.sessionId}
              onClick={() => onAccept(req.sessionId)}
              className="shrink-0"
            >
              {acceptingId === req.sessionId ? "Accepting…" : "Accept"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
