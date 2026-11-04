"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { EventCard } from "@/components/event-card";
import { EventsSkeleton } from "@/components/home/events-skeleton";
import { Button } from "@/components/ui/button";
import { authFetch } from "@/lib/api-client";
import type { CommunityEvent } from "@/lib/types";

export function JoinedEvents() {
  const [events, setEvents] = useState<CommunityEvent[] | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    try {
      setEvents(await authFetch<CommunityEvent[]>("/my-joined"));
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (failed) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-10 text-center">
        <p className="font-medium">We could not load your joined events.</p>
        <Button className="mt-4" variant="outline" onClick={() => void load()}>
          Try again
        </Button>
      </div>
    );
  }

  if (events === null) {
    return <EventsSkeleton count={3} />;
  }

  if (events.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="font-medium">You have not joined any events yet.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Find something happening near you and click Join Event.
        </p>
        <Button asChild className="mt-4">
          <Link href="/events">Explore Events</Link>
        </Button>
      </div>
    );
  }

  // The server already sorted by date, and filter() keeps that order
  const upcoming = events.filter((e) => !e.hasPassed);
  const past = events.filter((e) => e.hasPassed);

  return (
    <div className="space-y-12">
      <div>
        <h2 className="mb-6 text-xl font-semibold">
          Upcoming <span className="text-muted-foreground">({upcoming.length})</span>
        </h2>
        {upcoming.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
            Nothing coming up. Browse the{" "}
            <Link href="/events" className="font-medium text-primary hover:underline">
              upcoming events
            </Link>{" "}
            to find your next one.
          </p>
        )}
      </div>

      {past.length > 0 && (
        <div>
          <h2 className="mb-6 text-xl font-semibold">
            Past <span className="text-muted-foreground">({past.length})</span>
          </h2>
          <div className="grid gap-6 opacity-75 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}