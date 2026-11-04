import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatEventDate } from "@/lib/format";
import type { CommunityEvent } from "@/lib/types";

export function EventCard({ event }: { event: CommunityEvent }) {
  return (
    <Card className="h-full gap-0 overflow-hidden py-0 transition-shadow hover:shadow-lg">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnail}
          alt={event.title}
          loading="lazy"
          className="aspect-video w-full object-cover"
        />
        <Badge className="absolute left-3 top-3">{event.eventType}</Badge>
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-1 text-lg font-semibold">{event.title}</h3>

        <div className="space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
            {formatEventDate(event.eventDate)}
          </p>
        </div>

        <p className="line-clamp-2 text-sm text-muted-foreground">{event.description}</p>

        <Button asChild className="mt-auto w-full">
          <Link href={`/events/${event._id}`}>View Event</Link>
        </Button>
      </CardContent>
    </Card>
  );
}