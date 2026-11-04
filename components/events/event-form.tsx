"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ApiError } from "@/lib/api-client";
import { todayInputValue } from "@/lib/format";
import { EVENT_TYPES } from "@/lib/site";
import { eventSchema, type EventFormValues } from "@/lib/validations/event";

interface EventFormProps {
  defaultValues?: Partial<EventFormValues>;
  submitLabel: string;
  submittingLabel: string;
  onSubmit: (values: EventFormValues) => Promise<void>;
}

export function EventForm({ defaultValues, submitLabel, submittingLabel, onSubmit }: EventFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: "",
      location: "",
      eventDate: "",
      ...defaultValues,
    },
  });

  const thumbnail = useWatch({ control, name: "thumbnail" }) ?? "";
  const dateField = register("eventDate");

  async function submit(values: EventFormValues) {
    try {
      await onSubmit(values);
    } catch (err) {
      // Show the server's own messages under the matching fields
      if (err instanceof ApiError && err.fieldErrors) {
        let first: string | undefined;
        for (const [field, messages] of Object.entries(err.fieldErrors)) {
          if (messages?.[0]) {
            setError(field as keyof EventFormValues, { message: messages[0] });
            first ??= messages[0];
          }
        }
        toast.error(first ?? err.message);
        return;
      }
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  // Also show a toast for the first validation problem
  function onInvalid(errs: Record<string, { message?: string }>) {
    const first = Object.values(errs)[0];
    if (first?.message) toast.error(first.message);
  }

  const showPreview = /^https?:\/\/.+/i.test(thumbnail);

  return (
    <form onSubmit={handleSubmit(submit, onInvalid)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="title">Event title</Label>
        <Input id="title" placeholder="e.g. Winter Clothes Distribution" {...register("title")} />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="eventType">Event type</Label>
          <Controller
            control={control}
            name="eventType"
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger id="eventType" className="w-full">
                  <SelectValue placeholder="Choose a type" />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.eventType && (
            <p className="text-sm text-destructive">{errors.eventType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="eventDate">Event date</Label>
          <Input
            id="eventDate"
            type="date"
            {...dateField}
            ref={(el) => {
              dateField.ref(el);
              // Runs in the browser only: greys out every past date in the picker
              if (el) el.min = todayInputValue();
            }}
          />
          {errors.eventDate && (
            <p className="text-sm text-destructive">{errors.eventDate.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" placeholder="e.g. Mirpur 10, Dhaka" {...register("location")} />
        {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail image URL</Label>
        <Input id="thumbnail" placeholder="https://..." {...register("thumbnail")} />
        {errors.thumbnail && (
          <p className="text-sm text-destructive">{errors.thumbnail.message}</p>
        )}
        {showPreview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={thumbnail}
            src={thumbnail}
            alt="Thumbnail preview"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="mt-2 aspect-video w-full max-w-xs rounded-lg border object-cover"
          />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={6}
          placeholder="What will happen, who it helps, and what volunteers should bring..."
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
}