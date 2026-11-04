"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EventForm } from "@/components/events/event-form";
import { authFetch } from "@/lib/api-client";
import type { EventFormValues } from "@/lib/validations/event";

export function CreateEventForm() {
  const router = useRouter();

  async function handleCreate(values: EventFormValues) {
    // The server takes the creator's email from the verified token
    await authFetch("/events", { method: "POST", body: JSON.stringify(values) });

    toast.success("Event created successfully!");
    router.push("/events");
    router.refresh();
  }

  return (
    <EventForm
      submitLabel="Create Event"
      submittingLabel="Creating..."
      onSubmit={handleCreate}
    />
  );
}