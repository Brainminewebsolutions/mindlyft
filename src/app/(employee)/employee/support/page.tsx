"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { History, Loader2, MessageCircle } from "lucide-react";
import { useChatHub, type PendingChatRequestDto, type ChatMessageDto, type ChatSessionDto } from "@/hooks/useChatHub";
import { PendingRequestsList } from "@/components/employee/chat/PendingRequestsList";
import { ActiveChatPanel }     from "@/components/employee/chat/ActiveChatPanel";
import { CompletedChatsList }  from "@/components/employee/chat/CompletedChatsList";
import { employeeProfileService } from "@/services/employee/employeeProfileService";

interface ActiveSession {
  sessionId:    number;
  studentName:  string;
  messages:     ChatMessageDto[];
  isEnded:      boolean;
  reviewRating?: number | null;
}

type LeftTab = "pending" | "history";

function readAccessToken(): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;\s*)access_token=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export default function EmployeeSupportPage() {
  const [accessToken]    = useState<string | null>(readAccessToken);
  const [loading,        setLoading]        = useState(true);
  const [employeeName,   setEmployeeName]   = useState("Employee");
  const [pendingReqs,    setPendingReqs]    = useState<PendingChatRequestDto[]>([]);
  const [activeSession,  setActiveSession]  = useState<ActiveSession | null>(null);
  const [acceptingId,    setAcceptingId]    = useState<number | null>(null);
  const [typingLabel,    setTypingLabel]    = useState<string | null>(null);

  // History tab state
  const [leftTab,        setLeftTab]        = useState<LeftTab>("pending");
  const [history,        setHistory]        = useState<ChatSessionDto[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<ChatSessionDto | null>(null);

  const pendingAcceptRef = useRef<{ sessionId: number; studentName: string } | null>(null);

  useEffect(() => {
    employeeProfileService.get()
      .then((emp) => { if (emp?.name) setEmployeeName(emp.name); })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch("/api/chat/pending")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setPendingReqs(data); })
      .catch(() => {});
  }, []);

  // Fetch history whenever the History tab is opened
  const fetchHistory = useCallback(() => {
    setHistoryLoading(true);
    fetch("/api/chat/history")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setHistory(data); })
      .catch(() => {})
      .finally(() => setHistoryLoading(false));
  }, []);

  const handleTabChange = (tab: LeftTab) => {
    setLeftTab(tab);
    if (tab === "history") fetchHistory();
    // Switching to history clears the right panel live-chat view
    if (tab === "history" && activeSession) {
      setActiveSession(null);
    }
    // Switching to pending clears selected history
    if (tab === "pending") setSelectedHistory(null);
  };

  // ── Hub callbacks ──────────────────────────────────────────────────────────

  const onNewSupportRequest = useCallback((req: PendingChatRequestDto) => {
    setPendingReqs((prev) =>
      prev.some((r) => r.sessionId === req.sessionId) ? prev : [req, ...prev]
    );
  }, []);

  const onRequestAccepted = useCallback((sessionId: number) => {
    setPendingReqs((prev) => prev.filter((r) => r.sessionId !== sessionId));
  }, []);

  const onSessionRestored = useCallback((sessionId: number, status: string, messages: ChatMessageDto[]) => {
    const pending = pendingAcceptRef.current;
    setActiveSession({
      sessionId,
      studentName: pending?.sessionId === sessionId ? pending.studentName : "Student",
      messages,
      isEnded: status === "ENDED",
    });
    setSelectedHistory(null);
    pendingAcceptRef.current = null;
    setAcceptingId(null);
  }, []);

  const onReceiveMessage = useCallback((msg: ChatMessageDto) => {
    setActiveSession((prev) => {
      if (!prev || prev.sessionId !== msg.sessionId) return prev;
      if (prev.messages.some((m) => m.id === msg.id)) return prev;
      return { ...prev, messages: [...prev.messages, msg] };
    });
  }, []);

  const onUserTyping = useCallback((senderRole: string, senderName: string) => {
    if (senderRole !== "Employee") {
      setTypingLabel(`${senderName} is typing…`);
      setTimeout(() => setTypingLabel(null), 3000);
    }
  }, []);

  const onChatEnded = useCallback((sessionId: number) => {
    setActiveSession((prev) => {
      if (!prev || prev.sessionId !== sessionId) return prev;
      return { ...prev, isEnded: true };
    });
    // Refresh history in the background so it shows the newly ended session
    fetch("/api/chat/history")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setHistory(data); })
      .catch(() => {});
  }, []);

  const onReviewReceived = useCallback((sessionId: number, rating: number) => {
    setActiveSession((prev) => {
      if (!prev || prev.sessionId !== sessionId) return prev;
      return { ...prev, reviewRating: rating };
    });
    setHistory((prev) =>
      prev.map((s) => s.id === sessionId ? { ...s, reviewRating: rating } : s)
    );
  }, []);

  const { acceptRequest, sendMessage, typingIndicator } = useChatHub({
    accessToken,
    onNewSupportRequest,
    onRequestAccepted,
    onSessionRestored,
    onReceiveMessage,
    onUserTyping,
    onChatEnded,
    onReviewReceived,
  });

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleAccept = (req: PendingChatRequestDto) => {
    if (acceptingId !== null) return;
    pendingAcceptRef.current = { sessionId: req.sessionId, studentName: req.studentName };
    setAcceptingId(req.sessionId);
    setSelectedHistory(null);
    setPendingReqs((prev) => prev.filter((r) => r.sessionId !== req.sessionId));
    acceptRequest(req.sessionId);
  };

  const handleSend = (content: string) => {
    if (!activeSession) return;
    sendMessage(activeSession.sessionId, content, employeeName);
  };

  const handleTyping = () => {
    if (!activeSession) return;
    typingIndicator(activeSession.sessionId, employeeName);
  };

  const handleSelectHistory = (session: ChatSessionDto) => {
    setSelectedHistory(session);
    setActiveSession(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Determine what to show in the right panel
  const rightPanel = (() => {
    if (acceptingId !== null && !activeSession) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-border">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Connecting to chat…</p>
        </div>
      );
    }
    if (activeSession) {
      return (
        <ActiveChatPanel
          sessionId={activeSession.sessionId}
          studentName={activeSession.studentName}
          employeeName={employeeName}
          messages={activeSession.messages}
          typingLabel={typingLabel}
          isEnded={activeSession.isEnded}
          reviewRating={activeSession.reviewRating}
          onSend={handleSend}
          onTyping={handleTyping}
        />
      );
    }
    if (selectedHistory) {
      return (
        <ActiveChatPanel
          sessionId={selectedHistory.id}
          studentName={selectedHistory.studentName}
          employeeName={selectedHistory.employeeName ?? employeeName}
          messages={selectedHistory.messages}
          typingLabel={null}
          isEnded={true}
          reviewRating={selectedHistory.reviewRating}
          onSend={() => {}}
          onTyping={() => {}}
        />
      );
    }
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border text-center">
        <MessageCircle className="h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm font-medium text-muted-foreground">No active chat</p>
        <p className="text-xs text-muted-foreground">
          {leftTab === "history"
            ? "Select a completed chat to view the conversation."
            : "Accept a request to start chatting."}
        </p>
      </div>
    );
  })();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <MessageCircle className="h-6 w-6 text-primary" />
          Support Chat
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Accept and manage student support requests in real time.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid h-[calc(100vh-220px)] grid-cols-1 gap-4 md:grid-cols-[320px_1fr]">
        {/* Left: tabbed pending / history */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-muted/20">
          {/* Tab bar */}
          <div className="flex border-b border-border">
            <button
              onClick={() => handleTabChange("pending")}
              className={`flex flex-1 items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold transition ${
                leftTab === "pending"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pending
              {pendingReqs.length > 0 && (
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                  {pendingReqs.length}
                </span>
              )}
            </button>
            <button
              onClick={() => handleTabChange("history")}
              className={`flex flex-1 items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold transition ${
                leftTab === "history"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <History className="h-3.5 w-3.5" />
              History
            </button>
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-3">
            {leftTab === "pending" ? (
              <PendingRequestsList
                requests={pendingReqs}
                acceptingId={acceptingId}
                onAccept={(sessionId) => {
                  const req = pendingReqs.find((r) => r.sessionId === sessionId);
                  if (req) handleAccept(req);
                }}
              />
            ) : historyLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <CompletedChatsList
                sessions={history}
                selectedId={selectedHistory?.id ?? null}
                onSelect={handleSelectHistory}
              />
            )}
          </div>
        </div>

        {/* Right: active / history chat panel */}
        <div className="min-h-0">
          {rightPanel}
        </div>
      </div>
    </div>
  );
}
