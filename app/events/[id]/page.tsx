import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, CalendarDays, MapPin, User, Users } from "lucide-react";
import { JoinEventButton } from "@/components/events/join-event-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getEventById } from "@/lib/api";
import { formatEventDate } from "@/lib/format";
import type { CommunityEvent } from "@/lib/types";

export const metadata: Metadata = { title: "Event Details" };

async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let event: CommunityEvent | null = null;
  let failed = false;
  try {
    event = await getEventById(id);
  } catch (err) {
    console.error("Event fetch failed:", err);
    failed = true;
  }

  if (failed) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-10 text-center">
        <p className="font-medium">We could not load this event right now.</p>
        <p className="mt-1 text-sm text-muted-foreground">Please refresh the page in a moment.</p>
      </div>
    );
  }

  if (!event) notFound();

  const participants = event.participantCount ?? 0;

  return (
    <div className="space-y-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={event.thumbnail}
        alt={event.title}
        className="aspect-video w-full rounded-2xl object-cover"
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Badge>{event.eventType}</Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{event.title}</h1>
          <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        </div>

        <aside>
          <Card className="sticky top-24">
            <CardContent className="space-y-5">
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-muted-foreground">{formatEventDate(event.eventDate)}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{event.location}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <User className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Organized by</p>
                    <p className="text-muted-foreground">{event.creatorName}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Participants</p>
                    <p className="text-muted-foreground">
                      {participants} {participants === 1 ? "person has" : "people have"} joined
                    </p>
                  </div>
                </li>
              </ul>

              <JoinEventButton eventId={event._id} hasPassed={Boolean(event.hasPassed)} />
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="aspect-video w-full rounded-2xl" />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <Link
        href="/events"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to events
      </Link>

      <Suspense fallback={<DetailsSkeleton />}>
        <EventDetails params={params} />
      </Suspense>
    </section>
  );
}