"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Star, Loader2, Headphones, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatHub, type ChatMessageDto } from "@/hooks/useChatHub";

type WidgetStep = "closed" | "form" | "waiting" | "active" | "review" | "done";

const GUEST_TOKEN_KEY = "chat_guest_token";
const SESSION_ID_KEY  = "chat_session_id";

function generateToken() {
  return crypto.randomUUID();
}

export function ChatSupportWidget() {
  const [step,        setStep]        = useState<WidgetStep>("closed");
  const [name,        setName]        = useState("");
  const [email,       setEmail]       = useState("");
  const [messages,    setMessages]    = useState<ChatMessageDto[]>([]);
  const [input,       setInput]       = useState("");
  const [sessionId,   setSessionId]   = useState<number | null>(null);
  const [guestToken,  setGuestToken]  = useState<string>("");
  const [typingLabel, setTypingLabel] = useState<string | null>(null);
  const [rating,      setRating]      = useState(0);
  const [comment,     setComment]     = useState("");
  const [hoverStar,   setHoverStar]   = useState(0);

  const [pastHero, setPastHero] = useState(false);
  // Keeps the SignalR connection closed until the visitor opens the widget
  // (or a prior session is being resumed) instead of connecting on every page load.
  const [connectEnabled, setConnectEnabled] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const onSessionCreated = useCallback((id: number) => {
    setSessionId(id);
    sessionStorage.setItem(SESSION_ID_KEY, String(id));
    setStep("waiting");
  }, []);

  const onSessionRestored = useCallback((id: number, status: string, msgs: ChatMessageDto[]) => {
    setSessionId(id);
    setMessages(msgs);
    if (status === "ACTIVE") setStep("active");
    else if (status === "ENDED") setStep("review");
    else setStep("waiting");
  }, []);

  const onReceiveMessage = useCallback((msg: ChatMessageDto) => {
    setMessages((prev) => [...prev, msg]);
    if (step === "waiting") setStep("active");
  }, [step]);

  const onUserTyping = useCallback((senderRole: string, senderName: string) => {
    if (senderRole !== "Student") {
      setTypingLabel(`${senderName} is typing…`);
      if (typingTimer.current) clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => setTypingLabel(null), 3000);
    }
  }, []);

  const onChatAccepted = useCallback((_employeeName: string) => {
    setStep("active");
  }, []);

  const onChatEnded = useCallback((_sessionId: number) => {
    setStep("review");
  }, []);

  const { requestSupport, reconnectSession, sendMessage, typingIndicator, endChat, submitReview } = useChatHub({
    enabled: connectEnabled,
    onSessionCreated,
    onSessionRestored,
    onChatAccepted,
    onReceiveMessage,
    onUserTyping,
    onChatEnded,
  });

  useEffect(() => {
    const token = sessionStorage.getItem(GUEST_TOKEN_KEY);
    const sid   = sessionStorage.getItem(SESSION_ID_KEY);
    if (token && sid) {
      setGuestToken(token);
      setSessionId(Number(sid));
      setConnectEnabled(true);
      const t = setTimeout(() => {
        reconnectSession(token);
        setStep("waiting");
      }, 1500);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = () => {
    setConnectEnabled(true);
    const token = sessionStorage.getItem(GUEST_TOKEN_KEY);
    if (token) { setStep("waiting"); return; }
    setStep("form");
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const token = generateToken();
    setGuestToken(token);
    sessionStorage.setItem(GUEST_TOKEN_KEY, token);
    requestSupport(name.trim(), email.trim() || null, token);
    setStep("waiting");
  };

  const handleSend = () => {
    if (!input.trim() || sessionId === null) return;
    sendMessage(sessionId, input.trim(), name);
    setInput("");
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    if (sessionId !== null) typingIndicator(sessionId, name);
  };

  const handleEndChat = () => {
    if (sessionId === null || !guestToken) return;
    endChat(sessionId, guestToken);
    setStep("review");
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || sessionId === null || !guestToken) return;
    submitReview(sessionId, guestToken, rating, comment.trim() || null);
    sessionStorage.removeItem(GUEST_TOKEN_KEY);
    sessionStorage.removeItem(SESSION_ID_KEY);
    setStep("done");
  };

  const handleClose = () => {
    setStep("closed");
  };

  // ── FAB button ──────────────────────────────────────────────────────────────

  if (step === "closed") {
    return (
      <button
        onClick={handleOpen}
        aria-label="Open support chat"
        className={cn(
          "fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 rounded-full shadow-2xl transition-all duration-500 hover:scale-105",
          pastHero ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
      >
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold text-white transition-all duration-300 group-hover:max-w-[120px] pl-0 group-hover:pl-4">
          Chat with us
        </span>
        <span className="flex h-14 w-14 items-center justify-center rounded-full shrink-0">
          <MessageCircle className="h-6 w-6 text-white" />
          <span className="absolute top-2 right-2 h-2.5 w-2.5 animate-pulse rounded-full bg-green-400 ring-2 ring-white" />
        </span>
      </button>
    );
  }

  // ── Chat window ─────────────────────────────────────────────────────────────

  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-[370px] flex-col rounded-2xl bg-white shadow-2xl overflow-hidden border border-violet-100"
         style={{ maxHeight: "calc(100vh - 48px)" }}>

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3.5 shrink-0"
        style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Headphones className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">Mindlyft Support</p>
            <p className="text-[11px] text-white/70 mt-0.5 flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
              Online · Usually replies in minutes
            </p>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-white"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {/* Pre-chat form */}
      {step === "form" && (
        <div className="flex flex-col overflow-y-auto">
          {/* Welcome banner */}
          <div className="bg-violet-50 px-4 py-4 border-b border-violet-100">
            <p className="text-[13px] text-violet-800 font-medium">👋 Hi there! How can we help you today?</p>
            <p className="text-xs text-violet-600 mt-0.5">Fill in your details to connect with a support agent.</p>
          </div>
          <form onSubmit={handleStart} className="flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Name *</label>
              <input
                required
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email <span className="normal-case font-normal">(optional)</span></label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
              />
            </div>
            <button
              type="submit"
              className="mt-1 rounded-xl py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
            >
              Start Chat →
            </button>
          </form>
        </div>
      )}

      {/* Waiting */}
      {step === "waiting" && (
        <div className="flex flex-col items-center justify-center gap-4 py-14 px-6 text-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-violet-50">
            <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 animate-pulse rounded-full bg-green-400 ring-2 ring-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">Finding an agent for you…</p>
            <p className="text-xs text-gray-400 mt-1">Please wait, someone will be with you shortly.</p>
          </div>
          <div className="flex gap-1">
            {[0,1,2].map((i) => (
              <span
                key={i}
                className="h-2 w-2 rounded-full bg-violet-300 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Active chat */}
      {step === "active" && (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ maxHeight: 340 }}>
            {messages.map((msg) => {
              const isMine = msg.senderRole === "Student";
              return (
                <div key={msg.id} className={cn("flex items-end gap-2", isMine ? "flex-row-reverse" : "flex-row")}>
                  {/* Avatar */}
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                      isMine
                        ? "text-white"
                        : "bg-violet-100 text-violet-700"
                    )}
                    style={isMine ? { background: "linear-gradient(135deg,#7c3aed,#3b82f6)" } : {}}
                  >
                    {isMine ? (name[0]?.toUpperCase() ?? "S") : (msg.senderName[0]?.toUpperCase() ?? "A")}
                  </div>

                  {/* Bubble */}
                  <div className={cn("flex max-w-[75%] flex-col gap-0.5", isMine ? "items-end" : "items-start")}>
                    <span className="px-1 text-[10px] text-gray-400">
                      {isMine ? "You" : msg.senderName}
                    </span>
                    <div
                      className={cn(
                        "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                        isMine
                          ? "text-white rounded-tr-sm"
                          : "bg-gray-100 text-gray-800 rounded-tl-sm"
                      )}
                      style={isMine ? { background: "linear-gradient(135deg,#7c3aed,#3b82f6)" } : {}}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}

            {typingLabel && (
              <div className="flex items-end gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[11px] font-bold text-violet-700">
                  A
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-3.5 py-2.5">
                  <div className="flex gap-1 items-center">
                    {[0,1,2].map(i => (
                      <span key={i} className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-3 flex gap-2 shrink-0">
            <input
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Type a message…"
              className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow disabled:opacity-40 transition hover:opacity-90 shrink-0"
              style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          {/* End chat */}
          <div className="border-t border-gray-100 px-3 pb-3 shrink-0">
            <button
              onClick={handleEndChat}
              className="w-full rounded-xl py-1.5 text-xs font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
            >
              End Chat
            </button>
          </div>
        </>
      )}

      {/* Review */}
      {step === "review" && (
        <form onSubmit={handleSubmitReview} className="flex flex-col gap-4 p-5">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-violet-50">
              <Star className="h-6 w-6 text-violet-500" />
            </div>
            <p className="text-sm font-bold text-gray-800">How was your experience?</p>
            <p className="text-xs text-gray-400 mt-0.5">Your feedback helps us improve.</p>
          </div>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRating(s)}
                onMouseEnter={() => setHoverStar(s)}
                onMouseLeave={() => setHoverStar(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    "h-8 w-8 transition-colors",
                    s <= (hoverStar || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                  )}
                />
              </button>
            ))}
          </div>
          <textarea
            placeholder="Leave a comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none resize-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
          />
          <button
            type="submit"
            disabled={rating === 0}
            className="rounded-xl py-2.5 text-sm font-bold text-white shadow disabled:opacity-40 transition hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}
          >
            Submit Review
          </button>
        </form>
      )}

      {/* Done */}
      {step === "done" && (
        <div className="flex flex-col items-center justify-center gap-3 py-12 px-5 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
            <Star className="h-7 w-7 fill-yellow-400 text-yellow-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">Thank you for your feedback!</p>
            <p className="text-xs text-gray-400 mt-1">We hope we could help. Have a great day! 🎉</p>
          </div>
          <button
            onClick={() => setStep("closed")}
            className="mt-1 rounded-xl px-6 py-2 text-sm font-bold text-white shadow transition hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#7c3aed,#3b82f6)" }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
