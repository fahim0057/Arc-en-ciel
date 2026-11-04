"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EVENT_TYPES } from "@/lib/site";

const TYPES = ["All", ...EVENT_TYPES];

export function EventFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentType = searchParams.get("type") ?? "All";
  const [query, setQuery] = useState(searchParams.get("search") ?? "");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update one or both URL params, keeping the other as it is
  function updateUrl(next: { type?: string; search?: string }) {
    const params = new URLSearchParams(window.location.search);

    if (next.type !== undefined) {
      if (next.type === "All") params.delete("type");
      else params.set("type", next.type);
    }
    if (next.search !== undefined) {
      if (next.search.trim()) params.set("search", next.search.trim());
      else params.delete("search");
    }

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function handleSearchChange(value: string) {
    setQuery(value);
    // Wait until the user pauses typing before fetching
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => updateUrl({ search: value }), 400);
  }

  function clearAll() {
    if (timer.current) clearTimeout(timer.current);
    setQuery("");
    router.replace(pathname, { scroll: false });
  }

  const hasFilters = currentType !== "All" || query.trim() !== "";

  return (
    <div className="mb-10 space-y-4">
      <div className="relative mx-auto max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search by title or location..."
          aria-label="Search events"
          className="h-11 pl-10"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {TYPES.map((type) => (
          <Button
            key={type}
            type="button"
            size="sm"
            variant={currentType === type ? "default" : "outline"}
            onClick={() => updateUrl({ type })}
          >
            {type}
          </Button>
        ))}

        {hasFilters && (
          <Button type="button" size="sm" variant="ghost" onClick={clearAll}>
            <X className="mr-1 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}