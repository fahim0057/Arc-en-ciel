import type { CommunityEvent } from "./types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface EventQuery {
  limit?: number;
  type?: string;
  search?: string;
}

/** Public: upcoming events, soonest first. */
export async function getUpcomingEvents(query: EventQuery = {}): Promise<CommunityEvent[]> {
  const params = new URLSearchParams();
  if (query.limit) params.set("limit", String(query.limit));
  if (query.type && query.type !== "All") params.set("type", query.type);
  if (query.search) params.set("search", query.search);

  const qs = params.toString();
  const url = `${API_URL}/events${qs ? `?${qs}` : ""}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`API responded ${res.status} for ${url}`);
  return res.json();
}