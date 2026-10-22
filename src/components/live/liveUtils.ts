export function formatEventDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export function formatEventTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${((h % 12) || 12)}:${String(m).padStart(2, "0")} ${ampm}`;
}

// Google Calendar "add event" link — no API or dependency needed.
export function googleCalendarUrl(title: string, startsAt: string, durationHours: number, details?: string) {
  const toGcal = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const start  = new Date(startsAt);
  const end    = new Date(start.getTime() + Math.max(durationHours, 0.5) * 3_600_000);
  const params = new URLSearchParams({
    action:  "TEMPLATE",
    text:    title,
    dates:   `${toGcal(start)}/${toGcal(end)}`,
    details: details ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
