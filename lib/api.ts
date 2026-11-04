import type { CommunityEvent } from "./types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export async function getUpcomingEvents(limit?: number): Promise<CommunityEvent[]> {
  const qs = limit ? `?limit=${limit}` : "";
  const res = await fetch(`${API_URL}/events${qs}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load events");
  return res.json();
}