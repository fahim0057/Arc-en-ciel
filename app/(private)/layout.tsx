import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { AuthGate } from "@/components/auth/auth-gate";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <AuthGate>{children}</AuthGate>
    </Suspense>
  );
}