"use client";

import { useEffect, useRef, useState } from "react";
import { Send, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ChatMessageDto } from "@/hooks/useChatHub";

interface Props {
  sessionId:      number;
  studentName:    string;
  employeeName:   string;
  messages:       ChatMessageDto[];
  typingLabel:    string | null;
  isEnded:        boolean;
  reviewRating?:  number | null;
  onSend:         (content: string) => void;
  onTyping:       () => void;
}

export function ActiveChatPanel({
  sessionId, studentName, employeeName, messages, typingLabel, isEnded, reviewRating, onSend, onTyping,
}: Props) {
  const [input,  setInput]  = useState("");
  const bottomRef           = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingLabel]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-background overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <UserCircle2 className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold">{studentName}</span>
          <Badge variant={isEnded ? "secondary" : "default"} className="text-[10px]">
            {isEnded ? "Ended" : "Active"}
          </Badge>
        </div>
        {isEnded && reviewRating != null && (
          <span className="text-xs text-muted-foreground">
            {"★".repeat(reviewRating)}{"☆".repeat(5 - reviewRating)} {reviewRating}/5
          </span>
        )}
      </div>

      {/* Messages — employee's own on the RIGHT, student on the LEFT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-xs text-muted-foreground">Chat started — say hello!</p>
          </div>
        )}

        {messages.map((msg) => {
          const isMine = msg.senderRole === "Employee"; // employee sees own messages on right
          return (
            <div
              key={msg.id}
              className={cn("flex items-end gap-2", isMine ? "flex-row-reverse" : "flex-row")}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                  isMine
                    ? "bg-primary text-primary-foreground"
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                )}
              >
                {isMine ? employeeName[0]?.toUpperCase() : studentName[0]?.toUpperCase()}
              </div>

              {/* Bubble */}
              <div className={cn("flex max-w-[72%] flex-col gap-0.5", isMine ? "items-end" : "items-start")}>
                <span className="px-1 text-[10px] text-muted-foreground">
                  {isMine ? "You" : msg.senderName}
                </span>
                <div
                  className={cn(
                    "rounded-2xl px-3 py-2 text-sm leading-relaxed",
                    isMine
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}

        {typingLabel && (
          <div className="flex items-end gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              {studentName[0]?.toUpperCase()}
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2 text-xs italic text-muted-foreground">
              {typingLabel}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input / ended footer */}
      {isEnded ? (
        <div className="border-t border-border px-4 py-3 text-center">
          <p className="text-xs text-muted-foreground">
            Chat ended by the student.
            {reviewRating != null ? ` Rating: ${reviewRating}/5 stars.` : " No review yet."}
          </p>
        </div>
      ) : (
        <div className="border-t border-border p-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => { setInput(e.target.value); onTyping(); }}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Type a message…"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
          />
          <Button size="sm" disabled={!input.trim()} onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
