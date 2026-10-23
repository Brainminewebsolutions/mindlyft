"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Loader2, Mail, MessageCircle, Phone, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { notify } from "@/lib/notify";
import { SITE_CONFIG } from "@/constants/siteConfig";
import {
  contactMessageService, type ContactMessage, type ContactStatus,
} from "@/services/admin/contactMessageService";
import { ContactStatusBadge, formatContactDate } from "@/components/admin/contact/ContactStatusBadge";

function DeleteModal({ name, onConfirm, onCancel, busy }: {
  name: string; onConfirm: () => void; onCancel: () => void; busy: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-xl border border-border bg-background p-6 shadow-2xl">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10">
          <Trash2 className="h-5 w-5 text-destructive" />
        </div>
        <h3 className="mt-4 text-center text-base font-semibold text-foreground">Delete Message</h3>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Delete the message from <span className="font-medium text-foreground">{name}</span>? This can&apos;t be undone.
        </p>
        <Separator className="my-4" />
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onCancel} disabled={busy}>Cancel</Button>
          <Button variant="destructive" className="flex-1" onClick={onConfirm} disabled={busy}>
            {busy && <Loader2 className="animate-spin" />} Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

// WhatsApp needs digits only; assume an Indian number when no country code was typed
function whatsappLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const withCountry = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${withCountry}`;
}

export default function ContactMessageDetailPage() {
  const { id }  = useParams<{ id: string }>();
  const router  = useRouter();

  const [message,    setMessage]    = useState<ContactMessage | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  useEffect(() => {
    contactMessageService.open(id)
      .then(setMessage)
      .catch(() => setMessage(null))
      .finally(() => setLoading(false));
  }, [id]);

  const setStatus = async (status: ContactStatus) => {
    if (!message) return;
    setSaving(true);
    try {
      await contactMessageService.setStatus(message.id, status);
      setMessage({ ...message, status, repliedAt: status === "Replied" ? new Date().toISOString() : null });
      notify.success(status === "Replied" ? "Marked as replied" : `Marked as ${status.toLowerCase()}`);
    } catch (err) {
      notify.error(err instanceof Error ? err.message : "Could not update the status");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!message) return;
    setSaving(true);
    try {
      await contactMessageService.delete(message.id);
      notify.success("Message deleted");
      router.push("/admin/contact-messages");
    } catch (err) {
      notify.error(err instanceof Error ? err.message : "Could not delete the message");
      setSaving(false);
      setConfirmDel(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-80 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (!message) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sm text-muted-foreground">Message not found</p>
        <Button variant="link" className="mt-2" onClick={() => router.push("/admin/contact-messages")}>
          Back to messages
        </Button>
      </div>
    );
  }

  const replySubject = `Re: ${message.subject ?? "Your message to MindlyftAI"}`;
  const replyBody    = `Hi ${message.name},\n\nThank you for contacting MindlyftAI.\n\n\n\nRegards,\nMindlyftAI Team\n${SITE_CONFIG.email}\n\n---\nYour message:\n${message.message}`;
  const mailto       = `mailto:${message.email}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyBody)}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0" onClick={() => router.push("/admin/contact-messages")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-xl font-semibold text-foreground">{message.subject ?? "Contact message"}</h1>
            <ContactStatusBadge status={message.status} />
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">Received {formatContactDate(message.createdAt)}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Message */}
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Message</p>
          <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground">{message.message}</p>
        </div>

        {/* Sender + actions */}
        <div className="space-y-4">
          <div className="space-y-3 rounded-xl border border-border bg-card p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">From</p>
            <p className="text-base font-semibold text-foreground">{message.name}</p>
            <a href={`mailto:${message.email}`} className="flex items-center gap-2 text-sm text-violet-700 hover:underline">
              <Mail className="size-4 shrink-0" /> <span className="truncate">{message.email}</span>
            </a>
            {message.phone && (
              <a href={`tel:${message.phone}`} className="flex items-center gap-2 text-sm text-violet-700 hover:underline">
                <Phone className="size-4 shrink-0" /> {message.phone}
              </a>
            )}
          </div>

          <div className="space-y-2 rounded-xl border border-border bg-card p-6">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Reply</p>
            <a href={mailto}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90">
              <Mail className="size-4" /> Reply by email
            </a>
            {message.phone && (
              <a href={whatsappLink(message.phone)} target="_blank" rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100">
                <MessageCircle className="size-4" /> WhatsApp
              </a>
            )}

            <Separator className="my-3" />

            {message.status === "Replied" ? (
              <>
                <p className="flex items-center gap-1.5 text-xs text-emerald-700">
                  <CheckCircle2 className="size-3.5" />
                  Replied{message.repliedAt ? ` on ${formatContactDate(message.repliedAt)}` : ""}
                </p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setStatus("Read")} disabled={saving}>
                  <RotateCcw /> Mark as not replied
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" className="w-full" onClick={() => setStatus("Replied")} disabled={saving}>
                {saving ? <Loader2 className="animate-spin" /> : <CheckCircle2 />} Mark as replied
              </Button>
            )}
            <Button variant="outline" size="sm" className="w-full" onClick={() => setStatus("New")} disabled={saving || message.status === "New"}>
              Mark as unread
            </Button>
            <Button variant="ghost" size="sm" className="w-full text-destructive hover:text-destructive"
              onClick={() => setConfirmDel(true)} disabled={saving}>
              <Trash2 /> Delete
            </Button>
          </div>
        </div>
      </div>

      {confirmDel && (
        <DeleteModal name={message.name} busy={saving} onConfirm={remove} onCancel={() => setConfirmDel(false)} />
      )}
    </div>
  );
}
