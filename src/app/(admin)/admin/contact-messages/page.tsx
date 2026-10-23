"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Inbox, Mail, Phone, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  contactMessageService, type ContactMessage, type ContactStatus,
} from "@/services/admin/contactMessageService";
import { ContactStatusBadge, formatContactDate } from "@/components/admin/contact/ContactStatusBadge";

const FILTERS: { value: ContactStatus | "All"; label: string }[] = [
  { value: "All",     label: "All" },
  { value: "New",     label: "New" },
  { value: "Read",    label: "Read" },
  { value: "Replied", label: "Replied" },
];

export default function AdminContactMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [filter,   setFilter]   = useState<ContactStatus | "All">("All");
  const [search,   setSearch]   = useState("");
  const [query,    setQuery]    = useState("");

  // Debounce the search box so typing doesn't fire a request per keystroke
  useEffect(() => {
    const t = setTimeout(() => setQuery(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(() => {
    setLoading(true);
    contactMessageService
      .list({ search: query || undefined })
      .then((data) => { setMessages(Array.isArray(data) ? data : []); setError(null); })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  useEffect(() => { load(); }, [load]);

  const counts = useMemo(() => ({
    All:     messages.length,
    New:     messages.filter((m) => m.status === "New").length,
    Read:    messages.filter((m) => m.status === "Read").length,
    Replied: messages.filter((m) => m.status === "Replied").length,
  }), [messages]);

  const visible = filter === "All" ? messages : messages.filter((m) => m.status === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Contact Messages</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">Messages sent from the website&apos;s contact form</p>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "New",     value: counts.New,     color: "text-violet-600" },
          { label: "Read",    value: counts.Read,    color: "text-foreground" },
          { label: "Replied", value: counts.Replied, color: "text-emerald-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader className="space-y-3 border-b pb-4">
          <div className="flex items-center gap-2">
            <Inbox className="size-4 text-violet-600" />
            <CardTitle className="text-sm">Inbox</CardTitle>
            {messages.length > 0 && <Badge variant="secondary" className="text-xs">{messages.length}</Badge>}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-1 overflow-x-auto rounded-lg border border-border bg-muted/40 p-1">
              {FILTERS.map((f) => (
                <button key={f.value} type="button" onClick={() => setFilter(f.value)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition",
                    filter === f.value ? "bg-white text-violet-700 shadow-sm" : "text-muted-foreground hover:text-foreground",
                  )}>
                  {f.label}
                  <span className="tabular-nums text-[10px] opacity-70">{counts[f.value]}</span>
                </button>
              ))}
            </div>
            <div className="relative sm:w-72">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, phone, subject" className="pl-8" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Inbox className="mb-3 size-10 text-muted-foreground/30" />
              <p className="text-sm font-medium text-foreground">
                {messages.length === 0 && !query ? "No messages yet" : "No messages match"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {messages.length === 0 && !query
                  ? "Messages from the contact form will appear here"
                  : "Try a different filter or search"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {visible.map((m) => (
                <button key={m.id} type="button" onClick={() => router.push(`/admin/contact-messages/${m.id}`)}
                  className={cn(
                    "flex w-full items-start gap-4 px-6 py-4 text-left transition-colors hover:bg-muted/30",
                    m.status === "New" && "bg-violet-50/40",
                  )}>
                  <span className={cn(
                    "mt-1.5 size-2 shrink-0 rounded-full",
                    m.status === "New" ? "bg-violet-500" : "bg-transparent",
                  )} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className={cn("truncate text-sm text-foreground", m.status === "New" ? "font-semibold" : "font-medium")}>
                        {m.name}
                      </p>
                      <ContactStatusBadge status={m.status} />
                      {m.subject && (
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">{m.subject}</span>
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{m.message}</p>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-muted-foreground/80">
                      <span className="flex items-center gap-1"><Mail className="size-3" />{m.email}</span>
                      {m.phone && <span className="flex items-center gap-1"><Phone className="size-3" />{m.phone}</span>}
                    </div>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{formatContactDate(m.createdAt)}</span>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
