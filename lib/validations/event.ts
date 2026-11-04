import { z } from "zod";
import { todayInputValue } from "@/lib/format";
import { EVENT_TYPES } from "@/lib/site";

export const eventSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(120, "Title is too long"),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description is too long"),
  eventType: z.enum(EVENT_TYPES, { error: "Choose an event type" }),
  thumbnail: z.url("Enter a valid image URL (starting with https://)"),
  location: z.string().trim().min(3, "Location is required").max(160, "Location is too long"),
  eventDate: z
    .string()
    .min(1, "Event date is required")
    // "2026-12-20" strings compare correctly as text, so no Date parsing is needed
    .refine((value) => value >= todayInputValue(), "Event date must be today or in the future"),
});

export type EventFormValues = z.infer<typeof eventSchema>;