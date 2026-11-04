"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CalendarDays, Eye, MapPin, Plus, Users } from "lucide-react";
import { DeleteEventDialog } from "@/components/events/delete-event-dialog";
import { EditEventDialog } from "@/components/events/edit-event-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { authFetch } from "@/lib/api-client";
import { formatEventDate } from "@/lib/format";
import type { CommunityEvent } from "@/lib/types";

export function ManageEvents() {
  const [events, setEvents] = useState<CommunityEvent[] | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    try {
      setEvents(await authFetch<CommunityEvent[]>("/my-events"));
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function handleDeleted(id: string) {
    setEvents((prev) => (prev ? prev.filter((e) => e._id !== id) : prev));
  }

  if (failed) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-10 text-center">
        <p className="font-medium">We could not load your events.</p>
        <Button className="mt-4" variant="outline" onClick={() => void load()}>
          Try again
        </Button>
      </div>
    );
  }

  if (events === null) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="font-medium">You have not created any events yet.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Start one and invite your community to join.
        </p>
        <Button asChild className="mt-4">
          <Link href="/create-event">Create an Event</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          You have created {events.length} {events.length === 1 ? "event" : "events"}
        </p>
        <Button asChild size="sm">
          <Link href="/create-event">
            <Plus className="mr-1 h-4 w-4" />
            New event
          </Link>
        </Button>
      </div>

      {events.map((event) => (
        <Card key={event._id} className="gap-0 overflow-hidden py-0">
          <div className="flex flex-col sm:flex-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.thumbnail}
              alt={event.title}
              loading="lazy"
              className="aspect-video w-full object-cover sm:aspect-auto sm:w-56"
            />

            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <Badge variant="secondary">{event.eventType}</Badge>
                {event.hasPassed && <Badge variant="outline">Ended</Badge>}
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  {formatEventDate(event.eventDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  {event.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-primary" />
                  {event.participantCount ?? 0} joined
                </span>
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-1">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/events/${event._id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>
                <EditEventDialog event={event} onSaved={() => void load()} />
                <DeleteEventDialog event={event} onDeleted={handleDeleted} />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}