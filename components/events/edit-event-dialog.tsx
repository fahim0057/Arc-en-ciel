"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { EventForm } from "@/components/events/event-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authFetch } from "@/lib/api-client";
import type { CommunityEvent } from "@/lib/types";
import type { EventFormValues } from "@/lib/validations/event";

export function EditEventDialog({
  event,
  onSaved,
}: {
  event: CommunityEvent;
  onSaved: () => void;
}) {
  const [open, setOpen] = useState(false);

  async function handleUpdate(values: EventFormValues) {
    await authFetch(`/events/${event._id}`, {
      method: "PATCH",
      body: JSON.stringify(values),
    });

    toast.success("Event updated successfully!");
    setOpen(false);
    onSaved();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" disabled={event.hasPassed}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit event</DialogTitle>
          <DialogDescription>
            Changes show up on the public event page straight away.
          </DialogDescription>
        </DialogHeader>

        <EventForm
          defaultValues={{
            title: event.title,
            description: event.description,
            eventType: event.eventType as EventFormValues["eventType"],
            thumbnail: event.thumbnail,
            location: event.location,
            // "2026-12-20T00:00:00.000Z" becomes "2026-12-20", the format a date input needs
            eventDate: event.eventDate.slice(0, 10),
          }}
          submitLabel="Save changes"
          submittingLabel="Saving..."
          onSubmit={handleUpdate}
        />
      </DialogContent>
    </Dialog>
  );
}