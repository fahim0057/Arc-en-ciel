"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ApiError, authFetch } from "@/lib/api-client";

export function JoinEventButton({
  eventId,
  hasPassed,
}: {
  eventId: string;
  hasPassed: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isPending } = useCurrentUser();
  const email = user?.email;

  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  // When logged in, check whether this user already joined
  useEffect(() => {
    if (!email) return;
    let cancelled = false;

    authFetch<{ joined: boolean }>(`/events/${eventId}/join-status`)
      .then((r) => {
        if (!cancelled) setJoined(r.joined);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [email, eventId]);

  async function handleJoin() {
    // Not logged in: explain and send them to login, returning here afterwards
    if (!user) {
      toast.error("Please log in to join this event.");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    setLoading(true);
    try {
      await authFetch(`/events/${eventId}/join`, { method: "POST" });
      setJoined(true);
      toast.success("You have joined this event. See you there!");
      router.refresh(); // updates the participant count on the page
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setJoined(true);
        toast.info("You have already joined this event.");
      } else {
        toast.error(err instanceof Error ? err.message : "Could not join the event.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (hasPassed) {
    return (
      <Button className="w-full" size="lg" disabled>
        This event has ended
      </Button>
    );
  }

  if (joined) {
    return (
      <Button className="w-full" size="lg" variant="secondary" disabled>
        <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
        You have joined
      </Button>
    );
  }

  return (
    <Button className="w-full" size="lg" onClick={handleJoin} disabled={loading || isPending}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? "Joining..." : "Join Event"}
    </Button>
  );
}