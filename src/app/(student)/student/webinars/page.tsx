"use client";

import { Video } from "lucide-react";
import { RegisteredEventsView } from "@/components/student/workshops/RegisteredEventsView";

export default function StudentWebinarsPage() {
  return <RegisteredEventsView type="Webinar" title="My Webinars" icon={Video} />;
}
