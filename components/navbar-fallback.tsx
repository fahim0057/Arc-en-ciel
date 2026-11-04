import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { SITE } from "@/lib/site";

// Shown for a split second while the real navbar streams in.
// Same height and logo as the real one, so nothing jumps.
export function NavbarFallback() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <HeartHandshake className="h-5 w-5" />
          </span>
          {SITE.name}
        </Link>
      </div>
    </header>
  );
}