"use client";

import { useEffect, useRef, useCallback } from "react";
import * as signalR from "@microsoft/signalr";

// The hub is mapped at the API root ("/hubs/chat"), not under "/api".
// In production the site is https while the API is still plain http, so the
// browser must hit the same-origin path — iisnode-server.js proxies
// "/hubs/*" (including the WebSocket upgrade) through to the .NET backend.
// In dev there's no mixed-content concern, so connect to the API directly.
const DOTNET_ORIGIN = (process.env.NEXT_PUBLIC_DOTNET_API_URL ?? "").replace(/\/api\/?$/, "");
const HUB_URL = process.env.NODE_ENV === "production" ? "/hubs/chat" : `${DOTNET_ORIGIN}/hubs/chat`;

export interface ChatMessageDto {
  id: number;
  sessionId: number;
  senderRole: string;
  senderName: string;
  content: string;
  sentAt: string;
}

export interface PendingChatRequestDto {
  sessionId: number;
  studentName: string;
  studentEmail: string | null;
  requestedAt: string;
}

export interface ChatSessionDto {
  id: number;
  status: string;
  studentName: string;
  employeeName: string | null;
  startedAt: string | null;
  endedAt: string | null;
  messages: ChatMessageDto[];
  reviewRating: number | null;
  reviewComment: string | null;
}

interface UseChatHubOptions {
  // Defaults to true so existing callers (employee dashboard) keep an
  // always-on connection. The public chat widget passes false until the
  // visitor actually opens it, so we don't open a socket on every page view.
  enabled?: boolean;
  accessToken?: string | null;
  onNewSupportRequest?: (req: PendingChatRequestDto) => void;
  onRequestAccepted?: (sessionId: number) => void;
  onSessionCreated?: (sessionId: number) => void;
  onSessionRestored?: (sessionId: number, status: string, messages: ChatMessageDto[]) => void;
  onChatAccepted?: (employeeName: string) => void; // student gets this when employee joins
  onReceiveMessage?: (msg: ChatMessageDto) => void;
  onUserTyping?: (senderRole: string, senderName: string) => void;
  onChatEnded?: (sessionId: number) => void;
  onReviewReceived?: (sessionId: number, rating: number) => void;
}

export function useChatHub(options: UseChatHubOptions) {
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  // Keep callbacks in a ref so hub handlers always call the latest version
  // without re-registering on every render.
  const cbRef = useRef(options);
  cbRef.current = options;

  useEffect(() => {
    if (options.enabled === false) return;

    let isMounted = true;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        HUB_URL,
        options.accessToken
          ? { accessTokenFactory: () => cbRef.current.accessToken! }
          : {}
      )
      .withAutomaticReconnect()
      // None suppresses the internal "stopped during negotiation" log that
      // React Strict Mode's double-mount causes in development.
      .configureLogging(signalR.LogLevel.None)
      .build();

    // Register stable wrapper handlers that forward to the latest callback ref.
    connection.on("NewSupportRequest",  (r)          => cbRef.current.onNewSupportRequest?.(r));
    connection.on("RequestAccepted",    (id)         => cbRef.current.onRequestAccepted?.(id));
    connection.on("SessionCreated",     (id)         => cbRef.current.onSessionCreated?.(id));
    connection.on("SessionRestored",    (id, st, ms) => cbRef.current.onSessionRestored?.(id, st, ms));
    connection.on("ChatAccepted",       (empName)    => cbRef.current.onChatAccepted?.(empName));
    connection.on("ReceiveMessage",     (msg)        => cbRef.current.onReceiveMessage?.(msg));
    connection.on("UserTyping",         (role, name) => cbRef.current.onUserTyping?.(role, name));
    connection.on("ChatEnded",          (id)         => cbRef.current.onChatEnded?.(id));
    connection.on("ReviewReceived",     (id, rating) => cbRef.current.onReviewReceived?.(id, rating));

    connectionRef.current = connection;

    connection.start().catch((err: unknown) => {
      // In React Strict Mode (dev), the effect cleanup stops the connection
      // before negotiation finishes, producing this expected error. Suppress it.
      if (!isMounted) return;
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.includes("stopped during negotiation")) {
        console.error("[SignalR]", msg);
      }
    });

    return () => {
      isMounted = false;
      connectionRef.current = null;
      connection.stop().catch(() => {});
    };
    // Re-run when the token changes (anonymous ↔ authenticated switch) or
    // when enabled flips from false to true.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.enabled, options.accessToken]);

  // ── Outbound methods ────────────────────────────────────────────────────────

  const invoke = useCallback((method: string, ...args: unknown[]) => {
    connectionRef.current?.invoke(method, ...args).catch((err: unknown) => {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[SignalR] ${method}:`, msg);
    });
  }, []);

  const requestSupport   = useCallback((name: string, email: string | null, guestToken: string) =>
    invoke("RequestSupport", name, email, guestToken), [invoke]);

  const reconnectSession = useCallback((guestToken: string) =>
    invoke("ReconnectSession", guestToken), [invoke]);

  const acceptRequest    = useCallback((sessionId: number) =>
    invoke("AcceptRequest", sessionId), [invoke]);

  const sendMessage      = useCallback((sessionId: number, content: string, senderName: string) =>
    invoke("SendMessage", sessionId, content, senderName), [invoke]);

  const typingIndicator  = useCallback((sessionId: number, senderName: string) =>
    invoke("TypingIndicator", sessionId, senderName), [invoke]);

  const endChat          = useCallback((sessionId: number, guestToken: string) =>
    invoke("EndChat", sessionId, guestToken), [invoke]);

  const submitReview     = useCallback((sessionId: number, guestToken: string, rating: number, comment: string | null) =>
    invoke("SubmitReview", sessionId, guestToken, rating, comment), [invoke]);

  return { requestSupport, reconnectSession, acceptRequest, sendMessage, typingIndicator, endChat, submitReview };
}
